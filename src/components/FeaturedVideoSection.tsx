import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { LoopingVideo } from "./LoopingVideo";
import { Reveal } from "./Reveal";

const FEATURED_VIDEO = `${import.meta.env.BASE_URL}media/mobile/approach.mp4`;
const FEATURED_POSTER = `${import.meta.env.BASE_URL}media/posters/approach.jpg`;

export function FeaturedVideoSection() {
  return (
    <section id="work" className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-white/5">
          <LoopingVideo className="h-full w-full object-cover" src={FEATURED_VIDEO} poster={FEATURED_POSTER} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-5 p-5 sm:p-6 md:flex-row md:items-end md:p-10">
            <div className="liquid-glass max-w-md rounded-2xl p-5 sm:p-6 md:p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/50">My approach</p>
              <p className="text-sm leading-relaxed text-white md:text-base">用 AI 做东西并不难，难的是构造一个有意义的想法，完整呈现它，并让产品真正帮助用户理解价值。</p>
            </div>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#services" className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white sm:px-8">
              查看实践 <ArrowUpRight size={17} />
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
