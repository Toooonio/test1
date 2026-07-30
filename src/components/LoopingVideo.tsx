import { useEffect, useRef } from "react";

type LoopingVideoProps = {
  src: string;
  className?: string;
};

export function LoopingVideo({ src, className }: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      video.defaultMuted = true;
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
    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
