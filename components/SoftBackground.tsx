export default function SoftBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft, static radial gradients. Colors are driven by CSS variables set per theme. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(60% 60% at 8% 12%, var(--soft-1) 0%, transparent 60%),
            radial-gradient(45% 45% at 92% 10%, var(--soft-2) 0%, transparent 62%),
            radial-gradient(85% 65% at 50% 100%, var(--soft-3) 0%, transparent 72%)
          `,
          backgroundRepeat: "no-repeat",
          backgroundColor: "var(--background)",
        }}
      />

      {/* Very faint dot grid for texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, var(--soft-grid) 0px, transparent 2px), radial-gradient(circle at 75% 75%, var(--soft-grid) 0px, transparent 2px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}


