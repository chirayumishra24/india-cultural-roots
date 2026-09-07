import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { soundFx } from '../../game/audioEngine';

interface IntroModalProps {
  onStart: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ onStart }) => {
  const [step, setStep] = useState(0);

  const introSlides = [
    {
      title: 'Every culture has roots.',
      subtitle: 'Living traditions, languages, and knowledge grow from deep historical foundations.',
      icon: '🌱'
    },
    {
      title: 'Explore the clues.',
      subtitle: 'Investigate manuscripts, temple sculptures, handlooms, and acoustic melodies.',
      icon: '🔍'
    },
    {
      title: 'Connect the discoveries.',
      subtitle: 'See how stories, science, arts, and community practices support one another.',
      icon: '🔗'
    },
    {
      title: 'Witness continuity and change.',
      subtitle: 'Discover how cultural expressions have roots in the past and thrive in the present.',
      icon: '🌳'
    }
  ];

  const handleNext = () => {
    soundFx.playClick();
    if (step < introSlides.length - 1) {
      setStep(prev => prev + 1);
    } else {
      soundFx.playSelect();
      onStart();
    }
  };

  const current = introSlides[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-white via-[#FCFBF7] to-[#F7F2E7] border-4 border-amber-300/80 rounded-3xl p-6 md:p-8 shadow-2xl text-center flex flex-col items-center">
        {/* Animated Icon Emblem */}
        <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 text-4xl flex items-center justify-center mb-4 shadow-md animate-bounce">
          {current.icon}
        </div>

        {/* Quest Title Tag */}
        <div className="bg-amber-100/80 border border-amber-300 rounded-full px-4 py-0.5 text-xs font-black tracking-widest uppercase text-amber-900 mb-2">
          THE CULTURE QUEST
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
          {current.title}
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base font-medium text-slate-600 max-w-md mb-6 leading-relaxed">
          {current.subtitle}
        </p>

        {/* Progress indicators */}
        <div className="flex items-center gap-2 mb-6">
          {introSlides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === idx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 w-full">
          {step < introSlides.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl bg-[#2B7DE9] hover:bg-[#1E67C9] text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Next</span>
              <Sparkles className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onStart}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 text-white font-black text-base uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 animate-pulse"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Enter The Quest</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
