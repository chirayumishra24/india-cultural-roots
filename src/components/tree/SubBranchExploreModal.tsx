import React from 'react';
import { X, MapPin, Sparkles, Compass, CheckCircle } from 'lucide-react';
import { CulturalTreeNode, CulturalSubBranch } from '../../types/tree';

interface SubBranchExploreModalProps {
  node: CulturalTreeNode | null;
  onClose: () => void;
}

export const SubBranchExploreModal: React.FC<SubBranchExploreModalProps> = ({
  node,
  onClose,
}) => {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border-4 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md text-2xl shrink-0"
            style={{ backgroundColor: node.color }}
          >
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                CULTURAL ROOT ZOOM
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {node.subBranches?.length || 0} Regional Traditions
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {node.name} Traditions Across India
            </h2>
          </div>
        </div>

        {/* Core Pedagogical Note */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl mb-5 text-xs text-amber-950 font-medium leading-relaxed flex items-start gap-2.5">
          <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Culture is not a single linear root. Explore how <strong>{node.name}</strong> flourished into diverse regional expressions, interconnected through shared human values and continuous dialogue.
          </span>
        </div>

        {/* Sub-branches Grid */}
        <div className="space-y-3.5 mb-6">
          {node.subBranches?.map((sb: CulturalSubBranch) => (
            <div
              key={sb.id}
              className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-amber-400 transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <h3 className="text-sm md:text-base font-black text-slate-800">
                  {sb.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {sb.region}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {sb.badge}
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 font-medium leading-snug mb-2">
                {sb.description}
              </p>

              {/* Clue box */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="font-semibold">{sb.clue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] text-white font-black text-sm uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Return to Tree Canopy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
