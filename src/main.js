'use strict';

//
// ナビバーのリンククリック時の制御
//
const navLinks = document.body.querySelectorAll('.site-navigation li a');

for(const link of navLinks) {
  const hash = link.href.replace(/.*#(.+)$/, '#$1');
  const scrollTarget = document.body.querySelector(hash);

  link.addEventListener('click', (evt) => {
    evt.preventDefault(); // リンクをクリックしたときのデフォルトの動作をキャンセルする

    // 要素までスクロールする
    const scrollOptions = {
      behavior: 'smooth', // スムーズスクロール
      block: 'start' // 要素が画面の上にくるまでスクロール
    };
    scrollTarget.scrollIntoView(scrollOptions);
  });
}

//
// トップ画面の波アニメーション
//
let windowWidth = 0;
let windowHeight = 0;
const waveCanvas = document.body.querySelector('#wave-canvas');
const waveCanvasContext = waveCanvas.getContext('2d');

function initWaveCanvas() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  waveCanvas.width = windowWidth;
  waveCanvas.height = windowHeight;
}

function renderWave(colorStr, amplitude, frequency, delay, height) {
  waveCanvasContext.fillStyle = colorStr;
  waveCanvasContext.beginPath();
  waveCanvasContext.moveTo(0, amplitude * Math.sin(0 + delay));

  const baseY = windowHeight - height;

  for(let x=0; x < windowWidth; x++) {
    const y = amplitude * Math.sin(x * frequency + delay) + baseY;
    waveCanvasContext.lineTo(x, y);
  }

  waveCanvasContext.lineTo(windowWidth, windowHeight);
  waveCanvasContext.lineTo(0, windowHeight);
  waveCanvasContext.closePath();
  waveCanvasContext.fill();
}

function animateWave(timestampMs) {
  waveCanvasContext.clearRect(0, 0, windowWidth, windowHeight);
  renderWave('rgba(254, 254, 254, 0.2)', 25, 0.012, timestampMs / 2400, windowHeight / 10);
  renderWave('rgba(254, 254, 254, 0.2)', 30, 0.008, timestampMs / 1600, windowHeight / 20);
  renderWave('rgba(254, 254, 254, 1)', 10, 0.01, timestampMs / 800, windowHeight / 30);
  window.requestAnimationFrame((ts) => animateWave(ts));
}

initWaveCanvas();

window.addEventListener('resize', (event) => {
  initWaveCanvas();
});

window.requestAnimationFrame((timestampMs) => animateWave(timestampMs));