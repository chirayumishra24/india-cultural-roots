import React, { useState } from 'react';
import { RootItChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';

interface RootItChallengeProps {
  data: RootItChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean, categoryId: string) => void;
}

export const RootItChallenge: React.FC<RootItChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (categoryId: string, isCorrect: boolean) => {
    if (answered) return;
    setSelectedId(categoryId);
    setAnswered(true);

    if (isCorrect) {
      soundFx.playCorrect();
      soundFx.playTokenFly();
      setTimeout(() => soundFx.playTreeGrow(), 500);
    } else {
      soundFx.playIncorrect();
    }

    setTimeout(() => {
      onAnswer(isCorrect, categoryId);
    }, 1400);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const [clueImgError, setClueImgError] = useState(false);

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      {!clueImgError ? (
        <img
          src="/assets/clues/stone_relief.jpg"
          alt={data.clueTitle}
          onError={() => setClueImgError(true)}
          className="w-20 h-20 object-cover rounded-xl border-2 border-[#875E38] shadow-md"
        />
      ) : (
        /* Stone Relief Carving Illustration */
        <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-md">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#B38758" stroke="#875E38" strokeWidth="3" />
          <path d="M25 80 C25 40, 75 40, 75 80" fill="none" stroke="#664322" strokeWidth="5" />
          <circle cx="50" cy="46" r="10" fill="#E5CCA8" stroke="#664322" strokeWidth="2.5" />
          <path d="M38 75 C38 60, 62 60, 62 75 Z" fill="#D5B387" stroke="#664322" strokeWidth="2.5" />
          <path d="M30 30 Q50 16 70 30" fill="none" stroke="#664322" strokeWidth="3" />
        </svg>
      )}
      <span className="text-[11px] font-black text-[#5C3D1E] mt-1">
        {data.clueTitle}
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="ROOT IT • CONNECT THE ROOT"
      badgeColor="#F5B041"
      clueGraphic={renderClueGraphic()}
      questionText={data.question}
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      <p className="text-xs text-slate-600 mb-2 font-medium italic">
        "{data.artifactDescription}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.rootOptions.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          let btnStyle = 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-700';

          if (answered) {
            if (opt.isCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400';
            } else if (isSelected) {
              btnStyle = 'bg-rose-50 border-rose-400 text-rose-800';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              disabled={answered}
              className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 transition-all duration-200 text-left shadow-sm ${btnStyle}`}
            >
              {/* Option Letter Pill */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                  answered && opt.isCorrect
                    ? 'bg-emerald-500 text-white'
                    : isSelected
                    ? 'bg-amber-600 text-white'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {optionLetters[idx]}
              </div>
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold leading-tight">
                  {opt.name}
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  {opt.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </ChallengeContainer>
  );
};
