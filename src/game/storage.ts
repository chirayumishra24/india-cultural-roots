const STORAGE_KEYS = {
  TEAM_A_NAME: 'culture_quest_team_a',
  TEAM_B_NAME: 'culture_quest_team_b',
  SOUND_ENABLED: 'culture_quest_sound',
  TIMER_ENABLED: 'culture_quest_timer',
};

export const getSavedTeamNames = (): { teamA: string; teamB: string } => {
  if (typeof window === 'undefined') {
    return { teamA: 'Root Seekers', teamB: 'Culture Keepers' };
  }
  const teamA = localStorage.getItem(STORAGE_KEYS.TEAM_A_NAME) || 'Root Seekers';
  const teamB = localStorage.getItem(STORAGE_KEYS.TEAM_B_NAME) || 'Culture Keepers';
  return { teamA, teamB };
};

export const saveTeamNames = (teamA: string, teamB: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TEAM_A_NAME, teamA);
    localStorage.setItem(STORAGE_KEYS.TEAM_B_NAME, teamB);
  }
};

export const getSavedSoundPreference = (): boolean => {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
  return val !== null ? val === 'true' : true;
};

export const saveSoundPreference = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
  }
};

export const getSavedTimerPreference = (): boolean => {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem(STORAGE_KEYS.TIMER_ENABLED);
  return val !== null ? val === 'true' : true;
};

export const saveTimerPreference = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TIMER_ENABLED, String(enabled));
  }
};
