import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OrganicImageProps extends Omit<ImageProps, 'className'> {
  containerClassName?: string;
  imageClassName?: string;
  radiusVariant?: 1 | 2 | 3;
  hoverZoom?: boolean;
  fit?: 'cover' | 'contain';
}

export const OrganicImage: React.FC<OrganicImageProps> = ({
  containerClassName,
  imageClassName,
  radiusVariant = 1,
  hoverZoom = true,
  fit = 'cover',
  alt,
  fill,
  ...props
}) => {
  const radiusStyles = {
    1: 'rounded-[var(--radius-organic-1)]',
    2: 'rounded-[var(--radius-organic-2)]',
    3: 'rounded-[var(--radius-organic-3)]',
  };

  return (
    <div
      className={cn(
        'media-frame relative overflow-hidden shadow-[var(--shadow-warm-md)]',
        radiusStyles[radiusVariant],
        hoverZoom && 'media-frame--zoom',
        containerClassName
      )}
    >
      <Image
        alt={alt}
        fill={fill ?? true}
        className={cn(
          'media-frame__img',
          fit === 'contain' && 'media-frame__img--contain',
          hoverZoom && 'transition-transform duration-[600ms] ease-out group-hover:scale-105 hover:scale-105',
          imageClassName
        )}
        {...props}
      />
    </div>
  );
};
