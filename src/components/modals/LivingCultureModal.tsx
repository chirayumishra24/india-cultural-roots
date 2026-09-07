import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LivingCultureModalProps {
  onContinueToResults: () => void;
}

export const LivingCultureModal: React.FC<LivingCultureModalProps> = ({
  onContinueToResults,
}) => {
  React.useEffect(() => {
    // Fire festive educational confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#27AE60', '#F5B041', '#2B7DE9', '#9B51E0', '#E91E63']
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-white via-[#FCFBF7] to-[#F2EADA] border-4 border-amber-300 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center">
        {/* Animated Sprout & Tree Emblem */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-5xl mb-4 shadow-xl ring-4 ring-white animate-pulse">
          🌳
        </div>

        <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest text-amber-900 mb-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>LIVING CULTURE UNLOCKED</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-4">
          LIVING CULTURE
        </h2>

        <div className="p-4 bg-white/80 border border-amber-200 rounded-2xl shadow-inner mb-6 text-left max-w-md">
          <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed mb-3">
            "Culture has roots in the past and can continue to be expressed, shared and understood in the present."
          </p>
          <div className="border-t border-amber-100 pt-2 text-xs font-medium text-slate-600 space-y-1">
            <p>• Explore the roots.</p>
            <p>• Connect the ideas.</p>
            <p>• Carry the learning forward.</p>
          </div>
        </div>

        <button
          onClick={onContinueToResults}
          className="w-full max-w-md py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 active:scale-98 text-white font-black text-base uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>View Quest Report</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
