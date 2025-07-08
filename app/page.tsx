"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { AboutSection } from "@/components/about-section";
import { SocialIcons } from "@/components/social-icons";
import { SpotifyWidget } from "@/components/spotify-widget";
import { ExtraInfo } from "@/components/extra-info";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[12px] bg-background/30" />
      </div>

      {/* Content with transparency */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Header />
        <AboutSection />
        <SocialIcons />
        <SpotifyWidget />
        <ExtraInfo />
        
        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 px-4 text-center"
        >
          <div className="max-w-2xl mx-auto bg-background/85 backdrop-blur-sm rounded-lg p-6">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: 1 }}
              transition={{ duration: 0.8 }}
              className="w-24 mx-auto mb-6 bg-border"
            />
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
}