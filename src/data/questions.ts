import { QuizChallengeData } from '../types/challenges';

export const QUIZ_QUESTIONS: QuizChallengeData[] = [
  {
    id: 'quiz_001',
    type: 'know_it',
    category: 'language',
    difficulty: 'easy',
    points: 10,
    hint: 'Think about how people write down thoughts, laws, or poetry so they can be read later.',
    feedbackCorrect: 'Excellent! Written scripts and inscriptions preserved vocabulary, ideas, and civic records across generations.',
    feedbackIncorrect: 'Look closely at the clue. Consider what medium is used to record and communicate verbal thought.',
    question: 'Ancient stone edicts and palm-leaf manuscripts primarily belong to which cultural expression?',
    options: [
      { id: 'a', text: 'Language & Written Tradition', isCorrect: true },
      { id: 'b', text: 'Agricultural Tools', isCorrect: false },
      { id: 'c', text: 'Culinary Recipes', isCorrect: false },
      { id: 'd', text: 'Martial Weapons', isCorrect: false },
    ],
    explanation: 'Written scripts and recorded texts allowed literature, scientific observations, and laws to be preserved and passed down.'
  },
  {
    id: 'quiz_002',
    type: 'know_it',
    category: 'arts',
    difficulty: 'medium',
    points: 10,
    hint: 'Notice whether the object is sculpted from stone or painted on plaster to depict life and stories.',
    feedbackCorrect: 'Spot on! Rock reliefs and wall frescoes are enduring forms of visual arts and craftsmanship.',
    feedbackIncorrect: 'Reflect on how visual imagination is carved or painted onto surfaces.',
    question: 'Intricate carvings on temple stone walls and cave murals are prime examples of which cultural root?',
    options: [
      { id: 'a', text: 'Modern Machine Manufacturing', isCorrect: false },
      { id: 'b', text: 'Visual Arts & Sculpture', isCorrect: true },
      { id: 'c', text: 'Ocean Navigation Only', isCorrect: false },
      { id: 'd', text: 'Spoken Dialects', isCorrect: false },
    ],
    explanation: 'Sculptural reliefs and murals preserve artistic styles, iconographic symbols, and everyday observations from past eras.'
  },
  {
    id: 'quiz_003',
    type: 'know_it',
    category: 'knowledge',
    difficulty: 'medium',
    points: 10,
    hint: 'Think about how ancient communities observed stars, seasons, and natural plant properties.',
    feedbackCorrect: 'Well reasoned! Systematic observation of nature formed the foundation of ancient knowledge traditions.',
    feedbackIncorrect: 'Consider what systematic inquiry into health, astronomy, and arithmetic represents.',
    question: 'Historical observations of planetary movements and traditional herbal medicine systems demonstrate which aspect of culture?',
    options: [
      { id: 'a', text: 'Knowledge Traditions & Applied Science', isCorrect: true },
      { id: 'b', text: 'Fictional Tales Only', isCorrect: false },
      { id: 'c', text: 'Fashion Trends', isCorrect: false },
      { id: 'd', text: 'Spectator Sports', isCorrect: false },
    ],
    explanation: 'India’s historical knowledge traditions included astronomy, mathematics, metallurgy, and wellness systems like Ayurveda.'
  },
  {
    id: 'quiz_004',
    type: 'know_it',
    category: 'music',
    difficulty: 'easy',
    points: 10,
    hint: 'Listen for rhythm, melody, and acoustic instruments.',
    feedbackCorrect: 'Great discovery! Both classical and regional folk songs express melodic traditions and community festivities.',
    feedbackIncorrect: 'Think about expressions that involve tone, rhythm, and sound harmonies.',
    question: 'Rhythmic percussion patterns (talas) and melodic frameworks (ragas) represent which cultural root?',
    options: [
      { id: 'a', text: 'Architecture & Stone Cutting', isCorrect: false },
      { id: 'b', text: 'Music & Performing Arts', isCorrect: true },
      { id: 'c', text: 'Paper Printing Press', isCorrect: false },
      { id: 'd', text: 'Mining Metallurgy', isCorrect: false },
    ],
    explanation: 'Musical traditions in India blend melodic exploration with intricate rhythmic structures transmitted through listening and practice.'
  },
  {
    id: 'quiz_005',
    type: 'know_it',
    category: 'practices',
    difficulty: 'hard',
    points: 15,
    hint: 'Look for everyday habits, seasonal festivals, and sustainable farming or crafting customs.',
    feedbackCorrect: 'Insightful! Cultural practices are living habits shared and adapted by community members over centuries.',
    feedbackIncorrect: 'Look beyond single monuments; think about repeated community rituals and artisan ways of working.',
    question: 'Water conservation through stepped wells (baolis) and rainwater harvesting tanks represents which cultural dimension?',
    options: [
      { id: 'a', text: 'Ecological Practices & Sustainable Engineering', isCorrect: true },
      { id: 'b', text: 'Solo Dance Choreography', isCorrect: false },
      { id: 'c', text: 'Foreign Trade Imports Only', isCorrect: false },
      { id: 'd', text: 'Written Alphabets', isCorrect: false },
    ],
    explanation: 'Water harvesting structures like baolis combine engineering ingenuity, community access, and artistic stone carving.'
  },
  {
    id: 'quiz_006',
    type: 'know_it',
    category: 'stories',
    difficulty: 'easy',
    points: 10,
    hint: 'Consider how grandfather and grandmother passed down folklore before books were common.',
    feedbackCorrect: 'Exactly! Oral storytelling transmitted moral values, community history, and entertainment without needing printed books.',
    feedbackIncorrect: 'Think about spoken narratives, fables like Panchatantra, and folk legends.',
    question: 'How were many folk tales, epics, and ethical parables primarily preserved before mass printing?',
    options: [
      { id: 'a', text: 'Through Oral Transmission from Elder to Youth', isCorrect: true },
      { id: 'b', text: 'Through Radio Broadcasts', isCorrect: false },
      { id: 'c', text: 'Through Internet Forums', isCorrect: false },
      { id: 'd', text: 'They were kept strictly secret and never told', isCorrect: false },
    ],
    explanation: 'The oral tradition (shruti and smriti traditions, folk bards, and village storytellers) kept narratives vibrant across generations.'
  }
];
