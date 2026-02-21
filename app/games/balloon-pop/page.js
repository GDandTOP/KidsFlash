'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameHeader from '@/components/layout/GameHeader'
import Balloon from '@/components/games/balloon-pop/Balloon'
import PopEffect from '@/components/games/balloon-pop/PopEffect'
import ScoreBoard from '@/components/games/balloon-pop/ScoreBoard'
import MissionBadge from '@/components/games/balloon-pop/MissionBadge'
import ClearScreen from '@/components/common/ClearScreen'
import useGameStore from '@/stores/useGameStore'

const BALLOON_COLORS = ['red', 'blue', 'yellow', 'green', 'pink', 'purple']
const SPECIAL_SHAPES = ['star', 'heart']
const COLOR_MAP = {
  red: '#FF6B6B',
  blue: '#48DBFB',
  yellow: '#FECA57',
  green: '#5CD85A',
  pink: '#FF7EB3',
  purple: '#A66CFF'
}

const MODES = {
  SELECT: 'select',
  FREE: 'free',
  MISSION: 'mission'
}

const MISSION_TARGET = 8

// 특수 풍선 점수/속도 배율
const SPECIAL_CONFIG = {
  star: { multiplier: 10, speedFactor: 0.45 },  // 별: x10점, 매우 빠름
  heart: { multiplier: 5, speedFactor: 0.6 }     // 하트: x5점, 빠름
}

function createBalloon (areaWidth) {
  const isSpecial = Math.random() < 0.1
  const shape = isSpecial
    ? SPECIAL_SHAPES[Math.floor(Math.random() * SPECIAL_SHAPES.length)]
    : 'normal'
  const size = 55 + Math.random() * 25
  const margin = size / 2 + 10
  const maxX = Math.max(margin, (areaWidth || 360) - margin - 20)

  const baseSpeed = 4 + Math.random() * 4
  const specialCfg = SPECIAL_CONFIG[shape]
  const speed = specialCfg ? baseSpeed * specialCfg.speedFactor : baseSpeed
  const points = specialCfg ? specialCfg.multiplier : 1

  return {
    id: Date.now() + Math.random(),
    color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    shape,
    x: margin + Math.random() * (maxX - margin),
    speed,
    sway: isSpecial ? 15 + Math.random() * 25 : 10 + Math.random() * 20,
    size: isSpecial ? size + 5 : size,
    points,
    createdAt: Date.now()
  }
}

function ModeSelect ({ onSelect }) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-28 pb-8">
      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 타이틀 */}
        <motion.div
          className="text-center mb-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div className="text-7xl mb-3">🎈</div>
          <h2 className="text-kids-lg font-bold text-gray-700">풍선터트리기</h2>
          <p className="text-kids-xs text-gray-400 mt-1">모드를 선택하세요!</p>
        </motion.div>

        {/* 자유 모드 */}
        <motion.button
          className="w-full bg-gradient-to-r from-candy-orange to-candy-red text-white rounded-kids-xl px-6 py-5 shadow-kids-card card-3d text-center"
          whileTap={{ scale: 0.95, y: 3 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onSelect(MODES.FREE)}
        >
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-kids-sm font-bold">자유모드</div>
          <div className="text-kids-xs opacity-80 mt-0.5">마음껏 터트리기!</div>
        </motion.button>

        {/* 미션 모드 */}
        <motion.button
          className="w-full bg-gradient-to-r from-candy-purple to-candy-blue text-white rounded-kids-xl px-6 py-5 shadow-kids-card card-3d text-center"
          whileTap={{ scale: 0.95, y: 3 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          onClick={() => onSelect(MODES.MISSION)}
        >
          <div className="text-4xl mb-2">🎯</div>
          <div className="text-kids-sm font-bold">미션모드</div>
          <div className="text-kids-xs opacity-80 mt-0.5">같은 색만 터트리기!</div>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function BalloonPopPage () {
  const [mode, setMode] = useState(MODES.SELECT)
  const [balloons, setBalloons] = useState([])
  const [popEffects, setPopEffects] = useState([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [stars, setStars] = useState(0)
  const [isClear, setIsClear] = useState(false)
  const [targetColor, setTargetColor] = useState(null)
  const [missionRemaining, setMissionRemaining] = useState(MISSION_TARGET)
  const containerRef = useRef(null)
  const spawnTimerRef = useRef(null)
  const comboTimerRef = useRef(null)
  const addStarsToStore = useGameStore((s) => s.addStars)
  const totalStars = useGameStore((s) => s.gameProgress['balloon-pop'].stars)

  const getContainerWidth = useCallback(() => {
    return containerRef.current?.offsetWidth || 360
  }, [])

  // 풍선 생성 루프
  const startSpawning = useCallback(() => {
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current)

    // 초기 풍선
    const width = getContainerWidth()
    const initial = Array.from({ length: 4 }, () => createBalloon(width))
    setBalloons(initial)

    spawnTimerRef.current = setInterval(() => {
      setBalloons((prev) => {
        // 오래된 풍선 제거 (15초 이상)
        const now = Date.now()
        const alive = prev.filter((b) => now - b.createdAt < 15000)
        // 최대 12개 유지
        if (alive.length >= 12) return alive
        return [...alive, createBalloon(getContainerWidth())]
      })
    }, 800)
  }, [getContainerWidth])

  // 모드 선택 시 게임 시작
  useEffect(() => {
    if (mode === MODES.FREE || mode === MODES.MISSION) {
      setScore(0)
      setCombo(0)
      setIsClear(false)

      if (mode === MODES.MISSION) {
        const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]
        setTargetColor(color)
        setMissionRemaining(MISSION_TARGET)
      }

      startSpawning()
    }

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current)
    }
  }, [mode, startSpawning])

  // pop 효과 정리
  useEffect(() => {
    if (popEffects.length === 0) return
    const timer = setTimeout(() => {
      setPopEffects((prev) => prev.slice(1))
    }, 600)
    return () => clearTimeout(timer)
  }, [popEffects])

  const handlePop = useCallback((balloonId) => {
    setBalloons((prev) => {
      const target = prev.find((b) => b.id === balloonId)
      if (!target) return prev

      // 미션 모드: 틀린 색 터치 시 콤보만 리셋
      if (mode === MODES.MISSION && targetColor && target.color !== targetColor && target.shape === 'normal') {
        setCombo(0)
        // 흔들림 피드백 (오답)
        return prev
      }

      // pop 이펙트 위치 계산
      const rect = containerRef.current?.getBoundingClientRect()
      const effectX = target.x + (target.size || 70) / 2
      const effectY = rect ? rect.height * 0.5 : 300

      const isSpecialBalloon = target.shape === 'star' || target.shape === 'heart'
      const popColor = isSpecialBalloon
        ? (target.shape === 'star' ? '#FECA57' : '#FF7EB3')
        : (COLOR_MAP[target.color] || '#FF6B6B')

      setPopEffects((p) => [...p, {
        id: Date.now() + Math.random(),
        x: effectX,
        y: effectY,
        color: popColor,
        points,
        isSpecial: isSpecialBalloon
      }])

      // 점수
      const points = target.points || 1
      setScore((s) => s + points)

      // 콤보
      setCombo((c) => {
        const newCombo = c + 1
        if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
        comboTimerRef.current = setTimeout(() => setCombo(0), 2000)
        return newCombo
      })

      // 미션 모드 진행
      if (mode === MODES.MISSION && (target.color === targetColor || target.shape !== 'normal')) {
        setMissionRemaining((r) => {
          const next = r - points
          if (next <= 0) {
            // 미션 클리어!
            setTimeout(() => {
              setIsClear(true)
              setStars((s) => s + 3)
              addStarsToStore('balloon-pop', 3)
              if (spawnTimerRef.current) clearInterval(spawnTimerRef.current)
            }, 300)
            return 0
          }
          return next
        })
      }

      return prev.filter((b) => b.id !== balloonId)
    })
  }, [mode, targetColor, addStarsToStore])

  const handleNextMission = useCallback(() => {
    setIsClear(false)
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]
    setTargetColor(color)
    setMissionRemaining(MISSION_TARGET)
    setBalloons([])
    setCombo(0)
    startSpawning()
  }, [startSpawning])

  const handleBackToSelect = useCallback(() => {
    setMode(MODES.SELECT)
    setBalloons([])
    setPopEffects([])
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current)
  }, [])

  const displayStars = totalStars + stars

  // 모드 선택 화면
  if (mode === MODES.SELECT) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-red-50 to-rose-100">
        <GameHeader gameIcon="🎈" gameName="풍선터트리기" stars={displayStars} />
        <ModeSelect onSelect={setMode} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-blue-50 overflow-hidden">
      <GameHeader gameIcon="🎈" gameName="풍선터트리기" stars={displayStars} />

      {/* 게임 영역 */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* 구름 배경 장식 */}
        <div className="absolute top-20 left-[5%] w-24 h-10 cloud opacity-40 animate-drift-right" style={{ animationDuration: '30s' }} />
        <div className="absolute top-32 right-[10%] w-16 h-7 cloud opacity-30 animate-drift-left" style={{ animationDuration: '25s' }} />
        <div className="absolute top-48 left-[40%] w-20 h-8 cloud opacity-25 animate-drift-right" style={{ animationDuration: '35s', animationDelay: '8s' }} />

        {/* 상단 UI 바 */}
        <div className="absolute top-[5.5rem] left-0 right-0 z-30 flex justify-center items-center gap-3 px-4">
          <ScoreBoard score={score} combo={combo} />
          {mode === MODES.MISSION && targetColor && (
            <MissionBadge targetColor={targetColor} remaining={missionRemaining} />
          )}
        </div>

        {/* 뒤로가기 */}
        <motion.button
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/70 backdrop-blur-sm border-2 border-white/60 px-5 py-2 rounded-full shadow-kids text-kids-xs font-bold text-gray-500"
          whileTap={{ scale: 0.92 }}
          onClick={handleBackToSelect}
        >
          ◀ 모드선택
        </motion.button>

        {/* 풍선들 */}
        <AnimatePresence>
          {balloons.map((balloon) => (
            <Balloon
              key={balloon.id}
              balloon={balloon}
              onPop={handlePop}
            />
          ))}
        </AnimatePresence>

        {/* Pop 이펙트 */}
        <AnimatePresence>
          {popEffects.map((effect) => (
            <PopEffect
              key={effect.id}
              x={effect.x}
              y={effect.y}
              color={effect.color}
            />
          ))}
        </AnimatePresence>

        {/* 하단 풀밭 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-300/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-green-400/40 to-transparent" />
      </div>

      {/* 클리어 화면 */}
      {isClear && (
        <ClearScreen onNext={mode === MODES.MISSION ? handleNextMission : null} />
      )}
    </div>
  )
}
