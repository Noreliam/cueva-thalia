export type GalleryUsageFilter =
  | 'sejour'
  | 'piscine'
  | 'evenements'
  | 'retraites'
  | 'couchages'
  | 'exterieurs';

export type GalleryCategory = {
  slug: string;
  folder: string;
  title: string;
  cover: string;
  previewHeight: string;
  images: string[];
  usage: GalleryUsageFilter[];
};

export const galleryUsageFilters: GalleryUsageFilter[] = [
  'sejour',
  'piscine',
  'evenements',
  'retraites',
  'couchages',
  'exterieurs',
];

export const galleryCategories: GalleryCategory[] = [
  {
    slug: 'interieur',
    folder: 'linterieur',
    title: "L'intérieur",
    cover: 'photocouverture1.jpg',
    previewHeight: '300px',
    usage: ['sejour', 'retraites'],
    images: [
      '07323535-e635-47df-aaaa-bfbece8b1a51.jpg',
      '19e4e246-c266-436b-839c-f1490f335b02.jpg',
      '2a8ed41c-5766-4ef8-8faf-0a8103d9fc33.jpg',
      '3a26b397-6aab-458b-9f2d-5861af50f018.jpg',
      '3f67cf1b-2dc0-4b51-815f-110199f98999.jpg',
      '47ccd388-49e1-4045-b1cf-3fabbe8cf5da.jpg',
      '508f39ea-f386-466c-90aa-7e711b853b6b.jpg',
      '630dae8f-0713-4823-a054-72cb3135f3ac.jpg',
      '7fa30f2e-b407-47b7-b5c2-7ae8905a6380.jpg',
      '9f057807-6170-4e7c-8c9d-ba1b8a2ae51f.jpg',
      'f053cc96-b9af-4ff3-a8e5-1155976cecd9.jpg',
    ],
  },
  {
    slug: 'piscine',
    folder: 'piscine',
    title: 'La Piscine',
    cover: 'photocouverture2.jpg',
    previewHeight: '450px',
    usage: ['piscine', 'sejour'],
    images: [
      '0e63d984-5365-4a62-8c28-abcd64dd6ff2.jpg',
      '1a57aa06-d87c-4d59-88a2-1b14d5132ee9.jpg',
      '4c8be500-7d15-4958-a5df-94e614ff3556.jpg',
      '724d49d9-be81-49cf-bf1a-e988c9f9751d.jpg',
      '7dd929bc-bd9d-4dcc-a1df-ce70a19aade5.jpg',
      '88cf8e3d-cf2f-4592-99e9-a3a2a8d38301.jpg',
    ],
  },
  {
    slug: 'chambre',
    folder: 'chambre',
    title: 'La Chambre',
    cover: 'photocouverture6.jpg',
    previewHeight: '280px',
    usage: ['sejour', 'couchages'],
    images: [
      '00c6b3a1-cb5b-450f-8b26-2f18ee6060d9.jpg',
      '3b68801f-c435-404c-b1d6-e6c598cc4fec.jpg',
      '8cd211ea-ed2c-40ef-894d-8d1525b4b942.jpg',
    ],
  },
  {
    slug: 'jardin',
    folder: 'jardin',
    title: 'Le Jardin',
    cover: 'photocouverture3.jpg',
    previewHeight: '350px',
    usage: ['exterieurs', 'evenements', 'retraites'],
    images: [
      '13ff2f8f-b029-4de9-bb0d-7a6e4bf3d78f.jpg',
      '3c3975ad-1f67-4348-b99b-b16687c5bf83.jpg',
      '3e8abdbd-5f78-4995-9b90-c36f78a14c9b.jpg',
      '4f8606ce-87bf-4cba-bc78-f61193496fec.jpg',
      '5040eab7-80f6-40ad-98b5-9e6f6791956e.jpg',
      '68edf690-fda4-4882-90b0-9e9ddedd4537.jpg',
    ],
  },
  {
    slug: 'details',
    folder: 'details',
    title: 'Les Détails',
    cover: 'photocouverture4.jpg',
    previewHeight: '400px',
    usage: ['sejour', 'evenements'],
    images: [
      '2a1e9953-da90-4daf-8484-459b906c097d.jpg',
      '42db2747-6c14-4d38-91c6-8362929f919f.jpg',
      '5980642b-b86b-4a22-b5ed-6b2c9a2c22b3.jpg',
      '74da670a-11c5-4d11-b7ac-aeab0fa62db1.jpg',
      '9f68c908-512e-49ec-89c1-b52b7f874676.jpg',
      'f5ed66cc-fb76-43df-9efe-cf57e97a99c7.jpg',
      'f6e69136-817c-4ab7-8c11-5a9f19fee937.jpg',
    ],
  },
  {
    slug: 'cuisine',
    folder: 'cuisine',
    title: 'La Cuisine',
    cover: 'photocouverture5.jpg',
    previewHeight: '320px',
    usage: ['sejour', 'couchages'],
    images: [
      '4ea91422-08b0-4825-bf6e-dbc4db725c49.jpg',
      '72d0fdd3-e736-4f71-bb09-83d8cfdcf45a.jpg',
      'c0fe805d-84d5-4be3-985b-493b94a6c5a4.jpg',
    ],
  },
];

export function getGalleryBySlug(slug: string) {
  return galleryCategories.find((g) => g.slug === slug);
}

export function galleryImagePath(folder: string, filename: string) {
  return `/photos/optimized/galleries/${folder}/${filename}`;
}
