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
      const headerOffset = 85;
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
          alt="Campo ao por do sol"
          className="w-full h-full object-cover grayscale-[20%] scale-110 will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        {/* Leather texture overlay */}
        <div className="absolute inset-0 leather-texture"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-agro-primary/85 via-agro-primary/60 to-agro-bg"></div>
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
          {/* Stamp Badge - Estilo Carimbo */}
          <div className="stamp-badge mb-8 mx-auto">
            Nova Colecao 2025/2026
          </div>

          {/* 3D Interactive Title - Playfair Display */}
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] transition-all duration-100 ease-out cursor-default"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
              textShadow: `${mousePos.x * -15}px ${mousePos.y * -15}px 40px rgba(0,0,0,0.4)`
            }}
          >
            A Identidade do Agro
            <br />
            <span className="text-agro-gold golden-underline">
              Em Cada Detalhe
            </span>
          </h1>

          {/* Ornamental Divider */}
          <div className="ornament-divider mb-8">
            <span className="ornament-dot"></span>
          </div>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Bottoms, adesivos e acessorios exclusivos para quem vive e ama o agronegocio.
            <span className="text-agro-gold font-medium"> Leve a forca do campo com voce.</span>
          </p>

          {/* CTA Buttons - Ranch Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#categories"
              onClick={(e) => scrollToSection(e, 'categories')}
              className="btn-ranch-primary group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Ver Produtos
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className="btn-ranch-secondary"
            >
              Conheca a NUPEM
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
