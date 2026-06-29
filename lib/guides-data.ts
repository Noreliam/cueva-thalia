export type GuidePage = {
  slug: string;
  noindex: true;
  titles: { es: string; fr: string; en: string };
  descriptions: { es: string; fr: string; en: string };
  h1: { es: string; fr: string; en: string };
  keywords?: { es: string[]; fr: string[]; en: string[] };
};

export const guidePages: GuidePage[] = [
  {
    slug: 'sejour-insolite-tenerife',
    noindex: true,
    h1: {
      fr: 'Location Insolite à Tenerife : Cueva Thalía, une Grotte avec Piscine Intérieure Privée',
      es: 'Alquiler Vacacional Diferente en Tenerife: Cueva Thalía, una Cueva con Piscina Interior Privada',
      en: 'Unique Accommodation in Tenerife: Cueva Thalía, a Cave House with a Private Indoor Pool',
    },
    titles: {
      fr: 'Location insolite Tenerife : grotte avec piscine privée | Cueva Thalía',
      es: 'Alquiler vacacional diferente Tenerife: cueva con piscina | Cueva Thalía',
      en: 'Unique accommodation Tenerife: cave house with private pool | Cueva Thalía',
    },
    descriptions: {
      fr: 'Location insolite à Tenerife : grotte canarienne privée avec piscine intérieure chauffée. Idéal pour couples, familles, groupes et retraites bien-être au sud de l\'île.',
      es: 'Alojamiento original en Tenerife: cueva privada con piscina interior climatizada. Perfecto para parejas, familias, grupos y retiros de bienestar en el sur de la isla.',
      en: 'Unique accommodation in Tenerife: private cave house with heated indoor pool. Perfect for couples, families, groups and wellness retreats in the south of the island.',
    },
    keywords: {
      fr: [
        'location insolite Tenerife',
        'grotte Tenerife',
        'hébergement atypique Tenerife',
        'piscine privée Tenerife',
        'retraite bien-être Tenerife',
        'location groupe Tenerife',
      ],
      es: [
        'alojamiento original Tenerife',
        'alquiler vacacional Tenerife',
        'cueva en Tenerife',
        'piscina privada Tenerife',
        'retiro de yoga Tenerife',
        'alojamiento diferente Canarias',
      ],
      en: [
        'unique accommodation Tenerife',
        'cave house Tenerife',
        'holiday rental Tenerife',
        'private indoor pool Tenerife',
        'wellness retreat Tenerife',
        'unique stay Canary Islands',
      ],
    },
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
    keywords: {
      fr: ['retraite yoga Tenerife', 'lieu bien-être privatif Tenerife', 'workshop Tenerife'],
      es: ['retiro yoga Tenerife', 'lugar bienestar privado Tenerife', 'taller Tenerife'],
      en: ['yoga retreat Tenerife', 'private wellness venue Tenerife', 'workshop Tenerife'],
    },
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
    keywords: {
      fr: ['séjour romantique Tenerife', 'week-end en amoureux Tenerife', 'piscine privée Tenerife'],
      es: ['escapada romántica Tenerife', 'fin de semana romántico Tenerife', 'piscina privada Tenerife'],
      en: ['romantic getaway Tenerife', 'romantic weekend Tenerife', 'private pool Tenerife'],
    },
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
    keywords: {
      fr: ['lieu événement privé Tenerife', 'shooting photo Tenerife', 'privatisation Tenerife'],
      es: ['lugar evento privado Tenerife', 'sesión de fotos Tenerife', 'privatización Tenerife'],
      en: ['private event venue Tenerife', 'photo shoot Tenerife', 'venue hire Tenerife'],
    },
  },
];

export function getGuideBySlug(slug: string) {
  return guidePages.find((guide) => guide.slug === slug);
}
