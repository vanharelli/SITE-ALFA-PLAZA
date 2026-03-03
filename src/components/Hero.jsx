import React from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const scrollToRooms = () => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background video.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
        <div className="absolute inset-0 bg-obsidian/40 backdrop-blur-[10px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center pt-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 p-12">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest leading-tight mb-4">
            <span className="text-white">ALFA </span>
            <span className="text-alpha-gold">PLAZA</span>
            <span className="text-white"> HOTEL</span>
          </h1>
          
          <div className="h-px w-32 bg-alpha-gold mx-auto mb-4"></div>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a 
                href="https://wa.me/5561982062229"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="px-10 py-7 bg-alpha-gold text-obsidian font-semibold tracking-widest text-base hover:bg-alpha-gold/90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-alpha-gold/20"
                >
                  {t.hero.cta}
                </Button>
              </a>
            </div>
            
            <p className="text-sm md:text-base text-gray-300 font-light italic tracking-wide mt-6 animate-pulse">
              {t.hero.promo}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-alpha-gold" size={32} />
      </div>
    </section>
  );
};

export default Hero;
