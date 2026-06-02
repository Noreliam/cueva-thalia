'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group">
      <a
        href="https://wa.me/34657077910?text=Bonjour%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20Cueva%20Thal%C3%ADa"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[var(--color-terracotta)] text-[var(--color-blanc-casse)] rounded-full shadow-[var(--shadow-warm-md)] hover:shadow-[var(--shadow-warm-lg)] transition-all duration-500 ease-out hover:scale-105"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle strokeWidth={1.5} size={24} className="md:w-7 md:h-7" />
      </a>
      
      {/* Tooltip */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-4 py-2 bg-[var(--color-sable)] text-[var(--color-brun-chaud)] text-xs uppercase tracking-widest font-sans rounded shadow-[var(--shadow-warm-sm)] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Écrivez-nous sur WhatsApp
      </div>
    </div>
  );
}
