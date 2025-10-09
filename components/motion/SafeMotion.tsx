// MANUS: Implementación solicitada - Safe Motion components con kill-switch
"use client";
import { motion } from "framer-motion";
import { DISABLE_ANIM } from "@/lib/flags";
import type { ComponentProps } from "react";

type MotionDivProps = ComponentProps<typeof motion.div>;
type MotionSectionProps = ComponentProps<typeof motion.section>;
type MotionArticleProps = ComponentProps<typeof motion.article>;
type MotionHeaderProps = ComponentProps<typeof motion.header>;
type MotionFooterProps = ComponentProps<typeof motion.footer>;

export const SafeDiv = (props: MotionDivProps) => 
  DISABLE_ANIM ? <div {...props as any} /> : <motion.div {...props} />;

export const SafeSection = (props: MotionSectionProps) => 
  DISABLE_ANIM ? <section {...props as any} /> : <motion.section {...props} />;

export const SafeArticle = (props: MotionArticleProps) => 
  DISABLE_ANIM ? <article {...props as any} /> : <motion.article {...props} />;

export const SafeHeader = (props: MotionHeaderProps) => 
  DISABLE_ANIM ? <header {...props as any} /> : <motion.header {...props} />;

export const SafeFooter = (props: MotionFooterProps) => 
  DISABLE_ANIM ? <footer {...props as any} /> : <motion.footer {...props} />;

