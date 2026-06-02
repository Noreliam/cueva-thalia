import React from 'react';
import { Card } from '@/components/ui/Card';
import { OrganicImage } from '@/components/ui/OrganicImage';
import { Button } from '@/components/ui/Button';
import { Moon, GlassWater, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThreeWays = () => {
  const cards = [
    {
      title: "Séjourner",
      description: "Une parenthèse pour ralentir. Dormir au cœur de la roche, se réveiller dans la lumière douce du volcan.",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d1429815?q=80&w=2940&auto=format&fit=crop",
      icon: <Moon strokeWidth={1} className="w-8 h-8 text-[var(--color-brun-chaud)] opacity-40" />,
      link: "/sejourner"
    },
    {
      title: "Célébrer",
      description: "Un dîner sous les étoiles, un événement intimiste. Privatisez la cueva pour vos moments rares.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2940&auto=format&fit=crop",
      icon: <GlassWater strokeWidth={1} className="w-8 h-8 text-[var(--color-brun-chaud)] opacity-40" />,
      link: "/evenements-prives"
    },
    {
      title: "Se retrouver",
      description: "Des retraites pensées pour l'esprit et le corps. L'endroit idéal pour créer, méditer, partager.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2899&auto=format&fit=crop",
      icon: <Leaf strokeWidth={1} className="w-8 h-8 text-[var(--color-brun-chaud)] opacity-40" />,
      link: "/workshops-retraites"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-blanc-casse)] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-cormorant text-4xl md:text-5xl text-[var(--color-brun-chaud)] mb-6">
            Trois façons de vivre la cueva
          </h2>
          <p className="font-sans text-[var(--color-brun-chaud)] opacity-80 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Un espace modulable, pensé pour s'adapter à votre rythme. Que vous veniez pour trouver le repos, réunir vos proches ou animer un atelier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card variant="transparent" className="p-0 md:p-0 shadow-none hover:shadow-none flex flex-col h-full group">
                <div className="relative mb-8 w-full aspect-[4/3]">
                  <OrganicImage
                    src={card.image}
                    alt={card.title}
                    fill
                    radiusVariant={(index % 3 + 1) as 1 | 2 | 3}
                  />
                  <div className="absolute -bottom-4 right-4 bg-[var(--color-sable)] p-3 rounded-full shadow-[var(--shadow-warm-sm)]">
                    {card.icon}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center text-center px-4">
                  <h3 className="font-cormorant text-2xl text-[var(--color-brun-chaud)] mb-4">{card.title}</h3>
                  <p className="font-sans text-sm text-[var(--color-brun-chaud)] opacity-80 leading-relaxed mb-8 flex-1">
                    {card.description}
                  </p>
                  <Button href={card.link} variant="link" className="mt-auto">
                    Découvrir &rarr;
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
