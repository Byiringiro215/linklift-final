import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  className, 
  hover = false, 
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4',
        hover && 'hover:bg-white/20 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
