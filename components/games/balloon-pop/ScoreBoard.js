'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function ScoreBoard ({ score, combo }) {
  return (
    <div className="flex items-center gap-3">
      {/* 점수 */}
      <motion.div
        className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border-2 border-orange-200 px-4 py-2 rounded-full shadow-kids"
        layout
      >
        <span className="text-xl">🎈</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={score}
            className="text-kids-xs font-bold text-orange-600 min-w-[2ch] text-center"
            initial={{ y: -20, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {score}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* 콤보 표시 */}
      <AnimatePresence>
        {combo >= 3 && (
          <motion.div
            className="flex items-center gap-1 bg-gradient-to-r from-candy-orange to-candy-red px-3 py-1.5 rounded-full shadow-kids"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <span className="text-sm">🔥</span>
            <span className="text-sm font-bold text-white">x{combo}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
