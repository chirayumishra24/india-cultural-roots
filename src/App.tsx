import React, { useState, useEffect, useCallback } from 'react';
import { BoardBackground } from './components/layout/BoardBackground';
import { TopHeader } from './components/layout/TopHeader';
import { ChallengeSelectorBar } from './components/layout/ChallengeSelectorBar';
import { TeamPanel } from './components/teams/TeamPanel';
import { TeamMascot } from './components/teams/TeamMascot';
import { TreeProgressWidget } from './components/teams/TreeProgressWidget';
import { CulturalRootsTree } from './components/tree/CulturalRootsTree';
import { HeritageDiscoveryCard } from './components/cards/HeritageDiscoveryCard';
import { CardInspectModal } from './components/cards/CardInspectModal';
import { TokenFlyEffect } from './components/tree/TokenFlyEffect';

// Challenges
import { KnowItChallenge } from './components/challenges/KnowItChallenge';
import { FindItChallenge } from './components/challenges/FindItChallenge';
import { RootItChallenge } from './components/challenges/RootItChallenge';
import { ConnectItChallenge } from './components/challenges/ConnectItChallenge';
import { BuildItChallenge } from './components/challenges/BuildItChallenge';
import { ShowItChallenge } from './components/challenges/ShowItChallenge';
import { ThinkItChallenge } from './components/challenges/ThinkItChallenge';
import { BlitzChallenge } from './components/challenges/BlitzChallenge';
import { MysteryChallenge } from './components/challenges/MysteryChallenge';

// Modals & Panels
import { IntroModal } from './components/modals/IntroModal';
import { TeamSetupModal } from './components/modals/TeamSetupModal';
import { TeacherPanelModal } from './components/modals/TeacherPanelModal';
import { StealModal } from './components/modals/StealModal';
import { LivingCultureModal } from './components/modals/LivingCultureModal';
import { ResultsModal } from './components/modals/ResultsModal';
import { ReflectionModal } from './components/modals/ReflectionModal';
import { SubBranchExploreModal } from './components/tree/SubBranchExploreModal';
import { RegionalTapestryDrawer } from './components/layout/RegionalTapestryDrawer';

// Data & Logic
import { TeamId, TeamScore, ChallengeCategoryType, GamePhase, SkillPracticeLog } from './types/game';
import { CulturalTreeNode, HeritageDiscoveryCardData } from './types/tree';
import { INITIAL_TREE_NODES } from './data/roots';
import { INITIAL_HERITAGE_CARDS } from './data/culturalCards';
import {
  FIND_IT_CHALLENGES,
  ROOT_IT_CHALLENGES,
  CONNECT_IT_CHALLENGES,
  BUILD_IT_CHALLENGES,
  SHOW_IT_CHALLENGES,
  THINK_IT_CHALLENGES,
  BLITZ_ITEMS,
  CHALLENGE_CATEGORIES,
} from './data/challenges';
import { FINAL_CULTURAL_MYSTERY } from './data/mysteries';
import { questionManager } from './game/questionManager';
import { awardPointsAndToken, awardSteal, INITIAL_TEAM_SCORE, TokenType } from './game/scoring';
import { soundFx } from './game/audioEngine';
import {
  getSavedTeamNames,
  saveTeamNames,
  getSavedSoundPreference,
  saveSoundPreference,
  getSavedTimerPreference,
  saveTimerPreference,
} from './game/storage';

export const App: React.FC = () => {
  // Game Phase & Navigation
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = 8;
  const [activeTeam, setActiveTeam] = useState<TeamId>('teamA');

  // Teams & Scores
  const [teamNames, setTeamNames] = useState(getSavedTeamNames);
  const [teamAScore, setTeamAScore] = useState<TeamScore>(INITIAL_TEAM_SCORE);
  const [teamBScore, setTeamBScore] = useState<TeamScore>(INITIAL_TEAM_SCORE);

  // Tree & Cards State
  const [treeNodes, setTreeNodes] = useState<CulturalTreeNode[]>(INITIAL_TREE_NODES);
  const [heritageCards, setHeritageCards] = useState<HeritageDiscoveryCardData[]>(INITIAL_HERITAGE_CARDS);
  const [inspectedCard, setInspectedCard] = useState<HeritageDiscoveryCardData | null>(null);
  const [selectedExploreNode, setSelectedExploreNode] = useState<CulturalTreeNode | null>(null);
  const [regionalDrawerOpen, setRegionalDrawerOpen] = useState(false);
  const [activeFlyToken, setActiveFlyToken] = useState<TokenType | null>(null);

  // Selected Challenge Category
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategoryType>('root_it');

  // Active Challenge Data Instances
  const [quizData, setQuizData] = useState(() => questionManager.getNextQuizQuestion());
  const [findItData, setFindItData] = useState(() => FIND_IT_CHALLENGES[0]);
  const [rootItData, setRootItData] = useState(() => ROOT_IT_CHALLENGES[0]);
  const [connectItData, setConnectItData] = useState(() => CONNECT_IT_CHALLENGES[0]);
  const [buildItData, setBuildItData] = useState(() => BUILD_IT_CHALLENGES[0]);
  const [showItData, setShowItData] = useState(() => SHOW_IT_CHALLENGES[0]);
  const [thinkItData, setThinkItData] = useState(() => THINK_IT_CHALLENGES[0]);

  // Timers & Settings
  const [soundEnabled, setSoundEnabled] = useState(getSavedSoundPreference);
  const [timerEnabled, setTimerEnabled] = useState(getSavedTimerPreference);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Steal Modal State
  const [stealActive, setStealActive] = useState(false);

  // Teacher Panel Modal State
  const [teacherPanelOpen, setTeacherPanelOpen] = useState(false);

  // Learning Skills Practice Tracker
  const [skillsLog, setSkillsLog] = useState<SkillPracticeLog>({
    observation: 0,
    connection: 0,
    reasoning: 0,
    evidence: 0,
    sequencing: 0,
    communication: 0,
  });

  // Keep soundFx in sync with state
  useEffect(() => {
    soundFx.setMuted(!soundEnabled);
  }, [soundEnabled]);

  // Timer countdown hook
  useEffect(() => {
    if (phase !== 'playing' || !timerEnabled || isPaused || stealActive) return;
    if (timeLeft <= 0) {
      // Time expired: advance turn
      soundFx.playIncorrect();
      switchTurn();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, timerEnabled, isPaused, stealActive, timeLeft]);

  // Reset timer on category change
  const resetTimerForCategory = useCallback((catType: ChallengeCategoryType) => {
    const meta = CHALLENGE_CATEGORIES.find((c) => c.type === catType);
    setTimeLeft(meta ? meta.defaultTimeSeconds : 30);
  }, []);

  // Handle Team switching & Round advancement
  const switchTurn = useCallback(() => {
    setActiveTeam((prev) => (prev === 'teamA' ? 'teamB' : 'teamA'));
    setCurrentRound((prevRound) => {
      const nextRound = prevRound + 1;
      if (nextRound > maxRounds) {
        setPhase('final_mystery');
        return maxRounds;
      }
      return nextRound;
    });

    // Pick next challenge category cyclically or randomize
    const nextCatIndex = (CHALLENGE_CATEGORIES.findIndex((c) => c.type === selectedCategory) + 1) % CHALLENGE_CATEGORIES.length;
    const nextCat = CHALLENGE_CATEGORIES[nextCatIndex].type;
    setSelectedCategory(nextCat);
    resetTimerForCategory(nextCat);

    // Refresh questions and rotate other challenges
    setQuizData(questionManager.getNextQuizQuestion());
    setFindItData(FIND_IT_CHALLENGES[Math.floor(Math.random() * FIND_IT_CHALLENGES.length)]);
    setRootItData(ROOT_IT_CHALLENGES[Math.floor(Math.random() * ROOT_IT_CHALLENGES.length)]);
    setConnectItData(CONNECT_IT_CHALLENGES[Math.floor(Math.random() * CONNECT_IT_CHALLENGES.length)]);
    setBuildItData(BUILD_IT_CHALLENGES[Math.floor(Math.random() * BUILD_IT_CHALLENGES.length)]);
    setShowItData(SHOW_IT_CHALLENGES[Math.floor(Math.random() * SHOW_IT_CHALLENGES.length)]);
    setThinkItData(THINK_IT_CHALLENGES[Math.floor(Math.random() * THINK_IT_CHALLENGES.length)]);
  }, [maxRounds, selectedCategory, resetTimerForCategory]);

  // Discovered roots counter
  const discoveredRootsCount = treeNodes.filter((n) => n.isDiscovered).length;

  // Mark a cultural category as discovered on the tree
  const activateTreeNode = (categoryId: string) => {
    setTreeNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === categoryId
          ? {
              ...node,
              isDiscovered: true,
              discoveredCount: node.discoveredCount + 1,
            }
          : node
      )
    );

    // Unlock corresponding card
    setHeritageCards((prevCards) =>
      prevCards.map((card) =>
        card.connectedNodeId === categoryId
          ? { ...card, isDiscovered: true }
          : card
      )
    );
  };

  // Generic Challenge Answer Handler
  const handleChallengeAnswer = (
    isCorrect: boolean,
    categoryId: string,
    points: number,
    tokenType: TokenType,
    skillArea: keyof SkillPracticeLog
  ) => {
    // Log skill practice
    setSkillsLog((prev) => ({ ...prev, [skillArea]: prev[skillArea] + 1 }));

    if (isCorrect) {
      soundFx.playCorrect();
      setActiveFlyToken(tokenType);
      activateTreeNode(categoryId);

      if (activeTeam === 'teamA') {
        setTeamAScore((prev) => awardPointsAndToken(prev, points, tokenType));
      } else {
        setTeamBScore((prev) => awardPointsAndToken(prev, points, tokenType));
      }

      setTimeout(() => {
        switchTurn();
      }, 1400);
    } else {
      soundFx.playIncorrect();
      // If quiz question and answered wrong -> Offer steal opportunity!
      if (selectedCategory === 'know_it') {
        setStealActive(true);
      } else {
        setTimeout(() => {
          switchTurn();
        }, 1200);
      }
    }
  };

  // Steal Attempt Handler
  const handleStealResult = (isCorrect: boolean) => {
    setStealActive(false);
    const stealingTeam = activeTeam === 'teamA' ? 'teamB' : 'teamA';

    if (isCorrect) {
      soundFx.playCorrect();
      if (stealingTeam === 'teamA') {
        setTeamAScore((prev) => awardSteal(prev));
      } else {
        setTeamBScore((prev) => awardSteal(prev));
      }
      setSkillsLog((prev) => ({ ...prev, reasoning: prev.reasoning + 1 }));
    } else {
      soundFx.playIncorrect();
    }

    switchTurn();
  };

  // Final Mystery Answer Handler
  const handleFinalMysteryAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      soundFx.playCorrect();
      if (activeTeam === 'teamA') {
        setTeamAScore((prev) => awardPointsAndToken(prev, 25, 'root'));
      } else {
        setTeamBScore((prev) => awardPointsAndToken(prev, 25, 'root'));
      }
      // Trigger all tree nodes discovered
      setTreeNodes((prev) => prev.map((n) => ({ ...n, isDiscovered: true })));
      setPhase('living_culture');
    } else {
      soundFx.playIncorrect();
      setPhase('living_culture');
    }
  };

  // Start Quest after Team Setup
  const handleTeamSetupConfirm = (aName: string, bName: string) => {
    setTeamNames({ teamA: aName, teamB: bName });
    saveTeamNames(aName, bName);
    setPhase('playing');
    resetTimerForCategory(selectedCategory);
  };

  // Objective prompt text based on category
  const objectivePrompt =
    CHALLENGE_CATEGORIES.find((c) => c.type === selectedCategory)?.sublabel ||
    'Explore, connect and discover how India\'s cultural roots shape our present.';

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      <BoardBackground />

      {/* 1. TOP HEADER */}
      <TopHeader
        currentRound={currentRound}
        maxRounds={maxRounds}
        timeLeft={timeLeft}
        timerEnabled={timerEnabled}
        soundEnabled={soundEnabled}
        objectiveText={objectivePrompt}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          saveSoundPreference(next);
        }}
        onOpenTeacherPanel={() => {
          setIsPaused(true);
          setTeacherPanelOpen(true);
        }}
      />

      {/* 2. TOP CHALLENGE CATEGORY SELECTOR */}
      <ChallengeSelectorBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          soundFx.playSelect();
          setSelectedCategory(cat);
          resetTimerForCategory(cat);
        }}
      />

      {/* 3. MAIN GAMEPLAY BOARD */}
      <main className="relative z-10 flex-1 w-full max-w-7xl 2xl:max-w-[1700px] mx-auto px-2 sm:px-3 md:px-4 py-1 flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-4 2xl:gap-8">
        {/* Left Side: Team A Panel & Mascot (Desktop & Smart Class) */}
        <div className="hidden lg:flex flex-col items-center gap-2 order-1 shrink-0">
          <TeamPanel
            teamId="teamA"
            teamName={teamNames.teamA}
            score={teamAScore}
            isActiveTurn={activeTeam === 'teamA'}
            onEditName={() => setTeacherPanelOpen(true)}
          />
          <div className="hidden md:block">
            <TeamMascot />
          </div>
        </div>

        {/* Center: Hero Cultural Roots Tree & Heritage Cards */}
        <div className="relative flex-1 flex flex-col items-center justify-center order-1 lg:order-2 w-full">
          {/* Pan-Indian Perspectives Quick Trigger */}
          <div className="relative lg:absolute lg:-top-3 lg:right-1/2 lg:translate-x-1/2 z-30 mb-1 lg:mb-0 pointer-events-auto">
            <button
              type="button"
              onClick={() => setRegionalDrawerOpen(true)}
              className="bg-white/95 hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-full px-3.5 py-1 text-[11px] 2xl:text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
              title="Compare cultural roots across Indian regions"
            >
              <span>🗺️</span>
              <span>Regional Perspectives</span>
            </button>
          </div>

          <div className="relative w-full flex items-center justify-center">
            {/* Symmetrically Arranged Heritage Discovery Cards (Desktop & Smart Class: >= lg) */}
            <div className="hidden lg:flex absolute inset-0 pointer-events-none justify-between items-center z-20 px-2 md:px-4 2xl:px-8">
              {/* Left Cards Stack */}
              <div className="flex flex-col gap-3 2xl:gap-4 pointer-events-auto">
                <HeritageDiscoveryCard
                  card={heritageCards[0]} // Manuscript
                  onClick={() => setInspectedCard(heritageCards[0])}
                />
                <HeritageDiscoveryCard
                  card={heritageCards[1]} // Music
                  onClick={() => setInspectedCard(heritageCards[1])}
                />
                <HeritageDiscoveryCard
                  card={heritageCards[2]} // Textile
                  onClick={() => setInspectedCard(heritageCards[2])}
                />
              </div>

              {/* Right Cards Stack */}
              <div className="flex flex-col gap-3 2xl:gap-4 pointer-events-auto">
                <HeritageDiscoveryCard
                  card={heritageCards[3]} // Architecture
                  onClick={() => setInspectedCard(heritageCards[3])}
                />
                <HeritageDiscoveryCard
                  card={heritageCards[4]} // Storytelling
                  onClick={() => setInspectedCard(heritageCards[4])}
                />
                <HeritageDiscoveryCard
                  card={heritageCards[5]} // Craft
                  onClick={() => setInspectedCard(heritageCards[5])}
                />
              </div>
            </div>

            {/* Central Stylized Banyan Cultural Roots Tree */}
            <CulturalRootsTree
              nodes={treeNodes}
              growthLevel={discoveredRootsCount}
              isLivingCulture={phase === 'living_culture'}
              highlightedCategory={
                selectedCategory === 'know_it'
                  ? quizData.category
                  : selectedCategory === 'root_it'
                  ? rootItData.category
                  : null
              }
              onNodeClick={(node) => {
                soundFx.playClick();
                setSelectedExploreNode(node);
              }}
            />
          </div>

          {/* Mobile & Tablet Heritage Discovery Cards Shelf (< lg) */}
          <div className="lg:hidden w-full max-w-md sm:max-w-xl mx-auto px-1 py-1 mt-1">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                Heritage Artifacts ({heritageCards.filter(c => c.isDiscovered).length}/6)
              </span>
              <span className="text-[9px] font-bold text-slate-500">Swipe to view</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x pb-1 pt-0.5 px-1">
              {heritageCards.map((card) => (
                <div key={card.id} className="snap-center shrink-0">
                  <HeritageDiscoveryCard
                    card={card}
                    onClick={() => setInspectedCard(card)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet Team Scoreboard Strip (< lg) */}
          <div className="lg:hidden w-full max-w-lg mx-auto grid grid-cols-2 gap-2 px-1 mt-2 order-3">
            <TeamPanel
              teamId="teamA"
              teamName={teamNames.teamA}
              score={teamAScore}
              isActiveTurn={activeTeam === 'teamA'}
              onEditName={() => setTeacherPanelOpen(true)}
            />
            <TeamPanel
              teamId="teamB"
              teamName={teamNames.teamB}
              score={teamBScore}
              isActiveTurn={activeTeam === 'teamB'}
              onEditName={() => setTeacherPanelOpen(true)}
            />
          </div>
        </div>

        {/* Right Side: Team B Panel & Tree Progress (Desktop & Smart Class: >= lg) */}
        <div className="hidden lg:flex flex-col items-center gap-2 order-3 shrink-0">
          <TeamPanel
            teamId="teamB"
            teamName={teamNames.teamB}
            score={teamBScore}
            isActiveTurn={activeTeam === 'teamB'}
            onEditName={() => setTeacherPanelOpen(true)}
          />
          <TreeProgressWidget
            discoveredCount={discoveredRootsCount}
            totalCategories={treeNodes.length}
          />
        </div>
      </main>

      {/* 4. BOTTOM CHALLENGE CONSOLE DOCK */}
      <footer className="relative z-20 pb-2">
        {phase === 'playing' && (
          <>
            {selectedCategory === 'know_it' && (
              <KnowItChallenge
                data={quizData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect) =>
                  handleChallengeAnswer(isCorrect, quizData.category, quizData.points, 'knowledge', 'observation')
                }
              />
            )}

            {selectedCategory === 'find_it' && (
              <FindItChallenge
                data={findItData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect) =>
                  handleChallengeAnswer(isCorrect, findItData.category, findItData.points, 'insight', 'evidence')
                }
              />
            )}

            {selectedCategory === 'root_it' && (
              <RootItChallenge
                data={rootItData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect, catId) =>
                  handleChallengeAnswer(isCorrect, catId, rootItData.points, 'root', 'connection')
                }
              />
            )}

            {selectedCategory === 'connect_it' && (
              <ConnectItChallenge
                data={connectItData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect) =>
                  handleChallengeAnswer(isCorrect, connectItData.category, connectItData.points, 'connection', 'connection')
                }
              />
            )}

            {selectedCategory === 'build_it' && (
              <BuildItChallenge
                data={buildItData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect) =>
                  handleChallengeAnswer(isCorrect, buildItData.category, buildItData.points, 'heritage', 'sequencing')
                }
              />
            )}

            {selectedCategory === 'show_it' && (
              <ShowItChallenge
                data={showItData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                opposingTeamName={activeTeam === 'teamA' ? teamNames.teamB : teamNames.teamA}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect) =>
                  handleChallengeAnswer(isCorrect, showItData.targetCategory, showItData.points, 'heritage', 'communication')
                }
              />
            )}

            {selectedCategory === 'think_it' && (
              <ThinkItChallenge
                data={thinkItData}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                timeLeft={timeLeft}
                timerEnabled={timerEnabled}
                onAnswer={(isCorrect) =>
                  handleChallengeAnswer(isCorrect, thinkItData.category, thinkItData.points, 'insight', 'reasoning')
                }
              />
            )}

            {selectedCategory === 'blitz' && (
              <BlitzChallenge
                data={BLITZ_ITEMS}
                activeTeam={activeTeam}
                activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
                onFinish={(earned) => {
                  if (activeTeam === 'teamA') {
                    setTeamAScore((prev) => ({ ...prev, points: prev.points + earned }));
                  } else {
                    setTeamBScore((prev) => ({ ...prev, points: prev.points + earned }));
                  }
                  switchTurn();
                }}
              />
            )}
          </>
        )}

        {phase === 'final_mystery' && (
          <MysteryChallenge
            data={FINAL_CULTURAL_MYSTERY}
            activeTeam={activeTeam}
            activeTeamName={activeTeam === 'teamA' ? teamNames.teamA : teamNames.teamB}
            timeLeft={timeLeft}
            timerEnabled={timerEnabled}
            onAnswer={handleFinalMysteryAnswer}
          />
        )}
      </footer>

      {/* 5. TOKEN FLY EFFECT ANIMATION */}
      {activeFlyToken && (
        <TokenFlyEffect
          tokenType={activeFlyToken}
          onAnimationEnd={() => setActiveFlyToken(null)}
        />
      )}

      {/* 6. MODALS & POPUPS */}
      {/* Intro Modal */}
      {phase === 'intro' && (
        <IntroModal onStart={() => setPhase('team_setup')} />
      )}

      {/* Team Setup Modal */}
      {phase === 'team_setup' && (
        <TeamSetupModal
          initialTeamA={teamNames.teamA}
          initialTeamB={teamNames.teamB}
          onConfirm={handleTeamSetupConfirm}
        />
      )}

      {/* Card Inspection Modal */}
      <CardInspectModal
        card={inspectedCard}
        onClose={() => setInspectedCard(null)}
      />

      {/* Steal Opportunity Modal */}
      {stealActive && (
        <StealModal
          data={quizData}
          stealingTeam={activeTeam === 'teamA' ? 'teamB' : 'teamA'}
          stealingTeamName={activeTeam === 'teamA' ? teamNames.teamB : teamNames.teamA}
          onStealAttempt={handleStealResult}
          onPassSteal={() => {
            setStealActive(false);
            switchTurn();
          }}
        />
      )}

      {/* Living Culture Climax Modal */}
      {phase === 'living_culture' && (
        <LivingCultureModal
          onContinueToResults={() => setPhase('results')}
        />
      )}

      {/* Results Report Card Modal */}
      {phase === 'results' && (
        <ResultsModal
          teamAScore={teamAScore}
          teamBScore={teamBScore}
          teamAName={teamNames.teamA}
          teamBName={teamNames.teamB}
          discoveredRootsCount={discoveredRootsCount}
          totalCategories={treeNodes.length}
          skillsLog={skillsLog}
          onProceedToReflection={() => setPhase('reflection')}
        />
      )}

      {/* Interactive Reflection Modal */}
      {phase === 'reflection' && (
        <ReflectionModal
          onFinishQuest={() => setPhase('playing')}
          onPlayAgain={() => {
            setTeamAScore(INITIAL_TEAM_SCORE);
            setTeamBScore(INITIAL_TEAM_SCORE);
            setCurrentRound(1);
            setTreeNodes(INITIAL_TREE_NODES);
            setHeritageCards(INITIAL_HERITAGE_CARDS);
            questionManager.reset();
            setPhase('team_setup');
          }}
        />
      )}

      {/* Teacher Control Panel Modal */}
      <TeacherPanelModal
        isOpen={teacherPanelOpen}
        teamAName={teamNames.teamA}
        teamBName={teamNames.teamB}
        isPaused={isPaused}
        timerEnabled={timerEnabled}
        soundEnabled={soundEnabled}
        onClose={() => {
          setTeacherPanelOpen(false);
          setIsPaused(false);
        }}
        onUpdateTeamNames={(a, b) => {
          setTeamNames({ teamA: a, teamB: b });
          saveTeamNames(a, b);
          setTeacherPanelOpen(false);
          setIsPaused(false);
        }}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        onToggleTimer={() => {
          const next = !timerEnabled;
          setTimerEnabled(next);
          saveTimerPreference(next);
        }}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          saveSoundPreference(next);
        }}
        onSkipChallenge={() => {
          switchTurn();
          setTeacherPanelOpen(false);
          setIsPaused(false);
        }}
        onRestartRound={() => {
          resetTimerForCategory(selectedCategory);
          setTeacherPanelOpen(false);
          setIsPaused(false);
        }}
        onResetGame={() => {
          setTeamAScore(INITIAL_TEAM_SCORE);
          setTeamBScore(INITIAL_TEAM_SCORE);
          setCurrentRound(1);
          setTreeNodes(INITIAL_TREE_NODES);
          setHeritageCards(INITIAL_HERITAGE_CARDS);
          questionManager.reset();
          setPhase('team_setup');
          setTeacherPanelOpen(false);
          setIsPaused(false);
        }}
        onQuestionsReload={() => {
          setQuizData(questionManager.getNextQuizQuestion());
        }}
      />

      {/* 7. SUB-BRANCH TREE ZOOM & REGIONAL DRAWER */}
      <SubBranchExploreModal
        node={selectedExploreNode}
        onClose={() => setSelectedExploreNode(null)}
      />

      <RegionalTapestryDrawer
        isOpen={regionalDrawerOpen}
        onClose={() => setRegionalDrawerOpen(false)}
      />
    </div>
  );
};

export default App;
