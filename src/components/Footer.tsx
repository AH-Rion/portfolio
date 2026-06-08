import { Github, Linkedin, Twitter } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const iconMap: Record<string, any> = { GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter };

const Footer = () => {
  const { data } = usePortfolio();
  return (
    <footer className="border-t border-border">
      <div className="container-narrow px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {data.footer.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {data.contact.socials.map((s) => {
            const Icon = iconMap[s.platform] || Github;
            return (
              <a
                key={s.platform}
                href={s.url}
                aria-label={s.platform}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
