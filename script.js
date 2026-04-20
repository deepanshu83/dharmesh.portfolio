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

  // ─── CONTACT FORM → WHATSAPP ───
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contactName')?.value.trim() || '';
    const email   = document.getElementById('contactEmail')?.value.trim() || '';
    const subject = document.getElementById('contactSubject')?.value.trim() || '';
    const message = document.getElementById('contactMessage')?.value.trim() || '';

    const text =
      `👋 *New Portfolio Enquiry*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Subject:* ${subject}\n\n` +
      `*Message:*\n${message}`;

    const whatsappURL = `https://wa.me/918505001880?text=${encodeURIComponent(text)}`;

    // Show success state briefly, then open WhatsApp
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Opening WhatsApp…
      `;
      submitBtn.style.background = '#25D366';
      submitBtn.disabled = true;

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 400);

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2500);
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
  const reelPrevBtn = document.querySelector('.reel-prev-btn');
  const reelNextBtn = document.querySelector('.reel-next-btn');
  const reelDots = document.querySelectorAll('.reel-dot');
  const reelCurrentLabel = document.querySelector('.reel-current-label');

  const reelSources = [
    { video: 'assets/trending-reel.mp4', label: 'Reel Edit' },
    { video: 'assets/video1.mp4', label: 'Video 1' },
    { video: 'assets/video2.mp4', label: 'Video 2' }
  ];

  let currentReelIndex = 0;

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

    function updateReelSource(index) {
      if (index < 0 || index >= reelSources.length) return;
      currentReelIndex = index;
      const source = reelSources[index];
      const sourceEl = reelVideo.querySelector('source');
      if (sourceEl) {
        sourceEl.src = source.video;
        reelVideo.load();
      }
      if (reelCurrentLabel) {
        reelCurrentLabel.textContent = source.label;
      }
      reelDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    reelOverlay.addEventListener('click', () => {
      if (reelVideo.paused) {
        reelVideo.play().then(() => setPlayState(true)).catch(() => {});
      } else {
        reelVideo.pause();
        setPlayState(false);
      }
    });

    reelPrevBtn?.addEventListener('click', () => {
      updateReelSource((currentReelIndex - 1 + reelSources.length) % reelSources.length);
    });

    reelNextBtn?.addEventListener('click', () => {
      updateReelSource((currentReelIndex + 1) % reelSources.length);
    });

    reelDots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateReelSource(index));
    });

    // Swipe functionality for mobile
    let startX = 0;
    let endX = 0;

    reelVideo.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    reelVideo.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          // Swipe left - next video
          updateReelSource((currentReelIndex + 1) % reelSources.length);
        } else {
          // Swipe right - previous video
          updateReelSource((currentReelIndex - 1 + reelSources.length) % reelSources.length);
        }
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
