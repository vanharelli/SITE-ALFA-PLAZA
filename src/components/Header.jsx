import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { useLanguage } from '../context/LanguageContext';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const Header = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(currentScroll > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LanguageSelector = ({ mobile = false }) => (
    <div className={`${mobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-2 sm:space-x-4 bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-1.5 rounded-full border border-white/10'}`}>
      <button 
        onClick={() => changeLanguage('pt')}
        className={`flex items-center space-x-1 sm:space-x-2 transition-colors text-[10px] sm:text-xs tracking-wide group ${language === 'pt' ? 'text-alpha-gold' : 'text-gray-300 hover:text-alpha-gold'}`}
      >
        <img src="https://flagcdn.com/br.svg" alt="Português" className="w-3 h-2 sm:w-4 sm:h-3 object-cover rounded-[1px] opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>PT</span>
      </button>
      {!mobile && <div className="w-px h-3 bg-white/10"></div>}
      <button 
        onClick={() => changeLanguage('en')}
        className={`flex items-center space-x-1 sm:space-x-2 transition-colors text-[10px] sm:text-xs tracking-wide group ${language === 'en' ? 'text-alpha-gold' : 'text-gray-300 hover:text-alpha-gold'}`}
      >
        <img src="https://flagcdn.com/us.svg" alt="English" className="w-3 h-2 sm:w-4 sm:h-3 object-cover rounded-[1px] opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>EN</span>
      </button>
      {!mobile && <div className="w-px h-3 bg-white/10"></div>}
      <button 
        onClick={() => changeLanguage('es')}
        className={`flex items-center space-x-1 sm:space-x-2 transition-colors text-[10px] sm:text-xs tracking-wide group ${language === 'es' ? 'text-alpha-gold' : 'text-gray-300 hover:text-alpha-gold'}`}
      >
        <img src="https://flagcdn.com/es.svg" alt="Español" className="w-3 h-2 sm:w-4 sm:h-3 object-cover rounded-[1px] opacity-80 group-hover:opacity-100 transition-opacity" />
        <span>ES</span>
      </button>
    </div>
  );

  return (
    <header 
      style={{ top: 0, left: 0, right: 0, position: 'fixed' }}
      className={`z-[100] w-full pointer-events-none transition-all duration-300 transform-gpu select-none ${ 
        isScrolled ? 'bg-black/70 shadow-lg border-b border-alpha-gold/30 backdrop-blur-xl h-16 md:h-20' : 'bg-transparent border-b border-transparent h-16 md:h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center pt-[env(safe-area-inset-top)] pointer-events-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            {/* Logo em todos os dispositivos */}
            {!logoError && (
              <div className="flex logo-module w-10 h-10 md:w-12 md:h-12 mr-2">
                <img
                  src="/logo1.png"
                  alt="Alpha Plaza Hotel"
                  className="w-full h-full object-cover p-0.5"
                  onError={() => setLogoError(true)}
                />
              </div>
            )}
            <div className="flex flex-col items-start">
              <h1 className="font-serif text-lg md:text-xl tracking-widest text-white leading-none">
                ALFA <span className="text-alpha-gold">PLAZA</span>
              </h1>
              <p className="text-white text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5">HOTEL</p>
            </div>
          </div>

          {/* Desktop Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center">
            <Button 
              onClick={onOpenReservation}
              className="btn-magic bg-alpha-gold text-obsidian font-semibold tracking-wider hover:bg-alpha-gold/90 transition-all hover:scale-105 px-6 py-2"
            >
              {t.header.bookButton}
            </Button>
          </nav>

          {/* Mobile Actions: Language Switcher */}
          <div className="md:hidden">
            <LanguageSelector mobile={false} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
