import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const ProjectsSection = () => {
  const { data } = usePortfolio();
  const { ref, isInView } = useScrollAnimation(0.1);

  const projects = data.projects.slice(0, 3);
  const imageFor = (p: (typeof projects)[number], i: number) =>
    p.image || `/images/project-${i + 1}.png`;

  return (
    <section id="projects" className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p variants={fadeInUp} className="label-eyebrow mb-4">
            Selected Work
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-extrabold mb-12 max-w-2xl text-[#3D4852]"
          >
            Projects I've Built
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                variants={fadeInUp}
                className="neu-card p-6 group"
              >
                {/* Screenshot in an inset well */}
                <div className="neu-inset rounded-3xl p-3 mb-6">
                  <div className="relative h-[200px] rounded-2xl overflow-hidden bg-[#E0E5EC]">
                    <img
                      src={imageFor(p, i)}
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-6xl font-extrabold text-[#6C63FF]/30 pointer-events-none -z-0">
                      {p.title.charAt(0)}
                    </div>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        className="absolute inset-0 flex items-center justify-center bg-[#E0E5EC]/80 backdrop-blur-sm text-[#6C63FF] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Live →
                      </a>
                    )}
                  </div>
                </div>

                <div className="px-2">
                  <h3 className="font-display text-xl font-bold mb-2 text-[#3D4852]">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-5">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="neu-inset-sm rounded-full px-3 py-1 text-xs font-semibold text-[#3D4852]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-4 text-sm">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        className="neu-btn inline-flex items-center gap-2 px-4 py-2 text-xs"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6C63FF] hover:gap-2.5 transition-all"
                      >
                        Live Demo <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="mt-14 text-center">
            <a
              href="https://github.com/"
              className="neu-btn inline-flex items-center gap-2 px-6 py-3 text-sm text-[#6C63FF]"
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
