import React, { useState } from 'react';

export const TeamMascot: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative flex items-end select-none pointer-events-none">
      {/* Cheerful Speech Bubble matching reference */}
      <div className="absolute -top-12 left-4 z-20 bg-white/95 backdrop-blur-sm border-2 border-emerald-300 rounded-2xl px-3 py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.12)] transform -rotate-3 animate-pulse">
        <span className="text-[11px] font-black text-slate-800 tracking-tight block">
          Explore the roots.
        </span>
        <span className="text-[11px] font-black text-emerald-600 tracking-tight block">
          Build the future!
        </span>
        {/* Pointer tip */}
        <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-2 border-r-2 border-emerald-300 transform rotate-45" />
      </div>

      {/* 3D Student Mascots Artwork */}
      {!imageError ? (
        <div className="relative w-44 h-36 overflow-hidden rounded-2xl filter drop-shadow-xl hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/characters/mascots.jpg"
            alt="Cheering Student Mascots"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top mix-blend-multiply"
          />
        </div>
      ) : (
        /* High-fidelity SVG Fallback */
        <div className="relative flex items-end">
          {/* Boy Mascot (Blue Hoodie) */}
          <div className="w-24 h-28 relative -mr-3 transform -rotate-1 hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
              <path d="M25 90 C25 65, 95 65, 95 90 L100 140 L20 140 Z" fill="#2B7DE9" />
              <path d="M45 80 L60 110 L75 80" fill="none" stroke="#1C54A8" strokeWidth="4" />
              <path d="M22 95 Q5 70 12 55 Q20 50 26 62 Q25 80 28 92 Z" fill="#2B7DE9" />
              <circle cx="14" cy="53" r="8" fill="#FAD7A0" />
              <rect x="52" y="55" width="16" height="15" fill="#E8A87C" rx="4" />
              <circle cx="60" cy="42" r="24" fill="#FAD7A0" />
              <path d="M36 38 C36 20, 84 20, 84 38 C80 25, 40 25, 36 38 Z" fill="#2C3E50" />
              <path d="M38 34 Q50 18 70 24 Q82 22 84 38 Q74 28 60 28 Q44 28 38 34 Z" fill="#1A252F" />
              <ellipse cx="52" cy="40" rx="3" ry="4" fill="#2C3E50" />
              <ellipse cx="68" cy="40" rx="3" ry="4" fill="#2C3E50" />
              <path d="M52 48 Q60 58 68 48" fill="#C0392B" stroke="#8E44AD" strokeWidth="1.5" />
              <circle cx="46" cy="45" r="3.5" fill="#F1948A" opacity="0.6" />
              <circle cx="74" cy="45" r="3.5" fill="#F1948A" opacity="0.6" />
            </svg>
          </div>

          {/* Girl Mascot (Mustard Yellow Sweater) */}
          <div className="w-24 h-28 relative transform rotate-2 hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-md">
              <path d="M25 90 C25 65, 95 65, 95 90 L100 140 L20 140 Z" fill="#F5B041" />
              <path d="M48 78 Q60 88 72 78" fill="none" stroke="#D4881A" strokeWidth="3" />
              <path d="M98 95 Q115 70 108 55 Q100 50 94 62 Q95 80 92 92 Z" fill="#F5B041" />
              <circle cx="106" cy="53" r="8" fill="#FAD7A0" />
              <rect x="52" y="55" width="16" height="15" fill="#E8A87C" rx="4" />
              <circle cx="60" cy="42" r="24" fill="#FAD7A0" />
              <path d="M34 38 C34 18, 86 18, 86 38 Q96 45 94 65 Q88 55 86 42 Q74 26 46 26 Q34 35 34 42 Q32 55 26 65 Q24 45 34 38 Z" fill="#4A2311" />
              <ellipse cx="52" cy="40" rx="3" ry="4" fill="#2C3E50" />
              <ellipse cx="68" cy="40" rx="3" ry="4" fill="#2C3E50" />
              <path d="M52 48 Q60 58 68 48" fill="#C0392B" stroke="#D35400" strokeWidth="1.5" />
              <circle cx="46" cy="45" r="3.5" fill="#F1948A" opacity="0.6" />
              <circle cx="74" cy="45" r="3.5" fill="#F1948A" opacity="0.6" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
