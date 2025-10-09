"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import @splinetool/react-spline without SSR
const Spline = dynamic(() => import("@splinetool/react-spline").then(m => m.default), {
  ssr: false,
}) as any;

export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  return <Spline scene={scene} className={className} />;
}


