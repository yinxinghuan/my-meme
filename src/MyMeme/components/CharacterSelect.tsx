import { t } from '../i18n';
import type { Character } from '../types';
import './CharacterSelect.less';

interface Props {
  characters: Character[];
  current: Character;
  onPick: (char: Character) => void;
  onClose: () => void;
}

export default function CharacterSelect({ characters, current, onPick, onClose }: Props) {
  return (
    <div className="mm-charsel">
      <div className="mm-charsel__overlay" onPointerDown={onClose} />
      <div className="mm-charsel__dialog mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__ctrl-btn" onPointerDown={onClose}>X</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t('charSelect.title')}</div>
        </div>

        <div className="mm-charsel__body">
          <div className="mm-charsel__prompt">
            {'>'} Select a character:<span className="mm-cursor" />
          </div>
          <div className="mm-charsel__list">
            {characters.map(char => (
              <div
                key={char.id}
                className={`mm-charsel__item ${char.id === current.id ? 'mm-charsel__item--active' : ''}`}
                onPointerDown={() => onPick(char)}
              >
                <div className="mm-charsel__avatar">
                  <img src={char.avatar} alt={char.name} draggable={false} />
                </div>
                <div className="mm-charsel__name">{char.name}</div>
                {char.id === current.id && (
                  <div className="mm-charsel__check">{'\u2713'}</div>
                )}
              </div>
            ))}
          </div>

          {/* Coming soon notice */}
          <div className="mm-charsel__coming-soon">
            <div className="mm-charsel__coming-soon-line">- - - - - - - - - - - - - - - -</div>
            <div className="mm-charsel__coming-soon-text">
              {t('charSelect.comingSoon')}
            </div>
            <div className="mm-charsel__coming-soon-sub">
              {t('charSelect.comingSoonSub')}
            </div>
          </div>
        </div>

        <div className="mm-win__statusbar">
          <span>C:\MEME\CHARACTERS</span>
          <span>{characters.length} ITEMS</span>
        </div>
      </div>
    </div>
  );
}
