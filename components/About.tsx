import React, { useEffect, useRef, useState } from 'react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state based on visibility
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% of the element is visible
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
        <div className="bg-agro-primary rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-white shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
          {/* Decorative Circle */}
          <div className={`absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-agro-secondary rounded-full opacity-20 blur-3xl mix-blend-overlay transition-transform duration-1000 delay-300 ${isVisible ? 'scale-100' : 'scale-50'}`}></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-8 text-agro-gold border border-white/10">
                Sobre Nós
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-none tracking-tight">
                Plantando o futuro,<br/>colhendo <span className="text-agro-gold">história.</span>
              </h2>
              <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                Nascemos da necessidade de representar o orgulho do homem e da mulher do campo em cada detalhe. 
                Nossos produtos são feitos com materiais de alta qualidade, pensados para resistir à rotina do agronegócio sem perder o estilo.
              </p>
              <button 
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-agro-gold text-agro-primary font-bold py-4 px-10 rounded-full hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-5px_rgba(233,196,106,0.4)]"
              >
                Fale Conosco
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
              </button>
            </div>

            {/* Images Grid */}
            <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
               <img 
                 src="https://picsum.photos/400/600?random=20" 
                 className="rounded-3xl mt-12 shadow-2xl w-full h-[300px] object-cover hover:scale-[1.02] transition-transform duration-700" 
                 alt="Estilo de vida no campo" 
               />
               <img 
                 src="https://picsum.photos/400/600?random=21" 
                 className="rounded-3xl transform -translate-y-4 shadow-2xl w-full h-[300px] object-cover hover:scale-[1.02] transition-transform duration-700" 
                 alt="Detalhes do agro" 
               />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};