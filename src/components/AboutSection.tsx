import { Reveal } from "./Reveal";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal><p className="text-sm uppercase tracking-[0.2em] text-white/40">About</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-5xl text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            从想法出发，<span className="font-display italic text-white/60">把过程做得有感知</span>，
            <br className="hidden md:block" />
            为那些愿意创造、构建与持续迭代的人。
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
