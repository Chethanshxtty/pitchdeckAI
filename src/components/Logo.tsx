import React from "react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconSize = 22, textSize = "text-base" }) => {
  return (
    <div className={`flex items-center gap-2 select-none group/logo ${className}`}>
      {/* Dynamic isometric stacked slide graphic */}
      <div 
        className="relative flex-shrink-0 transition-transform duration-300 group-hover/logo:scale-105 group-hover/logo:rotate-3"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Isometric Transform Group */}
          <g style={{ transform: "skewY(-6deg)" }}>
            {/* Background Slide Layer (zinc styling) */}
            <rect 
              x="2" 
              y="7" 
              width="13" 
              height="10" 
              rx="1.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="rgba(255,255,255,0.03)" 
              className="text-zinc-700 group-hover/logo:text-zinc-600 transition-colors"
            />
            
            {/* Foreground Slide Layer (emerald glow) */}
            <rect 
              x="9" 
              y="3" 
              width="13" 
              height="10" 
              rx="1.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="rgba(16,185,129,0.08)" 
              className="text-primary"
            />
            
            {/* Miniature analytics line chart on slide face */}
            <path 
              d="M12 9L15 6L18 9H20" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-emerald-300"
            />
          </g>
        </svg>
      </div>

      {/* Styled Wordmark */}
      <div className={`font-bold tracking-tight uppercase flex items-center leading-none ${textSize}`}>
        <span className="text-white font-extrabold transition-colors group-hover/logo:text-primary">PITCH</span>
        <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent ml-0.5 font-extrabold">
          DECK
        </span>
        <span className="text-primary text-[8px] font-mono font-bold tracking-widest ml-1 border border-primary/20 px-1 py-0.5 rounded bg-primary/5 uppercase scale-90 origin-left">
          AI
        </span>
      </div>
    </div>
  );
};
