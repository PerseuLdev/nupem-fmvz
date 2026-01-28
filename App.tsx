import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductModal } from './components/ProductModal';
import { CartSidebar } from './components/CartSidebar';
import { Footer } from './components/Footer';
import { InstagramFeed } from './components/InstagramFeed';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials'; // Import Testimonials
import { FAQ } from './components/FAQ'; // Import FAQ
import { Analytics, trackEvent } from './components/Analytics';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PRODUCTS, INSTAGRAM_POSTS } from './constants';
import { Category, Product, CartItem } from './types';
import { CheckCircle, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Keyboard Shortcuts Effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Cart with Alt+C
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsCartOpen(prev => !prev);
      }
      // Close Cart with Escape
      if (e.key === 'Escape') {
        if (isCartOpen) setIsCartOpen(false);
        // Note: ProductModal handles its own Escape key to support exit animations
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Tracking Event
    trackEvent('add_to_cart', {
      currency: 'BRL',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1
      }]
    });
    
    // Show notification
    setNotification(`${product.name} adicionado!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Group products by category for display
  const categories = Object.values(Category);

  return (
    <div className="min-h-screen flex flex-col bg-agro-bg">
      {/* Initialize Analytics Scripts */}
      <Analytics />

      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        <Hero />

        {/* Categories Section */}
        {/* INCREASED PADDING: py-28 (7rem) instead of py-20 for more breathing room */}
        <section id="categories" className="py-28 bg-agro-bg">
          <div className="container mx-auto px-6 lg:px-12">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="text-agro-primary font-extrabold tracking-[0.2em] uppercase text-xs mb-4 block opacity-80">
                Catálogo Oficial
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Escolha sua Categoria
              </h2>
              <div className="w-24 h-1.5 bg-agro-gold mx-auto rounded-full"></div>
            </div>

            {/* Quick Navigation Mini-Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
              {categories.map((category) => {
                // Find a representative image for the category background
                const repProduct = PRODUCTS.find(p => p.category === category);
                const bgImage = repProduct?.imageUrl || 'https://picsum.photos/400';

                return (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(`category-${category}`)}
                    className="group relative h-32 md:h-48 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={bgImage} 
                        alt={category} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50" />
                    
                    {/* Border Animation */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-agro-gold/50 rounded-2xl transition-colors duration-300"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <span className="text-white font-bold text-lg md:text-xl tracking-wider uppercase drop-shadow-lg text-center">
                        {category}
                      </span>
                      <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center text-agro-gold text-xs font-bold uppercase tracking-widest gap-1">
                        Ver Itens <ChevronRight size={14} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {categories.map((category, index) => {
              const categoryProducts = PRODUCTS.filter(p => p.category === category);
              if (categoryProducts.length === 0) return null;

              // Conditionally render layout based on category type
              const isCarouselLayout = category === Category.CAPS;

              return (
                <div 
                  key={category} 
                  id={`category-${category}`} 
                  className={`mb-32 last:mb-0 scroll-mt-32`}
                >
                  <div className="mb-10 border-b-2 border-gray-200 pb-4 flex items-baseline justify-between">
                    <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{category}</h3>
                    <span className="text-sm font-semibold text-gray-400">{categoryProducts.length} produtos</span>
                  </div>
                  
                  {isCarouselLayout ? (
                    // Carousel View for Caps
                    <ProductCarousel 
                      products={categoryProducts}
                      onAddToCart={addToCart}
                      onProductClick={setSelectedProduct}
                    />
                  ) : (
                    // Standard Grid View for other categories
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                      {categoryProducts.map((product, idx) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          index={idx}
                          onAddToCart={addToCart}
                          onClick={setSelectedProduct}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Testimonials Section (New) */}
        <Testimonials />

        {/* FAQ Section (New) */}
        <FAQ />

        {/* Instagram Feed Section */}
        <InstagramFeed posts={INSTAGRAM_POSTS} />
      </main>

      <Footer />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
      />

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Toast Notification */}
      <div
        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[60] bg-agro-primary text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 transition-all duration-500 ease-in-out border border-white/10 ${
          notification ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
        }`}
      >
        <div className="bg-green-500 rounded-full p-1">
          <CheckCircle className="text-white" size={16} strokeWidth={3} />
        </div>
        <span className="font-semibold tracking-wide text-sm">{notification}</span>
      </div>
    </div>
  );
};

export default App;
