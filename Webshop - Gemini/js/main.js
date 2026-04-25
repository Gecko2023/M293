document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Form submission handling (Preventing actual reload for demo)
    const form = document.querySelector('.newsletter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fname').value;
        alert(`Danke für dein Interesse, ${name}! Du wurdest zum Newsletter hinzugefügt.`);
        form.reset();
    });
});