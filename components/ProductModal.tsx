import React, { useEffect, useState, useCallback } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import { Product, Category } from '../types';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Tilt state (Degrees)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTilt({ x: 0, y: 0 });
      // Trigger animation frame for smooth entrance
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Wait for animation to finish before unmounting
    setTimeout(() => {
      onClose();
    }, 500);
  }, [onClose]);

  // Mouse Move Handler for Tilt Effect (Parallax)
  useEffect(() => {
    if (!isOpen) return;

    const handleMove = (clientX: number, clientY: number) => {
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized position (-1 to +1) relative to center
      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      
      // Max tilt angle (degrees)
      const MAX_TILT = 20; 
      
      setTilt({
        x: -yPct * MAX_TILT, // RotateX (Up/Down) - inverted for natural look
        y: xPct * MAX_TILT   // RotateY (Left/Right)
      });
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isSticker = product.category === Category.STICKERS;
  const isRound = isSticker || product.category === Category.BOTTOMS;

  // Generate thickness layers to simulate volume
  const renderThicknessLayers = () => {
    return [...Array(8)].map((_, i) => (
      <div
        key={i}
        className={`absolute inset-0 ${isRound ? 'rounded-full' : 'rounded-3xl'} ${isSticker ? 'bg-gray-200' : 'bg-[#2a2a2a]'}`}
        style={{
          transform: `translateZ(-${i * 0.5}px)`, 
          width: '100%',
          height: '100%',
          // Removido border daqui para evitar linhas serrilhadas na lateral (o "straight shadow" lateral)
        }}
      />
    ));
  };

  // Note: We don't return null immediately so we can animate out
  // The parent controls mounting, but we handle the 'visible' class state.

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${isVisible ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity duration-500 ease-out cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Close Button */}
      <button 
        onClick={handleClose}
        className={`absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-all duration-500 p-2 hover:bg-white/10 rounded-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <X size={32} />
      </button>

      {/* Main Container */}
      <div className={`relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 perspective-1000 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12'}`}>
        
        {/* 3D Object Wrapper */}
        <div className="relative mb-12 select-none pointer-events-none md:pointer-events-auto">
          
          <div 
            className={`relative preserve-3d transition-transform duration-100 ease-out ${
               isRound ? 'w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]' : 'w-[300px] h-[400px] sm:w-[400px] sm:h-[550px]'
            }`}
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* SHADOW on the "floor" behind the object */}
            {/* AJUSTE: Mudado de inset-0 para -inset-8 e adicionado formato dinâmico para evitar corte reto */}
            <div 
              className={`absolute -inset-8 ${isRound ? 'rounded-full' : 'rounded-3xl'} bg-black/30 blur-3xl transition-transform duration-100`}
              style={{ 
                transform: `translateZ(-60px) translateX(${tilt.y * -1}px) translateY(${tilt.x * -1}px) scale(0.9)` 
              }}
            ></div>

            {/* THICKNESS / VOLUME LAYERS */}
            <div className="absolute inset-0 preserve-3d" style={{ transform: 'translateZ(-4px)' }}>
               {renderThicknessLayers()}
            </div>

            {/* --- FRONT FACE --- */}
            <div 
              className={`absolute inset-0 backface-hidden overflow-hidden ${isRound ? 'rounded-full' : 'rounded-3xl'}`}
              style={{ transform: 'translateZ(1px)' }}
            >
              {isSticker ? (
                // Sticker Front
                <div className="w-full h-full bg-white flex items-center justify-center relative border-[0.5px] border-gray-100 shadow-inner">
                  {/* Subtle Paper Texture */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '8px 8px' }}></div>
                  
                  {/* The Image */}
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-[94%] h-[94%] object-cover rounded-full pointer-events-none"
                    draggable={false}
                  />

                  {/* Dynamic Gloss/Reflection */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay transition-all duration-100"
                    style={{ 
                      transform: `translateX(${tilt.y * 2}%) translateY(${tilt.x * 2}%) scale(1.5)`,
                      opacity: 0.3 + (Math.abs(tilt.x) + Math.abs(tilt.y)) / 40
                    }}
                  ></div>
                  
                  {/* Sharp Specular Highlight for Vinyl feel */}
                  <div 
                     className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none mix-blend-soft-light"
                     style={{
                        opacity: Math.max(0, (tilt.x + 20) / 100), 
                        transform: 'translateY(-50%)'
                     }}
                  ></div>
                </div>
              ) : (
                // Standard Front (Cards/Boxes)
                <div className="w-full h-full bg-white p-2 relative shadow-inner">
                   <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl pointer-events-none"
                    draggable={false}
                  />
                  {/* Glass/Plastic Reflection */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 pointer-events-none mix-blend-overlay"
                    style={{ 
                      transform: `translateX(${tilt.y}%) translateY(${tilt.x}%)`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Controls */}
        <div className={`flex flex-col items-center text-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-md tracking-tight">{product.name}</h2>
          
          <div className="mt-6 pointer-events-auto">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 pl-6 pr-2 rounded-full border border-white/10 shadow-xl hover:bg-white/15 transition-all group">
              <span className="text-2xl font-bold text-agro-gold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </span>
              <div className="h-8 w-[1px] bg-white/20 mx-2"></div>
              <button 
                onClick={handleAddToCart}
                className={`px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 transition-all transform active:scale-95 shadow-lg ${
                  isAdded 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-agro-primary group-hover:bg-agro-gold'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} strokeWidth={3} />
                    <span>Adicionado</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Comprar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};