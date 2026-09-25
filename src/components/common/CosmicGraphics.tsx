import React from 'react';

export const CosmicPortalOrb: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Intense Outer Nebula Glow */}
          <radialGradient id="portal_ambient_glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="65%" stopColor="#4F46E5" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#050510" stopOpacity="0" />
          </radialGradient>

          {/* Deep Core Disc Gradient */}
          <radialGradient id="portal_core_grad" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#2E1065" />
            <stop offset="45%" stopColor="#170836" />
            <stop offset="85%" stopColor="#0C051E" />
            <stop offset="100%" stopColor="#05020F" />
          </radialGradient>

          {/* Neon Ring Gradient 1 */}
          <linearGradient id="portal_ring_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#C084FC" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#818CF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
          </linearGradient>

          {/* Neon Ring Gradient 2 */}
          <linearGradient id="portal_ring_grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#C084FC" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#9333EA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
          </linearGradient>

          {/* Swirling Outer Energy Arc */}
          <linearGradient id="portal_arc_grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
            <stop offset="30%" stopColor="#A855F7" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#C084FC" stopOpacity="0.95" />
            <stop offset="90%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>

          {/* Core Star Glow Filter */}
          <filter id="star_glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="3" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Nebula Light */}
        <circle cx="260" cy="240" r="230" fill="url(#portal_ambient_glow)" />

        {/* Outer Swirling Neon Arcs */}
        <path
          d="M 120 420 C 220 480, 420 440, 470 280 C 510 150, 420 40, 270 50 C 180 56, 110 130, 95 210"
          stroke="url(#portal_arc_grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        <path
          d="M 140 400 C 260 460, 410 410, 450 290 C 490 170, 390 70, 290 75"
          stroke="url(#portal_ring_grad1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Deep Sphere Core */}
        <circle
          cx="260"
          cy="240"
          r="135"
          fill="url(#portal_core_grad)"
        />

        {/* Outer Glowing Neon Ring 1 */}
        <circle
          cx="260"
          cy="240"
          r="135"
          stroke="url(#portal_ring_grad1)"
          strokeWidth="3"
          strokeDasharray="600 80"
          opacity="0.9"
        />

        {/* Inner Glowing Neon Ring 2 */}
        <circle
          cx="260"
          cy="240"
          r="115"
          stroke="url(#portal_ring_grad2)"
          strokeWidth="2.5"
          opacity="0.85"
        />

        {/* Inner Accent Ring 3 */}
        <circle
          cx="260"
          cy="240"
          r="92"
          stroke="#C084FC"
          strokeWidth="1.5"
          opacity="0.45"
          strokeDasharray="16 8"
        />

        {/* Radiant Center Glow Halo */}
        <circle
          cx="260"
          cy="240"
          r="48"
          fill="#A855F7"
          opacity="0.45"
          filter="url(#star_glow)"
        />

        {/* Central Luminous 4-Point Diamond Star */}
        <g filter="url(#star_glow)">
          {/* Main 4-pointed star */}
          <path
            d="M 260 175 Q 260 240 205 240 Q 260 240 260 305 Q 260 240 315 240 Q 260 240 260 175 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          {/* Subtle lavender flare */}
          <path
            d="M 260 190 Q 260 240 218 240 Q 260 240 260 290 Q 260 240 302 240 Q 260 240 260 190 Z"
            fill="#F0ABFC"
            opacity="0.9"
          />
          {/* Center core white spark */}
          <circle cx="260" cy="240" r="5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const CosmicPlanetArt: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          {/* Intense Electric Violet & Cyan Nebula Glow Backdrop */}
          <radialGradient id="bg_nebula_core" cx="80%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#7C3AED" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#311068" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#0B031E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#02000A" stopOpacity="0" />
          </radialGradient>

          {/* Glowing Ring Gradient 1 - Electric Blue to Magenta */}
          <linearGradient id="bg_ring_grad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
            <stop offset="35%" stopColor="#00F5D4" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#A855F7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E879F9" stopOpacity="0.8" />
          </linearGradient>

          {/* Glowing Ring Gradient 2 - Violet Sweep */}
          <linearGradient id="bg_ring_grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#02000A" stopOpacity="0" />
          </linearGradient>

          {/* Orb Atmosphere Rim Lighting */}
          <radialGradient id="bg_orb_atmosphere" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#8B5CF6" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#3B0764" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#050114" stopOpacity="0.95" />
          </radialGradient>

          {/* 4-Point Flare Star Core Gradient */}
          <radialGradient id="bg_star_core_glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#F5D0FE" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#A855F7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>

          {/* Glow Filters */}
          <filter id="bg_heavy_glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur1" />
            <feGaussianBlur stdDeviation="4" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="bg_star_burst" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Deep Space Backdrop Ambient Nebula */}
        <circle cx="480" cy="250" r="280" fill="url(#bg_nebula_core)" />

        {/* 2. Outer Sweeping Orbital Field Lines */}
        <g transform="rotate(-28 480 250)">
          {/* Main Large Broad Orbital Ring */}
          <ellipse
            cx="480"
            cy="250"
            rx="320"
            ry="110"
            stroke="url(#bg_ring_grad1)"
            strokeWidth="3"
            filter="url(#bg_heavy_glow)"
          />

          {/* Concentric Outer Delicate Ring Arc */}
          <ellipse
            cx="480"
            cy="250"
            rx="360"
            ry="128"
            stroke="url(#bg_ring_grad2)"
            strokeWidth="1.8"
            strokeDasharray="450 180"
            opacity="0.85"
          />

          {/* Inner Filament Arc */}
          <ellipse
            cx="480"
            cy="250"
            rx="260"
            ry="88"
            stroke="#00F5D4"
            strokeWidth="2"
            opacity="0.75"
            filter="url(#bg_heavy_glow)"
          />
        </g>

        {/* 3. Concentric Aura Halo Rings around the Orb */}
        <circle
          cx="480"
          cy="250"
          r="150"
          stroke="url(#bg_ring_grad2)"
          strokeWidth="3.5"
          fill="none"
          opacity="0.7"
          filter="url(#bg_heavy_glow)"
        />

        <circle
          cx="480"
          cy="250"
          r="132"
          stroke="url(#bg_ring_grad1)"
          strokeWidth="4"
          fill="none"
          filter="url(#bg_heavy_glow)"
        />

        {/* 4. Glowing Blue Atmospheric Rim Shell */}
        <circle
          cx="480"
          cy="250"
          r="115"
          fill="url(#bg_orb_atmosphere)"
          filter="drop-shadow(0 0 35px rgba(56, 189, 248, 0.8))"
        />

        {/* 5. Electric Blue Crescent Limb Highlight */}
        <ellipse
          cx="450"
          cy="240"
          rx="108"
          ry="112"
          stroke="#00F5D4"
          strokeWidth="4"
          fill="none"
          opacity="0.9"
          filter="url(#bg_heavy_glow)"
        />

        {/* 6. Central 4-Point Sparkling Star Core */}
        <g transform="translate(480, 250)">
          {/* Ambient Star Core Flare Halo */}
          <circle cx="0" cy="0" r="70" fill="url(#bg_star_core_glow)" filter="url(#bg_heavy_glow)" />

          {/* Sharp 4-Point Diamond Flare Star */}
          <path
            d="M 0 -65 Q 0 0 -65 0 Q 0 0 0 65 Q 0 0 65 0 Q 0 0 0 -65 Z"
            fill="url(#bg_star_core_glow)"
            filter="url(#bg_star_burst)"
          />

          {/* Bright White Center Core */}
          <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="8" fill="#F5D0FE" />
        </g>
      </svg>
    </div>
  );
};

export const CosmicWavesArt: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="wave_grad_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="wave_grad_2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 50 C 60 20, 110 75, 170 45 C 230 15, 270 65, 320 30"
          stroke="url(#wave_grad_1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 10 65 C 70 35, 130 80, 190 50 C 250 25, 280 55, 320 40"
          stroke="url(#wave_grad_2)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 30 75 C 90 50, 150 70, 210 55 C 270 40, 290 50, 320 48"
          stroke="#a855f7"
          strokeWidth="1.2"
          strokeOpacity="0.3"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const RadarOrbIcon: React.FC<{ className?: string }> = ({ className = 'h-14 w-14' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer subtle glow */}
      <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-md animate-pulse" />
      
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-purple-500/40" />
      
      {/* Middle ring with rotating/pulsing dash */}
      <div className="absolute inset-1.5 rounded-full border border-dashed border-indigo-400/50" />
      
      {/* Inner dark circle with purple gradient */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#3b1282] to-[#6d28d9] shadow-inner shadow-purple-900 border border-purple-400/60">
        {/* 4-point star in center */}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-purple-200 fill-purple-100 drop-shadow-[0_0_6px_rgba(232,121,249,0.9)]"
        >
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
        </svg>
      </div>
    </div>
  );
};

export const DarkLuxuryOrbArt: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
      >
        <defs>
          {/* Ambient Dark Purple Outer Glow */}
          <radialGradient id="luxury_ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#4C1D95" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#1E1035" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#03010A" stopOpacity="0" />
          </radialGradient>

          {/* Dark Luxury Glass Obsidian Sphere */}
          <radialGradient id="luxury_sphere_body" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3B1282" />
            <stop offset="25%" stopColor="#250B54" />
            <stop offset="55%" stopColor="#13052E" />
            <stop offset="85%" stopColor="#0A021B" />
            <stop offset="100%" stopColor="#03010A" />
          </radialGradient>

          {/* Metallic Violet Rim Highlight */}
          <linearGradient id="luxury_rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E879F9" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#C084FC" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D9A5" stopOpacity="0.3" />
          </linearGradient>

          {/* Concentric Geometric Ring Gradients */}
          <linearGradient id="luxury_ring_1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D9A5" stopOpacity="0.2" />
          </linearGradient>

          {/* Core Specular Glass Lens Reflection */}
          <linearGradient id="luxury_specular" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="30%" stopColor="#F5D0FE" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>

          <filter id="luxury_glow_blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* 1. Outer Deep Ambient Halo */}
        <circle cx="250" cy="250" r="220" fill="url(#luxury_ambient)" />

        {/* 2. Outer Concentric Precision Rings */}
        <circle
          cx="250"
          cy="250"
          r="200"
          stroke="url(#luxury_ring_1)"
          strokeWidth="1.5"
          strokeDasharray="6 12 18 12"
          opacity="0.5"
        />
        <circle
          cx="250"
          cy="250"
          r="180"
          stroke="#7C3AED"
          strokeWidth="1"
          strokeDasharray="2 8"
          opacity="0.4"
        />

        {/* 3. Dark Luxury Glass Sphere Glow Backdrop */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="#581C87"
          opacity="0.25"
          filter="url(#luxury_glow_blur)"
        />

        {/* 4. Main Dark Luxury Obsidian Orb Body */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="url(#luxury_sphere_body)"
          stroke="url(#luxury_rim)"
          strokeWidth="2"
        />

        {/* 5. Concentric Inner Geometric Glass Rings */}
        <circle
          cx="250"
          cy="250"
          r="115"
          stroke="#C084FC"
          strokeWidth="1"
          strokeDasharray="80 40 20 40"
          opacity="0.45"
        />
        <circle
          cx="250"
          cy="250"
          r="88"
          stroke="#00D9A5"
          strokeWidth="1"
          strokeDasharray="60 30"
          opacity="0.35"
        />
        <circle
          cx="250"
          cy="250"
          r="60"
          stroke="#7C3AED"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* 6. Curved Glass Specular Top Reflection */}
        <path
          d="M 130 200 A 135 135 0 0 1 370 200 A 140 140 0 0 0 130 200 Z"
          fill="url(#luxury_specular)"
        />

        {/* 7. Center Core Luxury Diamond Star */}
        <g transform="translate(250, 250)">
          <circle cx="0" cy="0" r="12" fill="#7C3AED" opacity="0.4" />
          <path
            d="M 0 -18 L 4 -4 L 18 0 L 4 4 L 0 18 L -4 4 L -18 0 L -4 -4 Z"
            fill="#F5D0FE"
            opacity="0.9"
          />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
