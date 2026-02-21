'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SvgMascot } from '@/components/common/SvgAnimals'
import { SvgFinger } from '@/components/common/SvgIcons'

const EXPRESSIONS = [
  { mood: 'neutral', message: '어떤 게임을 할까요?' },
  { mood: 'excited', message: '같이 놀아요!' },
  { mood: 'happy', message: '재밌는 게임이 많아요!' },
  { mood: 'amazed', message: '와! 선택해봐요!' },
  { mood: 'loving', message: '오늘도 화이팅!' }
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
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={exprIndex}
          className="relative bg-white/90 backdrop-blur-md rounded-kids px-4 py-2 sm:px-5 sm:py-2.5 mb-3 border-2 border-white/70"
          style={{ boxShadow: '0 6px 0 -1px rgba(0,0,0,0.05), 0 12px 30px -6px rgba(0,0,0,0.08)' }}
          initial={{ opacity: 0, y: 10, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.88 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          <p className="text-kids-xs text-gray-700 text-center font-bold whitespace-nowrap">
            {expr.message}
          </p>
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/90 rotate-45 border-r-2 border-b-2 border-white/70" />
        </motion.div>
      </AnimatePresence>

      {/* Mascot character */}
      <motion.div
        className="relative"
        animate={isBouncing
          ? { scale: [1, 1.18, 0.9, 1.06, 1], rotate: [0, -8, 8, -3, 0] }
          : { y: [0, -7, 0], rotate: [0, 2, -2, 0] }
        }
        transition={isBouncing
          ? { duration: 0.5, ease: 'easeOut' }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Shadow */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full bg-black/10 blur-sm"
          animate={{ scaleX: [1, 0.82, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <SvgMascot expression={expr.mood} size={88} />
      </motion.div>

      {/* Tap hint */}
      <motion.div
        className="flex items-center gap-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.65, 0] }}
        transition={{ delay: 2.5, duration: 2.2, repeat: Infinity }}
      >
        <SvgFinger size={16} />
        <span className="text-xs text-gray-400 font-bold">터치해봐요</span>
      </motion.div>
    </motion.div>
  )
}
