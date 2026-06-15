import React, { Suspense } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

interface HeroProps {
  onBuildDeck: () => void;
  onSeeTemplates: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBuildDeck, onSeeTemplates }) => {
  return (
    <section className="relative min-h-screen flex items-end bg-[#09090b] overflow-hidden">
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none z-[1]" />

      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-[1] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-[1] animate-float [animation-delay:2s]" />

      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-[#09090b] animate-pulse" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>

      {/* Dark overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1] pointer-events-none" />

      {/* Content Container (anchored bottom-left) */}
      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-3xl px-6 md:px-12 lg:px-16 pb-20 pt-32">
        
        {/* Eyebrow Pill Badge (delay 0.1s) */}
        <div className="opacity-0 animate-fade-up delay-100 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/25 bg-primary/5 text-primary text-[10px] tracking-[0.2em] font-semibold mb-5 w-fit shadow-md shadow-primary/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          AI-POWERED · STUDENT-BUILT · COMPETITION-READY
        </div>

        {/* Heading with rich dual-gradient (delay 0.2s) */}
        <h1 className="opacity-0 animate-fade-up delay-200 text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.05em] uppercase mb-4">
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent block sm:inline mr-2">PITCH</span>
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent block sm:inline">DECK AI</span>
        </h1>

        {/* Subheading (delay 0.4s) */}
        <p className="opacity-0 animate-fade-up delay-400 text-zinc-200 text-[clamp(1.1rem,2.2vw,1.65rem)] font-light mb-4 leading-relaxed max-w-lg">
          Your idea deserves a great first impression.
        </p>

        {/* Description (delay 0.55s) */}
        <p className="opacity-0 animate-fade-up delay-550 text-zinc-400 text-[clamp(0.85rem,1.4vw,1rem)] font-light mb-6 md:mb-8 leading-relaxed max-w-xl">
          Describe your startup in plain words. PitchDeck AI structures it into a competition-ready deck — problem, solution, market, team, ask. Drag, tweak, and walk into the room confident.
        </p>

        {/* CTA Buttons with glow effects (delay 0.7s) */}
        <div className="opacity-0 animate-fade-up delay-700 flex flex-wrap gap-4 font-bold pointer-events-auto mb-8">
          <button
            onClick={onBuildDeck}
            className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-wider uppercase rounded-lg hover:brightness-110 active:scale-[0.97] transition-all cursor-pointer font-bold shadow-lg shadow-primary/25 hover:shadow-primary/45 border border-primary/20"
          >
            Build My Deck
          </button>
          <button
            onClick={onSeeTemplates}
            className="bg-zinc-900/90 text-foreground border border-zinc-800 px-8 py-4 text-xs tracking-wider uppercase rounded-lg hover:bg-zinc-850 hover:border-zinc-700 active:scale-[0.97] transition-all cursor-pointer font-bold backdrop-blur-sm"
          >
            See Templates
          </button>
        </div>

        {/* Trust line (delay 0.85s) */}
        <p className="opacity-0 animate-fade-up delay-850 text-zinc-500 text-xs font-light tracking-wide flex items-center gap-2">
          <span>Used by 200+ student founders</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Wins at 12 college competitions</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span>Free to start</span>
        </p>
      </div>

      {/* Floating Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-0 animate-fade-in delay-850 z-10 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">Discover</span>
        <div className="w-5 h-8 border border-zinc-800 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
