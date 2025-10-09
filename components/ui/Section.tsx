import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
}

/**
 * Section wrapper component for consistent vertical rhythm and spacing
 * Provides standard padding and max-width container
 */
export default function Section({ 
  children, 
  className = '', 
  id,
  as: Component = 'section' 
}: SectionProps) {
  return (
    <Component 
      id={id}
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 ${className}`}
    >
      {children}
    </Component>
  );
}

