"use client";

import { cn } from "@/lib/utils";

type SpotlightProps = React.HTMLAttributes<HTMLDivElement> & {
  fill?: string;
};

export function Spotlight({ className, fill = "white", ...props }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute h-[60rem] w-[60rem] blur-3xl", className)}
      style={{
        background: `radial-gradient(closest-side, ${fill} 0%, transparent 60%)`,
        opacity: 0.14,
      }}
      {...props}
    />
  );
}


