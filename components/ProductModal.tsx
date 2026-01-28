import React, { useEffect, useState, useCallback } from 'react';
import { X, ShoppingBag, Check, Plus, Minus, Sparkles, Tag, Zap, ArrowRight } from 'lucide-react';
import { Product, Category } from '../types';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onOpenCart?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart, onOpenCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [buyNowClicked, setBuyNowClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTilt({ x: 0, y: 0 });
      setQuantity(1);
      setImageLoaded(false);
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
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose]);

  // Mouse/Touch Move Handler for Tilt Effect
  useEffect(() => {
    if (!isOpen) return;

    const handleMove = (clientX: number, clientY: number) => {
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      const MAX_TILT = 12;

      setTilt({
        x: -yPct * MAX_TILT,
        y: xPct * MAX_TILT
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
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setBuyNowClicked(true);

    // Fecha modal e abre carrinho após breve delay para feedback visual
    setTimeout(() => {
      handleClose();
      setTimeout(() => {
        onOpenCart?.();
      }, 300);
    }, 600);
  };

  const incrementQty = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQty = () => setQuantity(prev => Math.max(prev - 1, 1));

  const isSticker = product.category === Category.STICKERS;
  const isRound = isSticker || product.category === Category.BOTTOMS;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const getCategoryIcon = () => {
    switch (product.category) {
      case Category.STICKERS: return '🏷️';
      case Category.BOTTOMS: return '📍';
      case Category.CAPS: return '🧢';
      case Category.ACCESSORIES: return '🔑';
      default: return '📦';
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden transition-all duration-400 ${isVisible ? 'visible' : 'invisible'}`}>

      {/* Backdrop with grain texture */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        style={{
          background: 'linear-gradient(135deg, rgba(74,55,40,0.97) 0%, rgba(40,30,22,0.98) 100%)',
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial glow behind content */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(233,196,106,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className={`absolute top-6 right-6 z-50 text-white/60 hover:text-white transition-all duration-300 p-3 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 hover:rotate-90 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{ transitionDelay: '200ms' }}
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      {/* Main Content Card */}
      <div
        className={`relative z-10 w-full max-w-5xl my-auto transition-all duration-500 ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="bg-[#faf9f6] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-full">

          {/* Left: Image Section */}
          <div className="relative lg:w-1/2 bg-gradient-to-br from-[#f5f0eb] to-[#ebe4dc] p-8 lg:p-12 flex items-center justify-center min-h-[350px] lg:min-h-[550px]">

            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[#4a3728]/20 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[#4a3728]/20 rounded-br-lg" />

            {/* Category & New Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
              <span className="bg-[#4a3728] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>{getCategoryIcon()}</span>
                {product.category}
              </span>
              {product.isNew && (
                <span className="bg-[#e9c46a] text-[#4a3728] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} />
                  Novo
                </span>
              )}
            </div>

            {/* 3D Product Image */}
            <div
              className="relative preserve-3d perspective-1000"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Shadow */}
              <div
                className={`absolute -inset-4 ${isRound ? 'rounded-full' : 'rounded-2xl'} bg-black/20 blur-2xl`}
                style={{
                  transform: `translateZ(-40px) translateX(${tilt.y * -0.5}px) translateY(${tilt.x * -0.5}px) scale(0.85)`
                }}
              />

              {/* Image container */}
              <div
                className={`relative ${isRound ? 'w-56 h-56 sm:w-72 sm:h-72 rounded-full' : 'w-56 h-72 sm:w-72 sm:h-96 rounded-2xl'} overflow-hidden bg-white shadow-xl`}
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e9c46a]/20 to-[#4a3728]/10 animate-pulse" />
                )}

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  draggable={false}
                />

                {/* Gloss effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(${135 + tilt.y * 2}deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`,
                    opacity: 0.5,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">

            {/* Product Name */}
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#4a3728] mb-4 leading-tight"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            >
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl lg:text-5xl font-black text-[#e9c46a]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-[#8c6b5d] font-medium">/ unidade</span>
            </div>

            {/* Divider */}
            <div className="w-16 h-1 bg-gradient-to-r from-[#e9c46a] to-[#d4a373] rounded-full mb-6" />

            {/* Description */}
            <p className="text-[#6b5344] leading-relaxed mb-8 text-base lg:text-lg">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8c6b5d] mb-3">
                Quantidade
              </label>
              <div className="inline-flex items-center bg-[#f5f0eb] rounded-full p-1">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[#4a3728] hover:bg-[#4a3728] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus size={18} strokeWidth={2.5} />
                </button>
                <span className="w-14 text-center text-xl font-bold text-[#4a3728]">{quantity}</span>
                <button
                  onClick={incrementQty}
                  disabled={quantity >= 10}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[#4a3728] hover:bg-[#4a3728] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-[#f5f0eb] rounded-2xl p-4 mb-4 flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-[#8c6b5d]">Total</span>
              <span className="text-3xl font-black text-[#4a3728]">
                {formatPrice(product.price * quantity)}
              </span>
            </div>

            {/* CTA Buttons - Inspired by Amazon/Apple conversion patterns */}
            <div className="flex flex-col gap-3">
              {/* Primary CTA: Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={buyNowClicked}
                className={`w-full py-4 px-8 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-xl group ${
                  buyNowClicked
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-[#e9c46a] to-[#d4a373] text-[#4a3728] hover:from-[#f0d080] hover:to-[#e0b080]'
                }`}
                style={{
                  boxShadow: buyNowClicked
                    ? '0 10px 40px -10px rgba(34, 197, 94, 0.5)'
                    : '0 10px 40px -10px rgba(233, 196, 106, 0.5)',
                }}
              >
                {buyNowClicked ? (
                  <>
                    <Check size={22} strokeWidth={3} className="animate-bounce" />
                    <span>Indo para o Carrinho...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} fill="currentColor" />
                    <span>Comprar Agora</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Secondary CTA: Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isAdded || buyNowClicked}
                className={`w-full py-4 px-8 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] border-2 ${
                  isAdded
                    ? 'bg-green-500/10 border-green-500 text-green-600'
                    : 'bg-transparent border-[#4a3728]/20 text-[#4a3728] hover:border-[#4a3728] hover:bg-[#4a3728]/5'
                } disabled:opacity-50`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} strokeWidth={3} />
                    <span>Adicionado! Continue comprando</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-[#e9c46a]/20 flex flex-wrap items-center justify-center gap-4 text-xs text-[#8c6b5d]">
              <span className="flex items-center gap-1.5">
                <Tag size={14} />
                Produto Original
              </span>
              <span className="w-1 h-1 bg-[#d4a373] rounded-full" />
              <span>Envio em até 5 dias</span>
              <span className="w-1 h-1 bg-[#d4a373] rounded-full" />
              <span>Pagamento Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
