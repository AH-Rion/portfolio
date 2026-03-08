import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: index * 0.1, duration: 0.4 }} whileHover={{ y: -8, boxShadow: "0 20px 40px hsl(190 100% 50% / 0.1)" }} className={`glass rounded-2xl overflow-hidden group ${project.featured ? "md:col-span-2" : ""}`}>
    <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
      <div className="text-4xl font-bold gradient-text opacity-20 group-hover:opacity-40 transition-opacity">{project.title.charAt(0)}</div>
      <motion.div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-full bg-primary text-primary-foreground"><ExternalLink size={18} /></motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-full border border-foreground/20 text-foreground"><Github size={18} /></motion.button>
      </motion.div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t: string) => (
          <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary">{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const { data } = usePortfolio();
  const allCategories = ["All", ...Array.from(new Set(data.projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const { ref, isInView } = useScrollAnimation();
  const filtered = filter === "All" ? data.projects : data.projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest mb-2">MY WORK</p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured <span className="gradient-text">Projects</span></h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-10 flex-wrap">
            {allCategories.map((cat) => (
              <motion.button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{cat}</motion.button>
            ))}
          </motion.div>
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
