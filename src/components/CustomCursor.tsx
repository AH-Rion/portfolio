import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          background: "radial-gradient(circle, hsl(190 100% 50% / 0.8), transparent)",
          boxShadow: "0 0 20px hsl(190 100% 50% / 0.5), 0 0 60px hsl(190 100% 50% / 0.2)",
        }}
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-primary/30"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          opacity: visible ? 0.5 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      />
    </>
  );
};

export default CustomCursor;
