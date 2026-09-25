import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { soundFx } from '../../game/audioEngine';

interface CountdownOverlayProps {
  onComplete: () => void;
}

export const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    soundFx.playCountdownBeep(false);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          soundFx.playCountdownBeep(true);
          return 0; // "BEGIN!"
        }
        if (prev <= 0) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        soundFx.playCountdownBeep(false);
        return prev - 1;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in">
      <div className="text-center text-white flex flex-col items-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400/50 flex items-center justify-center mb-4">
          <Compass className="w-12 h-12 text-amber-400 animate-spin-slow" />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-amber-300 mb-2">
          Cultural Quest • India’s Cultural Roots
        </span>

        <div className="text-7xl sm:text-8xl font-black font-sans tracking-tight text-white mb-4 animate-scale-in drop-shadow-xl">
          {count > 0 ? count : 'BEGIN!'}
        </div>

        <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          {count > 0 ? 'Prepare your teams...' : 'Discover India’s Cultural Heritage!'}
        </p>
      </div>
    </div>
  );
};
