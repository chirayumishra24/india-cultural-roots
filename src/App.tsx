import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TopHeader } from './components/layout/TopHeader';
import { DiscoveryProgressBottom } from './components/layout/DiscoveryProgressBottom';
import { TeamPanel } from './components/teams/TeamPanel';
import { CulturalWorld3D } from './components/world/CulturalWorld3D';
import { MapRouteView } from './components/world/MapRouteView';

// Modals & Overlays
import { StartScreenModal } from './components/modals/StartScreenModal';
import { HowToPlayModal } from './components/modals/HowToPlayModal';
import { KnowledgeArchiveModal } from './components/modals/KnowledgeArchiveModal';
import { CulturalTreeModal } from './components/tree/CulturalTreeModal';
import { TeacherDashboardModal } from './components/modals/TeacherDashboardModal';
import { CountdownOverlay } from './components/modals/CountdownOverlay';
import { CompletionReviewModal } from './components/modals/CompletionReviewModal';

// Types & Data
import { TeamProgress, Question, GameStatus } from './types/game';
import { INITIAL_QUESTIONS } from './data/questionsData';
import { DISCOVERIES_LIST, getZoneForDiscovery } from './data/discoveriesData';
import { soundFx } from './game/audioEngine';

export const App: React.FC = () => {
  // Game Status
  const [gameStatus, setGameStatus] = useState<GameStatus>('setup');
  const [viewMode, setViewMode] = useState<'3d' | 'map'>('3d');
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Timer: 5 minutes (300 seconds default)
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(300);

  // Questions Database (allows teacher modification)
  const [questionsBank, setQuestionsBank] = useState<Question[]>(INITIAL_QUESTIONS);

  // Active Highlight Zone for Root Hint (1-6)
  const [activeHintZone, setActiveHintZone] = useState<number | null>(null);

  // Modals state
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [archiveModalTeam, setArchiveModalTeam] = useState<'teamKnowledge' | 'teamHeritage' | null>(null);

  // Missed Questions Tracker for Post-game Review
  const [missedQuestions, setMissedQuestions] = useState<Question[]>([]);

  // Helper to pick next question for a team based on target discovery
  const getNextQuestionForDiscovery = useCallback(
    (discoveryId: number, usedIds: string[]): Question => {
      const zone = getZoneForDiscovery(discoveryId);
      // Try to find questions in matching zone first
      const candidates = questionsBank.filter(
        (q) => !usedIds.includes(q.id) && getZoneForDiscovery(q.discoveryId).index === zone.index
      );
      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }
      // Fallback: any unused question
      const unused = questionsBank.filter((q) => !usedIds.includes(q.id));
      if (unused.length > 0) {
        return unused[Math.floor(Math.random() * unused.length)];
      }
      // Last resort: any question
      return questionsBank[Math.floor(Math.random() * questionsBank.length)];
    },
    [questionsBank]
  );

  // Team Knowledge (Blue) State
  const [teamKnowledge, setTeamKnowledge] = useState<TeamProgress>(() => {
    const firstQ = INITIAL_QUESTIONS[0];
    return {
      teamId: 'teamKnowledge',
      name: 'Team Knowledge',
      colorHex: '#2563EB',
      tagline: 'Explore • Learn • Discover',
      discoveries: 0,
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      currentZoneIndex: 1,
      currentQuestion: firstQ,
      selectedAnswer: null,
      streak: 0,
      maxStreak: 0,
      fiftyFiftyRemaining: 1,
      rootHintsRemaining: 2,
      eliminatedOptions: [],
      unlockedDiscoveries: [],
      isSubmitting: false,
      isDiscovering: false,
      latestUnlockedDiscovery: null,
      zoneTransitionBanner: null
    };
  });

  // Team Heritage (Orange) State
  const [teamHeritage, setTeamHeritage] = useState<TeamProgress>(() => {
    // Pick different question for Team B initially
    const secondQ = INITIAL_QUESTIONS[1] || INITIAL_QUESTIONS[0];
    return {
      teamId: 'teamHeritage',
      name: 'Team Heritage',
      colorHex: '#EA580C',
      tagline: 'Find • Analyse • Uncover',
      discoveries: 0,
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      currentZoneIndex: 1,
      currentQuestion: secondQ,
      selectedAnswer: null,
      streak: 0,
      maxStreak: 0,
      fiftyFiftyRemaining: 1,
      rootHintsRemaining: 2,
      eliminatedOptions: [],
      unlockedDiscoveries: [],
      isSubmitting: false,
      isDiscovering: false,
      latestUnlockedDiscovery: null,
      zoneTransitionBanner: null
    };
  });

  // Used Questions Tracker per team
  const usedQuestionsRef = useRef<{ teamA: string[]; teamB: string[] }>({
    teamA: [INITIAL_QUESTIONS[0]?.id || ''],
    teamB: [INITIAL_QUESTIONS[1]?.id || '']
  });

  // Sound Sync
  const handleToggleSound = () => {
    const isMuted = soundFx.toggleMuted();
    setIsSoundMuted(isMuted);
  };

  // Start Quest Click
  const handleStartQuest = () => {
    soundFx.playSelect();
    setGameStatus('countdown');
  };

  // Countdown Complete -> Play
  const handleCountdownComplete = () => {
    setGameStatus('playing');
  };

  // Game Timer Hook
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    if (timeRemainingSeconds <= 0) {
      soundFx.playCompletion();
      setGameStatus('finished');
      return;
    }

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev === 61) {
          // Final Minute alert
          soundFx.playCountdownBeep(true);
        }
        if (prev <= 1) {
          clearInterval(timer);
          soundFx.playCompletion();
          setGameStatus('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, timeRemainingSeconds]);

  // Finish game if either team reaches 20 discoveries
  useEffect(() => {
    if (gameStatus === 'playing') {
      if (teamKnowledge.discoveries >= 20 || teamHeritage.discoveries >= 20) {
        soundFx.playCompletion();
        setGameStatus('finished');
      }
    }
  }, [teamKnowledge.discoveries, teamHeritage.discoveries, gameStatus]);

  // ---------------- Team Submission Handlers (Strictly Independent) ----------------

  // Team Knowledge Answer Select
  const handleSelectAnswerA = (answer: any) => {
    setTeamKnowledge((prev) => ({ ...prev, selectedAnswer: answer }));
  };

  // Team Heritage Answer Select
  const handleSelectAnswerB = (answer: any) => {
    setTeamHeritage((prev) => ({ ...prev, selectedAnswer: answer }));
  };

  // Evaluate Answer Correctness
  const checkAnswerCorrectness = (q: Question, answer: any): boolean => {
    if (q.type === 'mcq' || q.type === 'true-false' || q.type === 'scenario') {
      return answer === q.correctAnswer;
    }
    if (q.type === 'match') {
      if (!q.pairs || !answer) return false;
      return q.pairs.every(
        (pair) => answer[pair.id] === pair.right || answer[pair.left] === pair.right
      );
    }
    if (q.type === 'sequence') {
      return true; // Guided sequence completion
    }
    if (q.type === 'sorting') {
      if (!q.sortItems || !answer) return false;
      return q.sortItems.every((item) => answer[item.id] === item.targetCategory);
    }
    return true;
  };

  // Submit Answer for Team Knowledge
  const handleSubmitAnswerA = (directAnswer?: any) => {
    const q = teamKnowledge.currentQuestion;
    if (!q || teamKnowledge.isSubmitting || teamKnowledge.isDiscovering) return;

    const isEvent =
      directAnswer &&
      typeof directAnswer === 'object' &&
      ('nativeEvent' in directAnswer || 'target' in directAnswer || 'preventDefault' in directAnswer);

    const answerToValidate =
      !isEvent && directAnswer !== undefined ? directAnswer : teamKnowledge.selectedAnswer;

    if (answerToValidate === null || answerToValidate === undefined) return;

    setTeamKnowledge((prev) => ({ ...prev, selectedAnswer: answerToValidate, isSubmitting: true }));
    const isCorrect = checkAnswerCorrectness(q, answerToValidate);

    if (isCorrect) {
      soundFx.playCorrect();
      const nextDiscoveryCount = teamKnowledge.discoveries + 1;
      const nextStreak = teamKnowledge.streak + 1;
      const streakBonus = nextStreak >= 3 ? 150 : 0;
      if (nextStreak === 3) soundFx.playKnowledgeChain();

      const unlockedDisc =
        DISCOVERIES_LIST[nextDiscoveryCount - 1] || DISCOVERIES_LIST[DISCOVERIES_LIST.length - 1];

      soundFx.playDiscoveryUnlock();

      // Check for Zone Transition
      const oldZone = getZoneForDiscovery(teamKnowledge.discoveries || 1);
      const newZone = getZoneForDiscovery(nextDiscoveryCount);
      const transitionText =
        newZone.index !== oldZone.index ? `Entering Zone ${newZone.index}: ${newZone.title}` : null;

      setTeamKnowledge((prev) => ({
        ...prev,
        discoveries: nextDiscoveryCount,
        score: prev.score + 100 + streakBonus,
        correctAnswers: prev.correctAnswers + 1,
        totalAnswers: prev.totalAnswers + 1,
        streak: nextStreak,
        maxStreak: Math.max(prev.maxStreak, nextStreak),
        unlockedDiscoveries: [...prev.unlockedDiscoveries, unlockedDisc.id],
        isDiscovering: true,
        latestUnlockedDiscovery: unlockedDisc,
        zoneTransitionBanner: transitionText
      }));

      // Non-blocking timer to close discovery card and load next question
      setTimeout(() => {
        const nextDiscToAim = nextDiscoveryCount + 1;
        const nextQ = getNextQuestionForDiscovery(
          nextDiscToAim,
          usedQuestionsRef.current.teamA
        );
        usedQuestionsRef.current.teamA.push(nextQ.id);

        setTeamKnowledge((prev) => ({
          ...prev,
          currentQuestion: nextQ,
          selectedAnswer: null,
          eliminatedOptions: [],
          isSubmitting: false,
          isDiscovering: false,
          latestUnlockedDiscovery: null,
          zoneTransitionBanner: null
        }));
      }, 2600);
    } else {
      // Incorrect
      soundFx.playIncorrect();
      setMissedQuestions((prev) => [...prev, q]);
      setTeamKnowledge((prev) => ({
        ...prev,
        totalAnswers: prev.totalAnswers + 1,
        streak: 0,
        isSubmitting: false
      }));
    }
  };

  // Submit Answer for Team Heritage
  const handleSubmitAnswerB = (directAnswer?: any) => {
    const q = teamHeritage.currentQuestion;
    if (!q || teamHeritage.isSubmitting || teamHeritage.isDiscovering) return;

    const isEvent =
      directAnswer &&
      typeof directAnswer === 'object' &&
      ('nativeEvent' in directAnswer || 'target' in directAnswer || 'preventDefault' in directAnswer);

    const answerToValidate =
      !isEvent && directAnswer !== undefined ? directAnswer : teamHeritage.selectedAnswer;

    if (answerToValidate === null || answerToValidate === undefined) return;

    setTeamHeritage((prev) => ({ ...prev, selectedAnswer: answerToValidate, isSubmitting: true }));
    const isCorrect = checkAnswerCorrectness(q, answerToValidate);

    if (isCorrect) {
      soundFx.playCorrect();
      const nextDiscoveryCount = teamHeritage.discoveries + 1;
      const nextStreak = teamHeritage.streak + 1;
      const streakBonus = nextStreak >= 3 ? 150 : 0;
      if (nextStreak === 3) soundFx.playKnowledgeChain();

      const unlockedDisc =
        DISCOVERIES_LIST[nextDiscoveryCount - 1] || DISCOVERIES_LIST[DISCOVERIES_LIST.length - 1];

      soundFx.playDiscoveryUnlock();

      const oldZone = getZoneForDiscovery(teamHeritage.discoveries || 1);
      const newZone = getZoneForDiscovery(nextDiscoveryCount);
      const transitionText =
        newZone.index !== oldZone.index ? `Entering Zone ${newZone.index}: ${newZone.title}` : null;

      setTeamHeritage((prev) => ({
        ...prev,
        discoveries: nextDiscoveryCount,
        score: prev.score + 100 + streakBonus,
        correctAnswers: prev.correctAnswers + 1,
        totalAnswers: prev.totalAnswers + 1,
        streak: nextStreak,
        maxStreak: Math.max(prev.maxStreak, nextStreak),
        unlockedDiscoveries: [...prev.unlockedDiscoveries, unlockedDisc.id],
        isDiscovering: true,
        latestUnlockedDiscovery: unlockedDisc,
        zoneTransitionBanner: transitionText
      }));

      setTimeout(() => {
        const nextDiscToAim = nextDiscoveryCount + 1;
        const nextQ = getNextQuestionForDiscovery(
          nextDiscToAim,
          usedQuestionsRef.current.teamB
        );
        usedQuestionsRef.current.teamB.push(nextQ.id);

        setTeamHeritage((prev) => ({
          ...prev,
          currentQuestion: nextQ,
          selectedAnswer: null,
          eliminatedOptions: [],
          isSubmitting: false,
          isDiscovering: false,
          latestUnlockedDiscovery: null,
          zoneTransitionBanner: null
        }));
      }, 2600);
    } else {
      soundFx.playIncorrect();
      setMissedQuestions((prev) => [...prev, q]);
      setTeamHeritage((prev) => ({
        ...prev,
        totalAnswers: prev.totalAnswers + 1,
        streak: 0,
        isSubmitting: false
      }));
    }
  };

  // ---------------- Power-Up Handlers ----------------

  // Team Knowledge 50/50
  const handleUseFiftyFiftyA = () => {
    const q = teamKnowledge.currentQuestion;
    if (!q || q.type !== 'mcq' || teamKnowledge.fiftyFiftyRemaining <= 0) return;
    soundFx.playSelect();

    const correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
    const incorrectIndices = [0, 1, 2, 3].filter((i) => i !== correctIdx);
    const eliminated = incorrectIndices.slice(0, 2);

    setTeamKnowledge((prev) => ({
      ...prev,
      fiftyFiftyRemaining: prev.fiftyFiftyRemaining - 1,
      eliminatedOptions: eliminated
    }));
  };

  // Team Heritage 50/50
  const handleUseFiftyFiftyB = () => {
    const q = teamHeritage.currentQuestion;
    if (!q || q.type !== 'mcq' || teamHeritage.fiftyFiftyRemaining <= 0) return;
    soundFx.playSelect();

    const correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
    const incorrectIndices = [0, 1, 2, 3].filter((i) => i !== correctIdx);
    const eliminated = incorrectIndices.slice(0, 2);

    setTeamHeritage((prev) => ({
      ...prev,
      fiftyFiftyRemaining: prev.fiftyFiftyRemaining - 1,
      eliminatedOptions: eliminated
    }));
  };

  // Team Knowledge Root Hint (Highlights Central Zone)
  const handleUseRootHintA = () => {
    const q = teamKnowledge.currentQuestion;
    if (!q || teamKnowledge.rootHintsRemaining <= 0) return;
    soundFx.playRootHint();

    const zone = getZoneForDiscovery(q.discoveryId);
    setActiveHintZone(zone.index);

    setTeamKnowledge((prev) => ({
      ...prev,
      rootHintsRemaining: prev.rootHintsRemaining - 1
    }));

    setTimeout(() => {
      setActiveHintZone(null);
    }, 4500);
  };

  // Team Heritage Root Hint
  const handleUseRootHintB = () => {
    const q = teamHeritage.currentQuestion;
    if (!q || teamHeritage.rootHintsRemaining <= 0) return;
    soundFx.playRootHint();

    const zone = getZoneForDiscovery(q.discoveryId);
    setActiveHintZone(zone.index);

    setTeamHeritage((prev) => ({
      ...prev,
      rootHintsRemaining: prev.rootHintsRemaining - 1
    }));

    setTimeout(() => {
      setActiveHintZone(null);
    }, 4500);
  };

  // Reset Quest
  const handlePlayAgain = () => {
    setTimeRemainingSeconds(300);
    usedQuestionsRef.current = {
      teamA: [INITIAL_QUESTIONS[0]?.id || ''],
      teamB: [INITIAL_QUESTIONS[1]?.id || '']
    };
    setMissedQuestions([]);

    setTeamKnowledge({
      teamId: 'teamKnowledge',
      name: 'Team Knowledge',
      colorHex: '#2563EB',
      tagline: 'Explore • Learn • Discover',
      discoveries: 0,
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      currentZoneIndex: 1,
      currentQuestion: INITIAL_QUESTIONS[0],
      selectedAnswer: null,
      streak: 0,
      maxStreak: 0,
      fiftyFiftyRemaining: 1,
      rootHintsRemaining: 2,
      eliminatedOptions: [],
      unlockedDiscoveries: [],
      isSubmitting: false,
      isDiscovering: false,
      latestUnlockedDiscovery: null,
      zoneTransitionBanner: null
    });

    setTeamHeritage({
      teamId: 'teamHeritage',
      name: 'Team Heritage',
      colorHex: '#EA580C',
      tagline: 'Find • Analyse • Uncover',
      discoveries: 0,
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      currentZoneIndex: 1,
      currentQuestion: INITIAL_QUESTIONS[1] || INITIAL_QUESTIONS[0],
      selectedAnswer: null,
      streak: 0,
      maxStreak: 0,
      fiftyFiftyRemaining: 1,
      rootHintsRemaining: 2,
      eliminatedOptions: [],
      unlockedDiscoveries: [],
      isSubmitting: false,
      isDiscovering: false,
      latestUnlockedDiscovery: null,
      zoneTransitionBanner: null
    });

    setGameStatus('countdown');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-[#EBF5FF] via-[#F4F9FF] to-[#E6F0FA] flex flex-col justify-between p-3 gap-2.5 font-sans">
      {/* 1. Top Header */}
      <TopHeader
        totalDiscoveries={20}
        teamADiscoveries={teamKnowledge.discoveries}
        teamBDiscoveries={teamHeritage.discoveries}
        timeRemainingSeconds={timeRemainingSeconds}
        viewMode={viewMode}
        onToggleViewMode={(m) => {
          soundFx.playSelect();
          setViewMode(m);
        }}
        onOpenTreeModal={() => {
          soundFx.playSelect();
          setIsTreeModalOpen(true);
        }}
        onOpenTeacherModal={() => {
          soundFx.playSelect();
          setIsTeacherModalOpen(true);
        }}
        onOpenHelpModal={() => {
          soundFx.playSelect();
          setIsHowToPlayOpen(true);
        }}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* 2. Main Classroom Split Arena: 30% Left | 40% Center World | 30% Right */}
      <main className="flex-1 w-full grid grid-cols-12 gap-3 min-h-0 overflow-hidden">
        {/* Left Arena: Team Knowledge (Blue) - 30% ~ col-span-3 or 4 */}
        <section className="col-span-12 lg:col-span-4 xl:col-span-4 h-full min-h-0">
          <TeamPanel
            team={teamKnowledge}
            onSelectAnswer={handleSelectAnswerA}
            onSubmitAnswer={handleSubmitAnswerA}
            onUseFiftyFifty={handleUseFiftyFiftyA}
            onUseRootHint={handleUseRootHintA}
            onOpenArchive={() => {
              soundFx.playSelect();
              setArchiveModalTeam('teamKnowledge');
            }}
          />
        </section>

        {/* Center Arena: 3D Miniature Cultural Diorama / Map View - 40% */}
        <section className="col-span-12 lg:col-span-4 xl:col-span-4 h-full min-h-0 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white/70 isolate z-0">
          {viewMode === '3d' ? (
            <CulturalWorld3D
              teamADiscoveries={teamKnowledge.discoveries}
              teamBDiscoveries={teamHeritage.discoveries}
              activeHintZoneIndex={activeHintZone}
              showBadges={gameStatus === 'playing'}
            />
          ) : (
            <MapRouteView
              unlockedTeamA={teamKnowledge.unlockedDiscoveries}
              unlockedTeamB={teamHeritage.unlockedDiscoveries}
              teamADiscoveries={teamKnowledge.discoveries}
              teamBDiscoveries={teamHeritage.discoveries}
              onSelectZone={(zoneIdx) => {
                soundFx.playSelect();
                setActiveHintZone(zoneIdx);
                setTimeout(() => setActiveHintZone(null), 3000);
              }}
            />
          )}
        </section>

        {/* Right Arena: Team Heritage (Orange) - 30% ~ col-span-3 or 4 */}
        <section className="col-span-12 lg:col-span-4 xl:col-span-4 h-full min-h-0">
          <TeamPanel
            team={teamHeritage}
            onSelectAnswer={handleSelectAnswerB}
            onSubmitAnswer={handleSubmitAnswerB}
            onUseFiftyFifty={handleUseFiftyFiftyB}
            onUseRootHint={handleUseRootHintB}
            onOpenArchive={() => {
              soundFx.playSelect();
              setArchiveModalTeam('teamHeritage');
            }}
          />
        </section>
      </main>

      {/* 3. Bottom Discovery Progress Bar */}
      <DiscoveryProgressBottom
        teamKnowledge={teamKnowledge}
        teamHeritage={teamHeritage}
        onZoneClick={(zoneIdx) => {
          soundFx.playSelect();
          setActiveHintZone(zoneIdx);
          setTimeout(() => setActiveHintZone(null), 3000);
        }}
      />

      {/* Modals & Overlays */}
      <StartScreenModal
        isOpen={gameStatus === 'setup'}
        onStart={handleStartQuest}
        onOpenHowToPlay={() => {
          soundFx.playSelect();
          setIsHowToPlayOpen(true);
        }}
        onOpenTeacher={() => {
          soundFx.playSelect();
          setIsTeacherModalOpen(true);
        }}
      />

      {gameStatus === 'countdown' && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <KnowledgeArchiveModal
        isOpen={archiveModalTeam !== null}
        onClose={() => setArchiveModalTeam(null)}
        teamName={
          archiveModalTeam === 'teamKnowledge' ? teamKnowledge.name : teamHeritage.name
        }
        isBlueTeam={archiveModalTeam === 'teamKnowledge'}
        unlockedDiscoveryIds={
          archiveModalTeam === 'teamKnowledge'
            ? teamKnowledge.unlockedDiscoveries
            : teamHeritage.unlockedDiscoveries
        }
      />

      <CulturalTreeModal
        isOpen={isTreeModalOpen}
        onClose={() => setIsTreeModalOpen(false)}
        unlockedDiscoveriesTeamA={teamKnowledge.unlockedDiscoveries}
        unlockedDiscoveriesTeamB={teamHeritage.unlockedDiscoveries}
      />

      <TeacherDashboardModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        questions={questionsBank}
        onUpdateQuestions={(qs) => setQuestionsBank(qs)}
      />

      <CompletionReviewModal
        isOpen={gameStatus === 'finished'}
        onPlayAgain={handlePlayAgain}
        teamKnowledge={teamKnowledge}
        teamHeritage={teamHeritage}
        missedQuestions={missedQuestions}
      />
    </div>
  );
};

export default App;
