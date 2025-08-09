"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ReactElement } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

type WaveShape = {
  anchorX: number;
  anchorY: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  baseRadius: number;
  phase1: number;
  phase2: number;
  colorA: string; // inner
  colorB: string; // outer
  rot: number;
  rotSpeed: number;
  petals: number;
};

function getConsistentBlue(theme: string | undefined): [string, string] {
  // Single darker bluish hue, center bright but not cyan
  // Adjust alpha differences for soft outer glow
  if (theme === "light") {
    // Light mode: reduce inner alpha a bit and strengthen outer for contrast
    return ["rgba(30, 130, 255, 0.85)", "rgba(30, 130, 255, 0.32)"];
  }
  return ["rgba(18, 95, 235, 0.95)", "rgba(18, 95, 235, 0.22)"];
}

export default function NeonBackground(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  const prefersReduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cnv = canvas; // narrowed canvas reference
    const ctx = cnv.getContext("2d", { alpha: true }) as CanvasRenderingContext2D;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let isSmall = false;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      isSmall = width < 640; // mobile breakpoint
      const deviceDpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      dpr = isSmall ? Math.min(1.25, deviceDpr) : deviceDpr; // lower DPR on small for perf
      cnv.width = Math.floor(width * dpr);
      cnv.height = Math.floor(height * dpr);
      cnv.style.width = `${width}px`;
      cnv.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Create abstract wavy flower shapes (only flowers)
    const consistent = getConsistentBlue(resolvedTheme);
    const numShapes = isSmall
      ? 3
      : Math.min(9, Math.max(5, Math.floor(Math.min(width, height) / 240)));
    const shapes: WaveShape[] = [];

    function rand(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < numShapes; i += 1) {
      let baseRadius = isSmall ? rand(64, 104) : rand(90, 160); // smaller on mobile
      const [ca, cb] = consistent;
      const petals = Math.floor(rand(7, 12)); // only flowers: 7-11 petals

      // Placement without overlap (account for wobble/orbit ~16px)
      const margin = 28;
      const maxAttempts = 90;
      let anchorX = 0;
      let anchorY = 0;
      let ok = false;
      for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        if (isSmall) {
          // fixed presets on small screens, right side
          const presets: Array<[number, number]> = [
            [0.78, 0.22],
            [0.64, 0.50],
            [0.82, 0.72],
          ];
          const [nx, ny] = presets[i % presets.length];
          anchorX = Math.min(width - margin - baseRadius, Math.max(margin + baseRadius, width * nx));
          anchorY = Math.min(height - margin - baseRadius, Math.max(margin + baseRadius, height * ny));
        } else {
          anchorX = rand(baseRadius + margin, width - baseRadius - margin);
          anchorY = rand(baseRadius + margin, height - baseRadius - margin);
          // Avoid top-left content zone on larger screens (hero area)
          const avoidLeft = anchorX < width * 0.48 && anchorY < height * 0.42;
          if (avoidLeft) continue;
        }

        ok = true;
        for (let j = 0; j < shapes.length; j += 1) {
          const other = shapes[j];
          const dx = anchorX - other.anchorX;
          const dy = anchorY - other.anchorY;
          const dist = Math.hypot(dx, dy);
          const minDist = baseRadius + other.baseRadius + margin;
          if (dist < minDist) {
            ok = false;
            break;
          }
        }
        if (ok) break;
        // If crowded, gently shrink the new shape to fit
        if (attempt === Math.floor(maxAttempts / 2)) {
          baseRadius = Math.max(70, baseRadius * 0.9);
        }
      }

      if (!ok) {
        // As a fallback, bias to right-middle zone to keep content clear
        baseRadius = Math.max(70, baseRadius * 0.85);
        anchorX = width * (isSmall ? 0.72 : 0.62 + 0.2 * Math.random());
        anchorY = height * (0.35 + 0.3 * Math.random());
      }

      shapes.push({
        anchorX,
        anchorY,
        x: anchorX,
        y: anchorY,
        offsetX: 0,
        offsetY: 0,
        baseRadius,
        phase1: rand(0, Math.PI * 2),
        phase2: rand(0, Math.PI * 2),
        colorA: ca,
        colorB: cb,
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.003, 0.003),
        petals,
      });
    }

    const pointer = { x: width / 2, y: height / 2, vx: 0, vy: 0 } as {
      x: number; y: number; vx: number; vy: number;
    };
    let lastPX = pointer.x;
    let lastPY = pointer.y;
    let pointerMotion = 0; // smoothed magnitude, used to wobble only
    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.vx = pointer.x - lastPX;
      pointer.vy = pointer.y - lastPY;
      lastPX = pointer.x;
      lastPY = pointer.y;
      const speed = Math.hypot(pointer.vx, pointer.vy);
      // smooth the motion metric
      pointerMotion = pointerMotion * 0.9 + Math.min(30, speed) * 0.1;
    }
    window.addEventListener("pointermove", onPointerMove);

    // Animation loop using GSAP ticker for consistent timing
    ctx.globalCompositeOperation = "source-over";

    // helpers for spline drawing
    function drawClosedSpline(points: Array<{ x: number; y: number }>) {
      if (points.length < 2) return;
      const pts = points.slice();
      // close the loop by adding first two points at the end
      pts.push(points[0], points[1]);
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < pts.length - 2; i += 1) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2];
        // Catmull-Rom to Bezier conversion
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
      ctx.closePath();
    }

    let t = 0;
    const TWO_PI = Math.PI * 2;

    function draw() {
      // Trail fade for faster-looking pointer-follow and liquid motion
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = resolvedTheme === "light" ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, width, height);

      // very soft vignette for depth
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      vignette.addColorStop(0, resolvedTheme === "light" ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.18)");
      vignette.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Additive neon blend
      ctx.globalCompositeOperation = "lighter";

      const speed1 = 0.7; // wave evolution
      const speed2 = 0.45;
      const numPoints = 96; // smoother contours

      for (const s of shapes) {
        // Stay near anchor; apply slight wobble and subtle orbit
        // remove wobble/orbit; only apply directional nudge toward pointer
        const nx = pointer.x - s.anchorX;
        const ny = pointer.y - s.anchorY;
        const nd = Math.hypot(nx, ny) + 0.0001;
        const nux = (nx / nd);
        const nuy = (ny / nd);
        const nudgeAmp = Math.min(isSmall ? 12 : 20, (isSmall ? 6 : 8) * pointerMotion); // stronger, capped per device
        // smooth toward target offset
        const targetX = nux * nudgeAmp;
        const targetY = nuy * nudgeAmp;
        const smoothing = 0.12; // 0..1, higher = snappier
        s.offsetX += (targetX - s.offsetX) * smoothing;
        s.offsetY += (targetY - s.offsetY) * smoothing;

        s.x = s.anchorX + s.offsetX;
        s.y = s.anchorY + s.offsetY;
        s.rot += s.rotSpeed + (pointerMotion * 0.0004);

        // Boundary containment (soft bounce)
        const m = s.baseRadius * 0.8;
        if (isSmall) {
          const minX = Math.max(m, width * 0.58);
          s.x = Math.max(minX, Math.min(width - m, s.x));
        } else {
          if (s.x < m) s.x = m;
          if (s.x > width - m) s.x = width - m;
        }
        if (s.y < m) s.y = m;
        if (s.y > height - m) s.y = height - m;

        // Create points around a circle, radius modulated into flower using sine of petal count
        const points: Array<{ x: number; y: number }> = [];
        for (let i = 0; i < numPoints; i += 1) {
          const theta = (i / numPoints) * TWO_PI;
          const ang = theta + s.rot;
          const petals = s.petals;
          const wobble = 0.30 + 0.10 * Math.sin(2 * ang + s.phase2);
          const response = 1 + Math.min(1, pointerMotion / 16) * 0.25; // slight wobble boost on motion
          const r = s.baseRadius * (0.55 + 0.35 * Math.sin(petals * ang + t * speed1 + s.phase1) * response + wobble * 0.2);
          const rr = r;

          points.push({ x: s.x + rr * Math.cos(ang), y: s.y + rr * Math.sin(ang) });
        }

        drawClosedSpline(points);

        // In light mode, lay down a subtle darker underlayer to increase contrast
        if (resolvedTheme === "light") {
          ctx.save();
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = "rgba(16, 70, 200, 0.10)";
          ctx.shadowColor = "rgba(16, 70, 200, 0.20)";
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.restore();
          // rebuild path for neon pass
          drawClosedSpline(points);
        }

        const grad = ctx.createRadialGradient(
          s.x,
          s.y,
          0,
          s.x,
          s.y,
          s.baseRadius * (resolvedTheme === "light" ? 0.98 : 1.0)
        );
        grad.addColorStop(0, s.colorA);
        grad.addColorStop(1, s.colorB);
        ctx.fillStyle = grad;

        // optional extra glow halo using shadow; keep modest for perf
        const prevComp: GlobalCompositeOperation = ctx.globalCompositeOperation as GlobalCompositeOperation;
        if (resolvedTheme === "light") ctx.globalCompositeOperation = "screen";
        ctx.save();
        ctx.shadowColor = s.colorA;
        ctx.shadowBlur = resolvedTheme === "light" ? (isSmall ? 10 : 14) : 28;
        ctx.fill();
        ctx.restore();
        if (resolvedTheme === "light") {
          // thin edge to define petals against white
          ctx.save();
          ctx.globalCompositeOperation = "source-over";
          ctx.strokeStyle = "rgba(24, 100, 235, 0.25)";
          ctx.lineWidth = 1.25;
          ctx.stroke();
          ctx.restore();
        }
        ctx.globalCompositeOperation = prevComp;
      }

      ctx.globalCompositeOperation = "source-over";
      t += 0.016 * 1.25; // slightly calmer evolution speed
    }

    const render = () => {
      if (!document.hidden) draw();
    };

    let tickerId: (time: number, deltaTime: number, frame: number) => void;

    if (!prefersReduceMotion) {
      tickerId = () => render();
      gsap.ticker.add(tickerId);
    } else {
      // draw a single static frame if reduced motion is preferred
      draw();
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      if (tickerId) gsap.ticker.remove(tickerId);
    };
  }, [resolvedTheme, prefersReduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* subtle overlay texture grid in CSS for depth; keep very faint */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35) 0px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.35) 0px, transparent 2px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}


