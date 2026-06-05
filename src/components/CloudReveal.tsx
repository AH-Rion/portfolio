import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMemo } from "react";

/**
 * Cinematic cloud / fog overlay for the hero.
 * Starts covering the hero, then disperses as the user scrolls,
 * revealing the content underneath like an interface being uncovered.
 */
const CloudReveal = () => {
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 60, damping: 20, mass: 0.6 });

  const opacity = useTransform(smooth, [0, 600], [1, 0]);
  const scale = useTransform(smooth, [0, 600], [1, 1.6]);
  const blur = useTransform(smooth, [0, 600], [0, 30]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // left & right cloud banks drift apart on scroll
  const leftX = useTransform(smooth, [0, 600], ["0%", "-60%"]);
  const rightX = useTransform(smooth, [0, 600], ["0%", "60%"]);
  const topY = useTransform(smooth, [0, 600], ["0%", "-40%"]);

  const puffs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 5 + (i * 12) + Math.random() * 6,
        y: 10 + Math.random() * 70,
        size: 320 + Math.random() * 280,
        dur: 18 + Math.random() * 14,
        delay: Math.random() * 6,
        side: i % 2 === 0 ? "left" : "right",
      })),
    []
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{ opacity, filter }}
    >
      {/* top fog veil drifts up */}
      <motion.div
        className="absolute inset-x-0 top-0 h-2/3"
        style={{
          y: topY,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* split cloud banks */}
      <motion.div
        className="absolute -left-[10%] top-0 bottom-0 w-[70%]"
        style={{
          x: leftX,
          scale,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 35%, rgba(2,6,23,0.3) 60%, transparent 80%)",
          filter: "blur(30px)",
        }}
      />
      <motion.div
        className="absolute -right-[10%] top-0 bottom-0 w-[70%]"
        style={{
          x: rightX,
          scale,
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.7) 35%, rgba(2,6,23,0.3) 60%, transparent 80%)",
          filter: "blur(30px)",
        }}
      />

      {/* drifting puff layer with subtle parallax */}
      {puffs.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            x: p.side === "left" ? leftX : rightX,
            background: `radial-gradient(circle, rgba(${
              p.side === "left" ? "99,102,241" : "139,92,246"
            },0.18) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* central bright light bleeding through as clouds part */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.15) 0%, rgba(99,102,241,0.08) 30%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* hint to scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.4em] text-muted-foreground/70"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        style={{ opacity }}
      >
        SCROLL TO REVEAL
      </motion.div>
    </motion.div>
  );
};

export default CloudReveal;
