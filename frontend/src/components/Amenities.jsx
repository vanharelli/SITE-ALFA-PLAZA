import React from 'react';
import { Wifi, UtensilsCrossed, Car, Clock, Droplet, Wind, Shield, Smartphone } from 'lucide-react';

const amenities = [
  {
    icon: Wifi,
    title: 'Wi-Fi Ultra-Rápido',
    description: 'Conexão de alta velocidade em todos os ambientes'
  },
  {
    icon: UtensilsCrossed,
    title: 'Café da Manhã Gourmet',
    description: 'Buffet completo com opções internacionais'
  },
  {
    icon: Clock,
    title: 'Room Service 24h',
    description: 'Atendimento exclusivo a qualquer momento'
  },
  {
    icon: Car,
    title: 'Estacionamento Privativo',
    description: 'Vagas cobertas com segurança 24 horas'
  },
  {
    icon: Wind,
    title: 'Climatização Inteligente',
    description: 'Controle individual de temperatura'
  },
  {
    icon: Droplet,
    title: 'Amenities Premium',
    description: 'Produtos de higiene de marcas exclusivas'
  },
  {
    icon: Shield,
    title: 'Segurança Avançada',
    description: 'Monitoramento 24h e acesso controlado'
  },
  {
    icon: Smartphone,
    title: 'Check-in Digital',
    description: 'Processo ágil e sem burocracia'
  }
];

const Amenities = () => {
  return (
    <section id="amenities" className="py-24 bg-gradient-to-b from-obsidian to-obsidian-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-alpha-gold rotate-45"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 border border-alpha-gold rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-alpha-gold -rotate-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-alpha-gold/5 backdrop-blur-sm mb-6">
            <span className="text-alpha-gold text-sm tracking-widest font-light">EXPERIÊNCIA COMPLETA</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            COMODIDADES <span className="text-alpha-gold">EXCLUSIVAS</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto tracking-wide font-light">
            Cada detalhe pensado para proporcionar o máximo conforto e conveniência
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="group fade-in-section"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full p-8 bg-obsidian-light/40 backdrop-blur-xl border border-alpha-gold/20 hover:border-alpha-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-alpha-gold/10 hover:-translate-y-2">
                {/* Icon Container */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-alpha-gold/10 border border-alpha-gold/30 flex items-center justify-center group-hover:bg-alpha-gold/20 group-hover:border-alpha-gold transition-all duration-500 group-hover:scale-110">
                    <amenity.icon className="text-alpha-gold" size={32} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-white tracking-wide mb-3 group-hover:text-alpha-gold transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-gray-400 text-sm tracking-wide font-light leading-relaxed">
                  {amenity.description}
                </p>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-alpha-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Highlights */}
        <div className="mt-20 fade-in-section">
          <div className="bg-alpha-gold/5 backdrop-blur-xl border border-alpha-gold/30 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="font-serif text-4xl text-alpha-gold mb-2">100%</h4>
                <p className="text-gray-400 text-sm tracking-widest">CLIMATIZADO</p>
              </div>
              <div>
                <h4 className="font-serif text-4xl text-alpha-gold mb-2">24/7</h4>
                <p className="text-gray-400 text-sm tracking-widest">ATENDIMENTO</p>
              </div>
              <div>
                <h4 className="font-serif text-4xl text-alpha-gold mb-2">5★</h4>
                <p className="text-gray-400 text-sm tracking-widest">AVALIAÇÃO</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
