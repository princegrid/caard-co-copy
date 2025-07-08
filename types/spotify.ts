export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  isPlaying: boolean;
  previewUrl?: string;
}

export interface SpotifyResponse {
  isPlaying: boolean;
  track?: SpotifyTrack;
  error?: string;
}