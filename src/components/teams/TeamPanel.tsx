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
      className={`w-full h-full flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl border-2 transition-all relative overflow-hidden select-none shadow-md ${
        isBlue
          ? 'bg-gradient-to-b from-blue-50/90 via-white to-blue-50/70 border-blue-300'
          : 'bg-gradient-to-b from-orange-50/90 via-white to-orange-50/70 border-orange-300'
      }`}
    >
      {/* 1. Header: Team Identity, Discoveries Badge & Progress Bar */}
      <div className="border-b pb-3 mb-3 border-slate-200">
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Mascot Icon + Names */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl p-0.5 flex items-center justify-center text-white shadow-sm shrink-0 ${
                isBlue
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
                  : 'bg-gradient-to-br from-orange-500 to-amber-600'
              }`}
            >
              {isBlue ? <Compass className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </div>

            <div>
              <h2
                className={`text-base font-black tracking-tight uppercase leading-none font-sans ${
                  isBlue ? 'text-blue-800' : 'text-orange-800'
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
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black shadow-xs transition-all ${
                isBlue
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
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
          <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 shadow-inner ${
                isBlue
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  : 'bg-gradient-to-r from-orange-400 to-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Streak pill if streak >= 2 */}
          {team.streak >= 2 && (
            <div className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 animate-pulse">
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
            className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg tracking-wider border shadow-2xs ${
              isBlue
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-orange-100 text-orange-800 border-orange-300'
            }`}
          >
            {q?.category?.replace('-', ' ') || 'CULTURAL ROOTS'}
          </span>

          <span className="flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
            <Sparkles className="w-3 h-3 text-emerald-700" />
            <span>+1 DISCOVERY / 100 PTS</span>
          </span>
        </div>

        {/* Question Text Box with "Q" Circle */}
        <div className="flex items-start gap-2.5 mb-3 bg-white/95 p-3 rounded-xl border border-slate-200/80 shadow-xs">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 text-white ${
              isBlue ? 'bg-blue-600' : 'bg-orange-500'
            }`}
          >
            Q
          </div>
          <p className="text-sm font-bold text-slate-800 leading-snug">
            {q?.question || 'Loading discovery challenge...'}
          </p>
        </div>

        {/* Question Interactive Options based on Question Type */}
        <div className="flex-1 flex flex-col justify-center space-y-2 mb-3">
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
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all flex items-center gap-3 shadow-xs ${
                    isSelected
                      ? isBlue
                        ? 'bg-blue-500 text-white border-blue-600 shadow-md scale-[1.01]'
                        : 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.01]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-white/30 text-white'
                        : isBlue
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
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
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 shadow-xs ${
                      isSelected
                        ? isBlue
                          ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                          : 'bg-orange-500 text-white border-orange-600 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected
                          ? 'bg-white text-slate-800'
                          : 'bg-slate-100 text-slate-600'
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
            <div className="space-y-2 bg-white/80 p-2.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">
                Tap a term on the left, then tap its matching meaning on the right:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Left column */}
                <div className="space-y-1.5">
                  {q.pairs?.map((p) => {
                    const isMatched = !!matchSelection.matchedPairs[p.id];
                    const isSelected = matchSelection.selectedLeft === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleLeftMatchClick(p.id)}
                        className={`w-full text-left p-2 rounded-lg border font-bold transition-all ${
                          isMatched
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : isSelected
                            ? isBlue
                              ? 'bg-blue-100 border-blue-500 text-blue-900 ring-2 ring-blue-300'
                              : 'bg-orange-100 border-orange-500 text-orange-900 ring-2 ring-orange-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {p.left} {isMatched && '✓'}
                      </button>
                    );
                  })}
                </div>

                {/* Right column */}
                <div className="space-y-1.5">
                  {q.pairs?.map((p) => {
                    const isPairedWith = Object.values(matchSelection.matchedPairs).includes(
                      p.right
                    );
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleRightMatchClick(p.right)}
                        className={`w-full text-left p-2 rounded-lg border font-medium transition-all ${
                          isPairedWith
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 line-through opacity-80'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
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
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* 50/50 Button */}
          <button
            onClick={onUseFiftyFifty}
            disabled={
              team.fiftyFiftyRemaining <= 0 ||
              team.eliminatedOptions.length > 0 ||
              q?.type !== 'mcq'
            }
            className={`py-2 px-3 rounded-xl border flex items-center justify-between gap-1 transition-all shadow-xs ${
              team.fiftyFiftyRemaining > 0 &&
              team.eliminatedOptions.length === 0 &&
              q?.type === 'mcq'
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900 cursor-pointer active:scale-95'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black">50/50</span>
            </div>
            <span className="text-[10px] font-bold bg-white/80 px-1.5 py-0.2 rounded border border-amber-200">
              {team.fiftyFiftyRemaining} LEFT
            </span>
          </button>

          {/* Root Hint Button */}
          <button
            onClick={onUseRootHint}
            disabled={team.rootHintsRemaining <= 0}
            className={`py-2 px-3 rounded-xl border flex items-center justify-between gap-1 transition-all shadow-xs ${
              team.rootHintsRemaining > 0
                ? isBlue
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900 cursor-pointer active:scale-95'
                  : 'bg-orange-50 hover:bg-orange-100 border-orange-300 text-orange-900 cursor-pointer active:scale-95'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Search
                className={`w-4 h-4 ${isBlue ? 'text-blue-600' : 'text-orange-600'}`}
              />
              <span className="text-xs font-black">ROOT HINT</span>
            </div>
            <span className="text-[10px] font-bold bg-white/80 px-1.5 py-0.2 rounded border border-slate-200">
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
          className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
            canSubmit
              ? isBlue
                ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 active:scale-98 shadow-blue-500/30'
                : 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-400 hover:to-amber-500 active:scale-98 shadow-orange-500/30'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70 shadow-none'
          }`}
        >
          <span>Submit Answer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Non-blocking Discovery Unlocked Floating Card Notification */}
      {team.isDiscovering && team.latestUnlockedDiscovery && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 p-4 rounded-2xl flex flex-col items-center justify-between border-2 border-emerald-400 animate-fade-in shadow-xl select-none">
          <div className="w-full flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              DISCOVERY UNLOCKED
            </span>
            <span className="text-xs font-bold text-slate-400">
              #{team.latestUnlockedDiscovery.id} / 20
            </span>
          </div>

          <div className="my-auto text-center px-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border-2 border-amber-300 mx-auto flex items-center justify-center text-2xl shadow-md mb-2">
              {team.latestUnlockedDiscovery.symbol || '📜'}
            </div>
            <h3 className="text-base font-black text-slate-800 tracking-tight mb-1">
              {team.latestUnlockedDiscovery.title}
            </h3>
            <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider block mb-2">
              {team.latestUnlockedDiscovery.zoneTitle}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed max-w-[280px] mx-auto bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {team.latestUnlockedDiscovery.shortExplanation}
            </p>
          </div>

          <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-2 flex items-center justify-around text-xs font-black text-emerald-900">
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
