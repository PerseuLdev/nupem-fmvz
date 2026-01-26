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
      className="py-24 bg-agro-bg relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#4a3728 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-agro-primary font-extrabold tracking-[0.2em] uppercase text-xs mb-4 block opacity-80">
            O que dizem nossos clientes
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Confiança de quem <span className="text-agro-gold">vive o Agro</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div 
              key={item.id}
              className={`bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-all duration-500 ease-out`}
              style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="absolute top-8 right-8 text-agro-gold/20 group-hover:text-agro-gold/40 transition-colors">
                <Quote size={48} className="rotate-180 fill-current" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={item.avatarUrl} 
                  alt={item.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-agro-gold p-0.5"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-agro-primary font-semibold uppercase tracking-wide">{item.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4 text-agro-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} strokeWidth={i < item.rating ? 0 : 2} />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed italic relative z-10">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
