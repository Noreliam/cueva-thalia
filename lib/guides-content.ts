export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  closingParagraphs?: string[];
};

export type GuideContent = {
  intro: string[];
  sections: GuideSection[];
  outro: string[];
};

export const guideContentBySlug: Record<
  string,
  { es: GuideContent; fr: GuideContent; en: GuideContent }
> = {
  'sejour-insolite-tenerife': {
    fr: {
      intro: [
        'Vous recherchez une location insolite à Tenerife pour vivre une expérience unique loin des hôtels traditionnels ? Bienvenue à Cueva Thalía, une magnifique grotte privée située dans le sud de Tenerife, conçue pour offrir un séjour inoubliable entre nature, confort et bien-être.',
        'Contrairement aux locations de vacances classiques, Cueva Thalía vous invite à dormir dans une authentique grotte canarienne rénovée avec soin. Sa température naturellement agréable tout au long de l\'année, son atmosphère apaisante et ses espaces privatifs en font un lieu idéal pour les couples, les familles, les groupes d\'amis et les retraites bien-être.',
      ],
      sections: [
        {
          heading: 'Pourquoi choisir Cueva Thalía ?',
          items: [
            'Grotte authentique à Tenerife',
            'Piscine intérieure privée chauffée',
            'Jardin privatif avec espace détente',
            'Cuisine entièrement équipée',
            'Deux salles de bains',
            'Wi-Fi haut débit',
            'Hébergement idéal pour familles et groupes',
            'Lieu parfait pour yoga, méditation et événements privés',
          ],
        },
      ],
      outro: [
        'Située à proximité des principales attractions du sud de Tenerife, Cueva Thalía permet de rejoindre facilement Los Cristianos, Costa Adeje, El Médano et l\'aéroport de Tenerife Sud.',
        'Si vous cherchez une location avec piscine privée à Tenerife, un hébergement atypique aux Canaries ou un lieu unique pour organiser une retraite bien-être, Cueva Thalía est l\'endroit idéal.',
        'Réservez dès maintenant votre séjour et découvrez l\'une des expériences les plus originales de Tenerife.',
      ],
    },
    es: {
      intro: [
        '¿Buscas un alojamiento original en Tenerife para disfrutar de unas vacaciones diferentes? Descubre Cueva Thalía, una espectacular cueva privada situada en el sur de Tenerife que combina naturaleza, tranquilidad y comodidad.',
        'Dormir en una cueva es una experiencia única que permite disfrutar de una temperatura agradable durante todo el año. Reformada y equipada con todas las comodidades modernas, Cueva Thalía es perfecta para parejas, familias, grupos de amigos y retiros de bienestar.',
      ],
      sections: [
        {
          heading: '¿Por qué elegir Cueva Thalía?',
          items: [
            'Cueva auténtica en Tenerife',
            'Piscina interior privada climatizada',
            'Jardín privado',
            'Cocina totalmente equipada',
            'Dos baños completos',
            'Wi-Fi de alta velocidad',
            'Ideal para familias y grupos',
            'Perfecta para yoga, meditación y eventos privados',
          ],
        },
      ],
      outro: [
        'Su excelente ubicación en el sur de Tenerife permite acceder fácilmente a Los Cristianos, Costa Adeje, El Médano y al Aeropuerto Tenerife Sur.',
        'Si buscas un alquiler vacacional diferente en Tenerife, una casa cueva con piscina privada o un espacio para organizar un retiro de yoga o bienestar, Cueva Thalía te ofrece una experiencia inolvidable.',
        'Reserva ahora y vive una de las estancias más especiales de Canarias.',
      ],
    },
    en: {
      intro: [
        'Looking for a unique place to stay in Tenerife? Welcome to Cueva Thalía, a beautiful private cave house located in the south of Tenerife, offering a one-of-a-kind experience that combines nature, comfort, privacy and wellbeing.',
        'Unlike traditional hotels or holiday rentals, Cueva Thalía allows you to stay in an authentic Canarian cave carefully renovated to provide modern comfort while preserving its natural charm.',
      ],
      sections: [
        {
          heading: 'Why Choose Cueva Thalía?',
          items: [
            'Authentic cave accommodation in Tenerife',
            'Private heated indoor pool',
            'Private garden and outdoor relaxation area',
            'Fully equipped kitchen',
            'Two bathrooms',
            'High-speed Wi-Fi',
            'Perfect for couples, families and groups',
            'Ideal for yoga retreats, wellness events and private gatherings',
          ],
        },
      ],
      outro: [
        'Located in the sunny south of Tenerife, Cueva Thalía is within easy reach of Los Cristianos, Costa Adeje, El Médano and Tenerife South Airport.',
        'Whether you are looking for a unique holiday rental in Tenerife, a private pool accommodation, or a special venue for a wellness retreat, Cueva Thalía offers an unforgettable stay in one of the Canary Islands\' most extraordinary settings.',
        'Book your stay today and discover a truly different side of Tenerife.',
      ],
    },
  },
  'que-faire-san-miguel-de-abona': {
    fr: {
      intro: [
        'Découvrez les meilleures activités autour de San Miguel de Abona.',
        'Situé dans le sud de Tenerife, San Miguel de Abona est un point de départ idéal pour découvrir les plus beaux paysages et attractions de l\'île. Entre plages volcaniques, villages authentiques, parcs aquatiques renommés et excursions dans la nature, cette région offre une multitude d\'activités adaptées aux familles, aux couples et aux groupes d\'amis.',
        'Que vous séjourniez quelques jours ou une semaine complète, vous trouverez toujours une nouvelle aventure à vivre à proximité.',
      ],
      sections: [
        {
          heading: 'Les plus belles plages à proximité',
          paragraphs: [
            'Le littoral du sud de Tenerife est réputé pour son climat ensoleillé tout au long de l\'année et ses plages adaptées à tous les goûts.',
            'Parmi les incontournables :',
          ],
          items: [
            'Playa de El Médano, paradis des amateurs de kitesurf et de windsurf',
            'Playa de Los Cristianos, idéale pour les familles',
            'Playa de Las Vistas, avec son sable doré et ses eaux calmes',
            'Playa del Duque à Costa Adeje, réputée pour son cadre élégant',
            'Les piscines naturelles et criques sauvages du sud de l\'île',
          ],
          closingParagraphs: [
            'Ces plages se trouvent généralement à moins de 30 minutes de San Miguel de Abona.',
          ],
        },
        {
          heading: 'Vivre une journée inoubliable au Siam Park',
          paragraphs: [
            'Classé parmi les meilleurs parcs aquatiques du monde, Siam Park est une attraction incontournable lors d\'un séjour à Tenerife.',
            'Vous y trouverez :',
          ],
          items: [
            'Des toboggans spectaculaires',
            'Une rivière tropicale',
            'Une immense piscine à vagues',
            'Des espaces dédiés aux enfants',
            'Des zones de détente inspirées de la Thaïlande',
          ],
          closingParagraphs: [
            'Le parc est facilement accessible depuis San Miguel de Abona et constitue une activité idéale pour toute la famille.',
          ],
        },
        {
          heading: 'Explorer le Parc National du Teide',
          paragraphs: [
            'Impossible de visiter Tenerife sans découvrir le majestueux Teide, le plus haut sommet d\'Espagne.',
            'Les visiteurs peuvent :',
          ],
          items: [
            'Emprunter le téléphérique',
            'Admirer des paysages volcaniques uniques',
            'Observer un coucher de soleil spectaculaire',
            'Participer à des excursions guidées',
            'Profiter d\'un des meilleurs sites d\'observation des étoiles en Europe',
          ],
          closingParagraphs: [
            'Le Parc National du Teide est classé au patrimoine mondial de l\'UNESCO et représente l\'une des excursions les plus impressionnantes de l\'île.',
          ],
        },
        {
          heading: 'Découvrir El Médano et son ambiance authentique',
          paragraphs: [
            'À quelques kilomètres seulement, El Médano séduit par son atmosphère détendue et son esprit local.',
            'Le village est réputé pour :',
          ],
          items: [
            'Ses plages naturelles',
            'Ses sports nautiques',
            'Ses cafés en bord de mer',
            'Ses marchés artisanaux',
            'Ses magnifiques promenades côtières',
          ],
          closingParagraphs: [
            'C\'est l\'endroit parfait pour ceux qui souhaitent découvrir un Tenerife plus authentique.',
          ],
        },
        {
          heading: 'Profiter de l\'animation de Los Cristianos',
          paragraphs: [
            'Ancien village de pêcheurs devenu station balnéaire populaire, Los Cristianos offre :',
          ],
          items: [
            'Une grande promenade maritime',
            'Des excursions en bateau pour observer les dauphins et les baleines',
            'De nombreux restaurants et commerces',
            'Des plages adaptées aux familles',
            'Un port permettant de rejoindre d\'autres îles des Canaries',
          ],
          closingParagraphs: [
            'Son ambiance conviviale en fait une destination appréciée des visiteurs de tous âges.',
          ],
        },
        {
          heading: 'Explorer Costa Adeje et ses attractions',
          paragraphs: [
            'Costa Adeje est l\'une des zones les plus animées du sud de Tenerife.',
            'Vous pourrez y profiter :',
          ],
          items: [
            'De plages de qualité',
            'De restaurants gastronomiques',
            'De centres commerciaux',
            'D\'activités nautiques',
            'D\'excursions en mer',
            'De parcs de loisirs pour toute la famille',
          ],
          closingParagraphs: [
            'Cette station balnéaire combine parfaitement détente, loisirs et vie nocturne.',
          ],
        },
        {
          heading: 'Faire une excursion à Vilaflor',
          paragraphs: [
            'Perché à plus de 1 400 mètres d\'altitude, Vilaflor est le village le plus élevé des Canaries.',
            'Son environnement naturel exceptionnel permet de :',
          ],
          items: [
            'Faire de la randonnée',
            'Découvrir les forêts de pins canariens',
            'Admirer des panoramas uniques',
            'Déguster des produits locaux',
            'Profiter d\'un climat plus frais durant l\'été',
          ],
          closingParagraphs: [
            'C\'est une étape idéale pour les amoureux de nature et de tranquillité.',
          ],
        },
        {
          heading: 'Pourquoi choisir San Miguel de Abona comme point de départ ?',
          paragraphs: [
            'San Miguel de Abona bénéficie d\'une situation privilégiée :',
          ],
          items: [
            'À proximité de l\'aéroport de Tenerife Sud',
            'Entre les plages et la montagne',
            'Proche des principales attractions touristiques',
            'Dans un environnement plus calme que les grandes stations balnéaires',
            'Avec un accès facile à toute l\'île',
          ],
          closingParagraphs: [
            'Cette localisation permet de découvrir Tenerife tout en profitant d\'un cadre authentique et reposant.',
          ],
        },
      ],
      outro: [
        'Que vous soyez passionné de nature, amateur de plages, adepte de sports nautiques ou à la recherche de détente, San Miguel de Abona constitue une excellente base pour explorer le sud de Tenerife.',
        'Réservez votre hébergement dès aujourd\'hui et profitez d\'un séjour inoubliable au cœur des plus belles attractions de l\'île.',
      ],
    },
    es: {
      intro: [
        'Descubre las mejores actividades en los alrededores de San Miguel de Abona.',
        'Enclavado en el sur de Tenerife, San Miguel de Abona es un punto de partida ideal para conocer los paisajes y las atracciones más bellas de la isla. Entre playas volcánicas, pueblos con encanto, parques acuáticos de fama mundial y rutas por la naturaleza, la zona ofrece planes para familias, parejas y grupos de amigos.',
        'Tanto si vienes un fin de semana como si te quedas toda la semana, siempre encontrarás algo nuevo que hacer cerca.',
      ],
      sections: [
        {
          heading: 'Las mejores playas cerca de San Miguel de Abona',
          paragraphs: [
            'La costa sur de Tenerife destaca por su clima soleado durante todo el año y por playas para todos los gustos.',
            'Entre las imprescindibles:',
          ],
          items: [
            'Playa de El Médano, paraíso del kitesurf y el windsurf',
            'Playa de Los Cristianos, perfecta para familias',
            'Playa de Las Vistas, con arena dorada y aguas tranquilas',
            'Playa del Duque, en Costa Adeje, conocida por su ambiente elegante',
            'Piscinas naturales y calas salvajes del sur de la isla',
          ],
          closingParagraphs: [
            'La mayoría de estas playas quedan a menos de 30 minutos de San Miguel de Abona.',
          ],
        },
        {
          heading: 'Un día inolvidable en Siam Park',
          paragraphs: [
            'Considerado uno de los mejores parques acuáticos del mundo, Siam Park es parada obligada en cualquier viaje a Tenerife.',
            'Allí encontrarás:',
          ],
          items: [
            'Toboganes espectaculares',
            'Un río tropical',
            'Una enorme piscina de olas',
            'Zonas infantiles',
            'Espacios de relax con ambientación tailandesa',
          ],
          closingParagraphs: [
            'El parque se llega fácilmente desde San Miguel de Abona y resulta perfecto para disfrutarlo en familia.',
          ],
        },
        {
          heading: 'Explorar el Parque Nacional del Teide',
          paragraphs: [
            'Visitar Tenerife sin subir al imponente Teide, el pico más alto de España, sería dejar la isla a medias.',
            'Desde el parque puedes:',
          ],
          items: [
            'Subir en teleférico',
            'Contemplar paisajes volcánicos únicos',
            'Ver una puesta de sol inolvidable',
            'Unirte a excursiones guiadas',
            'Disfrutar de uno de los mejores cielos para observar las estrellas de Europa',
          ],
          closingParagraphs: [
            'El Parque Nacional del Teide, Patrimonio de la Humanidad por la UNESCO, ofrece una de las excursiones más impresionantes de la isla.',
          ],
        },
        {
          heading: 'Conocer El Médano y su ambiente auténtico',
          paragraphs: [
            'A pocos kilómetros, El Médano conquista con su ritmo relajado y su carácter local.',
            'El pueblo es famoso por:',
          ],
          items: [
            'Sus playas naturales',
            'Los deportes acuáticos',
            'Sus cafés frente al mar',
            'Sus mercadillos artesanales',
            'Sus paseos marítimos con vistas espectaculares',
          ],
          closingParagraphs: [
            'Es el lugar ideal para quienes buscan un Tenerife más auténtico y menos masificado.',
          ],
        },
        {
          heading: 'La animada vida de Los Cristianos',
          paragraphs: [
            'Antiguo pueblo pesquero convertido en destino turístico, Los Cristianos ofrece:',
          ],
          items: [
            'Un amplio paseo marítimo',
            'Excursiones en barco para avistar delfines y ballenas',
            'Restaurantes y tiendas para todos los gustos',
            'Playas muy adecuadas para familias',
            'Un puerto con conexiones a otras islas Canarias',
          ],
          closingParagraphs: [
            'Su ambiente acogedor la convierte en un favorito entre visitantes de todas las edades.',
          ],
        },
        {
          heading: 'Descubrir Costa Adeje y sus atractivos',
          paragraphs: [
            'Costa Adeje concentra buena parte de la energía del sur de Tenerife.',
            'Allí podrás disfrutar de:',
          ],
          items: [
            'Playas de gran calidad',
            'Restaurantes de alto nivel',
            'Centros comerciales',
            'Actividades náuticas',
            'Excursiones marítimas',
            'Parques de ocio para toda la familia',
          ],
          closingParagraphs: [
            'Este destino combina a la perfección descanso, ocio y vida nocturna.',
          ],
        },
        {
          heading: 'Excursión a Vilaflor',
          paragraphs: [
            'A más de 1 400 metros de altitud, Vilaflor es el pueblo más elevado de Canarias.',
            'Su entorno natural invita a:',
          ],
          items: [
            'Practicar senderismo',
            'Recorrer bosques de pino canario',
            'Admirar panorámicas únicas',
            'Probar productos locales',
            'Refrescarte en verano gracias a su clima más suave',
          ],
          closingParagraphs: [
            'Una parada perfecta para quienes buscan naturaleza y tranquilidad.',
          ],
        },
        {
          heading: '¿Por qué elegir San Miguel de Abona como base?',
          paragraphs: [
            'San Miguel de Abona goza de una ubicación envidiable:',
          ],
          items: [
            'Cerca del Aeropuerto Tenerife Sur',
            'Entre playa y montaña',
            'A poca distancia de las principales atracciones',
            'En un entorno más tranquilo que las grandes zonas turísticas',
            'Con acceso cómodo a casi toda la isla',
          ],
          closingParagraphs: [
            'Así puedes explorar Tenerife sin renunciar a un marco auténtico y reposado.',
          ],
        },
      ],
      outro: [
        'Tanto si te apasiona la naturaleza, las playas, los deportes acuáticos o simplemente desconectar, San Miguel de Abona es una base excelente para recorrer el sur de Tenerife.',
        'Reserva tu alojamiento hoy mismo y vive unas vacaciones inolvidables en el corazón de las mejores atracciones de la isla.',
      ],
    },
    en: {
      intro: [
        'Discover the best things to do around San Miguel de Abona.',
        'Set in the south of Tenerife, San Miguel de Abona is an ideal base for exploring the island\'s finest landscapes and attractions. From volcanic beaches and authentic villages to world-famous water parks and outdoor adventures, the area has plenty to offer families, couples and groups of friends.',
        'Whether you stay for a long weekend or a full week, there is always something new to discover nearby.',
      ],
      sections: [
        {
          heading: 'The best beaches nearby',
          paragraphs: [
            'The south coast of Tenerife is known for year-round sunshine and beaches to suit every mood.',
            'Highlights include:',
          ],
          items: [
            'Playa de El Médano, a favourite with kitesurfers and windsurfers',
            'Playa de Los Cristianos, ideal for families',
            'Playa de Las Vistas, with golden sand and calm waters',
            'Playa del Duque in Costa Adeje, prized for its upscale setting',
            'Natural pools and hidden coves along the south coast',
          ],
          closingParagraphs: [
            'Most of these beaches are within 30 minutes of San Miguel de Abona.',
          ],
        },
        {
          heading: 'A day to remember at Siam Park',
          paragraphs: [
            'Ranked among the world\'s best water parks, Siam Park is a must on any Tenerife itinerary.',
            'Inside the park you will find:',
          ],
          items: [
            'Spectacular slides',
            'A tropical lazy river',
            'A huge wave pool',
            'Dedicated areas for children',
            'Thai-inspired relaxation zones',
          ],
          closingParagraphs: [
            'The park is easy to reach from San Miguel de Abona and makes a perfect family day out.',
          ],
        },
        {
          heading: 'Explore Teide National Park',
          paragraphs: [
            'No trip to Tenerife is complete without visiting Mount Teide, Spain\'s highest peak.',
            'Visitors can:',
          ],
          items: [
            'Ride the cable car',
            'Take in unique volcanic landscapes',
            'Watch a spectacular sunset',
            'Join guided excursions',
            'Enjoy some of Europe\'s best stargazing',
          ],
          closingParagraphs: [
            'A UNESCO World Heritage Site, Teide National Park offers one of the island\'s most unforgettable day trips.',
          ],
        },
        {
          heading: 'Discover El Médano and its local charm',
          paragraphs: [
            'Just a few kilometres away, El Médano wins visitors over with its laid-back atmosphere and strong local character.',
            'The village is known for:',
          ],
          items: [
            'Natural beaches',
            'Water sports',
            'Seaside cafés',
            'Artisan markets',
            'Beautiful coastal walks',
          ],
          closingParagraphs: [
            'It is the perfect place to experience a more authentic side of Tenerife.',
          ],
        },
        {
          heading: 'Enjoy the buzz of Los Cristianos',
          paragraphs: [
            'Once a fishing village and now a popular resort, Los Cristianos offers:',
          ],
          items: [
            'A long seafront promenade',
            'Boat trips to spot dolphins and whales',
            'Plenty of restaurants and shops',
            'Family-friendly beaches',
            'A ferry port with links to other Canary Islands',
          ],
          closingParagraphs: [
            'Its welcoming atmosphere makes it a favourite with visitors of all ages.',
          ],
        },
        {
          heading: 'Explore Costa Adeje and its attractions',
          paragraphs: [
            'Costa Adeje is one of the liveliest areas in south Tenerife.',
            'Here you can enjoy:',
          ],
          items: [
            'High-quality beaches',
            'Fine dining',
            'Shopping centres',
            'Water activities',
            'Boat excursions',
            'Family leisure parks',
          ],
          closingParagraphs: [
            'This resort area strikes a great balance between relaxation, entertainment and nightlife.',
          ],
        },
        {
          heading: 'Day trip to Vilaflor',
          paragraphs: [
            'Perched more than 1,400 metres above sea level, Vilaflor is the highest village in the Canary Islands.',
            'Its exceptional natural setting is perfect for:',
          ],
          items: [
            'Hiking',
            'Exploring Canarian pine forests',
            'Admiring sweeping views',
            'Tasting local produce',
            'Escaping the summer heat in cooler mountain air',
          ],
          closingParagraphs: [
            'An ideal stop for nature lovers seeking peace and quiet.',
          ],
        },
        {
          heading: 'Why choose San Miguel de Abona as your base?',
          paragraphs: [
            'San Miguel de Abona enjoys a prime location:',
          ],
          items: [
            'Close to Tenerife South Airport',
            'Between coast and mountains',
            'Near the island\'s main attractions',
            'Quieter than the big resort hubs',
            'Easy access to much of the island',
          ],
          closingParagraphs: [
            'It lets you explore Tenerife while staying somewhere authentic and restful.',
          ],
        },
      ],
      outro: [
        'Whether you love nature, beach days, water sports or simply switching off, San Miguel de Abona is an excellent base for exploring south Tenerife.',
        'Book your accommodation today and enjoy an unforgettable stay at the heart of the island\'s best attractions.',
      ],
    },
  },
  'retraite-bien-etre-tenerife': {
    fr: {
      intro: [
        'Organisez votre retraite bien-être dans une grotte privative à Tenerife.',
        'Vous recherchez un lieu unique pour organiser une retraite yoga, un workshop de développement personnel, une immersion breathwork ou un stage de sonothérapie à Tenerife ?',
        'La Cueva Thalía est un espace entièrement privatif situé à San Miguel de Abona, dans le sud de Tenerife. Creusée dans la roche volcanique et entourée d\'un jardin privé, cette grotte atypique offre un cadre intimiste et inspirant pour accueillir des groupes en quête de reconnexion, de calme et de transformation.',
        'Loin des hôtels impersonnels et des centres de retraite traditionnels, la Cueva Thalía permet de créer une expérience immersive où chaque participant peut ralentir, respirer et se reconnecter à l\'essentiel.',
      ],
      sections: [
        {
          heading: 'Une grotte volcanique unique pour vos retraites à Tenerife',
          paragraphs: [
            'La singularité de la Cueva Thalía réside dans son architecture naturelle. La roche volcanique crée une atmosphère enveloppante, silencieuse et propice à l\'introspection.',
            'Le lieu comprend :',
          ],
          items: [
            'Une salle polyvalente pour le yoga, les méditations et ateliers',
            'Une piscine intérieure chauffée avec hydromassage',
            'Un jardin privatif avec espaces de détente',
            'Une cuisine équipée',
            'Plusieurs espaces de vie favorisant les échanges et les cercles de groupe',
            'Un hébergement sur place pour les organisateurs et participants',
          ],
          closingParagraphs: [
            'Cette configuration permet d\'accueillir des retraites bien-être dans un environnement totalement privatif.',
          ],
        },
        {
          heading: 'Un lieu idéal pour le yoga, le breathwork et la sonothérapie',
          paragraphs: ['La Cueva Thalía accueille régulièrement :'],
          items: [
            'Retraites yoga',
            'Stages de méditation',
            'Ateliers de breathwork',
            'Bains sonores et sonothérapie',
            'Cercles de femmes',
            'Formations holistiques',
            'Workshops de développement personnel',
          ],
          closingParagraphs: [
            'L\'acoustique naturelle de la grotte se prête particulièrement bien aux pratiques sonores et méditatives, créant une expérience immersive difficile à reproduire dans un lieu classique.',
          ],
        },
        {
          heading: 'Pourquoi choisir la Cueva Thalía pour votre workshop ?',
          paragraphs: ['Les organisateurs apprécient particulièrement :'],
          items: [
            'L\'exclusivité du lieu',
            'L\'intimité du cadre',
            'L\'énergie apaisante de la roche volcanique',
            'La proximité de l\'aéroport de Tenerife Sud',
            'Les plages et espaces naturels accessibles en quelques minutes',
            'La possibilité de personnaliser entièrement l\'expérience proposée aux participants',
          ],
          closingParagraphs: [
            'Chaque retraite devient ainsi une expérience unique, adaptée aux besoins du groupe.',
          ],
        },
        {
          heading: 'Réservez votre retraite bien-être à Tenerife',
          paragraphs: [
            'Que vous organisiez une retraite yoga, un atelier de respiration consciente, une immersion thérapeutique ou un workshop bien-être, la Cueva Thalía vous offre un cadre exceptionnel pour accueillir votre événement.',
            'Contactez-nous pour découvrir les disponibilités et créer une expérience inoubliable au cœur d\'une véritable grotte volcanique à Tenerife.',
          ],
        },
      ],
      outro: [],
    },
    es: {
      intro: [
        'Organiza tu retiro de bienestar en una cueva privada en Tenerife.',
        '¿Buscas un espacio singular para un retiro de yoga, un taller de crecimiento personal, una inmersión de breathwork o un curso de sonoterapia en Tenerife?',
        'Cueva Thalía es un lugar totalmente privado en San Miguel de Abona, en el sur de Tenerife. Excavada en la roca volcánica y rodeada de un jardín privado, esta cueva atípica ofrece un entorno íntimo e inspirador para grupos que buscan reconexión, calma y transformación.',
        'Lejos de hoteles impersonales y de los centros de retiro convencionales, Cueva Thalía permite crear una experiencia inmersiva en la que cada participante puede bajar el ritmo, respirar y volver a lo esencial.',
      ],
      sections: [
        {
          heading: 'Una cueva volcánica única para tus retiros en Tenerife',
          paragraphs: [
            'Lo que hace especial a Cueva Thalía es su arquitectura natural. La roca volcánica genera una atmósfera envolvente, silenciosa y propicia para la introspección.',
            'El espacio incluye:',
          ],
          items: [
            'Una sala polivalente para yoga, meditación y talleres',
            'Una piscina interior climatizada con hidromasaje',
            'Un jardín privado con zonas de descanso',
            'Una cocina equipada',
            'Varios espacios comunes ideales para el intercambio y los círculos de grupo',
            'Alojamiento in situ para organizadores y participantes',
          ],
          closingParagraphs: [
            'Esta disposición permite acoger retiros de bienestar en un entorno completamente privado.',
          ],
        },
        {
          heading: 'El lugar perfecto para yoga, breathwork y sonoterapia',
          paragraphs: ['Cueva Thalía acoge con frecuencia:'],
          items: [
            'Retiros de yoga',
            'Inmersiones de meditación',
            'Talleres de breathwork',
            'Baños de gong y sonoterapia',
            'Círculos de mujeres',
            'Formaciones holísticas',
            'Workshops de desarrollo personal',
          ],
          closingParagraphs: [
            'La acústica natural de la cueva favorece especialmente las prácticas sonoras y meditativas, creando una experiencia inmersiva difícil de replicar en un espacio convencional.',
          ],
        },
        {
          heading: '¿Por qué elegir Cueva Thalía para tu taller?',
          paragraphs: ['Los organizadores valoran especialmente:'],
          items: [
            'La exclusividad del lugar',
            'La intimidad del entorno',
            'La energía serena de la roca volcánica',
            'La cercanía al Aeropuerto Tenerife Sur',
            'Playas y entornos naturales a pocos minutos',
            'La posibilidad de personalizar por completo la experiencia del grupo',
          ],
          closingParagraphs: [
            'Cada retiro se convierte así en una experiencia única, adaptada a las necesidades del grupo.',
          ],
        },
        {
          heading: 'Reserva tu retiro de bienestar en Tenerife',
          paragraphs: [
            'Tanto si organizas un retiro de yoga, un taller de respiración consciente, una inmersión terapéutica o un workshop de bienestar, Cueva Thalía te ofrece un marco excepcional para tu evento.',
            'Contáctanos para conocer la disponibilidad y crear una experiencia inolvidable en el corazón de una auténtica cueva volcánica en Tenerife.',
          ],
        },
      ],
      outro: [],
    },
    en: {
      intro: [
        'Host your wellness retreat in a private cave in Tenerife.',
        'Looking for a one-of-a-kind venue for a yoga retreat, personal development workshop, breathwork immersion or sound healing programme in Tenerife?',
        'Cueva Thalía is a fully private space in San Miguel de Abona, in the south of Tenerife. Carved into volcanic rock and surrounded by a private garden, this unusual cave offers an intimate, inspiring setting for groups seeking reconnection, calm and transformation.',
        'Far from impersonal hotels and conventional retreat centres, Cueva Thalía makes it possible to create an immersive experience where every participant can slow down, breathe and return to what matters.',
      ],
      sections: [
        {
          heading: 'A unique volcanic cave for your retreats in Tenerife',
          paragraphs: [
            'What sets Cueva Thalía apart is its natural architecture. The volcanic rock creates a cocooning, quiet atmosphere that naturally supports introspection.',
            'The venue includes:',
          ],
          items: [
            'A versatile room for yoga, meditation and workshops',
            'A heated indoor pool with hydro-massage',
            'A private garden with relaxation areas',
            'A fully equipped kitchen',
            'Several living spaces suited to group sharing and circles',
            'On-site accommodation for organisers and participants',
          ],
          closingParagraphs: [
            'This layout allows wellness retreats to take place in a completely private environment.',
          ],
        },
        {
          heading: 'An ideal setting for yoga, breathwork and sound healing',
          paragraphs: ['Cueva Thalía regularly hosts:'],
          items: [
            'Yoga retreats',
            'Meditation immersions',
            'Breathwork workshops',
            'Sound baths and sound therapy sessions',
            'Women\'s circles',
            'Holistic training programmes',
            'Personal development workshops',
          ],
          closingParagraphs: [
            'The cave\'s natural acoustics are especially well suited to sound and meditative practices, creating an immersive experience that is hard to replicate in a conventional venue.',
          ],
        },
        {
          heading: 'Why choose Cueva Thalía for your workshop?',
          paragraphs: ['Organisers particularly value:'],
          items: [
            'The exclusivity of the venue',
            'The intimacy of the setting',
            'The calming energy of the volcanic rock',
            'Proximity to Tenerife South Airport',
            'Beaches and natural spaces just minutes away',
            'The freedom to tailor the experience entirely to the group',
          ],
          closingParagraphs: [
            'Every retreat becomes a unique experience shaped to the group\'s needs.',
          ],
        },
        {
          heading: 'Book your wellness retreat in Tenerife',
          paragraphs: [
            'Whether you are planning a yoga retreat, conscious breathing workshop, therapeutic immersion or wellbeing event, Cueva Thalía offers an exceptional setting for your programme.',
            'Get in touch to check availability and create an unforgettable experience at the heart of a genuine volcanic cave in Tenerife.',
          ],
        },
      ],
      outro: [],
    },
  },
  'week-end-romantique-tenerife': {
    fr: {
      intro: [
        'Week-end romantique à Tenerife : une escapade hors du temps dans une grotte privée.',
        'Vous rêvez d\'un séjour romantique à Tenerife loin des hôtels bondés et des complexes touristiques impersonnels ? Offrez-vous une expérience unique dans un lieu entièrement privatisé, conçu pour se retrouver à deux et créer des souvenirs inoubliables.',
        'Nichée à San Miguel de Abona, dans le sud de Tenerife, la Cueva Thalía vous accueille dans une véritable grotte volcanique aménagée avec tout le confort nécessaire pour vivre un week-end romantique exceptionnel.',
      ],
      sections: [
        {
          heading: 'Une grotte privée pour une expérience unique en couple',
          paragraphs: [
            'Contrairement à un hébergement classique, la Cueva Thalía offre une atmosphère intimiste et chaleureuse où le temps semble s\'arrêter.',
            'Vous profitez d\'un espace entièrement privatif comprenant :',
          ],
          items: [
            'Une grotte volcanique authentique',
            'Une chambre confortable pour deux personnes',
            'Un salon cosy',
            'Une cuisine équipée',
            'Un jardin privé',
            'Une piscine intérieure chauffée avec hydromassage',
            'Une terrasse propice aux moments de détente',
          ],
          closingParagraphs: [
            'Ici, aucune foule, aucun voisin de chambre, seulement le calme et l\'intimité.',
          ],
        },
        {
          heading: 'Profitez d\'une piscine privée toute l\'année',
          paragraphs: [
            'L\'un des atouts les plus appréciés de la Cueva Thalía est sa piscine intérieure chauffée et privative.',
            'Quelle que soit la saison, vous pourrez :',
          ],
          items: [
            'Vous détendre dans une eau agréablement tempérée',
            'Profiter d\'un moment de relaxation en toute intimité',
            'Créer une ambiance romantique unique',
            'Vous ressourcer après une journée d\'exploration de l\'île',
          ],
          closingParagraphs: [
            'Cette piscine privée transforme chaque séjour en véritable parenthèse de bien-être.',
          ],
        },
        {
          heading: 'Les plus belles expériences à vivre en couple à Tenerife',
          paragraphs: [
            'Un week-end romantique à Tenerife ne se limite pas à l\'hébergement. L\'île regorge d\'activités à partager à deux.',
            'Parmi les incontournables :',
          ],
          items: [
            'Admirer le coucher de soleil depuis le Parc National du Teide',
            'Se promener sur les plages du sud de l\'île',
            'Dîner face à l\'océan dans un restaurant local',
            'Observer les dauphins et les baleines lors d\'une excursion en mer',
            'Découvrir les villages authentiques de Tenerife',
            'Profiter des paysages volcaniques spectaculaires',
          ],
          closingParagraphs: [
            'La situation privilégiée de San Miguel de Abona permet d\'accéder facilement à toutes ces activités.',
          ],
        },
        {
          heading: 'Une escapade idéale pour célébrer une occasion spéciale',
          paragraphs: ['La Cueva Thalía est le cadre parfait pour :'],
          items: [
            'Un anniversaire de rencontre',
            'Une demande en mariage',
            'Une lune de miel',
            'Un week-end surprise',
            'La Saint-Valentin',
            'Une pause romantique loin du quotidien',
          ],
          closingParagraphs: [
            'Son caractère atypique et exclusif en fait un lieu dont on se souvient longtemps.',
          ],
        },
        {
          heading: 'Pourquoi choisir la Cueva Thalía pour votre séjour romantique ?',
          paragraphs: ['Les couples apprécient particulièrement :'],
          items: [
            'L\'intimité totale du lieu',
            'La piscine intérieure privative',
            'Le charme unique de la grotte volcanique',
            'Le calme et la tranquillité',
            'La proximité de l\'aéroport de Tenerife Sud',
            'L\'accès rapide aux plus beaux sites de l\'île',
          ],
          closingParagraphs: [
            'C\'est l\'alternative idéale pour ceux qui recherchent un séjour romantique différent, authentique et mémorable.',
          ],
        },
        {
          heading: 'Réservez votre week-end romantique à Tenerife',
          paragraphs: [
            'Si vous recherchez une expérience unique pour vous retrouver à deux, la Cueva Thalía vous offre un cadre exceptionnel au cœur du sud de Tenerife.',
            'Contactez-nous dès aujourd\'hui pour connaître les disponibilités et organiser votre prochaine escapade romantique dans notre grotte privée avec piscine intérieure chauffée.',
          ],
        },
      ],
      outro: [],
    },
    es: {
      intro: [
        'Escapada romántica en Tenerife: un fin de semana fuera del tiempo en una cueva privada.',
        '¿Sueñas con una escapada romántica en Tenerife lejos de hoteles masificados y complejos turísticos impersonales? Regálate una experiencia única en un lugar totalmente privado, pensado para reconectar en pareja y crear recuerdos inolvidables.',
        'Enclavada en San Miguel de Abona, en el sur de Tenerife, Cueva Thalía te recibe en una auténtica cueva volcánica equipada con todo el confort para vivir un fin de semana romántico excepcional.',
      ],
      sections: [
        {
          heading: 'Una cueva privada para una experiencia única en pareja',
          paragraphs: [
            'A diferencia de un alojamiento convencional, Cueva Thalía ofrece una atmósfera íntima y acogedora en la que el tiempo parece detenerse.',
            'Disfrutarás de un espacio completamente privado que incluye:',
          ],
          items: [
            'Una cueva volcánica auténtica',
            'Un dormitorio confortable para dos',
            'Un salón acogedor',
            'Una cocina equipada',
            'Un jardín privado',
            'Una piscina interior climatizada con hidromasaje',
            'Una terraza ideal para momentos de relax',
          ],
          closingParagraphs: [
            'Aquí no hay multitudes ni vecinos de habitación: solo calma e intimidad.',
          ],
        },
        {
          heading: 'Disfruta de una piscina privada todo el año',
          paragraphs: [
            'Uno de los grandes atractivos de Cueva Thalía es su piscina interior climatizada y privada.',
            'Sea cual sea la estación, podrás:',
          ],
          items: [
            'Relajarte en agua a temperatura agradable',
            'Vivir un momento de descanso en total intimidad',
            'Crear un ambiente romántico único',
            'Recargar energías tras un día explorando la isla',
          ],
          closingParagraphs: [
            'Esta piscina privada convierte cada estancia en una auténtica pausa de bienestar.',
          ],
        },
        {
          heading: 'Las mejores experiencias en pareja en Tenerife',
          paragraphs: [
            'Una escapada romántica en Tenerife no se limita al alojamiento. La isla está llena de planes para compartir en pareja.',
            'Entre los imprescindibles:',
          ],
          items: [
            'Contemplar la puesta de sol desde el Parque Nacional del Teide',
            'Pasear por las playas del sur de la isla',
            'Cenar frente al océano en un restaurante local',
            'Avistar delfines y ballenas en una excursión en barco',
            'Descubrir pueblos auténticos de Tenerife',
            'Disfrutar de paisajes volcánicos espectaculares',
          ],
          closingParagraphs: [
            'La ubicación privilegiada de San Miguel de Abona facilita el acceso a todas estas actividades.',
          ],
        },
        {
          heading: 'La escapada perfecta para una ocasión especial',
          paragraphs: ['Cueva Thalía es el escenario ideal para:'],
          items: [
            'Un aniversario de pareja',
            'Una pedida de mano',
            'Una luna de miel',
            'Un fin de semana sorpresa',
            'San Valentín',
            'Una pausa romántica lejos del día a día',
          ],
          closingParagraphs: [
            'Su carácter atípico y exclusivo lo convierte en un lugar que se recuerda mucho tiempo.',
          ],
        },
        {
          heading: '¿Por qué elegir Cueva Thalía para tu escapada romántica?',
          paragraphs: ['Las parejas valoran especialmente:'],
          items: [
            'La intimidad total del lugar',
            'La piscina interior privada',
            'El encanto único de la cueva volcánica',
            'La calma y la tranquilidad',
            'La cercanía al Aeropuerto Tenerife Sur',
            'El acceso rápido a los mejores rincones de la isla',
          ],
          closingParagraphs: [
            'Es la alternativa ideal para quienes buscan una escapada romántica diferente, auténtica e inolvidable.',
          ],
        },
        {
          heading: 'Reserva tu escapada romántica en Tenerife',
          paragraphs: [
            'Si buscas una experiencia única para reconectar en pareja, Cueva Thalía te ofrece un marco excepcional en el corazón del sur de Tenerife.',
            'Contáctanos hoy mismo para conocer la disponibilidad y organizar tu próxima escapada romántica en nuestra cueva privada con piscina interior climatizada.',
          ],
        },
      ],
      outro: [],
    },
    en: {
      intro: [
        'Romantic weekend in Tenerife: a timeless escape in a private cave.',
        'Dreaming of a romantic getaway in Tenerife away from crowded hotels and impersonal resorts? Treat yourselves to a unique experience in a fully private setting designed for couples to reconnect and create lasting memories.',
        'Nestled in San Miguel de Abona, in the south of Tenerife, Cueva Thalía welcomes you to a genuine volcanic cave fitted with every comfort for an exceptional romantic weekend.',
      ],
      sections: [
        {
          heading: 'A private cave for a one-of-a-kind couples\' experience',
          paragraphs: [
            'Unlike a conventional stay, Cueva Thalía offers an intimate, warm atmosphere where time seems to stand still.',
            'You enjoy a fully private space that includes:',
          ],
          items: [
            'An authentic volcanic cave',
            'A comfortable bedroom for two',
            'A cosy living room',
            'A fully equipped kitchen',
            'A private garden',
            'A heated indoor pool with hydro-massage',
            'A terrace made for quiet moments together',
          ],
          closingParagraphs: [
            'No crowds, no neighbouring rooms — just calm and privacy.',
          ],
        },
        {
          heading: 'Enjoy a private pool all year round',
          paragraphs: [
            'One of Cueva Thalía\'s most cherished features is its private heated indoor pool.',
            'Whatever the season, you can:',
          ],
          items: [
            'Unwind in pleasantly warm water',
            'Relax in complete privacy',
            'Create a uniquely romantic atmosphere',
            'Recharge after a day exploring the island',
          ],
          closingParagraphs: [
            'This private pool turns every stay into a true wellbeing escape.',
          ],
        },
        {
          heading: 'The best couples\' experiences in Tenerife',
          paragraphs: [
            'A romantic weekend in Tenerife is about more than where you stay. The island is full of things to share as a couple.',
            'Highlights include:',
          ],
          items: [
            'Watching the sunset from Teide National Park',
            'Strolling along the beaches of the south coast',
            'Dining by the ocean at a local restaurant',
            'Spotting dolphins and whales on a boat trip',
            'Discovering Tenerife\'s authentic villages',
            'Taking in spectacular volcanic landscapes',
          ],
          closingParagraphs: [
            'San Miguel de Abona\'s prime location makes all of these easy to reach.',
          ],
        },
        {
          heading: 'The perfect escape for a special occasion',
          paragraphs: ['Cueva Thalía is the ideal setting for:'],
          items: [
            'An anniversary',
            'A marriage proposal',
            'A honeymoon',
            'A surprise weekend away',
            'Valentine\'s Day',
            'A romantic break from everyday life',
          ],
          closingParagraphs: [
            'Its unusual, exclusive character makes it a place you remember long after you leave.',
          ],
        },
        {
          heading: 'Why choose Cueva Thalía for your romantic stay?',
          paragraphs: ['Couples particularly appreciate:'],
          items: [
            'Total privacy',
            'The private indoor pool',
            'The unique charm of the volcanic cave',
            'Peace and quiet',
            'Proximity to Tenerife South Airport',
            'Quick access to the island\'s finest spots',
          ],
          closingParagraphs: [
            'It is the ideal alternative for anyone looking for a romantic stay that feels different, authentic and memorable.',
          ],
        },
        {
          heading: 'Book your romantic weekend in Tenerife',
          paragraphs: [
            'If you are looking for a unique experience to reconnect as a couple, Cueva Thalía offers an exceptional setting in the heart of south Tenerife.',
            'Contact us today to check availability and plan your next romantic escape in our private cave with heated indoor pool.',
          ],
        },
      ],
      outro: [],
    },
  },
  'plages-sud-tenerife': {
    fr: {
      intro: [
        'Les plus belles plages du sud de Tenerife à proximité de la Cueva Thalía.',
        'Le sud de Tenerife est réputé pour son climat ensoleillé toute l\'année, ses eaux cristallines et ses plages adaptées à tous les styles de vacances. En séjournant à la Cueva Thalía, située à San Miguel de Abona, vous profitez d\'un emplacement privilégié pour découvrir certaines des plus belles plages de l\'île en moins de 25 minutes.',
        'Que vous recherchiez une plage sauvage, un spot de sports nautiques ou une plage familiale avec tous les services, vous trouverez votre bonheur à proximité.',
      ],
      sections: [
        {
          heading: 'El Médano : l\'esprit authentique de Tenerife',
          paragraphs: [
            'Située à seulement quelques minutes de la Cueva Thalía, El Médano est l\'une des destinations les plus appréciées des habitants et des voyageurs en quête d\'authenticité.',
            'Cette plage est particulièrement connue pour :',
          ],
          items: [
            'Son immense étendue de sable naturel',
            'Ses conditions idéales pour le kitesurf et le windsurf',
            'Son ambiance détendue et locale',
            'Sa promenade bordée de cafés et restaurants',
            'Sa vue spectaculaire sur la Montaña Roja',
          ],
          closingParagraphs: [
            'El Médano est parfaite pour les amateurs de nature et de sports nautiques.',
          ],
        },
        {
          heading: 'La Tejita : une plage sauvage au pied de la Montaña Roja',
          paragraphs: ['Voisine d\'El Médano, La Tejita offre un cadre plus préservé et naturel.', 'Vous y apprécierez :'],
          items: [
            'Son immense plage de sable doré',
            'Ses grands espaces peu urbanisés',
            'Son environnement paisible',
            'Ses panoramas exceptionnels sur l\'océan Atlantique',
            'Son atmosphère idéale pour la détente',
          ],
          closingParagraphs: [
            'C\'est l\'une des plages les plus spectaculaires du sud de Tenerife.',
          ],
        },
        {
          heading: 'Playa de Las Américas : animation et loisirs',
          paragraphs: [
            'Pour ceux qui recherchent une ambiance plus dynamique, Playa de Las Américas est une référence incontournable.',
            'Cette station balnéaire propose :',
          ],
          items: [
            'Plusieurs plages aménagées',
            'Une grande promenade maritime',
            'De nombreux restaurants et commerces',
            'Des activités nautiques variées',
            'Une vie animée de jour comme de nuit',
          ],
          closingParagraphs: [
            'Elle constitue un excellent choix pour combiner plage et divertissement.',
          ],
        },
        {
          heading: 'Los Cristianos : une plage familiale par excellence',
          paragraphs: [
            'Ancien village de pêcheurs devenu l\'une des destinations les plus populaires du sud de Tenerife, Los Cristianos séduit par son atmosphère conviviale.',
            'Les visiteurs apprécient :',
          ],
          items: [
            'Ses eaux calmes adaptées aux enfants',
            'Son sable doré',
            'Son port animé',
            'Ses excursions en bateau pour observer dauphins et baleines',
            'Sa promenade bordée de restaurants',
          ],
          closingParagraphs: [
            'C\'est une plage idéale pour les familles et les couples souhaitant profiter d\'une journée relaxante au bord de l\'eau.',
          ],
        },
        {
          heading: 'Playa del Duque : élégance et confort',
          paragraphs: [
            'Située dans le secteur prestigieux de Costa Adeje, Playa del Duque est souvent considérée comme l\'une des plus belles plages de Tenerife.',
            'Elle se distingue par :',
          ],
          items: [
            'Son sable clair',
            'Ses eaux limpides',
            'Son environnement soigné',
            'Ses restaurants haut de gamme',
            'Son atmosphère élégante et raffinée',
          ],
          closingParagraphs: [
            'Pour une journée de détente dans un cadre exceptionnel, Playa del Duque est une valeur sûre.',
          ],
        },
        {
          heading: 'Pourquoi séjourner à la Cueva Thalía pour découvrir les plages du sud ?',
          paragraphs: [
            'La Cueva Thalía bénéficie d\'un emplacement stratégique permettant de rejoindre rapidement les principales plages du sud de Tenerife.',
            'Depuis votre hébergement, vous pourrez facilement alterner entre :',
          ],
          items: [
            'Les plages sauvages comme La Tejita',
            'Les villages côtiers authentiques comme El Médano',
            'Les stations animées de Las Américas',
            'Les plages familiales de Los Cristianos',
            'Les plages élégantes de Costa Adeje',
          ],
          closingParagraphs: [
            'Après vos journées au bord de l\'océan, retrouvez le calme et l\'intimité de votre grotte privée avec piscine intérieure chauffée.',
          ],
        },
        {
          heading: 'Réservez votre séjour près des plus belles plages de Tenerife',
          paragraphs: [
            'En choisissant la Cueva Thalía, vous profitez d\'un hébergement unique idéalement situé pour explorer les plus belles plages du sud de l\'île.',
            'Contactez-nous dès aujourd\'hui pour organiser votre séjour et découvrir Tenerife entre détente, nature et océan.',
          ],
        },
      ],
      outro: [],
    },
    es: {
      intro: [
        'Las mejores playas del sur de Tenerife cerca de Cueva Thalía.',
        'El sur de Tenerife es famoso por su clima soleado durante todo el año, sus aguas cristalinas y playas para todos los estilos de vacaciones. Al alojarte en Cueva Thalía, en San Miguel de Abona, disfrutas de una ubicación privilegiada para descubrir algunas de las playas más bonitas de la isla en menos de 25 minutos.',
        'Tanto si buscas una playa salvaje, un spot de deportes acuáticos o una playa familiar con todos los servicios, aquí encontrarás lo que necesitas.',
      ],
      sections: [
        {
          heading: 'El Médano: el espíritu auténtico de Tenerife',
          paragraphs: [
            'A pocos minutos de Cueva Thalía, El Médano es uno de los destinos favoritos de locales y viajeros que buscan autenticidad.',
            'Esta playa destaca especialmente por:',
          ],
          items: [
            'Su amplia extensión de arena natural',
            'Sus condiciones ideales para kitesurf y windsurf',
            'Su ambiente relajado y local',
            'Su paseo marítimo con cafés y restaurantes',
            'Sus vistas espectaculares a la Montaña Roja',
          ],
          closingParagraphs: [
            'El Médano es perfecta para amantes de la naturaleza y los deportes acuáticos.',
          ],
        },
        {
          heading: 'La Tejita: playa salvaje al pie de la Montaña Roja',
          paragraphs: [
            'Vecina de El Médano, La Tejita ofrece un entorno más preservado y natural.',
            'Allí apreciarás:',
          ],
          items: [
            'Su inmensa playa de arena dorada',
            'Sus amplios espacios poco urbanizados',
            'Su ambiente tranquilo',
            'Sus panorámicas excepcionales sobre el océano Atlántico',
            'Su atmósfera ideal para desconectar',
          ],
          closingParagraphs: [
            'Es una de las playas más espectaculares del sur de Tenerife.',
          ],
        },
        {
          heading: 'Playa de Las Américas: animación y ocio',
          paragraphs: [
            'Para quienes buscan un ambiente más dinámico, Playa de Las Américas es una referencia imprescindible.',
            'Esta zona turística ofrece:',
          ],
          items: [
            'Varias playas equipadas',
            'Un amplio paseo marítimo',
            'Numerosos restaurantes y tiendas',
            'Actividades náuticas variadas',
            'Vida animada de día y de noche',
          ],
          closingParagraphs: [
            'Una excelente opción para combinar playa y entretenimiento.',
          ],
        },
        {
          heading: 'Los Cristianos: la playa familiar por excelencia',
          paragraphs: [
            'Antiguo pueblo pesquero convertido en uno de los destinos más populares del sur, Los Cristianos seduce por su ambiente acogedor.',
            'Los visitantes valoran:',
          ],
          items: [
            'Sus aguas tranquilas, ideales para niños',
            'Su arena dorada',
            'Su puerto con mucha vida',
            'Excursiones en barco para avistar delfines y ballenas',
            'Su paseo marítimo con restaurantes',
          ],
          closingParagraphs: [
            'Una playa ideal para familias y parejas que buscan un día relajado junto al mar.',
          ],
        },
        {
          heading: 'Playa del Duque: elegancia y confort',
          paragraphs: [
            'En el prestigioso Costa Adeje, Playa del Duque suele considerarse una de las playas más bellas de Tenerife.',
            'Se distingue por:',
          ],
          items: [
            'Su arena clara',
            'Sus aguas transparentes',
            'Su entorno cuidado',
            'Sus restaurantes de alto nivel',
            'Su atmósfera elegante y refinada',
          ],
          closingParagraphs: [
            'Para un día de descanso en un marco excepcional, Playa del Duque es una apuesta segura.',
          ],
        },
        {
          heading: '¿Por qué alojarte en Cueva Thalía para descubrir las playas del sur?',
          paragraphs: [
            'Cueva Thalía goza de una ubicación estratégica que permite llegar rápidamente a las principales playas del sur de Tenerife.',
            'Desde tu alojamiento, podrás alternar fácilmente entre:',
          ],
          items: [
            'Playas salvajes como La Tejita',
            'Pueblos costeros auténticos como El Médano',
            'Zonas animadas como Las Américas',
            'Playas familiares como Los Cristianos',
            'Playas elegantes de Costa Adeje',
          ],
          closingParagraphs: [
            'Tras tus días junto al océano, vuelve a la calma e intimidad de tu cueva privada con piscina interior climatizada.',
          ],
        },
        {
          heading: 'Reserva tu estancia cerca de las mejores playas de Tenerife',
          paragraphs: [
            'Al elegir Cueva Thalía, disfrutas de un alojamiento único perfectamente situado para explorar las playas más bonitas del sur de la isla.',
            'Contáctanos hoy mismo para organizar tu estancia y descubrir Tenerife entre relax, naturaleza y océano.',
          ],
        },
      ],
      outro: [],
    },
    en: {
      intro: [
        'The best beaches in south Tenerife near Cueva Thalía.',
        'South Tenerife is famous for year-round sunshine, crystal-clear waters and beaches to suit every holiday style. Staying at Cueva Thalía in San Miguel de Abona puts you in a prime spot to reach some of the island\'s finest beaches in under 25 minutes.',
        'Whether you want a wild stretch of coast, a water-sports hotspot or a fully serviced family beach, you will find it close by.',
      ],
      sections: [
        {
          heading: 'El Médano: the authentic spirit of Tenerife',
          paragraphs: [
            'Just minutes from Cueva Thalía, El Médano is a favourite with locals and travellers looking for an authentic feel.',
            'This beach is especially known for:',
          ],
          items: [
            'Its vast stretch of natural sand',
            'Ideal conditions for kitesurfing and windsurfing',
            'A relaxed, local atmosphere',
            'A seafront promenade lined with cafés and restaurants',
            'Spectacular views of Montaña Roja',
          ],
          closingParagraphs: [
            'El Médano is perfect for nature lovers and water-sports enthusiasts.',
          ],
        },
        {
          heading: 'La Tejita: a wild beach at the foot of Montaña Roja',
          paragraphs: [
            'Next to El Médano, La Tejita offers a more unspoilt, natural setting.',
            'Here you will enjoy:',
          ],
          items: [
            'A huge golden-sand beach',
            'Wide open spaces with little development',
            'A peaceful environment',
            'Exceptional views over the Atlantic',
            'An atmosphere made for switching off',
          ],
          closingParagraphs: [
            'It is one of the most spectacular beaches in south Tenerife.',
          ],
        },
        {
          heading: 'Playa de Las Américas: buzz and entertainment',
          paragraphs: [
            'For a livelier vibe, Playa de Las Américas is an essential stop.',
            'This resort area offers:',
          ],
          items: [
            'Several well-equipped beaches',
            'A long seafront promenade',
            'Plenty of restaurants and shops',
            'A wide range of water activities',
            'A busy scene day and night',
          ],
          closingParagraphs: [
            'An excellent choice if you want to combine beach time with entertainment.',
          ],
        },
        {
          heading: 'Los Cristianos: the family beach par excellence',
          paragraphs: [
            'Once a fishing village and now one of the south\'s most popular destinations, Los Cristianos wins visitors over with its friendly atmosphere.',
            'People love:',
          ],
          items: [
            'Calm waters suited to children',
            'Golden sand',
            'A lively harbour',
            'Boat trips to spot dolphins and whales',
            'A restaurant-lined promenade',
          ],
          closingParagraphs: [
            'An ideal beach for families and couples looking for a relaxed day by the water.',
          ],
        },
        {
          heading: 'Playa del Duque: elegance and comfort',
          paragraphs: [
            'In prestigious Costa Adeje, Playa del Duque is often ranked among Tenerife\'s most beautiful beaches.',
            'It stands out for:',
          ],
          items: [
            'Light-coloured sand',
            'Clear, clean water',
            'A well-kept setting',
            'Upscale restaurants',
            'An elegant, refined atmosphere',
          ],
          closingParagraphs: [
            'For a day of relaxation in an exceptional setting, Playa del Duque is a safe bet.',
          ],
        },
        {
          heading: 'Why stay at Cueva Thalía to explore the south coast beaches?',
          paragraphs: [
            'Cueva Thalía enjoys a strategic location with quick access to the main beaches of south Tenerife.',
            'From your accommodation, you can easily mix:',
          ],
          items: [
            'Wild beaches like La Tejita',
            'Authentic coastal villages like El Médano',
            'Lively resorts like Las Américas',
            'Family beaches like Los Cristianos',
            'Upscale beaches in Costa Adeje',
          ],
          closingParagraphs: [
            'After your days by the ocean, return to the calm and privacy of your cave with heated indoor pool.',
          ],
        },
        {
          heading: 'Book your stay near Tenerife\'s best beaches',
          paragraphs: [
            'By choosing Cueva Thalía, you stay in a unique property perfectly placed to explore the south coast\'s finest beaches.',
            'Contact us today to plan your stay and discover Tenerife through relaxation, nature and the ocean.',
          ],
        },
      ],
      outro: [],
    },
  },
  'evenement-prive-tenerife': {
    fr: {
      intro: [
        'Événement privé et shooting photo à Tenerife : privatisez un lieu unique.',
        'Vous recherchez un lieu d\'exception pour organiser un événement privé, un shooting photo, un tournage ou une création de contenu à Tenerife ? La Cueva Thalía offre un cadre totalement atypique et privatif au cœur du sud de l\'île.',
        'Nichée dans une véritable grotte volcanique aménagée, la Cueva Thalía séduit les photographes, créateurs de contenu, marques, organisateurs d\'événements et productions audiovisuelles à la recherche d\'un décor original et mémorable.',
      ],
      sections: [
        {
          heading: 'Un lieu unique pour vos événements privés',
          paragraphs: [
            'Contrairement aux espaces de réception traditionnels, la Cueva Thalía propose une atmosphère intimiste et exclusive qui transforme chaque événement en expérience unique.',
            'Le lieu peut accueillir :',
          ],
          items: [
            'Événements privés',
            'Anniversaires',
            'Réunions familiales',
            'Demandes en mariage',
            'Petites célébrations',
            'Ateliers créatifs',
            'Rencontres professionnelles en petit comité',
          ],
          closingParagraphs: [
            'La privatisation complète garantit une totale liberté d\'organisation et une parfaite confidentialité.',
          ],
        },
        {
          heading: 'Un décor exceptionnel pour les shootings photo',
          paragraphs: [
            'Grâce à son architecture naturelle, ses volumes atypiques et son ambiance chaleureuse, la Cueva Thalía constitue un décor idéal pour les séances photo professionnelles.',
            'Le lieu est particulièrement adapté aux :',
          ],
          items: [
            'Shootings de marque',
            'Photographie lifestyle',
            'Séances mode',
            'Création de contenu pour réseaux sociaux',
            'Photos de couple',
            'Shooting grossesse',
            'Portraits artistiques',
            'Campagnes publicitaires',
          ],
          closingParagraphs: [
            'Chaque espace offre des perspectives originales impossibles à reproduire dans un studio classique.',
          ],
        },
        {
          heading: 'Un cadre idéal pour les tournages et créations de contenu',
          paragraphs: [
            'Les créateurs de contenu, vidéastes et équipes de production apprécient particulièrement la diversité des ambiances présentes sur place.',
            'La Cueva Thalía propose notamment :',
          ],
          items: [
            'Une véritable grotte volcanique aménagée',
            'Une piscine intérieure chauffée',
            'Un jardin privatif',
            'Des espaces de détente élégants',
            'Une lumière naturelle variée selon les zones',
            'Un environnement calme à l\'abri des nuisances',
          ],
          closingParagraphs: [
            'Ces éléments permettent de réaliser des contenus uniques sans nécessiter plusieurs lieux de tournage.',
          ],
        },
        {
          heading: 'Pourquoi choisir la Cueva Thalía pour une privatisation ?',
          paragraphs: ['Les professionnels et organisateurs choisissent régulièrement la Cueva Thalía pour :'],
          items: [
            'Son caractère totalement atypique',
            'Son exclusivité',
            'Son intimité',
            'Son accessibilité depuis l\'aéroport Tenerife Sud',
            'Son environnement calme',
            'Sa polyvalence pour différents types d\'événements',
          ],
          closingParagraphs: [
            'Le lieu offre une véritable expérience immersive qui marque durablement les participants et les clients.',
          ],
        },
        {
          heading: 'Une localisation idéale dans le sud de Tenerife',
          paragraphs: [
            'Située à San Miguel de Abona, la Cueva Thalía bénéficie d\'un emplacement stratégique à proximité :',
          ],
          items: [
            'D\'El Médano',
            'De La Tejita',
            'De Los Cristianos',
            'De Playa de Las Américas',
            'De Costa Adeje',
            'De l\'aéroport Tenerife Sud',
          ],
          closingParagraphs: [
            'Cette situation facilite l\'organisation logistique des événements et des productions.',
          ],
        },
        {
          heading: 'Que comprend la privatisation ?',
          paragraphs: ['Selon le projet, la privatisation peut inclure :'],
          items: [
            'L\'accès exclusif à l\'ensemble du lieu',
            'La piscine intérieure chauffée',
            'Les espaces extérieurs',
            'Les espaces de réception',
            'Les zones de shooting',
            'Les équipements disponibles sur place',
          ],
          closingParagraphs: [
            'Chaque demande est étudiée individuellement afin d\'adapter la formule aux besoins spécifiques de l\'événement ou de la production.',
          ],
        },
        {
          heading: 'Réservez votre événement ou shooting à Tenerife',
          paragraphs: [
            'Que vous souhaitiez organiser un événement privé, réaliser un shooting photo professionnel ou tourner un contenu original, la Cueva Thalía vous offre un cadre exceptionnel au cœur d\'une authentique grotte volcanique.',
            'Contactez-nous pour obtenir un devis personnalisé et privatiser ce lieu unique pour votre prochain projet.',
          ],
        },
      ],
      outro: [],
    },
    es: {
      intro: [
        'Evento privado y sesión de fotos en Tenerife: privatiza un lugar único.',
        '¿Buscas un espacio excepcional para organizar un evento privado, una sesión de fotos, un rodaje o la creación de contenido en Tenerife? Cueva Thalía ofrece un entorno totalmente atípico y privado en el corazón del sur de la isla.',
        'Enclavada en una auténtica cueva volcánica acondicionada, Cueva Thalía seduce a fotógrafos, creadores de contenido, marcas, organizadores de eventos y producciones audiovisuales que buscan un escenario original e inolvidable.',
      ],
      sections: [
        {
          heading: 'Un lugar único para tus eventos privados',
          paragraphs: [
            'A diferencia de los espacios de recepción convencionales, Cueva Thalía propone una atmósfera íntima y exclusiva que convierte cada evento en una experiencia singular.',
            'El lugar puede acoger:',
          ],
          items: [
            'Eventos privados',
            'Cumpleaños',
            'Reuniones familiares',
            'Pedidas de mano',
            'Pequeñas celebraciones',
            'Talleres creativos',
            'Encuentros profesionales en comité reducido',
          ],
          closingParagraphs: [
            'La privatización completa garantiza total libertad de organización y absoluta confidencialidad.',
          ],
        },
        {
          heading: 'Un escenario excepcional para sesiones de fotos',
          paragraphs: [
            'Gracias a su arquitectura natural, sus volúmenes singulares y su ambiente acogedor, Cueva Thalía es un decorado ideal para sesiones fotográficas profesionales.',
            'El espacio resulta especialmente adecuado para:',
          ],
          items: [
            'Shootings de marca',
            'Fotografía lifestyle',
            'Sesiones de moda',
            'Creación de contenido para redes sociales',
            'Fotos en pareja',
            'Sesiones de embarazo',
            'Retratos artísticos',
            'Campañas publicitarias',
          ],
          closingParagraphs: [
            'Cada zona ofrece perspectivas originales imposibles de reproducir en un estudio convencional.',
          ],
        },
        {
          heading: 'El marco perfecto para rodajes y creación de contenido',
          paragraphs: [
            'Creadores de contenido, videógrafos y equipos de producción valoran especialmente la diversidad de ambientes disponibles en el lugar.',
            'Cueva Thalía ofrece, entre otros:',
          ],
          items: [
            'Una auténtica cueva volcánica acondicionada',
            'Una piscina interior climatizada',
            'Un jardín privado',
            'Espacios de relax con estilo',
            'Luz natural variable según la zona',
            'Un entorno tranquilo, alejado de molestias',
          ],
          closingParagraphs: [
            'Estos elementos permiten crear contenidos únicos sin necesidad de varios escenarios de rodaje.',
          ],
        },
        {
          heading: '¿Por qué elegir Cueva Thalía para una privatización?',
          paragraphs: ['Profesionales y organizadores eligen con frecuencia Cueva Thalía por:'],
          items: [
            'Su carácter totalmente atípico',
            'Su exclusividad',
            'Su intimidad',
            'Su accesibilidad desde el Aeropuerto Tenerife Sur',
            'Su entorno tranquilo',
            'Su versatilidad para distintos tipos de eventos',
          ],
          closingParagraphs: [
            'El lugar ofrece una experiencia inmersiva que deja huella en participantes y clientes.',
          ],
        },
        {
          heading: 'Una ubicación ideal en el sur de Tenerife',
          paragraphs: [
            'Situada en San Miguel de Abona, Cueva Thalía goza de una ubicación estratégica cerca de:',
          ],
          items: [
            'El Médano',
            'La Tejita',
            'Los Cristianos',
            'Playa de Las Américas',
            'Costa Adeje',
            'El Aeropuerto Tenerife Sur',
          ],
          closingParagraphs: [
            'Esta situación facilita la logística de eventos y producciones.',
          ],
        },
        {
          heading: '¿Qué incluye la privatización?',
          paragraphs: ['Según el proyecto, la privatización puede incluir:'],
          items: [
            'Acceso exclusivo a todo el espacio',
            'La piscina interior climatizada',
            'Las zonas exteriores',
            'Los espacios de recepción',
            'Las áreas de shooting',
            'El equipamiento disponible in situ',
          ],
          closingParagraphs: [
            'Cada solicitud se estudia de forma individual para adaptar la fórmula a las necesidades concretas del evento o la producción.',
          ],
        },
        {
          heading: 'Reserva tu evento o sesión de fotos en Tenerife',
          paragraphs: [
            'Tanto si quieres organizar un evento privado, realizar una sesión fotográfica profesional o rodar contenido original, Cueva Thalía te ofrece un marco excepcional en el corazón de una auténtica cueva volcánica.',
            'Contáctanos para recibir un presupuesto personalizado y privatizar este lugar único para tu próximo proyecto.',
          ],
        },
      ],
      outro: [],
    },
    en: {
      intro: [
        'Private events and photo shoots in Tenerife: hire a one-of-a-kind venue.',
        'Looking for an exceptional setting for a private event, photo shoot, film production or content creation in Tenerife? Cueva Thalía offers a fully unusual, private space in the heart of the south of the island.',
        'Set within a genuine fitted volcanic cave, Cueva Thalía appeals to photographers, content creators, brands, event planners and audiovisual productions seeking an original, memorable backdrop.',
      ],
      sections: [
        {
          heading: 'A unique venue for private events',
          paragraphs: [
            'Unlike conventional reception spaces, Cueva Thalía offers an intimate, exclusive atmosphere that turns every event into a distinctive experience.',
            'The venue can host:',
          ],
          items: [
            'Private events',
            'Birthday celebrations',
            'Family gatherings',
            'Marriage proposals',
            'Small celebrations',
            'Creative workshops',
            'Professional meetings for small groups',
          ],
          closingParagraphs: [
            'Full venue hire guarantees complete freedom to organise your event and total privacy.',
          ],
        },
        {
          heading: 'An exceptional setting for photo shoots',
          paragraphs: [
            'With its natural architecture, unusual volumes and warm atmosphere, Cueva Thalía is an ideal backdrop for professional photography.',
            'The venue is especially suited to:',
          ],
          items: [
            'Brand shoots',
            'Lifestyle photography',
            'Fashion sessions',
            'Social media content creation',
            'Couple photography',
            'Maternity shoots',
            'Artistic portraits',
            'Advertising campaigns',
          ],
          closingParagraphs: [
            'Each area offers original perspectives that are impossible to recreate in a conventional studio.',
          ],
        },
        {
          heading: 'The perfect backdrop for filming and content creation',
          paragraphs: [
            'Content creators, videographers and production teams particularly value the variety of moods available on site.',
            'Cueva Thalía notably offers:',
          ],
          items: [
            'A genuine fitted volcanic cave',
            'A heated indoor pool',
            'A private garden',
            'Elegant relaxation areas',
            'Varied natural light across different zones',
            'A quiet environment free from disturbances',
          ],
          closingParagraphs: [
            'These features make it possible to produce unique content without needing multiple filming locations.',
          ],
        },
        {
          heading: 'Why choose Cueva Thalía for a private hire?',
          paragraphs: ['Professionals and organisers regularly choose Cueva Thalía for:'],
          items: [
            'Its truly unusual character',
            'Its exclusivity',
            'Its intimacy',
            'Easy access from Tenerife South Airport',
            'Its peaceful setting',
            'Its versatility for different types of events',
          ],
          closingParagraphs: [
            'The venue delivers a genuinely immersive experience that stays with participants and clients long afterwards.',
          ],
        },
        {
          heading: 'An ideal location in south Tenerife',
          paragraphs: [
            'Based in San Miguel de Abona, Cueva Thalía enjoys a strategic position close to:',
          ],
          items: [
            'El Médano',
            'La Tejita',
            'Los Cristianos',
            'Playa de Las Américas',
            'Costa Adeje',
            'Tenerife South Airport',
          ],
          closingParagraphs: [
            'This location makes logistics easier for events and productions.',
          ],
        },
        {
          heading: 'What does private hire include?',
          paragraphs: ['Depending on the project, private hire may include:'],
          items: [
            'Exclusive access to the entire venue',
            'The heated indoor pool',
            'Outdoor areas',
            'Reception spaces',
            'Shoot locations',
            'On-site equipment where available',
          ],
          closingParagraphs: [
            'Every enquiry is reviewed individually so the package can be tailored to the specific needs of your event or production.',
          ],
        },
        {
          heading: 'Book your event or photo shoot in Tenerife',
          paragraphs: [
            'Whether you are planning a private event, a professional photo shoot or original filmed content, Cueva Thalía offers an exceptional setting at the heart of an authentic volcanic cave.',
            'Contact us for a personalised quote and to hire this unique venue for your next project.',
          ],
        },
      ],
      outro: [],
    },
  },
};

export function getGuideContent(slug: string) {
  return guideContentBySlug[slug];
}
