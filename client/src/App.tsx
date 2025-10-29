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

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

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
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          {showIntro ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <IntroScreen onComplete={handleIntroComplete} />
            </div>
          ) : (
            <Router />
          )}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationPhase(1), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (animationPhase === 1) {
      const timer = setTimeout(() => setAnimationPhase(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black opacity-0 animate-fade-in" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Title with glow effect */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className={`text-center transition-all duration-1000 ${
          animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className="relative inline-block">
            {/* Outer glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-lg blur-2xl opacity-75 animate-pulse" />
            {/* Inner glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg blur-lg opacity-50" />
            {/* Text */}
            <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 px-8 py-6 tracking-wider">
              MutanoX
            </h1>
            <p className="relative text-2xl md:text-4xl font-bold text-purple-300 mt-2 tracking-widest">APRESENTA</p>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className={`absolute bottom-8 right-8 z-20 px-6 py-2 text-purple-300 border border-purple-500 rounded hover:bg-purple-900 hover:text-purple-100 transition-all duration-300 ${
          animationPhase >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        Entrar
      </button>
    </div>
  );
}

export default App;
