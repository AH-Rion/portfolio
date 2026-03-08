import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

export default useScrollAnimation;

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};
