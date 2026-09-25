import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Waypoint positions along the winding discovery journey path (20 points for 20 discoveries)
export const WAYPOINTS: [number, number, number][] = [
  // Zone 1: Vedic Culture (Nodes 1 - 4)
  [-7.2, 0.4, 4.8],   // 1: Forest Hermitage entrance
  [-6.2, 0.45, 3.8],  // 2: Sacred Fire Altar
  [-5.2, 0.5, 2.8],   // 3: Rishi Study Hut
  [-4.0, 0.45, 1.8],  // 4: Hermitage Grove exit

  // Zone 2: Upanishads (Nodes 5 - 7)
  [-3.0, 0.5, 0.4],   // 5: Banyan Tree Approach
  [-2.2, 0.55, -1.0], // 6: Dialogue Mandapa
  [-1.2, 0.5, -2.2],  // 7: Meditation Stepped Ghat

  // Zone 3: Buddhism (Nodes 8 - 10)
  [-0.2, 0.6, -3.2],  // 8: Stupa Southern Torana
  [1.0, 0.7, -2.6],   // 9: Pradakshina Path
  [2.2, 0.55, -1.6],  // 10: Eastern Monastic Gate

  // Zone 4: Jainism (Nodes 11 - 13)
  [3.4, 0.5, -0.4],   // 11: Marble Steps
  [4.6, 0.55, 0.8],   // 12: Mandapa Hall
  [5.6, 0.45, 2.0],   // 13: Courtyard Path

  // Zone 5: Folk & Tribal (Nodes 14 - 17)
  [4.8, 0.4, 3.6],    // 14: Village Gateway
  [3.6, 0.35, 4.8],   // 15: Sacred Grove Tree
  [2.2, 0.35, 5.4],   // 16: Artisan Courtyard
  [0.8, 0.4, 4.8],    // 17: Community Dance Hearth

  // Zone 6: Shared Heritage (Nodes 18 - 20)
  [-0.2, 0.45, 3.4],  // 18: Confluence Bridge
  [0.0, 0.6, 2.0],    // 19: Grand Torana Arch
  [0.0, 0.75, 0.6]    // 20: Ashoka Capital Monument
];

// Reusable Zone Floating UI Badge using Html component
const ZoneBadge: React.FC<{
  number: number;
  title: string;
  color: string;
  accentColor: string;
  position: [number, number, number];
}> = ({ number, title, color, accentColor, position }) => {
  return (
    <Html position={position} center distanceFactor={13} className="pointer-events-none select-none">
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full shadow-lg border backdrop-blur-md whitespace-nowrap transition-transform duration-300 hover:scale-105"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderColor: color,
          boxShadow: `0 4px 14px ${color}30`
        }}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-xs"
          style={{ backgroundColor: color }}
        >
          {number}
        </span>
        <span
          className="text-[11px] font-black tracking-wide uppercase font-sans"
          style={{ color: accentColor }}
        >
          {title}
        </span>
      </div>
    </Html>
  );
};

// 1. VEDAS & VEDIC CULTURE: Forest Hermitage with Sacred Fire, Thatched Huts & Meditating Sages
const VedicHermitage: React.FC<{ isHighlighted: boolean }> = ({ isHighlighted }) => {
  const fireLightRef = useRef<THREE.PointLight>(null);
  const flameGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 2.4 + Math.sin(t * 12) * 0.6 + Math.cos(t * 7) * 0.3;
    }
    if (flameGroupRef.current) {
      const s = 1 + Math.sin(t * 10) * 0.12;
      flameGroupRef.current.scale.set(s, 1 + Math.cos(t * 14) * 0.15, s);
    }
  });

  return (
    <group position={[-6.0, 0.25, 3.6]}>
      {/* Terraced Earthen Hermitage Mound */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.1, 0.3, 20]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.15, 20]} />
        <meshStandardMaterial color="#A1887F" roughness={0.9} />
      </mesh>

      {/* Main Rishi Hermitage Hut (Detailed Thatched Roof) */}
      <group position={[-0.9, 0.3, -0.6]}>
        {/* Clay & Reed Walls */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.0, 1.05, 1.0, 16]} />
          <meshStandardMaterial color="#D7CCC8" roughness={0.8} />
        </mesh>
        {/* Wooden Entrance Doorframe */}
        <mesh position={[0, 0.45, 1.02]} castShadow>
          <boxGeometry args={[0.45, 0.75, 0.08]} />
          <meshStandardMaterial color="#4E342E" roughness={0.7} />
        </mesh>
        {/* Tiered Thatched Conical Roof */}
        <mesh position={[0, 1.35, 0]} castShadow>
          <coneGeometry args={[1.4, 0.8, 16]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.95} />
        </mesh>
        <mesh position={[0, 1.85, 0]} castShadow>
          <coneGeometry args={[1.0, 0.7, 16]} />
          <meshStandardMaterial color="#6D4C41" roughness={0.95} />
        </mesh>
        {/* Finial / Spire */}
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#4E342E" />
        </mesh>
      </group>

      {/* Secondary Study Hut */}
      <group position={[1.1, 0.3, -0.3]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.75, 0.8, 0.8, 14]} />
          <meshStandardMaterial color="#D7CCC8" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow>
          <coneGeometry args={[1.05, 0.65, 14]} />
          <meshStandardMaterial color="#795548" roughness={0.95} />
        </mesh>
        <mesh position={[0, 1.45, 0]} castShadow>
          <coneGeometry args={[0.75, 0.5, 14]} />
          <meshStandardMaterial color="#5D4037" roughness={0.95} />
        </mesh>
      </group>

      {/* Sacred Yajna Havan Kund (Stepped Square Altar in Terracotta) */}
      <group position={[0, 0.3, 0.75]}>
        {/* Stepped Altar Layers */}
        <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.12, 1.0]} />
          <meshStandardMaterial color="#B08968" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.12, 0.8]} />
          <meshStandardMaterial color="#C89666" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.9} />
        </mesh>

        {/* Sacred Logs */}
        {[-0.1, 0.1].map((offset, i) => (
          <mesh key={i} position={[0, 0.35, offset]} rotation={[0, (i * Math.PI) / 3, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.45, 6]} />
            <meshStandardMaterial color="#3E2723" roughness={0.9} />
          </mesh>
        ))}

        {/* Glowing Fire Flames */}
        <group ref={flameGroupRef} position={[0, 0.45, 0]}>
          <mesh>
            <coneGeometry args={[0.22, 0.45, 8]} />
            <meshBasicMaterial color="#FF6D00" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <coneGeometry args={[0.14, 0.32, 8]} />
            <meshBasicMaterial color="#FFD600" />
          </mesh>
        </group>

        <pointLight
          ref={fireLightRef}
          position={[0, 0.6, 0]}
          color="#FFA000"
          distance={4.5}
          castShadow
        />
      </group>

      {/* Palm Leaf Manuscripts (Pothis) on Low Wooden Desks */}
      <group position={[-0.8, 0.35, 0.6]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.5, 0.12, 0.3]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        {/* Palm Leaf Manuscript Stack */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[0.4, 0.06, 0.2]} />
          <meshStandardMaterial color="#FFE082" roughness={0.7} />
        </mesh>
        {/* Red ribbon binding */}
        <mesh position={[0, 0.17, 0]}>
          <boxGeometry args={[0.04, 0.07, 0.21]} />
          <meshBasicMaterial color="#D32F2F" />
        </mesh>
      </group>

      {/* Meditating Rishi Figure in Saffron Robes */}
      <group position={[0.65, 0.32, 0.75]}>
        {/* Saffron Dhoti Base */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 0.24, 10]} />
          <meshStandardMaterial color="#E65100" />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.18, 0.24, 8]} />
          <meshStandardMaterial color="#FFCC80" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial color="#FFCC80" />
        </mesh>
        {/* Topknot (Shikha) Hair */}
        <mesh position={[0, 0.64, -0.02]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#212121" />
        </mesh>
      </group>

      {/* Zone Trees */}
      <LushTree position={[-1.8, 0.3, 0.6]} scale={0.9} variant="hermitage" />
      <LushTree position={[1.8, 0.3, -1.0]} scale={1.1} variant="pine" />

      {/* Zone Floating UI Badge */}
      <ZoneBadge
        number={1}
        title="Vedas & Vedic Culture"
        color="#2563EB"
        accentColor="#1E3A8A"
        position={[0, 3.0, 0]}
      />

      {isHighlighted && <ZoneHighlightAura color="#3B82F6" />}
    </group>
  );
};

// 2. UPANISHADS: Ancient Banyan Tree with Sprawling Aerial Roots & Dialogue Mandapa
const UpanishadPavilion: React.FC<{ isHighlighted: boolean }> = ({ isHighlighted }) => {
  return (
    <group position={[-2.4, 0.3, -1.2]}>
      {/* Stepped Stone Flagstone Terrace */}
      <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.32, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.7, 0.15, 2.7]} />
        <meshStandardMaterial color="#BCAAA4" roughness={0.6} />
      </mesh>

      {/* Sprawling Ancient Banyan Tree with Hanging Aerial Roots */}
      <group position={[1.2, 0.4, 0.9]}>
        {/* Massive Main Gnarled Trunk */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.7, 2.4, 10]} />
          <meshStandardMaterial color="#4E342E" roughness={0.95} />
        </mesh>
        {/* Secondary Trunk Branch */}
        <mesh position={[-0.4, 1.0, 0.3]} rotation={[0, 0, 0.3]} castShadow>
          <cylinderGeometry args={[0.2, 0.35, 2.0, 8]} />
          <meshStandardMaterial color="#4E342E" roughness={0.95} />
        </mesh>

        {/* Hanging Aerial Roots to Ground */}
        {[-0.6, -0.2, 0.5, 0.8].map((rx, idx) => (
          <mesh key={idx} position={[rx, 0.9, -0.3 + (idx % 2) * 0.6]}>
            <cylinderGeometry args={[0.04, 0.05, 1.8, 6]} />
            <meshStandardMaterial color="#5D4037" roughness={0.9} />
          </mesh>
        ))}

        {/* Multi-layered Canopy Domes */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <sphereGeometry args={[1.4, 12, 12]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.65} />
        </mesh>
        <mesh position={[-0.8, 2.3, 0.4]} castShadow>
          <sphereGeometry args={[1.0, 10, 10]} />
          <meshStandardMaterial color="#388E3C" roughness={0.65} />
        </mesh>
        <mesh position={[0.7, 2.4, -0.5]} castShadow>
          <sphereGeometry args={[1.1, 10, 10]} />
          <meshStandardMaterial color="#1B5E20" roughness={0.65} />
        </mesh>
      </group>

      {/* Carved Stone Mandapa Pavilion (Octagonal Fluted Pillars) */}
      <group position={[-0.4, 0.4, -0.4]}>
        {/* 4 Pillars with bracket capitals */}
        {[-0.7, 0.7].map((x, i) =>
          [-0.7, 0.7].map((z, j) => (
            <group key={`${i}-${j}`} position={[x, 0, z]}>
              <mesh position={[0, 0.65, 0]} castShadow>
                <cylinderGeometry args={[0.09, 0.11, 1.3, 8]} />
                <meshStandardMaterial color="#E0D6D0" roughness={0.5} />
              </mesh>
              {/* Pillar Capital */}
              <mesh position={[0, 1.35, 0]} castShadow>
                <boxGeometry args={[0.3, 0.1, 0.3]} />
                <meshStandardMaterial color="#C7B8B0" />
              </mesh>
            </group>
          ))
        )}

        {/* Tiered Stone Roof Slab */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[1.9, 0.16, 1.9]} />
          <meshStandardMaterial color="#A1887F" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.66, 0]} castShadow>
          <boxGeometry args={[1.5, 0.14, 1.5]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.6} />
        </mesh>
        {/* Roof Finial (Amalaka miniature) */}
        <mesh position={[0, 1.82, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.12, 12]} />
          <meshStandardMaterial color="#B08968" />
        </mesh>

        {/* Seated Sage & Student Figures in Dialogue */}
        {/* Master Teacher */}
        <group position={[-0.3, 0.05, 0]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.2, 8]} />
            <meshStandardMaterial color="#8E24AA" />
          </mesh>
          <mesh position={[0, 0.28, 0]} castShadow>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#FFCC80" />
          </mesh>
        </group>
        {/* Student Inquirer */}
        <group position={[0.3, 0.05, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.2, 0.16, 8]} />
            <meshStandardMaterial color="#F57C00" />
          </mesh>
          <mesh position={[0, 0.24, 0]} castShadow>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#FFCC80" />
          </mesh>
        </group>
      </group>

      <ZoneBadge
        number={2}
        title="Upanishads & Schools"
        color="#7C3AED"
        accentColor="#4C1D95"
        position={[0, 3.2, 0]}
      />

      {isHighlighted && <ZoneHighlightAura color="#8B5CF6" />}
    </group>
  );
};

// 3. BUDDHISM: Sanchi Great Stupa with Vedika Railing, Harmika, Chhatras, and Saffron Monks
const BuddhistStupa: React.FC<{ isHighlighted: boolean }> = ({ isHighlighted }) => {
  return (
    <group position={[0.5, 0.35, -2.8]}>
      {/* Terraced Hill Base */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[2.7, 3.0, 0.25, 24]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.8} />
      </mesh>

      {/* Outer Stone Vedika Railing Posts (Circle of 16 Upright Posts) */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 16;
        const rad = 2.45;
        const x = Math.sin(angle) * rad;
        const z = Math.cos(angle) * rad;
        return (
          <group key={i} position={[x, 0.35, z]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.5, 6]} />
              <meshStandardMaterial color="#A1887F" />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <sphereGeometry args={[0.06, 6, 6]} />
              <meshStandardMaterial color="#8D6E63" />
            </mesh>
          </group>
        );
      })}

      {/* Stupa Medhi (Circular Drum Terrace) */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.1, 0.45, 28]} />
        <meshStandardMaterial color="#EFEBE9" roughness={0.6} />
      </mesh>

      {/* Stupa Anda (Smooth Sandstone Dome) */}
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.45, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.5} />
      </mesh>

      {/* Harmika (Square Balcony on top) */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <boxGeometry args={[0.65, 0.35, 0.65]} />
        <meshStandardMaterial color="#BCAAA4" roughness={0.6} />
      </mesh>

      {/* Chhatravali Spire & Triple Umbrella Tiers with Gold Trim */}
      <mesh position={[0, 2.65, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.8, 8]} />
        <meshStandardMaterial color="#795548" />
      </mesh>
      {[2.55, 2.75, 2.95].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]}>
          <coneGeometry args={[0.4 - idx * 0.09, 0.08, 16]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.4} roughness={0.3} />
        </mesh>
      ))}

      {/* South Cardinal Torana Gateway with Triple Crossbars & End Spirals */}
      <group position={[0, 0.25, 2.3]}>
        {/* Left & Right Pillars with Elephant Capitals */}
        {[-0.65, 0.65].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            <mesh position={[0, 0.75, 0]} castShadow>
              <boxGeometry args={[0.14, 1.5, 0.14]} />
              <meshStandardMaterial color="#BCAAA4" roughness={0.6} />
            </mesh>
            {/* Capital */}
            <mesh position={[0, 1.52, 0]} castShadow>
              <boxGeometry args={[0.22, 0.12, 0.2]} />
              <meshStandardMaterial color="#8D6E63" />
            </mesh>
          </group>
        ))}

        {/* Triple Curved Horizontal Crossbars with Spirals */}
        {[1.35, 1.55, 1.75].map((y, idx) => (
          <group key={idx} position={[0, y, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.7 - idx * 0.15, 0.1, 0.12]} />
              <meshStandardMaterial color="#A1887F" roughness={0.6} />
            </mesh>
            {/* End spiral curls */}
            {[-1, 1].map((dir, sIdx) => (
              <mesh key={sIdx} position={[(dir * (1.7 - idx * 0.15)) / 2, 0, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color="#D7CCC8" />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Monks in Saffron Robes around Stupa */}
      {[-0.8, 0.8].map((mx, idx) => (
        <group key={idx} position={[mx, 0.35, 1.6 - idx * 0.4]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.18, 0.5, 8]} />
            <meshStandardMaterial color="#FF6F00" />
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#FFE0B2" />
          </mesh>
        </group>
      ))}

      <ZoneBadge
        number={3}
        title="Buddhism"
        color="#D97706"
        accentColor="#78350F"
        position={[0, 3.4, 0]}
      />

      {isHighlighted && <ZoneHighlightAura color="#EAB308" />}
    </group>
  );
};

// 4. JAINISM: Carved White Marble Temple Shikhara, Mandapa Hall & Marble Steps
const JainPavilion: React.FC<{ isHighlighted: boolean }> = ({ isHighlighted }) => {
  return (
    <group position={[4.6, 0.3, 0.6]}>
      {/* Polished White Marble Terraced Plinth */}
      <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.3, 2.8]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.25} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.32, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.3, 0.15, 2.3]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Marble Steps leading up */}
      <group position={[0, 0.12, 1.3]}>
        {[0, 1, 2].map((step) => (
          <mesh key={step} position={[0, step * 0.07, step * 0.15]} receiveShadow>
            <boxGeometry args={[0.9, 0.08, 0.2]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Main Temple Shikhara Tower (Fluted Marble Spire) */}
      <group position={[0, 0.4, -0.4]}>
        {/* Tower Body */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.9, 1.6, 12]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Curvilinear Shikhara Upper Spire */}
        <mesh position={[0, 2.0, 0]} castShadow>
          <coneGeometry args={[0.7, 1.4, 12]} />
          <meshStandardMaterial color="#FAFAFA" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Serrated Amalaka Stone Disc */}
        <mesh position={[0, 2.8, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.46, 0.14, 16]} />
          <meshStandardMaterial color="#F5F5F5" roughness={0.3} />
        </mesh>
        {/* Golden Kalasha Finial Pot */}
        <mesh position={[0, 2.98, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 3.16, 0]}>
          <coneGeometry args={[0.06, 0.18, 8]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* Mandapa Pillared Entrance Hall */}
      <group position={[0, 0.4, 0.6]}>
        {/* 6 Carved Marble Columns */}
        {[-0.6, 0, 0.6].map((x, i) =>
          [-0.3, 0.3].map((z, j) => (
            <group key={`${i}-${j}`} position={[x, 0, z]}>
              <mesh position={[0, 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.07, 0.09, 1.0, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
              </mesh>
              {/* Bracket capital */}
              <mesh position={[0, 1.02, 0]} castShadow>
                <boxGeometry args={[0.2, 0.08, 0.2]} />
                <meshStandardMaterial color="#EEEEEE" />
              </mesh>
            </group>
          ))
        )}

        {/* Mandapa Pyramidal Tiered Roof */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[1.7, 0.12, 1.1]} />
          <meshStandardMaterial color="#FAFAFA" roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.28, 0]} castShadow>
          <boxGeometry args={[1.3, 0.12, 0.8]} />
          <meshStandardMaterial color="#F5F5F5" roughness={0.25} />
        </mesh>
      </group>

      <ZoneBadge
        number={4}
        title="Jainism"
        color="#EA580C"
        accentColor="#9A3412"
        position={[0, 3.4, 0]}
      />

      {isHighlighted && <ZoneHighlightAura color="#F97316" />}
    </group>
  );
};

// 5. FOLK & TRIBAL: Huts with Warli Motifs, Terracotta Pots, Sacred Grove & Dhol Drum
const FolkTribalHamlet: React.FC<{ isHighlighted: boolean }> = ({ isHighlighted }) => {
  return (
    <group position={[3.2, 0.2, 4.4]}>
      {/* Earthen Village Ground Mound */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.7, 3.0, 0.2, 20]} />
        <meshStandardMaterial color="#795548" roughness={0.95} />
      </mesh>

      {/* Main Tribal Thatched Hut (with Warli geometric paintings) */}
      <group position={[-0.8, 0.2, -0.4]}>
        {/* Red Ochre Mud Wall */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.85, 1.1]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.9} />
        </mesh>
        {/* White Warli Art Accent Band */}
        <mesh position={[0, 0.5, 0.56]}>
          <boxGeometry args={[1.0, 0.16, 0.02]} />
          <meshBasicMaterial color="#FFFDE7" />
        </mesh>
        {/* Bamboo Doorway */}
        <mesh position={[0, 0.35, 0.56]} castShadow>
          <boxGeometry args={[0.35, 0.6, 0.03]} />
          <meshStandardMaterial color="#4E342E" />
        </mesh>
        {/* Steep Thatch Gable Roof */}
        <mesh position={[0, 1.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[1.2, 0.8, 4]} />
          <meshStandardMaterial color="#5D4037" roughness={0.95} />
        </mesh>
      </group>

      {/* Round Granary / Artisan Hut */}
      <group position={[0.8, 0.2, 0.5]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.75, 0.8, 12]} />
          <meshStandardMaterial color="#A1887F" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow>
          <coneGeometry args={[0.95, 0.7, 12]} />
          <meshStandardMaterial color="#6D4C41" roughness={0.95} />
        </mesh>
      </group>

      {/* Sacred Grove Ancient Tree with Festive Ribbons */}
      <group position={[0.7, 0.2, -0.9]}>
        <LushTree position={[0, 0, 0]} scale={1.25} variant="hermitage" />
        {/* Festive Red & Yellow Threads on Trunk */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.2, 10]} />
          <meshBasicMaterial color="#E53935" />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 10]} />
          <meshBasicMaterial color="#FDD835" />
        </mesh>
      </group>

      {/* Traditional Terracotta Pots (Matkas) Stack */}
      <group position={[-0.2, 0.2, 0.8]}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <sphereGeometry args={[0.16, 10, 10]} />
          <meshStandardMaterial color="#D84315" roughness={0.7} />
        </mesh>
        <mesh position={[0.22, 0.14, 0]} castShadow>
          <sphereGeometry args={[0.14, 10, 10]} />
          <meshStandardMaterial color="#BF360C" roughness={0.7} />
        </mesh>
        <mesh position={[0.08, 0.32, 0]} castShadow>
          <sphereGeometry args={[0.12, 10, 10]} />
          <meshStandardMaterial color="#E64A19" roughness={0.7} />
        </mesh>
      </group>

      {/* Traditional Dhol Drum on Stand */}
      <group position={[-0.7, 0.2, 0.7]}>
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.14, 0.18, 0.45, 12]} />
          <meshStandardMaterial color="#795548" roughness={0.8} />
        </mesh>
        <mesh position={[-0.23, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <circleGeometry args={[0.14, 12]} />
          <meshStandardMaterial color="#FFF8E1" />
        </mesh>
        <mesh position={[0.23, 0.25, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <circleGeometry args={[0.14, 12]} />
          <meshStandardMaterial color="#FFF8E1" />
        </mesh>
      </group>

      <ZoneBadge
        number={5}
        title="Folk & Tribal"
        color="#059669"
        accentColor="#064E3B"
        position={[0, 3.0, 0]}
      />

      {isHighlighted && <ZoneHighlightAura color="#10B981" />}
    </group>
  );
};

// 6. SHARED HERITAGE: Grand Torana Gateway, Ashoka Lion Pillar & Confluence Plaza
const SharedHeritagePlaza: React.FC<{ isHighlighted: boolean }> = ({ isHighlighted }) => {
  return (
    <group position={[0, 0.3, 1.0]}>
      {/* Confluence Plaza Sandstone Pavement */}
      <mesh position={[0, 0.12, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.3, 2.5, 0.25, 28]} />
        <meshStandardMaterial color="#EFEBE9" roughness={0.6} />
      </mesh>
      {/* Decorative Outer Rim */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <ringGeometry args={[1.9, 2.25, 28]} />
        <meshStandardMaterial color="#D7CCC8" side={THREE.DoubleSide} />
      </mesh>

      {/* Grand Indian Torana Gateway Arch */}
      <group position={[0, 0.25, -0.2]}>
        {/* Massive Carved Columns */}
        {[-1.0, 1.0].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            {/* Column Pedestal Base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.34, 0.3, 0.34]} />
              <meshStandardMaterial color="#B08968" roughness={0.6} />
            </mesh>
            {/* Octagonal Carved Shaft */}
            <mesh position={[0, 1.1, 0]} castShadow>
              <cylinderGeometry args={[0.13, 0.15, 1.8, 8]} />
              <meshStandardMaterial color="#D4A373" roughness={0.5} />
            </mesh>
            {/* Double Animal Capital (Lion / Elephant motif) */}
            <mesh position={[0, 2.05, 0]} castShadow>
              <boxGeometry args={[0.38, 0.2, 0.34]} />
              <meshStandardMaterial color="#B08968" roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Triple Curved Crossbeams with Ornamental Details */}
        {[1.9, 2.2, 2.5].map((y, idx) => (
          <group key={idx} position={[0, y, 0]}>
            <mesh castShadow>
              <boxGeometry args={[2.5 - idx * 0.2, 0.15, 0.24]} />
              <meshStandardMaterial color="#D4A373" roughness={0.5} />
            </mesh>
            {/* Spiral Finials on beam ends */}
            {[-1, 1].map((dir, sIdx) => (
              <mesh key={sIdx} position={[(dir * (2.5 - idx * 0.2)) / 2, 0, 0]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#B08968" />
              </mesh>
            ))}
          </group>
        ))}

        {/* Ashoka Chakra Medallion at Arch Crest */}
        <group position={[0, 2.9, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.08, 24]} />
            <meshStandardMaterial color="#1E3A8A" metalness={0.4} roughness={0.3} />
          </mesh>
          {/* Inner Golden Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.045]}>
            <ringGeometry args={[0.15, 0.3, 24]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.5} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* Ashoka Pillar (Lion Capital of Sarnath Replica) */}
      <group position={[1.4, 0.25, 0.8]}>
        {/* Polished Round Shaft */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.09, 1.5, 16]} />
          <meshStandardMaterial color="#E6D5C3" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Inverted Lotus Bell Capital */}
        <mesh position={[0, 1.52, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.08, 0.16, 12]} />
          <meshStandardMaterial color="#D4A373" />
        </mesh>
        {/* Circular Abacus */}
        <mesh position={[0, 1.63, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 16]} />
          <meshStandardMaterial color="#B08968" />
        </mesh>
        {/* Four Addorsed Lions Crest */}
        <mesh position={[0, 1.82, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.16, 0.3, 8]} />
          <meshStandardMaterial color="#D4A373" metalness={0.2} roughness={0.4} />
        </mesh>
      </group>

      <ZoneBadge
        number={6}
        title="Shared Heritage"
        color="#DB2777"
        accentColor="#831843"
        position={[0, 3.6, 0]}
      />

      {isHighlighted && <ZoneHighlightAura color="#EC4899" />}
    </group>
  );
};

// Lush Multi-species Botanical Tree Component
const LushTree: React.FC<{
  position: [number, number, number];
  scale?: number;
  variant?: 'hermitage' | 'pine' | 'blossom';
}> = ({ position, scale = 1, variant = 'hermitage' }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Textured Trunk */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 1.3, 8]} />
        <meshStandardMaterial color="#4E342E" roughness={0.9} />
      </mesh>

      {/* Foliage based on botanical variant */}
      {variant === 'pine' ? (
        <group position={[0, 1.1, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <coneGeometry args={[0.85, 0.9, 8]} />
            <meshStandardMaterial color="#1B5E20" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <coneGeometry args={[0.7, 0.8, 8]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.05, 0]} castShadow>
            <coneGeometry args={[0.5, 0.7, 8]} />
            <meshStandardMaterial color="#388E3C" roughness={0.7} />
          </mesh>
        </group>
      ) : variant === 'blossom' ? (
        <group position={[0, 1.5, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.85, 10, 10]} />
            <meshStandardMaterial color="#F48FB1" roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 0.35, 0.1]} castShadow>
            <sphereGeometry args={[0.65, 8, 8]} />
            <meshStandardMaterial color="#F06292" roughness={0.6} />
          </mesh>
        </group>
      ) : (
        /* Hermitage Lush Round Foliage */
        <group position={[0, 1.5, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.85, 10, 10]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.65} />
          </mesh>
          <mesh position={[0.25, 0.35, 0.15]} castShadow>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color="#388E3C" roughness={0.65} />
          </mesh>
          <mesh position={[-0.2, 0.25, -0.2]} castShadow>
            <sphereGeometry args={[0.55, 8, 8]} />
            <meshStandardMaterial color="#1B5E20" roughness={0.65} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Animated Zone Aura for Root Hint
const ZoneHighlightAura: React.FC<{ color: string }> = ({ color }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8;
      const s = 1 + Math.sin(t * 3.5) * 0.12;
      ringRef.current.scale.set(s, s, 1);
    }
    if (beamRef.current) {
      beamRef.current.position.y = 2.6 + Math.sin(t * 2) * 0.25;
    }
  });

  return (
    <group position={[0, 0.35, 0]}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.7, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      <mesh ref={beamRef} position={[0, 2.6, 0]}>
        <cylinderGeometry args={[0.8, 2.0, 5.0, 16, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>

      <pointLight position={[0, 2.2, 0]} color={color} intensity={3.5} distance={7} />
    </group>
  );
};

// Adorable 3D Miniature Explorer Character Marker
const ExplorerMarker3D: React.FC<{
  discoveryIndex: number;
  team: 'blue' | 'orange';
  label: string;
}> = ({ discoveryIndex, team, label }) => {
  const markerRef = useRef<THREE.Group>(null);
  const primaryColor = team === 'blue' ? '#2563EB' : '#EA580C';
  const accentColor = team === 'blue' ? '#1D4ED8' : '#C2410C';

  const waypointIdx = Math.max(0, Math.min(WAYPOINTS.length - 1, discoveryIndex - 1));
  const targetPos = WAYPOINTS[waypointIdx] || [0, 0.5, 0];

  useFrame((_, delta) => {
    if (!markerRef.current) return;
    markerRef.current.position.x = THREE.MathUtils.damp(
      markerRef.current.position.x,
      targetPos[0] + (team === 'blue' ? -0.28 : 0.28),
      4.5,
      delta
    );
    markerRef.current.position.y = THREE.MathUtils.damp(
      markerRef.current.position.y,
      targetPos[1],
      4.5,
      delta
    );
    markerRef.current.position.z = THREE.MathUtils.damp(
      markerRef.current.position.z,
      targetPos[2] + (team === 'blue' ? 0.2 : -0.2),
      4.5,
      delta
    );
  });

  return (
    <group ref={markerRef} position={[targetPos[0], targetPos[1], targetPos[2]]}>
      <Float speed={3.0} rotationIntensity={0.25} floatIntensity={0.35}>
        <group position={[0, 0.6, 0]}>
          {/* Ground Circular Beacon Disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
            <circleGeometry args={[0.38, 24]} />
            <meshBasicMaterial color={primaryColor} transparent opacity={0.65} />
          </mesh>

          {/* Explorer Adventurer Body & Vest */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.25, 0.48, 12]} />
            <meshStandardMaterial color={primaryColor} roughness={0.4} />
          </mesh>
          {/* Safari Vest Collar */}
          <mesh position={[0, 0.16, 0.12]}>
            <boxGeometry args={[0.28, 0.18, 0.08]} />
            <meshStandardMaterial color="#D7CCC8" />
          </mesh>

          {/* Explorer Backpack on back */}
          <mesh position={[0, 0.04, -0.16]} castShadow>
            <boxGeometry args={[0.26, 0.32, 0.18]} />
            <meshStandardMaterial color="#5D4037" roughness={0.8} />
          </mesh>

          {/* Head & Explorer Hat */}
          <mesh position={[0, 0.38, 0]} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#FFE0B2" roughness={0.6} />
          </mesh>

          {/* Pith Helmet / Explorer Hat */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.06, 16]} />
            <meshStandardMaterial color="#6D4C41" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.6, 0]} castShadow>
            <coneGeometry args={[0.22, 0.18, 16]} />
            <meshStandardMaterial color="#6D4C41" roughness={0.8} />
          </mesh>
          {/* Team Hat Ribbon Band */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.23, 0.23, 0.06, 16]} />
            <meshBasicMaterial color={primaryColor} />
          </mesh>

          {/* Floating Team Flag Marker */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
            <meshBasicMaterial color="#374151" />
          </mesh>
          <mesh position={[0.2, 1.15, 0]} castShadow>
            <boxGeometry args={[0.38, 0.22, 0.03]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>

          {/* HTML Name Badge Tag */}
          <Html position={[0, 1.45, 0]} center distanceFactor={14} className="pointer-events-none select-none">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white shadow-md whitespace-nowrap"
              style={{ backgroundColor: primaryColor }}
            >
              {label}
            </span>
          </Html>
        </group>
      </Float>
    </group>
  );
};

// Stepping Stone Path with Glowing Waypoints
const DiscoveryPath3D: React.FC<{
  teamADiscovery: number;
  teamBDiscovery: number;
}> = ({ teamADiscovery, teamBDiscovery }) => {
  const curve = useMemo(() => {
    const points = WAYPOINTS.map((p) => new THREE.Vector3(p[0], p[1] + 0.02, p[2]));
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const pathGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 80, 0.18, 8, false);
  }, [curve]);

  return (
    <group>
      {/* Stone Paved Pathway Tube */}
      <mesh geometry={pathGeometry} receiveShadow>
        <meshStandardMaterial color="#D7CCC8" roughness={0.85} />
      </mesh>

      {/* 20 Waypoint Stepping Stones */}
      {WAYPOINTS.map((pos, idx) => {
        const discNum = idx + 1;
        const reachedByA = teamADiscovery >= discNum;
        const reachedByB = teamBDiscovery >= discNum;

        let nodeColor = '#E2E8F0';
        if (reachedByA && reachedByB) nodeColor = '#9333EA';
        else if (reachedByA) nodeColor = '#2563EB';
        else if (reachedByB) nodeColor = '#EA580C';

        return (
          <group key={idx} position={pos}>
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.26, 0.3, 0.08, 16]} />
              <meshStandardMaterial color={nodeColor} metalness={0.2} roughness={0.4} />
            </mesh>
            {/* Illuminated Center Dot */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial
                color={reachedByA || reachedByB ? '#FFFFFF' : '#94A3B8'}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Landscape Diorama Base, Flowing River, Bridges & Cliffs
const DioramaBaseEnvironment: React.FC = () => {
  return (
    <group>
      {/* Outer Ceramic/Wood Beveled Diorama Tray */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[10.8, 11.4, 0.9, 40]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>

      {/* Top Rich Earthen Grass Soil Layer */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[10.5, 10.8, 0.12, 40]} />
        <meshStandardMaterial color="#66BB6A" roughness={0.7} />
      </mesh>

      {/* Winding Blue River Stream with Translucent Water & Foam Rim */}
      <group position={[1.4, 0.02, 0.8]} rotation={[-Math.PI / 2, 0, 0.35]}>
        <planeGeometry args={[2.0, 13]} />
        <meshStandardMaterial
          color="#38BDF8"
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.85}
        />
      </group>

      {/* Arched Stone & Wood Bridge Over River */}
      <group position={[2.1, 0.28, 1.8]} rotation={[0, -0.45, 0]}>
        {/* Bridge Arch Deck */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.14, 0.85]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.7} />
        </mesh>
        {/* Handrails */}
        {[-0.38, 0.38].map((z, idx) => (
          <group key={idx} position={[0, 0.2, z]}>
            <mesh castShadow>
              <boxGeometry args={[2.2, 0.06, 0.06]} />
              <meshStandardMaterial color="#5D4037" />
            </mesh>
            {[-0.8, 0, 0.8].map((x, pIdx) => (
              <mesh key={pIdx} position={[x, -0.1, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.2, 6]} />
                <meshStandardMaterial color="#4E342E" />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Rolling Hills in Background */}
      <mesh position={[-5.5, 0.8, -5.5]} castShadow receiveShadow>
        <sphereGeometry args={[3.0, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.85} />
      </mesh>
      <mesh position={[5.2, 0.7, -4.8]} castShadow receiveShadow>
        <sphereGeometry args={[2.6, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#43A047" roughness={0.85} />
      </mesh>

      {/* Decorative Botanical Trees & Blossom Bushes around Perimeter */}
      <LushTree position={[-4.8, 0, 0.2]} scale={0.9} variant="hermitage" />
      <LushTree position={[-3.6, 0, 4.2]} scale={1.05} variant="hermitage" />
      <LushTree position={[-1.4, 0, 5.5]} scale={0.85} variant="blossom" />
      <LushTree position={[5.8, 0, 3.6]} scale={0.95} variant="pine" />
      <LushTree position={[2.6, 0, -4.2]} scale={0.9} variant="pine" />
      <LushTree position={[-4.2, 0, -3.4]} scale={1.15} variant="hermitage" />
      <LushTree position={[4.5, 0, -2.2]} scale={0.8} variant="blossom" />

      {/* Riverbank Boulders / River Rocks */}
      {[
        [-0.2, 0.1, 0.4],
        [0.8, 0.08, -1.2],
        [2.6, 0.08, 0.2],
        [3.0, 0.08, 2.8]
      ].map((rockPos, idx) => (
        <mesh key={idx} position={rockPos as [number, number, number]} castShadow>
          <dodecahedronGeometry args={[0.22 - idx * 0.03, 0]} />
          <meshStandardMaterial color="#9E9E9E" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

interface CulturalWorld3DProps {
  teamADiscoveries: number;
  teamBDiscoveries: number;
  activeHintZoneIndex: number | null;
}

export const CulturalWorld3D: React.FC<CulturalWorld3DProps> = ({
  teamADiscoveries,
  teamBDiscoveries,
  activeHintZoneIndex
}) => {
  return (
    <div className="w-full h-full relative select-none rounded-2xl overflow-hidden shadow-inner bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50">
      <Canvas
        camera={{ position: [0, 9.8, 12.8], fov: 42 }}
        shadows
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Atmospheric Fog for Depth & Museum Diorama Feel */}
        <fog attach="fog" args={['#E0F2FE', 16, 34]} />

        {/* Ambient & Warm Direct Sunlight Lighting */}
        <ambientLight intensity={0.95} />
        <directionalLight
          position={[12, 18, 9]}
          intensity={1.7}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={35}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-9, 12, -7]} intensity={0.5} color="#FFF8E1" />
        <hemisphereLight args={['#BAE6FD', '#8D6E63', 0.4]} />

        {/* Orbit Controls with Natural Diorama Constraints */}
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.3}
          minPolarAngle={Math.PI / 7}
          minDistance={8}
          maxDistance={18}
          autoRotate={false}
          target={[0, 0.6, 0.8]}
        />

        {/* Rich Sculpted Diorama Base Environment */}
        <DioramaBaseEnvironment />

        {/* Winding 20-Discovery Journey Path */}
        <DiscoveryPath3D
          teamADiscovery={teamADiscoveries}
          teamBDiscovery={teamBDiscoveries}
        />

        {/* Six Distinct Cultural Heritage Landmarks */}
        <VedicHermitage isHighlighted={activeHintZoneIndex === 1} />
        <UpanishadPavilion isHighlighted={activeHintZoneIndex === 2} />
        <BuddhistStupa isHighlighted={activeHintZoneIndex === 3} />
        <JainPavilion isHighlighted={activeHintZoneIndex === 4} />
        <FolkTribalHamlet isHighlighted={activeHintZoneIndex === 5} />
        <SharedHeritagePlaza isHighlighted={activeHintZoneIndex === 6} />

        {/* Dual Team Explorer Markers */}
        <ExplorerMarker3D
          discoveryIndex={teamADiscoveries}
          team="blue"
          label="Team Knowledge"
        />
        <ExplorerMarker3D
          discoveryIndex={teamBDiscoveries}
          team="orange"
          label="Team Heritage"
        />
      </Canvas>

      {/* Floating 3D Navigation Tip */}
      <div className="absolute bottom-2.5 left-3 text-[11px] font-semibold text-slate-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 pointer-events-none shadow-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Drag to rotate 3D diorama • Scroll to zoom</span>
      </div>
    </div>
  );
};
