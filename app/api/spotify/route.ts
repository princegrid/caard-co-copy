import { NextResponse } from 'next/server';
import { siteConfig } from '@/site.config';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
export const dynamic = 'force-dynamic';

async function getAccessToken() {
  if (!siteConfig.spotify.clientId || !siteConfig.spotify.clientSecret || !siteConfig.spotify.refreshToken) {
    throw new Error('Missing Spotify credentials');
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${siteConfig.spotify.clientId}:${siteConfig.spotify.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: siteConfig.spotify.refreshToken,
    }),
    // Tell Next.js not to cache this request
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      // Tell Next.js not to cache this request
      cache: 'no-store',
    });

    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch now playing');
    }

    const data = await response.json();

    if (!data.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = {
      id: data.item.id,
      name: data.item.name,
      artist: data.item.artists[0].name,
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0]?.url || '',
      songUrl: data.item.external_urls.spotify,
      isPlaying: data.is_playing,
      previewUrl: data.item.preview_url,
    };

    return NextResponse.json({
      isPlaying: data.is_playing,
      track,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}