# 게임 아이템 이미지 생성 요청서

## 공통 규격
- **크기**: 256×256px / **형식**: PNG (투명 배경)
- **스타일**: 2D sticker, soft 3D depth, thick clean dark outline, kawaii style
- **레퍼런스**: `animals/bear.png`, `fruits/apple.png` 스타일과 동일
- **저장 경로**: `assets/game_items/{카테고리}/`

## 프롬프트 템플릿
```
2D sticker illustration of a cute [아이템명], soft 3D depth, subtle drop shadow,
thick clean dark outline, kawaii style, big eyes, rosy cheeks (동물일 경우),
rounded shapes, centered, 256x256px,
transparent background, PNG alpha, no background,
ONE item only, no variations, no text.
Style: LINE stickers, cute and child-friendly.
```

## 1. animals/ — 12개

| 파일명 | 프롬프트 키워드 |
|--------|----------------|
| `penguin.png` | cute baby penguin, black and white with orange feet and beak |
| `frog.png` | cute green frog sitting, big round eyes, smiling |
| `tiger.png` | cute baby tiger, orange with black stripes, friendly face |
| `lion.png` | cute baby lion with small mane, golden color, happy |
| `koala.png` | cute koala holding onto branch, gray fluffy, big nose |
| `cow.png` | cute spotted cow, black and white, bell on neck |
| `pig.png` | cute pink pig, curly tail, round snout |
| `chicken.png` | cute chicken, white body, red comb, yellow beak |
| `chick.png` | tiny yellow baby chick, fluffy, small wings |
| `monkey.png` | cute brown monkey, long tail, playful pose |
| `squirrel.png` | cute squirrel holding acorn, bushy tail, brown |
| `panda.png` | cute baby panda, black and white, eating bamboo |

## 2. fruits/ — 3개

| 파일명 | 프롬프트 키워드 |
|--------|----------------|
| `peach.png` | cute peach fruit with leaf, pink-orange gradient |
| `cherry.png` | two cute red cherries on stem with leaf, shiny |
| `pineapple.png` | cute pineapple with green leaves, yellow body |

## 3. vehicles/ — 8개

| 파일명 | 프롬프트 키워드 |
|--------|----------------|
| `car.png` | cute red toy car, rounded shape |
| `bus.png` | cute yellow school bus, friendly front face |
| `train.png` | cute blue steam train, puffing white smoke |
| `airplane.png` | cute white airplane, small wings, flying pose |
| `rocket.png` | cute rocket ship, red and white, small flame |
| `bicycle.png` | cute colorful bicycle, basket on front |
| `ship.png` | cute blue boat on water, small flag on top |
| `helicopter.png` | cute helicopter, spinning rotor, blue and yellow |

## 4. shapes/ — 5개 + nature/ — 5개

| 파일명 | 프롬프트 키워드 |
|--------|----------------|
| `shapes/circle.png` | cute red circle with kawaii face |
| `shapes/triangle.png` | cute blue triangle with kawaii face |
| `shapes/square.png` | cute green square with kawaii face |
| `shapes/star.png` | cute golden star with kawaii face, sparkling |
| `shapes/diamond.png` | cute purple diamond with kawaii face |
| `nature/flower.png` | cute pink cherry blossom, soft petals |
| `nature/tree.png` | cute green round tree, thick trunk |
| `nature/sun.png` | cute smiling sun with rays, warm yellow |
| `nature/moon.png` | cute crescent moon with sleeping face |
| `nature/rainbow.png` | cute rainbow arc with clouds on both ends |

**합계**: 기존 13개 + 신규 33개 = 46개

생성/저장 절차 → `IMAGE_REQUEST_STEPS.md` 참조
