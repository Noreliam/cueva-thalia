import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export const GalleryMasonry = () => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=2940&auto=format&fit=crop', title: 'Lumière d\'après-midi', style: 'col-span-1 md:col-span-2 row-span-2 h-[400px] md:h-[600px]' },
    { src: 'https://images.unsplash.com/photo-1552564617-e2187f59e9c7?q=80&w=2835&auto=format&fit=crop', title: 'La roche brute', style: 'col-span-1 h-[250px] md:h-[300px]' },
    { src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2940&auto=format&fit=crop', title: 'Détail textile', style: 'col-span-1 h-[250px] md:h-[300px]' },
    { src: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=2960&auto=format&fit=crop', title: 'Chambre voûtée', style: 'col-span-1 md:col-span-2 h-[300px]' },
    { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2918&auto=format&fit=crop', title: 'Ombres portées', style: 'col-span-1 md:col-span-1 h-[300px]' }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-blanc-casse)]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 grid-flow-row-dense mb-16">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden group rounded ${img.style}`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brun-chaud)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-6 left-6 font-sans text-xs tracking-widest uppercase text-[var(--color-blanc-casse)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                {img.title}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button href="/galerie" variant="link">
            Explorer la galerie complète &rarr;
          </Button>
        </div>

      </div>
    </section>
  );
};
