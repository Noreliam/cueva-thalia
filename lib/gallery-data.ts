import manifest from './gallery-manifest.json';

export type GalleryUsageFilter =
  | 'sejour'
  | 'cuisine'
  | 'atelier'
  | 'piscine'
  | 'jardin'
  | 'chambre'
  | 'details';

export type GalleryImage = {
  filename: string;
  captionKey?: string;
};

export type GalleryCategory = {
  slug: string;
  folder: string;
  title: string;
  cover: string;
  previewAspectRatio: string;
  images: GalleryImage[];
  usage: GalleryUsageFilter[];
};

export const galleryUsageFilters: GalleryUsageFilter[] = [
  'sejour',
  'cuisine',
  'atelier',
  'piscine',
  'jardin',
  'chambre',
  'details',
];

const previewAspectRatios = ['4 / 3', '3 / 4', '16 / 10', '1 / 1', '4 / 3', '3 / 4', '4 / 3'] as const;

const imageCaptionKeys: Partial<Record<keyof typeof manifest, Record<string, string>>> = {
  chambre: {
    'img_3360.jpg': 'chambre_group_bedding',
  },
};

const categoryDefs: {
  slug: string;
  folder: keyof typeof manifest;
  title: string;
  usage: GalleryUsageFilter;
  cover?: string;
}[] = [
  { slug: 'sejour', folder: 'sejour', title: 'Le Séjour', usage: 'sejour' },
  { slug: 'cuisine', folder: 'cuisine', title: 'La Cuisine', usage: 'cuisine' },
  { slug: 'atelier', folder: 'atelier', title: "L'Atelier", usage: 'atelier', cover: 'img_9768.jpg' },
  { slug: 'piscine', folder: 'piscine', title: 'La Piscine', usage: 'piscine' },
  { slug: 'jardin', folder: 'jardin', title: 'Le Jardin', usage: 'jardin' },
  { slug: 'chambre', folder: 'chambre', title: 'La Chambre', usage: 'chambre' },
  { slug: 'details', folder: 'details', title: 'Les Détails', usage: 'details' },
];

function buildImages(folder: keyof typeof manifest): GalleryImage[] {
  const captions = imageCaptionKeys[folder] ?? {};
  return manifest[folder].images.map((filename) => ({
    filename,
    captionKey: captions[filename],
  }));
}

export const galleryCategories: GalleryCategory[] = categoryDefs.map((def, index) => {
  const data = manifest[def.folder];
  return {
    slug: def.slug,
    folder: def.folder,
    title: def.title,
    cover: def.cover ?? data.cover,
    previewAspectRatio: previewAspectRatios[index % previewAspectRatios.length],
    images: buildImages(def.folder),
    usage: [def.usage],
  };
});

export function getGalleryBySlug(slug: string) {
  return galleryCategories.find((g) => g.slug === slug);
}

export function galleryImagePath(folder: string, filename: string) {
  return `/photos/optimized/galleries/${folder}/${filename}`;
}
