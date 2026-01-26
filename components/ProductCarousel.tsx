import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onAddToCart, onProductClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Largura aproximada do card + gap
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Navigation Buttons (Desktop only, visible on hover) */}
      <button 
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-40 bg-white/90 backdrop-blur text-agro-primary p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-agro-gold hover:text-white"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-40 bg-white/90 backdrop-blur text-agro-primary p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 transition-all duration-300 hover:bg-agro-gold hover:text-white"
        aria-label="Próximo"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 -mx-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, idx) => (
          <div 
            key={product.id} 
            className="min-w-[300px] md:min-w-[340px] snap-center"
          >
            <ProductCard 
              product={product} 
              index={idx}
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          </div>
        ))}
        
        {/* Spacer for right padding visual balance */}
        <div className="min-w-[20px] snap-align-none" />
      </div>
    </div>
  );
};