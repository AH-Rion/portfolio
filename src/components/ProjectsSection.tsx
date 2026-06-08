import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ProjectsSection = () => {
  const { data } = usePortfolio();
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section id="projects" className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p variants={fadeInUp} className="label-eyebrow mb-3">
            Selected Work
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-semibold mb-12 max-w-2xl"
          >
            Recent projects I'm proud of.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((p) => (
              <motion.article
                key={p.id}
                variants={fadeInUp}
                className="group surface-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-background">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background" />
                  <div className="absolute inset-0 flex items-center justify-center font-display text-6xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                    {p.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded text-primary bg-primary/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        aria-label="GitHub repository"
                        className="p-2 rounded text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        aria-label="Live preview"
                        className="p-2 rounded text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All Projects <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
