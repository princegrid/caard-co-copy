export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  isPlaying: boolean;
  previewUrl?: string;
  // 1. Add progress and duration properties
  progress_ms?: number;
  duration_ms?: number;
}

export interface SpotifyResponse {
  isPlaying: boolean;
  track?: SpotifyTrack;
  error?: string;
}