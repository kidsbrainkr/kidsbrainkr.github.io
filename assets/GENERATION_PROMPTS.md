# 이미지 생성 프롬프트 — 인덱스

Gemini에서 복붙용. 총 45장 (게임 에셋) + 132장 (게임 썸네일)

## 공통 스타일 (모든 프롬프트 앞에 붙이기)

```
2D sticker illustration with soft 3D depth and subtle drop shadow.
Thick clean dark outline, rounded silhouette, kawaii proportions.
Soft bright colors, minimal detail, transparent background.
PNG with alpha channel, centered composition, no floor, no background.
Smooth cel-shading with gentle highlights and soft gradients.
Style: LINE stickers, kawaii 2D with dimensional feel.
NOT realistic photo. NOT flat vector. NOT 3D render.
```

## 프롬프트 파일

| 카테고리 | 파일 | 수량 |
|----------|------|------|
| Animals + Fruits/Food + UI Icons | `prompts/items_ui.md` | 19장 |
| Learning Objects + Reward Stickers | `prompts/learning_rewards.md` | 21장 |
| Background Scenes | `prompts/backgrounds.md` | 5장 |

## 사용법

1. 위 **공통 스타일** 텍스트를 먼저 붙이고
2. 해당 카테고리 파일에서 아이템 프롬프트를 이어 붙이기
3. 생성된 이미지를 해당 폴더에 저장

저장 경로:
- `image_set_agent/sets/{세트명}/{파일명}.png`
- 배경: `image_set_agent/sets/background_scenes/`
