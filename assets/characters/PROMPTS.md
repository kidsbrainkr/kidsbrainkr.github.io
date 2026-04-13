# 캐릭터 이미지 생성 프롬프트

각 캐릭터당 2장: **프로필** (512×512, 정면 전신) + **시트** (1024×576, 다앵글+표정+포즈)

## 공통 스타일 키워드
```
2D sticker illustration with soft 3D depth, subtle drop shadow,
smooth cel-shading with soft highlights and gentle gradients,
thick clean outline (dark brown/gray), rounded silhouette,
kawaii proportions (big head, small body), glossy eye reflections,
transparent background, PNG alpha, centered, no floor, no shadow on ground.
NOT flat vector. NOT realistic 3D. Soft dimensional 2D like LINE stickers.
```

## 프롬프트 작성 규칙

| 규칙 | 이유 |
|------|------|
| `ONE character only, no variations` | 없으면 여러 캐릭터가 한 장에 |
| `front-facing full body, centered` | 안 쓰면 상반신만 또는 각도 틀어짐 |
| `Transparent background, PNG alpha, no floor, character floating` | 배경 제거 |
| `Thick clean dark outline` | 기존 에셋 스타일 통일 |
| `kawaii proportions` | 없으면 리얼 비율 |
| 설명 3~5문장으로 간결하게 | 너무 길면 모델 혼란 |

## 프롬프트 템플릿
```
2D sticker illustration, soft 3D depth, subtle drop shadow.
Single [캐릭터 설명], front-facing full body, centered.
[외형 핵심 2~3줄]
Thick clean dark outline, rounded edges, kawaii proportions.
[스타일 레퍼런스]
Transparent background, PNG alpha, no floor, character floating.
ONE character only, no variations, no multiple views.
```

## 생성 팁
- 프로필: 1:1 비율, 시트: 16:9 비율
- 투명 배경이 안 되면: `rembg i 입력.png 출력.png`
- 스타일 레퍼런스: sets/animals/ 곰/토끼와 같은 톤

## 저장 경로
```
assets/characters/
├── fairy_profile.png / fairy_sheet.png    ← 별이
├── robot_profile.png / robot_sheet.png    ← 볼트
├── dino_profile.png / dino_sheet.png      ← 꾸미
└── PROMPTS.md                             ← 이 파일
```

캐릭터별 상세 프롬프트 → `PROMPTS_CHARACTERS.md`
