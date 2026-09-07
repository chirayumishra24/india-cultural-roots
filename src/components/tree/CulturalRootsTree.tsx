import React from 'react';
import { CulturalTreeNode } from '../../types/tree';
import { TreeNode } from './TreeNode';

interface CulturalRootsTreeProps {
  nodes: CulturalTreeNode[];
  growthLevel: number; // 0 to 7
  isLivingCulture: boolean;
  highlightedCategory?: string | null;
  onNodeClick: (node: CulturalTreeNode) => void;
}

export const CulturalRootsTree: React.FC<CulturalRootsTreeProps> = ({
  nodes,
  growthLevel,
  isLivingCulture,
  highlightedCategory,
  onNodeClick,
}) => {
  return (
    <div className="relative w-full max-w-xl h-96 md:h-[430px] flex items-center justify-center select-none">
      {/* Background Aura Glow when Living Culture is achieved */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none ${
          isLivingCulture ? 'bg-gradient-to-tr from-amber-300/40 via-emerald-300/40 to-yellow-200/40 opacity-100 animate-pulse' : 'opacity-0'
        }`}
      />

      {/* SVG Canvas for Tree, Roots, Trunk & Branches */}
      <svg
        viewBox="0 0 600 500"
        className="w-full h-full filter drop-shadow-xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Canopy Gradients */}
          <linearGradient id="canopyGradientMain" x1="300" y1="50" x2="300" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38B468" />
            <stop offset="60%" stopColor="#22884A" />
            <stop offset="100%" stopColor="#196536" />
          </linearGradient>

          <linearGradient id="canopyHighlight" x1="200" y1="60" x2="400" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5CD68C" />
            <stop offset="100%" stopColor="#22884A" />
          </linearGradient>

          {/* Trunk Gradient */}
          <linearGradient id="trunkWoodGrad" x1="250" y1="200" x2="350" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8C5326" />
            <stop offset="40%" stopColor="#673917" />
            <stop offset="80%" stopColor="#4A250B" />
            <stop offset="100%" stopColor="#351805" />
          </linearGradient>

          {/* Root Gold Glow Filter */}
          <filter id="goldRootGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Ground Mound & Grass Base */}
        <ellipse cx="300" cy="460" rx="190" ry="24" fill="#A4C639" opacity="0.4" />
        <ellipse cx="300" cy="452" rx="160" ry="18" fill="#78AB26" opacity="0.6" />
        <ellipse cx="300" cy="445" rx="130" ry="14" fill="#558B1B" />

        {/* Small river stones & moss pebbles */}
        <circle cx="210" cy="452" r="6" fill="#8D99AE" />
        <circle cx="225" cy="454" r="4" fill="#6C757D" />
        <circle cx="380" cy="453" r="5" fill="#8D99AE" />
        <circle cx="395" cy="455" r="7" fill="#6C757D" />

        {/* 2. SPREADING ORGANIC ROOTS (Extend downward and sideways) */}
        <g id="treeRoots">
          {/* Main Central Deep Root */}
          <path
            d="M300 370 Q300 410 300 455 Q305 470 310 480"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Left Main Root */}
          <path
            d="M270 360 Q230 395 190 435 Q165 450 140 460"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Left Subsidiary Root */}
          <path
            d="M230 405 Q205 435 175 450"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Right Main Root */}
          <path
            d="M330 360 Q370 395 410 435 Q435 450 460 460"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Right Subsidiary Root */}
          <path
            d="M370 405 Q395 435 425 450"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Far Left Root Tender */}
          <path
            d="M190 435 Q150 455 120 458"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Far Right Root Tender */}
          <path
            d="M410 435 Q450 455 480 458"
            stroke="url(#trunkWoodGrad)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Bioluminescent Root Energy Glow when growth > 0 */}
          {growthLevel > 0 && (
            <g filter="url(#goldRootGlow)" className="animate-pulse">
              <path
                d="M270 365 Q230 395 190 435 Q165 450 140 460"
                stroke="#F5B041"
                strokeWidth="4"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
              <path
                d="M300 375 Q300 410 300 455"
                stroke="#F5B041"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M330 365 Q370 395 410 435 Q435 450 460 460"
                stroke="#F5B041"
                strokeWidth="4"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>

        {/* 3. STURDY BANYAN TRUNK */}
        <g id="treeTrunk">
          {/* Trunk Bark mass */}
          <path
            d="M255 375 C265 310, 240 230, 205 180 C235 210, 275 225, 290 260 C305 225, 345 210, 375 180 C340 230, 315 310, 325 375 Z"
            fill="url(#trunkWoodGrad)"
          />
          {/* Bark texture striations */}
          <path d="M280 270 Q285 330 278 365" stroke="#3D1A04" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
          <path d="M300 275 Q298 335 301 370" stroke="#3D1A04" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
          <path d="M320 270 Q315 330 322 365" stroke="#3D1A04" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

          {/* Central Trunk Wooden Plaque: "INDIA'S CULTURAL ROOTS" */}
          <g transform="translate(195, 290)">
            <rect
              x="0"
              y="0"
              width="210"
              height="38"
              rx="12"
              fill="#52290D"
              stroke="#2E1303"
              strokeWidth="2.5"
              className="drop-shadow-md"
            />
            <rect
              x="3"
              y="3"
              width="204"
              height="32"
              rx="9"
              fill="#743E17"
            />
            {/* Plaque golden screws */}
            <circle cx="10" cy="19" r="2.5" fill="#E59866" />
            <circle cx="200" cy="19" r="2.5" fill="#E59866" />
            {/* Plaque Text */}
            <text
              x="105"
              y="22"
              fill="#FFF0D4"
              fontSize="12"
              fontWeight="900"
              fontFamily="Outfit, sans-serif"
              textAnchor="middle"
              letterSpacing="1.5"
              className="select-none filter drop-shadow-sm"
            >
              INDIA'S CULTURAL ROOTS
            </text>
          </g>
        </g>

        {/* 4. CANOPY FOLIAGE MASSES */}
        <g id="treeCanopy">
          {/* Background deeper leaves */}
          <circle cx="210" cy="170" r="75" fill="#1B6236" opacity="0.75" />
          <circle cx="390" cy="170" r="75" fill="#1B6236" opacity="0.75" />
          <circle cx="300" cy="120" r="85" fill="#1B6236" opacity="0.75" />

          {/* Main Mid Canopy Clouds */}
          <circle cx="170" cy="220" r="65" fill="url(#canopyGradientMain)" />
          <circle cx="430" cy="220" r="65" fill="url(#canopyGradientMain)" />
          <circle cx="220" cy="150" r="70" fill="url(#canopyGradientMain)" />
          <circle cx="380" cy="150" r="70" fill="url(#canopyGradientMain)" />
          <circle cx="300" cy="110" r="78" fill="url(#canopyGradientMain)" />

          {/* Foreground bright leaf clusters */}
          <circle cx="200" cy="130" r="50" fill="url(#canopyHighlight)" opacity="0.85" />
          <circle cx="400" cy="130" r="50" fill="url(#canopyHighlight)" opacity="0.85" />
          <circle cx="300" cy="90" r="55" fill="url(#canopyHighlight)" opacity="0.9" />

          {/* Decorative Leaf clusters on branch rims */}
          <path d="M110 210 Q90 190 120 185 Q130 205 110 210Z" fill="#78D64B" />
          <path d="M125 180 Q105 160 135 155 Q145 175 125 180Z" fill="#8CE85A" />
          <path d="M470 210 Q490 190 460 185 Q450 205 470 210Z" fill="#78D64B" />
          <path d="M455 180 Q475 160 445 155 Q435 175 455 180Z" fill="#8CE85A" />
          <path d="M290 45 Q300 20 315 45 Q300 50 290 45Z" fill="#A4F469" />
        </g>
      </svg>

      {/* 5. INTERACTIVE CANOPY NODES (Floating over the foliage) */}
      <div className="absolute inset-0 pointer-events-auto">
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            isGlowing={highlightedCategory === node.id || isLivingCulture}
            onClick={() => onNodeClick(node)}
          />
        ))}
      </div>
    </div>
  );
};
