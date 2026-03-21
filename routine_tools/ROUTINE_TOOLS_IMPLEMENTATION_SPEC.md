# Routine Tools Implementation Spec

## Purpose
- 이 문서는 `routine_tools` 안에서 실제로 교사가 바로 활용할 수 있는 핵심 생활 루틴 도구를 구현하기 위한 상세 명세서다.
- 기준은 `현장 활용도`, `반복 사용 빈도`, `설명 없이도 이해되는 직관성`, `낮은 조작 부담`이다.

## Product Scope
- 1차 버전에서는 아래 5개 도구만 우선 개발한다:
  1. 정리 시간 타이머
  2. 하루 일과 순서판
  3. 손씻기 순서 + 타이머
  4. 정리 순서 보드
  5. 오늘의 도우미/역할 보드

## Overall Design Principles

### 1. Teacher First
- 교사가 5초 안에 시작할 수 있어야 한다
- 설정이 복잡하면 안 된다
- 버튼 수를 최소화한다

### 2. Child Visible
- 멀리서도 보여야 한다
- 글씨는 크고 짧아야 한다
- 아이콘, 그림, 색상 변화가 핵심이다

### 3. Fullscreen Friendly
- TV, 전자칠판, 모니터, 태블릿에 띄워두기 쉬워야 한다
- 전체화면 버튼을 공통으로 제공한다

### 4. Low Maintenance
- 로그인 없이도 쓸 수 있어야 한다
- 기본값으로 바로 시작 가능해야 한다
- 저장은 선택 기능으로 두고 없어도 사용 가능해야 한다

## Common UI Requirements
- 공통 상단 요소:
  - 도구 이름
  - 전체화면 버튼
  - 음소거 버튼
  - 홈 버튼
- 공통 하단 또는 중앙 제어:
  - 시작
  - 일시정지
  - 다시 시작
- 공통 옵션:
  - 3분, 5분, 10분, 15분 버튼 또는 해당 도구에 맞는 프리셋
  - 직접 입력이 필요한 경우 보조로 제공

## Recommended Folder Structure

```text
routine_tools/
  README.md
  ROUTINE_TOOL_IDEAS.md
  ROUTINE_TOOLS_IMPLEMENTATION_SPEC.md
  cleanup_timer/
    index.html
  daily_schedule/
    index.html
  handwashing_timer/
    index.html
  cleanup_steps/
    index.html
  helper_board/
    index.html
```

## Tool 1. Cleanup Timer

### Goal
- 놀이 후 정리 시간을 아이들이 시각적으로 이해하도록 돕는다

### Core Use Cases
- 자유놀이 후 정리
- 미술 활동 후 정리
- 교구 정리
- 활동 전환 시간

### Required Features
- 시간 선택 버튼:
  - 3분
  - 5분
  - 10분
  - 15분
- 직접 입력
- 시작
- 일시정지
- 다시 시작
- 전체화면
- 음소거
- 종료 알림

### Visual Concepts
- 1차 구현은 `Rainbow Countdown`을 기본으로 한다
- 시간이 줄어들수록 무지개 띠가 줄어든다
- 중앙에 남은 시간 숫자를 크게 표시

### Screen Layout
- 상단:
  - 제목
  - 전체화면
  - 음소거
- 중앙:
  - 큰 무지개 또는 줄어드는 시각 요소
  - 남은 시간 숫자
  - 짧은 문구: `정리할 시간이에요`
- 하단:
  - 시간 선택 버튼
  - 시작/일시정지/다시 시작

### Nice To Have
- 마지막 30초 색상 변화
- 종료 시 `정리 끝` 메시지
- 배경 테마 변경

## Tool 2. Daily Schedule Board

### Goal
- 하루 일과를 현재-다음-이후 순서로 보여준다

### Core Use Cases
- 등원 직후
- 하루 흐름 안내
- 활동 전환 전 예고

### Required Features
- 기본 일과 카드 세트
- 현재 활동 강조
- 다음 활동 표시
- 순서 이동 버튼:
  - 이전
  - 다음
- 전체화면

### Screen Layout
- 상단:
  - 오늘의 일과
  - 현재 시간대 또는 현재 단계
- 중앙:
  - 현재 활동 카드 크게
  - 다음 활동 카드
  - 그다음 활동 카드
- 하단:
  - 이전/다음 버튼
  - 프리셋 불러오기

### Data Structure Example
```json
[
  { "label": "등원", "icon": "👋" },
  { "label": "자유놀이", "icon": "🧩" },
  { "label": "간식", "icon": "🍎" },
  { "label": "바깥놀이", "icon": "🏃" }
]
```

### Nice To Have
- 일과 프리셋 저장
- 그림 카드 교체

## Tool 3. Handwashing Steps + Timer

### Goal
- 손씻기 순서를 아이들이 보고 따라 하게 한다

### Core Use Cases
- 식사 전
- 화장실 후
- 실외활동 후

### Required Features
- 손씻기 단계 표시
- 20초 또는 30초 타이머
- 시작 버튼
- 자동 단계 진행 또는 단계별 클릭 진행
- 전체화면
- 음소거

### Step Example
1. 손에 물 묻히기
2. 비누 바르기
3. 손바닥 문지르기
4. 손등 닦기
5. 손가락 사이 닦기
6. 헹구기
7. 닦기

### Screen Layout
- 상단:
  - 손씻기 시간
- 중앙:
  - 현재 단계 그림
  - 현재 단계 문구
  - 남은 시간
- 하단:
  - 시작
  - 다시 시작
  - 단계 이동 버튼

### Nice To Have
- 비누 거품 애니메이션
- 단계 완료 효과음

## Tool 4. Cleanup Steps Board

### Goal
- 정리를 어떤 순서로 해야 하는지 단계별로 보여준다

### Core Use Cases
- 블록 정리
- 미술 도구 정리
- 책상 정리
- 교실 정리

### Required Features
- 3~5단계 순서 카드 표시
- 현재 단계 강조
- 완료 체크 표시
- 단계 이동 버튼
- 전체화면

### Step Example
1. 장난감을 상자에 넣어요
2. 책을 제자리에 놓아요
3. 의자를 정리해요
4. 손을 씻어요
5. 자리에 앉아요

### Screen Layout
- 상단:
  - 정리 순서
- 중앙:
  - 현재 단계 큰 카드
  - 전체 단계 리스트
- 하단:
  - 이전
  - 다음
  - 처음부터

### Nice To Have
- 완료된 단계는 색이 바뀜
- 마지막 단계 완료 시 칭찬 메시지

## Tool 5. Helper Board

### Goal
- 오늘의 도우미와 역할을 시각적으로 보여준다

### Core Use Cases
- 출석 도우미
- 간식 도우미
- 줄서기 도우미
- 정리 도우미

### Required Features
- 역할 카드 표시
- 이름 입력
- 사진 또는 아바타 선택 가능
- 랜덤 선택 버튼
- 수동 지정 가능
- 전체화면

### Screen Layout
- 상단:
  - 오늘의 도우미
- 중앙:
  - 역할별 큰 카드
  - 이름 또는 사진
- 하단:
  - 랜덤 뽑기
  - 수정
  - 초기화

### Data Example
```json
[
  { "role": "출석 도우미", "name": "민수" },
  { "role": "간식 도우미", "name": "지우" }
]
```

### Nice To Have
- 역할 아이콘
- 캐릭터 아바타
- 반 이름 표시

## Technical Recommendation

### Build Style
- 각 도구는 우선 `단일 index.html` 구조로 구현
- 이유:
  - 배포가 간단함
  - GitHub Pages 호환이 쉬움
  - 유지보수가 빠름

### Storage
- 저장은 선택사항
- 필요 시 `localStorage` 사용
- 저장 없이도 모든 도구 사용 가능해야 함

### Audio
- 기본은 `off` 또는 아주 약한 사용
- 교실에서는 무음으로 쓰는 경우도 많기 때문

## Release Order
1. cleanup_timer
2. daily_schedule
3. handwashing_timer
4. cleanup_steps
5. helper_board

## Definition Of Done
- 교사가 별도 설명 없이 바로 사용할 수 있다
- 전체화면에서 잘 보인다
- 텍스트보다 시각 요소가 중심이다
- 주요 버튼이 적고 분명하다
- 저장 없이도 실행 가능하다
- 각 도구가 실제 교실 루틴 하나를 직접 지원한다
