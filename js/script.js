/* ============================================================
   VINAYAK GROUP OF EDUCATION — MAIN JS
   ============================================================ */

/* ─── NAVBAR SCROLL EFFECT ───────────────────────────────── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ─── MOBILE MENU TOGGLE ─────────────────────────────────── */
const toggle = document.querySelector('.navbar__toggle');
const mobileMenu = document.querySelector('.navbar__mobile');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const allLinks = document.querySelectorAll('.navbar__links a, .navbar__mobile a');
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ─── SCROLL REVEAL OBSERVER ─────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ─── COUNTER ANIMATION ──────────────────────────────────── */
function animateCounter(el, target, duration) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ─── COURSE TABS ────────────────────────────────────────── */
(function initCourseTabs() {
  const tabs = document.querySelectorAll('.course-tab');
  const panels = document.querySelectorAll('.course-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ─── CONTACT FORM SUBMIT ────────────────────────────────── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit-btn');
    const success = form.querySelector('.form-success');

    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }
    }, 1400);
  });
})();

/* ─── GALLERY LIGHTBOX ───────────────────────────────────── */
(function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    display:none; position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.92); align-items:center;
    justify-content:center; padding:20px;
  `;
  lb.innerHTML = `
    <button id="lb-close" style="position:absolute;top:20px;right:24px;
      background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;
      line-height:1;padding:8px;">&#x2715;</button>
    <img id="lb-img" src="" alt="" style="max-width:90vw;max-height:85vh;
      border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);object-fit:contain;">
    <div id="lb-caption" style="position:absolute;bottom:24px;left:50%;
      transform:translateX(-50%);color:rgba(255,255,255,0.7);font-size:0.85rem;
      letter-spacing:0.08em;text-transform:uppercase;font-family:var(--font-body);"></div>
  `;
  document.body.appendChild(lb);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-item__overlay span');
      document.getElementById('lb-img').src = img.src;
      document.getElementById('lb-caption').textContent = caption ? caption.textContent : '';
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });

  function closeLb() {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }
})();

/* ─── SMOOTH ANCHOR SCROLL ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 88;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
