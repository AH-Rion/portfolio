import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import AnimatedBackground from "@/components/AnimatedBackground";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { AdminProvider } from "@/contexts/AdminContext";

const Index = () => {
  return (
    <PortfolioProvider>
      <AdminProvider>
        <LoadingScreen />
        <CustomCursor />
        <AnimatedBackground />
        <ScrollProgress />
        <Navbar />
        <AdminPanel />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </AdminProvider>
    </PortfolioProvider>
  );
};

export default Index;
