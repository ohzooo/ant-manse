import { type StemKey } from '../data/heavenlyStems';

interface AntCharacterProps {
  stemKey: StemKey;
  elementColor: string;
  size?: number;
}

// Base ant SVG path builder
function AntBase({ color, cx = 100, cy = 130 }: { color: string; cx?: number; cy?: number }) {
  return (
    <g>
      {/* Abdomen glow */}
      <ellipse cx={cx} cy={cy} rx={28} ry={32}
        fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"
        filter="url(#glow)" />
      {/* Abdomen */}
      <ellipse cx={cx} cy={cy} rx={22} ry={26}
        fill="#080d18" stroke={color} strokeWidth="1" opacity="0.9" />
      {/* Abdomen shine */}
      <ellipse cx={cx - 6} cy={cy - 8} rx={8} ry={6}
        fill={color} opacity="0.12" />

      {/* Thorax (waist) */}
      <ellipse cx={cx} cy={cy - 34} rx={10} ry={8}
        fill="#080d18" stroke={color} strokeWidth="0.8" />

      {/* Head */}
      <circle cx={cx} cy={cy - 54} r={18}
        fill="#080d18" stroke={color} strokeWidth="1" />
      {/* Head shine */}
      <circle cx={cx - 5} cy={cy - 58} r={5}
        fill={color} opacity="0.18" />

      {/* Eyes */}
      <circle cx={cx - 7} cy={cy - 57} r={5} fill="white" />
      <circle cx={cx + 7} cy={cy - 57} r={5} fill="white" />
      <circle cx={cx - 6} cy={cy - 56} r={3} fill={color} />
      <circle cx={cx + 8} cy={cy - 56} r={3} fill={color} />
      {/* Eye glints */}
      <circle cx={cx - 5} cy={cy - 58} r={1} fill="white" />
      <circle cx={cx + 9} cy={cy - 58} r={1} fill="white" />

      {/* Antennae */}
      <path d={`M${cx - 5} ${cy - 70} Q${cx - 18} ${cy - 86} ${cx - 28} ${cy - 90}`}
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx={cx - 28} cy={cy - 90} r={3} fill={color} />
      <path d={`M${cx + 5} ${cy - 70} Q${cx + 18} ${cy - 86} ${cx + 28} ${cy - 90}`}
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx={cx + 28} cy={cy - 90} r={3} fill={color} />

      {/* Arms */}
      <path d={`M${cx - 18} ${cy - 38} L${cx - 38} ${cy - 28}`}
        stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d={`M${cx + 18} ${cy - 38} L${cx + 38} ${cy - 28}`}
        stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Legs - 3 on each side */}
      <path d={`M${cx - 18} ${cy - 10} L${cx - 42} ${cy - 18}`}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${cx - 18} ${cy + 2} L${cx - 44} ${cy + 2}`}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${cx - 18} ${cy + 14} L${cx - 40} ${cy + 24}`}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${cx + 18} ${cy - 10} L${cx + 42} ${cy - 18}`}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${cx + 18} ${cy + 2} L${cx + 44} ${cy + 2}`}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d={`M${cx + 18} ${cy + 14} L${cx + 40} ${cy + 24}`}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

// Individual character scenes
function GapMokScene({ color }: { color: string }) {
  // Scholar: Gat hat + laptop + glasses
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Bamboo background */}
      <line x1="20" y1="0" x2="20" y2="200" stroke={color} strokeWidth="2" opacity="0.08" />
      <line x1="180" y1="0" x2="180" y2="200" stroke={color} strokeWidth="2" opacity="0.08" />
      <ellipse cx="20" cy="40" rx="8" ry="4" fill={color} opacity="0.08" />
      <ellipse cx="180" cy="80" rx="8" ry="4" fill={color} opacity="0.08" />

      {/* Laptop in front */}
      <rect x="58" y="148" width="84" height="52" rx="4"
        fill="#0d1a2e" stroke={color} strokeWidth="1.5" />
      <rect x="62" y="152" width="76" height="38" rx="2"
        fill="#040D1E" stroke={color} strokeWidth="0.5" opacity="0.8" />
      {/* Screen content - chart */}
      <polyline points="68,182 75,172 82,176 90,162 98,168 106,155 118,160 130,150"
        stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      <rect x="58" y="200" width="84" height="8" rx="2"
        fill="#0d1a2e" stroke={color} strokeWidth="1" />

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={135} />

      {/* Traditional Gat hat (갓) */}
      {/* Hat brim */}
      <ellipse cx={100} cy={75} rx={35} ry={8}
        fill="#1a1200" stroke={color} strokeWidth="1.5" />
      {/* Hat cylinder */}
      <rect x={84} y={52} width={32} height={24} rx={4}
        fill="#1a1200" stroke={color} strokeWidth="1.5" />
      {/* Hat top detail */}
      <ellipse cx={100} cy={52} rx={16} ry={5}
        fill="#241a00" stroke={color} strokeWidth="1" />
      {/* Hat string */}
      <path d="M82 75 Q76 85 78 95" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="2,2" />
      <path d="M118 75 Q124 85 122 95" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="2,2" />

      {/* Glasses */}
      <circle cx={93} cy={79} r={5}
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.9" />
      <circle cx={107} cy={79} r={5}
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.9" />
      <line x1={98} y1={79} x2={102} y2={79} stroke={color} strokeWidth="1" />

      {/* Glow effect */}
      <circle cx={100} cy={110} r={60} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

function EulMokScene({ color }: { color: string }) {
  // Flapping ears + vine swing
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Vine rope */}
      <path d="M100 0 Q115 20 105 50 Q95 80 100 110"
        stroke="#4a8a20" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Leaves */}
      <ellipse cx={112} cy={22} rx={10} ry={6} fill="#3a7a10" transform="rotate(-30, 112, 22)" opacity="0.7" />
      <ellipse cx={94} cy={42} rx={10} ry={6} fill="#3a7a10" transform="rotate(20, 94, 42)" opacity="0.7" />
      <ellipse cx={108} cy={62} rx={10} ry={6} fill="#3a7a10" transform="rotate(-15, 108, 62)" opacity="0.7" />

      {/* NEWS bubbles */}
      <rect x="130" y="30" width="55" height="24" rx="6"
        fill="#0a1a06" stroke={color} strokeWidth="1" />
      <text x="157" y="46" fill={color} fontSize="11" fontWeight="bold" textAnchor="middle">NEWS!</text>

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={130} />

      {/* Giant ears */}
      <ellipse cx={68} cy={79} rx={18} ry={28}
        fill="#080d18" stroke={color} strokeWidth="2" transform="rotate(-20, 68, 79)" />
      <ellipse cx={68} cy={79} rx={10} ry={18}
        fill={color} opacity="0.2" transform="rotate(-20, 68, 79)" />
      <ellipse cx={132} cy={79} rx={18} ry={28}
        fill="#080d18" stroke={color} strokeWidth="2" transform="rotate(20, 132, 79)" />
      <ellipse cx={132} cy={79} rx={10} ry={18}
        fill={color} opacity="0.2" transform="rotate(20, 132, 79)" />

      {/* Surprised wide eyes override */}
      <circle cx={93} cy={77} r={7} fill="white" />
      <circle cx={107} cy={77} r={7} fill="white" />
      <circle cx={94} cy={78} r={4} fill={color} />
      <circle cx={108} cy={78} r={4} fill={color} />

      {/* Hand holding vine */}
      <path d="M62 96 Q70 88 68 82" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      <circle cx={100} cy={110} r={60} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

function ByeongHwaScene({ color }: { color: string }) {
  // Fire moth with sunglasses + flames
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="fireGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Fire background */}
      <path d="M30 200 Q40 160 50 170 Q55 140 65 155 Q70 120 80 140 Q85 110 95 130 Q100 100 105 125 Q115 105 120 130 Q130 110 135 145 Q145 125 150 160 Q160 150 170 200 Z"
        fill="#FF2200" opacity="0.25" />
      <path d="M40 200 Q50 165 60 175 Q65 145 75 160 Q80 130 90 148 Q95 118 105 138 Q110 108 120 133 Q130 118 135 152 Q145 135 155 175 Q165 165 175 200 Z"
        fill="#FF6600" opacity="0.2" />

      {/* Chart going up */}
      <polyline points="25,160 45,140 65,145 85,120 105,125 125,100 145,105 165,80 180,70"
        stroke={color} strokeWidth="2" fill="none" filter="url(#glow)" />
      <circle cx={180} cy={70} r={5} fill={color} opacity="0.8" />

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={135} />

      {/* Sunglasses */}
      <rect x={82} y={73} width={16} height={10} rx={3}
        fill="#1a0400" stroke={color} strokeWidth="1.5" />
      <rect x={102} y={73} width={16} height={10} rx={3}
        fill="#1a0400" stroke={color} strokeWidth="1.5" />
      <line x1={98} y1={78} x2={102} y2={78} stroke={color} strokeWidth="1" />
      <line x1={82} y1={78} x2={76} y2={76} stroke={color} strokeWidth="1" />
      <line x1={118} y1={78} x2={124} y2={76} stroke={color} strokeWidth="1" />

      {/* Arms up (excited) */}
      <path d="M82 97 L55 72" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M118 97 L145 72" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      {/* Flames around body */}
      <path d="M75 140 Q68 125 72 110 Q80 120 78 105 Q88 118 84 100"
        stroke="#FF4400" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M125 140 Q132 125 128 110 Q120 120 122 105 Q112 118 116 100"
        stroke="#FF6600" strokeWidth="2" fill="none" opacity="0.6" />

      <circle cx={100} cy={110} r={65} fill={color} opacity="0.05" filter="url(#fireGlow)" />
    </svg>
  );
}

function JeongHwaScene({ color }: { color: string }) {
  // Single stock devotee with candle + tablet
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Dark room effect */}
      <circle cx={100} cy={110} r={90} fill="url(#candleGlow)" />

      {/* Candle */}
      <rect x={92} y={30} width={16} height={40} rx={2}
        fill="#f5e6d0" opacity="0.8" />
      {/* Candle wax drip */}
      <path d="M92 50 Q88 55 89 60" stroke="#f5e6d0" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Flame */}
      <path d="M100 30 Q106 20 103 12 Q100 8 97 12 Q94 20 100 30 Z"
        fill="#FFD700" opacity="0.9" filter="url(#glow)" />
      <path d="M100 28 Q104 22 102 16 Q100 14 98 17 Q96 22 100 28 Z"
        fill="#FF8800" opacity="0.8" />
      <circle cx={100} cy={30} r={12} fill={color} opacity="0.15" filter="url(#glow)" />

      {/* Tablet with glowing chart */}
      <rect x={56} y={148} width={88} height={50} rx={6}
        fill="#0a0a1e" stroke={color} strokeWidth="1.5" />
      <rect x={62} y={154} width={76} height={38} rx={3}
        fill="#040820" stroke={color} strokeWidth="0.5" opacity="0.8" />
      {/* Single stock chart */}
      <polyline points="68,184 76,178 84,180 92,170 100,172 108,162 116,165 124,155 134,150"
        stroke={color} strokeWidth="2" fill="none" filter="url(#glow)" />
      <circle cx={134} cy={150} r={3} fill={color} />

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={132} />

      {/* Heart eyes */}
      <text x={87} y={80} fill={color} fontSize="10" opacity="0.9">♥</text>
      <text x={100} y={80} fill={color} fontSize="10" opacity="0.9">♥</text>

      <circle cx={100} cy={100} r={70} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

function MuToScene({ color }: { color: string }) {
  // Digital monk on mountain with meditation pose
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Mountain silhouette */}
      <path d="M0 200 L60 120 L90 150 L120 80 L150 130 L200 100 L200 200 Z"
        fill="#1a1200" opacity="0.5" />
      <path d="M120 80 L90 120 L150 120 Z"
        fill="#2a1e00" opacity="0.6" />
      {/* Snow cap */}
      <path d="M120 80 L108 100 L132 100 Z"
        fill="white" opacity="0.15" />

      {/* Chaos stock ticker (ignored) */}
      <text x="15" y="48" fill="#FF4D4D" fontSize="7" opacity="0.4" fontFamily="monospace">▲1200 ▼3400 ▲890</text>
      <text x="15" y="58" fill="#00D4FF" fontSize="7" opacity="0.4" fontFamily="monospace">▼450 ▲2100 ▼670</text>

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={130} />

      {/* Monk robe */}
      <path d="M72 115 Q68 140 70 165 Q85 170 100 168 Q115 170 130 165 Q132 140 128 115 Q114 108 100 108 Q86 108 72 115 Z"
        fill="#1a1400" stroke={color} strokeWidth="1" opacity="0.8" />
      <path d="M100 108 L100 168" stroke={color} strokeWidth="0.5" opacity="0.4" />

      {/* Prayer beads in hand */}
      <circle cx={62} cy={106} r={3} fill={color} opacity="0.8" />
      <circle cx={58} cy={110} r={3} fill={color} opacity="0.8" />
      <circle cx={54} cy={115} r={3} fill={color} opacity="0.8" />
      <circle cx={52} cy={121} r={3} fill={color} opacity="0.8" />

      {/* Zen circle */}
      <circle cx={100} cy={25} r={18}
        fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />

      {/* Calm expression - slight smile */}
      <path d="M92 82 Q100 88 108 82" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <circle cx={100} cy={110} r={65} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

function GiToScene({ color }: { color: string }) {
  // Magnifying glass + flowers + analyst
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Flowers / dividend petals */}
      {[30, 165, 20, 175, 45].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${[160, 155, 40, 40, 180][i]})`}>
          <circle cx={0} cy={0} r={6} fill={color} opacity="0.25" />
          {[0, 60, 120, 180, 240, 300].map((angle, j) => (
            <ellipse key={j} cx={Math.cos(angle * Math.PI / 180) * 10}
              cy={Math.sin(angle * Math.PI / 180) * 10} rx={4} ry={6}
              fill={color} opacity="0.2"
              transform={`rotate(${angle}, ${Math.cos(angle * Math.PI / 180) * 10}, ${Math.sin(angle * Math.PI / 180) * 10})`} />
          ))}
        </g>
      ))}

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={130} />

      {/* Magnifying glass (right hand) */}
      <circle cx={132} cy={90} r={16}
        fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx={132} cy={90} r={14}
        fill={color} opacity="0.06" />
      {/* Magnifying glass lens reflection */}
      <line x1={126} y1={84} x2={128} y2={86} stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Handle */}
      <line x1={143} y1={101} x2={155} y2={113}
        stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Glasses on ant */}
      <circle cx={93} cy={78} r={5}
        fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={107} cy={78} r={5}
        fill="none" stroke={color} strokeWidth="1.5" />
      <line x1={98} y1={78} x2={102} y2={78} stroke={color} strokeWidth="1" />

      {/* Worried expression */}
      <path d="M93 86 Q100 84 107 86" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M92 74 Q96 71 98 74" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M102 74 Q106 71 110 74" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />

      <circle cx={100} cy={110} r={60} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

function GyeongGeumScene({ color }: { color: string }) {
  // Sword day trader with speed lines
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="swordGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Speed lines */}
      {[20, 35, 50, 150, 165, 180].map((y, i) => (
        <line key={i} x1={0} y1={y} x2={i < 3 ? 60 : 200} y2={y}
          stroke={color} strokeWidth="1" opacity="0.15" />
      ))}

      {/* Trading screen */}
      <rect x={60} y={12} width={80} height={50} rx={4}
        fill="#060d1e" stroke={color} strokeWidth="1" />
      <text x={68} y={28} fill="#FF3300" fontSize="8" fontFamily="monospace">▲▲▲▲▲▲▲</text>
      <text x={68} y={40} fill={color} fontSize="8" fontFamily="monospace">매수 ██████</text>
      <text x={68} y={52} fill="#FF4D4D" fontSize="8" fontFamily="monospace">체결!✓✓✓</text>

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={130} />

      {/* Left sword */}
      <line x1={52} y1={60} x2={78} y2={98}
        stroke={color} strokeWidth="3" strokeLinecap="round" filter="url(#swordGlow)" />
      <path d="M52 60 L56 56 L60 60 Z" fill={color} opacity="0.9" />
      {/* Sword guard */}
      <line x1={58} y1={72} x2={46} y2={78}
        stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Right sword */}
      <line x1={148} y1={60} x2={122} y2={98}
        stroke={color} strokeWidth="3" strokeLinecap="round" filter="url(#swordGlow)" />
      <path d="M148 60 L144 56 L140 60 Z" fill={color} opacity="0.9" />
      {/* Sword guard */}
      <line x1={142} y1={72} x2={154} y2={78}
        stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Fierce eyes - narrow */}
      <line x1={87} y1={77} x2={97} y2={78} stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1={103} y1={78} x2={113} y2={77} stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={92} cy={80} r={3} fill={color} opacity="0.8" />
      <circle cx={108} cy={80} r={3} fill={color} opacity="0.8" />

      <circle cx={100} cy={110} r={65} fill={color} opacity="0.05" filter="url(#glow)" />
    </svg>
  );
}

function SinGeumScene({ color }: { color: string }) {
  // Diamond holder with white gloves + gemstone
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gemGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Velvet cushion */}
      <rect x={55} y={148} width={90} height={45} rx={8}
        fill="#1a0a2a" stroke={color} strokeWidth="1" opacity="0.8" />
      <ellipse cx={100} cy={148} rx={45} ry={8}
        fill="#200d30" stroke={color} strokeWidth="1" opacity="0.7" />

      {/* Diamond gem */}
      <polygon points="100,110 118,125 112,145 88,145 82,125"
        fill={color} opacity="0.2" filter="url(#gemGlow)" />
      <polygon points="100,110 118,125 112,145 88,145 82,125"
        fill="none" stroke={color} strokeWidth="1.5" filter="url(#gemGlow)" />
      {/* Diamond facets */}
      <line x1={100} y1={110} x2={100} y2={145} stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1={82} y1={125} x2={118} y2={125} stroke="white" strokeWidth="0.5" opacity="0.4" />
      <polygon points="100,110 118,125 100,125" fill="white" opacity="0.1" />
      {/* Gem sparkle */}
      <line x1={100} y1={100} x2={100} y2={106} stroke={color} strokeWidth="1.5" />
      <line x1={106} y1={103} x2={103} y2={108} stroke={color} strokeWidth="1.5" />
      <line x1={94} y1={103} x2={97} y2={108} stroke={color} strokeWidth="1.5" />

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={135} />

      {/* White gloves (hands) */}
      <circle cx={62} cy={96} r={8} fill="white" opacity="0.85" />
      <circle cx={138} cy={96} r={8} fill="white" opacity="0.85" />

      {/* Elegant expression - slight arch eyebrows */}
      <path d="M87 72 Q93 68 98 72" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M102 72 Q107 68 113 72" stroke={color} strokeWidth="1.2" fill="none" />

      {/* Worried eye twitch */}
      <text x={114} y={70} fill={color} fontSize="9" opacity="0.7">?</text>

      <circle cx={100} cy={110} r={65} fill={color} opacity="0.05" filter="url(#gemGlow)" />
    </svg>
  );
}

function ImSuScene({ color }: { color: string }) {
  // Global surfer with wave + passport
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ocean waves */}
      <path d="M0 160 Q25 145 50 155 Q75 165 100 150 Q125 135 150 148 Q175 161 200 148 L200 200 L0 200 Z"
        fill={color} opacity="0.12" />
      <path d="M0 172 Q30 158 60 168 Q90 178 120 162 Q150 148 180 162 L200 155 L200 200 L0 200 Z"
        fill={color} opacity="0.1" />
      {/* Wave caps */}
      <path d="M0 160 Q25 145 50 155" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M90 152 Q115 138 140 150" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />

      {/* Surfboard */}
      <ellipse cx={100} cy={158} rx={50} ry={10}
        fill="#0a2060" stroke={color} strokeWidth="1.5" />
      <ellipse cx={100} cy={158} rx={46} ry={8}
        fill={color} opacity="0.1" />

      {/* Stock tickers on wave */}
      <text x={8} y={148} fill={color} fontSize="7" opacity="0.5" fontFamily="monospace">NASDAQ+2.3%</text>
      <text x={120} y={142} fill={color} fontSize="7" opacity="0.5" fontFamily="monospace">S&P+1.8%</text>

      {/* Passport */}
      <rect x={138} y={60} width={30} height={40} rx={3}
        fill="#0a2060" stroke={color} strokeWidth="1" />
      <text x={153} y={82} fill={color} fontSize="8" textAnchor="middle" opacity="0.9">🌏</text>

      {/* Base ant */}
      <AntBase color={color} cx={100} cy={138} />

      {/* Sunglasses */}
      <rect x={84} y={73} width={14} height={9} rx={3}
        fill="#0a0a1a" stroke={color} strokeWidth="1.5" />
      <rect x={102} y={73} width={14} height={9} rx={3}
        fill="#0a0a1a" stroke={color} strokeWidth="1.5" />
      <line x1={98} y1={77} x2={102} y2={77} stroke={color} strokeWidth="1" />
      <line x1={84} y1={77} x2={78} y2={75} stroke={color} strokeWidth="1" />
      <line x1={116} y1={77} x2={122} y2={75} stroke={color} strokeWidth="1" />

      {/* Riding pose - arms out */}
      <path d="M82 98 L52 85" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M118 98 L148 85" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

      <circle cx={100} cy={110} r={65} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

function GyeSuScene({ color }: { color: string }) {
  // Rumor whisperer with multiple phones + raincoat
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Rain drops */}
      {[20, 45, 70, 95, 120, 145, 170, 30, 55, 80, 105, 130, 155, 180].map((x, i) => (
        <line key={i}
          x1={x} y1={i % 2 === 0 ? 10 : 25}
          x2={x - 3} y2={i % 2 === 0 ? 28 : 43}
          stroke={color} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      ))}

      {/* Raincoat body */}
      <path d="M68 108 Q62 135 65 165 Q82 172 100 170 Q118 172 135 165 Q138 135 132 108 Q116 100 100 100 Q84 100 68 108 Z"
        fill="#050f1a" stroke={color} strokeWidth="1.5" opacity="0.9" />
      {/* Raincoat hood */}
      <path d="M72 98 Q68 75 72 65 Q80 55 100 55 Q120 55 128 65 Q132 75 128 98 Q114 92 100 92 Q86 92 72 98 Z"
        fill="#050f1a" stroke={color} strokeWidth="1.5" opacity="0.9" />
      {/* Hood shadow */}
      <path d="M78 98 Q76 82 80 72 Q88 62 100 62 Q112 62 120 72 Q124 82 122 98"
        fill={color} opacity="0.06" />

      {/* Base ant - partially visible under hood/coat */}
      <AntBase color={color} cx={100} cy={132} />

      {/* Sneaky eyes */}
      <circle cx={93} cy={82} r={4} fill="white" />
      <circle cx={107} cy={82} r={4} fill="white" />
      <circle cx={94} cy={84} r={2.5} fill={color} />
      <circle cx={108} cy={84} r={2.5} fill={color} />

      {/* 5 phones */}
      <rect x={30} y={90} width={18} height={28} rx={2} fill="#0a1428" stroke={color} strokeWidth="1" />
      <rect x={32} y={93} width={14} height={20} rx={1} fill={color} opacity="0.15" />
      <rect x={52} y={80} width={16} height={24} rx={2} fill="#0a1428" stroke={color} strokeWidth="1" />
      <rect x={134} y={80} width={16} height={24} rx={2} fill="#0a1428" stroke={color} strokeWidth="1" />
      <rect x={152} y={90} width={18} height={28} rx={2} fill="#0a1428" stroke={color} strokeWidth="1" />
      <rect x={154} y={93} width={14} height={20} rx={1} fill={color} opacity="0.15" />
      {/* Center phone held */}
      <rect x={88} y={150} width={24} height={36} rx={3} fill="#0d1c34" stroke={color} strokeWidth="1.5" />
      <rect x={91} y={154} width={18} height={26} rx={2} fill={color} opacity="0.15" />

      {/* Telegram notification dots */}
      <circle cx={42} cy={91} r={4} fill="#0088cc" />
      <circle cx={60} cy={81} r={4} fill="#0088cc" />
      <circle cx={140} cy={81} r={4} fill="#0088cc" />
      <circle cx={161} cy={91} r={4} fill="#0088cc" />

      {/* Whisper speech bubble */}
      <path d="M118 60 Q135 52 145 60 Q145 72 135 76 Q130 76 128 80 Q126 76 118 76 Q108 72 118 60 Z"
        fill="#050a14" stroke={color} strokeWidth="0.8" />
      <text x={126} y={71} fill={color} fontSize="7" textAnchor="middle" opacity="0.9">ssst...</text>

      <circle cx={100} cy={110} r={65} fill={color} opacity="0.04" filter="url(#glow)" />
    </svg>
  );
}

// Main component
export function AntCharacter({ stemKey, elementColor }: AntCharacterProps) {
  const scenes: Record<StemKey, React.JSX.Element> = {
    'gap-mok': <GapMokScene color={elementColor} />,
    'eul-mok': <EulMokScene color={elementColor} />,
    'byeong-hwa': <ByeongHwaScene color={elementColor} />,
    'jeong-hwa': <JeongHwaScene color={elementColor} />,
    'mu-to': <MuToScene color={elementColor} />,
    'gi-to': <GiToScene color={elementColor} />,
    'gyeong-geum': <GyeongGeumScene color={elementColor} />,
    'sin-geum': <SinGeumScene color={elementColor} />,
    'im-su': <ImSuScene color={elementColor} />,
    'gye-su': <GyeSuScene color={elementColor} />,
  };

  return (
    <div style={{
      width: '200px',
      height: '200px',
      position: 'relative',
    }}>
      {scenes[stemKey]}
    </div>
  );
}