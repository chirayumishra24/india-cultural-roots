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
      className={`relative w-64 md:w-72 bg-white/95 backdrop-blur-md rounded-3xl p-3 border-2 ${cardBorder} shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ${activeGlow}`}
    >
      {/* Active Turn Ribbon */}
      {isActiveTurn && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black text-[10px] tracking-wider uppercase px-3 py-0.5 rounded-full shadow-md animate-bounce">
          Active Turn
        </div>
      )}

      {/* Header Container */}
      <div className={`${primaryBg} rounded-2xl p-3 text-white shadow-sm flex flex-col items-center justify-center text-center`}>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-white/90" />
          <h2 className="text-lg font-black tracking-wide">
            {isTeamA ? 'Team A' : 'Team B'}
          </h2>
        </div>
        <div
          onClick={onEditName}
          className={`mt-1.5 ${pillBg} px-3 py-0.5 rounded-full text-xs font-bold tracking-wide cursor-pointer hover:brightness-110`}
          title="Click to rename"
        >
          {teamName}
        </div>
      </div>

      {/* Score Box */}
      <div className="mt-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-sm">
          <Star className="w-6 h-6 fill-white" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-slate-800 tracking-tight">
            {score.points}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            points
          </span>
        </div>
      </div>

      {/* Token List */}
      <div className="mt-3 space-y-1.5 px-1">
        {/* Root Tokens */}
        <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Root Tokens</span>
          </div>
          <span className="text-sm font-black text-slate-800">{score.tokens.root}</span>
        </div>

        {/* Knowledge Tokens */}
        <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Knowledge Tokens</span>
          </div>
          <span className="text-sm font-black text-slate-800">{score.tokens.knowledge}</span>
        </div>

        {/* Heritage Tokens */}
        <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Heritage Tokens</span>
          </div>
          <span className="text-sm font-black text-slate-800">{score.tokens.heritage}</span>
        </div>

        {/* Connection Tokens */}
        <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <LinkIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Connection Tokens</span>
          </div>
          <span className="text-sm font-black text-slate-800">{score.tokens.connection}</span>
        </div>

        {/* Insight Tokens */}
        <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-700">Insight Tokens</span>
          </div>
          <span className="text-sm font-black text-slate-800">{score.tokens.insight}</span>
        </div>
      </div>
    </div>
  );
};
