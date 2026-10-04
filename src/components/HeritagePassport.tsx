"use client";

import React from "react";
import { Crown, Lock } from "lucide-react";
import { HERITAGE_SITES, SiteData } from "@/data/heritage";
import { playStampSound } from "@/utils/audioEffects";

interface HeritagePassportProps {
  exploredSites: string[];
  stampDates: Record<string, string>;
  onOpenSite: (site: SiteData) => void;
}

const STAMP_ROTATIONS = [-8, 5, -4, 9, -6, 3, -10, 7];

export default function HeritagePassport({
  exploredSites,
  stampDates,
  onOpenSite
}: HeritagePassportProps) {
  const total = HERITAGE_SITES.length;
  const collected = HERITAGE_SITES.filter(s => exploredSites.includes(s.id)).length;
  const isAmbassador = collected === total;

  return (
    <div
      style={{
        borderRadius: 8,
        border: "1.5px solid var(--gold-primary)",
        background: "linear-gradient(160deg, var(--paper-cream), var(--paper-aged))",
        padding: 12
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 10,
          fontFamily: "var(--font-serif)",
          color: "var(--ink-primary)"
        }}
      >
        <strong style={{ fontSize: 14, letterSpacing: "0.12em" }}>HỘ CHIẾU DI SẢN</strong>
        <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>
          {collected}/{total} con dấu
        </span>
      </div>

      {isAmbassador && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            marginBottom: 10,
            borderRadius: 6,
            color: "var(--leather-dark)",
            background: "linear-gradient(90deg, #f3dca3, #d8b273, #f3dca3)",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: 13,
            animation: "passport-glow 2.4s ease-in-out infinite"
          }}
        >
          <Crown size={18} />
          Đại sứ Di sản Tây Bắc
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8
        }}
      >
        {HERITAGE_SITES.map((site, i) => {
          const stamped = exploredSites.includes(site.id);
          const rot = STAMP_ROTATIONS[i % STAMP_ROTATIONS.length];
          return (
            <button
              key={site.id}
              type="button"
              title={site.title}
              onClick={() => {
                if (stamped) playStampSound();
                onOpenSite(site);
              }}
              style={{
                position: "relative",
                height: 92,
                padding: 4,
                borderRadius: 4,
                background: stamped ? "var(--paper-ivory)" : "transparent",
                border: stamped
                  ? "1px solid var(--paper-border)"
                  : "1.5px dashed rgba(94, 69, 56, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                cursor: "pointer",
                overflow: "hidden"
              }}
            >
              {stamped ? (
                <div
                  style={
                    {
                      "--r": `${rot}deg`,
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "2px solid var(--seal-cinnabar)",
                      outline: "1px solid var(--seal-cinnabar)",
                      outlineOffset: 2,
                      color: "var(--seal-cinnabar)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `rotate(${rot}deg)`,
                      animation: `passport-stamp 0.5s ${i * 0.08}s cubic-bezier(.2,.9,.3,1.2) both`,
                      fontFamily: "var(--font-serif)",
                      lineHeight: 1.1,
                      textAlign: "center"
                    } as React.CSSProperties
                  }
                >
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.04em" }}>
                    {site.province.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 7, marginTop: 2 }}>{stampDates[site.id] ?? ""}</span>
                </div>
              ) : (
                <Lock size={18} color="var(--ink-light)" />
              )}
              <span
                style={{
                  fontSize: 9,
                  color: stamped ? "var(--ink-secondary)" : "var(--ink-light)",
                  maxWidth: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {site.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
