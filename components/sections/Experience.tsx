export default function Experience() {
  return (
    <section className="py-24 bg-[var(--color-sable)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-cormorant text-4xl md:text-5xl text-[var(--color-brun-chaud)] leading-tight">
              La roche brute,<br/>l'eau chauffée,<br/>le silence.
            </h2>
            <p className="font-sans text-[var(--color-brun-chaud)] opacity-80 leading-relaxed text-lg">
              Cueva Thalía n'est pas une simple maison. C'est un refuge préservé où le temps s'arrête. 
              Une grotte naturelle abritant une piscine intérieure privée et chauffée, offrant une sensation de privacité absolue.
            </p>
            <p className="font-sans text-[var(--color-brun-chaud)] opacity-80 leading-relaxed text-lg">
              Ici, il n'y a aucun espace partagé. Chaque réservation vous garantit l'usage exclusif de la grotte, de la piscine, 
              et des jardins tropicaux. Un véritable cocon pour se retrouver, déconnecter et s'émerveiller.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l border-[var(--color-terracotta)] pl-4">
                <span className="block font-cormorant text-3xl mb-1 text-[var(--color-brun-chaud)]">100%</span>
                <span className="font-sans text-sm uppercase tracking-widest opacity-70">Privatif</span>
              </div>
              <div className="border-l border-[var(--color-terracotta)] pl-4">
                <span className="block font-cormorant text-3xl mb-1 text-[var(--color-brun-chaud)]">28°C</span>
                <span className="font-sans text-sm uppercase tracking-widest opacity-70">Eau Chauffée</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[600px] w-full bg-[var(--color-dune)] overflow-hidden shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center text-white/50 tracking-widest uppercase">
                [Image: Piscine Intérieure]
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
