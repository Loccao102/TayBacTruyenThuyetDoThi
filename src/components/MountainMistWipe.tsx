"use client";

import React, { useEffect, useState } from "react";
import { playMistWhooshSound } from "@/utils/audioEffects";

interface MountainMistWipeProps {
  isTransitioning: boolean;
  message?: string;
  onPeak?: () => void;
  onComplete?: () => void;
  durationMs?: number;
}

/**
 * MountainMistWipe: Cinematic Northwest Vietnam mountain fog transition.
 * Simulates thick morning mist rolling over Fansipan & Ô Quy Hồ passes,
 * washing over the screen to mask view changes and opening gestures.
 */
export default function MountainMistWipe({
  isTransitioning,
  message = "Mây ngàn Hoàng Liên Sơn...",
  onPeak,
  onComplete,
  durationMs = 1200
}: MountainMistWipeProps) {
  const [phase, setPhase] = useState<"idle" | "in" | "peak" | "out">("idle");

  useEffect(() => {
    if (!isTransitioning) {
      setPhase("idle");
      return;
    }

    // Phase 1: Mist rolls in rapidly
    setPhase("in");
    playMistWhooshSound();

    // Phase 2: Peak opacity (screen covered, safe to switch components)
    const peakTimer = setTimeout(() => {
      setPhase("peak");
      if (onPeak) onPeak();
    }, durationMs * 0.42);

    // Phase 3: Mist rolls out / dissolves
    const outTimer = setTimeout(() => {
      setPhase("out");
    }, durationMs * 0.65);

    // Phase 4: Transition finished
    const finishTimer = setTimeout(() => {
      setPhase("idle");
      if (onComplete) onComplete();
    }, durationMs);

    return () => {
      clearTimeout(peakTimer);
      clearTimeout(outTimer);
      clearTimeout(finishTimer);
    };
  }, [isTransitioning, durationMs, onPeak, onComplete]);

  if (phase === "idle") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* SVG Cloud / Mist Distortion Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="mistDistort">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.03" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Background Soft Vapor Wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(246, 241, 230, 0.96) 0%, rgba(228, 218, 201, 0.94) 60%, rgba(200, 185, 162, 0.92) 100%)",
          opacity: phase === "in" ? 0.95 : phase === "peak" ? 0.98 : 0,
          transition: phase === "in" ? "opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)" : "opacity 0.45s ease-out",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)"
        }}
      />

      {/* Layer 1: Left-to-right dense cloud billow */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: "radial-gradient(ellipse at 30% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(235, 226, 212, 0.5) 45%, transparent 75%)",
          transform: phase === "in" ? "translateX(0) scale(1)" : phase === "peak" ? "translateX(15px) scale(1.05)" : "translateX(60px) scale(1.1)",
          opacity: phase === "in" || phase === "peak" ? 1 : 0,
          filter: "url(#mistDistort)",
          transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease"
        }}
      />

      {/* Layer 2: Right-to-left mountain fog wave */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: "radial-gradient(ellipse at 70% 60%, rgba(250, 245, 235, 0.85) 0%, rgba(220, 206, 188, 0.5) 40%, transparent 70%)",
          transform: phase === "in" ? "translateX(0) scale(1)" : phase === "peak" ? "translateX(-15px) scale(1.03)" : "translateX(-60px) scale(1.1)",
          opacity: phase === "in" || phase === "peak" ? 0.9 : 0,
          filter: "url(#mistDistort)",
          transition: "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease"
        }}
      />

      {/* Layer 3: Drifting horizontal mist strata bands */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 25%, transparent 45%),
            linear-gradient(180deg, transparent 55%, rgba(255,255,255,0.5) 75%, transparent 95%)
          `,
          opacity: phase === "in" || phase === "peak" ? 0.7 : 0,
          transition: "opacity 0.4s ease"
        }}
      />

      {/* Center Poetic Glyph & Highland Phrase */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          opacity: phase === "peak" ? 1 : 0,
          transform: phase === "peak" ? "scale(1)" : "scale(0.92)",
          transition: "all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)",
          padding: "20px 32px"
        }}
      >
        <div
          style={{
            color: "var(--bronze-leaf, #b58c49)",
            fontSize: "22px",
            marginBottom: 8,
            letterSpacing: "0.2em",
            animation: "spinSlow 16s linear infinite"
          }}
        >
          ✦
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(18px, 2.5vw, 26px)",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--ink-charcoal, #2b1b15)",
            fontStyle: "italic",
            textShadow: "0 1px 8px rgba(255,255,255,0.8)"
          }}
        >
          {message}
        </div>
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "var(--ochre-earth, #c9933b)",
            textTransform: "uppercase",
            marginTop: 6
          }}
        >
          Tây Bắc Huyền Thoại
        </div>
      </div>
    </div>
  );
}
