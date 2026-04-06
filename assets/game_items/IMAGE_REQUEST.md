# 게임 아이템 이미지 생성 요청서

## 공통 규격
- **크기**: 256×256px
- **형식**: PNG (투명 배경)
- **스타일**: 2D sticker, soft 3D depth, thick clean dark outline, kawaii style, rounded shapes
- **레퍼런스**: 같은 프로젝트의 `animals/bear.png`, `fruits/apple.png` 스타일과 동일하게
- **저장 경로**: `/Users/yunsu/dev/10_sub_agents/kids_game/kidsbrainkr.github.io/assets/game_items/{카테고리}/`

## 공통 프롬프트 템플릿
```
2D sticker illustration of a cute [아이템명], soft 3D depth, subtle drop shadow,
thick clean dark outline, kawaii style, big eyes, rosy cheeks (동물일 경우),
rounded shapes, centered, 256x256px,
transparent background, PNG alpha, no background,
ONE item only, no variations, no text.
Style: LINE stickers, cute and child-friendly.
```

---

## 1. animals/ (동물) — 12개 필요

| 파일명 | 프롬프트 키워드 | 참고 |
|--------|----------------|------|
| `penguin.png` | cute baby penguin, black and white with orange feet and beak | 🐧 대체 |
| `frog.png` | cute green frog sitting, big round eyes, smiling | 🐸 대체 |
| `tiger.png` | cute baby tiger, orange with black stripes, friendly face | 🐯 대체 |
| `lion.png` | cute baby lion with small mane, golden color, happy | 🦁 대체 |
| `koala.png` | cute koala holding onto branch, gray fluffy, big nose | 🐨 대체 |
| `cow.png` | cute spotted cow, black and white, bell on neck | 🐮 대체 |
| `pig.png` | cute pink pig, curly tail, round snout | 🐷 대체 |
| `chicken.png` | cute chicken, white body, red comb, yellow beak | 🐔 대체 |
| `chick.png` | tiny yellow baby chick, fluffy, small wings | 🐥 대체 |
| `monkey.png` | cute brown monkey, long tail, playful pose | 🐵 대체 |
| `squirrel.png` | cute squirrel holding acorn, bushy tail, brown | 🐿️ 대체 |
| `panda.png` | cute baby panda, black and white, eating bamboo | 🐼 대체 |

## 2. fruits/ (과일) — 3개 필요

| 파일명 | 프롬프트 키워드 | 참고 |
|--------|----------------|------|
| `peach.png` | cute peach fruit with leaf, pink-orange gradient, soft blush | 🍑 대체 |
| `cherry.png` | two cute red cherries on stem with leaf, shiny | 🍒 대체 |
| `pineapple.png` | cute pineapple with green leaves on top, yellow body with pattern | 🍍 대체 |

## 3. vehicles/ (탈것) — 8개 필요

| 파일명 | 프롬프트 키워드 | 참고 |
|--------|----------------|------|
| `car.png` | cute red toy car, rounded shape, simple design | 🚗 대체 |
| `bus.png` | cute yellow school bus, friendly front face | 🚌 대체 |
| `train.png` | cute blue steam train, puffing white smoke | 🚂 대체 |
| `airplane.png` | cute white airplane, small wings, flying pose | ✈️ 대체 |
| `rocket.png` | cute rocket ship, red and white, small flame at bottom | 🚀 대체 |
| `bicycle.png` | cute colorful bicycle, simple design, basket on front | 🚲 대체 |
| `ship.png` | cute blue boat on water, small flag on top | 🚢 대체 |
| `helicopter.png` | cute helicopter, spinning rotor, blue and yellow | 🚁 대체 |

## 4. shapes/ (도형) — 5개 필요

| 파일명 | 프롬프트 키워드 | 참고 |
|--------|----------------|------|
| `circle.png` | cute red circle shape with kawaii face, shiny | ⭕ 대체 |
| `triangle.png` | cute blue triangle shape with kawaii face | 🔺 대체 |
| `square.png` | cute green square shape with kawaii face | ⬜ 대체 |
| `star.png` | cute golden yellow star with kawaii face, sparkling | ⭐ 대체 |
| `diamond.png` | cute purple diamond shape with kawaii face | 🔷 대체 |

## 5. nature/ (자연) — 5개 필요

| 파일명 | 프롬프트 키워드 | 참고 |
|--------|----------------|------|
| `flower.png` | cute pink cherry blossom flower, soft petals | 🌸 대체 |
| `tree.png` | cute green round tree, thick trunk, simple design | 🌳 대체 |
| `sun.png` | cute smiling sun with rays, warm yellow-orange | ☀️ 대체 |
| `moon.png` | cute crescent moon with sleeping face, yellow | 🌙 대체 |
| `rainbow.png` | cute rainbow arc with clouds on both ends | 🌈 대체 |

---

## 요약

| 카테고리 | 기존 | 필요 | 합계 |
|----------|------|------|------|
| animals | 6개 | 12개 | 18개 |
| fruits | 7개 | 3개 | 10개 |
| vehicles | 0개 | 8개 | 8개 |
| shapes | 0개 | 5개 | 5개 |
| nature | 0개 | 5개 | 5개 |
| **합계** | **13개** | **33개** | **46개** |

## 생성 + 저장 지시사항 (이미지 에이전트용)

### Step 1: 이미지 생성
- 위 프롬프트 템플릿 + 각 아이템 키워드를 조합해서 Gemini 이미지 생성
- 256×256px, PNG, 투명 배경
- 기존 에셋(`/Users/yunsu/dev/10_sub_agents/image_set_agent/sets/animals/animals_01_bear.png`)과 동일한 스타일

### Step 2: 배경 제거
```bash
# 생성된 이미지의 배경이 완전히 투명하지 않으면 rembg로 후처리
/Users/yunsu/dev/10_sub_agents/blog_auto_bot/venv/bin/rembg i 입력.png 출력.png

# 폴더 전체 일괄 처리
/Users/yunsu/dev/10_sub_agents/blog_auto_bot/venv/bin/rembg p 입력폴더/ 출력폴더/
```

### Step 3: 파일 저장
아래 경로에 **정확한 파일명**으로 저장. 파일명이 다르면 게임에서 인식 못함.

```bash
TARGET="/Users/yunsu/dev/10_sub_agents/kids_game/kidsbrainkr.github.io/assets/game_items"

# 동물 12개
cp penguin.png  "$TARGET/animals/penguin.png"
cp frog.png     "$TARGET/animals/frog.png"
cp tiger.png    "$TARGET/animals/tiger.png"
cp lion.png     "$TARGET/animals/lion.png"
cp koala.png    "$TARGET/animals/koala.png"
cp cow.png      "$TARGET/animals/cow.png"
cp pig.png      "$TARGET/animals/pig.png"
cp chicken.png  "$TARGET/animals/chicken.png"
cp chick.png    "$TARGET/animals/chick.png"
cp monkey.png   "$TARGET/animals/monkey.png"
cp squirrel.png "$TARGET/animals/squirrel.png"
cp panda.png    "$TARGET/animals/panda.png"

# 과일 3개
cp peach.png     "$TARGET/fruits/peach.png"
cp cherry.png    "$TARGET/fruits/cherry.png"
cp pineapple.png "$TARGET/fruits/pineapple.png"

# 탈것 8개
cp car.png        "$TARGET/vehicles/car.png"
cp bus.png        "$TARGET/vehicles/bus.png"
cp train.png      "$TARGET/vehicles/train.png"
cp airplane.png   "$TARGET/vehicles/airplane.png"
cp rocket.png     "$TARGET/vehicles/rocket.png"
cp bicycle.png    "$TARGET/vehicles/bicycle.png"
cp ship.png       "$TARGET/vehicles/ship.png"
cp helicopter.png "$TARGET/vehicles/helicopter.png"

# 도형 5개
cp circle.png   "$TARGET/shapes/circle.png"
cp triangle.png "$TARGET/shapes/triangle.png"
cp square.png   "$TARGET/shapes/square.png"
cp star.png     "$TARGET/shapes/star.png"
cp diamond.png  "$TARGET/shapes/diamond.png"

# 자연 5개
cp flower.png  "$TARGET/nature/flower.png"
cp tree.png    "$TARGET/nature/tree.png"
cp sun.png     "$TARGET/nature/sun.png"
cp moon.png    "$TARGET/nature/moon.png"
cp rainbow.png "$TARGET/nature/rainbow.png"
```

### Step 4: 검증
```bash
# 전체 확인 — 46개 파일이 있어야 함
find "$TARGET" -name "*.png" | wc -l

# 카테고리별 확인
echo "animals: $(ls $TARGET/animals/*.png | wc -l)/18"
echo "fruits: $(ls $TARGET/fruits/*.png | wc -l)/10"
echo "vehicles: $(ls $TARGET/vehicles/*.png | wc -l)/8"
echo "shapes: $(ls $TARGET/shapes/*.png | wc -l)/5"
echo "nature: $(ls $TARGET/nature/*.png | wc -l)/5"
```

### 완료 후
- 게임 코드 수정 불필요 — 파일 넣으면 자동 적용 (이모지 폴백 → 이미지로 전환)
- 브라우저에서 아무 게임 열어서 카드 뒤집으면 이미지 나오는지 확인
