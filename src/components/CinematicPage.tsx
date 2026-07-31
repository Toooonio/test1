import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ASSETS = {
  sky: "https://raft-blast-61784561.figma.site/_assets/v11/16b5007d9c93971e26ffe4e0e3e37946f6bd538c.png",
  glow: "https://raft-blast-61784561.figma.site/_assets/v11/8a7f8af50e0ce92ec2e228e7b0b4112178c51cf1.png",
  bazaar: "https://raft-blast-61784561.figma.site/_assets/v11/864afe00e41e2fa20a5aa546e15cb807e0f81384.png",
  left: "https://raft-blast-61784561.figma.site/_assets/v11/7536d7b60a1fce482cf6edf3f0bffd3bad5d0f8a.png",
  right: "https://raft-blast-61784561.figma.site/_assets/v11/392db6a6a6b98e868bd7f8d3f55bb719d51e5028.png",
  bridge: "https://raft-blast-61784561.figma.site/_assets/v11/c6a6d8ef49bca43f708aa852692942c45ec950d4.png",
  river: "https://raft-blast-61784561.figma.site/_assets/v11/ba75252bab2b1c510987b74837770f7bc8a6b2d4.png",
  icons: [
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230438_d526b8b6-8a2e-4e3b-9993-3908acae03a7.png",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230442_140bc25b-b165-4249-904a-f708bff6970e.png",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260730_230448_825949c9-ccdb-4857-b4a6-e349eccc9010.png",
  ],
};

const projects = [
  ["第一个 MVP", "今天吃什么", "从 GitHub 复制上传代码开始，把第一个想法做成静态页面。", 0],
  ["动态逻辑", "无畏契约选择器", "英雄随机选择，以及不同经济局的技能与装备推荐。", 1],
  ["低代码试错", "Coze", "费用过高、国内模型受限，也难以承载复杂动态需求。", 2],
  ["实用工具", "新规文案输出", "从设计试验走向能被真实使用的小工具。", 0],
  ["零成本破局", "Amazon BSR 抓取", "Chrome 扩展中转反爬流程，主打该省省、该花花。", 1],
] as const;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (e0: number, e1: number, v: number) => { const x = clamp((v - e0) / (e1 - e0)); return x * x * (3 - 2 * x); };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const segmentInOut = (s: number, a: number, b: number, c: number, d: number) => { const enter = smoothstep(a, b, s); const exit = smoothstep(c, d, s); return { enter, exit, active: enter * (1 - exit) }; };

export function CinematicPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const rafPending = useRef(false);
  const state = useRef({ targetMouseX: 0, targetMouseY: 0, mouseX: 0, mouseY: 0, targetScroll: 0, smoothScroll: 0, initialized: false });
  const [activeSight, setActiveSight] = useState<number>(projects.length);
  const cards = useMemo(() => Array.from({ length: 3 }, (_, setIndex) => projects.map((project, cardIndex) => ({ project, index: setIndex * projects.length + cardIndex }))).flat(), []);

  const updateSlider = useCallback((index: number, jumping = false) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".sight-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    if (jumping) track.classList.add("is-jumping");
    document.documentElement.style.setProperty("--sights-shift", `${-(card.offsetWidth + gap) * index}px`);
    setActiveSight(index);
    if (jumping) requestAnimationFrame(() => requestAnimationFrame(() => track.classList.remove("is-jumping")));
  }, []);

  const normalizeSlider = useCallback(() => {
    if (activeSight >= projects.length * 2) updateSlider(activeSight - projects.length, true);
    else if (activeSight < projects.length) updateSlider(activeSight + projects.length, true);
  }, [activeSight, updateSlider]);

  const requestTick = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    frameRef.current = requestAnimationFrame(() => {
      rafPending.current = false;
      const section = sectionRef.current;
      if (!section) return;
      const root = document.documentElement;
      const s = state.current;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      s.targetScroll = clamp(-section.getBoundingClientRect().top, 0, section.offsetHeight - innerHeight);
      if (!s.initialized || reduced) { s.smoothScroll = s.targetScroll; s.initialized = true; } else s.smoothScroll = lerp(s.smoothScroll, s.targetScroll, 0.14);
      if (Math.abs(s.smoothScroll - s.targetScroll) < 0.08) s.smoothScroll = s.targetScroll;
      s.mouseX = lerp(s.mouseX, s.targetMouseX, 0.12); s.mouseY = lerp(s.mouseY, s.targetMouseY, 0.12);
      const scroll = s.smoothScroll;
      const frame2 = segmentInOut(scroll, 560, 900, 1300, 1620);
      const frame3 = segmentInOut(scroll, 1760, 2140, 2540, 2700);
      const progress = clamp(scroll / 2700);
      const introExit = smoothstep(90, 650, scroll);
      const sightsEnter = Math.pow(smoothstep(2760, 3560, scroll), 1.55);
      const controlsEnter = smoothstep(3360, 3660, scroll);
      const blurActive = clamp(frame2.active + frame3.active);
      const splitDrift = Math.pow(frame2.enter, 1.5);
      const backScale = 0.76 + progress * 0.2 + frame2.enter * 0.18 + frame3.enter * 0.16;
      const sharedHeroY = progress * -74;
      const sharedHeroScale = progress * 0.23;
      const sightsScreenTop = Math.min(220, Math.max(112, innerHeight * 0.19)) - 50;
      const sightsParentTop = innerHeight - (innerHeight - sightsScreenTop) / backScale;
      const mx = reduced ? 0 : s.mouseX, my = reduced ? 0 : s.mouseY;
      const set = (name: string, value: string | number) => root.style.setProperty(name, String(value));
      set("--mx", mx.toFixed(4)); set("--my", my.toFixed(4));
      set("--back-opacity", (1 - frame2.active * 0.06).toFixed(4)); set("--back-x", `${mx * -12}px`); set("--back-y", `${my * -4}px`); set("--back-scale", backScale.toFixed(4));
      set("--four-y", `${10 + progress * 10}vh`); set("--four-scale", (0.78 + progress * 0.16).toFixed(4)); set("--bazaar-y", `${20 - progress * 8}vh`);
      set("--blur-px", `${blurActive * 14}px`); set("--back-brightness", (1 - blurActive * 0.255).toFixed(4)); set("--bazaar-blur-px", `${frame2.active * 14}px`); set("--bazaar-brightness", (1 - frame2.active * 0.255 - frame3.active * 0.06).toFixed(4)); set("--bazaar-saturation", (1 + frame3.active * 0.18).toFixed(4));
      set("--shade-z", frame2.active > 0.02 ? "2" : "0"); set("--shade-top-alpha", (blurActive * 0.465).toFixed(4)); set("--shade-mid-alpha", (blurActive * 0.42).toFixed(4)); set("--shade-bottom-alpha", (blurActive * 0.51).toFixed(4));
      set("--title-y", `${introExit * -210}px`); set("--title-scale", (1 - introExit * 0.08).toFixed(4)); set("--title-opacity", (1 - introExit).toFixed(4));
      set("--bridge-x", `calc(-50% + ${mx * 18}px)`); set("--bridge-y", `${my * 8 + sharedHeroY - frame2.exit * 760}px`); set("--bridge-bottom", `${5 - frame2.enter * 13}vh`); set("--bridge-width", `${67.2 + frame2.enter * 37.8}vw`); set("--bridge-scale", (1.02 + sharedHeroScale + frame2.exit * 0.46).toFixed(4));
      set("--split-left-x", `calc(-50% + ${-splitDrift * 46}vw + ${mx * 22}px)`); set("--split-left-y", `${my * 10 + sharedHeroY - splitDrift * 180}px`); set("--split-left-scale", (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(4));
      set("--split-right-x", `calc(-50% + ${splitDrift * 46}vw + ${mx * 22}px)`); set("--split-right-y", `${my * 10 + sharedHeroY - splitDrift * 180}px`); set("--split-right-scale", (1 + sharedHeroScale + frame2.enter * 0.74).toFixed(4));
      set("--frame2-opacity", (frame2.active * (1 - frame3.enter)).toFixed(4)); set("--frame2-x", `calc(-50% + ${mx * 10}px)`); set("--frame2-y", `calc(-50% + ${my * 8 - frame2.exit * 150}px)`); set("--frame2-scale", (1.06 + frame2.enter * 0.08 + frame2.exit * 0.08).toFixed(4));
      set("--intro-copy-y", `${introExit * 90}px`); set("--intro-copy-opacity", (1 - introExit).toFixed(4)); set("--panel2-opacity", (frame2.active * (1 - frame2.exit)).toFixed(4)); set("--panel2-y", `calc(-50% + ${-frame2.exit * 86 + (1 - frame2.enter) * 58}px)`); set("--panel3-opacity", (frame3.active * (1 - frame3.exit)).toFixed(4)); set("--panel3-y", `calc(-50% + ${-frame3.exit * 86 + (1 - frame3.enter) * 58}px)`);
      set("--sights-controls-opacity", controlsEnter.toFixed(4)); controlsRef.current?.classList.toggle("is-ready", controlsEnter > 0.98); set("--sights-visibility", sightsEnter > 0.01 ? "visible" : "hidden"); set("--sights-enter-x", `${(1 - sightsEnter) * 420}vw`); set("--sights-scale", (1 / backScale).toFixed(4)); set("--sights-top", `${sightsParentTop}px`); set("--sights-screen-top", `${sightsScreenTop}px`);
      if (Math.abs(s.smoothScroll - s.targetScroll) > 0.08 || Math.abs(s.mouseX - s.targetMouseX) > 0.001 || Math.abs(s.mouseY - s.targetMouseY) > 0.001) requestTick();
    });
  }, []);

  useEffect(() => {
    const scroll = () => requestTick();
    const resize = () => { updateSlider(activeSight); requestTick(); };
    const pointer = (event: PointerEvent) => { state.current.targetMouseX = event.clientX / innerWidth - 0.5; state.current.targetMouseY = event.clientY / innerHeight - 0.5; requestTick(); };
    addEventListener("scroll", scroll, { passive: true }); addEventListener("resize", resize); addEventListener("pointermove", pointer, { passive: true });
    updateSlider(activeSight); requestTick();
    return () => { removeEventListener("scroll", scroll); removeEventListener("resize", resize); removeEventListener("pointermove", pointer); cancelAnimationFrame(frameRef.current); };
  }, [activeSight, requestTick, updateSlider]);

  const move = (direction: number) => updateSlider(activeSight + direction);

  return <main className="site-shell">
    <section ref={sectionRef} className="cinema-scroll" id="cinema" aria-label="Tonio Yang cinematic scroll story">
      <div className="stage"><div className="world">
        <img className="scene-img sky-img" src={ASSETS.sky} alt="" />
        <header className="site-header"><a className="site-logo" href="#cinema">Tonio.Yang</a><nav className="site-nav"><a href="#cinema">理解</a><a href="#early">前期</a><a href="#build">中期</a><a href="#future">未来</a></nav><a className="language-switcher" href="mailto:317946126@qq.com"><span>联系</span><span aria-hidden="true">↗</span></a></header>
        <div className="back-stack">
          <img className="scene-img back-img back-four" src={ASSETS.glow} alt="" />
          <section className="sights-slider" aria-label="个人项目滑动列表"><div ref={trackRef} className="sights-track" onTransitionEnd={normalizeSlider}>{cards.map(({ project, index }) => <article key={index} tabIndex={0} role="button" aria-label={`查看${project[1]}`} onClick={() => updateSlider(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); updateSlider(index); } }} className={`sight-card ${activeSight === index ? "is-active" : ""}`}><span className="sight-kicker">{project[0]}</span><img className="sight-pin" src={ASSETS.icons[project[3]]} alt="" /><h3>{project[1]}</h3><p>{project[2]}</p></article>)}</div></section>
          <img className="scene-img back-img back-bazaar" src={ASSETS.bazaar} alt="" />
        </div>
        <div ref={controlsRef} className="sights-controls" aria-label="项目滑动控制"><button className="sight-nav" onClick={() => move(-1)} aria-label="上一个项目">←</button><button className="sight-nav" onClick={() => move(1)} aria-label="下一个项目">→</button></div>
        <h1 className="hero-title">TONIO</h1>
        <img className="scene-img splitframe-img splitframe-left" src={ASSETS.left} alt="" /><img className="scene-img splitframe-img splitframe-right" src={ASSETS.right} alt="" /><img className="scene-img bridge-img" src={ASSETS.bridge} alt="" /><img className="scene-img frame-two-img" src={ASSETS.river} alt="" /><div className="shade" />
        <section className="intro-copy"><p>用 Precision 构建逻辑，用 Sensibility 感受生活。把想法做完整，也让体验真正被感知。</p><div className="hero-tags"><span>Precision</span><span>Sensibility</span><span>AI Agent</span></div></section>
        <section id="early" className="story-panel story-panel-bridge"><h2>想法，是整个过程的罗盘。</h2><p>用 AI Agent 做出东西并不难，难的是构造一个有意义的想法、完整呈现，并让呈现本身能够教育用户。</p><dl className="facts"><div><dt>MVP</dt><dd>从兴趣开始探索</dd></div><div><dt>Coze</dt><dd>理解工具的边界</dd></div></dl></section>
        <section id="build" className="story-panel story-panel-bazaar"><h2>实践，让理解保持具体。</h2><p>从 Vercel 上的设计试验，到新规文案输出和 Amazon BSR 抓取，踩坑、校准，再把工具交到用户手中。</p><a href="#future" className="note-button"><span aria-hidden="true">↗</span><span>继续查看未来</span></a></section>
      </div></div>
    </section>
    <footer id="future" className="cinema-footer"><p>没有后期，学无止境。</p><h2>AI 工具持续更新，Agent 门槛持续降低。通过开源项目继续学习，并逐步把部分内容部署到国内 IP。</h2><div><a href="mailto:317946126@qq.com">317946126@qq.com</a><a href="tel:15386438973">15386438973</a></div></footer>
  </main>;
}
