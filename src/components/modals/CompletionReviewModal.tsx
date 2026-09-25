import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  RotateCcw,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TeamProgress, Question } from '../../types/game';
import confetti from 'canvas-confetti';

interface CompletionReviewModalProps {
  isOpen: boolean;
  onPlayAgain: () => void;
  teamKnowledge: TeamProgress;
  teamHeritage: TeamProgress;
  missedQuestions: Question[];
}

export const CompletionReviewModal: React.FC<CompletionReviewModalProps> = ({
  isOpen,
  onPlayAgain,
  teamKnowledge,
  teamHeritage,
  missedQuestions
}) => {
  const [showMissed, setShowMissed] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine winning team by score / discoveries
  const isKnowledgeWinner = teamKnowledge.score >= teamHeritage.score;
  const isTie = teamKnowledge.score === teamHeritage.score;

  // Calculate accuracies
  const accuracyA =
    teamKnowledge.totalAnswers > 0
      ? Math.round((teamKnowledge.correctAnswers / teamKnowledge.totalAnswers) * 100)
      : 100;
  const accuracyB =
    teamHeritage.totalAnswers > 0
      ? Math.round((teamHeritage.correctAnswers / teamHeritage.totalAnswers) * 100)
      : 100;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-slate-800">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-900 p-5 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-2 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cultural Journey Complete</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-sans">
            {isTie
              ? 'Outstanding Cultural Exploration by Both Teams!'
              : isKnowledgeWinner
              ? `${teamKnowledge.name} Leads the Quest!`
              : `${teamHeritage.name} Leads the Quest!`}
          </h2>

          <div className="mt-2 text-xs sm:text-sm font-extrabold text-amber-200 uppercase tracking-widest flex items-center justify-center gap-2">
            <span>Many Roots</span>
            <span>•</span>
            <span>Many Ideas</span>
            <span>•</span>
            <span>Many Traditions</span>
            <span>•</span>
            <span>A Rich Cultural Heritage</span>
          </div>
        </div>

        {/* Content Body: Stats Comparison & Review */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 bg-slate-50">
          {/* Comparison Cards for Both Teams */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Team Knowledge Card */}
            <div
              className={`p-5 rounded-2xl border-2 transition-all ${
                isKnowledgeWinner
                  ? 'bg-blue-50/80 border-blue-400 shadow-md ring-2 ring-blue-300'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                    Blue Team
                  </span>
                  <h3 className="text-base font-black text-slate-900 uppercase">
                    {teamKnowledge.name}
                  </h3>
                </div>
                {isKnowledgeWinner && (
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
                    <Trophy className="w-5 h-5 text-amber-600" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Score</span>
                  <span className="text-base text-blue-700 font-black font-mono">
                    {teamKnowledge.score} pts
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Discoveries</span>
                  <span className="text-base text-slate-800 font-black font-mono">
                    {teamKnowledge.discoveries} / 20
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Accuracy</span>
                  <span className="text-base text-emerald-700 font-black font-mono">
                    {accuracyA}%
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Max Streak</span>
                  <span className="text-base text-amber-600 font-black font-mono">
                    {teamKnowledge.maxStreak}
                  </span>
                </div>
              </div>
            </div>

            {/* Team Heritage Card */}
            <div
              className={`p-5 rounded-2xl border-2 transition-all ${
                !isKnowledgeWinner && !isTie
                  ? 'bg-orange-50/80 border-orange-400 shadow-md ring-2 ring-orange-300'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                    Orange Team
                  </span>
                  <h3 className="text-base font-black text-slate-900 uppercase">
                    {teamHeritage.name}
                  </h3>
                </div>
                {!isKnowledgeWinner && !isTie && (
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
                    <Trophy className="w-5 h-5 text-amber-600" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Score</span>
                  <span className="text-base text-orange-700 font-black font-mono">
                    {teamHeritage.score} pts
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Discoveries</span>
                  <span className="text-base text-slate-800 font-black font-mono">
                    {teamHeritage.discoveries} / 20
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Accuracy</span>
                  <span className="text-base text-emerald-700 font-black font-mono">
                    {accuracyB}%
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Max Streak</span>
                  <span className="text-base text-amber-600 font-black font-mono">
                    {teamHeritage.maxStreak}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What You Discovered Section */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>What You Discovered in Chapter 7</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
              <div className="p-2 bg-blue-50 text-blue-900 rounded-xl border border-blue-200">
                1. Vedic Hymns & Oral Tradition
              </div>
              <div className="p-2 bg-purple-50 text-purple-900 rounded-xl border border-purple-200">
                2. Upanishadic Inquiries & Yoga
              </div>
              <div className="p-2 bg-amber-50 text-amber-900 rounded-xl border border-amber-200">
                3. Buddha & The Middle Way
              </div>
              <div className="p-2 bg-orange-50 text-orange-900 rounded-xl border border-orange-200">
                4. Mahavira, Ahimsa & Anekantavada
              </div>
              <div className="p-2 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                5. Sacred Nature & Folk Lore
              </div>
              <div className="p-2 bg-rose-50 text-rose-900 rounded-xl border border-rose-200">
                6. Tapestry of Shared Heritage
              </div>
            </div>
          </div>

          {/* Missed Questions Toggle & Details */}
          {missedQuestions.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setShowMissed(!showMissed)}
                className="w-full flex items-center justify-between text-xs font-black uppercase text-slate-700 hover:text-slate-900"
              >
                <span>Review Missed Questions ({missedQuestions.length})</span>
                {showMissed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showMissed && (
                <div className="mt-3 space-y-3 pt-3 border-t border-slate-100">
                  {missedQuestions.map((mq, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="font-bold text-slate-800 mb-1">
                        {i + 1}. {mq.question}
                      </div>
                      <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <strong>Correct Takeaway:</strong> {mq.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            NCERT Class 6 Social Science • Chapter 7
          </span>

          <button
            onClick={onPlayAgain}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Quest Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
