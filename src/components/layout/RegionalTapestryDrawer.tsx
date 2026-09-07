import React, { useState } from 'react';
import { X, Compass, Layers, CheckCircle2 } from 'lucide-react';

interface RegionalTapestryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegionalTopic {
  id: string;
  theme: string;
  regions: {
    zone: string;
    tradition: string;
    details: string;
    materialsOrMedium: string;
  }[];
  comparativeInsight: string;
}

const REGIONAL_TOPICS: RegionalTopic[] = [
  {
    id: 'topic_scrolls',
    theme: 'Visual Storytelling & Narrative Scrolls',
    regions: [
      {
        zone: 'North-West (Rajasthan)',
        tradition: 'Phad Paintings',
        details: 'Long horizontal hand-painted cloth scrolls depicting folk epics of Pabuji and Devnarayan.',
        materialsOrMedium: 'Coarse khadi cloth, natural mineral dyes, narrated with Ravanahatha violin'
      },
      {
        zone: 'East (Bengal & Odisha)',
        tradition: 'Patachitra Scrolls',
        details: 'Vertical painted scrolls unrolled frame by frame as the Patua minstrel sings poetic ballads.',
        materialsOrMedium: 'Handmade paper mounted on recycled old sarees with tamarind seed glue'
      },
      {
        zone: 'South (Telangana)',
        tradition: 'Cheriyal Narrative Scrolls',
        details: 'Scrolls depicting stories from community history carried by traditional bards.',
        materialsOrMedium: 'Khadi cloth coated with tamarind paste, chalk powder, and tree gum'
      },
      {
        zone: 'South-East (Andhra Pradesh)',
        tradition: 'Tholu Bommalata (Leather Puppetry)',
        details: 'Translucent goat-skin shadow puppets illuminated behind a white fabric screen.',
        materialsOrMedium: 'Tanned translucent leather, vegetable ink perforations, cast shadows'
      }
    ],
    comparativeInsight: 'Across all four corners of India, storytelling was never just written on paper—it combined visual art, singing, and performance so entire villages could experience epics communally.'
  },
  {
    id: 'topic_water',
    theme: 'Ecological Water Harvesting Engineering',
    regions: [
      {
        zone: 'West (Gujarat & Rajasthan)',
        tradition: 'Stepped Baolis & Vavs',
        details: 'Subterranean stepped wells carved deep into the earth to catch desert runoff and keep water cool.',
        materialsOrMedium: 'Carved sandstone chambers, cooling pavilions, community resting halls'
      },
      {
        zone: 'East (Bihar & Bengal)',
        tradition: 'Ahar-Pyne Systems',
        details: 'Canal channels (pynes) diverting swollen river floodwaters into retention embankments (ahars).',
        materialsOrMedium: 'Earthen dykes, canal gates, gravity-fed gradient sluices'
      },
      {
        zone: 'Central (Madhya Pradesh)',
        tradition: 'Johads & Bunds',
        details: 'Curved earthen check-dams capturing monsoon precipitation to recharge underground aquifers.',
        materialsOrMedium: 'Packed clay, river stones, native vetiver grass stabilizers'
      },
      {
        zone: 'South (Tamil Nadu)',
        tradition: 'Eri Tank Cascades',
        details: 'Interconnected lake networks where excess overflow from one tank cascades into the next.',
        materialsOrMedium: 'Stone stone-revetted bunds, sluices (madagu), generational community upkeep'
      }
    ],
    comparativeInsight: 'Different topographies demanded different engineering innovations, yet all shared a fundamental cultural principle: water is a communal sacred resource managed collaboratively.'
  }
];

export const RegionalTapestryDrawer: React.FC<RegionalTapestryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState('topic_scrolls');
  if (!isOpen) return null;

  const currentTopic = REGIONAL_TOPICS.find(t => t.id === selectedTopicId) || REGIONAL_TOPICS[0];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm select-none animate-fade-in">
      <div className="relative w-full max-w-xl h-full bg-white shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-l-4 border-amber-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                  PAN-INDIAN PERSPECTIVES
                </span>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                  Regional Tapestry of Traditions
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Topic Switcher Tabs */}
          <div className="flex gap-2 mt-4 mb-5">
            {REGIONAL_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedTopicId === topic.id
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {topic.theme}
              </button>
            ))}
          </div>

          {/* Regional Cards */}
          <div className="space-y-3 mb-6">
            {currentTopic.regions.map((reg, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-black text-slate-800">
                    {reg.tradition}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    {reg.zone}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mb-2 leading-relaxed">
                  {reg.details}
                </p>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span><strong>Medium:</strong> {reg.materialsOrMedium}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Comparative Insight Banner */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 uppercase tracking-wide mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Comparative Understanding</span>
            </div>
            <p className="text-xs font-medium text-emerald-950 leading-relaxed">
              {currentTopic.comparativeInsight}
            </p>
          </div>
        </div>

        <div className="pt-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] text-white font-bold text-xs uppercase tracking-wider shadow"
          >
            Close Regional Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
