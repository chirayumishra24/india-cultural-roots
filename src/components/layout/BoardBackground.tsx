import React from 'react';

export const BoardBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#D4ECFC] via-[#EBF5FF] to-[#FDF4E7]">
      {/* Subtle distant temple & stupa silhouettes in warm atmospheric haze */}
      <svg
        className="absolute bottom-0 left-0 w-full h-80 opacity-25"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Distant mountains/hills */}
        <path
          d="M0 260C200 240 380 270 540 250C700 230 850 265 1020 245C1180 225 1320 255 1440 240V320H0V260Z"
          fill="#D4B996"
        />
        {/* Left Temple Shikhara Silhouettes */}
        <path
          d="M120 250L135 170L150 250H120ZM145 170L155 120L165 170H145ZM210 260L230 190L250 260H210ZM225 190L235 150L245 190H225Z"
          fill="#C4A47C"
        />
        {/* Right Monumental Shore Temple Silhouettes */}
        <path
          d="M1180 250L1210 160L1240 250H1180ZM1200 160L1215 110L1230 160H1200ZM1290 260L1315 180L1340 260H1290Z"
          fill="#C4A47C"
        />
      </svg>

      {/* Decorative leafy shrub silhouettes at corner foregrounds */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-[#27AE60]/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-bl from-[#27AE60]/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-64 h-44 bg-gradient-to-tr from-[#27AE60]/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-44 bg-gradient-to-tl from-[#F5B041]/15 to-transparent rounded-full blur-3xl" />
    </div>
  );
};
