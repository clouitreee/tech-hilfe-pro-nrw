// MANUS: Implementación solicitada
"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * MotionProvider Component
 * 
 * Respektiert die Systempräferenz des Nutzers für reduzierte Bewegungen.
 * Wenn prefers-reduced-motion aktiviert ist, werden alle Animationen deaktiviert.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}

