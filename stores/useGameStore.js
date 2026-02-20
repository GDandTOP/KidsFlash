import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set, get) => ({
      // 전체 별 개수
      totalStars: 0,

      // 게임별 진행 상태
      gameProgress: {
        'color-play': { completed: 0, stars: 0 },
        'puzzle-match': { completed: 0, stars: 0 },
        'music-play': { completed: 0, stars: 0 },
        'balloon-pop': { completed: 0, stars: 0 },
        'number-count': { completed: 0, stars: 0 }
      },

      // 별 추가
      addStars: (gameId, stars) => {
        set((state) => ({
          totalStars: state.totalStars + stars,
          gameProgress: {
            ...state.gameProgress,
            [gameId]: {
              ...state.gameProgress[gameId],
              stars: state.gameProgress[gameId].stars + stars,
              completed: state.gameProgress[gameId].completed + 1
            }
          }
        }))
      },

      // 진행도 초기화
      resetProgress: () => {
        set({
          totalStars: 0,
          gameProgress: {
            'color-play': { completed: 0, stars: 0 },
            'puzzle-match': { completed: 0, stars: 0 },
            'music-play': { completed: 0, stars: 0 },
            'balloon-pop': { completed: 0, stars: 0 },
            'number-count': { completed: 0, stars: 0 }
          }
        })
      }
    }),
    {
      name: 'flash-kids-storage'
    }
  )
)

export default useGameStore
