import React, { useEffect, useRef, useState } from 'react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-28 bg-white transition-all duration-1000 ease-in-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-20 blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="bg-agro-primary rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-white shadow-2xl transition-transform duration-700 hover:scale-[1.005] leather-texture">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-agro-gold/30 rounded-tl-lg"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-agro-gold/30 rounded-tr-lg"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-agro-gold/30 rounded-bl-lg"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-agro-gold/30 rounded-br-lg"></div>

          {/* Decorative Circle */}
          <div className={`absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-agro-secondary rounded-full opacity-20 blur-3xl mix-blend-overlay transition-transform duration-1000 delay-300 ${isVisible ? 'scale-100' : 'scale-50'}`}></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Stamp Badge */}
              <div className="stamp-badge mb-10">
                Sobre Nos
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.05] tracking-tight">
                Plantando o futuro,
                <br />
                colhendo{' '}
                <span className="text-agro-gold golden-underline">história.</span>
              </h2>

              <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                Nascemos da necessidade de representar o orgulho do homem e da mulher do campo em cada detalhe.
                Nossos produtos sao feitos com materiais de alta qualidade, pensados para resistir a rotina do agronegocio sem perder o estilo.
              </p>

              <button
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ranch-primary group"
              >
                <span className="flex items-center gap-2">
                  Fale Conosco
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>
            </div>

            {/* Images Grid */}
            <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="relative mt-12 group">
                <div className="absolute inset-0 border-2 border-agro-gold/20 rounded-3xl transform translate-x-3 translate-y-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
                <img
                  src="https://picsum.photos/400/600?random=20"
                  className="relative rounded-3xl shadow-2xl w-full h-[300px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  alt="Estilo de vida no campo"
                />
              </div>
              <div className="relative -translate-y-4 group">
                <div className="absolute inset-0 border-2 border-agro-gold/20 rounded-3xl transform -translate-x-3 translate-y-3 transition-transform group-hover:-translate-x-4 group-hover:translate-y-4"></div>
                <img
                  src="https://picsum.photos/400/600?random=21"
                  className="relative rounded-3xl shadow-2xl w-full h-[300px] object-cover hover:scale-[1.02] transition-transform duration-700"
                  alt="Detalhes do agro"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
