import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/hooks/useScrollAnimation";

const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Happy Clients", value: 30, suffix: "+" },
  { label: "Awards Won", value: 10, suffix: "+" },
];

const CountUpNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const { isInView } = useScrollAnimationForCounter();

  function useScrollAnimationForCounter() {
    const ref2 = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
        { threshold: 0.5 }
      );
      const el = ref2.current;
      if (el) observer.observe(el);
      return () => { if (el) observer.unobserve(el); };
    }, []);
    return { ref: ref2, isInView };
  }

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image side */}
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl gradient-border" />
              <div className="absolute inset-2 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                <div className="text-6xl font-bold gradient-text">JD</div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 border border-primary/20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-lg bg-secondary/10 border border-secondary/20"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div variants={fadeInRight}>
            <p className="text-primary font-mono text-sm tracking-widest mb-2">ABOUT ME</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Passionate <span className="gradient-text">Developer</span> & Designer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a full-stack developer with over 5 years of experience crafting digital experiences. I specialize in building modern web applications that are both beautiful and functional, with a keen eye for design and user experience.
            </p>

            <motion.div
              animate={{ height: expanded ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                My journey started with a curiosity for how things work on the web, and it has evolved into a passion for creating innovative solutions. I believe in writing clean, maintainable code and designing intuitive interfaces that users love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers.
              </p>
            </motion.div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary font-mono text-sm mt-2 hover:underline"
            >
              {expanded ? "Show Less" : "Read More →"}
            </button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="glass rounded-xl p-6 text-center glow-box"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <CountUpNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
