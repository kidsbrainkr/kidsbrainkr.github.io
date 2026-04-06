# Routine Tools Implementation Spec

## Scope (1차 5종)
1. cleanup_timer · 2. daily_schedule · 3. handwashing_timer · 4. cleanup_steps · 5. helper_board

## Design Principles
| 원칙 | 핵심 |
|------|------|
| Teacher First | 5초 안에 시작, 최소 버튼 |
| Child Visible | 큰 글씨, 아이콘/색상 중심, 멀리서 가시성 |
| Fullscreen Friendly | TV/전자칠판/태블릿 공통 전체화면 |
| Low Maintenance | 로그인 불필요, 기본값 즉시 시작, 저장은 선택 |

## Folder Structure
```
routine_tools/
  cleanup_timer/index.html
  daily_schedule/index.html
  handwashing_timer/index.html
  cleanup_steps/index.html
  helper_board/index.html
```

## Common UI
- **상단:** 도구 이름 · 전체화면 · 음소거 · 홈
- **제어:** 시작 · 일시정지 · 다시 시작
- **프리셋:** 3분/5분/10분/15분 (도구별 조정 가능)

## Tool Specs

**1. Cleanup Timer** — Rainbow Countdown, 시간 감소에 따라 무지개 띠 축소, 중앙 큰 숫자, `정리할 시간이에요`

**2. Daily Schedule Board** — 현재/다음/그다음 카드 표시, 이전/다음 버튼
```json
[{"label":"등원","icon":"👋"},{"label":"자유놀이","icon":"🧩"},{"label":"간식","icon":"🍎"},{"label":"바깥놀이","icon":"🏃"}]
```

**3. Handwashing Timer** — 단계: 물 묻히기→비누→손바닥→손등→손가락 사이→헹구기→닦기 / 20~30초 타이머

**4. Cleanup Steps Board** — 3~5단계 순서 카드, 현재 단계 강조, 완료 체크
예시: 장난감→상자 → 책→제자리 → 의자 정리 → 손 씻기 → 자리 앉기

**5. Helper Board** — 역할 카드 + 이름 입력, 랜덤 선택 또는 수동 지정
```json
[{"role":"출석 도우미","name":"민수"},{"role":"간식 도우미","name":"지우"}]
```

## Technical Decisions
- **Build:** 각 도구 단일 `index.html` (GitHub Pages 호환)
- **Storage:** 선택사항 (`localStorage`), 저장 없이 전체 기능 사용 가능
- **Audio:** 기본 off (교실 무음 사용 빈번)

## Release Order
1 → 2 → 3 → 4 → 5

## Definition Of Done
- 설명 없이 바로 사용 가능 · 전체화면에서 잘 보임
- 시각 요소 중심 · 저장 없이 실행 가능
