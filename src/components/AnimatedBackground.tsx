import { motion } from "framer-motion";
import { useMemo } from "react";

/* ──────────────────────────────────────────────
   Layer 1 – Aurora Gradient Animation
   Slow-moving northern-lights bands
   ────────────────────────────────────────────── */
const AuroraLayer = () => (
  <>
    <motion.div
      className="absolute -top-[60%] -left-[30%] w-[160%] h-[100%]"
      style={{
        background:
          "conic-gradient(from 0deg at 50% 50%, #6366F1 0deg, transparent 40deg, #22D3EE 80deg, transparent 120deg, #8B5CF6 160deg, transparent 200deg, #6366F1 240deg, transparent 280deg, #22D3EE 320deg, transparent 360deg)",
        filter: "blur(120px)",
        opacity: 0.1,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute -bottom-[50%] -right-[25%] w-[140%] h-[90%]"
      style={{
        background:
          "conic-gradient(from 180deg at 50% 50%, #8B5CF6 0deg, transparent 50deg, #F97316 100deg, transparent 150deg, #22D3EE 200deg, transparent 250deg, #6366F1 300deg, transparent 360deg)",
        filter: "blur(140px)",
        opacity: 0.07,
      }}
      animate={{ rotate: [360, 0] }}
      transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
    />
    {/* Flowing aurora band */}
    <motion.div
      className="absolute top-[10%] left-0 right-0 h-[30%]"
      style={{
        background: "linear-gradient(90deg, transparent 0%, #6366F180 20%, #22D3EE60 40%, #8B5CF670 60%, #6366F150 80%, transparent 100%)",
        filter: "blur(80px)",
        opacity: 0.12,
      }}
      animate={{
        x: ["-20%", "20%", "-20%"],
        scaleY: [1, 1.3, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

/* ──────────────────────────────────────────────
   Layer 2 – Floating Particle System
   Hundreds of tiny glowing particles
   ────────────────────────────────────────────── */
const ParticleLayer = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 8,
        driftX: (Math.random() - 0.5) * 60,
        driftY: (Math.random() - 0.5) * 60,
        color: ["#6366F1", "#8B5CF6", "#22D3EE", "#F97316"][Math.floor(Math.random() * 4)],
        pulseChance: Math.random(),
      })),
    []
  );

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: p.pulseChance > 0.7 ? `0 0 ${p.size * 4}px ${p.color}80` : "none",
          }}
          animate={{
            x: [0, p.driftX, -p.driftX * 0.6, p.driftX * 0.3, 0],
            y: [0, p.driftY, -p.driftY * 0.7, p.driftY * 0.4, 0],
            opacity: p.pulseChance > 0.7
              ? [0.2, 0.9, 0.3, 0.8, 0.2]
              : [0.15, 0.5, 0.15],
            scale: p.pulseChance > 0.85 ? [1, 1.8, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

/* ──────────────────────────────────────────────
   Layer 3 – Neural Network Animation
   Animated nodes with connecting lines
   ────────────────────────────────────────────── */
const NeuralNetworkLayer = () => {
  const nodes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: Math.random() * 4 + 2,
        driftX: (Math.random() - 0.5) * 100,
        driftY: (Math.random() - 0.5) * 80,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 5,
      })),
    []
  );

  // Pre-compute connections between nearby nodes
  const connections = useMemo(() => {
    const conns: { from: number; to: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 30) conns.push({ from: i, to: j });
      }
    }
    return conns;
  }, [nodes]);

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
      {/* Connections */}
      {connections.map((conn, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={`${nodes[conn.from].x}%`}
          y1={`${nodes[conn.from].y}%`}
          x2={`${nodes[conn.to].x}%`}
          y2={`${nodes[conn.to].y}%`}
          stroke="#22D3EE"
          strokeWidth={0.5}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((node) => (
        <motion.circle
          key={`node-${node.id}`}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r={node.size}
          fill="#6366F1"
          animate={{
            cx: [`${node.x}%`, `${node.x + node.driftX * 0.15}%`, `${node.x}%`],
            cy: [`${node.y}%`, `${node.y + node.driftY * 0.15}%`, `${node.y}%`],
            opacity: [0.3, 0.8, 0.3],
            r: [node.size, node.size * 1.5, node.size],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
          style={{
            filter: `drop-shadow(0 0 ${node.size * 2}px #6366F180)`,
          }}
        />
      ))}
    </svg>
  );
};

/* ──────────────────────────────────────────────
   Layer 4 – Light Energy Waves
   Soft transparent waves sweeping across
   ────────────────────────────────────────────── */
const EnergyWaveLayer = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={`wave-${i}`}
        className="absolute left-0 right-0"
        style={{
          top: `${20 + i * 20}%`,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${
            i % 2 === 0 ? "#22D3EE" : "#8B5CF6"
          }40 30%, ${i % 2 === 0 ? "#6366F1" : "#22D3EE"}30 50%, ${
            i % 2 === 0 ? "#8B5CF6" : "#6366F1"
          }20 70%, transparent 100%)`,
          boxShadow: `0 0 20px ${i % 2 === 0 ? "#22D3EE" : "#8B5CF6"}20, 0 0 60px ${
            i % 2 === 0 ? "#22D3EE" : "#8B5CF6"
          }10`,
        }}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 0.6, 0],
          scaleY: [1, 2, 1],
        }}
        transition={{
          duration: 12 + i * 3,
          repeat: Infinity,
          delay: i * 4,
          ease: "easeInOut",
        }}
      />
    ))}
    {/* Diagonal wave */}
    <motion.div
      className="absolute"
      style={{
        top: "0",
        left: "-50%",
        width: "200%",
        height: "2px",
        background: "linear-gradient(90deg, transparent, #F9731640, #22D3EE30, transparent)",
        transform: "rotate(-15deg)",
        transformOrigin: "center",
      }}
      animate={{
        y: ["-20vh", "120vh"],
        opacity: [0, 0.4, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, delay: 5, ease: "easeInOut" }}
    />
  </>
);

/* ──────────────────────────────────────────────
   Layer 5 – Floating Gradient Orbs
   Large blurred glowing spheres for depth
   ────────────────────────────────────────────── */
const GradientOrbLayer = () => {
  const orbs = useMemo(
    () => [
      { x: "8%", y: "15%", size: 500, colors: ["#6366F1", "#22D3EE"], dur: 25, delay: 0 },
      { x: "75%", y: "10%", colors: ["#8B5CF6", "#6366F1"], size: 400, dur: 30, delay: 4 },
      { x: "40%", y: "60%", colors: ["#22D3EE", "#8B5CF6"], size: 550, dur: 35, delay: 2 },
      { x: "85%", y: "70%", colors: ["#F97316", "#8B5CF6"], size: 350, dur: 22, delay: 7 },
      { x: "20%", y: "85%", colors: ["#6366F1", "#22D3EE"], size: 420, dur: 28, delay: 5 },
    ],
    []
  );

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.colors[0]}18 0%, ${orb.colors[1]}08 40%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 80 * Math.sin(i + 1), -60 * Math.cos(i), 40, 0],
            y: [0, -70 * Math.cos(i + 1), 50, -80 * Math.sin(i), 0],
            scale: [1, 1.2, 0.9, 1.15, 1],
            opacity: [0.5, 0.8, 0.4, 0.7, 0.5],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

/* ──────────────────────────────────────────────
   Layer 7 – Pulse Glow Effects
   Occasional bright pulses in the scene
   ────────────────────────────────────────────── */
const PulseGlowLayer = () => {
  const pulses = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        color: ["#6366F1", "#8B5CF6", "#22D3EE", "#F97316"][i % 4],
        delay: Math.random() * 12,
        duration: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <>
      {pulses.map((p) => (
        <motion.div
          key={`pulse-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 6,
            height: 6,
            backgroundColor: p.color,
          }}
          animate={{
            scale: [1, 3, 1],
            opacity: [0, 0.8, 0],
            boxShadow: [
              `0 0 0px ${p.color}00`,
              `0 0 40px ${p.color}80, 0 0 80px ${p.color}40`,
              `0 0 0px ${p.color}00`,
            ],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

/* ──────────────────────────────────────────────
   Main Component – All layers combined
   ────────────────────────────────────────────── */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: "#020617" }}>
      <div className="absolute inset-0">
        <AuroraLayer />
      </div>

      <div className="absolute inset-0">
        <GradientOrbLayer />
      </div>

      <div className="absolute inset-0">
        <NeuralNetworkLayer />
      </div>

      <div className="absolute inset-0">
        <EnergyWaveLayer />
      </div>

      <div className="absolute inset-0">
        <ParticleLayer />
      </div>

      <div className="absolute inset-0">
        <PulseGlowLayer />
      </div>

      {/* Vignette & depth overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#02061790_60%,#020617_85%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617cc]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#02061740] via-transparent to-[#02061740]" />
    </div>
  );
};

export default AnimatedBackground;
