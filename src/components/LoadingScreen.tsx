import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        angle: (i / 40) * Math.PI * 2,
        radius: 80 + Math.random() * 140,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 0.6,
        color: ["#6366F1", "#8B5CF6", "#22D3EE"][i % 3],
      })),
    []
  );

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#020617" }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* radial bloom */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #6366F140 0%, #8B5CF620 30%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 1.1, 1], opacity: [0, 0.8, 0.6] }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />

          {/* converging particles forming the logo */}
          {particles.map((p) => {
            const startX = Math.cos(p.angle) * p.radius;
            const startY = Math.sin(p.angle) * p.radius;
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 6}px ${p.color}`,
                }}
                initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
                animate={{
                  x: [startX, startX * 0.3, 0],
                  y: [startY, startY * 0.3, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0.2],
                }}
                transition={{
                  duration: 2.2,
                  delay: p.delay,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            );
          })}

          {/* logo reveal */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1
              className="text-6xl md:text-7xl font-bold tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #22D3EE 0%, #6366F1 50%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 30px #6366F180)",
              }}
            >
              ahrion
            </h1>
            <motion.div
              className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            />
            <motion.p
              className="text-xs font-mono tracking-[0.4em] text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              ENTERING THE EXPERIENCE
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
