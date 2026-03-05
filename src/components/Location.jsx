import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Quote, X, ChevronLeft, ChevronRight, Plane, Shield, Flag, Landmark, FileText, Building2, Trophy, Mic, ShoppingBag, Bus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const hotelImages = [
  '/hotel/1.webp',
  '/hotel/2.webp',
  '/hotel/3.webp',
  '/hotel/4.webp',
  '/hotel/5.webp',
  '/hotel/6.webp',
  '/hotel/7.webp',
  '/hotel/8.webp',
  '/hotel/9.webp',
  '/hotel/10.webp',
  '/hotel/11.webp',
  '/hotel/12.webp',
  '/hotel/13.webp'
];

const testimonials = [
  { name: "Dr. Marcos Andrade", role: "Google", text: "Excelente custo-benefício! Quarto confortável, limpo e com ótima localização para viagens a negócios ou lazer." },
  { name: "Dra. Ana Paula Silva", role: "Booking.com", text: "Atendimento da equipe impecável — sempre educados e solícitos com qualquer solicitação." },
  { name: "Roberto Souza", role: "Trivago", text: "Café da manhã saboroso e bem servido, superando expectativas pelo preço da diária." },
  { name: "Juliana Ferreira", role: "Expedia", text: "Wi-Fi de alta velocidade e quartos equipados com tudo que é necessário para uma estadia tranquila." },
  { name: "Dr. Ricardo Mendes", role: "Google", text: "A localização é ótima, próxima ao aeroporto e a opções de restaurantes e serviços." },
  { name: "Carla Teixeira", role: "Booking.com", text: "Quarto limpo e arrumado, com ar-condicionado eficiente e ambiente agradável." },
  { name: "Dr. Fábio Lemos", role: "Trivago", text: "Ideal para quem precisa descansar entre viagens — silêncio e conforto garantidos." },
  { name: "Patrícia Rocha", role: "Expedia", text: "Equipe de recepção sempre atenciosa e pronta para ajudar com orientações locais." },
  { name: "Gustavo Nunes", role: "Google", text: "Hotel muito organizado e com manutenção evidente — tudo parecia novo e bem cuidado." },
  { name: "Dra. Beatriz Wagner", role: "Booking.com", text: "Estacionamento privativo disponível facilita a estadia para quem viaja de carro." },
  { name: "Henrique Costa", role: "Trivago", text: "O quarto é aconchegante, e a cama confortável garante uma boa noite de sono." },
  { name: "Mariana Duarte", role: "Expedia", text: "Excelente opção para hospedagem profissional e prática em Brasília." },
  { name: "Dr. Sérgio Valente", role: "Google", text: "Fiquei impressionado com a limpeza e o cuidado nos detalhes da acomodação." },
  { name: "Cláudia Borges", role: "Booking.com", text: "Bom conforto e atendimento constante, especialmente para estadias curtas." },
  { name: "Tiago Holanda", role: "Trivago", text: "Ótimo para quem busca qualidade e preço justo sem abrir mão do conforto." },
  { name: "Dra. Larissa Krause", role: "Expedia", text: "Hotel extremamente bem localizado, facilitando deslocamentos pela região e acesso rápido aos principais pontos da cidade." },
  { name: "André Jardim", role: "Google", text: "Estrutura confortável e ambiente acolhedor, ideal tanto para viagens corporativas quanto para momentos de descanso." },
  { name: "Dra. Camila Guimarães", role: "Booking.com", text: "Atendimento diferenciado desde o check-in até o check-out, com equipe sempre disponível e cordial." },
  { name: "Rodrigo Paiva", role: "Trivago", text: "A organização e o padrão de limpeza dos quartos são notáveis, transmitindo segurança e cuidado com o hóspede." },
  { name: "Fernanda Martins", role: "Expedia", text: "Café da manhã variado e bem apresentado, com opções que agradam diferentes perfis de hóspedes." },
  { name: "Dr. Paulo Esteves", role: "Google", text: "Excelente opção para quem busca praticidade, conforto e atendimento eficiente em uma única hospedagem." },
  { name: "Renata Queiroz", role: "Booking.com", text: "Ambiente tranquilo, perfeito para descansar após um dia intenso de compromissos." },
  { name: "Marcelo Farias", role: "Trivago", text: "Quarto funcional, bem iluminado e equipado com tudo o que é necessário para uma estadia confortável." },
  { name: "Simone Ribeiro", role: "Expedia", text: "Ótima relação entre qualidade e investimento, superando as expectativas." },
  { name: "Dr. Eduardo Bittencourt", role: "Google", text: "Profissionais capacitados e atenciosos, sempre prontos para auxiliar com orientações e suporte." },
  { name: "Vanessa Santos", role: "Booking.com", text: "Estrutura bem conservada, demonstrando cuidado contínuo com a experiência do hóspede." },
  { name: "Dr. Leandro Machado", role: "Trivago", text: "Hospedagem segura e organizada, transmitindo confiança desde a chegada." },
  { name: "Aline Oliveira", role: "Expedia", text: "Experiência muito positiva, com padrão de atendimento consistente e eficiente." },
  { name: "Vitor Xavier", role: "Google", text: "Ideal para quem procura comodidade, bom atendimento e localização estratégica." },
  { name: "Dra. Mônica Zanchetta", role: "Booking.com", text: "Recomendo pela combinação de conforto, profissionalismo e ambiente agradável durante toda a estadia." }
];

const Location = ({ onOpenReservation }) => {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % hotelImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
  };

  return (
    <section id="location" className="relative py-20 sm:py-32 bg-cover bg-center bg-fixed border-b border-alpha-gold/30" style={{ backgroundImage: "url('/backgroundalfa.webp')" }}>
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm z-0"></div>

      {/* Expanded Gallery Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8"
          >
            <button 
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[10001] p-2 bg-white/10 rounded-full"
            >
              <X size={32} />
            </button>

            <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
              <button 
                onClick={prevImage}
                className="absolute left-0 md:-left-16 text-white/50 hover:text-white transition-all z-[10001] p-4"
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>

              <motion.div
                key={selectedImageIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50) {
                    nextImage();
                  } else if (swipe > 50) {
                    prevImage();
                  }
                }}
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <img 
                  src={hotelImages[selectedImageIndex]}
                  alt="Hotel Expanded View"
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-lg pointer-events-none"
                />
              </motion.div>

              <button 
                onClick={nextImage}
                className="absolute right-0 md:-right-16 text-white/50 hover:text-white transition-all z-[10001] p-4"
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </div>

            {/* Thumbnail Navigation (Optional but helpful) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 px-4 overflow-x-auto max-w-full pb-2">
              {hotelImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImageIndex === idx ? 'bg-alpha-gold w-8' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">{t.location.sectionTitle}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            {t.location.mainTitle.split(' ').slice(0, -1).join(' ')} <span className="text-alpha-gold">{t.location.mainTitle.split(' ').slice(-1)}</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
        </div>

        <div className="flex flex-col gap-12 items-center">
          {/* Left: Contact Information */}
          <div className="space-y-8 fade-in-section w-full text-center">
            <div>
              <h3 className="font-serif text-3xl text-alpha-gold mb-6 tracking-wide">
                {t.location.accessTitle}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed tracking-wide font-light mb-8 max-w-3xl mx-auto">
                {t.location.accessDescription}
              </p>
            </div>

            {/* Hotel Gallery Carousel (Moved here) */}
            <div className="fade-in-section max-w-3xl mx-auto w-full">
              <div className="relative aspect-[4/3] md:aspect-video w-full border border-alpha-gold/30 overflow-hidden rounded-xl bg-obsidian-light group shadow-2xl">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                    containScroll: false
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: false
                    }),
                  ]}
                  className="w-full h-full"
                >
                  <CarouselContent className="-ml-0 h-full">
                    {hotelImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-0 h-full w-full flex items-center justify-center bg-black">
                        <div 
                          className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in"
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <img 
                            src={image}
                            alt={`Alfa Plaza Hotel - Imagem ${index + 1}`}
                            fetchPriority={index === 0 ? "high" : "low"}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding={index === 0 ? "sync" : "async"}
                            className="w-full h-full object-contain md:object-cover object-center transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent pointer-events-none z-10"></div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:block z-20 relative">
                    <CarouselPrevious className="carousel-btn-glass left-4 border-none bg-black/30 hover:bg-black/50 text-white shadow-none" />
                    <CarouselNext className="carousel-btn-glass right-4 border-none bg-black/30 hover:bg-black/50 text-white shadow-none" />
                  </div>
                </Carousel>
                
                {/* Testimonials Carousel Overlay */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-full md:max-w-md bg-obsidian/80 backdrop-blur-md border border-alpha-gold/30 p-3 z-30 rounded-xl overflow-hidden pointer-events-auto shadow-lg">
                  <Carousel
                    opts={{
                      align: "end",
                      loop: true,
                      axis: "y",
                      watchDrag: false
                    }}
                    plugins={[
                      Autoplay({
                        delay: 8000,
                      }),
                    ]}
                    orientation="vertical"
                    className="w-full h-14"
                  >
                    <CarouselContent className="-mt-1 h-[56px]">
                      {testimonials.map((item, index) => (
                        <CarouselItem key={index} className="pt-1 basis-full pb-0 flex flex-col justify-end">
                          <div className="space-y-0.5 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-white font-serif font-semibold tracking-wide text-xs">{item.name}</span>
                              <span className="text-alpha-gold/60 text-[10px]">|</span>
                              <span className="text-gray-400 text-[10px] tracking-wide uppercase">{item.role}</span>
                              <div className="flex space-x-0.5 ml-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={8} className="text-alpha-gold fill-alpha-gold" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 text-[10px] tracking-wide leading-tight italic line-clamp-2">
                              "{item.text}"
                            </p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
              <div className="flex flex-col items-center p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                  <MapPin className="text-alpha-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold tracking-wide mb-2">{t.location.contactLabels.address}</h4>
                  <p className="text-gray-400 text-sm tracking-wide">
                    Avenida Central, Lote 1040<br />
                    Núcleo Bandeirante - Brasília/DF
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                  <Phone className="text-alpha-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold tracking-wide mb-2">{t.location.contactLabels.phone}</h4>
                  <a href="tel:+556132639131" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                    +55 (61) 3263-9131
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                  <Clock className="text-alpha-gold" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold tracking-wide mb-2">{t.location.contactLabels.service}</h4>
                  <p className="text-gray-400 text-sm tracking-wide">
                    {t.location.contactLabels.serviceHours}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div id="contact" className="pt-4 max-w-md mx-auto w-full">
              <Button 
                onClick={onOpenReservation}
                className="btn-magic w-full bg-alpha-gold text-obsidian font-semibold tracking-widest hover:bg-alpha-gold/90 transition-all hover:scale-105 py-6"
              >
                {t.header.bookButton}
              </Button>
            </div>
          </div>
        </div>

        {/* Nearby Points of Interest */}
        <div className="mt-20 fade-in-section">
          <h3 className="font-serif text-3xl text-white text-center mb-12 tracking-widest uppercase">
            PONTOS DE <span className="text-alpha-gold">INTERESSE</span>
          </h3>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            {[
              { 
                name: 'Aeroporto Internacional (BSB)', 
                distance: '7,0 km (Aprox. 12 min)', 
                icon: Plane,
                description: 'Principal terminal aéreo da capital federal.'
              },
              { 
                name: 'Polícia Federal (Imigração)', 
                distance: '10,5 km (Aprox. 15 min)', 
                icon: Shield,
                description: 'Setor de passaportes e imigração.'
              },
              { 
                name: 'Setor de Embaixadas Sul', 
                distance: '12,5 km (Aprox. 18 min)', 
                icon: Flag,
                description: 'Concentração de missões diplomáticas.'
              },
              { 
                name: 'Embaixada dos EUA', 
                distance: '13,0 km (Aprox. 20 min)', 
                icon: Landmark,
                description: 'Representação diplomática dos Estados Unidos.'
              },
              { 
                name: 'CASV (Visto Americano)', 
                distance: '14,5 km (Aprox. 22 min)', 
                icon: FileText,
                description: 'Centro de Atendimento ao Solicitante de Visto.'
              },
              { 
                name: 'Esplanada dos Ministérios', 
                distance: '16,0 km (Aprox. 25 min)', 
                icon: Building2,
                description: 'Coração político e administrativo do Brasil.'
              },
              { 
                name: 'Estádio Nacional (Arena BRB)', 
                distance: '15,0 km (Aprox. 23 min)', 
                icon: Trophy,
                description: 'Palco de grandes eventos esportivos e shows.'
              },
              {
                name: 'ParkShopping Brasília',
                distance: '6,0 km (Aprox. 10 min)',
                icon: ShoppingBag,
                description: 'O principal shopping do DF.'
              },
              {
                name: 'Rodoviária Interestadual',
                distance: '6,5 km (Aprox. 11 min)',
                icon: Bus,
                description: 'Ponto de chegada e partida terrestre da capital.'
              }
            ].map((point, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center text-center p-8 bg-black/40 backdrop-blur-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-500 rounded-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center mb-6 group-hover:bg-alpha-gold/10 transition-colors">
                  <point.icon className="text-alpha-gold group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-white font-serif text-lg tracking-wide mb-2 uppercase leading-tight min-h-[3rem] flex items-center">
                  {point.name}
                </h4>
                
                <p className="text-gray-400 text-xs font-light tracking-wide leading-relaxed mb-4 flex-grow">
                  {point.description}
                </p>
                
                <div className="pt-4 border-t border-white/10 w-full">
                  <span className="text-alpha-gold font-serif text-xl tracking-widest">
                    {point.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
