import { AboutSection } from "./components/AboutSection";
import { FeaturedVideoSection } from "./components/FeaturedVideoSection";
import { Hero } from "./components/Hero";
import { PhilosophySection } from "./components/PhilosophySection";
import { ServicesSection } from "./components/ServicesSection";

export default function App() {
  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </main>
  );
}
