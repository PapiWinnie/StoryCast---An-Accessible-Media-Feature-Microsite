/**
 * FILE: js/main.js
 * StoryCast — Main JavaScript
 * Handles: nav toggle, category filters, audio player, transcript, about page demos
 */

'use strict';

/*  Utility */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/*  Mobile Nav Toggle */
(function initNav() {
  const hamburger = $('.site-nav__hamburger');
  const navLinks  = $('.site-nav__links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav')) {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
})();

/*  Category Filter Buttons  */
(function initCategoryFilter() {
  const buttons = $$('.category-filter__pills button');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update aria-pressed state
      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      // In a real implementation, filter the .story-grid cards here
      const category = btn.textContent.trim();
      console.log(`Filter: ${category}`);
      // e.g. filterCards(category);
    });
  });
})();

/*  Transcript Toggle */
(function initTranscript() {
  // Toggle via the panel's own button
  const toggle  = $('#transcript-toggle');
  const content = $('#transcript-content');
  if (!toggle || !content) return;

  function openTranscript() {
    content.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (btnTranscriptPlayer) {
      btnTranscriptPlayer.setAttribute('aria-expanded', 'true');
      btnTranscriptPlayer.textContent = '✕ Hide Transcript';
    }
  }

  function closeTranscript() {
    content.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (btnTranscriptPlayer) {
      btnTranscriptPlayer.setAttribute('aria-expanded', 'false');
      btnTranscriptPlayer.innerHTML = 'View Transcript';
    }
  }

  toggle.addEventListener('click', () => {
    const isOpen = content.classList.contains('is-open');
    isOpen ? closeTranscript() : openTranscript();
  });

  // Also wire the "View Transcript" button in the player controls
  const btnTranscriptPlayer = $('#btn-transcript');
  if (btnTranscriptPlayer) {
    btnTranscriptPlayer.addEventListener('click', () => {
      const isOpen = content.classList.contains('is-open');
      if (isOpen) {
        closeTranscript();
      } else {
        openTranscript();
        // Scroll to transcript
        document.getElementById('transcript-region')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
})();

/*  Audio Player */
(function initAudioPlayer() {
  const audio       = $('#audio-player');
  const btnPlay     = $('#btn-play');
  const btnRewind   = $('#btn-rewind');
  const btnForward  = $('#btn-forward');
  const progress    = $('#progress-bar');
  const volumeCtrl  = $('#volume-control');
  const timeCurrent = $('#time-current');
  const timeDuration= $('#time-duration');

  if (!audio || !btnPlay) return;

  /* Format seconds → M:SS */
  function fmt(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  /* Play / pause */
  btnPlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      btnPlay.textContent = '⏸';
      btnPlay.setAttribute('aria-label', 'Pause');
      btnPlay.setAttribute('aria-pressed', 'true');
    } else {
      audio.pause();
      btnPlay.textContent = '▶';
      btnPlay.setAttribute('aria-label', 'Play The Silent Echo');
      btnPlay.setAttribute('aria-pressed', 'false');
    }
  });

  /* Rewind 10s */
  btnRewind?.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  /* Forward 15s */
  btnForward?.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
  });

  /* Update progress bar and time display */
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progress) {
      progress.value = pct;
      progress.setAttribute('aria-valuenow', Math.round(pct));
    }
    if (timeCurrent) timeCurrent.textContent = fmt(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    if (timeDuration) timeDuration.textContent = fmt(audio.duration);
    if (progress) progress.max = 100;
  });

  audio.addEventListener('ended', () => {
    btnPlay.textContent = '▶';
    btnPlay.setAttribute('aria-label', 'Play The Silent Echo');
    btnPlay.setAttribute('aria-pressed', 'false');
    if (progress) progress.value = 0;
    if (timeCurrent) timeCurrent.textContent = '0:00';
  });

  /* Scrub progress bar */
  progress?.addEventListener('input', () => {
    if (!audio.duration) return;
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  /* Volume control */
  volumeCtrl?.addEventListener('input', () => {
    audio.volume = volumeCtrl.value;
  });
})();

/*  About Page: Interactive Demo  */
(function initAboutDemo() {

  //  Text size control 
  const btnIncrease = $('#btn-increase-text');
  const btnDecrease = $('#btn-decrease-text');
  let fontSize = 16;

  btnIncrease?.addEventListener('click', () => {
    fontSize = Math.min(fontSize + 2, 24);
    document.documentElement.style.fontSize = `${fontSize}px`;
  });

  btnDecrease?.addEventListener('click', () => {
    fontSize = Math.max(fontSize - 2, 12);
    document.documentElement.style.fontSize = `${fontSize}px`;
  });

  //  High contrast toggle 
  const btnContrast = $('#btn-high-contrast');

  btnContrast?.addEventListener('click', () => {
    const isPressed = btnContrast.getAttribute('aria-pressed') === 'true';
    document.body.classList.toggle('high-contrast', !isPressed);
    btnContrast.setAttribute('aria-pressed', String(!isPressed));

    // Apply / remove high contrast CSS vars
    if (!isPressed) {
      document.documentElement.style.setProperty('--color-text-primary', '#ffffff');
      document.documentElement.style.setProperty('--color-text-secondary', '#ffffff');
      document.documentElement.style.setProperty('--color-bg-surface', '#000000');
      document.documentElement.style.setProperty('--color-bg-card', '#111111');
    } else {
      document.documentElement.style.removeProperty('--color-text-primary');
      document.documentElement.style.removeProperty('--color-text-secondary');
      document.documentElement.style.removeProperty('--color-bg-surface');
      document.documentElement.style.removeProperty('--color-bg-card');
    }
  });
})();

/*  Smooth scroll for anchor links  */
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Move focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
