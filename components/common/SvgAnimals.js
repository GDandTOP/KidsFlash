'use client'

// ─────────────────────────────────────────────────────────────────────────────
// All SVG animal characters (shared across the app)
// Style matches the music-play/page.js animals: 48×60 viewBox, front-facing
// ─────────────────────────────────────────────────────────────────────────────

export function SvgBear ({ size = 48 }) {
  const h = Math.round(size * 62 / 48)
  return (
    <svg viewBox="0 0 48 62" width={size} height={h}>
      {/* Body */}
      <ellipse cx="24" cy="52" rx="14" ry="11" fill="#8B5E3C" />
      <ellipse cx="24" cy="54" rx="9" ry="8" fill="#C68642" />
      {/* Head */}
      <circle cx="24" cy="24" r="18" fill="#8B5E3C" />
      {/* Ears */}
      <circle cx="8" cy="9" r="9" fill="#8B5E3C" />
      <circle cx="40" cy="9" r="9" fill="#8B5E3C" />
      <circle cx="8" cy="9" r="5.5" fill="#FFB0B0" />
      <circle cx="40" cy="9" r="5.5" fill="#FFB0B0" />
      {/* Muzzle */}
      <ellipse cx="24" cy="32" rx="11" ry="8.5" fill="#C68642" />
      {/* Eyes */}
      <circle cx="17" cy="22" r="5.5" fill="white" />
      <circle cx="31" cy="22" r="5.5" fill="white" />
      <circle cx="17" cy="23" r="3.8" fill="#3A2000" />
      <circle cx="31" cy="23" r="3.8" fill="#3A2000" />
      <circle cx="17" cy="23" r="2.5" fill="#111" />
      <circle cx="31" cy="23" r="2.5" fill="#111" />
      <circle cx="18.5" cy="21.5" r="1.3" fill="white" />
      <circle cx="32.5" cy="21.5" r="1.3" fill="white" />
      {/* Nose */}
      <ellipse cx="24" cy="28.5" rx="4.5" ry="3.2" fill="#2D1B0E" />
      {/* Nostrils */}
      <circle cx="22.5" cy="28" r="1" fill="#555" opacity="0.5" />
      <circle cx="25.5" cy="28" r="1" fill="#555" opacity="0.5" />
      {/* Mouth */}
      <path d="M19 33 Q24 38 29 33" stroke="#8B4513" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="11" cy="59" rx="7" ry="4.5" fill="#8B5E3C" />
      <ellipse cx="37" cy="59" rx="7" ry="4.5" fill="#8B5E3C" />
    </svg>
  )
}

export function SvgCat ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <path d="M36 55 Q47 46 43 35" stroke="#F5A623" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="50" rx="13" ry="10" fill="#F5A623" />
      <ellipse cx="22" cy="52" rx="8" ry="7" fill="#FFD9A0" />
      <circle cx="22" cy="24" r="17" fill="#F5A623" />
      <polygon points="8,13 3,1 17,11" fill="#F5A623" />
      <polygon points="36,13 43,1 29,11" fill="#F5A623" />
      <polygon points="9,12 5,4 16,11" fill="#FFB0B0" />
      <polygon points="35,12 41,4 30,11" fill="#FFB0B0" />
      <circle cx="17" cy="23" r="5" fill="white" />
      <circle cx="27" cy="23" r="5" fill="white" />
      <circle cx="17" cy="24" r="3.5" fill="#3A7D44" />
      <circle cx="27" cy="24" r="3.5" fill="#3A7D44" />
      <ellipse cx="17" cy="25" rx="2" ry="3" fill="#111" />
      <ellipse cx="27" cy="25" rx="2" ry="3" fill="#111" />
      <circle cx="18.5" cy="22.5" r="1.2" fill="white" />
      <circle cx="28.5" cy="22.5" r="1.2" fill="white" />
      <path d="M19 31 L22 34 L25 31 Z" fill="#FF8888" />
      <path d="M18 34 Q22 38 26 34" stroke="#DD5555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="4" y1="30" x2="16" y2="32" stroke="#aaa" strokeWidth="0.9" />
      <line x1="4" y1="33" x2="16" y2="33.5" stroke="#aaa" strokeWidth="0.9" />
      <line x1="28" y1="32" x2="41" y2="30" stroke="#aaa" strokeWidth="0.9" />
      <line x1="28" y1="33.5" x2="41" y2="33" stroke="#aaa" strokeWidth="0.9" />
      <ellipse cx="10" cy="57" rx="6" ry="4" fill="#F5A623" />
      <ellipse cx="34" cy="57" rx="6" ry="4" fill="#F5A623" />
    </svg>
  )
}

export function SvgDog ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <path d="M36 55 Q47 45 43 34" stroke="#C68642" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="24" cy="50" rx="13" ry="10" fill="#C68642" />
      <ellipse cx="24" cy="52" rx="8" ry="7" fill="#E8B87A" />
      <circle cx="24" cy="24" r="17" fill="#C68642" />
      <ellipse cx="9" cy="29" rx="7" ry="11" fill="#A0612A" transform="rotate(-15 9 29)" />
      <ellipse cx="39" cy="29" rx="7" ry="11" fill="#A0612A" transform="rotate(15 39 29)" />
      <ellipse cx="24" cy="32" rx="9" ry="7" fill="#E8B87A" />
      <circle cx="18" cy="22" r="5" fill="white" />
      <circle cx="30" cy="22" r="5" fill="white" />
      <circle cx="18" cy="23" r="3.5" fill="#5C3317" />
      <circle cx="30" cy="23" r="3.5" fill="#5C3317" />
      <circle cx="18" cy="23" r="2.5" fill="#111" />
      <circle cx="30" cy="23" r="2.5" fill="#111" />
      <circle cx="19.5" cy="21.5" r="1.2" fill="white" />
      <circle cx="31.5" cy="21.5" r="1.2" fill="white" />
      <ellipse cx="24" cy="29" rx="4" ry="3" fill="#2D1B0E" />
      <circle cx="22.5" cy="28" r="1" fill="#555" opacity="0.5" />
      <path d="M19 33 Q24 37.5 29 33" stroke="#A0612A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="12" cy="57" rx="6" ry="4" fill="#C68642" />
      <ellipse cx="36" cy="57" rx="6" ry="4" fill="#C68642" />
    </svg>
  )
}

export function SvgBunny ({ size = 48 }) {
  const h = Math.round(size * 65 / 48)
  return (
    <svg viewBox="0 0 48 65" width={size} height={h}>
      <ellipse cx="16" cy="8" rx="6" ry="14" fill="#F8C8D8" />
      <ellipse cx="32" cy="8" rx="6" ry="14" fill="#F8C8D8" />
      <ellipse cx="16" cy="8" rx="3.5" ry="11" fill="#FFB0C8" />
      <ellipse cx="32" cy="8" rx="3.5" ry="11" fill="#FFB0C8" />
      <ellipse cx="24" cy="52" rx="13" ry="10" fill="#F8C8D8" />
      <ellipse cx="24" cy="54" rx="8" ry="7" fill="white" />
      <circle cx="24" cy="28" r="17" fill="#F8C8D8" />
      <circle cx="18" cy="26" r="5" fill="white" />
      <circle cx="30" cy="26" r="5" fill="white" />
      <circle cx="18" cy="27" r="3.5" fill="#CC4488" />
      <circle cx="30" cy="27" r="3.5" fill="#CC4488" />
      <circle cx="18" cy="27" r="2.5" fill="#881144" />
      <circle cx="30" cy="27" r="2.5" fill="#881144" />
      <circle cx="19.5" cy="25.5" r="1.2" fill="white" />
      <circle cx="31.5" cy="25.5" r="1.2" fill="white" />
      <ellipse cx="24" cy="34" rx="3" ry="2" fill="#FF88AA" />
      <path d="M20 36 Q24 40 28 36" stroke="#FF88AA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="36" cy="55" r="5" fill="white" />
      <ellipse cx="12" cy="62" rx="6" ry="4" fill="#F8C8D8" />
      <ellipse cx="36" cy="62" rx="6" ry="4" fill="#F8C8D8" />
    </svg>
  )
}

export function SvgFox ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <path d="M36 55 Q47 45 43 33" stroke="#E8821A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="32" r="5" fill="white" />
      <ellipse cx="22" cy="50" rx="13" ry="10" fill="#E8821A" />
      <ellipse cx="22" cy="52" rx="8" ry="7" fill="#FFF0E0" />
      <ellipse cx="22" cy="25" rx="16" ry="16" fill="#E8821A" />
      <polygon points="7,14 3,2 17,12" fill="#E8821A" />
      <polygon points="37,14 41,2 31,12" fill="#E8821A" />
      <polygon points="8,13 5,4 16,12" fill="#CC4444" />
      <polygon points="36,13 39,4 30,12" fill="#CC4444" />
      <ellipse cx="22" cy="33" rx="9" ry="7" fill="#FFF0E0" />
      <circle cx="16" cy="23" r="5" fill="white" />
      <circle cx="28" cy="23" r="5" fill="white" />
      <circle cx="16" cy="24" r="3.5" fill="#2D5016" />
      <circle cx="28" cy="24" r="3.5" fill="#2D5016" />
      <circle cx="16" cy="24" r="2.5" fill="#111" />
      <circle cx="28" cy="24" r="2.5" fill="#111" />
      <circle cx="17.5" cy="22.5" r="1.2" fill="white" />
      <circle cx="29.5" cy="22.5" r="1.2" fill="white" />
      <ellipse cx="22" cy="30" rx="3" ry="2.5" fill="#333" />
      <path d="M17 34 Q22 38 27 34" stroke="#C06020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="10" cy="57" rx="6" ry="4" fill="#E8821A" />
      <ellipse cx="34" cy="57" rx="6" ry="4" fill="#E8821A" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mascot bear with swappable expressions (for home page)
// ─────────────────────────────────────────────────────────────────────────────

export function SvgMascot ({ expression = 'neutral', size = 80 }) {
  const h = Math.round(size * 84 / 76)

  const EYES = {
    neutral: (
      <>
        <circle cx="27" cy="30" r="7" fill="white" />
        <circle cx="49" cy="30" r="7" fill="white" />
        <circle cx="27" cy="31.5" r="5" fill="#3A2000" />
        <circle cx="49" cy="31.5" r="5" fill="#3A2000" />
        <circle cx="27" cy="31.5" r="3.2" fill="#111" />
        <circle cx="49" cy="31.5" r="3.2" fill="#111" />
        <circle cx="29" cy="29.5" r="1.5" fill="white" />
        <circle cx="51" cy="29.5" r="1.5" fill="white" />
      </>
    ),
    excited: (
      <>
        <circle cx="27" cy="29" r="8.5" fill="white" />
        <circle cx="49" cy="29" r="8.5" fill="white" />
        <circle cx="27" cy="30.5" r="6" fill="#3A2000" />
        <circle cx="49" cy="30.5" r="6" fill="#3A2000" />
        <circle cx="27" cy="30.5" r="3.8" fill="#111" />
        <circle cx="49" cy="30.5" r="3.8" fill="#111" />
        <circle cx="30" cy="28" r="2" fill="white" />
        <circle cx="52" cy="28" r="2" fill="white" />
      </>
    ),
    happy: (
      <>
        <path d="M20 28 Q27 20 34 28" stroke="#3A2000" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M42 28 Q49 20 56 28" stroke="#3A2000" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </>
    ),
    amazed: (
      <>
        <circle cx="27" cy="29" r="9.5" fill="white" />
        <circle cx="49" cy="29" r="9.5" fill="white" />
        <circle cx="27" cy="30" r="6.5" fill="#3A2000" />
        <circle cx="49" cy="30" r="6.5" fill="#3A2000" />
        <circle cx="27" cy="30" r="4" fill="#111" />
        <circle cx="49" cy="30" r="4" fill="#111" />
        <circle cx="30.5" cy="27" r="2.2" fill="white" />
        <circle cx="52.5" cy="27" r="2.2" fill="white" />
      </>
    ),
    loving: (
      <>
        {/* Heart eyes */}
        <path d="M27 34 C 20 30 19 26 19 25 A 4 4 0 0 1 27 25 A 4 4 0 0 1 35 25 C 35 26 34 30 27 34 Z" fill="#FF6B8A" stroke="#CC3366" strokeWidth="0.5" />
        <path d="M49 34 C 42 30 41 26 41 25 A 4 4 0 0 1 49 25 A 4 4 0 0 1 57 25 C 57 26 56 30 49 34 Z" fill="#FF6B8A" stroke="#CC3366" strokeWidth="0.5" />
      </>
    )
  }

  const MOUTHS = {
    neutral: <path d="M28 46 Q38 53 48 46" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />,
    excited: <path d="M24 46 Q38 58 52 46" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />,
    happy: <path d="M24 46 Q38 58 52 46" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />,
    amazed: <ellipse cx="38" cy="49" rx="7" ry="6" fill="#CC4444" stroke="#8B4513" strokeWidth="1.5" />,
    loving: <path d="M26 47 Q38 56 50 47" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  }

  const eyes = EYES[expression] || EYES.neutral
  const mouth = MOUTHS[expression] || MOUTHS.neutral

  return (
    <svg viewBox="0 0 76 84" width={size} height={h}>
      {/* Body */}
      <ellipse cx="38" cy="72" rx="20" ry="14" fill="#8B5E3C" />
      <ellipse cx="38" cy="74" rx="13" ry="10" fill="#C68642" />
      {/* Head */}
      <circle cx="38" cy="34" r="28" fill="#8B5E3C" />
      {/* Ears */}
      <circle cx="11" cy="12" r="13" fill="#8B5E3C" />
      <circle cx="65" cy="12" r="13" fill="#8B5E3C" />
      <circle cx="11" cy="12" r="8.5" fill="#FFB0B0" />
      <circle cx="65" cy="12" r="8.5" fill="#FFB0B0" />
      {/* Muzzle */}
      <ellipse cx="38" cy="44" rx="16" ry="12" fill="#C68642" />
      {/* Nose */}
      <ellipse cx="38" cy="36" rx="5.5" ry="4" fill="#2D1B0E" />
      <circle cx="36.5" cy="35.5" r="1.2" fill="#555" opacity="0.5" />
      <circle cx="39.5" cy="35.5" r="1.2" fill="#555" opacity="0.5" />
      {/* Eyes */}
      {eyes}
      {/* Mouth */}
      {mouth}
      {/* Blush for loving */}
      {expression === 'loving' && (
        <>
          <circle cx="17" cy="42" r="6.5" fill="#FF9EB5" opacity="0.45" />
          <circle cx="59" cy="42" r="6.5" fill="#FF9EB5" opacity="0.45" />
        </>
      )}
      {/* Paws */}
      <ellipse cx="18" cy="79" rx="9" ry="5.5" fill="#8B5E3C" />
      <ellipse cx="58" cy="79" rx="9" ry="5.5" fill="#8B5E3C" />
    </svg>
  )
}
