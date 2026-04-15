/* ================================================
   DHARMESH ARORA — PREMIUM PORTFOLIO SCRIPTS
   Preloader, cursor, particles, counters, filters
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── PRELOADER ───
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hidden');
    }, 800);
  });

  // Fallback: hide preloader after 3s max
  setTimeout(() => {
    preloader?.classList.add('hidden');
  }, 3000);

  // ─── CUSTOM CURSOR ───
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .skill-card, .stat-card, .testimonial-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ─── STICKY NAV ───
  const header = document.getElementById('siteHeader');
  const observeTarget = document.createElement('div');
  observeTarget.style.cssText = 'position:absolute;top:80px;left:0;width:1px;height:1px;';
  document.body.prepend(observeTarget);

  const headerObserver = new IntersectionObserver(([e]) => {
    header?.classList.toggle('scrolled', !e.isIntersecting);
  }, { threshold: [1] });
  headerObserver.observe(observeTarget);

  // ─── MOBILE NAV ───
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    siteNav?.classList.toggle('is-active');
  });

  document.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle?.classList.remove('active');
      siteNav?.classList.remove('is-active');
    });
  });

  // ─── SCROLL REVEAL ANIMATION ───
  const animatedElements = document.querySelectorAll('[data-animate]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => revealObserver.observe(el));

  // ─── ANIMATED COUNTERS ───
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ─── SKILL BAR ANIMATION ───
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ─── PORTFOLIO FILTER ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ─── LIGHTBOX ───
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.portfolio-expand').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = btn.closest('.portfolio-img-wrap')?.querySelector('img');
      if (img && lightboxImg && lightbox) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Also allow clicking image area
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.portfolio-img-wrap img');
      if (img && lightboxImg && lightbox) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ─── CONTACT FORM ───
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        Message Sent!
      `;
      submitBtn.style.background = '#22c55e';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    }
  });

  // ─── FOOTER YEAR ───
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ─── HERO PARTICLES CANVAS ───
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resizeCanvas() {
      const section = canvas.closest('.hero-section');
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameId = requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    // Pause particles when not visible
    const heroSection = document.querySelector('.hero-section');
    const particleObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animFrameId) drawParticles();
      } else {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    });
    if (heroSection) particleObserver.observe(heroSection);
  }

  // ─── SMOOTH SCROLL for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── ACTIVE NAV HIGHLIGHT ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a');

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(sec => activeSectionObserver.observe(sec));

  // ─── REEL VIDEO PLAY / PAUSE ───
  const reelVideo = document.getElementById('reelVideo');
  const reelOverlay = document.getElementById('reelPlayOverlay');

  if (reelVideo && reelOverlay) {
    const playIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    const pauseIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" stroke="none"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
    const playBtn = reelOverlay.querySelector('.reel-play-btn');

    function setPlayState(playing) {
      if (playing) {
        reelOverlay.classList.add('playing');
        if (playBtn) playBtn.innerHTML = pauseIcon;
      } else {
        reelOverlay.classList.remove('playing');
        if (playBtn) playBtn.innerHTML = playIcon;
      }
    }

    reelOverlay.addEventListener('click', () => {
      if (reelVideo.paused) {
        reelVideo.play().then(() => setPlayState(true)).catch(() => {});
      } else {
        reelVideo.pause();
        setPlayState(false);
      }
    });

    reelVideo.addEventListener('play',  () => setPlayState(true));
    reelVideo.addEventListener('pause', () => setPlayState(false));
    reelVideo.addEventListener('ended', () => setPlayState(false));

    // Auto-pause when scrolled out of view
    const reelObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !reelVideo.paused) {
        reelVideo.pause();
      }
    }, { threshold: 0.2 });
    reelObserver.observe(reelVideo);
  }
});

// CSS for fadeIn animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .site-nav a.active { color: #f1f5f9 !important; }
`;
document.head.appendChild(styleSheet);
