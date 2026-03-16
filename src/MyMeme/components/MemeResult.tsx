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

/* eslint-disable @typescript-eslint/no-explicit-any */
const TG = ((window as any).Telegram?.WebApp) as any | undefined;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function MemeResult({ imageUrl, cooldownLeft, onRetry, onBack, onHome, logoSrc }: Props) {
  const onCooldown = cooldownLeft > 0;
  const [saved, setSaved] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Pre-fetch image as blob
  useEffect(() => {
    let url: string | null = null;
    fetch(imageUrl)
      .then(r => r.blob())
      .then(blob => {
        url = URL.createObjectURL(blob);
        setBlobUrl(url);
      })
      .catch(() => {});
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [imageUrl]);

  const markSaved = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const handleSave = useCallback(async () => {
    const fileName = `meme-${Date.now()}.png`;

    // Strategy 1: Telegram WebApp downloadFile
    if (TG?.downloadFile) {
      try {
        TG.downloadFile({ url: imageUrl, file_name: fileName });
        markSaved();
        return;
      } catch { /* fall through */ }
    }

    // Strategy 2: Telegram openLink (opens in external browser where save works)
    if (TG?.openLink) {
      try {
        TG.openLink(imageUrl);
        markSaved();
        return;
      } catch { /* fall through */ }
    }

    // Strategy 3: navigator.share with file
    if (navigator.share) {
      try {
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], fileName, { type: 'image/png' });
        await navigator.share({ files: [file] });
        markSaved();
        return;
      } catch { /* user cancelled or not supported, fall through */ }
    }

    // Strategy 4: <a download> (desktop browsers)
    if (blobUrl) {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      markSaved();
      return;
    }

    // Strategy 5: open in new tab
    window.open(imageUrl, '_blank');
  }, [imageUrl, blobUrl, markSaved]);

  return (
    <div className="mm-result">
      <div className="mm-result__win mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__ctrl-btn" onPointerDown={onHome}>X</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t('result.title')}</div>
        </div>

        <div className="mm-win__body mm-result__body">
          {/* Image — user-select enabled for long-press save */}
          <div className="mm-result__image-wrap">
            <img
              className="mm-result__image"
              src={blobUrl || imageUrl}
              alt="Generated meme"
            />
          </div>

          {isMobile && (
            <div className="mm-result__hint">{t('result.longPressHint')}</div>
          )}

          <div className="mm-result__actions">
            <button
              className={`mm-btn mm-result__save ${saved ? 'mm-result__save--saved' : ''}`}
              onPointerDown={handleSave}
            >
              {saved ? t('result.saved') : t('result.save')}
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
