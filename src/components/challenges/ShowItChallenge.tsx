import React, { useState } from 'react';
import { ShowItChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { Sparkles, HelpCircle } from 'lucide-react';

interface ShowItChallengeProps {
  data: ShowItChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  opposingTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export const ShowItChallenge: React.FC<ShowItChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  opposingTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  const [step, setStep] = useState<'prompt' | 'guess' | 'reflection'>('prompt');
  const [selectedGuessId, setSelectedGuessId] = useState<string | null>(null);
  const [selectedReflectionId, setSelectedReflectionId] = useState<string | null>(null);

  const handleStartGuessing = () => {
    soundFx.playSelect();
    setStep('guess');
  };

  const handleGuess = (id: string, isCorrect: boolean) => {
    setSelectedGuessId(id);
    if (isCorrect) {
      soundFx.playCorrect();
      setTimeout(() => setStep('reflection'), 800);
    } else {
      soundFx.playIncorrect();
      setTimeout(() => onAnswer(false), 1200);
    }
  };

  const handleReflection = (id: string, isCorrect: boolean) => {
    setSelectedReflectionId(id);
    if (isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-600 mb-1">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        Culture in Action
      </span>
      <span className="text-[9px] text-teal-600 font-bold uppercase mt-0.5">
        Classroom Expression
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="SHOW IT • IN ACTION"
      badgeColor="#00BCD4"
      clueGraphic={renderClueGraphic()}
      questionText={
        step === 'prompt'
          ? `${activeTeamName}: Read your action prompt and perform it for ${opposingTeamName}!`
          : step === 'guess'
          ? `${opposingTeamName}: What cultural concept was being shown?`
          : 'Reflection Step: What does this example help us understand?'
      }
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      {step === 'prompt' && (
        <div className="p-4 bg-teal-50/80 border-2 border-teal-200 rounded-2xl text-center">
          <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block mb-1">
            SECRET MISSION FOR {activeTeamName.toUpperCase()}
          </span>
          <p className="text-sm font-extrabold text-slate-800 mb-3">
            "{data.secretConcept}"
          </p>
          <p className="text-xs text-slate-600 mb-4">
            {data.actionPrompt}
          </p>
          <button
            onClick={handleStartGuessing}
            className="px-6 py-2 rounded-xl bg-[#00BCD4] hover:bg-[#0097A7] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Ready! Let {opposingTeamName} Guess
          </button>
        </div>
      )}

      {step === 'guess' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {data.optionsForGuessers.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleGuess(opt.id, opt.isCorrect)}
              disabled={selectedGuessId !== null}
              className={`p-3 rounded-2xl border-2 text-left text-xs md:text-sm font-bold transition-all ${
                selectedGuessId === opt.id
                  ? opt.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-rose-50 border-rose-400 text-rose-800'
                  : 'bg-white hover:bg-teal-50/60 border-slate-200 text-slate-700'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {step === 'reflection' && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-teal-800">
            <HelpCircle className="w-4 h-4" />
            <span>{data.reflectionQuestion}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {data.reflectionOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleReflection(opt.id, opt.isCorrect)}
                disabled={selectedReflectionId !== null}
                className={`p-2.5 rounded-xl border-2 text-left text-xs font-bold transition-all ${
                  selectedReflectionId === opt.id
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </ChallengeContainer>
  );
};
