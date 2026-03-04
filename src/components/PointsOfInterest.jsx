import React from 'react';
import { Plane, Shield, Flag, Landmark, FileText, Building2, Trophy, Mic } from 'lucide-react';

const businessPoints = [
  { 
    name: 'Aeroporto Internacional (BSB)', 
    distance: '7,0 km', 
    icon: Plane,
    description: 'Principal terminal aéreo da capital federal.'
  },
  { 
    name: 'Polícia Federal (Imigração)', 
    distance: '10,5 km', 
    icon: Shield,
    description: 'Setor de passaportes e imigração.'
  },
  { 
    name: 'Setor de Embaixadas Sul', 
    distance: '12,5 km', 
    icon: Flag,
    description: 'Concentração de missões diplomáticas.'
  },
  { 
    name: 'Embaixada dos EUA', 
    distance: '13,0 km', 
    icon: Landmark,
    description: 'Representação diplomática dos Estados Unidos.'
  },
  { 
    name: 'CASV (Visto Americano)', 
    distance: '14,5 km', 
    icon: FileText,
    description: 'Centro de Atendimento ao Solicitante de Visto.'
  },
  { 
    name: 'Esplanada dos Ministérios', 
    distance: '16,0 km', 
    icon: Building2,
    description: 'Coração político e administrativo do Brasil.'
  },
  { 
    name: 'Estádio Nacional (Arena BRB)', 
    distance: '15,0 km', 
    icon: Trophy,
    description: 'Palco de grandes eventos esportivos e shows.'
  },
  { 
    name: 'Centro de Convenções Ulysses', 
    distance: '15,5 km', 
    icon: Mic,
    description: 'O maior centro de convenções de Brasília.'
  }
];

const PointsOfInterest = () => {
  return (
    <div className="mt-20 fade-in-section">
      <h3 className="font-serif text-3xl text-white text-center mb-12 tracking-widest uppercase">
        PONTOS DE <span className="text-alpha-gold">INTERESSE</span>
      </h3>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {businessPoints.map((point, index) => (
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
  );
};

export default PointsOfInterest;
