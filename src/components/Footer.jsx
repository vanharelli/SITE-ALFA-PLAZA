import React from 'react';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-dark border-t border-white/10 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-sm z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="logo-module">
                <img
                  src="/logo.webp"
                  alt="Alpha Plaza Hotel"
                  className="h-8 w-auto z-10"
                />
              </div>
              <div>
                <h3 className="text-alpha-gold font-serif text-xl tracking-widest">ALFA PLAZA</h3>
                <p className="text-gray-400 text-xs tracking-wider">HOTEL</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
              A nova era da hospitalidade estratégica em Brasília, onde o luxo encontra a excelência.
            </p>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-alpha-gold font-semibold tracking-widest text-sm mb-6">CONTATO</h4>
            <div className="space-y-4 mb-6 text-left md:text-right">
              <div className="flex items-center space-x-3 md:flex-row-reverse md:space-x-reverse">
                <Phone size={16} className="text-alpha-gold" />
                <a href="tel:+5561982062229" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                  (61) 98206-2229
                </a>
              </div>
              <div className="flex items-center space-x-3 md:flex-row-reverse md:space-x-reverse">
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
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-6 mb-2">
              <a href="#" className="text-gray-500 hover:text-alpha-gold text-xs tracking-wide transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-500 hover:text-alpha-gold text-xs tracking-wide transition-colors">
                Política de Privacidade
              </a>
            </div>
            <p className="text-gray-500 text-sm tracking-wide">
              © {currentYear} Alfa Plaza Hotel. Todos os direitos reservados.
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
