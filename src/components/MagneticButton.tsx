"use client";

import React, { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  /** Max pixel offset toward the cursor. */
  strength?: number;
  /** Activation radius beyond the element bounds, in px. */
  radius?: number;
}

export default function MagneticButton({
  children,
  strength = 10,
  radius = 70
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const reach = Math.max(r.width, r.height) / 2 + radius;
    const k = Math.max(0, 1 - dist / reach);
    el.style.transform = `translate(${(dx / reach) * strength * k * 2}px, ${(dy / reach) * strength * k * 2}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    // Padding enlarges the pointer-capture zone so the pull starts before the cursor touches the button.
    <span
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ display: "inline-flex", padding: radius / 2, margin: -radius / 2 }}
    >
      <span
        ref={ref}
        style={{
          display: "inline-flex",
          transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform"
        }}
      >
        {children}
      </span>
    </span>
  );
}
