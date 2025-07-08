"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, User } from "lucide-react";
import { siteConfig } from "@/site.config";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 bg-background/85 backdrop-blur-sm rounded-2xl mx-4 shadow-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Avatar className="w-32 h-32 mx-auto ring-4 ring-background/50 shadow-2xl backdrop-blur-sm">
            <AvatarImage src={siteConfig.avatar} alt={siteConfig.name} />
            <AvatarFallback className="text-2xl">
              {siteConfig.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-foreground drop-shadow-lg"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3 mb-6"
        >
          {/* Location Row */}
          <div className="flex items-center justify-center space-x-2 text-foreground/90">
            <MapPin className="w-5 h-5" />
            <span className="text-lg font-medium">London</span>
          </div>
          
          {/* Pronouns Row */}
          <div className="flex items-center justify-center space-x-2 text-foreground/90">
            <User className="w-5 h-5" />
            <span className="text-lg font-medium">he/him</span>
          </div>
        </motion.div>
        
        {siteConfig.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
          >
            {siteConfig.tagline}
          </motion.p>
        )}
      </div>
    </motion.header>
  );
}