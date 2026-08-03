import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const projects = [
  ["MVP / STATIC", "今天吃什么", "从 GitHub 复制上传代码开始，把第一个想法做成静态页面。"],
  ["GAME / LOGIC", "无畏契约选择器", "英雄随机选择，以及不同经济局的技能与装备推荐。"],
  ["AGENT / TRIAL", "Coze 试错", "费用过高、国内模型受限，也难以承载复杂动态需求。"],
  ["TOOL / OUTPUT", "新规文案输出", "从设计试验走向真正能被大家使用的小工具。"],
  ["EXTENSION / BSR", "Amazon BSR 抓取", "Chrome 扩展中转反爬流程，主打该省省、该花花。"],
] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (start: number, end: number, value: number) => {
  const x = clamp((value - start) / (end - start));
  return x * x * (3 - 2 * x);
};
const segment = (value: number, enterStart: number, enterEnd: number, exitStart: number, exitEnd: number) => {
  const enter = smoothstep(enterStart, enterEnd, value);
  const exit = smoothstep(exitStart, exitEnd, value);
  return enter * (1 - exit);
};

function FlowLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2);
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let row = 0; row < 6; row += 1) {
        context.beginPath();
        for (let x = -90; x < width + 90; x += 14) {
          const y = height * (0.2 + row * 0.12) + Math.sin(x * 0.008 + time + row) * 18 + Math.cos(x * 0.017 - time * 0.7) * 9;
          if (x === -90) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.strokeStyle = row % 2 ? "rgba(153,183,255,.17)" : "rgba(242,163,182,.11)";
        context.lineWidth = 1;
        context.stroke();
      }
      if (!reduced) { time += 0.007; frame = requestAnimationFrame(draw); }
    };
    resize();
    draw();
    addEventListener("resize", resize);
    return () => { removeEventListener("resize", resize); cancelAnimationFrame(frame); };
  }, []);

  return <canvas ref={canvasRef} className="field-lines" aria-hidden="true" />;
}

export function CinematicPage() {
  const sceneRef = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState<number>(projects.length);
  const [trackX, setTrackX] = useState(0);
  const [jumping, setJumping] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cards = useMemo(() => Array.from({ length: 3 }, (_, group) => projects.map((project, index) => ({ project, index: group * projects.length + index }))).flat(), []);

  const updateSlider = useCallback((index: number, instant = false) => {
    const card = trackRef.current?.querySelector<HTMLElement>(".field-card");
    if (!card || !trackRef.current) return;
    const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || "0");
    if (instant) setJumping(true);
    setActive(index);
    setTrackX(-(card.offsetWidth + gap) * index);
    if (instant) requestAnimationFrame(() => requestAnimationFrame(() => setJumping(false)));
  }, []);

  const normalize = () => {
    if (active >= projects.length * 2) updateSlider(active - projects.length, true);
    else if (active < projects.length) updateSlider(active + projects.length, true);
  };

  useEffect(() => {
    updateSlider(projects.length, true);
    const resize = () => updateSlider(active, true);
    addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      const scene = sceneRef.current;
      if (!scene) return;
      const distance = clamp(-scene.getBoundingClientRect().top, 0, scene.offsetHeight - innerHeight);
      const heroOut = smoothstep(120, 780, distance);
      const thesis = segment(distance, 540, 980, 1380, 1720);
      const journey = segment(distance, 1450, 1880, 2450, 2780);
      const future = segment(distance, 2500, 2850, 3160, 3430);
      const slider = smoothstep(3180, 3820, distance);
      const progress = clamp(distance / 3900);
      scene.style.setProperty("--scene-progress", progress.toFixed(4));
      scene.style.setProperty("--hero-out", heroOut.toFixed(4));
      scene.style.setProperty("--thesis-in", thesis.toFixed(4));
      scene.style.setProperty("--journey-in", journey.toFixed(4));
      scene.style.setProperty("--future-in", future.toFixed(4));
      scene.style.setProperty("--slider-in", slider.toFixed(4));
    };
    const request = () => { if (!frameRef.current) frameRef.current = requestAnimationFrame(update); };
    addEventListener("scroll", request, { passive: true });
    update();
    return () => { removeEventListener("scroll", request); cancelAnimationFrame(frameRef.current); };
  }, []);

  const goTo = (distance: number) => {
    const scene = sceneRef.current;
    if (scene) scrollTo({ top: scene.offsetTop + distance, behavior: "smooth" });
  };

  return <main className="personal-field">
    <section ref={sceneRef} className="field-scroll" id="top">
      <div className="field-stage">
        <div className="mountain-bg" />
        <div className="mountain-shade" />
        <FlowLines />

        <header className="field-topbar">
          <button className="field-wordmark" onClick={() => goTo(0)}>TONIO<span>.</span>YANG</button>
          <nav><button onClick={() => goTo(650)}>理解</button><button onClick={() => goTo(1550)}>探索</button><button onClick={() => goTo(2600)}>未来</button><a href="mailto:317946126@qq.com" aria-label="联系我"><ArrowUpRight size={15} /></a></nav>
        </header>

        <section className="field-hero">
          <div className="field-eyebrow">PERSONAL FIELD / 2026</div>
          <h1>用 <em>Precision</em> 构建逻辑，<br />用 <em>Sensibility</em> 感受生活。</h1>
          <p>你好，我是 Tonio.Yang。一个持续在产品、技术和人之间寻找更好连接方式的创造者。</p>
        </section>
        <aside className="field-contact"><span>CURRENTLY / BUILDING</span><p>把复杂的问题，转化为值得被使用的体验。</p><a href="mailto:317946126@qq.com">317946126@qq.com</a><a href="tel:15386438973">15386438973</a></aside>
        <div className="field-scroll-cue"><span />SCROLL TO EXPLORE</div>

        <section className="field-panel field-thesis">
          <span className="panel-index">01 / UNDERSTANDING</span>
          <h2>做出来不难，<br /><em>想清楚才难。</em></h2>
          <p>不断 Vibe Coding 后，我发现用 AI Agent 做一个东西并不难。真正难的是构造一个有意义的想法、完整地呈现它，并让呈现的形式能够教育用户。</p>
        </section>

        <section className="field-panel field-journey" id="journey">
          <span className="panel-index">02 / FROM MVP TO TOOL</span>
          <h2>从感兴趣的 MVP 出发，<br />在踩坑中建立方法。</h2>
          <div className="journey-grid"><div><b>前期</b><p>从“今天吃什么”的静态页，到无畏契约英雄选择和经济推荐，再到 Coze 的高成本与模型限制。</p></div><div><b>中期</b><p>在 Vercel 上完成评论、卖点、痛点、标题工具，并逐步做出新规文案和 Amazon BSR 抓取等可用工具。</p></div></div>
        </section>

        <section className="field-panel field-future">
          <span className="panel-index">03 / NO FINAL PHASE</span>
          <h2>没有后期。<br /><em>学无止境。</em></h2>
          <p>通过开源项目接触不同知识与多种小工具，后续逐步将部分内容部署到国内 IP。AI 工具持续更新，Agent 门槛持续降低，争取吃到部分时代红利。</p>
        </section>

        <section className="field-slider" aria-label="项目无限滑块">
          <div className="slider-heading"><span>04 / SELECTED EXPERIMENTS</span><h2>想法经过实践，<em>才有形状。</em></h2></div>
          <div className={`field-track ${jumping ? "no-transition" : ""}`} ref={trackRef} style={{ transform: `translate3d(${trackX}px,0,0)` }} onTransitionEnd={normalize}>
            {cards.map(({ project, index }) => <article className={`field-card ${active === index ? "active" : ""}`} key={index} tabIndex={0} onClick={() => updateSlider(index)}><span>{project[0]}</span><b>{String((index % projects.length) + 1).padStart(2, "0")}</b><h3>{project[1]}</h3><p>{project[2]}</p></article>)}
          </div>
          <div className="field-controls"><button onClick={() => updateSlider(active - 1)} aria-label="上一个项目"><ArrowLeft size={18} /></button><button onClick={() => updateSlider(active + 1)} aria-label="下一个项目"><ArrowRight size={18} /></button></div>
        </section>
      </div>
    </section>
    <footer className="field-footer"><span>TONIO.YANG / PERSONAL FIELD</span><div><a href="mailto:317946126@qq.com">317946126@qq.com</a><a href="tel:15386438973">15386438973</a></div></footer>
  </main>;
}
