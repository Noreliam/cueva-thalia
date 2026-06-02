import { Link } from '@/i18n/routing';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image / Placeholder */}
      <div className="absolute inset-0 bg-[var(--color-dune)] z-0 flex items-center justify-center">
        {/* Placeholder image layer */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <p className="text-white/50 font-sans tracking-widest uppercase z-0">
          [Image Placeholder: Grotte / Piscine]
        </p>
      </div>

      <div className="relative z-20 text-center px-6 flex flex-col items-center max-w-4xl">
        <span className="text-white/80 uppercase tracking-[0.3em] text-sm mb-6 font-sans">
          San Miguel de Abona, Tenerife
        </span>
        <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          Une cueva privée, <br/> hors du temps.
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-sans max-w-2xl mb-10">
          L'expérience d'un lieu rare entre minéralité absolue et eau chauffée, pensé pour ralentir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/sejourner"
            className="px-8 py-4 bg-[var(--color-terracotta)] text-white uppercase tracking-widest text-sm hover:bg-[#a04e2e] transition-colors"
          >
            Vérifier les disponibilités
          </Link>
          <a
            href="https://wa.me/34657077910"
            className="px-8 py-4 bg-transparent border border-white text-white uppercase tracking-widest text-sm hover:bg-white hover:text-[var(--color-brun-chaud)] transition-colors"
          >
            Contact WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
