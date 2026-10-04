"use client";

import React, { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  maxTilt?: number;
}

/** 3D tilt following the pointer, with a moving glare and a slight counter-shift of inner <img> for depth. */
export default function TiltCard({ children, style, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { marginBottom, marginTop, ...innerStyle } = style ?? {};

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || reduced()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--tx", String(px * 2 - 1));
    el.style.setProperty("--ty", String(py * 2 - 1));
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.style.transform = `rotateX(${(0.5 - py) * maxTilt * 2}deg) rotateY(${(px - 0.5) * maxTilt * 2}deg)`;
    el.classList.add("tilt-active");
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
    el.classList.remove("tilt-active");
  };

  return (
    <div style={{ perspective: 900, marginBottom, marginTop }}>
      <div
        ref={ref}
        className="tilt-card"
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={innerStyle}
      >
        {children}
        <div className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
