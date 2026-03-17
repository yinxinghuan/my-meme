import { useState } from 'react';
import { t } from '../i18n';
import type { Character } from '../types';
import { playSelect, playClick } from '../utils/sounds';
import './CharacterSelect.less';

interface Props {
  characters: Character[];
  current: Character;
  onPick: (char: Character) => void;
  onClose: () => void;
}

export default function CharacterSelect({ characters, current, onPick, onClose }: Props) {
  const [pendingId, setPendingId] = useState<string>(current.id);
  const pendingChar = characters.find(c => c.id === pendingId) ?? current;
  const isChanged = pendingId !== current.id;

  function handleSelect(char: Character) {
    if (char.id !== pendingId) {
      setPendingId(char.id);
      playSelect();
    }
  }

  function handleConfirm() {
    playClick();
    onPick(pendingChar);
  }

  return (
    <div className="mm-charsel">
      <div className="mm-charsel__overlay" onPointerDown={onClose} />
      <div className="mm-charsel__dialog mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__back-btn" onPointerDown={onClose}>{'\u2039'}</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t('charSelect.title')}</div>
        </div>

        <div className="mm-charsel__body">
          <div className="mm-charsel__prompt">
            {'>'} Select a character:<span className="mm-cursor" />
          </div>
          <div className="mm-charsel__list">
            {characters.map(char => {
              const isConfirmed = char.id === current.id;
              const isPending = char.id === pendingId && isChanged;
              return (
                <div
                  key={char.id}
                  className={[
                    'mm-charsel__item',
                    isConfirmed ? 'mm-charsel__item--active' : '',
                    isPending ? 'mm-charsel__item--pending' : '',
                  ].join(' ').trim()}
                  onPointerDown={() => handleSelect(char)}
                >
                  <div className="mm-charsel__avatar">
                    <img src={char.avatar} alt={char.name} draggable={false} />
                  </div>
                  <div className="mm-charsel__name">{char.name}</div>
                  {isConfirmed && (
                    <div className="mm-charsel__check">{'\u2713'}</div>
                  )}
                </div>
              );
            })}
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

        <div className="mm-charsel__footer">
          <div
            className={`mm-charsel__confirm-btn${isChanged ? '' : ' mm-charsel__confirm-btn--disabled'}`}
            onPointerDown={isChanged ? handleConfirm : undefined}
          >
            {isChanged ? `> CONFIRM: ${pendingChar.name}` : '\u2713 CONFIRMED'}
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
