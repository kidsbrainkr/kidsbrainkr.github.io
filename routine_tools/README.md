# Routine Tools

## Purpose
- 이 폴더는 게임과 별도로 사용하는 `생활 루틴 지원 도구`를 정리하는 공간이다.
- 대상은 어린이집, 유치원, 놀이방 같은 환경이며, 아이들이 시간 흐름을 눈으로 보며 스스로 정리와 역할 수행을 하도록 돕는 데 목적이 있다.

## Product Direction
- 게임이 아니라 `교실 보조 도구`로 본다
- 교사가 시작만 해두면 자동으로 진행되는 구조가 좋다
- TV, 모니터, 태블릿, 노트북에 띄워두기 쉬워야 한다

## Core Functions
- 시간 설정:
  - 3분
  - 5분
  - 10분
  - 15분
  - 직접 입력
- 제어:
  - 시작
  - 일시정지
  - 다시시작
  - 전체화면
  - 음소거
- 표시:
  - 남은 시간 숫자
  - 시각적으로 줄어드는 요소
  - 정리 유도 문구

## Recommended Concepts

### 1. Rainbow Countdown
- 큰 무지개가 있고 시간이 줄어들수록 띠가 사라진다
- 가장 직관적이고 범용적이다
- 만 2세~4세에 특히 적합

### 2. Character Friends Countdown
- 캐릭터 얼굴 개수가 시간 경과에 따라 하나씩 사라진다
- 개수 개념과 남은 시간을 함께 보여줄 수 있다
- 만 2세~5세 전체에 적용 가능

### 3. Clean-Up Rocket Gauge
- 로켓이나 기차가 목적지로 이동하며 시간이 줄어든다
- 목표 지향성이 있어 만 4세~5세에 잘 맞는다

## Suggested Folder Growth
- 이후 실제 구현 시 아래처럼 나눌 수 있다:

```text
routine_tools/
  README.md
  rainbow_countdown/
  character_countdown/
  rocket_gauge/
```

## First Build Priority
1. Rainbow Countdown
2. Character Friends Countdown
3. Clean-Up Rocket Gauge

## Related Docs
- 현재 컨셉 상세 메모는 아래 문서에 정리되어 있다:
  - `kidsbrainkr.github.io/CLEANUP_TIMER_CONCEPTS.md`
