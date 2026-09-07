import React from 'react';
import { Award, Sprout, Link2, CheckCircle2, ArrowRight, Printer } from 'lucide-react';
import { TeamScore, SkillPracticeLog } from '../../types/game';
import { getWinningTeam } from '../../game/scoring';

interface ResultsModalProps {
  teamAScore: TeamScore;
  teamBScore: TeamScore;
  teamAName: string;
  teamBName: string;
  discoveredRootsCount: number;
  totalCategories: number;
  skillsLog: SkillPracticeLog;
  onProceedToReflection: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  teamAScore,
  teamBScore,
  teamAName,
  teamBName,
  discoveredRootsCount,
  totalCategories,
  skillsLog,
  onProceedToReflection,
}) => {
  const result = getWinningTeam(teamAScore, teamBScore, teamAName, teamBName);

  // Determine top skill practiced
  const skillEntries = Object.entries(skillsLog) as [keyof SkillPracticeLog, number][];
  skillEntries.sort((a, b) => b[1] - a[1]);
  const topSkillName = skillEntries[0] ? skillEntries[0][0].toUpperCase() : 'OBSERVATION';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border-4 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl text-center max-h-[90vh] overflow-y-auto">
        {/* Header Ribbon */}
        <div className="inline-block bg-gradient-to-b from-[#8C5326] to-[#4D2409] border-2 border-[#3D1A04] rounded-2xl px-6 py-2 shadow-md mb-4">
          <div className="text-[10px] tracking-widest font-black text-amber-200 uppercase">
            SUMMATIVE ASSESSMENT REPORT
          </div>
          <h2 className="text-xl md:text-2xl font-black text-amber-100">
            YOUR CULTURE QUEST REPORT
          </h2>
        </div>

        {/* Winner Banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl mb-5">
          <span className="text-xs font-black text-amber-800 uppercase tracking-widest block mb-0.5">
            🏆 Quest Outcome
          </span>
          <p className="text-lg font-black text-slate-800">
            {result.winner === 'tie'
              ? "Both Teams Shared Extraordinary Discoveries!"
              : `${result.winnerName} Leads with ${result.margin} Pts!`}
          </p>
        </div>

        {/* Scores & Tokens Comparison */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* Team A Card */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border-2 border-blue-200 text-left">
            <span className="text-xs font-black text-blue-900 uppercase tracking-wider block">
              {teamAName}
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-3xl font-black text-blue-950">{teamAScore.points}</span>
              <span className="text-xs font-bold text-blue-600 uppercase">pts</span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium space-y-0.5 pt-1 border-t border-blue-100">
              <p>🌱 Root Tokens: {teamAScore.tokens.root}</p>
              <p>💡 Knowledge: {teamAScore.tokens.knowledge}</p>
              <p>🔗 Connections: {teamAScore.tokens.connection}</p>
            </div>
          </div>

          {/* Team B Card */}
          <div className="p-3.5 rounded-2xl bg-orange-50/70 border-2 border-orange-200 text-left">
            <span className="text-xs font-black text-orange-900 uppercase tracking-wider block">
              {teamBName}
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-3xl font-black text-orange-950">{teamBScore.points}</span>
              <span className="text-xs font-bold text-orange-600 uppercase">pts</span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium space-y-0.5 pt-1 border-t border-orange-100">
              <p>🌱 Root Tokens: {teamBScore.tokens.root}</p>
              <p>💡 Knowledge: {teamBScore.tokens.knowledge}</p>
              <p>🔗 Connections: {teamBScore.tokens.connection}</p>
            </div>
          </div>
        </div>

        {/* Tree Completion & Key Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <Sprout className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Roots Discovered</span>
            <span className="text-base font-black text-slate-800">{discoveredRootsCount} / {totalCategories}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <Link2 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Connections</span>
            <span className="text-base font-black text-slate-800">
              {teamAScore.tokens.connection + teamBScore.tokens.connection} Built
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Top Learning Skill</span>
            <span className="text-xs font-black text-amber-700 block mt-0.5">{topSkillName}</span>
          </div>
        </div>

        {/* Skills Practiced Summary */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left mb-6">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Learning Competencies Practiced</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-semibold text-slate-600">
            <span className="p-1.5 bg-white rounded-lg border border-slate-200">🔍 Observation & Evidence</span>
            <span className="p-1.5 bg-white rounded-lg border border-slate-200">🔗 Cultural Connection</span>
            <span className="p-1.5 bg-white rounded-lg border border-slate-200">💡 Critical Inquiry</span>
            <span className="p-1.5 bg-white rounded-lg border border-slate-200">⏳ Sequencing & Chronology</span>
            <span className="p-1.5 bg-white rounded-lg border border-slate-200">🎭 Expression in Action</span>
            <span className="p-1.5 bg-white rounded-lg border border-slate-200">🌱 Continuity & Change</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full sm:w-1/2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Report (PDF)</span>
          </button>

          <button
            type="button"
            onClick={onProceedToReflection}
            className="w-full sm:w-1/2 py-3.5 rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:scale-98 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Complete Reflection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
