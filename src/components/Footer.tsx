import { Github, Linkedin, Twitter } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const iconMap: Record<string, any> = { GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter };

const Footer = () => {
  const { data } = usePortfolio();
  return (
    <footer className="px-6 md:px-10 pb-8 pt-4">
      <div className="container-narrow neu-extrude rounded-full px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#6B7280]">
          © {new Date().getFullYear()} {data.footer.name}. Crafted with care.
        </p>
        <div className="flex items-center gap-3">
          {data.contact.socials.map((s) => {
            const Icon = iconMap[s.platform] || Github;
            return (
              <a
                key={s.platform}
                href={s.url}
                aria-label={s.platform}
                className="neu-extrude-sm w-10 h-10 rounded-full flex items-center justify-center text-[#3D4852] hover:text-[#6C63FF] transition-colors"
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
