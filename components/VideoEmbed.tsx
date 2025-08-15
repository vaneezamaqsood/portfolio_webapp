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

  const params = new URLSearchParams();
  if (autoPlay) params.set("autoplay", "1");
  if (muted) params.set("muted", "1");
  params.set("rel", "0");
  params.set("modestbranding", "1");

  let src = "";
  if (platform === "youtube") {
    const id = idOrUrl.includes("http") ? new URL(idOrUrl).searchParams.get("v") || idOrUrl : idOrUrl;
    src = `https://www.youtube.com/embed/${id}?${params.toString()}`;
  } else if (platform === "vimeo") {
    const id = idOrUrl.replace(/[^0-9]/g, "");
    src = `https://player.vimeo.com/video/${id}?${params.toString()}`;
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


