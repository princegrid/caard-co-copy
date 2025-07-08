"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Briefcase, Activity } from "lucide-react";
import { siteConfig } from "@/site.config";

export function ExtraInfo() {
  const infoSections = [
    {
      title: "Location",
      icon: MapPin,
      content: siteConfig.location,
      show: !!siteConfig.location
    },
    {
      title: "Interests",
      icon: Heart,
      content: siteConfig.interests,
      show: siteConfig.interests && siteConfig.interests.length > 0
    },
    {
      title: "Current Projects",
      icon: Briefcase,
      content: siteConfig.currentProjects,
      show: siteConfig.currentProjects && siteConfig.currentProjects.length > 0
    },
    {
      title: "Status",
      icon: Activity,
      content: siteConfig.status,
      show: !!siteConfig.status
    }
  ].filter(section => section.show);

  if (infoSections.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-center bg-background/85 backdrop-blur-sm rounded-lg p-4 mx-auto max-w-fit"
        >
          More About Me
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {infoSections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-background/85 backdrop-blur-sm border-background/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Icon className="w-5 h-5 text-primary" />
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.isArray(section.content) ? (
                      <div className="flex flex-wrap gap-2">
                        {section.content.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}