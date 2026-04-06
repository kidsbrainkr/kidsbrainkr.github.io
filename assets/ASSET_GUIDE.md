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
│   └── PROMPTS.md           ← 생성 프롬프트
│
├── game_items/              ← 게임 내 이모지 대체 이미지
│   ├── animals/             ← 동물 (게임에서 이모지 대신 사용)
│   │   ├── dog.png          ← 🐶 대체
│   │   ├── cat.png          ← 🐱 대체
│   │   ├── rabbit.png       ← 🐰 대체
│   │   ├── bear.png         ← 🐻 대체
│   │   ├── fox.png          ← 🦊 대체
│   │   ├── owl.png          ← 🦉 대체
│   │   ├── penguin.png      ← 🐧 대체
│   │   ├── frog.png         ← 🐸 대체
│   │   ├── tiger.png        ← 🐯 대체
│   │   └── lion.png         ← 🦁 대체
│   │
│   ├── fruits/              ← 과일/음식
│   │   ├── apple.png        ← 🍎 대체
│   │   ├── banana.png       ← 🍌 대체
│   │   ├── grape.png        ← 🍇 대체
│   │   ├── orange.png       ← 🍊 대체
│   │   ├── strawberry.png   ← 🍓 대체
│   │   ├── watermelon.png   ← 🍉 대체
│   │   ├── lemon.png        ← 🍋 대체
│   │   └── peach.png        ← 🍑 대체
│   │
│   ├── vehicles/            ← 탈것
│   │   ├── car.png          ← 🚗 대체
│   │   ├── bus.png          ← 🚌 대체
│   │   ├── train.png        ← 🚂 대체
│   │   ├── airplane.png     ← ✈️ 대체
│   │   ├── rocket.png       ← 🚀 대체
│   │   ├── bicycle.png      ← 🚲 대체
│   │   └── ship.png         ← 🚢 대체
│   │
│   ├── shapes/              ← 도형
│   │   ├── circle.png       ← ⭕ 대체
│   │   ├── triangle.png     ← 🔺 대체
│   │   ├── square.png       ← ⬜ 대체
│   │   ├── star.png         ← ⭐ 대체
│   │   └── diamond.png      ← 🔷 대체
│   │
│   ├── nature/              ← 자연
│   │   ├── flower.png       ← 🌸 대체
│   │   ├── tree.png         ← 🌳 대체
│   │   ├── sun.png          ← ☀️ 대체
│   │   ├── moon.png         ← 🌙 대체
│   │   └── rainbow.png      ← 🌈 대체
│   │
│   └── household/           ← 생활용품
│       ├── cup.png          ← 🥤 대체
│       ├── book.png         ← 📚 대체
│       ├── pencil.png       ← ✏️ 대체
│       └── clock.png        ← 🕐 대체
│
└── thumbnails/              ← 게임 카드 썸네일 (캐릭터별)
    ├── fairy/               ← 별이 버전
    │   ├── color_finder.png
    │   ├── same_picture.png
    │   └── ... (게임 id.png)
    ├── robot/               ← 볼트 버전
    │   └── ...
    └── dino/                ← 꾸미 버전
        └── ...
```

## 이미지 규격

| 용도 | 크기 | 형식 | 배경 |
|------|------|------|------|
| 캐릭터 프로필 | 512×512 | PNG | 투명 |
| 캐릭터 시트 | 1024×576 | PNG | 투명 |
| 게임 아이템 | 256×256 | PNG | 투명 |
| 게임 썸네일 | 400×300 | PNG | 그라데이션 OK |

## 이미지 생성 프롬프트 (game_items용)

### 공통 스타일
```
2D sticker illustration, soft 3D depth, subtle drop shadow,
thick clean dark outline, kawaii style, rounded shapes,
transparent background, PNG alpha, no background,
ONE item only, centered, no text.
Style: same as LINE stickers, cute and child-friendly.
```

### 예시: 동물
```
2D sticker illustration of a cute [animal name], soft 3D depth,
thick dark outline, kawaii style, big eyes, rosy cheeks,
transparent background, PNG alpha, centered.
ONE character only, no variations.
```

## 기존 에셋 복사 (image_set_agent → game_items)

image_set_agent/sets/에 이미 생성된 에셋이 있으면 복사:
```bash
# 동물
cp sets/animals/animals_01_bear.png assets/game_items/animals/bear.png
cp sets/animals/animals_01_dog.png assets/game_items/animals/dog.png
# 과일
cp sets/fruits_and_food/fruits_and_food_01_apple.png assets/game_items/fruits/apple.png
```

## 게임별 사용 아이템 매핑

| 게임 | 사용 카테고리 | 우선순위 |
|------|-------------|---------|
| age_3/animal_food | animals + fruits | HIGH |
| age_3/easy_matching | animals + fruits + vehicles | HIGH |
| age_3/shadow_matching | animals + fruits | HIGH |
| age_2/same_picture | animals + fruits | MEDIUM |
| age_2/sound_match | animals | MEDIUM |
| age_4/pattern_complete | animals + fruits + shapes | MEDIUM |
| age_5/image_matching | animals + fruits + vehicles | HIGH (이미 인프라 있음) |
| age_2/color_basket | fruits (색상별) | LOW |
