"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, CloudRain, Sun, Snowflake } from "lucide-react";

export type HighlandSeason = "xuan" | "ha" | "thu" | "dong";

interface SeasonConfig {
  id: HighlandSeason;
  label: string;
  sub: string;
  icon: React.ReactNode;
  ambientColor: string;
  particleCount: number;
}

export const SEASONS_CONFIG: Record<HighlandSeason, SeasonConfig> = {
  xuan: {
    id: "xuan",
    label: "Xuân",
    sub: "Mùa Hoa Đào & Mận Trắng",
    icon: <Sparkles size={14} />,
    ambientColor: "rgba(255, 180, 195, 0.12)",
    particleCount: 38
  },
  ha: {
    id: "ha",
    label: "Hạ",
    sub: "Mùa Nước Đổ Bậc Thang",
    icon: <CloudRain size={14} />,
    ambientColor: "rgba(100, 190, 220, 0.1)",
    particleCount: 55
  },
  thu: {
    id: "thu",
    label: "Thu",
    sub: "Mùa Lúa Vàng Rực Rỡ",
    icon: <Sun size={14} />,
    ambientColor: "rgba(240, 190, 80, 0.15)",
    particleCount: 45
  },
  dong: {
    id: "dong",
    label: "Đông",
    sub: "Mây Mù & Sương Băng Fansipan",
    icon: <Snowflake size={14} />,
    ambientColor: "rgba(180, 215, 255, 0.14)",
    particleCount: 50
  }
};

interface HighlandWeatherEngineProps {
  currentSeason?: HighlandSeason;
  onSeasonChange?: (season: HighlandSeason) => void;
  showSelector?: boolean;
  style?: React.CSSProperties;
}

/**
 * HighlandWeatherEngine: 60FPS generative atmosphere for Northwest Vietnam's 4 iconic seasons.
 * Uses high-performance HTML5 Canvas particles without DOM reflows.
 */
export default function HighlandWeatherEngine({
  currentSeason = "thu",
  onSeasonChange,
  showSelector = false,
  style
}: HighlandWeatherEngineProps) {
  const [season, setSeason] = useState<HighlandSeason>(currentSeason);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (currentSeason) setSeason(currentSeason);
  }, [currentSeason]);

  const handleSelectSeason = (s: HighlandSeason) => {
    setSeason(s);
    if (onSeasonChange) onSeasonChange(s);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle state representation
    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      rot: number;
      vRot: number;
      opacity: number;
      color: string;
      secondaryColor?: string;
      type: "petal" | "rain" | "goldDust" | "frostFlake";
    }

    const cfg = SEASONS_CONFIG[season];
    const particles: Particle[] = [];

    const initParticle = (p?: Partial<Particle>): Particle => {
      const x = p?.x ?? Math.random() * width;
      const y = p?.y ?? Math.random() * height;

      if (season === "xuan") {
        // Peach / Plum blossom petals
        const isPlum = Math.random() > 0.6;
        return {
          x,
          y,
          size: Math.random() * 8 + 6,
          vx: Math.random() * 1.5 - 0.5,
          vy: Math.random() * 1.2 + 0.8,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.04,
          opacity: Math.random() * 0.65 + 0.25,
          color: isPlum ? "#fff5f7" : "#ffb5c5",
          secondaryColor: isPlum ? "#fcedee" : "#f4728d",
          type: "petal"
        };
      } else if (season === "ha") {
        // High terrace rain drizzle
        return {
          x,
          y,
          size: Math.random() * 18 + 12,
          vx: -1.2,
          vy: Math.random() * 9 + 14,
          rot: Math.PI / 16,
          vRot: 0,
          opacity: Math.random() * 0.35 + 0.15,
          color: "rgba(215, 235, 255, 0.7)",
          type: "rain"
        };
      } else if (season === "thu") {
        // Golden rice husks & warm amber sunlight particles
        return {
          x,
          y,
          size: Math.random() * 4.5 + 2,
          vx: Math.sin(Math.random() * 6) * 0.8 - 0.4,
          vy: Math.random() * 0.8 + 0.4,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.03,
          opacity: Math.random() * 0.7 + 0.25,
          color: Math.random() > 0.4 ? "#f8d374" : "#e5a842",
          secondaryColor: "#fff4d0",
          type: "goldDust"
        };
      } else {
        // Đông: Mountain frost flakes & ice crystals
        return {
          x,
          y,
          size: Math.random() * 4 + 2,
          vx: Math.random() * 1.2 - 0.6,
          vy: Math.random() * 1.5 + 0.8,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.05,
          opacity: Math.random() * 0.8 + 0.2,
          color: "#e8f4fd",
          secondaryColor: "#a9d6ff",
          type: "frostFlake"
        };
      }
    };

    for (let i = 0; i < cfg.particleCount; i++) {
      particles.push(initParticle());
    }

    let windTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      windTime += 0.015;
      const globalWind = Math.sin(windTime) * 0.8;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.x += p.vx + globalWind * 0.4;
        p.y += p.vy;
        p.rot += p.vRot;

        // Wrap around bounds
        if (p.y > height + 20) {
          particles[i] = initParticle({ y: -15, x: Math.random() * width });
          continue;
        }
        if (p.x > width + 20) p.x = -15;
        if (p.x < -20) p.x = width + 15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;

        if (p.type === "petal") {
          // Curled petal shape
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, 0, p.size);
          ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size / 2, -p.size, 0, 0);
          const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
          grad.addColorStop(0, p.secondaryColor || p.color);
          grad.addColorStop(1, p.color);
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (p.type === "rain") {
          // Rain streak
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.vx * 1.5, p.size);
          ctx.stroke();
        } else if (p.type === "goldDust") {
          // Glowing grain
          const rad = p.size;
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rad * 2);
          grad.addColorStop(0, p.secondaryColor || "#ffffff");
          grad.addColorStop(0.5, p.color);
          grad.addColorStop(1, "rgba(212, 175, 109, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rad, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "frostFlake") {
          // Hexagonal ice star
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          for (let a = 0; a < 3; a++) {
            ctx.beginPath();
            ctx.moveTo(-p.size, 0);
            ctx.lineTo(p.size, 0);
            ctx.stroke();
            ctx.rotate(Math.PI / 3);
          }
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [season]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 15,
        overflow: "hidden",
        ...style
      }}
    >
      {/* 60FPS Weather Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />

      {/* Optional Interactive Season Bar for Hero Screen or Folio */}
      {showSelector && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "auto",
            zIndex: 40,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 8px",
            borderRadius: 9999,
            background: "rgba(28, 16, 12, 0.7)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(212, 175, 109, 0.3)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontFamily: "var(--font-serif)",
              color: "var(--gold-bright)",
              letterSpacing: "0.14em",
              paddingLeft: 8,
              paddingRight: 4,
              textTransform: "uppercase"
            }}
          >
            Thời Tiết:
          </span>
          {(["xuan", "ha", "thu", "dong"] as HighlandSeason[]).map((s) => {
            const item = SEASONS_CONFIG[s];
            const isAct = season === s;
            return (
              <button
                key={s}
                onClick={() => handleSelectSeason(s)}
                title={item.sub}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 12px",
                  borderRadius: 9999,
                  fontSize: "11px",
                  fontWeight: isAct ? 600 : 400,
                  color: isAct ? "#fff" : "rgba(250, 245, 235, 0.65)",
                  background: isAct
                    ? "linear-gradient(135deg, rgba(166, 53, 39, 0.85), rgba(110, 30, 20, 0.85))"
                    : "transparent",
                  border: isAct ? "1px solid rgba(212, 175, 109, 0.5)" : "1px solid transparent",
                  transition: "all 0.2s ease"
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
