"use client";

import { motion } from "framer-motion";

type Platform = "youtube" | "vimeo" | "file";

export default function VideoEmbed({
  platform,
  idOrUrl,
  title,
  autoPlay = false,
  muted = true,
}: {
  platform: Platform;
  idOrUrl: string;
  title: string;
  autoPlay?: boolean;
  muted?: boolean;
}) {
  const common = {
    title,
    loading: "lazy" as const,
    referrerPolicy: "no-referrer-when-downgrade" as const,
    style: { border: 0 },
  };

  let src = "";
  if (platform === "youtube") {
    const extractYouTubeId = (input: string): string => {
      try {
        if (input.startsWith("http")) {
          const url = new URL(input);
          const host = url.hostname.replace(/^www\./, "").toLowerCase();
          if (host === "youtu.be") {
            return url.pathname.replace(/^\//, "");
          }
          if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
            if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2] || "";
            if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2] || "";
            const v = url.searchParams.get("v");
            if (v) return v;
          }
        }
      } catch {}
      // Fallback: if it looks like an ID, use it
      const maybeId = input.trim();
      return maybeId;
    };
    const id = extractYouTubeId(idOrUrl);
    const yt = new URLSearchParams();
    if (autoPlay) yt.set("autoplay", "1");
    if (muted) yt.set("mute", "1");
    yt.set("rel", "0");
    yt.set("modestbranding", "1");
    yt.set("playsinline", "1");
    src = `https://www.youtube-nocookie.com/embed/${id}?${yt.toString()}`;
  } else if (platform === "vimeo") {
    const id = idOrUrl.replace(/[^0-9]/g, "");
    const vm = new URLSearchParams();
    if (autoPlay) vm.set("autoplay", "1");
    if (muted) vm.set("muted", "1");
    vm.set("title", "0");
    vm.set("byline", "0");
    vm.set("portrait", "0");
    vm.set("transparent", "0");
    src = `https://player.vimeo.com/video/${id}?${vm.toString()}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="rounded-xl overflow-hidden border bg-card"
    >
      {platform === "file" ? (
        <video
          className="w-full aspect-video"
          src={idOrUrl}
          controls
          playsInline
          muted={muted}
        />
      ) : (
        <iframe
          className="w-full aspect-video"
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          {...common}
        />
      )}
    </motion.div>
  );
}


