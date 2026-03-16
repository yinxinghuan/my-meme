/**
 * Retro computer sound effects via Web Audio API.
 * No audio files needed — all synthesized.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function osc(
  freq: number, type: OscillatorType, duration: number,
  volume = 0.15, ramp = 0.02,
) {
  const c = getCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(volume, c.currentTime + ramp);
  g.gain.linearRampToValueAtTime(0, c.currentTime + duration);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime);
  o.stop(c.currentTime + duration);
}

/** Short click — button press */
export function playClick() {
  osc(800, 'square', 0.06, 0.08, 0.005);
}

/** Heavier click — card/nav tap */
export function playTap() {
  osc(500, 'square', 0.04, 0.1, 0.005);
  setTimeout(() => osc(700, 'square', 0.04, 0.06, 0.005), 30);
}

/** Retro startup chime — splash screen */
export function playStartup() {
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((f, i) => {
    setTimeout(() => osc(f, 'sine', 0.3, 0.1, 0.01), i * 100);
  });
}

/** Processing/generating — low hum with wobble */
export function playGenerating() {
  const c = getCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(120, c.currentTime);
  o.frequency.linearRampToValueAtTime(200, c.currentTime + 0.5);
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.06, c.currentTime + 0.1);
  g.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime);
  o.stop(c.currentTime + 0.6);
}

/** Success — ascending ding */
export function playSuccess() {
  osc(660, 'sine', 0.15, 0.12, 0.01);
  setTimeout(() => osc(880, 'sine', 0.25, 0.12, 0.01), 120);
  setTimeout(() => osc(1100, 'sine', 0.3, 0.08, 0.01), 240);
}

/** Error — descending buzz */
export function playError() {
  osc(400, 'square', 0.12, 0.1, 0.005);
  setTimeout(() => osc(300, 'square', 0.2, 0.1, 0.005), 100);
}

/** Save — short positive pip */
export function playSave() {
  osc(1000, 'sine', 0.08, 0.1, 0.005);
  setTimeout(() => osc(1300, 'sine', 0.12, 0.08, 0.005), 60);
}

/** Character select — soft pop */
export function playSelect() {
  osc(600, 'sine', 0.08, 0.08, 0.005);
  setTimeout(() => osc(900, 'sine', 0.06, 0.06, 0.005), 50);
}
