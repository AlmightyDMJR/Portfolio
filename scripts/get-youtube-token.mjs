import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function readEnvCredentials() {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf-8');
  const clientIdMatch = content.match(/VITE_YOUTUBE_CLIENT_ID=([^\r\n]+)/);
  const clientSecretMatch = content.match(/VITE_YOUTUBE_CLIENT_SECRET=([^\r\n]+)/);
  return {
    clientId: clientIdMatch ? clientIdMatch[1].trim() : '',
    clientSecret: clientSecretMatch ? clientSecretMatch[1].trim() : '',
  };
}

async function main() {
  console.log('\n▶️ --- YouTube Music / Google OAuth Token Generator ---\n');
  console.log('NOTE: If you just want to display your YouTube Music playlist or favorites,');
  console.log('using an API Key + Playlist ID in .env is simpler and never expires!\n');
  console.log('Use this OAuth script if you want to access your private "Liked Music" (LM).\n');

  const existingEnv = readEnvCredentials();
  let clientId = existingEnv.clientId;
  let clientSecret = existingEnv.clientSecret;

  if (clientId && clientSecret) {
    console.log(`✅ Loaded Client ID from .env: ${clientId.slice(0, 10)}...`);
    console.log(`✅ Loaded Client Secret from .env`);
  } else {
    clientId = (await question('Enter your Google OAuth Client ID: ')).trim();
    clientSecret = (await question('Enter your Google OAuth Client Secret: ')).trim();
  }

  const defaultRedirect = 'http://localhost:5173/callback';
  const redirectInput = (
    await question(`\nEnter Redirect URI configured in Google Console (Press Enter for '${defaultRedirect}'): `)
  ).trim();
  const redirectUri = redirectInput || defaultRedirect;

  const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  console.log('\n👉 Step 1: Open this URL in your browser and log into your Google Account:\n');
  console.log(authUrl);
  console.log('\n👉 Step 2: Grant permissions. Google will redirect you to your redirect URI.');
  console.log('Copy the complete URL (or code=...) from your browser address bar and paste it below:\n');

  let rawCode = (await question('Paste redirect URL (or code): ')).trim();
  if (rawCode.includes('code=')) {
    const queryPart = rawCode.includes('?') ? rawCode.split('?')[1] : rawCode;
    const urlParams = new URLSearchParams(queryPart);
    rawCode = urlParams.get('code') || rawCode;
  }

  // URL decode if needed
  rawCode = decodeURIComponent(rawCode);

  console.log('\nExchanging authorization code with Google for Refresh Token...');

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: rawCode,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.refresh_token) {
      console.error('\n❌ Error from Google OAuth API:', data);
      console.log('\nTroubleshooting Tips:');
      console.log('1. Make sure your redirect URI in Google Cloud matches exactly.');
      console.log('2. Ensure you added your email as a Test User in OAuth consent screen.');
      console.log('3. Authorization codes expire within minutes. Re-run and paste promptly.');
      rl.close();
      return;
    }

    console.log('\n🎉 SUCCESS! Your Google Refresh Token is:\n');
    console.log(data.refresh_token);

    // Read or create .env content
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';

    const lines = [
      `VITE_YOUTUBE_CLIENT_ID=${clientId}`,
      `VITE_YOUTUBE_CLIENT_SECRET=${clientSecret}`,
      `VITE_YOUTUBE_REFRESH_TOKEN=${data.refresh_token}`,
    ];

    if (envContent.includes('VITE_YOUTUBE_REFRESH_TOKEN=')) {
      envContent = envContent.replace(/VITE_YOUTUBE_CLIENT_ID=.*/g, `VITE_YOUTUBE_CLIENT_ID=${clientId}`);
      envContent = envContent.replace(/VITE_YOUTUBE_CLIENT_SECRET=.*/g, `VITE_YOUTUBE_CLIENT_SECRET=${clientSecret}`);
      envContent = envContent.replace(/VITE_YOUTUBE_REFRESH_TOKEN=.*/g, `VITE_YOUTUBE_REFRESH_TOKEN=${data.refresh_token}`);
    } else {
      envContent += `\n# YouTube Music OAuth Credentials\n${lines.join('\n')}\n`;
    }

    fs.writeFileSync(envPath, envContent, 'utf-8');
    console.log(`\n💾 Automatically updated ${envPath}!`);
    console.log('⚡ Restart your Vite dev server (`npm run dev`) to see your YouTube Music!');
  } catch (err) {
    console.error('\n❌ Request failed:', err);
  } finally {
    rl.close();
  }
}

main();
