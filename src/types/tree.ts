import { CulturalCategory } from './challenges';

export interface CulturalSubBranch {
  id: string;
  name: string;
  region: string;
  description: string;
  clue: string;
  badge: string;
}

export interface CulturalTreeNode {
  id: CulturalCategory;
  name: string;
  icon: string;
  color: string;
  darkColor: string;
  position: { x: number; y: number }; // percentage coordinates within tree canopy
  isDiscovered: boolean;
  discoveredCount: number;
  clues: string[];
  subBranches?: CulturalSubBranch[];
}

export interface HeritageDiscoveryCardData {
  id: string;
  title: string;
  category: CulturalCategory;
  clueText: string;
  illustrationType: 'manuscript' | 'music' | 'textile' | 'architecture' | 'storytelling' | 'craft';
  position: 'top-left' | 'mid-left' | 'bottom-left' | 'top-right' | 'mid-right' | 'bottom-right';
  isDiscovered: boolean;
  connectedNodeId: CulturalCategory;
}

export type RelationType =
  | 'relatedTo'
  | 'supports'
  | 'connects'
  | 'continues'
  | 'changes'
  | 'expresses';

export interface GraphEdge {
  from: string;
  to: string;
  relation: RelationType;
  description: string;
}
