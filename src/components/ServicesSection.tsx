import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { LoopingVideo } from "./LoopingVideo";

const SERVICES = [
  {
    video: `${import.meta.env.BASE_URL}media/mobile/strategy.mp4`,
    tag: "Strategy",
    title: "探索与洞察",
    description: "从评论、卖点和消费者痛点中提炼问题，也反复校准 Prompt、模型和接口。好的工具始于足够清晰的观察。",
  },
  {
    video: `${import.meta.env.BASE_URL}media/mobile/craft.mp4`,
    tag: "Craft",
    title: "设计与落地",
    description: "新规文案输出、Amazon BSR 抓取扩展与更多实用小工具。该省省、该花花，用更合适的实现把想法真正交到用户手中。",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal><div className="mb-12 flex items-end justify-between md:mb-16"><h2 className="text-3xl tracking-tight text-white md:text-5xl">正在做的事</h2><p className="hidden text-sm text-white/40 md:block">Selected practice</p></div></Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.15}>
              <article className="liquid-glass group overflow-hidden rounded-3xl">
                <div className="aspect-video overflow-hidden"><LoopingVideo className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={service.video} /></div>
                <div className="p-6 md:p-8"><div className="mb-8 flex items-center justify-between"><p className="text-xs uppercase tracking-[0.2em] text-white/40">{service.tag}</p><motion.div whileHover={{ scale: 1.08 }} className="liquid-glass grid size-9 place-items-center rounded-full text-white"><ArrowUpRight size={17} /></motion.div></div><h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">{service.title}</h3><p className="text-sm leading-relaxed text-white/50">{service.description}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}><footer id="contact" className="mt-20 border-t border-white/10 py-8 text-sm text-white/50 md:mt-28 md:flex md:items-center md:justify-between"><p className="font-display text-2xl text-white/85">Keep making things <em>felt</em>.</p><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-5 md:mt-0"><a className="inline-flex items-center gap-2 transition-colors hover:text-white" href="mailto:317946126@qq.com"><Mail size={15} />317946126@qq.com</a><a className="inline-flex items-center gap-2 transition-colors hover:text-white" href="tel:15386438973"><Phone size={15} />15386438973</a></div></footer></Reveal>
      </div>
    </section>
  );
}
