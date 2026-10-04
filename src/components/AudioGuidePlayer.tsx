"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Headphones,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { playWoodBlockSound } from "@/utils/audioEffects";
import {
  speakVietnameseFemale,
  stopVietnameseSpeech,
  useVietnameseFemaleVoice
} from "@/utils/speech";

interface AudioGuidePlayerProps {
  siteTitle: string;
  narrationText: string;
}

export default function AudioGuidePlayer({ siteTitle, narrationText }: AudioGuidePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cancelSpeechRef = useRef<(() => void) | null>(null);
  const voiceInfo = useVietnameseFemaleVoice();

  // Split narration into sentences for live karaoke highlighting
  const sentences = useMemo(() => {
    const raw = narrationText.trim();
    if (!raw) return [];
    // Split on punctuation followed by space or end
    const split = raw.match(/[^.!?…]+[.!?…]*/g);
    return split ? split.map(s => s.trim()).filter(Boolean) : [raw];
  }, [narrationText]);

  // Stop speech when unmounting or changing monument
  useEffect(() => {
    stopSpeech();
    setActiveSentenceIndex(0);
  }, [siteTitle, narrationText]);

  const stopSpeech = () => {
    stopVietnameseSpeech();
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      cancelSpeechRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setProgress(0);
    setActiveSentenceIndex(0);
  };

  const togglePlay = () => {
    playWoodBlockSound();
    if (isPlaying) {
      pauseSpeech();
    } else {
      startSpeech(activeSentenceIndex);
    }
  };

  const startSpeech = (startFromSentence: number = 0) => {
    stopSpeech();

    // Get slice of sentences starting from index
    const textToSpeak = sentences.slice(startFromSentence).join(" ").replace(/[*_#]/g, "");
    if (!textToSpeak) return;

    // Calculate duration estimate based on character count
    const totalChars = textToSpeak.length;
    const totalEstSeconds = (totalChars / 13) / speed;
    let elapsed = 0;

    const cancelFn = speakVietnameseFemale(
      textToSpeak,
      voiceInfo,
      () => {
        // onEnd
        setIsPlaying(false);
        setProgress(100);
        setActiveSentenceIndex(sentences.length - 1);
        if (timerRef.current) clearInterval(timerRef.current);
      },
      () => {
        // onStart
        setIsPlaying(true);
      }
    );

    cancelSpeechRef.current = cancelFn;
    setIsPlaying(true);
    setActiveSentenceIndex(startFromSentence);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      elapsed += 0.25;
      const pct = Math.min(99, (elapsed / totalEstSeconds) * 100);
      setProgress(pct);

      const sentenceProgress = Math.min(
        sentences.length - 1,
        Math.floor((elapsed / totalEstSeconds) * (sentences.length - startFromSentence)) + startFromSentence
      );
      setActiveSentenceIndex(sentenceProgress);
    }, 250);
  };

  const pauseSpeech = () => {
    stopVietnameseSpeech();
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      cancelSpeechRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  const restartSpeech = () => {
    playWoodBlockSound();
    stopSpeech();
    setTimeout(() => {
      startSpeech(0);
    }, 120);
  };

  const toggleSpeed = () => {
    playWoodBlockSound();
    const speeds = [0.85, 1.0, 1.25];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setSpeed(nextSpeed);

    if (isPlaying) {
      stopSpeech();
      setTimeout(() => startSpeech(activeSentenceIndex), 100);
    }
  };

  const toggleMute = () => {
    playWoodBlockSound();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (isPlaying) {
      stopSpeech();
      setTimeout(() => startSpeech(activeSentenceIndex), 100);
    }
  };

  const handleSentenceClick = (idx: number) => {
    playWoodBlockSound();
    stopSpeech();
    setActiveSentenceIndex(idx);
    startSpeech(idx);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(246, 238, 224, 0.95) 0%, rgba(238, 226, 208, 0.9) 100%)",
        border: "1px solid rgba(181, 140, 73, 0.4)",
        borderRadius: 10,
        padding: "14px 18px",
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 4px 16px rgba(94, 69, 56, 0.08)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Top Bar: Icon, Title & Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--seal-cinnabar) 0%, #822116 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(166, 53, 39, 0.35)"
            }}
          >
            <Headphones size={18} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink-primary)" }}>
                Audio Guide Thuyết Minh Di Tích
              </span>
              <span
                style={{
                  fontSize: "9px",
                  padding: "1px 6px",
                  borderRadius: 10,
                  background: isPlaying ? "rgba(69, 109, 78, 0.15)" : "rgba(94, 69, 56, 0.1)",
                  color: isPlaying ? "var(--forest-green)" : "var(--ink-muted)",
                  fontWeight: 600,
                  letterSpacing: "0.05em"
                }}
              >
                {isPlaying ? "LIVE ON AIR" : "TIẾNG VIỆT"}
              </span>
            </div>
            <span style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
              {isPlaying
                ? `Đang thuyết minh: ${siteTitle}`
                : `Giọng đọc: ${voiceInfo.label}${voiceInfo.voice && !voiceInfo.isKnownFemale ? " (đã nâng tông nữ)" : ""}`}
            </span>
          </div>
        </div>

        {/* Action Buttons: Speed, Mute, Restart, Play/Pause */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Restart */}
          <button
            onClick={restartSpeech}
            title="Nghe lại từ đầu"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(94, 69, 56, 0.08)",
              border: "1px solid rgba(94, 69, 56, 0.15)",
              color: "var(--ink-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <RotateCcw size={13} />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            title="Đổi tốc độ đọc"
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: 6,
              background: "rgba(94, 69, 56, 0.08)",
              border: "1px solid rgba(94, 69, 56, 0.15)",
              color: "var(--ink-secondary)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {speed}x
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: isMuted ? "rgba(166, 53, 39, 0.12)" : "rgba(94, 69, 56, 0.08)",
              border: "1px solid rgba(94, 69, 56, 0.15)",
              color: isMuted ? "var(--seal-cinnabar)" : "var(--ink-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            title={isPlaying ? "Tạm dừng" : "Phát thuyết minh"}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--leather-base) 0%, #2b1710 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
              cursor: "pointer",
              transition: "transform 0.15s ease",
              marginLeft: 4
            }}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: 2 }} />}
          </button>
        </div>
      </div>

      {/* Progress Bar & Animated Equalizer Waves */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
        <div
          style={{
            flex: 1,
            height: 5,
            background: "rgba(94, 69, 56, 0.15)",
            borderRadius: 3,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--accent-gold) 0%, var(--seal-cinnabar) 100%)",
              transition: "width 0.25s linear",
              borderRadius: 3
            }}
          />
        </div>

        {/* 6 Animated Equalizer Waves */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 16 }}>
          {[12, 18, 14, 20, 16, 10].map((h, i) => (
            <span
              key={i}
              style={{
                width: 2.5,
                height: isPlaying ? `${Math.max(4, (h * (progress % 2 === 0 ? 0.9 : 0.6)))}px` : "3px",
                background: isPlaying ? "var(--accent-gold)" : "rgba(94, 69, 56, 0.3)",
                borderRadius: 1.5,
                transition: "height 0.18s ease"
              }}
            />
          ))}
        </div>
      </div>

      {/* Active Sentence Karaoke Highlighting */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          borderRadius: 6,
          padding: "8px 12px",
          border: "1px dashed rgba(181, 140, 73, 0.5)",
          fontSize: "12px",
          lineHeight: 1.65,
          color: "var(--ink-primary)",
          fontFamily: "var(--font-serif)"
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--seal-cinnabar)", marginRight: 6, textTransform: "uppercase" }}>
          Đang đọc:
        </span>
        <span style={{ fontStyle: "italic", color: isPlaying ? "var(--ink-primary)" : "var(--ink-secondary)" }}>
          {sentences[activeSentenceIndex] || narrationText}
        </span>
      </div>

      {/* Transcript Accordion Toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            playWoodBlockSound();
            setShowFullTranscript(!showFullTranscript);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: "11px",
            color: "var(--ink-secondary)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          <FileText size={12} />
          <span>{showFullTranscript ? "Thu gọn bản thuyết minh" : "Xem toàn văn bản thuyết minh"}</span>
          {showFullTranscript ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Full Transcript with Interactive Sentence Click-to-Play */}
      {showFullTranscript && (
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: 6,
            border: "1px solid rgba(94, 69, 56, 0.15)",
            fontSize: "12px",
            lineHeight: 1.8,
            color: "var(--ink-secondary)",
            maxHeight: 160,
            overflowY: "auto"
          }}
        >
          {sentences.map((sent, sIdx) => {
            const isActive = isPlaying && sIdx === activeSentenceIndex;
            return (
              <span
                key={sIdx}
                onClick={() => handleSentenceClick(sIdx)}
                title="Bấm để nghe từ câu này"
                style={{
                  cursor: "pointer",
                  padding: "1px 3px",
                  borderRadius: 3,
                  marginRight: 4,
                  background: isActive ? "rgba(212, 175, 109, 0.35)" : "transparent",
                  color: isActive ? "var(--ink-primary)" : "inherit",
                  fontWeight: isActive ? 600 : 400,
                  transition: "background 0.2s ease"
                }}
              >
                {sent}{" "}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
