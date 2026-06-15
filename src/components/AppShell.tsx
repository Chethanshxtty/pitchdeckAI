import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import {
  Download,
  LayoutTemplate,
  ShieldCheck,
  Plus,
  Play,
  ArrowLeft,
  Sparkles,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette
} from "lucide-react";

interface Slide {
  id: string;
  type: string; // 'title' | 'problem' | 'solution' | 'market' | 'ask'
  title: string;
  content: string;
  meta: string;
}

interface AppShellProps {
  onBackToLanding: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState<"decks" | "coach" | "templates">("decks");
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  
  // Prompt input
  const [promptInput, setPromptInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  
  // Slides state
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);
  
  // PDF Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  // Editor customization controls (Interactive UI Simulation)
  const [activeFont, setActiveFont] = useState("Sora");
  const [activeAlign, setActiveAlign] = useState<"left" | "center" | "right">("left");
  const [activeTheme, setActiveTheme] = useState<"green" | "blue" | "purple">("green");

  // Suggested quick prompts
  const samplePrompts = [
    { name: "SmartDorm IoT Hub", text: "AI-powered IoT hubs inside college dorms to automate maintenance requests and reduce RA workload." },
    { name: "StudyBuddy Matcher", text: "A Tinder-like matching app for college students looking for study partners based on classes and GPAs." },
    { name: "EcoCup Campus", text: "A smart reusable cup sharing program for campus coffee shops using RFID tagging and rewards." }
  ];

  // AI Gen stages
  const generationStages = [
    "Analyzing startup description...",
    "Defining core problem outline...",
    "Formulating matching solution structure...",
    "Estimating student market opportunity size...",
    "Drafting 'The Ask' and funding milestones...",
    "Finalizing premium deck aesthetics..."
  ];

  useEffect(() => {
    let timer: number;
    if (isGenerating) {
      timer = window.setInterval(() => {
        setGenerationStep((prev) => {
          if (prev >= generationStages.length - 1) {
            clearInterval(timer);
            setIsGenerating(false);
            setGenerationStep(0);
            return 0;
          }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isGenerating]);

  // Handle slide generation
  const handleGenerate = (descText: string) => {
    if (!descText.trim()) return;
    setIsGenerating(true);
    setGenerationStep(0);

    const isDorm = descText.toLowerCase().includes("dorm") || descText.toLowerCase().includes("iot");
    const isStudy = descText.toLowerCase().includes("study") || descText.toLowerCase().includes("partner");
    
    setTimeout(() => {
      const newSlides: Slide[] = [
        {
          id: "1",
          type: "title",
          title: isDorm ? "SmartDorm IoT" : isStudy ? "StudyBuddy Matcher" : "EcoCup Sharing",
          content: isDorm 
            ? "Revamping student housing with AI-integrated room diagnostics and real-time maintenance hubs." 
            : isStudy 
              ? "Swipe right on your next A+. Connect with students in your courses instantly."
              : "Zero-waste coffee sharing across university dining centers using automated smart collection kiosks.",
          meta: "PITCHDECK AI · TITLE SLIDE"
        },
        {
          id: "2",
          type: "problem",
          title: "The Friction Point",
          content: isDorm
            ? "Resident assistants are overwhelmed. Dorm maintenance requests take average of 7 days for resolution, leading to student frustration and water/electricity waste."
            : isStudy
              ? "42% of first-year students report feeling isolated. Finding collaborative classmates in major-specific lecture halls of 300+ students is highly inefficient."
              : "Single-use cups represent 80% of dining waste. Campus cafes go through 15,000 plastic cups daily, costing universities high waste disposal fees.",
          meta: "PITCHDECK AI · THE PROBLEM"
        },
        {
          id: "3",
          type: "solution",
          title: "The Innovation",
          content: isDorm
            ? "An automated IoT hub installed in dorm rooms. Diagnoses appliance faults instantly and logs requests in 30 seconds via unified dashboard."
            : isStudy
              ? "A geolocation study app linking schedules and courses. Match based on project needs, GPA tiers, and active campus libraries."
              : "Smart cup libraries. Borrow cups at register using RFID, scan and drop off at any return kiosk to unlock discount credits.",
          meta: "PITCHDECK AI · THE SOLUTION"
        },
        {
          id: "4",
          type: "market",
          title: "Market Sizing",
          content: isDorm
            ? "TAM: $24B Student Housing Tech\nSAM: $3.2B US University Upgrades\nSOM: $120M Local Region Dorms (30+ Colleges)"
            : isStudy
              ? "TAM: $12B EdTech Mobile Services\nSAM: $1.8B College Collaboration Tools\nSOM: $45M Pilot Launch in State University Systems"
              : "TAM: $9B Eco-Friendly Dining Initiatives\nSAM: $800M Campus Coffee Shop Supplies\nSOM: $22M Mid-Atlantic College Campus Cafes",
          meta: "PITCHDECK AI · MARKET OPPORTUNITY"
        },
        {
          id: "5",
          type: "ask",
          title: "The Pitch Ask",
          content: isDorm
            ? "Seeking $150k seed funding for hardware prototype optimization, FCC certification compliance, and 3 regional university campus trials next Fall."
            : isStudy
              ? "Seeking $50k funding for database hosting, AWS scaling, and campus ambassador marketing program across 10 major universities."
              : "Seeking $120k for RFID cup inventory production, automated return kiosk builds, and launching 2 campus-wide pilot integrations.",
          meta: "PITCHDECK AI · THE ASK"
        }
      ];
      setSlides(newSlides);
      setSelectedDeckId("deck-demo");
      setActiveSlideIdx(0);
    }, generationStages.length * 900);
  };

  // Reorder slides
  const moveSlide = (direction: "up" | "down", idx: number) => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === slides.length - 1) return;
    
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const newSlides = [...slides];
    const temp = newSlides[idx];
    newSlides[idx] = newSlides[targetIdx];
    newSlides[targetIdx] = temp;
    
    setSlides(newSlides);
    setActiveSlideIdx(targetIdx);
  };

  // Handle slide edit
  const handleSlideChange = (field: "title" | "content", value: string) => {
    const updated = [...slides];
    updated[activeSlideIdx] = {
      ...updated[activeSlideIdx],
      [field]: value
    };
    setSlides(updated);
  };

  // Optimize with AI
  const optimizeWithAI = () => {
    if (slides.length === 0) return;
    const current = slides[activeSlideIdx];
    let optimizedText = current.content;

    if (current.type === "problem") {
      optimizedText = "Maintenance lag bottlenecks housing efficiency. RAs spend 10+ hours/week coordinating repairs. Students suffer 7-day delays while resources (water/power) drain unmonitored.";
    } else if (current.type === "solution") {
      optimizedText = "A plug-and-play IoT room sensor. Auto-detects electrical/plumbing anomalies. Files API-backed repair orders in 30 seconds, reducing RA manual tasks by 85%.";
    } else if (current.type === "market") {
      optimizedText = "TAM: $24.0 Billion (Student Housing Sector)\nSAM: $3.2 Billion (Target US Dorm Upgrades)\nSOM: $120.0 Million (30 Regional Campus Pilots in Year 1)";
    } else if (current.type === "ask") {
      optimizedText = "Seeking $150,000 for manufacturing 500 pre-series devices, finishing FCC regulatory clearances, and deploying in 3 contracted university pilots.";
    } else if (current.type === "title") {
      optimizedText = "Next-Generation Dorm Operations. Standardizing hardware sensors and instant dashboard tickets for university facilities.";
    }

    const updated = [...slides];
    updated[activeSlideIdx] = {
      ...updated[activeSlideIdx],
      content: optimizedText
    };
    setSlides(updated);
  };

  // Pitch coach calculations
  const activeSlide = slides[activeSlideIdx];
  const getPitchCoachMetrics = () => {
    if (!activeSlide) return { score: 0, items: [], status: "No slide selected" };
    
    const textLength = activeSlide.content.length;
    const containsNumbers = /\d/.test(activeSlide.content);

    if (activeSlide.type === "title") {
      return {
        score: textLength > 10 && textLength < 80 ? 92 : 72,
        status: "Strong Title",
        items: [
          { type: "success", text: "Slogan is punchy and describes startup domain." },
          { type: "info", text: "Ensure subtitle references college/student relevance." }
        ]
      };
    }
    if (activeSlide.type === "problem") {
      return {
        score: containsNumbers ? 95 : 68,
        status: containsNumbers ? "Highly Persuasive" : "Needs Metrics",
        items: [
          { type: containsNumbers ? "success" : "warning", text: containsNumbers ? "Great use of percentages/delay counts." : "Quantify student pain (e.g. average days delayed or hours lost)." },
          { type: "success", text: "Clearly outlines the resident conflict factor." }
        ]
      };
    }
    if (activeSlide.type === "solution") {
      return {
        score: textLength > 60 && textLength < 160 ? 90 : 75,
        status: "Good Clarity",
        items: [
          { type: "success", text: "Explains how the technology solves the problem directly." },
          { type: "info", text: "Explain your proprietary edge — what keeps competitors out?" }
        ]
      };
    }
    if (activeSlide.type === "market") {
      const hasSizing = activeSlide.content.includes("TAM") && activeSlide.content.includes("SAM");
      return {
        score: hasSizing ? 98 : 60,
        status: hasSizing ? "Investor-Grade" : "Invalid Structure",
        items: [
          { type: hasSizing ? "success" : "warning", text: hasSizing ? "TAM/SAM/SOM framework detected and clearly labeled." : "Must include TAM, SAM, and SOM figures for standard pitches." },
          { type: "info", text: "Ensure citations are ready for your market growth assumptions." }
        ]
      };
    }
    if (activeSlide.type === "ask") {
      return {
        score: containsNumbers && textLength > 40 ? 94 : 70,
        status: "Direct Ask",
        items: [
          { type: containsNumbers ? "success" : "warning", text: containsNumbers ? "Target monetary figure is explicitly stated." : "Specify exactly how much cash is needed to scale." },
          { type: "success", text: "Breakdown of funding deployment is listed." }
        ]
      };
    }
    return { score: 80, items: [], status: "Ready" };
  };

  const coachMetrics = getPitchCoachMetrics();

  // Color mappings for active slide theme
  const getThemeStyles = () => {
    switch (activeTheme) {
      case "blue":
        return {
          bg: "bg-zinc-950",
          textAccent: "text-sky-400",
          borderAccent: "border-sky-500/20",
          badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
          dot: "bg-sky-500",
          linearAccent: "from-sky-400 via-blue-400 to-sky-500"
        };
      case "purple":
        return {
          bg: "bg-zinc-950",
          textAccent: "text-purple-400",
          borderAccent: "border-purple-500/20",
          badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
          dot: "bg-purple-500",
          linearAccent: "from-purple-400 via-indigo-400 to-purple-500"
        };
      case "green":
      default:
        return {
          bg: "bg-zinc-950",
          textAccent: "text-primary",
          borderAccent: "border-primary/20",
          badge: "bg-primary/10 text-primary border-primary/20",
          dot: "bg-primary",
          linearAccent: "from-emerald-400 via-green-400 to-emerald-500"
        };
    }
  };

  const activeThemeStyles = getThemeStyles();

  // Export PDF Simulation
  const triggerExport = () => {
    if (slides.length === 0) return;
    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);
    
    const interval = setInterval(() => {
      setExportProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            setExportComplete(true);
            setTimeout(() => setExportComplete(false), 4000);
          }, 500);
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  // SVG parameters for Pitch Coach Circular Score
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (coachMetrics.score / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sora relative overflow-hidden">
      
      {/* Background visual helpers */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[550px] h-[550px] bg-primary/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none z-0" />

      {/* Top Header Panel */}
      <header className="h-16 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-xl px-6 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer font-semibold shadow-inner"
          >
            <ArrowLeft size={13} />
            Exit Editor
          </button>
          <div className="h-4 w-[1px] bg-zinc-800 mx-2" />
          <Logo textSize="text-sm" iconSize={20} />
          <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-bold">
            Studio
          </span>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          {slides.length > 0 && (
            <>
              <button 
                onClick={() => setPresentationMode(true)}
                className="flex items-center gap-2 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 px-4 py-2 rounded-lg active:scale-95 transition-all cursor-pointer"
              >
                <Play size={13} className="text-primary fill-primary" />
                Present
              </button>
              <button 
                onClick={triggerExport}
                className="flex items-center gap-2 text-xs font-bold bg-primary text-primary-foreground hover:brightness-110 px-5 py-2.5 rounded-lg active:scale-95 transition-all cursor-pointer shadow-lg shadow-primary/20 border border-primary/10"
              >
                <Download size={13} />
                Export PDF
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Studio Frame */}
      <div className="flex-1 flex overflow-hidden z-20">
        
        {/* Left Sidebar Menu */}
        <aside className="w-16 md:w-60 border-r border-zinc-800 bg-[#09090b]/40 backdrop-blur-xl flex flex-col justify-between py-6">
          <div className="space-y-6">
            <div className="px-4 hidden md:block">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2">Build tools</p>
            </div>
            <nav className="space-y-1.5 px-2">
              <button
                onClick={() => setActiveTab("decks")}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "decks"
                    ? "bg-zinc-900 text-primary border border-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                }`}
              >
                <Plus size={15} />
                <span className="hidden md:inline">Slide Creator</span>
              </button>
              
              <button
                onClick={() => {
                  if (slides.length === 0) return;
                  setActiveTab("coach");
                }}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "coach"
                    ? "bg-zinc-900 text-primary border border-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                }`}
              >
                <ShieldCheck size={15} />
                <span className="hidden md:inline">AI Pitch Coach</span>
              </button>

              <button
                onClick={() => setActiveTab("templates")}
                className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "templates"
                    ? "bg-zinc-900 text-primary border border-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                }`}
              >
                <LayoutTemplate size={15} />
                <span className="hidden md:inline">Quick Templates</span>
              </button>
            </nav>
          </div>

          <div className="px-3">
            <div className="hidden md:flex items-center gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80">
              <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shadow-inner">
                SE
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-white truncate">Student Founder</p>
                <p className="text-[9px] text-zinc-500 truncate">se@university.edu</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Central Workspace Panel */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden bg-background">
          
          {/* Deck Creation initial Screen */}
          {!selectedDeckId ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto overflow-y-auto w-full">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mb-6 animate-pulse">
                <Sparkles size={26} className="text-primary" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase mb-2">
                Generate A Pitch Deck
              </h2>
              <p className="text-zinc-400 text-sm font-light max-w-lg mb-8 leading-relaxed">
                Describe your startup in plain language. PitchDeck AI structures it into a competition-ready deck with dedicated slides.
              </p>

              {/* Input Prompt Box */}
              <div className="w-full max-w-xl bg-zinc-900/35 border border-zinc-850 rounded-xl p-4 shadow-2xl backdrop-blur-md mb-8 relative">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe your student startup. e.g. An Uber for tutoring on college campuses. Tutors set their rates and locations, and students hire them for instant in-person study help..."
                  className="w-full h-28 bg-transparent text-sm font-light text-white border-0 focus:ring-0 resize-none outline-none placeholder:text-zinc-600"
                  disabled={isGenerating}
                />
                
                <div className="flex justify-between items-center border-t border-zinc-800/60 pt-3 mt-3">
                  <div className="flex gap-2">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Active Engine: Gemini Pro</span>
                  </div>
                  <button
                    onClick={() => handleGenerate(promptInput)}
                    disabled={isGenerating || !promptInput.trim()}
                    className={`flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg active:scale-95 transition-all ${
                      promptInput.trim() && !isGenerating
                        ? "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/25 cursor-pointer"
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-850"
                    }`}
                  >
                    <Sparkles size={13} />
                    Generate Slide Deck
                  </button>
                </div>
              </div>

              {/* Presets Grid */}
              <div className="w-full max-w-xl text-left">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Or choose a preset idea:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPromptInput(p.text)}
                      className="text-left bg-zinc-950/80 border border-zinc-850 hover:border-primary/45 p-3.5 rounded-lg text-xs font-light leading-relaxed transition-all cursor-pointer hover:bg-zinc-900/40"
                    >
                      <span className="text-primary font-bold block mb-1 text-[11px] uppercase tracking-wider">{p.name}</span>
                      <span className="text-zinc-500 line-clamp-3 leading-relaxed">{p.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            
            /* Active Editor Workspace View */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden w-full">
              
              {/* Left Slide Navigator Strip */}
              <div className="w-full md:w-52 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/20 flex flex-row md:flex-col p-4 gap-3.5 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
                <div className="hidden md:flex justify-between items-center mb-1 px-1">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Slides</p>
                  <button 
                    onClick={() => {
                      setSelectedDeckId(null);
                      setSlides([]);
                      setPromptInput("");
                    }}
                    className="text-[9px] text-primary font-bold hover:underline uppercase tracking-wider"
                  >
                    Reset
                  </button>
                </div>
                
                {slides.map((slide, idx) => (
                  <div 
                    key={slide.id}
                    onClick={() => setActiveSlideIdx(idx)}
                    className={`flex-shrink-0 w-28 md:w-full border rounded-xl p-3 text-left cursor-pointer transition-all relative group ${
                      idx === activeSlideIdx
                        ? "bg-zinc-900/90 border-primary shadow-xl shadow-primary/5"
                        : "bg-[#09090b]/60 border-zinc-850 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded uppercase ${
                        idx === activeSlideIdx ? "bg-primary/10 text-primary" : "bg-zinc-800 text-zinc-400"
                      }`}>{slide.type}</span>
                      <span className="text-[9px] font-mono text-zinc-600">0{idx + 1}</span>
                    </div>
                    <h4 className="text-[10px] font-bold text-white truncate mb-1 uppercase tracking-wide">{slide.title}</h4>
                    <p className="text-[9px] text-zinc-500 line-clamp-2 leading-relaxed font-light">{slide.content}</p>
                    
                    {/* Move controls */}
                    <div className="flex items-center justify-end gap-1 mt-2.5 border-t border-zinc-800/50 pt-2 opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSlide("up", idx);
                        }}
                        disabled={idx === 0}
                        className="text-zinc-500 hover:text-white disabled:opacity-25 disabled:hover:text-zinc-500 cursor-pointer"
                      >
                        <ChevronUp size={11} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          moveSlide("down", idx);
                        }}
                        disabled={idx === slides.length - 1}
                        className="text-zinc-500 hover:text-white disabled:opacity-25 disabled:hover:text-zinc-500 cursor-pointer"
                      >
                        <ChevronDown size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Canvas Editor Area */}
              <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#070709] relative">
                
                {/* Floating design toolbar */}
                <div className="max-w-3xl w-full mx-auto mb-4 bg-zinc-900/80 border border-zinc-850 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xl backdrop-blur-md z-10">
                  <div className="flex items-center gap-4 text-xs">
                    
                    {/* Font Selector */}
                    <div className="flex items-center gap-1.5">
                      <Type size={12} className="text-zinc-500" />
                      <select 
                        value={activeFont}
                        onChange={(e) => setActiveFont(e.target.value)}
                        className="bg-transparent border-0 text-[10px] text-zinc-300 font-semibold focus:ring-0 cursor-pointer outline-none"
                      >
                        <option value="Sora" className="bg-zinc-900 text-white">Sora</option>
                        <option value="sans-serif" className="bg-zinc-900 text-white">Sans-Serif</option>
                        <option value="monospace" className="bg-zinc-900 text-white">Monospace</option>
                      </select>
                    </div>

                    <div className="h-4 w-[1px] bg-zinc-800" />

                    {/* Text Align */}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setActiveAlign("left")}
                        className={`p-1 rounded transition-colors cursor-pointer ${activeAlign === "left" ? "bg-zinc-800 text-primary" : "text-zinc-500 hover:text-zinc-300"}`}
                      >
                        <AlignLeft size={12} />
                      </button>
                      <button 
                        onClick={() => setActiveAlign("center")}
                        className={`p-1 rounded transition-colors cursor-pointer ${activeAlign === "center" ? "bg-zinc-800 text-primary" : "text-zinc-500 hover:text-zinc-300"}`}
                      >
                        <AlignCenter size={12} />
                      </button>
                      <button 
                        onClick={() => setActiveAlign("right")}
                        className={`p-1 rounded transition-colors cursor-pointer ${activeAlign === "right" ? "bg-zinc-800 text-primary" : "text-zinc-500 hover:text-zinc-300"}`}
                      >
                        <AlignRight size={12} />
                      </button>
                    </div>

                    <div className="h-4 w-[1px] bg-zinc-800" />

                    {/* Slide Colors */}
                    <div className="flex items-center gap-2">
                      <Palette size={12} className="text-zinc-500" />
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => setActiveTheme("green")}
                          className={`w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 transition-transform cursor-pointer ${activeTheme === "green" ? "border-white scale-110" : "border-transparent"}`}
                        />
                        <button 
                          onClick={() => setActiveTheme("blue")}
                          className={`w-3.5 h-3.5 rounded-full bg-sky-500 border-2 transition-transform cursor-pointer ${activeTheme === "blue" ? "border-white scale-110" : "border-transparent"}`}
                        />
                        <button 
                          onClick={() => setActiveTheme("purple")}
                          className={`w-3.5 h-3.5 rounded-full bg-purple-500 border-2 transition-transform cursor-pointer ${activeTheme === "purple" ? "border-white scale-110" : "border-transparent"}`}
                        />
                      </div>
                    </div>

                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Aesthetics configured</span>
                </div>

                {/* Canvas Body Frame */}
                <div className="max-w-3xl w-full mx-auto space-y-6">
                  
                  {/* Aspect Card Slide Container */}
                  <div className={`aspect-[16/9] w-full ${activeThemeStyles.bg} border border-zinc-800 rounded-xl p-8 md:p-10 relative flex flex-col justify-between shadow-2xl backdrop-blur-md`}>
                    
                    {/* Active highlight border top */}
                    <span className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${activeThemeStyles.linearAccent}`} />

                    {/* Canvas Header */}
                    <div className="flex justify-between items-start border-b border-zinc-850 pb-4">
                      <div>
                        <span className={`text-[8px] font-mono ${activeThemeStyles.textAccent} tracking-[0.2em] font-bold uppercase`}>
                          PITCHDECK // CANVAS ENGINE
                        </span>
                        <div className="text-[10px] text-zinc-500 mt-0.5 font-light font-mono">{activeSlide.meta}</div>
                      </div>
                      <span className="text-xs text-zinc-600 font-mono">0{activeSlideIdx + 1} OF 0{slides.length}</span>
                    </div>

                    {/* Canvas Slide Body (Live Inputs) */}
                    <div className={`my-auto space-y-3.5 pt-4 ${
                      activeAlign === "center" ? "text-center" : activeAlign === "right" ? "text-right" : "text-left"
                    }`}>
                      <input
                        type="text"
                        value={activeSlide.title}
                        onChange={(e) => handleSlideChange("title", e.target.value)}
                        className={`w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-800 focus:border-primary/50 text-2xl md:text-3xl font-extrabold tracking-tight text-white focus:ring-0 p-1 transition-all outline-none uppercase ${
                          activeAlign === "center" ? "text-center" : activeAlign === "right" ? "text-right" : "text-left"
                        }`}
                        style={{ fontFamily: activeFont }}
                      />
                      
                      <textarea
                        value={activeSlide.content}
                        onChange={(e) => handleSlideChange("content", e.target.value)}
                        className={`w-full bg-transparent border-0 border-b border-transparent hover:border-zinc-800 focus:border-primary/50 text-xs md:text-sm font-light text-zinc-300 leading-relaxed focus:ring-0 p-1 transition-all h-24 md:h-28 resize-none outline-none ${
                          activeAlign === "center" ? "text-center" : activeAlign === "right" ? "text-right" : "text-left"
                        }`}
                        style={{ fontFamily: activeFont }}
                      />
                    </div>

                    {/* Canvas Footer */}
                    <div className="flex justify-between items-center border-t border-zinc-850 pt-4 text-[9px] text-zinc-600 font-mono">
                      <span>COMPETITION READY · PITCH STAGE</span>
                      <span>SECURE & PRIVATE</span>
                    </div>
                  </div>

                  {/* AI Quick Optimize bar */}
                  <div className="flex justify-between items-center bg-zinc-950/60 border border-zinc-850 rounded-xl px-4 py-3 text-xs shadow-inner">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Sparkles size={14} className={activeThemeStyles.textAccent} />
                      <span>Need a punchier wording? Try our instant enhancer.</span>
                    </div>
                    <button
                      onClick={optimizeWithAI}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${activeThemeStyles.badge} hover:brightness-110`}
                    >
                      AI Enhance Slide
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: AI Pitch Coach */}
              <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-zinc-800 bg-[#09090b]/40 backdrop-blur-xl p-6 overflow-y-auto flex flex-col gap-6">
                
                {/* Header score with circular gauge */}
                <div className="flex items-center justify-between bg-zinc-950/50 p-4 rounded-xl border border-zinc-850">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-primary" />
                      Pitch Coach
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-medium">
                      Status: <span className="text-white font-bold uppercase text-[9px]">{coachMetrics.status}</span>
                    </p>
                  </div>

                  {/* Circular SVG gauge */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle 
                        cx="28" 
                        cy="28" 
                        r={radius} 
                        className="stroke-zinc-800" 
                        strokeWidth="3.5" 
                        fill="transparent" 
                      />
                      <circle 
                        cx="28" 
                        cy="28" 
                        r={radius} 
                        className="stroke-primary transition-all duration-500" 
                        strokeWidth="3.5" 
                        fill="transparent" 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-bold text-white font-mono">{coachMetrics.score}</span>
                  </div>
                </div>

                {/* Score breakdown metrics list */}
                <div className="space-y-3">
                  <h4 className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Slide Analysis Report</h4>
                  <div className="space-y-2.5">
                    {coachMetrics.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start bg-zinc-950/40 p-3 rounded-lg border border-zinc-850 text-[11px] leading-relaxed">
                        {item.type === "success" && <CheckCircle size={13} className="text-primary flex-shrink-0 mt-0.5" />}
                        {item.type === "warning" && <AlertTriangle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />}
                        {item.type === "info" && <Lightbulb size={13} className="text-sky-400 flex-shrink-0 mt-0.5" />}
                        <span className="text-zinc-400 font-light">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benchmark Guidelines */}
                <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-850 rounded-xl p-4 mt-auto">
                  <h5 className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1.5">Benchmarking Rules</h5>
                  <p className="text-[10px] text-zinc-500 leading-relaxed font-light">
                    Tested against evaluation criteria from 12 college startup accelerators. Keep slides crisp, direct, and backed by solid metrics.
                  </p>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* AI Slide Outline Generator Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl text-center space-y-6 relative">
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-emerald-400" />
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 animate-spin">
              <Sparkles size={18} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">AI Slide Writer Active</h3>
              <p className="text-[11px] text-zinc-500 h-4 font-light transition-all duration-300">
                {generationStages[generationStep]}
              </p>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${((generationStep + 1) / generationStages.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF Export Overlay */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl text-center space-y-4 relative">
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Exporting Pitch Deck</h3>
            <p className="text-[11px] text-zinc-500">Compressing vector assets & building presentation layers...</p>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-primary font-bold">{exportProgress}%</span>
          </div>
        </div>
      )}

      {/* Export success toast */}
      {exportComplete && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900/90 backdrop-blur-md border border-primary/30 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in max-w-sm">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 border border-primary/20">
            <CheckCircle size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">PDF Export Ready</h4>
            <p className="text-[10px] text-zinc-400 mt-0.5">Your pitch deck has been downloaded and is competition-ready!</p>
          </div>
        </div>
      )}

      {/* Presentation Mode overlay */}
      {presentationMode && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 md:p-12">
          {/* Top Bar */}
          <div className="flex justify-between items-center text-white/50 border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary/20 text-primary border border-primary/30 text-[9px] px-2.5 py-0.5 rounded-full font-mono uppercase tracking-widest">
                PRESENTATION MODE
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider ml-2">{slides[activeSlideIdx].title}</span>
            </div>
            <button 
              onClick={() => setPresentationMode(false)}
              className="text-xs border border-zinc-800 hover:border-zinc-700 hover:text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Exit Presentation
            </button>
          </div>

          {/* Canvas Presentation Frame */}
          <div className="max-w-5xl w-full mx-auto aspect-[16/9] border border-zinc-900 bg-zinc-950 rounded-xl p-10 md:p-16 flex flex-col justify-between my-auto shadow-2xl relative">
            <span className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${activeThemeStyles.linearAccent}`} />
            
            <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
              <span className="text-[9px] font-mono text-zinc-500 tracking-widest font-semibold uppercase">PITCHDECK AI</span>
              <span className="text-xs text-zinc-600 font-mono">SLIDE 0{activeSlideIdx + 1} / 0{slides.length}</span>
            </div>

            <div className={`my-auto space-y-6 max-w-3xl ${
              activeAlign === "center" ? "text-center mx-auto" : activeAlign === "right" ? "text-right ml-auto" : "text-left"
            }`}>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: activeFont }}>{slides[activeSlideIdx].title}</h2>
              <p className="text-base md:text-lg font-light text-zinc-300 leading-relaxed whitespace-pre-line" style={{ fontFamily: activeFont }}>{slides[activeSlideIdx].content}</p>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-900 pt-4 text-[9px] text-zinc-600 font-mono">
              <span>{slides[activeSlideIdx].meta}</span>
              <span>CONFIDENTIAL</span>
            </div>
          </div>

          {/* Slide controls */}
          <div className="flex justify-between items-center max-w-5xl w-full mx-auto border-t border-zinc-900 pt-4">
            <button 
              onClick={() => setActiveSlideIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeSlideIdx === 0}
              className="px-6 py-2.5 border border-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer text-xs transition-colors"
            >
              Previous Slide
            </button>
            <span className="text-zinc-500 font-mono text-sm">0{activeSlideIdx + 1} / 0{slides.length}</span>
            <button 
              onClick={() => setActiveSlideIdx((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={activeSlideIdx === slides.length - 1}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:brightness-110 disabled:opacity-30 disabled:hover:brightness-100 cursor-pointer text-xs transition-all border border-primary/20"
            >
              Next Slide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
