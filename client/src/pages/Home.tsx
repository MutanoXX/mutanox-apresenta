import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isFullscreen]);

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slide container with transition effect */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        direction === 'next' 
          ? 'animate-slide-in-right' 
          : 'animate-slide-in-left'
      }`}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/10 to-black/20 z-10" />
        
        {/* Slide image */}
        <img
          src={SLIDES[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className={`w-full h-full object-contain bg-black transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-purple-300 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Navigation controls - Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-4 items-center bg-black/50 backdrop-blur-sm px-6 py-4 rounded-full">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Slide anterior"
          title="Seta esquerda ou clique"
        >
          <ChevronLeft size={28} />
        </button>
        
        <div className="text-white text-sm font-bold min-w-16 text-center">
          {currentSlide + 1} / {SLIDES.length}
        </div>
        
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Próximo slide"
          title="Seta direita, espaço ou clique"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Fullscreen button - Top right */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-8 right-8 z-20 px-4 py-2 text-purple-300 border border-purple-500 rounded-lg hover:bg-purple-900 hover:text-purple-100 transition-all duration-300 text-sm font-medium bg-black/50 backdrop-blur-sm"
        title="Pressione 'F' para tela cheia"
      >
        {isFullscreen ? '✕ Sair' : '⛶ Fullscreen'}
      </button>

      {/* Slide indicator dots - Top center */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 bg-black/50 backdrop-blur-sm px-4 py-3 rounded-full">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 'next' : 'prev');
              setCurrentSlide(index);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-purple-400 w-3 h-3'
                : 'bg-purple-600 hover:bg-purple-500 w-2 h-2'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Keyboard hints - Bottom left */}
      <div className="absolute bottom-8 left-8 z-20 text-xs text-purple-400 bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg hidden md:block">
        <div className="font-semibold text-purple-300 mb-2">Atalhos:</div>
        <div>← → Navegar | Espaço Próximo | F Fullscreen | ESC Sair</div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100px) perspective(1000px) rotateY(45deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) perspective(1000px) rotateY(0deg);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px) perspective(1000px) rotateY(-45deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) perspective(1000px) rotateY(0deg);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
