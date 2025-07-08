import { BookOpenText, Gamepad2 } from 'lucide-react'; // 1. Import icons

// Define the BioItem interface
export interface BioItem {
  title: string;
  icon: any;
  description: string;
}

export interface SiteConfig {
  name: string;
  tagline?: string;
  avatar: string;
  bio: BioItem[]; // 2. Update the bio type to be an array of BioItem
  personalGifs?: string[];
  location?: string;
  interests?: string[];
  currentProjects?: string[];
  status?: string;
  social: {
    twitter?: string;
    discord?: string;
    spotify?: string;
    github?: string;
    email?: string;
  };
  spotify: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Grid",
  tagline: "@princegrid",
  avatar: "/pfp.jpg",
 bio: [
    {
      title: "web novels",
      icon: BookOpenText,
      description: "orv, overgeared, the second coming of gluttony, and many more."
    },
    {
      title: "games",
      icon: Gamepad2,
      description: "val, dbd, genshin, roblox, mc, etc"
    }
  ],
   personalGifs: [
    "/gallery/kagurabachi.gif",
    "/gallery/flowers.gif",
    "/gallery/sukuna.gif",
    "/gallery/friend.jpg",
    "/gallery/spamton.jpg",
    "/gallery/yjh.jpg",
  ],
  social: {
    twitter: "https://twitter.com/princegrid",
    github: "https://github.com/princegrid",
    discord: "https://discord.com/users/710963509910962258",
    spotify: "https://open.spotify.com/user/55fgixuwkna15dsw5tytgxble"
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN || ""
  }
};
