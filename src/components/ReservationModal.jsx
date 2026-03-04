import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  Calendar, 
  Users, 
  Clock, 
  User, 
  MessageSquare, 
  ArrowRight,
  Mail,
  Building2,
  Users2,
  CalendarCheck2,
  ChevronRight,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const STEPS = {
  HUB: 'HUB',
  SUITE_SELECTION: 'SUITE_SELECTION',
  DATES: 'DATES',
  GUESTS: 'GUESTS',
  ARRIVAL_TIME: 'ARRIVAL_TIME',
  CONTACT: 'CONTACT',
  RULES: 'RULES'
};

const roomData = [
  { id: 2, title: 'Suíte Casal', image: '/quartos/Suíte Casal.webp' },
  { id: 6, title: 'Suíte Duplo Solteiro', image: '/quartos/Suíte Duplo Solteiro.webp' },
  { id: 3, title: 'Suíte Triplo Casal', image: '/quartos/Suíte Triplo Casal.webp' },
  { id: 7, title: 'Suíte Triplo Solteiro', image: '/quartos/Suíte Triplo Solteiro.webp' },
  { id: 4, title: 'Suíte Quádruplo', image: '/quartos/Suíte Quádruplo.webp' },
  { id: 5, title: 'Suíte Adaptável', image: '/quartos/Suíte Adaptável.webp' }
];

const ReservationModal = ({ isOpen, onClose, initialSuite = null }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(STEPS.HUB);
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    suite: initialSuite,
    suites: initialSuite ? [initialSuite] : [],
    checkIn: '',
    checkOut: '',
    adults: '1',
    hasChildren: false,
    childCount: '1',
    allChildrenOver5: false,
    childAge: '',
    arrivalTime: '',
    name: '',
    email: '',
    whatsapp: '',
    type: 'Reserva Individual'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialSuite) {
        setFormData(prev => ({ 
          ...prev, 
          suite: initialSuite, 
          suites: [initialSuite],
          type: 'Reserva Individual' 
        }));
        setStep(STEPS.DATES);
        setHistory([STEPS.HUB]);
      } else {
        setStep(STEPS.HUB);
        setHistory([]);
      }
    }
  }, [isOpen, initialSuite]);

  const goToStep = (nextStep) => {
    setHistory(prev => [...prev, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevStep = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setStep(prevStep);
    } else {
      onClose();
    }
  };

  const handleSuiteSelect = (suite) => {
    if (formData.type === 'Grupos e Eventos') {
      const isSelected = formData.suites.find(s => s.id === suite.id);
      if (isSelected) {
        setFormData(prev => ({
          ...prev,
          suites: prev.suites.filter(s => s.id !== suite.id)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          suites: [...prev.suites, suite]
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, suite, suites: [suite] }));
      goToStep(STEPS.DATES);
    }
  };

  const handleReservation = () => {
    const suitesText = formData.type === 'Grupos e Eventos' 
      ? formData.suites.map(s => s.title).join(', ')
      : (formData.suite?.title || 'Não especificada');

    const childrenText = formData.hasChildren 
      ? `${formData.childCount} crianças (${formData.allChildrenOver5 ? 'Todas acima de 5 anos' : 'Inclui menores de 5 anos'})`
      : 'Nenhuma';

    const message = `🏢 *RESERVA - ALFA PLAZA HOTEL*\n` +
      `__________________________________\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `📱 *WhatsApp:* ${formData.whatsapp}\n` +
      `✉️ *E-mail:* ${formData.email}\n` +
      `__________________________________\n\n` +
      `🛏️ *Categoria:* ${suitesText}\n` +
      `👥 *Pessoas:* ${formData.adults}\n` +
      `🧒 *Crianças:* ${childrenText}\n` +
      `__________________________________\n\n` +
      `📅 *Datas:* ${formData.checkIn} a ${formData.checkOut}\n` +
      `🕒 *Chegada prevista:* ${formData.arrivalTime}\n` +
      `__________________________________\n\n` +
      `_Aguarde um momento. Nossa equipe de recepção iniciará o seu atendimento em instantes._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
    onClose();
  };

  const stepsProgress = {
    [STEPS.HUB]: 0,
    [STEPS.SUITE_SELECTION]: 20,
    [STEPS.DATES]: 40,
    [STEPS.GUESTS]: 60,
    [STEPS.ARRIVAL_TIME]: 80,
    [STEPS.CONTACT]: 100,
    [STEPS.RULES]: 20
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(1);

  const wrapSetStep = (newStep) => {
    setDirection(1);
    goToStep(newStep);
  };

  const wrapGoBack = () => {
    setDirection(-1);
    goBack();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-[500px] bg-black/90 backdrop-blur-xl border border-alpha-gold/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
            <motion.div 
              className="h-full bg-alpha-gold"
              initial={{ width: 0 }}
              animate={{ width: `${stepsProgress[step]}%` }}
            />
          </div>

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md shrink-0">
            <button 
              onClick={wrapGoBack}
              className="text-white/50 hover:text-white transition-colors p-2 -ml-2"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-alpha-gold font-serif text-lg tracking-widest uppercase">
              {step === STEPS.HUB ? 'Reserva' : 'Solicitação'}
            </h2>
            <button 
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors p-2 -mr-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-transparent">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="p-6 h-full flex flex-col"
              >
                {step === STEPS.HUB && (
                  <div className="space-y-4 flex-1 flex flex-col justify-center">
                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: 'Reserva Individual' }));
                        wrapSetStep(STEPS.SUITE_SELECTION);
                      }}
                      className="group w-full p-5 rounded-2xl border border-alpha-gold/20 bg-white/5 hover:bg-alpha-gold/10 hover:border-alpha-gold/50 transition-all flex items-center justify-between text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-alpha-gold/20 flex items-center justify-center text-alpha-gold group-hover:scale-110 transition-transform">
                          <CalendarCheck2 size={24} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide">Reservar Agora</p>
                          <p className="text-gray-400 text-xs">Individual ou Família</p>
                        </div>
                      </div>
                      <ChevronRight className="text-alpha-gold/50 group-hover:text-alpha-gold" />
                    </button>

                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: 'Reserva Faturada' }));
                        wrapSetStep(STEPS.RULES);
                      }}
                      className="group w-full p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/70 group-hover:scale-110 transition-transform">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide">Reserva Faturada</p>
                          <p className="text-gray-400 text-xs">Exclusivo para Empresas</p>
                        </div>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-white/50" />
                    </button>

                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: 'Grupos e Eventos' }));
                        wrapSetStep(STEPS.SUITE_SELECTION);
                      }}
                      className="group w-full p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/70 group-hover:scale-110 transition-transform">
                          <Users2 size={24} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide">Grupos e Eventos</p>
                          <p className="text-gray-400 text-xs">Solicitar Cotação Especial</p>
                        </div>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-white/50" />
                    </button>

                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: 'Parceria Comercial' }));
                        wrapSetStep(STEPS.RULES);
                      }}
                      className="group w-full p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between text-left"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/70 group-hover:scale-110 transition-transform">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide">Parceria Comercial</p>
                          <p className="text-gray-400 text-xs">Seja um Parceiro Alfa Plaza</p>
                        </div>
                      </div>
                      <ChevronRight className="text-white/20 group-hover:text-white/50" />
                    </button>
                  </div>
                )}

                {step === STEPS.SUITE_SELECTION && (
                  <div className="space-y-4 h-full flex flex-col">
                    <p className="text-alpha-gold text-sm font-semibold tracking-widest uppercase mb-4">
                      {formData.type === 'Grupos e Eventos' ? 'Selecione as categorias do grupo' : 'Escolha sua Suíte'}
                    </p>
                    <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                      {roomData.map((room) => {
                        const isSelected = formData.suites.find(s => s.id === room.id);
                        return (
                          <button
                            key={room.id}
                            onClick={() => handleSuiteSelect(room)}
                            className={`group relative h-28 rounded-2xl border transition-all overflow-hidden text-left ${
                              isSelected ? 'border-alpha-gold ring-2 ring-alpha-gold/30' : 'border-white/10'
                            }`}
                          >
                            <img src={room.image} alt={room.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                            <div className="relative p-5 h-full flex items-center justify-between">
                              <div>
                                <p className="text-white font-serif text-lg tracking-wide">{room.title}</p>
                                {isSelected && (
                                  <p className="text-alpha-gold text-[10px] tracking-widest uppercase font-bold mt-1">Selecionado</p>
                                )}
                              </div>
                              {formData.type === 'Grupos e Eventos' && (
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-alpha-gold border-alpha-gold' : 'border-white/30'
                                }`}>
                                  {isSelected && <ArrowRight size={14} className="text-obsidian" />}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {formData.type === 'Grupos e Eventos' && (
                      <Button 
                        disabled={formData.suites.length === 0}
                        onClick={() => wrapSetStep(STEPS.DATES)}
                        className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-6 mt-4 disabled:opacity-30"
                      >
                        PRÓXIMO PASSO <ArrowRight className="ml-2" size={20} />
                      </Button>
                    )}
                  </div>
                )}

                {step === STEPS.RULES && (
                  <div className="space-y-6 flex flex-col h-full">
                    <div className="flex-1 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-alpha-gold/10 flex items-center justify-center text-alpha-gold mx-auto mb-6">
                        <Info size={32} />
                      </div>
                      <h3 className="text-white font-serif text-xl text-center tracking-wide">
                        {formData.type === 'Reserva Faturada' ? 'Diretrizes Corporativas' : 'Expansão Comercial'}
                      </h3>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                        {formData.type === 'Reserva Faturada' ? (
                          <>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              • Faturamento exclusivo para empresas com cadastro aprovado.
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              • Prazo de faturamento: 15 ou 30 dias após o check-out.
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              • Necessário envio de autorização em papel timbrado.
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              • Condições especiais para agências e operadoras.
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              • Acordos de volume para empresas locais.
                            </p>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              • Gestão dedicada para contas comerciais.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        const email = formData.type === 'Reserva Faturada' ? 'reservas@alfaplazahotel.com.br' : 'administrativo@alfaplazahotel.com.br';
                        const subject = formData.type === 'Reserva Faturada' ? 'Solicitação de Reserva Faturada' : 'Interesse em Parceria Comercial';
                        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
                      }}
                      className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-6"
                    >
                      ENVIAR SOLICITAÇÃO POR E-MAIL
                    </Button>
                  </div>
                )}

                {step === STEPS.DATES && (
                  <div className="space-y-8 flex flex-col h-full">
                    {formData.suite && (
                      <div className="relative h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                        <img src={formData.suite.image} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-white font-serif tracking-widest text-sm uppercase">{formData.suite.title}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-6 flex-1">
                      <div className="space-y-3">
                        <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">Data de Check-in</label>
                        <div className="relative group">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors" size={20} />
                          <input 
                            type="date"
                            value={formData.checkIn}
                            onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all appearance-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">Data de Check-out</label>
                        <div className="relative group">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors" size={20} />
                          <input 
                            type="date"
                            value={formData.checkOut}
                            onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all appearance-none"
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      disabled={!formData.checkIn || !formData.checkOut}
                      onClick={() => wrapSetStep(STEPS.GUESTS)}
                      className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-6 disabled:opacity-30"
                    >
                      PRÓXIMO PASSO <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                )}

                {step === STEPS.GUESTS && (
                  <div className="space-y-8 flex flex-col h-full">
                    <div className="space-y-6 flex-1">
                      <div className="space-y-3">
                        <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">
                          {formData.type === 'Grupos e Eventos' ? 'Quantas pessoas no grupo?' : 'Quantos adultos?'}
                        </label>
                        <div className="relative group">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors" size={20} />
                          {formData.type === 'Grupos e Eventos' ? (
                            <input 
                              type="number"
                              min="1"
                              max="100"
                              value={formData.adults}
                              onChange={(e) => {
                                const val = Math.min(100, Math.max(1, parseInt(e.target.value) || 1));
                                setFormData(prev => ({ ...prev, adults: val.toString() }));
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                            />
                          ) : (
                            <select 
                              value={formData.adults}
                              onChange={(e) => setFormData(prev => ({ ...prev, adults: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all appearance-none"
                            >
                              <option value="1">1 Adulto</option>
                              <option value="2">2 Adultos</option>
                              <option value="3">3 Adultos</option>
                              <option value="4">4 Adultos</option>
                              <option value="5">5+ Adultos</option>
                            </select>
                          )}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-semibold text-sm">Viajando com crianças?</p>
                            <p className="text-gray-400 text-[10px] tracking-wider uppercase mt-1">Crianças até 5 anos ficam por cortesia.</p>
                          </div>
                          <button 
                            onClick={() => setFormData(prev => ({ ...prev, hasChildren: !prev.hasChildren }))}
                            className={`w-12 h-6 rounded-full transition-all relative ${formData.hasChildren ? 'bg-alpha-gold' : 'bg-white/10'}`}
                          >
                            <motion.div 
                              animate={{ x: formData.hasChildren ? 26 : 4 }}
                              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                            />
                          </button>
                        </div>

                        {formData.hasChildren && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-6"
                          >
                            <div className="space-y-3">
                              <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold">Quantas crianças?</label>
                              <input 
                                type="number"
                                min="1"
                                value={formData.childCount}
                                onChange={(e) => setFormData(prev => ({ ...prev, childCount: e.target.value }))}
                                className="w-full bg-white/10 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                              />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                              <div>
                                <p className="text-white font-semibold text-xs">Todos acima de 5 anos?</p>
                              </div>
                              <button 
                                onClick={() => setFormData(prev => ({ ...prev, allChildrenOver5: !prev.allChildrenOver5 }))}
                                className={`w-12 h-6 rounded-full transition-all relative ${formData.allChildrenOver5 ? 'bg-alpha-gold' : 'bg-white/10'}`}
                              >
                                <motion.div 
                                  animate={{ x: formData.allChildrenOver5 ? 26 : 4 }}
                                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                                />
                              </button>
                            </div>
                            <p className="text-gray-500 text-[10px] italic">*Crianças acima de 5 anos possuem tarifa diferenciada.</p>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => wrapSetStep(STEPS.ARRIVAL_TIME)}
                      className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-6"
                    >
                      PRÓXIMO PASSO <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                )}

                {step === STEPS.ARRIVAL_TIME && (
                  <div className="space-y-8 flex flex-col h-full">
                    <div className="space-y-6 flex-1">
                      <div className="text-center space-y-2">
                        <Clock className="mx-auto text-alpha-gold mb-2" size={40} />
                        <h3 className="text-white font-serif text-xl tracking-wide">Horário de Chegada</h3>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">Previsão estimada para sua recepção</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00+'].map((time) => (
                          <button
                            key={time}
                            onClick={() => setFormData(prev => ({ ...prev, arrivalTime: time }))}
                            className={`p-4 rounded-xl border transition-all font-semibold tracking-widest text-sm ${
                              formData.arrivalTime === time 
                                ? 'bg-alpha-gold text-obsidian border-alpha-gold' 
                                : 'bg-white/5 text-white/70 border-white/10 hover:border-alpha-gold/30'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      disabled={!formData.arrivalTime}
                      onClick={() => wrapSetStep(STEPS.CONTACT)}
                      className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-6 disabled:opacity-30"
                    >
                      QUASE LÁ <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                )}

                {step === STEPS.CONTACT && (
                  <div className="space-y-8 flex flex-col h-full">
                    <div className="space-y-6 flex-1">
                      <div className="text-center space-y-2">
                        <User className="mx-auto text-alpha-gold mb-2" size={40} />
                        <h3 className="text-white font-serif text-xl tracking-wide">Dados de Contato</h3>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">Finalize para enviar sua reserva</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">Nome Completo</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50" size={20} />
                            <input 
                              type="text"
                              placeholder="Qual seu nome?"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">E-mail</label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50" size={20} />
                            <input 
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">WhatsApp</label>
                          <div className="relative group">
                            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50" size={20} />
                            <input 
                              type="tel"
                              placeholder="(00) 00000-0000"
                              value={formData.whatsapp}
                              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-alpha-gold/5 border border-alpha-gold/20 flex items-start space-x-3">
                        <Info className="text-alpha-gold shrink-0 mt-0.5" size={16} />
                        <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
                          Ao clicar em finalizar, você será redirecionado para o WhatsApp do nosso setor de reservas para validação final.
                        </p>
                      </div>
                    </div>

                    <Button 
                      disabled={!formData.name || !formData.whatsapp || !formData.email}
                      onClick={handleReservation}
                      className="w-full bg-alpha-gold text-obsidian font-bold tracking-[0.2em] py-6 disabled:opacity-30"
                    >
                      FINALIZAR E ENVIAR
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReservationModal;
