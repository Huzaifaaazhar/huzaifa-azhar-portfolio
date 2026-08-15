import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PathSection } from "@/components/sections/PathSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PathSection />
      <CertificationsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FaqSection />
      <SiteFooter />
    </>
  );
}
