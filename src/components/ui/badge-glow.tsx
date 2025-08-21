import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BadgeGlow: React.FC<BadgeGlowProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium',
        'bg-gradient-to-r from-blue-500/20 to-green-500/20',
        'border border-blue-500/30 text-blue-700',
        'shadow-lg shadow-blue-500/25',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
