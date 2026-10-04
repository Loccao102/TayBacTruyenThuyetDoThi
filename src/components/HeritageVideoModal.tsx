"use client";

import React, { useEffect } from "react";
import { X, Film, Sparkles, Volume2 } from "lucide-react";
import { EthnicBrocadeBorder, EthnicEmblem } from "@/components/EthnicBrocade";
import { playWoodBlockSound } from "@/utils/audioEffects";

interface HeritageVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    duration?: string;
    url?: string;
    youtubeId?: string;
    thumbnail?: string;
  } | null;
}

/**
 * HeritageVideoModal: A cinematic vintage theater player modal
 * for Northwest Vietnam historical and cultural documentaries.
 */
export default function HeritageVideoModal({
  isOpen,
  onClose,
  video
}: HeritageVideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playWoodBlockSound();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  // Fallback YouTube ID if not explicitly specified
  const effectiveYoutubeId = video.youtubeId || "8KqM3t3E83Y";
  const embedUrl = `https://www.youtube-nocookie.com/embed/${effectiveYoutubeId}?autoplay=1&rel=0&modestbranding=1`;

  const handleClose = () => {
    playWoodBlockSound();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(12, 6, 4, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease"
      }}
      onClick={handleClose}
    >
      {/* Theater Box Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 920,
          background: "radial-gradient(ellipse at 50% 30%, #301a13 0%, #1a0d09 70%, #0d0604 100%)",
          borderRadius: 14,
          border: "2px solid rgba(212, 175, 109, 0.45)",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 50px rgba(212, 175, 109, 0.2)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Brass Corner 1 (Top Left) */}
        <div style={{ position: "absolute", top: 4, left: 4, width: 28, height: 28, zIndex: 10, pointerEvents: "none" }}>
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#d4af6d" />
            <circle cx="12" cy="12" r="3" fill="#664a1a" />
          </svg>
        </div>
        {/* Brass Corner 2 (Top Right) */}
        <div style={{ position: "absolute", top: 4, right: 4, width: 28, height: 28, zIndex: 10, pointerEvents: "none", transform: "rotate(90deg)" }}>
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#d4af6d" />
            <circle cx="12" cy="12" r="3" fill="#664a1a" />
          </svg>
        </div>

        {/* Modal Header */}
        <div
          style={{
            padding: "16px 22px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(212, 175, 109, 0.2)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(166, 53, 39, 0.25)",
                border: "1px solid rgba(166, 53, 39, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffb3ba"
              }}
            >
              <Film size={16} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "var(--gold-bright)",
                  letterSpacing: "0.06em",
                  margin: 0
                }}
              >
                {video.title}
              </h3>
              <span style={{ fontSize: "11px", color: "rgba(240, 226, 206, 0.7)" }}>
                Thước phim tài liệu di sản & văn hóa Tây Bắc {video.duration && `· ${video.duration}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Đóng video"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Ethnic Brocade Ribbon Line */}
        <EthnicBrocadeBorder variant="hmong-cross" height={10} color="var(--gold-bright)" secondaryColor="var(--seal-cinnabar)" animated={false} />

        {/* 16:9 Video Canvas */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#000"
          }}
        >
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
          />
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "12px 22px",
            background: "rgba(20, 10, 7, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11.5px",
            color: "rgba(240, 226, 206, 0.7)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={13} color="var(--gold-bright)" />
            <span>Âm thanh tư liệu gốc · Nhấn ESC hoặc nhấn bên ngoài để đóng</span>
          </div>

          <button
            onClick={handleClose}
            style={{
              padding: "5px 14px",
              borderRadius: 6,
              background: "rgba(212, 175, 109, 0.2)",
              border: "1px solid rgba(212, 175, 109, 0.4)",
              color: "var(--gold-bright)",
              fontSize: "11px",
              cursor: "pointer"
            }}
          >
            Đóng rạp chiếu ✕
          </button>
        </div>
      </div>
    </div>
  );
}
