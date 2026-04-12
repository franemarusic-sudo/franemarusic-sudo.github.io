'use strict';

// ── Password gate ──────────────────────────────────────────
const CORRECT = 'thedinnerparty';
const SESSION_KEY = 'enoteca_unlocked';

const gate = document.getElementById('gate');
const gateForm = document.getElementById('gate-form');
const gateInput = document.getElementById('gate-input');
const gateError = document.getElementById('gate-error');

function unlock() {
  sessionStorage.setItem(SESSION_KEY, '1');
  gate.classList.add('gate--hidden');
}

if (sessionStorage.getItem(SESSION_KEY)) {
  unlock();
}

gateForm.addEventListener('submit', e => {
  e.preventDefault();
  if (gateInput.value === CORRECT) {
    unlock();
  } else {
    gateError.textContent = 'Incorrect password.';
    gateInput.value = '';
    gateInput.classList.remove('shake');
    void gateInput.offsetWidth;
    gateInput.classList.add('shake');
    gateInput.addEventListener('animationend', () => gateInput.classList.remove('shake'), { once: true });
  }
});

// ── Smooth scroll with nav offset ─────────────────────────
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
