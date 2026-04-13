# 게임 아이템 이미지 — 생성/저장 절차

아이템 목록은 `IMAGE_REQUEST.md` 참조

## Step 1: 이미지 생성
- 프롬프트 템플릿 + 각 아이템 키워드를 조합해서 Gemini 이미지 생성
- 256×256px, PNG, 투명 배경
- 기존 에셋과 동일한 스타일

## Step 2: 배경 제거
```bash
# 배경이 완전히 투명하지 않으면 rembg로 후처리
/Users/yunsu/dev/10_sub_agents/blog_auto_bot/venv/bin/rembg i 입력.png 출력.png

# 폴더 전체 일괄 처리
/Users/yunsu/dev/10_sub_agents/blog_auto_bot/venv/bin/rembg p 입력폴더/ 출력폴더/
```

## Step 3: 파일 저장
정확한 파일명으로 저장. 파일명이 다르면 게임에서 인식 못함.

```bash
TARGET="/Users/yunsu/dev/10_sub_agents/kids_game/kidsbrainkr.github.io/assets/game_items"

# 동물 12개
cp penguin.png frog.png tiger.png lion.png koala.png cow.png \
   pig.png chicken.png chick.png monkey.png squirrel.png panda.png "$TARGET/animals/"

# 과일 3개
cp peach.png cherry.png pineapple.png "$TARGET/fruits/"

# 탈것 8개
cp car.png bus.png train.png airplane.png rocket.png \
   bicycle.png ship.png helicopter.png "$TARGET/vehicles/"

# 도형 5개
cp circle.png triangle.png square.png star.png diamond.png "$TARGET/shapes/"

# 자연 5개
cp flower.png tree.png sun.png moon.png rainbow.png "$TARGET/nature/"
```

## Step 4: 검증
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

## 완료 후
- 게임 코드 수정 불필요 — 파일 넣으면 자동 적용 (이모지 폴백 → 이미지로 전환)
- 브라우저에서 아무 게임 열어서 카드 뒤집으면 이미지 나오는지 확인
