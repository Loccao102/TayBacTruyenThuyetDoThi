"use client";

import { useEffect, useState } from "react";

/**
 * Vietnamese female voice selection for the Web Speech API.
 *
 * Browsers expose very different voice lists:
 *  - Edge / Windows : "Microsoft HoaiMy Online (Natural)" (nữ), "Microsoft NamMinh Online (Natural)" (nam)
 *  - Chrome         : "Google Tiếng Việt" (nữ)
 *  - Safari / iOS   : "Linh" (nữ)
 *  - Android        : "Vietnamese (Vietnam)" (không rõ giới tính)
 * We rank voices instead of taking the first "vi" match.
 */

const FEMALE_HINT = /hoaimy|hoài\s?my|linh|google\s(tiếng việt|vietnamese)|female|nữ|\bmai\b|\blan\b|ngọc|ngoc|thu\b|hương|huong/i;
const MALE_HINT = /namminh|nam\s?minh|\ban\b|\bmale\b|\bnam\b|đức|duc\b|\bminh\b|hoàng|hoang/i;

export interface VietnameseVoiceInfo {
  voice: SpeechSynthesisVoice | null;
  /** true when the voice name is a known female voice */
  isKnownFemale: boolean;
  /** Short label to show in the UI */
  label: string;
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function isVietnamese(v: SpeechSynthesisVoice): boolean {
  return /^vi([-_]|$)/i.test(v.lang) || /vietnam|tiếng việt/i.test(v.name);
}

function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name;
  // "female" contains the substring "male", so test female first.
  if (FEMALE_HINT.test(name)) score += 100;
  else if (MALE_HINT.test(name)) score -= 100;
  // Neural / natural voices sound far more human.
  if (/natural|online|neural/i.test(name)) score += 20;
  if (/google/i.test(name)) score += 10;
  if (v.localService === false) score += 5;
  if (/^vi-VN$/i.test(v.lang)) score += 3;
  return score;
}

export function pickVietnameseFemaleVoice(voices: SpeechSynthesisVoice[]): VietnameseVoiceInfo {
  const viVoices = voices.filter(isVietnamese);
  if (viVoices.length === 0) {
    return { voice: null, isKnownFemale: false, label: "Giọng mặc định của trình duyệt" };
  }
  const ranked = [...viVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
  const best = ranked[0];
  const isKnownFemale = FEMALE_HINT.test(best.name) && scoreVoice(best) > 0;
  const cleanName = best.name.replace(/^Microsoft\s+/i, "").replace(/\s*-\s*Vietnamese.*$/i, "");
  return {
    voice: best,
    isKnownFemale,
    label: isKnownFemale ? `${cleanName} · giọng nữ` : `${cleanName}`
  };
}

/** Resolve once voices are available (they load asynchronously in Chrome/Edge). */
export function loadVoices(timeoutMs = 1800): Promise<SpeechSynthesisVoice[]> {
  return new Promise(resolve => {
    if (!isSpeechSupported()) return resolve([]);
    const synth = window.speechSynthesis;
    const existing = synth.getVoices();
    if (existing.length > 0) return resolve(existing);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", onChange);
      resolve(synth.getVoices());
    };
    const onChange = () => finish();
    synth.addEventListener("voiceschanged", onChange);
    window.setTimeout(finish, timeoutMs);
  });
}

/**
 * Build an utterance that sounds feminine.
 * If the best voice is not a known female one, raise the pitch a little so a male
 * fallback voice does not read Nana's lines in a deep register.
 */
export function createFemaleUtterance(
  text: string,
  info: VietnameseVoiceInfo,
  options: { rate?: number; volume?: number } = {}
): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  if (info.voice) utterance.voice = info.voice;
  utterance.rate = options.rate ?? 0.97;
  utterance.pitch = info.isKnownFemale ? 1.04 : 1.3;
  utterance.volume = options.volume ?? 1;
  return utterance;
}

/** React hook: resolves and caches the preferred Vietnamese female voice. */
export function useVietnameseFemaleVoice(): VietnameseVoiceInfo {
  const [info, setInfo] = useState<VietnameseVoiceInfo>({
    voice: null,
    isKnownFemale: false,
    label: "Đang tìm giọng đọc..."
  });

  useEffect(() => {
    let cancelled = false;
    loadVoices().then(voices => {
      if (!cancelled) setInfo(pickVietnameseFemaleVoice(voices));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return info;
}
