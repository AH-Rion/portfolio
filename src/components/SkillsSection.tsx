import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const SkillsSection = () => {
  const { data } = usePortfolio();
  const { ref, isInView } = useScrollAnimation(0.15);
  const categories = Object.entries(data.skills.categories);

  return (
    <section id="skills" className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p variants={fadeInUp} className="label-eyebrow mb-3">
            Skills & Tools
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-2xl"
          >
            The stack I reach for, every day.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map(([cat, skills]) => (
              <motion.div
                key={cat}
                variants={fadeInUp}
                className="surface-card p-6"
              >
                <h3 className="font-display text-lg font-semibold mb-5">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-foreground bg-background border border-border hover:border-primary/60 transition-colors"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
