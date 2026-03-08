import { motion } from "framer-motion";
import { useState } from "react";

const AnimatedBackground = () => {
  // Floating orbs with random positions
  const [orbs] = useState(() => [
    { x: "10%", y: "20%", size: 300, color: "var(--primary)", duration: 25, delay: 0 },
    { x: "70%", y: "10%", size: 250, color: "var(--secondary)", duration: 30, delay: 5 },
    { x: "40%", y: "60%", size: 350, color: "var(--primary)", duration: 35, delay: 2 },
    { x: "80%", y: "70%", size: 200, color: "var(--secondary)", duration: 20, delay: 8 },
    { x: "20%", y: "80%", size: 280, color: "var(--primary)", duration: 28, delay: 4 },
  ]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      {/* Aurora gradient bands */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[140%] h-[60%] opacity-[0.07]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, hsl(var(--primary)) 0deg, transparent 60deg, hsl(var(--secondary)) 120deg, transparent 180deg, hsl(var(--primary)) 240deg, transparent 300deg, hsl(var(--secondary)) 360deg)",
          filter: "blur(80px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, hsl(${orb.color} / 0.12) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -60, 40, -80, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving mesh gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(at 80% 70%, hsl(var(--secondary)) 0%, transparent 50%),
            radial-gradient(at 50% 50%, hsl(var(--primary)) 0%, transparent 60%)
          `,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shooting stars / streaks */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute h-px"
          style={{
            width: 100 + i * 50,
            top: `${15 + i * 30}%`,
            left: "-10%",
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)`,
          }}
          animate={{ x: ["0vw", "120vw"] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 7 + 2,
            ease: "easeInOut",
            repeatDelay: 8 + i * 3,
          }}
        />
      ))}

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
    </div>
  );
};

export default AnimatedBackground;
