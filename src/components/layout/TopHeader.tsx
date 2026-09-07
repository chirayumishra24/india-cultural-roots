import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings, Target, Clock, Maximize, Minimize } from 'lucide-react';

interface TopHeaderProps {
  currentRound: number;
  maxRounds: number;
  timeLeft: number;
  timerEnabled: boolean;
  soundEnabled: boolean;
  objectiveText: string;
  onToggleSound: () => void;
  onOpenTeacherPanel: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentRound,
  maxRounds,
  timeLeft,
  timerEnabled,
  soundEnabled,
  objectiveText,
  onToggleSound,
  onOpenTeacherPanel,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formattedTime = `00:${timeLeft.toString().padStart(2, '0')}`;

  return (
    <header className="relative z-20 w-full px-4 pt-3 pb-2 flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Top Left: The Culture Quest Wooden Plaque Title */}
      <div className="flex items-center gap-2 select-none group cursor-pointer" onClick={onOpenTeacherPanel} title="Click to open Teacher Settings">
        <div className="relative bg-gradient-to-b from-[#8C5326] via-[#6F3A15] to-[#4D2409] border-2 border-[#3D1A04] rounded-2xl px-5 py-2 shadow-[0_6px_0_#2B1303,0_10px_16px_rgba(0,0,0,0.35)] flex flex-col items-center">
          {/* Decorative Corner Sprout Leaves */}
          <span className="absolute -top-2 -left-2 text-xl filter drop-shadow">🍃</span>
          <span className="absolute -bottom-1 -right-2 text-lg filter drop-shadow">🌿</span>

          <div className="text-[10px] tracking-widest font-black text-amber-200 uppercase -mb-1 drop-shadow-sm">
            THE
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2A3] via-[#FDC33D] to-[#E68200] filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            CULTURE QUEST
          </h1>
          {/* Lighter wooden ribbon underneath */}
          <div className="mt-0.5 bg-[#F4E3C7] border border-[#B38758] rounded-full px-3 py-0.5 shadow-inner">
            <span className="text-[11px] font-bold text-[#572E10] tracking-wider">
              India's Cultural Roots
            </span>
          </div>
        </div>
      </div>

      {/* Top Center: Objective Card */}
      <div className="flex-1 max-w-xl mx-2 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-2xl px-4 py-2.5 shadow-[0_4px_16px_rgba(43,125,233,0.08)] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <Target className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-xs font-black text-blue-900 uppercase tracking-wider">
            Your Challenge
          </div>
          <div className="text-xs md:text-sm font-medium text-slate-600 truncate">
            {objectiveText}
          </div>
        </div>
      </div>

      {/* Top Right: Round, Timer, Sound, Settings */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Round Badge */}
        <div className="bg-[#1C3B6E] text-white px-3.5 py-2 rounded-xl shadow-[0_3px_0_#102447] flex flex-col items-center justify-center min-w-[72px]">
          <span className="text-[9px] font-bold tracking-wider uppercase text-blue-200">Round</span>
          <span className="text-sm font-black tracking-wide">{currentRound} / {maxRounds}</span>
        </div>

        {/* Timer */}
        {timerEnabled && (
          <div className="bg-white/95 border border-red-100 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-bold uppercase text-slate-400 leading-none">Time Left</div>
              <div className="text-sm font-black text-red-600 font-mono leading-tight">{formattedTime}</div>
            </div>
          </div>
        )}

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="w-10 h-10 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_3px_0_#184F9B] transition-all"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-70" />}
        </button>

        {/* Teacher Settings Button */}
        <button
          onClick={onOpenTeacherPanel}
          className="w-10 h-10 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_3px_0_#184F9B] transition-all"
          title="Teacher Controls & Settings"
          aria-label="Teacher Controls"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_3px_0_#184F9B] transition-all"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
