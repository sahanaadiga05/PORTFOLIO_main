// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// LENIS SMOOTH SCROLLING
// ==========================================================================
const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync scrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

// ==========================================================================
// CUSTOM CURSOR
// ==========================================================================
const initCustomCursor = () => {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Direct position for the dot
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  // Follower animation with delay
  gsap.ticker.add(() => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    gsap.set(follower, { x: followerX, y: followerY });
  });

  // Hover states
  const hoverElements = document.querySelectorAll('a, button, .magnetic, .social-icon-btn, .project-card, .skills-card');
  hoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      follower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      follower.classList.remove('hovered');
    });
  });
};

// ==========================================================================
// MAGNETIC BUTTON EFFECT
// ==========================================================================
const initMagneticButtons = () => {
  const magneticItems = document.querySelectorAll('.magnetic');

  magneticItems.forEach((item) => {
    item.addEventListener('mousemove', function(e) {
      const boundBox = this.getBoundingClientRect();
      const itemX = e.clientX - boundBox.left - boundBox.width / 2;
      const itemY = e.clientY - boundBox.top - boundBox.height / 2;

      // Translate the button slightly towards the cursor
      gsap.to(this, {
        x: itemX * 0.4,
        y: itemY * 0.4,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    item.addEventListener('mouseleave', function() {
      // Return button to origin
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
};

// ==========================================================================
// ENTRANCE INTRO ANIMATION
// ==========================================================================
const initEntranceAnimations = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(".main-header, .hero-bio .bio-line, .hero-description, .tagline-badge, .image-frame, .dots-grid, .glow-element, .floating-socials .social-icon-btn", { clearProps: "all" });
    }
  });

  // Reveal main header
  tl.from(".main-header", {
    y: -40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Staggered reveal for bio lines
  tl.from(".hero-bio .bio-line", {
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out"
  }, "-=0.6");

  // Fade in hero description
  tl.from(".hero-description", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.5");

  // Fade in profile badge
  tl.from(".tagline-badge", {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6");

  // Reveal profile image
  tl.from(".image-frame", {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  }, "-=1.0");

  // Reveal dots grid & glow
  tl.from(".dots-grid, .glow-element", {
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  }, "-=0.8");

  // Fade in floating social icons
  tl.from(".floating-socials .social-icon-btn", {
    x: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
  }, "-=1.2");
};

// ==========================================================================
// NAME SCROLL REVEAL & HEADER/SOCIAL TRANSITIONS
// ==========================================================================
const initNameReveal = () => {
  // Animates the name "Sahana Adiga V" upwards to overlap the blurred description and photo as you scroll
  gsap.fromTo("#scrolling-name", 
    { y: "0%" },
    {
      y: "-45vh", // Pulls the name high up to overlap the middle of the hero section
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    }
  );

  // Slowly blur and fade out the description text and profile photo
  gsap.to(".hero-left, .hero-right", {
    filter: "blur(12px)",
    opacity: 0.1,
    scale: 0.92,
    y: -40,
    ease: "none",
    scrollTrigger: {
      trigger: "#about",
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
  });

  // Social icons fade out during name reveal (hero scroll-out), then fade back in at Experience
  const socialTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#about",
      start: "top top",
      endTrigger: "#experience",
      end: "top 15%",
      scrub: true,
      invalidateOnRefresh: true
    }
  });

  // 1. Fade out quickly as we scroll from top
  socialTimeline.to(".floating-socials", {
    opacity: 0,
    scale: 0.8,
    pointerEvents: "none",
    duration: 0.3
  });

  // 2. Keep hidden during name reveal
  socialTimeline.to(".floating-socials", {
    opacity: 0,
    scale: 0.8,
    pointerEvents: "none",
    duration: 0.4
  });

  // 3. Fade back in as we enter Experience section
  socialTimeline.to(".floating-socials", {
    opacity: 1,
    scale: 1,
    pointerEvents: "auto",
    duration: 0.3
  });

  // Navigation capsule shifts to top-right on entering experience and items stagger in
  ScrollTrigger.create({
    trigger: "#experience",
    start: "top 80%",
    onEnter: () => {
      const header = document.querySelector(".main-header");
      if (header) {
        header.classList.add("scrolled");
        // Animate nav links one by one (staggered reveal)
        gsap.fromTo(".nav-link", 
          { opacity: 0, y: -10 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            duration: 0.4, 
            ease: "power2.out", 
            delay: 0.2,
            clearProps: "opacity,transform" // Clear inline properties so CSS styles take over dynamically
          }
        );
      }
    },
    onLeaveBack: () => {
      const header = document.querySelector(".main-header");
      if (header) {
        header.classList.remove("scrolled");
        // Reset properties cleanly
        gsap.set(".nav-link", { clearProps: "all" });
      }
    }
  });

  // Experience section starts heavily blurred during name reveal, then unblurs and sharpens on scroll-in
  gsap.fromTo("#experience", 
    { filter: "blur(28px)", opacity: 0 },
    {
      filter: "blur(0px)",
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#experience",
        start: "top 92%",
        end: "top 50%",
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
  const section = document.querySelector(".projects-section");
  const cards = document.querySelectorAll(".projects-stack .project-card");
  
  if (section && cards.length > 0) {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 769px)", () => {
      // Desktop: Premium Stacking Deck Scroll Pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-section",
          pin: true,
          start: "top top",
          end: "+=200%", // 200% of viewport height scroll space
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Set initial positions cleanly
      gsap.set(".projects-stack .card-1", { x: "0%", scale: 1, opacity: 1 });
      gsap.set(".projects-stack .card-2", { x: "100vw", scale: 1, opacity: 1 });
      gsap.set(".projects-stack .card-3", { x: "100vw", scale: 1, opacity: 1 });

      // Card 2 slides in from right, Card 1 scales down and blurs slightly
      tl.to(".projects-stack .card-1", {
        scale: 0.95,
        opacity: 0.85,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      tl.to(".projects-stack .card-2", {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Card 3 slides in from right, Card 2 scales down and blurs slightly
      tl.to(".projects-stack .card-2", {
        scale: 0.95,
        opacity: 0.85,
        duration: 1,
        ease: "power2.inOut"
      }, 1);

      tl.to(".projects-stack .card-3", {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, 1);
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile: Clear absolute position rules to layout stacked vertically
      gsap.set(".projects-stack .card-1, .projects-stack .card-2, .projects-stack .card-3", {
        clearProps: "all"
      });
    });
  }
};

// ==========================================================================
// CONTENT SCROLL TRIGGERS
// ==========================================================================
const initScrollAnimations = () => {
  // Experience timeline entry
  gsap.from(".experience-item", {
    scrollTrigger: {
      trigger: ".experience-section",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Experience inner elements reveal
  gsap.from(".exp-bullets li", {
    scrollTrigger: {
      trigger: ".experience-item",
      start: "top 60%"
    },
    x: -20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  });

  // Skills tags animation inside cards
  gsap.fromTo(".skill-pill", 
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.03,
      duration: 0.6,
      ease: "back.out(1.5)",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%"
      }
    }
  );

  // Education card anim
  gsap.fromTo(".education-card", 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".education-card",
        start: "top 80%"
      }
    }
  );

  // Achievements box scale-in on scroll
  gsap.fromTo(".achievements-box", 
    { scale: 0.95, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".achievements-section",
        start: "top 85%"
      }
    }
  );
};

// ==========================================================================
// ACTIVE NAV LINK INDICATOR (BREADCRUMB EFFECT)
// ==========================================================================
const initActiveLinkIndicator = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%", // Triggers when the section crosses the middle of the viewport
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) {
          const id = section.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      }
    });
  });
};

// ==========================================================================
// PAPER ROCKETS GLIDING ANIMATION
// ==========================================================================
const initPaperRockets = () => {
  const rockets = [];
  const count = 5; /* 5 rockets flying around */
  const colors = ["#760031", "#1C2E5C", "#760031", "#1C2E5C", "#760031"];
  const sizes = [26, 14, 20, 22, 16]; /* Diverse sizes for 3D depth of field */

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "paper-rocket-container";
    div.innerHTML = `
      <svg viewBox="0 0 24 24" width="${sizes[i]}" height="${sizes[i]}" fill="none" stroke="${colors[i]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    `;
    document.body.appendChild(div);

    rockets.push({
      el: div,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: 0,
      vy: 0,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
      speed: 1.8 + ((28 - sizes[i]) / 12) * 1.0, // Smaller rockets fly slightly faster
      angle: Math.random() * 2 * Math.PI,
      turnSpeed: 0.025 + Math.random() * 0.025, // Gentle turn responsiveness
      sway: Math.random() * 100,
      size: sizes[i]
    });
  }

  const updateRockets = () => {
    rockets.forEach((r) => {
      // 1. Calculate distance to target
      const dx = r.targetX - r.x;
      const dy = r.targetY - r.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 2. If close to target, select a new random target point
      if (dist < 80) {
        r.targetX = Math.random() * (window.innerWidth - 100) + 50;
        r.targetY = Math.random() * (window.innerHeight - 100) + 50;
      }

      // 3. Steer towards target angle
      const targetAngle = Math.atan2(dy, dx);
      let diff = targetAngle - r.angle;

      // Normalize angle difference to [-PI, PI]
      while (diff < -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;

      // Gently rotate heading
      if (Math.abs(diff) > 0.01) {
        r.angle += Math.sign(diff) * Math.min(r.turnSpeed, Math.abs(diff));
      }

      // 4. Update velocity and move coordinate
      r.vx = Math.cos(r.angle) * r.speed;
      r.vy = Math.sin(r.angle) * r.speed;

      r.x += r.vx;
      r.y += r.vy;

      // 5. Apply a tiny wind sway simulation
      r.sway += 0.02;
      const finalY = r.y + Math.sin(r.sway) * 1.5;

      // 6. Update DOM transform (rotate 45 degrees offset because the SVG faces top-right by default)
      const degrees = (r.angle * 180) / Math.PI + 45;
      r.el.style.transform = `translate3d(${r.x}px, ${finalY}px, 0) rotate(${degrees}deg)`;
    });

    requestAnimationFrame(updateRockets);
  };

  updateRockets();
};

// ==========================================================================
// TWINKLING SPARKLING POINTS (STARRY SKY EFFECT)
// ==========================================================================
const initTwinklingStars = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "twinkling-stars-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const stars = [];
  const spacing = 38; // Distance between points in pixels

  const generateGrid = () => {
    stars.length = 0;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        stars.push({
          x: c * spacing + (r % 2 === 0 ? 0 : spacing / 2), // Staggered rows for a premium grid design
          y: r * spacing,
          size: 1.5, // Small, clean, sharp dots
          opacity: Math.random() * 0.45 + 0.05, // Initial random opacity
          twinkleSpeed: Math.random() * 0.007 + 0.003, // Slow, gentle blinking speed
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          color: "rgba(28, 46, 92, " // Midnight Blue color points
        });
      }
    }
  };

  generateGrid();

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateGrid(); // Re-generate grid to cover the new viewport dimensions
  });

  const updateStars = () => {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      // Toggle between lighter and darker (blinking effect)
      star.opacity += star.twinkleSpeed * star.twinkleDir;

      if (star.opacity >= 0.55) {
        star.opacity = 0.55;
        star.twinkleDir = -1; // Start fading to lighter
      } else if (star.opacity <= 0.05) {
        star.opacity = 0.05;
        star.twinkleDir = 1; // Start fading to darker
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color + star.opacity + ")";
      ctx.fill();
    });

    requestAnimationFrame(updateStars);
  };

  updateStars();
};

// ==========================================================================
// INITIALIZE ALL
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCustomCursor();
  initMagneticButtons();
  initEntranceAnimations();
  initNameReveal();
  initProjectsScrollAnimations();
  initScrollAnimations();
  initActiveLinkIndicator();
  initPaperRockets();
  initTwinklingStars();
});

// Refresh GSAP markers after images load to fix visibility triggers
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
