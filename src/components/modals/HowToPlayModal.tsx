import React from 'react';
import { X, Sparkles, Zap, Search } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
                How to Play Cultural Quest
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Discovery + Knowledge Collection for Class 6 Social Science
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Step Core Loop */}
        <div className="py-4 space-y-3.5">
          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              1
            </div>
            <div>
              <h4 className="text-sm font-black text-blue-950 uppercase">Answer Your Challenge</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Both teams (Team Knowledge and Team Heritage) play simultaneously. Read the question, discuss with your team, and select the best answer.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h4 className="text-sm font-black text-emerald-950 uppercase">Discover & Unlock</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                A correct answer unlocks a cultural discovery card, adds +100 Knowledge Points, and advances your miniature explorer on the central 3D journey path!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
              3
            </div>
            <div>
              <h4 className="text-sm font-black text-amber-950 uppercase">Build The Heritage Archive</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Travel across all 6 zones: Vedic Culture, Upanishads, Buddhism, Jainism, Folk & Tribal traditions, and Shared Heritage to complete your quest.
              </p>
            </div>
          </div>
        </div>

        {/* Power-ups Guidance */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
          <span className="font-black text-slate-700 uppercase tracking-wide block mb-1.5">
            Classroom Power-Ups:
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span><strong>50/50:</strong> Removes two incorrect options.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Search className="w-4 h-4 text-blue-500 shrink-0" />
              <span><strong>Root Hint:</strong> Glows the relevant cultural zone in 3D.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
          >
            Got It, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};
