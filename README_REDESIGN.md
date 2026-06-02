# Cueva Thalía - Visual Redesign

Ce document retrace les choix de design, l'architecture des composants et les tâches d'intégration restantes suite à la refonte visuelle complète de la plateforme publique.

## 1. Choix de Design & Atmosphère

L'objectif principal de cette refonte était de traduire l'expérience sensorielle de Cueva Thalía à travers l'interface. 
Le site s'appuie désormais sur :
- **Matière et Profondeur** : Utilisation d'un overlay de grain global (`GrainOverlay.tsx`) et d'ombres chaudes (`--shadow-warm`) pour évoquer la rugosité et la profondeur de la roche.
- **Formes Organiques** : Les images principales et cartes utilisent des `border-radius` asymétriques (`OrganicImage.tsx`) pour s'éloigner de l'aspect « SaaS » ou template rigide.
- **Palette stricte** : Aucun noir pur ou gris froid n'a été conservé. Tout s'articule autour des teintes Sable, Dune, Blanc Cassé, Brun Chaud et Terracotta.
- **Typographie généreuse** : Le H1 et les titres de section en Cormorant Garamond profitent de grandes tailles et d'italiques pour accentuer la voix éditoriale.
- **Animations subtiles** : Les apparitions se font uniquement via des `fade-in` et translations verticales légères (`framer-motion`), assurant une fluidité sans agresser l'œil.

## 2. Nouveaux Composants UI

- `Button.tsx` : Boutons primaires (Terracotta), secondaires (Outline Brun) et tertiaires (Lien souligné).
- `Card.tsx` : Conteneur avec ombres chaudes et hover subtil (scale + approfondissement de l'ombre).
- `OrganicImage.tsx` : Wrapper d'image appliquant les `border-radius` irréguliers.
- `SectionDivider.tsx` : Séparateur SVG organique pour la transition douce entre les blocs.
- `GrainOverlay.tsx` : Bruit fractal SVG appliqué en `mix-blend-multiply` sur toute l'app.

## 3. Sections Créées (Homepage)

- `HeroImmersive.tsx` : 100vh, image/vidéo pleine page, typographie XXL.
- `EditorialIntro.tsx` : 2 colonnes avec lettrine, promesse sensorielle.
- `ThreeWays.tsx` : 3 cartes organiques pour Séjourner / Célébrer / Se retrouver.
- `IndoorPool.tsx` : Layout asymétrique mettant en valeur l'eau chaude.
- `GalleryMasonry.tsx` : Grille destructurée pour les photos.
- `Reviews.tsx` : Témoignages en typo éditoriale et étoiles line-art.
- `Location.tsx` : Bloc texte + placeholder carte Mapbox.
- `BookingCTA.tsx` : CTA final sur image floutée/backdrop.

## 4. TODO Webdev : Intégrations Backend Requises

Pendant la phase d'intégration technique, merci de prêter attention aux balises `// TODO webdev:` disséminées dans le code :

1. **Mapbox (`Location.tsx`)**
   - Intégrer la carte interactive avec un style personnalisé correspondant à la palette (Sable/Brun/Dune).

2. **Smoobu (`BookingCTA.tsx` & `sejourner/page.tsx`)**
   - Brancher le widget Smoobu au clic sur le bouton "Vérifier les disponibilités".

3. **Médias (`HeroImmersive.tsx`, `IndoorPool.tsx`, etc.)**
   - Remplacer les URLs Unsplash par les assets finaux fournis par Manon, en conservant le `next/image` et les ratios/classes organiques.
   - Si une vidéo est utilisée en background du Hero, s'assurer de son auto-play muet et compressé.

4. **Traductions (`i18n`)**
   - Les textes du redesign ont été intégrés directement pour validation visuelle. Ils devront être extraits vers les fichiers JSON `messages/fr.json`, `es.json` et `en.json` pour la localisation complète.
