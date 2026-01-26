import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85; // Height of fixed header compensation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden perspective-1000">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/agrohero/1920/1080" 
          alt="Campo ao pôr do sol" 
          className="w-full h-full object-cover grayscale-[20%] scale-110 will-change-transform"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-agro-primary/80 via-agro-primary/50 to-agro-bg"></div>
      </div>

      {/* Content */}
      <div 
        className="relative z-10 container mx-auto px-4 text-center will-change-transform preserve-3d"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`,
          opacity: Math.max(0, 1 - scrollY / 700)
        }}
      >
        <div className="animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-agro-gold/20 text-agro-gold border border-agro-gold/40 text-xs font-bold tracking-wider mb-6 backdrop-blur-sm">
            NOVA COLEÇÃO 2024/2025
          </span>
          
          {/* 3D Interactive Title */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-100 ease-out cursor-default"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg) scale3d(1.02, 1.02, 1.02)`,
              textShadow: `${mousePos.x * -20}px ${mousePos.y * -20}px 30px rgba(0,0,0,0.5)`
            }}
          >
            A Identidade do Agro <br />
            <span className="text-agro-gold inline-block transform-style-preserve-3d">
              Em Cada Detalhe
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Bottoms, adesivos e acessórios exclusivos para quem vive e ama o agronegócio. Leve a força do campo com você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#categories"
              onClick={(e) => scrollToSection(e, 'categories')}
              className="group relative overflow-hidden bg-agro-gold text-agro-primary hover:bg-white hover:text-agro-primary font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl cursor-pointer"
            >
              <span className="relative z-10">Ver Produtos</span>
              {/* Responsive Glare Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePos.x * 40}% ${50 + mousePos.y * 40}%, rgba(255,255,255,0.7) 0%, transparent 60%)`
                }}
              />
            </a>
            <a 
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full transition-all cursor-pointer"
            >
              Conheça a NUPEM
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        onClick={(e) => scrollToSection(e, 'categories')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer hover:text-agro-gold transition-colors"
        title="Rolar para baixo"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <ChevronDown size={32} />
      </div>
    </section>
  );
};