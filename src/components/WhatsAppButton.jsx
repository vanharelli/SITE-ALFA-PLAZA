import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const whatsappUrl = "https://wa.me/+556132639131?text=%22Ol%C3%A1%2C%20equipe%20Alfa%20Plaza.%20Gostaria%20de%20verificar%20a%20disponibilidade%20de%20su%C3%ADtes%20para%20uma%20estada%20em%20Bras%C3%ADlia.%20Poderiam%20me%20enviar%20os%20detalhes%20do%20tarif%C3%A1rio%20e%20os%20servi%C3%A7os%20inclusos.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 30000); // 30 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center">
      <AnimatePresence>
        {showMessage && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 bg-white/90 backdrop-blur-sm text-obsidian px-6 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap shadow-2xl border border-alpha-gold/20 flex items-center relative"
          >
            Faça sua reserva agora
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45 border-r border-b border-alpha-gold/20"></div>
          </motion.span>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors group relative"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" className="text-white" />
        
        {/* Efeito de pulso mais suave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[ping_3s_infinite] opacity-10 pointer-events-none"></span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
