'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameHeader from '@/components/layout/GameHeader'
import ClearScreen from '@/components/common/ClearScreen'
import useGameStore from '@/stores/useGameStore'
import { generateQuestion } from '@/lib/numberCountData'

const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: '쉬움 (1~3)', emoji: '⭐', gradient: 'from-candy-green to-emerald-400' },
  { id: 'medium', label: '보통 (1~5)', emoji: '⭐⭐', gradient: 'from-candy-blue to-blue-500' },
  { id: 'hard', label: '어려움 (1~10)', emoji: '⭐⭐⭐', gradient: 'from-candy-purple to-violet-500' }
]

const ROUND_TOTAL = 5

function DifficultySelect ({ onSelect }) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-28 pb-8">
      <motion.div
        className="flex flex-col items-center gap-5 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-center mb-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div className="text-7xl mb-3">🔢</div>
          <h2 className="text-kids-lg font-bold text-gray-700">숫자세기</h2>
          <p className="text-kids-xs text-gray-400 mt-1">난이도를 선택하세요!</p>
        </motion.div>

        {DIFFICULTY_OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.id}
            className={`w-full bg-gradient-to-r ${opt.gradient} text-white rounded-kids-xl px-6 py-4 shadow-kids-card card-3d text-center`}
            whileTap={{ scale: 0.95, y: 3 }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            onClick={() => onSelect(opt.id)}
          >
            <div className="text-2xl mb-1">{opt.emoji}</div>
            <div className="text-kids-sm font-bold">{opt.label}</div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

function CorrectFeedback () {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.2, 0.5] }}
      transition={{ duration: 1.2, times: [0, 0.2, 0.7, 1] }}
    >
      <div className="text-center">
        <div className="text-8xl">🎉</div>
        <div className="text-kids-lg font-bold text-candy-green mt-2 drop-shadow-lg">
          정답!
        </div>
      </div>
    </motion.div>
  )
}

function WrongFeedback () {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
      transition={{ duration: 1, times: [0, 0.2, 0.6, 1] }}
    >
      <div className="text-center">
        <motion.div
          className="text-7xl"
          animate={{ x: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.4 }}
        >
          🤔
        </motion.div>
        <div className="text-kids-sm font-bold text-gray-500 mt-2">
          다시 세어볼까요?
        </div>
      </div>
    </motion.div>
  )
}

export default function NumberCountPage () {
  const [difficulty, setDifficulty] = useState(null)
  const [question, setQuestion] = useState(null)
  const [round, setRound] = useState(0)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [isClear, setIsClear] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const addStars = useGameStore((s) => s.addStars)
  const totalStars = useGameStore((s) => s.gameProgress['number-count'].stars)

  // 문제 생성
  const newQuestion = useCallback((diff) => {
    const q = generateQuestion(diff)
    setQuestion(q)
    setFeedback(null)
  }, [])

  // 난이도 선택 시 시작
  useEffect(() => {
    if (difficulty) {
      setRound(0)
      setCorrectCount(0)
      setIsClear(false)
      newQuestion(difficulty)
    }
  }, [difficulty, newQuestion])

  // 아이템 배치 위치 (겹치지 않게)
  const itemPositions = useMemo(() => {
    if (!question) return []
    const positions = []
    for (let i = 0; i < question.answer; i++) {
      let x, y, attempts = 0
      do {
        x = 15 + Math.random() * 70
        y = 10 + Math.random() * 60
        attempts++
      } while (
        attempts < 50 &&
        positions.some((p) => Math.abs(p.x - x) < 18 && Math.abs(p.y - y) < 18)
      )
      positions.push({ x, y, rotation: Math.random() * 20 - 10 })
    }
    return positions
  }, [question])

  const handleAnswer = useCallback((num) => {
    if (feedback || !question) return

    if (num === question.answer) {
      setFeedback('correct')
      setCorrectCount((c) => c + 1)

      setTimeout(() => {
        const nextRound = round + 1
        if (nextRound >= ROUND_TOTAL) {
          setIsClear(true)
          addStars('number-count', 3)
        } else {
          setRound(nextRound)
          newQuestion(difficulty)
        }
      }, 1200)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 1000)
    }
  }, [feedback, question, round, difficulty, addStars, newQuestion])

  const handleNext = useCallback(() => {
    setIsClear(false)
    setRound(0)
    setCorrectCount(0)
    newQuestion(difficulty)
  }, [difficulty, newQuestion])

  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-indigo-50">
        <GameHeader gameIcon="🔢" gameName="숫자세기" stars={totalStars} />
        <DifficultySelect onSelect={setDifficulty} />
      </div>
    )
  }

  if (!question) return null

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      <GameHeader gameIcon="🔢" gameName="숫자세기" stars={totalStars} />

      <div className="pt-28 pb-8 px-4 flex flex-col items-center min-h-screen">
        {/* 라운드 + 질문 */}
        <motion.div
          className="text-center mb-4"
          key={round}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 진행 도트 */}
          <div className="flex justify-center gap-2 mb-3">
            {Array.from({ length: ROUND_TOTAL }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < round ? 'bg-candy-green' : i === round ? 'bg-candy-purple' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-kids shadow-kids border-2 border-white/60 inline-block">
            <p className="text-kids-sm font-bold text-gray-700">
              {question.item.emoji} {question.question}
            </p>
          </div>
        </motion.div>

        {/* 아이템 표시 영역 */}
        <motion.div
          className="relative bg-white/60 backdrop-blur-sm rounded-kids-xl border-4 border-white/70 shadow-kids-card w-full max-w-sm mb-6"
          style={{ height: 260 }}
          key={`area-${round}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          {itemPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute select-none"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ scale: 0, rotate: pos.rotation - 30 }}
              animate={{ scale: 1, rotate: pos.rotation }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 12,
                delay: i * 0.1
              }}
            >
              <motion.div
                className="text-5xl sm:text-6xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.2 }}
              >
                {question.item.emoji}
              </motion.div>
            </motion.div>
          ))}

          {/* 피드백 오버레이 */}
          <AnimatePresence>
            {feedback === 'correct' && <CorrectFeedback />}
            {feedback === 'wrong' && <WrongFeedback />}
          </AnimatePresence>
        </motion.div>

        {/* 숫자 선택 버튼 */}
        <motion.div
          className="flex gap-3 sm:gap-4 flex-wrap justify-center"
          key={`opts-${round}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {question.options.map((num, i) => (
            <motion.button
              key={`${round}-${num}`}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-kids shadow-kids-card border-3 border-purple-200 flex items-center justify-center"
              style={{ borderWidth: 3 }}
              whileTap={{ scale: 0.88, y: 3 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 400 }}
              onClick={() => handleAnswer(num)}
              disabled={feedback !== null}
            >
              <span className="text-kids-lg font-bold text-candy-purple">{num}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* 뒤로가기 */}
        <motion.button
          className="mt-8 bg-white/70 backdrop-blur-sm border-2 border-white/60 px-5 py-2 rounded-full shadow-kids text-kids-xs font-bold text-gray-500"
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
