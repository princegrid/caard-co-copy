"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, MessageCircle, Music, Github, Mail } from "lucide-react";
import { siteConfig } from "@/site.config";

const socialIcons = {
  twitter: Twitter,
  discord: MessageCircle,
  spotify: Music,
  github: Github,
  email: Mail,
};

export function SocialIcons() {
  const socialEntries = Object.entries(siteConfig.social).filter(([, value]) => value);

  if (socialEntries.length === 0) return null;

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
          Connect With Me
        </motion.h2>
        
        <Card className="bg-background/85 backdrop-blur-sm border-background/20">
          <CardContent className="p-8">
            <div className="flex flex-wrap justify-center gap-4">
              {socialEntries.map(([platform, url], index) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;

                const isEmail = platform === 'email';
                const href = isEmail ? `mailto:${url}` : url;
                const label = isEmail ? url : `Follow me on ${platform}`;

                return (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="w-16 h-16 rounded-full p-0 border-2 hover:border-primary/50 transition-colors duration-200"
                      >
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                        >
                          <Icon className="w-6 h-6" />
                        </a>
                      </Button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
}