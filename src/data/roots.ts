import { CulturalTreeNode } from '../types/tree';

export const INITIAL_TREE_NODES: CulturalTreeNode[] = [
  {
    id: 'stories',
    name: 'Stories',
    icon: 'book-open',
    color: '#9B51E0',
    darkColor: '#6C3483',
    position: { x: 50, y: 15 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Oral storytelling traditions passed through generations', 'Epics and community folk narratives'],
    subBranches: [
      {
        id: 'sb_story_1',
        name: 'Panchatantra Parables',
        region: 'Pan-Indian',
        description: 'Animal fables imparting statecraft, ethics, and moral decision-making.',
        clue: 'Attributed to sage Vishnu Sharma; translated into Persian (Kalila wa Dimna), Arabic, and Latin.',
        badge: 'Moral Wisdom'
      },
      {
        id: 'sb_story_2',
        name: 'Phad & Scroll Narratives',
        region: 'Rajasthan & Gujarat',
        description: 'Bhopa narrators singing folklore in front of long painted cloth scrolls with ravanahatha violins.',
        clue: 'Night-long village performances bringing painted epics into oral sound.',
        badge: 'Visual Epic'
      },
      {
        id: 'sb_story_3',
        name: 'Jataka Tales & Bodhi Legends',
        region: 'Central & Eastern India',
        description: 'Narratives of compassion and selflessness carved on stone gateways at Sanchi and Bharhut.',
        clue: 'Inscribed in stone relief medallions so pilgrims can read moral deeds visually.',
        badge: 'Carved Lore'
      }
    ]
  },
  {
    id: 'language',
    name: 'Language',
    icon: 'message-circle',
    color: '#F2994A',
    darkColor: '#B9770E',
    position: { x: 26, y: 35 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Ancient scripts and spoken dialects carrying collective memory', 'Grammar systems and inscriptions'],
    subBranches: [
      {
        id: 'sb_lang_1',
        name: 'Brahmi & Kharosthi Scripts',
        region: 'Pan-Indian & North-West',
        description: 'Mother scripts that gave birth to Devanagari, Bengali, Tamil, Telugu, Kannada, and Malayalam scripts.',
        clue: 'Deciphered by James Prinsep on rock edicts and copper plates.',
        badge: 'Script Origin'
      },
      {
        id: 'sb_lang_2',
        name: 'Panini’s Ashtadhyayi (Linguistic Grammar)',
        region: 'North-West (Gandhara / Shalatula)',
        description: 'Formal mathematical description of Sanskrit phonetics and syntax, predating modern computer linguistics.',
        clue: 'Uses generative algebraic rules and meta-rules for grammar.',
        badge: 'Applied Linguistics'
      },
      {
        id: 'sb_lang_3',
        name: 'Tolkappiyam (Early Classical Grammar)',
        region: 'Southern India (Tamilakam)',
        description: 'Ancient treatise on Tamil phonetics, morphology, and the poetry of landscape (Thinai).',
        clue: 'Connects linguistic rules directly to human emotion and ecology.',
        badge: 'Poetic Grammar'
      }
    ]
  },
  {
    id: 'arts',
    name: 'Arts',
    icon: 'palette',
    color: '#00BCD4',
    darkColor: '#00838F',
    position: { x: 74, y: 35 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Cave murals, miniature paintings, and temple sculptures', 'Folk motifs and textile dyes'],
    subBranches: [
      {
        id: 'sb_art_1',
        name: 'Ajanta Cave Frescoes',
        region: 'Maharashtra (Western Ghats)',
        description: 'Murals painted on mud-plaster cave walls using lapis lazuli and mineral pigments.',
        clue: 'Mastery of perspective, emotional expression, and textile rendering in cave shadows.',
        badge: 'Mineral Murals'
      },
      {
        id: 'sb_art_2',
        name: 'Warli & Madhubani Folk Art',
        region: 'Maharashtra & Bihar',
        description: 'Geometric rice-flour motifs depicting village harvest, sacred trees, and fertility spirals.',
        clue: 'Painted communally by women on mud hut walls to mark seasonal passages.',
        badge: 'Folk Living Art'
      },
      {
        id: 'sb_art_3',
        name: 'Chola Lost-Wax Bronze Casting',
        region: 'Tamil Nadu (Thanjavur)',
        description: 'Cire-perdue sculpture technique producing dynamic icons like Nataraja and Parvati.',
        clue: 'Exact mathematical proportions codified in Shilpa Shastras.',
        badge: 'Bronze Metallurgy'
      }
    ]
  },
  {
    id: 'music',
    name: 'Music',
    icon: 'music',
    color: '#E91E63',
    darkColor: '#AD1457',
    position: { x: 20, y: 65 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Rhythm cycles and classical acoustic instruments', 'Community folk songs celebrating harvest and nature'],
    subBranches: [
      {
        id: 'sb_mus_1',
        name: 'Natya Shastra & Raga Foundations',
        region: 'Pan-Indian',
        description: 'Bharata Muni’s foundational classification of musical scales (grama-murchhana) and microtones (shrutis).',
        clue: 'Connects sound micro-intervals to emotional states (rasas).',
        badge: 'Classical Theory'
      },
      {
        id: 'sb_mus_2',
        name: 'Baul & Mystic Minstrels',
        region: 'Bengal & Assam',
        description: 'Nomadic bards playing the single-string ektara and duggi drum singing songs of inner truth.',
        clue: 'Recognized by UNESCO as Masterpiece of the Oral and Intangible Heritage.',
        badge: 'Oral Folk Mysticism'
      },
      {
        id: 'sb_mus_3',
        name: 'Tala Rhythmic Cycles',
        region: 'Southern & Northern Traditions',
        description: 'Polyrhythmic cycles counted with hand gestures and played on Mridangam and Tabla.',
        clue: 'Mathematical permutations of beats dividing time with micro-second accuracy.',
        badge: 'Acoustic Rhythm'
      }
    ]
  },
  {
    id: 'knowledge',
    name: 'Knowledge',
    icon: 'lightbulb',
    color: '#F5B041',
    darkColor: '#D4881A',
    position: { x: 80, y: 65 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Astronomy, medicinal herb traditions, and mathematics', 'Sustainable water harvesting systems'],
    subBranches: [
      {
        id: 'sb_know_1',
        name: 'Aryabhatiya & Zero (Sunya)',
        region: 'Bihar (Kusumapura / Pataliputra)',
        description: 'Aryabhata’s treatise stating Earth’s rotation, solar eclipses, and place-value decimal system.',
        clue: 'Calculated approximation of Pi (π) to four decimal places (3.1416).',
        badge: 'Mathematics'
      },
      {
        id: 'sb_know_2',
        name: 'Charaka & Sushruta Samhitas',
        region: 'North & Western India',
        description: 'Pioneering medical texts on surgery, plant-based remedies, anatomy, and holistic pathology.',
        clue: 'Detailed 120 surgical instruments including scalpels, forceps, and rhinoplasty reconstructive techniques.',
        badge: 'Medical Science'
      },
      {
        id: 'sb_know_3',
        name: 'Wootz Steel & Crucible Metallurgy',
        region: 'Southern India (Telangana & Karnataka)',
        description: 'High-carbon crucible steel exported across the ancient world to forge legendary Damascus blades.',
        clue: 'Nanotube carbon structures identified in ancient Indian ingots.',
        badge: 'Advanced Metallurgy'
      }
    ]
  },
  {
    id: 'practices',
    name: 'Practices',
    icon: 'sprout',
    color: '#27AE60',
    darkColor: '#1E8449',
    position: { x: 28, y: 92 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Seasonal celebrations and mindful living customs', 'Artisanal handloom and pottery techniques'],
    subBranches: [
      {
        id: 'sb_prac_1',
        name: 'Stepped Baolis & Kunds',
        region: 'Gujarat & Rajasthan',
        description: 'Multi-story subterranean stepwells capturing rainwater in arid desert climates.',
        clue: 'Combines cooling communal chambers with architectural carvings.',
        badge: 'Ecological Engineering'
      },
      {
        id: 'sb_prac_2',
        name: 'Handloom Weaving Lineages',
        region: 'Varanasi, Kanchipuram, Sambalpur',
        description: 'Generational guilds weaving silk, cotton, and muslin with Jacquard-style loom drawstrings.',
        clue: 'Hand-dyed with madder root, indigo vats, and turmeric extract.',
        badge: 'Living Craft Guilds'
      },
      {
        id: 'sb_prac_3',
        name: 'Sacred Groves (Devrais / Kavu)',
        region: 'Western Ghats, Meghalaya, Kerala',
        description: 'Community-protected virgin forests preserving medicinal flora and groundwater sources.',
        clue: 'Traditional ecological taboo preventing any felling of trees.',
        badge: 'Conservation Heritage'
      }
    ]
  },
  {
    id: 'heritage',
    name: 'Heritage',
    icon: 'landmark',
    color: '#5C6BC0',
    darkColor: '#3949AB',
    position: { x: 72, y: 92 },
    isDiscovered: false,
    discoveredCount: 0,
    clues: ['Monumental stone architecture and protected living traditions', 'Community sacred groves and living archives'],
    subBranches: [
      {
        id: 'sb_her_1',
        name: 'Monolithic Rock Temples (Kailasa)',
        region: 'Ellora (Maharashtra)',
        description: 'World’s largest monolithic rock excavation carved top-down from a single basalt cliff.',
        clue: 'Over 200,000 tons of rock removed without structural scaffolding.',
        badge: 'Monolithic Marvel'
      },
      {
        id: 'sb_her_2',
        name: 'Living Brihadisvara Temple',
        region: 'Thanjavur (Tamil Nadu)',
        description: 'Granite vimana tower topped with an 80-ton single stone dome built by Raja Raja Chola I.',
        clue: 'Has continued daily ritual worship, dance, and music continuously for over 1000 years.',
        badge: 'Living Heritage'
      },
      {
        id: 'sb_her_3',
        name: 'Sanchi Great Stupa Gateways (Toranas)',
        region: 'Madhya Pradesh',
        description: 'Carved sandstone gateways narrating trade routes, foreign visitors, and Ashokan pillars.',
        clue: 'Funded by diverse guilds of ivory carvers from Vidisha.',
        badge: 'Civic Inscription'
      }
    ]
  }
];
