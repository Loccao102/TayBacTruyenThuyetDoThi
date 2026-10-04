"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const playFluteTone = (freq: number, duration = 3.0) => {
    if (!audioCtxRef.current || !isPlaying) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Warm lowpass filter to mimic wooden bamboo flute
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    // Gentle Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  };

  const startSoundscape = () => {
    // Pentatonic scale (C4, D4, F4, G4, A4, C5)
    const scale = [261.63, 293.66, 349.23, 392.0, 440.0, 523.25];

    const step = () => {
      if (!isPlaying) return;
      const note = scale[Math.floor(Math.random() * scale.length)];
      playFluteTone(note, 3.2);

      const delay = 2500 + Math.random() * 2500;
      timerRef.current = setTimeout(step, delay);
    };

    step();
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startSoundscape();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Tắt âm thanh sáo núi" : "Bật âm thanh sáo ngàn Tây Bắc"}
      aria-label="Âm thanh núi rừng Tây Bắc"
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 50,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: isPlaying ? "var(--accent-gold)" : "rgba(43, 26, 20, 0.75)",
        color: isPlaying ? "#20120d" : "var(--paper-ivory)",
        border: "1px solid rgba(212, 175, 109, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,0.35)",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
