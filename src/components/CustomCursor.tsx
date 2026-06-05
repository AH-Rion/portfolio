import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Premium custom cursor: glowing energy ring + leading dot.
 * Expands and brightens when hovering interactive elements.
 * Disabled on touch devices.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // soft spring for the outer ring -> gives "trailing" feel
  const ringX = useSpring(x, { damping: 25, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(y, { damping: 25, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* leading dot — instant follow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-screen"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 10 : 6,
          height: hovering ? 10 : 6,
          background: "#22D3EE",
          boxShadow: "0 0 16px #22D3EE, 0 0 40px #6366F1",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
      {/* outer ring — springy trail */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          border: "1.5px solid rgba(99,102,241,0.55)",
          background: hovering
            ? "radial-gradient(circle, rgba(34,211,238,0.18), transparent 65%)"
            : "radial-gradient(circle, rgba(99,102,241,0.10), transparent 65%)",
          boxShadow: hovering
            ? "0 0 30px rgba(34,211,238,0.45), inset 0 0 12px rgba(139,92,246,0.35)"
            : "0 0 18px rgba(99,102,241,0.25)",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        }}
      />
    </>
  );
};

export default CustomCursor;
