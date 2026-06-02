export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  // Placeholder pour générer la métadonnée SEO depuis un CMS ou data JSON local
  const title = slug.replace(/-/g, ' ');
  return {
    title: `${title} | Cueva Thalía`,
  };
}

export default function ArticlePage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div className="bg-ct-blanc-casse min-h-screen text-ct-brun-chaud pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-ct-terracotta">Journal</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>
        </header>

        <div className="prose prose-lg prose-p:font-sans prose-p:leading-loose prose-ct-brun-chaud mx-auto">
          <p>
            Ceci est un article générique pour le slug : <strong>{slug}</strong>.
          </p>
          <p>
            {`// TODO: Remplacer ce contenu par le vrai contenu SEO (ex. depuis un CMS ou un dossier de fichiers Markdown).`}
          </p>
          <h2>Introduction</h2>
          <p>
            La cueva est un endroit exceptionnel à Tenerife, idéal pour se ressourcer. Le reste du contenu sera défini ultérieurement.
          </p>
        </div>
      </article>
    </div>
  );
}
