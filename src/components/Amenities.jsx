import React from 'react';
import { Wifi, Coffee, Bell, Car, UserCheck, ArrowUpFromDot, ShieldCheck, Smartphone, Wind, Shirt, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const Amenities = ({ onOpenReservation }) => {
  const { t } = useLanguage();
  
  const amenityIcons = [
    Wifi, Utensils, Coffee, Bell, Car, UserCheck, ArrowUpFromDot, ShieldCheck, Smartphone, Wind, Shirt
  ];

  return (
    <section id="amenities" className="relative pt-10 pb-10 sm:pt-20 sm:pb-20 bg-cover bg-center bg-fixed border-b border-alpha-gold/30" style={{ backgroundImage: "url('/backgroundalfa.webp')" }}>
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">{t.amenities.sectionTitle}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            {t.amenities.mainTitlePart1}<span className="text-alpha-gold">{t.amenities.mainTitlePart2}</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto tracking-wide font-light leading-relaxed">
            {t.amenities.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {t.amenities.items.map((item, index) => {
            const Icon = amenityIcons[index] || ShieldCheck;
            return (
              <div 
                key={index} 
                className="group p-6 glass-dark rounded-xl border border-alpha-gold/30 hover:border-alpha-gold/60 transition-all duration-500 hover:-translate-y-1 fade-in-section flex flex-col items-center text-center" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mb-4 flex items-center justify-center bg-obsidian-light border border-alpha-gold/20 rounded-full group-hover:bg-alpha-gold/10 group-hover:border-alpha-gold/40 transition-colors">
                  <Icon className="text-alpha-gold" size={24} />
                </div>
                <h3 className="text-white font-serif text-lg mb-2 tracking-wide">{item.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center fade-in-section relative z-10">
          <Button 
            onClick={onOpenReservation}
            className="btn-magic bg-alpha-gold text-obsidian font-bold tracking-[0.2em] uppercase px-10 py-6 text-lg hover:bg-alpha-gold/90 transition-all hover:scale-105 shadow-xl shadow-alpha-gold/20"
          >
            {t.header.bookButton}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Amenities;