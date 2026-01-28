import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-agro-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-agro-gold">NUPEM</span> Agro
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Levando a cultura do campo para o seu dia a dia através de produtos exclusivos e cheios de identidade. O agro não para, e o seu estilo também não.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-agro-gold">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="shrink-0 text-agro-gold" size={20} />
                <span>Av. do Agronegócio, 1234<br/>Sinop - MT, Brasil</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="shrink-0 text-agro-gold" size={20} />
                <span>(66) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="shrink-0 text-agro-gold" size={20} />
                <span>nupem.fmvz@unesp.br</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-agro-gold">Siga-nos</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.instagram.com/nupemunesp?igsh=ZHJ5cGVncTJtNTZ0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-agro-gold hover:text-agro-primary p-3 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-agro-gold hover:text-agro-primary p-3 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/company/nupem/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAPifrVleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacUsaD_KHHnQ6jGG2l5I-LEUiomXJPjrtnUxUMeNyOVphMoRly3p5OpC9gljQ_aem_ylIARfGUoOIt9Co_TnJVPg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-agro-gold hover:text-agro-primary p-3 rounded-full transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Fique por dentro das novidades e lançamentos exclusivos em nossas redes sociais.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} NUPEM. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Desenvolvido para o Agro.</p>
        </div>
      </div>
    </footer>
  );
};
