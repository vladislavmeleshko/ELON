/**
 * НПК «ЭЛОН» — Corporate Website
 * Main JavaScript
 */

'use strict';

/* ─── DOM Ready ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initPortfolioFilter();
  initClientCardLinks();
  initCounters();
  initBackToTop();
  initContactForm();
  initNavActiveLinks();
});

/* ─── Navigation ─────────────────────────────────────────────── */
function initNavigation() {
  const header  = document.getElementById('header');
  const burger  = document.getElementById('navBurger');
  const menu    = document.getElementById('navMenu');

  // Sticky header on scroll
  const handleScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile burger
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on nav link click
    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ─── Active Nav Links (Scroll Spy) ─────────────────────────── */
function initNavActiveLinks() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('is-active', href === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ─── Scroll Reveal ──────────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-up');

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children within the same parent
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll('.reveal, .reveal-up')
          ).filter(el => el.parentElement === entry.target.parentElement);
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400);

          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ─── Portfolio Filter ───────────────────────────────────────── */
function initPortfolioFilter() {
  const grid       = document.getElementById('portfolioGrid');
  if (!grid) return;

  const cards      = Array.from(grid.querySelectorAll('.project-card'));
  const typeBtns   = document.querySelectorAll('[data-type]');
  const cityBtns   = document.querySelectorAll('[data-city]');
  const clientBtns = document.querySelectorAll('[data-client]');

  let activeType   = 'all';
  let activeCity   = 'all';
  let activeClient = 'all';

  function applyFilters() {
    let visible = 0;
    cards.forEach(card => {
      const typeMatch   = activeType   === 'all' || card.dataset.type   === activeType;
      const cityMatch   = activeCity   === 'all' || card.dataset.city   === activeCity;
      const clientMatch = activeClient === 'all' || card.dataset.client === activeClient;
      const show = typeMatch && cityMatch && clientMatch;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    // Show empty state if no results
    const empty = grid.querySelector('.portfolio__empty');
    if (visible === 0) {
      if (!empty) {
        const div = document.createElement('div');
        div.className = 'portfolio__empty';
        div.style.cssText = 'grid-column:1/-1;text-align:center;padding:3rem;color:var(--c-text-muted);font-size:1rem;';
        div.textContent = 'По выбранным фильтрам объекты не найдены.';
        grid.appendChild(div);
      }
    } else {
      if (empty) empty.remove();
    }
  }

  function setActive(btns, value) {
    btns.forEach(btn => btn.classList.toggle('is-active', btn.dataset[Object.keys(btn.dataset)[0]] === value));
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.type;
      setActive(typeBtns, activeType);
      applyFilters();
    });
  });

  cityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCity = btn.dataset.city;
      setActive(cityBtns, activeCity);
      applyFilters();
    });
  });

  clientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeClient = btn.dataset.client;
      setActive(clientBtns, activeClient);
      applyFilters();
    });
  });
}

/* ─── Number Counters ────────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOutCubic(progress) * target);
      el.textContent = value.toLocaleString('ru-RU');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ─── Back To Top ────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Contact Form ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name:    { el: form.querySelector('#fName'),    validate: v => v.trim().length >= 2 },
    email:   { el: form.querySelector('#fEmail'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    message: { el: form.querySelector('#fMessage'), validate: v => v.trim().length >= 10 },
  };

  const errors = {
    name:    'Укажите ваше имя (минимум 2 символа)',
    email:   'Введите корректный email-адрес',
    message: 'Сообщение должно содержать минимум 10 символов',
  };

  function showError(key, msg) {
    const field = fields[key];
    if (!field.el) return;
    field.el.classList.add('is-invalid');
    const errorEl = field.el.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(key) {
    const field = fields[key];
    if (!field.el) return;
    field.el.classList.remove('is-invalid');
    const errorEl = field.el.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';
  }

  // Live validation
  Object.entries(fields).forEach(([key, config]) => {
    if (!config.el) return;
    config.el.addEventListener('blur', () => {
      if (!config.validate(config.el.value)) {
        showError(key, errors[key]);
      } else {
        clearError(key);
      }
    });
    config.el.addEventListener('input', () => {
      if (config.el.classList.contains('is-invalid') && config.validate(config.el.value)) {
        clearError(key);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.entries(fields).forEach(([key, config]) => {
      if (!config.el) return;
      if (!config.validate(config.el.value)) {
        showError(key, errors[key]);
        isValid = false;
      } else {
        clearError(key);
      }
    });

    if (!isValid) return;

    // Simulate submission (replace with actual endpoint)
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем…';

    setTimeout(() => {
      form.innerHTML = `
        <div class="form-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h4>Сообщение отправлено!</h4>
          <p>Мы свяжемся с вами в ближайшее время.<br>Спасибо за обращение в НПК «ЭЛОН».</p>
        </div>
      `;
    }, 1200);
  });
}

/* ─── Client card → portfolio filter links ───────────────────── */
function initClientCardLinks() {
  document.querySelectorAll('[data-filter-client]').forEach(link => {
    link.addEventListener('click', () => {
      const clientValue = link.dataset.filterClient;
      const filterBtn = document.querySelector(`.filter-btn[data-client="${clientValue}"]`);
      if (filterBtn) filterBtn.click();
    });
  });
}

/* ─── Smooth anchor scroll polyfill for Safari ───────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
