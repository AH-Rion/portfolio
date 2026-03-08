import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Footer = () => {
  const { data } = usePortfolio();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute -top-px left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1200 40" className="w-full h-10 text-background fill-current">
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" />
        </svg>
      </div>
      <div className="section-padding pb-8 pt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold gradient-text mb-1">{data.footer.name}</h3>
              <p className="text-muted-foreground text-sm">{data.footer.tagline}</p>
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-destructive fill-destructive" /> © {new Date().getFullYear()}
            </p>
            <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-full glass text-primary glow-box">
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
