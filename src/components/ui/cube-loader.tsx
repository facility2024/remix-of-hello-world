import { useEffect, useState, useMemo, useRef } from "react";

export function CubeLoader({
  duration = 4000,
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    function tick() {
      const p = Math.min((performance.now() - start) / duration, 1);
      setProgress(p);
      if (p >= 1) {
        onCompleteRef.current?.();
      } else {
        raf = requestAnimationFrame(tick);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  // Stable random stars
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        w: 1 + ((i * 7 + 3) % 5) * 0.4,
        top: (i * 17 + 11) % 100,
        left: (i * 31 + 7) % 100,
        opacity: 0.1 + ((i * 13) % 5) * 0.1,
        dur: 2 + ((i * 11) % 4),
        delay: ((i * 3) % 20) * 0.1,
      })),
    [],
  );

  const SIZE = 140;
  const HALF = SIZE / 2;

  const faces = [
    // front
    { rx: 0, ry: 0, tz: HALF, color: "0,255,255" },
    // back
    { rx: 0, ry: 180, tz: HALF, color: "139,92,246" },
    // right
    { rx: 0, ry: 90, tz: HALF, color: "0,255,255" },
    // left
    { rx: 0, ry: -90, tz: HALF, color: "139,92,246" },
    // top
    { rx: 90, ry: 0, tz: HALF, color: "99,102,241" },
    // bottom
    { rx: -90, ry: 0, tz: HALF, color: "99,102,241" },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at center, #0d1030 0%, #060613 70%, #020208 100%)",
      }}
    >
      {/* Ambient glow behind cube */}
      <div
        className="absolute"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,255,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: s.w,
              height: s.w,
              top: `${s.top}%`,
              left: `${s.left}%`,
              background: "white",
              opacity: s.opacity,
              animation: `twinkle ${s.dur}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Cube Container */}
      <div style={{ perspective: "800px", width: SIZE, height: SIZE }} className="relative">
        <div
          style={{
            width: SIZE,
            height: SIZE,
            transformStyle: "preserve-3d",
            animation: "cubeRotate 4s linear infinite",
          }}
        >
          {faces.map((f, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: SIZE,
                height: SIZE,
                transform: `rotateX(${f.rx}deg) rotateY(${f.ry}deg) translateZ(${f.tz}px)`,
                background: `rgba(${f.color},0.06)`,
                border: `1.5px solid rgba(${f.color},0.5)`,
                boxShadow: `
                0 0 15px rgba(${f.color},0.3),
                0 0 40px rgba(${f.color},0.15),
                inset 0 0 30px rgba(${f.color},0.08)
              `,
                animation: `breathe 3s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                backdropFilter: "blur(2px)",
              }}
            >
              {/* Grid lines on face */}
              <svg
                width={SIZE}
                height={SIZE}
                className="absolute inset-0"
                style={{ opacity: 0.15 }}
              >
                <line
                  x1={SIZE / 3}
                  y1={0}
                  x2={SIZE / 3}
                  y2={SIZE}
                  stroke={`rgba(${f.color},0.8)`}
                  strokeWidth="0.5"
                />
                <line
                  x1={(SIZE * 2) / 3}
                  y1={0}
                  x2={(SIZE * 2) / 3}
                  y2={SIZE}
                  stroke={`rgba(${f.color},0.8)`}
                  strokeWidth="0.5"
                />
                <line
                  x1={0}
                  y1={SIZE / 3}
                  x2={SIZE}
                  y2={SIZE / 3}
                  stroke={`rgba(${f.color},0.8)`}
                  strokeWidth="0.5"
                />
                <line
                  x1={0}
                  y1={(SIZE * 2) / 3}
                  x2={SIZE}
                  y2={(SIZE * 2) / 3}
                  stroke={`rgba(${f.color},0.8)`}
                  strokeWidth="0.5"
                />
              </svg>
              {/* Corner accents */}
              <div
                className="absolute top-1 left-1 w-3 h-3"
                style={{
                  borderTop: `1px solid rgba(${f.color},0.8)`,
                  borderLeft: `1px solid rgba(${f.color},0.8)`,
                }}
              />
              <div
                className="absolute top-1 right-1 w-3 h-3"
                style={{
                  borderTop: `1px solid rgba(${f.color},0.8)`,
                  borderRight: `1px solid rgba(${f.color},0.8)`,
                }}
              />
              <div
                className="absolute bottom-1 left-1 w-3 h-3"
                style={{
                  borderBottom: `1px solid rgba(${f.color},0.8)`,
                  borderLeft: `1px solid rgba(${f.color},0.8)`,
                }}
              />
              <div
                className="absolute bottom-1 right-1 w-3 h-3"
                style={{
                  borderBottom: `1px solid rgba(${f.color},0.8)`,
                  borderRight: `1px solid rgba(${f.color},0.8)`,
                }}
              />
            </div>
          ))}

          {/* Energy core - centered inside the cube */}
          <div
            className="absolute"
            style={{
              width: 30,
              height: 30,
              top: SIZE / 2 - 15,
              left: SIZE / 2 - 15,
              transform: "translateZ(0)",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,255,255,0.8) 30%, rgba(139,92,246,0.4) 60%, transparent 80%)",
              boxShadow: `
              0 0 20px rgba(0,255,255,0.9),
              0 0 50px rgba(0,255,255,0.5),
              0 0 80px rgba(139,92,246,0.3)
            `,
              animation: "pulseCore 2s ease-in-out infinite",
            }}
          />

          {/* Orbital ring */}
          <div
            className="absolute"
            style={{
              width: SIZE * 0.6,
              height: SIZE * 0.6,
              top: SIZE / 2 - SIZE * 0.3,
              left: SIZE / 2 - SIZE * 0.3,
              transform: "translateZ(0) rotateX(70deg)",
              borderRadius: "50%",
              border: "1px solid rgba(0,255,255,0.2)",
              boxShadow: "0 0 15px rgba(0,255,255,0.15)",
              animation: "orbitSpin 3s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Scan line effect */}
      <div
        className="absolute"
        style={{
          width: SIZE + 40,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent)",
          animation: "scanLine 2s ease-in-out infinite",
          top: "calc(50% - 70px)",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Text */}
      <h2
        className="mt-12 text-sm font-bold uppercase"
        style={{
          letterSpacing: "0.35em",
          color: "rgba(0,255,255,0.9)",
          textShadow: "0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.2)",
        }}
      >
        Carregando
      </h2>
      <p className="mt-2 text-xs" style={{ color: "rgba(160,170,200,0.7)" }}>
        Preparando sua experiência, aguarde...
      </p>

      {/* Progress bar */}
      <div
        className="mt-6 h-[3px] w-52 overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background:
              "linear-gradient(90deg, rgba(0,255,255,0.9), rgba(139,92,246,0.9), rgba(0,255,255,0.9))",
            boxShadow: "0 0 12px rgba(0,255,255,0.6), 0 0 25px rgba(139,92,246,0.3)",
            transition: "width 0.1s linear",
          }}
        />
      </div>
      <p className="mt-2 text-[10px] font-mono" style={{ color: "rgba(0,255,255,0.5)" }}>
        {Math.round(progress * 100)}%
      </p>

      <style>{`
        @keyframes cubeRotate {
          0%   { transform: rotateX(-25deg) rotateY(0deg); }
          100% { transform: rotateX(-25deg) rotateY(360deg); }
        }
        @keyframes breathe {
          0%, 100% {
            opacity: 0.6;
            box-shadow:
              0 0 15px rgba(0,255,255,0.2),
              inset 0 0 20px rgba(0,255,255,0.05);
          }
          50% {
            opacity: 1;
            box-shadow:
              0 0 30px rgba(0,255,255,0.5),
              0 0 60px rgba(0,255,255,0.2),
              inset 0 0 40px rgba(0,255,255,0.1);
          }
        }
        @keyframes pulseCore {
          0%, 100% {
            transform: translateZ(0) scale(0.8);
            opacity: 0.7;
            box-shadow:
              0 0 20px rgba(0,255,255,0.6),
              0 0 40px rgba(139,92,246,0.3);
          }
          50% {
            transform: translateZ(0) scale(1.2);
            opacity: 1;
            box-shadow:
              0 0 40px rgba(0,255,255,1),
              0 0 80px rgba(0,255,255,0.5),
              0 0 120px rgba(139,92,246,0.3);
          }
        }
        @keyframes orbitSpin {
          0%   { transform: translateZ(0) rotateX(70deg) rotateZ(0deg); }
          100% { transform: translateZ(0) rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes scanLine {
          0%, 100% { top: calc(50% - 80px); opacity: 0; }
          10% { opacity: 1; }
          50% { top: calc(50% + 40px); opacity: 0.6; }
          90% { opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
