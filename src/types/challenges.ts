import { ChallengeCategoryType } from './game';

export type CulturalCategory =
  | 'language'
  | 'stories'
  | 'arts'
  | 'music'
  | 'knowledge'
  | 'practices'
  | 'heritage';

export interface BaseChallenge {
  id: string;
  type: ChallengeCategoryType;
  category: CulturalCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hint: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  clueTitle?: string;
  clueImage?: string;
  badgeText?: string;
}

export interface QuizChallengeData extends BaseChallenge {
  type: 'know_it';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface FindItChallengeData extends BaseChallenge {
  type: 'find_it';
  clueText: string;
  investigationClues: string[];
  evidenceQuestion: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  interpretationConclusion: string;
}

export interface RootItChallengeData extends BaseChallenge {
  type: 'root_it';
  artifactDescription: string;
  question: string;
  rootOptions: {
    id: CulturalCategory;
    name: string;
    description: string;
    isCorrect: boolean;
  }[];
  educationalNote: string;
}

export interface ConnectItChallengeData extends BaseChallenge {
  type: 'connect_it';
  prompt: string;
  itemsToConnect: {
    id: string;
    label: string;
    category: CulturalCategory;
    iconName: string;
  }[];
  validPairIds: [string, string];
  relationshipExplanation: string;
}

export interface BuildItItem {
  id: string;
  title: string;
  step: string;
  order: number;
}

export interface BuildItChallengeData extends BaseChallenge {
  type: 'build_it';
  scenarioTitle: string;
  instruction: string;
  items: BuildItItem[];
  pedagogicalInsight: string;
}

export interface ShowItChallengeData extends BaseChallenge {
  type: 'show_it';
  actionPrompt: string;
  mode: 'act' | 'draw' | 'describe' | 'symbol';
  secretConcept: string;
  targetCategory: CulturalCategory;
  optionsForGuessers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  reflectionQuestion: string;
  reflectionOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface ThinkItChallengeData extends BaseChallenge {
  type: 'think_it';
  scenario: string;
  clues: string[];
  inquiry: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  reasoningDebrief: string;
}

export interface BlitzItem {
  id: string;
  cardName: string;
  description: string;
  correctCategory: CulturalCategory;
}

export interface BlitzChallengeData extends BaseChallenge {
  type: 'blitz';
  deck: BlitzItem[];
}

export interface MysteryClue {
  id: string;
  title: string;
  detail: string;
  icon: string;
}

export interface MysteryChallengeData {
  id: string;
  title: string;
  scenario: string;
  clues: MysteryClue[];
  eliminations: {
    id: string;
    claim: string;
    isSupported: boolean;
    reason: string;
  }[];
  finalSynthesisQuestion: string;
  synthesisOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  treeRestorationImpact: string;
}
