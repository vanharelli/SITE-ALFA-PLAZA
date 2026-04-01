import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const message = "Olá, equipe Alfa Plaza. Gostaria de verificar a disponibilidade de suítes para uma estada em Brasília. Poderiam me enviar os detalhes do tarifário e os serviços inclusos para envio";
  const whatsappUrl = `https://wa.me/556132639131?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 30000); // 30 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-row-reverse items-center group pointer-events-none">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors relative pointer-events-auto"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle size={28} fill="currentColor" className="text-white" />
        
        {/* Efeito de pulso mais suave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[ping_3s_infinite] opacity-10 pointer-events-none"></span>
      </motion.a>

      <AnimatePresence>
        {showMessage && (
          <motion.span
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="mr-4 bg-white/90 backdrop-blur-sm text-obsidian px-5 py-2 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap shadow-2xl border border-alpha-gold/20 flex items-center relative pointer-events-auto"
          >
            Faça sua reserva agora
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/90 rotate-45 border-r border-t border-alpha-gold/20"></div>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppButton;
