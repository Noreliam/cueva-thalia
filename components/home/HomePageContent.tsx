import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { galleryCategories, galleryImagePath } from '@/lib/gallery-data';
import { InlineForm } from '@/components/site/InlineForm';

const Star = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export function HomePageContent() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content fade-in">
          <span className="small-caps hero-label">Tenerife · San Miguel de Abona</span>
          <h1>Cueva Thalía</h1>
          <p className="hero-subtitle">L&apos;expérience d&apos;un lieu hors du temps</p>
          <p>Une maison troglodyte taillée dans la roche. Une parenthèse au sud de Tenerife.</p>
          <div className="hero-ctas">
            <a href="#sejour" className="btn btn-primary">
              Vérifier les disponibilités
            </a>
            <a href="#trois-facons" className="link-subtle">
              Découvrir le lieu ↓
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="small-caps" style={{ color: 'inherit', fontSize: 10 }}>
            Scroll
          </span>
          <svg viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="container experience-grid">
          <div className="experience-text fade-in">
            <p className="editorial-text lettrine">
              Cueva Thalía n&apos;est pas un lieu que l&apos;on traverse. C&apos;est un espace que l&apos;on ressent. La
              roche enveloppe, l&apos;eau reste chaude, la lumière ralentit. Ici, tout invite à se poser : le silence,
              les matières, les courbes de la cueva, l&apos;intimité totale du lieu.
            </p>
            <div className="experience-keywords">
              <span className="small-caps">Silence</span>
              <span className="small-caps">·</span>
              <span className="small-caps">Matière</span>
              <span className="small-caps">·</span>
              <span className="small-caps">Lumière</span>
            </div>
          </div>
          <div className="experience-image-wrapper fade-in">
            <Image
              src="/photos/optimized/f4544e3e-af84-4a15-aed0-df1c535af9ee.jpg"
              alt="Intérieur Cueva Thalía"
              className="organic-shape"
              width={800}
              height={700}
              style={{ height: 700, width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section id="trois-facons" className="trois-facons">
        <div className="container">
          <h2 className="fade-in" style={{ textAlign: 'center' }}>
            Trois façons de vivre la cueva
          </h2>
          <div className="cards-grid">
            <div className="card fade-in">
              <svg className="card-icon" viewBox="0 0 24 24">
                <path d="M3 12h18M3 18h18M5 6h14a2 2 0 012 2v4H3V8a2 2 0 012-2z" />
              </svg>
              <Image
                src="/photos/optimized/7ea5a8c2-b48b-4a12-b7be-034ca90b0d8e.jpg"
                alt="Séjourner"
                className="card-image organic-shape"
                width={400}
                height={300}
                style={{ width: '100%', objectFit: 'cover' }}
              />
              <h3>Séjourner</h3>
              <p>
                Pour un séjour à deux, en famille ou entre amis, jusqu&apos;à 4 personnes. Une parenthèse privée, avec
                piscine intérieure chauffée et jardin.
              </p>
              <Link href="/sejourner" className="card-link">
                Découvrir le séjour
              </Link>
            </div>
            <div className="card fade-in" style={{ transitionDelay: '100ms' }}>
              <svg className="card-icon" viewBox="0 0 24 24">
                <path d="M12 22l-3-4-4 1 1-4-4-3 4-3-1-4 4 1 3-4 3 4 4-1-1 4 4 3-4 3 1 4-4-1-3 4z" />
              </svg>
              <Image
                src="/photos/optimized/9eac7702-d91d-45eb-9a8b-526186764f1f.jpg"
                alt="Célébrer"
                className="card-image organic-shape"
                width={400}
                height={300}
                style={{ width: '100%', objectFit: 'cover' }}
              />
              <h3>Célébrer</h3>
              <p>
                Anniversaire, shooting, petit mariage ou moment privé. Chaque demande est étudiée pour préserver
                l&apos;atmosphère du lieu.
              </p>
              <Link href="/evenements-prives" className="card-link">
                Imaginer un événement
              </Link>
            </div>
            <div className="card fade-in" style={{ transitionDelay: '200ms' }}>
              <svg className="card-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                <path d="M2 12h20" />
              </svg>
              <Image
                src="/photos/optimized/49b90bf0-ce3f-4a3e-8164-90993ce96cd7.jpg"
                alt="Se retrouver"
                className="card-image organic-shape"
                width={400}
                height={300}
                style={{ width: '100%', objectFit: 'cover' }}
              />
              <h3>Se retrouver</h3>
              <p>
                Yoga, méditation, breathwork, ateliers créatifs ou retraites intimistes. Un cadre enveloppant pour
                créer, transmettre et ralentir.
              </p>
              <Link href="/workshops-retraites" className="card-link">
                Proposer un workshop
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="piscine" className="piscine">
        <div className="container piscine-grid">
          <div className="piscine-image-wrapper fade-in">
            <Image
              src="/photos/optimized/4c8be500-7d15-4958-a5df-94e614ff3556.jpg"
              alt="Piscine intérieure chauffée"
              className="piscine-image organic-shape"
              width={800}
              height={600}
              style={{ height: 600, width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="piscine-content fade-in">
            <h2>L&apos;eau chaude, toute l&apos;année</h2>
            <p className="editorial-text">
              La piscine intérieure est entièrement privée. L&apos;eau reste chauffée entre 34 et 40°C selon la saison.
              On s&apos;y installe pour ralentir, profiter du silence, sentir la lumière sur la roche et laisser le corps
              se déposer.
            </p>
            <div className="piscine-features">
              {['Piscine 100% privée', 'Eau chauffée (34-40°C)', 'Hydromassage', 'Dimensions 3 x 2 mètres'].map(
                (label) => (
                  <div className="feature-item" key={label}>
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{label}</span>
                  </div>
                )
              )}
            </div>
            <Link href="/galerie/piscine" className="card-link" style={{ marginTop: 24, display: 'inline-block' }}>
              Voir la galerie piscine →
            </Link>
          </div>
        </div>
      </section>

      <section id="sejour" className="sejourner">
        <div className="container">
          <div className="fade-in" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            <h2>Séjourner dans la cueva</h2>
            <p>
              Une retraite intimiste jusqu&apos;à 4 personnes. La réservation directe garantit le meilleur tarif et un
              contact privilégié.
            </p>
            <Link href="/sejourner" className="card-link" style={{ marginTop: 16, display: 'inline-block' }}>
              Page séjour complète →
            </Link>
          </div>
          <div className="amenities-grid fade-in">
            {[
              'Chambre Queen Size',
              'Canapé-lit double',
              'Cuisine équipée',
              '2 Salles de bain',
              'Jardin privé',
            ].map((label) => (
              <div className="amenity-item" key={label}>
                <svg className="amenity-icon" viewBox="0 0 24 24">
                  <path d="M3 21h18M3 10h18M5 6h14a2 2 0 012 2v2H3V8a2 2 0 012-2z" />
                </svg>
                <span className="small-caps">{label}</span>
              </div>
            ))}
          </div>
          <div className="booking-layout fade-in">
            <div className="tarifs-card">
              <h3>Tarifs & Conditions</h3>
              <div className="tarif-row">
                <span>Nuit (Semaine)</span>
                <strong>200 €</strong>
              </div>
              <div className="tarif-row">
                <span>Nuit (Ven, Sam, Dim)</span>
                <strong>250 €</strong>
              </div>
              <div className="tarif-row">
                <span>Caution</span>
                <strong>150 €</strong>
              </div>
              <div style={{ marginTop: 24, fontSize: 14, color: 'var(--ct-roche)' }}>
                <p>Check-in : 16h00</p>
                <p>Check-out : 13h00</p>
                <p style={{ marginTop: 8 }}>
                  <em>Animaux acceptés sous conditions.</em>
                </p>
              </div>
            </div>
            <div className="smoobu-placeholder" id="booking-placeholder">
              <div className="placeholder-content">
                <h3>Calendrier de disponibilités</h3>
                <p style={{ marginBottom: 24 }}>Vérification des dates en temps réel</p>
                <span className="btn btn-secondary" style={{ pointerEvents: 'none' }}>
                  Intégration Smoobu bientôt active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evenements" className="evenements">
        <div className="container event-layout">
          <div className="fade-in">
            <h2>Célébrer en privé</h2>
            <p className="editorial-text">
              Cueva Thalía peut accueillir certains événements privés sur demande. Chaque projet est étudié avec soin
              pour préserver le calme, l&apos;atmosphère et le respect du lieu.
            </p>
            <div className="tags-container">
              {[
                'Anniversaires',
                'Célébrations',
                'Shootings photo',
                'Petits mariages',
                'Privatisations',
                'Soirées intimistes',
                'Cérémonies',
              ].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/evenements-prives" className="card-link" style={{ marginTop: 24, display: 'inline-block' }}>
              En savoir plus sur les événements →
            </Link>
          </div>
          <InlineForm
            formId="events-form"
            confirmationId="event-confirmation"
            action="/api/forms/event"
            submitLabel="Envoyer ma demande"
            confirmationText="✓ Merci pour votre demande. Nous reviendrons rapidement avec une réponse personnelle."
          >
            <div className="form-group">
              <label htmlFor="event-name">Prénom et nom *</label>
              <input type="text" id="event-name" name="name" required placeholder="Votre nom complet" />
            </div>
            <div className="form-group">
              <label htmlFor="event-email">Email *</label>
              <input type="email" id="event-email" name="email" required placeholder="votre@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="event-type">Type d&apos;événement *</label>
              <select id="event-type" name="type" required defaultValue="">
                <option value="">Sélectionner...</option>
                <option value="anniversaire">Anniversaire</option>
                <option value="celebration">Célébration</option>
                <option value="shooting">Shooting photo</option>
                <option value="mariage">Petit mariage</option>
                <option value="privatisation">Privatisation</option>
                <option value="ceremonie">Cérémonie</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="event-date">Date souhaitée *</label>
                <input type="date" id="event-date" name="date" required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="event-guests">Personnes *</label>
                <input type="number" id="event-guests" name="guests" min={1} max={20} required placeholder="Ex: 4" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="event-message">Message détaillé *</label>
              <textarea id="event-message" name="message" rows={4} required placeholder="Parlez-nous de votre projet..." />
            </div>
          </InlineForm>
        </div>
      </section>

      <section id="workshops" className="workshops">
        <div className="container event-layout">
          <div className="fade-in" style={{ order: 1 }}>
            <h2>Créer une retraite, un atelier, un moment de transmission</h2>
            <p className="editorial-text">
              Le lieu peut accueillir des formats intimistes. Demande uniquement sur projet, chaque workshop est
              personnalisé et pensé pour l&apos;atmosphère de la cueva.
            </p>
            <div className="tags-container">
              {[
                'Yoga',
                'Méditation',
                'Breathwork',
                'Sonothérapie',
                'Coaching',
                'Ateliers créatifs',
                'Soins bien-être',
                'Cercles de parole',
              ].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 40 }}>
              <Image
                src="/photos/optimized/046743a6-df86-4387-a7bf-b57f830e12c8.jpg"
                alt="Atelier Workshop"
                className="organic-shape"
                width={800}
                height={400}
                style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
              />
            </div>
            <Link href="/workshops-retraites" className="card-link" style={{ marginTop: 24, display: 'inline-block' }}>
              En savoir plus sur les workshops →
            </Link>
          </div>
          <InlineForm
            formId="workshops-form"
            confirmationId="workshop-confirmation"
            action="/api/forms/workshop"
            submitLabel="Envoyer le projet"
            confirmationText="✓ Merci pour votre projet. Nous vous recontacterons rapidement."
          >
            <div className="form-group">
              <label htmlFor="workshop-name">Prénom et nom *</label>
              <input type="text" id="workshop-name" name="name" required placeholder="Votre nom" />
            </div>
            <div className="form-group">
              <label htmlFor="workshop-email">Email *</label>
              <input type="email" id="workshop-email" name="email" required placeholder="votre@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="workshop-type">Type de workshop *</label>
              <select id="workshop-type" name="type" required defaultValue="">
                <option value="">Sélectionner...</option>
                <option value="yoga">Yoga</option>
                <option value="meditation">Méditation</option>
                <option value="breathwork">Breathwork</option>
                <option value="sonotherapie">Sonothérapie</option>
                <option value="coaching">Coaching</option>
                <option value="creative">Ateliers créatifs</option>
                <option value="wellbeing">Soins bien-être</option>
                <option value="circles">Cercles de parole</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="workshop-date">Date *</label>
                <input type="date" id="workshop-date" name="date" required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="workshop-participants">Participants *</label>
                <input
                  type="number"
                  id="workshop-participants"
                  name="participants"
                  min={1}
                  max={20}
                  required
                  placeholder="Ex: 8"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="workshop-message">Description du projet *</label>
              <textarea
                id="workshop-message"
                name="message"
                rows={4}
                required
                placeholder="Décrivez votre vision pour ce moment..."
              />
            </div>
          </InlineForm>
        </div>
      </section>

      <section id="galerie" className="galerie">
        <div className="container">
          <h2 className="fade-in" style={{ textAlign: 'center' }}>
            Galerie
          </h2>
          <div className="gallery-grid">
            {galleryCategories.map((cat) => (
              <Link key={cat.slug} href={`/galerie/${cat.slug}`} className="gallery-preview-link">
                <div
                  className="gallery-preview-image"
                  style={{ ['--h' as string]: cat.previewHeight } as React.CSSProperties}
                >
                  <div className="gallery-preview-image__clip">
                    <Image
                      src={galleryImagePath(cat.folder, cat.cover)}
                      alt={cat.title}
                      width={600}
                      height={450}
                      loading="lazy"
                    />
                  </div>
                  <span className="gallery-label">{cat.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="avis" className="avis">
        <div className="container">
          <div className="avis-grid">
            {[
              { text: 'Les photos ne lui rendent vraiment pas justice. Je n\'ai jamais été aussi détendue.', author: 'Emma', delay: undefined },
              { text: 'La grotte de Manon est magnifique, un endroit magique avec sa piscine incroyable.', author: 'Caroline', delay: '100ms' },
              { text: 'L\'expérience la plus incroyable… la sensation d\'être dans le spa chauffé avec un verre de vin blanc de Tenerife.', author: 'Jesper', delay: '200ms' },
              { text: 'La grotte était unique, magnifiquement éclairée et avait une atmosphère incroyable.', author: 'Michal', delay: '300ms' },
            ].map((review) => (
              <div className="avis-card fade-in" key={review.author} style={review.delay ? { transitionDelay: review.delay } : undefined}>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="avis-text">&ldquo;{review.text}&rdquo;</p>
                <p className="small-caps avis-author">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="localisation" className="localisation">
        <div className="container loc-layout">
          <div className="fade-in">
            <h2>Autour de la cueva</h2>
            <p className="editorial-text" style={{ marginBottom: 40 }}>
              Cueva Thalía se situe à San Miguel de Abona, dans un environnement calme, tout en restant proche des
              plages, restaurants, villages et lieux emblématiques du sud de Tenerife.
            </p>
            <ul className="distances-list">
              {[
                ['Aéroport Tenerife Sud', '15-20 min'],
                ['El Médano', '15 min'],
                ['La Tejita', '15 min'],
                ['Los Cristianos', '20 min'],
                ['Siam Park', '20 min'],
                ['Playa de Las Américas', '20-25 min'],
                ['Costa Adeje', '25 min'],
                ['Teide', '45 min - 1h'],
              ].map(([place, time]) => (
                <li className="distance-item" key={place}>
                  <span>{place}</span>
                  <span className="small-caps">{time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fade-in map-stylisee">
            <div className="marker" />
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="fade-in" style={{ textAlign: 'center' }}>
            Réservez votre parenthèse
          </h2>
          <p className="editorial-text fade-in" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
            Pour un séjour, un événement ou une retraite, écrivez-nous. Chaque demande reçoit une réponse personnelle.
          </p>
          <div className="contact-methods">
            <div className="contact-card fade-in">
              <svg className="card-icon" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18" />
              </svg>
              <h3>Réservation directe</h3>
              <p>Calendrier de disponibilités</p>
              <a href="#sejour" className="btn btn-secondary">
                Vérifier les disponibilités
              </a>
            </div>
            <div className="contact-card fade-in" style={{ transitionDelay: '100ms' }}>
              <svg className="card-icon" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
              <h3>WhatsApp</h3>
              <p>+34 657 077 910</p>
              <a href="https://wa.me/34657077910" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Écrivez-nous
              </a>
            </div>
            <div className="contact-card fade-in" style={{ transitionDelay: '200ms' }}>
              <svg className="card-icon" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <h3>Email</h3>
              <p>contact@cueva-thalia.com</p>
              <Link href="/contact" className="btn btn-secondary">
                Envoyer un email
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
