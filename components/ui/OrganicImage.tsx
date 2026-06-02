import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OrganicImageProps extends Omit<ImageProps, 'className'> {
  containerClassName?: string;
  imageClassName?: string;
  radiusVariant?: 1 | 2 | 3;
  hoverZoom?: boolean;
}

export const OrganicImage: React.FC<OrganicImageProps> = ({
  containerClassName,
  imageClassName,
  radiusVariant = 1,
  hoverZoom = true,
  alt,
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
        "relative overflow-hidden shadow-[var(--shadow-warm-md)]",
        radiusStyles[radiusVariant],
        containerClassName
      )}
    >
      <Image
        alt={alt}
        className={cn(
          "object-cover transition-transform duration-[600ms] ease-out",
          hoverZoom && "group-hover:scale-105 hover:scale-105",
          imageClassName
        )}
        {...props}
      />
    </div>
  );
};
