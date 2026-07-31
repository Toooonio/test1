import { Hero } from "./components/Hero";
import { StorySections } from "./components/StorySections";

export default function App() {
  return (
    <main className="bg-[#10100f] text-white selection:bg-[#e8702a] selection:text-white">
      <Hero />
      <StorySections />
    </main>
  );
}
