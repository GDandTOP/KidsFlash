'use client'

import { motion } from 'framer-motion'
import FloatingElements from '@/components/common/FloatingElements'
import Logo from '@/components/home/Logo'
import Mascot from '@/components/home/Mascot'
import GameCard from '@/components/home/GameCard'
import useGameStore from '@/stores/useGameStore'
import { SvgStar, SvgGear, SvgFamily } from '@/components/common/SvgIcons'

const GAMES = [
  { id: 'color-play', title: '색칠놀이', href: '/games/color-play' },
  { id: 'puzzle-match', title: '퍼즐맞추기', href: '/games/puzzle-match' },
  { id: 'music-play', title: '음악놀이', href: '/games/music-play' },
  { id: 'balloon-pop', title: '풍선터트리기', href: '/games/balloon-pop' },
  { id: 'number-count', title: '숫자세기', href: '/games/number-count' }
]

function StarBadge ({ count }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-yellow-200/80"
      style={{ boxShadow: '0 4px 0 -1px rgba(0,0,0,0.04), 0 8px 20px -4px rgba(0,0,0,0.06)' }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.8 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        <SvgStar size={20} />
      </motion.div>
      <span className="text-sm font-bold text-amber-600">{count}</span>
    </motion.div>
  )
}

export default function Home () {
  const totalStars = useGameStore((s) => s.totalStars)

  return (
    <>
      <FloatingElements />

      <main className="relative z-10 flex flex-col items-center min-h-screen px-5 pt-5 pb-6 sm:pt-8 overflow-y-auto">
        {/* Star badge */}
        <div className="self-end mb-2">
          <StarBadge count={totalStars} />
        </div>

        {/* Logo */}
        <div className="mb-3 sm:mb-4">
          <Logo />
        </div>

        {/* Mascot */}
        <div className="mb-5 sm:mb-6">
          <Mascot />
        </div>

        {/* Game card grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 w-full max-w-md mb-3.5 sm:mb-5">
          {GAMES.slice(0, 4).map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>

        {/* 5th game centered */}
        <div className="w-full max-w-md flex justify-center mb-28">
          <div className="w-[calc(50%-0.44rem)] sm:w-[calc(50%-0.63rem)]">
            <GameCard game={GAMES[4]} index={4} />
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

          <div className="relative flex justify-between items-end px-5 pb-5">
            {/* Settings */}
            <motion.button
              className="pointer-events-auto relative"
              whileTap={{ scale: 0.88 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div
                className="bg-white/85 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/70"
                style={{
                  boxShadow: '0 5px 0 0 rgba(0,0,0,0.06), 0 8px 20px -4px rgba(0,0,0,0.08)',
                  width: 52,
                  height: 52
                }}
              >
                <SvgGear size={28} color="#6B7280" />
              </div>
            </motion.button>

            {/* Parents */}
            <motion.button
              className="pointer-events-auto relative"
              whileTap={{ scale: 0.88 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div
                className="bg-white/85 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/70"
                style={{
                  boxShadow: '0 5px 0 0 rgba(0,0,0,0.06), 0 8px 20px -4px rgba(0,0,0,0.08)',
                  width: 52,
                  height: 52
                }}
              >
                <SvgFamily size={34} />
              </div>
            </motion.button>
          </div>
        </div>
      </main>
    </>
  )
}
