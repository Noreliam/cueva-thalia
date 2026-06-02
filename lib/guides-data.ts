export type GuidePage = {
  slug: string;
  noindex: true;
  titles: { es: string; fr: string; en: string };
  descriptions: { es: string; fr: string; en: string };
  h1: { es: string; fr: string; en: string };
  keywords?: string[];
};

export const guidePages: GuidePage[] = [
  {
    slug: 'sejour-insolite-tenerife',
    noindex: true,
    h1: {
      fr: 'Séjour insolite à Tenerife : passer une nuit dans une cueva privée',
      es: 'Alojamiento único en Tenerife: dormir en una cueva privada',
      en: 'Unique stay in Tenerife: sleep in a private cave',
    },
    titles: {
      fr: 'Séjour insolite Tenerife : nuit dans une cueva volcanique privée | Cueva Thalía',
      es: 'Alojamiento único Tenerife: dormir en cueva privada con piscina | Cueva Thalía',
      en: 'Unique stay Tenerife: private volcanic cave | Cueva Thalía',
    },
    descriptions: {
      fr: "Dormez dans une vraie grotte volcanique à Tenerife. Cueva Thalía, piscine intérieure privée, silence absolu. L'hébergement insolite le plus unique du sud de l'île.",
      es: 'Duerma en una auténtica cueva volcánica en Tenerife. Cueva Thalía, piscina interior privada, silencio absoluto.',
      en: 'Sleep in a real volcanic cave in Tenerife. Cueva Thalía, private indoor pool, absolute silence.',
    },
    keywords: ['cueva privada Tenerife', 'hébergement insolite Tenerife', 'dormir dans une grotte Tenerife'],
  },
  {
    slug: 'que-faire-san-miguel-de-abona',
    noindex: true,
    h1: {
      fr: 'Que faire à San Miguel de Abona et autour ?',
      es: 'Qué hacer en San Miguel de Abona y alrededores',
      en: 'What to do in San Miguel de Abona and nearby',
    },
    titles: {
      fr: 'Que faire à San Miguel de Abona, Tenerife ? Guide complet | Cueva Thalía',
      es: 'Qué hacer en San Miguel de Abona, Tenerife | Cueva Thalía',
      en: 'What to do in San Miguel de Abona, Tenerife | Cueva Thalía',
    },
    descriptions: {
      fr: "Plages, Teide, Siam Park, El Médano, golf, villages... Tout ce qu'il y a à faire autour de San Miguel de Abona lors d'un séjour à Tenerife Sud.",
      es: 'Playas, Teide, Siam Park, El Médano, golf, pueblos… Todo lo que hacer alrededor de San Miguel de Abona.',
      en: 'Beaches, Teide, Siam Park, El Médano, golf, villages… Everything to do around San Miguel de Abona.',
    },
  },
  {
    slug: 'retraite-bien-etre-tenerife',
    noindex: true,
    h1: {
      fr: 'Organiser une retraite bien-être à Tenerife : trouver le lieu idéal',
      es: 'Organizar un retiro de bienestar en Tenerife: encontrar el lugar ideal',
      en: 'Organising a wellness retreat in Tenerife: finding the ideal venue',
    },
    titles: {
      fr: 'Retraite bien-être Tenerife : lieu privatif unique | Cueva Thalía',
      es: 'Retiro bienestar Tenerife: lugar privado único | Cueva Thalía',
      en: 'Wellness retreat Tenerife: unique private venue | Cueva Thalía',
    },
    descriptions: {
      fr: 'Yoga, breathwork, sonothérapie à Tenerife dans un espace 100% privatif. Cueva Thalía, grotte volcanique, piscine intérieure, silence de la roche.',
      es: 'Yoga, breathwork, sonoterapia en Tenerife en un espacio 100% privado. Cueva Thalía, cueva volcánica, piscina interior.',
      en: 'Yoga, breathwork, sound healing in Tenerife in a 100% private space. Cueva Thalía, volcanic cave, indoor pool.',
    },
    keywords: ['retraite yoga Tenerife', 'lieu bien-être privatif Tenerife', 'workshop Tenerife'],
  },
  {
    slug: 'week-end-romantique-tenerife',
    noindex: true,
    h1: {
      fr: 'Week-end romantique à Tenerife : les idées hors des sentiers battus',
      es: 'Escapada romántica en Tenerife: ideas fuera de lo común',
      en: 'Romantic weekend in Tenerife: off-the-beaten-path ideas',
    },
    titles: {
      fr: 'Week-end romantique Tenerife : grotte privée et piscine | Cueva Thalía',
      es: 'Escapada romántica Tenerife: cueva privada y piscina | Cueva Thalía',
      en: 'Romantic weekend Tenerife: private cave and pool | Cueva Thalía',
    },
    descriptions: {
      fr: 'Un week-end romantique unique à Tenerife : grotte volcanique, piscine intérieure chauffée, intimité absolue. Cueva Thalía, San Miguel de Abona.',
      es: 'Una escapada romántica única en Tenerife: cueva volcánica, piscina interior climatizada, intimidad absoluta.',
      en: 'A unique romantic weekend in Tenerife: volcanic cave, heated indoor pool, absolute intimacy.',
    },
    keywords: ['séjour romantique Tenerife', 'escapada romántica Tenerife', 'piscina privada Tenerife'],
  },
  {
    slug: 'plages-sud-tenerife',
    noindex: true,
    h1: {
      fr: 'Les plus belles plages du sud de Tenerife : notre sélection',
      es: 'Las mejores playas del sur de Tenerife: nuestra selección',
      en: 'The best beaches in south Tenerife: our selection',
    },
    titles: {
      fr: 'Plages du sud de Tenerife : guide et carte | Cueva Thalía',
      es: 'Playas del sur de Tenerife: guía | Cueva Thalía',
      en: 'South Tenerife beaches: guide | Cueva Thalía',
    },
    descriptions: {
      fr: 'El Médano, La Tejita, Playa del Duque, Los Cristianos, Las Américas : guide des meilleures plages du sud de Tenerife, toutes à moins de 25 min de Cueva Thalía.',
      es: 'El Médano, La Tejita, Playa del Duque, Los Cristianos, Las Américas: guía de las mejores playas del sur.',
      en: 'El Médano, La Tejita, Playa del Duque, Los Cristianos, Las Américas: guide to the best south Tenerife beaches.',
    },
  },
  {
    slug: 'evenement-prive-tenerife',
    noindex: true,
    h1: {
      fr: 'Organiser un événement privé ou un shooting à Tenerife',
      es: 'Organizar un evento privado o un shooting en Tenerife',
      en: 'Organising a private event or photo shoot in Tenerife',
    },
    titles: {
      fr: 'Événement privé ou shooting Tenerife : lieu atypique | Cueva Thalía',
      es: 'Evento privado o shooting Tenerife: lugar atípico | Cueva Thalía',
      en: 'Private event or shoot Tenerife: unique venue | Cueva Thalía',
    },
    descriptions: {
      fr: 'Privatisez une cueva volcanique pour votre événement ou shooting photo à Tenerife. Décor naturel unique, intimité totale. Cueva Thalía, San Miguel de Abona.',
      es: 'Privatice una cueva volcánica para su evento o shooting en Tenerife. Decorado natural único, intimidad total.',
      en: 'Hire a volcanic cave for your event or photo shoot in Tenerife. Unique natural setting, total privacy.',
    },
    keywords: ['lieu événement privé Tenerife', 'shooting photo Tenerife', 'privatisation Tenerife'],
  },
];

export function getGuideBySlug(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}
