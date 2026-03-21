# 🎮 두뇌 짝 맞추기 — 게임 개발 가이드

> 이 문서는 `image_matching` 게임의 기획·설계·개발 전 과정을 기록한 레퍼런스입니다.
> 새로운 게임을 만들 때 이 문서를 템플릿으로 활용하세요.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 게임명 | 두뇌 짝 맞추기 |
| 경로 | `kidsbrainkr.github.io/age_5/image_matching/` |
| 배포 URL | https://kidsbrainkr.github.io/age_5/image_matching |
| 대상 | 아이들 / 교육 환경 |
| 파일 구조 | 단일 `index.html` (HTML + CSS + JS 전부 포함) |

---

## 2. 게임 모드 구조

```
게임 진입
│
├── 모드 선택 화면 (screen-mode)
│     │
│     ├── 기본 기억력 게임 (emoji mode)
│     │     └── 기존 카테고리 카드 짝맞추기
│     │
│     └── 친구 얼굴 이름 맞추기 (friend mode)
│           └── 사진 카드 ↔ 이름 카드 매칭
```

### 모드별 화면 흐름

#### Emoji Mode
```
screen-mode → screen-start → screen-game → screen-result
```

#### Friend Mode
```
screen-mode → screen-friend-setup → screen-game → screen-result
                    ↕
              modal-friend-sets (불러오기)
```

---

## 3. 화면 목록 (Screen IDs)

| ID | 설명 |
|---|---|
| `screen-mode` | 게임 모드 선택 |
| `screen-start` | Emoji 모드 설정 |
| `screen-friend-setup` | 친구 등록 / 세트 관리 |
| `screen-game` | 게임 보드 (공용) |
| `screen-result` | 결과 / 랭킹 |
| `modal-records` | 기록 모달 |
| `modal-friend-sets` | 저장된 친구 세트 모달 |
| `timeup-overlay` | 시간 초과 오버레이 |
| `player-transition` | 멀티플레이어 전환 오버레이 |

---

## 4. 데이터 모델

### 4-1. Emoji Mode — 카드 구조

```javascript
// 한 카드
{
  id: 'apple',         // 카테고리 내 고유 ID
  name: '사과',         // 표시 이름
  emoji: '🍎',          // 이모지
  uid: 'apple-A',      // 덱 내 고유 ID (A/B 한 쌍)
}
```

### 4-2. Friend Mode — 카드 구조

```json
// 사진 카드
{
  "cardId": "card_student_001_photo",
  "studentId": "student_001",
  "cardType": "photo",
  "displayValue": "민수",
  "imageData": "data:image/png;base64,...",
  "uid": "student_001-photo"
}

// 이름 카드
{
  "cardId": "card_student_001_name",
  "studentId": "student_001",
  "cardType": "name",
  "displayValue": "민수",
  "uid": "student_001-name"
}
```

### 4-3. Friend Mode — 학생 구조

```javascript
{
  studentId: 'student_1234567890_abc',  // 자동 생성
  displayName: '민수',
  photoData: 'data:image/png;base64,...',  // FileReader로 변환
  photoFileName: 'minsu.jpg',
}
```

### 4-4. LocalStorage 키 구조

| 키 | 내용 |
|---|---|
| `bmg.best` | Emoji 모드 최고 기록 |
| `bmg.recent` | Emoji 모드 최근 기록 |
| `bmg.settings` | 사용자 설정 |
| `imageMatching.friendSets` | 저장된 친구 세트 목록 |
| `imageMatching.friendGameRecords` | 친구 게임 기록 |

### 4-5. 친구 세트 저장 구조

```json
[
  {
    "setId": "set_1742567890_x3k9",
    "className": "무지개반",
    "ownerName": "선생님A",
    "createdAt": "2026-03-21T12:00:00.000Z",
    "students": [
      {
        "studentId": "student_001",
        "displayName": "민수",
        "photoData": "data:image/png;base64,...",
        "photoFileName": "minsu.jpg"
      }
    ]
  }
]
```

---

## 5. 매칭 규칙

### Emoji Mode
```
카드 A.id === 카드 B.id → 매칭 성공
```

### Friend Mode
```
카드 A.studentId === 카드 B.studentId
  AND
카드 A.cardType !== 카드 B.cardType  (photo ↔ name)
→ 매칭 성공

// 둘 다 photo 또는 둘 다 name → 즉시 실패 + shake 애니메이션
```

---

## 6. 저장 정책 (Privacy-First)

| 설정 | 기본값 | 설명 |
|---|---|---|
| `saveMode` | `none` | 저장 안 함 (세션 종료 시 삭제) |
| `photoSaveEnabled` | `false` | 사진 LocalStorage 저장 비활성 |
| `recordSaveEnabled` | `false` | 게임 기록 저장 비활성 |

### saveMode 값
- `none` — 저장 안 함 (1회성 플레이)
- `local` — 현재 기기 LocalStorage에 저장
- `server` — 서버 저장 (v2 이후 구현 예정)

### 저장 버튼 활성화 조건
```
saveMode === 'local'
AND photoSaveEnabled === true
AND 모든 학생 이름 + 사진 입력 완료
```

---

## 7. 핵심 State 구조

```javascript
// 공용 게임 상태
const state = {
  gameMode: 'emoji',          // 'emoji' | 'friend'
  settings: {
    playerCount: 1,
    playerNames: ['플레이어 1'],
    previewSeconds: 10,
    cardCount: 12,
    bgmEnabled: true,
    sfxEnabled: true,
    category: 'fruit',
    timeLimit: 0,
  },
  deck: [],
  currentPlayerIndex: 0,
  openedCards: [],
  matchedCardIds: new Set(),
  isPreviewPhase: false,
  isBusy: false,
  startTime: null,
  timerInterval: null,
  previewTimer: null,
  timeLimitInterval: null,
  timeLeft: 0,
  moves: 0,
  combo: 0,
  maxCombo: 0,
  playerResults: [],
  bestRecords: {},
  recentRecords: [],
};

// Friend Mode 전용 상태
const friendState = {
  className: '',
  ownerName: '',
  saveMode: 'none',
  photoSaveEnabled: false,
  recordSaveEnabled: false,
  students: [],           // [{studentId, displayName, photoData, photoFileName}]
  currentSetId: null,     // 불러온 세트의 ID (null이면 신규)
};
```

---

## 8. 카테고리 구조 (Emoji Mode)

```javascript
const CARD_CATEGORIES = {
  fruit:   { label: '🍎 과일',   cards: [...18개 이모지...] },
  animal:  { label: '🐶 동물',   cards: [...18개 이모지...] },
  vehicle: { label: '🚗 탈것',   cards: [...18개 이모지...] },
  food:    { label: '🍕 음식',   cards: [...18개 이모지...] },
  sports:  { label: '⚽ 스포츠', cards: [...18개 이모지...] },
  space:   { label: '🚀 우주',   cards: [...18개 이모지...] },
  sea:     { label: '🐟 바다',   cards: [...18개 이모지...] },
  weather: { label: '⛅ 날씨',   cards: [...18개 이모지...] },
  magic:   { label: '🦄 판타지', cards: [...18개 이모지...] },
  veggie:  { label: '🥦 채소',   cards: [...18개 이모지...] },
};
```

> 새 카테고리 추가 시: 객체에 키 추가 + HTML 버튼 1개 추가만 하면 됨

---

## 9. 구현된 기능 목록

### v1 (초기 구축)
- [x] 이모지 카드 짝맞추기 (과일 18종)
- [x] 카드 뒤집기 애니메이션 (CSS 3D flip)
- [x] 프리뷰 페이즈 (카드 공개 후 뒤집기)
- [x] BGM + 효과음 (Web Audio API, 파일 없이 합성)
- [x] 멀티플레이어 (최대 4명 순차 플레이)
- [x] LocalStorage 기록 저장
- [x] File System API 기록 저장 (JSON 파일)

### v2 (고도화)
- [x] 카테고리 10종 추가 (동물/탈것/음식/스포츠/우주/바다/날씨/판타지/채소)
- [x] 콤보 시스템 (연속 매칭 팝업)
- [x] 제한 시간 모드 (없음/1분/1분30초/2분/3분)
- [x] 모바일 반응형 CSS

### v3 (친구 모드)
- [x] 게임 모드 선택 화면
- [x] 친구 등록 UI (이름 + 사진 업로드)
- [x] 사진 카드 ↔ 이름 카드 매칭
- [x] 저장 안 함 / 기기에 저장 모드
- [x] 저장된 세트 불러오기 / 삭제
- [ ] 서버 저장 (v4 보류 — Firebase 인프라 결정 필요)

### v5 (얼굴 짝맞추기 모드)
- [x] 얼굴-얼굴 매칭 모드 (Mode 3) 추가
- [x] 같은 친구 사진 두 장 짝맞추기
- [x] 친구 등록 화면 재활용 (별도 UI 없음)
- [x] face 모드 전용 덱 빌드 (buildFaceDeck)

---

## 10. 새 게임 모드 추가 방법 (템플릿)

### Step 1 — 모드 선택 화면에 버튼 추가
```html
<!-- screen-mode 안에 -->
<button class="mode-card" id="btn-mode-NEW">
  <div class="mode-icon">🆕</div>
  <h3>새 게임 이름</h3>
  <p>설명</p>
</button>
```

### Step 2 — 전용 설정 화면 추가
```html
<div id="screen-NEW-setup" class="screen">
  <!-- 새 게임의 설정 UI -->
</div>
```

### Step 3 — State에 모드 추가
```javascript
// state.gameMode에 새 값 추가
// 'emoji' | 'friend' | 'NEW'
```

### Step 4 — 덱 빌드 함수 추가
```javascript
function buildNEWDeck() {
  // 새 게임의 카드 배열 생성
  // 반드시 각 카드에 uid 필드 포함
  return shuffle(deck);
}
```

### Step 5 — renderCards() 분기 추가
```javascript
if (state.gameMode === 'NEW') {
  // 새 카드 렌더링 로직
}
```

### Step 6 — checkMatch() 분기 추가
```javascript
if (state.gameMode === 'NEW') {
  isMatch = /* 새 매칭 조건 */;
}
```

### Step 7 — startRound() 분기 추가
```javascript
if (state.gameMode === 'NEW') {
  state.deck = buildNEWDeck();
  // 필요한 초기화 추가
}
```

### Step 8 — 이벤트 리스너 연결
```javascript
document.getElementById('btn-mode-NEW').addEventListener('click', () => {
  state.gameMode = 'NEW';
  showScreen('NEW-setup');
});
```

---

## 11. 카드 CSS 패턴

### 기본 카드 구조
```html
<div class="card [타입클래스]" data-uid="uid값">
  <div class="card-inner">
    <div class="card-face-down"><!-- 뒷면 --></div>
    <div class="card-face-up"><!-- 앞면 --></div>
  </div>
</div>
```

### 상태 클래스
| 클래스 | 설명 |
|---|---|
| `.flipped` | 앞면이 보이는 상태 |
| `.matched` | 매칭 완료 |
| `.wrong-type` | 틀린 타입 선택 (shake 애니메이션) |

---

## 12. 오디오 시스템

Web Audio API를 사용해 파일 없이 합성음 사용 (네트워크 의존 없음)

| 함수 | 용도 |
|---|---|
| `AudioSys.playFlip()` | 카드 뒤집을 때 |
| `AudioSys.playMatch()` | 매칭 성공 |
| `AudioSys.playWin()` | 게임 완료 |
| `AudioSys.startBGM()` | 배경음악 시작 |
| `AudioSys.stopBGM()` | 배경음악 정지 |

---

## 13. 개발 규칙

- 모든 코드는 `index.html` 단일 파일 (외부 의존 없음)
- 이미지는 Base64로 변환해서 사용 (외부 URL 없음)
- LocalStorage 외 서버 통신 없음 (v3까지)
- 개인정보 기본값: 저장 안 함
- 카드 이모지는 반드시 주요 브라우저 지원 이모지만 사용

---

## 14. 파일 경로

```
kidsbrainkr.github.io/
├── index.html              ← 메인 페이지 (게임 목록)
├── age_2/                  ← 만 2세 게임
├── age_3/                  ← 만 3세 게임
├── age_4/                  ← 만 4세 게임
├── age_5/                  ← 만 5세 게임
│   └── image_matching/
│       └── index.html      ← 💡 두뇌 쑥쑥 짝맞추기
├── mixed/                  ← 혼합 연령 게임
├── AGE_GAME_MASTER_PLAN.md
└── GAME_DEV_GUIDE.md       ← 이 문서
```

---

## 15. 향후 로드맵

| 버전 | 내용 |
|---|---|
| v4 | 서버 저장 (기관코드 + 반 이름 기반) — **보류** (Firebase 인프라 결정 필요) |
| v5 | 친구 얼굴-얼굴 매칭 모드 (Mode 3) — **완료** |
| v6 | 메인 페이지 (`index.html`) — 게임 목록 — **다음 작업** |
| v7 | 새 게임 추가 (수 세기, 알파벳 등) |
