# 캐릭터 이미지 생성 프롬프트

각 캐릭터당 2장 생성:
- **프로필** (사이드바용): 정면 전신, 흰 배경, 512×512
- **시트** (썸네일 생성 기준용): 정면+측면+뒷면, 표정 3종, 포즈 3종

**공통 스타일 키워드** (기존 에셋 animals/fruits 스타일과 통일):
```
2D sticker illustration with soft 3D depth, subtle drop shadow behind character,
smooth cel-shading with soft highlights and gentle gradients,
thick clean outline (dark brown or dark gray), slightly rounded silhouette,
kawaii proportions (big head, small body), glossy eye reflections,
transparent background, PNG with alpha channel, isolated character, no background,
no floor, no shadow on ground, character floating on empty transparent space,
centered composition.
NOT flat vector. NOT realistic 3D. Soft dimensional 2D like LINE stickers.
```

---

## 1. 별이 — 작은 요정 (Fairy)

### 프로필 이미지
```
2D sticker illustration with soft 3D depth and subtle drop shadow.
A cute fairy character for a children's educational game, front-facing full body shot.
Small child-like fairy with soft translucent wings that shimmer in pink and purple.
Wearing a sparkly lilac dress with star patterns. Holding a tiny golden magic wand with a star tip.
Round face, big sparkling glossy eyes with white reflections, rosy cheeks, small cute smile.
Hair is wavy lavender color with a small flower crown.
Soft pastel color palette: pink, lavender, gold accents.
Smooth cel-shading with gentle highlights on hair, dress, and wings.
Thick clean dark outline, rounded silhouette, kawaii proportions.
Transparent background, PNG alpha, no background, no floor, no shadow on ground, character floating.
Style reference: LINE stickers, kawaii 2D with dimensional feel.
```

### 캐릭터 시트
```
2D sticker style character sheet with soft 3D depth.
Front view, side view, back view in a row.
Below: 3 expressions (happy, surprised, thinking) and 3 poses (waving, jumping, pointing).
Small child-like fairy with translucent pink-purple wings, lavender wavy hair with flower crown,
sparkly lilac dress with stars, golden star wand.
Smooth cel-shading, thick clean outline, soft highlights and gentle gradients.
Glossy eye reflections, kawaii proportions.
Transparent background, PNG alpha, no background, labeled poses.
```

---

## 2. 볼트 — 미니 로봇 (Robot)

### 프로필 이미지
```
2D sticker illustration, soft 3D depth, subtle drop shadow.
Single cute heroic mini robot, front-facing full body, centered.                                 
Electric blue and silver armor, glowing orange energy lines, cyan visor eyes.                    
One fist raised, star emblem on chest, lightning bolt antenna, small jet wings on back.          
Thick clean dark outline, rounded edges, kawaii proportions.                                     
Tobot / Rescue Bots style, cool but child-friendly.                                              
Transparent background, PNG alpha, no background, no floor, character floating.                  
ONE character only, no variations, no multiple views.
```

### 캐릭터 시트
```
2D sticker style character sheet with soft 3D depth.
Front view, side view, back view in a row.
Below: 3 expressions (determined hero face, laughing with sparks, surprised with exclamation)
and 3 poses (flying with jet wings spread, punching forward heroically, victory pose with both arms up).
Sleek electric blue and silver body with orange energy lines, cyan visor eyes,
jet wings on back, booster shoes, glowing star chest emblem, lightning antenna.
Smooth cel-shading, thick clean outline, metallic highlights, glossy reflections.
Cool but child-friendly, rounded edges, kawaii proportions.
Transparent background, PNG alpha, no background, labeled poses.
```

---

## 3. 꾸미 — 아기 공룡 (Baby Dino)

### 프로필 이미지
```
2D sticker illustration with soft 3D depth and subtle drop shadow.
A cute baby dinosaur character for a children's educational game, front-facing full body shot.
Chubby round brachiosaurus-like baby dino with a very short neck (child proportions).
Soft lime green body with a pale yellow belly. Small rounded back plates in pastel orange.
Big round glossy eyes with sparkle reflections, tiny nostrils, wide happy smile showing no teeth.
Short chubby legs and tiny arms. A small rounded tail.
Wearing a tiny red backpack (school theme).
Smooth cel-shading with soft highlights on belly and cheeks, gentle color gradients.
Thick clean dark outline, extremely rounded silhouette, kawaii proportions.
No scary features at all, purely adorable.
Transparent background, PNG alpha, no background, no floor, character floating, centered.
Style reference: LINE stickers, kawaii 2D with dimensional feel, same style as attached bear/rabbit stickers.
```

### 캐릭터 시트
```
2D sticker style character sheet with soft 3D depth.
Front view, side view, back view in a row.
Below: 3 expressions (giggling, amazed with open mouth, sleepy)
and 3 poses (walking, sitting, dancing with arms up).
Chubby round baby dino, lime green with yellow belly, pastel orange back plates,
big glossy sparkly eyes, tiny red backpack.
Smooth cel-shading, thick clean outline, soft highlights, gentle gradients.
Kawaii proportions, extremely rounded, dimensional 2D feel.
Transparent background, PNG alpha, no background, labeled poses.
```

---

## 파일 저장 경로

```
assets/characters/
├── fairy_profile.png      ← 별이 프로필 (사이드바)
├── fairy_sheet.png        ← 별이 시트 (썸네일 생성 참조)
├── robot_profile.png      ← 볼트 프로필
├── robot_sheet.png        ← 볼트 시트
├── dino_profile.png       ← 꾸미 프로필
├── dino_sheet.png         ← 꾸미 시트
└── PROMPTS.md             ← 이 파일
```

## 프롬프트 작성 규칙 (이미지 생성 시 필수 참고)

| 규칙 | 이유 |
|------|------|
| `ONE character only, no variations, no multiple views` | 없으면 여러 캐릭터/변형이 한 장에 나옴 (로봇에서 발생) |
| `front-facing full body, centered` | 정면 전신이 안 나오면 상반신만 나오거나 각도가 틀어짐 |
| `Transparent background, PNG alpha, no background, no floor, character floating` | 배경 제거. 그래도 남으면 rembg 후처리 |
| `Thick clean dark outline` | 기존 에셋(곰/토끼) 스타일과 통일 |
| `kawaii proportions` | 머리 크고 몸 작은 비율. 없으면 리얼 비율로 나옴 |
| 설명은 3~5문장으로 간결하게 | 너무 길면 모델이 혼란 → 여러 변형 생성 |
| `Style reference: LINE stickers` | 전체 톤 통일용 앵커 |

### 프롬프트 템플릿
```
2D sticker illustration, soft 3D depth, subtle drop shadow.
Single [캐릭터 설명], front-facing full body, centered.
[외형 핵심 2~3줄]
Thick clean dark outline, rounded edges, kawaii proportions.
[스타일 레퍼런스]
Transparent background, PNG alpha, no background, no floor, character floating.
ONE character only, no variations, no multiple views.
```

## 생성 팁
- **나노/소라2**: 프로필 이미지는 1:1 비율, 시트는 16:9 비율 추천
- **투명 배경**: 프롬프트에 transparent background 포함됨. 그래도 배경 남으면 rembg로 후처리:
  ```bash
  /Users/yunsu/dev/10_sub_agents/blog_auto_bot/venv/bin/rembg i 입력.png 출력.png
  ```
- **스타일 레퍼런스**: sets/animals/ 폴더의 곰/토끼 스티커와 같은 톤
- 핵심: "2D sticker with soft 3D depth" — 플랫 벡터가 아니라 입체감 있는 2D
