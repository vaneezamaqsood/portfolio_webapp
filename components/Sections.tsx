"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/Modal";
import FigmaEmbed from "@/components/FigmaEmbed";
import { WebsiteEmbed, MiroEmbed } from "@/components/EmbedCard";
import { Eye, ExternalLink } from "lucide-react";

export type WorkItem = {
  title: string;
  subtitle?: string;
  category: string;
  href?: string;
  external?: boolean;
  figmaUrls?: string[];
};

export function SectionHeading({ title, subtitle, id }: { title: string; subtitle?: string; id?: string }) {
  return (
    <div id={id} className="mx-auto max-w-6xl px-4 sm:px-6 mt-20">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl font-semibold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="text-muted-foreground mt-2"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}

export function WorkGrid({ items }: { items: WorkItem[] }) {
  const [open, setOpen] = useState(false);
  const [embed, setEmbed] = useState<{ url: string; title: string } | null>(null);

  function openPreview(url: string, title: string) {
    setEmbed({ url, title });
    setOpen(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, idx) => (
        <motion.div
          key={item.title + idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="group relative isolate rounded-xl p-5 overflow-hidden min-h-[180px] flex flex-col justify-between glass"
        >
          
          
          <div className="absolute -inset-24 z-0 pointer-events-none bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Main content area with proper spacing */}
           <div className="relative z-10 flex-1 pb-8">
            <div>
              <h3 className="font-medium text-lg">{item.title}</h3>
              {item.subtitle ? (
                <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
              ) : null}
              <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
                {item.category}
              </div>
            </div>
          </div>
          {/* Icon buttons on hover */}
          {item.href ? (
            <div className="absolute top-3 right-3 z-[70] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 {/* Preview button */}
                  <motion.button
                   type="button"
                   onClick={() => openPreview(item.href as string, item.title)}
                   initial={{ width: 32 }}
                   whileHover={{ width: "auto" }}
                    className="group/btn flex items-center gap-1 rounded-full px-2 py-1.5 glass-outline bg-card/80 hover:bg-foreground hover:text-background transition-all duration-200 text-xs overflow-hidden shadow-md hover:shadow-lg"
                 >
                   <Eye className="h-4 w-4 shrink-0" />
                   <span className="whitespace-nowrap opacity-0 w-0 group-hover/btn:opacity-100 group-hover/btn:w-auto transition-all duration-200">
                     Preview
                   </span>
                 </motion.button>

                 {/* Open external button */}
                 {item.external ? (
                   <motion.a
                     href={item.href}
                     target="_blank"
                     rel="noreferrer"
                     initial={{ width: 32 }}
                     whileHover={{ width: "auto" }}
                      className="group/btn flex items-center gap-1 rounded-full px-2 py-1.5 glass-outline bg-card/80 hover:bg-foreground hover:text-background transition-all duration-200 text-xs overflow-hidden shadow-md hover:shadow-lg"
                   >
                     <ExternalLink className="h-4 w-4 shrink-0" />
                     <span className="whitespace-nowrap opacity-0 w-0 group-hover/btn:opacity-100 group-hover/btn:w-auto transition-all duration-200">
                       Open
                     </span>
                   </motion.a>
                 ) : null}
               </div>
             ) : (
               /* Card is clickable when no external href */
               <Link
                 href={`/work/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                 className="absolute inset-0 z-10"
                 aria-label={`View ${item.title}`}
               />
             )}
          
          {/* Bottom action area */}
          <div className="relative z-[70] flex items-center justify-between mt-auto">
            {item.href ? (
              <Link
                href={`/work/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View details
              </Link>
            ) : (
              <Link
                href={`/work/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                View project
              </Link>
            )}
          </div>
        </motion.div>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={embed?.title}
      >
        {embed?.url?.includes("figma.com") ? (
          <FigmaEmbed url={embed.url} title={embed.title} />
        ) : embed?.url?.includes("miro.com") ? (
          <MiroEmbed url={embed.url} title={embed.title} />
        ) : embed?.url ? (
          <WebsiteEmbed url={embed.url} title={embed.title} />
        ) : null}
      </Modal>
    </div>
  );
}


