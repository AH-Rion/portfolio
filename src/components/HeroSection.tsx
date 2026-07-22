import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const HeroSection = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 md:px-10"
    >
      <div className="container-narrow w-full grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="neu-chip mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#38B2AC] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38B2AC]" />
            </span>
            Available for work
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#3D4852] mb-6">
            Hi, I'm{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6C63FF, #8B84FF)" }}
            >
              {hero.name.charAt(0).toUpperCase() + hero.name.slice(1)}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#3D4852] font-medium mb-5">
            Full Stack Developer & Tech Enthusiast
          </p>

          <p className="text-base md:text-lg text-[#6B7280] max-w-lg mb-10 leading-[1.7]">
            I sculpt modern, tactile web experiences with clean code and considered design.
            Currently shaping products with React, TypeScript, and a soft touch.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="neu-btn-primary inline-flex items-center gap-2 px-7 py-4 text-sm"
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a
              href={hero.cvUrl}
              className="neu-btn inline-flex items-center gap-2 px-7 py-4 text-sm"
            >
              <Download size={16} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Right — nested neumorphic showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]"
        >
          {/* Nested depth circles — responsive */}
          <div className="neu-extrude rounded-full w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
            <div className="neu-inset-deep rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] flex items-center justify-center">
              <div
                className="neu-extrude rounded-full w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] overflow-hidden flex items-center justify-center text-5xl lg:text-6xl font-display font-extrabold text-[#6C63FF] relative"
              >
                {hero.initials}
                <img
                  src={data.profileImage || "/images/profile.jpg"}
                  alt={`${hero.name} profile`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Floating chips */}
          <div className="absolute -top-2 -right-2 neu-chip animate-float">
            <Sparkles size={14} className="text-[#6C63FF]" /> Design
          </div>
          <div
            className="absolute -bottom-2 -left-2 neu-chip animate-float"
            style={{ animationDelay: "1s" }}
          >
            <span className="text-[#38B2AC]">{"</>"}</span> Code
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
