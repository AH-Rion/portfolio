import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ProjectsSection = () => {
  const { data } = usePortfolio();
  const { ref, isInView } = useScrollAnimation(0.1);

  // Show first 3 projects with screenshot placeholders.
  const projects = data.projects.slice(0, 3);
  const imageFor = (i: number) => `/images/project-${i + 1}.png`;

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
            className="text-3xl md:text-[40px] font-bold mb-12 max-w-2xl"
          >
            Projects I've Built
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              /* PROJECT {i+1}: Replace name, description, links, and /images/project-{i+1}.png */
              <motion.article
                key={p.id}
                variants={fadeInUp}
                className="group surface-card overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary"
                style={{ transitionProperty: "transform, border-color, box-shadow" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px -20px rgba(99,102,241,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="relative h-[200px] overflow-hidden bg-background rounded-t-xl">
                  {/* Replace with actual screenshot */}
                  <img
                    src={imageFor(i)}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary/20 pointer-events-none -z-0">
                    {p.title.charAt(0)}
                  </div>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      className="absolute inset-0 flex items-center justify-center bg-background/70 text-foreground text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      View Live →
                    </a>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1.5 text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-2.5 py-1 rounded"
                        style={{
                          backgroundColor: "rgba(99, 102, 241, 0.15)",
                          color: "#a5b4fc",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5 pt-4 border-t border-border text-sm">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={15} /> Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowUpRight size={15} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <a
              href="https://github.com/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View All on GitHub <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
