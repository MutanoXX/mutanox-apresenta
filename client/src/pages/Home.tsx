import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Abaixo-Assinado",
    subtitle: "Ferramentas da Cidadania",
    content: "Mobilização e participação democrática",
    color: "from-purple-600 to-purple-900",
  },
  {
    id: 2,
    title: "Manifesto",
    subtitle: "Voz do Povo",
    content: "Transformação social através da ação coletiva",
    color: "from-purple-700 to-black",
  },
  {
    id: 3,
    title: "Participação",
    subtitle: "Democracia Ativa",
    content: "Cada assinatura é um voto pela mudança",
    color: "from-purple-800 to-purple-950",
  },
  {
    id: 4,
    title: "Direitos",
    subtitle: "Liberdade de Expressão",
    content: "Garantindo a voz de todos os cidadãos",
    color: "from-purple-600 to-black",
  },
  {
    id: 5,
    title: "Ação",
    subtitle: "Mudança Real",
    content: "Do manifesto à realidade",
    color: "from-purple-700 to-purple-900",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Main slide container */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} transition-all duration-1000`}>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Slide content */}
      <div className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ${
        direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
      }`}>
        <h1 className="text-7xl md:text-8xl font-black text-white mb-4 drop-shadow-lg tracking-wider">
          {slide.title}
        </h1>
        <p className="text-3xl md:text-5xl font-bold text-purple-200 mb-8 drop-shadow-md">
          {slide.subtitle}
        </p>
        <p className="text-xl md:text-2xl text-purple-100 max-w-2xl drop-shadow-md">
          {slide.content}
        </p>
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-4 items-center">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={32} />
        </button>
        <div className="text-white text-lg font-bold min-w-20 text-center">
          {currentSlide + 1} / {slides.length}
        </div>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Próximo slide"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-8 right-8 z-20 px-4 py-2 text-purple-300 border border-purple-500 rounded hover:bg-purple-900 hover:text-purple-100 transition-all duration-300 text-sm"
        title="Pressione 'F' para tela cheia"
      >
        {isFullscreen ? 'Sair Fullscreen' : 'Fullscreen (F)'}
      </button>

      {/* Slide indicator dots */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-purple-400 w-8'
                : 'bg-purple-600 hover:bg-purple-500'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
