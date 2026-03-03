import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass-dark border-b border-white/10' : 'bg-transparent'
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

          {/* Desktop & Mobile Navigation */}
          <nav className="flex items-center">
            <a 
              href="https://wa.me/5561982062229"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button 
                className="bg-alpha-gold text-obsidian font-semibold tracking-wider hover:bg-alpha-gold/90 transition-all hover:scale-105 px-6 py-2"
              >
                RESERVAR AGORA
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
