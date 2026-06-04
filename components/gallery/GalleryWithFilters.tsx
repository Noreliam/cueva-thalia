'use client';

import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { galleryImagePath, type GalleryUsageFilter } from '@/lib/gallery-data';

export type GalleryPreviewCategory = {
  slug: string;
  folder: string;
  cover: string;
  previewAspectRatio: string;
  usage: GalleryUsageFilter[];
  title: string;
};

type Props = {
  filters: { id: GalleryUsageFilter; label: string }[];
  allLabel: string;
  categories: GalleryPreviewCategory[];
};

export function GalleryWithFilters({ filters, allLabel, categories }: Props) {
  const [active, setActive] = useState<GalleryUsageFilter | 'all'>('all');

  const visible =
    active === 'all' ? categories : categories.filter((cat) => cat.usage.includes(active));

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
        {visible.map((cat) => (
          <Link key={cat.slug} href={`/galerie/${cat.slug}`} className="gallery-preview-link">
            <div
              className="gallery-preview-image"
              style={{ aspectRatio: cat.previewAspectRatio }}
            >
              <div className="gallery-preview-image__clip">
                <MediaFrame
                  src={galleryImagePath(cat.folder, cat.cover)}
                  alt={cat.title}
                  organic={false}
                  fillParent
                  className="gallery-preview-image__frame"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <span className="gallery-label">{cat.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
