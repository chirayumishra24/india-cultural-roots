import { QuizChallengeData } from '../types/challenges';

const CUSTOM_QUESTIONS_STORAGE_KEY = 'culture_quest_custom_questions';

export function getCustomQuestions(): QuizChallengeData[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveCustomQuestions(questions: QuizChallengeData[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CUSTOM_QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  }
}

export function clearCustomQuestions(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CUSTOM_QUESTIONS_STORAGE_KEY);
  }
}

export function getSampleQuestionTemplateJSON(): string {
  const sample = [
    {
      id: "custom_q_01",
      type: "know_it",
      category: "knowledge",
      difficulty: "medium",
      points: 10,
      question: "Which traditional water conservation system is famously built with stepped stone galleries?",
      options: [
        { id: "a", text: "Baoli (Stepwell)", isCorrect: true },
        { id: "b", text: "Suspension Bridge", isCorrect: false },
        { id: "c", text: "Granite Obelisk", isCorrect: false },
        { id: "d", text: "Windmill Tower", isCorrect: false }
      ],
      hint: "Look for subterranean stone structures that allowed communities to reach groundwater.",
      feedbackCorrect: "Correct! Baolis combined hydrological engineering with community architecture.",
      feedbackIncorrect: "Look closer at historical groundwater harvesting structures in arid regions.",
      explanation: "Stepwells (Baolis) were communal engineering structures preserving water in Gujarat and Rajasthan."
    }
  ];
  return JSON.stringify(sample, null, 2);
}
