import type { PropsWithChildren } from "react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}>;

export function Reveal({ children, className, delay = 0, from = "bottom" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const offset = from === "left" ? { x: -40 } : from === "right" ? { x: 40 } : { y: 40 };

  useEffect(() => {
    const timer = window.setTimeout(() => setFallbackVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={isInView || fallbackVisible ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
