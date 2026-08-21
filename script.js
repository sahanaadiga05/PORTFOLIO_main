// Register GSAP plugins
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const deviceMemory = navigator.deviceMemory || 4;
const hardwareConcurrency = navigator.hardwareConcurrency || 4;
const prefersDataSaver = Boolean(connection?.saveData);
const isCompactViewport = window.innerWidth < 1280;
const isLowPowerDevice = deviceMemory <= 4 || hardwareConcurrency <= 6;
const shouldUseLightEffects = prefersReducedMotion.matches || prefersDataSaver || !supportsFinePointer || isCompactViewport || isLowPowerDevice;

// ==========================================================================
// LENIS SMOOTH SCROLLING
// ==========================================================================
const initLenis = () => {
  if (typeof Lenis === 'undefined') return;

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 1.5,
    infinite: false,
  });

  if (window.ScrollTrigger) {
    lenisInstance.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
};

// ==========================================================================
// SMOOTH ANCHOR LINKS
// ==========================================================================
const initSmoothAnchorLinks = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      if (lenisInstance) {
        lenisInstance.scrollTo(target, {
          offset: -110,
          duration: 1.1,
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
};

// ==========================================================================
// CUSTOM CURSOR
// ==========================================================================
const initCustomCursor = () => {
  if (shouldUseLightEffects) return;

  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
  const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
  const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
  const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    setCursorX(mouseX);
    setCursorY(mouseY);
  }, { passive: true });

  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;
    setFollowerX(followerX);
    setFollowerY(followerY);
  });

  const hoverElements = document.querySelectorAll('a, button, .magnetic, .social-icon-btn, .project-card, .skills-card');
  hoverElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });

    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });
};

// ==========================================================================
// MAGNETIC BUTTON EFFECT
// ==========================================================================
const initMagneticButtons = () => {
  if (shouldUseLightEffects) return;

  const magneticItems = document.querySelectorAll('.magnetic');

  magneticItems.forEach((item) => {
    const quickX = gsap.quickTo(item, 'x', { duration: 0.22, ease: 'power2.out' });
    const quickY = gsap.quickTo(item, 'y', { duration: 0.22, ease: 'power2.out' });

    item.addEventListener('mousemove', function (event) {
      const box = this.getBoundingClientRect();
      const itemX = event.clientX - box.left - box.width / 2;
      const itemY = event.clientY - box.top - box.height / 2;
      quickX(itemX * 0.22);
      quickY(itemY * 0.22);
    }, { passive: true });

    item.addEventListener('mouseleave', function () {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out'
      });
    });
  });
};

// ==========================================================================
// HERO MEADOW GENERATION
// ==========================================================================
const initHeroMeadow = () => {
  const clusters = document.querySelectorAll('.meadow-cluster');
  if (!clusters.length) return;

  clusters.forEach((cluster) => {
    if (cluster.dataset.ready === 'true') return;
    cluster.dataset.ready = 'true';

    const clusterWidth = parseFloat(cluster.style.getPropertyValue('--cluster-width')) || 10;
    const isGap = cluster.classList.contains('meadow-gap');
    const isEdge = cluster.classList.contains('meadow-edge');
    const baseStemCount = isGap
      ? Math.max(10, Math.round(clusterWidth * 2.1))
      : isEdge
        ? Math.max(42, Math.round(clusterWidth * 5))
        : Math.max(18, Math.round(clusterWidth * 2.9));
    const stemCount = shouldUseLightEffects
      ? Math.max(8, Math.round(baseStemCount * 0.55))
      : baseStemCount;

    const createBloom = (verticalOffset = 0) => {
      const bloom = document.createElement('span');
      const bloomClasses = ['meadow-bloom'];
      const bloomRoll = Math.random();

      if (bloomRoll < 0.16) {
        bloomClasses.push('meadow-bloom--white');
      } else if (bloomRoll < 0.28) {
        bloomClasses.push('meadow-bloom--peach');
      }

      if (Math.random() < 0.32) bloomClasses.push('meadow-bloom--tiny');
      bloom.className = bloomClasses.join(' ');
      bloom.style.setProperty('--bloom-size', `${(3 + Math.random() * 2.8).toFixed(2)}px`);
      bloom.style.setProperty('--bloom-rotate', `${Math.round(Math.random() * 360)}deg`);
      bloom.style.setProperty('--float-duration', `${(4 + Math.random() * 3).toFixed(2)}s`);
      bloom.style.setProperty('--float-delay', `-${(Math.random() * 5).toFixed(2)}s`);
      bloom.style.setProperty('--bloom-opacity', `${(0.76 + Math.random() * 0.18).toFixed(2)}`);
      bloom.style.top = `${verticalOffset}px`;
      bloom.style.left = `${(-6 + Math.random() * 12).toFixed(2)}px`;

      if (!bloom.classList.contains('meadow-bloom--white') && !bloom.classList.contains('meadow-bloom--peach')) {
        const pinkPalette = [
          'rgba(212, 96, 116, 0.94)',
          'rgba(226, 118, 132, 0.9)',
          'rgba(196, 78, 102, 0.94)',
          'rgba(232, 136, 142, 0.88)'
        ];
        bloom.style.setProperty('--bloom-color', pinkPalette[Math.floor(Math.random() * pinkPalette.length)]);
      }

      return bloom;
    };

    for (let index = 0; index < stemCount; index += 1) {
      const stem = document.createElement('span');
      stem.className = 'meadow-stem';

      const stemHeight = Math.round(120 + Math.random() * 60);
      stem.style.setProperty('--stem-x', `${(4 + Math.random() * 92).toFixed(2)}%`);
      stem.style.setProperty('--stem-height', `${stemHeight}px`);
      stem.style.setProperty('--stem-lean', `${(-3 + Math.random() * 6).toFixed(2)}deg`);
      stem.style.setProperty('--stem-curve', `${(-5 + Math.random() * 10).toFixed(2)}deg`);
      stem.style.setProperty('--stem-duration', `${(4 + Math.random() * 3).toFixed(2)}s`);
      stem.style.setProperty('--stem-delay', `-${(Math.random() * 6).toFixed(2)}s`);
      stem.style.setProperty('--leaf-offset', `${Math.round(stemHeight * (0.24 + Math.random() * 0.34))}px`);
      stem.style.setProperty('--leaf-shift', `${(Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 5)}px`);
      stem.style.setProperty('--leaf-rotate', `${(Math.random() > 0.5 ? 1 : -1) * (14 + Math.random() * 18)}deg`);

      stem.appendChild(createBloom());
      if (Math.random() < 0.72) {
        stem.appendChild(createBloom(6 + Math.random() * 10));
      }

      cluster.appendChild(stem);
    }
  });
};

const initAppButterflies = () => {
  document.querySelectorAll('.app-butterfly').forEach((butterfly) => butterfly.remove());
  if (shouldUseLightEffects) return;

  const butterflies = [
    { left: '8vw', top: '18vh', duration: '22s', color: 'rgba(236, 104, 150, 0.9)', flight: 'app-butterfly-flight-1' },
    { left: '82vw', top: '26vh', duration: '26s', color: 'rgba(228, 96, 144, 0.88)', flight: 'app-butterfly-flight-2' },
    { left: '52vw', top: '64vh', duration: '24s', color: 'rgba(242, 128, 168, 0.9)', flight: 'app-butterfly-flight-3' }
  ];

  butterflies.forEach((butterflyConfig) => {
    const butterfly = document.createElement('span');
    butterfly.className = 'app-butterfly';
    butterfly.style.setProperty('--flight-left', butterflyConfig.left);
    butterfly.style.setProperty('--flight-top', butterflyConfig.top);
    butterfly.style.setProperty('--flight-duration', butterflyConfig.duration);
    butterfly.style.setProperty('--wing-color', butterflyConfig.color);
    butterfly.style.setProperty('--flight-name', butterflyConfig.flight);
    butterfly.innerHTML = '<span></span>';
    document.body.appendChild(butterfly);
  });
};

// ==========================================================================
// ENTRANCE INTRO ANIMATION
// ==========================================================================
const initEntranceAnimations = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set('.main-header, #scrolling-name .first-name, #scrolling-name .last-name, .flower-divider .meadow-cluster', {
        clearProps: 'opacity,transform'
      });
    }
  });

  tl.from('.main-header', {
    y: -40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  tl.from('#scrolling-name .first-name, #scrolling-name .last-name', {
    y: 60,
    opacity: 0,
    stagger: 0.14,
    duration: 1.1,
    ease: 'power4.out'
  }, '-=0.8');

  tl.from('.flower-divider .meadow-cluster', {
    y: 18,
    opacity: 0,
    stagger: 0.06,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.7');
};

// ==========================================================================
// NAME SCROLL REVEAL & HEADER/SOCIAL TRANSITIONS
// ==========================================================================
const initNameReveal = () => {
  gsap.fromTo('#scrolling-name',
    { y: '0%' },
    {
      y: '-45vh',
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    }
  );

  gsap.fromTo('.flower-divider',
    { y: 0 },
    {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    }
  );

  gsap.to('.hero-name-stage', {
    filter: 'blur(12px)',
    opacity: 0.1,
    scale: 0.92,
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 78%',
    onEnter: () => {
      const header = document.querySelector('.main-header');
      if (header) {
        header.classList.add('scrolled');
        gsap.fromTo('.nav-link',
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'opacity,transform'
          }
        );
      }
    },
    onLeaveBack: () => {
      const header = document.querySelector('.main-header');
      if (header) {
        header.classList.remove('scrolled');
        gsap.set('.nav-link', { clearProps: 'all' });
      }
    }
  });

  gsap.fromTo('#experience',
    { filter: 'blur(28px)', opacity: 0 },
    {
      filter: 'blur(0px)',
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 92%',
        end: 'top 50%',
        scrub: true,
        invalidateOnRefresh: true
      }
    }
  );
};

// ==========================================================================
// PROJECTS STACKING DECK SCROLL ANIMATIONS
// ==========================================================================
const initProjectsScrollAnimations = () => {
  const section = document.querySelector('.projects-section');
  const cards = document.querySelectorAll('.projects-stack .project-card');
  if (!section || !cards.length) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 769px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.projects-section',
        pin: true,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    gsap.set('.projects-stack .card-1', { x: '0%', scale: 1, opacity: 1 });
    gsap.set('.projects-stack .card-2', { x: '100vw', scale: 1, opacity: 1 });
    gsap.set('.projects-stack .card-3', { x: '100vw', scale: 1, opacity: 1 });

    tl.to('.projects-stack .card-1', { scale: 0.95, opacity: 0.85, duration: 1, ease: 'power2.inOut' }, 0);
    tl.to('.projects-stack .card-2', { x: '0%', duration: 1, ease: 'power2.inOut' }, 0);
    tl.to('.projects-stack .card-2', { scale: 0.95, opacity: 0.85, duration: 1, ease: 'power2.inOut' }, 1);
    tl.to('.projects-stack .card-3', { x: '0%', duration: 1, ease: 'power2.inOut' }, 1);
  });

  mm.add('(max-width: 768px)', () => {
    gsap.set('.projects-stack .card-1, .projects-stack .card-2, .projects-stack .card-3', {
      clearProps: 'all'
    });
  });
};

// ==========================================================================
// CONTENT SCROLL TRIGGERS
// ==========================================================================
const initScrollAnimations = () => {
  gsap.from('.about-section .section-header', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 72%',
      toggleActions: 'play none none none'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });


  gsap.from('.about-section .image-frame', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    scale: 0.92,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  });

  gsap.from('.about-socials .social-icon-btn', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 72%',
      toggleActions: 'play none none none'
    },
    x: -24,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out'
  });

  gsap.from('.about-section .dots-grid, .about-section .glow-element', {
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.experience-item', {
    scrollTrigger: {
      trigger: '.experience-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.exp-bullets li', {
    scrollTrigger: {
      trigger: '.experience-item',
      start: 'top 60%'
    },
    x: -20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.fromTo('.skill-pill',
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.03,
      duration: 0.6,
      ease: 'back.out(1.5)',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top 80%'
      }
    }
  );

  gsap.fromTo('.education-card',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.education-card',
        start: 'top 80%'
      }
    }
  );

  gsap.fromTo('.achievements-box',
    { scale: 0.95, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.achievements-section',
        start: 'top 85%'
      }
    }
  );
};

// ==========================================================================
// ACTIVE NAV LINK INDICATOR
// ==========================================================================
const initActiveLinkIndicator = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (!self.isActive) return;

        const id = section.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
};

// ==========================================================================
// PAPER ROCKETS GLIDING ANIMATION
// ==========================================================================
const initPaperRockets = () => {
  document.querySelectorAll('.paper-rocket-container').forEach((rocket) => rocket.remove());
};

// ==========================================================================
// TWINKLING SPARKLING POINTS (STARRY SKY EFFECT)
// ==========================================================================
const initTwinklingStars = () => {
  if (shouldUseLightEffects) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'twinkling-stars-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const stars = [];
  const spacing = 60;
  const targetFrameTime = 1000 / 24;
  let lastRender = 0;

  const generateGrid = () => {
    stars.length = 0;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let c = 0; c <= cols; c += 1) {
      for (let r = 0; r <= rows; r += 1) {
        stars.push({
          x: c * spacing + (r % 2 === 0 ? 0 : spacing / 2),
          y: r * spacing,
          size: 1.35,
          opacity: Math.random() * 0.28 + 0.05,
          twinkleSpeed: Math.random() * 0.006 + 0.002,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          color: 'rgba(28, 46, 92, '
        });
      }
    }
  };

  generateGrid();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateGrid();
  });

  const updateStars = (time = 0) => {
    if (time - lastRender < targetFrameTime) {
      requestAnimationFrame(updateStars);
      return;
    }

    lastRender = time;
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      star.opacity += star.twinkleSpeed * star.twinkleDir;

      if (star.opacity >= 0.32) {
        star.opacity = 0.32;
        star.twinkleDir = -1;
      } else if (star.opacity <= 0.05) {
        star.opacity = 0.05;
        star.twinkleDir = 1;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color + star.opacity + ')';
      ctx.fill();
    });

    requestAnimationFrame(updateStars);
  };

  requestAnimationFrame(updateStars);
};

// ==========================================================================
// PROJECT MEDIA LAZY PLAYBACK
// ==========================================================================
const initProjectMedia = () => {
  const videos = document.querySelectorAll('.project-video-mockup[data-lazy-video]');
  if (!videos.length) return;

  const canAutoplayWhenVisible = !prefersReducedMotion.matches && !prefersDataSaver;

  const setPlaybackState = async (video, shouldPlay) => {
    if (!shouldPlay || !canAutoplayWhenVisible) {
      video.pause();
      return;
    }

    if (video.dataset.loaded !== 'true') {
      video.dataset.loaded = 'true';
      video.preload = 'metadata';
      video.load();
    }

    try {
      await video.play();
    } catch (_error) {
      video.pause();
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      setPlaybackState(video, entry.isIntersecting);
    });
  }, {
    root: null,
    rootMargin: '180px 0px',
    threshold: 0.35
  });

  videos.forEach((video) => {
    video.pause();
    observer.observe(video);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') {
      videos.forEach((video) => video.pause());
    }
  });
};
// ==========================================================================
// VIDEO MOCKUP HOVER PAN INTERACTION
// ==========================================================================
const initVideoMockupHoverPan = () => {
  if (!supportsFinePointer) return;

  const containers = document.querySelectorAll('.video-container-premium');

  containers.forEach((container) => {
    const video = container.querySelector('.project-video-mockup');
    if (!video) return;

    video.style.transform = 'scale(1) translate(0%, 0%)';
    video.style.transformOrigin = 'center center';

    container.addEventListener('mousemove', (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const panX = (0.5 - x) * 70;
      const panY = (0.5 - y) * 70;

      video.style.transform = `scale(1.35) translate(${panX * 0.6}%, ${panY * 0.6}%)`;
      video.style.transition = 'transform 0.15s ease-out';
    }, { passive: true });

    container.addEventListener('mouseleave', () => {
      video.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      video.style.transform = 'scale(1) translate(0%, 0%)';
    });
  });
};

// ==========================================================================
// INITIALIZE ALL
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initSmoothAnchorLinks();
  initCustomCursor();
  initMagneticButtons();
  initHeroMeadow();
  initAppButterflies();
  initEntranceAnimations();
  initNameReveal();
  initProjectsScrollAnimations();
  initScrollAnimations();
  initActiveLinkIndicator();
  initTwinklingStars();
  initProjectMedia();
  initVideoMockupHoverPan();
});

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});







