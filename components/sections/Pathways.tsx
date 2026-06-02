import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export default function Pathways() {
  const pathways = [
    {
      title: 'Séjourner',
      desc: 'Une évasion intime pour se retrouver. Nuitée classique avec accès exclusif à tous les espaces.',
      href: '/sejourner'
    },
    {
      title: 'Événements Privés',
      desc: 'Célébrations intimes, shootings photos, anniversaires. Un cadre unique pour vos moments rares.',
      href: '/evenements-prives'
    },
    {
      title: 'Workshops & Retraites',
      desc: 'Yoga, méditation, sonothérapie. Un espace vibratoire pensé pour la connexion et le bien-être.',
      href: '/workshops-retraites'
    }
  ];

  return (
    <section className="py-24 bg-[var(--color-blanc-casse)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-cormorant text-4xl md:text-5xl text-[var(--color-brun-chaud)] mb-4">
            Choisissez votre expérience
          </h2>
          <div className="w-12 h-0.5 bg-[var(--color-terracotta)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pathways.map((path, idx) => (
            <Link 
              key={idx} 
              href={path.href as any}
              className="group block relative overflow-hidden bg-[var(--color-sable)] hover:shadow-xl transition-all duration-500 h-[400px]"
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10"></div>
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs tracking-widest uppercase z-0">
                [Image: {path.title}]
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-[var(--color-brun-chaud)]/80 to-transparent flex flex-col justify-end h-1/2">
                <h3 className="font-cormorant text-3xl text-white mb-2">{path.title}</h3>
                <p className="font-sans text-white/80 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {path.desc}
                </p>
                <div className="flex items-center text-white font-sans uppercase tracking-widest text-xs">
                  <span className="mr-2">Découvrir</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
