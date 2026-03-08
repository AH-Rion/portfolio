import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const AnimatedBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const [orbs] = useState(() => [
    { x: "5%", y: "15%", size: 400, hue: "primary", duration: 22, delay: 0 },
    { x: "75%", y: "5%", size: 350, hue: "secondary", duration: 28, delay: 3 },
    { x: "35%", y: "55%", size: 450, hue: "primary", duration: 32, delay: 1 },
    { x: "85%", y: "65%", size: 300, hue: "secondary", duration: 18, delay: 6 },
    { x: "15%", y: "80%", size: 380, hue: "primary", duration: 26, delay: 4 },
    { x: "55%", y: "30%", size: 320, hue: "secondary", duration: 24, delay: 8 },
    { x: "90%", y: "40%", size: 260, hue: "primary", duration: 30, delay: 10 },
  ]);

  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 6,
    }))
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated dot grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      {/* Large rotating aurora */}
      <motion.div
        className="absolute -top-[50%] -left-[30%] w-[160%] h-[80%] opacity-[0.08]"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, hsl(var(--primary)) 0deg, transparent 45deg, hsl(var(--secondary)) 90deg, transparent 135deg, hsl(190 80% 40%) 180deg, transparent 225deg, hsl(var(--primary)) 270deg, transparent 315deg, hsl(var(--secondary)) 360deg)",
          filter: "blur(100px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Second counter-rotating aurora (lower) */}
      <motion.div
        className="absolute -bottom-[40%] -right-[20%] w-[120%] h-[70%] opacity-[0.06]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, hsl(var(--secondary)) 0deg, transparent 60deg, hsl(var(--primary)) 120deg, transparent 180deg, hsl(var(--secondary)) 240deg, transparent 300deg)",
          filter: "blur(120px)",
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
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
            background: `radial-gradient(circle, hsl(var(--${orb.hue}) / 0.15) 0%, hsl(var(--${orb.hue}) / 0.05) 40%, transparent 70%)`,
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, 100 * Math.sin(i), -80 * Math.cos(i), 60, 0],
            y: [0, -70 * Math.cos(i), 50, -90 * Math.sin(i), 0],
            scale: [1, 1.3, 0.85, 1.15, 1],
            opacity: [0.6, 1, 0.7, 0.9, 0.6],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse-reactive glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full transition-all duration-1000 ease-out"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moving mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(at 15% 25%, hsl(var(--primary)) 0%, transparent 50%),
            radial-gradient(at 85% 75%, hsl(var(--secondary)) 0%, transparent 50%),
            radial-gradient(at 50% 50%, hsl(190 80% 40%) 0%, transparent 60%),
            radial-gradient(at 75% 20%, hsl(var(--primary)) 0%, transparent 40%)
          `,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "50% 100%", "100% 50%", "50% 0%", "0% 0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shooting stars with glow trails */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute"
          style={{
            width: 120 + i * 40,
            height: 2,
            top: `${10 + i * 18}%`,
            left: "-15%",
            background: `linear-gradient(90deg, transparent, hsl(var(--${i % 2 === 0 ? "primary" : "secondary"}) / 0.6), hsl(var(--${i % 2 === 0 ? "primary" : "secondary"}) / 0.3), transparent)`,
            borderRadius: "999px",
            boxShadow: `0 0 8px hsl(var(--${i % 2 === 0 ? "primary" : "secondary"}) / 0.4), 0 0 20px hsl(var(--${i % 2 === 0 ? "primary" : "secondary"}) / 0.2)`,
            transform: `rotate(${-15 + i * 5}deg)`,
          }}
          animate={{ x: ["0vw", "130vw"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 5 + 3,
            ease: "easeIn",
            repeatDelay: 10 + i * 4,
          }}
        />
      ))}

      {/* Glowing horizontal line accents */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-[0.08]"
        style={{
          top: "30%",
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
        }}
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px opacity-[0.06]"
        style={{
          top: "70%",
          background: "linear-gradient(90deg, transparent, hsl(var(--secondary) / 0.4), transparent)",
        }}
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)] opacity-40" />
    </div>
  );
};

export default AnimatedBackground;
