import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";
const SPOTLIGHT_R = 260;

type Point = { x: number; y: number };

function RevealLayer({ image, cursor }: { image: string; cursor: Point }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mask, setMask] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, SPOTLIGHT_R);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.4, "rgba(255,255,255,1)");
      gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
      gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
      gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();
      setMask(canvas.toDataURL());
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [cursor]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 hidden" />
      <div
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})`, maskImage: `url(${mask})`, WebkitMaskImage: `url(${mask})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
      />
    </>
  );
}

export function Hero() {
  const mouse = useRef<Point>({ x: -999, y: -999 });
  const smooth = useRef<Point>({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [cursor, setCursor] = useState<Point>({ x: -999, y: -999 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => { mouse.current = { x: event.clientX, y: event.clientY }; };
    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursor({ ...smooth.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("pointermove", move, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(rafRef.current); };
  }, []);

  const jump = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black" style={{ height: "100dvh" }}>
      <div className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${BG_IMAGE_1})` }} />
      <RevealLayer image={BG_IMAGE_2} cursor={cursor} />
      <div className="absolute inset-0 z-40 bg-black/20" />

      <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <button onClick={() => jump("top")} className="flex items-center gap-2" aria-label="Tonio Yang 首页">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true"><path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" /></svg>
          <span className="font-playfair text-2xl italic text-white">Tonio.Yang</span>
        </button>
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          {[['ABOUT', 'about'], ['EARLY', 'early'], ['BUILD', 'build'], ['FUTURE', 'future']].map(([label, id], index) => <button key={id} onClick={() => jump(id)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${index === 0 ? "text-white" : "text-white/80 hover:bg-white/20 hover:text-white"}`}>{label}</button>)}
        </div>
        <a href="mailto:317946126@qq.com" className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 md:block">Contact</a>
        <button className="grid size-10 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="打开导航">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      {menuOpen && <div className="fixed right-4 top-16 z-[90] flex w-44 flex-col rounded-2xl border border-white/20 bg-black/75 p-2 backdrop-blur-xl md:hidden">{[['ABOUT', 'about'], ['EARLY', 'early'], ['BUILD', 'build'], ['FUTURE', 'future']].map(([label, id]) => <button key={id} className="rounded-xl px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white" onClick={() => jump(id)}>{label}</button>)}<a href="mailto:317946126@qq.com" className="rounded-xl px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white">Contact</a></div>}

      <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
        <p className="hero-anim hero-fade mb-4 text-xs font-medium tracking-[0.18em] text-white/75" style={{ animationDelay: "0.12s" }}>PERSONAL PRACTICE / TONIO.YANG</p>
        <h1 className="leading-[0.95] text-white">
          <span className="font-playfair hero-anim hero-reveal block text-5xl font-normal italic sm:text-7xl md:text-8xl" style={{ animationDelay: "0.25s" }}>Precision builds</span>
          <span className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl" style={{ animationDelay: "0.42s" }}>what can be felt</span>
        </h1>
      </div>

      <div className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[260px] md:left-14 sm:block" style={{ animationDelay: "0.7s" }}><p className="text-sm leading-relaxed text-white/85">用 Precision 构建逻辑，用 Sensibility 感受生活。每一次实践，都从一个值得被完成的想法开始。</p></div>
      <div className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14" style={{ animationDelay: "0.85s" }}><p className="text-xs leading-relaxed text-white/85 sm:text-sm">不只追求更快，也在意过程是否有感知。把复杂的工具、逻辑与体验，变成真正能被使用的东西。</p><button onClick={() => jump("about")} className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95">开始探索</button></div>
    </section>
  );
}
