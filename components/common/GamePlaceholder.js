'use client'

import { motion } from 'framer-motion'

const floatingEmojis = {
  'color-play': ['🖌️', '🎨', '🌈', '🖍️', '✏️', '🎭'],
  'puzzle-match': ['🔷', '🔶', '🟢', '🔺', '⭐', '💎'],
  'music-play': ['🎶', '🎤', '🥁', '🎹', '🎸', '🎺'],
  'balloon-pop': ['🎈', '🎉', '🎊', '🎀', '💥', '✨'],
  'number-count': ['1️⃣', '2️⃣', '3️⃣', '🔢', '➕', '🧮']
}

const bgGradients = {
  'color-play': 'from-amber-100 via-yellow-50 to-orange-100',
  'puzzle-match': 'from-emerald-100 via-green-50 to-teal-100',
  'music-play': 'from-pink-100 via-rose-50 to-fuchsia-100',
  'balloon-pop': 'from-orange-100 via-red-50 to-rose-100',
  'number-count': 'from-violet-100 via-purple-50 to-indigo-100'
}

const characters = {
  'color-play': '🐻',
  'puzzle-match': '🐰',
  'music-play': '🐱',
  'balloon-pop': '🐶',
  'number-count': '🦊'
}

export default function GamePlaceholder ({ gameId, icon, title }) {
  const emojis = floatingEmojis[gameId] || []
  const bgGrad = bgGradients[gameId] || 'from-sky-100 to-blue-100'
  const character = characters[gameId] || '🧸'

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${bgGrad} overflow-hidden`}>
      {/* 떠다니는 이모지 배경 */}
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl sm:text-4xl opacity-20 select-none"
          style={{
            left: `${10 + (i * 15) % 80}%`,
            top: `${15 + (i * 20) % 60}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 20, -20, 0]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* 중앙 콘텐츠 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-24 pb-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* 게임 아이콘 */}
          <motion.div
            className="text-8xl sm:text-9xl mb-4 drop-shadow-lg"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {icon}
          </motion.div>

          {/* 캐릭터 */}
          <motion.div
            className="text-5xl sm:text-6xl mb-6"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            {character}
          </motion.div>

          {/* 게임 이름 */}
          <motion.h2
            className="text-kids-lg sm:text-kids-xl font-bold text-gray-700 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>

          {/* 준비 중 메시지 */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-kids border-2 border-white/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ⏳
            </motion.span>
            <span className="text-kids-xs font-bold text-gray-500">곧 만나요!</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
