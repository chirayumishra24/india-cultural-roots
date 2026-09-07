import { MysteryChallengeData } from '../types/challenges';

export const FINAL_CULTURAL_MYSTERY: MysteryChallengeData = {
  id: 'mystery_final',
  title: 'The Great Cultural Roots Archive Mystery',
  scenario: 'A forgotten palm-leaf collection discovered in an ancient stepwell chamber contains four fragments. The archive was partially scattered. Your mission is to examine the clues, eliminate unsupported claims, and synthesize the ultimate cultural insight to restore the Living Cultural Tree.',
  clues: [
    {
      id: 'clue_frag_1',
      title: 'Fragment 1: Sandalwood Carving Tool',
      detail: 'Fine metal chisels alongside botanical sap residue used to carve temple brackets with intricate dancing figures.',
      icon: 'pen-tool'
    },
    {
      id: 'clue_frag_2',
      title: 'Fragment 2: Strophic Song Folio in Brahmi',
      detail: 'Notations indicating pitch rises and rhythmic cycles dedicated to rain and river waters.',
      icon: 'music'
    },
    {
      id: 'clue_frag_3',
      title: 'Fragment 3: Astronomical Chart of Monsoon Cycles',
      detail: 'Calculations matching stellar constellations with agricultural planting dates for pulses and rice.',
      icon: 'compass'
    },
    {
      id: 'clue_frag_4',
      title: 'Fragment 4: Community Well Maintenance Guild Seal',
      detail: 'Stipulation that town potters, stonecutters, and poets all shared responsibilities for conserving community water tanks.',
      icon: 'shield-check'
    }
  ],
  eliminations: [
    {
      id: 'elim_1',
      claim: 'Ancient Indian culture was created entirely by a single isolated group in one solitary city.',
      isSupported: false,
      reason: 'Unsupported: The clues clearly show diverse guilds (stonecutters, poets, farmers) collaborating across arts, science, and ecology.'
    },
    {
      id: 'elim_2',
      claim: 'Art, music, and science were closely intertwined with community practices and ecological cycles like monsoons.',
      isSupported: true,
      reason: 'Supported: The fragments link rain charts (astronomy), river songs (music), water tanks (guilds), and temple carvings (art).'
    },
    {
      id: 'elim_3',
      claim: 'Cultural traditions had no practical value and were never used in daily life.',
      isSupported: false,
      reason: 'Unsupported: The guilds managed vital survival resources like municipal water tanks and agricultural calendars.'
    }
  ],
  finalSynthesisQuestion: 'Based on these four converging pieces of evidence, what is the most scientifically and historically supported conclusion?',
  synthesisOptions: [
    {
      id: 'syn_opt_1',
      text: 'India’s cultural roots represent a dynamic, interconnected network where artistic expression, scientific knowledge, and community practices reinforced each other.',
      isCorrect: true
    },
    {
      id: 'syn_opt_2',
      text: 'All Indian traditions stopped developing after ancient times and have no connection to present life.',
      isCorrect: false
    },
    {
      id: 'syn_opt_3',
      text: 'Each cultural practice existed completely separated from nature, seasons, and human collaboration.',
      isCorrect: false
    }
  ],
  treeRestorationImpact: 'By synthesizing all fragments, you awaken the full canopy of the Cultural Roots Tree, completing the circle from ancestral roots to living present-day expressions!'
};
