import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useLanguage } from '../context/LanguageContext';

const roomImages = {
  2: '/quartos/Suíte Casal.png',
  6: '/quartos/Suíte Duplo Solteiro.png',
  3: '/quartos/Suíte Triplo Casal.png',
  7: '/quartos/Suíte Triplo Solteiro.png',
  4: '/quartos/Suíte Quádruplo.png',
  5: [
    '/quartos/Suíte Adaptável.png',
    '/quartos/Banheiro Adaptável.jpeg',
    '/quartos/Banheiro Adaptável 1.jpeg'
  ]
};

const RoomImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(images)) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (!Array.isArray(images)) {
    return (
      <img 
        src={images} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        fetchPriority="high"
      />
    );
  }

  return (
    <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-700">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${title} - Imagem ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 z-20">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-alpha-gold w-3' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const RoomsGallery = ({ onOpenReservation }) => {
  const { t } = useLanguage();
  const rooms = [2, 6, 3, 7, 4, 5].map(id => ({
    id,
    ...t.rooms.items[id],
    image: roomImages[id]
  }));

  return (
    <section id="rooms" className="relative py-20 sm:py-32 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/backgroundalfa.jpg')" }}>
      <div className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">{t.rooms.sectionTitle}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-6xl text-white tracking-widest mb-6">
            {t.rooms.mainTitle.split(' ')[0]} <span className="text-alpha-gold">{t.rooms.mainTitle.split(' ').slice(1).join(' ')}</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto tracking-wide font-light">
            {t.rooms.description}
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
              <CarouselItem key={room.id} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4">
                <div 
                  className="group glass-dark rounded-xl overflow-hidden hover:border-alpha-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-alpha-gold/10 hover:-translate-y-2 h-full"
                >
                  <div className="p-0 flex flex-col h-full">
                    {/* Room Image */}
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <RoomImageCarousel images={room.image} title={room.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60 pointer-events-none z-10"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <h3 className="font-serif text-2xl text-alpha-gold tracking-wide mb-3">{room.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{room.description}</p>
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                        {room.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-alpha-gold shrink-0"></div>
                            <span className="text-gray-300 text-xs tracking-wide">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Button 
                          onClick={() => onOpenReservation(room)}
                          className="w-full bg-alpha-gold text-obsidian font-semibold tracking-wider hover:bg-alpha-gold/90 transition-all text-xs"
                        >
                          {t.rooms.checkAvailability}
                        </Button>
                      </div>
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
