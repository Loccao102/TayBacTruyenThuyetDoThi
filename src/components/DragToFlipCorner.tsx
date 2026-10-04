"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { playPageFlipSound } from "@/utils/audioEffects";

interface DragToFlipCornerProps {
  side: "right" | "left";
  disabled?: boolean;
  onFlip: () => void;
  tooltip?: string;
}

/**
 * DragToFlipCorner: Interactive tactile page corner peeling.
 * Supports both immediate click-to-flip and physical dragging across the book spread
 * with realistic curl geometry, backface paper texture, and drop shadows.
 */
export default function DragToFlipCorner({
  side,
  disabled = false,
  onFlip,
  tooltip
}: DragToFlipCornerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [peelProgress, setPeelProgress] = useState(0); // 0 to 1
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPointerDown = useRef(false);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;
      const dx = side === "right" ? startPos.current.x - e.clientX : e.clientX - startPos.current.x;
      const dy = startPos.current.y - e.clientY;

      const maxPeelDist = 260; // Max drag distance for complete turn
      const progress = Math.min(1, Math.max(0, dx / maxPeelDist));
      setPeelProgress(progress);
      setDragOffset({ x: Math.max(0, dx), y: Math.max(0, dy) });
    };

    const handlePointerUp = () => {
      isPointerDown.current = false;
      setIsDragging(false);

      if (peelProgress > 0.32) {
        // Drag threshold reached: complete flip
        playPageFlipSound();
        onFlip();
      }
      setPeelProgress(0);
      setDragOffset({ x: 0, y: 0 });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, peelProgress, side, onFlip]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    isPointerDown.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    // If it was just a click without significant drag (<10px), trigger immediate flip
    if (disabled) return;
    if (dragOffset.x < 10 && dragOffset.y < 10) {
      onFlip();
    }
  };

  if (disabled) return null;

  const isRight = side === "right";
  const cornerSize = isDragging ? Math.max(56, 56 + dragOffset.x * 0.9) : 56;
  const shadowDepth = isDragging ? 12 + peelProgress * 30 : 6;
  const shadowOpacity = isDragging ? 0.25 + peelProgress * 0.4 : 0.15;

  return (
    <>
      {/* The Tactile Corner Peel Area */}
      <div
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        title={tooltip || (isRight ? "Kéo hoặc nhấn để lật sang trang sau" : "Kéo hoặc nhấn để lật về trang trước")}
        style={{
          position: "absolute",
          bottom: 0,
          [isRight ? "right" : "left"]: 0,
          width: `${cornerSize}px`,
          height: `${Math.min(cornerSize * 1.05, 280)}px`,
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: 45,
          userSelect: "none",
          touchAction: "none",
          transition: isDragging ? "none" : "all 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)",
          background: isRight
            ? `linear-gradient(135deg, transparent 50%, rgba(94, 69, 56, 0.18) 51%, #dfd0b5 52%, #faf5eb 100%)`
            : `linear-gradient(225deg, transparent 50%, rgba(94, 69, 56, 0.18) 51%, #dfd0b5 52%, #faf5eb 100%)`,
          boxShadow: isRight
            ? `-${shadowDepth}px -${shadowDepth}px ${shadowDepth * 1.5}px rgba(43, 27, 21, ${shadowOpacity})`
            : `${shadowDepth}px -${shadowDepth}px ${shadowDepth * 1.5}px rgba(43, 27, 21, ${shadowOpacity})`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: isRight ? "flex-end" : "flex-start",
          padding: "6px"
        }}
      >
        {/* Affordance icon or dragging hint */}
        {!isDragging ? (
          isRight ? (
            <ChevronRight size={15} color="var(--ink-secondary)" style={{ opacity: 0.7 }} />
          ) : (
            <ChevronLeft size={15} color="var(--ink-secondary)" style={{ opacity: 0.7 }} />
          )
        ) : (
          <div
            style={{
              fontSize: "9.5px",
              fontFamily: "var(--font-serif)",
              color: "var(--ochre-earth)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "2px 4px",
              textTransform: "uppercase"
            }}
          >
            {peelProgress > 0.32 ? "Thả lật ➔" : "Kéo tiếp..."}
          </div>
        )}
      </div>

      {/* Dynamic Under-page Shadow cast when peeling */}
      {isDragging && peelProgress > 0.05 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            [isRight ? "right" : "left"]: 0,
            width: `${cornerSize * 1.2}px`,
            height: `${cornerSize * 1.2}px`,
            pointerEvents: "none",
            zIndex: 42,
            background: `radial-gradient(ellipse at ${isRight ? "100% 100%" : "0% 100%"}, rgba(35, 18, 12, ${
              peelProgress * 0.5
            }) 0%, transparent 70%)`
          }}
        />
      )}
    </>
  );
}
