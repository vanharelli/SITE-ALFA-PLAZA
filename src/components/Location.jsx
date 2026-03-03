import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';

const Location = () => {
  return (
    <section id="location" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm z-0"></div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">LOCALIZAÇÃO ESTRATÉGICA</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            NO CORAÇÃO DE <span className="text-alpha-gold">BRASÍLIA</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Contact Information */}
          <div className="space-y-8 fade-in-section">
            <div>
              <h3 className="font-serif text-3xl text-alpha-gold mb-6 tracking-wide">
                Acesso Privilegiado
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed tracking-wide font-light mb-8">
                Estrategicamente localizado em Taguatinga, nosso hotel oferece fácil acesso aos principais pontos de Brasília, combinando conveniência urbana com tranquilidade.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <MapPin className="text-alpha-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold tracking-wide mb-2">Endereço</h4>
                  <p className="text-gray-400 text-sm tracking-wide">
                    Avenida Central, Lote 1040<br />
                    Núcleo Bandeirante - Brasília/DF
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <Phone className="text-alpha-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold tracking-wide mb-2">Telefone</h4>
                  <a href="tel:+5561982062229" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                    +55 (61) 98206-2229
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <Clock className="text-alpha-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold tracking-wide mb-2">Atendimento</h4>
                  <p className="text-gray-400 text-sm tracking-wide">
                    24 horas por dia, 7 dias por semana
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div id="contact" className="pt-8">
              <div className="glass-dark rounded-xl border border-white/5 p-8">
                <h4 className="font-serif text-2xl text-alpha-gold mb-4 tracking-wide">
                  Fale com Nosso Consultor
                </h4>
                <p className="text-gray-400 text-sm mb-6 tracking-wide">
                  Nossa equipe está pronta para atendê-lo e criar a experiência perfeita para sua estadia.
                </p>
                <a 
                  href="https://wa.me/5561982062229"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-alpha-gold text-obsidian font-semibold tracking-widest hover:bg-alpha-gold/90 transition-all hover:scale-105 py-6">
                    FALAR COM CONSULTOR
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map/Image */}
          <div className="fade-in-section">
            <div className="relative h-[600px] border border-alpha-gold/30 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDB8fHx8MTc3MDY0Mjk3Mnww&ixlib=rb-4.1.0&q=85"
                alt="Hotel Location"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent"></div>
              
              {/* Overlay Info */}
              <div className="absolute bottom-8 left-8 right-8 bg-obsidian/80 backdrop-blur-xl border border-alpha-gold/30 p-6">
                <h5 className="text-alpha-gold font-serif text-xl mb-2 tracking-wide">Taguatinga</h5>
                <p className="text-gray-300 text-sm tracking-wide">
                  Região administrativa estratégica de Brasília, com fácil acesso ao Plano Piloto e principais vias da capital.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Points of Interest */}
        <div className="mt-20 fade-in-section">
          <h3 className="font-serif text-3xl text-white text-center mb-12 tracking-widest">
            PONTOS DE <span className="text-alpha-gold">INTERESSE</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Aeroporto JK', distance: '15 km' },
              { name: 'Esplanada', distance: '18 km' },
              { name: 'Shopping Taguatinga', distance: '3 km' },
              { name: 'Setor Hoteleiro', distance: '20 km' }
            ].map((point, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-obsidian-light/40 backdrop-blur-xl border border-alpha-gold/20 hover:border-alpha-gold/60 transition-all duration-300"
              >
                <p className="text-alpha-gold font-serif text-2xl mb-2">{point.distance}</p>
                <p className="text-gray-400 text-sm tracking-wide">{point.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
