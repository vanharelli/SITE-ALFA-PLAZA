import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CalendarCheck, CreditCard, Cookie } from 'lucide-react';
import { Button } from './ui/button';

const LegalModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-[600px] bg-black/60 backdrop-blur-xl border border-alpha-gold/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-alpha-gold h-6 w-6" />
                <h2 className="text-white font-serif text-lg sm:text-xl tracking-wider uppercase">
                  Protocolo de Transparência e Segurança <span className="text-alpha-gold">Alfa Plaza</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-transparent">
              {/* Section 1: LGPD */}
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-alpha-gold">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-semibold uppercase tracking-widest text-sm">Privacidade e LGPD</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Em conformidade com a LGPD, realizamos a coleta estritamente funcional de dados (Nome, WhatsApp, Datas) necessária para a efetivação de reservas. Seus dados possuem armazenamento temporário e você detém o direito total de exclusão sob demanda, solicitável a qualquer momento via nosso canal oficial de WhatsApp.
                </p>
              </section>

              {/* Section 2: Reservas */}
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-alpha-gold">
                  <CalendarCheck className="h-5 w-5" />
                  <h3 className="font-semibold uppercase tracking-widest text-sm">Política de Reservas</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A pré-reserva realizada através deste site não garante disponibilidade imediata de acomodação. A confirmação definitiva ocorre exclusivamente após a validação manual do nosso setor de reservas através do canal oficial de atendimento.
                </p>
              </section>

              {/* Section 3: Pagamentos */}
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-alpha-gold">
                  <CreditCard className="h-5 w-5" />
                  <h3 className="font-semibold uppercase tracking-widest text-sm">Segurança Financeira</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  O Alfa Plaza Hotel prioriza sua segurança financeira: não solicitamos dados de cartão de crédito diretamente via interface web. Todos os pagamentos são processados exclusivamente via PIX ou presencialmente no balcão físico do hotel.
                </p>
              </section>

              {/* Section 4: Cookies */}
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-alpha-gold">
                  <Cookie className="h-5 w-5" />
                  <h3 className="font-semibold uppercase tracking-widest text-sm">Uso de Cookies</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Utilizamos cookies estritamente técnicos para otimização de performance e gerenciamento de cache local, garantindo uma navegação fluida e segura em nossa plataforma.
                </p>
              </section>
            </div>

            {/* Footer / Action */}
            <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
              <Button
                onClick={onClose}
                className="w-full bg-alpha-gold text-obsidian font-bold tracking-[0.2em] uppercase py-6 rounded-xl hover:bg-alpha-gold/90 transition-all hover:scale-[1.02] shadow-lg shadow-alpha-gold/20"
              >
                CONCORDO E FECHAR
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
