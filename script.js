/* ============================================================
   PORTFOLIO — El Boudali Zakaria | script.js
   ============================================================ */

/* ── Navbar scroll effect & active link ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled style
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinksContainer.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Close on link click
navLinksContainer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

/* ── Count-up animation ── */
function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Skill bar animation ── */
function animateSkillBars(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    skillBarObserver.unobserve(entry.target);
  });
}

const skillBarObserver = new IntersectionObserver(animateSkillBars, {
  threshold: 0.2,
});
document.querySelectorAll('.skill-category').forEach(cat => skillBarObserver.observe(cat));

/* ── Scroll-triggered fade-up & count-up ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');

    // Count-up on any [data-count] inside
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      if (!el.dataset.counted) {
        el.dataset.counted = '1';
        countUp(el);
      }
    });

    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Hero stats — trigger immediately when in view (they're in the first viewport)
const heroStatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      if (!el.dataset.counted) {
        el.dataset.counted = '1';
        countUp(el);
      }
    });
    heroStatObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelector('.hero-stats') && heroStatObserver.observe(document.querySelector('.hero-stats'));

/* ── Contact form handler ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('#contact-name').value.trim();
  const email = form.querySelector('#contact-email').value.trim();
  const subject = form.querySelector('#contact-subject').value.trim() || 'Contact depuis portfolio';
  const message = form.querySelector('#contact-message').value.trim();
  const feedback = document.getElementById('form-feedback');

  const body = encodeURIComponent(`Bonjour Zakaria,\n\nJe vous contacte depuis votre portfolio.\n\nNom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`);
  const mailtoLink = `mailto:ZakariaELBoudali@outlook.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailtoLink;

  feedback.style.display = 'block';
  feedback.style.color = '#4ade80';
  feedback.textContent = '✓ Votre client email s\'est ouvert. Merci pour votre message !';
}

/* ── Smooth scroll for all in-page anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
