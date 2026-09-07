import React, { useState } from 'react';
import { BuildItChallengeData, BuildItItem } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { ChevronUp, ChevronDown, Check, Layers } from 'lucide-react';

interface BuildItChallengeProps {
  data: BuildItChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export const BuildItChallenge: React.FC<BuildItChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  // Shuffle items initially
  const [items, setItems] = useState<BuildItItem[]>(() => {
    return [...data.items].sort(() => Math.random() - 0.5);
  });
  const [answered, setAnswered] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState<boolean | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (answered) return;
    soundFx.playClick();
    const newItems = [...items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setItems(newItems);
  };

  const handleSubmit = () => {
    if (answered) return;
    setAnswered(true);

    // Verify if order is 1, 2, 3, 4
    const correct = items.every((item, idx) => item.order === idx + 1);
    setIsCorrectOrder(correct);

    if (correct) {
      soundFx.playCorrect();
      soundFx.playTokenFly();
      setTimeout(() => soundFx.playTreeGrow(), 400);
    } else {
      soundFx.playIncorrect();
    }

    setTimeout(() => {
      onAnswer(correct);
    }, 1800);
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-600 mb-1">
        <Layers className="w-6 h-6" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        Chronology & Order
      </span>
      <span className="text-[9px] text-pink-600 font-bold uppercase mt-0.5">
        Arrange Stages
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="BUILD IT • SEQUENCE"
      badgeColor="#E91E63"
      clueGraphic={renderClueGraphic()}
      questionText={data.instruction}
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-xl border-2 flex items-center justify-between gap-2 transition-all ${
              answered
                ? item.order === idx + 1
                  ? 'bg-emerald-50 border-emerald-500'
                  : 'bg-rose-50 border-rose-400'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <div className="text-left">
                <span className="text-xs md:text-sm font-bold text-slate-800 block">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {item.step}
                </span>
              </div>
            </div>

            {!answered && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => moveItem(idx, 'up')}
                  disabled={idx === 0}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === items.length - 1}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {!answered ? (
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Sequence</span>
          </button>
        </div>
      ) : (
        isCorrectOrder && (
          <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-900">
            {data.pedagogicalInsight}
          </div>
        )
      )}
    </ChallengeContainer>
  );
};
