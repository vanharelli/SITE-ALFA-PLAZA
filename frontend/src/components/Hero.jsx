import React from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToRooms = () => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1677129667171-92abd8740fa3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDB8fHx8MTc3MDY0Mjk3Mnww&ixlib=rb-4.1.0&q=85"
          alt="Luxury Hotel Lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-obsidian/40 backdrop-blur-sm mb-6">
              <span className="text-alpha-gold text-sm tracking-widest font-light">TAGUATINGA • BRASÍLIA</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-widest leading-tight mb-6">
              ALPHA PLAZA
              <span className="block text-alpha-gold mt-2">HOTEL</span>
            </h1>
            
            <div className="h-px w-32 bg-alpha-gold mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
              A Nova Era da Hospitalidade Estratégica
            </p>
            
            <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto mb-12">
              Onde o luxo encontra a tecnologia de elite
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
                  RESERVAR AGORA
                </Button>
              </a>
              
              <Button 
                onClick={scrollToRooms}
                variant="outline"
                className="px-10 py-7 border-2 border-alpha-gold/50 text-alpha-gold bg-transparent font-semibold tracking-widest text-base hover:bg-alpha-gold/10 transition-all hover:border-alpha-gold"
              >
                EXPLORAR SUÍTES
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-alpha-gold" size={32} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-alpha-gold/20 rotate-45 hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-alpha-gold/20 rotate-12 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
