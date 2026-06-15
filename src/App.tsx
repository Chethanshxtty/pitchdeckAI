import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { AppShell } from "./components/AppShell";
import { Logo } from "./components/Logo";
import "./App.css";

function App() {
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);

  // Smooth scroll helper for navbar links
  const handleNavigate = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the section doesn't exist, we can toggle the workspace as demo redirect
      setIsWorkspaceActive(true);
    }
  };

  if (isWorkspaceActive) {
    return (
      <div className="animate-fade-in">
        <AppShell onBackToLanding={() => setIsWorkspaceActive(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative animate-fade-in">
      {/* Floating Header Navbar */}
      <Navbar
        onStartFree={() => setIsWorkspaceActive(true)}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          onBuildDeck={() => setIsWorkspaceActive(true)}
          onSeeTemplates={() => setIsWorkspaceActive(true)}
        />

        {/* Features Section */}
        <Features />
      </main>

      {/* Footer Section */}
      <footer className="bg-background border-t border-border/20 py-12 px-8 lg:px-16 text-center md:text-left z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Logo textSize="text-sm" iconSize={18} className="mb-3 justify-center md:justify-start" />
            <p className="text-xs text-muted-foreground/60 font-light">
              Built by student founders, for student founders. Competition-ready pitch layouts in seconds.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] uppercase tracking-widest text-muted-foreground">
            <button 
              onClick={() => setIsWorkspaceActive(true)} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setIsWorkspaceActive(true)} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button 
              onClick={() => setIsWorkspaceActive(true)} 
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border/10 text-center text-[10px] text-muted-foreground/40 font-light">
          &copy; {new Date().getFullYear()} PitchDeck AI. All rights reserved. Powered by Generative AI.
        </div>
      </footer>
    </div>
  );
}

export default App;
