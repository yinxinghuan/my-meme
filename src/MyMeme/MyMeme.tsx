import { useState } from 'react';
import { useMyMeme } from './hooks/useMyMeme';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import GeneratingScreen from './components/GeneratingScreen';
import MemeResult from './components/MemeResult';
import CharacterSelect from './components/CharacterSelect';
import aigramSrc from './img/aigram.svg';
import './MyMeme.less';

export default function MyMeme() {
  const state = useMyMeme();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div className="mm">
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      {splashDone && state.phase === 'home' && (
        <HomeScreen
          character={state.character}
          styles={state.styles}
          onGenerate={state.generateMeme}
          onOpenCharSelect={state.openCharSelect}
          logoSrc={aigramSrc}
        />
      )}

      {splashDone && state.phase === 'generating' && (
        <GeneratingScreen
          error={state.error}
          generating={state.generating}
          onRetry={() => state.generateMeme()}
          onCancel={state.goHome}
        />
      )}

      {splashDone && state.phase === 'result' && state.resultImage && (
        <MemeResult
          imageUrl={state.resultImage}
          onRetry={() => state.generateMeme()}
          onHome={state.goHome}
          logoSrc={aigramSrc}
        />
      )}

      {state.showCharSelect && (
        <CharacterSelect
          characters={state.characters}
          current={state.character}
          onPick={state.pickCharacter}
          onClose={state.closeCharSelect}
        />
      )}
    </div>
  );
}
