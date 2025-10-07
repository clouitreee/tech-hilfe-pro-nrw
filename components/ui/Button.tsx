'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent-dark hover:shadow-glow-accent focus:ring-accent disabled:bg-neutral-300 disabled:cursor-not-allowed',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark hover:shadow-glow focus:ring-secondary disabled:bg-neutral-300 disabled:cursor-not-allowed',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:border-neutral-300 disabled:text-neutral-300 disabled:cursor-not-allowed',
    ghost: 'text-primary hover:bg-neutral-50 focus:ring-primary disabled:text-neutral-300 disabled:cursor-not-allowed',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const MotionComponent = motion.button;

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionComponent
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </MotionComponent>
  );
}
