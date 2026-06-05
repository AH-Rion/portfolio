import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PortfolioData {
  profileImage: string;
  hero: {
    name: string;
    initials: string;
    subtitle: string;
    roles: string[];
    cvUrl: string;
  };
  about: {
    title: string;
    highlight: string;
    description: string;
    expandedDescription: string;
    stats: { label: string; value: number; suffix: string }[];
  };
  skills: {
    categories: Record<string, { name: string; level: number }[]>;
    secondarySkills: string[];
  };
  projects: {
    id: number;
    title: string;
    category: string;
    description: string;
    tech: string[];
    featured?: boolean;
    liveUrl?: string;
    githubUrl?: string;
  }[];
  experience: {
    company: string;
    role: string;
    date: string;
    description: string;
    tech: string[];
  }[];
  testimonials: {
    name: string;
    role: string;
    text: string;
    rating: number;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    socials: { platform: string; url: string }[];
  };
  footer: {
    name: string;
    tagline: string;
  };
}

const defaultData: PortfolioData = {
  profileImage: "",
  hero: {
    name: "ahrion",
    initials: "AH",
    subtitle: "WELCOME TO MY UNIVERSE",
    roles: ["Tech Enthusiast", "Developer", "Problem Solver", "AI Explorer"],
    cvUrl: "#",
  },
  about: {
    title: "Passionate",
    highlight: "Developer",
    description: "I'm a full-stack developer with over 5 years of experience crafting digital experiences. I specialize in building modern web applications that are both beautiful and functional.",
    expandedDescription: "My journey started with a curiosity for how things work on the web, and it has evolved into a passion for creating innovative solutions. I believe in writing clean, maintainable code.",
    stats: [
      { label: "Years Experience", value: 5, suffix: "+" },
      { label: "Projects Completed", value: 50, suffix: "+" },
      { label: "Happy Clients", value: 30, suffix: "+" },
      { label: "Awards Won", value: 10, suffix: "+" },
    ],
  },
  skills: {
    categories: {
      Frontend: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Vue.js", level: 75 },
      ],
      Backend: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 82 },
        { name: "PostgreSQL", level: 85 },
        { name: "GraphQL", level: 78 },
        { name: "Redis", level: 70 },
      ],
      Tools: [
        { name: "Git", level: 92 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "CI/CD", level: 85 },
        { name: "Linux", level: 78 },
      ],
      Design: [
        { name: "Figma", level: 88 },
        { name: "Adobe XD", level: 75 },
        { name: "Photoshop", level: 70 },
        { name: "UI/UX", level: 85 },
        { name: "Prototyping", level: 80 },
      ],
    },
    secondarySkills: [
      "REST APIs", "WebSockets", "Testing", "Agile", "Sass",
      "MongoDB", "Firebase", "Vercel", "Storybook", "Webpack",
      "Three.js", "Framer Motion", "Prisma", "tRPC",
    ],
  },
  projects: [
    { id: 1, title: "E-Commerce Platform", category: "Web Apps", description: "A full-stack e-commerce solution with real-time inventory management and payment processing.", tech: ["React", "Node.js", "PostgreSQL", "Stripe"], featured: true },
    { id: 2, title: "Social Media Dashboard", category: "Web Apps", description: "Analytics dashboard for tracking social media performance across multiple platforms.", tech: ["Next.js", "TypeScript", "D3.js", "Tailwind"] },
    { id: 3, title: "Fitness Tracker App", category: "Mobile Apps", description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics.", tech: ["React Native", "Firebase", "Redux"] },
    { id: 4, title: "Design System Kit", category: "UI/UX", description: "Comprehensive design system with reusable components and design tokens.", tech: ["Figma", "Storybook", "React"] },
    { id: 5, title: "CLI Tool Suite", category: "Open Source", description: "Collection of developer CLI tools for automating common development tasks.", tech: ["Node.js", "TypeScript", "Commander"] },
    { id: 6, title: "Portfolio Generator", category: "Open Source", description: "Open source tool to generate stunning portfolio websites from a config file.", tech: ["React", "Vite", "Tailwind CSS"] },
  ],
  experience: [
    { company: "TechCorp Inc.", role: "Senior Full Stack Developer", date: "2022 - Present", description: "Leading development of enterprise SaaS applications serving 100K+ users.", tech: ["React", "Node.js", "AWS", "PostgreSQL"] },
    { company: "StartupXYZ", role: "Full Stack Developer", date: "2020 - 2022", description: "Built the entire frontend architecture from scratch. Reduced deployment time by 60%.", tech: ["Vue.js", "Python", "Docker", "MongoDB"] },
    { company: "DesignStudio", role: "Frontend Developer & Designer", date: "2019 - 2020", description: "Created responsive web experiences for high-profile clients.", tech: ["React", "Figma", "Sass", "Storybook"] },
    { company: "FreelanceWork", role: "Freelance Developer", date: "2018 - 2019", description: "Delivered 20+ projects for clients worldwide.", tech: ["JavaScript", "PHP", "WordPress", "MySQL"] },
  ],
  testimonials: [
    { name: "Sarah Johnson", role: "CEO, TechStart", text: "John delivered an exceptional product that exceeded our expectations.", rating: 5 },
    { name: "Michael Chen", role: "CTO, InnovateCo", text: "Working with John was a game-changer for our team.", rating: 5 },
    { name: "Emily Rodriguez", role: "Product Manager, DesignHub", text: "An incredibly talented developer with an eye for design.", rating: 5 },
    { name: "David Park", role: "Founder, AppWorks", text: "John's full-stack capabilities and problem-solving skills are unmatched.", rating: 5 },
  ],
  contact: {
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    socials: [
      { platform: "GitHub", url: "#" },
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
    ],
  },
  footer: {
    name: "ahrion",
    tagline: "Tech Enthusiast · Developer · Problem Solver",
  },
};

const STORAGE_KEY = "portfolio-data";

function loadData(): PortfolioData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultData, ...JSON.parse(stored) };
  } catch {}
  return defaultData;
}

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
}

const PortfolioContext = createContext<PortfolioContextType>({
  data: defaultData,
  updateData: () => {},
  resetData: () => {},
});

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (newData: PortfolioData) => setData(newData);
  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
};
