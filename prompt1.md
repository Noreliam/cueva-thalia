══════════════════════════════════════════════════════════════
CUEVA THALÍA — BRIEF DÉVELOPPEMENT COMPLET V4
Site web premium multi-pages + dashboard privé
══════════════════════════════════════════════════════════════

───────────────────────────────────────────────────────────────
INSTRUCTION PRIORITAIRE — NE PAS CHANGER LE DESIGN VALIDÉ
───────────────────────────────────────────────────────────────
Le design actuel du site a été validé par Manon, propriétaire de Cueva Thalía.
Ce prompt doit donc optimiser le site existant, pas le refondre.

CONSERVER OBLIGATOIREMENT :
  - la direction artistique actuelle : bohème élégant, organique, premium chaleureux
  - la palette actuelle, les typographies, les formes organiques / arrondies
  - les grandes respirations, les cartes, les sections claires, les CTA terracotta
  - l'ambiance immersive, douce, méditerranéenne et sensorielle déjà présente
  - la structure visuelle générale validée sur cueva-thalia.com/fr

AUTORISÉ :
  - améliorer la hiérarchie visuelle sans changer le style
  - renforcer les textes, CTA, ancres, blocs de réassurance et conversion
  - ajouter des sections utiles si elles respectent exactement l'esthétique actuelle
  - prévoir des emplacements médias compatibles avec photos ET vidéos
  - améliorer SEO, UX, accessibilité, performance et mobile-first

INTERDIT :
  - changer le style graphique global
  - transformer le site en template moderne générique
  - remplacer l'ambiance actuelle par un autre univers
  - imposer des photos précises : Manon choisira les images et vidéos
  - écrire des instructions du type “mettre telle photo” ou “choisir telle image”

OBJECTIF PRIORITAIRE DE CETTE VERSION :
  1. Conversion : plus de réservations directes et plus de demandes qualifiées.
  2. Clarté : faire comprendre immédiatement que le lieu peut accueillir séjour, événement,
     workshop/retraite et couchages supplémentaires.
  3. SEO : renforcer les textes, Hn, meta et maillage interne sans alourdir l'esthétique.


───────────────────────────────────────────────────────────────
CONTEXTE
───────────────────────────────────────────────────────────────
Cueva Thalía est un hébergement insolite premium situé Calle Las Morales 70,
38620 San Miguel de Abona, Tenerife, Espagne.
C'est une vraie grotte volcanique aménagée avec piscine intérieure chauffée
et hydromassage privatif — entièrement privée à chaque réservation.
Aucun espace partagé avec d'autres clients. Un seul hébergement.
Lieu unique sur Tenerife. À 15 minutes de l'aéroport Tenerife Sud (TFS).

Contact : +34 657 077 910 (WhatsApp) · contact@cueva-thalia.com

Objectif principal : générer des réservations directes et réduire la
dépendance aux plateformes (Airbnb, Booking, VRBO).
Priorité absolue : plateforme de paiement opérationnelle dès le lancement.

Smoobu est le PMS utilisé — déjà actif, Airbnb et Booking synchronisés.

───────────────────────────────────────────────────────────────
STACK TECHNIQUE
───────────────────────────────────────────────────────────────
Identifie le stack technique du projet existant (WordPress, Webflow,
Astro, Next.js, HTML vanilla, etc.) et adapte toutes les implémentations
en conséquence. Si projet from scratch : utiliser Next.js (App Router)
pour les meilleures performances PageSpeed et le support natif i18n.

───────────────────────────────────────────────────────────────
LANGUES
───────────────────────────────────────────────────────────────
Langue principale : espagnol (ES)
Langues secondaires : français (FR) et anglais (EN)

Implémentation :
  "/" = version ES par défaut. Pas de redirection vers "/es/".
  Routes : /fr/ et /en/ existent en parallèle.
  <html lang="es"> sur ES, "fr" sur FR, "en" sur EN.

hreflang dans <head> de chaque page :
  <link rel="alternate" hreflang="es"        href="https://cueva-thalia.com/">
  <link rel="alternate" hreflang="fr"        href="https://cueva-thalia.com/fr/">
  <link rel="alternate" hreflang="en"        href="https://cueva-thalia.com/en/">
  <link rel="alternate" hreflang="x-default" href="https://cueva-thalia.com/">

Tous les textes ci-dessous sont en français. Traduire en ES (principal) et EN.

───────────────────────────────────────────────────────────────
DIRECTION ARTISTIQUE
───────────────────────────────────────────────────────────────
Style : bohème élégant, naturel, organique, luxe discret, premium chaleureux.
Ambiance lumineuse, intime, apaisante, sensorielle.

Références visuelles obligatoires : Six Senses Ibiza · Korakia · Tenuta di Murlo · Habitas

À ÉVITER ABSOLUMENT :
- Fonds noirs ou très sombres comme ton dominant
- Néons, lumières bleues en valeur principale
- Univers "nightclub" ou "spa urbain froid"
- Photos stock génériques, fake luxe, spirituel cliché
- Communication urgente ou agressive ("offre limitée", "dépêchez-vous")
- --color-turquoise en fond de section ou en bouton (accents piscine uniquement)

PALETTE — CSS custom properties :
  --color-sand:        #F2EDE4   /* fond principal */
  --color-dune:        #E8DDD0   /* fond sections alternées */
  --color-cream:       #FAF7F2   /* fond cartes, encadrés */
  --color-terracotta:  #C17F3A   /* couleur marque, CTA */
  --color-brown:       #6B4226   /* texte principal */
  --color-text-soft:   #6B5744   /* texte secondaire */
  --color-turquoise:   #4ECDC4   /* accents piscine uniquement */
  --color-green:       #7A9E7E   /* accents nature */
  --color-white:       #FFFFFF
  --color-dark-accent: #1C1C1C   /* overlays ponctuels uniquement */

TYPOGRAPHIES :
  Display (H1, H2)     : Cormorant Garamond — Google Fonts — weight 400 & 600
  Corps de texte       : Libre Baskerville — Google Fonts — weight 400
  UI (nav, labels, btn): Nunito — Google Fonts — weight 300 & 500
  font-display: swap · preconnect fonts.googleapis.com + fonts.gstatic.com

MICRO-DÉTAILS PREMIUM (obligatoires) :
  - line-height corps de texte : 1.75 minimum
  - letter-spacing H1/H2 display : -0.02em
  - letter-spacing nav et labels : +0.08em
  - Espacement entre sections : 120px desktop / 80px mobile
  - Séparateurs : 1px --color-dune, jamais de box-shadow lourde
  - Boutons : border-radius 3px maximum
  - Largeur maximale du contenu texte : 720px
  - Espace négatif généreux — le vide fait partie du design

ANIMATIONS :
  - Fade-in-up au scroll via Intersection Observer (CSS-first)
  - Transitions hover : opacity 300ms, transform 300ms, box-shadow
  - Pas de parallax ni d'effets lourds
  - Bouton WhatsApp flottant : position fixed, bottom-right, mobile ET desktop

───────────────────────────────────────────────────────────────
COMPOSANTS GLOBAUX (toutes pages publiques)
───────────────────────────────────────────────────────────────

NAVIGATION FIXE
  Logo "Cueva Thalía" en Cormorant Garamond — couleur --color-terracotta
  Liens nav : Séjourner | Événements | Workshops | Galerie | 🎁 Offrir | Contact
  CTA "Réserver" : bouton plein --color-terracotta, texte --color-cream
  Sur scroll : backdrop-filter blur(12px), fond --color-sand à 92% opacité
  Mobile < 768px : menu hamburger, overlay --color-sand
  Jamais de lien vers /dashboard dans la navigation

BOUTON WHATSAPP FLOTTANT
  Position : fixed, bottom 24px, right 24px, z-index 999
  Icône WhatsApp SVG officielle + label contextuel selon la page
  Lien : https://wa.me/+34657077910
  rel="noopener noreferrer" target="_blank"

FOOTER
  Logo + tagline de marque (voir section BRANDING ci-dessous)
  Liens : Séjourner · Événements · Workshops · Galerie · Offrir · Contact
           Mentions légales · Conditions générales · Politique de confidentialité
           Guides & inspirations → /guides/ (lien discret, libellé neutre)
  Contact : Calle Las Morales 70, San Miguel de Abona, Tenerife
            +34 657 077 910 · contact@cueva-thalia.com
  Réseaux sociaux SVG inline : Instagram · TikTok · Pinterest · Facebook · YouTube
    [URLs à renseigner par Manon — href="#" en attendant]
  Licence touristique n° [PLACEHOLDER]
  © 2025–2026 Cueva Thalía — San Miguel de Abona, Tenerife

BANNER COOKIES RGPD
  Au premier chargement · 3 options : Accepter tout / Refuser tout / Personnaliser
  GA4 et trackers tiers : chargement conditionné au consentement actif
  Consentement en localStorage · Lien vers /confidentialite
  Conforme Directive ePrivacy EU + RGPD

GOOGLE ANALYTICS 4
  gtag.js avec defer · conditionné au consentement
  <meta name="google-site-verification" content="[PLACEHOLDER — Manon]">

FAVICON
  favicon.ico + favicon.svg depuis le logo [à fournir par Manon]

PAGE 404
  Fond --color-sand, message sobre, lien retour accueil.
  ES : "Esta página no existe." · FR : "Cette page n'existe pas." · EN : "Page not found."

───────────────────────────────────────────────────────────────
MÉDIAS — INSTRUCTION GLOBALE
───────────────────────────────────────────────────────────────
Les médias seront choisis et fournis par Manon. Ne pas imposer de choix précis
de photos ou de vidéos. Prévoir uniquement des emplacements élégants, cohérents
avec le design validé, afin de pouvoir intégrer les médias sélectionnés ensuite.

Le site doit permettre au visiteur de comprendre en quelques secondes :
  1. qu'il peut y séjourner en couple, en famille ou jusqu'à 4 personnes en réservation directe
  2. qu'il peut y organiser un événement privé avec un groupe important
  3. qu'il peut y accueillir un workshop ou une retraite jusqu'à 12 participants selon le format
  4. qu'il existe une possibilité de loger jusqu'à 16 personnes avec matelas d'appoint supplémentaires
  5. que pour plus de 4 personnes, il faut contacter directement Cueva Thalía en privé

Sans avoir besoin de lire tout le texte.

Règles d'intégration médias :
  - conserver les formes organiques et le style visuel existant
  - prévoir des blocs compatibles photo OU vidéo
  - prévoir des carousels / sliders élégants lorsque plusieurs médias sont disponibles
  - prévoir des zones vidéo immersives, silencieuses par défaut, avec contrôles discrets
  - ne jamais charger automatiquement une vidéo lourde au-dessus de la ligne de flottaison
  - utiliser poster WebP, lazy loading et chargement différé des vidéos
  - chaque média doit avoir un alt descriptif ou aria-label si vidéo décorative

Placeholders à prévoir dans le code pour faciliter le remplacement ultérieur :
  <img src="placeholder-sejour.webp" data-category="sejour" alt="...">
  <img src="placeholder-evenement.webp" data-category="evenements" alt="...">
  <img src="placeholder-workshop.webp" data-category="workshops" alt="...">
  <img src="placeholder-couchages.webp" data-category="couchages" alt="...">
  <video data-category="video-ambiance" poster="placeholder-video-poster.webp" muted playsinline controls></video>

Important :
  Les textes doivent indiquer les usages et capacités.
  Les médias viendront ensuite renforcer la compréhension, mais le site doit rester clair même sans média définitif.

───────────────────────────────────────────────────────────────
BRANDING — POSITIONNEMENT VERBAL
───────────────────────────────────────────────────────────────
Le positionnement verbal de Cueva Thalía repose sur UN seul territoire :
  la roche + l'eau + le silence = l'expérience qu'aucun hôtel ne peut offrir.

Tagline principale (à utiliser dans le footer, l'OG image, les meta) :
  ES : "La cueva que estaba esperando."
  FR : "La grotte qui vous attendait."
  EN : "The cave that was waiting for you."

Tagline secondaire (badge hero, signatures) :
  ES : "Un único espacio · Privacidad total · Tenerife"
  FR : "Un seul lieu · Privé · Tenerife"
  EN : "One place · Entirely yours · Tenerife"

Territoire sémantique à activer dans tous les textes :
  Mots à utiliser : roche · silence · ancienne · eau chaude · privé · unique · rare
                    découverte · loin de tout · ici · vous · personne d'autre
  Mots à bannir   : exceptionnel · exclusif · luxueux · incroyable · parfait
                    hôtel · établissement · séjournez · prestataire

Ton éditorial :
  Phrases courtes. Respiration entre les idées.
  Jamais de superlatif commercial. Jamais de promesse vague.
  Écrire comme si on décrivait quelque chose qu'on a soi-même vécu.
  Tutoiement ou vouvoiement selon la langue :
    FR : vouvoiement · ES : tuteo ou usted selon le contexte · EN : "you"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 1 — ACCUEIL (/)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO :
  ES : <title>Cueva Thalía | Cueva Privada con Piscina Interior en Tenerife — San Miguel de Abona</title>
       <meta name="description" content="Cueva volcánica privada en Tenerife con piscina interior climatizada e hidromasaje. Un único alojamiento, total privacidad. San Miguel de Abona, a 15 min del aeropuerto TFS.">
  FR : <title>Cueva Thalía | Grotte Privée avec Piscine Intérieure à Tenerife — Hébergement Insolite</title>
       <meta name="description" content="Dormez dans une vraie grotte volcanique à Tenerife. Piscine intérieure privée chauffée, hydromassage, silence absolu. Un seul lieu. San Miguel de Abona, 15 min de l'aéroport Sud.">
  EN : <title>Cueva Thalía | Private Cave with Indoor Pool in Tenerife — Unique Cave Stay</title>
       <meta name="description" content="Sleep inside a real volcanic cave in Tenerife. Private heated indoor pool with hydrotherapy. Completely yours — no shared spaces. San Miguel de Abona, 15 min from TFS.">
  <link rel="canonical" href="https://cueva-thalia.com/">

SECTION 1 — HERO (100vh)
  Média hero fourni par Manon : image WebP ou vidéo courte optimisée.
  Si image : loading="eager" fetchpriority="high".
  Si vidéo : poster WebP preload, vidéo muted playsinline, chargement différé si possible.
  <link rel="preload" as="image" href="[hero-poster.webp — URL réelle]"> dans <head>
  Overlay gradient très léger (--color-sand → transparent, opacité max 25%)

  H1 :
    ES : "La cueva que el mundo no sabe que existe."
    FR : "La grotte que le monde ne sait pas qu'elle existe."
    EN : "The cave the world doesn't know exists."

  Sous-titre — à utiliser tel quel, ne pas réécrire :
    FR : "Une grotte volcanique privée à Tenerife. Une piscine intérieure chauffée à vous seul.
         Aucun autre client. Aucun espace partagé. Juste la roche, l'eau, et le silence."
    ES : "Una cueva volcánica privada en Tenerife. Una piscina interior climatizada solo para ti.
         Ningún otro huésped. Ningún espacio compartido. Solo la roca, el agua y el silencio."
    EN : "A private volcanic cave in Tenerife. A heated indoor pool, entirely yours.
         No other guests. No shared spaces. Just the rock, the water, and the silence."

  Bloc social proof sous le sous-titre (discret, petite typo) :
    ⭐⭐⭐⭐⭐ "Les photos ne lui rendent vraiment pas justice." — Emma
    [Note dev : afficher 1 avis en rotation, 3 secondes par avis, animation fade douce]

  CTA primaire :
    ES : "Ver disponibilidad" · FR : "Vérifier les disponibilités" · EN : "Check availability"
    → /sejourner — bouton --color-terracotta
  CTA secondaire (lien texte sous le bouton) :
    ES : "Desde 200 € / noche — Descubrir ↓"
    FR : "À partir de 200 € / nuit — Découvrir ↓"
    EN : "From €200 / night — Discover ↓"

  Badge coin bas-gauche (discret, fond --color-brown/80%, texte --color-cream) :
    ES : "Un único espacio · Privacidad total · Tenerife"
    FR : "Un seul lieu · Privé · Tenerife"
    EN : "One place · Entirely yours · Tenerife"

SECTION 2 — 3 PARCOURS (fond --color-sand)
  Titre H2 :
    ES : "¿Para qué vienes?" · FR : "Pourquoi venez-vous ?" · EN : "What brings you here?"
  [Note : ce titre est centré visiteur, pas centré offre]
  3 cartes cliquables, hover scale(1.02) + ombre douce.
  Chaque carte affiche un indicateur de capacité visuel (icône personnes + chiffre),
  positionné en bas de carte, typographie légère --color-text-soft.

    Carte 1 → /sejourner
      Titre : ES "Descansar" · FR "Se reposer" · EN "Rest"
      Texte :
        FR : "Escapade privée, romantique ou en famille.
        Jusqu'à 4 personnes en réservation directe."
        ES : "Escapada privada, romántica o en familia.
        Hasta 4 personas en reserva directa."
        EN : "Private escape, romantic or family.
        Up to 4 people, book directly online."
      Indicateur capacité : 👤 Jusqu'à 4 personnes

    Carte 2 → /evenements
      Titre : ES "Celebrar" · FR "Célébrer" · EN "Celebrate"
      Texte :
        FR : "Anniversaires, célébrations, shootings, petits mariages et privatisations.
        Possibilité de recevoir des groupes importants selon configuration.
        Devis personnalisé."
        ES : "Cumpleaños, celebraciones, shootings, bodas íntimas y privatizaciones.
        Posibilidad de recibir grupos grandes según configuración.
        Presupuesto personalizado."
        EN : "Birthdays, celebrations, photo shoots, small weddings and private hire.
        Possibility to welcome larger groups depending on the setup.
        Custom quote."
      Indicateur capacité : 👥 Grands groupes — sur demande
      [Note : si Manon valide une capacité maximale précise, l'afficher ici :
      “jusqu'à [X] personnes selon configuration”. Ne pas inventer le chiffre.]

    Carte 3 → /workshops-retraites
      Titre : ES "Reunirse" · FR "Se retrouver" · EN "Reconnect"
      Texte :
        FR : "Yoga, méditation, ateliers créatifs et événements bien-être.
        Jusqu'à 12 participants selon le format."
        ES : "Yoga, meditación, talleres creativos y eventos de bienestar.
        Hasta 12 participantes según el formato."
        EN : "Yoga, meditation, creative workshops and wellness events.
        Up to 12 participants depending on the format."
      Indicateur capacité : 👥 Jusqu'à 12 participants

SECTION 3 — L'HISTOIRE (fond --color-dune)
  Titre H2 :
    ES : "La cueva que nadie sabía que existía"
    FR : "La grotte que personne ne savait voir"
    EN : "The cave no one knew was there"
  Texte FR — à utiliser tel quel, ne pas réécrire :
    "Quand Manon a acheté cette propriété à San Miguel de Abona, elle ne savait pas
    ce qui l'attendait. La maison était là. Le jardin était là. Mais sous ses pieds,
    cachée depuis des millénaires dans la roche volcanique des Canaries, dormait
    quelque chose d'autre.
    Quatre ans et demi plus tard, elle l'a découverte. Par hasard.
    Une grotte naturelle, entière, intacte — comme un cadeau que la terre gardait en secret.
    Cette découverte inattendue est devenue Cueva Thalía."
  Layout : texte gauche, média droite fourni par Manon (desktop) · empilés mobile

SECTION 4 — 3 PROMESSES (fond --color-cream)
  3 colonnes, icône SVG inline + titre H3 + texte :
  [Note : chaque promesse nomme ce que ressent le visiteur, pas ce qu'offre le lieu]

  1. Titre : ES "La roca te rodea" · FR "La roche vous entoure" · EN "Rock all around"
     Texte FR : "Ici, la roche ne décore pas. Elle enveloppe. Elle isole.
     Elle fait taire tout ce qui ne mérite pas d'être entendu."

  2. Titre : ES "El agua es tuya" · FR "L'eau est à vous" · EN "The water is yours"
     Texte FR : "L'eau est chaude. Les jets travaillent. Autour de vous, la roche reste froide.
     Ce contraste n'existe nulle part ailleurs sur l'île."

  3. Titre : ES "Todo queda cerca" · FR "Tout reste proche" · EN "Everything stays close"
     Texte FR : "L'aéroport est à 15 minutes. La mer à 20. Le Teide à 45.
     Et vous, vous n'avez rien à faire — sinon rester."

SECTION 5 — PREUVE SOCIALE (fond --color-sand)
  Titre H2 :
    ES : "Lo que sintieron" · FR : "Ce qu'ils ont ressenti" · EN : "What they felt"

  Score global affiché en grand :
    ★★★★★  5 / 5  (4 avis vérifiés)
    [Note dev : afficher le score en typographie display, centré, avant les cartes]

  4 avis réels — ne rien modifier, ne rien inventer :
    Emma     ⭐⭐⭐⭐⭐
    "Les photos ne lui rendent vraiment pas justice… Je n'ai jamais été aussi détendue."

    Caroline ⭐⭐⭐⭐⭐
    "La grotte de Manon est magnifique, un endroit magique avec sa piscine incroyable."

    Jesper   ⭐⭐⭐⭐⭐
    "L'expérience la plus incroyable… la sensation d'être dans le spa chauffé avec
    un verre de vin blanc de Tenerife."

    Michal   ⭐⭐⭐⭐⭐
    "La grotte était unique, magnifiquement éclairée et avait une atmosphère incroyable."

  Sous les 4 avis, lien discret :
    ES : "Ver todos los comentarios en Airbnb →"
    FR : "Voir tous les avis sur Airbnb →"
    EN : "Read all reviews on Airbnb →"
    [href="#" en attendant l'URL Airbnb de Manon]

SECTION 6 — APERÇU GALERIE (fond --color-dune)
  Titre H2 :
    ES : "Dentro de la cueva" · FR : "Dans la grotte" · EN : "Inside the cave"
  6 emplacements médias en grille masonry (3×2), WebP ou poster vidéo, loading="lazy", width+height.
  Ne pas imposer les photos : Manon fournira les médias.
  Les catégories à représenter dans la grille doivent couvrir les 3 usages du lieu :
    séjour · événement · workshop/retraite · extérieurs · ambiance · couchages supplémentaires
  [Note : ces emplacements doivent aider à comprendre en quelques secondes que le lieu accueille
  séjours, événements, workshops ET configurations de groupe — pas seulement un hébergement pour 2 personnes]
  Lien centré sous la grille :
    ES : "Ver la galería completa →" · FR : "Voir toute la galerie →" · EN : "View full gallery →"
    → /galerie

SECTION 7 — CTA FINAL ACCUEIL (fond --color-terracotta)
  Titre H2 :
    ES : "¿Cuándo quieres venir?"
    FR : "Quand voulez-vous venir ?"
    EN : "When would you like to come?"
  [Note : ce titre demande une date, pas une décision — psychologie d'engagement micro]

  Sous-titre :
    ES : "Un único espacio. Solo se reserva una vez a la vez."
    FR : "Un seul espace. Il ne peut être réservé qu'une fois à la fois."
    EN : "One space. It can only be booked once at a time."

  CTA bouton : fond --color-brown, texte --color-cream
    → /sejourner
    ES : "Ver disponibilidad" · FR : "Voir les disponibilités" · EN : "Check availability"

  Texte secondaire (lien WhatsApp) :
    ES : "¿Prefieres escribirnos? → WhatsApp +34 657 077 910"
    FR : "Préférez-vous nous écrire ? → WhatsApp +34 657 077 910"
    EN : "Prefer to message us? → WhatsApp +34 657 077 910"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 2 — SÉJOURNER (/sejourner)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO :
  ES : <title>Reservar Cueva Thalía | Cueva Privada con Piscina Interior — Tenerife</title>
       <meta name="description" content="Reserva directamente tu estancia en Cueva Thalía, Tenerife. Cueva volcánica privada, piscina interior climatizada con hidromasaje. Desde 200€/noche. San Miguel de Abona.">
  FR : <title>Réserver Cueva Thalía | Grotte Privée, Piscine Intérieure — Tenerife</title>
       <meta name="description" content="Réservez votre séjour dans une grotte volcanique privée à Tenerife. Piscine intérieure chauffée, hydromassage privatif. À partir de 200€/nuit. San Miguel de Abona.">
  EN : <title>Book Cueva Thalía | Private Cave with Indoor Pool — Tenerife</title>
       <meta name="description" content="Book your stay at Cueva Thalía in Tenerife. Private volcanic cave with heated indoor pool and hydrotherapy. From €200/night. San Miguel de Abona.">

H1 :
  ES : "Vivir la cueva" · FR : "Vivre la grotte" · EN : "Live the cave"

[HERO PAGE]
  Média hero fourni par Manon, dans le style validé du site.
  Peut être une image ou une vidéo courte optimisée.
  H1 + sous-titre :
    FR : "Entrez dans la roche. Plongez dans l'eau chaude. Aucun autre client ne viendra."

[RÉCIT — 2 phrases de l'histoire, condensé]
  FR : "La cueva existait sous la propriété sans que personne le sache.
  Manon l'a découverte par hasard, 4 ans et demi après son installation.
  Depuis, elle l'ouvre à ceux qui cherchent quelque chose d'impossible à trouver ailleurs."

[CE QUI EST INCLUS — présenter comme un inventaire sobre, pas une liste marketing]
  Piscine intérieure chauffée · jets d'hydromassage · accès illimité · 100% privée
  1 chambre queen size · canapé-lit double (configuration standard : jusqu'à 4 personnes)
  Jardin privatif · espace barbecue · brasero
  WiFi fibre · parking privé
  Arrivée autonome par boîte à clé sécurisée

[CAPACITÉ — section dédiée, visuellement mise en avant]
  Titre :
    ES : "Capacidad" · FR : "Capacité" · EN : "Capacity"

  Deux configurations présentées côte à côte (cards ou tableau sobre) :

  Configuration standard :
    Jusqu'à 4 personnes
    1 chambre queen size + canapé-lit double
    Réservation directe en ligne

  Configuration groupe / événementielle :
    Jusqu'à 16 personnes en couchage
    Grâce aux matelas d'appoint supplémentaires
    Contact privé obligatoire avant réservation
    CTA direct : WhatsApp + e-mail

  Prévoir dans cette section un emplacement média dédié aux couchages supplémentaires.
  Si plusieurs médias sont fournis : créer un carousel ou une mini-galerie (2–4 médias)
  dans cette section uniquement, navigation par flèches ou swipe tactile.
  Ne pas choisir les photos : Manon fournira les médias.

[TARIFS — section claire, sobre]
  Titre :
    ES : "Precios" · FR : "Tarifs" · EN : "Pricing"

  Tarifs standard (configuration jusqu'à 4 personnes) :
    200 € / nuit — dimanche au jeudi
    250 € / nuit — vendredi, samedi, jours fériés
  Séjour minimum : 1 nuit
  Acompte 50% à la réservation · Solde à l'arrivée · Caution 150 €
  Check-in 16h00 · Check-out 13h00

  Mention tarifs progressifs (encadré sobre sous le tableau de prix) :
    FR : "Ces tarifs correspondent à la configuration standard (jusqu'à 4 personnes).
    Les séjours de plusieurs nuits peuvent bénéficier d'une tarification adaptée.
    Groupes, configurations spéciales ou événements : devis personnalisé sur demande."
    ES : "Estas tarifas corresponden a la configuración estándar (hasta 4 personas).
    Las estancias de varias noches pueden beneficiarse de una tarificación adaptada.
    Grupos, configuraciones especiales o eventos: presupuesto personalizado."
    EN : "These rates apply to the standard configuration (up to 4 people).
    Multi-night stays may benefit from adapted pricing.
    Groups, special configurations or events: personalised quote on request."

  Ajouter un tableau sobre “Conditions & tarifs” :
    Ligne 1 : Jusqu'à 4 personnes · réservation directe · tarifs affichés
    Ligne 2 : Plusieurs nuits · tarifs progressifs possibles · contacter pour proposition adaptée
    Ligne 3 : 5 à 16 personnes · couchages supplémentaires · contact privé obligatoire
    Ligne 4 : Événements / workshops · configuration sur mesure · devis personnalisé
    [Note : garder le tableau très élégant, dans le style actuel : lignes fines, fond clair,
    pas de tableau froid ou administratif.]

  CTA sous l'encadré :
    FR : "Vous avez un projet particulier ? Contactez-nous directement."
    ES : "¿Tienes un proyecto especial? Contáctanos directamente."
    EN : "Have a specific project? Get in touch directly."
    → Bouton WhatsApp https://wa.me/+34657077910 + lien email contact@cueva-thalia.com

[PRÉ-SÉLECTEUR NATIF + WIDGET SMOOBU]

  CONTRAINTE TECHNIQUE : le widget Smoobu est une iframe externe.
  Intercepter ses valeurs internes depuis JS est impossible (cross-origin).
  Implémenter ainsi :

  Étape 1 — Composant natif HTML/JS affiché AVANT le widget :
    Champ : Nombre de personnes (select 1–16) + bouton "Continuer"

  Étape 2 — Logique :
    Si ≤ 4 → charger et afficher le widget Smoobu (ne pas le charger avant)
    Si ≥ 5 → masquer la zone widget, afficher :
      FR : "Pour les groupes de 5 à 16 personnes, contactez-nous directement —
      la cueva peut accueillir jusqu'à 16 personnes avec les couchages supplémentaires."
      ES : "Para grupos de 5 a 16 personas, contáctanos directamente —
      la cueva puede acoger hasta 16 personas con colchonetas adicionales."
      EN : "For groups of 5 to 16 people, contact us directly —
      the cave can host up to 16 people with additional mattresses."
      → Bouton WhatsApp https://wa.me/+34657077910
      → Lien texte vers /evenements ou /workshops-retraites selon le contexte

  Synchronisation Smoobu bidirectionnelle :
    Site → Smoobu : bloque le calendrier (évite double réservation)
    Airbnb / Booking → bloque automatiquement les dates sur le site

  Fallback <noscript> : lien WhatsApp + contact@cueva-thalia.com

[AUTOUR DE LA CUEVA — fond --color-sand]
  Titre H3 :
    ES : "Todo está a menos de una hora" · FR : "Tout est à moins d'une heure"
    EN : "Everything within an hour"
  [Note : ce titre crée une image de facilité, pas une liste d'équipements]

  Liste visuelle icône + lieu + temps voiture :
    ✈️ Aéroport TFS         — 15 min
    🏖️ Playa El Médano      — 20 min
    🏄 Siam Park             — 20 min
    🌊 Los Cristianos        — 18 min
    🌊 Costa Adeje           — 22 min
    ⛳ Golf del Sur          — 12 min
    🏔️ Téide (départ route)  — 45 min
  Pas d'iframe Google Maps (image statique WebP cliquable si carte souhaitée)

[LES PETITES ATTENTIONS — ton sincère, jamais commercial]
  Titre :
    FR : "Pour rendre le moment plus mémorable encore"
  Options présentées sobrement :
    Décoration romantique sur mesure (à commander en avance)
    Champagne, fleurs ou pâtisserie à l'arrivée
    Séance bien-être : massage ou soin (prestataire partenaire, sur demande)
    Late check-out jusqu'à 16h · Early check-in à partir de 12h
    (selon disponibilité — contactez-nous)

[BON CADEAU]
  Encadré sobre, fond --color-cream :
    FR : "Vous voulez offrir cette expérience ?
    Les bons cadeaux sont disponibles à partir de 200 €."
    CTA : "Voir les bons cadeaux →" → /bon-cadeau

[AVIS CLIENTS]
  Mêmes 4 avis + score 5/5 (identique à l'accueil)

[FAQ — accordion <details>/<summary> natif HTML]
[Note : ordonner les questions du moins engageant au plus engageant — d'abord rassurer, puis informer sur les conditions]

Q : La piscine est-elle vraiment privée ?
  Oui, entièrement. Intérieure, chauffée en permanence, avec jets d'hydromassage.
  Elle vous appartient pour toute la durée de votre séjour.
  Aucun autre client n'y a accès.

Q : Comment se passe l'arrivée ?
  Arrivée entièrement autonome par boîte à clé sécurisée.
  Vous recevez les instructions après confirmation du paiement.
  Check-in à partir de 16h00.

Q : Combien de personnes peut accueillir la cueva ?
  Jusqu'à 4 personnes en réservation directe (chambre queen size + canapé-lit double).
  Pour 5 à 16 personnes, contactez-nous directement : des matelas d'appoint peuvent être ajoutés
  selon la configuration. Les événements et groupes font toujours l'objet d'une demande privée.

Q : Comment venir depuis l'aéroport ?
  L'aéroport Tenerife Sud (TFS) est à 15 minutes en voiture.
  Taxi, VTC ou voiture de location.

Q : Quelle est la politique d'annulation ?
  L'acompte de 50% est non remboursable si vous annulez définitivement.
  Un report de date reste possible si vous nous contactez plus de 15 jours avant l'arrivée.
  En deçà de 15 jours, l'acompte est conservé et une pénalité de 50% peut s'appliquer.

Q : Y a-t-il une caution ?
  Oui, 150€. Elle est restituée après votre départ, en l'absence de dommages.

Q : Check-out à quelle heure ?
  Check-out avant 13h00. Late check-out jusqu'à 16h sur demande (selon disponibilité).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 3 — ÉVÉNEMENTS PRIVÉS (/evenements)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO :
  ES : <title>Eventos Privados en Cueva Thalía | Cumpleaños, Bodas Íntimas, Tenerife</title>
       <meta name="description" content="Privatiza Cueva Thalía para tu evento: cumpleaños íntimo, boda pequeña, velada privada, shooting fotográfico. Un lugar único en Tenerife. Presupuesto personalizado en 48h.">
  FR : <title>Événements Privés à Cueva Thalía | Anniversaires, Petits Mariages, Tenerife</title>
       <meta name="description" content="Privatisez Cueva Thalía pour votre événement : anniversaire, mariage intimiste, shooting photo, soirée privée. Lieu unique à Tenerife. Devis personnalisé sous 48h.">
  EN : <title>Private Events at Cueva Thalía | Birthdays, Intimate Weddings, Tenerife</title>
       <meta name="description" content="Hire Cueva Thalía exclusively for your event: intimate birthday, small wedding, photo shoot, private dinner. Unique venue in Tenerife. Personalised quote within 48h.">

H1 :
  ES : "Su evento, en un lugar único"
  FR : "Votre événement, dans un lieu que personne n'a déjà vu"
  EN : "Your event, in a place no one has seen before"
  [Note : le FR et EN sont renforcés par rapport à la v3 — ils portent le différenciateur]

[HERO]
  Média hero fourni par Manon, image ou vidéo courte optimisée.
  H1 + sous-titre :
    FR : "Ils voulaient quelque chose de différent. La cueva a dit oui."

[POURQUOI ICI ET PAS AILLEURS]
  Texte court, ton sincère :
    FR : "Il existe des centaines de villas à Tenerife.
    Aucune n'est creusée dans la roche volcanique.
    Aucune n'a une piscine intérieure à la lumière de la grotte.
    Aucune ne peut garantir que vous serez les seuls.
    C'est pour ça que vos invités s'en souviendront."

[TYPES D'ÉVÉNEMENTS]
  Typographie aérée, pas de bullets :
  Anniversaires & célébrations · Petits mariages & unions intimistes
  Soirées privées & dîners · Shootings photo & vidéo
  Enterrements de vie de jeune fille · Privatisations sur mesure

[CAPACITÉ & CONFIGURATIONS — section dédiée, visuellement structurée]
  Titre :
    ES : "Capacidad y configuraciones" · FR : "Capacité & configurations"
    EN : "Capacity & configurations"

  Objectif de cette section :
    Faire comprendre immédiatement que Cueva Thalía peut recevoir plus qu'un séjour à 2 ou 4 personnes.
    Les visiteurs doivent percevoir qu'un vrai groupe peut être accueilli selon le format.

  Présenter en grille ou colonnes (4 exemples visuels) :

  Exemple 1 — Anniversaire ou célébration privée
    Format : soirée intimiste, journée, nuit entière ou privatisation sur mesure
    Capacité : groupes importants possibles selon configuration · devis sur demande
    [Si Manon valide une capacité maximale précise, afficher :
    “jusqu'à [X] personnes selon configuration”. Ne pas inventer le chiffre.
    Si Manon valide 100 personnes, afficher “jusqu'à 100 personnes selon configuration”.]
    Ambiance : grotte éclairée, piscine, musique, décoration sur mesure

  Exemple 2 — Shooting photo ou vidéo
    Format : quelques heures à la journée
    Capacité : équipe de tournage + personnes présentes selon projet
    Ambiance : décor volcanique unique, lumière naturelle, piscine

  Exemple 3 — Demande en mariage ou moment intime
    Format : quelques heures, privatisation totale
    Capacité : 2 personnes + prestataires éventuels
    Ambiance : déco romantique, champagne, surprise possible

  Exemple 4 — Événement avec couchage
    Format : événement + nuit sur place
    Capacité couchage : jusqu'à 16 personnes avec matelas d'appoint supplémentaires
    Contact privé obligatoire avant réservation

  Note sous les exemples :
    FR : "Les capacités varient selon le type d'événement et la configuration souhaitée.
    Les grands groupes sont étudiés sur demande.
    Possibilité de loger jusqu'à 16 personnes avec matelas d'appoint supplémentaires.
    Chaque projet est traité individuellement — contactez-nous par WhatsApp ou par e-mail."
    ES : "Las capacidades varían según el tipo de evento y la configuración deseada.
    Los grupos grandes se estudian bajo petición.
    Posibilidad de alojar hasta 16 personas con colchonetas adicionales."
    EN : "Capacity varies depending on the event type and configuration.
    Larger groups can be considered on request.
    Up to 16 people can sleep on site with additional mattresses."

[GALERIE ÉVÉNEMENTS]
  Grille médias WebP / vidéos courtes optimisées, loading="lazy", lightbox vanilla JS.
  Ne pas imposer les photos : Manon fournira les médias.
  Prévoir des placeholders balisés [MÉDIA ÉVÉNEMENT — à fournir par Manon].
  Minimum 4 emplacements médias dans cette galerie dédiée.
  [Note : cette galerie est distincte de la galerie principale /galerie]

[ENCADRÉ]
  FR : "Les événements ne se réservent pas en ligne.
  Chaque demande est étudiée individuellement.
  Écrivez-nous — nous vous répondons sous 48h."

[FORMULAIRE DE DEMANDE]
  Champs :
    Prénom · Nom · Email · Téléphone
    Type (select : Anniversaire / Mariage / Soirée / Shooting / EVJF / Autre)
    Date souhaitée (date picker)
    Nombre de personnes (placeholder : Ex. 12 / 30 / 60)
    Message (optionnel)
  Soumission :
    → Email via Resend/Nodemailer → contact@cueva-thalia.com
    → Insertion Supabase table `demandes` (type: "evenement")
    → Confirmation : FR "Votre demande est envoyée. Réponse sous 48h."
  NE PAS traiter comme une réservation confirmée.

[CTA WHATSAPP]
  FR : "Vous préférez en parler directement ?"
  Bouton → https://wa.me/+34657077910

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 4 — WORKSHOPS & RETRAITES (/workshops-retraites)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO :
  ES : <title>Talleres y Retiros en Cueva Thalía | Yoga, Bienestar, Tenerife</title>
       <meta name="description" content="Organiza tu retiro o taller en una cueva volcánica privada en Tenerife. Yoga, meditación, breathwork, sonoterapia, coaching, talleres creativos. Cueva Thalía, San Miguel de Abona.">
  FR : <title>Workshops & Retraites à Cueva Thalía | Yoga, Bien-être, Tenerife</title>
       <meta name="description" content="Organisez votre retraite ou atelier dans une grotte volcanique privée à Tenerife. Yoga, méditation, breathwork, sonothérapie, coaching, ateliers créatifs. San Miguel de Abona.">
  EN : <title>Workshops & Retreats at Cueva Thalía | Yoga, Wellness, Tenerife</title>
       <meta name="description" content="Host your retreat or workshop inside a private volcanic cave in Tenerife. Yoga, meditation, breathwork, sound healing, coaching, creative workshops. Cueva Thalía.">

H1 :
  ES : "Un espacio para encontrarse" · FR : "Un espace pour se retrouver" · EN : "A space to come back to yourself"

[HERO]
  Média hero fourni par Manon, image ou vidéo courte optimisée.
  H1 + sous-titre :
    FR : "Certains lieux ont été conçus pour ça.
    D'autres le sont naturellement."

[PHILOSOPHIE — à utiliser tel quel, ne pas réécrire]
  "La cueva n'a pas été conçue pour imiter un studio de yoga.
  Elle est simplement là, ancienne et silencieuse, et elle accueille
  avec la même générosité ceux qui viennent pour se reposer ou pour créer."

[CAPACITÉ D'ACCUEIL — section visuellement mise en avant]
  Présenter sous forme de carte ou bandeau sobre :
    FR : "Jusqu'à 12 participants selon la configuration choisie."
    ES : "Hasta 12 participantes según la configuración elegida."
    EN : "Up to 12 participants depending on the chosen format."
  Sous la capacité, liste des variables :
    Quelques heures · Une journée · Un week-end · Plusieurs jours
  [Note dev : présenter avec une icône de groupe + chiffre 12 bien visible,
  dans le même style que les indicateurs des cartes d'accueil]

  Prévoir un emplacement média dédié aux workshops/retraites.
  Ce média sera fourni par Manon. Si non disponible : placeholder [MÉDIA ATELIER — à fournir par Manon].
  L'objectif de cette zone est de faire comprendre que l'espace accueille des activités collectives,
  pas seulement un séjour à deux.

[FORMATS ACCUEILLIS]
  Yoga & méditation · Breathwork · Sonothérapie & bols tibétains
  Coaching individuel & collectif · Ateliers créatifs
  Soins bien-être & massages · Cercles de parole · Retraites de ressourcement

[GALERIE]
  Médias WebP / vidéos courtes optimisées, loading="lazy", lightbox.

[ENCADRÉ]
  "Les workshops et retraites ne se réservent pas en ligne.
  Partagez votre projet — nous l'étudions et vous répondons sous 48h."

[FORMULAIRE DE PROJET]
  Prénom · Nom · Email · Téléphone
  Type (select : Yoga / Méditation / Breathwork / Sonothérapie / Coaching / Créatif / Autre)
  Dates envisagées · Durée (select : quelques heures / 1 journée / plusieurs jours)
  Nombre de participants (placeholder : Ex. 12)
  Description du projet (textarea)
  Budget indicatif (optionnel)
  → Email Resend + Supabase `demandes` (type: "workshop")
  → Confirmation : "Merci. Nous lisons votre projet avec attention. Réponse sous 48h."

[CTA WHATSAPP] → https://wa.me/+34657077910

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 5 — GALERIE (/galerie)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEO :
  ES : <title>Galería Cueva Thalía — Cueva Privada con Piscina Interior, Tenerife</title>
       <meta name="description" content="Descubre Cueva Thalía en imágenes: la cueva volcánica, la piscina interior privada, el jardín exclusivo. San Miguel de Abona, Tenerife.">
  FR : <title>Galerie Cueva Thalía — Grotte Volcanique & Piscine Privée, Tenerife</title>
       <meta name="description" content="Découvrez Cueva Thalía en photos : la grotte volcanique, la piscine intérieure privée, le jardin, l'ambiance unique. San Miguel de Abona, Tenerife.">
  EN : <title>Gallery Cueva Thalía — Volcanic Cave & Private Indoor Pool, Tenerife</title>
       <meta name="description" content="See Cueva Thalía in images: the volcanic cave, the private indoor pool, the exclusive garden, the unique atmosphere. San Miguel de Abona, Tenerife.">

  Galerie immersive. Deux modes complémentaires :

  MODE 1 — GRILLE FILTRÉE (vue par défaut)
    Filtres cliquables en haut :
      Tout · Séjourner · Piscine · Événements · Workshops · Nuit & ambiance
      Couchages supplémentaires · Extérieurs
    [Note : "Couchages supplémentaires", "Événements" et "Workshops" sont des catégories
    nouvelles — elles montrent immédiatement les usages que le visiteur ne devine pas seul]
    Grille masonry 3 colonnes desktop · 1 colonne mobile
    Images WebP ou posters vidéo, loading="lazy", width + height, alt descriptif
    Légende courte dans le lightbox (storytelling sobre)

  MODE 2 — CAROUSEL PLEIN ÉCRAN (au clic sur une photo)
    Plein écran desktop et mobile
    Navigation : flèches gauche/droite + swipe tactile sur mobile
    Fermeture : croix ou touche Échap
    Légende affichée en bas de l'image
    Compteur discret : "3 / 24" (coin bas droit)

  Implémentation : vanilla JS uniquement, sans librairie externe.
  Les deux modes partagent le même script.

  Catégories médias attendues — Manon fournira les photos et vidéos :
    Séjourner · Piscine · Événements · Workshops · Couchages supplémentaires
    Nuit & ambiance · Extérieurs
    Si médias non disponibles : placeholders [MÉDIA — catégorie — à fournir par Manon]

  Minimum 20 médias · recommandé 30+
  Première vignette visible (filtre "Tout") : média choisi par Manon

  CTA bas de page :
    FR : "Vous voulez vivre ça ? → Voir les disponibilités" → /sejourner

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 6 — BON CADEAU (/bon-cadeau)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIORITÉ HAUTE — livrer en même temps que /sejourner.

SEO :
  ES : <title>Bono Regalo Cueva Thalía | Regalar una Noche en una Cueva Privada, Tenerife</title>
       <meta name="description" content="Regala una noche única en Cueva Thalía, Tenerife. Cueva volcánica privada con piscina interior. Bono entregado por email, válido 12 meses.">
  FR : <title>Bon Cadeau Cueva Thalía | Offrir une Nuit dans une Grotte Privée, Tenerife</title>
       <meta name="description" content="Offrez une nuit dans une grotte volcanique privée à Tenerife. Bon cadeau Cueva Thalía livré par email, valable 12 mois. L'expérience qu'on n'oublie pas.">
  EN : <title>Gift Voucher Cueva Thalía | Give a Night in a Private Cave, Tenerife</title>
       <meta name="description" content="Give a night in a private volcanic cave in Tenerife. Cueva Thalía gift voucher by email, valid 12 months. The experience they'll never forget.">

H1 :
  ES : "Regalar la cueva" · FR : "Offrir la grotte" · EN : "Give the cave"
  [Note : "offrir la grotte" est direct, concret, mémorable — pas "une expérience rare"]

Texte intro — à utiliser tel quel :
  FR : "Il y a des cadeaux qui s'oublient le lendemain.
  Et des cadeaux dont on parle encore dix ans après.
  Celui-là, c'est la deuxième catégorie."

Occasions (ton poétique sobre) :
  Anniversaire · Saint-Valentin · Demande en mariage
  Naissance · Départ en retraite · "Juste parce que"

Valeurs :
  200 € — 1 nuit dimanche–jeudi
  250 € — 1 nuit vendredi–dimanche
  Montant libre

Processus (4 étapes visuelles) :
  1. Choisissez le montant
  2. Payez en ligne
  3. Recevez le bon cadeau PDF par email (au nom du destinataire, design premium)
  4. Le destinataire réserve sa date sur cueva-thalia.com

PDF bon cadeau — généré server-side via pdf-lib :
  Design : fond --color-sand, logo Cueva Thalía, Cormorant Garamond,
  ligne décorative --color-terracotta.
  Champs : "Offert à [prénom]" · "Valeur [X]€"
  "Code [UUID auto]" · "Valable jusqu'au [date + 12 mois]"
  "Message : [texte acheteur]"
  UUID stocké en Supabase pour validation à la réservation.

Formulaire d'achat :
  Prénom & nom acheteur · Email acheteur
  Prénom destinataire · Message personnel (optionnel)
  Montant (radio : 200€ / 250€ / libre)
  → Paiement Stripe [après validation gestor]
  → Génération PDF + envoi email après paiement confirmé

Conditions :
  Valable 12 mois · Non remboursable · Non divisible · Usage unique
  Bon 200€ : valable dimanche–jeudi · Bon 250€ : tout jour

Note technique :
  Paiement et traitement fiscal IVA : valider avec gestor avant mise en production.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGES SEO DISCRÈTES (/guides/)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NE PAS appeler "blog". NE PAS mettre dans la navigation.
Footer uniquement : "Guides & inspirations"

Créer avec structure HTML complète + contenu PLACEHOLDER balisé [À RÉDIGER].
<meta name="robots" content="noindex"> sur chacune jusqu'à publication.

6 pages :

1. /guides/sejour-insolite-tenerife
   H1 : "Séjour insolite à Tenerife : passer une nuit dans une cueva privée"
   title FR : "Séjour insolite Tenerife : nuit dans une cueva volcanique privée | Cueva Thalía"
   title ES : "Alojamiento único Tenerife: dormir en cueva privada con piscina | Cueva Thalía"
   desc FR : "Dormez dans une vraie grotte volcanique à Tenerife. Cueva Thalía, piscine intérieure privée, silence absolu. L'hébergement insolite le plus unique du sud de l'île."
   Mots-clés : cueva privada Tenerife · hébergement insolite Tenerife · dormir dans une grotte Tenerife

2. /guides/que-faire-san-miguel-de-abona
   H1 : "Que faire à San Miguel de Abona et autour ?"
   title FR : "Que faire à San Miguel de Abona, Tenerife ? Guide complet | Cueva Thalía"
   desc FR : "Plages, Teide, Siam Park, El Médano, golf, villages... Tout ce qu'il y a à faire autour de San Miguel de Abona lors d'un séjour à Tenerife Sud."
   Contenu : plages · Siam Park · Teide · El Médano · Los Cristianos · Costa Adeje · Villaflor

3. /guides/retraite-bien-etre-tenerife
   H1 : "Organiser une retraite bien-être à Tenerife : trouver le lieu idéal"
   title FR : "Retraite bien-être Tenerife : lieu privatif unique | Cueva Thalía"
   desc FR : "Yoga, breathwork, sonothérapie à Tenerife dans un espace 100% privatif. Cueva Thalía, grotte volcanique, piscine intérieure, silence de la roche."
   Mots-clés : retraite yoga Tenerife · lieu bien-être privatif Tenerife · workshop Tenerife

4. /guides/week-end-romantique-tenerife
   H1 : "Week-end romantique à Tenerife : les idées hors des sentiers battus"
   title FR : "Week-end romantique Tenerife : grotte privée et piscine | Cueva Thalía"
   desc FR : "Un week-end romantique unique à Tenerife : grotte volcanique, piscine intérieure chauffée, intimité absolue. Cueva Thalía, San Miguel de Abona."
   Mots-clés : séjour romantique Tenerife · escapada romántica Tenerife · piscina privada Tenerife

5. /guides/plages-sud-tenerife
   H1 : "Les plus belles plages du sud de Tenerife : notre sélection"
   title FR : "Plages du sud de Tenerife : guide et carte | Cueva Thalía"
   desc FR : "El Médano, La Tejita, Playa del Duque, Los Cristianos, Las Américas : guide des meilleures plages du sud de Tenerife, toutes à moins de 25 min de Cueva Thalía."
   Contenu : El Médano · La Tejita · Playa de Las Américas · Los Cristianos · Playa del Duque

6. /guides/evenement-prive-tenerife
   H1 : "Organiser un événement privé ou un shooting à Tenerife"
   title FR : "Événement privé ou shooting Tenerife : lieu atypique | Cueva Thalía"
   desc FR : "Privatisez une cueva volcanique pour votre événement ou shooting photo à Tenerife. Décor naturel unique, intimité totale. Cueva Thalía, San Miguel de Abona."
   Mots-clés : lieu événement privé Tenerife · shooting photo Tenerife · privatisation Tenerife

Règles communes :
  title + meta description uniques (fournis ci-dessus)
  Images WebP, loading="lazy", alt descriptifs
  Encadré CTA en fin de page : "Vous cherchez où séjourner ?" → /sejourner
  Schema.org Article JSON-LD
  Liens internes vers ≥ 2 pages du site
  <meta name="robots" content="noindex"> jusqu'à publication

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGES LÉGALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3 pages : /mentions-legales · /conditions · /confidentialite

Conditions générales (/conditions) :
  Acompte 50% à la réservation · Non remboursable si annulation définitive
  Report si demande > 15j avant arrivée · Pénalité 50% si < 15j
  Check-in 16h00 · Check-out 13h00 · Late/early : selon dispo, supplément possible
  Caution 150€ (supérieure pour groupes ou événements)
  Séjour min 1 nuit · Capacité standard : 4 personnes · Capacité max : 16 personnes
  5+ personnes : contact obligatoire avant tout paiement (couchages supplémentaires)
  Événements et workshops : sur devis, aucune réservation automatique
  Piscine intérieure : usage aux risques des occupants
  Interdiction de fumer à l'intérieur
  Licence touristique n° [PLACEHOLDER]
  Aucune assurance incluse [à compléter avec le gestor]
  Contact : contact@cueva-thalia.com · +34 657 077 910

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DASHBOARD PRIVÉ (/dashboard)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Accès Manon uniquement. Hors navigation. Hors sitemap.
<meta name="robots" content="noindex, nofollow, noarchive">

Auth : cookie httpOnly + secure, signé serveur. Session 24h. Pas d'inscription.

Supabase table `demandes` :
  id · created_at · type · prenom · nom · email
  telephone · date_souhaitee · nb_personnes · message · statut · notes_manon

Architecture : route /dashboard, middleware auth, même projet.
Design : fond --color-cream, texte --color-brown. Fonctionnel, lisible, rapide.

MODULES :
  1 — ACCUEIL : demandes non traitées (badge), raccourcis, date/heure
  2 — RÉSERVATIONS : lien Smoobu (externe)
  3 — DEMANDES : tableau soumissions (statuts Nouveau/En cours/Traité), expand, notes
  4 — PAIEMENTS : suivi manuel acomptes/soldes V1 [V2 : webhook Stripe]
  5 — FACTURATION : lien outil gestor [PLACEHOLDER]
  6 — MÉDIAS : lien Google Drive [URL Manon]
  7 — DOCUMENTS : liens /conditions · FAQ · modèles WhatsApp · checklist arrivée
  8 — MARKETING : liens GA4 · GSC · calendrier éditorial · prompts IA · plateformes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEO TECHNIQUE — toutes pages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dans <head> de chaque page :
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>                   [unique — voir spécifications par page]
  <meta name="description"> [unique — voir spécifications par page]
  <meta property="og:title"       content="...">
  <meta property="og:description" content="...">
  <meta property="og:image"       content="[image WebP représentative]">
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="[URL canonique]">
  <meta name="twitter:card"       content="summary_large_image">
  <meta name="geo.region"         content="ES-TF">
  <link rel="canonical"           href="[URL canonique]">
  hreflang ES / FR / EN / x-default
  preconnect fonts.googleapis.com + fonts.gstatic.com
  <meta name="google-site-verification" content="[PLACEHOLDER Manon]">

Schema.org LodgingBusiness + LocalBusiness — avant </body> sur l'accueil :
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "LocalBusiness"],
  "name": "Cueva Thalía",
  "description": "Cueva volcánica privada con piscina interior climatizada e hidromasaje en Tenerife. Alojamiento único, privacidad total. San Miguel de Abona.",
  "url": "https://cueva-thalia.com",
  "telephone": "+34657077910",
  "email": "contact@cueva-thalia.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Las Morales, 70",
    "addressLocality": "San Miguel de Abona",
    "addressRegion": "Santa Cruz de Tenerife",
    "postalCode": "38620",
    "addressCountry": "ES"
  },
  "priceRange": "€€€",
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Piscina interior climatizada", "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Hidromasaje privado",          "value": true},
    {"@type": "LocationFeatureSpecification", "name": "WiFi gratuito",                "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Parking privado",              "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Jardín privado",               "value": true},
    {"@type": "LocationFeatureSpecification", "name": "Barbacoa",                     "value": true}
  ],
  "sameAs": ["https://www.google.com/maps/place/Calle+Las+Morales+70+San+Miguel+de+Abona"]
}
</script>

Schema.org Article — sur chaque page /guides/ :
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[H1]",
  "author":    {"@type": "Organization", "name": "Cueva Thalía"},
  "publisher": {"@type": "Organization", "name": "Cueva Thalía", "url": "https://cueva-thalia.com"},
  "url": "[URL canonique]",
  "mainEntityOfPage": "[URL canonique]"
}
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERFORMANCE PAGESPEED 100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Images :
  Toutes en WebP · width + height sur chaque <img>
  loading="lazy" sauf hero
  Hero : loading="eager" fetchpriority="high"
  <link rel="preload" as="image" href="[hero.webp — URL réelle]"> dans <head>
  Max 200KB par image

CSS :
  Critique above-the-fold : inline <style> dans <head>
  Reste non-bloquant : <link rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="style.css"></noscript>
  PurgeCSS · Pas de @import

JS :
  defer ou async sur tous les <script>
  Aucun JS inline bloquant dans <head>
  GA4 conditionné au consentement cookies
  Bundle < 150KB gzippé

Fonts : &display=swap dans toutes les URL Google Fonts

Maps : image statique WebP cliquable (rel="noopener noreferrer")

Serveur : HTTPS · Gzip/Brotli · Cloudflare · Cache-Control max-age=31536000

Core Web Vitals : LCP < 2.5s · CLS < 0.1 · INP < 100ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACCESSIBILITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  alt descriptif sur chaque <img>
  Contraste ≥ 4.5:1 (sable #F2EDE4 + brun #6B4226 ✓)
  Focus visible : outline 2px solid --color-terracotta
  Touch target min 48×48px mobile
  <html lang="es/fr/en"> selon route active
  ARIA : accordion · lightbox · hamburger · nav mobile

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOBILE FIRST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Breakpoints : 320 · 480 · 768 · 1024 · 1280px+
Nav hamburger < 768px · H1 hero 40px mobile
Colonnes : 1 mobile, 3 desktop (parcours, promesses, avis)
CTA min 48px hauteur, 100% largeur mobile
WhatsApp flottant toujours visible

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SITEMAP & ROBOTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sitemap.xml — 3 langues avec <xhtml:link> hreflang :
  / · /sejourner · /evenements · /workshops-retraites · /galerie
  /bon-cadeau · /fr/bon-cadeau · /en/gift-voucher
  /mentions-legales · /conditions · /confidentialite
  Exclure : /dashboard · /guides/*

robots.txt :
  User-agent: *
  Disallow: /dashboard
  Disallow: /admin
  Disallow: /guides/
  Allow: /
  Sitemap: https://cueva-thalia.com/sitemap.xml
  [Retirer /guides/ du Disallow après publication du contenu]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉSUMÉ LIVRABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1. Pages : / · /sejourner · /evenements · /workshops-retraites
    /galerie · /bon-cadeau · /guides/ (6 noindex) · légales · 404
 2. Dashboard /dashboard : 8 modules, auth cookie, Supabase `demandes`
 3. Smoobu : pré-sélecteur natif + widget conditionnel + sync bidi
 4. Bon cadeau : formulaire + PDF pdf-lib + paiement [après gestor]
 5. Formulaires → email Resend + Supabase
 6. Design bohème élégant, fond clair, micro-détails, branding verbal
 7. WhatsApp flottant permanent https://wa.me/+34657077910
 8. Banner cookies RGPD · GA4 conditionné
 9. PageSpeed 100 mobile + desktop
10. SEO : meta · OG · Twitter Card · Schema.org · hreflang · canonical
11. robots.txt + sitemap.xml complets
12. /dashboard : noindex + hors sitemap + auth

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POINTS EN ATTENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Avec Manon :
  URLs réseaux sociaux · Logo définitif · Clé Search Console
  Licence touristique · Capacité max événements/workshops
  Tarifs upsells · Passerelle paiement · IBAN
  URLs Google Drive (médias, docs, éditorial)

Avec le gestor avant mise en production :
  Stripe IVA · Bon cadeau traitement fiscal
  Conditions annulation droit espagnol · Assurance RC
  Facturation Hacienda · RGPD registre des traitements

══════════════════════════════════════════════════════════════
Cueva Thalía · cueva-thalia.com · Prompt Cursor v4 EXPERT · Juin 2026
══════════════════════════════════════════════════════════════
