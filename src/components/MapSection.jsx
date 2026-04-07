import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const MapSection = () => {
  const { t } = useLanguage();
  
  // Endereço e link de direções
  const address = "Alfa Plaza Hotel, Avenida Central Lote 1040, Núcleo Bandeirante, Brasília - DF, 71710-025";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  
  // URL do Google Maps Embed
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.760773636544!2d-47.9625!3d-15.8625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a2f58e6584067%3A0xc64b73796d13265d!2sAlfa%20Plaza%20Hotel!5e0!3m2!1spt-BR!2sbr!4v1712456000000!5m2!1spt-BR!2sbr";

  return (
    <section id="how-to-get" className="relative py-20 bg-obsidian border-b border-alpha-gold/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">LOCALIZAÇÃO</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            {t.map.titlePart1}<span className="text-alpha-gold">{t.map.titlePart2}</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto tracking-wide font-light leading-relaxed">
            {t.map.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map Container */}
          <div className="lg:col-span-2 relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-alpha-gold/20 shadow-2xl shadow-alpha-gold/10 fade-in-section">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.6) invert(0.9) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Alfa Plaza Hotel"
              className="grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

          {/* Info & Action Card */}
          <div className="flex flex-col h-full space-y-6 fade-in-section">
            <div className="p-8 glass-dark rounded-2xl border border-alpha-gold/20 flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-alpha-gold/10 border border-alpha-gold/30 rounded-full flex items-center justify-center mb-6">
                <MapPin className="text-alpha-gold" size={32} />
              </div>
              <h3 className="text-white font-serif text-2xl mb-4">Alfa Plaza Hotel</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                Avenida Central, Lote 1040<br />
                Núcleo Bandeirante - Brasília/DF<br />
                CEP: 71710-025
              </p>
              
              <Button 
                asChild
                className="btn-magic w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-8 hover:bg-alpha-gold/90 transition-all hover:scale-105"
              >
                <a 
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3"
                >
                  <Navigation size={20} />
                  {t.map.button}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
