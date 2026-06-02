import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const BookingCTA = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-[var(--color-sable)] flex items-center justify-center">
      {/* Background Image with strong overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2787&auto=format&fit=crop"
          alt="Atmosphère chaude de la cueva"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-blanc-casse)]/80 backdrop-blur-sm" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <h2 className="font-cormorant text-5xl md:text-7xl italic text-[var(--color-brun-chaud)] mb-8">
          Réservez votre parenthèse
        </h2>
        
        <p className="font-sans text-[var(--color-brun-chaud)] text-sm md:text-base leading-relaxed mb-12 max-w-xl mx-auto">
          Pour un séjour, un événement ou une retraite — écrivez-nous, on vous répond personnellement.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 w-full sm:w-auto">
          {/* // TODO webdev: intégration widget Smoobu au clic sur ce bouton */}
          <Button href="/reserver" fullWidth className="sm:w-auto px-10">
            Vérifier les disponibilités
          </Button>
          
          <Button href="/contact" variant="secondary" fullWidth className="sm:w-auto px-10">
            Nous écrire
          </Button>
        </div>

        <a 
          href="https://wa.me/34657077910?text=Bonjour%2C%20j%27aimerais%20en%20savoir%20plus%20sur%20Cueva%20Thal%C3%ADa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-sans text-[11px] md:text-xs tracking-[0.2em] uppercase text-[var(--color-brun-chaud)] hover:text-[var(--color-terracotta)] transition-colors border-b border-[var(--color-brun-chaud)]/20 pb-1"
        >
          <MessageCircle size={16} strokeWidth={1.5} />
          <span>+34 657 077 910</span>
        </a>
      </motion.div>
    </section>
  );
};
