import React from 'react';
import { Users, Star, Sprout, Lightbulb, Palette, Link as LinkIcon, Award } from 'lucide-react';
import { TeamScore, TeamId } from '../../types/game';

interface TeamPanelProps {
  teamId: TeamId;
  teamName: string;
  score: TeamScore;
  isActiveTurn: boolean;
  onEditName?: () => void;
}

export const TeamPanel: React.FC<TeamPanelProps> = ({
  teamId,
  teamName,
  score,
  isActiveTurn,
  onEditName,
}) => {
  const isTeamA = teamId === 'teamA';
  const primaryBg = isTeamA ? 'bg-[#2B7DE9]' : 'bg-[#F38120]';
  const pillBg = isTeamA ? 'bg-[#1C54A8]' : 'bg-[#C8600C]';
  const cardBorder = isTeamA ? 'border-blue-200' : 'border-orange-200';
  const activeGlow = isActiveTurn
    ? isTeamA
      ? 'ring-4 ring-[#2B7DE9]/40 shadow-[0_0_25px_rgba(43,125,233,0.35)]'
      : 'ring-4 ring-[#F38120]/40 shadow-[0_0_25px_rgba(243,129,32,0.35)]'
    : 'opacity-90';

  return (
    <div
      className={`relative w-full sm:w-64 md:w-64 lg:w-72 2xl:w-80 bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-2.5 sm:p-3 2xl:p-4 border-2 ${cardBorder} shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ${activeGlow}`}
    >
      {/* Active Turn Ribbon */}
      {isActiveTurn && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-[9px] sm:text-[10px] 2xl:text-xs tracking-wider uppercase px-2.5 sm:px-3 py-0.5 rounded-full shadow-md animate-bounce whitespace-nowrap">
          Active Turn
        </div>
      )}

      {/* Header Container */}
      <div className={`${primaryBg} rounded-xl sm:rounded-2xl p-2 sm:p-3 2xl:p-3.5 text-white shadow-sm flex flex-col items-center justify-center text-center`}>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
          <h2 className="text-base sm:text-lg 2xl:text-xl font-black tracking-wide">
            {isTeamA ? 'Team A' : 'Team B'}
          </h2>
        </div>
        <div
          onClick={onEditName}
          className={`mt-1 sm:mt-1.5 ${pillBg} px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs 2xl:text-sm font-bold tracking-wide cursor-pointer hover:brightness-110 truncate max-w-full`}
          title="Click to rename"
        >
          {teamName}
        </div>
      </div>

      {/* Score Box */}
      <div className="mt-2 sm:mt-3 bg-amber-50/70 border border-amber-200/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 2xl:p-3.5 flex items-center justify-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 2xl:w-12 2xl:h-12 rounded-lg sm:rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-sm shrink-0">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
        </div>
        <div className="flex items-baseline gap-1 sm:gap-1.5">
          <span className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-slate-800 tracking-tight">
            {score.points}
          </span>
          <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold text-slate-500 uppercase tracking-wider">
            points
          </span>
        </div>
      </div>

      {/* Token List: Compact grid on small screens, detailed list on desktop/smart class */}
      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5 px-0.5 sm:px-1">
        <div className="grid grid-cols-5 sm:flex sm:flex-col gap-1 sm:gap-1.5 text-center sm:text-left">
          {/* Root Tokens */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-1 px-1 sm:px-2 rounded-lg bg-emerald-50/70 sm:bg-transparent hover:bg-slate-50">
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Sprout className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
              </div>
              <span className="hidden sm:inline text-xs 2xl:text-sm font-bold text-slate-700">Root</span>
            </div>
            <span className="text-xs sm:text-sm 2xl:text-base font-black text-slate-800">{score.tokens.root}</span>
          </div>

          {/* Knowledge Tokens */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-1 px-1 sm:px-2 rounded-lg bg-amber-50/70 sm:bg-transparent hover:bg-slate-50">
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Lightbulb className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
              </div>
              <span className="hidden sm:inline text-xs 2xl:text-sm font-bold text-slate-700">Knowledge</span>
            </div>
            <span className="text-xs sm:text-sm 2xl:text-base font-black text-slate-800">{score.tokens.knowledge}</span>
          </div>

          {/* Heritage Tokens */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-1 px-1 sm:px-2 rounded-lg bg-purple-50/70 sm:bg-transparent hover:bg-slate-50">
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
              </div>
              <span className="hidden sm:inline text-xs 2xl:text-sm font-bold text-slate-700">Heritage</span>
            </div>
            <span className="text-xs sm:text-sm 2xl:text-base font-black text-slate-800">{score.tokens.heritage}</span>
          </div>

          {/* Connection Tokens */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-1 px-1 sm:px-2 rounded-lg bg-blue-50/70 sm:bg-transparent hover:bg-slate-50">
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <LinkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
              </div>
              <span className="hidden sm:inline text-xs 2xl:text-sm font-bold text-slate-700">Connection</span>
            </div>
            <span className="text-xs sm:text-sm 2xl:text-base font-black text-slate-800">{score.tokens.connection}</span>
          </div>

          {/* Insight Tokens */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between py-1 px-1 sm:px-2 rounded-lg bg-rose-50/70 sm:bg-transparent hover:bg-slate-50">
            <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Award className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
              </div>
              <span className="hidden sm:inline text-xs 2xl:text-sm font-bold text-slate-700">Insight</span>
            </div>
            <span className="text-xs sm:text-sm 2xl:text-base font-black text-slate-800">{score.tokens.insight}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
