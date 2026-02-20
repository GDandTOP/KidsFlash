'use client'

import { useEffect, useRef } from 'react'
import useSettingsStore from '@/stores/useSettingsStore'

export default function useSound (soundType) {
  const audioRef = useRef(null)
  const { soundEnabled, volume } = useSettingsStore()

  useEffect(() => {
    // 추후 Howler.js로 구현
    // 지금은 기본 오디오 컨텍스트 준비
  }, [])

  const play = () => {
    if (!soundEnabled) return

    // 간단한 비프음 생성 (임시)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 600
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  return { play }
}
