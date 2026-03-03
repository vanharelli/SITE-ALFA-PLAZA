import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, MapPin, Car } from 'lucide-react';

const DigitalProtocol = () => {
  return (
    <section id="protocol" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl z-0"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-white/5 backdrop-blur-sm mb-6 rounded-full">
            <span className="text-alpha-gold text-sm tracking-widest font-light">ACESSO PRIORITÁRIO</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest mb-6">
            PROTOCOLO DE <span className="text-alpha-gold">IDENTIFICAÇÃO DIGITAL</span>
          </h2>
          <div className="h-px w-24 bg-alpha-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto tracking-wide font-light leading-relaxed">
            Inicie sua experiência de hospitalidade avançada. Valide suas credenciais abaixo.
          </p>
        </div>
        <div className="glass-dark rounded-xl border border-white/5 p-8 md:p-12 fade-in-section">
          <form className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-gray-300 tracking-wide flex items-center space-x-2 text-base">
                <User className="text-alpha-gold" size={20} />
                <span>Nome Completo do Titular</span>
              </Label>
              <Input id="fullName" required placeholder="Digite seu nome completo" type="text" name="fullName" className="bg-white/5 border-alpha-gold/30 text-white placeholder:text-gray-500 focus:border-alpha-gold focus:ring-alpha-gold/20 h-14 text-lg tracking-wide" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="residenceOrigin" className="text-gray-300 tracking-wide flex items-center space-x-2 text-base">
                <MapPin className="text-alpha-gold" size={20} />
                <span>Localização de Residência / Origem</span>
              </Label>
              <Input id="residenceOrigin" required placeholder="Cidade e Estado de origem" type="text" name="residenceOrigin" className="bg-white/5 border-alpha-gold/30 text-white placeholder:text-gray-500 focus:border-alpha-gold focus:ring-alpha-gold/20 h-14 text-lg tracking-wide" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="vehicleInfo" className="text-gray-300 tracking-wide flex items-center space-x-2 text-base">
                <Car className="text-alpha-gold" size={20} />
                <span>Veículo (Modelo e Placa) - Opcional</span>
              </Label>
              <Input id="vehicleInfo" placeholder="Ex: Toyota Corolla, ABC-1234" type="text" name="vehicleInfo" className="bg-white/5 border-alpha-gold/30 text-white placeholder:text-gray-500 focus:border-alpha-gold focus:ring-alpha-gold/20 h-14 text-lg tracking-wide" />
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <input id="parkingRequired" type="checkbox" name="parkingRequired" className="w-6 h-6 rounded border-alpha-gold/50 bg-white/5 text-alpha-gold focus:ring-alpha-gold focus:ring-offset-obsidian" />
              <Label htmlFor="parkingRequired" className="text-gray-300 tracking-wide text-base cursor-pointer select-none">
                Necessito de vaga no estacionamento privativo
              </Label>
            </div>
            <Button type="submit" className="w-full bg-alpha-gold text-obsidian font-semibold tracking-widest hover:bg-alpha-gold/90 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-alpha-gold/20 h-16 text-lg mt-8">
              GERAR CREDENCIAL DE ACESSO
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DigitalProtocol;