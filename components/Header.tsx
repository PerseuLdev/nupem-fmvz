import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedLink, setMobileExpandedLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Início', href: 'hero' },
    { name: 'Categorias', href: 'categories', hasDropdown: true },
    { name: 'Sobre', href: 'about' },
    { name: 'FAQ', href: 'faq' },
    { name: 'Contato', href: 'footer' },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setMobileExpandedLink(null); // Reset mobile accordion
    
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleMobileDropdown = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileExpandedLink(mobileExpandedLink === linkName ? null : linkName);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-agro-primary/95 backdrop-blur-md shadow-xl border-white/5 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center relative">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 text-white font-bold text-2xl tracking-tighter cursor-pointer group z-50" 
          onClick={handleLogoClick}
          title="Voltar ao topo"
        >
          <div className="bg-agro-gold p-2 rounded-xl text-agro-primary shadow-lg group-hover:scale-105 transition-transform duration-300">
            <img 
              src="https://www.svgrepo.com/show/481194/cow-7.svg" 
              alt="NUPEM Logo" 
              className="w-6 h-6 object-contain opacity-80" 
            />
          </div>
          <span className="text-xl md:text-2xl tracking-tight">NUPEM</span>
        </div>

        {/* Desktop Nav with Dropdown */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a 
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center gap-1 text-white/90 hover:text-agro-gold transition-colors text-xs font-bold uppercase tracking-widest py-4"
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                )}
              </a>

              {/* Dropdown Menu */}
              {link.hasDropdown && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-48 p-2">
                    <div className="flex flex-col">
                      {Object.values(Category).map((cat) => (
                        <a
                          key={cat}
                          href={`#category-${cat}`}
                          onClick={(e) => {
                            handleNavClick(e, `category-${cat}`);
                          }}
                          className="px-4 py-3 text-gray-600 hover:text-agro-primary hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors text-left"
                        >
                          {cat}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6 z-50">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-agro-gold transition-colors group"
            aria-label="Abrir carrinho"
            title="Abrir carrinho (Alt + C)"
          >
            <ShoppingCart size={24} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-agro-gold text-agro-primary text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button with Rotation Animation */}
          <button 
            className="md:hidden text-white hover:text-agro-gold transition-colors relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            title="Menu principal"
          >
            <div className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
              <Menu size={28} />
            </div>
            <div className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-90 opacity-100' : '-rotate-90 opacity-0'}`}>
              <X size={28} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Smooth Slide/Fade */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-agro-primary/95 backdrop-blur-xl shadow-2xl border-t border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen 
            ? 'max-h-[calc(100vh-80px)] opacity-100 translate-y-0 visible' 
            : 'max-h-0 opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="flex flex-col items-center pb-10 pt-2 overflow-y-auto max-h-[80vh]">
          {navLinks.map((link) => (
            <React.Fragment key={link.name}>
              {link.hasDropdown ? (
                // Botão para itens com dropdown (Accordion)
                <button
                  onClick={(e) => toggleMobileDropdown(e, link.name)}
                  className={`w-full text-center py-5 text-white hover:text-agro-gold font-bold text-lg uppercase tracking-wider border-b border-white/5 transition-colors flex items-center justify-center gap-2 ${mobileExpandedLink === link.name ? 'text-agro-gold bg-white/5' : ''}`}
                >
                  {link.name}
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${mobileExpandedLink === link.name ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                // Link normal
                <a 
                  href={`#${link.href}`}
                  className="w-full text-center py-5 text-white hover:text-agro-gold font-bold text-lg uppercase tracking-wider border-b border-white/5 transition-colors"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              )}
              
              {/* Subcategories for Mobile with Animation */}
              {link.hasDropdown && (
                <div 
                  className={`w-full bg-black/20 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileExpandedLink === link.name ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
                  }`}
                >
                  {Object.values(Category).map((cat) => (
                    <a
                      key={cat}
                      href={`#category-${cat}`}
                      onClick={(e) => handleNavClick(e, `category-${cat}`)}
                      className="w-full text-center py-3 text-sm text-gray-300 hover:text-agro-gold hover:bg-white/5 tracking-widest uppercase transition-colors"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};