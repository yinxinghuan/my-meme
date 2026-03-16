import { t } from '../i18n';
import './GeneratingScreen.less';

interface Props {
  error: string | null;
  generating: boolean;
  onRetry: () => void;
  onCancel: () => void;
}

export default function GeneratingScreen({ error, generating, onRetry, onCancel }: Props) {
  return (
    <div className="mm-gen">
      <div className="mm-gen__win mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__ctrl-btn" onPointerDown={onCancel}>X</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t('generating.title')}</div>
        </div>

        <div className="mm-gen__body">
          {error ? (
            <>
              <div className="mm-gen__error-icon">!</div>
              <div className="mm-gen__error-text">{error}</div>
              <button className="mm-btn mm-gen__retry" onPointerDown={onRetry}>
                {'\u21BB'} Retry
              </button>
              <button className="mm-gen__cancel" onPointerDown={onCancel}>Back to Home</button>
            </>
          ) : (
            <>
              <div className="mm-gen__spinner" />
              <div className="mm-gen__text">{t('generating.wait')}</div>
              <div className="mm-gen__tip">{t('generating.tip')}</div>
              {generating && (
                <div className="mm-gen__progress">
                  <div className="mm-gen__progress-bar" />
                </div>
              )}
              <button className="mm-gen__cancel" onPointerDown={onCancel}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
