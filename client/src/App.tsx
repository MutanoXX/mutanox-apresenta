import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timings = [
      { delay: 100, phase: 1 },
      { delay: 800, phase: 2 },
      { delay: 2000, phase: 3 },
      { delay: 3500, phase: 4 },
    ];

    const timeouts = timings.map(({ delay, phase: p }) =>
      setTimeout(() => setPhase(p), delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Animated background with multiple layers */}
      <div className="absolute inset-0">
        {/* Layer 1: Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950 to-black" />

        {/* Layer 2: Animated orbs */}
        <div className={`absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-0 transition-all duration-1000 ${phase >= 1 ? 'opacity-30' : ''}`} style={{
          animation: phase >= 1 ? 'float 6s ease-in-out infinite' : 'none'
        }} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800 rounded-full mix-blend-screen filter blur-3xl opacity-0 transition-all duration-1000 ${phase >= 1 ? 'opacity-25' : ''}`} style={{
          animation: phase >= 1 ? 'float-reverse 8s ease-in-out infinite' : 'none'
        }} />
        <div className={`absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-0 transition-all duration-1000 ${phase >= 2 ? 'opacity-20' : ''}`} style={{
          animation: phase >= 2 ? 'pulse-glow 4s ease-in-out infinite' : 'none'
        }} />

        {/* Layer 3: Particle effects */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 transition-all duration-1000 ${phase >= 2 ? 'opacity-60' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: phase >= 2 ? `particle-float ${3 + Math.random() * 4}s ease-in infinite` : 'none',
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Title container with multiple effects */}
        <div className={`transition-all duration-1000 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          {/* Outer glow - animated */}
          <div className={`absolute -inset-12 rounded-2xl blur-3xl opacity-0 transition-all duration-1000 ${phase >= 1 ? 'opacity-100' : ''}`} style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)',
            animation: phase >= 1 ? 'pulse 3s ease-in-out infinite' : 'none',
          }} />

          {/* Middle glow - rotating */}
          <div className={`absolute -inset-8 rounded-xl opacity-0 transition-all duration-1000 ${phase >= 2 ? 'opacity-80' : ''}`} style={{
            background: 'conic-gradient(from 0deg, #a855f7, #7c3aed, #6d28d9, #a855f7)',
            animation: phase >= 2 ? 'rotate 8s linear infinite' : 'none',
            filter: 'blur(20px)',
          }} />

          {/* Inner glow - static */}
          <div className={`absolute -inset-4 rounded-lg opacity-0 transition-all duration-1000 ${phase >= 1 ? 'opacity-60' : ''}`} style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.3))',
            filter: 'blur(10px)',
          }} />

          {/* Main text */}
          <div className="relative px-12 py-8">
            <h1 className={`text-7xl md:text-9xl font-black text-transparent bg-clip-text transition-all duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} style={{
              backgroundImage: 'linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 25%, #e9d5ff 50%, #f3e8ff 75%, #e9d5ff 100%)',
              backgroundSize: '200% 200%',
              animation: phase >= 2 ? 'gradient-shift 4s ease infinite' : 'none',
              letterSpacing: '0.1em',
              textShadow: phase >= 1 ? '0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(147, 51, 234, 0.5)' : 'none',
            }}>
              MutanoX
            </h1>
            <p className={`text-3xl md:text-5xl font-black text-purple-300 mt-4 transition-all duration-1000 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`} style={{
              letterSpacing: '0.15em',
              textShadow: phase >= 2 ? '0 0 20px rgba(168, 85, 247, 0.6)' : 'none',
              animation: phase >= 2 ? 'glow-pulse 2s ease-in-out infinite' : 'none',
            }}>
              APRESENTA
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <p className={`text-lg md:text-xl text-purple-200 mt-12 transition-all duration-1000 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Ferramentas da Cidadania
        </p>

        {/* Enter button */}
        <button
          onClick={onComplete}
          className={`mt-12 px-8 py-3 text-lg font-bold text-white border-2 border-purple-500 rounded-lg transition-all duration-500 hover:scale-105 active:scale-95 ${phase >= 4 ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'}`}
          style={{
            background: phase >= 4 ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.2))' : 'transparent',
            boxShadow: phase >= 4 ? '0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.2)' : 'none',
          }}
        >
          Entrar na Apresentação
        </button>
      </div>

      {/* Styles for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          75% { transform: translate(40px, 20px) scale(1.05); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, 40px) scale(0.9); }
          50% { transform: translate(20px, -30px) scale(1.1); }
          75% { transform: translate(-40px, -20px) scale(0.95); }
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }

        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 10px rgba(168, 85, 247, 0.6); }
          50% { text-shadow: 0 0 30px rgba(168, 85, 247, 1); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('mutanox-intro-seen');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('mutanox-intro-seen', 'true');
    setShowIntro(false);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {showIntro ? (
            <IntroScreen onComplete={handleIntroComplete} />
          ) : (
            <Router />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
