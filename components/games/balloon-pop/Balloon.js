'use client'

import { motion } from 'framer-motion'

const BALLOON_STYLES = {
  red: {
    body: '#FF6B6B',
    shine: '#FF9E9E',
    shadow: '#D94848',
    string: '#D94848'
  },
  blue: {
    body: '#48DBFB',
    shine: '#8AE8FF',
    shadow: '#1FA5CC',
    string: '#1FA5CC'
  },
  yellow: {
    body: '#FECA57',
    shine: '#FFE08A',
    shadow: '#D4A017',
    string: '#D4A017'
  },
  green: {
    body: '#5CD85A',
    shine: '#8EEA8C',
    shadow: '#3BA039',
    string: '#3BA039'
  },
  pink: {
    body: '#FF7EB3',
    shine: '#FFB0D0',
    shadow: '#D4568A',
    string: '#D4568A'
  },
  purple: {
    body: '#A66CFF',
    shine: '#C9A3FF',
    shadow: '#7C3FDB',
    string: '#7C3FDB'
  }
}

const SPECIAL_SHAPES = {
  star: { emoji: '⭐', label: 'x10', glowColor: 'rgba(254,202,87,0.5)' },
  heart: { emoji: '💖', label: 'x5', glowColor: 'rgba(255,126,179,0.5)' }
}

export default function Balloon ({ balloon, onPop }) {
  const style = BALLOON_STYLES[balloon.color] || BALLOON_STYLES.red
  const isSpecial = balloon.shape === 'star' || balloon.shape === 'heart'
  const size = balloon.size || 70
  const specialInfo = SPECIAL_SHAPES[balloon.shape]

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: balloon.x,
        width: size + 20,
        zIndex: isSpecial ? 25 : 20
      }}
      initial={{ y: '110vh' }}
      animate={{
        y: '-20vh',
        x: [0, balloon.sway, -balloon.sway, 0]
      }}
      transition={{
        y: { duration: balloon.speed, ease: 'linear' },
        x: { duration: isSpecial ? 1.5 : 2, repeat: Infinity, ease: 'easeInOut' }
      }}
      onTap={() => onPop(balloon.id)}
    >
      <div className="relative flex flex-col items-center">
        {/* 특수 풍선 */}
        {isSpecial ? (
          <div className="relative">
            {/* 글로우 후광 */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: size * 1.4,
                height: size * 1.4,
                left: -(size * 0.2),
                top: -(size * 0.2),
                background: `radial-gradient(circle, ${specialInfo.glowColor} 0%, transparent 70%)`
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 이모지 본체 */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ width: size, height: size }}
              whileTap={{ scale: 1.3 }}
              animate={{
                rotate: [0, 12, -12, 0],
                scale: [1, 1.12, 0.95, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: size * 0.75 }}>
                {specialInfo.emoji}
              </span>
            </motion.div>

            {/* 배율 뱃지 */}
            <motion.div
              className="absolute -top-2 -right-2 bg-white rounded-full px-1.5 py-0.5 shadow-lg border-2"
              style={{
                borderColor: balloon.shape === 'star' ? '#FECA57' : '#FF7EB3',
                fontSize: 11
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <span className="font-bold" style={{ color: balloon.shape === 'star' ? '#D4A017' : '#D4568A' }}>
                {specialInfo.label}
              </span>
            </motion.div>
          </div>
        ) : (
          /* 일반 풍선 SVG */
          <motion.svg
            width={size}
            height={size * 1.2}
            viewBox="0 0 100 120"
            whileTap={{ scale: 1.2 }}
            animate={{
              rotate: [0, 3, -3, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* 풍선 몸체 */}
            <ellipse
              cx="50" cy="48" rx="40" ry="46"
              fill={style.body}
            />
            {/* 하이라이트 (광택) */}
            <ellipse
              cx="36" cy="32" rx="14" ry="18"
              fill={style.shine}
              opacity="0.5"
            />
            {/* 작은 하이라이트 */}
            <ellipse
              cx="32" cy="26" rx="6" ry="8"
              fill="white"
              opacity="0.6"
            />
            {/* 하단 그림자 */}
            <ellipse
              cx="50" cy="80" rx="8" ry="4"
              fill={style.shadow}
              opacity="0.3"
            />
            {/* 꼭지 (매듭) */}
            <polygon
              points="44,90 50,100 56,90"
              fill={style.shadow}
            />
            {/* 줄 */}
            <path
              d={`M50,100 Q53,110 48,120`}
              stroke={style.string}
              strokeWidth="1.5"
              fill="none"
            />
          </motion.svg>
        )}
      </div>
    </motion.div>
  )
}
