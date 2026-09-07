import React from 'react';
import { Sprout } from 'lucide-react';

interface TreeProgressWidgetProps {
  discoveredCount: number;
  totalCategories: number;
}

export const TreeProgressWidget: React.FC<TreeProgressWidgetProps> = ({
  discoveredCount,
  totalCategories,
}) => {
  const progressPercent = Math.min(100, Math.round((discoveredCount / totalCategories) * 100));

  return (
    <div className="w-64 md:w-72 bg-white/95 backdrop-blur-md rounded-3xl p-3.5 border-2 border-emerald-100 shadow-[0_8px_24px_rgba(39,174,96,0.1)] select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Sprout className="w-4 h-4" />
          </div>
          <span className="text-xs font-black text-slate-800 tracking-tight">
            Cultural Tree Progress
          </span>
        </div>
        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          {discoveredCount} / {totalCategories}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 7 Leaf Icons */}
      <div className="mt-2.5 flex items-center justify-between px-1">
        {Array.from({ length: totalCategories }).map((_, idx) => {
          const isUnlocked = idx < discoveredCount;
          return (
            <div
              key={idx}
              className={`transition-all duration-300 transform ${
                isUnlocked
                  ? 'text-emerald-500 scale-110 drop-shadow-[0_2px_4px_rgba(39,174,96,0.4)]'
                  : 'text-slate-300'
              }`}
              title={isUnlocked ? `Root ${idx + 1} Discovered!` : `Root ${idx + 1} Hidden`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Footer Helper Note */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-start gap-2 text-left">
        <span className="text-base shrink-0">🌱</span>
        <p className="text-[11px] font-medium text-slate-500 leading-snug">
          Each correct answer helps your team grow the cultural tree!
        </p>
      </div>
    </div>
  );
};
