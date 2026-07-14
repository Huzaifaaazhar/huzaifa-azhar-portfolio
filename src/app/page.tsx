import { Hero } from "@/components/sections/Hero";
import { ProductsTeaser } from "@/components/sections/ProductsTeaser";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsTeaser />
      <Approach />
      <ContactSection />
    </>
  );
}
