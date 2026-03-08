import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ExperienceSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const { data } = usePortfolio();

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-widest mb-2">MY JOURNEY</p>
            <h2 className="text-3xl md:text-4xl font-bold">Work <span className="gradient-text">Experience</span></h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            {data.experience.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={i} variants={isLeft ? fadeInLeft : fadeInRight} className={`relative mb-12 md:mb-16 flex ${isLeft ? "md:pr-[52%]" : "md:pl-[52%]"}`}>
                  <motion.div className="absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-primary hidden md:block" style={{ boxShadow: "0 0 10px hsl(190 100% 50% / 0.5), 0 0 20px hsl(190 100% 50% / 0.2)" }} initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ delay: i * 0.2 + 0.3 }} />
                  <motion.div whileHover={{ boxShadow: "0 0 30px hsl(190 100% 50% / 0.15)", borderColor: "hsl(190 100% 50% / 0.3)" }} className="glass rounded-2xl p-6 w-full transition-colors">
                    <span className="text-primary font-mono text-xs">{exp.date}</span>
                    <h3 className="text-lg font-semibold mt-1">{exp.role}</h3>
                    <p className="text-secondary font-medium text-sm">{exp.company}</p>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map((t) => <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary">{t}</span>)}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
