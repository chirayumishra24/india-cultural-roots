import React, { useState } from 'react';
import { Users, BarChart3, RefreshCw } from 'lucide-react';

interface AudiencePollWidgetProps {
  optionsCount?: number;
  optionsLetters?: string[];
  onVoteCast?: (letter: string) => void;
}

export const AudiencePollWidget: React.FC<AudiencePollWidgetProps> = ({
  optionsCount = 4,
  optionsLetters = ['A', 'B', 'C', 'D'],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pollResults, setPollResults] = useState<{ [key: string]: number }>({
    A: 18,
    B: 54,
    C: 16,
    D: 12
  });

  const handleSimulateVotes = () => {
    // Generate organic distribution favoring option B or randomly distributed
    const keys = optionsLetters.slice(0, optionsCount);
    let remaining = 100;
    const nextResults: { [key: string]: number } = {};

    keys.forEach((k, idx) => {
      if (idx === keys.length - 1) {
        nextResults[k] = remaining;
      } else {
        const share = Math.floor(Math.random() * (remaining - (keys.length - idx - 1) * 10)) + 10;
        nextResults[k] = share;
        remaining -= share;
      }
    });

    setPollResults(nextResults);
  };

  return (
    <div className="relative select-none">
      <button
        type="button"
        onClick={() => {
          if (!isOpen) handleSimulateVotes();
          setIsOpen(!isOpen);
        }}
        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
          isOpen
            ? 'bg-blue-600 text-white'
            : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
        }`}
        title="Classroom Audience Live Poll"
      >
        <Users className="w-3.5 h-3.5" />
        <span>Audience Poll</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border-2 border-blue-200 z-50 animate-fade-in text-left">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-blue-900 uppercase tracking-wide">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Classroom Votes</span>
            </div>
            <button
              onClick={handleSimulateVotes}
              className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-500 flex items-center justify-center"
              title="Refresh / Re-tally Votes"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1.5">
            {optionsLetters.slice(0, optionsCount).map((letter) => {
              const pct = pollResults[letter] || 0;
              return (
                <div key={letter} className="flex items-center gap-2">
                  <span className="w-5 font-black text-xs text-slate-700">{letter}</span>
                  <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-[11px] font-bold text-slate-600 text-right">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-400 italic text-center">
            Whole-class audience sentiment recorded
          </p>
        </div>
      )}
    </div>
  );
};
