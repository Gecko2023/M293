const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    nav.hidden = isExpanded;
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) {
      nav.hidden = false;
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      nav.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const newsletterForm = document.querySelector('#newsletter-form');
const message = document.querySelector('#form-message');

if (newsletterForm && message) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(newsletterForm);
    const firstName = String(formData.get('firstName') || '').trim();
    const email = String(formData.get('email') || '').trim();

    if (!firstName || !email) {
      message.textContent = 'Bitte Vorname und E-Mail ausfüllen.';
      return;
    }

    if (!email.includes('@')) {
      message.textContent = 'Bitte eine gültige E-Mail-Adresse angeben.';
      return;
    }

    message.textContent = `Danke ${firstName}, du bist jetzt angemeldet.`;
    newsletterForm.reset();
  });
}
