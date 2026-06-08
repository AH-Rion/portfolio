import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ExperienceSection = () => {
  const { ref, isInView } = useScrollAnimation(0.1);
  const { data } = usePortfolio();

  return (
    <section id="experience" className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p variants={fadeInUp} className="label-eyebrow mb-3">
            Experience
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-2xl"
          >
            Where I've built things.
          </motion.h2>

          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="surface-card p-6 grid md:grid-cols-[180px_1fr] gap-6 hover:border-primary/40 transition-colors"
              >
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider pt-1">
                  {exp.date}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-primary mb-3">{exp.company}</p>
                  <p className="text-sm text-muted-foreground leading-[1.7] mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded text-primary bg-primary/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
