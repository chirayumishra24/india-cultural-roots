import { GraphEdge } from '../types/tree';

export const CULTURAL_GRAPH_EDGES: GraphEdge[] = [
  {
    from: 'stories',
    to: 'language',
    relation: 'expresses',
    description: 'Stories require the expressive vocabulary of language and regional dialects to be narrated.'
  },
  {
    from: 'language',
    to: 'knowledge',
    relation: 'supports',
    description: 'Written scripts and grammars enabled scientific, mathematical, and philosophical knowledge to be recorded.'
  },
  {
    from: 'arts',
    to: 'heritage',
    relation: 'connects',
    description: 'Visual arts like stone sculpting and painting give tangible form to monumental heritage.'
  },
  {
    from: 'music',
    to: 'practices',
    relation: 'continues',
    description: 'Musical rhythm and folk songs animate harvest festivals and community living practices.'
  },
  {
    from: 'knowledge',
    to: 'practices',
    relation: 'supports',
    description: 'Astronomical calendars and botanical knowledge guide seasonal agricultural and medicinal practices.'
  },
  {
    from: 'heritage',
    to: 'stories',
    relation: 'relatedTo',
    description: 'Architectural friezes and temple murals narrate epics and community folklore in stone.'
  }
];
