import { Header } from "@/components/header";
import { SocialIcons } from "@/components/social-icons";
import { SpotifyWidget } from "@/components/spotify-widget";
import { About } from "@/components/about"; // Use the new component

export default function Home() {
  return (
    <div className="min-h-screen w-full relative font-sans text-white">
      {/* Background & Overlay */}
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.gif')" 
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Centered Content */}
      <main className="relative z-10 flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-xs space-y-4">
          <Header />
          <SocialIcons />
          <About /> {/* Add the new About component here */}
          <SpotifyWidget />
        </div>
      </main>
    </div>
  );
}