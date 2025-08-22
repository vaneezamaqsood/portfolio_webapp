"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/content", label: "Content" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop floating centered navbar */}
      <div className="fixed left-1/2 top-4 hidden -translate-x-1/2 z-50 pointer-events-none sm:block">
        <nav className="relative pointer-events-auto flex items-center gap-2 rounded-full px-2 py-1.5 glass neon-ring">
          {/* background bubbles */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -z-10 -left-6 -top-6 h-16 w-16 rounded-full blur-2xl"
            style={{ background: "radial-gradient(ellipse at center, var(--color-primary) 0%, transparent 60%)" }}
            animate={{ x: [0, 10, -6, 0], y: [0, -6, 8, 0], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -z-10 -right-8 -bottom-8 h-16 w-16 rounded-full blur-2xl"
            style={{ background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 60%)" }}
            animate={{ x: [0, -8, 6, 0], y: [0, 8, -6, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* V. logo */}
          <Link href="/" className="shrink-0">
            <span className="grid place-items-center h-8 w-8 rounded-full bg-gradient-to-br from-primary/70 to-accent/70 text-primary-foreground font-semibold">
              V.
            </span>
          </Link>

          {/* nav items */}
          <ul className="flex items-center gap-1 rounded-full px-1 py-1 glass-outline bg-card/40">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative z-10 rounded-full px-3 py-1.5 text-sm transition-colors",
                      active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground/90"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* theme toggle */}
          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile: logo left, menu button right */}
      <div className="sm:hidden">
        <Link href="/" className="fixed top-4 left-4 z-50">
          <span className="grid place-items-center h-10 w-10 rounded-full glass neon-ring font-semibold">
            V.
          </span>
        </Link>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="fixed top-4 right-4 z-50 grid h-10 w-10 place-items-center rounded-full glass neon-ring"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-background/40 backdrop-blur"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="mx-4 mt-20 rounded-2xl glass-strong p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="grid gap-1">
                  {navItems.map((item, idx) => {
                    const active = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3 py-3 glass",
                            active ? "!bg-foreground/90 text-primary-foreground" : "hover:bg-accent/40"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <span className="font-medium">{item.label}</span>
                          {active && (
                            <span className="text-xs opacity-80">Current</span>
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}


