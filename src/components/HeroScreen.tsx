"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Sparkles,
  Mountain,
  MapPin,
  Headphones,
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  Landmark
} from "lucide-react";
import {
  playPageFlipSound,
  playWoodBlockSound,
  playBookOpenCreakSound,
  playMistWhooshSound
} from "@/utils/audioEffects";
import MountainMistWipe from "@/components/MountainMistWipe";
import HighlandWeatherEngine, { HighlandSeason } from "@/components/HighlandWeatherEngine";
import { EthnicBrocadeBorder, EthnicEmblem } from "@/components/EthnicBrocade";

interface HeroScreenProps {
  onOpenBook: () => void;
  onOpenSite?: (siteId: string) => void;
  onOpenMap?: () => void;
}

type AtmosphereMode = "dawn" | "day" | "night";

export default function HeroScreen({ onOpenBook, onOpenSite, onOpenMap }: HeroScreenProps) {
  const [lang, setLang] = useState<"VI" | "EN">("VI");
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>("dawn");
  const [season, setSeason] = useState<HighlandSeason>("thu");
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isOpeningBook, setIsOpeningBook] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<(() => void) | null>(null);
  const [mistMessage, setMistMessage] = useState("Mở trang nhật ký non ngàn...");
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax tracking for the 3D Heritage Book
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isOpeningBook) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Atmosphere background configuration
  const ATMOSPHERES = {
    dawn: {
      label: "Bình Minh",
      icon: <Sunset size={14} />,
      bgImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=1800",
      gradient: "radial-gradient(ellipse at 60% 30%, rgba(212, 126, 68, 0.35) 0%, rgba(46, 26, 20, 0.75) 50%, #150906 100%)",
      tagline: "Sương sớm bồng bềnh trên đỉnh Hoàng Liên Sơn",
      temp: "17°C · Sương mù nhẹ"
    },
    day: {
      label: "Nắng Vàng",
      icon: <Sun size={14} />,
      bgImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=1800",
      gradient: "radial-gradient(ellipse at 65% 35%, rgba(197, 155, 62, 0.3) 0%, rgba(42, 28, 20, 0.75) 55%, #140a07 100%)",
      tagline: "Nắng vàng rót mật trên thung lũng Mù Cang Chải",
      temp: "24°C · Nắng ấm đại ngàn"
    },
    night: {
      label: "Đêm Trăng",
      icon: <Moon size={14} />,
      bgImage: "https://commons.wikimedia.org/wiki/Special:FilePath/Limmong1.jpg?width=1800",
      gradient: "radial-gradient(ellipse at 70% 30%, rgba(70, 85, 140, 0.35) 0%, rgba(20, 16, 28, 0.85) 60%, #0a0710 100%)",
      tagline: "Đom đóm và trăng bạc soi bóng suối Nậm Rốm",
      temp: "14°C · Đêm tĩnh mịch"
    }
  };

  const currentAtmo = ATMOSPHERES[atmosphere];

  // 6 Highland Provinces showcase cards
  const PROVINCES = [
    { id: "dien-bien-phu", name: "Điện Biên", landmark: "Chiến trường Điện Biên Phủ", icon: "⚔️" },
    { id: "mu-cang-chai", name: "Yên Bái", landmark: "Ruộng bậc thang Mù Cang Chải", icon: "🌾" },
    { id: "vua-meo", name: "Lào Cai", landmark: "Dinh Hoàng A Tưởng & Sa Pa", icon: "🏰" },
    { id: "nha-tu-son-la", name: "Sơn La", landmark: "Nhà tù Sơn La & Đồi Khau Cả", icon: "🌸" },
    { id: "deo-o-quy-ho", name: "Lai Châu", landmark: "Cổng trời Đèo Ô Quy Hồ", icon: "🏔️" },
    { id: "mai-chau", name: "Hòa Bình", landmark: "Thung lũng bản Lác Mai Châu", icon: "🎋" }
  ];

  // Cinematic 3D Book Opening Sequence with Mountain Mist Wipe
  const triggerCinematicOpen = (action: () => void, message = "Mở trang nhật ký non ngàn...") => {
    if (isOpeningBook || isTransitioning) return;
    setIsOpeningBook(true);
    playBookOpenCreakSound();
    setMistMessage(message);
    setTransitionTarget(() => action);

    // Roll mountain mist across viewport
    setTimeout(() => {
      setIsTransitioning(true);
    }, 420);
  };

  const handleOpenMainBook = () => {
    triggerCinematicOpen(() => onOpenBook(), "Mở trang nhật ký non ngàn...");
  };

  const handleSelectProvince = (siteId: string) => {
    playWoodBlockSound();
    triggerCinematicOpen(() => {
      if (onOpenSite) {
        onOpenSite(siteId);
      } else {
        onOpenBook();
      }
    }, "Chạm đến danh thắng Tây Bắc...");
  };

  const handleOpenInteractiveMap = () => {
    playWoodBlockSound();
    triggerCinematicOpen(() => {
      if (onOpenMap) onOpenMap();
      else onOpenBook();
    }, "Mở bản đồ địa lý di sản...");
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#120907",
        overflow: "hidden",
        padding: "20px 4vw 24px"
      }}
    >
      {/* Background Cinematic Photo Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${currentAtmo.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: atmosphere === "night" ? 0.32 : 0.45,
          filter: atmosphere === "night" ? "saturate(0.9) brightness(0.7)" : "saturate(1.1) brightness(0.9)",
          transform: `scale(1.05) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          transition: "background-image 0.8s ease, filter 0.8s ease, transform 0.2s ease-out"
        }}
      />

      {/* Dynamic Lighting & Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: currentAtmo.gradient,
          pointerEvents: "none",
          transition: "background 0.8s ease"
        }}
      />

      {/* Linear Fade to Ground */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(18, 9, 7, 0.45) 0%, rgba(18, 9, 7, 0.2) 40%, rgba(18, 9, 7, 0.92) 100%)",
          pointerEvents: "none"
        }}
      />

      {/* Drifting Mountain Mist Layers */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 320,
          background: "radial-gradient(ellipse at 50% 100%, rgba(240, 226, 206, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "mistDrift 14s infinite ease-in-out"
        }}
      />

      {/* 4-Season Generative Highland Atmosphere Engine (Xuân/Hạ/Thu/Đông) */}
      <HighlandWeatherEngine
        currentSeason={season}
        onSeasonChange={setSeason}
        showSelector={true}
      />

      {/* ====================================================================
          TOP GLASSMORPHIC NAVIGATION BAR
          ==================================================================== */}
      <header
        style={{
          position: "relative",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--paper-ivory)",
          padding: "12px 20px",
          background: "rgba(35, 20, 16, 0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 9999,
          border: "1px solid rgba(212, 175, 109, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          flexWrap: "wrap",
          gap: 12
        }}
      >
        {/* Brand Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--seal-cinnabar) 0%, #68170d 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 2px 10px rgba(166, 53, 39, 0.4)"
            }}
          >
            <Mountain size={16} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "16px",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  color: "#fff8ee"
                }}
              >
                TÂY BẮC
              </span>
              <span style={{ color: "var(--gold-bright)", fontSize: "12px" }}>✦</span>
            </div>
            <span style={{ fontSize: "9.5px", letterSpacing: "0.15em", color: "var(--gold-bright)", textTransform: "uppercase" }}>
              Bách Khoa Di Sản Điền Dã
            </span>
          </div>
        </div>

        {/* Center: Realtime Atmosphere Selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "rgba(0, 0, 0, 0.35)",
            padding: "3px 4px",
            borderRadius: 9999,
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          {(["dawn", "day", "night"] as AtmosphereMode[]).map(mode => {
            const active = atmosphere === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  playWoodBlockSound();
                  setAtmosphere(mode);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 12px",
                  borderRadius: 9999,
                  fontSize: "11px",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#fff" : "rgba(240, 226, 206, 0.7)",
                  background: active
                    ? "linear-gradient(135deg, var(--leather-base) 0%, #46251b 100%)"
                    : "transparent",
                  boxShadow: active ? "0 2px 8px rgba(0, 0, 0, 0.4)" : "none",
                  border: active ? "1px solid rgba(212, 175, 109, 0.4)" : "none",
                  transition: "all 0.25s ease"
                }}
              >
                {ATMOSPHERES[mode].icon}
                <span>{ATMOSPHERES[mode].label}</span>
              </button>
            );
          })}
        </div>

        {/* Right HUD: Coordinates, Language & Book CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Coordinates HUD */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "11px",
              color: "rgba(240, 226, 206, 0.75)",
              borderRight: "1px solid rgba(255, 255, 255, 0.15)",
              paddingRight: 14
            }}
          >
            <Compass size={13} color="var(--gold-bright)" />
            <span style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}>
              21°23&apos;N · 103°01&apos;E
            </span>
          </div>

          {/* Lang Toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "11.5px",
              fontWeight: 600,
              color: "rgba(240, 226, 206, 0.75)",
              cursor: "pointer"
            }}
          >
            <span
              onClick={() => setLang("VI")}
              style={{ color: lang === "VI" ? "var(--gold-bright)" : "inherit" }}
            >
              VI
            </span>
            <span>/</span>
            <span
              onClick={() => setLang("EN")}
              style={{ color: lang === "EN" ? "var(--gold-bright)" : "inherit" }}
            >
              EN
            </span>
          </div>

          {/* Direct Open Button */}
          <button
            onClick={handleOpenMainBook}
            className="btn-gold"
            style={{ padding: "8px 18px", fontSize: "12px", boxShadow: "0 4px 15px rgba(181, 140, 73, 0.4)" }}
          >
            <BookOpen size={14} />
            <span>MỞ SỔ DI SẢN</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
          HERO CORE: 2-COLUMN SPLIT (EDITORIAL + 3D SHOWPIECE)
          ==================================================================== */}
      <div
        style={{
          position: "relative",
          zIndex: 25,
          display: "grid",
          gridTemplateColumns: "1.15fr 0.95fr",
          alignItems: "center",
          gap: "4vw",
          maxWidth: 1320,
          width: "100%",
          margin: "32px auto 20px"
        }}
      >
        {/* LEFT COLUMN: POETIC TYPOGRAPHY & INTERACTIVE METRICS */}
        <div>
          {/* Highland Kicker Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px",
              borderRadius: 9999,
              background: "rgba(166, 53, 39, 0.18)",
              border: "1px solid rgba(166, 53, 39, 0.45)",
              color: "#ffc2ba",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
              boxShadow: "0 2px 12px rgba(166, 53, 39, 0.2)"
            }}
          >
            <EthnicEmblem variant="dao-sun" size={17} color="var(--gold-bright)" secondaryColor="var(--seal-cinnabar)" />
            <span>Ký sự điền dã & Truyền thuyết đô thị</span>
          </div>

          {/* Subheading */}
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              color: "rgba(250, 246, 238, 0.85)",
              display: "block",
              letterSpacing: "0.08em",
              fontWeight: 500,
              marginBottom: 4
            }}
          >
            Hành trình khám phá
          </span>

          {/* Giant Metallic Shimmer Headline */}
          <h1
            className="hero-gold-title"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(62px, 8.8vw, 110px)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
              margin: "-6px 0 8px"
            }}
          >
            Tây Bắc
          </h1>

          {/* Poetic Subtitle */}
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              color: "var(--gold-bright)",
              letterSpacing: "0.06em",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}
          >
            <span>“Nơi đá nở hoa, nơi huyền thoại hóa trầm tích”</span>
          </div>

          {/* Hand-stitched brocade geometric thread */}
          <EthnicBrocadeBorder
            variant="hmong-cross"
            height={13}
            color="var(--gold-bright)"
            secondaryColor="var(--seal-cinnabar)"
            style={{ maxWidth: 420, marginBottom: 20, opacity: 0.85 }}
          />

          {/* Editorial Paragraph */}
          <p
            style={{
              fontSize: "clamp(14px, 1.4vw, 16px)",
              color: "rgba(240, 226, 206, 0.85)",
              lineHeight: 1.8,
              maxWidth: 540,
              marginBottom: 28,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)"
            }}
          >
            Dưới làn mây trắng bồng bềnh của đỉnh Hoàng Liên, từng triền ruộng bậc thang kiệt tác,
            mái đền cổ kính và âm vang tiếng khèn nơi đại ngàn đang mở ra cuốn sổ tay điền dã sống động.
          </p>

          {/* 4 Frosted Glass Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
              maxWidth: 540,
              marginBottom: 32
            }}
          >
            {[
              { val: "06", label: "Tỉnh Vùng Cao", sub: "Điện Biên, Lào Cai..." },
              { val: "08+", label: "Quần Thể Di Tích", sub: "Lịch sử & Danh lam" },
              { val: "100%", label: "Audio Guide", sub: "Thuyết minh bản địa" },
              { val: "3D", label: "Sổ Da Giấy Dó", sub: "Lật trang xúc giác" }
            ].map((st, i) => (
              <div key={i} className="hero-stat-card">
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--gold-bright)",
                    lineHeight: 1.1
                  }}
                >
                  {st.val}
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginTop: 2 }}>
                  {st.label}
                </div>
                <div style={{ fontSize: "9px", color: "rgba(240, 226, 206, 0.6)", marginTop: 1 }}>
                  {st.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Action Button Row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={handleOpenMainBook}
              className="btn-warm hero-cta-pulse"
              style={{
                padding: "16px 36px",
                fontSize: "14px",
                letterSpacing: "0.08em",
                background: "linear-gradient(135deg, #5a3022 0%, #30160e 100%)",
                border: "1.5px solid rgba(212, 175, 109, 0.6)",
                boxShadow: "0 6px 25px rgba(28, 14, 9, 0.7), 0 0 30px rgba(212, 175, 109, 0.3)"
              }}
            >
              <BookOpen size={18} />
              <span>LẬT MỞ TRANG SỔ</span>
              <ArrowRight size={18} />
            </button>

            {onOpenMap && (
              <button
                onClick={() => {
                  playWoodBlockSound();
                  onOpenMap();
                }}
                className="hero-chip"
                style={{
                  padding: "14px 24px",
                  borderRadius: 9999,
                  color: "#fff8ee",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer"
                }}
              >
                <Compass size={17} color="var(--gold-bright)" />
                <span>BẢN ĐỒ ĐIỀN DÃ</span>
              </button>
            )}

            {/* Quick sound badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 9999,
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--gold-bright)",
                fontSize: "11px"
              }}
            >
              <Headphones size={13} />
              <span>Sáo mèo & Tiếng gió Hoàng Liên</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE 3D INTERACTIVE HIGHLAND JOURNAL SHOWPIECE */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: 1400
          }}
        >
          {/* Orbiting Highlight Badge 1 (Top Right) */}
          <div
            className="hero-chip"
            onClick={() => handleSelectProvince("mu-cang-chai")}
            style={{
              position: "absolute",
              top: "-15px",
              right: "10px",
              zIndex: 35,
              padding: "10px 14px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              animation: "floatingBadge 4s infinite ease-in-out"
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 6,
                backgroundImage: "url('https://commons.wikimedia.org/wiki/Special:FilePath/Mu_Cang_Chai_02.JPG?width=200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
              }}
            />
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>
                Mù Cang Chải 1.200m
              </div>
              <div style={{ fontSize: "10px", color: "var(--gold-bright)" }}>
                Di tích Quốc gia đặc biệt ➔
              </div>
            </div>
          </div>

          {/* Orbiting Highlight Badge 2 (Bottom Left) */}
          <div
            className="hero-chip"
            onClick={() => handleSelectProvince("deo-o-quy-ho")}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "-15px",
              zIndex: 35,
              padding: "10px 14px",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              animation: "floatingBadge 4.5s infinite ease-in-out 1s"
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 6,
                backgroundImage: "url('https://commons.wikimedia.org/wiki/Special:FilePath/Lapantan.jpg?width=200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
              }}
            />
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>
                Đèo Ô Quy Hồ 2.035m
              </div>
              <div style={{ fontSize: "10px", color: "var(--gold-bright)" }}>
                Đệ nhất đỉnh đèo Tây Bắc ➔
              </div>
            </div>
          </div>

          {/* THE 3D TANGIBLE LEATHER NOTEBOOK WITH CINEMATIC OPENING SEQUENCE */}
          <div
            onClick={handleOpenMainBook}
            style={{
              width: "100%",
              maxWidth: 380,
              aspectRatio: "1 / 1.35",
              position: "relative",
              cursor: "pointer",
              transformStyle: "preserve-3d",
              transform: isOpeningBook
                ? `scale(1.22) translate3d(-10%, -15px, 80px) rotateY(-8deg) rotateX(2deg)`
                : `rotateY(${-10 + mousePos.x * 20}deg) rotateX(${6 + mousePos.y * -20}deg)`,
              transition: "transform 0.85s cubic-bezier(0.2, 0.9, 0.25, 1), box-shadow 0.4s ease",
              animation: isOpeningBook ? "none" : "bookLevitate 6s infinite ease-in-out"
            }}
          >
            {/* LAYER 1: INSIDE REVEALED PAGE (Rendered on book interior base) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 50%, #faf5eb 0%, #ede2cd 80%, #dfd1b5 100%)",
                borderRadius: "12px 16px 16px 12px",
                border: "1.5px solid rgba(181, 140, 73, 0.45)",
                boxShadow: "inset 18px 0 35px rgba(43, 27, 21, 0.2), -20px 25px 60px rgba(0,0,0,0.65)",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
                zIndex: 10,
                overflow: "hidden"
              }}
            >
              <EthnicBrocadeBorder variant="hmong-cross" height={13} color="var(--bronze-leaf)" secondaryColor="var(--seal-cinnabar)" style={{ opacity: 0.9 }} />

              <div style={{ margin: "auto 0" }}>
                <EthnicEmblem variant="dao-sun" size={44} color="var(--bronze-leaf)" secondaryColor="var(--seal-cinnabar)" spinning={true} />
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "22px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--ink-primary)",
                    marginTop: 12,
                    marginBottom: 4
                  }}
                >
                  NHẬT KÝ DI SẢN
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "13px",
                    color: "var(--ochre-earth)",
                    display: "block",
                    marginBottom: 16
                  }}
                >
                  “Chạm vào trầm tích ngàn năm non cao...”
                </span>

                <div
                  className="stamp-explored"
                  style={{
                    display: "inline-flex",
                    margin: "0 auto",
                    padding: "4px 14px",
                    fontSize: "10px"
                  }}
                >
                  <Sparkles size={11} />
                  <span>★ KHAI QUYỂN ★</span>
                </div>
              </div>

              <EthnicBrocadeBorder variant="thai-zigzag" height={11} color="var(--bronze-leaf)" secondaryColor="var(--seal-cinnabar)" style={{ opacity: 0.85 }} />
            </div>

            {/* LAYER 2: 3D SWINGING FRONT COVER */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                transform: isOpeningBook ? "rotateY(-155deg)" : "rotateY(0deg)",
                transition: "transform 0.85s cubic-bezier(0.25, 1, 0.35, 1)",
                zIndex: 20
              }}
            >
              {/* FRONT FACE (Closed Cover) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: "radial-gradient(ellipse at 40% 35%, #4c261b 0%, #28120b 70%, #150906 100%)",
                  borderRadius: "14px 18px 18px 14px",
                  boxShadow: "-25px 35px 65px rgba(0, 0, 0, 0.7), 0 0 50px rgba(212, 175, 109, 0.22)",
                  border: "1.5px solid rgba(212, 175, 109, 0.45)"
                }}
              >
                {/* Stitched Edge Detail */}
                <div
                  style={{
                    position: "absolute",
                    inset: 12,
                    border: "1.5px dashed rgba(212, 175, 109, 0.35)",
                    borderRadius: 10,
                    pointerEvents: "none"
                  }}
                />

                {/* Brass Corner 1 (Top Left) */}
                <div style={{ position: "absolute", top: 6, left: 6, width: 34, height: 34 }}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#d4af6d" />
                    <circle cx="12" cy="12" r="3" fill="#664a1a" />
                  </svg>
                </div>
                {/* Brass Corner 2 (Top Right) */}
                <div style={{ position: "absolute", top: 6, right: 6, width: 34, height: 34, transform: "rotate(90deg)" }}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#d4af6d" />
                    <circle cx="12" cy="12" r="3" fill="#664a1a" />
                  </svg>
                </div>
                {/* Brass Corner 3 (Bottom Left) */}
                <div style={{ position: "absolute", bottom: 6, left: 6, width: 34, height: 34, transform: "rotate(-90deg)" }}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#d4af6d" />
                    <circle cx="12" cy="12" r="3" fill="#664a1a" />
                  </svg>
                </div>
                {/* Brass Corner 4 (Bottom Right) */}
                <div style={{ position: "absolute", bottom: 6, right: 6, width: 34, height: 34, transform: "rotate(180deg)" }}>
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M 0,0 L 38,0 C 22,2 2,22 0,38 Z" fill="#d4af6d" />
                    <circle cx="12" cy="12" r="3" fill="#664a1a" />
                  </svg>
                </div>

                {/* Red Silk Ribbon Bookmark */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "48%",
                    width: 20,
                    height: "108%",
                    background: "linear-gradient(90deg, #7c2217, #a63527 50%, #6d1c14)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                    clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)",
                    zIndex: 20
                  }}
                />

                {/* Center Book Content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 22,
                    height: "100%",
                    padding: "40px 30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      border: "2px solid rgba(212, 175, 109, 0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold-bright)",
                      marginBottom: 16,
                      background: "radial-gradient(circle, rgba(212, 175, 109, 0.15) 0%, transparent 80%)"
                    }}
                  >
                    <Mountain size={34} strokeWidth={1.5} />
                  </div>

                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "34px",
                      fontWeight: 700,
                      color: "var(--gold-bright)",
                      letterSpacing: "0.2em",
                      margin: "0 0 4px",
                      textShadow: "0 2px 10px rgba(0,0,0,0.6)"
                    }}
                  >
                    TÂY BẮC
                  </h2>

                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "12px",
                      fontStyle: "italic",
                      letterSpacing: "0.25em",
                      color: "#e6d5b8",
                      textTransform: "uppercase",
                      marginBottom: 24,
                      display: "block"
                    }}
                  >
                    Nhật Ký Di Sản
                  </span>

                  <div
                    className="stamp-explored"
                    style={{
                      marginBottom: 28,
                      background: "rgba(166, 53, 39, 0.15)",
                      boxShadow: "0 2px 10px rgba(166, 53, 39, 0.3)"
                    }}
                  >
                    <Sparkles size={13} />
                    <span>★ ĐÃ KHÁM PHÁ ★</span>
                  </div>

                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      color: "rgba(250, 246, 238, 0.9)",
                      letterSpacing: "0.08em",
                      background: "rgba(0, 0, 0, 0.4)",
                      padding: "6px 16px",
                      borderRadius: 20,
                      border: "1px solid rgba(212, 175, 109, 0.3)"
                    }}
                  >
                    {isOpeningBook ? "Đang mở sổ..." : "Chạm để mở sổ ➔"}
                  </div>
                </div>
              </div>

              {/* BACK FACE (Inside of front cover) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: "radial-gradient(ellipse at 50% 50%, #2f1911 0%, #1c0e09 85%, #0f0705 100%)",
                  borderRadius: "18px 14px 14px 18px",
                  border: "1.5px solid rgba(212, 175, 109, 0.35)",
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px dashed rgba(212, 175, 109, 0.3)",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(212, 175, 109, 0.7)",
                    textAlign: "center"
                  }}
                >
                  <EthnicEmblem variant="hmong-cross" size={32} color="rgba(212, 175, 109, 0.6)" />
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      marginTop: 10,
                      textTransform: "uppercase"
                    }}
                  >
                    Ấn bản điền dã 2026
                  </span>
                </div>
              </div>
            </div>

            {/* LAYER 3: MULTI-LAYERED DECKLE EDGE PAGES ON THE RIGHT */}
            <div
              style={{
                position: "absolute",
                top: 8,
                bottom: 8,
                right: -16,
                width: 16,
                background: "repeating-linear-gradient(90deg, #e5d8c1 0px, #d5c4a6 2px, #faf5eb 4px)",
                borderRadius: "0 4px 4px 0",
                boxShadow: "inset -2px 0 6px rgba(0,0,0,0.35)",
                transform: "rotateY(70deg)",
                transformOrigin: "left center",
                opacity: isOpeningBook ? 0.3 : 1,
                transition: "opacity 0.4s ease"
              }}
            />
          </div>
        </div>
      </div>

      {/* ====================================================================
          BOTTOM HORIZONTAL PROVINCE RAIL (6 PROVINCES QUICK DOCK)
          ==================================================================== */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          borderTop: "1px solid rgba(212, 175, 109, 0.18)",
          paddingTop: 16
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "11px", letterSpacing: "0.15em", color: "var(--gold-bright)", textTransform: "uppercase", fontWeight: 700 }}>
            <Layers size={13} />
            <span>Chọn tỉnh thành khám phá nhanh</span>
          </div>
          <span style={{ fontSize: "11px", color: "rgba(240, 226, 206, 0.6)", fontStyle: "italic" }}>
            {currentAtmo.tagline}
          </span>
        </div>

        {/* 6 Province Cards Rail */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 10,
            overflowX: "auto"
          }}
        >
          {PROVINCES.map(prov => (
            <div
              key={prov.id}
              onClick={() => handleSelectProvince(prov.id)}
              className="hero-chip"
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px" }}>{prov.icon}</span>
                <ChevronRight size={12} color="var(--gold-bright)" style={{ opacity: 0.7 }} />
              </div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff8ee" }}>
                {prov.name}
              </div>
              <div style={{ fontSize: "9.5px", color: "rgba(240, 226, 206, 0.7)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {prov.landmark}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mountain Mist Transition Wipe across Hero */}
      <MountainMistWipe
        isTransitioning={isTransitioning}
        message={mistMessage}
        onPeak={() => {
          if (transitionTarget) transitionTarget();
        }}
        onComplete={() => {
          setIsTransitioning(false);
          setIsOpeningBook(false);
        }}
        durationMs={1300}
      />
    </section>
  );
}
