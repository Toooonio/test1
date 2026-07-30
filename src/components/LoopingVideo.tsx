import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type LoopingVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export function LoopingVideo({ src, poster, className }: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("x5-playsinline", "true");
      video.setAttribute("x5-video-player-type", "h5-page");
      void video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) play();
    video.addEventListener("canplay", play);
    document.addEventListener("WeixinJSBridgeReady", play as EventListener);
    window.addEventListener("touchstart", play, { once: true, passive: true });
    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", play);
      document.removeEventListener("WeixinJSBridgeReady", play as EventListener);
      window.removeEventListener("touchstart", play);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#111]">
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={videoRef}
        poster={poster}
        className={`absolute inset-0 ${className ?? ""} transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={() => {
          const video = videoRef.current;
          if (video) void video.play().catch(() => undefined);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isPlaying && (
        <button
          type="button"
          aria-label="播放视频"
          onClick={() => {
            const video = videoRef.current;
            if (video) void video.play().catch(() => undefined);
          }}
          className="liquid-glass absolute left-1/2 top-1/2 z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white transition-transform hover:scale-105"
        >
          <Play size={18} fill="currentColor" />
        </button>
      )}
    </div>
  );
}
