import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-agro-primary text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Leather Texture Overlay */}
      <div className="absolute inset-0 leather-texture opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-ranch-display mb-6 flex items-center gap-2 group">
              <span className="text-agro-gold group-hover:text-white transition-colors duration-300">NUPEM</span>
              <span className="text-white/90">Agro</span>
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Levando a cultura do campo para o seu dia a dia através de produtos exclusivos e cheios de identidade. O agro não para, e o seu estilo também não.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xl font-ranch-accent mb-6 text-agro-gold uppercase tracking-widest">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300 justify-center md:justify-start">
                <MapPin className="shrink-0 text-agro-gold mt-1" size={20} />
                <span className="hover:text-agro-gold transition-colors cursor-default">Av. do Agronegócio, 1234<br/>Sinop - MT, Brasil</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                <Phone className="shrink-0 text-agro-gold" size={20} />
                <span className="hover:text-agro-gold transition-colors cursor-default">(66) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                <Mail className="shrink-0 text-agro-gold" size={20} />
                <span className="hover:text-agro-gold transition-colors cursor-default">nupem.fmvz@unesp.br</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xl font-ranch-accent mb-6 text-agro-gold uppercase tracking-widest">Siga-nos</h4>
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Instagram, href: "https://www.instagram.com/nupemunesp?igsh=ZHJ5cGVncTJtNTZ0", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/nupem/", label: "LinkedIn" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white/5 border border-white/10 rounded-full hover:border-agro-gold hover:bg-agro-gold/10 transition-all duration-500 overflow-hidden"
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-agro-gold scale-0 group-hover:scale-100 transition-transform duration-500 opacity-10"></div>
                  <social.icon size={22} className="relative z-10 text-white group-hover:text-agro-gold group-hover:scale-110 transition-all duration-500" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Fique por dentro das novidades e lançamentos exclusivos em nossas redes sociais.
            </p>
          </div>
        </div>

        {/* Fence Decoration */}
        <div className="fence-decoration opacity-30 mt-8 mb-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="post" />
          ))}
          <div className="rail" />
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} <span className="font-ranch-display text-agro-gold/80">NUPEM</span></p>
            <span className="text-white/10 hidden md:block">|</span>
            <p>Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-2 font-ranch-accent tracking-widest text-[10px] uppercase opacity-60">
            <span>Desenvolvido para o Agro</span>
            <div className="w-1 h-1 bg-agro-gold rounded-full"></div>
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

