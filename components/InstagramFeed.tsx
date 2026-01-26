import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramPost } from '../types';

interface InstagramFeedProps {
  posts: InstagramPost[];
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Define isVisible como true quando entra, false quando sai (efeito de entrada e saída)
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15, // Gatilho quando 15% do elemento estiver visível
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-28 bg-white border-t border-gray-100 overflow-hidden" // overflow-hidden previne barra de rolagem horizontal durante animação
    >
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header - Desliza da Esquerda */}
        <div 
          className={`flex flex-col items-center mb-16 text-center transition-all duration-1000 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-32'
          }`}
        >
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white p-1 rounded-full">
              <div className="bg-gray-50 p-3 rounded-full">
                <Instagram size={32} className="text-gray-900" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            @nupemunesp
          </h2>
          <p className="text-gray-500 max-w-lg text-lg leading-relaxed">
            Acompanhe nosso dia a dia, bastidores e novidades exclusivas diretamente no nosso feed.
          </p>
        </div>

        {/* Grid - Desliza da Direita */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 transition-all duration-1000 ease-out delay-200 transform ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-32'
          }`}
        >
          {posts.map((post) => (
            <a 
              key={post.id}
              href={post.link}
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-gray-100 rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Skeleton Loader */}
              {!imagesLoaded[post.id] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
                  <Instagram className="text-gray-400 w-10 h-10 animate-bounce opacity-50" />
                </div>
              )}

              <img 
                src={post.imageUrl} 
                alt="Instagram Post" 
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imagesLoaded[post.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onLoad={() => handleImageLoad(post.id)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-8 text-white backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-1 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Heart size={28} className="fill-white" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <MessageCircle size={28} className="fill-white" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA - Fade Up simples (acompanhando o fluxo) */}
        <div 
          className={`text-center transition-all duration-1000 ease-out delay-300 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <a 
            href="https://www.instagram.com/nupemunesp?igsh=ZHJ5cGVncTJtNTZ0" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-agro-primary transition-all hover:scale-105 shadow-lg"
          >
            Seguir no Instagram <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};