import { ArrowUpRight, Mail, Phone } from "lucide-react";

const early = [
  ["今天吃什么", "从 GitHub 复制上传代码开始的静态页，也是第一个把想法变成页面的 MVP。"],
  ["无畏契约选择器", "英雄随机选择、不同经济局的技能与装备推荐，开始理解动态逻辑。"],
  ["Coze 试错", "体验过成熟 Agent 编程工具的高成本、模型限制与复杂需求边界，转向自建。"],
];

const build = [
  ["踩坑与校准", "评论与卖点提取器、消费者痛点提取、标题文案更改。问题不只在工具，部分 Prompt 输入不到位，部分模型也未连接 API 接口。"],
  ["真正可用的小工具", "部署在 Vercel：新规文案输出、Amazon BSR 榜单抓取。针对反爬系统，用 Chrome 扩展中转过渡，不接昂贵反爬 API，主打该省省、该花花。"],
];

export function StorySections() {
  return <div className="bg-[#10100f]">
    <section id="about" className="border-b border-white/15 px-5 py-24 sm:px-10 md:px-14 md:py-36"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.7fr_1.3fr]"><p className="text-xs tracking-[0.18em] text-[#e8702a]">01 / ABOUT</p><div><h2 className="font-playfair max-w-3xl text-5xl leading-none italic text-white sm:text-7xl">想法本身只是开始，<br />呈现方式才决定它能否被感知。</h2><p className="mt-10 max-w-xl text-base leading-relaxed text-white/65">不断 vibe coding 会发现，用 AI Agent 做一个东西不难。难的是构造一个有意义的想法、如何完整呈现，以及呈现的形式如何教育用户。</p></div></div></section>
    <section id="early" className="border-b border-white/15 px-5 py-24 sm:px-10 md:px-14 md:py-36"><div className="mx-auto max-w-6xl"><div className="mb-14 flex items-end justify-between"><div><p className="text-xs tracking-[0.18em] text-[#e8702a]">02 / EARLY</p><h2 className="mt-4 text-4xl text-white sm:text-6xl">从感兴趣的 MVP 出发</h2></div><span className="hidden text-sm text-white/40 sm:block">探索，不急于定义</span></div><div className="border-t border-white/15">{early.map(([title, body], index) => <article key={title} className="group grid gap-4 border-b border-white/15 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-start"><span className="font-playfair text-3xl italic text-white/35">0{index + 1}</span><div><h3 className="text-xl text-white">{title}</h3><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">{body}</p></div><ArrowUpRight className="hidden text-white/50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" /></article>)}</div></div></section>
    <section id="build" className="border-b border-white/15 bg-[#171715] px-5 py-24 sm:px-10 md:px-14 md:py-36"><div className="mx-auto max-w-6xl"><p className="text-xs tracking-[0.18em] text-[#e8702a]">03 / BUILD</p><div className="mt-5 grid gap-12 md:grid-cols-[1fr_1fr]"><h2 className="font-playfair text-5xl leading-none italic text-white sm:text-7xl">理解加深之后，<br />灵活使用。</h2><p className="max-w-md self-end text-base leading-relaxed text-white/60">动态网站搭建在 Vercel 上，从设计试验走到实用工具。每一次不可用，都是下一版的排查记录。</p></div><div className="mt-16 grid gap-5 md:grid-cols-2">{build.map(([title, body], index) => <article key={title} className="border-t border-white/25 py-7"><p className="text-sm text-[#e8702a]">0{index + 1}</p><h3 className="mt-8 text-2xl text-white">{title}</h3><p className="mt-4 text-sm leading-relaxed text-white/60">{body}</p></article>)}</div></div></section>
    <section id="future" className="px-5 py-24 sm:px-10 md:px-14 md:py-36"><div className="mx-auto max-w-6xl"><p className="text-xs tracking-[0.18em] text-[#e8702a]">04 / FUTURE</p><h2 className="font-playfair mt-5 max-w-5xl text-5xl leading-none italic text-white sm:text-7xl md:text-8xl">没有后期。<br />学无止境。</h2><div className="mt-16 grid gap-10 border-t border-white/15 pt-8 md:grid-cols-2"><p className="max-w-lg text-base leading-relaxed text-white/65">通过开源项目接触不同知识与多种小工具，后续逐步将部分内容部署到国内 IP。AI 工具持续更新，Agent 使用门槛持续降低，争取吃到部分时代红利。</p><div id="contact" className="flex flex-col gap-4 text-sm text-white/70 md:items-end"><a className="flex items-center gap-2 transition-colors hover:text-white" href="mailto:317946126@qq.com"><Mail size={16} />317946126@qq.com</a><a className="flex items-center gap-2 transition-colors hover:text-white" href="tel:15386438973"><Phone size={16} />15386438973</a></div></div></div></section>
  </div>;
}
