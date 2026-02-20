'use client'

import { motion } from 'framer-motion'

const PARTICLE_COUNT = 10

export default function PopEffect ({ x, y, color, points = 1, isSpecial = false }) {
  const particleCount = isSpecial ? 16 : PARTICLE_COUNT
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2
    const distance = isSpecial ? 50 + Math.random() * 40 : 40 + Math.random() * 30
    return {
      id: i,
      endX: Math.cos(angle) * distance,
      endY: Math.sin(angle) * distance,
      size: isSpecial ? 5 + Math.random() * 8 : 4 + Math.random() * 6,
      delay: Math.random() * 0.05
    }
  })

  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      {/* 중앙 플래시 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isSpecial ? 90 : 60,
          height: isSpecial ? 90 : 60,
          background: `radial-gradient(circle, white 0%, ${color} 40%, transparent 70%)`,
          left: isSpecial ? -45 : -30,
          top: isSpecial ? -45 : -30
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: isSpecial ? 2.5 : 2, opacity: 0 }}
        transition={{ duration: isSpecial ? 0.5 : 0.4, ease: 'easeOut' }}
      />

      {/* 파티클 */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            left: -p.size / 2,
            top: -p.size / 2
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: p.endX,
            y: p.endY,
            opacity: 0,
            scale: 0.3
          }}
          transition={{
            duration: isSpecial ? 0.7 : 0.5,
            delay: p.delay,
            ease: 'easeOut'
          }}
        />
      ))}

      {/* 반짝이 이모지 */}
      <motion.div
        className="absolute text-3xl"
        style={{ left: -16, top: -16 }}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1.5, 0], rotate: 180 }}
        transition={{ duration: 0.5 }}
      >
        ✨
      </motion.div>

      {/* 점수 플로팅 텍스트 */}
      <motion.div
        className="absolute whitespace-nowrap"
        style={{ left: '50%', top: -10, transform: 'translateX(-50%)' }}
        initial={{ y: 0, opacity: 1, scale: isSpecial ? 1.2 : 0.9 }}
        animate={{ y: -60, opacity: 0, scale: isSpecial ? 1.8 : 1.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span
          className="font-bold drop-shadow-lg"
          style={{
            fontSize: isSpecial ? 28 : 20,
            color: isSpecial ? color : 'white',
            textShadow: isSpecial
              ? `0 0 10px ${color}, 0 2px 4px rgba(0,0,0,0.3)`
              : '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          +{points}
        </span>
      </motion.div>

      {/* 특수 풍선 보너스 이펙트 */}
      {isSpecial && (
        <>
          <motion.div
            className="absolute text-2xl"
            style={{ left: 20, top: -30 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0], y: -40, x: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            💥
          </motion.div>
          <motion.div
            className="absolute text-2xl"
            style={{ left: -35, top: -20 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 0], opacity: [0, 1, 0], y: -30, x: -20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            🌟
          </motion.div>
        </>
      )}
    </div>
  )
}
