# 🌈 플래시 키즈 (Flash Kids)

1~7세 아이들을 위한 재미있고 교육적인 플래시 게임 모바일 앱

## 🎮 게임 목록

1. **🎨 색칠놀이** - 도안을 터치해서 색칠하기
2. **🧩 퍼즐맞추기** - 드래그앤드롭으로 퍼즐 조각 맞추기
3. **🎵 음악놀이** - 피아노/실로폰/드럼 연주하기
4. **🎈 풍선터트리기** - 올라오는 풍선 터치하기
5. **🔢 숫자세기** - 사물 개수를 세고 정답 선택하기

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
├── app/                    # Next.js App Router
│   ├── layout.js          # 루트 레이아웃
│   ├── page.js            # 홈 화면
│   └── games/             # 게임 페이지
├── components/            # React 컴포넌트
│   ├── home/             # 홈 화면 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── common/           # 공통 컴포넌트
├── stores/               # Zustand 상태 관리
├── hooks/                # 커스텀 훅
└── lib/                  # 유틸리티 및 상수
```

## 🛠 기술 스택

- **프레임워크**: Next.js 14+ (App Router)
- **언어**: JavaScript (ES2024)
- **UI**: React 18+
- **스타일**: Tailwind CSS + Stylus
- **상태관리**: Zustand
- **애니메이션**: Framer Motion
- **사운드**: Howler.js
- **드래그앤드롭**: @dnd-kit

## 📋 개발 진행 상황

- [x] 프로젝트 초기 설정
- [x] 홈 화면 구현
- [x] 기본 레이아웃 컴포넌트
- [ ] 색칠놀이 구현
- [ ] 퍼즐맞추기 구현
- [ ] 음악놀이 구현
- [ ] 풍선터트리기 구현
- [ ] 숫자세기 구현

## 📝 License

Private
