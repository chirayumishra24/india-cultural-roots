import React, { useState } from 'react';
import { X, FolderOpen, Lock, BookOpen } from 'lucide-react';
import { DISCOVERIES_LIST } from '../../data/discoveriesData';
import { Discovery } from '../../types/game';

interface KnowledgeArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  isBlueTeam: boolean;
  unlockedDiscoveryIds: number[];
}

export const KnowledgeArchiveModal: React.FC<KnowledgeArchiveModalProps> = ({
  isOpen,
  onClose,
  teamName,
  isBlueTeam,
  unlockedDiscoveryIds
}) => {
  const [selectedDiscovery, setSelectedDiscovery] = useState<Discovery | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div
          className={`p-4 sm:p-5 text-white flex items-center justify-between ${
            isBlueTeam
              ? 'bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900'
              : 'bg-gradient-to-r from-orange-600 via-orange-700 to-amber-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-wide uppercase font-sans">
                {teamName} — Knowledge Archive
              </h2>
              <p className="text-xs text-white/80 font-medium">
                {unlockedDiscoveryIds.length} of 20 Cultural Discoveries Collected
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

        {/* Modal Content: Discoveries Grid & Detail Inspection */}
        <div className="p-5 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-50">
          {/* Left 2 Cols: 20 Discoveries Grid */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
              The 20 Discoveries of India's Cultural Roots
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DISCOVERIES_LIST.map((disc) => {
                const isUnlocked = unlockedDiscoveryIds.includes(disc.id);
                const isSelected = selectedDiscovery?.id === disc.id;

                return (
                  <button
                    key={disc.id}
                    onClick={() => setSelectedDiscovery(disc)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col justify-between h-32 relative ${
                      isUnlocked
                        ? isSelected
                          ? 'border-blue-600 bg-white ring-2 ring-blue-300 shadow-md scale-[1.02]'
                          : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                        : 'border-dashed border-slate-200 bg-slate-100/70 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-black text-slate-400">
                        #{disc.id.toString().padStart(2, '0')}
                      </span>
                      {isUnlocked ? (
                        <span className="text-base">{disc.symbol}</span>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>

                    <div>
                      <h4
                        className={`text-xs font-black line-clamp-2 leading-tight ${
                          isUnlocked ? 'text-slate-800' : 'text-slate-500'
                        }`}
                      >
                        {isUnlocked ? disc.title : 'Locked Discovery'}
                      </h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                        {disc.zoneTitle.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Col: Selected Discovery Detail Card */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            {selectedDiscovery ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b pb-2">
                  <span className="text-2xl">{selectedDiscovery.symbol}</span>
                  <div>
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider">
                      Discovery #{selectedDiscovery.id} • {selectedDiscovery.zoneTitle}
                    </span>
                    <h3 className="text-sm font-black text-slate-800 leading-tight">
                      {selectedDiscovery.title}
                    </h3>
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    Summary
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    {selectedDiscovery.shortExplanation}
                  </p>
                </div>

                <div>
                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">
                    Class 6 Textbook Insight
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {selectedDiscovery.detailedInsight}
                  </p>
                </div>

                <div>
                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                    Key Concepts
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedDiscovery.keyConcepts.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-10 px-2">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-600">Select any discovery</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Click on an unlocked discovery card to explore its historical insight and key ideas.
                </p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                India's Cultural Roots • NCERT Class 6
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-800 text-white hover:bg-slate-900 transition-all"
          >
            Back to Cultural Quest
          </button>
        </div>
      </div>
    </div>
  );
};
