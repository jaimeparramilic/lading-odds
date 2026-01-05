import React from 'react';

type PillProps = {
  children: React.ReactNode;
  className?: string; // Ahora es opcional y aceptado
};

export const Pill = ({ children, className = '' }: PillProps) => (
  // Combinamos las clases base con las que le pasemos (className)
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${className}`}>
    {children}
  </span>
);