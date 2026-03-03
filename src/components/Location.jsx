import React from 'react';
import { MapPin, Phone, Clock, Star, Quote } from 'lucide-react';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const hotelImages = [
  '/hotel/1.jpeg',
  '/hotel/2.jpeg',
  '/hotel/3.jpeg',
  '/hotel/4.jpg',
  '/hotel/5.webp',
  '/hotel/6.webp',
  '/hotel/7.webp',
  '/hotel/8.webp',
  '/hotel/9.jpeg',
  '/hotel/10.jpeg',
  '/hotel/11.jpeg',
  '/hotel/12.jpeg',
  '/hotel/13.jpeg'
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

        <div className="flex flex-col gap-12 items-center">
          {/* Left: Contact Information */}
          <div className="space-y-8 fade-in-section w-full text-center">
            <div>
              <h3 className="font-serif text-3xl text-alpha-gold mb-6 tracking-wide">
                Acesso Privilegiado
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed tracking-wide font-light mb-8 max-w-3xl mx-auto">
                Localizado no Núcleo Bandeirante, conhecido como a cidade pioneira de Brasília por ter sido palco das primeiras estruturas que deram origem à capital, nosso hotel combina acesso estratégico às principais regiões do Distrito Federal com a serenidade de um bairro tradicional e acolhedor.
              </p>
            </div>

            {/* Hotel Gallery Carousel (Moved here) */}
            <div className="fade-in-section max-w-3xl mx-auto w-full">
              <div className="relative h-[600px] border border-alpha-gold/30 overflow-hidden rounded-xl bg-obsidian-light group">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                  className="w-full h-full"
                >
                  <CarouselContent className="h-full ml-0">
                    {hotelImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-0 h-full w-full">
                        <div className="relative w-full h-full">
                          <img 
                            src={image}
                            alt={`Alfa Plaza Hotel - Imagem ${index + 1}`}
                            className="w-full h-full object-cover object-bottom transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent pointer-events-none z-10"></div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:block z-20 relative">
                    <CarouselPrevious className="carousel-btn-glass left-4 border-none bg-transparent hover:bg-transparent shadow-none" />
                    <CarouselNext className="carousel-btn-glass right-4 border-none bg-transparent hover:bg-transparent shadow-none" />
                  </div>
                </Carousel>
                
                {/* Testimonials Carousel Overlay */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-obsidian/70 backdrop-blur-md border border-alpha-gold/30 p-3 z-30 rounded-xl overflow-hidden pointer-events-auto">
                  <Carousel
                    opts={{
                      align: "end",
                      loop: true,
                      axis: "y"
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
                  <h4 className="text-white font-semibold tracking-wide mb-2">Endereço</h4>
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
                  <h4 className="text-white font-semibold tracking-wide mb-2">Telefone</h4>
                  <a href="tel:+5561982062229" className="text-gray-400 hover:text-alpha-gold transition-colors text-sm tracking-wide">
                    +55 (61) 98206-2229
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center p-6 glass-dark rounded-xl border border-white/5 hover:border-alpha-gold/60 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-white/5 border border-alpha-gold/30 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
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
            <div id="contact" className="pt-4 max-w-md mx-auto w-full">
              <a 
                href="https://wa.me/5561982062229"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-alpha-gold text-obsidian font-semibold tracking-widest hover:bg-alpha-gold/90 transition-all hover:scale-105 py-6">
                  RESERVAR AGORA
                </Button>
              </a>
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
              { name: 'Aeroporto JK', distance: '7 km' },
              { name: 'Esplanada', distance: '14 km' },
              { name: 'Park Shopping', distance: '6 km' },
              { name: 'Rodoviária Interestadual', distance: '6 km' }
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
