"use client";

import React, { useState } from "react";
import { ArrowRight, BookOpen, Menu, Globe, Volume2, Sparkles, Compass } from "lucide-react";

interface HeroScreenProps {
  onOpenBook: () => void;
}

export default function HeroScreen({ onOpenBook }: HeroScreenProps) {
  const [lang, setLang] = useState<"VI" | "EN">("VI");

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "radial-gradient(circle at 65% 40%, #442a22 0%, #20130f 50%, #120907 100%)",
        overflow: "hidden",
        padding: "24px 6vw"
      }}
    >
      {/* Background Cinematic Photo Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.38,
          filter: "saturate(0.85) sepia(0.18)",
          transform: "scale(1.04)"
        }}
      />

      {/* Gentle Mist and Vignette Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(22, 12, 10, 0.4) 0%, rgba(22, 12, 10, 0.6) 60%, rgba(20, 11, 9, 0.95) 100%), radial-gradient(ellipse at 40% 50%, transparent 20%, rgba(18, 9, 7, 0.75) 90%)",
          pointerEvents: "none"
        }}
      />

      {/* Top Header Bar (Artboard 1) */}
      <header
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--paper-ivory)"
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--gold-bright)", fontSize: "18px" }}>✦</span>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "17px",
              letterSpacing: "0.2em",
              fontWeight: 700
            }}
          >
            TÂY BẮC
          </span>
        </div>

        {/* Right Controls: VI | EN & Book CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "rgba(250, 246, 238, 0.8)",
              cursor: "pointer"
            }}
          >
            <span
              onClick={() => setLang("VI")}
              style={{
                fontWeight: lang === "VI" ? 700 : 400,
                color: lang === "VI" ? "var(--gold-bright)" : "inherit"
              }}
            >
              VI
            </span>
            <span>|</span>
            <span
              onClick={() => setLang("EN")}
              style={{
                fontWeight: lang === "EN" ? 700 : 400,
                color: lang === "EN" ? "var(--gold-bright)" : "inherit"
              }}
            >
              EN
            </span>
          </div>

          <button
            onClick={onOpenBook}
            className="btn-warm"
            style={{ padding: "8px 18px", fontSize: "12px" }}
          >
            <BookOpen size={14} />
            <span>Mở sổ</span>
          </button>
        </div>
      </header>

      {/* Hero Typography & Content (Artboard 1) */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          maxWidth: 680,
          margin: "80px 0 60px"
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(24px, 3.5vw, 38px)",
            color: "rgba(250, 246, 238, 0.9)",
            display: "block",
            lineHeight: 1.1,
            letterSpacing: "0.04em"
          }}
        >
          Khám phá
        </span>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(56px, 8.5vw, 98px)",
            fontWeight: 700,
            color: "#fff8ee",
            letterSpacing: "-0.015em",
            lineHeight: 0.95,
            margin: "4px 0 10px"
          }}
        >
          Tây Bắc
        </h1>

        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 3vw, 32px)",
            color: "var(--gold-bright)",
            display: "block",
            letterSpacing: "0.08em",
            marginBottom: 24
          }}
        >
          Nhật ký di sản
        </span>

        <p
          style={{
            fontSize: "clamp(14px, 1.6vw, 17px)",
            color: "#e6d5bf",
            lineHeight: 1.75,
            maxWidth: 480,
            marginBottom: 36
          }}
        >
          Những vùng đất, câu chuyện và di sản đang chờ bạn khám phá.
        </p>

        <button
          onClick={onOpenBook}
          className="btn-warm"
          style={{
            padding: "14px 34px",
            fontSize: "14px",
            letterSpacing: "0.08em"
          }}
        >
          <BookOpen size={16} />
          <span>MỞ SỔ</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Bottom Footer Note (Artboard 1) */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "rgba(250, 246, 238, 0.7)",
          fontSize: "12px",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          borderTop: "1px solid rgba(212, 175, 109, 0.15)",
          paddingTop: 16
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Compass size={14} color="var(--gold-bright)" />
          <span>Tây Bắc — Nơi cội nguồn kỳ vĩ</span>
        </div>
        <div style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Nhật ký điền dã · 2026
        </div>
      </div>
    </section>
  );
}
