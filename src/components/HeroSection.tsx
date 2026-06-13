import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useRef } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import CloudReveal from "@/components/CloudReveal";

const HeroSection = () => {
  const { data } = usePortfolio();
  const { hero } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const contentFilter = useTransform(contentBlur, (b) => `blur(${b}px)`);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-10 overflow-hidden"
    >
      <CloudReveal />
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, filter: contentFilter }}
        className="container-narrow w-full grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[12px] uppercase font-semibold tracking-wider"
            style={{
              backgroundColor: "rgba(99, 102, 241, 0.12)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.25)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </div>

          <h1 className="font-bold text-5xl md:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-foreground mb-5">
            Hi, I'm <span className="text-primary">{hero.name.charAt(0).toUpperCase() + hero.name.slice(1)}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-5">
            Full Stack Developer & Tech Enthusiast
          </p>

          <p className="text-base text-muted-foreground max-w-lg mb-10 leading-[1.7]">
            I build modern, performant web experiences with clean code and considered design.
            Currently focused on React, TypeScript, and shipping products that matter.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a
              href={hero.cvUrl}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
            >
              <Download size={16} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Right column — profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:flex items-center justify-center relative"
        >
          {/* Blurred radial glow behind */}
          <div
            className="absolute inset-0 -m-12 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.20), transparent 65%)" }}
          />
          <div
            className="relative aspect-square w-[360px] rounded-2xl overflow-hidden border-2 border-primary"
            style={{ boxShadow: "0 30px 80px -20px rgba(99,102,241,0.45)" }}
          >
            {/* Replace with your photo: drop file at /public/images/profile.jpg */}
            <div className="absolute inset-0 flex items-center justify-center bg-card text-primary font-bold text-7xl">
              {hero.initials}
            </div>
            <img
              src={data.profileImage || "/images/profile.jpg"}
              alt={`${hero.name} profile`}
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              className="relative w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
