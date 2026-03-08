import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Zap, FolderOpen, Briefcase, MessageSquare, Mail, Menu, X } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 top-0 h-full z-[100] hidden md:flex flex-col items-center justify-center glass-strong"
        style={{ width: hovered ? 200 : 72 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full"
                    style={{ boxShadow: "0 0 10px hsl(190 100% 50% / 0.5)" }}
                  />
                )}
                <Icon size={20} />
                <AnimatePresence>
                  {hovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 right-4 z-[101] md:hidden glass p-3 rounded-full"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] glass-strong flex items-center justify-center md:hidden"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-4 text-xl ${
                      activeSection === item.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon size={24} />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
