import { useState, useCallback, useRef, useEffect } from 'react';
import type { AppPhase, Character, MemeStyle } from '../types';
import { MEME_STYLES, CHARACTER_PROMPTS } from '../templates';
import { playClick, playGenerating, playSuccess, playError, playSelect } from '../utils/sounds';

import avatarCrisvelita from '../img/avatars/crisvelita.png';
import avatarAlgram from '../img/avatars/algram.png';
import avatarJenny from '../img/avatars/jenny.png';
import avatarJmf from '../img/avatars/jmf.png';
import avatarGhostpixel from '../img/avatars/ghostpixel.png';
import avatarIsaya from '../img/avatars/isaya.png';
import avatarIsabel from '../img/avatars/isabel.png';

const R2 = 'https://images.aiwaves.tech/mymeme/avatars';

const DEFAULT_CHARACTERS: Character[] = [
  { id: 'crisvelita', name: 'Crisvelita', avatar: avatarCrisvelita, refUrl: `${R2}/crisvelita.png` },
  { id: 'algram', name: 'Algram', avatar: avatarAlgram, refUrl: `${R2}/algram.png` },
  { id: 'jenny', name: 'Jenny', avatar: avatarJenny, refUrl: `${R2}/jenny.png` },
  { id: 'jmf', name: 'JM\u00B7F', avatar: avatarJmf, refUrl: `${R2}/jmf.png` },
  { id: 'ghostpixel', name: 'ghostpixel', avatar: avatarGhostpixel, refUrl: `${R2}/ghostpixel.png` },
  { id: 'isaya', name: 'Isaya', avatar: avatarIsaya, refUrl: `${R2}/isaya.png` },
  { id: 'isabel', name: 'Isabel', avatar: avatarIsabel, refUrl: `${R2}/isabel.png` },
];

const API_URL = 'https://meme-api-proxy.xinghuan-yin.workers.dev/';
const USER_ID = 123456;
const COOLDOWN_MS = 75000; // 75 seconds

export function useMyMeme() {
  const [phase, setPhase] = useState<AppPhase>('home');
  const [character, setCharacter] = useState<Character>(DEFAULT_CHARACTERS[0]);
  const [showCharSelect, setShowCharSelect] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<MemeStyle | null>(null);
  const [scene1, setScene1] = useState('');
  const [scene2, setScene2] = useState('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Cooldown timer ──────────────────────────────────
  const [cooldownLeft, setCooldownLeft] = useState(0); // seconds remaining
  const lastGenRef = useRef(0);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const t = setInterval(() => {
      const elapsed = Date.now() - lastGenRef.current;
      const left = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setCooldownLeft(left > 0 ? left : 0);
    }, 1000);
    return () => clearInterval(t);
  }, [cooldownLeft]);

  const startCooldown = useCallback(() => {
    lastGenRef.current = Date.now();
    setCooldownLeft(Math.ceil(COOLDOWN_MS / 1000));
  }, []);

  // ── Build prompt ────────────────────────────────────
  const buildPrompt = useCallback((style: MemeStyle, char: Character, s1?: string, s2?: string) => {
    const charDesc = CHARACTER_PROMPTS[char.id] || char.name;
    return style.promptTemplate
      .replace(/\{character\}/g, charDesc)
      .replace(/\{scene1\}/g, s1 || style.defaultScene1)
      .replace(/\{scene2\}/g, s2 || style.defaultScene2);
  }, []);

  // ── Open editor ─────────────────────────────────────
  const openEditor = useCallback((style: MemeStyle) => {
    playClick();
    setSelectedStyle(style);
    setScene1(style.defaultScene1);
    setScene2(style.defaultScene2);
    setError(null);
    setPhase('editor');
  }, []);

  // ── Generate meme ───────────────────────────────────
  const generateMeme = useCallback(async (style?: MemeStyle) => {
    const s = style || selectedStyle;
    if (!s) return;

    playGenerating();
    setSelectedStyle(s);
    setGenerating(true);
    setError(null);
    setResultImage(null);
    setPhase('generating');

    const prompt = buildPrompt(s, character, scene1, scene2);
    console.log('[MyMeme] Prompt:', prompt);

    try {
      abortRef.current = new AbortController();
      const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: '',
          params: { prompt, url: character.refUrl, user_id: USER_ID },
        }),
        signal: abortRef.current.signal,
      });

      const data = await resp.json();
      console.log('[MyMeme] Response:', data);
      if (data.code === 200 && data.url) {
        playSuccess();
        setResultImage(data.url);
        setPhase('result');
        startCooldown();
      } else if (data.code === 429) {
        throw new Error('Too fast! Please wait ~60s and try again.');
      } else {
        throw new Error(data.message || `API error code: ${data.code}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const msg = err instanceof Error ? err.message : 'Generation failed';
      playError();
      console.error('[MyMeme] Error:', msg);
      setError(msg);
      setPhase('generating');
    } finally {
      setGenerating(false);
    }
  }, [selectedStyle, character, buildPrompt, startCooldown]);

  // ── Navigation ──────────────────────────────────────
  const goHome = useCallback(() => {
    abortRef.current?.abort();
    setPhase('home');
    setSelectedStyle(null);
    setScene1('');
    setScene2('');
    setResultImage(null);
    setError(null);
  }, []);

  const goEditor = useCallback(() => {
    setPhase('editor');
  }, []);

  // ── Character selection ─────────────────────────────
  const openCharSelect = useCallback(() => setShowCharSelect(true), []);
  const closeCharSelect = useCallback(() => setShowCharSelect(false), []);
  const pickCharacter = useCallback((char: Character) => {
    playSelect();
    setCharacter(char);
    setShowCharSelect(false);
  }, []);

  return {
    phase,
    character,
    characters: DEFAULT_CHARACTERS,
    showCharSelect,
    selectedStyle,
    styles: MEME_STYLES,
    scene1,
    scene2,
    setScene1,
    setScene2,
    resultImage,
    generating,
    error,
    cooldownLeft,
    openEditor,
    generateMeme,
    goHome,
    goEditor,
    openCharSelect,
    closeCharSelect,
    pickCharacter,
  };
}
