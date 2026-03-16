import { t } from '../i18n';
import type { Character, MemeStyle } from '../types';
import './HomeScreen.less';

interface Props {
  character: Character;
  styles: MemeStyle[];
  cooldownLeft: number;
  onEdit: (style: MemeStyle) => void;
  onQuickGenerate: (style: MemeStyle) => void;
  onOpenCharSelect: () => void;
  logoSrc: string;
}

export default function HomeScreen({ character, styles, cooldownLeft, onEdit, onQuickGenerate, onOpenCharSelect, logoSrc }: Props) {
  const onCooldown = cooldownLeft > 0;
  return (
    <div className="mm-home">
      <div className="mm-home__win mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__ctrl-btn">X</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">MY_MEME.exe</div>
        </div>

        <div className="mm-win__body mm-home__body">
          {/* Header */}
          <div className="mm-home__header">
            <div className="mm-home__title-row">
              <span className="mm-home__brace">{'{'}</span>
              <span className="mm-home__title-text">MY MEME</span>
              <span className="mm-home__brace">{'}'}</span>
            </div>
            <div className="mm-home__subtitle">
              {t('app.subtitle')}<span className="mm-cursor" />
            </div>
            <div className="mm-home__beta-tag">{t('home.betaTag')}</div>
          </div>

          {/* Character card */}
          <div className="mm-home__char mm-card" onPointerDown={onOpenCharSelect}>
            <div className="mm-home__char-row">
              <div className="mm-home__char-avatar">
                <img src={character.avatar} alt={character.name} draggable={false} />
              </div>
              <div className="mm-home__char-info">
                <div className="mm-home__char-name">{character.name}</div>
                <div className="mm-home__char-beta">{t('home.beta')}</div>
              </div>
              <div className="mm-home__char-arrow">{'\u25BC'}</div>
            </div>
          </div>

          <div className="mm-hatch-block" />

          {/* Meme list — flat, single column, large cards */}
          <div className="mm-home__list">
            {styles.map(style => (
              <div key={style.id} className="mm-home__meme mm-card">
                {style.preview && (
                  <div className="mm-home__meme-preview">
                    <img src={style.preview} alt={t(style.nameKey)} draggable={false} />
                  </div>
                )}
                <div className="mm-home__meme-bottom">
                  <div className="mm-home__meme-text" onPointerDown={() => onEdit(style)}>
                    <div className="mm-home__meme-name">{t(style.nameKey)}</div>
                    <div className="mm-home__meme-desc">{t(style.descKey)}</div>
                  </div>
                  <button
                    className="mm-home__meme-btn mm-home__meme-btn--edit"
                    onPointerDown={() => onEdit(style)}
                  >
                    编辑
                  </button>
                  <button
                    className={`mm-home__meme-btn ${onCooldown ? 'mm-home__meme-btn--disabled' : ''}`}
                    onPointerDown={() => !onCooldown && onQuickGenerate(style)}
                  >
                    {onCooldown ? `${cooldownLeft}s` : '\u26A1 生成'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mm-home__footer">
            <img src={logoSrc} alt="" draggable={false} className="mm-home__footer-logo" />
            <span className="mm-home__footer-text">Powered by AIgram</span>
          </div>
        </div>

        <div className="mm-win__statusbar">
          <span>
            <img src={logoSrc} alt="" draggable={false} className="mm-win__statusbar-logo" />
            C:\MEME\HOME
          </span>
          <span>{styles.length} MEMES</span>
        </div>
      </div>

    </div>
  );
}
