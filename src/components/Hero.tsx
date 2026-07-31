import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

const topics = [
  { label: "理解与思考", target: "about" },
  { label: "早期探索", target: "early" },
  { label: "工具落地", target: "build" },
  { label: "未来持续", target: "future" },
];

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (interval) window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const previousX = useRef<number | null>(null);
  const seeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024 || !Number.isFinite(video.duration)) return;
      if (previousX.current === null) {
        previousX.current = event.clientX;
        return;
      }
      const delta = event.clientX - previousX.current;
      previousX.current = event.clientX;
      targetTime.current = Math.min(video.duration, Math.max(0, targetTime.current + (delta / window.innerWidth) * 0.8 * video.duration));
      if (!seeking.current) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };
    const onSeeked = () => {
      seeking.current = false;
      if (Math.abs(video.currentTime - targetTime.current) > 0.02) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };
    const onMetadata = () => { targetTime.current = Math.min(video.duration, video.duration * 0.08); };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onMetadata);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.innerWidth >= 1024) return;
    video.autoplay = true;
    video.muted = true;
    void video.play().catch(() => undefined);
  }, []);

  return (
    <div className="order-last relative aspect-square w-full overflow-hidden bg-neutral-50 pointer-events-none md:aspect-video lg:order-none lg:absolute lg:inset-0 lg:z-0 lg:h-full lg:aspect-auto lg:bg-transparent">
      <video ref={videoRef} muted playsInline preload="auto" loop className="h-full w-full object-cover object-right lg:object-right-bottom">
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-white/10 lg:bg-gradient-to-r lg:from-white lg:via-white/70 lg:to-transparent" />
    </div>
  );
}

export function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const { displayed, done } = useTypewriter("让想法完整呈现，\n也让过程被感知。", 55, 450);

  const toggleService = (label: string) => {
    setServices((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  };
  const jump = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative flex min-h-screen flex-col lg:block">
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-transparent px-5 py-4 sm:px-8 sm:py-5">
        <button onClick={() => jump("top")} className="flex items-center gap-3" aria-label="Tonio Yang 首页">
          <span className="select-none text-[21px] font-medium text-black sm:text-[26px]">Tonio.Yang<sup className="ml-0.5 text-[9px]">®</sup></span>
          <span className="mb-1 select-none text-[25px] font-medium leading-none text-black sm:text-[30px]">✱</span>
        </button>
        <nav className="hidden flex-row text-[23px] text-black md:flex">
          {[['关于', 'about'], ['探索', 'early'], ['实践', 'build'], ['未来', 'future']].map(([label, id], index) => <span key={id} className="flex"><button onClick={() => jump(id)} className="transition-opacity hover:opacity-60">{label}</button>{index < 3 && <span className="opacity-40">,&nbsp;</span>}</span>)}
        </nav>
        <a href="mailto:317946126@qq.com" className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:block">联系我</a>
        <button onClick={() => setIsMobileMenuOpen((open) => !open)} className="relative z-20 flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden" aria-label="打开导航">
          <span className={`h-[2px] w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-black transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </header>

      <div className={`fixed inset-0 z-20 flex flex-col justify-center bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
        {[['关于', 'about'], ['早期探索', 'early'], ['工具实践', 'build'], ['未来', 'future']].map(([label, id]) => <button key={id} onClick={() => jump(id)} className="border-b border-neutral-200 py-5 text-left text-3xl text-black">{label}</button>)}
        <a href="mailto:317946126@qq.com" className="mt-8 text-lg text-black underline">317946126@qq.com</a>
      </div>

      <BackgroundVideo />

      <div className="relative z-10 order-first flex w-full flex-col bg-white pb-8 lg:order-none lg:min-h-screen lg:bg-transparent lg:pb-0">
        <main id="spade-hero" className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12 pt-28 sm:px-8 lg:py-28">
          <div className="max-w-3xl lg:max-w-[58%]">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="mb-8 w-full whitespace-pre-wrap text-5xl font-normal leading-[1.08] text-black select-none md:text-6xl lg:text-[76px]">{displayed}{!done && <span className="animate-blink ml-[2px] inline-block h-[1.1em] w-[2px] align-middle bg-black" />}</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="mb-12 max-w-2xl text-lg font-normal leading-relaxed text-[#5A635A] md:text-xl">用 Precision 构建逻辑，用 Sensibility 感受生活。<br />用 AI 做出东西不难，难的是找到有意义的想法，并把它完整地交给用户。</p>
            </motion.div>

            <div>
              <h2 className="mb-2 text-2xl font-medium text-black">你想先了解哪一部分？</h2>
              <p className="mb-7 text-[#738273] opacity-85">可多选，选择后进入对应内容</p>
              <div className="flex flex-wrap gap-3">
                {topics.map(({ label }) => {
                  const active = services.includes(label);
                  return <motion.button key={label} whileTap={{ scale: 0.96 }} onClick={() => toggleService(label)} className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-colors ${active ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5" : "border border-[#F1F3F1] bg-white text-[#1C2E1E] hover:bg-[#F1F3F1]/55"}`}>{active && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}><Check size={15} /></motion.span>}{label}</motion.button>;
                })}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {services.length === 0 ? <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="mt-5 text-xs italic text-[#1C2E1E]">点击上方选项，建立你的浏览路径。</motion.p> : <motion.div key="active" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-5 overflow-hidden"><div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#F1F3F1] bg-[#FAFBF9] p-4 sm:flex-row sm:items-center"><span className="text-sm text-[#1C2E1E]">准备查看：{services.join("、")}</span><button onClick={() => jump(topics.find((topic) => services.includes(topic.label))?.target ?? "about")} className="shrink-0 text-xs uppercase text-[#4D6D47]">开始查看 →</button></div></motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
