"use client";

import useSWR from "swr";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import { SpotifyResponse } from "@/types/spotify";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const REFRESH_INTERVAL_SECONDS = 10;

export function SpotifyWidget() {
  const { data: spotifyData, error } = useSWR<SpotifyResponse>('/api/spotify', fetcher, {
    refreshInterval: REFRESH_INTERVAL_SECONDS * 1000,
  });

  const isLoading = !spotifyData && !error;

  // 1. Calculate progress percentage
  const track = spotifyData?.track;
  const progressPercentage =
    track && track.progress_ms && track.duration_ms
      ? (track.progress_ms / track.duration_ms) * 100
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="w-full bg-black/20 backdrop-blur-lg rounded-2xl p-4 min-h-[88px] flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" className="flex items-center space-x-3 w-full">
            <div className="w-12 h-12 bg-white/10 rounded-md animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-white/10 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
            </div>
          </motion.div>
        ) : error || !spotifyData?.isPlaying ? (
          <motion.div key="not-playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center space-x-2 text-white/50 text-sm">
            <Music className="w-4 h-4" />
            <p>Not Playing</p>
          </motion.div>
        ) : (
          <motion.a 
            key={spotifyData.track?.id} 
            href={spotifyData.track?.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex items-center space-x-3 w-full"
          >
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src={spotifyData.track?.albumImageUrl || ''}
                alt={spotifyData.track?.album || 'Album'}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm truncate text-white">{spotifyData.track?.name}</p>
              <p className="text-xs truncate text-white/60">{spotifyData.track?.artist}</p>
              
                {/* 2. Render the progress bar */}
                <div className="w-full bg-white/10 rounded-full h-1 mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  // Animate the width from its current percentage
                  initial={{ width: `${progressPercentage}%` }}
                  animate={{ width: `${progressPercentage}%` }}
                  // Transition smoothly over the refresh interval for a "live" feel
                  transition={{ duration: REFRESH_INTERVAL_SECONDS, ease: 'linear' }}
                />
                </div>
                {/* 3. Show current time and total duration */}
                <div className="flex justify-between text-[10px] text-white/50 mt-1 font-mono tabular-nums">
                <span>
                  {track?.progress_ms !== undefined
                  ? new Date(track.progress_ms).toISOString().substr(14, 5)
                  : "0:00"}
                </span>
                <span>
                  {track?.duration_ms !== undefined
                  ? new Date(track.duration_ms).toISOString().substr(14, 5)
                  : "0:00"}
                </span>
                </div>
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
}