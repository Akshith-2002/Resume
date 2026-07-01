// Akshith Kumar Y V — "Build Log"
// Behavior layer. No deps. Hand-tuned.

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Mark the document as JS-capable. CSS uses .js to gate any
  // progressive-enhancement that would otherwise hide content from no-JS users.
  document.documentElement.classList.add('js');

  // -------------------- THEME --------------------
  // Dark is the brand default. We honor an explicit user choice from a previous
  // visit (localStorage), but we don't auto-switch on system pref — the design
  // is dark-first and a one-tap toggle covers light-mode users.
  const THEME_KEY = 'akshith.theme';
  const root = document.documentElement;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') root.dataset.theme = stored;
  } catch { /* private mode / sandboxed: keep HTML default */ }

  const themeBtn = $('[data-theme-toggle]');
  const updateThemeBtn = () => {
    themeBtn?.setAttribute('aria-pressed', root.dataset.theme === 'light' ? 'true' : 'false');
  };
  updateThemeBtn();

  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, root.dataset.theme);
    updateThemeBtn();
  });

  // -------------------- CLOCK (UTC+5:30, Asia/Kolkata) --------------------
  const clockEls = $$('[data-clock]');
  const fmt = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone: 'Asia/Kolkata',
  });
  const tickClock = () => {
    const t = fmt.format(new Date()) + ' IST';
    clockEls.forEach(el => { el.textContent = t; });
  };
  tickClock();
  setInterval(tickClock, 1000);

  // -------------------- HERO GRID CURSOR --------------------
  const hero = $('.hero');
  const heroGrid = $('.hero-grid');
  if (hero && heroGrid && !reduceMotion && !window.matchMedia('(pointer: coarse)').matches) {
    let raf = 0, mx = 50, my = 50;
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width) * 100;
      my = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(() => {
        heroGrid.style.setProperty('--mx', mx + '%');
        heroGrid.style.setProperty('--my', my + '%');
        raf = 0;
      });
    });
    hero.addEventListener('mouseleave', () => {
      heroGrid.style.setProperty('--mx', '50%');
      heroGrid.style.setProperty('--my', '50%');
    });
  }

  // -------------------- COUNT-UP KPIs --------------------
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const animateCount = (el, to, suffix, duration = 1200) => {
    if (reduceMotion) { el.textContent = to.toLocaleString() + suffix; return; }
    const start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / duration);
      const v = Math.round(to * easeOutCubic(p));
      el.textContent = v.toLocaleString() + (p < 1 ? '' : suffix);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = to.toLocaleString() + suffix;
    };
    requestAnimationFrame(tick);
  };

  const kpiObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const to = Number(el.dataset.countTo);
      const suffix = el.dataset.suffix || '';
      animateCount(el, to, suffix);
      kpiObserver.unobserve(el);
    });
  }, { threshold: 0.4 });

  $$('[data-count-to]').forEach(el => kpiObserver.observe(el));

  // -------------------- REVEAL ON SCROLL --------------------
  // Reveal cards (small bits) as they enter viewport. Sections are always shown
  // so headings/structure don't fade in awkwardly on slow scrolls.
  const revealTargets = $$('.signal-card, .pillar, .case, .job, .cap-row');
  revealTargets.forEach(el => el.classList.add('js-reveal'));
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));

  // Failsafe: if any card is still hidden 900ms after load, force-reveal it.
  // Prevents permanently invisible content if IO fails (headless browsers,
  // odd viewport, prefers-reduced-motion, etc.).
  setTimeout(() => {
    $$('.js-reveal:not(.is-revealed)').forEach(el => el.classList.add('is-revealed'));
  }, 900);

  // -------------------- COMMAND PALETTE --------------------
  const palette = $('#cmd-palette');
  const cmdInput = $('#cmd-input');
  const cmdList = $('#cmd-list');
  const cmdTrigger = $('[data-cmd-trigger]');

  // root path so commands work the same on the index page and on case pages
  const HOME = (() => {
    const p = location.pathname;
    if (p.endsWith('/') || p.endsWith('/index.html')) return '';
    // we're on a sub-page (case-*.html, cv.html); jumps need the index page
    return 'index.html';
  })();

  const COMMANDS = [
    { icon: '01', label: 'Services', meta: 'NAV', run: () => location.href = HOME + '#services' },
    { icon: '02', label: 'Selected Work', meta: 'NAV', run: () => location.href = HOME + '#dossier' },
    { icon: '2b', label: 'More Automations', meta: 'NAV', run: () => location.href = HOME + '#automations' },
    { icon: '03', label: 'Process', meta: 'NAV', run: () => location.href = HOME + '#approach' },
    { icon: '04', label: 'Stack & Tools', meta: 'NAV', run: () => location.href = HOME + '#capabilities' },
    { icon: '05', label: 'Experience', meta: 'NAV', run: () => location.href = HOME + '#experience' },
    { icon: '06', label: 'Contact', meta: 'NAV', run: () => location.href = HOME + '#contact' },
    { icon: '↑', label: 'Back to top', meta: 'NAV', run: () => location.href = HOME + '#top' },
    { icon: '↗', label: 'Open Resume — printable PDF', meta: 'PAGE', run: () => location.href = 'cv.html' },
    { icon: '①', label: 'Project · StackD Smart Vending', meta: 'PROJECT', run: () => location.href = 'case-stackd.html' },
    { icon: '②', label: 'Project · Rayna Tours', meta: 'PROJECT', run: () => location.href = 'case-rayna.html' },
    { icon: '③', label: 'Project · HackAtion 2025 (won)', meta: 'PROJECT', run: () => location.href = 'case-hackation.html' },
    { icon: '④', label: 'Project · BLive EZY', meta: 'PROJECT', run: () => location.href = 'case-blive.html' },
    { icon: '⑤', label: 'Project · Open Credits', meta: 'PROJECT', run: () => location.href = 'case-opencredits.html' },
    { icon: '⑥', label: 'Project · Visa Automation', meta: 'PROJECT', run: () => location.href = 'case-visa.html' },
    { icon: '⑦', label: 'Project · ISL Sign Recognition', meta: 'PROJECT', run: () => location.href = 'case-isl.html' },
    { icon: '✉', label: 'Copy email — akshithy888@gmail.com', meta: 'COPY', run: () => copy('akshithy888@gmail.com') },
    { icon: '☎', label: 'Copy phone — +91 90195 33772', meta: 'COPY', run: () => copy('+919019533772') },
    { icon: '↗', label: 'Open LinkedIn', meta: 'LINK', run: () => window.open('https://linkedin.com/in/akshithyv', '_blank', 'noopener') },
    { icon: '✉', label: 'Compose email', meta: 'ACTION', run: () => location.href = 'mailto:akshithy888@gmail.com' },
    { icon: '◐', label: 'Toggle theme', meta: 'ACTION', run: () => themeBtn?.click() },
    { icon: '↓', label: 'Print / save as PDF', meta: 'ACTION', run: () => window.print() },
  ];

  let active = 0;
  let filtered = COMMANDS.slice();

  const renderCmds = () => {
    if (!cmdList) return;
    cmdList.innerHTML = '';
    if (!filtered.length) {
      const li = document.createElement('li');
      li.className = 'cmd-item';
      li.innerHTML = `<span class="cmd-icon">∅</span><span>No matches</span>`;
      cmdList.appendChild(li);
      return;
    }
    filtered.forEach((c, i) => {
      const li = document.createElement('li');
      li.className = 'cmd-item';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === active ? 'true' : 'false');
      li.innerHTML = `<span class="cmd-icon">${c.icon}</span><span>${c.label}</span><span class="cmd-meta">${c.meta}</span>`;
      li.addEventListener('mouseenter', () => { active = i; updateActive(); });
      li.addEventListener('click', () => runActive());
      cmdList.appendChild(li);
    });
  };

  const updateActive = () => {
    $$('.cmd-item', cmdList).forEach((el, i) => el.setAttribute('aria-selected', i === active ? 'true' : 'false'));
    const el = cmdList.children[active];
    el?.scrollIntoView({ block: 'nearest' });
  };

  const filterCmds = q => {
    const lower = q.toLowerCase().trim();
    filtered = lower
      ? COMMANDS.filter(c => c.label.toLowerCase().includes(lower) || c.meta.toLowerCase().includes(lower))
      : COMMANDS.slice();
    active = 0;
    renderCmds();
  };

  const runActive = () => {
    const c = filtered[active];
    if (!c) return;
    palette.close();
    setTimeout(c.run, 80);
  };

  const openPalette = () => {
    if (!palette) return;
    filtered = COMMANDS.slice(); active = 0;
    if (cmdInput) cmdInput.value = '';
    renderCmds();
    palette.showModal();
    setTimeout(() => cmdInput?.focus(), 30);
  };

  cmdTrigger?.addEventListener('click', openPalette);

  document.addEventListener('keydown', e => {
    const isMod = e.metaKey || e.ctrlKey;
    if (isMod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette?.open ? palette.close() : openPalette();
      return;
    }
    if (e.key === '/' && !palette?.open && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      openPalette();
    }
  });

  cmdInput?.addEventListener('input', e => filterCmds(e.target.value));
  cmdInput?.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); updateActive(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); updateActive(); }
    else if (e.key === 'Enter') { e.preventDefault(); runActive(); }
  });

  const copy = async text => {
    try {
      await navigator.clipboard.writeText(text);
      flash(`Copied: ${text}`);
    } catch {
      flash(`Copy failed — ${text}`);
    }
  };

  // -------------------- TOAST FLASH --------------------
  let toastEl = null, toastTimer = 0;
  const flash = msg => {
    if (!toastEl) {
      toastEl = document.createElement('div');
      Object.assign(toastEl.style, {
        position: 'fixed', bottom: '64px', left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        background: 'var(--panel-2)', color: 'var(--ink)',
        border: '2px solid var(--edge)',
        padding: '10px 16px', borderRadius: '0',
        fontFamily: 'var(--ff-mono)', fontSize: '13px',
        opacity: '0', transition: 'opacity .25s var(--ease-out), transform .25s var(--ease-out)',
        zIndex: '100', pointerEvents: 'none', maxWidth: '90vw',
      });
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => {
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateX(-50%) translateY(20px)';
    }, 1800);
  };

  // -------------------- HERO LOAD CHOREOGRAPHY --------------------
  if (!reduceMotion) {
    const morphLines = $$('[data-morph]');
    morphLines.forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(24px)';
      line.style.filter = 'blur(8px)';
      line.style.transition = `opacity 800ms var(--ease-out) ${100 + i * 120}ms, transform 800ms var(--ease-out) ${100 + i * 120}ms, filter 800ms var(--ease-out) ${100 + i * 120}ms`;
    });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      morphLines.forEach(line => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        line.style.filter = 'blur(0)';
      });
    }));
  }

  // -------------------- SMOOTH HASH SCROLL OFFSET --------------------
  // sticky topbar offsets default scroll; nudge after navigation
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    history.pushState(null, '', '#' + id);
  });

})();
