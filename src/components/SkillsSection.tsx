import { useState } from "react";
import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, staggerContainer, scaleIn } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
  const { ref, isInView } = useScrollAnimation(0.1);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.5 }} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-primary font-mono text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, hsl(190 100% 50%), hsl(263 84% 52%))" }} initial={{ width: 0 }} animate={isInView ? { width: `${level}%` } : {}} transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }} />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const { data } = usePortfolio();
  const categories = Object.keys(data.skills.categories);
  const [activeTab, setActiveTab] = useState(categories[0] || "Frontend");
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest mb-2">MY SKILLS</p>
            <h2 className="text-3xl md:text-4xl font-bold">What I <span className="gradient-text">Bring</span> to the Table</h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <motion.button key={cat} onClick={() => setActiveTab(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === cat ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="glass rounded-2xl p-8 glow-box max-w-2xl mx-auto mb-12">
            {(data.skills.categories[activeTab] || []).map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
            {data.skills.secondarySkills.map((skill, i) => (
              <motion.span key={skill} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.05 + 0.5 }} whileHover={{ scale: 1.1, boxShadow: "0 0 15px hsl(190 100% 50% / 0.2)" }} className="glass px-4 py-2 rounded-full text-sm text-muted-foreground cursor-default">
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
