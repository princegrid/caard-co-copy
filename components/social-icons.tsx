"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaDiscord, FaSpotify, FaGithub, FaEnvelope } from "react-icons/fa";
import { siteConfig } from "@/site.config";

const socialIconsMap = {
  twitter: FaTwitter,
  discord: FaDiscord, // Use the proper Discord icon
  spotify: FaSpotify,
  github: FaGithub,
  email: FaEnvelope,
};

export function SocialIcons() {
  const socialEntries = Object.entries(siteConfig.social).filter(([, value]) => value);

  if (socialEntries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="w-full bg-black/20 backdrop-blur-lg rounded-2xl p-4"
    >
      <div className="flex flex-wrap justify-center gap-4">
        {socialEntries.map(([platform, url]) => {
          // Use Discord icon from lucide-react if platform is discord
          const Icon =
            platform === "discord"
              ? FaDiscord
              : socialIconsMap[platform as keyof typeof socialIconsMap];
          if (!Icon) return null;

          const isEmail = platform === 'email';
          const href = isEmail ? `mailto:${url}` : url;

          return (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}