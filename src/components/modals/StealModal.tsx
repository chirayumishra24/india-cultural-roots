import React, { useState } from 'react';
import { QuizChallengeData } from '../../types/challenges';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { Award, CheckCircle, XCircle } from 'lucide-react';

interface StealModalProps {
  data: QuizChallengeData;
  stealingTeam: TeamId;
  stealingTeamName: string;
  onStealAttempt: (isCorrect: boolean) => void;
  onPassSteal: () => void;
}

export const StealModal: React.FC<StealModalProps> = ({
  data,
  stealingTeam,
  stealingTeamName,
  onStealAttempt,
  onPassSteal,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const isTeamA = stealingTeam === 'teamA';
  const teamTheme = isTeamA ? 'text-blue-600 border-blue-300' : 'text-orange-600 border-orange-300';

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
      onStealAttempt(isCorrect);
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md select-none animate-fade-in">
      <div className={`relative w-full max-w-lg bg-white border-4 ${teamTheme} rounded-3xl p-6 shadow-2xl text-center`}>
        {/* Steal Banner */}
        <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-900 mb-3 animate-pulse">
          <Award className="w-4 h-4 text-amber-600" />
          <span>CHANCE TO STEAL • +5 POINTS</span>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-1">
          {stealingTeamName}, Can You Solve It?
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-medium">
          The clue was not quite resolved. Pick the best supported option:
        </p>

        {/* Question Text */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-4 text-left">
          <p className="text-xs md:text-sm font-bold text-slate-800">
            {data.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2 mb-4">
          {data.options.map((opt) => {
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
                className={`p-2.5 rounded-xl border-2 text-left text-xs md:text-sm font-bold transition-all shadow-sm flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {answered && opt.isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                {answered && isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {!answered && (
          <button
            onClick={onPassSteal}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 underline transition-colors"
          >
            Pass Steal Opportunity
          </button>
        )}
      </div>
    </div>
  );
};
