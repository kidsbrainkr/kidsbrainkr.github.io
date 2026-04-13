/**
 * game-engine.js — 쑥쑥놀이터 공통 게임 엔진 v2.0
 *
 * 기능:
 *  1) GSAP 스프링 애니메이션 유틸
 *  2) canvas-confetti 파티클 피드백
 *  3) Web Audio API 사운드 시스템 (효과음 합성)
 *  4) 스쿼시 & 스트레치
 *  5) 카메라 셰이크
 *  6) Idle 모션 감지
 *  7) Day/Night 자동 테마
 *  8) 이스터에그 유틸
 *  9) 이모지→이미지 헬퍼 (기존 item-map 통합)
 * 10) 마스코트 표시
 *
 * 사용법: 게임 HTML <head>에 추가
 *   <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
 *   <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
 *   <script src="../../assets/game-engine.js"></script>
 */

/* ═══════════════════════════════════════════════════════════════
   0. 에셋 기본 경로 계산
   ═══════════════════════════════════════════════════════════════ */
const _ASSET_BASE = (() => {
  const p = window.location.pathname;
  if (p.includes('/routine_tools/') && p.split('/routine_tools/')[1]?.includes('/'))
    return '../../assets/game_items/';
  if (p.includes('/routine_tools/'))
    return '../assets/game_items/';
  return '../../assets/game_items/';
})();

/* ═══════════════════════════════════════════════════════════════
   1. 이모지 → 이미지 매핑 (기존 item-map 통합)
   ═══════════════════════════════════════════════════════════════ */
const _EMOJI_IMG = {
  '🍎':'fruits/apple.png','🍌':'fruits/banana.png','🍇':'fruits/grape.png',
  '🍊':'fruits/orange.png','🍓':'fruits/strawberry.png','🍑':'fruits/peach.png',
  '🍒':'fruits/cherry.png','🍋':'fruits/lemon.png','🍉':'fruits/watermelon.png',
  '🐶':'animals/dog.png','🐱':'animals/cat.png','🐰':'animals/rabbit.png',
  '🐻':'animals/bear.png','🐧':'animals/penguin.png','🐸':'animals/frog.png',
  '🐨':'animals/koala.png','🦊':'animals/fox.png','🦉':'animals/owl.png',
  '🐯':'animals/tiger.png','🦁':'animals/lion.png','🐮':'animals/cow.png',
  '🐷':'animals/pig.png','🐔':'animals/chicken.png','🐥':'animals/chick.png',
  '🚗':'vehicles/car.png','🚌':'vehicles/bus.png','✈️':'vehicles/airplane.png',
  '🚀':'vehicles/rocket.png','🚲':'vehicles/bicycle.png','🚢':'vehicles/ship.png',
  '🚁':'vehicles/helicopter.png','🚂':'vehicles/train.png',
  '⭕':'shapes/circle.png','🔺':'shapes/triangle.png','⬜':'shapes/square.png',
  '⭐':'shapes/star.png','🔷':'shapes/diamond.png',
  '🌸':'nature/flower.png','🌳':'nature/tree.png',
};

function _getItemHtml(emoji, sz) {
  sz = sz || 64;
  const f = _EMOJI_IMG[emoji];
  if (!f) return emoji;
  const src = _ASSET_BASE + f;
  return `<img src="${src}" alt="${emoji}" class="game-item-img" style="width:${sz}px;height:${sz}px;" onerror="this.outerHTML='${emoji}'">`;
}

function _getItemSrc(emoji) {
  const f = _EMOJI_IMG[emoji];
  return f ? _ASSET_BASE + f : null;
}

/* ═══════════════════════════════════════════════════════════════
   2. Web Audio 사운드 시스템 (합성, 파일 불필요)
   ═══════════════════════════════════════════════════════════════ */
const GameSound = (() => {
  let ctx = null;
  const getCtx = () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  };

  // 클릭/탭 소리 — 마시멜로 누르기
  function click() {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(600, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.06);
    g.gain.setValueAtTime(0.15, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.1);
  }

  // 정답 — 맑은 차임벨 (상승음)
  function correct() {
    const c = getCtx();
    [523, 659, 784].forEach((freq, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.12, c.currentTime + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.1 + 0.3);
      o.connect(g).connect(c.destination);
      o.start(c.currentTime + i * 0.1);
      o.stop(c.currentTime + i * 0.1 + 0.3);
    });
  }

  // 오답 — 짧은 버즈
  function wrong() {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'square';
    o.frequency.value = 200;
    g.gain.setValueAtTime(0.08, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.2);
  }

  // 게임 완료 — 빵빠레 팡파레
  function complete() {
    const c = getCtx();
    const melody = [523, 659, 784, 1047, 784, 1047];
    melody.forEach((freq, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'triangle';
      o.frequency.value = freq;
      const t = c.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      o.connect(g).connect(c.destination);
      o.start(t); o.stop(t + 0.25);
    });
  }

  // 물방울 소리 — 버튼 호버
  function bubble() {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(400, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.05);
    o.frequency.exponentialRampToValueAtTime(300, c.currentTime + 0.08);
    g.gain.setValueAtTime(0.06, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
    o.connect(g).connect(c.destination);
    o.start(); o.stop(c.currentTime + 0.1);
  }

  return { click, correct, wrong, complete, bubble };
})();

/* ═══════════════════════════════════════════════════════════════
   3. GSAP 스프링 유틸
   ═══════════════════════════════════════════════════════════════ */
const GameAnim = {
  // 스쿼시 & 스트레치 (버튼 클릭)
  squash(el) {
    if (typeof gsap === 'undefined') return;
    gsap.timeline()
      .to(el, { scaleX: 1.15, scaleY: 0.85, duration: 0.1, ease: 'power2.out' })
      .to(el, { scaleX: 0.95, scaleY: 1.08, duration: 0.1, ease: 'power2.out' })
      .to(el, { scaleX: 1, scaleY: 1, duration: 0.3, ease: 'elastic.out(1,0.4)' });
  },

  // 스프링 팝인 (요소 등장)
  springIn(el, delay) {
    if (typeof gsap === 'undefined') return;
    gsap.from(el, {
      scale: 0.3, opacity: 0, duration: 0.6,
      delay: delay || 0,
      ease: 'elastic.out(1,0.5)',
    });
  },

  // 스프링 바운스 (정답 피드백)
  springBounce(el) {
    if (typeof gsap === 'undefined') return;
    gsap.timeline()
      .to(el, { scale: 1.2, duration: 0.15, ease: 'power2.out' })
      .to(el, { scale: 1, duration: 0.5, ease: 'elastic.out(1,0.3)' });
  },

  // 흔들기 (오답 피드백)
  shake(el) {
    if (typeof gsap === 'undefined') return;
    gsap.timeline()
      .to(el, { x: -8, duration: 0.05 })
      .to(el, { x: 8, duration: 0.05 })
      .to(el, { x: -5, duration: 0.05 })
      .to(el, { x: 5, duration: 0.05 })
      .to(el, { x: 0, duration: 0.1, ease: 'power2.out' });
  },

  // 카메라 셰이크 (화면 전체 흔들림)
  cameraShake() {
    if (typeof gsap === 'undefined') return;
    gsap.timeline()
      .to(document.body, { x: -3, y: 2, duration: 0.03 })
      .to(document.body, { x: 3, y: -2, duration: 0.03 })
      .to(document.body, { x: -2, y: 1, duration: 0.03 })
      .to(document.body, { x: 0, y: 0, duration: 0.05, ease: 'power2.out' });
  },

  // 위글 (idle 시 사용)
  wiggle(el) {
    if (typeof gsap === 'undefined') return;
    gsap.timeline()
      .to(el, { rotation: -5, duration: 0.1 })
      .to(el, { rotation: 5, duration: 0.1 })
      .to(el, { rotation: -3, duration: 0.1 })
      .to(el, { rotation: 0, duration: 0.15, ease: 'power2.out' });
  },
};

/* ═══════════════════════════════════════════════════════════════
   4. Confetti 파티클 피드백
   ═══════════════════════════════════════════════════════════════ */
const GameParticle = {
  // 정답 시 색종이 폭발
  correctBurst(x, y) {
    if (typeof confetti === 'undefined') return;
    const rect = { x: (x || window.innerWidth / 2) / window.innerWidth, y: (y || window.innerHeight / 2) / window.innerHeight };
    confetti({
      particleCount: 40,
      spread: 60,
      origin: rect,
      colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'],
      ticks: 80,
      gravity: 1.2,
      scalar: 0.9,
    });
  },

  // 게임 완료 시 화려한 축하
  celebrateBurst() {
    if (typeof confetti === 'undefined') return;
    const end = Date.now() + 1500;
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#AA96DA', '#F8B500'];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  },

  // 별가루 스파클
  sparkle(x, y) {
    if (typeof confetti === 'undefined') return;
    confetti({
      particleCount: 15,
      spread: 360,
      startVelocity: 10,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#FFD700', '#FFF8DC', '#FFFACD'],
      shapes: ['star'],
      ticks: 50,
      gravity: 0.5,
      scalar: 0.7,
    });
  },
};

/* ═══════════════════════════════════════════════════════════════
   5. Idle 모션 감지 — 5초 무활동 시 마스코트/카드 위글
   ═══════════════════════════════════════════════════════════════ */
const GameIdle = (() => {
  let timer = null;
  let callbacks = [];

  function reset() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbacks.forEach(cb => cb());
    }, 5000);
  }

  function onIdle(cb) {
    callbacks.push(cb);
  }

  // 이벤트 리스너 (터치 + 마우스)
  ['click', 'touchstart', 'mousemove', 'keydown'].forEach(evt => {
    document.addEventListener(evt, reset, { passive: true });
  });
  reset();

  return { onIdle, reset };
})();

/* ═══════════════════════════════════════════════════════════════
   6. Day/Night 자동 테마
   ═══════════════════════════════════════════════════════════════ */
const GameTheme = (() => {
  function apply() {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;
    document.documentElement.setAttribute('data-theme', isNight ? 'night' : 'day');
    return isNight ? 'night' : 'day';
  }

  // 1분마다 체크
  apply();
  setInterval(apply, 60000);

  return { apply, isNight: () => document.documentElement.getAttribute('data-theme') === 'night' };
})();

/* ═══════════════════════════════════════════════════════════════
   7. 버튼/카드 자동 인터랙션 바인딩
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // 모든 .game-btn에 스쿼시 효과 + 클릭 사운드
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.game-btn, .game-card-item, [data-squash]');
    if (btn) {
      GameSound.click();
      GameAnim.squash(btn);
    }
  });

  // Idle 시 마스코트 위글
  GameIdle.onIdle(() => {
    const mascot = document.querySelector('.game-mascot');
    if (mascot) GameAnim.wiggle(mascot);
  });

  // 정답/오답 피드백 클래스 감지 (MutationObserver)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const el = m.target;
        if (el.classList.contains('feedback-correct')) {
          GameSound.correct();
          GameAnim.springBounce(el);
          const rect = el.getBoundingClientRect();
          GameParticle.correctBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        if (el.classList.contains('feedback-wrong')) {
          GameSound.wrong();
          GameAnim.shake(el);
        }
      }
    });
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
});

/* ═══════════════════════════════════════════════════════════════
   8. 마스코트 표시 (기존 로직 통합)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // 허브 페이지에서는 마스코트 중복 방지
  if (document.querySelector('.hero')) return;

  const ch = localStorage.getItem('selectedCharacter') || 'fairy';
  const charBase = _ASSET_BASE.replace('game_items/', 'characters/');
  const names = { fairy: '별이', robot: '볼트', dino: '꾸미' };
  const m = document.createElement('div');
  m.className = 'game-mascot';
  m.innerHTML = `<img src="${charBase}${ch}_profile.png" alt="${names[ch]}" style="width:100%;height:100%;object-fit:contain;">`;
  m.title = `${names[ch]}와 함께 하는 중!`;
  m.onclick = () => { window.location.href = '../../index.html'; };
  document.body.appendChild(m);
});

/* ═══════════════════════════════════════════════════════════════
   9. 게임 공통 API (게임에서 호출)
   ═══════════════════════════════════════════════════════════════ */
const Game = {
  sound: GameSound,
  anim: GameAnim,
  particle: GameParticle,
  idle: GameIdle,
  theme: GameTheme,

  // 정답 처리 (사운드 + 파티클 + 바운스)
  onCorrect(el, x, y) {
    GameSound.correct();
    if (el) GameAnim.springBounce(el);
    GameParticle.correctBurst(x, y);
  },

  // 오답 처리 (사운드 + 셰이크)
  onWrong(el) {
    GameSound.wrong();
    if (el) GameAnim.shake(el);
    GameAnim.cameraShake();
  },

  // 게임 완료 (팡파레 + 축하 파티클)
  onComplete() {
    GameSound.complete();
    GameParticle.celebrateBurst();
    GameAnim.cameraShake();
  },

  // 요소 등장 애니메이션 (카드들 순서대로 팝인)
  animateCards(selector, stagger) {
    if (typeof gsap === 'undefined') return;
    gsap.from(selector, {
      scale: 0.3, opacity: 0, duration: 0.5,
      stagger: stagger || 0.08,
      ease: 'elastic.out(1,0.5)',
    });
  },
};
