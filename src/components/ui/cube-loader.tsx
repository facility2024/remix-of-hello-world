import { useEffect, useState } from "react";

export function CubeLoader({ duration = 4000, onComplete }: { duration?: number; onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a1a]">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Cube */}
      <div className="relative" style={{ perspective: "600px", width: 120, height: 120 }}>
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            animation: "cubeRotate 3s linear infinite",
          }}
        >
          {/* Cube faces */}
          {[
            { transform: "translateZ(60px)", bg: "rgba(0,255,255,0.12)", border: "rgba(0,255,255,0.6)" },
            { transform: "rotateY(180deg) translateZ(60px)", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.6)" },
            { transform: "rotateY(90deg) translateZ(60px)", bg: "rgba(0,255,255,0.12)", border: "rgba(0,255,255,0.6)" },
            { transform: "rotateY(-90deg) translateZ(60px)", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.6)" },
            { transform: "rotateX(90deg) translateZ(60px)", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.6)" },
            { transform: "rotateX(-90deg) translateZ(60px)", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.6)" },
          ].map((face, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: 120,
                height: 120,
                transform: face.transform,
                background: face.bg,
                border: `1.5px solid ${face.border}`,
                boxShadow: `0 0 20px ${face.border}, inset 0 0 20px ${face.bg}`,
                animation: "breathe 2s ease-in-out infinite",
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}

          {/* Energy core */}
          <div
            className="absolute rounded-full"
            style={{
              width: 20,
              height: 20,
              top: 50,
              left: 50,
              transform: "translateZ(0)",
              background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(0,255,255,0.6), transparent)",
              boxShadow: "0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(139,92,246,0.4)",
              animation: "pulse-core 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <h2
        className="mt-10 text-sm font-bold tracking-[0.35em] uppercase"
        style={{ color: "rgba(0,255,255,0.9)", textShadow: "0 0 20px rgba(0,255,255,0.5)" }}
      >
        Carregando
      </h2>
      <p className="mt-2 text-xs text-gray-400">Preparando sua experiência, aguarde...</p>

      {/* Progress bar */}
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, rgba(0,255,255,0.8), rgba(139,92,246,0.8))",
            boxShadow: "0 0 10px rgba(0,255,255,0.6)",
          }}
        />
      </div>

      <style>{`
        @keyframes cubeRotate {
          0% { transform: rotateX(-20deg) rotateY(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes pulse-core {
          0%, 100% { transform: translateZ(0) scale(1); opacity: 0.8; }
          50% { transform: translateZ(0) scale(1.3); opacity: 1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
