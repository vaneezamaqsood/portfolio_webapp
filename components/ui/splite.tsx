"use client";

import React, { useEffect } from "react";

export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  useEffect(() => {
    // Import the web component on client only
    import("@splinetool/viewer");
  }, []);

  return (
    // @ts-expect-error: custom element provided by @splinetool/viewer
    <spline-viewer url={scene} class={className}></spline-viewer>
  );
}


