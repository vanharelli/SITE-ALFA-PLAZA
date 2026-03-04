import React from 'react';
import { Wifi, Coffee, Bell, Car, UserCheck, ArrowUpFromDot, ShieldCheck, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const amenities = [
  { 
    icon: Wifi, 
    name: 'Wi-Fi Ultra-Rápido', 
    description: 'Conexão de alta velocidade em todos os ambientes' 
  },
  { 
    icon: Coffee, 
    name: 'Café da Manhã', 
    description: 'Segunda a Sexta-feira: das 6h às 10h | Domingos e Feriados: das 7h às 10h30' 
  },
  { 
    icon: Bell, 
    name: 'Room Service 24h', 
    description: 'Atendimento exclusivo a qualquer momento' 
  },
  { 
    icon: Car, 
    name: 'Estacionamento Privativo', 
    description: 'Vagas cobertas com segurança 24 horas' 
  },
  { 
    icon: UserCheck, 
    name: 'Mordomo Digital', 
    description: 'Nosso mordomo prestará atendimento dedicado, auxiliando em todas as solicitações e indicando experiências gastronômicas e passeios selecionados, com serviço impecável.' 
  },
  { 
    icon: ArrowUpFromDot, 
    name: 'Elevador', 
    description: 'Acesso moderno e confortável a todos os andares' 
  },
  { 
    icon: ShieldCheck, 
    name: 'Segurança', 
    description: 'Monitoramento 24h e acesso controlado' 
  },
  { 
    icon: Smartphone, 
    name: 'Check-in Digital', 
    description: 'Processo ágil e sem burocracia' 
  }
];

const Amenities = () => {
  const { t } = useLanguage();
  return (
    <section id="amenities" className="relative py-20 sm:py-32 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/backgroundalfa.jpg')" }}>
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 fade-in-section">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
          {amenities.map((item, index) => (
            <div 
              key={index} 
              className="group p-6 glass-dark rounded-xl border border-alpha-gold/30 hover:border-alpha-gold/60 transition-all duration-500 hover:-translate-y-1 fade-in-section flex flex-col items-center text-center" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center bg-obsidian-light border border-alpha-gold/20 rounded-full group-hover:bg-alpha-gold/10 group-hover:border-alpha-gold/40 transition-colors">
                <item.icon className="text-alpha-gold" size={24} />
              </div>
              <h3 className="text-white font-serif text-lg mb-2 tracking-wide">{item.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center fade-in-section relative z-10">
          <a 
            href="https://wa.me/5561982062229"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              className="bg-alpha-gold text-obsidian font-bold tracking-[0.2em] uppercase px-10 py-6 text-lg hover:bg-alpha-gold/90 transition-all hover:scale-105 shadow-xl shadow-alpha-gold/20"
            >
              {t.header.bookButton}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Amenities;