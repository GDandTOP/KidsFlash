'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const GAME_THEMES = {
  '🎨': { gradient: 'from-amber-400 to-orange-400', bg: 'bg-amber-50' },
  '🧩': { gradient: 'from-emerald-400 to-teal-400', bg: 'bg-emerald-50' },
  '🎵': { gradient: 'from-pink-400 to-rose-400', bg: 'bg-pink-50' },
  '🎈': { gradient: 'from-orange-400 to-red-400', bg: 'bg-orange-50' },
  '🔢': { gradient: 'from-violet-400 to-purple-400', bg: 'bg-violet-50' }
}

export default function GameHeader ({ gameIcon, gameName, stars = 0 }) {
  const router = useRouter()
  const theme = GAME_THEMES[gameIcon] || GAME_THEMES['🎨']

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-3 pt-3"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className={`
        ${theme.bg} backdrop-blur-md rounded-kids-xl
        shadow-kids-card border-2 border-white/60
        flex items-center justify-between px-3 py-2.5 sm:px-5 sm:py-3
      `}>
        {/* 홈 버튼 */}
        <motion.button
          whileTap={{ scale: 0.85, rotate: -10 }}
          onClick={() => router.push('/')}
          className={`
            w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${theme.gradient}
            rounded-kids shadow-kids
            flex items-center justify-center text-xl sm:text-2xl
          `}
        >
          🏠
        </motion.button>

        {/* 게임 아이콘 및 이름 */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <motion.span
            className="text-3xl sm:text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {gameIcon}
          </motion.span>
          <span className="text-kids-xs sm:text-kids-sm font-bold text-gray-700">
            {gameName}
          </span>
        </motion.div>

        {/* 별 카운터 */}
        <motion.div
          className="flex items-center gap-1.5 bg-yellow-100 border-2 border-yellow-200 px-3 py-1.5 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <motion.span
            className="text-xl sm:text-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            ⭐
          </motion.span>
          <span className="text-kids-xs font-bold text-yellow-600 min-w-[1.5ch] text-center">
            {stars}
          </span>
        </motion.div>
      </div>
    </motion.header>
  )
}
