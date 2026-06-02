import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import SmoobuWidget from '@/components/SmoobuWidget';
import { SiteClientEffects } from '@/components/site/SiteClientEffects';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Sejourner' });
  return {
    title: `${t('title')} — Location cueva privée Tenerife | Cueva Thalía`,
    description: t('seo_intro'),
  };
}

const amenities = ['amenity_bed', 'amenity_sofa', 'amenity_kitchen', 'amenity_bath', 'amenity_garden'] as const;
const faqKeys = ['1', '2', '3', '4'] as const;

export default async function SejournerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Sejourner' });

  return (
    <div className="seo-page">
      <SiteClientEffects />

      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.38)), url('/photos/optimized/7ea5a8c2-b48b-4a12-b7be-034ca90b0d8e.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
          <span className="small-caps hero-label">Tenerife · San Miguel de Abona</span>
          <h1>{t('hero_title')}</h1>
          <p className="editorial-text" style={{ maxWidth: 680, margin: '0 auto 28px' }}>{t('hero_subtitle')}</p>
          <a href="#reservation" className="btn btn-primary">{t('cta_check_availability')}</a>
        </div>
      </section>

      <section className="experience">
        <div className="container experience-grid">
          <div className="experience-text fade-in">
            <p className="editorial-text lettrine">{t('seo_intro')}</p>
            <p className="editorial-text" style={{ marginTop: 24 }}>{t('private_reminder')}</p>
          </div>
          <div className="experience-image-wrapper fade-in">
            <Image
              src="/photos/optimized/4c8be500-7d15-4958-a5df-94e614ff3556.jpg"
              alt="Piscine intérieure chauffée Cueva Thalía"
              width={800}
              height={600}
              className="organic-shape"
              style={{ height: 560, width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="trois-facons">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>{t('amenities_title')}</h2>
          <div className="amenities-grid fade-in" style={{ marginTop: 48 }}>
            {amenities.map((key) => (
              <div className="amenity-item" key={key}>
                <span className="small-caps">{t(key)}</span>
              </div>
            ))}
          </div>
          <h2 style={{ textAlign: 'center', marginTop: 80 }}>{t('included_title')}</h2>
          <div className="piscine-features" style={{ marginTop: 32, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            {[t('included_pool'), t('included_hydro'), t('included_garden'), t('included_bbq'), t('included_fire')].map(
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
        </div>
      </section>

      <section className="piscine">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>{t('options_title')}</h2>
          <div className="seo-options-grid">
            {[t('opt_romantic'), t('opt_surprise'), t('opt_massage'), t('opt_late_checkout')].map((opt) => (
              <div className="seo-option-card" key={opt}>
                <span>{opt}</span>
              </div>
            ))}
          </div>
          <p className="seo-reassurance editorial-text">{t('reassurance')}</p>
        </div>
      </section>

      <section className="sejourner" id="reservation">
        <div className="container">
          <div className="booking-layout fade-in">
            <div className="tarifs-card">
              <h3>{t('capacity_title')}</h3>
              <p className="editorial-text" style={{ marginBottom: 24 }}>{t('capacity_desc')}</p>
              <h3>{t('rates_title')}</h3>
              <div className="tarif-row"><span>Lun – Jeu</span><strong>{t('rate_week')}</strong></div>
              <div className="tarif-row"><span>Ven – Dim</span><strong>{t('rate_weekend')}</strong></div>
              <div className="tarif-row"><span>Caution</span><strong>150 €</strong></div>
              <p className="small-caps" style={{ marginTop: 24, color: 'var(--ct-roche)' }}>{t('checkin_checkout')}</p>
              <p style={{ marginTop: 12, fontSize: 14, color: 'var(--ct-roche)' }}><em>{t('animals_note')}</em></p>
            </div>
            <div className="smoobu-placeholder">
              <div className="placeholder-content">
                <h3>Calendrier de disponibilités</h3>
                <p style={{ marginBottom: 24 }}>Vérification des dates en temps réel</p>
                <SmoobuWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-faq">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>{t('faq_title')}</h2>
          <dl className="seo-faq-list">
            {faqKeys.map((n) => (
              <div className="seo-faq-item" key={n}>
                <dt>{t(`faq_q${n}`)}</dt>
                <dd>{t(`faq_a${n}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="avis">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: 48 }}>{t('avis_title')}</h2>
          <div className="avis-grid">
            {[
              { text: "Les photos ne lui rendent vraiment pas justice.", author: 'Emma' },
              { text: 'Un endroit magique avec sa piscine incroyable.', author: 'Caroline' },
            ].map((r) => (
              <div className="avis-card fade-in visible" key={r.author}>
                <p className="avis-text">&ldquo;{r.text}&rdquo;</p>
                <p className="small-caps avis-author">{r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" style={{ paddingBottom: 120 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="editorial-text" style={{ marginBottom: 24 }}>{t('gallery_cta')}</p>
          <div className="seo-bottom-links">
            <Link href="/galerie/piscine" className="card-link">La Piscine</Link>
            <Link href="/galerie/chambre" className="card-link">La Chambre</Link>
            <Link href="/galerie/jardin" className="card-link">Le Jardin</Link>
          </div>
          <Link href="/" className="btn btn-secondary" style={{ marginTop: 40 }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
