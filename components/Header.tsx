import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const LogoBadge: React.FC<{ isScrolled: boolean; onClick: () => void }> = ({ isScrolled, onClick }) => {
  return (
    <div
      className="logo-container flex items-center gap-4 cursor-pointer group"
      onClick={onClick}
      title="Voltar ao topo"
    >
      {/* Left decorative line */}
      <div className="decorative-line left hidden lg:block" />

      {/* Central Badge */}
      <div className={`logo-badge ${isScrolled ? 'scrolled' : ''}`}>
        <img
          src="https://www.svgrepo.com/show/481194/cow-7.svg"
          alt="NUPEM Logo"
          className={`object-contain opacity-90 transition-all duration-400 ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'}`}
          style={{ filter: 'invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg)' }}
        />
        <span
          className={`font-display font-black text-agro-gold tracking-tight leading-none transition-all duration-400 ${isScrolled ? 'text-xs mt-0.5' : 'text-sm mt-1'}`}
        >
          NUPEM
        </span>
      </div>

      {/* Right decorative line */}
      <div className="decorative-line right hidden lg:block" />
    </div>
  );
};

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

  const leftLinks = [
    { name: 'Início', href: 'hero' },
    { name: 'Categorias', href: 'categories', hasDropdown: true },
  ];

  const rightLinks = [
    { name: 'Sobre', href: 'about' },
    { name: 'FAQ', href: 'faq' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setMobileExpandedLink(null);

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

  const renderNavLink = (link: { name: string; href: string; hasDropdown?: boolean }) => (
    <div key={link.name} className="relative group">
      <a
        href={`#${link.href}`}
        onClick={(e) => handleNavClick(e, link.href)}
        className="nav-link flex items-center gap-1 py-4"
      >
        {link.name}
        {link.hasDropdown && (
          <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
        )}
      </a>

      {/* Dropdown Menu */}
      {link.hasDropdown && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
          <div className="dropdown-menu bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-48 p-2">
            <div className="flex flex-col">
              {Object.values(Category).map((cat) => (
                <a
                  key={cat}
                  href={`#category-${cat}`}
                  onClick={(e) => handleNavClick(e, `category-${cat}`)}
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
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled || isMobileMenuOpen
          ? 'bg-agro-primary/95 backdrop-blur-md shadow-xl border-white/5 py-2'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Desktop Navigation - Grid Layout */}
        <div className="hidden md:grid navbar-grid">
          {/* Left Links */}
          <nav className="navbar-left">
            {leftLinks.map(renderNavLink)}
          </nav>

          {/* Center Logo */}
          <LogoBadge isScrolled={isScrolled} onClick={handleLogoClick} />

          {/* Right Links + Cart */}
          <nav className="navbar-right">
            {rightLinks.map(renderNavLink)}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-white hover:text-agro-gold transition-colors ml-4"
              aria-label="Abrir carrinho"
              title="Abrir carrinho (Alt + C)"
            >
              <ShoppingCart size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-agro-gold text-agro-primary text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            className="text-white hover:text-agro-gold transition-colors relative w-8 h-8 flex items-center justify-center z-50"
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

          {/* Mobile Center Logo */}
          <div
            className={`logo-badge mobile ${isScrolled ? 'scrolled' : ''}`}
            onClick={handleLogoClick}
          >
            <img
              src="https://www.svgrepo.com/show/481194/cow-7.svg"
              alt="NUPEM Logo"
              className="w-5 h-5 object-contain opacity-90"
              style={{ filter: 'invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg)' }}
            />
            <span className="font-display font-black text-agro-gold text-[8px] tracking-tight leading-none mt-0.5">
              NUPEM
            </span>
          </div>

          {/* Mobile Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-agro-gold transition-colors z-50"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={24} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-agro-gold text-agro-primary text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-agro-primary/95 backdrop-blur-xl shadow-2xl border-t border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen
            ? 'max-h-[calc(100vh-80px)] opacity-100 translate-y-0 visible'
            : 'max-h-0 opacity-0 -translate-y-4 invisible'
        }`}
      >
        <div className="flex flex-col items-center pb-10 pt-2 overflow-y-auto max-h-[80vh]">
          {allLinks.map((link) => (
            <React.Fragment key={link.name}>
              {link.hasDropdown ? (
                <button
                  onClick={(e) => toggleMobileDropdown(e, link.name)}
                  className={`w-full text-center py-5 font-nav text-xl tracking-widest text-white hover:text-agro-gold border-b border-white/5 transition-colors flex items-center justify-center gap-2 ${mobileExpandedLink === link.name ? 'text-agro-gold bg-white/5' : ''}`}
                >
                  {link.name}
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${mobileExpandedLink === link.name ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <a
                  href={`#${link.href}`}
                  className="w-full text-center py-5 font-nav text-xl tracking-widest text-white hover:text-agro-gold border-b border-white/5 transition-colors"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              )}

              {/* Subcategories for Mobile */}
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
