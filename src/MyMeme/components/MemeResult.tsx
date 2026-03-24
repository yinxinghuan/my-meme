import { useState, useCallback } from 'react';
import { t } from '../i18n';
import { playSave } from '../utils/sounds';
import './MemeResult.less';

interface Props {
  imageUrl: string;
  cooldownLeft: number;
  isInAigram: boolean;
  onPost: (photoUrl: string) => Promise<string | null>;
  onRetry: () => void;
  onBack: () => void;
  onHome: () => void;
  logoSrc: string;
}

type PostState = 'idle' | 'posting' | 'posted' | 'failed';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function MemeResult({ imageUrl, cooldownLeft, isInAigram, onPost, onRetry, onBack, onHome, logoSrc }: Props) {
  const onCooldown = cooldownLeft > 0;
  const [saved, setSaved] = useState(false);
  const [postState, setPostState] = useState<PostState>('idle');

  const handlePost = useCallback(async () => {
    if (postState !== 'idle') return;
    setPostState('posting');
    try {
      await onPost(imageUrl);
      setPostState('posted');
    } catch {
      setPostState('failed');
      setTimeout(() => setPostState('idle'), 2500);
    }
  }, [imageUrl, postState, onPost]);

  const markSaved = useCallback(() => {
    playSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const handleSave = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TG = ((window as any)?.Telegram?.WebApp) as any;

    // Telegram Mini App: open image URL in external browser
    if (TG) {
      try {
        if (typeof TG.openLink === 'function') {
          TG.openLink(imageUrl);
          markSaved();
          return;
        }
      } catch (e) {
        console.warn('[Save] TG.openLink failed:', e);
      }
    }

    // Mobile: try navigator.share
    if (isMobile && navigator.share) {
      fetch(imageUrl)
        .then(r => r.blob())
        .then(blob => {
          const file = new File([blob], `meme-${Date.now()}.png`, { type: 'image/png' });
          return navigator.share({ files: [file] });
        })
        .then(() => markSaved())
        .catch(() => {
          // share failed/cancelled, open in new tab
          window.open(imageUrl, '_blank');
        });
      return;
    }

    // Desktop: download via <a>
    fetch(imageUrl)
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meme-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        markSaved();
      })
      .catch(() => {
        window.open(imageUrl, '_blank');
      });
  }, [imageUrl, markSaved]);

  return (
    <div className="mm-result">
      <div className="mm-result__win mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__back-btn" onPointerDown={onHome}>{'\u2039'}</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t('result.title')}</div>
        </div>

        <div className="mm-win__body mm-result__body">
          <div className="mm-result__image-wrap">
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              <img
                className="mm-result__image"
                src={imageUrl}
                alt="Generated meme"
              />
            </a>
          </div>

          {isMobile && (
            <div className="mm-result__hint">{t('result.longPressHint')}</div>
          )}

          <div className="mm-result__actions">
            {isInAigram && (
              <button
                className={`mm-btn mm-result__post mm-result__post--${postState}`}
                onPointerDown={handlePost}
                disabled={postState === 'posting'}
              >
                {postState === 'posting' ? t('result.posting')
                  : postState === 'posted' ? t('result.posted')
                  : postState === 'failed' ? t('result.postFail')
                  : t('result.post')}
              </button>
            )}
            {/* Use onClick for maximum WebView compatibility */}
            <button
              className={`mm-btn mm-result__save ${saved ? 'mm-result__save--saved' : ''}`}
              onClick={handleSave}
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
