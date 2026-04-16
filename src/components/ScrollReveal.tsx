import { motion, type Variant } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "left" | "right" | "up" | "fade";

const variants: Record<Direction, { hidden: Variant; visible: Variant }> = {
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  duration?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  duration = 0.6,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
