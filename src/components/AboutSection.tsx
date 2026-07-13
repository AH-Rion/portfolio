import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const displayStats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Built" },
  { value: "100%", label: "Passion for Code" },
];

const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation(0.15);
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p variants={fadeInUp} className="label-eyebrow mb-4">
            About Me
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-extrabold mb-10 max-w-2xl text-[#3D4852]"
          >
            Crafting digital experiences with soft precision.
          </motion.h2>

          <motion.div variants={fadeInUp} className="neu-card p-8 md:p-12 max-w-4xl">
            <p className="text-base md:text-lg text-[#3D4852] leading-[1.8] mb-5">
              {about.description}
            </p>
            <p className="text-base md:text-lg text-[#6B7280] leading-[1.8]">
              {about.expandedDescription}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-10"
          >
            {displayStats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="neu-card p-8 text-center"
              >
                <div className="font-display text-5xl md:text-6xl font-extrabold text-[#6C63FF] leading-none mb-3">
                  {s.value}
                </div>
                <div className="text-sm font-medium text-[#6B7280] uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
