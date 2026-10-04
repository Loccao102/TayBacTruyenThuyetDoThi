// Web Audio Synthesizer for Physical Paper Turn Rustle, Wooden Stamp & Tactile Clicks
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      sharedAudioCtx = new AudioCtxClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

/**
 * Synthesizes a realistic tactile paper page flip / rustle sound
 * using dual-layer filtered noise (initial fiber snap + sliding parchment drag)
 */
export function playPageFlipSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Layer 1: Initial paper fiber snap / flick (~120ms)
  const snapDuration = 0.12;
  const snapBufferSize = Math.floor(ctx.sampleRate * snapDuration);
  const snapBuffer = ctx.createBuffer(1, snapBufferSize, ctx.sampleRate);
  const snapData = snapBuffer.getChannelData(0);
  for (let i = 0; i < snapBufferSize; i++) {
    snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (snapBufferSize * 0.25));
  }
  const snapNode = ctx.createBufferSource();
  snapNode.buffer = snapBuffer;

  const snapFilter = ctx.createBiquadFilter();
  snapFilter.type = "bandpass";
  snapFilter.frequency.setValueAtTime(2200, now);
  snapFilter.frequency.exponentialRampToValueAtTime(1100, now + snapDuration);
  snapFilter.Q.setValueAtTime(2.0, now);

  const snapGain = ctx.createGain();
  snapGain.gain.setValueAtTime(0.14, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + snapDuration);

  snapNode.connect(snapFilter);
  snapFilter.connect(snapGain);
  snapGain.connect(ctx.destination);
  snapNode.start(now);

  // Layer 2: Trailing tactile parchment sliding friction (~340ms)
  const dragDuration = 0.34;
  const dragBufferSize = Math.floor(ctx.sampleRate * dragDuration);
  const dragBuffer = ctx.createBuffer(1, dragBufferSize, ctx.sampleRate);
  const dragData = dragBuffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < dragBufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    dragData[i] = (b0 + b1 + b2) * 0.16;
  }

  const dragNode = ctx.createBufferSource();
  dragNode.buffer = dragBuffer;

  const dragFilter = ctx.createBiquadFilter();
  dragFilter.type = "bandpass";
  dragFilter.frequency.setValueAtTime(650, now);
  dragFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.14);
  dragFilter.frequency.exponentialRampToValueAtTime(500, now + dragDuration);
  dragFilter.Q.setValueAtTime(1.2, now);

  const dragGain = ctx.createGain();
  dragGain.gain.setValueAtTime(0.001, now);
  dragGain.gain.linearRampToValueAtTime(0.11, now + 0.05);
  dragGain.gain.exponentialRampToValueAtTime(0.001, now + dragDuration);

  dragNode.connect(dragFilter);
  dragFilter.connect(dragGain);
  dragGain.connect(ctx.destination);

  dragNode.start(now + 0.02);
  dragNode.stop(now + dragDuration);
}

/**
 * Synthesizes an authentic cinnabar woodblock seal stamp "thud"
 * (Wood resonance + wet ink contact sound)
 */
export function playStampSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Heavy resonant wood block thud
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(145, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(0.28, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.18);

  // 2. High crisp ink compression squelch
  const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.3));
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1800, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.12, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  noiseSource.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);
}

/**
 * Subtle organic wooden tap for UI navigation
 */
export function playWoodBlockSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.06);
}
