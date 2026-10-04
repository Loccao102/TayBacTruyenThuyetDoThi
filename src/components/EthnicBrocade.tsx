"use client";

import React from "react";

export type BrocadeVariant = "hmong-cross" | "thai-zigzag" | "dao-sun" | "terrace-steps";

interface EthnicBrocadeBorderProps {
  variant?: BrocadeVariant;
  height?: number;
  color?: string;
  secondaryColor?: string;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Authentic Northwest Vietnam Brocade (Thổ cẩm) Border.
 * Hand-stitched geometric motifs from H'Mông, Thái, and Dao ethnic heritages.
 */
export function EthnicBrocadeBorder({
  variant = "hmong-cross",
  height = 18,
  color = "var(--gold-bright, #d4af6d)",
  secondaryColor = "var(--seal-cinnabar, #a63527)",
  animated = true,
  className,
  style
}: EthnicBrocadeBorderProps) {
  const patternId = React.useId();

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        position: "relative",
        display: "block",
        ...style
      }}
    >
      <svg
        width="100%"
        height={height}
        style={{
          display: "block",
          filter: animated ? "drop-shadow(0 0 4px rgba(212, 175, 109, 0.35))" : undefined
        }}
      >
        <defs>
          {/* Variant 1: H'Mông Rhombus & Cross Embroidery */}
          {variant === "hmong-cross" && (
            <pattern id={patternId} width="36" height={height} patternUnits="userSpaceOnUse">
              {/* Outer diamond */}
              <polygon
                points={`18,2 34,${height / 2} 18,${height - 2} 2,${height / 2}`}
                fill="none"
                stroke={color}
                strokeWidth="1.2"
              />
              {/* Inner cross */}
              <line
                x1="18"
                y1={height / 2 - 4}
                x2="18"
                y2={height / 2 + 4}
                stroke={secondaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="14"
                y1={height / 2}
                x2="22"
                y2={height / 2}
                stroke={secondaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Corner accent beads */}
              <circle cx="2" cy={height / 2} r="1.2" fill={color} />
              <circle cx="34" cy={height / 2} r="1.2" fill={color} />
              {/* Running stitch dots */}
              <line
                x1="0"
                y1="1"
                x2="36"
                y2="1"
                stroke={color}
                strokeWidth="0.8"
                strokeDasharray="2 4"
                opacity="0.6"
              />
              <line
                x1="0"
                y1={height - 1}
                x2="36"
                y2={height - 1}
                stroke={color}
                strokeWidth="0.8"
                strokeDasharray="2 4"
                opacity="0.6"
              />
            </pattern>
          )}

          {/* Variant 2: Thái Sawtooth River Wave */}
          {variant === "thai-zigzag" && (
            <pattern id={patternId} width="24" height={height} patternUnits="userSpaceOnUse">
              <path
                d={`M 0,${height - 2} L 6,2 L 12,${height - 2} L 18,2 L 24,${height - 2}`}
                fill="none"
                stroke={color}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M 0,${height - 6} L 6,6 L 12,${height - 6} L 18,6 L 24,${height - 6}`}
                fill="none"
                stroke={secondaryColor}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              <circle cx="6" cy="2" r="1.2" fill={color} />
              <circle cx="18" cy="2" r="1.2" fill={color} />
            </pattern>
          )}

          {/* Variant 3: Dao Sun Medallion Strip */}
          {variant === "dao-sun" && (
            <pattern id={patternId} width="28" height={height} patternUnits="userSpaceOnUse">
              <circle cx="14" cy={height / 2} r={height / 2 - 3} fill="none" stroke={color} strokeWidth="1" />
              <circle cx="14" cy={height / 2} r="2.5" fill={secondaryColor} />
              {/* 8 radiant sun rays */}
              <line x1="14" y1="2" x2="14" y2="4.5" stroke={color} strokeWidth="1.2" />
              <line x1="14" y1={height - 2} x2="14" y2={height - 4.5} stroke={color} strokeWidth="1.2" />
              <line x1="2" y1={height / 2} x2="4.5" y2={height / 2} stroke={color} strokeWidth="1.2" />
              <line x1={26} y1={height / 2} x2={23.5} y2={height / 2} stroke={color} strokeWidth="1.2" />
              <circle cx="14" cy={height / 2} r={height / 2 - 1} fill="none" stroke={secondaryColor} strokeWidth="0.5" strokeDasharray="1 3" />
            </pattern>
          )}

          {/* Variant 4: Terrace Steps (Mù Cang Chải contours) */}
          {variant === "terrace-steps" && (
            <pattern id={patternId} width="32" height={height} patternUnits="userSpaceOnUse">
              <path
                d={`M 0,${height - 2} Q 8,${height - 8} 16,${height - 2} T 32,${height - 2}`}
                fill="none"
                stroke={color}
                strokeWidth="1.3"
              />
              <path
                d={`M 0,${height / 2} Q 8,2 16,${height / 2} T 32,${height / 2}`}
                fill="none"
                stroke={secondaryColor}
                strokeWidth="1"
                opacity="0.75"
              />
            </pattern>
          )}

          {/* Shimmering thread gradient mask */}
          {animated && (
            <linearGradient id={`shimmer-${patternId}`} x1="0%" y1="0%" x2="200%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="65%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
              <animate attributeName="x1" from="-100%" to="100%" dur="6s" repeatCount="indefinite" />
              <animate attributeName="x2" from="100%" to="300%" dur="6s" repeatCount="indefinite" />
            </linearGradient>
          )}
        </defs>

        <rect
          width="100%"
          height={height}
          fill={`url(#${patternId})`}
          mask={animated ? `url(#mask-${patternId})` : undefined}
        />
      </svg>
    </div>
  );
}

interface EthnicEmblemProps {
  variant?: "dao-sun" | "hmong-cross" | "thai-interlock";
  size?: number;
  color?: string;
  secondaryColor?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
}

/**
 * Ethnic Emblem: A standalone cultural seal / medallion stamp
 */
export function EthnicEmblem({
  variant = "dao-sun",
  size = 36,
  color = "var(--gold-bright, #d4af6d)",
  secondaryColor = "var(--seal-cinnabar, #a63527)",
  spinning = false,
  style
}: EthnicEmblemProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        animation: spinning ? "spinSlow 24s linear infinite" : undefined,
        flexShrink: 0,
        ...style
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        {variant === "dao-sun" && (
          <>
            <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="20" cy="20" r="14" stroke={secondaryColor} strokeWidth="1" />
            <polygon
              points="20,4 23,16 35,16 25,23 29,34 20,27 11,34 15,23 5,16 17,16"
              fill="none"
              stroke={color}
              strokeWidth="1.2"
            />
            <circle cx="20" cy="20" r="3.5" fill={secondaryColor} />
            <circle cx="20" cy="20" r="1.5" fill={color} />
          </>
        )}

        {variant === "hmong-cross" && (
          <>
            <rect
              x="5"
              y="5"
              width="30"
              height="30"
              transform="rotate(45 20 20)"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="9"
              y="9"
              width="22"
              height="22"
              transform="rotate(45 20 20)"
              stroke={secondaryColor}
              strokeWidth="1"
              strokeDasharray="2 2"
              fill="none"
            />
            {/* Center cross */}
            <line x1="20" y1="12" x2="20" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="28" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="20" cy="20" r="2" fill={secondaryColor} />
          </>
        )}

        {variant === "thai-interlock" && (
          <>
            <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1.2" />
            <path
              d="M 10,20 C 10,12 20,12 20,20 C 20,28 30,28 30,20"
              stroke={secondaryColor}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 20,10 C 28,10 28,20 20,20 C 12,20 12,30 20,30"
              stroke={color}
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}

interface EthnicDividerProps {
  label?: string;
  variant?: BrocadeVariant;
  color?: string;
  emblemVariant?: "dao-sun" | "hmong-cross" | "thai-interlock";
  style?: React.CSSProperties;
}

/**
 * Editorial Brocade Divider with central cultural emblem
 */
export function EthnicDivider({
  label,
  variant = "hmong-cross",
  color = "var(--gold-bright, #d4af6d)",
  emblemVariant = "dao-sun",
  style
}: EthnicDividerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        width: "100%",
        margin: "18px 0",
        ...style
      }}
    >
      <div style={{ flex: 1, height: 12, overflow: "hidden" }}>
        <EthnicBrocadeBorder variant={variant} height={12} color={color} animated={false} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <EthnicEmblem variant={emblemVariant} size={22} color={color} />
        {label && (
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: color,
              fontWeight: 600
            }}
          >
            {label}
          </span>
        )}
        <EthnicEmblem variant={emblemVariant} size={22} color={color} />
      </div>

      <div style={{ flex: 1, height: 12, overflow: "hidden" }}>
        <EthnicBrocadeBorder variant={variant} height={12} color={color} animated={false} />
      </div>
    </div>
  );
}
