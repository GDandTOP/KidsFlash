'use client'

// ── Gear path (8-tooth, pre-computed) ──────────────────────────────────────
function buildGearPath () {
  const cx = 12, cy = 12, OR = 9.5, IR = 7, N = 8
  const tau = 2 * Math.PI
  const sector = tau / N
  const halfTooth = sector * 0.5 / 2
  const f = (n) => n.toFixed(2)
  let d = ''
  for (let i = 0; i < N; i++) {
    const mid = i * sector - tau / 4
    const t1 = mid - halfTooth
    const t2 = mid + halfTooth
    const nextT1 = mid + sector - halfTooth
    if (i === 0) d += `M ${f(cx + IR * Math.cos(t1))} ${f(cy + IR * Math.sin(t1))} `
    d += `L ${f(cx + OR * Math.cos(t1))} ${f(cy + OR * Math.sin(t1))} `
    d += `L ${f(cx + OR * Math.cos(t2))} ${f(cy + OR * Math.sin(t2))} `
    d += `L ${f(cx + IR * Math.cos(t2))} ${f(cy + IR * Math.sin(t2))} `
    d += `A ${IR} ${IR} 0 0 1 ${f(cx + IR * Math.cos(nextT1))} ${f(cy + IR * Math.sin(nextT1))} `
  }
  return d + 'Z'
}
const GEAR_PATH = buildGearPath()

// ─────────────────────────────────────────────────────────────────────────────
// UI Icons
// ─────────────────────────────────────────────────────────────────────────────

export function SvgStar ({ size = 24, color = '#FECA57', stroke = '#E8A317' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path
        d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.1 8.26Z"
        fill={color}
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SvgGear ({ size = 24, color = '#6B7280' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path d={GEAR_PATH} fill={color} />
      <circle cx="12" cy="12" r="3.2" fill="white" />
    </svg>
  )
}

export function SvgHome ({ size = 24 }) {
  return (
    <svg viewBox="0 0 26 26" width={size} height={size}>
      {/* Chimney */}
      <rect x="17" y="4" width="3" height="6" rx="1" fill="white" opacity="0.9" />
      {/* Roof */}
      <path d="M1 13 L13 2 L25 13" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {/* Body */}
      <path d="M4 12 L13 4 L22 12 V24 H16 V18 H10 V24 H4 Z" fill="white" opacity="0.95" />
      {/* Door */}
      <rect x="10" y="18" width="6" height="6" rx="3" fill="#FFB347" />
      {/* Windows */}
      <rect x="5.5" y="14.5" width="4" height="4" rx="1" fill="#48DBFB" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" />
      <rect x="16.5" y="14.5" width="4" height="4" rx="1" fill="#48DBFB" stroke="rgba(255,255,255,0.8)" strokeWidth="0.8" />
    </svg>
  )
}

export function SvgRainbow ({ size = 60 }) {
  const w = 60, h = 36
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={size} height={size * h / w}>
      <path d={`M 3 ${h} A 27 27 0 0 1 57 ${h}`} fill="none" stroke="#FF6B8A" strokeWidth="5" strokeLinecap="round" />
      <path d={`M 7 ${h} A 23 23 0 0 1 53 ${h}`} fill="none" stroke="#FF9F43" strokeWidth="5" strokeLinecap="round" />
      <path d={`M 11 ${h} A 19 19 0 0 1 49 ${h}`} fill="none" stroke="#FECA57" strokeWidth="5" strokeLinecap="round" />
      <path d={`M 15 ${h} A 15 15 0 0 1 45 ${h}`} fill="none" stroke="#5CD85A" strokeWidth="5" strokeLinecap="round" />
      <path d={`M 19 ${h} A 11 11 0 0 1 41 ${h}`} fill="none" stroke="#48DBFB" strokeWidth="5" strokeLinecap="round" />
      <path d={`M 23 ${h} A 7 7 0 0 1 37 ${h}`} fill="none" stroke="#A66CFF" strokeWidth="5" strokeLinecap="round" />
      {/* Clouds */}
      <circle cx="4" cy={h - 1} r="5.5" fill="white" opacity="0.9" />
      <circle cx="56" cy={h - 1} r="5.5" fill="white" opacity="0.9" />
    </svg>
  )
}

export function SvgFinger ({ size = 20 }) {
  return (
    <svg viewBox="0 0 14 22" width={size * 14 / 22} height={size}>
      {/* Finger body */}
      <rect x="4.5" y="2" width="5" height="14" rx="2.5" fill="#FFCC94" stroke="#E8A870" strokeWidth="0.8" />
      {/* Fingertip rounded */}
      <ellipse cx="7" cy="2.5" rx="2.5" ry="2.5" fill="#FFCC94" stroke="#E8A870" strokeWidth="0.8" />
      {/* Knuckle lines */}
      <line x1="4.8" y1="10" x2="9.2" y2="10" stroke="#E8A870" strokeWidth="0.6" />
      <line x1="4.8" y1="13" x2="9.2" y2="13" stroke="#E8A870" strokeWidth="0.6" />
    </svg>
  )
}

export function SvgFamily ({ size = 44 }) {
  return (
    <svg viewBox="0 0 52 38" width={size} height={size * 38 / 52}>
      {/* Dad */}
      <circle cx="10" cy="9" r="8" fill="#FFCC94" stroke="#E8A870" strokeWidth="1" />
      <path d="M3 9 Q5 2 10 1 Q15 2 17 9" fill="#8D6E63" />
      <rect x="3" y="15" width="14" height="22" rx="7" fill="#4E89FF" />
      {/* Mom */}
      <circle cx="42" cy="9" r="8" fill="#FFCC94" stroke="#E8A870" strokeWidth="1" />
      <path d="M34 9 Q36 0 42 0 Q48 0 50 9 Q48 15 42 15 Q36 15 34 9" fill="#8D6E63" />
      <rect x="35" y="15" width="14" height="22" rx="7" fill="#FF7EB3" />
      {/* Kid */}
      <circle cx="26" cy="15" r="6.5" fill="#FFCC94" stroke="#E8A870" strokeWidth="1" />
      <rect x="19" y="21" width="14" height="16" rx="7" fill="#5CD85A" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Game Icons (replacing emoji game icons)
// ─────────────────────────────────────────────────────────────────────────────

export function SvgPalette ({ size = 48 }) {
  return (
    <svg viewBox="0 0 30 30" width={size} height={size}>
      {/* Palette body */}
      <ellipse cx="15" cy="16" rx="13" ry="12" fill="#FFCC94" stroke="#E8A870" strokeWidth="1.2" />
      {/* Thumb hole */}
      <circle cx="7" cy="24" r="4" fill="white" />
      {/* Color dots */}
      <circle cx="10" cy="9" r="3" fill="#FF6B8A" />
      <circle cx="16.5" cy="6.5" r="3" fill="#FECA57" />
      <circle cx="22.5" cy="9.5" r="3" fill="#5CD85A" />
      <circle cx="25" cy="16" r="3" fill="#48DBFB" />
      <circle cx="22" cy="22" r="3" fill="#A66CFF" />
    </svg>
  )
}

export function SvgPuzzle ({ size = 48 }) {
  return (
    <svg viewBox="0 0 30 30" width={size} height={size}>
      {/* 4-piece puzzle */}
      <rect x="2" y="2" width="12" height="12" rx="2" fill="#48DBFB" />
      <circle cx="14" cy="8" r="2.8" fill="#48DBFB" />
      <circle cx="8" cy="14" r="2.8" fill="#48DBFB" />
      <rect x="16" y="2" width="12" height="12" rx="2" fill="#5CD85A" />
      <circle cx="16" cy="8" r="2.8" fill="white" />
      <rect x="2" y="16" width="12" height="12" rx="2" fill="#FECA57" />
      <circle cx="8" cy="16" r="2.8" fill="white" />
      <rect x="16" y="16" width="12" height="12" rx="2" fill="#FF6B8A" />
    </svg>
  )
}

export function SvgNote ({ size = 48 }) {
  return (
    <svg viewBox="0 0 22 28" width={size * 22 / 28} height={size}>
      {/* Note head */}
      <ellipse cx="7.5" cy="22" rx="5.5" ry="4" transform="rotate(-20 7.5 22)" fill="#444" />
      {/* Stem */}
      <rect x="12" y="6" width="2.5" height="18" fill="#444" rx="1" />
      {/* Flag */}
      <path d="M14.5 6 Q22 10 20 17 Q16 14 14.5 15" fill="#444" />
    </svg>
  )
}

export function SvgBalloonIcon ({ size = 48, color = '#FF6B8A' }) {
  return (
    <svg viewBox="0 0 22 28" width={size * 22 / 28} height={size}>
      {/* Balloon body */}
      <circle cx="11" cy="10" r="10" fill={color} />
      {/* Highlight */}
      <ellipse cx="7.5" cy="6" rx="3.5" ry="2.5" fill="rgba(255,255,255,0.38)" />
      {/* Knot */}
      <ellipse cx="11" cy="20.5" rx="2" ry="1.5" fill={color} />
      {/* String */}
      <path d="M10 22 Q7.5 24 9 27" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function SvgNumbers ({ size = 48 }) {
  return (
    <svg viewBox="0 0 36 18" width={size} height={size * 18 / 36}>
      <rect x="1" y="1" width="10" height="16" rx="3.5" fill="#7C4DFF" />
      <text x="6" y="13.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="sans-serif">1</text>
      <rect x="13" y="1" width="10" height="16" rx="3.5" fill="#9C6FFF" />
      <text x="18" y="13.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="sans-serif">2</text>
      <rect x="25" y="1" width="10" height="16" rx="3.5" fill="#B08FFF" />
      <text x="30" y="13.5" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="sans-serif">3</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Card Mini Decorators (replacing mini emojis in game cards)
// ─────────────────────────────────────────────────────────────────────────────

export function SvgPaintbrush ({ size = 18 }) {
  return (
    <svg viewBox="0 0 12 28" width={size * 12 / 28} height={size}>
      <rect x="3.5" y="2" width="5" height="17" rx="2.5" fill="#8D6E63" stroke="#6D4C41" strokeWidth="0.7" />
      <rect x="3" y="16.5" width="6" height="3" rx="1" fill="#9E9E9E" />
      <path d="M3.5 19.5 Q4.5 26 6 28 Q7.5 26 8.5 19.5 Z" fill="#FF6B8A" />
    </svg>
  )
}

export function SvgPaintSplat ({ size = 18, color = '#FF6B8A' }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size}>
      <circle cx="10" cy="10" r="7" fill={color} />
      <circle cx="4" cy="5" r="3" fill={color} />
      <circle cx="17" cy="6" r="2.5" fill={color} />
      <circle cx="3" cy="14" r="2" fill={color} />
      <circle cx="16" cy="15" r="3" fill={color} />
    </svg>
  )
}

export function SvgDiamond ({ size = 16, color = '#48DBFB' }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      <path d="M8 1 L15 8 L8 15 L1 8 Z" fill={color} stroke="rgba(0,0,0,0.12)" strokeWidth="0.7" />
    </svg>
  )
}

export function SvgDoubleNote ({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 22" width={size} height={size * 22 / 24}>
      <rect x="8" y="3" width="10" height="2" rx="1" fill="#444" />
      <rect x="8" y="3" width="2" height="11" fill="#444" />
      <ellipse cx="7" cy="15" rx="4" ry="2.8" transform="rotate(-18 7 15)" fill="#444" />
      <rect x="16" y="5" width="2" height="11" fill="#444" />
      <ellipse cx="15" cy="17" rx="4" ry="2.8" transform="rotate(-18 15 17)" fill="#444" />
    </svg>
  )
}

export function SvgMic ({ size = 18 }) {
  return (
    <svg viewBox="0 0 14 24" width={size * 14 / 24} height={size}>
      <rect x="3.5" y="2" width="7" height="13" rx="3.5" fill="#DDD" stroke="#9E9E9E" strokeWidth="0.8" />
      <rect x="6" y="15" width="2" height="6" rx="1" fill="#9E9E9E" />
      <path d="M3 21 Q7 23 11 21" stroke="#9E9E9E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="4.5" y1="8" x2="9.5" y2="8" stroke="#9E9E9E" strokeWidth="0.8" />
      <line x1="4.5" y1="10.5" x2="9.5" y2="10.5" stroke="#9E9E9E" strokeWidth="0.8" />
    </svg>
  )
}

export function SvgPianoKeys ({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 14" width={size} height={size * 14 / 24}>
      <rect x="0.5" y="0.5" width="23" height="13" rx="1.5" fill="white" stroke="#CCC" strokeWidth="0.8" />
      {[4.3, 8.6, 12.9, 17.2].map((x) => (
        <line key={x} x1={x} y1="0.5" x2={x} y2="13.5" stroke="#CCC" strokeWidth="0.5" />
      ))}
      {[2.5, 6.8, 14.5, 18.8].map((x, i) => (
        <rect key={i} x={x} y="0.5" width="2.8" height="8.5" rx="0.5" fill="#222" />
      ))}
    </svg>
  )
}

export function SvgPopBurst ({ size = 18 }) {
  return (
    <svg viewBox="0 0 22 22" width={size} height={size}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = a * Math.PI / 180
        const x1 = 11 + 5 * Math.cos(r)
        const y1 = 11 + 5 * Math.sin(r)
        const x2 = 11 + 10 * Math.cos(r)
        const y2 = 11 + 10 * Math.sin(r)
        return <line key={a} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="#FECA57" strokeWidth="2.5" strokeLinecap="round" />
      })}
      <circle cx="11" cy="11" r="4.5" fill="#FF9F43" />
    </svg>
  )
}

export function SvgConfetti ({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <rect x="9.5" y="1.5" width="3" height="6" rx="1.5" fill="#FF6B8A" transform="rotate(10 11 4.5)" />
      <rect x="3" y="7" width="3" height="6" rx="1.5" fill="#FECA57" transform="rotate(-30 4.5 10)" />
      <rect x="17.5" y="5" width="3" height="6" rx="1.5" fill="#5CD85A" transform="rotate(25 19 8)" />
      <circle cx="5" cy="4.5" r="2.2" fill="#48DBFB" />
      <circle cx="19" cy="7" r="2.2" fill="#A66CFF" />
      <circle cx="12" cy="19" r="2.2" fill="#FF9F43" />
      <path d="M12 12 L8 17" stroke="#FECA57" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 12 L16 17" stroke="#FF6B8A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function SvgBlockNumber ({ n = 1, size = 18 }) {
  const colors = ['#7C4DFF', '#9C6FFF', '#B08FFF']
  return (
    <svg viewBox="0 0 18 20" width={size} height={size * 20 / 18}>
      <rect x="1" y="1" width="16" height="18" rx="4" fill={colors[(n - 1) % 3]} />
      <rect x="1" y="14" width="16" height="5" rx="2" fill="rgba(0,0,0,0.12)" />
      <text x="9" y="15" textAnchor="middle" fontSize="13" fontWeight="900" fill="white" fontFamily="sans-serif">{n}</text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene Decorators (replacing emoji in FloatingElements)
// ─────────────────────────────────────────────────────────────────────────────

export function SvgSunflower ({ size = 20 }) {
  const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      {PETAL_ANGLES.map((a) => (
        <ellipse key={a} cx="12" cy="5" rx="2.5" ry="4" fill="#FECA57" transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="5.5" fill="#8B5E3C" />
      <circle cx="12" cy="12" r="3.8" fill="#5C3A1E" />
      {[[-1, -1], [1, -1], [0, 1]].map(([dx, dy], i) => (
        <circle key={i} cx={12 + dx} cy={12 + dy} r="0.8" fill="#3E2723" />
      ))}
    </svg>
  )
}

export function SvgFlower ({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 28" width={size} height={size * 28 / 24}>
      <path d="M12 28 Q9 22 12 16" stroke="#4CAF50" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M12 20 Q6 17 8 12 Q12 16 12 20" fill="#66BB6A" />
      <path d="M12 16 Q9 9 11 5 Q12 3 12 7 Q12 3 13 5 Q15 9 12 16" fill="#FF6B8A" stroke="#CC3366" strokeWidth="0.7" />
      <path d="M12 16 Q6.5 12 7.5 6.5 Q10 4 11 8" fill="#FF8FA3" opacity="0.7" />
      <path d="M12 16 Q17.5 12 16.5 6.5 Q14 4 13 8" fill="#FF8FA3" opacity="0.7" />
    </svg>
  )
}

export function SvgButterfly ({ size = 18 }) {
  return (
    <svg viewBox="0 0 32 22" width={size} height={size * 22 / 32}>
      {/* Left wings */}
      <path d="M16 12 Q4 3 2 11 Q4 20 16 15" fill="#F48FB1" stroke="#C2185B" strokeWidth="0.7" />
      <path d="M16 12 Q7 7 5 13 Q7 17 16 14" fill="#FF80AB" opacity="0.55" />
      {/* Right wings */}
      <path d="M16 12 Q28 3 30 11 Q28 20 16 15" fill="#F48FB1" stroke="#C2185B" strokeWidth="0.7" />
      <path d="M16 12 Q25 7 27 13 Q25 17 16 14" fill="#FF80AB" opacity="0.55" />
      {/* Wing spots */}
      <circle cx="9" cy="10" r="2" fill="#E91E63" opacity="0.5" />
      <circle cx="23" cy="10" r="2" fill="#E91E63" opacity="0.5" />
      {/* Body */}
      <ellipse cx="16" cy="13.5" rx="1.5" ry="5" fill="#4A148C" />
      {/* Antennae */}
      <path d="M16 8 Q13 4 11 2" stroke="#4A148C" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M16 8 Q19 4 21 2" stroke="#4A148C" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="11" cy="2" r="1.4" fill="#4A148C" />
      <circle cx="21" cy="2" r="1.4" fill="#4A148C" />
    </svg>
  )
}

export function SvgBee ({ size = 14 }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size}>
      {/* Wings */}
      <ellipse cx="8.5" cy="4.5" rx="5" ry="3.5" fill="white" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.9" />
      <ellipse cx="12.5" cy="4.5" rx="5" ry="3.5" fill="white" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.9" />
      {/* Body */}
      <ellipse cx="10" cy="13" rx="5" ry="7" fill="#FECA57" stroke="#F57F17" strokeWidth="0.8" />
      {/* Stripes */}
      <rect x="5.5" y="11" width="9" height="2.5" rx="1" fill="#1A1A1A" opacity="0.7" />
      <rect x="5.5" y="14.5" width="9" height="2.5" rx="1" fill="#1A1A1A" opacity="0.7" />
      {/* Head */}
      <circle cx="10" cy="6.5" r="3.8" fill="#FECA57" stroke="#F57F17" strokeWidth="0.8" />
      <circle cx="8.5" cy="6" r="1.1" fill="#1A1A1A" />
      <circle cx="11.5" cy="6" r="1.1" fill="#1A1A1A" />
    </svg>
  )
}

export function SvgBlossom ({ size = 16 }) {
  const PETAL_ANGLES = [0, 72, 144, 216, 288]
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      {PETAL_ANGLES.map((a) => (
        <ellipse key={a} cx="12" cy="5.5" rx="4" ry="6" fill="#FFB7C5" stroke="#FF8FA3" strokeWidth="0.5" transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3.5" fill="#FECA57" />
      {[[-1, -1], [1, -1], [0, 1]].map(([dx, dy], i) => (
        <circle key={i} cx={12 + dx} cy={12 + dy} r="0.8" fill="#FF9800" />
      ))}
    </svg>
  )
}
