import React from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const Location = () => {
  return (
    <section className="bg-[var(--color-sable)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row min-h-[70vh]">
        
        {/* Carte Placeholder */}
        <div className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-full bg-[var(--color-dune)]/50">
          <div className="absolute inset-0 flex items-center justify-center font-sans text-[var(--color-brun-chaud)] opacity-40 uppercase tracking-widest text-sm">
            [ Mapbox Integration ]
            {/* // TODO webdev: Intégrer carte Mapbox stylisée (palette sable/brun) ici */}
          </div>
        </div>

        {/* Texte */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 lg:p-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-md w-full"
          >
            <h2 className="font-cormorant text-4xl md:text-5xl text-[var(--color-brun-chaud)] mb-8">
              San Miguel de Abona
            </h2>
            
            <p className="font-sans text-[var(--color-brun-chaud)] text-sm md:text-base leading-relaxed mb-8">
              Un village historique niché au sud de l'île. Loin de l'agitation, mais à portée des essentiels. La cueva bénéficie d'une situation privilégiée, entre océan et cratères volcaniques.
            </p>

            <ul className="space-y-4 mb-12 font-sans text-sm text-[var(--color-brun-chaud)] opacity-80">
              <li className="flex justify-between border-b border-[var(--color-brun-chaud)]/10 pb-2">
                <span>Aéroport Sud (TFS)</span>
                <span>15 min</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-brun-chaud)]/10 pb-2">
                <span>El Médano</span>
                <span>20 min</span>
              </li>
              <li className="flex justify-between border-b border-[var(--color-brun-chaud)]/10 pb-2">
                <span>Costa del Silencio</span>
                <span>25 min</span>
              </li>
            </ul>

            <Button href="https://maps.app.goo.gl/placeholder" variant="link">
              Voir l'itinéraire &rarr;
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
