import React from 'react';
import { Wifi, Dumbbell, UtensilsCrossed, ParkingSquare, Wind } from 'lucide-react';

const amenities = [
  { icon: Wifi, name: 'Wi-Fi de Alta Velocidade' },
  { icon: Dumbbell, name: 'Academia Completa' },
  { icon: UtensilsCrossed, name: 'Restaurante Premium' },
  { icon: ParkingSquare, name: 'Estacionamento Privativo' },
  { icon: Wind, name: 'Ambientes Climatizados' },
];

const Amenities = () => {
  return (
    <section id="amenities" className="py-24 bg-obsidian-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">CONFORTO & LAZER</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            NOSSAS <span className="text-alpha-gold">COMODIDADES</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto tracking-wide font-light leading-relaxed">
            Oferecemos uma infraestrutura completa, pensada para garantir que sua estadia seja tão produtiva quanto relaxante.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {amenities.map((item, index) => (
            <div key={index} className="text-center fade-in-section" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-obsidian-light border border-alpha-gold/20 rounded-full">
                <item.icon className="text-alpha-gold" size={32} />
              </div>
              <p className="text-gray-300 tracking-wide">{item.name}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-alpha-gold/5 backdrop-blur-xl border border-alpha-gold/30 p-8 md:p-12 fade-in-section">
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
    </section>
  );
};

export default Amenities;