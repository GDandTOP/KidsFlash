'use client'

import { motion } from 'framer-motion'
import { SvgRainbow } from '@/components/common/SvgIcons'

const TITLE_LETTERS = [
  { char: '플', color: '#FF6B8A' },
  { char: '래', color: '#FF9F43' },
  { char: '시', color: '#FECA57' },
  { char: ' ', color: 'transparent' },
  { char: '키', color: '#5CD85A' },
  { char: '즈', color: '#48DBFB' }
]

const bannerVariants = {
  hidden: { scale: 0, rotate: -5, y: -40 },
  visible: {
    scale: 1,
    rotate: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }
  }
}

const letterVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.3, rotate: -15 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.3 + i * 0.07,
      type: 'spring',
      stiffness: 400,
      damping: 12
    }
  })
}

export default function Logo () {
  return (
    <motion.div
      className="relative"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 현수막 배경판 */}
      <div className="relative">
        {/* 밧줄 왼쪽 */}
        <motion.div
          className="absolute -top-5 left-6 w-0.5 h-6 bg-amber-700/40 origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, rotate: [0, 2, -2, 0] }}
          transition={{ scaleY: { delay: 0.05, duration: 0.3 }, rotate: { duration: 4, repeat: Infinity } }}
        />
        {/* 밧줄 오른쪽 */}
        <motion.div
          className="absolute -top-5 right-6 w-0.5 h-6 bg-amber-700/40 origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, rotate: [0, -2, 2, 0] }}
          transition={{ scaleY: { delay: 0.05, duration: 0.3 }, rotate: { duration: 4, repeat: Infinity, delay: 0.5 } }}
        />

        {/* 배너 본체 */}
        <motion.div
          className="relative bg-white/80 backdrop-blur-md rounded-kids-xl px-6 py-3 sm:px-8 sm:py-4 border-2 border-white/70"
          style={{
            boxShadow: '0 8px 0 -1px rgba(0,0,0,0.06), 0 16px 40px -8px rgba(0,0,0,0.1)'
          }}
          animate={{ rotate: [0, 0.3, -0.3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* 무지개 상단 장식 */}
          <div
            className="absolute top-0 left-4 right-4 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #FF6B8A, #FF9F43, #FECA57, #5CD85A, #48DBFB, #A66CFF)' }}
          />

          {/* 무지개 아이콘 */}
          <motion.div
            className="flex justify-center mb-0.5"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SvgRainbow size={52} />
          </motion.div>

          {/* 타이틀 글자 */}
          <motion.div
            className="flex items-center justify-center gap-0.5"
            initial="hidden"
            animate="visible"
          >
            {TITLE_LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="text-kids-lg sm:text-kids-xl font-bold inline-block"
                style={{
                  color: letter.color,
                  textShadow: letter.color !== 'transparent'
                    ? `0 3px 0 ${letter.color}33, 0 0 12px ${letter.color}22`
                    : 'none',
                  width: letter.char === ' ' ? '0.25em' : 'auto'
                }}
              >
                {letter.char}
              </motion.span>
            ))}
          </motion.div>

          {/* 무지개 하단 장식 */}
          <div
            className="absolute bottom-0 left-4 right-4 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #A66CFF, #48DBFB, #5CD85A, #FECA57, #FF9F43, #FF6B8A)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
