import { useState, useEffect } from 'react';
import { useMyMeme } from './hooks/useMyMeme';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import MemeEditor from './components/MemeEditor';
import GeneratingScreen from './components/GeneratingScreen';
import MemeResult from './components/MemeResult';
import CharacterSelect from './components/CharacterSelect';
import { useGameScore, Leaderboard } from '@shared/leaderboard';
import aigramSrc from './img/aigram.svg';
import './MyMeme.less';

const MM_SCORE_KEY = 'my-meme-score';

export default function MyMeme() {
  const state = useMyMeme();
  const [splashDone, setSplashDone] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { isInAigram, submitScore, fetchGlobalLeaderboard, fetchFriendsLeaderboard, postToAigram } = useGameScore('my-meme');

  // 每次生成成功后累计得分并提交
  useEffect(() => {
    if (state.phase === 'result' && state.resultImage) {
      const text = (state.scene1 ?? '') + (state.scene2 ?? '');
      const earned = 50 + (text.length > 40 ? 30 : text.length >= 10 ? 15 : 0);
      const prev = parseInt(localStorage.getItem(MM_SCORE_KEY) ?? '0', 10);
      const total = prev + earned;
      localStorage.setItem(MM_SCORE_KEY, String(total));
      submitScore(total);
    }
  }, [state.phase, state.resultImage]);

  return (
    <div className="mm">
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      {showLeaderboard && (
        <Leaderboard
          gameName="My Meme"
          isInAigram={isInAigram}
          onClose={() => setShowLeaderboard(false)}
          fetchGlobal={fetchGlobalLeaderboard}
          fetchFriends={fetchFriendsLeaderboard}
        />
      )}

      {splashDone && state.phase === 'home' && (
        <HomeScreen
          character={state.character}
          styles={state.styles}
          cooldownLeft={state.cooldownLeft}
          onEdit={state.openEditor}
          onQuickGenerate={state.generateMeme}
          onOpenCharSelect={state.openCharSelect}
          onLeaderboard={() => setShowLeaderboard(true)}
          logoSrc={aigramSrc}
        />
      )}

      {splashDone && state.phase === 'editor' && state.selectedStyle && (
        <MemeEditor
          style={state.selectedStyle}
          character={state.character}
          scene1={state.scene1}
          scene2={state.scene2}
          cooldownLeft={state.cooldownLeft}
          onScene1Change={state.setScene1}
          onScene2Change={state.setScene2}
          onGenerate={() => state.generateMeme()}
          onBack={state.goHome}
        />
      )}

      {splashDone && state.phase === 'generating' && (
        <GeneratingScreen
          avatarSrc={state.character.avatar}
          error={state.error}
          generating={state.generating}
          onRetry={() => state.generateMeme()}
          onCancel={state.goHome}
        />
      )}

      {splashDone && state.phase === 'result' && state.resultImage && (
        <MemeResult
          imageUrl={state.resultImage}
          cooldownLeft={state.cooldownLeft}
          isInAigram={isInAigram}
          onPost={postToAigram}
          onRetry={() => state.generateMeme()}
          onBack={state.goEditor}
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
