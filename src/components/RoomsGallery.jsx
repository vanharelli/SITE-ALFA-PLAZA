import React from 'react';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const rooms = [
  {
    id: 1,
    title: 'Suíte Executiva',
    description: 'Elegância funcional para executivos modernos',
    image: 'https://images.unsplash.com/photo-1759223198981-661cadbbff36?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlfGVufDB8fHx8MTc3MDY0Mjk3N3ww&ixlib=rb-4.1.0&q=85',
    features: ['35m²', 'King Size', 'Smart TV', 'Ar Condicionado'],
    price: 'A partir de R$ 280/noite',
    badge: 'DISPONÍVEL'
  },
  {
    id: 2,
    title: 'Suíte Premium',
    description: 'Conforto sofisticado com vista privilegiada',
    image: 'https://images.unsplash.com/photo-1761039265583-9489b4246454?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHN1aXRlfGVufDB8fHx8MTc3MDY0Mjk3N3ww&ixlib=rb-4.1.0&q=85',
    features: ['45m²', 'King Size', 'Varanda', 'Banheira'],
    price: 'A partir de R$ 380/noite',
    badge: 'DISPONÍVEL'
  },
  {
    id: 3,
    title: 'Suíte Master Gold',
    description: 'O ápice da exclusividade e requinte',
    image: 'https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGFtZW5pdGllc3xlbnwwfHx8fDE3NzA2NDI5ODJ8MA&ixlib=rb-4.1.0&q=85',
    features: ['60m²', 'Suite Dupla', 'Vista Panorâmica', 'Jacuzzi Privativa'],
    price: 'A partir de R$ 550/noite',
    badge: 'PREMIUM'
  },
  {
    id: 4,
    title: 'Quarto Quádruplo',
    description: 'Espaço ideal para família ou pequenos grupos, com conforto completo',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2070&q=80',
    features: ['40m²', '4 hóspedes', '2 Camas de Casal', 'Smart TV'],
    price: 'A partir de R$ 420/noite',
    badge: 'FAMÍLIA'
  },
  {
    id: 5,
    title: 'Quarto Adaptável',
    description: 'Acessibilidade, praticidade e conforto, com estrutura pensada para PCD',
    image: 'https://images.unsplash.com/photo-1616593969747-4797dc75033e?auto=format&fit=crop&w=2070&q=80',
    features: ['35m²', 'Acessível (PCD)', 'Banheiro adaptado', 'Barras de apoio'],
    price: 'A partir de R$ 320/noite',
    badge: 'ACESSÍVEL'
  }
];

const RoomsGallery = () => {
  return (
    <section id="rooms" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm z-0"></div>

      <div className="max-w-7xl mx-auto px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
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

        {/* Rooms Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {rooms.map((room, index) => (
              <CarouselItem key={room.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div 
                  className="group glass-dark rounded-xl overflow-hidden hover:border-alpha-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-alpha-gold/10 hover:-translate-y-2 h-full"
                >
                  <div className="p-0 flex flex-col h-full">
                    {/* Room Image */}
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <img 
                        src={room.image} 
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        fetchPriority="high"
                        loading="eager"
                        decoding="sync"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent"></div>
                      
                      {/* Room Badge */}
                      <div className="absolute top-4 right-4 px-4 py-2 bg-alpha-gold/90 backdrop-blur-sm rounded-full">
                        <span className="text-obsidian text-xs font-semibold tracking-wider">{room.badge || 'DISPONÍVEL'}</span>
                      </div>
                    </div>

                    {/* Room Details */}
                    <div className="p-6 space-y-4 flex flex-col flex-grow">
                      <h3 className="font-serif text-2xl text-alpha-gold tracking-wide">{room.title}</h3>
                      <p className="text-gray-400 text-sm tracking-wide font-light leading-relaxed">{room.description}</p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-alpha-gold/20 mt-auto">
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
                        <Button 
                          className="w-full bg-alpha-gold text-obsidian font-semibold tracking-wider hover:bg-alpha-gold/90 mt-2 transition-all"
                        >
                          RESERVAR
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="carousel-btn-glass animate-slide-left -left-12 border-none bg-transparent hover:bg-transparent shadow-none" />
            <CarouselNext className="carousel-btn-glass animate-slide-right -right-12 border-none bg-transparent hover:bg-transparent shadow-none" />
          </div>
        </Carousel>

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
