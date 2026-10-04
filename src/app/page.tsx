"use client";

import React, { useState } from "react";
import HeroScreen from "@/components/HeroScreen";
import HeritageBook from "@/components/HeritageBook";
import AiNana from "@/components/AiNana";
import AudioSoundscape from "@/components/AudioSoundscape";
import MountainMistWipe from "@/components/MountainMistWipe";
import { EthnicBrocadeBorder, EthnicEmblem } from "@/components/EthnicBrocade";
import {
  BookOpen,
  Home,
  MapPin,
  Landmark,
  Pencil,
  Award,
  Compass,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"hero" | "book">("hero");
  const [targetSiteId, setTargetSiteId] = useState<string | null>(null);
  const [targetTab, setTargetTab] = useState<string | null>(null);
  const [targetPage, setTargetPage] = useState<number | null>(null);
  const [isReturningToHero, setIsReturningToHero] = useState<boolean>(false);

  const handleOpenBook = (siteId?: string, tab?: string, page?: number) => {
    if (siteId) setTargetSiteId(siteId);
    if (tab) setTargetTab(tab);
    setTargetPage(page ?? (siteId ? 3 : 0));
    setViewMode("book");
  };

  const handleOpenMap = () => {
    setTargetSiteId(null);
    setTargetPage(2);
    setViewMode("book");
  };

  const handleOpenQuiz = (siteId: string) => {
    setTargetSiteId(siteId);
    setTargetTab("quiz");
    setTargetPage(3);
    setViewMode("book");
  };

  const handleReturnToHero = () => {
    if (isReturningToHero) return;
    setIsReturningToHero(true);
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* View 1: Hero Screen (Màn hình mở đầu - Artboard 1) */}
      {viewMode === "hero" && (
        <HeroScreen
          onOpenBook={() => handleOpenBook()}
          onOpenSite={(siteId) => handleOpenBook(siteId, "overview", 3)}
          onOpenMap={handleOpenMap}
        />
      )}

      {/* View 2: Physical Heritage Book Spread (Artboards 2 - 12, 14) */}
      {viewMode === "book" && (
        <div
          style={{
            minHeight: "100vh",
            background: "radial-gradient(circle at 50% 38%, #2e1a14 0%, #180d0a 65%, #0d0604 100%)",
            padding: "36px 4vw 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Folio Top Bar Navigation */}
          <div
            style={{
              width: "100%",
              maxWidth: 1220,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
              color: "rgba(250, 246, 238, 0.8)",
              fontSize: "12px",
              flexWrap: "wrap",
              gap: 12
            }}
          >
            <button
              onClick={handleReturnToHero}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.08)",
                color: "var(--paper-ivory)",
                fontSize: "11px",
                transition: "background 0.2s ease"
              }}
            >
              <Home size={14} /> Về màn hình mở đầu
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <EthnicEmblem variant="dao-sun" size={18} color="var(--gold-bright)" secondaryColor="var(--seal-cinnabar)" />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  letterSpacing: "0.18em",
                  color: "var(--gold-bright)",
                  fontWeight: 600,
                  fontSize: "13px"
                }}
              >
                TÂY BẮC — NHẬT KÝ DI SẢN
              </span>
              <EthnicEmblem variant="dao-sun" size={18} color="var(--gold-bright)" secondaryColor="var(--seal-cinnabar)" />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "11px", opacity: 0.7 }}>
                Ấn bản điền dã 2026
              </span>
            </div>
          </div>

          {/* The Physical Heritage Book Component */}
          <HeritageBook
            targetSiteId={targetSiteId}
            targetTab={targetTab}
            targetPage={targetPage}
            onClose={handleReturnToHero}
          />
        </div>
      )}

      {/* Return to Hero Mountain Mist Wipe */}
      <MountainMistWipe
        isTransitioning={isReturningToHero}
        message="Trở lại non ngàn Tây Bắc..."
        onPeak={() => setViewMode("hero")}
        onComplete={() => setIsReturningToHero(false)}
        durationMs={1200}
      />

      {/* Generative Ambient Flute & Mountain Air Soundscape */}
      <AudioSoundscape />

      {/* Autonomous AI Nana Virtual Guide (With Roaming Tour Mode) */}
      <AiNana
        onOpenSite={(siteId) => handleOpenBook(siteId, "overview")}
        onOpenMap={handleOpenMap}
        onOpenQuiz={handleOpenQuiz}
        onOpenHero={handleReturnToHero}
        currentView={viewMode}
      />
    </main>
  );
}
