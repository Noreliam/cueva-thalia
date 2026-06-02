'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Reviews = () => {
  const reviews = [
    {
      text: "Trois nuits. On a perdu la notion du temps. L'architecture de la cueva est fascinante, la lumière changeante crée une atmosphère qui apaise instantanément. C'est rare.",
      author: "Camille",
      city: "Paris",
      date: "Octobre 2025"
    },
    {
      text: "La piscine intérieure est une merveille. Se baigner dans cette eau chaude alors que le silence est total, entouré par la roche volcanique... Une parenthèse parfaite.",
      author: "Marc",
      city: "Lyon",
      date: "Août 2025"
    },
    {
      text: "Un lieu qui a une âme. Tout est pensé pour le repos et la déconnexion. Les détails des matières, le linge en lin, l'éclairage... Nous reviendrons.",
      author: "Elena & David",
      city: "Madrid",
      date: "Juin 2025"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-blanc-casse)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} strokeWidth={1} size={16} className="text-[var(--color-brun-chaud)] opacity-60" />
                ))}
              </div>
              <p className="font-cormorant text-xl md:text-2xl italic text-[var(--color-brun-chaud)] leading-relaxed mb-8 flex-1">
                "{review.text}"
              </p>
              <div className="font-sans text-[11px] uppercase tracking-widest text-[var(--color-brun-chaud)] font-medium">
                {review.author} <span className="opacity-40 mx-2">·</span> {review.city} <span className="opacity-40 mx-2">·</span> <span className="opacity-70">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
