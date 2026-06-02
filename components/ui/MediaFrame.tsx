import Image from 'next/image';
import { cn } from '@/lib/utils';

type MediaFrameProps = {
  src: string;
  alt: string;
  aspectRatio?: string;
  organic?: boolean;
  fit?: 'cover' | 'contain';
  fillParent?: boolean;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  hoverZoom?: boolean;
};

export function MediaFrame({
  src,
  alt,
  aspectRatio = '4 / 3',
  organic = true,
  fit = 'cover',
  fillParent = false,
  className,
  imageClassName,
  priority,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  hoverZoom = false,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        'media-frame',
        organic && 'organic-shape',
        hoverZoom && 'media-frame--zoom',
        fillParent && 'media-frame--fill',
        className
      )}
      style={fillParent ? undefined : { aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          'media-frame__img',
          fit === 'contain' && 'media-frame__img--contain',
          imageClassName
        )}
      />
    </div>
  );
}
