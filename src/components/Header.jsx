import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { useLanguage } from '../context/LanguageContext';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LanguageSelector = ({ mobile = false }) => (
    <div className={`${mobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-4 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10'}`}>
      <button 
        onClick={() => changeLanguage('pt')}
        className={`flex items-center space-x-2 transition-colors text-xs tracking-wide group ${language === 'pt' ? 'text-alpha-gold' : 'text-gray-300 hover:text-alpha-gold'}`}
      >
        <img src="https://flagcdn.com/br.svg" alt="Português" className="w-4 h-3 object-cover rounded-[1px] opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>PT</span>
      </button>
      {!mobile && <div className="w-px h-3 bg-white/10"></div>}
      <button 
        onClick={() => changeLanguage('en')}
        className={`flex items-center space-x-2 transition-colors text-xs tracking-wide group ${language === 'en' ? 'text-alpha-gold' : 'text-gray-300 hover:text-alpha-gold'}`}
      >
        <img src="https://flagcdn.com/us.svg" alt="English" className="w-4 h-3 object-cover rounded-[1px] opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>EN</span>
      </button>
      {!mobile && <div className="w-px h-3 bg-white/10"></div>}
      <button 
        onClick={() => changeLanguage('es')}
        className={`flex items-center space-x-2 transition-colors text-xs tracking-wide group ${language === 'es' ? 'text-alpha-gold' : 'text-gray-300 hover:text-alpha-gold'}`}
      >
        <img src="https://flagcdn.com/es.svg" alt="Español" className="w-4 h-3 object-cover rounded-[1px] opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>ES</span>
      </button>
    </div>
  );

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-alpha-gold/30' : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {!logoError ? (
              <div className="logo-module">
                <img
                  src="/logo.webp"
                  alt="Alpha Plaza Hotel"
                  className="h-8 w-auto z-10"
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : null}
            <div>
              <h1 className="font-serif text-xl tracking-widest text-white">
                ALFA <span className="text-alpha-gold">PLAZA</span>
              </h1>
              <p className="text-white text-xs tracking-wider">HOTEL</p>
            </div>
          </div>

          {/* Desktop Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center">
            <a 
              href="https://wa.me/5561982062229"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button 
                className="bg-alpha-gold text-obsidian font-semibold tracking-wider hover:bg-alpha-gold/90 transition-all hover:scale-105 px-6 py-2"
              >
                {t.header.bookButton}
              </Button>
            </a>
          </nav>

          {/* Mobile Actions: Language Switcher + Menu */}
          <div className="flex items-center space-x-6 md:hidden">
            {/* Minimalist Mobile Language Switcher */}
            <div className="flex items-center space-x-3">
              {['PT', 'EN', 'ES'].map((lang, index) => (
                <React.Fragment key={lang}>
                  <button
                    onClick={() => changeLanguage(lang.toLowerCase())}
                    className={`text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                      language === lang.toLowerCase() ? 'text-alpha-gold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                  {index < 2 && <span className="text-white/20 text-[10px]">|</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-obsidian border-l border-alpha-gold/30 w-[300px] sm:w-[400px]">
                <VisuallyHidden.Root>
                  <SheetTitle>Menu de Navegação</SheetTitle>
                  <SheetDescription>Acesse as opções de idioma e reserva.</SheetDescription>
                </VisuallyHidden.Root>
                <div className="flex flex-col h-full py-6 space-y-8">
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-alpha-gold font-serif text-lg tracking-widest mb-4">IDIOMA</h3>
                    <LanguageSelector mobile={true} />
                  </div>
                  
                  <div className="flex-1">
                    <a 
                      href="https://wa.me/5561982062229"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button 
                        className="w-full bg-alpha-gold text-obsidian font-semibold tracking-wider hover:bg-alpha-gold/90 transition-all h-12"
                      >
                        {t.header.bookButton}
                      </Button>
                    </a>
                  </div>

                  <div className="text-center text-gray-500 text-xs tracking-wide">
                    <p>ALFA PLAZA HOTEL</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
