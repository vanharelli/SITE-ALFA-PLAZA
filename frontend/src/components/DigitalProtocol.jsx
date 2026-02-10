import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, MapPin, Car, CheckCircle2 } from 'lucide-react';

const DigitalProtocol = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    residenceOrigin: '',
    vehicleInfo: '',
    parkingRequired: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Send to WhatsApp or store locally
    const message = `*Protocolo de Identificação Digital*\n\nTitular: ${formData.fullName}\nOrigem: ${formData.residenceOrigin}\nEstacionamento: ${formData.parkingRequired ? 'Sim' : 'Não'}${formData.vehicleInfo ? `\nVeículo: ${formData.vehicleInfo}` : ''}`;
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        residenceOrigin: '',
        vehicleInfo: '',
        parkingRequired: false
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section id="protocol" className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-alpha-gold/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 fade-in-section">
          <div className="inline-block px-6 py-2 border border-alpha-gold/30 bg-alpha-gold/5 backdrop-blur-sm mb-6">
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

        {/* Form Container */}
        <div className="bg-obsidian-light/40 backdrop-blur-xl border border-alpha-gold/30 p-8 md:p-12 fade-in-section">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Full Name */}
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-gray-300 tracking-wide flex items-center space-x-2 text-base">
                  <User className="text-alpha-gold" size={20} />
                  <span>Nome Completo do Titular</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Digite seu nome completo"
                  className="bg-obsidian/60 border-alpha-gold/30 text-white placeholder:text-gray-500 focus:border-alpha-gold focus:ring-alpha-gold/20 h-14 text-lg tracking-wide"
                />
              </div>

              {/* Residence Origin */}
              <div className="space-y-3">
                <Label htmlFor="residenceOrigin" className="text-gray-300 tracking-wide flex items-center space-x-2 text-base">
                  <MapPin className="text-alpha-gold" size={20} />
                  <span>Localização de Residência / Origem</span>
                </Label>
                <Input
                  id="residenceOrigin"
                  name="residenceOrigin"
                  type="text"
                  value={formData.residenceOrigin}
                  onChange={handleChange}
                  required
                  placeholder="Cidade e Estado de origem"
                  className="bg-obsidian/60 border-alpha-gold/30 text-white placeholder:text-gray-500 focus:border-alpha-gold focus:ring-alpha-gold/20 h-14 text-lg tracking-wide"
                />
              </div>

              {/* Parking Logistics Section */}
              <div className="pt-6 border-t border-alpha-gold/20">
                <div className="flex items-center space-x-2 mb-6">
                  <Car className="text-alpha-gold" size={24} />
                  <h3 className="text-alpha-gold font-serif text-xl tracking-wide">
                    Logística de Estacionamento Privativo
                  </h3>
                </div>

                {/* Checkbox */}
                <div className="flex items-start space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="parkingRequired"
                    name="parkingRequired"
                    checked={formData.parkingRequired}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-alpha-gold/30 bg-obsidian/60 text-alpha-gold focus:ring-alpha-gold/20 focus:ring-offset-0"
                  />
                  <Label htmlFor="parkingRequired" className="text-gray-300 text-base tracking-wide cursor-pointer">
                    Solicito vaga coberta no estacionamento privativo
                  </Label>
                </div>

                {/* Vehicle Info (conditional) */}
                {formData.parkingRequired && (
                  <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label htmlFor="vehicleInfo" className="text-gray-300 tracking-wide text-sm">
                      Informações do Veículo (Modelo e Placa)
                    </Label>
                    <Input
                      id="vehicleInfo"
                      name="vehicleInfo"
                      type="text"
                      value={formData.vehicleInfo}
                      onChange={handleChange}
                      placeholder="Ex: Honda Civic - ABC-1234"
                      className="bg-obsidian/60 border-alpha-gold/30 text-white placeholder:text-gray-500 focus:border-alpha-gold focus:ring-alpha-gold/20 h-12 tracking-wide"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-alpha-gold text-obsidian font-semibold tracking-widest text-base hover:bg-alpha-gold/90 transition-all hover:scale-105 py-7 hover:shadow-2xl hover:shadow-alpha-gold/20"
                >
                  VALIDAR PROTOCOLO DE ACESSO
                </Button>
              </div>

              {/* Security Note */}
              <p className="text-gray-500 text-xs text-center tracking-wide leading-relaxed pt-4">
                Seus dados são tratados com absoluta confidencialidade, conforme nossa Política de Privacidade e LGPD.
              </p>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-alpha-gold/20 border-2 border-alpha-gold rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-alpha-gold" size={40} />
                </div>
              </div>
              <h3 className="font-serif text-3xl text-alpha-gold tracking-wide">
                Protocolo Validado
              </h3>
              <p className="text-gray-300 text-lg tracking-wide max-w-md mx-auto leading-relaxed">
                Protocolo enviado com sucesso. Sua recepção o aguarda.
              </p>
              <div className="pt-4">
                <p className="text-gray-400 text-sm tracking-wide">
                  Em breve entraremos em contato para confirmar os detalhes da sua estadia.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center fade-in-section">
          <p className="text-gray-400 text-sm tracking-wide">
            Preferências adicionais ou dúvidas?{' '}
            <a 
              href="https://wa.me/5561982062229"
              target="_blank"
              rel="noopener noreferrer"
              className="text-alpha-gold hover:underline font-semibold"
            >
              Fale com nosso consultor
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalProtocol;
