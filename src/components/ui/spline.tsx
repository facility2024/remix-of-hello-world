"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SplineHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        opacity,
        background:
          "radial-gradient(ellipse at center, #2a2a2c 0%, #1a1a1c 45%, #111113 100%)",
        height: "120px",
      }}
    >
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 md:px-12">
        <h2 className="text-lg font-bold leading-tight text-white md:text-xl">
          Agência Facility
        </h2>
        <p className="mt-1 max-w-2xl text-xs leading-snug text-gray-400 md:text-sm">
          Presença de marca com identidade forte. Estratégia, design e
          performance para elevar o seu negócio ao próximo nível.
        </p>
      </div>
    </motion.div>
  );
}

export default SplineHero;
