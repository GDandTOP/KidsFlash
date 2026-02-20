'use client'

import { motion, AnimatePresence } from 'framer-motion'

const COLOR_LABELS = {
  red: { name: '빨강', emoji: '🔴' },
  blue: { name: '파랑', emoji: '🔵' },
  yellow: { name: '노랑', emoji: '🟡' },
  green: { name: '초록', emoji: '🟢' },
  pink: { name: '분홍', emoji: '🩷' },
  purple: { name: '보라', emoji: '🟣' }
}

export default function MissionBadge ({ targetColor, remaining }) {
  const info = COLOR_LABELS[targetColor]

  if (!info) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={targetColor}
        className="flex items-center gap-2 bg-white/85 backdrop-blur-sm border-2 border-white/70 px-4 py-2 rounded-full shadow-kids"
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <span className="text-lg">{info.emoji}</span>
        <span className="text-kids-xs font-bold text-gray-700">
          {info.name}만!
        </span>
        <motion.span
          key={remaining}
          className="bg-candy-red text-white text-sm font-bold px-2 py-0.5 rounded-full min-w-[2ch] text-center"
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          {remaining}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  )
}
