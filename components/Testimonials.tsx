import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "João Ferreira",
    role: "Eng. Agrônomo - MT",
    text: "A qualidade dos bonés me surpreendeu. Uso diariamente na lavoura, pegando sol e poeira, e o material aguenta muito o tranco. Acabamento impecável.",
    rating: 5,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Estudante de Zootecnia",
    text: "Amei os adesivos! Colei na minha garrafa térmica e no notebook. Já lavou várias vezes e não descolou nada. O design é lindo demais.",
    rating: 5,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Carlos Mendes",
    role: "Produtor Rural",
    text: "O atendimento pelo WhatsApp foi muito rápido e o pedido chegou antes do prazo. O chaveiro de couro é muito chique, representa bem o nosso setor.",
    rating: 5,
    avatarUrl: "https://randomuser.me/api/portraits/men/85.jpg"
  }
];

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-ranch-gradient relative overflow-hidden paper-texture"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4a3728 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="font-ranch-accent text-agro-primary text-sm mb-4 block opacity-80">
            ● Catálogo de Experiencias ●
          </span>
          <h2 className="text-4xl md:text-5xl font-ranch-heading text-gray-900 mb-4">
            Confiança de quem <span className="text-agro-gold golden-underline">vive o Agro</span>
          </h2>
          <div className="w-24 h-1 bg-agro-gold mx-auto rounded-full opacity-30 mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-white p-8 rounded-2xl shadow-xl border border-agro-gold/10 relative group hover:-translate-y-2 transition-all duration-500 ease-out leather-texture`}
              style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Decorative Frame Inner Border */}
              <div className="absolute inset-2 border border-agro-gold/5 rounded-xl pointer-events-none"></div>

              <div className="absolute top-6 right-8 text-agro-gold/10 group-hover:text-agro-gold/20 transition-colors">
                <Quote size={64} className="rotate-180 fill-current" />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img 
                    src={item.avatarUrl} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-agro-gold p-0.5 z-10 relative"
                  />
                  <div className="absolute -inset-1 border border-agro-gold/30 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h4 className="font-ranch-display text-lg text-gray-900 leading-tight">{item.name}</h4>
                  <p className="font-ranch-accent text-[10px] text-agro-primary/70 mt-1">{item.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6 text-agro-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} strokeWidth={i < item.rating ? 0 : 2} />
                ))}
              </div>

              <div className="vintage-quote">
                <p className="text-gray-700 leading-relaxed italic text-sm md:text-base relative z-10">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
