import React from "react";
import { 
  Presentation, 
  GripHorizontal, 
  Download, 
  LayoutTemplate, 
  Users, 
  ShieldCheck 
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const Features: React.FC = () => {
  const features: FeatureCard[] = [
    {
      icon: <Presentation size={22} className="text-primary transition-transform group-hover:scale-110" />,
      title: "AI Slide Writer",
      desc: "Type your startup idea. AI fills in the slide content, taglines, and structure automatically.",
    },
    {
      icon: <GripHorizontal size={22} className="text-primary transition-transform group-hover:scale-110" />,
      title: "Drag & Drop Editor",
      desc: "Arrange, reorder, and resize slides on a visual canvas. No design skills required.",
    },
    {
      icon: <Download size={22} className="text-primary transition-transform group-hover:scale-110" />,
      title: "Instant PDF Export",
      desc: "Export a polished, competition-ready PDF or present live from the app in one tap.",
    },
    {
      icon: <LayoutTemplate size={22} className="text-primary transition-transform group-hover:scale-110" />,
      title: "Proven Templates",
      desc: "Problem → Solution → Market → Team → Ask. Structured for hackathons, incubators, and investor pitches.",
    },
    {
      icon: <Users size={22} className="text-primary transition-transform group-hover:scale-110" />,
      title: "Team Collaboration",
      desc: "Invite teammates, leave comments, and build your deck together in real time.",
    },
    {
      icon: <ShieldCheck size={22} className="text-primary transition-transform group-hover:scale-110" />,
      title: "Pitch Coach (AI)",
      desc: "Get instant AI feedback on your slide clarity, flow, and investor-readiness score.",
    },
  ];

  return (
    <section id="features" className="relative bg-[#09090b] border-t border-white/5 px-8 lg:px-16 py-28 z-20 overflow-hidden">
      
      {/* Decorative Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      {/* Subtle corner light source */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Headings */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-primary text-[10px] tracking-[0.25em] uppercase font-bold px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5">
            WHAT IT DOES
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-16 max-w-xl leading-[1.15]">
          From idea to investor-ready in minutes.
        </h2>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 border border-zinc-800/80 rounded-xl p-7 hover:border-primary/35 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top accent glow line that displays on hover */}
              <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              
              {/* Icon Box */}
              <div className="mb-5 bg-zinc-900/85 w-11 h-11 flex items-center justify-center rounded-xl border border-zinc-850 group-hover:border-primary/25 group-hover:bg-zinc-850 transition-colors shadow-inner shadow-black/25">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight uppercase text-xs tracking-wider">
                {feature.title}
              </h3>
              
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
