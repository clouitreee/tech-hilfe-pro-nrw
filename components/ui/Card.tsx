'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  delay?: number;
}

export default function Card({ children, hover = true, className = '', delay = 0 }: CardProps) {
  if (hover) {
    return (
      <motion.div
        className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-soft ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
