import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useSettingsStore = create(
  persist(
    (set) => ({
      // 볼륨 설정
      volume: 0.7,
      soundEnabled: true,
      musicEnabled: true,

      // 플레이 타이머 설정
      timerEnabled: false,
      timerMinutes: 30,

      // 난이도 설정
      difficulty: 'medium', // easy, medium, hard

      // 볼륨 조절
      setVolume: (volume) => set({ volume }),

      // 사운드 토글
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      // 음악 토글
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),

      // 타이머 설정
      setTimer: (enabled, minutes) => set({ timerEnabled: enabled, timerMinutes: minutes }),

      // 난이도 설정
      setDifficulty: (difficulty) => set({ difficulty })
    }),
    {
      name: 'flash-kids-settings'
    }
  )
)

export default useSettingsStore
