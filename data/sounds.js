/**
 * KidsBrain 통합 사운드 시스템 (Web Audio API)
 *
 * 사용법: 게임 HTML에서 <script src="../../data/sounds.js"></script> 로 로드
 * 또는 인라인으로 복사하여 사용
 *
 * 제공 함수:
 *   kbrSound.init()          — AudioContext 초기화 (사용자 인터랙션 후 호출)
 *   kbrSound.flip()          — 카드 뒤집기
 *   kbrSound.correct()       — 정답
 *   kbrSound.wrong()         — 오답
 *   kbrSound.match()         — 짝 맞춤
 *   kbrSound.complete()      — 게임 완료 팡파레
 *   kbrSound.click()         — UI 버튼 클릭
 *   kbrSound.star()          — 별 획득
 *   kbrSound.levelUp()       — 레벨 업
 *   kbrSound.countdown(n)    — 카운트다운 (1~3)
 */
const kbrSound = (() => {
  let ctx = null;

  function init() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function beep(freq, dur, type = 'sine', gain = 0.3, delay = 0) {
    if (!ctx) init();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    g.gain.setValueAtTime(gain, ctx.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + dur);
  }

  function noise(dur, gain = 0.1, delay = 0) {
    if (!ctx) init();
    const bufferSize = ctx.sampleRate * dur;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    const g = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 800;
    src.buffer = buffer;
    src.connect(filt);
    filt.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(gain, ctx.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
    src.start(ctx.currentTime + delay);
    src.stop(ctx.currentTime + delay + dur);
  }

  return {
    init,

    // 카드 뒤집기 — 가볍고 경쾌한 톡
    flip() {
      beep(600, 0.08, 'triangle', 0.25);
    },

    // 정답 — 밝은 2음
    correct() {
      beep(523, 0.12, 'sine', 0.3, 0);
      beep(659, 0.15, 'sine', 0.3, 0.1);
    },

    // 오답 — 낮은 2음
    wrong() {
      beep(200, 0.15, 'square', 0.15, 0);
      beep(170, 0.2, 'square', 0.12, 0.12);
    },

    // 짝 맞춤 — 도미솔 아르페지오
    match() {
      beep(523, 0.15, 'sine', 0.3, 0);
      beep(659, 0.15, 'sine', 0.3, 0.1);
      beep(784, 0.2, 'sine', 0.3, 0.2);
    },

    // 게임 완료 팡파레 — 7음 축하곡
    complete() {
      const notes = [523, 587, 659, 698, 784, 880, 1047];
      notes.forEach((f, i) => {
        beep(f, 0.2, 'sine', 0.25, i * 0.1);
        if (i === notes.length - 1) {
          beep(f, 0.5, 'triangle', 0.15, i * 0.1 + 0.05);
        }
      });
    },

    // UI 클릭 — 부드러운 톡
    click() {
      beep(880, 0.05, 'sine', 0.15);
    },

    // 별 획득 — 반짝이는 느낌
    star() {
      beep(1047, 0.08, 'sine', 0.2, 0);
      beep(1319, 0.1, 'sine', 0.2, 0.06);
      beep(1568, 0.15, 'sine', 0.15, 0.12);
    },

    // 레벨 업 — 상승 글리산도
    levelUp() {
      [523, 659, 784, 1047].forEach((f, i) => {
        beep(f, 0.12, 'sine', 0.25, i * 0.08);
      });
    },

    // 카운트다운
    countdown(n) {
      const freq = n <= 1 ? 880 : (n <= 2 ? 660 : 440);
      beep(freq, 0.15, 'triangle', 0.2);
    }
  };
})();
