"use strict";

(function () {
  const t = localStorage.getItem("brandis_theme");
  if (t && t !== "default") document.documentElement.dataset.theme = t;
})();

(function initCheckoutPage() {
  const STORAGE_KEY = "brandis_cart";

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  const cart = loadCart();
  const layout    = document.getElementById("checkout-layout");
  const emptyEl   = document.getElementById("checkout-empty");
  const popupEl   = document.getElementById("checkout-popup");
  const form      = document.getElementById("checkout-form");
  const tableBody = document.getElementById("checkout-table-body");
  const totalEl   = document.getElementById("checkout-total");

  if (cart.length === 0) {
    layout?.setAttribute("hidden", "");
    emptyEl?.removeAttribute("hidden");
    return;
  }

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cart.forEach((item) => {
      const tr = document.createElement("tr");
      const shortDesc = item.series
        ? `<span class="checkout-table__series">${item.series}</span>`
        : "";
      const imgHtml = item.img
        ? `<img src="../img/${item.img}" alt="${item.name}" class="checkout-table__img" loading="lazy" />`
        : `<div class="checkout-table__img-placeholder"></div>`;
      tr.innerHTML = `
        <td class="checkout-table__cell-img">${imgHtml}</td>
        <td class="checkout-table__cell-name">
          <span class="checkout-table__name">${item.name}</span>
          ${shortDesc}
        </td>
        <td class="checkout-table__cell-qty">${item.qty}</td>
        <td class="checkout-table__cell-price">${(item.price * item.qty).toFixed(2).replace(".", ",")} CHF</td>`;
      tableBody.appendChild(tr);
    });
    if (totalEl) totalEl.textContent = total.toFixed(2).replace(".", ",") + " CHF";
  }

  renderTable();

  /* Card / expiry auto-format */
  const cardInput   = document.getElementById("co-card");
  const expiryInput = document.getElementById("co-expiry");

  cardInput?.addEventListener("input", () => {
    const v = cardInput.value.replace(/\D/g, "").slice(0, 16);
    cardInput.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  expiryInput?.addEventListener("input", () => {
    let v = expiryInput.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    expiryInput.value = v;
  });

  /* Validation helpers */
  const notEmpty  = (s) => s.length > 0;
  const isEmail   = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  const isZip     = (s) => /^\d{4,6}$/.test(s);
  const isCard    = (s) => s.replace(/\s/g, "").length === 16;
  const isExpiry  = (s) => {
    if (!/^\d{2}\/\d{2}$/.test(s)) return false;
    const [mm, yy] = s.split("/").map(Number);
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const exp = new Date(2000 + yy, mm - 1, 1);
    return exp >= new Date(now.getFullYear(), now.getMonth(), 1);
  };
  const isCvv     = (s) => /^\d{3,4}$/.test(s);

  function validate(input, check) {
    const ok = check(input.value.trim());
    input.classList.toggle("error", !ok);
    return ok;
  }

  /* Clear error on re-entry */
  form?.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) input.classList.remove("error");
    });
  });

  /* Submit */
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const checks = [
      [document.getElementById("co-firstname"), notEmpty],
      [document.getElementById("co-lastname"),  notEmpty],
      [document.getElementById("co-email"),     isEmail],
      [document.getElementById("co-address"),   notEmpty],
      [document.getElementById("co-zip"),       isZip],
      [document.getElementById("co-city"),      notEmpty],
      [document.getElementById("co-card"),      isCard],
      [document.getElementById("co-expiry"),    isExpiry],
      [document.getElementById("co-cvv"),       isCvv],
    ];

    const allValid = checks.map(([input, fn]) => validate(input, fn)).every(Boolean);
    if (!allValid) {
      form.querySelector("input.error")?.focus();
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird verarbeitet…";

    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "[]");
      document.querySelectorAll(".cart-count").forEach((el) => (el.textContent = "0"));
      popupEl?.removeAttribute("hidden");
      submitBtn.disabled = false;
      submitBtn.textContent = "Jetzt bestellen";
    }, 1000);
  });
})();
