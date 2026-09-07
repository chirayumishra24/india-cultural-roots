/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quest: {
          bg: '#EAF5FF',
          wood: {
            light: '#9E6A38',
            base: '#78461E',
            dark: '#542E10',
            border: '#3F220B',
          },
          gold: '#F5B041',
          goldDark: '#D4881A',
          leaf: '#27AE60',
          leafDark: '#1E8449',
          teamA: {
            blue: '#2B7DE9',
            light: '#EBF4FF',
            dark: '#1C54A8'
          },
          teamB: {
            orange: '#F38120',
            light: '#FFF4EB',
            dark: '#C8600C'
          },
          parchment: '#FDFBF7'
        }
      },
      boxShadow: {
        'game-card': '0 8px 0 rgba(0,0,0,0.12), 0 15px 25px -5px rgba(0,0,0,0.15)',
        'wood-emboss': 'inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -3px 0 rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.25)',
        'pill-press': '0 4px 0 rgba(0,0,0,0.15), 0 8px 12px rgba(0,0,0,0.08)',
        'glow-leaf': '0 0 20px rgba(39, 174, 96, 0.6)',
        'glow-gold': '0 0 25px rgba(245, 176, 65, 0.7)',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
