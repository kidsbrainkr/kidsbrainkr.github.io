# 이미지 에셋 가이드

이미지를 생성해서 해당 폴더에 넣으면 게임에서 자동으로 사용됩니다.

## 폴더 구조

```
assets/
├── characters/              ← 메인 캐릭터 3종 (완료)
│   ├── fairy_profile.png    ← 별이 프로필
│   ├── fairy_sheet.png      ← 별이 시트
│   ├── robot_profile.png    ← 볼트 프로필
│   ├── robot_sheet.png      ← 볼트 시트
│   ├── dino_profile.png     ← 꾸미 프로필
│   ├── dino_sheet.png       ← 꾸미 시트
│   ├── PROMPTS.md           ← 규칙/템플릿
│   └── PROMPTS_CHARACTERS.md ← 캐릭터별 상세 프롬프트
│
├── game_items/              ← 게임 내 이모지 대체 이미지
│   ├── animals/             ← 동물 (18개 목표)
│   ├── fruits/              ← 과일/음식 (10개 목표)
│   ├── vehicles/            ← 탈것 (8개 목표)
│   ├── shapes/              ← 도형 (5개 목표)
│   ├── nature/              ← 자연 (5개 목표)
│   ├── household/           ← 생활용품 (4개)
│   ├── IMAGE_REQUEST.md     ← 아이템 목록
│   └── IMAGE_REQUEST_STEPS.md ← 생성/저장 절차
│
├── prompts/                 ← GENERATION_PROMPTS 분리 파일
│   ├── items_ui.md          ← Animals + Fruits + UI Icons
│   ├── learning_rewards.md  ← Learning Objects + Rewards
│   └── backgrounds.md       ← Background Scenes
│
├── thumbnails/              ← 게임 카드 썸네일 (캐릭터별)
│   ├── fairy/ robot/ dino/
│
├── GENERATION_PROMPTS.md    ← 공통 스타일 + 인덱스
└── ASSET_GUIDE.md           ← 이 파일
```

## 이미지 규격

| 용도 | 크기 | 형식 | 배경 |
|------|------|------|------|
| 캐릭터 프로필 | 512×512 | PNG | 투명 |
| 캐릭터 시트 | 1024×576 | PNG | 투명 |
| 게임 아이템 | 256×256 | PNG | 투명 |
| 게임 썸네일 | 400×300 | PNG | 그라데이션 OK |

## 프롬프트 공통 스타일

`GENERATION_PROMPTS.md` 참조. 핵심: "2D sticker with soft 3D depth" — LINE 스티커 스타일.

## 기존 에셋 복사 (image_set_agent → game_items)

```bash
# image_set_agent/sets/에 이미 생성된 에셋이 있으면 복사
cp sets/animals/animals_01_bear.png assets/game_items/animals/bear.png
cp sets/fruits_and_food/fruits_and_food_01_apple.png assets/game_items/fruits/apple.png
```

## 게임별 사용 아이템 매핑

| 게임 | 카테고리 | 우선순위 |
|------|---------|---------|
| age_3/animal_food, easy_matching, shadow_matching | animals + fruits | HIGH |
| age_2/same_picture, sound_match | animals + fruits | MEDIUM |
| age_4/pattern_complete | animals + fruits + shapes | MEDIUM |
| age_5/image_matching | animals + fruits + vehicles | HIGH |
| age_2/color_basket | fruits (색상별) | LOW |
