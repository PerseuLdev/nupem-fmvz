import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, ZoomIn, Share2, Check, Loader2 } from 'lucide-react';
import { Product, Category } from '../types';

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onAddToCart, onClick }) => {
  const isSticker = product.category === Category.STICKERS;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after triggering once to avoid re-animating
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: '50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.disconnect();
    };
  }, []);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSharing) return;

    setIsSharing(true);
    
    const url = `${window.location.origin}?product=${product.id}`;
    const text = `Olha que top esse produto da NUPEM: ${product.name}\n${url}`;
    const title = 'NUPEM Agro Store';

    try {
      if (navigator.share) {
        // Tenta buscar a imagem para compartilhar como arquivo (Preview Real)
        try {
          const response = await fetch(product.imageUrl);
          const blob = await response.blob();
          const file = new File([blob], `${product.name.replace(/\s+/g, '_')}.jpg`, { type: blob.type });

          const shareData = {
            files: [file],
            title: title,
            text: text, // O link vai no texto para garantir compatibilidade quando envia arquivo
          };

          if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
            setIsSharing(false);
            return;
          }
        } catch (imageError) {
          console.warn('Não foi possível compartilhar a imagem, tentando apenas link...', imageError);
        }

        // Fallback: Compartilha apenas o link se a imagem falhar ou não for suportada
        await navigator.share({
          title: title,
          text: `Olha que top esse produto da NUPEM: ${product.name}`,
          url: url
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      // Ignora erro de cancelamento do usuário
      if ((err as Error).name !== 'AbortError') {
        // Fallback final: Clipboard
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => onClick(product)}
      className={`group relative w-full h-[480px] rounded-[2rem] overflow-hidden bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(74,55,40,0.25)] transition-all duration-700 ease-out cursor-pointer transform hover:-translate-y-2 hover:border-agro-gold/50 border-2 border-transparent backface-hidden
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ 
        transitionDelay: `${index * 100}ms`, // Staggered animation based on index
        WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Fix for border-radius clipping in Safari/Chrome
        maskImage: 'radial-gradient(white, black)'
      }}
    >
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full overflow-hidden leather-texture">
        {isSticker ? (
          // Layout Especial para Adesivos
          <div className="w-full h-full bg-[#f4f1ea] flex items-start justify-center pt-20 relative">
            {/* Pattern Dots */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4a3728 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 w-64 h-64 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out">
               <div className="absolute inset-0 bg-white rounded-full shadow-xl opacity-60 scale-90 blur-sm"></div>
               <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10"
              />
            </div>
          </div>
        ) : (
          // Layout Padrão (Imagem Full Bleed)
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        )}
      </div>

      {/* CENTER ICON OVERLAY (Appears on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-300">
           <ZoomIn size={32} />
        </div>
      </div>

      {/* GRADIENT OVERLAY - Adjusted for smoother text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-agro-primary via-agro-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent opacity-40 h-32" />

      {/* TOP TAGS & ACTIONS */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-2 items-start">
        {product.isNew && (
          <div className="wax-seal">
            Novo
          </div>
        )}
      </div>

      {/* Share Button (Top Right) */}
      <button 
        onClick={handleShare}
        disabled={isSharing}
        className={`absolute top-8 right-8 z-40 p-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 transform md:hover:scale-110 active:scale-95 ${
          copied 
            ? 'bg-green-500 text-white opacity-100 translate-y-0' 
            : 'bg-black/30 text-white hover:bg-white hover:text-agro-primary opacity-100 translate-y-0 md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'
        }`}
        title="Compartilhar produto"
      >
        {isSharing ? (
          <Loader2 size={18} className="animate-spin" />
        ) : copied ? (
          <Check size={18} strokeWidth={3} />
        ) : (
          <Share2 size={18} />
        )}
      </button>

      {/* CONTENT OVERLAY */}
      <div className="absolute bottom-0 left-0 w-full px-8 pt-8 pb-12 z-20 flex flex-col justify-end h-full">
        <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <div className="w-8 h-[1px] bg-agro-gold"></div>
            <span className="text-agro-gold text-xs font-ranch-accent">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-2xl font-ranch-heading text-white mb-3 leading-tight drop-shadow-sm pr-4">
            {product.name}
          </h3>

          {/* Collapsible Description */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out text-gray-200 text-sm mb-1 opacity-0 group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="pb-5 pt-1 line-clamp-3 leading-relaxed font-light text-gray-100/90 border-b border-white/10">
                {product.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold mb-0.5">Valor</span>
              <span className="text-2xl font-bold text-white tracking-tight">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </span>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-white text-agro-primary hover:bg-agro-gold hover:text-agro-primary h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl transform group-hover:scale-110 active:scale-95 group-hover:shadow-agro-gold/30"
              title="Adicionar ao carrinho"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};