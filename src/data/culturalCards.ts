import { HeritageDiscoveryCardData } from '../types/tree';

export const INITIAL_HERITAGE_CARDS: HeritageDiscoveryCardData[] = [
  {
    id: 'card_manuscript',
    title: 'Manuscript',
    category: 'language',
    clueText: 'Ancient palm-leaf and birch bark folios recorded knowledge, astronomy, and poetry, passed down through scribes.',
    illustrationType: 'manuscript',
    position: 'top-left',
    isDiscovered: false,
    connectedNodeId: 'language'
  },
  {
    id: 'card_music',
    title: 'Music',
    category: 'music',
    clueText: 'Stringed instruments like the Veena and rhythmic drums shaped classical and regional folk musical traditions.',
    illustrationType: 'music',
    position: 'mid-left',
    isDiscovered: false,
    connectedNodeId: 'music'
  },
  {
    id: 'card_textile',
    title: 'Textile',
    category: 'practices',
    clueText: 'Handloom weaving, natural vegetable dyes, and intricate border patterns preserved craftsmanship across centuries.',
    illustrationType: 'textile',
    position: 'bottom-left',
    isDiscovered: false,
    connectedNodeId: 'practices'
  },
  {
    id: 'card_architecture',
    title: 'Architecture',
    category: 'heritage',
    clueText: 'Rock-cut caves, stepped wells, and structural stone temples demonstrate engineering precision and artistic vision.',
    illustrationType: 'architecture',
    position: 'top-right',
    isDiscovered: false,
    connectedNodeId: 'heritage'
  },
  {
    id: 'card_storytelling',
    title: 'Storytelling',
    category: 'stories',
    clueText: 'Oral narrators, shadow puppetry, and scroll paintings transmitted ethical lessons and folklore to diverse communities.',
    illustrationType: 'storytelling',
    position: 'mid-right',
    isDiscovered: false,
    connectedNodeId: 'stories'
  },
  {
    id: 'card_craft',
    title: 'Craft',
    category: 'arts',
    clueText: 'Terracotta pottery, brass casting, and woodcarving reflect everyday utilitarian design combined with expressive art.',
    illustrationType: 'craft',
    position: 'bottom-right',
    isDiscovered: false,
    connectedNodeId: 'arts'
  }
];
