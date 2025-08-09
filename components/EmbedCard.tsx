"use client";

import { motion } from "framer-motion";

export function WebsiteEmbed({ url, title }: { url: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border bg-card"
    >
      <iframe
        className="w-full h-[70vh] min-h-[420px]"
        src={url}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-downloads"
        style={{ border: 0 }}
      />
    </motion.div>
  );
}

export function MiroEmbed({ url, title }: { url: string; title: string }) {
  const embedUrl = url.includes("miro.com/app/live-embed/")
    ? url
    : url.includes("?")
    ? `${url}&embedAutoplay=true`
    : `${url}?embedAutoplay=true`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden border bg-card"
    >
      <iframe
        className="w-full h-[70vh] min-h-[420px]"
        src={embedUrl}
        allowFullScreen
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-downloads"
        style={{ border: 0 }}
      />
    </motion.div>
  );
}


