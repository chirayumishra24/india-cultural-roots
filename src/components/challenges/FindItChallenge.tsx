import React, { useState } from 'react';
import { FindItChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { CheckCircle2, Search } from 'lucide-react';

interface FindItChallengeProps {
  data: FindItChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export const FindItChallenge: React.FC<FindItChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (answered) return;
    setSelectedId(optionId);
    setAnswered(true);

    if (isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1300);
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mb-1">
        <Search className="w-6 h-6" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        {data.clueTitle || 'Artifact Evidence'}
      </span>
      <span className="text-[9px] text-emerald-700 font-bold uppercase mt-0.5">
        Detective Clue
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="FIND IT • DETECTIVE"
      badgeColor="#27AE60"
      clueGraphic={renderClueGraphic()}
      questionText={data.evidenceQuestion}
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      {/* Investigation Clues Box */}
      <div className="mb-3 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
        <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Discovered Evidence Points</span>
        </div>
        <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc font-medium">
          {data.investigationClues.map((clue, idx) => (
            <li key={idx}>{clue}</li>
          ))}
        </ul>
      </div>

      {/* Interpretation Options */}
      <div className="grid grid-cols-1 gap-2">
        {data.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          let btnStyle = 'bg-white hover:bg-emerald-50/50 border-slate-200 text-slate-700';

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
              className={`flex items-center gap-3 p-2.5 rounded-xl border-2 text-left transition-all shadow-sm ${btnStyle}`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className="text-xs md:text-sm font-bold">{opt.text}</span>
            </button>
          );
        })}
      </div>
    </ChallengeContainer>
  );
};
