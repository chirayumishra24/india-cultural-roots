import React, { useState } from 'react';
import { Lightbulb, HelpCircle, Volume2 } from 'lucide-react';
import { TeamId } from '../../types/game';
import { speechEngine } from '../../game/speechEngine';
import { AudiencePollWidget } from './AudiencePollWidget';

interface ChallengeContainerProps {
  activeTeam: TeamId;
  activeTeamName: string;
  badgeText: string;
  badgeColor?: string;
  clueGraphic?: React.ReactNode;
  questionText: string;
  hintText?: string;
  timeLeft: number;
  timerEnabled: boolean;
  children: React.ReactNode;
}

export const ChallengeContainer: React.FC<ChallengeContainerProps> = ({
  activeTeam,
  activeTeamName,
  badgeText,
  badgeColor = '#27AE60',
  clueGraphic,
  questionText,
  hintText,
  timeLeft,
  timerEnabled,
  children,
}) => {
  const [showHint, setShowHint] = useState(false);
  const isTeamA = activeTeam === 'teamA';
  const teamAccent = isTeamA ? 'text-[#2B7DE9]' : 'text-[#F38120]';

  return (
    <div className="relative z-20 w-full max-w-5xl 2xl:max-w-6xl mx-auto px-2 sm:px-3 py-1 sm:py-2">
      <div className="relative bg-white/95 backdrop-blur-md border-2 border-blue-100 rounded-2xl md:rounded-3xl p-3 md:p-4 2xl:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-stretch gap-3 md:gap-4">
        {/* Left: Clue Card Thumbnail (compact banner on mobile, vertical card on desktop/smart class) */}
        <div className="w-full md:w-44 2xl:w-52 shrink-0 bg-gradient-to-b from-[#F9F5EC] to-[#EFE7D5] border-2 border-[#D8C7A5] rounded-xl md:rounded-2xl p-2 sm:p-2.5 flex flex-row md:flex-col items-center justify-center shadow-inner relative overflow-hidden">
          {clueGraphic ? (
            clueGraphic
          ) : (
            <div className="w-full h-16 md:h-28 bg-[#DFD1B5] rounded-xl flex items-center justify-center p-2 text-center border border-[#C5B390]">
              <div className="flex flex-row md:flex-col items-center gap-1 text-[#6D532B]">
                <HelpCircle className="w-5 h-5 md:w-8 md:h-8 opacity-80" />
                <span className="text-[10px] md:text-[11px] font-bold">Cultural Artifact Clue</span>
              </div>
            </div>
          )}
        </div>

        {/* Middle: Turn indicator, Badge, Question & Options */}
        <div className="flex-1 flex flex-col justify-between text-left min-w-0">
          <div>
            {/* Active Team indicator and category badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
              <span className={`text-[11px] sm:text-xs 2xl:text-sm font-black uppercase tracking-wider ${teamAccent}`}>
                {activeTeamName}'s Turn
              </span>
              <span className="text-slate-300">•</span>
              <div
                className="px-2.5 sm:px-3 py-0.5 rounded-full text-white text-[10px] sm:text-[11px] 2xl:text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-sm"
                style={{ backgroundColor: badgeColor }}
              >
                <span>🌱</span>
                <span>{badgeText}</span>
              </div>
            </div>

            {/* Question Text with Read Aloud Button */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm sm:text-base 2xl:text-xl font-bold text-slate-800 leading-snug">
                {questionText}
              </h3>
              <button
                type="button"
                onClick={() => speechEngine.speak(questionText)}
                className="w-7 h-7 sm:w-8 sm:h-8 2xl:w-9 2xl:h-9 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-500 flex items-center justify-center shrink-0 transition-colors"
                title="Read question aloud"
                aria-label="Read question aloud"
              >
                <Volume2 className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </button>
            </div>
          </div>

          {/* Child interaction area (Option buttons, drag targets, sequencing cards, etc.) */}
          <div className="mt-2.5 sm:mt-3">
            {children}
          </div>

          {/* Hint Dropdown if revealed */}
          {showHint && hintText && (
            <div className="mt-2 sm:mt-2.5 p-2 sm:p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs 2xl:text-sm font-medium text-amber-900 flex items-start gap-2 animate-fade-in">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{hintText}</span>
            </div>
          )}
        </div>

        {/* Right: Circular Timer & Controls */}
        <div className="flex md:flex-col items-center justify-between md:justify-center gap-2 sm:gap-3 shrink-0 pt-2 md:pt-0 md:pl-2 md:border-l md:border-slate-100">
          {/* Circular Timer Widget */}
          {timerEnabled && (
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 flex items-center justify-center select-none">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500 transition-all duration-300"
                  strokeDasharray={`${Math.min(100, Math.max(0, (timeLeft / 45) * 100))}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xs sm:text-sm 2xl:text-lg font-black text-slate-800 font-mono">
                  {timeLeft}s
                </span>
              </div>
            </div>
          )}

          {/* Hint Button */}
          {hintText && (
            <button
              onClick={() => setShowHint(prev => !prev)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 2xl:px-4 2xl:py-2 rounded-xl border text-[11px] sm:text-xs 2xl:text-sm font-bold transition-all shadow-sm ${
                showHint
                  ? 'bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-500" />
              <span>Hint</span>
            </button>
          )}

          {/* Classroom Audience Poll Button */}
          <AudiencePollWidget />
        </div>
      </div>
    </div>
  );
};
