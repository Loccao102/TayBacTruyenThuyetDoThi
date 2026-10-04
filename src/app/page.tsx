"use client";

import React, { useState } from "react";
import HeroScreen from "@/components/HeroScreen";
import HeritageBook from "@/components/HeritageBook";
import AiNana from "@/components/AiNana";
import AudioSoundscape from "@/components/AudioSoundscape";
import { BookOpen, Home } from "lucide-react";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"hero" | "book">("hero");
  const [targetSiteId, setTargetSiteId] = useState<string | null>(null);
  const [targetTab, setTargetTab] = useState<string | null>(null);

  const handleOpenBook = (siteId?: string, tab?: string) => {
    if (siteId) setTargetSiteId(siteId);
    if (tab) setTargetTab(tab);
    setViewMode("book");
  };

  const handleOpenMap = () => {
    setViewMode("book");
  };

  const handleOpenQuiz = (siteId: string) => {
    setTargetSiteId(siteId);
    setTargetTab("quiz");
    setViewMode("book");
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* View 1: Hero Screen (Artboard 1) */}
      {viewMode === "hero" && (
        <HeroScreen onOpenBook={() => handleOpenBook()} />
      )}

      {/* View 2: Heritage Book (Artboards 2 through 12, 14) */}
      {viewMode === "book" && (
        <div
          style={{
            minHeight: "100vh",
            background: "radial-gradient(circle at 50% 40%, #301b15 0%, #1a0d0a 60%, #0d0604 100%)",
            padding: "40px 4vw 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Top navigation helper bar */}
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              color: "rgba(250, 246, 238, 0.75)",
              fontSize: "12px"
            }}
          >
            <button
              onClick={() => setViewMode("hero")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.08)",
                color: "var(--paper-ivory)",
                fontSize: "11px"
              }}
            >
              <Home size={14} /> Về màn hình mở đầu
            </button>

            <span style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.15em", color: "var(--accent-gold-soft)" }}>
              ✦ TÂY BẮC — NHẬT KÝ DI SẢN ✦
            </span>

            <span style={{ fontSize: "11px", opacity: 0.7 }}>
              Ấn bản tương tác 2026
            </span>
          </div>

          {/* The Interactive Heritage Book */}
          <HeritageBook
            targetSiteId={targetSiteId}
            targetTab={targetTab}
            onClose={() => setViewMode("hero")}
          />
        </div>
      )}

      {/* Ambient Flute & Mountain Wind Soundscape */}
      <AudioSoundscape />

      {/* AI Nana Virtual Guide (Artboard 13) */}
      <AiNana
        onOpenSite={(siteId) => handleOpenBook(siteId, "overview")}
        onOpenMap={handleOpenMap}
        onOpenQuiz={handleOpenQuiz}
      />
    </main>
  );
}
