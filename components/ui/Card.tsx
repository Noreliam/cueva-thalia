import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'sable' | 'blanc-casse' | 'transparent';
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'blanc-casse', hoverEffect = true, children, ...props }, ref) => {
    
    const variants = {
      'sable': 'bg-[var(--color-sable)]',
      'blanc-casse': 'bg-[var(--color-blanc-casse)]',
      'transparent': 'bg-transparent'
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded p-6 md:p-8 shadow-[var(--shadow-warm-sm)] transition-all duration-300",
          variants[variant],
          hoverEffect && "hover:shadow-[var(--shadow-warm-lg)] group",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
