import React from "react";
import { Logo } from "./Logo";

interface NavbarProps {
  onStartFree: () => void;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartFree, onNavigate }) => {
  const links = ["Features", "Templates", "How It Works", "Pricing"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 lg:px-16 py-5 bg-[#09090b]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      {/* Left: Logo */}
      <button 
        onClick={() => onNavigate("hero")}
        className="cursor-pointer group hover:opacity-90 active:scale-95 transition-all text-left"
      >
        <Logo textSize="text-xl" iconSize={26} />
      </button>

      {/* Center: Nav links with bottom hover border animations */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => onNavigate(link.toLowerCase().replace(/\s+/g, "-"))}
            className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest font-semibold relative py-1 group transition-colors cursor-pointer"
          >
            {link}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        ))}
        <button
          onClick={onStartFree}
          className="text-xs text-zinc-400 hover:text-white uppercase tracking-widest font-semibold relative py-1 group transition-colors cursor-pointer"
        >
          Sign In
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>
      </div>

      {/* Right: Premium glowing start button */}
      <button
        onClick={onStartFree}
        className="bg-zinc-900 text-foreground hover:bg-zinc-800 hover:border-primary/40 active:scale-[0.97] rounded-full uppercase text-[10px] font-bold tracking-widest px-6 py-2.5 transition-all duration-200 hidden md:inline-flex cursor-pointer border border-zinc-800 shadow-md shadow-black/40"
      >
        Start Free
      </button>
    </nav>
  );
};
