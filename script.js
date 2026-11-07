(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Keep the intro short and never block users who prefer reduced motion.
  const preloader = document.getElementById('preloader');
  const finishLoading = () => {
    preloader?.classList.add('done');
    window.setTimeout(() => preloader?.remove(), 900);
  };
  if (reducedMotion) finishLoading();
  else window.addEventListener('load', () => window.setTimeout(finishLoading, 450), { once: true });
  window.setTimeout(finishLoading, 2400);

  // Theme choice persists locally.
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = themeToggle?.querySelector('.theme-label');
  const themeGlyph = themeToggle?.querySelector('.theme-glyph');
  const themeLogos = document.querySelectorAll('.theme-logo');
  try {
    const saved = localStorage.getItem('ashutosh-portfolio-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (_) { /* local storage may be unavailable */ }
  const syncTheme = () => {
    const dark = root.dataset.theme !== 'light';
    if (themeLabel) themeLabel.textContent = dark ? 'Light' : 'Dark';
    if (themeGlyph) themeGlyph.textContent = dark ? '☼' : '◐';
    themeLogos.forEach(img => { const next = dark ? img.dataset.darkSrc : img.dataset.lightSrc; if (next) img.src = next; });
    themeToggle?.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#081426' : '#f4efe5');
  };
  syncTheme();
  themeToggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('ashutosh-portfolio-theme', root.dataset.theme); } catch (_) {}
    syncTheme();
  });

  // Mobile navigation.
  const nav = document.getElementById('mainNav');
  const menu = document.getElementById('menuToggle');
  const closeMenu = () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open menu');
  };
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open') ?? false;
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  // Scroll progress, header state and back-to-top affordance.
  const header = document.querySelector('.site-header');
  const progress = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  let scrollPending = false;
  const onScroll = () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progress) progress.style.width = `${pct}%`;
      header?.classList.toggle('scrolled', window.scrollY > 22);
      backToTop?.classList.toggle('visible', window.scrollY > 520);
      scrollPending = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

  // Section reveal and active navigation.
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
      revealObserver.observe(el);
    });
  } else revealEls.forEach(el => el.classList.add('is-visible'));

  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = nav?.querySelectorAll('a[href^="#"]') ?? [];
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => activeObserver.observe(section));
  }

  // Rotating focus label, with a short fade instead of a jump.
  const role = document.getElementById('roleSwitcher');
  const roles = ['Equity Research & Valuation', 'Financial Modelling', 'Corporate Finance', 'Business Analysis'];
  if (role && !reducedMotion) {
    let idx = 0;
    window.setInterval(() => {
      role.classList.add('swap');
      window.setTimeout(() => {
        idx = (idx + 1) % roles.length;
        role.textContent = roles[idx];
        role.classList.remove('swap');
      }, 260);
    }, 3200);
  }

  // Small ambient glow follows only a fine pointer.
  const glow = document.querySelector('.cursor-glow');
  if (finePointer && !reducedMotion && glow) {
    let raf = 0;
    window.addEventListener('pointermove', event => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
        glow.classList.add('visible');
        raf = 0;
      });
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow.classList.remove('visible'));
  }

  // Portrait parallax on desktop only.
  const visual = document.querySelector('.hero-visual');
  const portrait = visual?.querySelector('.portrait-wrap img');
  if (finePointer && !reducedMotion && visual && portrait) {
    visual.addEventListener('pointermove', event => {
      const r = visual.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - .5;
      const y = (event.clientY - r.top) / r.height - .5;
      portrait.style.transform = `translate(${x * 9}px, ${3 + y * 7}%) scale(1.015)`;
    });
    visual.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
  }

  // Certificate lightbox with keyboard close and focus return.
  const modal = document.getElementById('nism-certificate');
  const openCertificate = document.getElementById('certificateOpen');
  const closeCertificate = document.getElementById('modalClose');
  let previousFocus = null;
  const toggleModal = open => {
    if (!modal) return;
    modal.classList.toggle('open', open);
    modal.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { previousFocus = document.activeElement; closeCertificate?.focus(); }
    else previousFocus?.focus?.();
  };
  openCertificate?.addEventListener('click', event => { event.preventDefault(); toggleModal(true); });
  closeCertificate?.addEventListener('click', () => toggleModal(false));
  modal?.addEventListener('click', event => { if (event.target === modal) toggleModal(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('open')) toggleModal(false); });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
