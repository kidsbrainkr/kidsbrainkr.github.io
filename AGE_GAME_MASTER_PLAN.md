# KidsBrain Age Game Master Plan

## Purpose
- 이 문서는 `kidsbrainkr.github.io` 안에서 연령별 게임을 확장하기 위한 기준 문서다.
- 현재 기준 레퍼런스는 `age_5/image_matching/index.html`과 `GAME_DEV_GUIDE.md`다.
- 새 게임도 우선은 `단일 index.html` 구조로 빠르게 제작하는 것을 기본 원칙으로 한다.

## Reference Pattern From `image_matching`
- 단일 파일 구조:
  - `index.html` 안에 HTML, CSS, JavaScript를 함께 둠
- 공통 화면 흐름:
  - 모드 또는 설정 화면
  - 실제 게임 화면
  - 결과 화면
- 공통 상태 관리:
  - `state` 객체 기반
  - 설정, 덱, 타이머, 점수, 결과를 한 곳에서 관리
- 공통 장점:
  - 배포가 쉬움
  - GitHub Pages에 올리기 쉬움
  - 빠르게 프로토타입 제작 가능

## Global Design Rule By Age

### Younger Age = Fewer Features
- 나이가 어릴수록 설정 버튼, 텍스트, 기록 기능을 줄인다
- 화면 내 선택지는 최대한 적게 유지한다
- 조작 방식은 클릭 1회 또는 드래그 1회 수준으로 단순화한다

### Younger Age = Bigger Visuals
- 이미지 크기를 크게 쓴다
- 카드나 버튼이 화면을 더 많이 채우도록 한다
- 글자는 짧게, 시각 요소는 크게 둔다

### Older Age = More Rules
- 만 4세~5세부터는 기억, 순서, 이름 매칭, 시간 제한 등을 일부 넣을 수 있다
- 그래도 1차 버전은 규칙 1개 중심으로 설계한다

## Folder Structure

```text
kidsbrainkr.github.io/
  age_5/
    image_matching/         ← 💡 두뇌 쑥쑥 짝맞추기
      index.html
  age_2/
    README.md
  age_3/
    README.md
  age_4/
    README.md
  age_5/
    README.md
  mixed/
    README.md
  AGE_GAME_MASTER_PLAN.md
  GAME_DEV_GUIDE.md
```

## Development Rule For New Games
- 각 새 게임은 아래 중 하나를 따르도록 한다:
  - `image_matching`을 복제해서 모드/데이터만 바꾸기
  - 같은 구조로 새 단일 `index.html` 만들기
- 공통 재사용 추천 항목:
  - `screen-*` 전환 패턴
  - `state` 객체
  - 결과 화면
  - 오디오 on/off
  - LocalStorage 기록 저장

## Recommended Game Expansion Order
1. `age_5` 중심으로 `image_matching` 고도화
2. `age_4`용 기억/위치/패턴 게임 확장
3. `age_3`용 쉬운 짝맞추기/분류 게임 제작
4. `age_2`용 초간단 터치/선택 게임 제작
5. `mixed`용 난이도 선택형 게임 구성

## Common Output Format For Each Age Folder
- 각 폴더 README에는 아래 내용을 넣는다:
  - 연령 특징
  - UI 기준
  - 추천 게임 목록
  - 각 게임의 핵심 규칙
  - 필요한 리소스
  - `image_matching`에서 재사용할 요소
  - 1차 구현 우선순위

## Important Positioning
- `image_matching`은 기본적으로 `age_4`와 `age_5`에 걸친 핵심 레퍼런스 게임이다
- `친구 얼굴 이름 매칭`은 `image_matching`의 `age_5` 확장 모드로 본다
- 어린 연령 게임은 `image_matching`보다 더 단순하고 더 큰 UI가 되어야 한다
