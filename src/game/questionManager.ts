import { QuizChallengeData } from '../types/challenges';
import { QUIZ_QUESTIONS } from '../data/questions';
import { getCustomQuestions } from './contentImporter';

export class QuestionManager {
  private usedIds: Set<string> = new Set();

  private getActivePool(): QuizChallengeData[] {
    const custom = getCustomQuestions();
    if (custom && custom.length > 0) {
      return custom;
    }
    return [...QUIZ_QUESTIONS];
  }

  public getNextQuizQuestion(): QuizChallengeData {
    const pool = this.getActivePool();
    const available = pool.filter(q => !this.usedIds.has(q.id));
    if (available.length === 0) {
      this.usedIds.clear();
      return pool[Math.floor(Math.random() * pool.length)];
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];
    this.usedIds.add(chosen.id);
    return chosen;
  }

  public markQuestionUsed(id: string) {
    this.usedIds.add(id);
  }

  public isQuestionUsed(id: string): boolean {
    return this.usedIds.has(id);
  }

  public getUsedCount(): number {
    return this.usedIds.size;
  }

  public reset() {
    this.usedIds.clear();
  }
}

export const questionManager = new QuestionManager();
