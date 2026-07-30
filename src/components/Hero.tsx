import { ArrowRight, Camera, Globe2, Send } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HERO_VIDEO = `${import.meta.env.BASE_URL}media/mobile/hero.mp4`;

function animateOpacity(element: HTMLVideoElement, from: number, to: number, duration = 500) {
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    element.style.opacity = String(from + (to - from) * progress);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealedRef = useRef(false);
  const fadingOutRef = useRef(false);

  const revealVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || revealedRef.current) return;
    revealedRef.current = true;
    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => undefined);
    animateOpacity(video, Number(video.style.opacity || 0), 1);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => revealVideo();
    const onTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration - video.currentTime <= 0.55 && Number(video.style.opacity || 1) > 0) {
        fadingOutRef.current = true;
        animateOpacity(video, Number(video.style.opacity || 1), 0);
      }
    };
    const onEnded = () => {
      video.style.opacity = "0";
      fadingOutRef.current = false;
      window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().finally(() => animateOpacity(video, 0, 1));
      }, 100);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) onCanPlay();
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5-page");
    document.addEventListener("WeixinJSBridgeReady", onCanPlay as EventListener);
    window.addEventListener("touchstart", onCanPlay, { once: true, passive: true });
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("WeixinJSBridgeReady", onCanPlay as EventListener);
      window.removeEventListener("touchstart", onCanPlay);
    };
  }, [revealVideo]);

  const scrollToWork = (event: FormEvent) => {
    event.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,_#0a0a0a_0%,_#1a2020_48%,_#050505_100%)]" />
      <video ref={videoRef} onCanPlay={revealVideo} onClick={revealVideo} className="absolute inset-0 h-full w-full object-cover object-bottom opacity-0" muted autoPlay playsInline preload="auto">
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />

      <nav className="relative z-20 px-5 py-5 sm:px-6 sm:py-6">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <a href="#top" aria-label="Tonio Yang home" className="flex items-center gap-2 text-lg font-semibold text-white">
            <Globe2 size={22} strokeWidth={1.5} />
            <span>Tonio.Yang</span>
          </a>
          <div className="hidden items-center gap-8 pl-8 text-sm font-medium text-white/80 md:flex">
            <a className="transition-colors hover:text-white" href="#about">关于</a>
            <a className="transition-colors hover:text-white" href="#work">实践</a>
            <a className="transition-colors hover:text-white" href="#contact">联系</a>
          </div>
          <a className="liquid-glass rounded-full px-4 py-2 text-sm font-medium text-white sm:px-6" href="mailto:317946126@qq.com">
            Contact
          </a>
        </div>
      </nav>

      <div id="top" className="relative z-10 flex flex-1 -translate-y-[10%] flex-col items-center justify-center px-5 py-12 text-center sm:px-6 md:-translate-y-[20%]">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mb-5 text-xs tracking-[0.26em] text-white/70 uppercase">
          Personal work archive / 2026
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="font-display whitespace-nowrap text-5xl tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          Make it <em className="italic">felt</em>.
        </motion.h1>
        <motion.form onSubmit={scrollToWork} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.45 }} className="liquid-glass mt-9 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-5 pr-2 sm:pl-6">
          <input aria-label="Explore projects" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/40" placeholder="Explore the way I build with AI" readOnly />
          <button aria-label="Explore projects" type="submit" className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105">
            <ArrowRight size={19} />
          </button>
        </motion.form>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }} className="mt-5 max-w-md px-3 text-sm leading-relaxed text-white/85">
          用 Precision 构建逻辑，用 Sensibility 感受生活。把想法做完整，也让体验真正被感知。
        </motion.p>
        <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="liquid-glass mt-7 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
          阅读我的方法论
        </button>
      </div>

      <div className="relative z-10 flex justify-center gap-3 pb-8 sm:gap-4 sm:pb-12">
        <a aria-label="Email Tonio Yang" className="liquid-glass grid size-11 place-items-center rounded-full text-white/80 transition-all hover:bg-white/5 hover:text-white" href="mailto:317946126@qq.com"><Send size={19} /></a>
        <a aria-label="Phone Tonio Yang" className="liquid-glass grid size-11 place-items-center rounded-full text-white/80 transition-all hover:bg-white/5 hover:text-white" href="tel:15386438973"><Globe2 size={19} /></a>
        <a aria-label="Visual journal" className="liquid-glass grid size-11 place-items-center rounded-full text-white/80 transition-all hover:bg-white/5 hover:text-white" href="#contact"><Camera size={19} /></a>
      </div>
    </section>
  );
}
