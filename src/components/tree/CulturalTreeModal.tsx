import React from 'react';
import { X, GitFork, Sparkles, Info } from 'lucide-react';

interface CulturalTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedDiscoveriesTeamA: number[];
  unlockedDiscoveriesTeamB: number[];
}

export const CulturalTreeModal: React.FC<CulturalTreeModalProps> = ({
  isOpen,
  onClose,
  unlockedDiscoveriesTeamA,
  unlockedDiscoveriesTeamB
}) => {
  if (!isOpen) return null;

  // Union of unlocked discoveries across both teams
  const allUnlocked = Array.from(
    new Set([...unlockedDiscoveriesTeamA, ...unlockedDiscoveriesTeamB])
  );

  // Six Roots categories
  const ROOTS = [
    { title: 'Vedic Traditions', zoneIds: [1, 2, 3, 4], color: '#3B82F6', icon: '🔥' },
    { title: 'Upanishadic Inquiry', zoneIds: [5, 6, 7], color: '#8B5CF6', icon: '🧘' },
    { title: 'Buddhism', zoneIds: [8, 9, 10], color: '#EAB308', icon: '☸️' },
    { title: 'Jainism', zoneIds: [11, 12, 13], color: '#F97316', icon: '🕊️' },
    { title: 'Folk Traditions', zoneIds: [14, 16], color: '#10B981', icon: '🎨' },
    { title: 'Tribal Traditions', zoneIds: [15, 17], color: '#059669', icon: '🌳' }
  ];

  // Branches
  const BRANCHES = [
    { name: 'Knowledge & Sciences', desc: 'Vedic astronomy, medicine & mathematics', count: 4 },
    { name: 'Philosophy & Dialogues', desc: 'Deep inquiry into self, truth & oneness', count: 3 },
    { name: 'Arts & Traditional Crafts', desc: 'Terracotta, temple stone carvings & Warli painting', count: 4 },
    { name: 'Stories & Oral Lore', desc: 'Folktales, Jatakas & Panchatantra epics', count: 3 },
    { name: 'Values & Ethics', desc: 'Ahimsa, compassion, truth & Middle Way', count: 4 },
    { name: 'Living Practices', desc: 'Yoga, harvest celebrations & sacred nature care', count: 2 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl backdrop-blur-xs border border-emerald-400/40">
              <GitFork className="w-6 h-6 text-emerald-300 rotate-180" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-wide uppercase font-sans">
                The Cultural Heritage Tree
              </h2>
              <p className="text-xs text-emerald-200/90 font-medium">
                Metaphor for India’s Diversity & Continuity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tree Interactive Diagram Area */}
        <div className="p-6 flex-1 overflow-y-auto bg-gradient-to-b from-sky-50/60 via-amber-50/30 to-emerald-50/60 flex flex-col items-center justify-between">
          {/* Top Notice: Pedagogical Disclaimer */}
          <div className="w-full max-w-2xl bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2 text-xs text-amber-900">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Metaphor for Learning:</strong> This tree illustrates how diverse philosophical,
              spiritual, folk, and indigenous roots continuously nourish India’s shared cultural canopy.
            </p>
          </div>

          {/* 1. Canopy & Branches */}
          <div className="w-full max-w-3xl mb-4">
            <h4 className="text-xs font-black uppercase text-center text-slate-500 tracking-wider mb-2">
              The Canopy: Flourishing Branches of Living Heritage
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BRANCHES.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 p-3 rounded-2xl border border-emerald-200 shadow-sm text-left hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{b.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight mb-2">{b.desc}</p>
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Living Heritage
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Central Trunk: Shared Cultural Heritage */}
          <div className="w-full max-w-sm my-2 text-center">
            <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white py-3 px-6 rounded-2xl shadow-lg border-2 border-amber-500 mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-200 block">
                The Central Trunk
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight uppercase">
                Indian Cultural Heritage
              </h3>
              <span className="text-[10px] text-amber-100 font-semibold block mt-0.5">
                Unity in Diversity • Mutual Respect • Continuity
              </span>
            </div>
            {/* Trunk Stem connector lines */}
            <div className="w-1 h-6 bg-amber-800 mx-auto" />
          </div>

          {/* 3. Deep Roots: 6 Cultural Traditions */}
          <div className="w-full max-w-3xl">
            <h4 className="text-xs font-black uppercase text-center text-slate-500 tracking-wider mb-2">
              The Diverse Roots: Nourishing Traditions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {ROOTS.map((root, idx) => {
                const unlockedInThisRoot = root.zoneIds.filter((id) =>
                  allUnlocked.includes(id)
                ).length;
                const totalInRoot = root.zoneIds.length;
                const isFullyLit = unlockedInThisRoot === totalInRoot;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                      isFullyLit
                        ? 'bg-amber-50 shadow-lg ring-2 ring-amber-400 border-amber-400'
                        : unlockedInThisRoot > 0
                        ? 'bg-white shadow-md ring-2 ring-amber-200'
                        : 'bg-slate-100/80 border-slate-200 opacity-60'
                    }`}
                    style={{ borderColor: root.color }}
                  >
                    <div className="text-xl mb-1">{root.icon}</div>
                    <h5 className="text-[11px] font-black text-slate-800 leading-tight mb-1">
                      {root.title}
                    </h5>
                    <div className="text-[10px] font-bold text-slate-500">
                      {unlockedInThisRoot}/{totalInRoot} Unlocked
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            {allUnlocked.length} / 20 Discoveries Illuminating the Tree
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-800 text-white hover:bg-slate-900 transition-all"
          >
            Back to Quest
          </button>
        </div>
      </div>
    </div>
  );
};
