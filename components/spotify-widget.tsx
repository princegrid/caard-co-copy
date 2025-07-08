"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, ExternalLink } from "lucide-react";
import { SpotifyResponse } from "@/types/spotify";

export function SpotifyWidget() {
  const [spotifyData, setSpotifyData] = useState<SpotifyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify');
      const data = await response.json();
      setSpotifyData(data);
    } catch (error) {
      console.error('Failed to fetch Spotify data:', error);
      setSpotifyData({ isPlaying: false, error: 'Failed to load' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    );
  }

  if (spotifyData?.error || !spotifyData?.isPlaying) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Currently Playing
          </motion.h2>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {spotifyData?.error ? 'Unable to load Spotify data' : 'Not currently playing anything'}
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    );
  }

  const { track } = spotifyData;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-center bg-background/85 backdrop-blur-sm rounded-lg p-4 mx-auto max-w-fit"
        >
          Currently Playing
        </motion.h2>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={track?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden bg-background/85 backdrop-blur-sm border-background/20">
              <CardContent className="p-0">
                <div className="flex items-center">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img
                      src={track?.albumImageUrl}
                      alt={`${track?.album} cover`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
                          {track?.name}
                        </h3>
                        <p className="text-muted-foreground mb-2 truncate">
                          by {track?.artist}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {track?.album}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant="secondary" className="animate-pulse">
                          <Music className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                        <motion.a
                          href={track?.songUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}