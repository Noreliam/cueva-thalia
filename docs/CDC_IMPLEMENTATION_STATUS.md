# Cueva Thalía — CDC Implementation Status

**Document Source** : Cahier des Charges Complet fourni par Manon  
**Date** : Juin 2026  
**Status** : ✅ Stripe Integration Setup Based on Full Requirements

---

## 📋 Résumé CDC (Cahier des Charges)

### A. Objectifs Principaux
- Développer réservations directes (réduire dépendance Airbnb/Booking)
- Image professionnelle et haut de gamme
- Processus de réservation rassurant
- Meilleure visibilité et présentation de l'univers

### B. Types de Réservations

#### 1️⃣ Séjourner (Réservation directe en ligne)
- **Publique cible** : Couples, familles, petits groupes
- **Capacité max** : 4 personnes
- **Réservation** : Directe via formulaire + Stripe
- **Configuration** : 1 queen bed + 1 double sofa bed

#### 2️⃣ Événements Privés (Demande de contact)
- Anniversaires, célébrations, privatisations
- Shootings, petits mariages, baptêmes
- Contact obligatoire → Devis personnalisé

#### 3️⃣ Workshops & Retraites (Demande de contact)
- Yoga, bien-être, ateliers, coaching
- Retraites intimistes, événements professionnels
- Contact obligatoire → Échange projet + devis

---

## 💰 Tarification (CDC 5.3)

### Séjours Standard (jusqu'à 4 personnes)
```
Lundi-Jeudi: 200€/nuit
Vendredi, Samedi, Dimanche: 250€/nuit
```

### Au-delà de 4 personnes
- Tarification dégressif (sur demande)
- Couchages supplémentaires : matelas futon/colchonetas
- Capacité : jusqu'à 16 personnes (avec couchages supplémentaires)

### Équipements inclus
✅ Serviettes, draps, linge de lit  
✅ Savon, produits de bain, sèche-cheveux  
✅ Cuisine équipée (épices, huile, miel, café/thé)  
✅ Wi-Fi, TV connectée (Netflix, Prime, etc.)  
✅ Enceinte Bluetooth  

---

## 🛑 Conditions Critiques (CDC 5.4 + Règles)

### Acompte & Annulation
```
Acompte obligatoire: 150€ (NON REMBOURSABLE)

Annulation définitive → Acompte perdu
Modification > 15j avant arrivée → Possible (si dispo), sans frais
Modification < 15j avant arrivée → Acompte conservé + 50% pénalité pour report
```

### Règles du Lieu
✅ Animaux acceptés (calmes, propres, bien éduqués)  
✅ Respect du voisinage = ESSENTIEL  
✅ Piscine = Relaxation UNIQUEMENT (pas de fêtes aquatiques)  
❌ Interdiction de fumer à l'intérieur  
❌ Fêtes excessives ou groupes bruyants  
❌ Événements non autorisés automatiquement  

### Responsabilités
- Personnes supplémentaires doivent être déclarées avant arrivée
- Frais additionnels pour invités supplémentaires avec couchages
- Responsabilité des utilisateurs pour usage des installations
- Propriété doit être rendue propre
- Dégradations → frais additionnels ou arrêt immédiat

---

## 🏗️ Structure du Site Souhaitée (CDC 8.2)

**Navigation principale** :
1. **Accueil** — Landing page immersive
2. **Séjourner** — Réservation directe (photos, équipements, tarifs, calendrier)
3. **Événements privés** — Formulaire demande
4. **Workshops & retraites** — Présentation + formulaire projet
5. **Galerie** — Photos immersives
6. **Contact / Réserver** — Actions principales
7. **Footer** — FAQ, conditions, mentions légales, politique annulation

**Boutons d'action prioritaires** :
- 🔵 Réserver un séjour
- 🔵 Vérifier les disponibilités
- 🔵 Organiser un événement privé
- 🔵 Contacter via WhatsApp (bouton flottant permanent)

---

## 🎨 Design & Branding (CDC 9)

### Esthétique Cible
- Bohème élégant + naturel + organique
- Luxe discret, premium mais chaleureux
- Minimaliste (sans être froid)
- Immersif et sensoriel

### Palette de Couleurs
**Base naturelle** :
- Sable, dune, beige, blanc cassé
- Pierre, terracotta, brun chaud
- Tons roche/minéraux

**Accents** :
- Turquoise et vert (nature, eau vivante)
- Touches couleurs énergétiques subtiles (chakra)

### À ÉVITER
❌ Fonds noirs ou ambiances trop sombres  
❌ Couleurs criardes ou agressives  
❌ Designs trop spirituels cliché  
❌ Interfaces confuses ou surchargées  
❌ Esthétique "Airbnb standard"  
❌ Univers trop touristique  

### Mobile First
✅ Priorité absolue  
✅ Interface rapide, intuitive, claire  
✅ Réservation facile depuis téléphone  
✅ Boutons d'action visibles  
✅ Navigation fluide sans surcharge  

### Animations & Effets
✅ Apparitions au scroll  
✅ Galerie immersive  
✅ Transitions fluides et élégantes  
✅ Micro-animations subtiles  
❌ SANS : Animations lourdes, cheap, excessives  

### Objectif Visuel Global
🎯 **Effet "WOW" 15/10** — Très beau, immersif, mémorable, avec vraie identité premium  

---

## 🔧 Implémentation Stripe (État Actuel)

### Fichiers Créés ✅
| Fichier | Status | Description |
|---------|--------|-------------|
| `lib/booking/schema.ts` | ✅ | Validation Zod (MAX 4 personnes) |
| `lib/booking/pricing.ts` | ✅ | Tarification Cueva Thalía (200€/250€) |
| `lib/booking/cancellation-policy.ts` | ✅ | Acompte 150€ + conditions annulation |
| `app/api/stripe/booking/checkout/route.ts` | ✅ | POST checkout (crée session Stripe) |
| `app/api/stripe/webhook/booking/route.ts` | ✅ | Webhook confirmation paiement |
| `components/booking/BookingForm.tsx` | ✅ | Formulaire React 1-4 invités |

### Configuration Stripe Nécessaire
- [ ] Clés API test (sk_test_xxx, pk_test_xxx)
- [ ] Clés API live (sk_live_xxx, pk_live_xxx)
- [ ] Webhook signing secret (whsec_xxx)
- [ ] Webhook endpoint configuré : `/api/stripe/webhook/booking`

---

## 📝 À FAIRE — Priorités

### Phase 1 : Configuration & Test (Urgent)
- [ ] Obtenir clés Stripe (test + live)
- [ ] Configurer webhook local (Stripe CLI)
- [ ] Tester flow checkout avec carte test `4242 4242 4242 4242`
- [ ] Valider webhook reception

### Phase 2 : Frontend Integration
- [ ] Intégrer `<BookingForm>` dans `/sejourner/page.tsx`
- [ ] Remplacer ou compléter `SmoobuBookingGate` avec nouveau formulaire
- [ ] Styles cohérents avec design système Cueva Thalía
- [ ] Pages de succès/annulation
- [ ] Bouton WhatsApp flottant permanent

### Phase 3 : Database & Fulfillment
- [ ] Supabase : créer table `bookings`
- [ ] Webhook : sauvegarder réservations confirmées
- [ ] Email confirmation au client (template)
- [ ] Email notification à Manon (admin)

### Phase 4 : Features Complémentaires
- [ ] Smoobu API : sync disponibilités
- [ ] Calendrier custom (dépend dispo Smoobu)
- [ ] Dashboard admin pour gestion réservations
- [ ] Refund/cancellation logic
- [ ] Tarifs progressifs (< 15j → pénalité 50%)

### Phase 5 : Déploiement Production
- [ ] Migrate to live Stripe keys
- [ ] Webhook configuré en production
- [ ] Monitoring & alertes Stripe
- [ ] Tests end-to-end avec vraie carte

---

## 💡 Notes Importantes du CDC

### Points Clés Design
- **Visuels prioritaires** : Grotte naturelle, roche, piscine intérieure chauffée (effet "wow")
- **Logo & couleurs** : Déjà existants (à transmettre)
- **Typographies** : À définir (élégantes, raffinées, intemporelles)
- **Photos** : Professionnelles + immersives (grandes sections)

### Expérience Recherchée
- **Emotion immédiate** : Déconnexion, apaisement, émerveillement
- **Sensation** : Hors du temps, intime, chaleureux, exclusif, authentique
- **Positionnement** : Premium haut de gamme BUT humain, pas ostentatoire

### Clientèle Cible
✅ Couples en quête d'expérience romantique  
✅ Voyageurs atypiques et insolites  
✅ Personnes sensibles à esthétique/bien-être  
✅ Thérapeutes, coachs, organisateurs retraites  
✅ Groupes conscients et respectueux  

❌ Fêtes excessives  
❌ Tourisme "low cost"  
❌ Groupes bruyants non respectueux  

### Histoire du Lieu (Important!)
Découverte d'une grotte naturelle sous la propriété après 4,5 ans. Sensation de "cadeau de la vie". Transformation en expérience immersive unique.

**À intégrer** dans la narration du site pour créer émotion & connexion.

---

## 🌍 Contexte Local (CDC 11)

### Localisation
- **Sud de Tenerife** (entre mer et montagne)
- **15-20 min** de l'aéroport sud
- **20-25 min** des zones touristiques (Los Cristianos, Adeje)
- **Calme & paisible** mais proche de tout

### Expériences Autour
- Gastronomie locale (restaurants, guachinches)
- Plages & piscines naturelles
- Randonnées & volcans
- Bien-être & yoga
- Activités nautiques
- Couchers de soleil & paysages

---

## 📞 Support & Questions

Pour clarifications sur l'implémentation ou décisions :
- **CDC complet** : `/docs/CDC_IMPLEMENTATION_STATUS.md` (ce fichier)
- **Stripe plan** : `/docs/STRIPE_BOOKING_INTEGRATION.md`
- **Quick start** : `/docs/STRIPE_QUICK_START.md`
- **Checklist** : `/docs/IMPLEMENTATION_CHECKLIST.md`

---

**Status Final** : ✅ CDC compris et implémentation Stripe alignée avec vraies specs.  
**Prochaine étape** : Configuration Stripe keys + Testing phase.
