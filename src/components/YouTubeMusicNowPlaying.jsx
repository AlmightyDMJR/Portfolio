import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SquareArrowOutUpRight, Music2, Disc3, Radio, Play } from 'lucide-react';
import { getYouTubeMusicTracks } from '../lib/youtubeMusic';
import { hobbiesData } from '../constants/index.js';
import TiltCard from './TiltCard';

const YouTubeMusicNowPlaying = () => {
  const [musicData, setMusicData] = useState({
    isPlaying: true,
    tracks: hobbiesData.fallbackTracks,
    source: 'fallback',
    playlistUrl: null,
  });
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchTracks = async () => {
      const res = await getYouTubeMusicTracks();
      if (mounted && res?.tracks?.length) {
        setMusicData(res);
      }
    };

    fetchTracks();
    const interval = setInterval(fetchTracks, 60000); // Poll every minute

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const tracks = musicData.tracks || hobbiesData.fallbackTracks;
  const currentTrack = tracks[selectedTrackIndex] || tracks[0];

  return (
    <div className="w-full mt-10">
      <TiltCard className="w-full" innerClassName="p-6 md:p-8" glowColor="red">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            {/* YouTube Music Branded Icon */}
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shadow-sm relative overflow-hidden group">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-xs">
                <Play className="w-3 h-3 text-white fill-white translate-x-[0.5px]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">
                  YouTube Music
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-[11px] font-medium text-[#6B7280]">Daily Rhythm</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight">
                What I’ve Been Listening To
              </h4>
            </div>
          </div>

          {/* Status Badge with Red Audio Equalizer */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-xs font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
            </span>
            <span className="text-[#111827] text-xs font-medium">
              {musicData.isPlaying ? 'Current Rotation' : 'Curated Playlist'}
            </span>

            {/* Micro Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-3.5 ml-1">
              <motion.span
                animate={{ height: ['4px', '14px', '6px'] }}
                transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
                className="w-[3px] bg-red-600 rounded-full"
              />
              <motion.span
                animate={{ height: ['12px', '4px', '14px'] }}
                transition={{ repeat: Infinity, duration: 0.55, ease: 'easeInOut' }}
                className="w-[3px] bg-red-600 rounded-full"
              />
              <motion.span
                animate={{ height: ['6px', '14px', '5px'] }}
                transition={{ repeat: Infinity, duration: 0.85, ease: 'easeInOut' }}
                className="w-[3px] bg-red-600 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Bento Grid: Featured Spotlight + Track Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
          {/* Main Featured Player Spotlight */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-stretch gap-5 p-4 rounded-xl bg-white border border-neutral-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {/* Album Cover with Vinyl Spin Badge */}
            <div className="relative w-36 h-36 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden shadow-md group">
              <img
                src={currentTrack.albumArt}
                alt={currentTrack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <Disc3 className="w-5 h-5 text-white/90 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-1 text-center sm:text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  <Radio className="w-3 h-3" />
                  Spotlight Track
                </div>
                <h5 className="text-lg font-bold text-[#111827] truncate leading-tight" title={currentTrack.title}>
                  {currentTrack.title}
                </h5>
                <p className="text-sm font-medium text-[#4B5563] truncate mt-0.5" title={currentTrack.artist}>
                  {currentTrack.artist}
                </p>
                <p className="text-xs text-[#9CA3AF] truncate mt-0.5">
                  {currentTrack.album || 'YouTube Music'}
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href={currentTrack.ytMusicUrl || currentTrack.musicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors group/link"
                >
                  <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="w-2 h-2 text-white fill-white translate-x-[0.5px]" />
                  </div>
                  <span>Play on YouTube Music</span>
                  <SquareArrowOutUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>

                {musicData.playlistUrl && (
                  <a
                    href={musicData.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    View Playlist
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Track Queue / Playlist Strip */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Curated Queue & Favorites
              </span>
              <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
                <Music2 className="w-3 h-3" />
                {tracks.length} tracks
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {tracks.slice(0, 4).map((track, idx) => {
                const isSelected = idx === selectedTrackIndex;
                return (
                  <button
                    key={track.id || idx}
                    type="button"
                    onClick={() => setSelectedTrackIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-red-50/60 border-red-300 shadow-sm'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200/90 hover:border-neutral-400/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <img
                        src={track.albumArt}
                        alt={track.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0 shadow-sm"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold truncate ${isSelected ? 'text-red-950 font-bold' : 'text-[#111827]'}`}>
                          {track.title}
                        </p>
                        <p className="text-xs text-[#6B7280] truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    <a
                      href={track.ytMusicUrl || track.musicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-[#9CA3AF] hover:text-red-600 rounded-lg hover:bg-red-50/50 transition-colors shrink-0"
                      title="Open in YouTube Music"
                    >
                      <SquareArrowOutUpRight className="w-3.5 h-3.5" />
                    </a>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default YouTubeMusicNowPlaying;
