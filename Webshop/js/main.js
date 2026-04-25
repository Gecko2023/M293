    /**
 * Brandis-Shop — main.js
 * Handles: mobile menu, newsletter, cart, scroll reveals
 */

'use strict';

/* ── DOM helpers ──────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Mobile Menu (sidebar overlay) ───────────────────────── */
(function initMobileMenu() {
  const burger = $('.burger-btn');
  const menu   = $('.main-nav');
  if (!burger || !menu) return;

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  // Close button inside sidebar
  const closeBtn = document.createElement('button');
  closeBtn.className = 'sidebar-close';
  closeBtn.setAttribute('aria-label', 'Menü schließen');
  closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  menu.prepend(closeBtn);

  function openMenu() {
    menu.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  $$('a', menu).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
})();


/* ── Cart (simple state) ──────────────────────────────────── */
(function initCart() {
  let cartCount = 0;
  const countEl = $('.cart-count');

  $$('.btn--cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      if (countEl) {
        countEl.textContent = cartCount;
        countEl.setAttribute('aria-label', `${cartCount} Artikel im Warenkorb`);
      }

      // Visual feedback on button
      const original = btn.innerHTML;
      btn.textContent = '✓ Hinzugefügt';
      btn.style.background = 'var(--clr-moss)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 1400);
    });
  });
})();


/* ── Newsletter ───────────────────────────────────────────── */
(function initNewsletter() {
  const submitBtn = $('#nl-submit');
  const nameInput = $('#nl-name');
  const emailInput = $('#nl-email');
  const statusEl  = $('#nl-status');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', () => {
    const name  = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    // Simple validation
    if (!email || !isValidEmail(email)) {
      showStatus('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
      emailInput && emailInput.focus();
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet…';

    setTimeout(() => {
      showStatus(
        name
          ? `Danke, ${name}! Du bist jetzt angemeldet. 🌿`
          : 'Danke! Du bist jetzt angemeldet. 🌿',
        'success'
      );
      if (nameInput)  nameInput.value  = '';
      if (emailInput) emailInput.value = '';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Abonnieren';
    }, 1000);
  });

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = `newsletter__note ${type}`;
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }
})();


/* ── Scroll Reveal ────────────────────────────────────────── */
(function initReveal() {
  const targets = [
    '.section-header',
    '.product-card',
    '.world-card',
    '.quote-card',
    '.author-strip',
    '.newsletter__text',
    '.newsletter__form-wrap',
  ];

  const allEls = $$(targets.join(','));
  allEls.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    allEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  allEls.forEach(el => observer.observe(el));
})();


/* ── Product Filter ───────────────────────────────────────── */
(function initProductFilter() {
  const pills = $$('.filter-pill');
  const grid  = $('.product-grid');
  if (!pills.length || !grid) return;

  function applyFilter(filter) {
    pills.forEach(p => p.classList.remove('active'));
    const activePill = $(`.filter-pill[data-filter="${filter}"]`) || pills[0];
    activePill.classList.add('active');
    if (filter === 'alle') {
      delete grid.dataset.filter;
    } else {
      grid.dataset.filter = filter;
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => applyFilter(pill.dataset.filter));
  });

  // Activate filter from URL param (?filter=woodwalkers)
  const param = new URLSearchParams(window.location.search).get('filter');
  if (param) applyFilter(param);
})();


/* ── Contact Form ─────────────────────────────────────────── */
(function initContactForm() {
  const submitBtn = $('#ct-submit');
  if (!submitBtn) return;

  const nameInput    = $('#ct-name');
  const emailInput   = $('#ct-email');
  const subjectInput = $('#ct-subject');
  const messageInput = $('#ct-message');
  const statusEl     = $('#ct-status');

  submitBtn.addEventListener('click', () => {
    const email   = emailInput   ? emailInput.value.trim()   : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!email || !isValidEmail(email)) {
      showStatus('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
      emailInput && emailInput.focus();
      return;
    }
    if (!message) {
      showStatus('Bitte schreib uns eine Nachricht.', 'error');
      messageInput && messageInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet…';

    setTimeout(() => {
      const name = nameInput ? nameInput.value.trim() : '';
      showStatus(
        name ? `Danke, ${name}! Wir melden uns bald bei dir. 🌿` : 'Danke! Wir melden uns bald bei dir. 🌿',
        'success'
      );
      if (nameInput)    nameInput.value    = '';
      if (emailInput)   emailInput.value   = '';
      if (subjectInput) subjectInput.value = '';
      if (messageInput) messageInput.value = '';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Nachricht senden';
    }, 1000);
  });

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = `form-status ${type}`;
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }
})();
