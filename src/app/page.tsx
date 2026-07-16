import { Hero } from "@/components/sections/Hero";
import { ProductsTeaser } from "@/components/sections/ProductsTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { Approach } from "@/components/sections/Approach";
import { Writing } from "@/components/sections/Writing";
import { ContactSection } from "@/components/sections/ContactSection";
import { BigBangIntro } from "@/components/motion/BigBangIntro";

export default function Home() {
  return (
    <>
      <BigBangIntro />
      <Hero />
      <ProductsTeaser />
      <Testimonials />
      <Approach />
      <Writing />
      <ContactSection />
    </>
  );
}
