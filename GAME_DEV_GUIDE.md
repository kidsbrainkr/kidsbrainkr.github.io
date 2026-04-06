# 두뇌 짝 맞추기 — 게임 개발 가이드

> `image_matching` 게임 기획·설계 레퍼런스. 새 게임 템플릿으로 활용.

## 프로젝트 개요
- 경로: `kidsbrainkr.github.io/age_5/image_matching/`
- 파일 구조: 단일 `index.html` (HTML + CSS + JS 전부 포함)

## 게임 모드 & 화면 구조

```
게임 진입
├── Emoji Mode: screen-mode → screen-start → screen-game → screen-result
├── Friend Mode: screen-mode → screen-friend-setup → screen-game → screen-result
└── Face Mode: 친구 등록 화면 재활용, face 전용 덱 빌드
```

**Screen IDs:** `screen-mode` · `screen-start` · `screen-friend-setup` · `screen-game` · `screen-result` · `modal-records` · `modal-friend-sets` · `timeup-overlay` · `player-transition`

## 데이터 모델

**카드 구조**
- Emoji: `{ id, name, emoji, uid }` (uid: `apple-A`/`apple-B` 한 쌍)
- Friend: 사진 카드 `{ cardId, studentId, cardType:"photo", displayValue, imageData, uid }` + 이름 카드 `{ cardType:"name" }`
- 학생: `{ studentId, displayName, photoData(base64), photoFileName }`

**LocalStorage 키:** `bmg.best` · `bmg.recent` · `bmg.settings` · `imageMatching.friendSets` · `imageMatching.friendGameRecords`

## 매칭 규칙

| 모드 | 조건 |
|------|------|
| Emoji | `카드A.id === 카드B.id` |
| Friend | `카드A.studentId === 카드B.studentId AND cardType 다름` |
| Face | `카드A.studentId === 카드B.studentId` (둘 다 photo) |

> Friend Mode에서 같은 cardType 선택 시 즉시 실패 + shake 애니메이션

## 저장 정책 (Privacy-First)

| 설정 | 기본값 |
|------|--------|
| `saveMode` | `none` (세션 종료 시 삭제) |
| `photoSaveEnabled` | `false` |
| `recordSaveEnabled` | `false` |

`saveMode` 값: `none` / `local` / `server` (v4 이후 예정)

## 카테고리 (Emoji Mode)
10종: `fruit` · `animal` · `vehicle` · `food` · `sports` · `space` · `sea` · `weather` · `magic` · `veggie` (각 18개)
> 새 카테고리: `CARD_CATEGORIES` 객체에 키 추가 + HTML 버튼 1개

## 구현 현황

| 버전 | 주요 기능 | 상태 |
|------|-----------|------|
| v1~2 | 이모지 짝맞추기, 3D flip, BGM/SFX, 멀티플레이어(4명), 카테고리 10종, 콤보, 제한시간 | 완료 |
| v3 | 모드 선택, 친구 등록 UI, 사진↔이름 매칭, 저장 모드 | 완료 |
| v5 | 얼굴-얼굴 매칭, buildFaceDeck | 완료 |
| v4 | 서버 저장 (Firebase) | 보류 |
| v6 | 메인 페이지 게임 목록 | 다음 |

## 새 게임 모드 추가 체크리스트
1. `screen-mode`에 모드 선택 버튼 추가
2. 전용 설정 화면 `screen-NEW-setup` 추가
3. `state.gameMode`에 새 값 추가
4. `buildNEWDeck()` 함수 추가 (각 카드에 `uid` 필수)
5. `renderCards()`에 분기 추가
6. `checkMatch()`에 매칭 조건 분기 추가
7. `startRound()`에 덱 빌드 분기 추가
8. 이벤트 리스너: `btn-mode-NEW` → `showScreen('NEW-setup')`

## 카드 CSS 패턴
```html
<div class="card" data-uid="uid값">
  <div class="card-inner">
    <div class="card-face-down"></div>
    <div class="card-face-up"></div>
  </div>
</div>
```
클래스: `.flipped` (앞면) · `.matched` (매칭 완료) · `.wrong-type` (shake)

## 오디오 (Web Audio API — 파일/네트워크 의존 없음)
`AudioSys.playFlip()` · `AudioSys.playMatch()` · `AudioSys.playWin()` · `AudioSys.startBGM()` / `stopBGM()`

## 개발 규칙
- 단일 파일: 모든 코드는 `index.html` 하나 (외부 의존 없음)
- 이미지: Base64 변환 · 네트워크: LocalStorage 외 서버 통신 없음 (v3까지)
- 프라이버시: 개인정보 기본값 = 저장 안 함
