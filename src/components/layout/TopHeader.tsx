import React from 'react';
import {
  Box,
  Map,
  GitFork,
  Volume2,
  VolumeX,
  Maximize2,
  Clock,
  Compass,
  Scroll,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface TopHeaderProps {
  totalDiscoveries: number;
  teamADiscoveries: number;
  teamBDiscoveries: number;
  timeRemainingSeconds: number;
  viewMode: '3d' | 'map';
  onToggleViewMode: (mode: '3d' | 'map') => void;
  onOpenTreeModal: () => void;
  onOpenTeacherModal: () => void;
  onOpenHelpModal: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  totalDiscoveries,
  teamADiscoveries,
  teamBDiscoveries,
  timeRemainingSeconds,
  viewMode,
  onToggleViewMode,
  onOpenTreeModal,
  onOpenTeacherModal,
  onOpenHelpModal,
  isSoundMuted,
  onToggleSound
}) => {
  // Format MM:SS
  const mins = Math.floor(timeRemainingSeconds / 60);
  const secs = timeRemainingSeconds % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const isFinalMinute = timeRemainingSeconds <= 60 && timeRemainingSeconds > 0;

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const highestDiscovery = Math.max(teamADiscoveries, teamBDiscoveries);

  return (
    <header className="w-full border border-slate-200/90 rounded-2xl px-4 py-2 flex items-center justify-between gap-4 select-none relative z-20 clay-card">
      {/* Left: Brand & NCERT Chapter Identity */}
      <div className="flex items-center gap-3 min-w-[280px]">
        {/* Ashoka Chakra & Sacred Emblem Motif */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 p-0.5 shadow-md flex items-center justify-center shrink-0 border border-amber-400">
          <div className="w-full h-full rounded-[10px] bg-amber-50 flex items-center justify-center border border-amber-300">
            <Compass className="w-6 h-6 text-amber-700 animate-spin-slow" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase font-sans">
              Cultural Quest
            </h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              Class 6
            </span>
          </div>
          <p className="text-xs font-bold text-slate-700">India’s Cultural Roots</p>
          <p className="text-[10px] font-medium text-slate-500 italic hidden sm:block">
            “Trace the Roots. Discover the Ideas. Build the Heritage.”
          </p>
        </div>
      </div>

      {/* Center: Global Quest Discovery Count & Game Timer */}
      <div className="flex items-center gap-5 shrink-0">
        {/* Discovery Progress Dots */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-slate-700 tracking-wide uppercase">
              Discovery {highestDiscovery.toString().padStart(2, '0')} / {totalDiscoveries}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalDiscoveries }, (_, i) => {
              const nodeNum = i + 1;
              const aHas = teamADiscoveries >= nodeNum;
              const bHas = teamBDiscoveries >= nodeNum;

              let dotColor = 'bg-slate-200 border-slate-300';
              if (aHas && bHas) dotColor = 'bg-purple-600 border-purple-500 shadow-sm';
              else if (aHas) dotColor = 'bg-blue-600 border-blue-500 shadow-sm';
              else if (bHas) dotColor = 'bg-orange-500 border-orange-400 shadow-sm';

              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${dotColor} ${
                    nodeNum === highestDiscovery ? 'scale-125 ring-2 ring-amber-400' : ''
                  }`}
                  title={`Discovery ${nodeNum}`}
                />
              );
            })}
          </div>
        </div>

        {/* Global Game Timer */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
            isFinalMinute
              ? 'bg-red-50 border-red-300 text-red-600 animate-pulse'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <Clock className={`w-5 h-5 ${isFinalMinute ? 'text-red-600' : 'text-slate-600'}`} />
          <div className="leading-none">
            <span className="text-lg font-black tracking-wider font-mono block">
              {timeFormatted}
            </span>
            <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
              {isFinalMinute ? 'Final Minute' : 'Time Remaining'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: View Toggles, Controls & Heritage Scroll Quote */}
      <div className="flex items-center gap-2.5">
        {/* View Switcher: 3D vs Map */}
        <div className="flex items-center p-1 rounded-xl border border-slate-200/80 clay-inset">
          <button
            onClick={() => onToggleViewMode('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              viewMode === '3d'
                ? 'clay-btn-white text-blue-700'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="3D Miniature World"
          >
            <Box className="w-4 h-4" />
            <span className="hidden sm:inline">3D View</span>
          </button>
          <button
            onClick={() => onToggleViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'clay-btn-white text-blue-700'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="2D Map Route"
          >
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">Map View</span>
          </button>
        </div>

        {/* Cultural Tree Button */}
        <button
          onClick={onOpenTreeModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-900 bg-emerald-50 border border-emerald-300 transition-all clay-btn-white cursor-pointer"
          title="Open Cultural Heritage Tree View"
        >
          <GitFork className="w-4 h-4 text-emerald-600 rotate-180" />
          <span className="hidden md:inline">Cultural Tree</span>
        </button>

        {/* Teacher Mode Button */}
        <button
          onClick={onOpenTeacherModal}
          className="p-2 rounded-xl text-slate-700 clay-btn-white cursor-pointer"
          title="Teacher Dashboard / Manage Questions"
        >
          <GraduationCap className="w-4 h-4 text-slate-700" />
        </button>

        {/* Help / How to Play */}
        <button
          onClick={onOpenHelpModal}
          className="p-2 rounded-xl text-slate-700 clay-btn-white cursor-pointer"
          title="How to Play"
        >
          <HelpCircle className="w-4 h-4 text-slate-700" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl text-slate-700 clay-btn-white cursor-pointer"
          title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isSoundMuted ? (
            <VolumeX className="w-4 h-4 text-slate-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-blue-600" />
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl text-slate-700 clay-btn-white cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-slate-700" />
        </button>

        {/* Decorative Scroll Tagline Card */}
        <div className="hidden xl:flex items-center gap-2 bg-amber-50/90 border border-amber-300/80 rounded-xl px-3 py-1 text-left shadow-xs">
          <Scroll className="w-4 h-4 text-amber-700 shrink-0" />
          <div className="text-[10px] leading-tight font-bold text-amber-900">
            <div>Many Roots • Many Ideas</div>
            <div className="text-amber-700 font-medium">A Shared Heritage</div>
          </div>
        </div>
      </div>
    </header>
  );
};
