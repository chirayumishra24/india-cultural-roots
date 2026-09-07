import React, { useState } from 'react';
import { ThinkItChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { Lightbulb, Info } from 'lucide-react';

interface ThinkItChallengeProps {
  data: ThinkItChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export const ThinkItChallenge: React.FC<ThinkItChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (id: string, isCorrect: boolean) => {
    if (answered) return;
    setSelectedId(id);
    setAnswered(true);

    if (isCorrect) {
      soundFx.playCorrect();
      soundFx.playTokenFly();
    } else {
      soundFx.playIncorrect();
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 mb-1">
        <Lightbulb className="w-6 h-6 animate-bounce" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        Critical Reasoning
      </span>
      <span className="text-[9px] text-purple-600 font-bold uppercase mt-0.5">
        Continuity & Change
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="THINK IT • REASONING"
      badgeColor="#8E44AD"
      clueGraphic={renderClueGraphic()}
      questionText={data.inquiry}
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      {/* Case Scenario */}
      <div className="mb-3 p-3 bg-purple-50/70 border border-purple-200 rounded-2xl text-left">
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-purple-800 mb-1">
          <Info className="w-3.5 h-3.5 text-purple-600" />
          <span>Observed Case Scenario</span>
        </div>
        <p className="text-xs font-medium text-slate-700 leading-relaxed mb-2">
          {data.scenario}
        </p>
        <div className="space-y-1 pl-3 border-l-2 border-purple-300">
          {data.clues.map((clue, idx) => (
            <p key={idx} className="text-[11px] text-slate-600">
              • {clue}
            </p>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2">
        {data.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          let btnStyle = 'bg-white hover:bg-purple-50/50 border-slate-200 text-slate-700';

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
              className={`p-2.5 rounded-xl border-2 text-left text-xs md:text-sm font-bold transition-all shadow-sm ${btnStyle}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </ChallengeContainer>
  );
};
