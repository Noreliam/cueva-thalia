'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Placeholder images
const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?auto=format&fit=crop&w=1200&q=80', category: 'Cueva' },
  { id: 2, src: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80', category: 'Piscine' },
  { id: 3, src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80', category: 'Chambre' },
  { id: 4, src: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&w=1200&q=80', category: 'Jardin' },
  { id: 5, src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80', category: 'Cueva' },
  { id: 6, src: 'https://images.unsplash.com/photo-1533633310920-cc9bf1e7f9b0?auto=format&fit=crop&w=1200&q=80', category: 'Piscine' },
];

export default function Gallery() {
  const t = useTranslations('Galerie');
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Cueva', 'Piscine', 'Chambre', 'Jardin'];
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
  const prevImage = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full border border-ct-dune/30 text-sm tracking-widest uppercase transition-colors ${
              filter === cat ? 'bg-ct-brun-chaud text-white' : 'bg-transparent text-ct-brun-chaud hover:bg-ct-dune/10'
            }`}
          >
            {cat === 'All' ? t('filter_all') : t(`filter_${cat.toLowerCase()}`)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredImages.map((img, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={img.id}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.src}
                alt={img.category}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            >
              <X size={32} />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-50 p-2"
            >
              <ChevronRight size={48} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={filteredImages[lightboxIndex].src}
              alt="Gallery Preview"
              className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
