// MANUS: Implementación solicitada
// Zentrale Animations-Varianten für das gesamte Projekt

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0) => ({
  hidden: {
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
    x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    opacity: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.5,
      delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.6,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export const fadeInUp = (delay = 0) => fadeIn('up', delay);
export const fadeInDown = (delay = 0) => fadeIn('down', delay);
export const fadeInLeft = (delay = 0) => fadeIn('left', delay);
export const fadeInRight = (delay = 0) => fadeIn('right', delay);

export const scaleIn = (delay = 0) => ({
  hidden: {
    scale: 0.8,
    opacity: 0,
    transition: {
      type: 'tween' as const,
      duration: 0.5,
      delay,
    },
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween' as const,
      duration: 0.6,
      delay,
    },
  },
});

