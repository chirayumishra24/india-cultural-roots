import React, { useState } from 'react';
import { MysteryChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface MysteryChallengeProps {
  data: MysteryChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export const MysteryChallenge: React.FC<MysteryChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  const [activeTab, setActiveTab] = useState<'clues' | 'synthesis'>('clues');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelectSynthesis = (id: string, isCorrect: boolean) => {
    if (answered) return;
    setSelectedOptionId(id);
    setAnswered(true);

    if (isCorrect) {
      soundFx.playCorrect();
      soundFx.playLivingCultureCelebration();
    } else {
      soundFx.playIncorrect();
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1800);
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 mb-1">
        <Compass className="w-6 h-6 animate-spin-slow" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        Archive Mystery
      </span>
      <span className="text-[9px] text-amber-700 font-bold uppercase mt-0.5">
        Final Restoration
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="FINAL CHALLENGE • RESTORE THE TREE"
      badgeColor="#D4881A"
      clueGraphic={renderClueGraphic()}
      questionText={
        activeTab === 'clues'
          ? 'Inspect the 4 discovered fragments from the Cultural Roots Archive:'
          : data.finalSynthesisQuestion
      }
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      {/* Navigation tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => setActiveTab('clues')}
          className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeTab === 'clues'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          1. Examine 4 Fragments
        </button>
        <button
          onClick={() => setActiveTab('synthesis')}
          className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
            activeTab === 'synthesis'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>2. Synthesize & Restore Tree</span>
        </button>
      </div>

      {activeTab === 'clues' ? (
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.clues.map((clue) => (
              <div
                key={clue.id}
                className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-left"
              >
                <span className="text-xs font-black text-amber-900 block mb-0.5">
                  {clue.title}
                </span>
                <span className="text-[11px] text-slate-700 leading-snug block font-medium">
                  {clue.detail}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={() => setActiveTab('synthesis')}
              className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <span>Ready to Synthesize</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {data.synthesisOptions.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-white hover:bg-amber-50/60 border-slate-200 text-slate-700';

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
                  onClick={() => handleSelectSynthesis(opt.id, opt.isCorrect)}
                  disabled={answered}
                  className={`p-3 rounded-2xl border-2 text-left text-xs md:text-sm font-bold transition-all shadow-sm ${btnStyle}`}
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        answered && opt.isCorrect ? 'text-emerald-600' : 'text-slate-300'
                      }`}
                    />
                    <span>{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </ChallengeContainer>
  );
};
