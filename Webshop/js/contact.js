/* Contact page group script: contact form handling. */
(function initContactForm() {
  const submitBtn = document.querySelector("#ct-submit");
  if (!submitBtn) return;

  const nameInput = document.querySelector("#ct-name");
  const emailInput = document.querySelector("#ct-email");
  const subjectInput = document.querySelector("#ct-subject");
  const messageInput = document.querySelector("#ct-message");
  const statusEl = document.querySelector("#ct-status");

  submitBtn.addEventListener("click", () => {
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!email || !isValidEmail(email)) {
      showStatus("Bitte gib eine gültige E-Mail-Adresse ein.", "error");
      if (emailInput) emailInput.focus();
      return;
    }

    if (!message) {
      showStatus("Bitte schreib uns eine Nachricht.", "error");
      if (messageInput) messageInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet...";

    setTimeout(() => {
      const name = nameInput ? nameInput.value.trim() : "";
      showStatus(
        name
          ? `Danke, ${name}! Wir melden uns bald bei dir.`
          : "Danke! Wir melden uns bald bei dir.",
        "success",
      );
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (subjectInput) subjectInput.value = "";
      if (messageInput) messageInput.value = "";
      submitBtn.disabled = false;
      submitBtn.textContent = "Nachricht senden";
    }, 1000);
  });

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = `form-status ${type}`;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
})();
