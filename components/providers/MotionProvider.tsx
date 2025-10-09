// MANUS: Implementación solicitada - domMax statt domAnimation
"use client";

import { LazyMotion, domMax, MotionConfig, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * MotionProvider Component
 * 
 * - Verwendet LazyMotion mit domMax für optimale Performance
 * - Respektiert die Systempräferenz des Nutzers für reduzierte Bewegungen
 * - Wenn prefers-reduced-motion aktiviert ist, werden alle Animationen deaktiviert
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

