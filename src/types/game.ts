export type TeamId = 'teamKnowledge' | 'teamHeritage' | 'teamA' | 'teamB';

export type ChallengeCategoryType =
  | 'know_it'
  | 'find_it'
  | 'root_it'
  | 'connect_it'
  | 'build_it'
  | 'show_it'
  | 'think_it'
  | 'blitz';

export interface TeamScore {
  points: number;
  tokens: {
    root: number;
    knowledge: number;
    heritage: number;
    connection: number;
    insight: number;
  };
}

export interface SkillPracticeLog {
  observation: number;
  connection: number;
  reasoning: number;
  evidence: number;
  sequencing: number;
  communication: number;
}

export type QuestionType =
  | 'mcq'
  | 'match'
  | 'image'
  | 'true-false'
  | 'sequence'
  | 'sorting'
  | 'scenario';

export type QuestionCategory =
  | 'vedic-culture'
  | 'upanishads'
  | 'vedanta-yoga'
  | 'buddhism'
  | 'jainism'
  | 'folk-traditions'
  | 'tribal-traditions'
  | 'shared-heritage';

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface SortItem {
  id: string;
  label: string;
  targetCategory: string;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  discoveryId: number; // 1 to 20
  discoveryTitle: string;
  discoveryDescription: string;

  options?: string[];
  correctAnswer?: string | number;
  image?: string;
  pairs?: MatchPair[];
  sequenceItems?: string[];
  sortItems?: SortItem[];
  sortBuckets?: string[];
  scenarioContext?: string;
}

export interface Discovery {
  id: number;
  zoneIndex: number;
  zoneTitle: string;
  title: string;
  category: QuestionCategory;
  shortExplanation: string;
  detailedInsight: string;
  keyConcepts: string[];
  iconName: string;
  symbol: string;
}

export interface CulturalZone {
  index: number;
  title: string;
  shortTitle: string;
  range: string;
  startDiscovery: number;
  endDiscovery: number;
  description: string;
  keyThemes: string[];
  color: string;
  accentBg: string;
  landmarkName: string;
}

export type GameStatus =
  | 'setup'
  | 'instructions'
  | 'countdown'
  | 'playing'
  | 'finished'
  | 'review';

export interface TeamProgress {
  teamId: 'teamKnowledge' | 'teamHeritage';
  name: string;
  colorHex: string;
  tagline: string;

  discoveries: number;
  score: number;

  correctAnswers: number;
  totalAnswers: number;

  currentZoneIndex: number;
  currentQuestion: Question | null;
  selectedAnswer: any;

  streak: number;
  maxStreak: number;

  fiftyFiftyRemaining: number;
  rootHintsRemaining: number;
  eliminatedOptions: number[];

  unlockedDiscoveries: number[];

  isSubmitting: boolean;
  isDiscovering: boolean;
  latestUnlockedDiscovery: Discovery | null;
  zoneTransitionBanner: string | null;
}
