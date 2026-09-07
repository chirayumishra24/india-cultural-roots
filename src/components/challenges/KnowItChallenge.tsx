import React, { useState } from 'react';
import { QuizChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';

interface KnowItChallengeProps {
  data: QuizChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean, selectedOptionId: string) => void;
}

export const KnowItChallenge: React.FC<KnowItChallengeProps> = ({
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
      onAnswer(isCorrect, optionId);
    }, 1200);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  const renderClueGraphic = () => (
    <div className="w-full h-28 bg-[#DFD1B5] rounded-xl flex flex-col items-center justify-center p-2 text-center border border-[#C5B390] select-none">
      <div className="text-3xl mb-1">📜</div>
      <span className="text-[11px] font-bold text-[#6D532B]">Ancient Text Record</span>
      <span className="text-[9px] text-[#8E7348] italic">Palm leaf script & seal</span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="KNOW IT"
      badgeColor="#9B51E0"
      clueGraphic={renderClueGraphic()}
      questionText={data.question}
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {data.options.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          let btnStyle = 'bg-white hover:bg-blue-50/60 border-slate-200 text-slate-700';

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
              {/* Option Letter Pill matching reference (A, B, C, D in circle) */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                  answered && opt.isCorrect
                    ? 'bg-emerald-500 text-white'
                    : isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {optionLetters[idx]}
              </div>
              <span className="text-xs md:text-sm font-bold leading-tight">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>
    </ChallengeContainer>
  );
};
