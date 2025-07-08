"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, User } from "lucide-react";
import { siteConfig } from "@/site.config";

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-black/20 backdrop-blur-lg rounded-2xl p-6 text-center flex flex-col items-center"
    >
      <Avatar className="w-24 h-24 mb-4 ring-2 ring-white/20">
        <AvatarImage src={siteConfig.avatar} alt={siteConfig.name} />
        <AvatarFallback>{siteConfig.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      
      <h1 className="text-4xl font-bold text-white">{siteConfig.name}</h1>
      
      <div className="space-y-1.5 my-3 text-white/70 text-sm">
        <div className="flex items-center justify-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{siteConfig.location || 'Planet Earth'}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <User className="w-4 h-4" />
          <span>he/him</span>
        </div>
      </div>
      
      {siteConfig.tagline && (
        <p className="text-white/60 text-sm">{siteConfig.tagline}</p>
      )}
    </motion.div>
  );
}