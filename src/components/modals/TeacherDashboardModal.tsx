import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Download,
  Filter
} from 'lucide-react';
import { Question, QuestionCategory } from '../../types/game';
import { INITIAL_QUESTIONS } from '../../data/questionsData';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onUpdateQuestions: (qs: Question[]) => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({
  isOpen,
  onClose,
  questions,
  onUpdateQuestions
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  if (!isOpen) return null;

  const categories: { key: QuestionCategory; label: string }[] = [
    { key: 'vedic-culture', label: 'Vedic Culture' },
    { key: 'upanishads', label: 'Upanishads' },
    { key: 'vedanta-yoga', label: 'Vedanta & Yoga' },
    { key: 'buddhism', label: 'Buddhism' },
    { key: 'jainism', label: 'Jainism' },
    { key: 'folk-traditions', label: 'Folk Traditions' },
    { key: 'tribal-traditions', label: 'Tribal Traditions' },
    { key: 'shared-heritage', label: 'Shared Heritage' }
  ];

  const filteredQuestions = questions.filter((q) => {
    if (filterCategory !== 'all' && q.category !== filterCategory) return false;
    if (filterDifficulty !== 'all' && q.difficulty !== filterDifficulty) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this question from the quest?')) {
      onUpdateQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all questions to official NCERT defaults?')) {
      onUpdateQuestions(INITIAL_QUESTIONS);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    const exists = questions.some((q) => q.id === editingQuestion.id);
    if (exists) {
      onUpdateQuestions(questions.map((q) => (q.id === editingQuestion.id ? editingQuestion : q)));
    } else {
      onUpdateQuestions([editingQuestion, ...questions]);
    }
    setEditingQuestion(null);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'cultural_quest_questions.json');
    dlAnchor.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-950 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-400/30">
              <GraduationCap className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black tracking-wide uppercase font-sans">
                Teacher Dashboard & Curriculum Control
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Manage Class 6 NCERT Chapter 7 Question Bank ({questions.length} total)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-700"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-700"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setEditingQuestion({
                  id: `custom-q-${Date.now()}`,
                  question: '',
                  type: 'mcq',
                  category: 'vedic-culture',
                  difficulty: 'easy',
                  explanation: '',
                  discoveryId: 1,
                  discoveryTitle: 'The Four Vedas',
                  discoveryDescription: 'Vedic heritage discovery.',
                  options: ['Option A', 'Option B', 'Option C', 'Option D'],
                  correctAnswer: 0
                })
              }
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-bold shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Question</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Content Body: List or Edit Form */}
        <div className="p-4 flex-1 overflow-y-auto bg-slate-50">
          {editingQuestion ? (
            /* Edit Form */
            <form onSubmit={handleSaveEdit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-2xl mx-auto">
              <h3 className="text-sm font-black uppercase text-slate-800 tracking-wide border-b pb-2">
                {questions.some((q) => q.id === editingQuestion.id) ? 'Edit Question' : 'Create New Question'}
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Question Prompt</label>
                <textarea
                  required
                  rows={3}
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter clear, age-appropriate question text for Class 6..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Category</label>
                  <select
                    value={editingQuestion.category}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, category: e.target.value as QuestionCategory })
                    }
                    className="w-full text-xs font-bold p-2 border border-slate-300 rounded-xl bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Difficulty</label>
                  <select
                    value={editingQuestion.difficulty}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, difficulty: e.target.value as any })
                    }
                    className="w-full text-xs font-bold p-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Options if MCQ */}
              {editingQuestion.type === 'mcq' && editingQuestion.options && (
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Multiple Choice Options (Select radio for correct answer):
                  </label>
                  <div className="space-y-2">
                    {editingQuestion.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctOption"
                          checked={editingQuestion.correctAnswer === i}
                          onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: i })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-xs font-bold text-slate-500 w-4">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => {
                            const nextOpts = [...(editingQuestion.options || [])];
                            nextOpts[i] = e.target.value;
                            setEditingQuestion({ ...editingQuestion, options: nextOpts });
                          }}
                          className="flex-1 text-xs font-semibold p-2 border border-slate-300 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Educational Explanation</label>
                <textarea
                  required
                  rows={2}
                  value={editingQuestion.explanation}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  className="w-full text-xs font-medium p-2 border border-slate-300 rounded-xl"
                  placeholder="Explain why the answer is correct according to the textbook..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save Question
                </button>
              </div>
            </form>
          ) : (
            /* Questions List */
            <div className="space-y-2.5">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-xs font-black flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          {q.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {q.type}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 capitalize">
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-snug">{q.question}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                      title="Edit Question"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-800 text-white hover:bg-slate-900 transition-all"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
