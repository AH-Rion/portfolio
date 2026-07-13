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
          <motion.p variants={fadeInUp} className="label-eyebrow mb-4">
            Skills & Tools
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-extrabold mb-12 max-w-2xl text-[#3D4852]"
          >
            What I Work With
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillGroups.map((group) => (
              <motion.div
                key={group.title}
                variants={fadeInUp}
                className="neu-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="neu-icon-well w-12 h-12">
                    <span className="font-display font-extrabold text-[#6C63FF]">
                      {group.title.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#3D4852]">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((s) => (
                    <span key={s.name} className="neu-chip">
                      <img src={s.icon} alt={s.name} width={18} height={18} loading="lazy" />
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
