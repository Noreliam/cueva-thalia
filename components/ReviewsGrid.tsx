'use client';

import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Emma',
    rating: 5,
    text: "Les photos ne lui rendent vraiment pas justice… Je n'ai jamais été aussi détendue."
  },
  {
    name: 'Caroline',
    rating: 5,
    text: "La grotte de Manon est magnifique, un endroit magique avec sa piscine incroyable."
  },
  {
    name: 'Jesper',
    rating: 5,
    text: "L'expérience la plus incroyable… la sensation d'être dans le spa chauffé avec un verre de vin blanc de Tenerife."
  },
  {
    name: 'Michal',
    rating: 5,
    text: "La grotte était unique, magnifiquement éclairée et avait une atmosphère incroyable."
  }
];

export default function ReviewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {reviews.map((review, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="p-6 bg-white/50 backdrop-blur-sm border border-ct-dune/20 rounded-lg flex flex-col"
        >
          <div className="flex gap-1 mb-3">
            {[...Array(review.rating)].map((_, j) => (
              <span key={j} className="text-ct-terracotta text-sm">★</span>
            ))}
          </div>
          <p className="font-serif text-ct-brun-chaud text-lg italic flex-1 mb-4">
            « {review.text} »
          </p>
          <p className="font-sans text-sm font-medium text-ct-brun-chaud/60 uppercase tracking-widest">
            {review.name}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
