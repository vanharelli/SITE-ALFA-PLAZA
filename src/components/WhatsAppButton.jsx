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
      <MessageCircle size={28} fill="currentColor" className="text-white" />
      
      {/* Mensagem discreta */}
      <span className="absolute right-full mr-4 bg-white/90 backdrop-blur-sm text-obsidian px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-alpha-gold/20">
        Faça sua reserva agora
      </span>
      
      {/* Efeito de pulso mais suave */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[ping_3s_infinite] opacity-10 pointer-events-none"></span>
    </motion.a>
  );
};

export default WhatsAppButton;
