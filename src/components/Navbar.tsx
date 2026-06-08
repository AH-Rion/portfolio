import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + window.innerHeight / 3;
      let cur = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && y >= el.offsetTop) cur = l.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container-narrow flex items-center justify-between h-16 px-6 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl font-bold tracking-tight text-foreground"
        >
          ahrion
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`nav-link relative py-2 ${active === l.id ? "nav-link-active" : ""}`}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary" />
              )}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 w-72 bg-card border-l border-border transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2 pt-20 px-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-left py-3 nav-link ${active === l.id ? "nav-link-active" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
