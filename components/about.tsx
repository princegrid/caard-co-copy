"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Heart, Activity } from "lucide-react";
import { siteConfig } from "@/site.config";

export function About() {
  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  const infoSections = [
    { title: "Interests", icon: Heart, content: siteConfig.interests },
    { title: "Current Projects", icon: Briefcase, content: siteConfig.currentProjects },
    { title: "Status", icon: Activity, content: siteConfig.status },
  ].filter(section => section.content && (Array.isArray(section.content) ? section.content.length > 0 : true));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="w-full bg-black/20 backdrop-blur-lg rounded-2xl border-none">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-4">
                <TabsTrigger value="bio" className="text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white">Bio</TabsTrigger>
                <TabsTrigger value="gallery" className="text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bio">
                {/* --- START: New, cleaner rendering for the bio --- */}
                <div className="space-y-6">
                  {siteConfig.bio.map((item, index) => {
                    const Icon = item.icon; // Get the icon component from the data
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <Icon className="w-5 h-5 mt-0.5 text-white/50 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-sm text-white">
                            {item.title}
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* --- END: New rendering for the bio --- */}
              </TabsContent>

              <TabsContent value="gallery">
                {siteConfig.personalGifs && siteConfig.personalGifs.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {siteConfig.personalGifs.map((gif, index) => (
                      <motion.div
                        key={index}
                        className="aspect-video relative rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedGif(gif)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Image
                          src={gif}
                          alt={`Personal GIF ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-white/50 py-4">
                    No gallery items.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {selectedGif && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedGif(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-screen-lg max-h-[80vh] w-auto h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedGif}
                alt="Fullscreen GIF"
                layout="intrinsic"
                width={800}
                height={450}
                className="rounded-lg object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}