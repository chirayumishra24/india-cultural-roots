import {
  FindItChallengeData,
  RootItChallengeData,
  ConnectItChallengeData,
  BuildItChallengeData,
  ShowItChallengeData,
  ThinkItChallengeData,
  BlitzChallengeData
} from '../types/challenges';
import { ChallengeCategoryType } from '../types/game';

export interface CategoryInfo {
  type: ChallengeCategoryType;
  label: string;
  sublabel: string;
  iconName: string;
  defaultTimeSeconds: number;
  badgeColor: string;
}

export const CHALLENGE_CATEGORIES: CategoryInfo[] = [
  {
    type: 'know_it',
    label: 'Know It',
    sublabel: 'Quiz Round',
    iconName: 'help-circle',
    defaultTimeSeconds: 20,
    badgeColor: '#9B51E0'
  },
  {
    type: 'find_it',
    label: 'Find It',
    sublabel: 'Culture Detective',
    iconName: 'search',
    defaultTimeSeconds: 30,
    badgeColor: '#27AE60'
  },
  {
    type: 'root_it',
    label: 'Root It',
    sublabel: 'Connect the Root',
    iconName: 'sprout',
    defaultTimeSeconds: 30,
    badgeColor: '#F5B041'
  },
  {
    type: 'connect_it',
    label: 'Connect It',
    sublabel: 'Build Relationships',
    iconName: 'link',
    defaultTimeSeconds: 45,
    badgeColor: '#2B7DE9'
  },
  {
    type: 'build_it',
    label: 'Build It',
    sublabel: 'Sequence & Process',
    iconName: 'puzzle',
    defaultTimeSeconds: 45,
    badgeColor: '#E91E63'
  },
  {
    type: 'show_it',
    label: 'Show It',
    sublabel: 'Culture in Action',
    iconName: 'smile',
    defaultTimeSeconds: 30,
    badgeColor: '#00BCD4'
  },
  {
    type: 'think_it',
    label: 'Think It',
    sublabel: 'Critical Inquiry',
    iconName: 'lightbulb',
    defaultTimeSeconds: 45,
    badgeColor: '#8E44AD'
  },
  {
    type: 'blitz',
    label: 'Blitz',
    sublabel: 'Fast Classification',
    iconName: 'zap',
    defaultTimeSeconds: 30,
    badgeColor: '#F38120'
  }
];

export const FIND_IT_CHALLENGES: FindItChallengeData[] = [
  {
    id: 'find_001',
    type: 'find_it',
    category: 'heritage',
    difficulty: 'medium',
    points: 15,
    clueTitle: 'Ancient Rock-Cut Cave Inscription',
    hint: 'Look at the script style and what the carved symbols convey about civic patronage.',
    feedbackCorrect: 'Brilliant deduction! The inscription reveals that diverse local guilds and donors helped support communal architecture.',
    feedbackIncorrect: 'Look closely at the evidence. What does an inscription carved by order of a trade guild tell us?',
    clueText: 'A sandstone cave entrance displays an inscription in Brahmi script recording a gift from an artisan guild to build a resting hall.',
    investigationClues: [
      'Material: Hand-chiseled sandstone doorway lintel.',
      'Script: Ancient Brahmi script dating back over two millennia.',
      'Mention: An organized guild of weavers and potters making a public contribution.'
    ],
    evidenceQuestion: 'What does this inscription help historians understand most accurately?',
    options: [
      { id: 'opt_1', text: 'Artisan guilds actively participated in supporting public civic and cultural spaces', isCorrect: true },
      { id: 'opt_2', text: 'Sandstone was the only building material allowed anywhere in India', isCorrect: false },
      { id: 'opt_3', text: 'Writing was never used for everyday or civic purposes', isCorrect: false },
      { id: 'opt_4', text: 'Caves were exclusively private residences of kings', isCorrect: false }
    ],
    interpretationConclusion: 'Inscriptions serve as direct historical evidence showing that community collectives and guilds fostered heritage.'
  },
  {
    id: 'find_002',
    type: 'find_it',
    category: 'arts',
    difficulty: 'easy',
    points: 10,
    clueTitle: 'Geometric Clay Seal Imprint',
    hint: 'Notice the animal motif and standardized measurement proportions.',
    feedbackCorrect: 'Outstanding observation! The seal shows symbolic representation alongside functional identification.',
    feedbackIncorrect: 'Consider what a carved seal carried by traders demonstrates.',
    clueText: 'A square terracotta seal showing a humped bull, a manger, and early pictographic signs.',
    investigationClues: [
      'Material: Hardened terracotta and steatite stone.',
      'Visual: Precise carving of local fauna showing deep anatomical familiarity.',
      'Context: Found near ancient dockyards and storage grain facilities.'
    ],
    evidenceQuestion: 'What does this discovery indicate about early artistic and economic life?',
    options: [
      { id: 'opt_a', text: 'Artists combined fine visual observation with everyday trade and identity markers', isCorrect: true },
      { id: 'opt_b', text: 'People had no tools to sculpt stone or clay', isCorrect: false },
      { id: 'opt_c', text: 'Animals were never depicted in visual arts', isCorrect: false },
      { id: 'opt_d', text: 'All trading was conducted without any physical records', isCorrect: false }
    ],
    interpretationConclusion: 'Craft objects from ancient settlements demonstrate an intimate bond between utilitarian trade and artistic pride.'
  }
];

export const ROOT_IT_CHALLENGES: RootItChallengeData[] = [
  {
    id: 'root_001',
    type: 'root_it',
    category: 'arts',
    difficulty: 'medium',
    points: 15,
    clueTitle: 'Stone Relief Carving',
    hint: 'Ask yourself: Does this represent spoken words, visual craftsmanship, or musical tuning?',
    feedbackCorrect: 'Cultural Root Connected! Sculptural styles evolve through generations while maintaining visual aesthetics.',
    feedbackIncorrect: 'Reflect on how stone carving expresses artistic imagination across time.',
    artifactDescription: 'This ancient temple relief carving showcases delicate stone ornamentation, expressive facial mudras, and floral patterns passed down through sculptor lineages (shilpis).',
    question: 'Which cultural root does this artifact best connect to?',
    rootOptions: [
      { id: 'language', name: 'Language', description: 'Grammar, spoken words, written alphabets', isCorrect: false },
      { id: 'arts', name: 'Visual Arts & Sculpture', description: 'Carvings, murals, iconography, and craftsmanship', isCorrect: true },
      { id: 'music', name: 'Music', description: 'Acoustic notes, percussion rhythms, and vocal ragas', isCorrect: false },
      { id: 'knowledge', name: 'Knowledge Traditions', description: 'Astronomy, mathematics, and botanical systems', isCorrect: false }
    ],
    educationalNote: 'Artistic traditions like stone sculpture reflect regional styles that adapted over centuries while retaining deep continuity.'
  },
  {
    id: 'root_002',
    type: 'root_it',
    category: 'knowledge',
    difficulty: 'medium',
    points: 15,
    clueTitle: 'Ancient Astronomical Observatory Dial',
    hint: 'Think about measuring shadow lengths, seasons, and star positions.',
    feedbackCorrect: 'Knowledge Root Connected! Astronomical inquiry demonstrated sophisticated empirical calculation.',
    feedbackIncorrect: 'Look at the function: measuring shadows, solstices, and heavenly bodies.',
    artifactDescription: 'A stone gnomon dial calibrated to measure the exact movement of the sun, solstices, and changing seasons for agriculture.',
    question: 'Which cultural root does this scientific instrument connect to?',
    rootOptions: [
      { id: 'stories', name: 'Stories & Folklore', description: 'Mythological tales and parables', isCorrect: false },
      { id: 'practices', name: 'Festive Practices', description: 'Celebrations and customary rituals', isCorrect: false },
      { id: 'knowledge', name: 'Knowledge & Scientific Traditions', description: 'Astronomy, mathematics, and empirical observation', isCorrect: true },
      { id: 'arts', name: 'Visual Arts', description: 'Paintings and statues', isCorrect: false }
    ],
    educationalNote: 'India’s astronomical treatises (such as the works of Aryabhata and Varahamihira) connected mathematics to calendar keeping.'
  },
  {
    id: 'root_003',
    type: 'root_it',
    category: 'practices',
    difficulty: 'easy',
    points: 10,
    clueTitle: 'Traditional Cotton Handloom Weaver’s Shuttle',
    hint: 'Weaving cloth by hand combines communal craftsmanship and living techniques.',
    feedbackCorrect: 'Practice Root Connected! Handloom weaving is a living heritage sustained across generations.',
    feedbackIncorrect: 'Consider what handloom craft and cloth weaving represent in community life.',
    artifactDescription: 'A wooden handloom shuttle used to interweave warp and weft threads using indigo and madder plant dyes.',
    question: 'Which cultural root does this living artisan tradition best represent?',
    rootOptions: [
      { id: 'practices', name: 'Artisan Practices & Living Heritage', description: 'Textiles, pottery, and community craft customs', isCorrect: true },
      { id: 'music', name: 'Music & Performance', description: 'Acoustic instruments and melodies', isCorrect: false },
      { id: 'language', name: 'Language & Literature', description: 'Written manuscripts and scripts', isCorrect: false },
      { id: 'stories', name: 'Storytelling', description: 'Oral folktales and puppet shows', isCorrect: false }
    ],
    educationalNote: 'Handloom weaving showcases how material knowledge, dye chemistry, and artistic motifs are nurtured within artisan communities.'
  }
];

export const CONNECT_IT_CHALLENGES: ConnectItChallengeData[] = [
  {
    id: 'connect_001',
    type: 'connect_it',
    category: 'stories',
    difficulty: 'medium',
    points: 15,
    hint: 'How does a story travel from one generation’s voice into a young listener’s memory?',
    feedbackCorrect: 'Meaningful Connection Made! Spoken language is the primary vessel for transmitting oral stories.',
    feedbackIncorrect: 'Think about how oral tales need a medium of speech to pass between people.',
    prompt: 'Create a supported cultural connection between the cards below:',
    itemsToConnect: [
      { id: 'c_story', label: 'Oral Folk Tale', category: 'stories', iconName: 'book-open' },
      { id: 'c_language', label: 'Spoken Language & Dialect', category: 'language', iconName: 'message-circle' },
      { id: 'c_metal', label: 'Iron Smelting Furnace', category: 'knowledge', iconName: 'flame' },
      { id: 'c_coin', label: 'Market Coinage', category: 'heritage', iconName: 'circle' }
    ],
    validPairIds: ['c_story', 'c_language'],
    relationshipExplanation: 'Oral folk tales rely directly on spoken language and regional dialects for transmission across generations before written texts.'
  },
  {
    id: 'connect_002',
    type: 'connect_it',
    category: 'music',
    difficulty: 'medium',
    points: 15,
    hint: 'Which two elements interact when a community celebrates a harvest festival?',
    feedbackCorrect: 'Inspiring Connection! Traditional music and community practices celebrate seasons in unison.',
    feedbackIncorrect: 'Consider which pair naturally combines performance sound with community seasonal living.',
    prompt: 'Connect the performance art with the community lifestyle:',
    itemsToConnect: [
      { id: 'c_folk_tune', label: 'Folk Harvest Melody', category: 'music', iconName: 'music' },
      { id: 'c_seasonal_prac', label: 'Seasonal Harvest Practice', category: 'practices', iconName: 'sprout' },
      { id: 'c_granite', label: 'Quarry Granite Slab', category: 'heritage', iconName: 'layers' },
      { id: 'c_alphabet', label: 'Stone Alphabet Grid', category: 'language', iconName: 'edit-3' }
    ],
    validPairIds: ['c_folk_tune', 'c_seasonal_prac'],
    relationshipExplanation: 'Folk music often arises directly from agricultural rhythms, seasonal shifts, and community harvesting practices.'
  }
];

export const BUILD_IT_CHALLENGES: BuildItChallengeData[] = [
  {
    id: 'build_001',
    type: 'build_it',
    category: 'language',
    difficulty: 'hard',
    points: 20,
    hint: 'Start with voice and oral recitation, move to hand inscriptions, then to parchment/paper preservation, and modern archives.',
    feedbackCorrect: 'Sequence Verified! You mapped the transmission of knowledge from oral tradition to modern continuity.',
    feedbackIncorrect: 'Think about the journey: What came first—spoken recitation or modern digital storage?',
    scenarioTitle: 'Journey of Knowledge Transmission',
    instruction: 'Arrange these stages of cultural knowledge transmission in chronological / evolutionary order:',
    items: [
      { id: 'b_1', title: 'Oral Recitation & Memory', step: 'Elders chant verses to disciples using mnemonic rhythm', order: 1 },
      { id: 'b_2', title: 'Carved Rock & Pillar Edicts', step: 'Important messages engraved in stone for public reading', order: 2 },
      { id: 'b_3', title: 'Palm-Leaf & Birch-Bark Folios', step: 'Scribes copy philosophical, literary, and botanical manuscripts', order: 3 },
      { id: 'b_4', title: 'Living Archives & Digital Access', step: 'Ancient texts studied, translated, and conserved for the future', order: 4 }
    ],
    pedagogicalInsight: 'Knowledge transmission evolved from memorized chants to durable inscriptions and manuscripts, preserving wisdom to this day.'
  }
];

export const SHOW_IT_CHALLENGES: ShowItChallengeData[] = [
  {
    id: 'show_001',
    type: 'show_it',
    category: 'arts',
    difficulty: 'easy',
    points: 15,
    hint: 'One team demonstrates the gesture; the other team observes and identifies the art concept.',
    feedbackCorrect: 'Culture in Action Complete! Hand gestures (mudras) have communicated emotions and stories for thousands of years.',
    feedbackIncorrect: 'Reflect on how symbolic gestures are used in classical and folk Indian performances.',
    actionPrompt: 'Act out or describe using hand gestures (mudras) without speaking:',
    mode: 'act',
    secretConcept: 'Expressing a Lotus Flower or a Flying Bird using hand gestures (mudras)',
    targetCategory: 'arts',
    optionsForGuessers: [
      { id: 's_opt1', text: 'Dance & Theatrical Mudras (Visual Storytelling)', isCorrect: true },
      { id: 's_opt2', text: 'Written Calligraphy Penmanship', isCorrect: false },
      { id: 's_opt3', text: 'Metal Casting Ingot', isCorrect: false },
      { id: 's_opt4', text: 'Ocean Sailing Navigation', isCorrect: false }
    ],
    reflectionQuestion: 'Why were symbolic hand gestures (mudras) developed in Indian performance arts?',
    reflectionOptions: [
      { id: 'r_opt1', text: 'To communicate complex feelings and mythological events clearly to large audiences', isCorrect: true },
      { id: 'r_opt2', text: 'Because performers were not allowed to speak any language', isCorrect: false },
      { id: 'r_opt3', text: 'They were only used as secret signals during battles', isCorrect: false }
    ]
  }
];

export const THINK_IT_CHALLENGES: ThinkItChallengeData[] = [
  {
    id: 'think_001',
    type: 'think_it',
    category: 'heritage',
    difficulty: 'hard',
    points: 20,
    hint: 'Look for continuity (what was kept) alongside adaptation (what changed to suit modern materials).',
    feedbackCorrect: 'Deep Reasoning Demonstrated! Traditions often adapt materials and formats while sustaining their core artistic spirit.',
    feedbackIncorrect: 'Examine both sides: does a tradition die if modern paint is used, or does its spirit continue?',
    scenario: 'A family of Madhubani or Warli folk artists originally used rice flour paste and bamboo sticks on mud walls. Today, their grandchildren paint the same traditional geometric motifs on handmade paper, canvas, and cloth tote bags.',
    clues: [
      'Motif continuity: The symbols (tree of life, village scenes, peacocks) remain identical.',
      'Material shift: Mud walls replaced with paper, cloth, and digital prints.',
      'Audience reach: Transmitted beyond the village to exhibitions and world audiences.'
    ],
    inquiry: 'What does this scenario illustrate best about cultural heritage?',
    options: [
      { id: 't_opt1', text: 'Culture can preserve its meaningful roots while adapting to new media and changing times', isCorrect: true },
      { id: 't_opt2', text: 'Changing materials means the cultural tradition is completely ruined', isCorrect: false },
      { id: 't_opt3', text: 'Culture never changes in any way over hundreds of years', isCorrect: false },
      { id: 't_opt4', text: 'Only modern machinery can create authentic cultural artwork', isCorrect: false }
    ],
    reasoningDebrief: 'Cultural traditions are dynamic, not frozen. They demonstrate continuity of meaning alongside creative change.'
  }
];

export const BLITZ_ITEMS: BlitzChallengeData = {
  id: 'blitz_master',
  type: 'blitz',
  category: 'knowledge',
  difficulty: 'easy',
  points: 5,
  hint: 'Classify as fast as you can! Match each cultural clue to its matching domain.',
  feedbackCorrect: 'Speed and accuracy! Great classification sprint.',
  feedbackIncorrect: 'Keep moving and watch the category associations.',
  deck: [
    { id: 'bz_1', cardName: 'Vedic Chanting & Verse', description: 'Oral rhythmic recitation of knowledge', correctCategory: 'stories' },
    { id: 'bz_2', cardName: 'Brahmi Script Inscription', description: 'Ancient characters carved on sandstone', correctCategory: 'language' },
    { id: 'bz_3', cardName: 'Veena & Sitar Melodies', description: 'Stringed acoustic music traditions', correctCategory: 'music' },
    { id: 'bz_4', cardName: 'Ajanta Cave Frescoes', description: 'Murals depicting life and spiritual tales', correctCategory: 'arts' },
    { id: 'bz_5', cardName: 'Ayurvedic Herbal Formulas', description: 'Medicinal knowledge documented by physicians', correctCategory: 'knowledge' },
    { id: 'bz_6', cardName: 'Stepwell (Baoli) Water Systems', description: 'Community architecture for water storage', correctCategory: 'practices' },
    { id: 'bz_7', cardName: 'Panchatantra Animal Fables', description: 'Moral stories teaching statecraft and wisdom', correctCategory: 'stories' },
    { id: 'bz_8', cardName: 'Shore Temple at Mahabalipuram', description: 'Monolithic and structural stone shrine', correctCategory: 'heritage' },
    { id: 'bz_9', cardName: 'Terracotta Indus Figurines', description: 'Early sculpted clay pottery and toys', correctCategory: 'arts' },
    { id: 'bz_10', cardName: 'Zero & Place Value Decimal System', description: 'Mathematical breakthroughs for computation', correctCategory: 'knowledge' }
  ]
};
