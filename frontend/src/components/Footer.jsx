import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-dark border-t border-alpha-gold/20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-alpha-gold/10 border border-alpha-gold flex items-center justify-center">
                <span className="text-alpha-gold font-serif text-2xl font-bold">Α</span>
              </div>
              <div>
                <h3 className="text-alpha-gold font-serif text-xl tracking-widest">ALPHA PLAZA</h3>
                <p className="text-gray-400 text-xs tracking-wider">HOTEL</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
              A nova era da hospitalidade estratégica em Brasília, onde o luxo encontra a excelência.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-alpha-gold font-semibold tracking-widest text-sm mb-6">LINKS RÁPIDOS</h4>
            <ul className="space-y-3">
              <li>
                <a href="#rooms" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                  Suítes
                </a>
              </li>
              <li>
                <a href="#amenities" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                  Comodidades
                </a>
              </li>
              <li>
                <a href="#location" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                  Localização
                </a>
              </li>
              <li>
                <a href="https://wa.me/5561982062229" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-alpha-gold font-semibold tracking-widest text-sm mb-6">CONTATO</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-alpha-gold" />
                <a href="tel:+5561982062229" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                  (61) 98206-2229
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-alpha-gold" />
                <span className="text-gray-400 text-sm tracking-wide">
                  contato@alfaplazahotel.com.br
                </span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 border border-alpha-gold/30 flex items-center justify-center hover:bg-alpha-gold/10 hover:border-alpha-gold transition-all"
              >
                <Instagram size={18} className="text-alpha-gold" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-alpha-gold/30 flex items-center justify-center hover:bg-alpha-gold/10 hover:border-alpha-gold transition-all"
              >
                <Facebook size={18} className="text-alpha-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-alpha-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm tracking-wide">
              © {currentYear} Alpha Plaza Hotel. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm tracking-wide">Powered by</span>
              <span className="text-alpha-gold font-semibold text-sm tracking-wider">Marketelli Intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
