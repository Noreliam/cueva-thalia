import type { BookingLocale } from '@/lib/email/booking-locale';
import { getCancellationPolicyHtml } from '@/lib/booking/cancellation-policy';
import {
  CHECK_IN_FROM,
  CHECK_IN_UNTIL,
  CHECK_OUT_TIME,
  DEPOSIT_ACCOUNT_HOLDER,
  DEPOSIT_BIZUM,
  DEPOSIT_IBAN,
  SECURITY_DEPOSIT_EUR,
} from '@/lib/booking/stay-info';
import { CHECKIN_GENERIC_URL, socialLinksHtml } from '@/lib/social-links';

type EmailTemplate = {
  subject: string;
  html: string;
};

const HOUSE_RULES: Record<BookingLocale, string[]> = {
  es: [
    'No están permitidas las fiestas o eventos, salvo que hayan sido previamente comunicados y expresamente autorizados por el propietario.',
    'Se ruega respetar el descanso del vecindario y evitar música a un volumen elevado, especialmente entre las 22:00 y las 08:00 horas.',
    'Está prohibido fumar en el interior de la vivienda.',
    'No está permitido utilizar vasos u otros objetos de cristal dentro o alrededor de la piscina.',
    'La piscina climatizada está concebida como un espacio de relajación. No está permitido saltar, tirarse al agua o realizar juegos que puedan provocar salpicaduras hacia el interior de la vivienda.',
    'La piscina dispone de una cubierta térmica. Recomendamos volver a colocarla cada noche después de su uso para conservar la temperatura del agua y mantener la humedad natural del ambiente.',
    'Los menores deberán permanecer bajo la supervisión permanente de un adulto en toda la propiedad, especialmente en la zona de la piscina.',
    'Las mascotas son bienvenidas. Rogamos que permanezcan bajo el control de sus propietarios y que no ocasionen daños en la vivienda ni molestias al vecindario. Cualquier desperfecto ocasionado por las mascotas será responsabilidad de sus dueños.',
    'El número de huéspedes deberá corresponder al indicado en la reserva. En caso de alojarse personas adicionales sin autorización previa, se aplicará el suplemento correspondiente, que podrá descontarse de la fianza.',
    'No está permitido mover el mobiliario ni sacar muebles o elementos de decoración al exterior sin autorización.',
    'Las toallas de la vivienda no podrán utilizarse para la playa.',
    'El alojamiento incluye una limpieza básica al finalizar la estancia. Les rogamos dejar la vivienda en un estado razonable: la vajilla deberá quedar limpia, la basura depositada en los contenedores correspondientes y la propiedad sin una suciedad excesiva. Cueva Thalía es un alojamiento turístico de alquiler vacacional, no un hotel.',
    'Cualquier daño, avería o incidencia deberá comunicarse inmediatamente para poder solucionarlo lo antes posible.',
    'Los objetos olvidados podrán enviarse posteriormente a petición del huésped, siendo los gastos de envío a su cargo.',
    'En caso de pérdida de llaves o de requerir una intervención extraordinaria durante la estancia, podrán aplicarse los costes correspondientes.',
  ],
  fr: [
    'Les fêtes et événements ne sont pas autorisés, sauf s\'ils ont été préalablement communiqués et expressément acceptés par le propriétaire.',
    'Merci de respecter le repos du voisinage et d\'éviter toute musique à volume élevé, en particulier entre 22h00 et 08h00.',
    'Il est interdit de fumer à l\'intérieur du logement.',
    'Les verres et tout objet en verre sont interdits dans la piscine et autour de la piscine.',
    'La piscine chauffée est un espace de détente. Il est interdit de sauter, de plonger ou de jouer d\'une manière qui provoquerait des éclaboussures vers l\'intérieur du logement.',
    'La piscine dispose d\'une couverture thermique. Nous recommandons de la remettre en place chaque soir après usage, pour conserver la température de l\'eau et l\'humidité naturelle du lieu.',
    'Les mineurs doivent rester sous la surveillance permanente d\'un adulte sur toute la propriété, en particulier autour de la piscine.',
    'Les animaux sont les bienvenus. Merci de les garder sous le contrôle de leurs propriétaires, sans dégâts ni nuisances pour le voisinage. Tout dégât causé par un animal est à la charge de son propriétaire.',
    'Le nombre de voyageurs doit correspondre à celui indiqué à la réservation. Toute personne supplémentaire non autorisée entraînera un supplément, pouvant être déduit de la caution.',
    'Il n\'est pas permis de déplacer le mobilier ni de sortir meubles ou éléments de décoration sans autorisation.',
    'Les serviettes du logement ne peuvent pas être utilisées à la plage.',
    'Le séjour comprend un ménage de base à la fin. Merci de laisser le logement dans un état raisonnable : vaisselle propre, poubelles vidées dans les conteneurs, sans saleté excessive. Cueva Thalía est un logement touristique, pas un hôtel.',
    'Tout dégât, panne ou incident doit être signalé immédiatement afin de pouvoir le résoudre au plus vite.',
    'Les objets oubliés peuvent être renvoyés sur demande, les frais d\'expédition étant à la charge du voyageur.',
    'En cas de perte de clés ou d\'intervention extraordinaire pendant le séjour, les frais correspondants pourront être facturés.',
  ],
  en: [
    'Parties and events are not allowed unless previously communicated and expressly authorised by the owner.',
    'Please respect neighbours and avoid loud music, especially between 22:00 and 08:00.',
    'Smoking is not allowed inside the property.',
    'Glassware and other glass objects are not allowed in or around the pool.',
    'The heated pool is a relaxation space. Jumping, diving or games that splash water towards the house are not allowed.',
    'The pool has a thermal cover. Please put it back each evening after use to keep the water warm and the natural humidity of the space.',
    'Minors must remain under constant adult supervision throughout the property, especially around the pool.',
    'Pets are welcome. Please keep them under their owners\' control, without damage to the home or disturbance to neighbours. Any damage caused by pets is the owners\' responsibility.',
    'The number of guests must match the booking. Additional guests without prior authorisation will incur a surcharge, which may be deducted from the deposit.',
    'Furniture must not be moved, and furniture or décor must not be taken outdoors without permission.',
    'House towels may not be used at the beach.',
    'The stay includes a basic end-of-stay clean. Please leave the home in a reasonable state: dishes clean, rubbish in the correct bins, and no excessive dirt. Cueva Thalía is a holiday rental, not a hotel.',
    'Any damage, breakdown or issue must be reported immediately so it can be resolved as soon as possible.',
    'Forgotten items can be sent on request, with shipping costs paid by the guest.',
    'Lost keys or an extraordinary intervention during the stay may incur additional charges.',
  ],
};

function listHtml(items: string[]): string {
  return `<ul>
${items.map((item) => `  <li>${item}</li>`).join('\n')}
</ul>`;
}

export function buildPreArrivalTemplate(locale: BookingLocale): EmailTemplate {
  const checkInUrl = CHECKIN_GENERIC_URL;
  const social = socialLinksHtml(locale);
  const cancellationHtml = getCancellationPolicyHtml(locale);
  const rules = listHtml(HOUSE_RULES[locale]);

  const templates: Record<BookingLocale, EmailTemplate> = {
    es: {
      subject:
        'Bienvenido/a a Cueva Thalía – Check-in obligatorio e información importante antes de su llegada',
      html: `
<p>Estimado/a huésped,</p>
<p>Nos complace darle la bienvenida a Cueva Thalía. Para que su llegada sea lo más cómoda posible, le rogamos leer atentamente la siguiente información.</p>
<h3>✅ Check-in obligatorio</h3>
<p>De acuerdo con la normativa vigente en Canarias, todos los huéspedes deberán completar el registro online antes de su llegada.</p>
<p>Puede realizar el check-in a través del siguiente enlace:<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>
<p>Horario de llegada: entre las ${CHECK_IN_FROM} y las ${CHECK_IN_UNTIL} h. Salida: antes de las ${CHECK_OUT_TIME} h.</p>
<p>Le agradecemos que complete el formulario antes de su llegada para agilizar el proceso de entrada.</p>
<h3>💳 Fianza</h3>
<p>A la llegada deberá abonarse una fianza de ${SECURITY_DEPOSIT_EUR} €, que será devuelta una vez finalizada la estancia, tras la revisión y limpieza de la propiedad, siempre que no se hayan producido daños o incumplimientos de las normas de la vivienda.</p>
<p>Para reservas de grupos, la fianza podrá ser superior si así se ha comunicado y aceptado en el momento de la reserva.</p>
<p>La fianza puede abonarse mediante:</p>
<ul>
  <li>Bizum: ${DEPOSIT_BIZUM}</li>
  <li>Transferencia bancaria — IBAN: ${DEPOSIT_IBAN} — Titular: ${DEPOSIT_ACCOUNT_HOLDER}</li>
  <li>Efectivo durante el check-in</li>
</ul>
<h3>🏡 Normas de la propiedad</h3>
${rules}
<h3>📶 Wi-Fi</h3>
<p>La vivienda dispone de conexión Wi-Fi gratuita.<br>
Nombre de la red: MIWIFI_SAt2<br>
Contraseña: DN3tUPAN</p>
<p>También encontrará un código QR en la parte posterior del router, que le permitirá conectarse automáticamente.</p>
<h3>🔐 Sistema de alarma</h3>
<p>La vivienda dispone de un sistema de alarma para su seguridad.<br>
No existen cámaras de vigilancia en el interior de la propiedad.<br>
El sistema está compuesto únicamente por detectores de movimiento, que solo funcionan cuando la alarma está activada por los propios huéspedes al abandonar la vivienda.</p>
<h3>⚠️ Responsabilidad</h3>
<p>El uso de la piscina, del jardín y del resto de las instalaciones se realiza bajo la exclusiva responsabilidad de los huéspedes.</p>
<p>La propiedad no podrá considerarse responsable de accidentes, caídas, lesiones, pérdidas, robos o daños sufridos durante la estancia, ni de los objetos personales dejados en la vivienda o en el exterior.</p>
<p>Los huéspedes serán responsables de cualquier daño ocasionado en la propiedad por ellos mismos, sus acompañantes, menores o mascotas.</p>
${cancellationHtml}
<h3>ℹ️ Información importante</h3>
<p>La realización del check-in online, el pago de la fianza y el acceso a la propiedad implican la aceptación de las presentes normas de uso y de la política de cancelación.</p>
<p>Si tiene cualquier duda antes de su llegada, estaremos encantados de ayudarle.</p>
<p>Le deseamos una estancia maravillosa en Cueva Thalía.</p>
<p>Equipo de Cueva Thalía 🌿</p>
${social}
`.trim(),
    },
    fr: {
      subject:
        'Bienvenue à Cueva Thalía – Check-in obligatoire et informations importantes avant votre arrivée',
      html: `
<p>Chère/Cher hôte,</p>
<p>Nous sommes ravis de vous accueillir à Cueva Thalía. Pour que votre arrivée se déroule dans les meilleures conditions, merci de lire attentivement les informations ci-dessous.</p>
<h3>✅ Check-in obligatoire</h3>
<p>Conformément à la réglementation en vigueur aux Canaries, tous les voyageurs doivent compléter l'enregistrement en ligne avant leur arrivée.</p>
<p>Vous pouvez effectuer le check-in via le lien suivant :<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>
<p>Horaires d'arrivée : entre ${CHECK_IN_FROM.replace(':', 'h')} et ${CHECK_IN_UNTIL.replace(':', 'h')}. Départ : avant ${CHECK_OUT_TIME.replace(':', 'h')}.</p>
<p>Merci de compléter le formulaire avant votre arrivée pour faciliter l'entrée.</p>
<h3>💳 Caution</h3>
<p>À l'arrivée, une caution de ${SECURITY_DEPOSIT_EUR} € sera demandée. Elle sera restituée une fois le séjour terminé, après l'état des lieux et le ménage, sous réserve qu'aucun dommage ou manquement au règlement n'ait été constaté.</p>
<p>Pour les réservations de groupes, la caution peut être supérieure si cela a été communiqué et accepté lors de la réservation.</p>
<p>La caution peut être réglée par :</p>
<ul>
  <li>Bizum : ${DEPOSIT_BIZUM}</li>
  <li>Virement bancaire — IBAN : ${DEPOSIT_IBAN} — Titulaire : ${DEPOSIT_ACCOUNT_HOLDER}</li>
  <li>Espèces au check-in</li>
</ul>
<h3>🏡 Règlement de la propriété</h3>
${rules}
<h3>📶 Wi-Fi</h3>
<p>Le logement dispose d'une connexion Wi-Fi gratuite.<br>
Nom du réseau : MIWIFI_SAt2<br>
Mot de passe : DN3tUPAN</p>
<p>Vous trouverez également un QR code au dos du routeur pour vous connecter automatiquement.</p>
<h3>🔐 Système d'alarme</h3>
<p>Le logement dispose d'une alarme pour votre sécurité.<br>
Il n'y a pas de caméras de surveillance à l'intérieur.<br>
Le système est composé uniquement de détecteurs de mouvement, actifs seulement lorsque l'alarme est armée par les voyageurs en quittant le logement.</p>
<h3>⚠️ Responsabilité</h3>
<p>L'utilisation de la piscine, du jardin et des installations se fait sous la responsabilité exclusive des voyageurs.</p>
<p>La propriété ne saurait être tenue responsable d'accidents, chutes, blessures, pertes, vols ou dommages subis pendant le séjour, ni des objets personnels laissés dans le logement ou à l'extérieur.</p>
<p>Les voyageurs sont responsables de tout dégât causé à la propriété par eux-mêmes, leurs accompagnants, les mineurs ou les animaux.</p>
${cancellationHtml}
<h3>ℹ️ Information importante</h3>
<p>Le check-in en ligne, le paiement de la caution et l'accès au logement impliquent l'acceptation du présent règlement et de la politique d'annulation.</p>
<p>Une question avant votre arrivée ? Nous sommes à votre disposition.</p>
<p>Nous vous souhaitons un merveilleux séjour à Cueva Thalía.</p>
<p>L'équipe Cueva Thalía 🌿</p>
${social}
`.trim(),
    },
    en: {
      subject: 'Welcome to Cueva Thalía – Mandatory check-in and important information before your arrival',
      html: `
<p>Dear guest,</p>
<p>We are delighted to welcome you to Cueva Thalía. To make your arrival as smooth as possible, please read the following information carefully.</p>
<h3>✅ Mandatory check-in</h3>
<p>Under current regulations in the Canary Islands, all guests must complete online registration before arrival.</p>
<p>You can check in via the following link:<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>
<p>Arrival time: between ${CHECK_IN_FROM} and ${CHECK_IN_UNTIL}. Departure: before ${CHECK_OUT_TIME}.</p>
<p>Please complete the form before arrival to speed up entry.</p>
<h3>💳 Security deposit</h3>
<p>A €${SECURITY_DEPOSIT_EUR} deposit is required on arrival. It will be refunded at the end of the stay, after inspection and cleaning, provided there is no damage or breach of house rules.</p>
<p>For group bookings, the deposit may be higher if this was communicated and accepted at the time of booking.</p>
<p>The deposit can be paid by:</p>
<ul>
  <li>Bizum: ${DEPOSIT_BIZUM}</li>
  <li>Bank transfer — IBAN: ${DEPOSIT_IBAN} — Account holder: ${DEPOSIT_ACCOUNT_HOLDER}</li>
  <li>Cash at check-in</li>
</ul>
<h3>🏡 House rules</h3>
${rules}
<h3>📶 Wi-Fi</h3>
<p>The property has free Wi-Fi.<br>
Network name: MIWIFI_SAt2<br>
Password: DN3tUPAN</p>
<p>You will also find a QR code on the back of the router for automatic connection.</p>
<h3>🔐 Alarm system</h3>
<p>The property has an alarm system for your security.<br>
There are no surveillance cameras inside the property.<br>
The system consists only of motion detectors, which work only when the alarm is armed by guests when leaving the property.</p>
<h3>⚠️ Liability</h3>
<p>Use of the pool, garden and other facilities is at the guests' sole responsibility.</p>
<p>The property cannot be held responsible for accidents, falls, injuries, losses, theft or damage during the stay, nor for personal belongings left in the home or outdoors.</p>
<p>Guests are responsible for any damage caused to the property by themselves, their companions, minors or pets.</p>
${cancellationHtml}
<h3>ℹ️ Important information</h3>
<p>Completing online check-in, paying the deposit and accessing the property imply acceptance of these house rules and the cancellation policy.</p>
<p>If you have any questions before arrival, we will be happy to help.</p>
<p>We wish you a wonderful stay at Cueva Thalía.</p>
<p>The Cueva Thalía Team 🌿</p>
${social}
`.trim(),
    },
  };

  return templates[locale];
}
