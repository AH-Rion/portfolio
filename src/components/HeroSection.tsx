import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, MessageCircle } from "lucide-react";

const roles = ["Full Stack Developer", "UI/UX Designer", "Creative Thinker", "Problem Solver"];

const ParticleBackground = () => {
  const [particles] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          if (displayText.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-[15%] w-20 h-20 border border-primary/20 rounded-lg"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity } }}
      />
      <motion.div
        className="absolute bottom-32 right-[20%] w-16 h-16 border border-secondary/20 rounded-full"
        animate={{ rotate: -360, y: [0, 15, 0] }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity } }}
      />
      <motion.div
        className="absolute top-[40%] right-[10%] w-12 h-12 border border-primary/10"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Profile photo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 relative w-36 h-36"
        >
          <div className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background: "conic-gradient(from 0deg, hsl(190 100% 50%), hsl(263 84% 52%), hsl(190 100% 50%))",
              padding: "3px",
            }}
          >
            <div className="w-full h-full rounded-full bg-background" />
          </div>
          <div className="absolute inset-[4px] rounded-full overflow-hidden bg-muted flex items-center justify-center text-3xl font-bold gradient-text">
            JD
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-primary font-mono text-sm tracking-widest mb-4"
        >
          WELCOME TO MY WORLD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          Hi, I'm <span className="gradient-text">John Doe</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 h-8"
        >
          <span className="font-mono">{displayText}</span>
          <span className="animate-pulse-glow text-primary">|</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(190 100% 50% / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium"
          >
            <Download size={18} />
            Download CV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(263 84% 52% / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-secondary text-secondary font-medium"
          >
            <MessageCircle size={18} />
            Let's Talk
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-muted-foreground" size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
