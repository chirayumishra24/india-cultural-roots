import { TeamScore, TeamId } from '../types/game';
import { CulturalCategory } from '../types/challenges';

export const INITIAL_TEAM_SCORE: TeamScore = {
  points: 0,
  tokens: {
    root: 0,
    knowledge: 0,
    heritage: 0,
    connection: 0,
    insight: 0
  }
};

export type TokenType = 'root' | 'knowledge' | 'heritage' | 'connection' | 'insight';

export function calculateTokenReward(
  challengeType: string,
  category: CulturalCategory
): TokenType {
  if (challengeType === 'root_it') return 'root';
  if (challengeType === 'connect_it') return 'connection';
  if (challengeType === 'think_it' || challengeType === 'find_it') return 'insight';
  if (category === 'knowledge') return 'knowledge';
  if (category === 'heritage' || category === 'arts') return 'heritage';
  return 'knowledge';
}

export function awardPointsAndToken(
  currentScore: TeamScore,
  pointsToAdd: number,
  tokenType: TokenType
): TeamScore {
  return {
    points: currentScore.points + pointsToAdd,
    tokens: {
      ...currentScore.tokens,
      [tokenType]: currentScore.tokens[tokenType] + 1
    }
  };
}

export function awardSteal(currentScore: TeamScore): TeamScore {
  return {
    points: currentScore.points + 5,
    tokens: {
      ...currentScore.tokens,
      insight: currentScore.tokens.insight + 1
    }
  };
}

export function getWinningTeam(
  teamAScore: TeamScore,
  teamBScore: TeamScore,
  teamAName: string,
  teamBName: string
): { winner: TeamId | 'tie'; winnerName: string; margin: number } {
  if (teamAScore.points > teamBScore.points) {
    return { winner: 'teamA', winnerName: teamAName, margin: teamAScore.points - teamBScore.points };
  } else if (teamBScore.points > teamAScore.points) {
    return { winner: 'teamB', winnerName: teamBName, margin: teamBScore.points - teamAScore.points };
  } else {
    return { winner: 'tie', winnerName: "It's a Tie!", margin: 0 };
  }
}
