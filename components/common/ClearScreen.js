'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const CONFETTI_COLORS = ['#FF6B8A', '#FF9F43', '#FECA57', '#5CD85A', '#48DBFB', '#A66CFF', '#FF7EB3']

function generateConfetti (count = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 6,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 2,
    rotation: Math.random() * 720 - 360,
    shape: Math.random() > 0.5 ? 'circle' : 'square'
  }))
}

function Confetti ({ pieces }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px'
          }}
          initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: p.rotation,
            x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 60],
            scale: [1, 0.8]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

function CelebrationEmoji () {
  const emojis = ['🎉', '🎊', '🥳', '🌟', '💫', '✨', '🏆', '👏']

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl sm:text-4xl"
          style={{
            left: `${10 + (i * 12)}%`,
            top: '50%'
          }}
          initial={{ scale: 0, opacity: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0],
            y: [0, -150 - Math.random() * 100],
            x: (Math.random() - 0.5) * 80
          }}
          transition={{
            duration: 1.5,
            delay: 0.3 + i * 0.15,
            ease: 'easeOut'
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default function ClearScreen ({ onNext }) {
  const router = useRouter()
  const [showStars, setShowStars] = useState(false)
  const confettiPieces = useMemo(() => generateConfetti(50), [])

  useEffect(() => {
    const timer = setTimeout(() => setShowStars(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* 배경 오버레이 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-pink-900/50 to-blue-900/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* 컨페티 */}
        <Confetti pieces={confettiPieces} />

        {/* 축하 이모지 폭발 */}
        <CelebrationEmoji />

        {/* 메인 카드 */}
        <motion.div
          className="relative z-10 bg-white/95 backdrop-blur-md rounded-kids-xl shadow-2xl max-w-sm mx-6 overflow-hidden border-4 border-yellow-300"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
        >
          {/* 상단 레인보우 바 */}
          <div
            className="h-3"
            style={{ background: 'linear-gradient(90deg, #FF6B8A, #FF9F43, #FECA57, #5CD85A, #48DBFB, #A66CFF)' }}
          />

          <div className="p-8 sm:p-10 text-center">
            {/* 캐릭터 + 별 */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {showStars && [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180, y: -30 }}
                  animate={{ scale: 1, rotate: 0, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                    delay: 0.5 + i * 0.2
                  }}
                >
                  <motion.div
                    className="text-5xl sm:text-6xl"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    ⭐
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* 마스코트 캐릭터 */}
            <motion.div
              className="text-7xl sm:text-8xl mb-4"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              🧸
            </motion.div>

            {/* 축하 메시지 */}
            <motion.h2
              className="text-kids-lg sm:text-kids-xl font-bold text-rainbow mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              잘했어요!
            </motion.h2>
            <motion.p
              className="text-kids-xs sm:text-kids-sm text-gray-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              정말 대단해요! 👏
            </motion.p>

            {/* 버튼 */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.92, y: 2 }}
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 text-kids-xs sm:text-kids-sm font-bold py-3.5 rounded-kids shadow-kids transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                🏠 홈으로
              </motion.button>
              {onNext && (
                <motion.button
                  whileTap={{ scale: 0.92, y: 2 }}
                  onClick={onNext}
                  className="flex-1 bg-gradient-to-r from-candy-green to-candy-sky text-white text-kids-xs sm:text-kids-sm font-bold py-3.5 rounded-kids shadow-kids transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  다음 ▶️
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
