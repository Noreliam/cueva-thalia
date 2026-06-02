import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', href, fullWidth, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center transition-all duration-300";
    
    const variants = {
      primary: "bg-[var(--color-terracotta)] text-[var(--color-blanc-casse)] px-8 py-4 font-sans font-medium tracking-[0.05em] uppercase text-xs sm:text-sm rounded hover:bg-[var(--color-brun-chaud)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-warm-md)]",
      secondary: "border border-[var(--color-brun-chaud)] text-[var(--color-brun-chaud)] bg-transparent px-8 py-4 font-sans font-medium tracking-[0.05em] uppercase text-xs sm:text-sm rounded hover:bg-[var(--color-brun-chaud)] hover:text-[var(--color-sable)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-warm-sm)]",
      link: "text-[var(--color-brun-chaud)] underline underline-offset-4 decoration-[var(--color-brun-chaud)]/40 hover:decoration-[var(--color-brun-chaud)] hover:text-[var(--color-terracotta)]"
    };

    const classes = cn(baseStyles, variants[variant], fullWidth && "w-full", className);

    if (href) {
      return (
        <Link href={href as any} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
