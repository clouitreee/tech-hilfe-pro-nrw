// MANUS: Implementación solicitada
"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, ReactNode } from "react";

type Props = { 
  variants: any; 
  children: ReactNode; 
  threshold?: number;
  className?: string;
};

/**
 * ReenterBlock Component
 * 
 * Ermöglicht saubere Re-Entry Animationen:
 * - Startet Animation beim Eintritt in den Viewport
 * - Setzt Animation auf "hidden" beim Verlassen zurück
 * - Ermöglicht reproduzierbare Animationen bei jedem Scroll-Durchgang
 */
export default function ReenterBlock({ 
  variants, 
  children, 
  threshold = 0.2,
  className = ""
}: Props) {
  const controls = useAnimationControls();
  const { ref, inView, entry } = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    } else if (entry) {
      controls.start("hidden");
    }
  }, [inView, entry, controls]);

  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={controls} 
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

