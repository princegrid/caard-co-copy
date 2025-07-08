export interface SiteConfig {
  name: string;
  tagline?: string;
  avatar: string;
  bio: string;
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
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
  bio: `xxxxfjpdsojfslkjdfsdf
`,
  personalGifs: [
    "https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif",
    "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif"
  ],
  location: "London",
  interests: ["Photography", "Coffee", "Minimalism", "Open Source", "Travel"],
  currentProjects: ["Building a design system", "Learning Three.js", "Contributing to React"],
  status: "Available for freelance work",
  social: {
    twitter: "https://twitter.com/alexthompson",
    discord: "alexthompson#1234",
    spotify: "https://open.spotify.com/user/alexthompson",
    github: "https://github.com/alexthompson",
    email: "alex@example.com"
  },
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID || "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN || ""
  }
};