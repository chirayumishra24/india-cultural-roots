export interface ThenNowComparison {
  id: string;
  domain: string;
  thenTitle: string;
  thenDescription: string;
  nowTitle: string;
  nowDescription: string;
  continuityQuestion: string;
  continuityOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const THEN_NOW_COMPARISONS: ThenNowComparison[] = [
  {
    id: 'tn_001',
    domain: 'Textiles & Weaving',
    thenTitle: 'THEN: Ancient Pit-Looms & Herbal Indigo Vats',
    thenDescription: 'Artisans spent months spinning local organic cotton by hand, dying fibers with crushed leaves and mineral mordants.',
    nowTitle: 'NOW: Contemporary Handloom Collectives & Sustainable Fashion',
    nowDescription: 'Modern weavers preserve heirloom motifs (like peacock, paisley, and lotus borders) while exporting eco-friendly apparel globally.',
    continuityQuestion: 'What element of this cultural tradition demonstrates clear CONTINUITY over time?',
    continuityOptions: [
      { id: 'tn_opt1', text: 'The preservation of core artistic motifs and human handcrafting principles', isCorrect: true },
      { id: 'tn_opt2', text: 'Every single weaver must wear identical clothing today', isCorrect: false },
      { id: 'tn_opt3', text: 'The price of cotton has never changed in 2000 years', isCorrect: false }
    ],
    explanation: 'Continuity does not mean stagnation; the artistic visual vocabulary and craft heritage endure even as market reach evolves.'
  },
  {
    id: 'tn_002',
    domain: 'Musical Performance',
    thenTitle: 'THEN: Acoustic Courtyard Baithaks & Temple Mandapams',
    thenDescription: 'Performers played stringed tanpuras and bamboo flutes in natural acoustic chambers without microphones.',
    nowTitle: 'NOW: Digital Audio Streams, Concert Halls & Global Fusion',
    nowDescription: 'Classical ragas are recorded in high-definition studios and listened to across the world on digital devices.',
    continuityQuestion: 'What represents the balance of CHANGE and CONTINUITY in this musical expression?',
    continuityOptions: [
      { id: 'tn_opt_a', text: 'The melodic raga framework continues, while the medium of listening and sound amplification has changed', isCorrect: true },
      { id: 'tn_opt_b', text: 'All Indian musical instruments were invented last year', isCorrect: false },
      { id: 'tn_opt_c', text: 'Ragas can no longer be played on traditional instruments', isCorrect: false }
    ],
    explanation: 'Ragas preserve classical microtonal aesthetics (continuity) while benefiting from modern recording technology (change).'
  }
];
