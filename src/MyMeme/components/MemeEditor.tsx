import { t } from '../i18n';
import type { Character, MemeStyle } from '../types';
import './MemeEditor.less';

interface Props {
  style: MemeStyle;
  character: Character;
  scene1: string;
  scene2: string;
  cooldownLeft: number;
  onScene1Change: (v: string) => void;
  onScene2Change: (v: string) => void;
  onGenerate: () => void;
  onBack: () => void;
}

export default function MemeEditor({
  style, character, scene1, scene2, cooldownLeft,
  onScene1Change, onScene2Change, onGenerate, onBack,
}: Props) {
  const onCooldown = cooldownLeft > 0;

  return (
    <div className="mm-editor">
      <div className="mm-editor__win mm-win">
        <div className="mm-win__titlebar">
          <div className="mm-win__back-btn" onPointerDown={onBack}>{'\u2039'}</div>
          <div className="mm-win__hatch" />
          <div className="mm-win__title">{t(style.nameKey)}</div>
        </div>

        <div className="mm-win__body mm-editor__body">
          {/* Character badge */}
          <div className="mm-editor__char">
            <img src={character.avatar} alt={character.name} draggable={false} />
            <div>
              <div className="mm-editor__char-name">{character.name}</div>
              <div className="mm-editor__desc">{t(style.descKey)}</div>
            </div>
          </div>

          <div className="mm-hatch-block" />

          {/* Scene inputs */}
          <div className={`mm-editor__panels ${style.layout === 'tb' ? 'mm-editor__panels--tb' : ''}`}>
            <div className="mm-editor__panel">
              <label className="mm-editor__label">
                {t(style.layout === 'tb' ? 'editor.scene1.tb' : 'editor.scene1')}_
              </label>
              <textarea
                className="mm-editor__input"
                value={scene1}
                onChange={e => onScene1Change(e.target.value)}
                placeholder={style.defaultScene1}
                rows={4}
              />
            </div>
            <div className="mm-editor__panel">
              <label className="mm-editor__label">
                {t(style.layout === 'tb' ? 'editor.scene2.tb' : 'editor.scene2')}_
              </label>
              <textarea
                className="mm-editor__input"
                value={scene2}
                onChange={e => onScene2Change(e.target.value)}
                placeholder={style.defaultScene2}
                rows={4}
              />
            </div>
          </div>

          {/* Generate button */}
          <button
            className={`mm-home__meme-btn mm-editor__generate ${onCooldown ? 'mm-home__meme-btn--disabled' : ''}`}
            onPointerDown={() => !onCooldown && onGenerate()}
          >
            {onCooldown ? `${t('editor.wait')} ${cooldownLeft}s` : '\u26A1 ' + t('editor.generate')}
          </button>
        </div>

        <div className="mm-win__statusbar">
          <span>C:\MEME\EDIT</span>
          <span>{onCooldown ? `COOLDOWN ${cooldownLeft}s` : 'READY'}</span>
        </div>
      </div>
    </div>
  );
}
