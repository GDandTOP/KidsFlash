'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SvgSunflower, SvgFlower, SvgButterfly, SvgBee, SvgBlossom } from '@/components/common/SvgIcons'

function Sun () {
  return (
    <motion.div
      className="absolute top-[3%] right-[8%]"
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
    >
      <div className="relative">
        {/* 태양 광선 */}
        <motion.div
          className="absolute -inset-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,210,80,0.25) 0%, transparent 70%)'
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* 태양 본체 */}
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FFF4B8 0%, #FECA57 40%, #FF9F43 100%)',
            boxShadow: '0 0 40px rgba(254,202,87,0.4), 0 0 80px rgba(254,202,87,0.15)'
          }}
        />
      </div>
    </motion.div>
  )
}

function Mountains () {
  return (
    <div className="absolute bottom-[12%] left-0 right-0 pointer-events-none">
      {/* 뒤쪽 산 */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none" style={{ height: '12vh', opacity: 0.15 }}>
        <path d="M0,80 Q50,20 100,60 Q150,10 200,50 Q260,5 320,55 Q370,25 400,60 L400,80 Z" fill="#A66CFF" />
      </svg>
      {/* 앞쪽 산 */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 60" preserveAspectRatio="none" style={{ height: '8vh', opacity: 0.1 }}>
        <path d="M0,60 Q60,15 120,45 Q180,5 250,40 Q330,10 400,50 L400,60 Z" fill="#7C3FDB" />
      </svg>
    </div>
  )
}

function HillForeground () {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      {/* 뒤쪽 언덕 */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 100" preserveAspectRatio="none" style={{ height: '14vh' }}>
        <defs>
          <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M-20,100 Q40,30 120,65 Q200,20 280,55 Q350,30 420,70 L420,100 Z" fill="url(#hillBack)" />
      </svg>
      {/* 앞쪽 언덕 */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 70" preserveAspectRatio="none" style={{ height: '9vh' }}>
        <defs>
          <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path d="M-20,70 Q80,25 180,50 Q280,15 400,45 L420,70 Z" fill="url(#hillFront)" />
      </svg>
      {/* 풀 텍스처 */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-green-400/25 to-transparent" />
    </div>
  )
}

function Cloud ({ width, top, duration, delay, opacity = 0.6 }) {
  return (
    <div
      className="absolute animate-drift-right"
      style={{
        top,
        left: '-200px',
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: `${width}px`,
          height: `${width * 0.38}px`,
          background: 'rgba(255,255,255,0.85)',
          boxShadow: `
            ${width * 0.33}px ${width * -0.08}px 0 ${width * 0.12}px rgba(255,255,255,0.85),
            ${width * -0.28}px ${width * -0.04}px 0 ${width * 0.08}px rgba(255,255,255,0.85),
            ${width * 0.18}px ${width * 0.04}px 0 ${width * 0.16}px rgba(255,255,255,0.85)
          `
        }}
      />
    </div>
  )
}

function TwinkleStar ({ top, left, size, delay }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left }}
      animate={{ scale: [0.5, 1.3, 0.5], opacity: [0.2, 0.9, 0.2] }}
      transition={{ duration: 2.5 + Math.random() * 2, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size} viewBox="0 0 20 20">
        <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="white" fillOpacity="0.7" />
      </svg>
    </motion.div>
  )
}

function SceneDecor ({ children, x, y, delay, floatDuration = 4.5 }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.5 }, y: { duration: floatDuration, repeat: Infinity, delay, ease: 'easeInOut' } }}
    >
      {children}
    </motion.div>
  )
}

export default function FloatingElements () {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])
  if (!isMounted) return <div className="scene-bg" />

  return (
    <div className="scene-bg" aria-hidden="true">
      {/* 태양 */}
      <Sun />

      {/* 별 (상단) */}
      <TwinkleStar top="5%" left="15%" size={10} delay={0} />
      <TwinkleStar top="10%" left="42%" size={7} delay={0.8} />
      <TwinkleStar top="3%" left="65%" size={9} delay={1.5} />
      <TwinkleStar top="16%" left="82%" size={6} delay={0.4} />
      <TwinkleStar top="8%" left="28%" size={8} delay={2} />

      {/* 구름 (깊이별) */}
      <Cloud width={140} top="5%" duration={45} delay={0} opacity={0.5} />
      <Cloud width={100} top="14%" duration={35} delay={8} opacity={0.6} />
      <Cloud width={120} top="8%" duration={40} delay={20} opacity={0.45} />
      <Cloud width={80} top="22%" duration={30} delay={12} opacity={0.55} />

      {/* 원경 산 */}
      <Mountains />

      {/* 장식 SVG (세계관) */}
      <SceneDecor x="5%" y="72%" delay={0.3} floatDuration={4.2}>
        <SvgSunflower size={22} />
      </SceneDecor>
      <SceneDecor x="91%" y="74%" delay={0.7} floatDuration={4.8}>
        <SvgFlower size={20} />
      </SceneDecor>
      <SceneDecor x="11%" y="40%" delay={1.2} floatDuration={3.8}>
        <SvgButterfly size={22} />
      </SceneDecor>
      <SceneDecor x="87%" y="35%" delay={1.8} floatDuration={3.2}>
        <SvgBee size={16} />
      </SceneDecor>
      <SceneDecor x="74%" y="68%" delay={0.5} floatDuration={5.0}>
        <SvgBlossom size={18} />
      </SceneDecor>

      {/* 전경 언덕 */}
      <HillForeground />
    </div>
  )
}
