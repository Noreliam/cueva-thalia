import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const HeroImmersive = () => {
  return (
    <section className="relative w-full min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
          alt="Vue de l'intérieur de la cueva, lumière chaude sur la roche volcanique"
          fill
          priority
          className="object-cover"
        />
        {/* // TODO photo: [Une photo de la cueva avec lumière chaude et roche volcanique] */}
        
        {/* Overlay sable léger */}
        <div className="absolute inset-0 bg-[var(--color-sable)]/15" />
        
        {/* Dégradé doux pour assurer la lisibilité en bas */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-sable)]/80 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-sans text-[11px] md:text-xs tracking-[0.3em] uppercase text-[var(--color-blanc-casse)] mb-6 text-shadow-warm">
            TENERIFE · SAN MIGUEL DE ABONA
          </span>
          
          <h1 className="font-cormorant text-[clamp(56px,8vw,120px)] leading-none text-[var(--color-blanc-casse)] text-shadow-warm">
            Cueva Thalía
          </h1>
          <span className="font-cormorant italic text-2xl md:text-4xl text-[var(--color-blanc-casse)] mt-2 md:mt-4 text-shadow-warm">
            L'expérience d'un lieu hors du temps
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-sans text-[var(--color-blanc-casse)] mt-8 md:mt-12 text-sm md:text-base max-w-xl leading-relaxed text-shadow-warm"
        >
          Une maison troglodyte taillée dans la roche volcanique. Une parenthèse sensorielle au sud de Tenerife.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col items-center gap-6 mt-12 w-full md:w-auto"
        >
          <Button href="/reserver" fullWidth className="md:w-auto">
            Vérifier les disponibilités
          </Button>
          
          <Button href="#decouvrir" variant="link" className="text-[var(--color-blanc-casse)] decoration-[var(--color-blanc-casse)]/40 hover:text-[var(--color-terracotta)] hover:decoration-[var(--color-terracotta)] text-shadow-warm">
            Découvrir le lieu ↓
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-[1px] h-12 bg-[var(--color-blanc-casse)]/50" />
        <span className="font-sans text-[11px] uppercase tracking-widest text-[var(--color-blanc-casse)]">scroll</span>
      </motion.div>
    </section>
  );
};
