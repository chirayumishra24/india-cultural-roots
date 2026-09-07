import React, { useState } from 'react';
import { ConnectItChallengeData } from '../../types/challenges';
import { ChallengeContainer } from './ChallengeContainer';
import { TeamId } from '../../types/game';
import { soundFx } from '../../game/audioEngine';
import { Link2, Sparkles } from 'lucide-react';

interface ConnectItChallengeProps {
  data: ConnectItChallengeData;
  activeTeam: TeamId;
  activeTeamName: string;
  timeLeft: number;
  timerEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
}

export const ConnectItChallenge: React.FC<ConnectItChallengeProps> = ({
  data,
  activeTeam,
  activeTeamName,
  timeLeft,
  timerEnabled,
  onAnswer,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState<boolean | null>(null);

  const handleCardClick = (id: string) => {
    if (answered) return;
    soundFx.playClick();

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
      return;
    }

    if (selectedIds.length === 0) {
      setSelectedIds([id]);
    } else if (selectedIds.length === 1) {
      const pair = [selectedIds[0], id];
      setSelectedIds(pair);
      setAnswered(true);

      const isValid =
        (pair[0] === data.validPairIds[0] && pair[1] === data.validPairIds[1]) ||
        (pair[0] === data.validPairIds[1] && pair[1] === data.validPairIds[0]);

      setConnectionSuccess(isValid);

      if (isValid) {
        soundFx.playCorrect();
      } else {
        soundFx.playIncorrect();
      }

      setTimeout(() => {
        onAnswer(isValid);
      }, 1600);
    }
  };

  const renderClueGraphic = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-600 mb-1">
        <Link2 className="w-6 h-6 animate-pulse" />
      </div>
      <span className="text-[11px] font-black text-slate-800 leading-tight">
        Connect Cultural Concepts
      </span>
      <span className="text-[9px] text-blue-600 font-bold uppercase mt-0.5">
        Select 2 Linked Cards
      </span>
    </div>
  );

  return (
    <ChallengeContainer
      activeTeam={activeTeam}
      activeTeamName={activeTeamName}
      badgeText="CONNECT IT • RELATIONSHIPS"
      badgeColor="#2B7DE9"
      clueGraphic={renderClueGraphic()}
      questionText={data.prompt}
      hintText={data.hint}
      timeLeft={timeLeft}
      timerEnabled={timerEnabled}
    >
      <div className="relative">
        {/* Visual Connection Link Indicator between selected cards */}
        {selectedIds.length === 2 && (
          <div className="absolute inset-x-0 -top-3 flex justify-center z-10 pointer-events-none">
            <div
              className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md animate-bounce ${
                connectionSuccess ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{connectionSuccess ? 'Relationship Established!' : 'Connection Not Supported'}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {data.itemsToConnect.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            let cardStyle = 'bg-white hover:bg-blue-50/60 border-slate-200 text-slate-700';

            if (isSelected) {
              if (answered && connectionSuccess) {
                cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400';
              } else if (answered && !connectionSuccess) {
                cardStyle = 'bg-rose-50 border-rose-400 text-rose-800';
              } else {
                cardStyle = 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-400 -translate-y-1';
              }
            }

            return (
              <button
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                disabled={answered}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all duration-200 shadow-sm relative ${cardStyle}`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow">
                    ✓
                  </div>
                )}
                <span className="text-xl mb-1">✨</span>
                <span className="text-xs font-black leading-snug">{item.label}</span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-1">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Relationship debrief message if completed */}
      {answered && connectionSuccess && (
        <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-900 flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{data.relationshipExplanation}</span>
        </div>
      )}
    </ChallengeContainer>
  );
};
