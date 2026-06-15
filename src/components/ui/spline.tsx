"use client";

import { useEffect, useRef, useState, useCallback, type ComponentType } from "react";
import { motion } from "framer-motion";

type SplineComponent = ComponentType<{ scene: string; className?: string }>;

function SplineScene({
  scene,
  className = "",
}: {
  scene: string;
  className?: string;
}) {
  const [Spline, setSpline] = useState<SplineComponent | null>(null);

  useEffect(() => {
    let mounted = true;

    import("@splinetool/react-spline").then((module) => {
      if (mounted) {
        setSpline(() => module.default as SplineComponent);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!Spline) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
      </div>
    );
  }

  return (
    <Spline scene={scene} className={className} />
  );
}

export function SplineHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden"
      style={{ background: "#000000", minHeight: "clamp(300px, 50vh, 700px)" }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute z-10 rounded-full"
        animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

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
            3D Interativo
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
            Dê vida à sua interface com belas cenas 3D. Crie experiências
            imersivas que capturam a atenção e aprimoram seu design.
          </p>
        </motion.div>

        {/* Right 3D scene */}
        <motion.div
          className="relative flex flex-1 items-center justify-center"
          style={{ minHeight: "clamp(250px, 35vh, 500px)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        >
          <div className="h-full w-full" style={{ minHeight: "inherit", transform: "scale(1.3)", transformOrigin: "center center" }}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to white (page bg) */}
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

export default SplineScene;
