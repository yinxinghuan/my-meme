import { useState, useCallback } from 'react';
import { t } from '../i18n';
import { playSave } from '../utils/sounds';
import './MemeResult.less';

interface Props {
  imageUrl: string;
  cooldownLeft: number;
  isInAigram: boolean;
  onRetry: () => void;
  onBack: () => void;
  onHome: () => void;
  logoSrc: string;
}

type PostState = 'idle' | 'posting' | 'posted' | 'failed';

function callAigramAPI(url: string, method: 'GET' | 'POST', data: unknown): Promise<unknown> {
  const params = new URLSearchParams(window.location.search);
  const apiOrigin = params.get('api_origin');
  if (!apiOrigin) return Promise.reject(new Error('not in aigram'));
  return new Promise((resolve, reject) => {
    const requestId = crypto.randomUUID();
    let timer: ReturnType<typeof setTimeout>;
    const handler = (e: MessageEvent) => {
      if (e.origin !== apiOrigin) return;
      const msg = typeof e.data === 'string' ? e.data : '';
      if (!msg.startsWith('callAPIResult-')) return;
      try {
        const r = JSON.parse(atob(msg.slice('callAPIResult-'.length)));
        if (r.request_id !== requestId) return;
        window.removeEventListener('message', handler);
        clearTimeout(timer);
        if (r.success) resolve(r.data); else reject(new Error(r.error ?? 'API error'));
      } catch { /* ignore */ }
    };
    window.addEventListener('message', handler);
    window.parent.postMessage(
      `callAPI-${btoa(JSON.stringify({ url, method, data, request_id: requestId, emitter: window.location.origin }))}`,
      apiOrigin
    );
    timer = setTimeout(() => { window.removeEventListener('message', handler); reject(new Error('timeout')); }, 15_000);
  });
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function MemeResult({ imageUrl, cooldownLeft, isInAigram, onRetry, onBack, onHome, logoSrc }: Props) {
  const onCooldown = cooldownLeft > 0;
  const [saved, setSaved] = useState(false);
  const [postState, setPostState] = useState<PostState>('idle');

  const handlePost = useCallback(async () => {
    if (postState !== 'idle') return;
    setPostState('posting');
    try {
      await callAigramAPI('/note/telegram/note/add', 'POST', {
        photo_url: imageUrl,
        type: 7,
        telegram_id_list: [],
        style: 'No Style',
      });
      setPostState('posted');
      setTimeout(() => setPostState('idle'), 3000);
    } catch {
      setPostState('failed');
      setTimeout(() => setPostState('idle'), 2500);
    }
  }, [imageUrl, postState]);

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
