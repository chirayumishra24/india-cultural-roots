import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundFx } from '../../game/audioEngine';

interface ReflectionModalProps {
  onFinishQuest: () => void;
  onPlayAgain: () => void;
}

interface ReflectionItem {
  id: string;
  question: string;
  options: string[];
}

const REFLECTIONS: ReflectionItem[] = [
  {
    id: 'ref_1',
    question: 'What did you notice about the different ways culture can be expressed?',
    options: [
      'Culture is expressed through multiple intertwined forms—stories, language, music, crafts, and knowledge.',
      'Culture only exists in textbooks and cannot be lived in daily activities.',
      'Only ancient stone carvings count as true culture.'
    ]
  },
  {
    id: 'ref_2',
    question: 'How can cultural knowledge or practices be passed between generations?',
    options: [
      'Through oral storytelling, apprentice craftsmanship, written manuscripts, and community celebrations.',
      'It can only be passed through commercial television broadcasts.',
      'Practices can never survive for more than a single generation.'
    ]
  },
  {
    id: 'ref_3',
    question: 'How can something have roots in the past while being expressed in the present?',
    options: [
      'Core values, musical ragas, and art motifs endure while artists use modern tools and reach new audiences.',
      'Old traditions must remain completely unchanged with zero adaptation.',
      'Modern life has no connection whatsoever to past traditions.'
    ]
  }
];

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  onFinishQuest,
  onPlayAgain,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);

  const current = REFLECTIONS[currentStep];

  const handleSelectOption = (index: number) => {
    soundFx.playClick();
    setSelectedAnswers(prev => ({ ...prev, [current.id]: index }));

    if (currentStep < REFLECTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 400);
    } else {
      setTimeout(() => {
        soundFx.playLivingCultureCelebration();
        setCompleted(true);
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border-4 border-amber-300 rounded-3xl p-6 md:p-8 shadow-2xl text-center">
        {!completed ? (
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-900 mb-3">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>REFLECTIVE INQUIRY • STEP {currentStep + 1} OF {REFLECTIONS.length}</span>
            </div>

            <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight mb-4">
              {current.question}
            </h3>

            <div className="space-y-2.5 mb-6 text-left">
              {current.options.map((option, idx) => {
                const isSelected = selectedAnswers[current.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-xs md:text-sm font-bold transition-all shadow-sm flex items-start gap-3 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                        : 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2">
              {REFLECTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep ? 'w-8 bg-amber-500' : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner">
              ✨
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
              QUEST COMPLETE!
            </h3>
            <p className="text-sm font-medium text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              You explored the cultural clues, connected traditions across time, and grew the Living Culture Tree together!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onPlayAgain}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play New Quest</span>
              </button>
              <button
                onClick={onFinishQuest}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish & Close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
