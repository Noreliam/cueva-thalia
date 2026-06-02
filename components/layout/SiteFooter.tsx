'use client';

import { Link } from '@/i18n/routing';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <span className="footer-logo">Cueva Thalía</span>
          <p style={{ marginBottom: 16 }} className="small-caps">
            L&apos;expérience d&apos;un lieu hors du temps
          </p>
          <p>
            Cueva Thalía est une maison troglodyte privée au sud de Tenerife. Un espace entièrement vôtre pour
            séjourner, célébrer ou se retrouver.
          </p>
        </div>

        <div>
          <h4>Navigation</h4>
          <ul>
            <li><Link href="/#sejour">Séjourner</Link></li>
            <li><Link href="/#evenements">Événements privés</Link></li>
            <li><Link href="/#workshops">Workshops & retraites</Link></li>
            <li><Link href="/#galerie">Galerie</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
            <li><Link href="/#sejour" style={{ color: 'var(--ct-terracotta)' }}>Réserver</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>Calle Las Morales 70</li>
            <li>38620 San Miguel de Abona</li>
            <li>Tenerife, Espagne</li>
            <li style={{ marginTop: 16 }}>
              <a href="https://wa.me/34657077910" target="_blank" rel="noopener noreferrer">
                +34 657 077 910
              </a>
            </li>
            <li>
              <a href="mailto:contact@cueva-thalia.com">contact@cueva-thalia.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Cueva Thalía. Tous droits réservés.</p>
          <div className="footer-bottom-links">
            <Link href="/mentions-legales">Mentions légales</Link>
            <span>·</span>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
            <span>·</span>
            <Link href="/conditions-generales">Conditions de réservation</Link>
            <span>·</span>
            <Link href="/politique-annulation">Politique d&apos;annulation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
