'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXPRESSIONS = [
  { face: '🧸', message: '어떤 게임을 할까요?' },
  { face: '🥳', message: '같이 놀아요!' },
  { face: '😆', message: '재밌는 게임이 많아요!' },
  { face: '🤩', message: '와! 선택해봐요!' },
  { face: '🥰', message: '오늘도 화이팅!' }
]

export default function Mascot () {
  const [exprIndex, setExprIndex] = useState(0)
  const [isBouncing, setIsBouncing] = useState(false)

  const expr = EXPRESSIONS[exprIndex]

  const handleTap = useCallback(() => {
    setIsBouncing(true)
    setExprIndex((prev) => (prev + 1) % EXPRESSIONS.length)
    setTimeout(() => setIsBouncing(false), 500)
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center select-none cursor-pointer"
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
      onTap={handleTap}
    >
      {/* 말풍선 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={exprIndex}
          className="relative bg-white/90 backdrop-blur-md rounded-kids px-4 py-2 sm:px-5 sm:py-2.5 mb-2 border-2 border-white/70"
          style={{ boxShadow: '0 6px 0 -1px rgba(0,0,0,0.05), 0 12px 30px -6px rgba(0,0,0,0.08)' }}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <p className="text-kids-xs text-gray-700 text-center font-bold whitespace-nowrap">
            {expr.message}
          </p>
          {/* 말풍선 꼬리 */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 rotate-45 border-r-2 border-b-2 border-white/70"
          />
        </motion.div>
      </AnimatePresence>

      {/* 캐릭터 본체 */}
      <motion.div
        className="relative"
        animate={isBouncing
          ? { scale: [1, 1.2, 0.9, 1.05, 1], rotate: [0, -8, 8, -3, 0] }
          : { y: [0, -6, 0], rotate: [0, 2, -2, 0] }
        }
        transition={isBouncing
          ? { duration: 0.5, ease: 'easeOut' }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* 그림자 */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black/10 blur-sm"
          animate={{ scaleX: [1, 0.85, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* 이모지 */}
        <span className="text-6xl sm:text-7xl block">{expr.face}</span>
      </motion.div>

      {/* 탭 힌트 */}
      <motion.p
        className="text-xs text-gray-400 mt-2 font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        👆 터치해봐요
      </motion.p>
    </motion.div>
  )
}
