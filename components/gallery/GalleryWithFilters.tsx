'use client';

import { useMemo, useState } from 'react';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Lightbox } from '@/components/site/Lightbox';
import { galleryImagePath, type GalleryUsageFilter } from '@/lib/gallery-data';

const galleryAspectRatios = ['4 / 3', '3 / 4', '16 / 10', '1 / 1', '4 / 3', '3 / 4'] as const;

export type GalleryCategoryWithImages = {
  slug: string;
  folder: string;
  usage: GalleryUsageFilter[];
  title: string;
  images: { filename: string; caption?: string }[];
};

type Props = {
  filters: { id: GalleryUsageFilter; label: string }[];
  allLabel: string;
  categories: GalleryCategoryWithImages[];
};

export function GalleryWithFilters({ filters, allLabel, categories }: Props) {
  const [active, setActive] = useState<GalleryUsageFilter | 'all'>('all');

  const visibleImages = useMemo(() => {
    const visibleCategories =
      active === 'all' ? categories : categories.filter((cat) => cat.usage.includes(active));

    return visibleCategories.flatMap((cat) =>
      cat.images.map((image, index) => ({
        key: `${cat.slug}-${image.filename}`,
        src: galleryImagePath(cat.folder, image.filename),
        alt: image.caption ?? cat.title,
        caption: image.caption,
        aspectRatio: galleryAspectRatios[index % galleryAspectRatios.length],
      }))
    );
  }, [active, categories]);

  return (
    <>
      <div className="gallery-filters" role="tablist" aria-label={allLabel}>
        <button
          type="button"
          role="tab"
          aria-selected={active === 'all'}
          className={`gallery-filter${active === 'all' ? ' is-active' : ''}`}
          onClick={() => setActive('all')}
        >
          {allLabel}
        </button>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={active === filter.id}
            className={`gallery-filter${active === filter.id ? ' is-active' : ''}`}
            onClick={() => setActive(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {visibleImages.map((image) => (
          <figure
            className="gallery-item"
            data-src={image.src}
            data-caption={image.caption ?? ''}
            key={image.key}
          >
            <MediaFrame
              src={image.src}
              alt={image.alt}
              aspectRatio={image.aspectRatio}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            {image.caption ? <figcaption className="gallery-item-caption">{image.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      <Lightbox key={active} />
    </>
  );
}
