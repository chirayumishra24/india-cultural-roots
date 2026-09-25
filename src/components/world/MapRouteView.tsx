import React from 'react';
import { CULTURAL_ZONES } from '../../data/discoveriesData';
import { Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { CulturalZone } from '../../types/game';

interface MapRouteViewProps {
  unlockedTeamA: number[];
  unlockedTeamB: number[];
  teamADiscoveries: number;
  teamBDiscoveries: number;
  onSelectZone?: (index: number) => void;
}

export const MapRouteView: React.FC<MapRouteViewProps> = ({
  unlockedTeamA,
  unlockedTeamB,
  teamADiscoveries,
  teamBDiscoveries,
  onSelectZone
}) => {
  return (
    <div className="w-full h-full relative overflow-y-auto p-4 bg-gradient-to-br from-amber-50/95 via-sky-50/90 to-emerald-50/95 rounded-2xl border border-amber-200/80 shadow-inner flex flex-col justify-between select-none">
      {/* Map Header */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-800 tracking-wide uppercase">
              Cultural Expedition Map
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              From Vedic origins to shared Indian cultural heritage
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Knowledge: {teamADiscoveries}/20</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>Heritage: {teamBDiscoveries}/20</span>
          </div>
        </div>
      </div>

      {/* Illustrated 6 Zones Route Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1">
        {CULTURAL_ZONES.map((zone: CulturalZone, idx: number) => {
          const zoneDiscoveries = Array.from(
            { length: zone.endDiscovery - zone.startDiscovery + 1 },
            (_, i) => zone.startDiscovery + i
          );

          const teamAHere =
            teamADiscoveries >= zone.startDiscovery && teamADiscoveries <= zone.endDiscovery;
          const teamBHere =
            teamBDiscoveries >= zone.startDiscovery && teamBDiscoveries <= zone.endDiscovery;

          return (
            <div
              key={zone.index}
              onClick={() => onSelectZone?.(zone.index)}
              className="relative p-3.5 rounded-xl border-2 transition-all cursor-pointer bg-white/95 hover:bg-white shadow-sm hover:shadow-md hover:border-amber-400 group flex flex-col justify-between"
              style={{
                borderColor: `${zone.color}45`
              }}
            >
              <div>
                {/* Zone Tag & Range */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md text-white tracking-wider shadow-xs"
                    style={{ backgroundColor: zone.color }}
                  >
                    Zone {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    Discoveries {zone.range}
                  </span>
                </div>

                {/* Title & Description */}
                <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm mb-1 group-hover:text-amber-800 transition-colors">
                  {zone.title}
                </h4>
                <p className="text-[11px] text-slate-600 mb-2 leading-relaxed line-clamp-2">
                  {zone.description}
                </p>

                {/* Key Themes tags */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {zone.keyThemes.slice(0, 3).map((theme: string, i: number) => (
                    <span
                      key={i}
                      className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Discovery progress indicators in this zone */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                {zoneDiscoveries.map((discId) => {
                  const aHas = unlockedTeamA.includes(discId);
                  const bHas = unlockedTeamB.includes(discId);
                  return (
                    <div
                      key={discId}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border transition-all shadow-xs ${
                        aHas && bHas
                          ? 'bg-purple-600 text-white border-purple-400'
                          : aHas
                          ? 'bg-blue-600 text-white border-blue-400'
                          : bHas
                          ? 'bg-orange-500 text-white border-orange-400'
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                      title={`Discovery ${discId}`}
                    >
                      {aHas && bHas ? <CheckCircle2 className="w-3.5 h-3.5" /> : discId}
                    </div>
                  );
                })}
              </div>

              {/* Active Explorer Markers on Zone */}
              {(teamAHere || teamBHere) && (
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {teamAHere && (
                    <span className="flex items-center gap-0.5 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                      <MapPin className="w-2.5 h-2.5" />
                      Team A
                    </span>
                  )}
                  {teamBHere && (
                    <span className="flex items-center gap-0.5 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                      <MapPin className="w-2.5 h-2.5" />
                      Team B
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Quote */}
      <div className="mt-2.5 pt-2 border-t border-amber-200/80 flex items-center justify-center gap-2 text-[11px] font-bold text-amber-900/80">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>"Many Roots. Many Ideas. Many Traditions. A Rich Cultural Heritage."</span>
      </div>
    </div>
  );
};
