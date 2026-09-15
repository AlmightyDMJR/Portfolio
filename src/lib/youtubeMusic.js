import { hobbiesData } from '../constants/index.js';

/**
 * YouTube Music Integration Helper
 * 
 * Supports:
 * 1. API Key + Playlist ID (Recommended: 100% browser CORS compatible, never expires).
 * 2. Google OAuth2 Refresh Token (For private playlists or Liked Music 'LM').
 */

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const RAW_PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;

const CLIENT_ID = import.meta.env.VITE_YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_YOUTUBE_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_YOUTUBE_REFRESH_TOKEN;

const PLAYLIST_ITEMS_ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';

let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Extract clean playlist ID even if user pasted full URL or sharing link with `&si=...`
 */
export function extractCleanPlaylistId(raw) {
  if (!raw) return '';
  let id = raw.trim();
  if (id.includes('list=')) {
    id = id.split('list=')[1];
  }
  if (id.includes('&')) {
    id = id.split('&')[0];
  }
  if (id.includes('?')) {
    id = id.split('?')[0];
  }
  return id.trim();
}

const PLAYLIST_ID = extractCleanPlaylistId(RAW_PLAYLIST_ID);

/**
 * Clean up common YouTube metadata artifacts from song titles and channel names
 */
function sanitizeTrackDetails(rawTitle, rawChannel) {
  let title = (rawTitle || '').trim();
  let artist = (rawChannel || '').replace(/\s*-\s*Topic$/i, '').trim();

  // Strip common YouTube fluff like "(Official Audio)", "[Official Video]", "(Lyric Video)", etc.
  title = title
    .replace(/\s*(\(|\[)(official\s*(music\s*)?video|official\s*audio|visualizer|lyric\s*video|audio|lyrics)(\)|\])/gi, '')
    .trim();

  // If the title is formatted as "Artist - Song Title", extract both cleanly
  if (title.includes(' - ')) {
    const parts = title.split(' - ');
    if (parts.length >= 2) {
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    }
  }

  return { title: title || rawTitle, artist: artist || 'Various Artists' };
}

/**
 * Obtain an OAuth access token using Google refresh token flow
 * Checks local Vite proxy first to prevent browser CORS block on https://oauth2.googleapis.com/token
 */
async function getOAuthAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return null;
  }

  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  const tokenEndpoints = ['/api/google-oauth-token', 'https://oauth2.googleapis.com/token'];

  for (const endpoint of tokenEndpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          grant_type: 'refresh_token',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          cachedAccessToken = data.access_token;
          tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
          return cachedAccessToken;
        }
      }
    } catch {
      // Continue to next endpoint if proxy or direct failed
    }
  }

  return null;
}

/**
 * Fetches tracks from YouTube Music playlist or Liked Music
 */
export async function getYouTubeMusicTracks() {
  try {
    let url = null;
    let headers = {};
    let source = 'fallback';

    // 1. If API Key and Playlist ID are available, use them first (CORS-friendly in all browsers)
    if (API_KEY && PLAYLIST_ID) {
      url = `${PLAYLIST_ITEMS_ENDPOINT}?part=snippet,contentDetails&playlistId=${encodeURIComponent(
        PLAYLIST_ID
      )}&maxResults=8&key=${encodeURIComponent(API_KEY)}`;
      source = 'youtube_playlist';
    } else {
      // 2. Otherwise, attempt OAuth token flow (for Liked Music 'LM' or private playlist)
      const accessToken = await getOAuthAccessToken();
      if (accessToken) {
        const targetPlaylist = PLAYLIST_ID || 'LM';
        url = `${PLAYLIST_ITEMS_ENDPOINT}?part=snippet,contentDetails&playlistId=${encodeURIComponent(
          targetPlaylist
        )}&maxResults=8`;
        headers = { Authorization: `Bearer ${accessToken}` };
        source = 'youtube_oauth';
      }
    }

    if (!url) {
      console.warn('YouTube Music: No credentials found in .env. Showing fallback tracks.');
      return {
        isPlaying: false,
        tracks: hobbiesData.fallbackTracks,
        source: 'fallback',
        playlistUrl: PLAYLIST_ID ? `https://music.youtube.com/playlist?list=${PLAYLIST_ID}` : null,
      };
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.warn(`YouTube API returned status ${response.status}:`, response.statusText);
      // If API key failed, try OAuth as fallback
      if (source === 'youtube_playlist') {
        const accessToken = await getOAuthAccessToken();
        if (accessToken) {
          const fallbackRes = await fetch(
            `${PLAYLIST_ITEMS_ENDPOINT}?part=snippet,contentDetails&playlistId=${encodeURIComponent(
              PLAYLIST_ID || 'LM'
            )}&maxResults=8`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          if (fallbackRes.ok) {
            const fbData = await fallbackRes.json();
            return parseYouTubeItems(fbData, 'youtube_oauth');
          }
        }
      }

      return {
        isPlaying: false,
        tracks: hobbiesData.fallbackTracks,
        source: 'fallback',
      };
    }

    const data = await response.json();
    return parseYouTubeItems(data, source);
  } catch (error) {
    console.warn('Error fetching YouTube Music data:', error);
    return {
      isPlaying: false,
      tracks: hobbiesData.fallbackTracks,
      source: 'fallback',
    };
  }
}

function parseYouTubeItems(data, source) {
  if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) {
    return {
      isPlaying: false,
      tracks: hobbiesData.fallbackTracks,
      source: 'fallback',
    };
  }

  const tracks = data.items
    .filter((item) => item.snippet && item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
    .map((item) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      const rawTitle = item.snippet?.title || 'Unknown Title';
      const rawChannel = item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle || 'YouTube Music';
      const { title, artist } = sanitizeTrackDetails(rawTitle, rawChannel);

      const thumbnails = item.snippet?.thumbnails || {};
      const albumArt =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        hobbiesData.fallbackTracks[0].albumArt;

      return {
        id: videoId || item.id,
        title,
        artist,
        album: 'YouTube Music Single / Session',
        albumArt,
        ytMusicUrl: `https://music.youtube.com/watch?v=${videoId}`,
        musicUrl: `https://music.youtube.com/watch?v=${videoId}`,
        youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
        isPlaying: false,
      };
    });

  if (tracks.length === 0) {
    return {
      isPlaying: false,
      tracks: hobbiesData.fallbackTracks,
      source: 'fallback',
    };
  }

  tracks[0].isPlaying = true;

  return {
    isPlaying: true,
    tracks,
    source,
    playlistUrl: PLAYLIST_ID ? `https://music.youtube.com/playlist?list=${PLAYLIST_ID}` : null,
  };
}

// Backward-compatible alias
export const getNowPlaying = getYouTubeMusicTracks;
