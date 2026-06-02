import { Link } from '@/i18n/routing';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-sable)] text-[var(--color-brun-chaud)] pt-24 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-16">
        {/* Colonne 1 : Logo & Baseline */}
        <div className="col-span-1">
          <h3 className="font-cormorant text-4xl mb-4 italic">Cueva Thalía</h3>
          <p className="font-sans text-sm tracking-wide opacity-80 max-w-sm leading-relaxed">
            Une parenthèse au sud de Tenerife. L'expérience d'un lieu hors du temps taillé dans la roche volcanique.
          </p>
        </div>

        {/* Colonne 2 : Navigation */}
        <div className="col-span-1 md:mx-auto">
          <ul className="space-y-4 font-sans text-sm uppercase tracking-[0.1em]">
            <li><Link href="/sejourner" className="hover:text-[var(--color-terracotta)] transition-colors">Séjourner</Link></li>
            <li><Link href="/evenements-prives" className="hover:text-[var(--color-terracotta)] transition-colors">Événements privés</Link></li>
            <li><Link href="/workshops-retraites" className="hover:text-[var(--color-terracotta)] transition-colors">Workshops & Retraites</Link></li>
            <li><Link href="/galerie" className="hover:text-[var(--color-terracotta)] transition-colors">Galerie</Link></li>
            <li><Link href="/histoire" className="hover:text-[var(--color-terracotta)] transition-colors">Histoire</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-terracotta)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Contact & Réseaux */}
        <div className="col-span-1 md:text-right flex flex-col md:items-end">
          <div className="space-y-2 font-sans text-sm opacity-80 mb-8">
            <p>Calle Las Morales 70</p>
            <p>38620 San Miguel de Abona, Tenerife</p>
            <p className="mt-4"><a href="https://wa.me/34657077910" className="hover:text-[var(--color-terracotta)] transition-colors">+34 657 077 910 (WhatsApp)</a></p>
            <p><a href="mailto:contact@cueva-thalia.com" className="hover:text-[var(--color-terracotta)] transition-colors">contact@cueva-thalia.com</a></p>
          </div>
          <div className="flex gap-6 mt-auto">
            <a href="#" className="hover:text-[var(--color-terracotta)] transition-colors" aria-label="Instagram">
              IG
            </a>
            <a href="#" className="hover:text-[var(--color-terracotta)] transition-colors" aria-label="Facebook">
              FB
            </a>
          </div>
        </div>
      </div>
      
      {/* Ligne de séparation très fine */}
      <div className="h-[1px] w-full bg-[var(--color-brun-chaud)] opacity-10 mb-8 max-w-7xl mx-auto" />

      {/* Mentions légales & Sélecteur de langue */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-sans tracking-wide opacity-60 gap-4">
        <div className="flex flex-wrap justify-center gap-2 text-center">
          <span>© {new Date().getFullYear()} Cueva Thalía</span>
          <span>·</span>
          <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
          <span>·</span>
          <Link href="/confidentialite" className="hover:underline">Politique de confidentialité</Link>
          <span>·</span>
          <Link href="/cgv" className="hover:underline">CGV</Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/es" className="hover:text-[var(--color-terracotta)] transition-colors">ES</Link>
          <span>·</span>
          <Link href="/fr" className="hover:text-[var(--color-terracotta)] transition-colors font-medium">FR</Link>
          <span>·</span>
          <Link href="/en" className="hover:text-[var(--color-terracotta)] transition-colors">EN</Link>
        </div>
      </div>
    </footer>
  );
}
