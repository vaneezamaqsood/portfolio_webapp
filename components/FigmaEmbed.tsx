"use client";

import { motion } from "framer-motion";

export default function FigmaEmbed({ url, title }: { url: string; title: string }) {
  // Figma embed accepts share URLs with /proto or /design; build embed URL.
  // Hide UI for a cleaner preview.
  const params = new URLSearchParams({ url, embed_host: "share", hide_ui: "1" } as any);
  const embedUrl = `https://www.figma.com/embed?${params.toString()}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border bg-card"
    >
      <iframe
        title={title}
        className="w-full h-[68vh] min-h-[420px]"
        src={embedUrl}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
      />
    </motion.div>
  );
}


