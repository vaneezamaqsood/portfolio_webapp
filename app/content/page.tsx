"use client";

import { motion } from "framer-motion";
import VideoEmbed from "@/components/VideoEmbed";
import { mediaItems } from "@/data/content";

export default function ContentPage() {
  return (
    <div className="relative">
      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight"
        >
          Content & Videos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-muted-foreground mt-3 max-w-2xl"
        >
          A curated stream of video content, walkthroughs, and social pieces. Scroll vertically or swipe horizontally through featured videos.
        </motion.p>
      </header>

      {/* Horizontal scroll-snap carousel */}
      <section className="mt-8 sm:mt-10">
        <div className="w-full overflow-x-auto">
          <div
            className="mx-auto max-w-[100vw] px-4 sm:px-6 flex gap-4 sm:gap-6 pb-6 snap-x snap-mandatory"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {mediaItems.map((m, idx) => (
              <div
                key={m.title + idx}
                className="min-w-[88%] sm:min-w-[560px] snap-start"
                style={{ scrollSnapAlign: "start" }}
              >
                <VideoEmbed platform={m.platform} idOrUrl={m.idOrUrl} title={m.title} />
                <div className="mt-2">
                  <div className="text-sm font-medium">{m.title}</div>
                  {m.description ? (
                    <div className="text-sm text-muted-foreground mt-1">{m.description}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-like responsive grid list below */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {mediaItems.map((m, idx) => (
          <div key={`grid-${m.title}-${idx}`} className="glass rounded-xl p-3">
            <VideoEmbed platform={m.platform} idOrUrl={m.idOrUrl} title={m.title} muted />
            <div className="mt-2">
              <div className="text-sm font-medium">{m.title}</div>
              {m.description ? (
                <div className="text-sm text-muted-foreground mt-1">{m.description}</div>
              ) : null}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}


