import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const IndoorPool = () => {
  return (
    <section className="bg-[var(--color-dune)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[80vh]">
        
        {/* Image Asymétrique */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2940&auto=format&fit=crop"
            alt="Piscine intérieure chauffée dans la cueva"
            fill
            className="object-cover"
          />
          {/* // TODO photo: [Piscine intérieure chauffée, vapeur, lumière tamisée sur la pierre] */}
          <div className="absolute inset-0 bg-[var(--color-brun-chaud)]/10" />
        </motion.div>

        {/* Texte Éditorial */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 lg:p-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-md"
          >
            <h2 className="font-cormorant text-4xl md:text-5xl italic text-[var(--color-brun-chaud)] mb-8">
              L'eau chaude,<br />toute l'année.
            </h2>
            
            <p className="font-sans text-[var(--color-brun-chaud)] text-sm md:text-base leading-relaxed mb-12">
              Une oasis creusée à même la pierre. L'eau garde sa chaleur, été comme hiver. La vapeur monte doucement vers les voûtes minérales. Le clapotis est le seul son qui vient rythmer le silence. On s'y plonge, on y reste.
            </p>

            <ul className="flex flex-wrap items-center gap-4 font-sans text-xs uppercase tracking-widest text-[var(--color-brun-chaud)] font-medium">
              <li>Eau chauffée</li>
              <li className="opacity-40">·</li>
              <li>Accès privé</li>
              <li className="opacity-40">·</li>
              <li>7j/7</li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
