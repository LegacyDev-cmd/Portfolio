/*
  Shared interaction logic for the Legacy Dev portfolio pages.
  Each section now lives in its own HTML file; this script keeps
  icon rendering, active navigation state, internal buttons and
  reveal animations consistent across all pages.
*/

document.addEventListener('DOMContentLoaded', () => {
  const inPagesDirectory = window.location.pathname.includes('/pages/');
  const pagePrefix = inPagesDirectory ? '' : 'pages/';

  const pageUrls = {
    home: inPagesDirectory ? '../index.html' : 'index.html',
    about: `${pagePrefix}chisono.html`,
    legacy: `${pagePrefix}legacy-dev.html`,
    skills: `${pagePrefix}competenze.html`,
    portfolio: `${pagePrefix}portfolio.html`,
    awards: `${pagePrefix}riconoscimenti.html`,
    contact: `${pagePrefix}contatto.html`,
    privacy: `${pagePrefix}privacy-policy.html`,
  };

  const currentPage = document.body.dataset.page || 'home';

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  document.querySelectorAll('[data-target]').forEach((el) => {
    const target = el.dataset.target;
    const url = pageUrls[target];

    if (!url) {
      return;
    }

    el.classList.toggle('active', target === currentPage);

    if (el.classList.contains('nav-btn')) {
      if (target === currentPage) {
        el.setAttribute('aria-current', 'page');
      } else {
        el.removeAttribute('aria-current');
      }
    }

    if (el.tagName.toLowerCase() === 'a') {
      el.setAttribute('href', url);
      return;
    }

    el.addEventListener('click', () => {
      window.location.href = url;
    });
  });

  const brandHome = document.getElementById('brand-home');

  if (brandHome && brandHome.tagName.toLowerCase() !== 'a') {
    brandHome.addEventListener('click', () => {
      window.location.href = pageUrls.home;
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});
