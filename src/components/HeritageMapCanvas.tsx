"use client";

import PaperImage from "@/components/PaperImage";
import React, { useState } from "react";
import {
  Compass,
  MapPin,
  Star,
  Sparkles,
  Mountain,
  Landmark,
  ArrowRight,
  Eye,
  CheckCircle2,
  Navigation
} from "lucide-react";
import { SiteData } from "@/data/heritage";
import { playWoodBlockSound, playStampSound } from "@/utils/audioEffects";

interface HeritageMapCanvasProps {
  sites: SiteData[];
  selectedSite: SiteData;
  exploredSites: string[];
  provinceFilter: string;
  onSelectSite: (site: SiteData) => void;
  style?: React.CSSProperties;
}

// 8 Sites connected in expedition itinerary sequence
const EXPEDITION_SEQUENCE = [
  "tay-thien",
  "mu-cang-chai",
  "bao-ha",
  "vua-meo",
  "deo-o-quy-ho",
  "dien-bien-phu",
  "nha-tu-son-la",
  "mai-chau"
];

// Highland mountain peaks and pass landmarks
const HIGHLAND_LANDMARKS = [
  { name: "Fansipan 3.143m", x: 44, y: 22, type: "peak" },
  { name: "Đèo Ô Quy Hồ 2.035m", x: 38, y: 20, type: "pass" },
  { name: "Đèo Khau Phạ 1.500m", x: 52, y: 35, type: "pass" },
  { name: "Đèo Pha Đin 1.648m", x: 32, y: 55, type: "pass" },
  { name: "Thung lũng Mường Thanh", x: 22, y: 58, type: "valley" }
];

export default function HeritageMapCanvas({
  sites,
  selectedSite,
  exploredSites,
  provinceFilter,
  onSelectSite,
  style
}: HeritageMapCanvasProps) {
  const [hoveredSite, setHoveredSite] = useState<SiteData | null>(null);
  const [showExpeditionRoute, setShowExpeditionRoute] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Generate SVG path coordinates for the expedition route
  const routePoints = EXPEDITION_SEQUENCE.map(id => {
    const site = sites.find(s => s.id === id);
    return site ? site.coords : null;
  }).filter((pt): pt is { x: number; y: number } => pt !== null);

  const routeD = routePoints.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x * 5},${pt.y * 5}` : `${acc} L ${pt.x * 5},${pt.y * 5}`;
  }, "");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "den":
        return "⛩️";
      case "chua":
        return "🛕";
      case "khu-di-tich":
        return "⚔️";
      default:
        return "🏔️";
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 520,
        background: "radial-gradient(ellipse at 50% 45%, #f4ecdc 0%, #ebe0ca 60%, #ded0b7 100%)",
        borderRadius: 8,
        border: "1.5px solid rgba(94, 69, 56, 0.35)",
        overflow: "hidden",
        boxShadow: "inset 0 0 40px rgba(94, 69, 56, 0.12)",
        userSelect: "none",
        ...style
      }}
    >
      {/* 1. Vintage Cartography Coordinates Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(100, 70, 50, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 70, 50, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none"
        }}
      />

      {/* Coordinate Labels on Margins */}
      <div style={{ position: "absolute", top: 4, left: 10, fontSize: "9px", color: "rgba(100,70,50,0.5)", fontFamily: "monospace" }}>
        22°30' N — 103°15' E
      </div>
      <div style={{ position: "absolute", bottom: 4, right: 10, fontSize: "9px", color: "rgba(100,70,50,0.5)", fontFamily: "monospace" }}>
        20°45' N — 105°20' E
      </div>

      {/* 2. Topographic River Networks & Mountain Ridge Contours */}
      <svg
        viewBox="0 0 500 500"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      >
        <defs>
          {/* Animated Gold Shimmer for Expedition Route */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a63527" />
            <stop offset="50%" stopColor="#d4af6d" />
            <stop offset="100%" stopColor="#a63527" />
          </linearGradient>

          <filter id="inkGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Major Waterways (Sông Đà, Sông Hồng, Suối Nậm Rốm) */}
        {/* Sông Hồng (Red River - Lao Cai through Yen Bai) */}
        <path
          d="M 230,0 Q 250,80 270,160 T 360,280 T 450,380"
          fill="none"
          stroke="rgba(85, 120, 160, 0.35)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Sông Đà (Black River - Lai Chau through Dien Bien, Son La, Hoa Binh) */}
        <path
          d="M 110,0 Q 150,110 190,220 T 260,340 T 380,440"
          fill="none"
          stroke="rgba(85, 120, 160, 0.4)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Sông Mã (Son La) */}
        <path
          d="M 160,320 Q 210,380 240,480"
          fill="none"
          stroke="rgba(85, 120, 160, 0.3)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Mountain Contour Ridges (Dãy Hoàng Liên Sơn) */}
        <g stroke="rgba(100, 70, 50, 0.15)" fill="none" strokeWidth="1">
          <path d="M 180,60 Q 210,120 230,190 T 270,290" />
          <path d="M 190,65 Q 220,125 240,195 T 280,295" />
          <path d="M 200,70 Q 230,130 250,200 T 290,300" strokeDasharray="3 3" />

          {/* Pu Đen Đinh Range (Điện Biên) */}
          <path d="M 60,210 Q 90,260 110,340 T 130,420" />
          <path d="M 70,215 Q 100,265 120,345 T 140,425" />
        </g>

        {/* Woodcut Mountain Peaks */}
        {[
          { x: 215, y: 110 },
          { x: 235, y: 135 },
          { x: 190, y: 95 },
          { x: 270, y: 175 },
          { x: 135, y: 260 },
          { x: 155, y: 290 },
          { x: 345, y: 360 }
        ].map((pt, i) => (
          <polygon
            key={i}
            points={`${pt.x},${pt.y} ${pt.x + 16},${pt.y + 26} ${pt.x - 16},${pt.y + 26}`}
            fill="rgba(94, 69, 56, 0.12)"
            stroke="rgba(94, 69, 56, 0.28)"
            strokeWidth="0.8"
          />
        ))}

        {/* Expedition Trail Line connecting 8 Monuments */}
        {showExpeditionRoute && routeD && (
          <g>
            {/* Outer halo */}
            <path
              d={routeD}
              fill="none"
              stroke="rgba(212, 175, 109, 0.4)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core dashed line */}
            <path
              d={routeD}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.2"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#inkGlow)"
            />
          </g>
        )}
      </svg>

      {/* 3. Waterway & Range Calligraphy Labels */}
      <div style={{ position: "absolute", top: "15%", left: "48%", fontSize: "9px", fontStyle: "italic", color: "rgba(85,120,160,0.75)", transform: "rotate(40deg)" }}>
        ~ Sông Hồng ~
      </div>
      <div style={{ position: "absolute", top: "35%", left: "34%", fontSize: "9.5px", fontStyle: "italic", color: "rgba(85,120,160,0.85)", transform: "rotate(48deg)", fontWeight: 600 }}>
        ~ Sông Đà hùng vĩ ~
      </div>

      {/* Province Territory Watermark Names */}
      {[
        { name: "LÀO CAI", x: "47%", y: "14%" },
        { name: "LAI CHÂU", x: "24%", y: "22%" },
        { name: "ĐIỆN BIÊN", x: "14%", y: "48%" },
        { name: "SƠN LA", x: "36%", y: "62%" },
        { name: "YÊN BÁI", x: "56%", y: "34%" },
        { name: "HÒA BÌNH", x: "66%", y: "74%" },
        { name: "VĨNH PHÚC", x: "74%", y: "52%" }
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            fontFamily: "var(--font-serif)",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "rgba(94, 69, 56, 0.32)",
            textTransform: "uppercase",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)"
          }}
        >
          {p.name}
        </div>
      ))}

      {/* Highland Peaks & Passes Flags */}
      {HIGHLAND_LANDMARKS.map((lm, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${lm.x}%`,
            top: `${lm.y}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: 3,
            fontSize: "9.5px",
            color: lm.type === "peak" ? "#8c2e22" : "rgba(94, 69, 56, 0.75)",
            fontFamily: "var(--font-serif)",
            fontWeight: 600
          }}
        >
          <span>{lm.type === "peak" ? "▲" : "☖"}</span>
          <span>{lm.name}</span>
        </div>
      ))}

      {/* 4. Interactive 3D Brass Expedition Compass */}
      <div
        title="La bàn địa lý Tây Bắc"
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          zIndex: 25,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #fff5e0 0%, #d8be8d 50%, #85612c 100%)",
          border: "2px solid #5a3c1a",
          boxShadow: "0 6px 16px rgba(43, 27, 21, 0.3), inset 0 0 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `perspective(600px) rotateX(${mousePos.y * 15 - 7}deg) rotateY(${mousePos.x * -15 + 7}deg)`,
          transition: "transform 0.15s ease-out"
        }}
      >
        <div
          style={{
            width: "84%",
            height: "84%",
            borderRadius: "50%",
            border: "1px dashed rgba(90, 60, 26, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}
        >
          <span style={{ position: "absolute", top: 1, fontSize: "9px", fontWeight: 700, color: "#8c2e22" }}>B</span>
          <span style={{ position: "absolute", bottom: 1, fontSize: "9px", fontWeight: 700, color: "#5a3c1a" }}>N</span>
          <span style={{ position: "absolute", left: 2, fontSize: "9px", fontWeight: 700, color: "#5a3c1a" }}>T</span>
          <span style={{ position: "absolute", right: 2, fontSize: "9px", fontWeight: 700, color: "#5a3c1a" }}>Đ</span>

          {/* Compass Needle pointing North */}
          <div
            style={{
              width: 4,
              height: 38,
              position: "relative",
              transform: `rotate(${mousePos.x * 20 - 10}deg)`,
              transition: "transform 0.2s ease"
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 19, background: "#8c2e22", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 19, background: "#5a3c1a", clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }} />
          </div>
        </div>
      </div>

      {/* 5. Map Control Dock (Toggle Route & Map Scale) */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          zIndex: 25,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}
      >
        <button
          onClick={() => {
            playWoodBlockSound();
            setShowExpeditionRoute(!showExpeditionRoute);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 20,
            background: showExpeditionRoute ? "rgba(166, 53, 39, 0.15)" : "rgba(250, 246, 238, 0.8)",
            border: showExpeditionRoute ? "1px solid rgba(166, 53, 39, 0.45)" : "1px solid rgba(94, 69, 56, 0.25)",
            color: showExpeditionRoute ? "var(--seal-cinnabar)" : "var(--ink-secondary)",
            fontSize: "11px",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer"
          }}
        >
          <Navigation size={12} />
          <span>{showExpeditionRoute ? "Ẩn tuyến điền dã" : "Hiện tuyến điền dã"}</span>
        </button>

        <div
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            background: "rgba(250, 246, 238, 0.75)",
            border: "1px solid rgba(94, 69, 56, 0.2)",
            fontSize: "10px",
            color: "var(--ink-secondary)",
            fontFamily: "var(--font-serif)"
          }}
        >
          Tỉ lệ 1:500.000
        </div>
      </div>

      {/* 6. The 8 Interactive Monument Pins */}
      {sites.map((site) => {
        const isExplored = exploredSites.includes(site.id);
        const isSelected = selectedSite.id === site.id;
        const isHovered = hoveredSite?.id === site.id;
        const isProvinceMatch = provinceFilter === "all" || site.province.toLowerCase().includes(provinceFilter.toLowerCase());

        return (
          <div
            key={site.id}
            onMouseEnter={() => setHoveredSite(site)}
            onMouseLeave={() => setHoveredSite(null)}
            onClick={() => {
              playWoodBlockSound();
              onSelectSite(site);
            }}
            style={{
              position: "absolute",
              left: `${site.coords.x}%`,
              top: `${site.coords.y}%`,
              transform: `translate(-50%, -50%) ${isHovered || isSelected ? "scale(1.22)" : "scale(1)"}`,
              cursor: "pointer",
              zIndex: isHovered ? 40 : isSelected ? 35 : 30,
              opacity: isProvinceMatch ? 1 : 0.35,
              transition: "transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.3s ease"
            }}
          >
            {/* Blooming flower aura for active/hovered pin */}
            {(isHovered || isSelected) && (
              <div
                style={{
                  position: "absolute",
                  inset: -10,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(212, 175, 109, 0.5) 0%, rgba(166, 53, 39, 0) 75%)",
                  animation: "ctaPulseRing 2s infinite",
                  pointerEvents: "none"
                }}
              />
            )}

            {/* Pin Badge Outer Shell */}
            <div
              style={{
                width: isSelected ? 38 : 34,
                height: isSelected ? 38 : 34,
                borderRadius: "50%",
                background: isExplored
                  ? "linear-gradient(135deg, #a63527 0%, #68170d 100%)"
                  : "linear-gradient(135deg, #3d2319 0%, #1f0f0a 100%)",
                border: isSelected
                  ? "2.5px solid var(--gold-bright)"
                  : isExplored
                  ? "2px solid rgba(212, 175, 109, 0.8)"
                  : "1.5px solid rgba(255, 255, 255, 0.5)",
                boxShadow: isSelected
                  ? "0 0 16px rgba(212, 175, 109, 0.7), 0 4px 12px rgba(0,0,0,0.4)"
                  : "0 3px 10px rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                position: "relative"
              }}
            >
              <span>{getCategoryIcon(site.category)}</span>

              {/* Explored Golden Star Badge */}
              {isExplored && (
                <div
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "var(--gold-bright)",
                    color: "#1a0d09",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    fontWeight: 800,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  ★
                </div>
              )}
            </div>

            {/* Monument Name Tag */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                background: isSelected ? "var(--leather-base)" : "rgba(35, 18, 12, 0.88)",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: "10px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                marginTop: 4,
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                pointerEvents: "none",
                border: isSelected ? "1px solid var(--gold-bright)" : "1px solid rgba(212,175,109,0.3)"
              }}
            >
              {site.title}
            </div>
          </div>
        );
      })}

      {/* 7. Rich Interactive Monument Hover Preview Card */}
      {hoveredSite && (
        <div
          onClick={() => onSelectSite(hoveredSite)}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 260,
            background: "radial-gradient(ellipse at 50% 30%, #faf6ee 0%, #ede2cd 100%)",
            borderRadius: 8,
            border: "1.5px solid rgba(181, 140, 73, 0.6)",
            boxShadow: "0 12px 32px rgba(43, 27, 21, 0.35), 0 0 15px rgba(212, 175, 109, 0.25)",
            padding: "12px",
            zIndex: 50,
            cursor: "pointer",
            animation: "fadeIn 0.2s ease"
          }}
        >
          <div style={{ position: "relative", height: 100, borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
            <PaperImage
              src={hoveredSite.coverImage}
              alt={hoveredSite.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 4,
                left: 6,
                padding: "2px 6px",
                borderRadius: 3,
                background: "rgba(0,0,0,0.65)",
                color: "var(--gold-bright)",
                fontSize: "9px",
                fontWeight: 600
              }}
            >
              {hoveredSite.province} · {hoveredSite.categoryName}
            </div>
          </div>

          <h4
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "13.5px",
              fontWeight: 700,
              color: "var(--ink-primary)",
              margin: "0 0 3px"
            }}
          >
            {hoveredSite.title}
          </h4>

          <p
            style={{
              fontSize: "11px",
              color: "var(--ink-secondary)",
              lineHeight: 1.45,
              margin: "0 0 8px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {hoveredSite.quote}
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, color: "var(--gold-bright)", fontSize: "11px", fontWeight: 700 }}>
              <Star size={12} fill="var(--gold-bright)" color="var(--gold-bright)" />
              <span>{hoveredSite.rating}</span>
              <span style={{ fontSize: "10px", color: "var(--ink-muted)", fontWeight: 400 }}>({hoveredSite.reviewsCount})</span>
            </div>

            <span
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "var(--seal-cinnabar)",
                display: "inline-flex",
                alignItems: "center",
                gap: 4
              }}
            >
              Mở chi tiết <ArrowRight size={11} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
