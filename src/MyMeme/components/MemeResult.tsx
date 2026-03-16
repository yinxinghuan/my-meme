import { useState, useCallback, useEffect } from 'react';
import { t } from '../i18n';
import './MemeResult.less';

interface Props {
  imageUrl: string;
  cooldownLeft: number;
  onRetry: () => void;
  onBack: () => void;
  onHome: () => void;
  logoSrc: string;
}

// Detect Telegram Mini App
const isTelegram = !!((window as unknown) as Record<string, unknown>).Telegram;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const canShare = !!navigator.share;

export default function MemeResult({ imageUrl, cooldownLeft, onRetry, onBack, onHome, logoSrc }: Props) {
  const onCooldown = cooldownLeft > 0;
  const [saved, setSaved] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Pre-fetch image as blob for sharing/saving
  useEffect(() => {
    let revoke: string | null = null;
    fetch(imageUrl)
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        revoke = url;
        setBlobUrl(url);
      })
      .catch(() => {});
    return () => { if (revoke) URL.revokeObjectURL(revoke); };
  }, [imageUrl]);

  const handleSave = useCallback(async () => {
    try {
      // Strategy 1: navigator.share (best for mobile / Telegram)
      if (canShare) {
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], `meme-${Date.now()}.png`, { type: 'image/png' });
        await navigator.share({ files: [file] });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        return;
      }

      // Strategy 2: download link (desktop browsers)
      if (blobUrl) {
        const link = document.createElement('a');
        link.download = `meme-${Date.now()}.png`;
        link.href = blobUrl;
        link.click();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        return;
      }

      // Strategy 3: open in new tab
      window.open(imageUrl, '_blank');
    } catch {
      // share() cancelled or failed, try opening directly
      window.open(imageUrl, '_blank');
    }
  }, [imageUrl, blobUrl]);

  return (
    <div className="mm-result">
      <div className="mm-result__win mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__ctrl-btn" onPointerDown={onHome}>X</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t('result.title')}</div>
        </div>

        <div className="mm-win__body mm-result__body">
          {/* Image — NOT pointer-events:none, so users can long-press to save */}
          <div className="mm-result__image-wrap">
            <img
              className="mm-result__image"
              src={blobUrl || imageUrl}
              alt="Generated meme"
            />
          </div>

          {/* Hint for mobile / Telegram users */}
          {(isMobile || isTelegram) && (
            <div className="mm-result__hint">{t('result.longPressHint')}</div>
          )}

          <div className="mm-result__actions">
            <button
              className={`mm-btn mm-result__save ${saved ? 'mm-result__save--saved' : ''}`}
              onPointerDown={handleSave}
            >
              {saved ? t('result.saved') : (canShare ? t('result.share') : t('result.save'))}
            </button>
            <div className="mm-result__secondary">
              <button
                className={`mm-result__nav-btn ${onCooldown ? 'mm-result__nav-btn--disabled' : ''}`}
                onPointerDown={() => !onCooldown && onRetry()}
              >
                {onCooldown ? `${cooldownLeft}s` : `\u21BB ${t('result.retry')}`}
              </button>
              <button className="mm-result__nav-btn" onPointerDown={onBack}>
                {'\u270E'} Edit
              </button>
              <button className="mm-result__nav-btn" onPointerDown={onHome}>
                {'\u25C0'} Home
              </button>
            </div>
          </div>
        </div>

        <div className="mm-win__statusbar">
          <span>
            <img src={logoSrc} alt="" draggable={false} className="mm-win__statusbar-logo" />
            C:\MEME\OUTPUT
          </span>
          <span>{saved ? 'SAVED' : 'READY'}</span>
        </div>
      </div>
    </div>
  );
}
