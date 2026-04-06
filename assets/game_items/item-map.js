/**
 * item-map.js — 이모지→이미지 자동 교체 시스템
 * -----------------------------------------------
 * 게임에서 이모지를 쓰는 곳에 이 스크립트를 로드하면
 * 해당 이미지가 있으면 자동으로 <img>로 교체합니다.
 *
 * [사용법]
 * 1. 게임 HTML에 스크립트 추가:
 *    <script src="../../assets/game_items/item-map.js"></script>
 *
 * 2. 이모지 대신 이미지 표시:
 *    const html = getItemHtml('🐶', 80);
 *    // → <img src="../../assets/game_items/animals/dog.png" ...> 또는 이모지 폴백
 *
 * 3. 이미지가 없으면 기존 이모지로 폴백 (깨지지 않음)
 *
 * [이미지 추가 방법]
 * assets/game_items/{카테고리}/{이름}.png 에 넣으면 자동 적용.
 * 아래 EMOJI_MAP에 이모지→파일 매핑 추가.
 */

// 이모지 → 이미지 파일 매핑
const EMOJI_MAP = {
    // 동물
    '🐶': 'animals/dog.png',
    '🐱': 'animals/cat.png',
    '🐰': 'animals/rabbit.png',
    '🐻': 'animals/bear.png',
    '🦊': 'animals/fox.png',
    '🦉': 'animals/owl.png',
    '🐧': 'animals/penguin.png',
    '🐸': 'animals/frog.png',
    '🐯': 'animals/tiger.png',
    '🦁': 'animals/lion.png',
    '🐨': 'animals/koala.png',
    '🐮': 'animals/cow.png',
    '🐷': 'animals/pig.png',
    '🐔': 'animals/chicken.png',
    '🐥': 'animals/chick.png',
    '🐵': 'animals/monkey.png',
    '🐿️': 'animals/squirrel.png',
    '🐼': 'animals/panda.png',

    // 과일/음식
    '🍎': 'fruits/apple.png',
    '🍌': 'fruits/banana.png',
    '🍇': 'fruits/grape.png',
    '🍊': 'fruits/orange.png',
    '🍓': 'fruits/strawberry.png',
    '🍉': 'fruits/watermelon.png',
    '🍋': 'fruits/lemon.png',
    '🍑': 'fruits/peach.png',
    '🍒': 'fruits/cherry.png',
    '🍍': 'fruits/pineapple.png',

    // 탈것
    '🚗': 'vehicles/car.png',
    '🚌': 'vehicles/bus.png',
    '🚂': 'vehicles/train.png',
    '✈️': 'vehicles/airplane.png',
    '🚀': 'vehicles/rocket.png',
    '🚲': 'vehicles/bicycle.png',
    '🚢': 'vehicles/ship.png',
    '🚁': 'vehicles/helicopter.png',

    // 도형
    '⭕': 'shapes/circle.png',
    '🔺': 'shapes/triangle.png',
    '⬜': 'shapes/square.png',
    '⭐': 'shapes/star.png',
    '🔷': 'shapes/diamond.png',

    // 자연
    '🌸': 'nature/flower.png',
    '🌳': 'nature/tree.png',
    '☀️': 'nature/sun.png',
    '🌙': 'nature/moon.png',
    '🌈': 'nature/rainbow.png',
};

// 에셋 기본 경로 (게임 HTML 위치 기준 상대경로)
let ASSET_BASE = '../../assets/game_items/';

// 이미지 존재 캐시 (중복 로드 방지)
const _imgCache = {};

/**
 * 에셋 기본 경로 설정 (게임 깊이에 따라 조정)
 * @param {string} base - 예: '../assets/game_items/' 또는 '../../assets/game_items/'
 */
function setAssetBase(base) {
    ASSET_BASE = base;
}

/**
 * 이모지를 이미지 HTML로 변환. 이미지 없으면 이모지 폴백.
 * @param {string} emoji - 원본 이모지
 * @param {number} size - 이미지 크기 (px)
 * @returns {string} HTML 문자열
 */
function getItemHtml(emoji, size = 64) {
    const file = EMOJI_MAP[emoji];
    if (!file) return `<span style="font-size:${size}px;line-height:1;">${emoji}</span>`;

    const src = ASSET_BASE + file;
    return `<img src="${src}" alt="${emoji}"
        style="width:${size}px;height:${size}px;object-fit:contain;"
        onerror="this.outerHTML='<span style=\\'font-size:${size}px;line-height:1;\\'>${emoji}</span>'">`;
}

/**
 * 이모지를 이미지 URL로 변환. 없으면 null.
 * @param {string} emoji
 * @returns {string|null}
 */
function getItemSrc(emoji) {
    const file = EMOJI_MAP[emoji];
    return file ? ASSET_BASE + file : null;
}

/**
 * 페이지 내 모든 이모지를 이미지로 자동 교체
 * 특정 클래스가 있는 요소 안의 이모지만 교체
 * @param {string} selector - CSS 선택자 (예: '.card-emoji', '.game-item')
 * @param {number} size - 이미지 크기
 */
function replaceEmojisInElements(selector, size = 64) {
    document.querySelectorAll(selector).forEach(el => {
        const emoji = el.textContent.trim();
        const file = EMOJI_MAP[emoji];
        if (file) {
            el.innerHTML = getItemHtml(emoji, size);
        }
    });
}
