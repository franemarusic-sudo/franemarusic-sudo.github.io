'use strict';

// ── Splash (shows on every page load) ─────────────────────────
const splash = document.getElementById('splash');

function showSplash() {
  splash.classList.add('splash--active');
  setTimeout(() => {
    splash.classList.remove('splash--active');
  }, 3500);
}

showSplash();

// ── Photo strip ────────────────────────────────────────────────
function initStrip() {
  const stripEl = document.querySelector('[data-strip]');
  if (!stripEl) return;

  const track = stripEl.querySelector('.strip__track');
  const images = Array.from(track.querySelectorAll('img'));
  const prevBtn = stripEl.querySelector('.strip__btn--prev');
  const nextBtn = stripEl.querySelector('.strip__btn--next');
  let current = 0;

  function getVisible() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function update() {
    const vis = getVisible();
    const itemWidth = stripEl.offsetWidth / vis;
    images.forEach(img => { img.style.flex = `0 0 ${itemWidth}px`; });
    track.style.transform = `translateX(-${current * itemWidth}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= images.length - vis;
  }

  prevBtn.addEventListener('click', () => {
    if (current > 0) { current--; update(); }
  });

  nextBtn.addEventListener('click', () => {
    if (current < images.length - getVisible()) { current++; update(); }
  });

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50 && current < images.length - getVisible()) { current++; update(); }
    if (diff < -50 && current > 0) { current--; update(); }
  });

  window.addEventListener('resize', () => {
    current = Math.min(current, Math.max(0, images.length - getVisible()));
    update();
  });

  update();
}

// ── Smooth scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

initStrip();
