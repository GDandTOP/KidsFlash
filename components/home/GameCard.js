'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SvgBear, SvgBunny, SvgCat, SvgDog, SvgFox } from '@/components/common/SvgAnimals'
import {
  SvgPalette, SvgPuzzle, SvgNote, SvgBalloonIcon, SvgNumbers,
  SvgPaintbrush, SvgPaintSplat, SvgDiamond, SvgDoubleNote,
  SvgMic, SvgPianoKeys, SvgPopBurst, SvgConfetti, SvgBlockNumber, SvgStar
} from '@/components/common/SvgIcons'

// Each game's design & character
const CARD_THEMES = {
  'color-play': {
    bg: ['#FF9F43', '#F9CA24'],
    edge: '#E07B00',
    glow: 'rgba(255,159,67,0.45)',
    bannerBg: '#E07B00',
    Animal: SvgBear,
    GameIcon: SvgPalette,
    MiniA: () => <SvgPaintbrush size={22} />,
    MiniB: () => <SvgPaintSplat size={20} color="#FF6B8A" />,
    MiniC: () => <SvgPaintSplat size={16} color="#48DBFB" />
  },
  'puzzle-match': {
    bg: ['#26de81', '#20bf6b'],
    edge: '#16875B',
    glow: 'rgba(38,222,129,0.4)',
    bannerBg: '#16875B',
    Animal: SvgBunny,
    GameIcon: SvgPuzzle,
    MiniA: () => <SvgDiamond size={20} color="#81D4FA" />,
    MiniB: () => <SvgDiamond size={16} color="#FFD54F" />,
    MiniC: () => <SvgStar size={18} color="#FECA57" stroke="#E8A317" />
  },
  'music-play': {
    bg: ['#fd79a8', '#e84393'],
    edge: '#A8005C',
    glow: 'rgba(253,121,168,0.45)',
    bannerBg: '#A8005C',
    Animal: SvgCat,
    GameIcon: SvgNote,
    MiniA: () => <SvgDoubleNote size={22} />,
    MiniB: () => <SvgMic size={20} />,
    MiniC: () => <SvgPianoKeys size={22} />
  },
  'balloon-pop': {
    bg: ['#ff7675', '#d63031'],
    edge: '#A01010',
    glow: 'rgba(255,118,117,0.45)',
    bannerBg: '#A01010',
    Animal: SvgDog,
    GameIcon: SvgBalloonIcon,
    MiniA: () => <SvgBalloonIcon size={20} color="#FFD700" />,
    MiniB: () => <SvgPopBurst size={20} />,
    MiniC: () => <SvgConfetti size={20} />
  },
  'number-count': {
    bg: ['#a29bfe', '#6c5ce7'],
    edge: '#3D2DB5',
    glow: 'rgba(162,155,254,0.45)',
    bannerBg: '#3D2DB5',
    Animal: SvgFox,
    GameIcon: SvgNumbers,
    MiniA: () => <SvgBlockNumber n={1} size={20} />,
    MiniB: () => <SvgBlockNumber n={2} size={20} />,
    MiniC: () => <SvgBlockNumber n={3} size={20} />
  }
}

// Positions for the 3 background mini decorators
const MINI_POSITIONS = [
  { top: '10%', left: '7%', rotate: -18 },
  { top: '12%', right: '8%', rotate: 14 },
  { bottom: '28%', left: '10%', rotate: -8 }
]

export default function GameCard ({ game, index = 0 }) {
  const theme = CARD_THEMES[game.id]
  const [isPressed, setIsPressed] = useState(false)

  const handlePressStart = useCallback(() => setIsPressed(true), [])
  const handlePressEnd = useCallback(() => setIsPressed(false), [])

  const { Animal, GameIcon, MiniA, MiniB, MiniC } = theme
  const miniComponents = [MiniA, MiniB, MiniC]

  return (
    <Link href={game.href} className="block select-none">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.2 + index * 0.1,
          type: 'spring',
          stiffness: 240,
          damping: 18
        }}
        onTapStart={handlePressStart}
        onTap={handlePressEnd}
        onTapCancel={handlePressEnd}
      >
        {/* Color glow */}
        <motion.div
          className="absolute inset-x-2 -bottom-1 rounded-kids-xl blur-xl"
          style={{ background: theme.glow, height: '85%' }}
          animate={{ opacity: isPressed ? 0.3 : 0.7 }}
        />

        {/* Card */}
        <motion.div
          className="relative overflow-hidden rounded-kids-xl"
          style={{
            background: `linear-gradient(160deg, ${theme.bg[0]} 0%, ${theme.bg[1]} 100%)`,
            boxShadow: isPressed
              ? `0 2px 0 0 ${theme.edge}`
              : `0 7px 0 0 ${theme.edge}, 0 14px 28px -6px rgba(0,0,0,0.22)`,
            transform: isPressed ? 'translateY(5px)' : 'translateY(0)',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            border: `2.5px solid rgba(255,255,255,0.38)`
          }}
        >
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-[38%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

          {/* Mini background decorators */}
          {miniComponents.map((MiniComp, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20 pointer-events-none"
              style={{
                ...MINI_POSITIONS[i],
                transform: `rotate(${MINI_POSITIONS[i].rotate}deg)`
              }}
              animate={{ rotate: [MINI_POSITIONS[i].rotate, MINI_POSITIONS[i].rotate + 8, MINI_POSITIONS[i].rotate] }}
              transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MiniComp />
            </motion.div>
          ))}

          {/* Content area */}
          <div className="relative z-10 flex flex-col items-center aspect-square">

            {/* Game icon badge – top-right corner */}
            <motion.div
              className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(6px)' }}
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
            >
              <GameIcon size={22} />
            </motion.div>

            {/* Animal character – takes up most of the card */}
            <motion.div
              className="flex items-end justify-center"
              style={{ flex: 1, paddingTop: '10%', paddingBottom: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
            >
              <Animal size={64} />
            </motion.div>

            {/* Title banner */}
            <div
              className="w-full flex items-center justify-center py-2"
              style={{
                background: theme.bannerBg,
                borderTop: '2px solid rgba(0,0,0,0.08)'
              }}
            >
              <h2
                className="text-[0.95rem] sm:text-kids-xs font-bold text-white tracking-wide"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
              >
                {game.title}
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
