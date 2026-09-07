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
    <header className="relative z-20 w-full px-2 sm:px-4 pt-2 sm:pt-3 pb-1.5 sm:pb-2 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 2xl:px-8 2xl:pt-4 2xl:pb-3 max-w-[1920px] mx-auto">
      {/* Top Row on Mobile: Plaque + Controls / Column on Desktop */}
      <div className="w-full md:w-auto flex items-center justify-between gap-2">
        {/* The Culture Quest Wooden Plaque Title */}
        <div
          className="flex items-center select-none group cursor-pointer shrink-0"
          onClick={onOpenTeacherPanel}
          title="Click to open Teacher Settings"
        >
          <div className="relative bg-gradient-to-b from-[#8C5326] via-[#6F3A15] to-[#4D2409] border-2 border-[#3D1A04] rounded-xl sm:rounded-2xl px-3 sm:px-5 py-1 sm:py-2 shadow-[0_4px_0_#2B1303,0_8px_14px_rgba(0,0,0,0.35)] 2xl:shadow-[0_6px_0_#2B1303,0_12px_20px_rgba(0,0,0,0.35)] 2xl:px-6 2xl:py-3 flex flex-col items-center">
            {/* Decorative Corner Sprout Leaves */}
            <span className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 text-base sm:text-xl filter drop-shadow">🍃</span>
            <span className="absolute -bottom-1 -right-1.5 sm:-bottom-1 sm:-right-2 text-sm sm:text-lg filter drop-shadow">🌿</span>

            <div className="text-[9px] sm:text-[10px] 2xl:text-xs tracking-widest font-black text-amber-200 uppercase leading-none drop-shadow-sm">
              THE
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2A3] via-[#FDC33D] to-[#E68200] filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] leading-tight">
              CULTURE QUEST
            </h1>
            <div className="mt-0.5 bg-[#F4E3C7] border border-[#B38758] rounded-full px-2 sm:px-3 py-0.5 shadow-inner">
              <span className="text-[9px] sm:text-[11px] 2xl:text-xs font-bold text-[#572E10] tracking-wider whitespace-nowrap">
                India's Cultural Roots
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons on mobile (Sound, Teacher, Fullscreen) shown right next to title on small screens */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={onToggleSound}
            className="w-9 h-9 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_2px_0_#184F9B]"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>
          <button
            onClick={onOpenTeacherPanel}
            className="w-9 h-9 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_2px_0_#184F9B]"
            title="Teacher Controls"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_2px_0_#184F9B]"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Center: Objective Card */}
      <div className="w-full md:flex-1 max-w-xl 2xl:max-w-2xl mx-0 md:mx-2 bg-white/95 backdrop-blur-sm border border-blue-100 rounded-xl md:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2.5 2xl:py-3.5 shadow-[0_4px_16px_rgba(43,125,233,0.08)] flex items-center gap-2.5 sm:gap-3">
        <div className="w-7 h-7 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6 animate-pulse" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-[10px] sm:text-xs 2xl:text-sm font-black text-blue-900 uppercase tracking-wider">
            Your Challenge
          </div>
          <div className="text-xs sm:text-sm 2xl:text-base font-medium text-slate-600 truncate">
            {objectiveText}
          </div>
        </div>
      </div>

      {/* Top Right: Round, Timer, Sound, Settings, Fullscreen (Desktop & Smart Class) */}
      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 shrink-0">
        {/* Round Badge */}
        <div className="bg-[#1C3B6E] text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 2xl:px-4 2xl:py-2.5 rounded-xl 2xl:rounded-2xl shadow-[0_3px_0_#102447] flex flex-col items-center justify-center min-w-[62px] sm:min-w-[72px] 2xl:min-w-[90px]">
          <span className="text-[8px] sm:text-[9px] 2xl:text-xs font-bold tracking-wider uppercase text-blue-200">Round</span>
          <span className="text-xs sm:text-sm 2xl:text-base font-black tracking-wide">{currentRound} / {maxRounds}</span>
        </div>

        {/* Timer */}
        {timerEnabled && (
          <div className="bg-white/95 border border-red-100 px-2.5 sm:px-3 py-1 sm:py-1.5 2xl:px-4 2xl:py-2 rounded-xl 2xl:rounded-2xl shadow-sm flex items-center gap-1.5 sm:gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4" />
            </div>
            <div className="text-left">
              <div className="text-[8px] sm:text-[9px] 2xl:text-[10px] font-bold uppercase text-slate-400 leading-none">Time Left</div>
              <div className="text-xs sm:text-sm 2xl:text-base font-black text-red-600 font-mono leading-tight">{formattedTime}</div>
            </div>
          </div>
        )}

        {/* Desktop / Smart Class Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="w-10 h-10 2xl:w-13 2xl:h-13 rounded-xl 2xl:rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_3px_0_#184F9B] transition-all"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 2xl:w-6 2xl:h-6" /> : <VolumeX className="w-5 h-5 2xl:w-6 2xl:h-6 opacity-70" />}
          </button>
          <button
            onClick={onOpenTeacherPanel}
            className="w-10 h-10 2xl:w-13 2xl:h-13 rounded-xl 2xl:rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_3px_0_#184F9B] transition-all"
            title="Teacher Controls & Settings"
            aria-label="Teacher Controls"
          >
            <Settings className="w-5 h-5 2xl:w-6 2xl:h-6" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 2xl:w-13 2xl:h-13 rounded-xl 2xl:rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] active:translate-y-0.5 text-white flex items-center justify-center shadow-[0_3px_0_#184F9B] transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-5 h-5 2xl:w-6 2xl:h-6" /> : <Maximize className="w-5 h-5 2xl:w-6 2xl:h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
