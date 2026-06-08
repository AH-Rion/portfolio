import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation(0.15);
  const { data } = usePortfolio();
  const { about, hero } = data;
  const stats = about.stats.slice(0, 3);

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
            About
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-2xl"
          >
            A developer focused on craft, clarity, and outcomes.
          </motion.h2>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
            <motion.div variants={fadeInUp}>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-primary/40 bg-card">
                {data.profileImage ? (
                  <img src={data.profileImage} alt={hero.name} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-5xl font-bold text-primary">
                    {hero.initials}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-base leading-[1.7] text-muted-foreground mb-4">
                {about.description}
              </p>
              <p className="text-base leading-[1.7] text-muted-foreground">
                {about.expandedDescription}
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="surface-card p-6"
              >
                <div className="font-display text-4xl font-bold text-primary mb-1">
                  {s.value}
                  {s.suffix}
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
