import { useRef } from "react";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

export default useScrollAnimation;

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};
