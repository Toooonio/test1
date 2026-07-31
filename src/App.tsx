import { Hero } from "./components/Hero";
import { StorySections } from "./components/StorySections";

export default function App() {
  return (
    <div className="relative flex flex-col overflow-x-hidden bg-white font-sans text-neutral-900 antialiased selection:bg-[#EAECE9] selection:text-[#1C2E1E] lg:block lg:min-h-screen">
      <Hero />
      <StorySections />
    </div>
  );
}
