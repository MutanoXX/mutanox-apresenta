import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Abaixo-assinado e Manifesto",
    subtitle: "Ferramentas da Cidadania",
    content: "Apresentação da disciplina | Alunos: Alan Filipy, Alan Gabriel, Victor Gabriel, Yasmin | Professor: Rinaldo | Escola Estadual São Luiz",
    color: "from-purple-600 to-purple-900",
  },
  {
    id: 2,
    title: "Objetivos da Aula",
    subtitle: "O que vamos aprender",
    content: "Entender • Participar • Unifique • Transforme",
    color: "from-purple-700 to-black",
  },
  {
    id: 3,
    title: "O que é um Abaixo-Assinado?",
    subtitle: "Instrumento de Participação Popular",
    content: "Documento que reúne assinaturas em apoio a uma causa. Objetivo: pressionar autoridades para tomar ações específicas. Exige número mínimo de assinaturas para ter validade legal. Hoje pode ser feito digitalmente através de plataformas online.",
    color: "from-purple-800 to-purple-950",
  },
  {
    id: 4,
    title: "O que é um Manifesto?",
    subtitle: "Declaração Pública de Princípios",
    content: "Texto dissertativo-argumentativo que expõe opiniões. Objetivo: mobilizar um movimento ou sociedade. Declara princípios e intenções de um grupo. Busca conscientizar e provocar reflexão.",
    color: "from-purple-600 to-black",
  },
  {
    id: 5,
    title: "Diferenças e Semelhanças",
    subtitle: "Abaixo-Assinado vs Manifesto",
    content: "Abaixo-Assinado: busca ação específica, requer assinaturas, formato formal, dirigido a autoridades. Manifesto: declara princípios, não exige assinaturas, formato livre, dirigido ao público. Semelhanças: instrumentos de cidadania, expressam vontade coletiva, buscam mudanças sociais.",
    color: "from-purple-700 to-purple-900",
  },
  {
    id: 6,
    title: "Exemplos de Manifestos Famosos",
    subtitle: "História que mudou o mundo",
    content: "Manifesto Comunista (1848) • Manifesto Futurista (1909) • Manifesto Antropófago (1928) • Manifesto Surrealista (1924)",
    color: "from-purple-800 to-black",
  },
  {
    id: 7,
    title: "Abaixo-Assinados que Mudaram o Brasil",
    subtitle: "Exemplos de sucesso",
    content: "Diretas Já (1984) - Eleições diretas para presidente • Campanha contra a Fome (1993) - Programas sociais federais • Lei Maria da Penha (2006) - Proteção legal para mulheres",
    color: "from-purple-600 to-purple-900",
  },
  {
    id: 8,
    title: "Como Criar um Abaixo-Assinado Online",
    subtitle: "Passo a passo",
    content: "1. Defina o objetivo (específico e claro) • 2. Escolha a plataforma (Change.org ou Petição Pública) • 3. Escreva o texto (explique o problema e solução) • 4. Divulgue (redes sociais e grupos)",
    color: "from-purple-700 to-black",
  },
  {
    id: 9,
    title: "A Importância da Participação Popular",
    subtitle: "Democracia se fortalece com participação ativa",
    content: "Controle social • Representatividade • Transformação • Conscientização | A participação popular é o alicerce de uma democracia verdadeira — Paulo Freire",
    color: "from-purple-800 to-purple-950",
  },
  {
    id: 10,
    title: "Conclusão",
    subtitle: "Ferramentas de Transformação Social",
    content: "Abaixo-assinados e manifestos são instrumentos históricos para expressar vontades coletivas. Plataformas online ampliam alcance e impacto. Use essas ferramentas para fazer a diferença na sua comunidade!",
    color: "from-purple-600 to-black",
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
        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-lg tracking-wider">
          {slide.title}
        </h1>
        <p className="text-2xl md:text-4xl font-bold text-purple-200 mb-8 drop-shadow-md">
          {slide.subtitle}
        </p>
        <p className="text-lg md:text-xl text-purple-100 max-w-3xl drop-shadow-md leading-relaxed">
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
