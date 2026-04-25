"use strict";

/* ── DOM helpers ──────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Theme – apply immediately to avoid flash ─────────────── */
(function () {
  const t = localStorage.getItem("brandis_theme");
  if (t && t !== "default") document.documentElement.dataset.theme = t;
})();

/* ── Mobile Menu (sidebar overlay) ───────────────────────── */
(function initMobileMenu() {
  const burger = $(".burger-btn");
  const menu = $(".main-nav");
  const backdrop = $(".nav-backdrop");
  const closeBtn = menu?.querySelector(".sidebar-close");
  if (!burger || !menu || !backdrop || !closeBtn) return;

  function openMenu() {
    menu.classList.add("open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    backdrop.classList.add("open");
  }

  function closeMenu() {
    menu.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    backdrop.classList.remove("open");
  }

  burger.addEventListener("click", () => {
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);
  $$("a", menu).forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

/* ── Theme Switcher ───────────────────────────────────────── */
(function initThemeSwitcher() {
  const THEMES = [
    { id: "default",     label: "Standard",    color: "#c4722a" },
    { id: "woodwalkers", label: "Woodwalkers", color: "#3d5a2a" },
    { id: "seawalkers",  label: "Seawalkers",  color: "#1b3f6e" },
    { id: "windwalkers", label: "Windwalkers", color: "#4a4e6b" },
  ];
  const STORAGE_KEY = "brandis_theme";
  let current = localStorage.getItem(STORAGE_KEY) || "default";

  const actions = $(".header-actions");
  if (!actions) return;

  const wrapper = document.createElement("div");
  wrapper.className = "theme-switcher";

  const btn = document.createElement("button");
  btn.className = "theme-btn";
  btn.setAttribute("aria-label", "Theme wechseln");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3c3.1 0 5.7-2.6 5.7-5.7C23 6.1 18 2 12 2z"/>
    <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`;

  const dropdown = document.createElement("div");
  dropdown.className = "theme-dropdown";
  dropdown.setAttribute("role", "menu");

  THEMES.forEach(({ id, label, color }) => {
    const opt = document.createElement("button");
    opt.className = "theme-option" + (id === current ? " active" : "");
    opt.setAttribute("role", "menuitem");
    opt.dataset.theme = id;
    opt.innerHTML = `<span class="theme-swatch" style="background:${color}"></span>${label}`;
    opt.addEventListener("click", () => {
      current = id;
      localStorage.setItem(STORAGE_KEY, id);
      applyTheme(id);
      closeDropdown();
    });
    dropdown.appendChild(opt);
  });

  wrapper.appendChild(btn);
  wrapper.appendChild(dropdown);
  actions.insertBefore(wrapper, actions.querySelector(".burger-btn"));

  function applyTheme(id) {
    if (id === "default") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
    dropdown.querySelectorAll(".theme-option").forEach((o) => {
      o.classList.toggle("active", o.dataset.theme === id);
    });
  }

  function openDropdown() {
    dropdown.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
  function closeDropdown() {
    dropdown.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.contains("open") ? closeDropdown() : openDropdown();
  });
  document.addEventListener("click", () => closeDropdown());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDropdown(); });
})();

/* ── Cart (localStorage + sidebar) ───────────────────────── */
(function initCart() {
  const STORAGE_KEY = "brandis_cart";

  function parsePrice(value) {
    if (!value) return 0;

    // Keep digits and decimal separators, then normalize to JS decimal format.
    let normalized = String(value).replace(/\s+/g, "").replace(/[^\d,.-]/g, "");
    if (!normalized) return 0;

    const hasComma = normalized.includes(",");
    const hasDot = normalized.includes(".");

    if (hasComma && hasDot) {
      // Assume last separator is decimal separator, remove the other one as thousands.
      if (normalized.lastIndexOf(",") > normalized.lastIndexOf(".")) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
      } else {
        normalized = normalized.replace(/,/g, "");
      }
    } else if (hasComma) {
      normalized = normalized.replace(",", ".");
    }

    const parsed = parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }

  let cart = loadCart();
  const sidebar = $(".cart-sidebar");
  const cartBackdrop = $(".cart-backdrop");
  if (!sidebar || !cartBackdrop) return;

  const itemsList   = sidebar.querySelector(".cart-sidebar__items");
  const emptyMsg    = sidebar.querySelector(".cart-sidebar__empty");
  const footerEl    = sidebar.querySelector(".cart-sidebar__footer");
  const totalPriceEl = sidebar.querySelector(".cart-sidebar__total-price");
  const countEl     = $(".cart-count");

  /* Inject clear-all button once */
  const clearBtn = document.createElement("button");
  clearBtn.className = "cart-sidebar__clear";
  clearBtn.textContent = "Alles löschen";
  clearBtn.setAttribute("aria-label", "Warenkorb leeren");
  footerEl.appendChild(clearBtn);
  clearBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  /* Render */
  function renderCart() {
    itemsList.innerHTML = "";

    const totalQty   = cart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const badgeQty = totalQty > 99 ? "99+" : String(totalQty);

    if (countEl) {
      countEl.textContent = badgeQty;
      countEl.setAttribute("aria-label", `${totalQty} Artikel im Warenkorb`);
    }

    const isEmpty = cart.length === 0;
    emptyMsg.style.display  = isEmpty ? "block" : "none";
    footerEl.style.display  = isEmpty ? "none"  : "flex";

    totalPriceEl.textContent = totalPrice.toFixed(2).replace(".", ",") + " CHF";

    cart.forEach((item, idx) => {
      const li = document.createElement("li");
      li.className = "cart-sidebar__item";
      li.innerHTML = `
        <div class="cart-sidebar__item-info">
          <span class="cart-sidebar__item-name">${item.name}</span>
          <span class="cart-sidebar__item-price">${(item.price * item.qty).toFixed(2).replace(".", ",")} CHF</span>
        </div>
        <div class="cart-sidebar__qty">
          <button class="cart-sidebar__qty-btn" data-idx="${idx}" data-delta="-1" aria-label="Menge verringern">−</button>
          <span class="cart-sidebar__qty-val">${item.qty}</span>
          <button class="cart-sidebar__qty-btn" data-idx="${idx}" data-delta="1" aria-label="Menge erhöhen">+</button>
        </div>
        <button class="cart-sidebar__remove" aria-label="${item.name} entfernen" data-idx="${idx}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>`;
      itemsList.appendChild(li);
    });

    itemsList.querySelectorAll(".cart-sidebar__qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx   = parseInt(btn.dataset.idx);
        const delta = parseInt(btn.dataset.delta);
        const newQty = cart[idx].qty + delta;
        if (newQty <= 0) {
          cart.splice(idx, 1);
        } else {
          cart[idx].qty = newQty;
        }
        saveCart();
        renderCart();
      });
    });

    itemsList.querySelectorAll(".cart-sidebar__remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        cart.splice(parseInt(btn.dataset.idx), 1);
        saveCart();
        renderCart();
      });
    });
  }

  /* Open / close */
  function openCart() {
    sidebar.classList.add("open");
    sidebar.setAttribute("aria-hidden", "false");
    cartBackdrop.classList.add("open");
  }
  function closeCart() {
    sidebar.classList.remove("open");
    sidebar.setAttribute("aria-hidden", "true");
    cartBackdrop.classList.remove("open");
  }

  $(".cart-btn")?.addEventListener("click", openCart);
  sidebar.querySelector(".cart-sidebar__close").addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  sidebar.querySelector(".cart-sidebar__checkout")?.addEventListener("click", () => {
    const parts = window.location.pathname.split("/");
    const htmlIdx = parts.lastIndexOf("html");
    const depth = htmlIdx === -1 ? 0 : parts.length - htmlIdx - 2;
    window.location.href = "../".repeat(depth) + "checkout.html";
  });

  /* Add to cart – detail page button */
  $$("button.btn--cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const detail = btn.closest(".product-detail");
      const card = btn.closest(".product-card");

      let name = document.title;
      let price = 0;
      let qty = 1;
      let img = "";
      let series = "";

      if (detail) {
        name   = detail.querySelector(".product-detail__title")?.textContent.trim() ?? document.title;
        price  = parsePrice(detail.querySelector(".product-detail__price")?.textContent ?? "0");
        qty    = parseInt(detail.querySelector("#qty")?.value) || 1;
        img    = detail.querySelector(".product-detail-cover-image")?.getAttribute("src")?.split("/").pop() ?? "";
        series = detail.querySelector(".product-detail__series")?.textContent.trim() ?? "";
      } else if (card) {
        name   = card.querySelector(".product-card__title")?.textContent.trim() ?? document.title;
        price  = parsePrice(card.querySelector(".product-card__price")?.textContent ?? "0");
        img    = card.querySelector(".product-cover-image")?.getAttribute("src")?.split("/").pop() ?? "";
        series = card.querySelector(".product-card__series")?.textContent.trim() ?? "";
      } else {
        name   = ($(".product-detail__title") || $("h1"))?.textContent.trim() ?? document.title;
        price  = parsePrice($(".product-detail__price")?.textContent ?? "0");
        img    = $(".product-detail-cover-image")?.getAttribute("src")?.split("/").pop() ?? "";
        series = $(".product-detail__series")?.textContent.trim() ?? "";
      }

      const existing = cart.find((i) => i.name === name);
      if (existing) {
        existing.qty += qty;
        if (!existing.img && img) existing.img = img;
        if (!existing.series && series) existing.series = series;
      } else {
        cart.push({ name, price, qty, img, series });
      }

      saveCart();
      renderCart();
      openCart();
    });
  });

  renderCart();
})();

/* ── Newsletter ───────────────────────────────────────────── */
(function initNewsletter() {
  const submitBtn = $("#nl-submit");
  const nameInput = $("#nl-name");
  const emailInput = $("#nl-email");
  const statusEl = $("#nl-status");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";

    // Simple validation
    if (!email || !isValidEmail(email)) {
      showStatus("Bitte gib eine gültige E-Mail-Adresse ein.", "error");
      emailInput && emailInput.focus();
      return;
    }

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet…";

    setTimeout(() => {
      showStatus(
        name
          ? `Danke, ${name}! Du bist jetzt angemeldet. 🌿`
          : "Danke! Du bist jetzt angemeldet. 🌿",
        "success",
      );
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      submitBtn.disabled = false;
      submitBtn.textContent = "Abonnieren";
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
    ".section-header",
    ".world-card",
    ".quote-card",
    ".author-strip",
    ".newsletter__text",
    ".newsletter__form-wrap",
  ];

  const allEls = $$(targets.join(","));
  allEls.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    // Fallback: show everything immediately
    allEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  allEls.forEach((el) => observer.observe(el));
})();
