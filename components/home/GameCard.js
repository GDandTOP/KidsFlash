'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CARD_THEMES = {
  'color-play': {
    bg: ['#FFD54F', '#FFB300'],
    edge: '#E8A317',
    glow: 'rgba(255,183,0,0.35)',
    icon: '🎨',
    character: '🐻',
    accent: '#FF9F43',
    miniEmojis: ['🖌️', '🌈', '🎨']
  },
  'puzzle-match': {
    bg: ['#69F0AE', '#00C853'],
    edge: '#1B9E4B',
    glow: 'rgba(0,200,83,0.3)',
    icon: '🧩',
    character: '🐰',
    accent: '#00E676',
    miniEmojis: ['🔷', '🔶', '⭐']
  },
  'music-play': {
    bg: ['#F48FB1', '#E91E90'],
    edge: '#C2185B',
    glow: 'rgba(233,30,144,0.3)',
    icon: '🎵',
    character: '🐱',
    accent: '#FF4081',
    miniEmojis: ['🎶', '🎤', '🎹']
  },
  'balloon-pop': {
    bg: ['#FF8A65', '#F4511E'],
    edge: '#BF360C',
    glow: 'rgba(244,81,30,0.3)',
    icon: '🎈',
    character: '🐶',
    accent: '#FF6E40',
    miniEmojis: ['🎈', '🎉', '💥']
  },
  'number-count': {
    bg: ['#B388FF', '#7C4DFF'],
    edge: '#5427CC',
    glow: 'rgba(124,77,255,0.35)',
    icon: '🔢',
    character: '🦊',
    accent: '#B388FF',
    miniEmojis: ['1️⃣', '2️⃣', '3️⃣']
  }
}

export default function GameCard ({ game, index = 0 }) {
  const theme = CARD_THEMES[game.id]
  const [isPressed, setIsPressed] = useState(false)

  const handlePressStart = useCallback(() => setIsPressed(true), [])
  const handlePressEnd = useCallback(() => setIsPressed(false), [])

  return (
    <Link href={game.href} className="block">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.3 + index * 0.08,
          type: 'spring',
          stiffness: 260,
          damping: 18
        }}
        onTapStart={handlePressStart}
        onTap={handlePressEnd}
        onTapCancel={handlePressEnd}
      >
        {/* 1) 컬러 드롭 섀도우 */}
        <motion.div
          className="absolute inset-x-1 bottom-0 rounded-kids-xl blur-md"
          style={{ background: theme.glow, height: '80%' }}
          animate={{ opacity: isPressed ? 0.3 : 0.6 }}
        />

        {/* 2) 메인 카드 컨테이너 */}
        <motion.div
          className="relative overflow-hidden rounded-kids-xl"
          style={{
            background: `linear-gradient(145deg, ${theme.bg[0]} 0%, ${theme.bg[1]} 100%)`,
            boxShadow: isPressed
              ? `0 3px 0 0 ${theme.edge}, inset 0 1px 0 rgba(255,255,255,0.3)`
              : `0 7px 0 0 ${theme.edge}, inset 0 2px 0 rgba(255,255,255,0.35), 0 12px 30px -6px rgba(0,0,0,0.15)`,
            transform: isPressed ? 'translateY(4px)' : 'translateY(0)'
          }}
        >
          {/* 상단 하이라이트 */}
          <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent rounded-t-kids-xl pointer-events-none" />

          {/* 미니 장식 이모지 (배경 패턴) */}
          {theme.miniEmojis.map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute opacity-[0.12] select-none pointer-events-none"
              style={{
                fontSize: 28,
                top: `${15 + i * 25}%`,
                left: i % 2 === 0 ? '8%' : '75%',
                transform: `rotate(${-15 + i * 20}deg)`
              }}
              animate={{ rotate: [-15 + i * 20, -5 + i * 20, -15 + i * 20] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emoji}
            </motion.span>
          ))}

          {/* 컨텐츠 영역 */}
          <div className="relative z-10 flex flex-col items-center justify-center aspect-square px-3 pt-4 pb-5">
            {/* 메인 아이콘 */}
            <motion.div
              className="text-5xl sm:text-6xl mb-1 drop-shadow-lg"
              animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.3
              }}
            >
              {theme.icon}
            </motion.div>

            {/* 캐릭터 */}
            <motion.div
              className="text-2xl sm:text-3xl mb-2"
              animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5 + index * 0.2
              }}
            >
              {theme.character}
            </motion.div>

            {/* 게임 이름 배지 */}
            <div
              className="relative px-4 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.6)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <h2 className="text-[0.9rem] sm:text-kids-xs font-bold text-white whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                {game.title}
              </h2>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
