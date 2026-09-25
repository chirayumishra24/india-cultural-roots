import { Question } from '../types/game';

export const INITIAL_QUESTIONS: Question[] = [
  // ==================== ZONE 1: VEDAS & VEDIC CULTURE (Discoveries 1-4) ====================
  {
    id: 'q-ved-1',
    question: 'Which of the following are the four ancient Vedas?',
    type: 'mcq',
    category: 'vedic-culture',
    difficulty: 'easy',
    discoveryId: 1,
    discoveryTitle: 'The Four Vedas',
    discoveryDescription: 'The Rig, Yajur, Sama, and Atharva Vedas are ancient collections of knowledge preserved across generations.',
    options: [
      'Rig, Yajur, Sama, and Atharva Veda',
      'Ramayana, Mahabharata, Puranas, and Vedas',
      'Rig, Sama, Upanishad, and Bhagavad Gita',
      'Dharma, Artha, Kama, and Moksha'
    ],
    correctAnswer: 0,
    explanation: 'The four Vedas in ancient Indian tradition are the Rig Veda, Yajur Veda, Sama Veda, and Atharva Veda.'
  },
  {
    id: 'q-ved-2',
    question: 'Why was oral transmission so important in the Vedic tradition?',
    type: 'mcq',
    category: 'vedic-culture',
    difficulty: 'medium',
    discoveryId: 4,
    discoveryTitle: 'Vedic Oral Tradition',
    discoveryDescription: 'Knowledge was transmitted orally through chanting with rigorous pronunciation and rhythm, without writing.',
    options: [
      'It preserved precise pronunciation, meter, and meaning across centuries without relying on written paper',
      'Ancient people were strictly forbidden from ever learning language',
      'Written books were too expensive to purchase in markets',
      'Songs were only sung for entertainment during festivals'
    ],
    correctAnswer: 0,
    explanation: 'Before writing was common, the Vedic tradition developed meticulous chanting rules to preserve every sound and syllable accurately.'
  },
  {
    id: 'q-ved-3',
    question: 'Match each Veda or term with its core characteristic:',
    type: 'match',
    category: 'vedic-culture',
    difficulty: 'medium',
    discoveryId: 1,
    discoveryTitle: 'The Four Vedas',
    discoveryDescription: 'Each Veda had a unique focus, from cosmic hymns to musical melodies and ritual prayers.',
    pairs: [
      { id: 'p1', left: 'Rig Veda', right: 'Oldest collection of poetic hymns' },
      { id: 'p2', left: 'Sama Veda', right: 'Hymns arranged for melodic chanting' },
      { id: 'p3', left: 'Atharva Veda', right: 'Prayers, healing, and everyday life wisdom' }
    ],
    explanation: 'The Rig Veda contains ancient hymns, the Sama Veda focuses on chants set to melody, and the Atharva Veda relates to daily life and wellbeing.'
  },
  {
    id: 'q-ved-4',
    question: 'True or False: Ancient texts mention women scholars and thinkers, such as Gargi and Maitreyi, who took part in philosophical debates.',
    type: 'true-false',
    category: 'vedic-culture',
    difficulty: 'easy',
    discoveryId: 3,
    discoveryTitle: 'Rishis and Rishikas',
    discoveryDescription: 'Women scholars actively participated in scholarly discussions and composed sacred verses.',
    options: ['True — Notable women scholars composed hymns and debated philosophical questions', 'False — Only kings were allowed to speak in debates'],
    correctAnswer: 0,
    explanation: 'Historical texts and dialogues record rishikas like Gargi and Maitreyi participating in important philosophical assemblies.'
  },
  {
    id: 'q-ved-5',
    question: 'Arrange the sequence of how Vedic verses were traditionally studied and preserved:',
    type: 'sequence',
    category: 'vedic-culture',
    difficulty: 'medium',
    discoveryId: 4,
    discoveryTitle: 'Vedic Oral Tradition',
    discoveryDescription: 'Students learned from a teacher through listening, precise repetition, and deep memorization.',
    sequenceItems: [
      'Listening attentively to the teacher’s chanting (Shruti)',
      'Practicing exact intonation and meter step-by-step',
      'Memorizing complete Suktas through rhythmic repetition',
      'Passing the verses to the next generation of students'
    ],
    explanation: 'Oral preservation relied on careful listening (Shruti), precision in meter and pronunciation, and generational transmission.'
  },
  {
    id: 'q-ved-6',
    question: 'Many Vedic hymns (suktas) express deep reverence for forces of nature such as fire, dawn, and wind.',
    type: 'scenario',
    category: 'vedic-culture',
    difficulty: 'easy',
    discoveryId: 2,
    discoveryTitle: 'Vedic Hymns (Suktas)',
    discoveryDescription: 'Vedic hymns celebrated cosmic elements like Agni and Ushas as vital sustaining forces.',
    scenarioContext: 'In an ancient hermitage, young students awaken before sunrise to chant verses in praise of Ushas (the dawn) and light the morning hearth (Agni).',
    options: [
      'It reflects early people’s wonder and gratitude toward the natural elements sustaining human life',
      'It was done to keep wild animals away from the campsite',
      'It was a method to predict tomorrow’s market prices',
      'It shows people had no interest in the natural world'
    ],
    correctAnswer: 0,
    explanation: 'Vedic hymns praised natural phenomena like dawn, fire, water, and sun, recognizing humanity’s close relationship with the environment.'
  },

  // ==================== ZONE 2: UPANISHADS & SCHOOLS OF THOUGHT (Discoveries 5-7) ====================
  {
    id: 'q-upan-1',
    question: 'What is the primary style and purpose of the Upanishads?',
    type: 'mcq',
    category: 'upanishads',
    difficulty: 'easy',
    discoveryId: 5,
    discoveryTitle: 'The Upanishads: Inquiry & Dialogue',
    discoveryDescription: 'The Upanishads shifted focus from ritual action to deep inquiry into life, truth, and the self.',
    options: [
      'Philosophical dialogues between teachers and seekers exploring the nature of reality and the inner self',
      'Rules and guidelines for military commanders in warfare',
      'Collections of folktales meant solely for entertainment',
      'A catalog of farming tools used in ancient towns'
    ],
    correctAnswer: 0,
    explanation: 'The word Upanishad suggests sitting close to a teacher to inquire into profound questions about self, consciousness, and the universe.'
  },
  {
    id: 'q-upan-2',
    question: 'What central idea does Vedanta explore regarding living beings?',
    type: 'mcq',
    category: 'vedanta-yoga',
    difficulty: 'medium',
    discoveryId: 6,
    discoveryTitle: 'Vedanta & Oneness of Life',
    discoveryDescription: 'Vedanta explores the underlying unity connecting all life, fostering compassion and mutual respect.',
    options: [
      'Beneath outer diversity lies an underlying unity and oneness connecting all life',
      'Every human being must live in total separation from others',
      'Nature and humans have nothing in common',
      'Only material wealth determines the value of a person'
    ],
    correctAnswer: 0,
    explanation: 'Vedanta teaches that an underlying spiritual reality connects all beings, inspiring harmony, compassion, and respect.'
  },
  {
    id: 'q-upan-3',
    question: 'Match the ancient school or concept with its primary teaching:',
    type: 'match',
    category: 'vedanta-yoga',
    difficulty: 'medium',
    discoveryId: 7,
    discoveryTitle: 'Yoga: Harmony of Mind and Body',
    discoveryDescription: 'Yoga emphasizes the harmony of physical health, mental focus, and disciplined ethical living.',
    pairs: [
      { id: 'p4', left: 'Upanishads', right: 'Inquiry into self, truth, and reality' },
      { id: 'p5', left: 'Yoga', right: 'Discipline of body, breath, and calm concentration' },
      { id: 'p6', left: 'Vedanta', right: 'Recognition of underlying unity in all life' }
    ],
    explanation: 'The Upanishads foster inquiry, Yoga cultivates disciplined mental and physical balance, and Vedanta contemplates universal unity.'
  },
  {
    id: 'q-upan-4',
    question: 'True or False: In the Upanishads, questions from curious students are welcomed and encouraged as the key to discovering truth.',
    type: 'true-false',
    category: 'upanishads',
    difficulty: 'easy',
    discoveryId: 5,
    discoveryTitle: 'The Upanishads: Inquiry & Dialogue',
    discoveryDescription: 'Inquiry and respectful debate were seen as central to true learning.',
    options: ['True — Inquiring deeply and asking questions was seen as essential for wisdom', 'False — Students were only allowed to listen without ever asking questions'],
    correctAnswer: 0,
    explanation: 'The Upanishadic tradition placed high value on inquisitive students like Nachiketa and Svetaketu asking probing questions.'
  },
  {
    id: 'q-upan-5',
    question: 'Which scenario best demonstrates the practical spirit of Yoga as taught in ancient Indian tradition?',
    type: 'scenario',
    category: 'vedanta-yoga',
    difficulty: 'medium',
    discoveryId: 7,
    discoveryTitle: 'Yoga: Harmony of Mind and Body',
    discoveryDescription: 'Yoga combines ethical restraint, steady postures, breath regulation, and inner peace.',
    scenarioContext: 'Anand feels restless and anxious before giving a class presentation. His teacher reminds him of the principles of Yoga.',
    options: [
      'Sitting steadily, taking deep mindful breaths, and calming his thoughts to find inner balance',
      'Running as fast as possible to escape the classroom',
      'Arguing loudly with his classmates to prove superiority',
      'Skipping meals completely for three days'
    ],
    correctAnswer: 0,
    explanation: 'Yoga is fundamentally about cultivating a balanced, calm, and focused mind through steady posture and breath control.'
  },

  // ==================== ZONE 3: BUDDHISM (Discoveries 8-10) ====================
  {
    id: 'q-bud-1',
    question: 'What is the "Middle Way" (Majjhima Patipada) taught by the Buddha?',
    type: 'mcq',
    category: 'buddhism',
    difficulty: 'easy',
    discoveryId: 10,
    discoveryTitle: 'The Middle Way (Majjhima Patipada)',
    discoveryDescription: 'The Middle Way teaches a balanced approach to life, avoiding both severe indulgence and painful deprivation.',
    options: [
      'A balanced lifestyle avoiding both extreme luxury and severe self-mortification',
      'Living only in extreme luxury and pleasure without any thought for others',
      'Practicing severe hunger and physical torment as the only way to truth',
      'Walking only down the middle of town roadways'
    ],
    correctAnswer: 0,
    explanation: 'The Buddha taught the Middle Way after realizing that neither endless luxury nor severe bodily deprivation leads to true peace.'
  },
  {
    id: 'q-bud-2',
    question: 'Where did Siddhartha Gautama attain enlightenment under the Bodhi tree?',
    type: 'mcq',
    category: 'buddhism',
    difficulty: 'easy',
    discoveryId: 8,
    discoveryTitle: 'Siddhartha Gautama & Enlightenment',
    discoveryDescription: 'At Bodh Gaya, Siddhartha attained awakening after deep meditation, becoming the Buddha.',
    options: [
      'Bodh Gaya in present-day Bihar',
      'Taxila in ancient Gandhara',
      'Hampi on the Tungabhadra River',
      'Kanchipuram in southern India'
    ],
    correctAnswer: 0,
    explanation: 'Siddhartha Gautama meditated under the sacred peepal tree at Bodh Gaya and attained enlightenment, becoming the Buddha.'
  },
  {
    id: 'q-bud-3',
    question: 'Why did the Buddha choose to deliver his teachings in the Prakrit language instead of classical Sanskrit?',
    type: 'mcq',
    category: 'buddhism',
    difficulty: 'medium',
    discoveryId: 9,
    discoveryTitle: 'Buddha’s Teachings & Compassion',
    discoveryDescription: 'Using everyday language ensured ethical teachings were accessible to common people, farmers, and artisans.',
    options: [
      'So that ordinary people, farmers, artisans, and women could easily understand and follow his message',
      'Because he did not know any other languages',
      'Because the royal court ordered him to speak only in rhyme',
      'To prevent neighboring travelers from understanding him'
    ],
    correctAnswer: 0,
    explanation: 'Prakrit was the spoken language of the common people, ensuring that moral teachings of compassion reached everyone directly.'
  },
  {
    id: 'q-bud-4',
    question: 'Order the major milestones in the life of the Buddha in chronological order:',
    type: 'sequence',
    category: 'buddhism',
    difficulty: 'medium',
    discoveryId: 8,
    discoveryTitle: 'Siddhartha Gautama & Enlightenment',
    discoveryDescription: 'From princely life to enlightenment and the first sermon at Sarnath.',
    sequenceItems: [
      'Leaving the palace after witnessing sickness, old age, and sorrow',
      'Attaining enlightenment under the Bodhi tree at Bodh Gaya',
      'Delivering the first sermon (Dharmachakra Pravartana) at Sarnath',
      'Guiding a community of monks and lay followers across North India'
    ],
    explanation: 'Siddhartha left his princely home, attained enlightenment at Bodh Gaya, and taught his first sermon at the deer park in Sarnath.'
  },
  {
    id: 'q-bud-5',
    question: 'True or False: Buddhist teachings strongly emphasize kindness, ethical conduct, and compassion (karuna) toward all living creatures.',
    type: 'true-false',
    category: 'buddhism',
    difficulty: 'easy',
    discoveryId: 9,
    discoveryTitle: 'Buddha’s Teachings & Compassion',
    discoveryDescription: 'Compassion and mindful action are central pillars of Buddhist ethics.',
    options: ['True — Compassion and ethical living were central to the Buddha’s message', 'False — Teachings focused solely on winning debates'],
    correctAnswer: 0,
    explanation: 'Compassion (karuna) and harmlessness are central to Buddhist philosophy and daily conduct.'
  },

  // ==================== ZONE 4: JAINISM (Discoveries 11-13) ====================
  {
    id: 'q-jain-1',
    question: 'What is the core principle of Ahimsa in Jain philosophy?',
    type: 'mcq',
    category: 'jainism',
    difficulty: 'easy',
    discoveryId: 12,
    discoveryTitle: 'Ahimsa: Reverence for All Life',
    discoveryDescription: 'Ahimsa means causing no injury to any living being in thought, word, or deed.',
    options: [
      'Complete non-injury and active compassion toward all living beings, large and small',
      'Refusing to speak during daylight hours',
      'Traveling only on paved stone roads',
      'Building temples made only of clay'
    ],
    correctAnswer: 0,
    explanation: 'Ahimsa is the fundamental principle of non-violence and reverent care for every living form in thought, word, and deed.'
  },
  {
    id: 'q-jain-2',
    question: 'What does the philosophical concept of Anekantavada teach?',
    type: 'mcq',
    category: 'jainism',
    difficulty: 'medium',
    discoveryId: 13,
    discoveryTitle: 'Anekantavada: Many Perspectives',
    discoveryDescription: 'Anekantavada teaches that reality has many dimensions, encouraging tolerance for different viewpoints.',
    options: [
      'Truth has many facets, and different perspectives must be understood respectfully',
      'Only one single person can ever be correct in an argument',
      'All ancient books must be memorized backwards',
      'Rules should change every single day'
    ],
    correctAnswer: 0,
    explanation: 'Anekantavada emphasizes that truth is complex and multifaceted; recognizing multiple points of view encourages humility and harmony.'
  },
  {
    id: 'q-jain-3',
    question: 'What does the title "Tirthankara" signify in Jain tradition?',
    type: 'mcq',
    category: 'jainism',
    difficulty: 'medium',
    discoveryId: 11,
    discoveryTitle: 'Vardhamana Mahavira & Tirthankaras',
    discoveryDescription: 'Tirthankaras are revered teachers who build a ford across the difficulties of life.',
    options: [
      'A ford-maker or spiritual guide who shows the path across the stream of worldly struggles',
      'A royal architect who builds stone palaces for kings',
      'A commander of ancient chariots in battle',
      'A wandering poet who composes riddles'
    ],
    correctAnswer: 0,
    explanation: 'A Tirthankara is a spiritual guide who establishes a path (tirtha) across life’s challenges through truth, discipline, and ethical conduct.'
  },
  {
    id: 'q-jain-4',
    question: 'Match these essential Jain concepts with their correct meaning:',
    type: 'match',
    category: 'jainism',
    difficulty: 'medium',
    discoveryId: 12,
    discoveryTitle: 'Ahimsa: Reverence for All Life',
    discoveryDescription: 'Distinguish clearly between Ahimsa, Anekantavada, and Aparigraha.',
    pairs: [
      { id: 'p7', left: 'Ahimsa', right: 'Non-violence and reverence for all living creatures' },
      { id: 'p8', left: 'Anekantavada', right: 'Understanding that reality has multiple perspectives' },
      { id: 'p9', left: 'Aparigraha', right: 'Non-attachment and limiting unnecessary possessions' }
    ],
    explanation: 'Ahimsa is non-injury, Anekantavada is multiplicity of viewpoints, and Aparigraha is non-possessiveness.'
  },
  {
    id: 'q-jain-5',
    question: 'Which situation best demonstrates the principle of Anekantavada in everyday school life?',
    type: 'scenario',
    category: 'jainism',
    difficulty: 'medium',
    discoveryId: 13,
    discoveryTitle: 'Anekantavada: Many Perspectives',
    discoveryDescription: 'Applying multi-perspective understanding to resolve classroom disagreements.',
    scenarioContext: 'Two students strongly disagree on how to solve a community history project. One wants an art poster, the other wants an oral interview.',
    options: [
      'Listening carefully to both ideas and combining them, realizing each approach highlights a valuable aspect of history',
      'Insisting that only one student is right and refusing to talk further',
      'Canceling the project completely so neither has to work',
      'Letting a coin flip decide without discussing the merits'
    ],
    correctAnswer: 0,
    explanation: 'Anekantavada teaches that recognizing partial truths in differing viewpoints leads to comprehensive understanding and collaboration.'
  },

  // ==================== ZONE 5: FOLK & TRIBAL TRADITIONS (Discoveries 14-17) ====================
  {
    id: 'q-folk-1',
    question: 'How do tribal and folk communities traditionally preserve their history, values, and ecological wisdom?',
    type: 'mcq',
    category: 'folk-traditions',
    difficulty: 'easy',
    discoveryId: 14,
    discoveryTitle: 'Oral Lore & Village Storytelling',
    discoveryDescription: 'Folk and tribal histories thrive through songs, community storytelling, and generational performance.',
    options: [
      'Through vibrant oral traditions, storytelling, community songs, and seasonal performances passed down generations',
      'Exclusively through stone inscriptions commissioned by emperors',
      'By keeping knowledge secret and never sharing it with children',
      'Only through foreign travelers writing diaries'
    ],
    correctAnswer: 0,
    explanation: 'Folk and tribal lore is kept alive through generational oral storytelling, rhythmic songs, and community gatherings.'
  },
  {
    id: 'q-folk-2',
    question: 'What is a "Sacred Grove" (known locally as Devrai, Sarna, or Kovil Kadu)?',
    type: 'mcq',
    category: 'tribal-traditions',
    difficulty: 'medium',
    discoveryId: 15,
    discoveryTitle: 'Sacred Nature & Indigenous Wisdom',
    discoveryDescription: 'Sacred groves are community-protected forest patches that conserve pristine biodiversity.',
    options: [
      'A community-protected patch of forest where trees and animals are preserved out of spiritual and ecological reverence',
      'A private orchard used exclusively for commercial fruit sales',
      'A cleared field where all trees have been cut down for mining',
      'A temporary tent set up during hunting expeditions'
    ],
    correctAnswer: 0,
    explanation: 'Sacred groves are ancient community-conserved forest patches that have protected rich biodiversity, medicinal plants, and water sources for centuries.'
  },
  {
    id: 'q-folk-3',
    question: 'Traditional art styles like Warli and Gond are wonderful examples of folk heritage because they:',
    type: 'mcq',
    category: 'folk-traditions',
    difficulty: 'easy',
    discoveryId: 16,
    discoveryTitle: 'Traditional Crafts & Community Art',
    discoveryDescription: 'Folk arts depict harmonious community life, farming, birds, and animals using natural pigments.',
    options: [
      'Express community life, harvest rituals, and sacred relationships with animals using simple natural pigments',
      'Were only made using imported European oil paints',
      'Never portray trees, birds, or human celebrations',
      'Were created only for displaying in royal treasuries'
    ],
    correctAnswer: 0,
    explanation: 'Warli, Gond, and terracotta arts celebrate daily village rhythms, circle dances, nature, and community life using natural materials.'
  },
  {
    id: 'q-folk-4',
    question: 'Match the folk and tribal cultural expression with its core aspect:',
    type: 'match',
    category: 'tribal-traditions',
    difficulty: 'medium',
    discoveryId: 17,
    discoveryTitle: 'Living Celebrations & Folk Dances',
    discoveryDescription: 'Community solidarity and celebrations connect people to seasons and earth.',
    pairs: [
      { id: 'p10', left: 'Sacred Groves (Sarna/Devrai)', right: 'Community conservation of forest biodiversity' },
      { id: 'p11', left: 'Folk Circle Dances', right: 'Celebrating harvest cycles and community solidarity' },
      { id: 'p12', left: 'Warli Wall Paintings', right: 'Depicting village harmony with natural surroundings' }
    ],
    explanation: 'Tribal and folk traditions integrate ecological conservation, community dance, and indigenous visual arts into everyday living.'
  },
  {
    id: 'q-folk-5',
    question: 'True or False: Tribal and folk traditions are a vital, equal part of India’s rich cultural heritage, contributing profound ecological wisdom and vibrant arts.',
    type: 'true-false',
    category: 'tribal-traditions',
    difficulty: 'easy',
    discoveryId: 15,
    discoveryTitle: 'Sacred Nature & Indigenous Wisdom',
    discoveryDescription: 'Folk and tribal knowledge is an indispensable branch of India’s cultural heritage.',
    options: ['True — Folk and tribal traditions form an essential foundation of Indian cultural heritage', 'False — Only written court chronicles are part of Indian heritage'],
    correctAnswer: 0,
    explanation: 'India’s heritage is made rich by the diversity of folk, tribal, and regional traditions that have lived alongside philosophical schools for thousands of years.'
  },

  // ==================== ZONE 6: SHARED CULTURAL HERITAGE (Discoveries 18-20) ====================
  {
    id: 'q-shar-1',
    question: 'How did different cultural traditions (Vedic, Buddhist, Jain, Folk, and Tribal) interact over Indian history?',
    type: 'mcq',
    category: 'shared-heritage',
    difficulty: 'easy',
    discoveryId: 18,
    discoveryTitle: 'Confluence of Ideas & Dialogues',
    discoveryDescription: 'Traditions constantly shared, influenced, and enriched one another through dialogue and travel.',
    options: [
      'They engaged in continuous dialogue, sharing stories, artistic motifs, and ethical values that enriched one another',
      'They lived in total isolation without ever seeing or talking to one another',
      'They were completely identical in every single rule and practice',
      'One tradition destroyed all other traditions in ancient times'
    ],
    correctAnswer: 0,
    explanation: 'Indian history is marked by deep dialogue, where ideas of non-violence, meditation, storytelling, and reverence for nature cross-pollinated among diverse traditions.'
  },
  {
    id: 'q-shar-2',
    question: 'Classify these key cultural ideas into their primary associated traditions:',
    type: 'sorting',
    category: 'shared-heritage',
    difficulty: 'hard',
    discoveryId: 18,
    discoveryTitle: 'Confluence of Ideas & Dialogues',
    discoveryDescription: 'Recognizing the unique contributions of each tradition to the shared tapestry.',
    sortBuckets: ['Vedic & Upanishadic', 'Buddhism', 'Jainism'],
    sortItems: [
      { id: 's1', label: 'Inquiry into Atman & Brahman', targetCategory: 'Vedic & Upanishadic' },
      { id: 's2', label: 'The Middle Way (Majjhima Patipada)', targetCategory: 'Buddhism' },
      { id: 's3', label: 'Anekantavada (Multiple Perspectives)', targetCategory: 'Jainism' },
      { id: 's4', label: 'Rig Vedic Hymns in Praise of Nature', targetCategory: 'Vedic & Upanishadic' },
      { id: 's5', label: 'Sarnath Deer Park Sermon', targetCategory: 'Buddhism' },
      { id: 's6', label: 'Supreme Vow of Ahimsa to All Life', targetCategory: 'Jainism' }
    ],
    explanation: 'Each tradition contributed foundational insights: Vedic inquiry into unity, Buddhism’s Middle Way, and Jainism’s profound ethics of Ahimsa and Anekantavada.'
  },
  {
    id: 'q-shar-3',
    question: 'What is the most accurate mental model of India’s cultural heritage according to Chapter 7?',
    type: 'mcq',
    category: 'shared-heritage',
    difficulty: 'easy',
    discoveryId: 20,
    discoveryTitle: 'Shared Cultural Heritage',
    discoveryDescription: 'Many roots, many ideas, and many traditions creating a diverse and continuous heritage.',
    options: [
      'A magnificent tree with many diverse roots, branching out into arts, values, and shared community heritage',
      'A single narrow stream that never accepted any other tributaries',
      'A rigid competition where one group claims superiority over all others',
      'A museum exhibit that stopped developing 2000 years ago'
    ],
    correctAnswer: 0,
    explanation: 'India’s heritage is best understood as a grand living tree with multiple diverse roots—Vedic, Upanishadic, Buddhist, Jain, Folk, and Tribal—supporting a rich, shared canopy.'
  },
  {
    id: 'q-shar-4',
    question: 'Which of the following values is a shared thread running across multiple ancient Indian traditions?',
    type: 'mcq',
    category: 'shared-heritage',
    difficulty: 'medium',
    discoveryId: 19,
    discoveryTitle: 'Living Traditions & Continuity',
    discoveryDescription: 'Compassion, respect for knowledge, and harmony with nature are celebrated across traditions.',
    options: [
      'Compassion, respect for living creatures, seeking wisdom, and living in balance with nature',
      'Hoarding as much gold as possible regardless of others’ suffering',
      'Forbidding all forms of questioning and curious exploration',
      'Cutting down forests to demonstrate human dominance'
    ],
    correctAnswer: 0,
    explanation: 'Values of compassion, harmony with the environment, hospitality, and reverence for learning resonate across all roots of Indian heritage.'
  },
  {
    id: 'q-shar-5',
    question: 'True or False: India’s cultural heritage is a living tradition that continues to influence contemporary literature, values, arts, and everyday ethics.',
    type: 'true-false',
    category: 'shared-heritage',
    difficulty: 'easy',
    discoveryId: 19,
    discoveryTitle: 'Living Traditions & Continuity',
    discoveryDescription: 'Continuity and contemporary vitality define Indian cultural roots.',
    options: ['True — Ancient roots remain vibrant in everyday festivals, art, Yoga, and ethical values', 'False — Ancient traditions completely disappeared centuries ago'],
    correctAnswer: 0,
    explanation: 'India’s cultural roots are living traditions that continue to shape language, festivals, arts, yoga, ethics, and community life today.'
  }
];
