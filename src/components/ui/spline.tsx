"use client";

import { motion } from "framer-motion";
import portraitAsset from "@/assets/facility-portrait.png.asset.json";

export function SplineHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #2a2a2c 0%, #1a1a1c 45%, #111113 100%)",
        minHeight: "clamp(300px, 50vh, 700px)",
      }}
    >
      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full min-h-[inherit] max-w-7xl flex-col items-center px-6 md:flex-row md:px-12">
        {/* Left text */}
        <motion.div
          className="flex flex-1 flex-col justify-center py-16 md:py-0 md:pr-12"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Agência Facility
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
            Presença de marca com identidade forte. Estratégia, design e
            performance para elevar o seu negócio ao próximo nível.
          </p>
        </motion.div>

        {/* Right portrait image */}
        <motion.div
          className="relative flex flex-1 items-center justify-center"
          style={{ minHeight: "clamp(250px, 35vh, 500px)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
        >
          <img
            src={portraitAsset.url}
            alt="Retrato Agência Facility"
            className="h-full max-h-[600px] w-auto object-contain"
            style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))" }}
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
        }}
      />
    </div>
  );
}

export default SplineHero;
