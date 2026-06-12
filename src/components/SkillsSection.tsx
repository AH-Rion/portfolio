import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";

type Skill = { name: string; icon: string };

const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ],
  },
];

const SkillsSection = () => {
  const { ref, isInView } = useScrollAnimation(0.15);

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
            className="text-3xl md:text-[40px] font-bold mb-12 max-w-2xl"
          >
            What I Work With
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <motion.div
                key={group.title}
                variants={fadeInUp}
                className="surface-card p-6"
              >
                <h3 className="text-lg font-semibold mb-5 text-foreground">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <span
                      key={s.name}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground bg-card border border-border hover:border-primary transition-colors duration-200"
                    >
                      <img src={s.icon} alt={s.name} width={20} height={20} loading="lazy" />
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
