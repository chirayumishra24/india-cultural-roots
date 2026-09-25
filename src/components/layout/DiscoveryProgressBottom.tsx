import React from 'react';
import { CULTURAL_ZONES } from '../../data/discoveriesData';
import { BookOpen, Zap, Search, MapPin, Sparkles } from 'lucide-react';
import { TeamProgress } from '../../types/game';

interface DiscoveryProgressBottomProps {
  teamKnowledge: TeamProgress;
  teamHeritage: TeamProgress;
  onZoneClick?: (zoneIndex: number) => void;
}

export const DiscoveryProgressBottom: React.FC<DiscoveryProgressBottomProps> = ({
  teamKnowledge,
  teamHeritage,
  onZoneClick
}) => {
  return (
    <div className="w-full border border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-4 select-none relative z-10 clay-card">
      {/* Left Title & Explanation */}
      <div className="flex items-center gap-3 min-w-[240px] max-w-[280px]">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 clay-btn-white">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            Discovery Progress
          </h3>
          <p className="text-[11px] text-slate-500 font-medium leading-tight">
            Collect key ideas from each tradition to build India's Cultural Journey!
          </p>
        </div>
      </div>

      {/* Center: 6 Circular Zone Thumbnails Connected by Path */}
      <div className="flex-1 flex items-center justify-center gap-1 sm:gap-3 overflow-x-auto py-1">
        {CULTURAL_ZONES.map((zone, idx) => {
          const isKnowledgeHere =
            teamKnowledge.discoveries >= zone.startDiscovery &&
            teamKnowledge.discoveries <= zone.endDiscovery;
          const isHeritageHere =
            teamHeritage.discoveries >= zone.startDiscovery &&
            teamHeritage.discoveries <= zone.endDiscovery;

          const isKnowledgePassed = teamKnowledge.discoveries > zone.endDiscovery;
          const isHeritagePassed = teamHeritage.discoveries > zone.endDiscovery;

          const hasUnlockedAny =
            teamKnowledge.unlockedDiscoveries.some(
              (id) => id >= zone.startDiscovery && id <= zone.endDiscovery
            ) ||
            teamHeritage.unlockedDiscoveries.some(
              (id) => id >= zone.startDiscovery && id <= zone.endDiscovery
            );

          return (
            <React.Fragment key={zone.index}>
              {/* Connector dots between zones */}
              {idx > 0 && (
                <div className="flex items-center gap-1 shrink-0 px-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              )}

              {/* Zone Circular Thumbnail Item */}
              <div
                onClick={() => onZoneClick?.(zone.index)}
                className="flex flex-col items-center cursor-pointer group relative shrink-0"
              >
                {/* Active Explorer Marker Tag on Top */}
                {(isKnowledgeHere || isHeritageHere) && (
                  <div className="absolute -top-3.5 flex items-center gap-1 z-10">
                    {isKnowledgeHere && (
                      <span className="flex items-center gap-0.5 bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-xs animate-bounce clay-pill">
                        <MapPin className="w-2 h-2" />
                        Blue
                      </span>
                    )}
                    {isHeritageHere && (
                      <span className="flex items-center gap-0.5 bg-orange-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-xs animate-bounce clay-pill">
                        <MapPin className="w-2 h-2" />
                        Orange
                      </span>
                    )}
                  </div>
                )}

                {/* Circular Zone Avatar / Badge */}
                <div
                  className={`w-12 h-12 rounded-full border-2 p-0.5 transition-all duration-300 flex items-center justify-center relative clay-pill group-hover:scale-105 ${
                    isKnowledgeHere || isHeritageHere
                      ? 'ring-4 ring-amber-300 scale-105'
                      : ''
                  }`}
                  style={{
                    borderColor: hasUnlockedAny ? zone.color : '#CBD5E1',
                    backgroundColor: zone.accentBg
                  }}
                >
                  {/* Zone Icon representation */}
                  <div
                    className="w-full h-full rounded-full flex flex-col items-center justify-center text-center font-black text-xs"
                    style={{ color: zone.color }}
                  >
                    <span className="text-[14px]">
                      {idx === 0
                        ? '🔥'
                        : idx === 1
                        ? '🧘'
                        : idx === 2
                        ? '☸️'
                        : idx === 3
                        ? '🕊️'
                        : idx === 4
                        ? '🌳'
                        : '🏛️'}
                    </span>
                  </div>

                  {/* Complete checkmark badge */}
                  {(isKnowledgePassed || isHeritagePassed) && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white text-[8px] font-bold flex items-center justify-center border border-white shadow-xs">
                      ✓
                    </div>
                  )}
                </div>

                {/* Zone Label & Number Range */}
                <span className="text-[10px] font-extrabold text-slate-700 mt-1 text-center whitespace-nowrap group-hover:text-blue-600 transition-colors">
                  {zone.shortTitle}
                </span>
                <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                  {zone.range}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Right: Power-ups Reminder Box */}
      <div className="hidden lg:flex items-center gap-3 border border-amber-200/80 rounded-2xl px-3 py-1.5 shrink-0 clay-card">
        <div className="text-left">
          <div className="flex items-center gap-1 text-[10px] font-black text-amber-800 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Power-Ups</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Use them wisely!</span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-amber-200">
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl border border-amber-200/80 clay-btn-white">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <div className="text-[9px] leading-tight font-bold text-slate-700">
              <div>50/50</div>
              <div className="text-slate-400">1 per team</div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl border border-amber-200/80 clay-btn-white">
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <div className="text-[9px] leading-tight font-bold text-slate-700">
              <div>Root Hint</div>
              <div className="text-slate-400">2 per team</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
