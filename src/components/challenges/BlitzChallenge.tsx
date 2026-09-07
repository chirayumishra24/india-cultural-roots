import React, { useState, useEffect } from 'react';
import { BlitzChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { CulturalCategory } from '../../types/challenges';
import { soundFx } from '../../game/audioEngine';
import { Zap, CheckCircle, XCircle } from 'lucide-react';

interface BlitzChallengeProps {
  data: BlitzChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  onFinish: (scoreEarned: number) => void;
}

const CATEGORY_BUTTONS: { id: CulturalCategory; label: string; color: string }[] = [
  { id: 'stories', label: 'Stories', color: 'bg-[#9B51E0]' },
  { id: 'language', label: 'Language', color: 'bg-[#F2994A]' },
  { id: 'arts', label: 'Arts', color: 'bg-[#00BCD4]' },
  { id: 'music', label: 'Music', color: 'bg-[#E91E63]' },
  { id: 'knowledge', label: 'Knowledge', color: 'bg-[#F5B041]' },
  { id: 'practices', label: 'Practices', color: 'bg-[#27AE60]' },
  { id: 'heritage', label: 'Heritage', color: 'bg-[#5C6BC0]' },
];

export const BlitzChallenge: React.FC<BlitzChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  onFinish,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Blitz timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      onFinish(score);
      return;
    }
    const interval = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining, score, onFinish]);

  const currentItem = data.deck[currentIndex % data.deck.length];

  const handleCategoryPick = (catId: CulturalCategory) => {
    const isCorrect = catId === currentItem.correctCategory;

    if (isCorrect) {
      soundFx.playCorrect();
      setScore(prev => prev + 5);
      setFeedback('correct');
    } else {
      soundFx.playIncorrect();
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex(prev => prev + 1);
    }, 250);
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-600 mb-1">
        <Zap className="w-7 h-7 fill-orange-500 animate-bounce" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        Rapid Fire Sprint
      </span>
      <span className="text-[9px] text-orange-600 font-bold uppercase mt-0.5">
        Score: +{score} pts
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="BLITZ • 30-SECOND SPRINT"
      badgeColor="#F38120"
      clueGraphic={renderClueGraphic()}
      questionText="Rapidly tap the correct cultural category for this clue!"
      timeLeft={secondsRemaining}
      timerEnabled={true}
    >
      {/* Rapid Card Display */}
      <div className="relative mb-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl text-center shadow-inner">
        {feedback === 'correct' && (
          <div className="absolute top-2 right-2 text-emerald-600 flex items-center gap-1 text-xs font-black animate-scale-in">
            <CheckCircle className="w-4 h-4" /> +5
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="absolute top-2 right-2 text-rose-500 flex items-center gap-1 text-xs font-black animate-scale-in">
            <XCircle className="w-4 h-4" />
          </div>
        )}
        <h4 className="text-base font-black text-slate-800 tracking-tight">
          {currentItem.cardName}
        </h4>
        <p className="text-xs text-slate-600 font-medium mt-1">
          {currentItem.description}
        </p>
      </div>

      {/* Category Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CATEGORY_BUTTONS.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryPick(cat.id)}
            className={`${cat.color} hover:brightness-110 active:scale-95 text-white py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm transition-all`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </ChallengeContainer>
  );
};
