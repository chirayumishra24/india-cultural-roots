export type TeamId = 'teamA' | 'teamB';

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

export type ChallengeCategoryType =
  | 'know_it'
  | 'find_it'
  | 'root_it'
  | 'connect_it'
  | 'build_it'
  | 'show_it'
  | 'think_it'
  | 'blitz';

export type GamePhase =
  | 'intro'
  | 'team_setup'
  | 'playing'
  | 'steal_opportunity'
  | 'final_mystery'
  | 'living_culture'
  | 'results'
  | 'reflection';

export interface GameSettings {
  soundEnabled: boolean;
  timerEnabled: boolean;
  isPaused: boolean;
}

export interface SkillPracticeLog {
  observation: number;
  connection: number;
  reasoning: number;
  evidence: number;
  sequencing: number;
  communication: number;
}
