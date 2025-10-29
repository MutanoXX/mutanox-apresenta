import { useEffect, useState, useRef } from "react";

const SLIDES = [
  "/slides/slide-01.png",
  "/slides/slide-02.png",
  "/slides/slide-03.png",
  "/slides/slide-04.png",
  "/slides/slide-05.png",
  "/slides/slide-06.png",
  "/slides/slide-07.png",
  "/slides/slide-08.png",
  "/slides/slide-09.png",
  "/slides/slide-10.png",
];

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [transitionEffect, setTransitionEffect] = useState<'flip' | 'zoom' | 'rotate' | 'slide' | 'shatter'>('flip');
  const starIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 60; i++) {
        newStars.push({
          id: starIdRef.current++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 4 + 2,
        });
      }
      setStars(newStars);
    };

    generateStars();

    // Add new stars periodically
    const interval = setInterval(() => {
      setStars(prev => {
        if (prev.length < 100) {
          return [
            ...prev,
            {
              id: starIdRef.current++,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 3 + 0.5,
              opacity: Math.random() * 0.8 + 0.2,
              duration: Math.random() * 4 + 2,
            },
          ];
        }
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const nextSlide = () => {
    const effects: ('flip' | 'zoom' | 'rotate' | 'slide' | 'shatter')[] = ['flip', 'zoom', 'rotate', 'slide', 'shatter'];
    setTransitionEffect(effects[Math.floor(Math.random() * effects.length)]);
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    const effects: ('flip' | 'zoom' | 'rotate' | 'slide' | 'shatter')[] = ['flip', 'zoom', 'rotate', 'slide', 'shatter'];
    setTransitionEffect(effects[Math.floor(Math.random() * effects.length)]);
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const toggleFullscreen = async () => {
    try {
      const elem = containerRef.current || document.documentElement;
      
      if (!document.fullscreenElement && 
          !(document as any).webkitFullscreenElement &&
          !(document as any).mozFullScreenElement &&
          !(document as any).msFullscreenElement) {
        
        // Enter fullscreen
        if (elem.requestFullscreen) {
          await elem.requestFullscreen().catch(err => console.warn(err));
        } else if ((elem as any).webkitRequestFullscreen) {
          (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).mozRequestFullScreen) {
          (elem as any).mozRequestFullScreen();
        } else if ((elem as any).msRequestFullscreen) {
          (elem as any).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen().catch(err => console.warn(err));
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen error:', err);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Error exiting fullscreen:', err);
    }
  };

  const getTransitionClass = () => {
    const baseClass = 'absolute inset-0 transition-all duration-800';
    
    switch (transitionEffect) {
      case 'flip':
        return `${baseClass} ${
          direction === 'next'
            ? 'animate-flip-right'
            : 'animate-flip-left'
        }`;
      case 'zoom':
        return `${baseClass} ${
          direction === 'next'
            ? 'animate-zoom-in'
            : 'animate-zoom-out'
        }`;
      case 'rotate':
        return `${baseClass} ${
          direction === 'next'
            ? 'animate-rotate-right'
            : 'animate-rotate-left'
        }`;
      case 'shatter':
        return `${baseClass} ${
          direction === 'next'
            ? 'animate-shatter-right'
            : 'animate-shatter-left'
        }`;
      case 'slide':
      default:
        return `${baseClass} ${
          direction === 'next'
            ? 'animate-slide-in-right'
            : 'animate-slide-in-left'
        }`;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated stars background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.8})`,
            }}
          />
        ))}
      </div>

      {/* Slide container with extreme transition effects */}
      <div className={getTransitionClass()}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/20 to-black/30 z-10" />
        
        {/* Slide image */}
        <img
          src={SLIDES[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className={`w-full h-full object-contain bg-black transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-purple-300 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Slide indicator dots - Top center (moved up) */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 'next' : 'prev');
              setCurrentSlide(index);
            }}
            className={`transition-all duration-300 rounded-full hover:scale-150 ${
              index === currentSlide
                ? 'bg-purple-400 w-3 h-3 shadow-lg shadow-purple-400'
                : 'bg-purple-600/70 hover:bg-purple-500 w-2 h-2'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen button - Top right */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-30 px-3 py-1 text-xs text-purple-300 border border-purple-500/50 rounded hover:bg-purple-900/50 hover:text-purple-100 transition-all duration-300 bg-black/60 backdrop-blur-md hover:border-purple-400"
        title="Pressione 'F' para tela cheia"
      >
        {isFullscreen ? '✕' : '⛶'}
      </button>

      {/* Keyboard hints - Bottom left */}
      <div className="absolute bottom-4 left-4 z-30 text-xs text-purple-400 bg-black/60 backdrop-blur-md px-3 py-2 rounded border border-purple-500/30 hidden md:block">
        <div className="font-semibold text-purple-300">← → Navegar | Espaço | F Fullscreen</div>
      </div>

      {/* Slide counter - Bottom right */}
      <div className="absolute bottom-4 right-4 z-30 text-white text-sm font-bold bg-black/60 backdrop-blur-md px-3 py-2 rounded border border-purple-500/30">
        {currentSlide + 1} / {SLIDES.length}
      </div>

      {/* Styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        @keyframes flip-right {
          from {
            opacity: 0;
            transform: perspective(1500px) rotateY(120deg) rotateZ(60deg);
          }
          to {
            opacity: 1;
            transform: perspective(1500px) rotateY(0deg) rotateZ(0deg);
          }
        }

        @keyframes flip-left {
          from {
            opacity: 0;
            transform: perspective(1500px) rotateY(-120deg) rotateZ(-60deg);
          }
          to {
            opacity: 1;
            transform: perspective(1500px) rotateY(0deg) rotateZ(0deg);
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.1) rotateZ(180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateZ(0deg);
          }
        }

        @keyframes zoom-out {
          from {
            opacity: 0;
            transform: scale(3) rotateZ(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateZ(0deg);
          }
        }

        @keyframes rotate-right {
          from {
            opacity: 0;
            transform: perspective(1500px) rotateX(120deg) rotateZ(360deg);
          }
          to {
            opacity: 1;
            transform: perspective(1500px) rotateX(0deg) rotateZ(0deg);
          }
        }

        @keyframes rotate-left {
          from {
            opacity: 0;
            transform: perspective(1500px) rotateX(-120deg) rotateZ(-360deg);
          }
          to {
            opacity: 1;
            transform: perspective(1500px) rotateX(0deg) rotateZ(0deg);
          }
        }

        @keyframes shatter-right {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(90deg) rotateY(90deg) scale(0.5);
          }
          50% {
            opacity: 0.5;
            transform: perspective(1200px) rotateX(45deg) rotateY(45deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1);
          }
        }

        @keyframes shatter-left {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(-90deg) rotateY(-90deg) scale(0.5);
          }
          50% {
            opacity: 0.5;
            transform: perspective(1200px) rotateX(-45deg) rotateY(-45deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(150%) skewX(30deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(0deg);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-150%) skewX(-30deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(0deg);
          }
        }

        .animate-flip-right {
          animation: flip-right 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-flip-left {
          animation: flip-left 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-zoom-in {
          animation: zoom-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-zoom-out {
          animation: zoom-out 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-rotate-right {
          animation: rotate-right 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-rotate-left {
          animation: rotate-left 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-shatter-right {
          animation: shatter-right 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-shatter-left {
          animation: shatter-left 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
