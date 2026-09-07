import React, { useEffect, useState } from 'react';
import { Sprout, Lightbulb, Palette, Link as LinkIcon, Award } from 'lucide-react';
import { TokenType } from '../../game/scoring';

interface TokenFlyEffectProps {
  tokenType: TokenType;
  targetCategory?: string;
  onAnimationEnd: () => void;
}

const TOKEN_ICONS: Record<TokenType, { icon: React.ReactNode; bg: string; label: string }> = {
  root: { icon: <Sprout className="w-6 h-6 text-white" />, bg: 'bg-emerald-500', label: '+1 Root Token' },
  knowledge: { icon: <Lightbulb className="w-6 h-6 text-white" />, bg: 'bg-amber-500', label: '+1 Knowledge Token' },
  heritage: { icon: <Palette className="w-6 h-6 text-white" />, bg: 'bg-purple-500', label: '+1 Heritage Token' },
  connection: { icon: <LinkIcon className="w-6 h-6 text-white" />, bg: 'bg-blue-500', label: '+1 Connection Token' },
  insight: { icon: <Award className="w-6 h-6 text-white" />, bg: 'bg-rose-500', label: '+1 Insight Token' },
};

export const TokenFlyEffect: React.FC<TokenFlyEffectProps> = ({
  tokenType,
  onAnimationEnd,
}) => {
  const [active, setActive] = useState(true);
  const info = TOKEN_ICONS[tokenType] || TOKEN_ICONS.knowledge;

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      onAnimationEnd();
    }, 1100);
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-fly-to-tree flex flex-col items-center gap-1.5 drop-shadow-2xl">
        <div className={`w-14 h-14 rounded-2xl ${info.bg} ring-4 ring-white flex items-center justify-center shadow-xl animate-spin-slow`}>
          {info.icon}
        </div>
        <span className="bg-white/95 border border-slate-200 text-slate-900 text-xs font-black px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
          {info.label}
        </span>
      </div>
    </div>
  );
};
