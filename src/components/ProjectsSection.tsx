import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

const filterCategories = ["All", "Web Apps", "Mobile Apps", "UI/UX", "Open Source"];

const projects = [
  {
    id: 1, title: "E-Commerce Platform", category: "Web Apps",
    description: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    featured: true,
  },
  {
    id: 2, title: "Social Media Dashboard", category: "Web Apps",
    description: "Analytics dashboard for tracking social media performance across multiple platforms.",
    tech: ["Next.js", "TypeScript", "D3.js", "Tailwind"],
  },
  {
    id: 3, title: "Fitness Tracker App", category: "Mobile Apps",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics.",
    tech: ["React Native", "Firebase", "Redux"],
  },
  {
    id: 4, title: "Design System Kit", category: "UI/UX",
    description: "Comprehensive design system with reusable components and design tokens.",
    tech: ["Figma", "Storybook", "React"],
  },
  {
    id: 5, title: "CLI Tool Suite", category: "Open Source",
    description: "Collection of developer CLI tools for automating common development tasks.",
    tech: ["Node.js", "TypeScript", "Commander"],
  },
  {
    id: 6, title: "Portfolio Generator", category: "Open Source",
    description: "Open source tool to generate stunning portfolio websites from a config file.",
    tech: ["React", "Vite", "Tailwind CSS"],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    whileHover={{ y: -8, boxShadow: "0 20px 40px hsl(190 100% 50% / 0.1)" }}
    className={`glass rounded-2xl overflow-hidden group ${project.featured ? "md:col-span-2" : ""}`}
  >
    <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
      <div className="text-4xl font-bold gradient-text opacity-20 group-hover:opacity-40 transition-opacity">
        {project.title.charAt(0)}
      </div>
      <motion.div
        className="absolute inset-0 bg-background/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-primary text-primary-foreground"
        >
          <ExternalLink size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full border border-foreground/20 text-foreground"
        >
          <Github size={18} />
        </motion.button>
      </motion.div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");
  const { ref, isInView } = useScrollAnimation();

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest mb-2">MY WORK</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center gap-2 mb-10 flex-wrap">
            {filterCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
