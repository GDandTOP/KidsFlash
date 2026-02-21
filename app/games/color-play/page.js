'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameHeader from '@/components/layout/GameHeader'
import ClearScreen from '@/components/common/ClearScreen'
import useGameStore from '@/stores/useGameStore'
import { DRAWINGS, COLOR_PALETTE } from '@/lib/colorPlayData'

export default function ColorPlayPage () {
  const [drawingIndex, setDrawingIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0].color)
  const [filledRegions, setFilledRegions] = useState({})
  const [isClear, setIsClear] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const addStars = useGameStore((s) => s.addStars)
  const totalStars = useGameStore((s) => s.gameProgress['color-play'].stars)

  const drawing = DRAWINGS[drawingIndex]

  const filledCount = useMemo(() => {
    return Object.keys(filledRegions).length
  }, [filledRegions])

  const isComplete = filledCount >= drawing.regions.length

  const handleRegionTap = useCallback((regionId) => {
    if (isClear) return

    setFilledRegions((prev) => {
      const next = { ...prev, [regionId]: selectedColor }

      // 완성 체크
      const filled = Object.keys(next).length
      if (filled >= drawing.regions.length && !isComplete) {
        setTimeout(() => {
          setIsAnimating(true)
          setTimeout(() => {
            setIsClear(true)
            addStars('color-play', 3)
          }, 1500)
        }, 300)
      }

      return next
    })
  }, [selectedColor, drawing, isClear, isComplete, addStars])

  const handleNext = useCallback(() => {
    const nextIndex = (drawingIndex + 1) % DRAWINGS.length
    setDrawingIndex(nextIndex)
    setFilledRegions({})
    setIsClear(false)
    setIsAnimating(false)
  }, [drawingIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50">
      <GameHeader gameIcon="🎨" gameName="색칠놀이" stars={totalStars} />

      <div className="pt-28 pb-36 px-4 flex flex-col items-center min-h-screen">
        {/* 도안 이름 */}
        <motion.div
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-kids border-2 border-white/60 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-2xl">{drawing.emoji}</span>
          <span className="text-kids-xs font-bold text-gray-700">{drawing.name}</span>
          <span className="text-sm text-gray-400 ml-1">
            {filledCount}/{drawing.regions.length}
          </span>
        </motion.div>

        {/* SVG 도안 */}
        <motion.div
          className="bg-white rounded-kids-xl shadow-kids-card border-4 border-white p-4 w-full max-w-sm"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: isAnimating ? [1, 1.02, 1] : 1,
            opacity: 1,
            rotate: isAnimating ? [0, 1, -1, 0] : 0
          }}
          transition={isAnimating ? { duration: 0.5, repeat: 2 } : { duration: 0.3 }}
        >
          <svg
            viewBox={drawing.viewBox}
            className="w-full h-auto"
            style={{ touchAction: 'none' }}
          >
            {drawing.regions.map((region) => (
              <motion.path
                key={region.id}
                d={region.d}
                fill={filledRegions[region.id] || '#F3F4F6'}
                stroke="#9CA3AF"
                strokeWidth={region.stroke ? 4 : 2}
                strokeLinejoin="round"
                className="cursor-pointer"
                onClick={() => handleRegionTap(region.id)}
                whileTap={{ scale: 0.97 }}
                animate={
                  filledRegions[region.id] && isAnimating
                    ? { scale: [1, 1.03, 1], transition: { duration: 0.4, repeat: 2 } }
                    : {}
                }
                initial={false}
              />
            ))}
          </svg>
        </motion.div>

        {/* 진행률 바 */}
        <div className="w-full max-w-sm mt-4 mb-2">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-candy-yellow via-candy-orange to-candy-red"
              animate={{ width: `${(filledCount / drawing.regions.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          </div>
        </div>

        {/* 도안 선택 (좌우 화살표) */}
        <div className="flex items-center gap-3 mb-2">
          {DRAWINGS.map((d, i) => (
            <motion.button
              key={d.id}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2
                ${i === drawingIndex ? 'bg-amber-200 border-amber-400 shadow-kids' : 'bg-white/60 border-gray-200'}
              `}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setDrawingIndex(i)
                setFilledRegions({})
                setIsClear(false)
                setIsAnimating(false)
              }}
            >
              {d.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 컬러 팔레트 - 하단 고정 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t-2 border-white/60 px-4 py-4 shadow-lg">
        <div className="flex justify-center gap-3 max-w-sm mx-auto">
          {COLOR_PALETTE.map((color) => (
            <motion.button
              key={color.id}
              className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-kids"
              style={{ backgroundColor: color.color }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setSelectedColor(color.color)}
            >
              {/* 선택 표시 링 */}
              <AnimatePresence>
                {selectedColor === color.color && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border-3 border-gray-700"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{ borderWidth: 3 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 클리어 화면 */}
      {isClear && <ClearScreen onNext={handleNext} />}
    </div>
  )
}
