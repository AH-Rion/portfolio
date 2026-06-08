import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const codeSnippet = `const ahrion = {
  role: "Full-Stack Developer",
  focus: ["React", "TypeScript", "Node"],
  building: "Digital products that matter",
  available: true,
};

export default ahrion;`;

const HeroSection = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16"
    >
      {/* Ambient glow */}
      <div className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] accent-glow pointer-events-none" />

      <div className="container-narrow w-full px-6 md:px-10 grid lg:grid-cols-2 gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 label-eyebrow mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work ✦
          </div>

          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-6">
            {hero.name}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-snug max-w-lg mb-10">
            Building digital products that matter — clean code, considered design, measurable impact.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View My Work <ArrowRight size={16} />
            </button>
            <a
              href={hero.cvUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-card transition-colors"
            >
              <Download size={16} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Code card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hidden lg:block surface-card overflow-hidden shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs font-mono text-muted-foreground">ahrion.ts</span>
          </div>
          <pre className="p-6 text-sm font-mono leading-relaxed text-muted-foreground overflow-auto">
            <code>
              <span className="text-primary">const</span>{" "}
              <span className="text-foreground">ahrion</span> = {"{"}
              {"\n  "}role: <span className="text-emerald-400">"Full-Stack Developer"</span>,
              {"\n  "}focus: [<span className="text-emerald-400">"React"</span>,{" "}
              <span className="text-emerald-400">"TypeScript"</span>,{" "}
              <span className="text-emerald-400">"Node"</span>],
              {"\n  "}building: <span className="text-emerald-400">"Digital products that matter"</span>,
              {"\n  "}available: <span className="text-primary">true</span>,
              {"\n"}{"}"};
              {"\n\n"}
              <span className="text-primary">export default</span>{" "}
              <span className="text-foreground">ahrion</span>;
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
