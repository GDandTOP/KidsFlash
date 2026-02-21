'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameHeader from '@/components/layout/GameHeader'
import ClearScreen from '@/components/common/ClearScreen'
import useGameStore from '@/stores/useGameStore'
import { PUZZLES, shuffleArray } from '@/lib/puzzleData'

function DifficultySelect ({ onSelect }) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-28 pb-8">
      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-center mb-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div className="text-7xl mb-3">🧩</div>
          <h2 className="text-kids-lg font-bold text-gray-700">퍼즐맞추기</h2>
          <p className="text-kids-xs text-gray-400 mt-1">난이도를 선택하세요!</p>
        </motion.div>

        <motion.button
          className="w-full bg-gradient-to-r from-candy-green to-emerald-400 text-white rounded-kids-xl px-6 py-5 shadow-kids-card card-3d text-center"
          whileTap={{ scale: 0.95, y: 3 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onSelect('easy')}
        >
          <div className="text-4xl mb-2">⭐</div>
          <div className="text-kids-sm font-bold">쉬움 (2×2)</div>
        </motion.button>

        <motion.button
          className="w-full bg-gradient-to-r from-candy-blue to-blue-500 text-white rounded-kids-xl px-6 py-5 shadow-kids-card card-3d text-center"
          whileTap={{ scale: 0.95, y: 3 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          onClick={() => onSelect('medium')}
        >
          <div className="text-4xl mb-2">⭐⭐</div>
          <div className="text-kids-sm font-bold">보통 (3×3)</div>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function PuzzleMatchPage () {
  const [difficulty, setDifficulty] = useState(null)
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [board, setBoard] = useState([])
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState({})
  const [isClear, setIsClear] = useState(false)
  const [shakeId, setShakeId] = useState(null)
  const addStars = useGameStore((s) => s.addStars)
  const totalStars = useGameStore((s) => s.gameProgress['puzzle-match'].stars)

  const puzzles = difficulty ? PUZZLES[difficulty] : []
  const puzzle = puzzles[puzzleIndex]

  // 정답 그리드 (1차원 배열)
  const answerFlat = useMemo(() => {
    if (!puzzle) return []
    return puzzle.grid.flat()
  }, [puzzle])

  const gridSize = puzzle ? puzzle.grid.length : 2

  // 보드 초기화
  const initBoard = useCallback(() => {
    if (!puzzle) return
    const flat = puzzle.grid.flat()
    const shuffled = shuffleArray(flat.map((emoji, i) => ({ id: i, emoji, originalIndex: i })))
    setBoard(shuffled)
    setSolved({})
    setSelected(null)
    setIsClear(false)
  }, [puzzle])

  useEffect(() => {
    if (puzzle) initBoard()
  }, [puzzle, initBoard])

  // 퍼즐 조각을 슬롯에 놓기
  const handleSlotTap = useCallback((slotIndex) => {
    if (solved[slotIndex] !== undefined || selected === null || isClear) return

    const piece = board[selected]
    if (piece.originalIndex === slotIndex) {
      // 정답!
      setSolved((prev) => {
        const next = { ...prev, [slotIndex]: piece.emoji }
        const solvedCount = Object.keys(next).length
        if (solvedCount >= answerFlat.length) {
          setTimeout(() => {
            setIsClear(true)
            addStars('puzzle-match', 3)
          }, 500)
        }
        return next
      })
      setBoard((prev) => prev.filter((_, i) => i !== selected))
      setSelected(null)
    } else {
      // 오답 - 흔들림
      setShakeId(slotIndex)
      setTimeout(() => setShakeId(null), 500)
      setSelected(null)
    }
  }, [selected, board, solved, answerFlat, isClear, addStars])

  const handlePieceTap = useCallback((index) => {
    if (isClear) return
    setSelected((prev) => (prev === index ? null : index))
  }, [isClear])

  const handleNext = useCallback(() => {
    const nextIndex = (puzzleIndex + 1) % puzzles.length
    setPuzzleIndex(nextIndex)
  }, [puzzleIndex, puzzles.length])

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
        <GameHeader gameIcon="🧩" gameName="퍼즐맞추기" stars={totalStars} />
        <DifficultySelect onSelect={setDifficulty} />
      </div>
    )
  }

  if (!puzzle) return null

  const solvedCount = Object.keys(solved).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
      <GameHeader gameIcon="🧩" gameName="퍼즐맞추기" stars={totalStars} />

      <div className="pt-28 pb-8 px-4 flex flex-col items-center min-h-screen">
        {/* 퍼즐 이름 */}
        <motion.div
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-kids border-2 border-white/60 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-kids-xs font-bold text-gray-700">{puzzle.name}</span>
          <span className="text-sm text-gray-400">{solvedCount}/{answerFlat.length}</span>
        </motion.div>

        {/* 정답 보드 (빈 슬롯 그리드) */}
        <motion.div
          className="bg-white rounded-kids-xl shadow-kids-card border-4 border-emerald-200 p-3 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {answerFlat.map((emoji, i) => {
              const isSolved = solved[i] !== undefined
              const isShaking = shakeId === i

              return (
                <motion.button
                  key={i}
                  className={`
                    aspect-square rounded-kids flex items-center justify-center
                    ${isSolved
                      ? 'bg-emerald-100 border-2 border-emerald-300'
                      : selected !== null
                        ? 'bg-yellow-50 border-2 border-yellow-300 shadow-kids'
                        : 'bg-gray-100 border-2 border-dashed border-gray-300'
                    }
                  `}
                  style={{ width: gridSize === 2 ? 120 : 90, height: gridSize === 2 ? 120 : 90 }}
                  animate={isShaking ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  whileTap={!isSolved ? { scale: 0.95 } : {}}
                  onClick={() => handleSlotTap(i)}
                >
                  {isSolved ? (
                    <motion.span
                      className={gridSize === 2 ? 'text-6xl' : 'text-4xl'}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {solved[i]}
                    </motion.span>
                  ) : (
                    <span className="text-2xl text-gray-300">?</span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* 퍼즐 조각들 (섞인 상태) */}
        <div className="w-full max-w-sm">
          <div className="flex flex-wrap justify-center gap-3">
            {board.map((piece, i) => (
              <motion.button
                key={piece.id}
                className={`
                  rounded-kids flex items-center justify-center shadow-kids card-3d
                  ${selected === i
                    ? 'bg-yellow-200 border-3 border-yellow-400 scale-105'
                    : 'bg-white border-2 border-gray-200'
                  }
                `}
                style={{
                  width: gridSize === 2 ? 80 : 65,
                  height: gridSize === 2 ? 80 : 65,
                  borderWidth: selected === i ? 3 : 2
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: selected === i ? 1.08 : 1 }}
                transition={{ delay: i * 0.05, type: 'spring' }}
                onClick={() => handlePieceTap(i)}
              >
                <span className={gridSize === 2 ? 'text-4xl' : 'text-3xl'}>
                  {piece.emoji}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 뒤로가기 */}
        <motion.button
          className="mt-6 bg-white/70 backdrop-blur-sm border-2 border-white/60 px-5 py-2 rounded-full shadow-kids text-kids-xs font-bold text-gray-500"
          whileTap={{ scale: 0.92 }}
          onClick={() => setDifficulty(null)}
        >
          ◀ 난이도 선택
        </motion.button>
      </div>

      {isClear && <ClearScreen onNext={handleNext} />}
    </div>
  )
}
