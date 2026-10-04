"use client";

import React, { useEffect, useRef, useState } from "react";

interface NumberTickerProps {
  /** e.g. "06", "08+", "100%", "3D". Non-numeric values render as-is. */
  value: string;
  durationMs?: number;
}

export default function NumberTicker({ value, durationMs = 1400 }: NumberTickerProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const width = match ? match[1].length : 0;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(match ? 0 : target);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCurrent(target);
      return;
    }

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCurrent(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span>{value}</span>;

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {String(current).padStart(width, "0")}
      {suffix}
    </span>
  );
}
