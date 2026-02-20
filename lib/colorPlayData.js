// 색칠놀이 도안 데이터
// 각 도안은 SVG path 영역들로 구성
export const DRAWINGS = [
  {
    id: 'fish',
    name: '물고기',
    emoji: '🐟',
    regionCount: 4,
    viewBox: '0 0 300 220',
    regions: [
      { id: 'body', d: 'M60,110 Q60,50 150,50 Q240,50 240,110 Q240,170 150,170 Q60,170 60,110 Z', label: '몸통' },
      { id: 'tail', d: 'M240,110 L290,70 L290,150 Z', label: '꼬리' },
      { id: 'fin', d: 'M120,50 Q140,10 160,50', label: '지느러미', stroke: true },
      { id: 'eye', d: 'M110,95 A12,12 0 1,1 110,96 Z', label: '눈' }
    ]
  },
  {
    id: 'house',
    name: '집',
    emoji: '🏠',
    regionCount: 5,
    viewBox: '0 0 300 260',
    regions: [
      { id: 'roof', d: 'M30,120 L150,30 L270,120 Z', label: '지붕' },
      { id: 'wall', d: 'M60,120 L60,240 L240,240 L240,120 Z', label: '벽' },
      { id: 'door', d: 'M120,160 L120,240 L180,240 L180,160 Q150,145 120,160 Z', label: '문' },
      { id: 'window1', d: 'M80,145 L110,145 L110,175 L80,175 Z', label: '왼쪽 창문' },
      { id: 'window2', d: 'M190,145 L220,145 L220,175 L190,175 Z', label: '오른쪽 창문' }
    ]
  },
  {
    id: 'flower',
    name: '꽃',
    emoji: '🌸',
    regionCount: 4,
    viewBox: '0 0 300 300',
    regions: [
      { id: 'petal1', d: 'M150,80 Q180,40 150,10 Q120,40 150,80 Z', label: '꽃잎1' },
      { id: 'petal2', d: 'M180,110 Q220,80 210,50 Q190,70 180,110 Z', label: '꽃잎2' },
      { id: 'petal3', d: 'M120,110 Q80,80 90,50 Q110,70 120,110 Z', label: '꽃잎3' },
      { id: 'center', d: 'M150,110 A25,25 0 1,1 150,111 Z', label: '가운데' },
      { id: 'petal4', d: 'M180,130 Q220,140 210,170 Q190,150 180,130 Z', label: '꽃잎4' },
      { id: 'petal5', d: 'M120,130 Q80,140 90,170 Q110,150 120,130 Z', label: '꽃잎5' },
      { id: 'stem', d: 'M145,135 L145,280 L155,280 L155,135 Z', label: '줄기' },
      { id: 'leaf', d: 'M145,200 Q100,180 110,220 Q130,210 145,200 Z', label: '잎' }
    ]
  },
  {
    id: 'car',
    name: '자동차',
    emoji: '🚗',
    regionCount: 5,
    viewBox: '0 0 320 200',
    regions: [
      { id: 'top', d: 'M100,60 L120,20 L220,20 L240,60 Z', label: '윗부분' },
      { id: 'body', d: 'M40,60 L280,60 Q300,60 300,80 L300,120 L20,120 Q20,100 40,60 Z', label: '차체' },
      { id: 'window1', d: 'M115,30 L125,60 L170,60 L170,30 Z', label: '왼쪽 창문' },
      { id: 'window2', d: 'M175,30 L175,60 L225,60 L215,30 Z', label: '오른쪽 창문' },
      { id: 'wheel1', d: 'M80,120 A25,25 0 1,1 80,121 Z', label: '왼쪽 바퀴' },
      { id: 'wheel2', d: 'M240,120 A25,25 0 1,1 240,121 Z', label: '오른쪽 바퀴' }
    ]
  },
  {
    id: 'butterfly',
    name: '나비',
    emoji: '🦋',
    regionCount: 5,
    viewBox: '0 0 300 240',
    regions: [
      { id: 'wingTL', d: 'M150,120 Q100,40 40,60 Q60,120 150,120 Z', label: '왼쪽 위 날개' },
      { id: 'wingTR', d: 'M150,120 Q200,40 260,60 Q240,120 150,120 Z', label: '오른쪽 위 날개' },
      { id: 'wingBL', d: 'M150,120 Q80,140 60,200 Q120,180 150,120 Z', label: '왼쪽 아래 날개' },
      { id: 'wingBR', d: 'M150,120 Q220,140 240,200 Q180,180 150,120 Z', label: '오른쪽 아래 날개' },
      { id: 'bodyPart', d: 'M145,60 L155,60 L155,200 L145,200 Z', label: '몸통' }
    ]
  }
]

export const COLOR_PALETTE = [
  { id: 'red', color: '#FF6B6B', name: '빨강' },
  { id: 'orange', color: '#FF9F43', name: '주황' },
  { id: 'yellow', color: '#FECA57', name: '노랑' },
  { id: 'green', color: '#5CD85A', name: '초록' },
  { id: 'sky', color: '#48DBFB', name: '하늘' },
  { id: 'blue', color: '#4E89FF', name: '파랑' },
  { id: 'purple', color: '#A66CFF', name: '보라' },
  { id: 'pink', color: '#FF7EB3', name: '분홍' }
]
