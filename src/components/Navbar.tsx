import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
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
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 px-4 md:px-8">
      <nav
        className="container-narrow neu-extrude rounded-full flex items-center justify-between h-16 px-5 md:px-7"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl font-extrabold tracking-tight text-[hsl(var(--foreground))]"
        >
          ahrion<span className="text-[#6C63FF]">.</span>
        </button>

        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`nav-link px-4 py-2 rounded-full transition-all ${
                active === l.id ? "nav-link-active neu-inset-sm" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => go("contact")}
          className="hidden md:inline-flex neu-btn-primary px-5 py-2.5 text-sm"
        >
          Hire me
        </button>

        <button
          className="md:hidden neu-extrude-sm w-11 h-11 rounded-full flex items-center justify-center text-[hsl(var(--foreground))]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden container-narrow mt-3 neu-extrude rounded-3xl p-4 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`text-left px-4 py-3 rounded-2xl nav-link ${
                active === l.id ? "nav-link-active neu-inset-sm" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
