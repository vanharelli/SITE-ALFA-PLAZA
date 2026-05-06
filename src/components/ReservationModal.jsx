import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft,
  Calendar as CalendarIcon,
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
  Info,
  ChevronDown,
  ChevronUp,
  Heart,
  Star,
  Gem,
  Crown,
  Flag
} from 'lucide-react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { format, parse, isValid, addDays } from 'date-fns';
import { ptBR, enUS, es } from 'date-fns/locale';
import { useLanguage } from '../context/LanguageContext';

const STEPS = {
  HUB: 'HUB',
  SUITE_SELECTION: 'SUITE_SELECTION',
  EXPERIENCES: 'EXPERIENCES',
  DATES: 'DATES',
  GUESTS: 'GUESTS',
  ARRIVAL_TIME: 'ARRIVAL_TIME',
  CONTACT: 'CONTACT',
  RULES: 'RULES'
};

const roomData = [
  { id: 2, image: '/quartos/Suíte Casal.webp' },
  { id: 6, image: '/quartos/Suíte Duplo Solteiro.webp' },
  { id: 3, image: '/quartos/Suíte Triplo Casal.webp' },
  { id: 7, image: '/quartos/Suíte Triplo Solteiro.webp' },
  { id: 4, image: '/quartos/Suíte Quádruplo.webp' },
  { id: 5, image: '/quartos/Suíte Adaptável.webp' }
];

const ReservationModal = ({ isOpen, onClose, initialSuite = null }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(STEPS.HUB);
  const [history, setHistory] = useState([]);

  const getDateLocale = () => {
    switch (language) {
      case 'en': return enUS;
      case 'es': return es;
      default: return ptBR;
    }
  };

  const [formData, setFormData] = useState({
    suite: initialSuite ? { ...initialSuite, image: Array.isArray(initialSuite.image) ? initialSuite.image[0] : initialSuite.image } : null,
    suites: initialSuite ? [initialSuite] : [],
    checkIn: '',
    checkOut: '',
    adults: '1',
    hasChildren: false,
    childCount: '1',
    allChildrenOver5: false,
    childAge: '',
    childAges: [],
    arrivalTime: '',
    name: '',
    email: '',
    whatsapp: '',
    type: 'Reserva Individual',
    experiencePackage: ''
  });

  const isIndividualReservation = formData.type === 'Reserva Individual';
  const suiteId = formData.suite?.id;

  const maxAdults = (() => {
    if (!isIndividualReservation) return 4;
    if (suiteId === 2 || suiteId === 6) return 2;
    if (suiteId === 3 || suiteId === 7) return 3;
    return 4;
  })();

  useEffect(() => {
    const adultsNumber = parseInt(formData.adults, 10);
    if (Number.isNaN(adultsNumber)) return;
    if (adultsNumber <= maxAdults) return;

    setFormData(prev => ({ ...prev, adults: maxAdults.toString() }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxAdults, formData.adults]);

  useEffect(() => {
    if (!formData.hasChildren) return;

    const count = Math.max(1, parseInt(formData.childCount, 10) || 1);
    if (count <= 2) {
      if (formData.childAges.length) {
        setFormData(prev => ({ ...prev, childAges: [] }));
      }
      return;
    }

    if (formData.childAges.length === count) return;

    setFormData(prev => {
      const next = Array.from({ length: count }, (_, i) => prev.childAges[i] ?? '');
      return { ...prev, childAges: next };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.hasChildren, formData.childCount]);

  const [dateInput, setDateInput] = useState({
    checkIn: '',
    checkOut: ''
  });

  const handleDateInputChange = (e, field) => {
    let value = e.target.value;
    
    // Remove non-digit characters
    value = value.replace(/\D/g, '');
    
    // Add slashes automatically
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }
    
    // Limit length
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setDateInput(prev => ({ ...prev, [field]: value }));

    // Try to parse dd/MM/yyyy
    if (value.length === 10) {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date(), { locale: getDateLocale() });
      if (isValid(parsedDate)) {
        setFormData(prev => ({ ...prev, [field]: format(parsedDate, 'yyyy-MM-dd') }));
      }
    } else if (value === '') {
      setFormData(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCalendarSelect = (date, field) => {
    if (!date) return;
    const formattedDate = format(date, 'yyyy-MM-dd');
    const inputFormatted = format(date, 'dd/MM/yyyy', { locale: getDateLocale() });
    
    setFormData(prev => ({ ...prev, [field]: formattedDate }));
    setDateInput(prev => ({ ...prev, [field]: inputFormatted }));
    
    // Close current popover and open the other one if needed
    if (field === 'checkIn') {
      setPopoverOpen(prev => ({ ...prev, checkIn: false }));
      // Pequeno delay para abrir o checkout para evitar conflitos de renderização
      setTimeout(() => {
        setPopoverOpen(prev => ({ ...prev, checkOut: true }));
      }, 100);
    } else {
      setPopoverOpen(prev => ({ ...prev, checkOut: false }));
    }
  };

  const typeMapping = {
    'Reserva Individual': 'individual',
    'Reserva Faturada': 'corporate',
    'Grupos e Eventos': 'groups',
    'Parceria Comercial': 'partnership',
    'Recepção VIP & Homenagens': 'celebrations'
  };

  useEffect(() => {
    if (isOpen) {
      // Initialize date inputs from formData if they exist
      if (formData.checkIn) {
        try {
          const date = new Date(formData.checkIn + 'T12:00:00');
          if (isValid(date)) {
            setDateInput(prev => ({ ...prev, checkIn: format(date, 'dd/MM/yyyy', { locale: getDateLocale() }) }));
          }
        } catch (e) {}
      }
      if (formData.checkOut) {
        try {
          const date = new Date(formData.checkOut + 'T12:00:00');
          if (isValid(date)) {
            setDateInput(prev => ({ ...prev, checkOut: format(date, 'dd/MM/yyyy', { locale: getDateLocale() }) }));
          }
        } catch (e) {}
      }

      if (initialSuite) {
        const suiteWithImage = { 
          ...initialSuite, 
          image: Array.isArray(initialSuite.image) ? initialSuite.image[0] : initialSuite.image 
        };
        setFormData(prev => ({ 
          ...prev, 
          suite: suiteWithImage, 
          suites: [suiteWithImage],
          type: 'Reserva Individual',
          experiencePackage: ''
        }));
        setStep(STEPS.DATES);
        setHistory([STEPS.HUB]);
      } else {
        setStep(STEPS.HUB);
        setHistory([]);
        setFormData(prev => ({ ...prev, experiencePackage: '' }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialSuite]);

  /* Prevent body scroll when modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'auto';
      document.body.style.userSelect = 'auto';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'unset';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'unset';
      document.body.style.userSelect = 'none';
    };
  }, [isOpen]);

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
    // Safety check for translations
    if (!t || !t.reservation || !t.reservation.whatsapp) {
      console.error('Translation error: t.reservation.whatsapp is missing', t);
      // Fallback message if translations are missing
      const fallbackMessage = "🏢 *RESERVA - ALFA PLAZA HOTEL*\n__________________________________\n\n👤 *Cliente:* " + formData.name + "\n📱 *WhatsApp:* " + formData.whatsapp;
      window.open(`https://wa.me/556132639131?text=${encodeURIComponent(fallbackMessage)}`, '_blank');
      onClose();
      return;
    }

    const w = t.reservation.whatsapp;
    
    const suitesText = formData.type === 'Grupos e Eventos' 
      ? formData.suites.map(s => s.title).join(', ')
      : (formData.suite?.title || w.unspecified);

    const childrenText = formData.hasChildren 
      ? `${formData.childCount} ${w.children} (${formData.allChildrenOver5 ? w.allOver5 : w.includesUnder5})`
      : w.none;

    const reservationType = t.reservation.types[typeMapping[formData.type]] || formData.type;

    const datesText = (formData.checkIn && formData.checkOut)
      ? `${format(new Date(formData.checkIn + 'T12:00:00'), 'dd/MM/yyyy', { locale: getDateLocale() })} a ${format(new Date(formData.checkOut + 'T12:00:00'), 'dd/MM/yyyy', { locale: getDateLocale() })}`
      : w.unspecified;

    const arrivalText = formData.arrivalTime || w.unspecified;

    let message = `🏢 *${w.title}*\n` +
      `__________________________________\n\n` +
      `👤 *${w.client}:* ${formData.name}\n` +
      `📱 *WhatsApp:* ${formData.whatsapp}\n` +
      `✉️ *E-mail:* ${formData.email}\n` +
      `__________________________________\n\n` +
      `📋 *${w.type}:* ${reservationType}\n` +
      `🛏️ *${w.category}:* ${suitesText}\n`;

    if (formData.experiencePackage) {
      message += `💎 *${w.vip}:* ${formData.experiencePackage}\n`;
    }

    message += `👥 *${w.people}:* ${formData.adults}\n` +
      `🧒 *${w.children}:* ${childrenText}\n` +
      `__________________________________\n\n` +
      `📅 *${w.dates}:* ${datesText}\n` +
      `🕒 *${w.arrival}:* ${arrivalText}\n` +
      `__________________________________\n\n` +
      `_${w.waitMessage}_`;

    if (formData.hasChildren && parseInt(formData.childCount, 10) > 2 && Array.isArray(formData.childAges)) {
      const agesText = formData.childAges.length
        ? formData.childAges.map((age, index) => `${index + 1}: ${age || '-'}`).join(', ')
        : w.unspecified;
      message = message.replace(`🧒 *${w.children}:* ${childrenText}\n`, `🧒 *${w.children}:* ${childrenText}\n🎂 *${w.ages}:* ${agesText}\n`);
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/556132639131?text=${encodedMessage}`, '_blank');
    onClose();
  };

  const stepsProgress = {
    [STEPS.HUB]: 0,
    [STEPS.SUITE_SELECTION]: 20,
    [STEPS.EXPERIENCES]: 20,
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
  const [popoverOpen, setPopoverOpen] = useState({
    checkIn: false,
    checkOut: false
  });

  const wrapSetStep = (newStep) => {
    setDirection(1);
    goToStep(newStep);
  };

  const wrapGoBack = () => {
    setDirection(-1);
    goBack();
  };

  const experiences = [
    {
      id: 'welcome-vip',
      title: t.reservation.experiences['welcome-vip'].title,
      icon: Star,
      image: '/Boas vindas vip.jpg',
      focus: t.reservation.experiences['welcome-vip'].focus,
      setup: t.reservation.experiences['welcome-vip'].setup
    },
    {
      id: 'boutique-exp',
      title: t.reservation.experiences['boutique-exp'].title,
      icon: Gem,
      image: '/Louge privativo.jpg',
      focus: t.reservation.experiences['boutique-exp'].focus,
      setup: t.reservation.experiences['boutique-exp'].setup
    },
    {
      id: 'guest-honor',
      title: t.reservation.experiences['guest-honor'].title,
      icon: Crown,
      image: '/convidado de honra.jpg',
      focus: t.reservation.experiences['guest-honor'].focus,
      setup: t.reservation.experiences['guest-honor'].setup
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-[500px] bg-black/60 backdrop-blur-xl border border-alpha-gold/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]"
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
            <h2 className="text-alpha-gold font-serif text-lg tracking-widest uppercase flex flex-col items-center">
              <span>{step === STEPS.HUB ? t.reservation.title : t.reservation.request}</span>
              {step !== STEPS.HUB && (
                <span className="text-white/50 text-[10px] tracking-wider mt-0.5 normal-case font-sans">
                  {t.reservation.types[typeMapping[formData.type]] || formData.type}
                </span>
              )}
            </h2>
            <button 
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors p-2 -mr-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative bg-transparent">
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
                className="h-full flex flex-col"
              >
                {step === STEPS.HUB && (
                  <div className="space-y-4 flex-1 flex flex-col justify-center p-6">
                    <div className="grid grid-cols-2 gap-3 h-full overflow-y-auto custom-scrollbar pr-1">
                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, type: 'Reserva Individual' }));
                          wrapSetStep(STEPS.SUITE_SELECTION);
                        }}
                        className="group p-3 rounded-2xl border border-alpha-gold/20 bg-white/5 hover:bg-alpha-gold/10 hover:border-alpha-gold/50 transition-all flex flex-col items-center justify-center text-center gap-2 min-h-[110px]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-alpha-gold/20 flex items-center justify-center text-alpha-gold group-hover:scale-110 transition-transform shrink-0">
                          <CalendarCheck2 size={20} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide text-xs">{t.reservation.hub.bookNow}</p>
                          <p className="text-gray-400 text-[9px] line-clamp-2">{t.reservation.hub.bookNowDesc}</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, type: 'Reserva Faturada' }));
                          wrapSetStep(STEPS.RULES);
                        }}
                        className="group p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center text-center gap-2 min-h-[110px]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide text-xs">{t.reservation.hub.corporate}</p>
                          <p className="text-gray-400 text-[9px] line-clamp-2">{t.reservation.hub.corporateDesc}</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, type: 'Grupos e Eventos' }));
                          wrapSetStep(STEPS.SUITE_SELECTION);
                        }}
                        className="group p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center text-center gap-2 min-h-[110px]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                          <Users2 size={20} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide text-xs">{t.reservation.hub.groups}</p>
                          <p className="text-gray-400 text-[9px] line-clamp-2">{t.reservation.hub.groupsDesc}</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, type: 'Recepção VIP & Homenagens' }));
                          wrapSetStep(STEPS.EXPERIENCES);
                        }}
                        className="group p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center text-center gap-2 min-h-[110px]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shrink-0">
                          <Heart size={20} />
                        </div>
                        <div>
                          <p className="text-white font-semibold tracking-wide text-xs">{t.reservation.types.celebrations}</p>
                          <p className="text-gray-400 text-[9px] line-clamp-2">{t.reservation.experiences['welcome-vip'].focus}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {step === STEPS.SUITE_SELECTION && (
                  <div className="space-y-4 h-full flex flex-col p-6">
                    <p className="text-alpha-gold text-sm font-semibold tracking-widest uppercase mb-2 md:mb-4">
                      {formData.type === 'Grupos e Eventos' ? t.reservation.suiteSelection.titleGroup : t.reservation.suiteSelection.titleIndividual}
                    </p>
                    <div className="grid grid-cols-1 gap-3 md:gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                      {roomData.map((room) => {
                        const isSelected = formData.suites.find(s => s.id === room.id);
                        const roomTitle = t.rooms.items[room.id].title;
                        return (
                          <button
                            key={room.id}
                            onClick={() => handleSuiteSelect({ ...room, title: roomTitle })}
                            className={`group relative h-24 md:h-28 rounded-2xl border transition-all overflow-hidden text-left shrink-0 ${
                              isSelected ? 'border-alpha-gold ring-2 ring-alpha-gold/30' : 'border-white/10'
                            }`}
                          >
                            <img src={room.image} alt={roomTitle} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                            <div className="relative p-5 h-full flex items-center justify-between">
                              <div>
                                <p className="text-white font-serif text-lg tracking-wide">{roomTitle}</p>
                                {isSelected && (
                                  <p className="text-alpha-gold text-[10px] tracking-widest uppercase font-bold mt-1">{t.reservation.suiteSelection.selected}</p>
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
                        className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-4 md:py-6 mt-4 disabled:opacity-30 shrink-0"
                      >
                        {t.reservation.suiteSelection.nextStep} <ArrowRight className="ml-2" size={20} />
                      </Button>
                    )}
                  </div>
                )}

                {step === STEPS.EXPERIENCES && (
                  <div className="flex flex-col h-full justify-center">
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 p-6 pb-8 no-scrollbar">
                      {experiences.map((exp) => (
                        <div 
                          key={exp.id}
                          className="min-w-[280px] w-[80%] snap-center bg-transparent border border-alpha-gold/30 rounded-2xl p-6 flex flex-col shadow-2xl relative overflow-hidden shrink-0 group"
                        >
                          {/* Background Image */}
                          <div className="absolute inset-0">
                            <img 
                              src={exp.image} 
                              alt={exp.title} 
                              className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                          </div>

                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <exp.icon size={80} className="text-alpha-gold" />
                          </div>
                          
                          <div className="mb-6 relative z-10">
                            <h3 className="text-lg font-serif text-white mb-2">{exp.title}</h3>
                            <p className="text-[10px] text-alpha-gold font-bold tracking-widest uppercase mb-4">{exp.focus}</p>
                            <p className="text-xs text-gray-400 leading-relaxed">{exp.setup}</p>
                          </div>

                          <Button
                            onClick={() => {
                              setFormData(prev => ({ ...prev, experiencePackage: exp.title }));
                              wrapSetStep(STEPS.DATES);
                            }}
                            className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-4 mt-auto relative z-10"
                          >
                            {t.common.select}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === STEPS.RULES && (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                      <h3 className="text-white font-serif text-xl text-center tracking-wide">
                        {formData.type === 'Reserva Faturada' ? t.reservation.rules.corporateTitle : t.reservation.rules.partnershipTitle}
                      </h3>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 relative">
                        {formData.type === 'Reserva Faturada' ? (
                          <>
                            {t.reservation.rules.corporate.map((rule, index) => (
                              <p key={index} className="text-gray-300 text-sm leading-relaxed">
                                {rule}
                              </p>
                            ))}
                          </>
                        ) : (
                          <>
                            {t.reservation.rules.partnership.map((rule, index) => (
                              <p key={index} className="text-gray-300 text-sm leading-relaxed">
                                {rule}
                              </p>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-6 pt-0 mt-auto shrink-0 relative z-10">
                      <div className="flex justify-center pb-2">
                        <ChevronDown className="text-alpha-gold animate-bounce opacity-50" size={20} />
                      </div>
                      <Button 
                        onClick={() => {
                          if (formData.type === 'Reserva Faturada') {
                            wrapSetStep(STEPS.SUITE_SELECTION);
                          } else {
                            wrapSetStep(STEPS.CONTACT);
                          }
                        }}
                        className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-4 md:py-6"
                      >
                        {t.common.continue} <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  </div>
                )}

                {step === STEPS.DATES && (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                      {formData.suite && (
                        <div className="relative h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                          <img src={formData.suite.image} className="w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white font-serif tracking-widest text-sm uppercase">{formData.suite.title}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">{t.reservation.dates.checkIn}</label>
                          <Popover 
                            open={popoverOpen.checkIn} 
                            onOpenChange={(open) => setPopoverOpen(prev => ({ ...prev, checkIn: open }))}
                          >
                            <PopoverTrigger asChild>
                              <div className="relative group cursor-pointer">
                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors z-10 pointer-events-none" size={20} />
                                <input
                                  type="text"
                                  placeholder="DD/MM/AAAA"
                                  value={dateInput.checkIn}
                                  readOnly
                                  className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all placeholder:text-white/20 cursor-pointer"
                                />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-zinc-950 border-alpha-gold/30 z-[10001]" align="start" side="bottom" sideOffset={10}>
                              <Calendar
                                mode="single"
                                selected={formData.checkIn ? new Date(formData.checkIn + 'T12:00:00') : undefined}
                                onSelect={(date) => handleCalendarSelect(date, 'checkIn')}
                                initialFocus
                                locale={getDateLocale()}
                                disabled={(date) => date < new Date().setHours(0,0,0,0)}
                                className="bg-zinc-950 text-alpha-gold pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-1">
                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">{t.reservation.dates.checkOut}</label>
                          <Popover 
                            open={popoverOpen.checkOut} 
                            onOpenChange={(open) => setPopoverOpen(prev => ({ ...prev, checkOut: open }))}
                          >
                            <PopoverTrigger asChild>
                              <div className="relative group cursor-pointer">
                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors z-10 pointer-events-none" size={20} />
                                <input
                                  type="text"
                                  placeholder="DD/MM/AAAA"
                                  value={dateInput.checkOut}
                                  readOnly
                                  className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all placeholder:text-white/20 cursor-pointer"
                                />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-zinc-950 border-alpha-gold/30 z-[10001]" align="start" side="bottom" sideOffset={10}>
                              <Calendar
                                mode="single"
                                selected={formData.checkOut ? new Date(formData.checkOut + 'T12:00:00') : undefined}
                                onSelect={(date) => handleCalendarSelect(date, 'checkOut')}
                                initialFocus
                                locale={getDateLocale()}
                                disabled={(date) => {
                                  const minDate = formData.checkIn ? addDays(new Date(formData.checkIn + 'T12:00:00'), 1) : new Date();
                                  return date < minDate.setHours(0,0,0,0);
                                }}
                                className="bg-zinc-950 text-alpha-gold pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto shrink-0 relative z-10">
                      <div className="flex justify-center pb-2">
                        <ChevronDown className="text-alpha-gold animate-bounce opacity-50" size={20} />
                      </div>
                      <Button 
                        disabled={dateInput.checkIn.length !== 10 || dateInput.checkOut.length !== 10 || !formData.checkIn || !formData.checkOut}
                        onClick={() => wrapSetStep(STEPS.GUESTS)}
                        className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-4 md:py-6 disabled:opacity-30"
                      >
                        {t.reservation.dates.nextStep} <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  </div>
                )}

                {step === STEPS.GUESTS && (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">
                            {formData.type === 'Grupos e Eventos' ? t.reservation.guests.titleGroup : t.reservation.guests.titleIndividual}
                          </label>
                          <div className="relative group">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors z-10 pointer-events-none" size={20} />
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
                                className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                              />
                            ) : (
                              <Select 
                                value={formData.adults} 
                                onValueChange={(val) => setFormData(prev => ({ ...prev, adults: val }))}
                              >
                                <SelectTrigger className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-6 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-alpha-gold/50 transition-all relative z-[10] h-auto">
                                  <SelectValue placeholder={t.reservation.guests.adult1} />
                                </SelectTrigger>
                                <SelectContent className="z-[10001]">
                                  {[
                                    { val: "1", label: t.reservation.guests.adult1 },
                                    { val: "2", label: t.reservation.guests.adults2 },
                                    { val: "3", label: t.reservation.guests.adults3 },
                                    { val: "4", label: t.reservation.guests.adults4 }
                                  ].filter(opt => parseInt(opt.val, 10) <= maxAdults).map(opt => (
                                    <SelectItem key={opt.val} value={opt.val} className="cursor-pointer">
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>

                        {formData.type !== 'Recepção VIP & Homenagens' && (
                          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-semibold text-sm">{t.reservation.guests.hasChildren}</p>
                                <p className="text-gray-400 text-[10px] tracking-wider uppercase mt-1">{t.reservation.guests.childrenCourtesy}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {formData.hasChildren && <span className="text-alpha-gold text-[10px] font-bold uppercase">{t.common.yes}</span>}
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
                            </div>

                            {formData.hasChildren && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-6"
                              >
                                <div className="space-y-1">
                                  <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold">{t.reservation.guests.childrenCount}</label>
                                  <div className="relative">
                                    <input 
                                      type="number"
                                      min="1"
                                      value={formData.childCount}
                                      onChange={(e) => {
                                        const nextValue = Math.max(1, parseInt(e.target.value, 10) || 1).toString();
                                        setFormData(prev => ({ ...prev, childCount: nextValue }));
                                      }}
                                      className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 pointer-events-auto">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const currentValue = Math.max(1, parseInt(formData.childCount, 10) || 1);
                                          setFormData(prev => ({ ...prev, childCount: (currentValue + 1).toString() }));
                                        }}
                                        className="w-8 h-6 rounded-md bg-white/5 border border-white/10 hover:border-alpha-gold/40 hover:bg-alpha-gold/10 transition-colors flex items-center justify-center"
                                      >
                                        <ChevronUp className="text-alpha-gold/80" size={16} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const currentValue = Math.max(1, parseInt(formData.childCount, 10) || 1);
                                          setFormData(prev => ({ ...prev, childCount: Math.max(1, currentValue - 1).toString() }));
                                        }}
                                        className="w-8 h-6 rounded-md bg-white/5 border border-white/10 hover:border-alpha-gold/40 hover:bg-alpha-gold/10 transition-colors flex items-center justify-center"
                                      >
                                        <ChevronDown className="text-alpha-gold/80" size={16} />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                  <div>
                                    <p className="text-white font-semibold text-xs">
                                      {formData.type === 'Grupos e Eventos' 
                                        ? t.reservation.guests.allOver5 
                                        : (parseInt(formData.childCount) > 2 ? t.reservation.guests.allOver5Many : (parseInt(formData.childCount) > 1 ? t.reservation.guests.allOver5 : t.reservation.guests.oneChildOver5))
                                      }
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {formData.allChildrenOver5 && <span className="text-alpha-gold text-[10px] font-bold uppercase">{t.common.yes}</span>}
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
                                </div>

                                {parseInt(formData.childCount, 10) > 2 && (
                                  <div className="space-y-4 p-4 rounded-xl bg-black/20 border border-white/10">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                      {Array.from({ length: Math.max(0, parseInt(formData.childCount, 10) || 0) }).map((_, index) => (
                                        <div key={index} className="space-y-1">
                                          <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold">
                                            {t.reservation.guests.childAgeLabel} {index + 1}
                                          </label>
                                          <Select
                                            value={formData.childAges[index] || ''}
                                            onValueChange={(val) => {
                                              setFormData(prev => {
                                                const next = Array.isArray(prev.childAges) ? [...prev.childAges] : [];
                                                next[index] = val;
                                                return { ...prev, childAges: next };
                                              });
                                            }}
                                          >
                                            <SelectTrigger className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-1 focus:ring-alpha-gold/50 transition-all h-auto">
                                              <SelectValue placeholder={t.common.select} />
                                            </SelectTrigger>
                                            <SelectContent className="z-[10001]">
                                              {Array.from({ length: 18 }).map((__, age) => (
                                                <SelectItem key={age} value={age.toString()} className="cursor-pointer">
                                                  {age}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <p className="text-gray-500 text-[10px] italic">{t.reservation.guests.childrenWarning}</p>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto shrink-0 relative z-20">
                      <Button 
                        onClick={() => wrapSetStep(STEPS.ARRIVAL_TIME)}
                        className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-4 md:py-6"
                      >
                        {t.reservation.guests.nextStep} <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </div>
                  </div>
                )}

                {step === STEPS.ARRIVAL_TIME && (
                  <div className="space-y-8 flex flex-col h-full p-6">
                    <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
                      <div className="text-center space-y-2">
                        <h3 className="text-white font-serif text-xl tracking-wide">{t.reservation.arrivalTime.title}</h3>
                        <p className="text-gray-400 text-xs uppercase tracking-widest">{t.reservation.arrivalTime.subtitle}</p>
                      </div>

                      <div className="relative group max-w-xs mx-auto w-full">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 group-focus-within:text-alpha-gold transition-colors z-10 pointer-events-none" size={24} />
                        <input
                          type="time"
                          value={formData.arrivalTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, arrivalTime: e.target.value }))}
                          className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-6 pl-14 pr-4 text-white text-xl text-center focus:outline-none focus:border-alpha-gold/50 transition-all [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <Button 
                      disabled={!formData.arrivalTime}
                      onClick={() => wrapSetStep(STEPS.CONTACT)}
                      className="w-full bg-alpha-gold text-obsidian font-bold tracking-widest py-4 md:py-6 disabled:opacity-30 mt-auto shrink-0 relative z-10 mb-4"
                    >
                      {t.reservation.arrivalTime.almostThere} <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                )}

                {step === STEPS.CONTACT && (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <h3 className="text-white font-serif text-xl tracking-wide">{t.reservation.contact.title}</h3>
                          <p className="text-gray-400 text-xs uppercase tracking-widest">{t.reservation.contact.subtitle}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">{t.reservation.contact.nameLabel}</label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 z-10 pointer-events-none" size={20} />
                              <input 
                                type="text"
                                placeholder={t.reservation.contact.namePlaceholder}
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">{t.reservation.contact.emailLabel}</label>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 z-10 pointer-events-none" size={20} />
                              <input 
                                type="email"
                                placeholder={t.reservation.contact.emailPlaceholder}
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-alpha-gold text-[10px] tracking-[0.2em] uppercase font-bold ml-1">{t.reservation.contact.whatsappLabel}</label>
                            <div className="relative group">
                              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-alpha-gold/50 z-10 pointer-events-none" size={20} />
                              <input 
                                type="tel"
                                placeholder={t.reservation.contact.whatsappPlaceholder}
                                value={formData.whatsapp}
                                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                                className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-alpha-gold/50 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-alpha-gold/5 border border-alpha-gold/20 flex items-start space-x-3">
                          <Info className="text-alpha-gold shrink-0 mt-0.5" size={16} />
                          <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
                            {t.reservation.contact.disclaimer}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto shrink-0 relative z-10">
                      <Button 
                        disabled={!formData.name || !formData.whatsapp || !formData.email}
                        onClick={handleReservation}
                        className="w-full bg-alpha-gold text-obsidian font-bold tracking-[0.2em] py-4 md:py-6 disabled:opacity-30"
                      >
                        {t.reservation.contact.finish}
                      </Button>
                    </div>
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
