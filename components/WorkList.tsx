"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { WorkItem } from "@/components/Sections";

export default function WorkList({ items }: { items: WorkItem[] }) {
  return (
    <ul className="mt-8 grid gap-2">
      {items.map((w, i) => {
        const slug = w.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          <motion.li
            key={w.title + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Link href={`/work/${slug}`} className="flex items-center justify-between rounded-md px-4 py-3 glass hover:bg-accent/30">
              <span className="font-medium">{w.title}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{w.category}</span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
}


