import { Reveal } from "./Reveal";

const PHILOSOPHY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

export function PhilosophySection() {
  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl">Precision <span className="font-display italic text-white/40">x</span> Sensibility</h2></Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <Reveal from="left"><div className="aspect-[4/3] overflow-hidden rounded-3xl bg-white/5"><video className="h-full w-full object-cover" muted autoPlay loop playsInline preload="auto"><source src={PHILOSOPHY_VIDEO} type="video/mp4" /></video></div></Reveal>
          <Reveal from="right" delay={0.1} className="flex flex-col justify-center">
            <div className="pb-8 md:pb-10"><p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">Choose the problem</p><p className="text-base leading-relaxed text-white/70 md:text-lg">我从感兴趣的 MVP 开始：从“今天吃什么”的静态页，到无畏契约英雄选择和经济推荐。每一次尝试都在确认，工具需要有清晰的使用理由。</p></div>
            <div className="h-px w-full bg-white/10" />
            <div className="pt-8 md:pt-10"><p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">Build the next version</p><p className="text-base leading-relaxed text-white/70 md:text-lg">从 Coze 的受限和高成本，到部署在 Vercel 的小工具，我把踩坑当成反馈。理解越深，越能在业务逻辑、模型和体验之间做出准确取舍。</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
