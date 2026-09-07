import React, { useState, useRef } from 'react';
import { X, RefreshCw, SkipForward, Volume2, VolumeX, Clock, Play, Pause, Upload, Download, BookOpen, Check } from 'lucide-react';
import { soundFx } from '../../game/audioEngine';
import { getSampleQuestionTemplateJSON, saveCustomQuestions, clearCustomQuestions, getCustomQuestions } from '../../game/contentImporter';
import { QuizChallengeData } from '../../types/challenges';

interface TeacherPanelModalProps {
  isOpen: boolean;
  teamAName: string;
  teamBName: string;
  isPaused: boolean;
  timerEnabled: boolean;
  soundEnabled: boolean;
  onClose: () => void;
  onUpdateTeamNames: (a: string, b: string) => void;
  onTogglePause: () => void;
  onToggleTimer: () => void;
  onToggleSound: () => void;
  onSkipChallenge: () => void;
  onRestartRound: () => void;
  onResetGame: () => void;
  onQuestionsReload?: () => void;
}

export const TeacherPanelModal: React.FC<TeacherPanelModalProps> = ({
  isOpen,
  teamAName,
  teamBName,
  isPaused,
  timerEnabled,
  soundEnabled,
  onClose,
  onUpdateTeamNames,
  onTogglePause,
  onToggleTimer,
  onToggleSound,
  onSkipChallenge,
  onRestartRound,
  onResetGame,
  onQuestionsReload,
}) => {
  const [nameA, setNameA] = useState(teamAName);
  const [nameB, setNameB] = useState(teamBName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSaveNames = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSelect();
    onUpdateTeamNames(nameA, nameB);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border-2 border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-left mb-4">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            Classroom Controls
          </span>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">
            Teacher Control Panel
          </h3>
        </div>

        {/* Quick Toggles */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={onTogglePause}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-bold text-xs transition-all ${
              isPaused ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4 text-amber-600" /> : <Pause className="w-4 h-4 text-slate-600" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={onToggleTimer}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-bold text-xs transition-all ${
              timerEnabled ? 'bg-blue-50 border-blue-300 text-blue-800' : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timerEnabled ? 'Timer ON' : 'Timer OFF'}</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 font-bold text-xs transition-all ${
              soundEnabled ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
          </button>
        </div>

        {/* Rename Teams Form */}
        <form onSubmit={handleSaveNames} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-4 text-left">
          <div className="text-xs font-black text-slate-700 uppercase tracking-wide mb-2">
            Rename Teams
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Team A</label>
              <input
                type="text"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Team B</label>
              <input
                type="text"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
          >
            Save Team Names
          </button>
        </form>

        {/* Teacher Content Studio: Custom Question Pack */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl mb-4 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Custom Curriculum Studio</span>
            </div>
            {getCustomQuestions() && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Custom Pack Active</span>
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-600 mb-2">
            Import custom textbook passages & questions (JSON/CSV) for your board syllabus.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const blob = new Blob([getSampleQuestionTemplateJSON()], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'culture_quest_sample_questions.json';
                a.click();
              }}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-600" />
              <span>Sample Template</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Questions</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const parsed = JSON.parse(event.target?.result as string);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      saveCustomQuestions(parsed as QuizChallengeData[]);
                      soundFx.playCorrect();
                      if (onQuestionsReload) onQuestionsReload();
                      alert(`Successfully imported ${parsed.length} curriculum questions!`);
                    }
                  } catch {
                    alert('Invalid JSON file format. Please use the sample template.');
                  }
                };
                reader.readAsText(file);
              }}
            />
          </div>
          {getCustomQuestions() && (
            <button
              type="button"
              onClick={() => {
                clearCustomQuestions();
                if (onQuestionsReload) onQuestionsReload();
                alert('Reset to default curriculum questions.');
              }}
              className="mt-2 text-[10px] text-amber-800 font-bold underline hover:text-amber-950 block text-center w-full"
            >
              Reset to Default Questions
            </button>
          )}
        </div>

        {/* Round Navigation Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onSkipChallenge}
            className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Skip Clue</span>
          </button>

          <button
            onClick={onRestartRound}
            className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart Round</span>
          </button>

          <button
            onClick={onResetGame}
            className="py-2.5 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-center gap-1"
          >
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
