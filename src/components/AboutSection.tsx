import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useScrollAnimation, { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const CountUpNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [expanded, setExpanded] = useState(false);
  const { data } = usePortfolio();
  const { about, hero } = data;

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl gradient-border" />
              <div className="absolute inset-2 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                {data.profileImage ? (
                  <img src={data.profileImage} alt={hero.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl font-bold gradient-text">{hero.initials}</div>
                )}
              </div>
              <motion.div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 border border-primary/20" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-lg bg-secondary/10 border border-secondary/20" animate={{ rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} />
            </div>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <p className="text-primary font-mono text-sm tracking-widest mb-2">ABOUT ME</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {about.title} <span className="gradient-text">{about.highlight}</span> & Designer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{about.description}</p>
            <motion.div animate={{ height: expanded ? "auto" : 0 }} className="overflow-hidden">
              <p className="text-muted-foreground leading-relaxed mb-4">{about.expandedDescription}</p>
            </motion.div>
            <button onClick={() => setExpanded(!expanded)} className="text-primary font-mono text-sm mt-2 hover:underline">
              {expanded ? "Show Less" : "Read More →"}
            </button>
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {about.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="glass rounded-xl p-6 text-center glow-box">
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
