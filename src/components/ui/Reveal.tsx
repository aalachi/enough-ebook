"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/**
 * Soft upward fade-in on scroll. The initial/animate states are deterministic
 * (identical on server and client) to avoid hydration mismatches — only the
 * transition is varied for reduced motion, so it snaps in instantly instead.
 */
export function Reveal({ children, delay = 0, y = 24, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
