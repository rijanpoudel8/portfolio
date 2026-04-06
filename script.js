/* ── NAV SCROLL EFFECT ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // animate skill bars when they enter view
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.classList.add('animated');
      });

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => observer.observe(el));

/* ── SKILL BAR TRIGGER (if bar is inside already-visible element) ── */
document.querySelectorAll('.bar-fill').forEach(bar => {
  const parentReveal = bar.closest('.reveal');
  if (!parentReveal) {
    // no reveal wrapper — animate immediately
    bar.classList.add('animated');
  }
});

/* ── STAGGER PROJECT CARDS ── */
document.querySelectorAll('.project-card.reveal').forEach((card, i) => {
  card.style.transitionDelay = `${0.1 + i * 0.12}s`;
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--ink)';
        }
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

/* ── CV DOWNLOAD FALLBACK (if cv.pdf is missing) ── */
document.querySelector('a[download]')?.addEventListener('click', function(e) {
  // Test if file likely exists by checking extension; graceful fallback message
  // In production this just works naturally via the browser
});
