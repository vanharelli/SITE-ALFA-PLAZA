import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Bed, Maximize, Wifi, Coffee } from 'lucide-react';

const rooms = [
  {
    id: 1,
    title: 'Suíte Executiva',
    description: 'Elegância funcional para executivos modernos',
    image: 'https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlfGVufDB8fHx8MTc3MDY0Mjk3N3ww&ixlib=rb-4.1.0&q=85',
    features: ['35m²', 'King Size', 'Smart TV', 'Ar Condicionado'],
    price: 'A partir de R$ 280/noite'
  },
  {
    id: 2,
    title: 'Suíte Premium',
    description: 'Conforto sofisticado com vista privilegiada',
    image: 'https://images.unsplash.com/photo-1761039265583-9489b4246454?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlfGVufDB8fHx8MTc3MDY0Mjk3N3ww&ixlib=rb-4.1.0&q=85',
    features: ['45m²', 'King Size', 'Varanda', 'Banheira'],
    price: 'A partir de R$ 380/noite'
  },
  {
    id: 3,
    title: 'Suíte Master Gold',
    description: 'O ápice da exclusividade e requinte',
    image: 'https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGFtZW5pdGllc3xlbnwwfHx8fDE3NzA2NDI5ODJ8MA&ixlib=rb-4.1.0&q=85',
    features: ['60m²', 'Suite Dupla', 'Vista Panorâmica', 'Jacuzzi Privativa'],
    price: 'A partir de R$ 550/noite'
  }
];

const RoomsGallery = () => {
  return (
    <section id="rooms" className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-alpha-gold/5 backdrop-blur-sm mb-6">
            <span className="text-alpha-gold text-sm tracking-widest font-light">ACOMODAÇÕES</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            NOSSAS <span className="text-alpha-gold">SUÍTES</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto tracking-wide font-light">
            Três níveis de excelência, cada um projetado para superar expectativas
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <Card 
              key={room.id} 
              className="group bg-obsidian-light/40 backdrop-blur-xl border border-alpha-gold/20 hover:border-alpha-gold/60 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-alpha-gold/10 hover:-translate-y-2 fade-in-section"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                {/* Room Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent"></div>
                  
                  {/* Room Badge */}
                  <div className="absolute top-4 right-4 px-4 py-2 bg-alpha-gold/90 backdrop-blur-sm">
                    <span className="text-obsidian text-xs font-semibold tracking-wider">{room.id === 3 ? 'PREMIUM' : 'DISPONÍVEL'}</span>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl text-alpha-gold tracking-wide">{room.title}</h3>
                  <p className="text-gray-400 text-sm tracking-wide font-light leading-relaxed">{room.description}</p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-alpha-gold/20">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-alpha-gold rounded-full"></div>
                        <span className="text-gray-300 text-xs tracking-wide">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-4">
                    <p className="text-alpha-gold font-semibold text-lg tracking-wide">{room.price}</p>
                  </div>

                  {/* CTA Button */}
                  <a 
                    href="https://wa.me/5561982062229"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-transparent border border-alpha-gold/50 text-alpha-gold hover:bg-alpha-gold hover:text-obsidian transition-all tracking-widest text-sm py-6">
                      VER DETALHES
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center fade-in-section">
          <p className="text-gray-400 text-sm tracking-wide">
            *Tarifas sujeitas à disponibilidade e período de reserva
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoomsGallery;
