import React from 'react';
import { OrganicImage } from '@/components/ui/OrganicImage';
import { motion } from 'framer-motion';

export const EditorialIntro = () => {
  return (
    <section id="decouvrir" className="py-24 md:py-32 bg-[var(--color-sable)] relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
        
        {/* Text Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 md:col-span-7 flex flex-col justify-center"
        >
          <div className="font-cormorant text-2xl md:text-3xl leading-relaxed text-[var(--color-brun-chaud)] md:columns-2 gap-12">
            <p className="mb-6 md:mb-0 break-inside-avoid">
              <span className="float-left text-7xl md:text-8xl leading-none mr-3 mt-2 font-cormorant text-[var(--color-terracotta)]">
                B
              </span>
              ien plus qu'un simple séjour, la Cueva Thalía est une invitation à ralentir. La lumière entre par le haut, rasante et chaude, caressant les murs irréguliers sculptés par le temps. Le silence est dense, presque palpable. 
            </p>
            <p className="break-inside-avoid">
              On perd doucement la notion des heures. L'air y est pur, la température idéale. C'est une maison qui ne se visite pas, mais qui s'éprouve. Un refuge brut où l'architecture rencontre la nature de l'île.
            </p>
          </div>
          
          <div className="mt-12 md:mt-16 text-center md:text-left">
            <p className="font-sans text-[11px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-terracotta)] font-medium">
              Silence <span className="mx-3 opacity-40">·</span> Matière <span className="mx-3 opacity-40">·</span> Lumière
            </p>
          </div>
        </motion.div>

        {/* Image Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="col-span-1 md:col-span-5"
        >
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto md:ml-auto">
            <OrganicImage
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=2832&auto=format&fit=crop"
              alt="Détail intimiste de la cueva, lumière sur la pierre et textile en lin"
              fill
              radiusVariant={2}
            />
            {/* // TODO photo: [Détail intimiste, textile lin et lumière chaude sur la roche] */}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
