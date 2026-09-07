import React from 'react';
import { X, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { HeritageDiscoveryCardData } from '../../types/tree';

interface CardInspectModalProps {
  card: HeritageDiscoveryCardData | null;
  onClose: () => void;
}

export const CardInspectModal: React.FC<CardInspectModalProps> = ({
  card,
  onClose,
}) => {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-2 border-amber-200 transform scale-100 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest">
              Heritage Discovery Card
            </span>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              {card.title}
            </h3>
          </div>
        </div>

        {/* Clue and Information */}
        <div className="mt-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE3D5] text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Cultural Clue & Context</span>
          </div>
          <p className="text-sm font-medium text-slate-700 leading-relaxed">
            {card.clueText}
          </p>
        </div>

        {/* Discovery Status */}
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-600">Connected Tree Root:</span>
          <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            {card.connectedNodeId}
          </span>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Close & Continue Quest</span>
          </button>
        </div>
      </div>
    </div>
  );
};
