import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/+556132639131?text=%22Ol%C3%A1%2C%20equipe%20Alfa%20Plaza.%20Gostaria%20de%20verificar%20a%20disponibilidade%20de%20su%C3%ADtes%20para%20uma%20estada%20em%20Bras%C3%ADlia.%20Poderiam%20me%20enviar%20os%20detalhes%20do%20tarif%C3%A1rio%20e%20os%20servi%C3%A7os%20inclusos.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={32} fill="currentColor" className="text-white" />
      
      {/* Tooltip opcional que aparece no hover */}
      <span className="absolute right-full mr-4 bg-white text-obsidian px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-alpha-gold/20">
        Fale Conosco
      </span>
      
      {/* Efeito de pulso discreto */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
    </motion.a>
  );
};

export default WhatsAppButton;
