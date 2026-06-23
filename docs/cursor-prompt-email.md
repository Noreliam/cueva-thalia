# Prompt Cursor — Email de confirmation de réservation

> Copie-colle ce prompt directement dans Cursor (Cmd+L ou Cmd+K selon le contexte).

---

## PROMPT

```
Implémente l'envoi automatique d'un email de confirmation de réservation trilingue (FR / EN / ES)
dans le projet Next.js de Cueva Thalía.

---

## CONTEXTE TECHNIQUE

- Framework : Next.js (App Router, TypeScript)
- Hébergeur : Netlify (runtime Node.js)
- Déclencheur : le webhook Stripe appelle `fulfillBookingOrder()` dans `lib/booking/fulfill.ts`
  après chaque paiement confirmé.
- Le type `BookingOrder` contient déjà un champ `locale: string` ('fr' | 'en' | 'es')
  qui indique la langue de la page depuis laquelle la réservation a été faite.
- Service email à utiliser : **Resend** (https://resend.com) — à installer.

---

## ÉTAPE 1 — Installation

```bash
npm install resend
```

---

## ÉTAPE 2 — Variables d'environnement

Ajoute dans `.env.local` (et dans `.env.example`) :

```
# Resend — emails transactionnels
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=Cueva Thalía <reservations@cueva-thalia.com>
EMAIL_MANON=contact@cueva-thalia.com
```

---

## ÉTAPE 3 — Crée le fichier `lib/email/booking-confirmation.ts`

Ce fichier doit exporter une fonction `sendBookingConfirmation(order: BookingOrder): Promise<void>`.

### Logique attendue :

1. Formate les dates selon la locale :
   - FR : "15 juillet 2026"
   - EN : "July 15, 2026"
   - ES : "15 de julio de 2026"
   Utilise `new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' })`

2. Formate le montant : `(order.amountCents / 100).toFixed(0)`

3. Sélectionne le template selon `order.locale` :

### Template FR

Objet : `Votre réservation est confirmée — Cueva Thalía ✨`

Corps (HTML) :
```
Bonjour [guestName],

Votre réservation à Cueva Thalía est confirmée.
Nous avons hâte de vous accueillir dans ce lieu un peu hors du monde.

─────────────────────────
Votre séjour

Arrivée   : [checkInDate]
Départ    : [checkOutDate]
Voyageurs : [guestCount]
Référence : [bookingId]
Montant   : [amountFormatted] €

─────────────────────────
Ce qui vous attend

Une grotte volcanique creusée à même la roche, nichée sous un jardin de Tenerife.
Une piscine intérieure chauffée entre 34 et 40 °C, entièrement privée.
Le silence. La lumière douce. L'impression d'être ailleurs, enfin.

─────────────────────────
Informations pratiques

Adresse  : San Miguel de Abona, Tenerife
           (détails d'accès envoyés 48h avant votre arrivée)
Check-in  : à partir de 15h00
Check-out : avant 11h00
Parking   : disponible sur place

Une question, une demande particulière ?
Manon est disponible par WhatsApp : +34 657 077 910
Ou répondez directement à cet email.

─────────────────────────
À très bientôt à Cueva Thalía.

Manon
```

### Template EN

Objet : `Your booking is confirmed — Cueva Thalía ✨`

Corps :
```
Hello [guestName],

Your stay at Cueva Thalía is confirmed.
We can't wait to welcome you to this quiet, extraordinary place.

─────────────────────────
Your stay

Check-in  : [checkInDate]
Check-out : [checkOutDate]
Guests    : [guestCount]
Reference : [bookingId]
Paid      : €[amountFormatted]

─────────────────────────
What awaits you

A volcanic cave carved into the rock, hidden beneath a garden in Tenerife.
A private indoor heated pool — 34 to 40 °C — yours alone.
Silence. Warm light. The rare feeling of being somewhere truly different.

─────────────────────────
Practical information

Address   : San Miguel de Abona, Tenerife
            (full access details sent 48h before arrival)
Check-in  : from 3:00 PM
Check-out : before 11:00 AM
Parking   : available on site

Any questions or special requests?
Manon is available on WhatsApp: +34 657 077 910
Or simply reply to this email.

─────────────────────────
Looking forward to welcoming you.

Manon
```

### Template ES

Objet : `Tu reserva está confirmada — Cueva Thalía ✨`

Corps :
```
Hola [guestName],

Tu reserva en Cueva Thalía está confirmada.
Estamos deseando recibirte en este lugar fuera del tiempo.

─────────────────────────
Tu estancia

Llegada    : [checkInDate]
Salida     : [checkOutDate]
Huéspedes  : [guestCount]
Referencia : [bookingId]
Pagado     : [amountFormatted] €

─────────────────────────
Lo que te espera

Una cueva volcánica excavada en la roca viva, escondida bajo un jardín de Tenerife.
Una piscina interior climatizada entre 34 y 40 °C, completamente privada.
Silencio. Luz cálida. La sensación de haber encontrado un lugar único.

─────────────────────────
Información práctica

Dirección  : San Miguel de Abona, Tenerife
             (detalles de acceso enviados 48h antes de la llegada)
Check-in   : a partir de las 15:00 h
Check-out  : antes de las 11:00 h
Aparcamiento : disponible en el lugar

¿Alguna pregunta o solicitud especial?
Manon está disponible por WhatsApp: +34 657 077 910
O simplemente responde a este correo.

─────────────────────────
Hasta pronto en Cueva Thalía.

Manon
```

4. Envoie l'email via Resend :
   - `to`: `order.guestEmail`
   - `from`: `process.env.EMAIL_FROM`
   - `replyTo`: `process.env.EMAIL_MANON`
   - Log l'erreur sans faire crasher le webhook en cas d'échec

---

## ÉTAPE 4 — Branche dans `lib/booking/fulfill.ts`

Dans la fonction `fulfillBookingOrder`, après le bloc Smoobu, appelle :

```typescript
try {
  await sendBookingConfirmation(order);
} catch (error) {
  console.error('[EMAIL:booking] confirmation email failed', {
    bookingId: order.bookingId,
    error,
  });
}
```

---

## ÉTAPE 5 — Garde-fous

- Si `RESEND_API_KEY` n'est pas définie, log un warning et passe sans erreur (ne pas bloquer le webhook).
- En mode test (NODE_ENV !== 'production'), log le contenu de l'email dans la console au lieu d'envoyer.
- Wrap tout dans un try/catch — un échec d'email ne doit JAMAIS faire retourner une erreur au webhook Stripe.

---

## FICHIERS À CRÉER / MODIFIER

| Fichier                              | Action   |
|--------------------------------------|----------|
| `lib/email/booking-confirmation.ts`  | Créer     |
| `lib/booking/fulfill.ts`             | Modifier  |
| `.env.example`                       | Modifier  |

Ne touche à aucun autre fichier.
```
