import React, { useState } from 'react';
import { Users, User, Play, Sparkles } from 'lucide-react';
import { soundFx } from '../../game/audioEngine';

interface TeamSetupModalProps {
  initialTeamA: string;
  initialTeamB: string;
  onConfirm: (teamA: string, teamB: string, mode: 'classroom' | 'duel') => void;
}

export const TeamSetupModal: React.FC<TeamSetupModalProps> = ({
  initialTeamA,
  initialTeamB,
  onConfirm,
}) => {
  const [teamA, setTeamA] = useState(initialTeamA);
  const [teamB, setTeamB] = useState(initialTeamB);
  const [mode, setMode] = useState<'classroom' | 'duel'>('classroom');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSelect();
    onConfirm(teamA.trim() || 'Root Seekers', teamB.trim() || 'Culture Keepers', mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-lg bg-white border-4 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl text-center">
        {/* Header Plaque */}
        <div className="inline-block bg-gradient-to-b from-[#8C5326] to-[#4D2409] border-2 border-[#3D1A04] rounded-2xl px-6 py-2 shadow-md mb-4">
          <div className="text-[10px] tracking-widest font-black text-amber-200 uppercase">
            CLASSROOM SETUP
          </div>
          <h2 className="text-xl md:text-2xl font-black text-amber-100">
            CHOOSE YOUR TEAMS
          </h2>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('classroom')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'classroom'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Two-Team Classroom Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('duel')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'duel'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Player A vs Player B</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team A Input Card */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border-2 border-blue-200 text-left">
            <label className="text-xs font-black text-blue-900 uppercase tracking-wider block mb-1">
              Team A (Blue)
            </label>
            <input
              type="text"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              placeholder="e.g. Root Seekers"
              className="w-full px-3 py-2 rounded-xl border border-blue-300 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={24}
            />
          </div>

          {/* Team B Input Card */}
          <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-200 text-left">
            <label className="text-xs font-black text-orange-900 uppercase tracking-wider block mb-1">
              Team B (Orange)
            </label>
            <input
              type="text"
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              placeholder="e.g. Culture Keepers"
              className="w-full px-3 py-2 rounded-xl border border-orange-300 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={24}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 active:scale-98 text-white font-black text-base uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Ready to Explore? Start Quest</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
