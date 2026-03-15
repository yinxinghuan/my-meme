import React, { useState, useEffect, forwardRef } from 'react';
import posterSrc from '../img/poster.png';

// Preload all avatar images
import avatarCrisvelita from '../img/avatars/crisvelita.png';
import avatarAlgram from '../img/avatars/algram.png';
import avatarJenny from '../img/avatars/jenny.png';
import avatarJmf from '../img/avatars/jmf.png';
import avatarGhostpixel from '../img/avatars/ghostpixel.png';
import avatarIsaya from '../img/avatars/isaya.png';
import avatarIsabel from '../img/avatars/isabel.png';

import './SplashScreen.less';

const PRELOAD = [
  avatarCrisvelita, avatarAlgram, avatarJenny, avatarJmf,
  avatarGhostpixel, avatarIsaya, avatarIsabel,
];

const MIN_MS = 2200;
const MAX_ASSET_MS = 10000;

interface Props { onDone: () => void; }

const SplashScreen = React.memo(
  forwardRef<HTMLDivElement, Props>(function SplashScreen({ onDone }, ref) {
    const [posterReady, setPosterReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fading, setFading] = useState(false);
    const [minDone, setMinDone] = useState(false);
    const [assetsDone, setAssetsDone] = useState(false);

    // Gate 1: min display time
    useEffect(() => {
      const t = setTimeout(() => setMinDone(true), MIN_MS);
      return () => clearTimeout(t);
    }, []);

    // Gate 2: preload assets after poster loads
    useEffect(() => {
      if (!posterReady) return;
      let loaded = 0;
      const total = PRELOAD.length;
      const onOne = () => {
        loaded++;
        setProgress(loaded / total);
        if (loaded >= total) setAssetsDone(true);
      };
      PRELOAD.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = onOne;
        img.src = src;
      });
      const maxT = setTimeout(() => setAssetsDone(true), MAX_ASSET_MS);
      return () => clearTimeout(maxT);
    }, [posterReady]);

    // Gate 3: both done → fade out
    useEffect(() => {
      if (minDone && assetsDone) setFading(true);
    }, [minDone, assetsDone]);

    useEffect(() => {
      if (!fading) return;
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }, [fading, onDone]);

    return (
      <div ref={ref} className={`mm-splash${fading ? ' mm-splash--fading' : ''}`}>
        <img
          className={`mm-splash__img${posterReady ? ' mm-splash__img--visible' : ''}`}
          src={posterSrc}
          alt="MY MEME"
          draggable={false}
          onLoad={() => setPosterReady(true)}
        />
        <div className="mm-splash__bar-track">
          <div className="mm-splash__bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    );
  })
);

SplashScreen.displayName = 'SplashScreen';
export default SplashScreen;
