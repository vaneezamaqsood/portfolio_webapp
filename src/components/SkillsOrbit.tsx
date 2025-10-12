"use client";

import React, { useEffect, useMemo, useRef } from "react";

type OrbitSkill = {
  label: string;
  color?: string;
};

export type SkillsOrbitProps = {
  skills: OrbitSkill[];
  size?: number; // canvas square size in px
  ringCount?: number; // number of orbit rings
  background?: string; // css color for background clear
};

/**
 * SkillsOrbit
 * Client-only canvas animation that renders multiple concentric orbits with skill labels
 * moving around each ring. Designed to be dependency-free and light on CPU.
 */
export default function SkillsOrbit({
  skills,
  size = 420,
  ringCount = 3,
  background = "transparent",
}: SkillsOrbitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const devicePixel = typeof window !== "undefined" ? Math.max(1, Math.min(2, window.devicePixelRatio || 1)) : 1;

  // Distribute skills across rings
  const rings = useMemo(() => {
    const result: Array<OrbitSkill[]> = Array.from({ length: Math.max(1, ringCount) }, () => []);
    skills.forEach((skill, i) => {
      result[i % result.length].push(skill);
    });
    return result;
  }, [skills, ringCount]);

  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv) return;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;

    // Setup canvas backing resolution
    const width = size;
    const height = size;
    cnv.width = Math.floor(width * devicePixel);
    cnv.height = Math.floor(height * devicePixel);
    cnv.style.width = `${width}px`;
    cnv.style.height = `${height}px`;
    ctx.setTransform(devicePixel, 0, 0, devicePixel, 0, 0);

    // Orbit layout
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.45;
    const ringGap = maxRadius / (rings.length + 0.75);

    // Initial phases for each skill so they are spread out
    const phases: number[] = [];
    const speeds: number[] = [];
    let idx = 0;
    for (let r = 0; r < rings.length; r += 1) {
      const items = rings[r];
      for (let i = 0; i < items.length; i += 1) {
        phases[idx] = (i / Math.max(1, items.length)) * Math.PI * 2;
        // Slightly different angular velocity per ring and item
        const base = 0.0035 + r * 0.0015;
        speeds[idx] = base * (1 + (i % 3) * 0.2);
        idx += 1;
      }
    }

    // Prepared labels as offscreen canvases for crispness
    type LabelSprite = { canvas: HTMLCanvasElement; w: number; h: number; color: string };
    const labelSprites: LabelSprite[] = [];
    const font = `500 12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    const makeLabel = (text: string, color = "#cbd5e1"): LabelSprite => {
      const off = document.createElement("canvas");
      const octx = off.getContext("2d")!;
      octx.font = font;
      const metrics = octx.measureText(text);
      const padX = 10;
      const padY = 6;
      const w = Math.ceil(metrics.width + padX * 2);
      const h = Math.ceil(18 + padY * 2);
      off.width = Math.max(1, Math.floor(w * devicePixel));
      off.height = Math.max(1, Math.floor(h * devicePixel));
      octx.setTransform(devicePixel, 0, 0, devicePixel, 0, 0);
      // pill
      octx.fillStyle = "rgba(15,15,15,0.75)";
      octx.strokeStyle = "rgba(255,255,255,0.12)";
      roundRect(octx, 0.5, 0.5, w - 1, h - 1, 10);
      octx.fill();
      octx.stroke();
      // text
      octx.font = font;
      octx.fillStyle = color;
      octx.textBaseline = "middle";
      octx.fillText(text, padX, h / 2);
      return { canvas: off, w, h, color };
    };

    function roundRect(ctx2d: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      const rr = Math.min(r, w / 2, h / 2);
      ctx2d.beginPath();
      ctx2d.moveTo(x + rr, y);
      ctx2d.arcTo(x + w, y, x + w, y + h, rr);
      ctx2d.arcTo(x + w, y + h, x, y + h, rr);
      ctx2d.arcTo(x, y + h, x, y, rr);
      ctx2d.arcTo(x, y, x + w, y, rr);
      ctx2d.closePath();
    }

    // Build sprites for each skill
    for (const ring of rings) {
      for (const s of ring) {
        labelSprites.push(makeLabel(s.label, s.color));
      }
    }

    let anim = true;
    let t = 0;
    const TWO_PI = Math.PI * 2;

    const draw = () => {
      // clear
      ctx.clearRect(0, 0, width, height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      // rings
      ctx.save();
      ctx.translate(centerX, centerY);
      for (let r = 0; r < rings.length; r += 1) {
        const radius = ringGap * (r + 1);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, TWO_PI);
        ctx.stroke();
      }

      // labels around orbits
      let globalIndex = 0;
      for (let r = 0; r < rings.length; r += 1) {
        const items = rings[r];
        const radius = ringGap * (r + 1);
        for (let i = 0; i < items.length; i += 1) {
          const phase = phases[globalIndex] + t * speeds[globalIndex];
          const x = Math.cos(phase) * radius;
          const y = Math.sin(phase) * radius;
          const sprite = labelSprites[globalIndex];
          // face label tangentially for a subtle effect (optional: small rotate)
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(phase + Math.PI / 2);
          ctx.drawImage(sprite.canvas, -sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h);
          ctx.restore();
          globalIndex += 1;
        }
      }
      ctx.restore();

      t += 1; // animation step; speeds already scaled small
    };

    function loop() {
      if (!anim) return;
      draw();
      requestAnimationFrame(loop);
    }

    loop();
    return () => {
      anim = false;
    };
  }, [rings, size, background, devicePixel]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      aria-label="Skills orbit visualization"
      style={{ display: "block", width: size, height: size }}
    />
  );
}


