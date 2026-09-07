import confetti from 'canvas-confetti';

/**
 * Fires a colorful celebration confetti burst for correct answers
 */
export const fireCorrectConfetti = () => {
  try {
    // Dual burst from left & right corners + center spray
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65, x: 0.5 },
      colors: ['#27AE60', '#F5B041', '#2B7DE9', '#9B51E0', '#E91E63', '#FFD700', '#00BCD4'],
      ticks: 220,
      gravity: 1.0,
      scalar: 1.0,
    });
  } catch {
    // Ignore if canvas-confetti fails or unsupported
  }
};

/**
 * Grand celebration confetti for completed quests, living culture unlock, and winning team
 */
export const fireGrandCelebration = () => {
  try {
    const end = Date.now() + 1500;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 80,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#27AE60', '#2B7DE9', '#E91E63', '#9B51E0'],
      });
    }, 200);
  } catch {
    // Ignore
  }
};
