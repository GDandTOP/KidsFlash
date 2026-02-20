'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameHeader from '@/components/layout/GameHeader'
import useGameStore from '@/stores/useGameStore'

const NOTES = [
  { note: '도', freq: 261.63, color: '#FF6B6B', dark: '#CC3333' },
  { note: '레', freq: 293.66, color: '#FF9F43', dark: '#CC6600' },
  { note: '미', freq: 329.63, color: '#FECA57', dark: '#CCA000' },
  { note: '파', freq: 349.23, color: '#5CD85A', dark: '#339933' },
  { note: '솔', freq: 392.00, color: '#48DBFB', dark: '#22AACC' },
  { note: '라', freq: 440.00, color: '#4E89FF', dark: '#2244CC' },
  { note: '시', freq: 493.88, color: '#A66CFF', dark: '#7733CC' },
  { note: '도!', freq: 523.25, color: '#FF7EB3', dark: '#CC3388' }
]

const XYLO_WIDTHS = [52, 58, 65, 72, 79, 86, 93, 100]
// bar heights for horizontal layout (도=shortest, 도!=tallest)
const XYLO_HEIGHTS = [74, 82, 90, 98, 106, 114, 122, 130]

const DRUM_KIT = {
  cymbals: [
    { id: 'hihat', name: '하이햇', freq: 800, type: 'hihat', decay: 0.12, color: '#FFD700', rim: '#B8860B' },
    { id: 'crash', name: '크래쉬', freq: 550, type: 'hihat', decay: 0.3, color: '#FFA500', rim: '#CC7700' }
  ],
  toms: [
    { id: 'tom1', name: '탐탐1', freq: 220, type: 'tom', decay: 0.3, color: '#FF6B6B', rim: '#993333' },
    { id: 'tom2', name: '탐탐2', freq: 160, type: 'tom', decay: 0.35, color: '#48DBFB', rim: '#228899' }
  ],
  snare: { id: 'snare', name: '스네어', freq: 250, type: 'snare', decay: 0.18, color: '#D0D0D0', rim: '#888888' },
  kick: { id: 'kick', name: '베이스킥', freq: 60, type: 'kick', decay: 0.6, color: '#2A1810', rim: '#1A0808' }
}

const INSTRUMENTS = [
  { id: 'piano', name: '피아노', emoji: '🎹' },
  { id: 'xylophone', name: '실로폰', emoji: '🎵' },
  { id: 'drum', name: '드럼', emoji: '🥁' }
]

const EXCITED_MSGS = ['신나!', '야호!', '최고!', '우와!', '멋져!']

// ────────────────────────────────────────────────────────
// SVG ANIMAL CHARACTERS
// ────────────────────────────────────────────────────────

function SvgCat ({ size = 48 }) {
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

function SvgDog ({ size = 48 }) {
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

function SvgBunny ({ size = 48 }) {
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

function SvgHamster ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      {/* Body */}
      <ellipse cx="24" cy="50" rx="15" ry="11" fill="#F5C842" />
      {/* Belly */}
      <ellipse cx="24" cy="52" rx="10" ry="8" fill="#FFE9A0" />
      {/* Head - very round */}
      <circle cx="24" cy="24" r="18" fill="#F5C842" />
      {/* Chubby cheek pouches - hamster's signature */}
      <circle cx="8" cy="30" r="9" fill="#FFD070" />
      <circle cx="40" cy="30" r="9" fill="#FFD070" />
      {/* Ears - small round */}
      <circle cx="11" cy="9" r="6.5" fill="#F5C842" />
      <circle cx="37" cy="9" r="6.5" fill="#F5C842" />
      <circle cx="11" cy="9" r="4" fill="#FFB0C0" />
      <circle cx="37" cy="9" r="4" fill="#FFB0C0" />
      {/* Eyes - big shiny */}
      <circle cx="18" cy="21" r="5.5" fill="white" />
      <circle cx="30" cy="21" r="5.5" fill="white" />
      <circle cx="18" cy="22" r="3.8" fill="#2A1A00" />
      <circle cx="30" cy="22" r="3.8" fill="#2A1A00" />
      <circle cx="18" cy="22" r="2.5" fill="#111" />
      <circle cx="30" cy="22" r="2.5" fill="#111" />
      <circle cx="19.5" cy="20.5" r="1.4" fill="white" />
      <circle cx="31.5" cy="20.5" r="1.4" fill="white" />
      {/* Nose - small button */}
      <ellipse cx="24" cy="29" rx="2.5" ry="1.8" fill="#FF9999" />
      {/* Mouth */}
      <path d="M20 31 Q24 35.5 28 31" stroke="#CC6666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tiny paws */}
      <ellipse cx="12" cy="58" rx="7" ry="4" fill="#F5C842" />
      <ellipse cx="36" cy="58" rx="7" ry="4" fill="#F5C842" />
    </svg>
  )
}

function SvgFrog ({ size = 48 }) {
  const h = Math.round(size * 58 / 48)
  return (
    <svg viewBox="0 0 48 58" width={size} height={h}>
      <ellipse cx="24" cy="50" rx="15" ry="9" fill="#4CAF50" />
      <ellipse cx="24" cy="52" rx="10" ry="6.5" fill="#A5D6A7" />
      <ellipse cx="24" cy="27" rx="18" ry="16" fill="#4CAF50" />
      <circle cx="12" cy="14" r="7" fill="#4CAF50" />
      <circle cx="36" cy="14" r="7" fill="#4CAF50" />
      <circle cx="12" cy="13" r="6" fill="white" />
      <circle cx="36" cy="13" r="6" fill="white" />
      <circle cx="12" cy="14" r="4" fill="#1B5E20" />
      <circle cx="36" cy="14" r="4" fill="#1B5E20" />
      <circle cx="12" cy="14" r="2.5" fill="#111" />
      <circle cx="36" cy="14" r="2.5" fill="#111" />
      <circle cx="13.5" cy="12.5" r="1.5" fill="white" />
      <circle cx="37.5" cy="12.5" r="1.5" fill="white" />
      <ellipse cx="21" cy="25" rx="2" ry="1.5" fill="#388E3C" />
      <ellipse cx="27" cy="25" rx="2" ry="1.5" fill="#388E3C" />
      <path d="M11 33 Q24 43 37 33" stroke="#2E7D32" strokeWidth="2" fill="#A5D6A7" />
      <ellipse cx="10" cy="57" rx="8" ry="4" fill="#4CAF50" />
      <ellipse cx="38" cy="57" rx="8" ry="4" fill="#4CAF50" />
    </svg>
  )
}

function SvgPanda ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <ellipse cx="24" cy="50" rx="14" ry="10" fill="white" />
      <ellipse cx="11" cy="52" rx="7" ry="8" fill="#222" />
      <ellipse cx="37" cy="52" rx="7" ry="8" fill="#222" />
      <circle cx="24" cy="24" r="17" fill="white" />
      <circle cx="10" cy="10" r="7" fill="#222" />
      <circle cx="38" cy="10" r="7" fill="#222" />
      <ellipse cx="17" cy="23" rx="7" ry="8" fill="#222" />
      <ellipse cx="31" cy="23" rx="7" ry="8" fill="#222" />
      <circle cx="17" cy="23" r="5" fill="white" />
      <circle cx="31" cy="23" r="5" fill="white" />
      <circle cx="17" cy="24" r="3.5" fill="#1A1A2E" />
      <circle cx="31" cy="24" r="3.5" fill="#1A1A2E" />
      <circle cx="17" cy="24" r="2" fill="#111" />
      <circle cx="31" cy="24" r="2" fill="#111" />
      <circle cx="18.5" cy="22.5" r="1.2" fill="white" />
      <circle cx="32.5" cy="22.5" r="1.2" fill="white" />
      <ellipse cx="24" cy="32" rx="4" ry="3" fill="#222" />
      <path d="M19 35 Q24 40 29 35" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="57" rx="7" ry="4" fill="#222" />
      <ellipse cx="37" cy="57" rx="7" ry="4" fill="#222" />
    </svg>
  )
}

function SvgFox ({ size = 48 }) {
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

function SvgTiger ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <path d="M36 55 Q47 45 43 33" stroke="#FF8C00" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="50" rx="14" ry="10" fill="#FF8C00" />
      <ellipse cx="22" cy="52" rx="9" ry="7" fill="#FFD0A0" />
      <path d="M14 43 Q22 41 30 43" stroke="#333" strokeWidth="1.8" fill="none" />
      <path d="M12 48 Q22 46 32 48" stroke="#333" strokeWidth="1.8" fill="none" />
      <circle cx="22" cy="24" r="17" fill="#FF8C00" />
      <polygon points="7,12 3,1 17,11" fill="#FF8C00" />
      <polygon points="37,12 41,1 27,11" fill="#FF8C00" />
      <polygon points="8,11 5,3 16,10" fill="#FFD0A0" />
      <polygon points="36,11 39,3 28,10" fill="#FFD0A0" />
      <path d="M8 19 Q13 17 13 23" stroke="#333" strokeWidth="1.8" fill="none" />
      <path d="M36 19 Q31 17 31 23" stroke="#333" strokeWidth="1.8" fill="none" />
      <path d="M18 9 Q22 14 26 9" stroke="#333" strokeWidth="1.8" fill="none" />
      <circle cx="17" cy="23" r="5" fill="white" />
      <circle cx="27" cy="23" r="5" fill="white" />
      <circle cx="17" cy="24" r="3.5" fill="#5C7A00" />
      <circle cx="27" cy="24" r="3.5" fill="#5C7A00" />
      <ellipse cx="17" cy="24" rx="2" ry="3" fill="#111" />
      <ellipse cx="27" cy="24" rx="2" ry="3" fill="#111" />
      <circle cx="18.5" cy="22.5" r="1.2" fill="white" />
      <circle cx="28.5" cy="22.5" r="1.2" fill="white" />
      <ellipse cx="22" cy="32" rx="8" ry="6" fill="#FFD0A0" />
      <ellipse cx="22" cy="28.5" rx="3.5" ry="2.5" fill="#333" />
      <path d="M17 34 Q22 39 27 34" stroke="#CC5500" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="57" rx="6" ry="4" fill="#FF8C00" />
      <ellipse cx="33" cy="57" rx="6" ry="4" fill="#FF8C00" />
    </svg>
  )
}

function SvgLion ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <path d="M36 55 Q47 45 43 33" stroke="#DAA520" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="43" cy="32" rx="5" ry="6" fill="#8B6914" />
      <ellipse cx="22" cy="50" rx="14" ry="10" fill="#DAA520" />
      <ellipse cx="22" cy="52" rx="9" ry="7" fill="#FFE08A" />
      <circle cx="22" cy="24" r="22" fill="#8B6914" />
      <circle cx="22" cy="24" r="16" fill="#DAA520" />
      <circle cx="8" cy="10" r="5" fill="#DAA520" />
      <circle cx="36" cy="10" r="5" fill="#DAA520" />
      <circle cx="8" cy="10" r="3" fill="#FFE08A" />
      <circle cx="36" cy="10" r="3" fill="#FFE08A" />
      <circle cx="17" cy="22" r="5" fill="white" />
      <circle cx="27" cy="22" r="5" fill="white" />
      <circle cx="17" cy="23" r="3.5" fill="#7A5200" />
      <circle cx="27" cy="23" r="3.5" fill="#7A5200" />
      <circle cx="17" cy="23" r="2.5" fill="#111" />
      <circle cx="27" cy="23" r="2.5" fill="#111" />
      <circle cx="18.5" cy="21.5" r="1.2" fill="white" />
      <circle cx="28.5" cy="21.5" r="1.2" fill="white" />
      <ellipse cx="22" cy="31" rx="8" ry="6" fill="#FFE08A" />
      <ellipse cx="22" cy="27.5" rx="3.5" ry="2.5" fill="#8B6914" />
      <path d="M17 33 Q22 38 27 33" stroke="#B8860B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="57" rx="6" ry="4" fill="#DAA520" />
      <ellipse cx="33" cy="57" rx="6" ry="4" fill="#DAA520" />
    </svg>
  )
}

function SvgWolf ({ size = 48 }) {
  const h = Math.round(size * 60 / 48)
  return (
    <svg viewBox="0 0 48 60" width={size} height={h}>
      <path d="M36 54 Q47 44 43 32" stroke="#9E9E9E" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="31" r="5" fill="#E0E0E0" />
      <ellipse cx="22" cy="50" rx="14" ry="10" fill="#9E9E9E" />
      <ellipse cx="22" cy="52" rx="9" ry="7" fill="#E0E0E0" />
      <ellipse cx="22" cy="25" rx="17" ry="16" fill="#9E9E9E" />
      <polygon points="7,13 3,1 16,11" fill="#9E9E9E" />
      <polygon points="37,13 41,1 32,11" fill="#9E9E9E" />
      <polygon points="8,12 5,3 15,10" fill="#CC8888" />
      <polygon points="36,12 39,3 33,10" fill="#CC8888" />
      <ellipse cx="22" cy="32" rx="10" ry="7" fill="#BDBDBD" />
      <circle cx="16" cy="22" r="5" fill="white" />
      <circle cx="28" cy="22" r="5" fill="white" />
      <circle cx="16" cy="23" r="3.5" fill="#FFCA28" />
      <circle cx="28" cy="23" r="3.5" fill="#FFCA28" />
      <ellipse cx="16" cy="23" rx="2" ry="3" fill="#111" />
      <ellipse cx="28" cy="23" rx="2" ry="3" fill="#111" />
      <circle cx="17.5" cy="21.5" r="1.2" fill="white" />
      <circle cx="29.5" cy="21.5" r="1.2" fill="white" />
      <ellipse cx="22" cy="29" rx="4" ry="3" fill="#333" />
      <circle cx="20.5" cy="28" r="1" fill="#666" opacity="0.5" />
      <path d="M17 33 Q22 38 27 33" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="11" cy="57" rx="6" ry="4" fill="#9E9E9E" />
      <ellipse cx="33" cy="57" rx="6" ry="4" fill="#9E9E9E" />
    </svg>
  )
}

// instrument → [AnimalComponent1, AnimalComponent2, AnimalComponent3]
const ANIMAL_COMPONENTS = {
  piano:     [SvgCat, SvgDog, SvgBunny],
  xylophone: [SvgHamster, SvgPanda, SvgFox],
  drum:      [SvgTiger, SvgLion, SvgWolf]
}

// ────────────────────────────────────────────────────────
// AUDIO
// ────────────────────────────────────────────────────────
function useAudio () {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playPiano = useCallback((freq) => {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.6, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.4)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 1.4)
  }, [getCtx])

  const playXylo = useCallback((freq) => {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.7, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.9)
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 3.9, ctx.currentTime)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    gain2.gain.setValueAtTime(0.25, ctx.currentTime)
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)
    osc2.start(ctx.currentTime)
    osc2.stop(ctx.currentTime + 0.35)
  }, [getCtx])

  const playDrum = useCallback((type, freq, decay) => {
    const ctx = getCtx()
    if (type === 'kick') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq * 3, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.1)
      osc.connect(gain)
      gain.connect(ctx.destination)
      gain.gain.setValueAtTime(1.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + decay)
      return
    }
    if (type === 'hihat') {
      const bufferSize = Math.ceil(ctx.sampleRate * decay)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.value = freq
      const gain = ctx.createGain()
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay)
      source.start(ctx.currentTime)
      return
    }
    if (type === 'snare') {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.connect(oscGain)
      oscGain.connect(ctx.destination)
      oscGain.gain.setValueAtTime(0.5, ctx.currentTime)
      oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.08)
      const bufferSize = Math.ceil(ctx.sampleRate * decay)
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const noiseGain = ctx.createGain()
      source.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noiseGain.gain.setValueAtTime(0.4, ctx.currentTime)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay)
      source.start(ctx.currentTime)
      return
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq * 1.5, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    gain.gain.setValueAtTime(0.8, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + decay)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + decay)
  }, [getCtx])

  return { playPiano, playXylo, playDrum }
}

// ────────────────────────────────────────────────────────
// KEY-PRESS POP ANIMAL  (piano & xylophone)
// ────────────────────────────────────────────────────────
function KeyPopAnimal ({ AnimalComponent, x }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, bottom: 0, transform: 'translateX(-50%)' }}
      initial={{ opacity: 0, y: 18, scale: 0.35 }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        y: [18, -4, -16, -4, -18],
        scale: [0.35, 1.1, 0.95, 1.05, 0.8]
      }}
      transition={{ duration: 1.05, ease: 'easeOut' }}
    >
      <AnimalComponent size={40} />
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────
// DANCING ANIMALS (top decorative row)
// ────────────────────────────────────────────────────────
function DancingAnimal ({ AnimalComponent, idx, hitCount }) {
  const [isExcited, setIsExcited] = useState(false)
  const prevHit = useRef(0)

  useEffect(() => {
    if (hitCount === prevHit.current) return
    prevHit.current = hitCount
    setIsExcited(true)
    const timer = setTimeout(() => setIsExcited(false), 530)
    return () => clearTimeout(timer)
  }, [hitCount])

  const delay = idx * 0.2
  const baseRotate = idx % 2 === 0 ? 11 : -11

  return (
    <motion.div
      className="select-none cursor-default"
      animate={
        isExcited
          ? { y: [0, -30, -6, -24, 0], rotate: [0, baseRotate * 1.6, -baseRotate, baseRotate * 0.8, 0], scale: [1, 1.38, 1.05, 1.25, 1] }
          : { y: [0, -9, 0], rotate: [0, baseRotate, 0] }
      }
      transition={
        isExcited
          ? { duration: 0.53, ease: 'easeInOut' }
          : { duration: 0.95 + delay, repeat: Infinity, delay, ease: 'easeInOut' }
      }
    >
      <AnimalComponent size={54} />
    </motion.div>
  )
}

function DancingAnimals ({ instrument, hitCount }) {
  const [bubbleMsg, setBubbleMsg] = useState('같이 연주해요! 🎵')
  const prevHit = useRef(0)

  useEffect(() => {
    if (hitCount === prevHit.current) return
    prevHit.current = hitCount
    setBubbleMsg(EXCITED_MSGS[Math.floor(Math.random() * EXCITED_MSGS.length)])
    const timer = setTimeout(() => setBubbleMsg('같이 연주해요! 🎵'), 1300)
    return () => clearTimeout(timer)
  }, [hitCount])

  const animals = ANIMAL_COMPONENTS[instrument]

  return (
    <div className="flex justify-center items-end gap-5 mb-3">
      {animals.map((Animal, i) => (
        <div key={`${instrument}-${i}`} className="flex flex-col items-center">
          {i === 1 && (
            <motion.div
              className="mb-1.5 bg-white/90 backdrop-blur-sm text-xs font-black px-3 py-1 rounded-full shadow-md text-gray-600 whitespace-nowrap border border-white/60"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 0.3 }}
              key={bubbleMsg}
            >
              {bubbleMsg}
            </motion.div>
          )}
          <DancingAnimal AnimalComponent={Animal} idx={i} hitCount={hitCount} />
        </div>
      ))}
    </div>
  )
}

// ────────────────────────────────────────────────────────
// PIANO
// ────────────────────────────────────────────────────────
function Piano ({ playPiano, onBeat }) {
  const [pressed, setPressed] = useState(new Set())
  const [keyAnimals, setKeyAnimals] = useState([])

  const press = useCallback((i, note) => {
    setPressed(prev => new Set([...prev, i]))
    playPiano(note.freq)
    onBeat?.()

    const animalIdx = Math.floor(Math.random() * 3)
    const id = Date.now() + Math.random()
    setKeyAnimals(prev => [...prev, { id, keyIdx: i, animalIdx }])
    setTimeout(() => setKeyAnimals(prev => prev.filter(a => a.id !== id)), 1100)

    setTimeout(() => {
      setPressed(prev => {
        const next = new Set(prev)
        next.delete(i)
        return next
      })
    }, 260)
  }, [playPiano, onBeat])

  return (
    <div className="w-full flex flex-col items-center">
      {/* Key-press animal pop zone — h-0 so it adds no layout gap */}
      <div className="relative w-full max-w-sm h-0 overflow-visible pointer-events-none">
        <AnimatePresence>
          {keyAnimals.map(a => {
            const Animal = ANIMAL_COMPONENTS.piano[a.animalIdx]
            return (
              <KeyPopAnimal
                key={a.id}
                AnimalComponent={Animal}
                x={(a.keyIdx + 0.5) / 8 * 100}
              />
            )
          })}
        </AnimatePresence>
      </div>

      {/* Piano body */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #4a2c1a 0%, #1a0f0a 100%)',
          padding: '14px 6px 20px',
          boxShadow: '0 14px 40px rgba(0,0,0,0.55), 0 4px 0 #0d0604, inset 0 1px 0 rgba(255,255,255,0.08)'
        }}
      >
        <div className="text-center mb-3">
          <span className="text-yellow-400/60 text-xs font-bold tracking-[8px]">PIANO</span>
        </div>

        {/* grid-cols-8: each key gets exactly 1/8 — no overflow */}
        <div className="grid grid-cols-8 gap-0.5">
          {NOTES.map((note, i) => {
            const isPressed = pressed.has(i)
            return (
              <motion.button
                key={i}
                className="relative rounded-b-xl select-none min-w-0"
                style={{
                  height: 120,
                  background: isPressed
                    ? `linear-gradient(180deg, ${note.color}BB 0%, ${note.color} 65%, ${note.dark} 100%)`
                    : 'linear-gradient(180deg, #f8f8f8 0%, #ececec 65%, #d5d5d5 100%)',
                  borderTop: `3px solid ${isPressed ? note.color : '#e8e8e8'}`,
                  borderLeft: '1px solid #bbb',
                  borderRight: '1px solid #bbb',
                  borderBottom: `5px solid ${isPressed ? note.dark : '#999'}`,
                  boxShadow: isPressed ? 'none' : '0 3px 6px rgba(0,0,0,0.25)',
                  transform: isPressed ? 'translateY(5px)' : 'translateY(0)',
                  transition: 'transform 0.06s, background 0.06s, border-bottom 0.06s, box-shadow 0.06s'
                }}
                onTouchStart={(e) => { e.preventDefault(); press(i, note) }}
                onMouseDown={() => press(i, note)}
              >
                {!isPressed && (
                  <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: '38%',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
                      borderRadius: '0 0 4px 4px'
                    }}
                  />
                )}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                  <span className="text-xs font-black" style={{ color: isPressed ? 'white' : note.color }}>
                    {note.note}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-3 h-2.5 rounded" style={{ background: 'linear-gradient(180deg, #2a1508, #0d0604)' }} />
      </div>

      <div className="flex justify-between w-28 mt-0.5 px-2">
        <div className="w-3 h-5 rounded-b" style={{ background: '#2a1508' }} />
        <div className="w-3 h-5 rounded-b" style={{ background: '#2a1508' }} />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────
// XYLOPHONE
// ────────────────────────────────────────────────────────
function Xylophone ({ playXylo, onBeat }) {
  const [hitBars, setHitBars] = useState({})
  const [floats, setFloats] = useState([])
  const [keyAnimals, setKeyAnimals] = useState([])

  const hitBar = useCallback((i, note) => {
    playXylo(note.freq)
    onBeat?.()
    setHitBars(prev => ({ ...prev, [i]: true }))
    setTimeout(() => setHitBars(prev => ({ ...prev, [i]: false })), 200)

    const id = Date.now() + Math.random()
    setFloats(prev => [...prev, { id, note, barIdx: i }])
    setTimeout(() => setFloats(prev => prev.filter(f => f.id !== id)), 950)

    const animalIdx = Math.floor(Math.random() * 3)
    const aid = Date.now() + Math.random() + 0.5
    setKeyAnimals(prev => [...prev, { id: aid, barIdx: i, animalIdx }])
    setTimeout(() => setKeyAnimals(prev => prev.filter(a => a.id !== aid)), 1100)
  }, [playXylo, onBeat])

  return (
    <div className="w-full flex flex-col items-center">
      {/* Key-press animal pop zone — h-0 so it adds no layout gap */}
      <div className="relative w-full max-w-sm h-0 overflow-visible pointer-events-none">
        <AnimatePresence>
          {keyAnimals.map(a => {
            const Animal = ANIMAL_COMPONENTS.xylophone[a.animalIdx]
            const x = (a.barIdx + 0.5) / 8 * 100
            return (
              <KeyPopAnimal key={a.id} AnimalComponent={Animal} x={x} />
            )
          })}
        </AnimatePresence>
      </div>

      {/* Frame */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #7B4A1A 0%, #3d1f08 100%)',
          padding: '14px 6px 20px',
          boxShadow: '0 10px 32px rgba(0,0,0,0.4), 0 4px 0 #1a0a02, inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className="text-center mb-3">
          <span className="text-yellow-300/60 text-xs font-bold tracking-[5px]">XYLOPHONE</span>
        </div>

        {/* Horizontal bars — grid-cols-8 so each bar gets exactly 1/8, no overflow */}
        <div className="grid grid-cols-8 gap-0.5 items-end">
          {NOTES.map((note, i) => {
            const isHit = hitBars[i]
            const barH = XYLO_HEIGHTS[i]
            return (
              <div key={i} className="min-w-0 flex flex-col items-center">
                {/* Floating note above bar */}
                <div className="relative h-7 w-full flex justify-center">
                  <AnimatePresence>
                    {floats.filter(f => f.barIdx === i).map(f => (
                      <motion.span
                        key={f.id}
                        className="absolute bottom-0 font-black text-base pointer-events-none z-10 select-none"
                        style={{ color: f.note.color }}
                        initial={{ opacity: 1, y: 0, scale: 0.7 }}
                        animate={{ opacity: 0, y: -30, scale: 1.2 }}
                        transition={{ duration: 0.75, ease: 'easeOut' }}
                      >
                        {f.note.note}♪
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Top knob */}
                <div
                  className="w-3.5 h-3.5 rounded-full mb-0.5 z-10 flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, white, ${note.dark})`,
                    border: `1px solid ${note.dark}`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                  }}
                />

                {/* Bar */}
                <motion.button
                  className="w-full relative rounded-lg select-none flex items-end justify-center pb-1.5 overflow-hidden"
                  style={{
                    height: barH,
                    background: isHit
                      ? `linear-gradient(180deg, ${note.dark} 0%, ${note.color} 100%)`
                      : `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, ${note.color}CC 18%, ${note.color} 55%, ${note.dark} 100%)`,
                    boxShadow: isHit
                      ? `0 1px 0 ${note.dark}`
                      : `0 5px 0 ${note.dark}, 0 6px 10px rgba(0,0,0,0.25)`,
                    transform: isHit ? 'translateY(5px)' : 'translateY(0)',
                    transition: 'transform 0.06s, box-shadow 0.06s, background 0.06s',
                    border: `1px solid ${note.dark}55`
                  }}
                  onTouchStart={(e) => { e.preventDefault(); hitBar(i, note) }}
                  onMouseDown={() => hitBar(i, note)}
                >
                  {/* Shine */}
                  {!isHit && (
                    <div
                      className="absolute top-0 left-0 right-0 pointer-events-none"
                      style={{
                        height: '28%',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
                        borderRadius: '8px 8px 0 0'
                      }}
                    />
                  )}
                  <span className="text-white font-black text-xs drop-shadow z-10 select-none leading-none">
                    {note.note}
                  </span>
                </motion.button>

                {/* Bottom knob */}
                <div
                  className="w-3.5 h-3.5 rounded-full mt-0.5 z-10 flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, white, ${note.dark})`,
                    border: `1px solid ${note.dark}`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom rail */}
        <div
          className="mt-2 h-3 rounded-lg"
          style={{ background: 'linear-gradient(180deg, #4a2008 0%, #2a0e04 100%)' }}
        />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────
// DRUM KIT
// ────────────────────────────────────────────────────────
function DrumPad ({ drum, onHit, size }) {
  const [isHit, setIsHit] = useState(false)
  const [ripples, setRipples] = useState([])

  const sizeMap = { sm: 72, md: 86, lg: 104, xl: 138 }
  const dim = sizeMap[size] || 86

  const handleHit = useCallback((e) => {
    e.preventDefault()
    onHit(drum)
    setIsHit(true)
    setTimeout(() => setIsHit(false), 150)
    const id = Date.now() + Math.random()
    setRipples(prev => [...prev, id])
    setTimeout(() => setRipples(prev => prev.filter(r => r !== id)), 680)
  }, [drum, onHit])

  return (
    <motion.button
      className="relative flex-shrink-0 flex items-center justify-center select-none"
      style={{ width: dim, height: dim }}
      onTouchStart={handleHit}
      onMouseDown={handleHit}
    >
      <AnimatePresence>
        {ripples.map(id => (
          <motion.div
            key={id}
            className="absolute rounded-full pointer-events-none"
            style={{ width: dim, height: dim, border: `3px solid ${drum.color}`, top: 0, left: 0 }}
            initial={{ scale: 1, opacity: 0.85 }}
            animate={{ scale: 2.3, opacity: 0 }}
            transition={{ duration: 0.68 }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: isHit
            ? `radial-gradient(circle at 40% 35%, ${drum.color}55, ${drum.color})`
            : `radial-gradient(circle at 35% 28%, ${drum.color}BB, ${drum.color} 55%, ${drum.rim})`,
          border: `4px solid ${drum.rim}`,
          boxShadow: isHit
            ? `0 2px 6px rgba(0,0,0,0.55), inset 0 0 20px rgba(0,0,0,0.35)`
            : `0 6px 18px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)`,
          transition: 'box-shadow 0.07s'
        }}
        animate={isHit ? { scale: 0.9, y: 3 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.06 }}
      >
        <div className="absolute rounded-full pointer-events-none" style={{ width: '72%', height: '72%', border: `2px solid ${drum.rim}55` }} />
        <div className="absolute top-2 left-3 rounded-full pointer-events-none" style={{ width: '30%', height: '22%', background: 'rgba(255,255,255,0.18)' }} />
        <span
          className="text-xs font-black z-10 text-center px-1 leading-tight select-none"
          style={{ color: drum.id === 'kick' ? '#f0d0a0' : 'white', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
        >
          {drum.name}
        </span>
      </motion.div>
    </motion.button>
  )
}

function CymbalPad ({ drum, onHit }) {
  const [isHit, setIsHit] = useState(false)
  const [ripples, setRipples] = useState([])
  const width = 76
  const height = 16

  const handleHit = useCallback((e) => {
    e.preventDefault()
    onHit(drum)
    setIsHit(true)
    setTimeout(() => setIsHit(false), 130)
    const id = Date.now() + Math.random()
    setRipples(prev => [...prev, id])
    setTimeout(() => setRipples(prev => prev.filter(r => r !== id)), 560)
  }, [drum, onHit])

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        className="relative flex flex-col items-center select-none"
        style={{ width, height: height + 28 }}
        onTouchStart={handleHit}
        onMouseDown={handleHit}
      >
        <AnimatePresence>
          {ripples.map(id => (
            <motion.div
              key={id}
              className="absolute pointer-events-none"
              style={{ width, height: height * 0.7, border: `2px solid ${drum.color}`, borderRadius: '50%', top: 0 }}
              initial={{ scaleX: 1, scaleY: 1, opacity: 0.9 }}
              animate={{ scaleX: 2.2, scaleY: 2.8, opacity: 0 }}
              transition={{ duration: 0.56 }}
            />
          ))}
        </AnimatePresence>

        <motion.div
          className="w-full relative flex items-center justify-center"
          style={{
            height,
            background: isHit
              ? `linear-gradient(180deg, ${drum.color} 0%, ${drum.rim} 100%)`
              : `linear-gradient(180deg, ${drum.color} 0%, ${drum.color}99 55%, ${drum.rim} 100%)`,
            border: `2px solid ${drum.rim}`,
            borderRadius: '50% / 40%',
            boxShadow: isHit ? `0 1px 4px rgba(0,0,0,0.5)` : `0 3px 8px rgba(0,0,0,0.4)`,
            transition: 'box-shadow 0.08s'
          }}
          animate={isHit ? { scaleY: 0.65 } : { scaleY: 1 }}
          transition={{ duration: 0.07 }}
        >
          <div
            className="rounded-full"
            style={{ width: 12, height: 12, background: `radial-gradient(circle at 38% 32%, ${drum.color}, ${drum.rim})`, boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
          />
        </motion.div>

        <div className="w-0.5" style={{ height: 12, background: 'linear-gradient(180deg, #aaa 0%, #666 100%)' }} />
      </motion.button>
      <span className="text-xs font-bold text-white/60 select-none">{drum.name}</span>
    </div>
  )
}

function DrumKit ({ playDrum, onBeat }) {
  const handleHit = useCallback((drum) => {
    playDrum(drum.type, drum.freq, drum.decay)
    onBeat?.()
  }, [playDrum, onBeat])

  const { cymbals, toms, snare, kick } = DRUM_KIT

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.55)'
        }}
      >
        <div className="flex justify-center gap-5 mb-4">
          {['#ff4444', '#ffaa00', '#44ff44', '#4488ff', '#ff44ff'].map((c, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: c, boxShadow: `0 0 8px ${c}` }}
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.4 + i * 0.15, repeat: Infinity, delay: i * 0.22 }}
            />
          ))}
        </div>

        <div className="flex justify-around items-end mb-3 px-1">
          <CymbalPad drum={cymbals[0]} onHit={handleHit} />
          <DrumPad drum={toms[0]} onHit={handleHit} size="md" />
          <DrumPad drum={toms[1]} onHit={handleHit} size="md" />
          <CymbalPad drum={cymbals[1]} onHit={handleHit} />
        </div>

        <div className="flex justify-center items-center gap-5 pb-2">
          <div className="flex flex-col items-center gap-1">
            <DrumPad drum={snare} onHit={handleHit} size="lg" />
            <span className="text-xs font-bold text-white/50 select-none">{snare.name}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <DrumPad drum={kick} onHit={handleHit} size="xl" />
            <span className="text-xs font-bold text-white/50 select-none">{kick.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────
export default function MusicPlayPage () {
  const [instrument, setInstrument] = useState('piano')
  const [hitCount, setHitCount] = useState(0)
  const totalStars = useGameStore((s) => s.gameProgress['music-play'].stars)
  const { playPiano, playXylo, playDrum } = useAudio()

  const handleBeat = useCallback(() => setHitCount(c => c + 1), [])

  const bgMap = {
    piano: 'from-amber-50 via-yellow-50 to-orange-50',
    xylophone: 'from-green-50 via-teal-50 to-cyan-50',
    drum: 'from-slate-100 via-blue-50 to-indigo-50'
  }

  const hintMap = {
    piano: '🎹 건반을 눌러 연주해보세요!',
    xylophone: '🥢 막대를 두드려 소리내봐요!',
    drum: '🥁 드럼을 쳐서 리듬을 만들어요!'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgMap[instrument]} transition-all duration-500`}>
      <GameHeader gameIcon="🎵" gameName="음악놀이" stars={totalStars} />

      <div className="pt-20 pb-10 px-4 flex flex-col items-center min-h-screen">
        {/* Instrument selector */}
        <div className="flex gap-1.5 mb-4 bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-lg border border-white/60">
          {INSTRUMENTS.map((inst) => (
            <motion.button
              key={inst.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                instrument === inst.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-500'
              }`}
              whileTap={{ scale: 0.92 }}
              onClick={() => setInstrument(inst.id)}
            >
              <span className="text-base">{inst.emoji}</span>
              <span>{inst.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Dancing animals */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`animals-${instrument}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DancingAnimals instrument={instrument} hitCount={hitCount} />
          </motion.div>
        </AnimatePresence>

        {/* Instrument */}
        <AnimatePresence mode="wait">
          <motion.div
            key={instrument}
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25 }}
          >
            {instrument === 'piano' && <Piano playPiano={playPiano} onBeat={handleBeat} />}
            {instrument === 'xylophone' && <Xylophone playXylo={playXylo} onBeat={handleBeat} />}
            {instrument === 'drum' && <DrumKit playDrum={playDrum} onBeat={handleBeat} />}
          </motion.div>
        </AnimatePresence>

        {/* Hint bubble */}
        <motion.div
          className="mt-6 bg-white/65 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/60 shadow-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm text-gray-500 font-bold">{hintMap[instrument]}</span>
        </motion.div>
      </div>
    </div>
  )
}
