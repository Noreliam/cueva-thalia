# Emails de confirmation de réservation — Cueva Thalía

Trois versions (FR / EN / ES) déclenchées automatiquement via `fulfillBookingOrder`
selon le champ `order.locale` transmis dans les métadonnées Stripe.

---

## 🇫🇷 VERSION FRANÇAISE

**Objet :** Votre réservation est confirmée — Cueva Thalía ✨

---

Bonjour {{guestName}},

Votre réservation à Cueva Thalía est confirmée.
Nous avons hâte de vous accueillir dans ce lieu un peu hors du monde.

---

**Votre séjour**

- Arrivée : {{checkInDate}}
- Départ : {{checkOutDate}}
- Voyageurs : {{guestCount}}
- Référence : {{bookingId}}
- Montant réglé : {{amountFormatted}} €

---

**Ce qui vous attend**

Une grotte volcanique creusée à même la roche, nichée sous un jardin de Tenerife.
Une piscine intérieure chauffée entre 34 et 40 °C, entièrement privée.
Le silence. La lumière douce. L'impression d'être ailleurs, enfin.

---

**Informations pratiques**

- **Adresse :** San Miguel de Abona, Tenerife — les détails d'accès vous seront envoyés 48h avant votre arrivée.
- **Check-in :** à partir de 15h00
- **Check-out :** avant 11h00
- **Parking :** disponible sur place

**Une question, une demande particulière ?**
Manon est disponible directement par WhatsApp : +34 657 077 910
Ou par email en répondant à ce message.

---

À très bientôt à Cueva Thalía.

Manon

---

## 🇬🇧 VERSION ANGLAISE

**Subject:** Your booking is confirmed — Cueva Thalía ✨

---

Hello {{guestName}},

Your stay at Cueva Thalía is confirmed.
We can't wait to welcome you to this quiet, extraordinary place.

---

**Your stay**

- Check-in: {{checkInDate}}
- Check-out: {{checkOutDate}}
- Guests: {{guestCount}}
- Reference: {{bookingId}}
- Amount paid: €{{amountFormatted}}

---

**What awaits you**

A volcanic cave carved into the rock, hidden beneath a garden in Tenerife.
A private indoor heated pool — 34 to 40 °C — yours alone.
Silence. Warm light. The rare feeling of being somewhere truly different.

---

**Practical information**

- **Address:** San Miguel de Abona, Tenerife — full access details will be sent 48 hours before your arrival.
- **Check-in:** from 3:00 PM
- **Check-out:** before 11:00 AM
- **Parking:** available on site

**Any questions or special requests?**
Manon is available directly on WhatsApp: +34 657 077 910
Or simply reply to this email.

---

Looking forward to welcoming you.

Manon

---

## 🇪🇸 VERSION ESPAGNOLE

**Asunto:** Tu reserva está confirmada — Cueva Thalía ✨

---

Hola {{guestName}},

Tu reserva en Cueva Thalía está confirmada.
Estamos deseando recibirte en este lugar fuera del tiempo.

---

**Tu estancia**

- Llegada: {{checkInDate}}
- Salida: {{checkOutDate}}
- Huéspedes: {{guestCount}}
- Referencia: {{bookingId}}
- Importe pagado: {{amountFormatted}} €

---

**Lo que te espera**

Una cueva volcánica excavada en la roca viva, escondida bajo un jardín de Tenerife.
Una piscina interior climatizada entre 34 y 40 °C, completamente privada.
Silencio. Luz cálida. La sensación de haber encontrado un lugar único.

---

**Información práctica**

- **Dirección:** San Miguel de Abona, Tenerife — los detalles de acceso se enviarán 48 horas antes de tu llegada.
- **Check-in:** a partir de las 15:00 h
- **Check-out:** antes de las 11:00 h
- **Aparcamiento:** disponible en el lugar

**¿Alguna pregunta o solicitud especial?**
Manon está disponible directamente por WhatsApp: +34 657 077 910
O simplemente responde a este correo.

---

Hasta pronto en Cueva Thalía.

Manon

---

## Variables utilisées dans les templates

| Variable          | Source dans BookingOrder       | Exemple              |
|-------------------|-------------------------------|----------------------|
| `{{guestName}}`   | `order.guestName`             | Marie Dupont         |
| `{{checkInDate}}` | `order.checkInDate` (formaté) | 15 juillet 2026      |
| `{{checkOutDate}}`| `order.checkOutDate` (formaté)| 18 juillet 2026      |
| `{{guestCount}}`  | `order.guestCount`            | 2                    |
| `{{bookingId}}`   | `order.bookingId`             | CT-20260715-abc123   |
| `{{amountFormatted}}` | `order.amountCents / 100` | 420                  |
