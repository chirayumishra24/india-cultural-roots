import React from 'react';
import {
  MessageCircle,
  BookOpen,
  Palette,
  Music,
  Lightbulb,
  Sprout,
  Landmark
} from 'lucide-react';
import { CulturalTreeNode } from '../../types/tree';

interface TreeNodeProps {
  node: CulturalTreeNode;
  isGlowing?: boolean;
  onClick: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  'message-circle': <MessageCircle className="w-5 h-5" />,
  'book-open': <BookOpen className="w-5 h-5" />,
  'palette': <Palette className="w-5 h-5" />,
  'music': <Music className="w-5 h-5" />,
  'lightbulb': <Lightbulb className="w-5 h-5" />,
  'sprout': <Sprout className="w-5 h-5" />,
  'landmark': <Landmark className="w-5 h-5" />
};

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  isGlowing = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        backgroundColor: node.color,
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-2xl text-white shadow-lg flex items-center gap-1.5 transition-all duration-300 transform hover:scale-110 active:scale-95 group z-20 ${
        isGlowing || node.isDiscovered
          ? 'ring-4 ring-white shadow-[0_0_24px_rgba(255,255,255,0.8)] animate-pulse'
          : 'opacity-95 hover:opacity-100'
      }`}
      title={`${node.name}: Click to explore cultural root`}
    >
      <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        {ICON_MAP[node.icon] || <Sprout className="w-4 h-4" />}
      </div>
      <span className="text-xs font-black tracking-wide drop-shadow-sm pr-1">
        {node.name}
      </span>

      {node.discoveredCount > 0 && (
        <span className="w-4 h-4 rounded-full bg-white text-slate-800 text-[10px] font-black flex items-center justify-center -mr-1">
          {node.discoveredCount}
        </span>
      )}
    </button>
  );
};
