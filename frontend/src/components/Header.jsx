import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-obsidian/95 backdrop-blur-lg border-b border-alpha-gold/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-alpha-gold/10 border border-alpha-gold rounded-lg flex items-center justify-center">
              <span className="text-alpha-gold font-serif text-2xl font-bold">Α</span>
            </div>
            <div>
              <h1 className="text-alpha-gold font-serif text-xl tracking-widest">ALPHA PLAZA</h1>
              <p className="text-gray-400 text-xs tracking-wider">HOTEL</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('rooms')} className="text-gray-300 hover:text-alpha-gold transition-colors tracking-wide text-sm">
              SUÍTES
            </button>
            <button onClick={() => scrollToSection('amenities')} className="text-gray-300 hover:text-alpha-gold transition-colors tracking-wide text-sm">
              COMODIDADES
            </button>
            <button onClick={() => scrollToSection('protocol')} className="text-gray-300 hover:text-alpha-gold transition-colors tracking-wide text-sm">
              PROTOCOLO DIGITAL
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-alpha-gold text-obsidian font-semibold tracking-wider text-sm hover:bg-alpha-gold/90 transition-all hover:scale-105"
            >
              CONTATO
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-alpha-gold"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <button onClick={() => scrollToSection('rooms')} className="block w-full text-left text-gray-300 hover:text-alpha-gold transition-colors tracking-wide text-sm py-2">
              SUÍTES
            </button>
            <button onClick={() => scrollToSection('amenities')} className="block w-full text-left text-gray-300 hover:text-alpha-gold transition-colors tracking-wide text-sm py-2">
              COMODIDADES
            </button>
            <button onClick={() => scrollToSection('protocol')} className="block w-full text-left text-gray-300 hover:text-alpha-gold transition-colors tracking-wide text-sm py-2">
              PROTOCOLO DIGITAL
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full px-6 py-2 bg-alpha-gold text-obsidian font-semibold tracking-wider text-sm hover:bg-alpha-gold/90 transition-colors"
            >
              CONTATO
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
