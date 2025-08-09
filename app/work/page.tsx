"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorkGrid } from "@/components/Sections";
import { CATEGORIES, workItems } from "@/data/work";

const categoryList = [
  "All",
  CATEGORIES.FIGMA,
  CATEGORIES.WEB,
  CATEGORIES.SOCIAL,
  CATEGORIES.THINKING,
  CATEGORIES.EVENTS,
];

export default function WorkPage() {
  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(
    () => (active === "All" ? workItems : workItems.filter((w) => w.category === active)),
    [active]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl font-semibold tracking-tight"
      >
        Work
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-muted-foreground mt-2"
      >
        Explore by category
      </motion.p>

      <div className="mt-6 flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {categoryList.map((cat) => {
            const on = active === cat;
            return (
              <motion.button
                layout
                key={cat}
                onClick={() => setActive(cat)}
                className="relative rounded-full border px-3 py-1.5 text-sm"
                whileTap={{ scale: 0.98 }}
              >
                {on && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={on ? "text-primary-foreground" : "text-foreground"}>{cat}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <WorkGrid items={filtered} />
    </div>
  );
}

