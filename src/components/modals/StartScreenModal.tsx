import React from 'react';
import { Compass, Sun, Play, HelpCircle, GraduationCap } from 'lucide-react';

interface StartScreenModalProps {
  isOpen: boolean;
  onStart: () => void;
  onOpenHowToPlay: () => void;
  onOpenTeacher: () => void;
}

export const StartScreenModal: React.FC<StartScreenModalProps> = ({
  isOpen,
  onStart,
  onOpenHowToPlay,
  onOpenTeacher
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden flex flex-col items-center">
        {/* Decorative Top Aura */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 via-amber-500 to-orange-500" />

        {/* Ashoka Chakra & Title Badge */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-700 flex items-center justify-center shadow-md mb-3">
          <Compass className="w-10 h-10 animate-spin-slow text-amber-700" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider mb-2 border border-amber-300">
          Class 6 Social Science • Chapter 7
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase font-sans mb-1">
          Cultural Quest
        </h1>
        <h2 className="text-base sm:text-lg font-bold text-slate-700 mb-2">
          India’s Cultural Roots
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 italic max-w-lg mb-6">
          “Trace the Roots. Discover the Ideas. Build the Heritage.”
        </p>

        {/* Two Teams Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mb-6 text-left">
          {/* Team Knowledge */}
          <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/60 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                Team 1 • Blue
              </span>
              <h3 className="text-sm font-black text-blue-950 uppercase leading-none">
                Team Knowledge
              </h3>
              <p className="text-xs font-bold text-blue-700/80 mt-0.5">
                Explore • Learn • Discover
              </p>
            </div>
          </div>

          {/* Team Heritage */}
          <div className="p-4 rounded-2xl border-2 border-orange-200 bg-orange-50/60 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sun className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                Team 2 • Orange
              </span>
              <h3 className="text-sm font-black text-orange-950 uppercase leading-none">
                Team Heritage
              </h3>
              <p className="text-xs font-bold text-orange-700/80 mt-0.5">
                Find • Analyse • Uncover
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-xl mb-6 text-center text-xs font-black text-slate-700">
          <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
            <span className="block text-amber-700">20</span>
            <span className="text-[10px] text-slate-500">Discoveries</span>
          </div>
          <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
            <span className="block text-blue-700">2</span>
            <span className="text-[10px] text-slate-500">Teams</span>
          </div>
          <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
            <span className="block text-emerald-700">6</span>
            <span className="text-[10px] text-slate-500">Cultural Zones</span>
          </div>
          <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
            <span className="block text-purple-700">5 Min</span>
            <span className="text-[10px] text-slate-500">Timer</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button
            onClick={onStart}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Cultural Quest</span>
          </button>

          <button
            onClick={onOpenHowToPlay}
            className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wide border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>How to Play</span>
          </button>

          <button
            onClick={onOpenTeacher}
            className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wide border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Teacher</span>
          </button>
        </div>
      </div>
    </div>
  );
};
