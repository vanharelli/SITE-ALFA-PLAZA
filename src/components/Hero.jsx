import React from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = ({ onOpenReservation }) => {
  const { t } = useLanguage();

  const scrollToRooms = () => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-cover bg-center bg-fixed border-b border-alpha-gold/30" style={{ backgroundImage: "url('/backgroundalfa.webp')" }}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          fetchPriority="high"
          className="w-full h-full object-cover"
        >
          <source src="/background video.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-md md:backdrop-blur-sm z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center pt-64 md:pt-80 pb-20 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline */}
          <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 p-6 md:p-12">
            {/* Mobile Logo Module */}
            <div className="md:hidden flex justify-center mb-4">
              <div className="logo-module w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-alpha-gold/30 backdrop-blur-md relative overflow-hidden shadow-lg shadow-alpha-gold/10">
                <img src="/logo.webp" alt="Alpha Plaza Hotel" className="w-full h-full object-cover p-1" />
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-widest leading-tight mb-4">
            <span className="text-white">ALFA </span>
            <span className="text-alpha-gold">PLAZA</span>
            <span className="text-white"> HOTEL</span>
          </h1>
          
          <div className="h-px w-32 bg-alpha-gold mx-auto mb-4"></div>
          
          <p className="text-lg md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full max-w-md mx-auto sm:max-w-none">
              <Button 
                onClick={onOpenReservation}
                className="btn-magic w-full sm:w-auto px-10 py-7 bg-alpha-gold text-obsidian font-semibold tracking-widest text-base hover:bg-alpha-gold/90 transition-all hover:scale-105"
              >
                {t.hero.cta}
              </Button>
            </div>
            
            <div className="flex flex-col items-center mt-6 mb-24 md:mb-48 space-y-2 animate-pulse">
              <p className="text-sm md:text-base text-gray-300 font-bold italic tracking-wide">
                {t.hero.promo}
              </p>
              <ChevronDown className="text-alpha-gold w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Removed */}
    </section>
  );
};

export default Hero;
