import { CulturalZone, Discovery } from '../types/game';

export const CULTURAL_ZONES: CulturalZone[] = [
  {
    index: 1,
    title: 'Vedas & Vedic Culture',
    shortTitle: 'Vedic Culture',
    range: '1–4',
    startDiscovery: 1,
    endDiscovery: 4,
    description: 'Ancient hymns, inquiries into the universe, and the meticulous oral tradition of preserving wisdom.',
    keyThemes: ['Four Vedas', 'Oral Tradition', 'Rishis & Rishikas', 'Nature Hymns'],
    color: '#3B82F6', // Blue
    accentBg: '#EFF6FF',
    landmarkName: 'Forest Hermitage & Sacred Hearth'
  },
  {
    index: 2,
    title: 'Upanishads & Schools of Thought',
    shortTitle: 'Upanishads',
    range: '5–7',
    startDiscovery: 5,
    endDiscovery: 7,
    description: 'Deep philosophical dialogues exploring knowledge, inner self, the nature of reality, and mindful living.',
    keyThemes: ['Philosophical Inquiry', 'Vedanta', 'Yoga & Discipline', 'Dialogue & Debate'],
    color: '#8B5CF6', // Purple
    accentBg: '#F5F3FF',
    landmarkName: 'Banyan Tree Contemplation Pavilion'
  },
  {
    index: 3,
    title: 'Buddhism',
    shortTitle: 'Buddhism',
    range: '8–10',
    startDiscovery: 8,
    endDiscovery: 10,
    description: 'The search for enlightenment, ethical conduct, compassion for all beings, and the Middle Way.',
    keyThemes: ['Siddhartha Gautama', 'Enlightenment', 'Compassion', 'Middle Way'],
    color: '#EAB308', // Amber / Gold
    accentBg: '#FEFCE8',
    landmarkName: 'Great Stupa & Monastic Courtyard'
  },
  {
    index: 4,
    title: 'Jainism',
    shortTitle: 'Jainism',
    range: '11–13',
    startDiscovery: 11,
    endDiscovery: 13,
    description: 'Teachings of Mahavira emphasizing reverence for all life, multiple viewpoints, and disciplined ethical conduct.',
    keyThemes: ['Mahavira', 'Ahimsa (Non-violence)', 'Anekantavada (Multi-perspectives)', 'Truthful Living'],
    color: '#F97316', // Orange
    accentBg: '#FFF7ED',
    landmarkName: 'Carved Marble Temple & Sanctum'
  },
  {
    index: 5,
    title: 'Folk & Tribal Traditions',
    shortTitle: 'Folk & Tribal',
    range: '14–17',
    startDiscovery: 14,
    endDiscovery: 17,
    description: 'Rich oral narratives, sacred relationships with forests and nature, community crafts, and vibrant folk celebrations.',
    keyThemes: ['Living Oral Lore', 'Sacred Nature', 'Indigenous Crafts', 'Community Dances'],
    color: '#10B981', // Emerald
    accentBg: '#ECFDF5',
    landmarkName: 'Village Hamlet & Sacred Grove'
  },
  {
    index: 6,
    title: 'Shared Cultural Heritage',
    shortTitle: 'Shared Heritage',
    range: '18–20',
    startDiscovery: 18,
    endDiscovery: 20,
    description: 'How diverse roots and traditions flowed together over millennia to build India’s shared cultural heritage.',
    keyThemes: ['Cultural Confluence', 'Continuous Heritage', 'Unity in Diversity', 'Collective Memory'],
    color: '#EC4899', // Rose/Pink
    accentBg: '#FDF2F8',
    landmarkName: 'Great Torana Gateway & Confluence Plaza'
  }
];

export const DISCOVERIES_LIST: Discovery[] = [
  // Zone 1: Vedas (1-4)
  {
    id: 1,
    zoneIndex: 1,
    zoneTitle: 'Vedas & Vedic Culture',
    title: 'The Four Vedas',
    category: 'vedic-culture',
    shortExplanation: 'The Rig, Yajur, Sama, and Atharva Vedas are ancient collections of hymns and knowledge preserved over generations.',
    detailedInsight: 'The word "Veda" comes from the root "vid", meaning knowledge. The Rig Veda contains ancient hymns in praise of cosmic deities, the Sama Veda sets hymns to musical melodies, the Yajur Veda contains ritual chants, and the Atharva Veda preserves prayers and everyday wisdom.',
    keyConcepts: ['Rig Veda', 'Yajur Veda', 'Sama Veda', 'Atharva Veda'],
    iconName: 'BookOpen',
    symbol: '📜'
  },
  {
    id: 2,
    zoneIndex: 1,
    zoneTitle: 'Vedas & Vedic Culture',
    title: 'Vedic Hymns (Suktas)',
    category: 'vedic-culture',
    shortExplanation: 'Composed as "suktas" (well-spoken verses), these hymns express wonder and reverence for the natural world.',
    detailedInsight: 'Vedic hymns celebrate the forces of nature—Agni (fire), Indra (thunder and rain), and Ushas (the dawn). They reflect a deep connection between human communities and the cosmic environment, praising the natural elements that sustain life.',
    keyConcepts: ['Sukta', 'Agni', 'Ushas', 'Reverence for Nature'],
    iconName: 'Flame',
    symbol: '🔥'
  },
  {
    id: 3,
    zoneIndex: 1,
    zoneTitle: 'Vedas & Vedic Culture',
    title: 'Rishis and Rishikas',
    category: 'vedic-culture',
    shortExplanation: 'Hymns were composed and visualized by respected thinkers, including notable women scholars like Gargi and Maitreyi.',
    detailedInsight: 'The ancient thinkers who composed the Vedic verses were called Rishis (sages) and Rishikas (women scholars). Dialogues in ancient texts document women scholars actively participating in royal assemblies and philosophical discussions.',
    keyConcepts: ['Rishis', 'Rishikas', 'Gargi', 'Maitreyi'],
    iconName: 'Users',
    symbol: '✨'
  },
  {
    id: 4,
    zoneIndex: 1,
    zoneTitle: 'Vedas & Vedic Culture',
    title: 'Vedic Oral Tradition',
    category: 'vedic-culture',
    shortExplanation: 'Knowledge was transmitted orally through chanting with rigorous pronunciation and rhythm, without writing.',
    detailedInsight: 'Through specialized chanting methods like Padapatha and Ghanapatha, generation after generation memorized thousands of verses with exact intonation and meter, preserving the texts with remarkable fidelity across millennia.',
    keyConcepts: ['Shruti', 'Chanting', 'Oral Transmission', 'Sound Precision'],
    iconName: 'Mic',
    symbol: '🗣️'
  },

  // Zone 2: Upanishads & Schools of Thought (5-7)
  {
    id: 5,
    zoneIndex: 2,
    zoneTitle: 'Upanishads & Schools of Thought',
    title: 'The Upanishads: Inquiry & Dialogue',
    category: 'upanishads',
    shortExplanation: 'The Upanishads represent conversations between seekers and teachers asking deep questions about life and the self.',
    detailedInsight: 'The word "Upanishad" suggests sitting down near a teacher to learn. These texts moved beyond rituals to ask reflective questions: "Who am I?", "What is the true nature of reality?", and "What connects all beings together?"',
    keyConcepts: ['Questioning', 'Teacher-Student Dialogue', 'Atman', 'Brahman'],
    iconName: 'MessageSquare',
    symbol: '💬'
  },
  {
    id: 6,
    zoneIndex: 2,
    zoneTitle: 'Upanishads & Schools of Thought',
    title: 'Vedanta & Oneness of Life',
    category: 'vedanta-yoga',
    shortExplanation: 'Vedanta explores the fundamental oneness of the universe, linking the individual self with the universal reality.',
    detailedInsight: 'Meaning the "end or culmination of the Vedas", Vedanta teaches that beneath the surface diversity of the world lies a shared essence connecting all living beings, encouraging compassion, harmony, and mutual respect.',
    keyConcepts: ['Vedanta', 'Universal Oneness', 'Shared Essence', 'Harmony'],
    iconName: 'Sun',
    symbol: '☀️'
  },
  {
    id: 7,
    zoneIndex: 2,
    zoneTitle: 'Upanishads & Schools of Thought',
    title: 'Yoga: Harmony of Mind and Body',
    category: 'vedanta-yoga',
    shortExplanation: 'Yoga is an ancient system of mindful living, physical discipline, and concentration to attain mental clarity.',
    detailedInsight: 'Rooted in the Sanskrit word "yuj" meaning to join or unite, Yoga integrates ethical living, physical postures, breath awareness, and meditation to cultivate a calm, focused, and balanced mind.',
    keyConcepts: ['Self-Discipline', 'Meditation', 'Mind-Body Balance', 'Clarity'],
    iconName: 'Compass',
    symbol: '🧘'
  },

  // Zone 3: Buddhism (8-10)
  {
    id: 8,
    zoneIndex: 3,
    zoneTitle: 'Buddhism',
    title: 'Siddhartha Gautama & Enlightenment',
    category: 'buddhism',
    shortExplanation: 'Prince Siddhartha left luxury to understand why beings suffer, attaining enlightenment under the Bodhi tree at Bodh Gaya.',
    detailedInsight: 'Witnessing sickness, old age, and sorrow, Siddhartha dedicated years to contemplation. Rejecting extreme austerities, he attained deep realization and became known as the Buddha, or "The Awakened One".',
    keyConcepts: ['Siddhartha Gautama', 'Bodh Gaya', 'Awakened One', 'Enlightenment'],
    iconName: 'Sparkles',
    symbol: '🌿'
  },
  {
    id: 9,
    zoneIndex: 3,
    zoneTitle: 'Buddhism',
    title: 'Buddha’s Teachings & Compassion',
    category: 'buddhism',
    shortExplanation: 'The Buddha taught in Prakrit, the language of everyday people, sharing practical principles for ethical living and compassion.',
    detailedInsight: 'In his first sermon at Sarnath (the Deer Park), the Buddha set into motion the wheel of Dharma. He taught that understanding the causes of sorrow and practicing kindness toward all beings brings inner peace.',
    keyConcepts: ['Sarnath', 'Dharma Wheel', 'Prakrit Language', 'Kindness to All'],
    iconName: 'HeartHandshake',
    symbol: '☸️'
  },
  {
    id: 10,
    zoneIndex: 3,
    zoneTitle: 'Buddhism',
    title: 'The Middle Way (Majjhima Patipada)',
    category: 'buddhism',
    shortExplanation: 'The Middle Way advises avoiding both extreme luxury and severe self-denial, following a balanced and mindful lifestyle.',
    detailedInsight: 'Just as lute strings tuned too tight or too loose cannot produce sweet music, the human life flourishes best through balance, thoughtful choices, moderation, and ethical daily conduct.',
    keyConcepts: ['Middle Way', 'Moderation', 'Balanced Living', 'Mindfulness'],
    iconName: 'Scale',
    symbol: '⚖️'
  },

  // Zone 4: Jainism (11-13)
  {
    id: 11,
    zoneIndex: 4,
    zoneTitle: 'Jainism',
    title: 'Vardhamana Mahavira & Tirthankaras',
    category: 'jainism',
    shortExplanation: 'Vardhamana Mahavira was the 24th Tirthankara, reviving teachings of truthful, disciplined, and spiritual living.',
    detailedInsight: 'A Tirthankara is a "ford-maker" who helps guide people across the stream of worldly difficulties. Mahavira taught in common languages so that people from all walks of life could understand moral duties.',
    keyConcepts: ['Mahavira', 'Tirthankara', 'Spiritual Guidance', 'Moral Discipline'],
    iconName: 'Shield',
    symbol: '🏛️'
  },
  {
    id: 12,
    zoneIndex: 4,
    zoneTitle: 'Jainism',
    title: 'Ahimsa: Reverence for All Life',
    category: 'jainism',
    shortExplanation: 'Ahimsa is the supreme vow of non-injury in thought, speech, and action toward every living creature.',
    detailedInsight: 'In Jain thought, all living beings—from large animals to tiny plants and insects—possess life and wish to live. Ahimsa means active compassion, care, and peaceful coexistence with all living forms.',
    keyConcepts: ['Ahimsa', 'Non-violence', 'Compassion', 'Respect for All Creatures'],
    iconName: 'Heart',
    symbol: '🕊️'
  },
  {
    id: 13,
    zoneIndex: 4,
    zoneTitle: 'Jainism',
    title: 'Anekantavada: Many Perspectives',
    category: 'jainism',
    shortExplanation: 'Anekantavada teaches that truth and reality have many dimensions, encouraging tolerance for different viewpoints.',
    detailedInsight: 'Famously illustrated by the story of blind men exploring different parts of an elephant, Anekantavada reminds us that each person sees only a part of the whole truth. It fosters open-mindedness and mutual understanding.',
    keyConcepts: ['Anekantavada', 'Many Viewpoints', 'Humility in Knowledge', 'Tolerance'],
    iconName: 'Layers',
    symbol: '🔍'
  },

  // Zone 5: Folk & Tribal Traditions (14-17)
  {
    id: 14,
    zoneIndex: 5,
    zoneTitle: 'Folk & Tribal Traditions',
    title: 'Oral Lore & Village Storytelling',
    category: 'folk-traditions',
    shortExplanation: 'Countless communities across India preserve histories, wisdom, and humor through songs, proverbs, and folktales.',
    detailedInsight: 'Long before written books were widely available, village storytellers and elders gathered by the community fire to share moral fables, legends of courage, and songs celebrating seasonal rhythms.',
    keyConcepts: ['Storytelling', 'Folk Songs', 'Community Epics', 'Generational Memory'],
    iconName: 'BookMarked',
    symbol: '📖'
  },
  {
    id: 15,
    zoneIndex: 5,
    zoneTitle: 'Folk & Tribal Traditions',
    title: 'Sacred Nature & Indigenous Wisdom',
    category: 'tribal-traditions',
    shortExplanation: 'Tribal communities have maintained sacred groves, protecting biodiversity through deep spiritual respect for forests.',
    detailedInsight: 'Indigenous knowledge recognizes nature not as something to exploit, but as a living family. Sacred groves (Devrais, Sarnas) preserved rare plants, clean water springs, and forest habitats undisturbed for centuries.',
    keyConcepts: ['Sacred Groves', 'Forest Protection', 'Ecological Balance', 'Nature Coexistence'],
    iconName: 'Trees',
    symbol: '🌳'
  },
  {
    id: 16,
    zoneIndex: 5,
    zoneTitle: 'Folk & Tribal Traditions',
    title: 'Traditional Crafts & Community Art',
    category: 'folk-traditions',
    shortExplanation: 'Vibrant artistic traditions like Warli, Gond, and terracotta express everyday connection with community and wildlife.',
    detailedInsight: 'Using locally available materials—rice paste on mud walls, natural mineral pigments, terracotta clay, and woven grasses—folk artisans depict community dances, harvest feasts, birds, and animals.',
    keyConcepts: ['Warli Art', 'Gond Painting', 'Terracotta Crafts', 'Artisan Heritage'],
    iconName: 'Palette',
    symbol: '🎨'
  },
  {
    id: 17,
    zoneIndex: 5,
    zoneTitle: 'Folk & Tribal Traditions',
    title: 'Living Celebrations & Folk Dances',
    category: 'tribal-traditions',
    shortExplanation: 'Seasonal festivals and circle dances celebrate harvest cycles, mutual solidarity, and community harmony.',
    detailedInsight: 'In community dances, men and women link hands in rhythmic circles, moving together to the beat of traditional drums. These festivals reinforce community bonds and express gratitude for nature’s bountiful harvests.',
    keyConcepts: ['Harvest Festivals', 'Circle Dances', 'Community Solidarity', 'Gratitude'],
    iconName: 'Music',
    symbol: '🥁'
  },

  // Zone 6: Shared Cultural Heritage (18-20)
  {
    id: 18,
    zoneIndex: 6,
    zoneTitle: 'Shared Cultural Heritage',
    title: 'Confluence of Ideas & Dialogues',
    category: 'shared-heritage',
    shortExplanation: 'Over centuries, thinkers, monks, traders, and artisans traveled across India, exchanging and enriching diverse ideas.',
    detailedInsight: 'Indian cultural roots did not develop in isolation. Sages, merchants, and wandering scholars met at crossroads, shared stories, adapted artistic styles, and learned from one another in an enduring culture of dialogue.',
    keyConcepts: ['Cultural Exchange', 'Travel & Dialogue', 'Mutual Learning', 'Cross-Pollination'],
    iconName: 'GitMerge',
    symbol: '🌐'
  },
  {
    id: 19,
    zoneIndex: 6,
    zoneTitle: 'Shared Cultural Heritage',
    title: 'Living Traditions & Continuity',
    category: 'shared-heritage',
    shortExplanation: 'Ancient ideas of compassion, hospitality, and environmental care remain actively practiced in modern Indian daily life.',
    detailedInsight: 'Whether in respecting guests (Atithi Devo Bhava), celebrating diversity during festivals, practicing Yoga, or conserving local trees, India’s historical roots continue as a living, evolving tradition.',
    keyConcepts: ['Living Heritage', 'Hospitality', 'Continuity', 'Everyday Ethics'],
    iconName: 'History',
    symbol: '⏳'
  },
  {
    id: 20,
    zoneIndex: 6,
    zoneTitle: 'Shared Cultural Heritage',
    title: 'Shared Cultural Heritage',
    category: 'shared-heritage',
    shortExplanation: 'Many roots, many ideas, and many traditions unite into a rich, shared heritage celebrated by all.',
    detailedInsight: 'India’s heritage is not a single monolith, but a magnificent tapestry woven from Vedic hymns, Upanishadic inquiries, Buddhist and Jain ethical principles, vibrant tribal wisdom, and folk traditions, standing together in harmony.',
    keyConcepts: ['Unity in Diversity', 'Tapestry of Cultures', 'Shared Heritage', 'Mutual Respect'],
    iconName: 'Award',
    symbol: '🏆'
  }
];

export function getZoneForDiscovery(discoveryId: number): CulturalZone {
  const found = CULTURAL_ZONES.find(
    (z) => discoveryId >= z.startDiscovery && discoveryId <= z.endDiscovery
  );
  return found || CULTURAL_ZONES[0];
}
