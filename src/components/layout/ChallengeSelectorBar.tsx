import React from 'react';
import {
  HelpCircle,
  Search,
  Sprout,
  Link as LinkIcon,
  Puzzle,
  Smile,
  Lightbulb,
  Zap
} from 'lucide-react';
import { ChallengeCategoryType } from '../../types/game';
import { CHALLENGE_CATEGORIES } from '../../data/challenges';

interface ChallengeSelectorBarProps {
  selectedCategory: ChallengeCategoryType;
  isSpinning?: boolean;
  onSelectCategory: (cat: ChallengeCategoryType) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'help-circle': <HelpCircle className="w-5 h-5" />,
  'search': <Search className="w-5 h-5" />,
  'sprout': <Sprout className="w-5 h-5" />,
  'link': <LinkIcon className="w-5 h-5" />,
  'puzzle': <Puzzle className="w-5 h-5" />,
  'smile': <Smile className="w-5 h-5" />,
  'lightbulb': <Lightbulb className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />
};

export const ChallengeSelectorBar: React.FC<ChallengeSelectorBarProps> = ({
  selectedCategory,
  isSpinning = false,
  onSelectCategory,
}) => {
  return (
    <div className="relative z-10 w-full px-4 py-1.5 flex justify-center">
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-1 md:gap-2 max-w-4xl overflow-x-auto scrollbar-none">
        {CHALLENGE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.type;
          return (
            <button
              key={cat.type}
              onClick={() => onSelectCategory(cat.type)}
              disabled={isSpinning}
              className={`group relative flex flex-col items-center justify-center px-2.5 py-1.5 rounded-xl transition-all duration-200 min-w-[68px] md:min-w-[82px] ${
                isSelected
                  ? 'bg-amber-50 shadow-[0_0_0_2.5px_#F5B041,0_4px_12px_rgba(245,176,65,0.25)] -translate-y-0.5'
                  : 'hover:bg-slate-50 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Category Icon with Circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: cat.badgeColor }}
              >
                {ICON_MAP[cat.iconName]}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] md:text-xs font-black mt-1 tracking-tight ${
                  isSelected ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {cat.label}
              </span>

              {/* Active Indicator dot */}
              {isSelected && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
