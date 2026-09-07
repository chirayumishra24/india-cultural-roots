import React from 'react';
import { HeritageDiscoveryCardData } from '../../types/tree';

interface HeritageDiscoveryCardProps {
  card: HeritageDiscoveryCardData;
  onClick: () => void;
}

export const HeritageDiscoveryCard: React.FC<HeritageDiscoveryCardProps> = ({
  card,
  onClick,
}) => {
  const [imgError, setImgError] = React.useState(false);

  // Render high-fidelity SVG illustration matching the artifact
  const renderIllustration = () => {
    switch (card.illustrationType) {
      case 'manuscript':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 filter drop-shadow-md">
            {/* Ancient palm-leaf/bound manuscript */}
            <rect x="10" y="20" width="80" height="40" rx="4" fill="#D4AC0D" />
            <rect x="8" y="16" width="80" height="40" rx="4" fill="#F4D03F" />
            <rect x="6" y="12" width="80" height="40" rx="4" fill="#FCF3CF" stroke="#B7950B" strokeWidth="1.5" />
            {/* Binding cord / thread */}
            <line x1="28" y1="12" x2="28" y2="52" stroke="#C0392B" strokeWidth="2.5" />
            <line x1="72" y1="12" x2="72" y2="52" stroke="#C0392B" strokeWidth="2.5" />
            {/* Ancient Inscription lines */}
            <line x1="36" y1="22" x2="64" y2="22" stroke="#7D6608" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="36" y1="28" x2="64" y2="28" stroke="#7D6608" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="36" y1="34" x2="64" y2="34" stroke="#7D6608" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="36" y1="40" x2="64" y2="40" stroke="#7D6608" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        );
      case 'music':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 filter drop-shadow-md">
            {/* Classical Veena */}
            {/* Main resonator gourd */}
            <circle cx="28" cy="46" r="18" fill="#B9770E" />
            <circle cx="28" cy="46" r="14" fill="#D68910" />
            <circle cx="28" cy="46" r="9" fill="#935116" />
            {/* Long wooden neck (dandi) */}
            <path d="M28 46 L82 18" stroke="#7E5109" strokeWidth="6" strokeLinecap="round" />
            {/* Upper gourd */}
            <circle cx="72" cy="22" r="8" fill="#D68910" />
            {/* Curved Yali head */}
            <path d="M82 18 Q90 12 85 8 Q78 8 76 16" fill="none" stroke="#6E2C00" strokeWidth="3" />
            {/* Strings */}
            <line x1="28" y1="44" x2="78" y2="18" stroke="#F9E79F" strokeWidth="1.5" />
          </svg>
        );
      case 'textile':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 filter drop-shadow-md">
            {/* Rolled woven silk & cotton textile */}
            <path d="M20 20 L75 14 L85 45 L30 51 Z" fill="#884EA0" />
            {/* Intricate border stripes */}
            <path d="M28 22 L72 17 L75 24 L31 29 Z" fill="#F4D03F" />
            <path d="M33 32 L77 27 L80 34 L36 39 Z" fill="#E74C3C" />
            {/* Weave texture */}
            <line x1="30" y1="23" x2="70" y2="19" stroke="#5B2C6F" strokeWidth="1" strokeDasharray="2 1" />
            {/* Fabric Roll cylinder */}
            <ellipse cx="25" cy="35" rx="8" ry="16" fill="#7D3C98" stroke="#4A235A" strokeWidth="1.5" />
            <ellipse cx="25" cy="35" rx="4" ry="9" fill="#F5B7B1" />
          </svg>
        );
      case 'architecture':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 filter drop-shadow-md">
            {/* Shore temple stone vimana shrine */}
            <path d="M30 56 L70 56 L64 42 L36 42 Z" fill="#935116" />
            <path d="M36 42 L64 42 L58 28 L42 28 Z" fill="#B9770E" />
            <path d="M42 28 L58 28 L52 16 L48 16 Z" fill="#D68910" />
            {/* Kalasha finial on top */}
            <ellipse cx="50" cy="14" rx="4" ry="4" fill="#F4D03F" />
            {/* Pillars and relief niches */}
            <rect x="35" y="46" width="5" height="10" fill="#6E2C00" />
            <rect x="47" y="46" width="6" height="10" fill="#6E2C00" />
            <rect x="60" y="46" width="5" height="10" fill="#6E2C00" />
          </svg>
        );
      case 'storytelling':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 filter drop-shadow-md">
            {/* Traditional storyteller / puppeteer narrator */}
            {/* Turban */}
            <ellipse cx="46" cy="22" rx="14" ry="9" fill="#E67E22" />
            <circle cx="46" cy="20" r="11" fill="#D35400" />
            {/* Face */}
            <circle cx="46" cy="27" r="10" fill="#FAD7A0" />
            <path d="M43 32 Q46 36 49 32" stroke="#6E2C00" strokeWidth="1" fill="none" />
            {/* Robe */}
            <path d="M30 42 C30 35, 62 35, 62 42 L66 62 L26 62 Z" fill="#27AE60" />
            {/* Storytelling scroll / puppet in hand */}
            <path d="M62 42 Q78 30 76 52" fill="none" stroke="#BA4A00" strokeWidth="3" />
            <rect x="70" y="32" width="16" height="12" rx="2" fill="#F9E79F" stroke="#B7950B" />
          </svg>
        );
      case 'craft':
        return (
          <svg viewBox="0 0 100 70" className="w-20 h-14 filter drop-shadow-md">
            {/* Hand-painted terracotta folk pot */}
            {/* Pot Body */}
            <ellipse cx="50" cy="42" rx="22" ry="18" fill="#BA4A00" />
            <ellipse cx="50" cy="42" rx="20" ry="16" fill="#D35400" />
            {/* Pot Neck & Rim */}
            <path d="M38 26 L62 26 L60 20 L40 20 Z" fill="#A04000" />
            <ellipse cx="50" cy="20" rx="12" ry="4" fill="#EDBB99" stroke="#873600" strokeWidth="1" />
            {/* Decorative painted geometric bands */}
            <path d="M32 38 Q50 44 68 38" fill="none" stroke="#F4D03F" strokeWidth="2.5" />
            <path d="M34 44 Q50 50 66 44" fill="none" stroke="#2E86C1" strokeWidth="2" />
            {/* Triangle chevron patterns */}
            <path d="M36 41 L40 45 L44 41 L48 45 L52 41 L56 45 L60 41" fill="none" stroke="#FADBD8" strokeWidth="1.5" />
          </svg>
        );
    }
  };

  return (
    <button
      onClick={onClick}
      className={`group relative bg-gradient-to-b from-white to-[#FDFBF7] border-2 border-[#E5DAC6] hover:border-amber-400 rounded-2xl md:rounded-3xl p-1.5 sm:p-2.5 2xl:p-3.5 shadow-[0_8px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(245,176,65,0.25)] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex flex-col items-center justify-center w-24 sm:w-28 md:w-32 2xl:w-36 shrink-0 ${
        card.isDiscovered ? 'ring-2 ring-emerald-500/80 bg-emerald-50/30' : ''
      }`}
      title={`${card.title}: Click to inspect clue`}
    >
      {/* Discovery checkmark */}
      {card.isDiscovered && (
        <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center shadow-md">
          ✓
        </div>
      )}

      {/* Artifact Graphic Container */}
      <div className="h-12 sm:h-16 w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
        {!imgError ? (
          <img
            src={`/assets/cards/${card.illustrationType}.jpg`}
            alt={card.title}
            onError={() => setImgError(true)}
            className="h-11 sm:h-14 w-auto object-contain drop-shadow-md rounded-lg"
          />
        ) : (
          renderIllustration()
        )}
      </div>

      {/* Card Title Ribbon */}
      <div className="mt-1 bg-[#F5ECDC] group-hover:bg-amber-100 border border-[#D5C7B0] rounded-full px-2 sm:px-3 py-0.5 shadow-sm">
        <span className="text-[10px] sm:text-xs 2xl:text-sm font-black text-slate-800 tracking-tight whitespace-nowrap">
          {card.title}
        </span>
      </div>
    </button>
  );
};
