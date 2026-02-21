# 🌈 플래시 키즈 (Flash Kids)

1~7세 아이들을 위한 재미있고 교육적인 플래시 게임 모바일 앱

## 🎮 게임 목록

| 게임 | 설명 | 상태 |
|------|------|------|
| 🎨 색칠놀이 | 도안을 터치해서 색칠하기 | ✅ 구현 완료 |
| 🧩 퍼즐맞추기 | 드래그앤드롭으로 퍼즐 조각 맞추기 | ✅ 구현 완료 |
| 🎵 음악놀이 | 피아노/실로폰/드럼 연주하기 | ✅ 구현 완료 |
| 🎈 풍선터트리기 | 올라오는 풍선 터치하기 | ✅ 구현 완료 |
| 🔢 숫자세기 | 사물 개수를 세고 정답 선택하기 | ✅ 구현 완료 |

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
flash/
├── app/                          # Next.js App Router
│   ├── layout.js                 # 루트 레이아웃 (배경, 폰트)
│   ├── page.js                   # 홈 화면 (게임 선택)
│   ├── globals.css               # 글로벌 Tailwind 설정
│   └── games/
│       ├── balloon-pop/page.js   # 🎈 풍선 터트리기
│       ├── color-play/page.js    # 🎨 색칠 놀이
│       ├── music-play/page.js    # 🎵 음악 놀이
│       ├── number-count/page.js  # 🔢 숫자 세기
│       └── puzzle-match/page.js  # 🧩 퍼즐 맞추기
├── components/
│   ├── common/
│   │   ├── ClearScreen.js        # 클리어 화면 (축하 애니메이션)
│   │   ├── FloatingElements.js   # 떠다니는 배경 요소 (별, 구름)
│   │   ├── GamePlaceholder.js    # 게임 로딩 플레이스홀더
│   │   ├── SvgAnimals.js         # SVG 동물 캐릭터
│   │   └── SvgIcons.js           # SVG 아이콘 모음
│   ├── games/
│   │   └── balloon-pop/
│   │       ├── Balloon.js        # 풍선 컴포넌트
│   │       ├── MissionBadge.js   # 미션 뱃지
│   │       ├── PopEffect.js      # 터트리기 이펙트
│   │       └── ScoreBoard.js     # 점수판
│   ├── home/
│   │   ├── GameCard.js           # 게임 선택 카드
│   │   ├── Logo.js               # 앱 로고
│   │   └── Mascot.js             # 마스코트 캐릭터
│   └── layout/
│       └── GameHeader.js         # 게임 공통 상단바
├── hooks/
│   └── useSound.js               # 효과음 커스텀 훅 (Howler.js)
├── lib/
│   ├── colorPlayData.js          # 색칠놀이 도안 데이터
│   ├── constants.js              # 앱 공통 상수
│   ├── numberCountData.js        # 숫자세기 문제 데이터
│   └── puzzleData.js             # 퍼즐 이미지 데이터
└── stores/
    ├── useGameStore.js           # 게임 공통 상태 (별, 진행도)
    └── useSettingsStore.js       # 설정 상태 (볼륨 등)
```

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| **프레임워크** | Next.js 14+ (App Router) |
| **언어** | JavaScript (ES2024) |
| **UI 라이브러리** | React 18+ |
| **스타일링** | Tailwind CSS + Stylus |
| **상태관리** | Zustand 4+ |
| **애니메이션** | Framer Motion 11+ |
| **사운드** | Howler.js 2+ |
| **드래그앤드롭** | @dnd-kit/core, @dnd-kit/sortable |

## 📋 개발 진행 상황

### MVP 완료
- [x] 프로젝트 초기 설정
- [x] 홈 화면 구현 (게임 카드 그리드, 마스코트, 배경 애니메이션)
- [x] 게임 공통 헤더 컴포넌트
- [x] 클리어 화면 (축하 애니메이션)
- [x] 색칠놀이 구현
- [x] 퍼즐맞추기 구현
- [x] 음악놀이 구현 (피아노, 실로폰, 드럼, 탬버린)
- [x] 풍선터트리기 구현 (자유 모드 + 미션 모드)
- [x] 숫자세기 구현
- [x] 효과음 훅 (useSound)
- [x] 전역 상태 관리 (Zustand)

### v2 예정
- [ ] 진행도 저장 (로컬 스토리지)
- [ ] 난이도 자동 조절
- [ ] 따라하기 모드 (음악 놀이)
- [ ] 부모 대시보드 (플레이 기록)
- [ ] 다국어 지원 (한국어/영어)
- [ ] 플레이 시간 제한 타이머
- [ ] 추가 도안/퍼즐/문제 확장팩

