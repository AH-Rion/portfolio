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
          <motion.p variants={fadeInUp} className="label-eyebrow mb-3">
            About Me
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-[40px] font-bold mb-8 max-w-2xl"
          >
            Who I Am
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-base text-muted-foreground leading-[1.7] max-w-3xl mb-4">
            {about.description}
          </motion.p>
          <motion.p variants={fadeInUp} className="text-base text-muted-foreground leading-[1.7] max-w-3xl">
            {about.expandedDescription}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
          >
            {displayStats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="surface-card p-6 transition-colors hover:border-primary/60"
              >
                <div className="text-[48px] font-bold text-primary leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
