import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sun,
  Zap,
  Search,
  Sparkles,
  FolderOpen,
  ArrowRight,
  Flame
} from 'lucide-react';
import { TeamProgress } from '../../types/game';
import { soundFx } from '../../game/audioEngine';

interface TeamPanelProps {
  team: TeamProgress;
  onSelectAnswer: (answer: any) => void;
  onSubmitAnswer: (directAnswer?: any) => void;
  onUseFiftyFifty: () => void;
  onUseRootHint: () => void;
  onOpenArchive: () => void;
}

export const TeamPanel: React.FC<TeamPanelProps> = ({
  team,
  onSelectAnswer,
  onSubmitAnswer,
  onUseFiftyFifty,
  onUseRootHint,
  onOpenArchive
}) => {
  const isBlue = team.teamId === 'teamKnowledge';

  const q = team.currentQuestion;
  const selected = team.selectedAnswer;

  // Local state for interactive question types like 'match' or 'sequence'
  const [matchSelection, setMatchSelection] = useState<{
    selectedLeft: string | null;
    matchedPairs: Record<string, string>; // left -> right
  }>({ selectedLeft: null, matchedPairs: {} });

  // Reset local match selection whenever a new question is loaded
  useEffect(() => {
    setMatchSelection({ selectedLeft: null, matchedPairs: {} });
  }, [team.currentQuestion?.id]);

  const progressPercent = Math.min(100, Math.round((team.discoveries / 20) * 100));

  // Determine if submit is enabled
  const canSubmit = (() => {
    if (!q || team.isSubmitting || team.isDiscovering) return false;
    if (q.type === 'mcq' || q.type === 'true-false' || q.type === 'image' || q.type === 'scenario') {
      return selected !== null && selected !== undefined;
    }
    if (q.type === 'match') {
      const neededCount = q.pairs?.length || 0;
      return Object.keys(matchSelection.matchedPairs).length >= neededCount;
    }
    if (q.type === 'sequence') {
      return Array.isArray(selected) && selected.length === (q.sequenceItems?.length || 0);
    }
    if (q.type === 'sorting') {
      return selected && Object.keys(selected).length === (q.sortItems?.length || 0);
    }
    return selected !== null;
  })();

  // Handle Match Click
  const handleLeftMatchClick = (leftId: string) => {
    soundFx.playSelect();
    setMatchSelection((prev) => ({
      ...prev,
      selectedLeft: prev.selectedLeft === leftId ? null : leftId
    }));
  };

  const handleRightMatchClick = (rightText: string) => {
    if (!matchSelection.selectedLeft) return;
    soundFx.playSelect();
    const updated = {
      ...matchSelection.matchedPairs,
      [matchSelection.selectedLeft]: rightText
    };
    setMatchSelection({
      selectedLeft: null,
      matchedPairs: updated
    });
    onSelectAnswer(updated);

    const neededCount = q?.pairs?.length || 0;
    if (Object.keys(updated).length >= neededCount) {
      setTimeout(() => {
        onSubmitAnswer(updated);
      }, 400);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-4 rounded-3xl transition-all relative overflow-hidden select-none ${
        isBlue ? 'clay-panel-blue' : 'clay-panel-orange'
      }`}
    >
      {/* 1. Header: Team Identity, Discoveries Badge & Progress Bar */}
      <div className="border-b pb-3 mb-3 border-slate-200/80">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Mascot Icon + Names */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 ${
                isBlue ? 'clay-btn-blue' : 'clay-btn-orange'
              }`}
            >
              {isBlue ? <Compass className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </div>

            <div>
              <h2
                className={`text-base font-black tracking-tight uppercase leading-none font-sans ${
                  isBlue ? 'text-blue-900' : 'text-orange-950'
                }`}
              >
                {team.name}
              </h2>
              <span className="text-[11px] font-bold text-slate-500 tracking-wide">
                {team.tagline}
              </span>
            </div>
          </div>

          {/* Discoveries Count Badge & Archive Button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenArchive}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                isBlue ? 'clay-btn-blue text-white' : 'clay-btn-orange text-white'
              }`}
              title="Open Team's Knowledge Archive"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{team.discoveries} / 20</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Streak Indicator */}
        <div className="w-full flex items-center gap-2">
          <div className="flex-1 h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5 clay-inset">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isBlue
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500 shadow-sm'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Streak pill if streak >= 2 */}
          {team.streak >= 2 && (
            <div className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 animate-pulse clay-pill">
              <Flame className="w-3 h-3 text-amber-600" />
              <span>{team.streak} Streak</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Question Body Container */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1">
        {/* Category Pill & Reward badge */}
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider border clay-pill ${
              isBlue
                ? 'bg-blue-100 text-blue-900 border-blue-200'
                : 'bg-orange-100 text-orange-900 border-orange-200'
            }`}
          >
            {q?.category?.replace('-', ' ') || 'CULTURAL ROOTS'}
          </span>

          <span className="flex items-center gap-1 text-[11px] font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full clay-pill">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>+1 DISCOVERY / 100 PTS</span>
          </span>
        </div>

        {/* Question Text Box with "Q" Circle */}
        <div className="flex items-start gap-3 mb-3 p-3.5 rounded-2xl border border-slate-200/90 clay-card">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 text-white ${
              isBlue ? 'clay-btn-blue' : 'clay-btn-orange'
            }`}
          >
            Q
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug">
            {q?.question || 'Loading discovery challenge...'}
          </p>
        </div>

        {/* Question Interactive Options based on Question Type */}
        <div className="flex-1 flex flex-col justify-center space-y-2.5 mb-3">
          {/* A. Standard MCQ & Scenario Options */}
          {(q?.type === 'mcq' || q?.type === 'scenario') &&
            q.options?.map((opt, idx) => {
              const isEliminated = team.eliminatedOptions.includes(idx);
              const isSelected = selected === idx;
              const letter = String.fromCharCode(65 + idx);

              if (isEliminated) {
                return (
                  <div
                    key={idx}
                    className="opacity-30 border border-dashed border-slate-300 bg-slate-50 p-2.5 rounded-xl text-xs font-semibold text-slate-400 line-through select-none"
                  >
                    {letter}. [Option Eliminated by 50/50]
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playSelect();
                    onSelectAnswer(idx);
                    setTimeout(() => {
                      onSubmitAnswer(idx);
                    }, 350);
                  }}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? isBlue
                        ? 'clay-btn-blue text-white scale-[1.01]'
                        : 'clay-btn-orange text-white scale-[1.01]'
                      : 'clay-btn-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-white/30 text-white'
                        : isBlue
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-orange-100 text-orange-800 border border-orange-200'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs sm:text-sm font-bold leading-tight">{opt}</span>
                </button>
              );
            })}

          {/* B. True / False */}
          {q?.type === 'true-false' && (
            <div className="grid grid-cols-1 gap-2.5">
              {q.options?.map((opt, idx) => {
                const isSelected = selected === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playSelect();
                      onSelectAnswer(idx);
                      setTimeout(() => {
                        onSubmitAnswer(idx);
                      }, 350);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? isBlue
                          ? 'clay-btn-blue text-white'
                          : 'clay-btn-orange text-white'
                        : 'clay-btn-white text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {idx === 0 ? '✓' : '✗'}
                    </div>
                    <span className="text-xs sm:text-sm font-bold leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* C. Match the Pair */}
          {q?.type === 'match' && (
            <div className="space-y-2 p-3 rounded-2xl border border-slate-200 clay-card">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                Tap a term on the left, then tap its matching meaning on the right:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Left column */}
                <div className="space-y-2">
                  {q.pairs?.map((p) => {
                    const isMatched = !!matchSelection.matchedPairs[p.id];
                    const isSelected = matchSelection.selectedLeft === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleLeftMatchClick(p.id)}
                        className={`w-full text-left p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 clay-pill'
                            : isSelected
                            ? isBlue
                              ? 'clay-btn-blue text-white ring-2 ring-blue-300'
                              : 'clay-btn-orange text-white ring-2 ring-orange-300'
                            : 'clay-btn-white text-slate-700'
                        }`}
                      >
                        {p.left} {isMatched && '✓'}
                      </button>
                    );
                  })}
                </div>

                {/* Right column */}
                <div className="space-y-2">
                  {q.pairs?.map((p) => {
                    const isPairedWith = Object.values(matchSelection.matchedPairs).includes(
                      p.right
                    );
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleRightMatchClick(p.right)}
                        className={`w-full text-left p-2.5 rounded-xl border font-medium transition-all cursor-pointer ${
                          isPairedWith
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 line-through opacity-80 clay-pill'
                            : 'clay-btn-white text-slate-700'
                        }`}
                      >
                        {p.right}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* D. Sequence / Ordering */}
          {q?.type === 'sequence' && (
            <div className="space-y-1.5 bg-white/80 p-2.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                Steps shown in historical/educational flow:
              </span>
              {(selected || q.sequenceItems || []).map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-black text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs">{item}</span>
                </div>
              ))}
              <button
                onClick={() => {
                  soundFx.playSelect();
                  const seq = selected || q.sequenceItems;
                  onSelectAnswer(seq);
                  setTimeout(() => {
                    onSubmitAnswer(seq);
                  }, 300);
                }}
                className={`mt-2 w-full py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isBlue
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                Confirm Sequence Arrangement
              </button>
            </div>
          )}

          {/* E. Sorting / Concept Classification */}
          {q?.type === 'sorting' && (
            <div className="space-y-2 bg-white/80 p-2 rounded-xl border border-slate-200 text-xs">
              <span className="text-[11px] font-bold text-slate-500 block">
                Tap each concept to match with its tradition:
              </span>
              <div className="space-y-1">
                {q.sortItems?.map((item) => {
                  const currentBucket = selected?.[item.id];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-1.5 bg-slate-50 border rounded-lg"
                    >
                      <span className="font-bold text-slate-800 text-[11px]">{item.label}</span>
                      <select
                        value={currentBucket || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const next = { ...(selected || {}), [item.id]: val };
                          onSelectAnswer(next);
                        }}
                        className="text-[10px] font-bold border rounded px-1.5 py-0.5 bg-white text-slate-700"
                      >
                        <option value="">Select Zone...</option>
                        {q.sortBuckets?.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Power-Ups Row (50/50 and Root Hint) */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          {/* 50/50 Button */}
          <button
            onClick={onUseFiftyFifty}
            disabled={
              team.fiftyFiftyRemaining <= 0 ||
              team.eliminatedOptions.length > 0 ||
              q?.type !== 'mcq'
            }
            className={`py-2 px-3 rounded-2xl border flex items-center justify-between gap-1 transition-all ${
              team.fiftyFiftyRemaining > 0 &&
              team.eliminatedOptions.length === 0 &&
              q?.type === 'mcq'
                ? 'clay-btn-white hover:bg-amber-50/80 border-amber-300 text-amber-950 cursor-pointer active:scale-95'
                : 'bg-slate-100/80 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black">50/50</span>
            </div>
            <span className="text-[10px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 clay-pill">
              {team.fiftyFiftyRemaining} LEFT
            </span>
          </button>

          {/* Root Hint Button */}
          <button
            onClick={onUseRootHint}
            disabled={team.rootHintsRemaining <= 0}
            className={`py-2 px-3 rounded-2xl border flex items-center justify-between gap-1 transition-all ${
              team.rootHintsRemaining > 0
                ? isBlue
                  ? 'clay-btn-white hover:bg-blue-50/80 border-blue-300 text-blue-950 cursor-pointer active:scale-95'
                  : 'clay-btn-white hover:bg-orange-50/80 border-orange-300 text-orange-950 cursor-pointer active:scale-95'
                : 'bg-slate-100/80 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Search
                className={`w-4 h-4 ${isBlue ? 'text-blue-600' : 'text-orange-600'}`}
              />
              <span className="text-xs font-black">ROOT HINT</span>
            </div>
            <span className="text-[10px] font-black bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full border border-slate-200 clay-pill">
              {team.rootHintsRemaining} LEFT
            </span>
          </button>
        </div>

        {/* 4. Big Claymorphic Submit Button */}
        <button
          onClick={() => {
            const finalAns =
              q?.type === 'match'
                ? matchSelection.matchedPairs
                : q?.type === 'sequence'
                ? selected || q.sequenceItems
                : selected;
            onSubmitAnswer(finalAns);
          }}
          disabled={!canSubmit}
          className={`w-full py-4 px-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
            canSubmit
              ? isBlue
                ? 'clay-btn-blue'
                : 'clay-btn-orange'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70 shadow-none'
          }`}
        >
          <span>Submit Answer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Non-blocking Discovery Unlocked Floating Card Notification */}
      {team.isDiscovering && team.latestUnlockedDiscovery && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 p-5 rounded-3xl flex flex-col items-center justify-between border-2 border-emerald-400 animate-fade-in clay-card select-none">
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 clay-pill">
              <Sparkles className="w-3.5 h-3.5" />
              DISCOVERY UNLOCKED
            </span>
            <span className="text-xs font-black text-slate-500">
              #{team.latestUnlockedDiscovery.id} / 20
            </span>
          </div>

          <div className="my-auto text-center px-2">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-900 border-2 border-amber-300 mx-auto flex items-center justify-center text-3xl mb-3 clay-pill">
              {team.latestUnlockedDiscovery.symbol || '📜'}
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
              {team.latestUnlockedDiscovery.title}
            </h3>
            <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider block mb-2">
              {team.latestUnlockedDiscovery.zoneTitle}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed max-w-[280px] mx-auto bg-slate-50 p-3 rounded-2xl border border-slate-200/80 clay-inset">
              {team.latestUnlockedDiscovery.shortExplanation}
            </p>
          </div>

          <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center justify-around text-xs font-black text-emerald-950 clay-card">
            <span>+1 DISCOVERY</span>
            <span>•</span>
            <span>+100 KNOWLEDGE PTS</span>
          </div>
        </div>
      )}

      {/* 6. Zone Transition Banner (Compact, non-blocking 2-3s banner) */}
      {team.zoneTransitionBanner && (
        <div className="absolute top-2 left-2 right-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-2.5 rounded-xl shadow-lg border border-amber-400 z-20 flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-5 h-5 text-amber-200 shrink-0" />
          <div className="text-left text-xs leading-tight">
            <span className="font-black uppercase tracking-wider block">
              Entering New Zone!
            </span>
            <span className="text-[11px] text-amber-100 font-medium">
              {team.zoneTransitionBanner}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
