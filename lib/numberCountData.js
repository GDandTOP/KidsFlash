// 숫자세기 문제 데이터
// 카테고리별 이모지 + 한글 이름
const ITEMS = [
  { emoji: '🍎', name: '사과' },
  { emoji: '🍌', name: '바나나' },
  { emoji: '🍇', name: '포도' },
  { emoji: '🍊', name: '귤' },
  { emoji: '🍓', name: '딸기' },
  { emoji: '⭐', name: '별' },
  { emoji: '🌸', name: '꽃' },
  { emoji: '🐟', name: '물고기' },
  { emoji: '🦋', name: '나비' },
  { emoji: '🐥', name: '병아리' },
  { emoji: '🚗', name: '자동차' },
  { emoji: '🎈', name: '풍선' },
  { emoji: '🍩', name: '도넛' },
  { emoji: '🧸', name: '곰인형' },
  { emoji: '🌈', name: '무지개' }
]

// 난이도별 범위
const RANGES = {
  easy: { min: 1, max: 3 },
  medium: { min: 1, max: 5 },
  hard: { min: 1, max: 10 }
}

// 문제 생성
export function generateQuestion (difficulty = 'easy') {
  const range = RANGES[difficulty]
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  const answer = range.min + Math.floor(Math.random() * (range.max - range.min + 1))

  // 선택지 생성 (정답 포함 3~4개)
  const optionCount = difficulty === 'easy' ? 3 : 4
  const options = new Set([answer])

  while (options.size < optionCount) {
    const candidate = range.min + Math.floor(Math.random() * (range.max - range.min + 1))
    options.add(candidate)
  }

  // 선택지 섞기
  const shuffled = [...options].sort(() => Math.random() - 0.5)

  return {
    item,
    answer,
    options: shuffled,
    question: `${item.name}가 몇 개일까요?`
  }
}
