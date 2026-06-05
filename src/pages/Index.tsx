import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import AnimatedBackground from "@/components/AnimatedBackground";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { AdminProvider } from "@/contexts/AdminContext";

const Index = () => {
  return (
    <PortfolioProvider>
      <AdminProvider>
        <AnimatedBackground />
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <Sidebar />
        <AdminPanel />
        <main className="md:ml-[72px] relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </main>
      </AdminProvider>
    </PortfolioProvider>
  );
};

export default Index;
