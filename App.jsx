import { useEffect, useMemo, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

import adversityLogo from './assets/adversity.jpg';
import bookmarkManagerVideo from './assets/livebook-new-edit.mp4';
import patternImage from './assets/pattern.jpg';
import heroSidePortrait from './assets/hero-side-portrait.jpg';
import aboutProfileReplacement from './assets/about-profile-replacement.png';
import profileImage from './assets/profile.jpg';
import saskenLogo from './assets/sasken.png';
import smartBookmarkPoster from './assets/smart-bookmark-dashboard.png';
import taskManagerVideo from './assets/task-manager-cut.mp4';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

const socialLinks = [
  {
    href: 'https://github.com/sahanaadiga05',
    label: 'GitHub',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/sahana-adiga-296441291/',
    label: 'LinkedIn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: 'mailto:sahanaadigav@gmail.com',
    label: 'Email',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    href: 'tel:+919380725721',
    label: 'Phone',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    href: '/resume.pdf',
    label: 'Resume',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15h6" />
        <path d="M9 11h2" />
      </svg>
    ),
  },
];

const meadowClusters = [
  { width: '16%', height: '180px', duration: '7.2s', delay: '-0.4s', edge: 'left' },
  { width: '9%', height: '160px', duration: '8.4s', delay: '-1.7s', edge: 'left' },
  { width: '11%', height: '152px', duration: '7.8s', delay: '-2.1s' },
  { width: '8%', height: '146px', duration: '6.9s', delay: '-0.9s' },
  { width: '4.5%', height: '128px', duration: '8.1s', delay: '-2.8s', gap: true },
  { width: '12%', height: '158px', duration: '7.5s', delay: '-1.2s' },
  { width: '9%', height: '150px', duration: '6.7s', delay: '-2.6s' },
  { width: '9%', height: '160px', duration: '8.8s', delay: '-0.5s', edge: 'right' },
  { width: '10.5%', height: '156px', duration: '7.1s', delay: '-1.9s' },
  { width: '16%', height: '182px', duration: '7.9s', delay: '-3.1s', edge: 'right' },
];

const butterflies = [
  { left: '8vw', top: '18vh', duration: '22s', color: 'rgba(236, 104, 150, 0.9)', flight: 'app-butterfly-flight-1' },
  { left: '82vw', top: '26vh', duration: '26s', color: 'rgba(228, 96, 144, 0.88)', flight: 'app-butterfly-flight-2' },
  { left: '52vw', top: '64vh', duration: '24s', color: 'rgba(242, 128, 168, 0.9)', flight: 'app-butterfly-flight-3' },
  { left: '20vw', top: '58vh', duration: '28s', color: 'rgba(237, 114, 166, 0.85)', flight: 'app-butterfly-flight-2' },
  { left: '70vw', top: '12vh', duration: '25s', color: 'rgba(245, 135, 176, 0.88)', flight: 'app-butterfly-flight-1' },
];

const experienceItems = [
  {
    logo: adversityLogo,
    company: 'Adversity Solutions',
    role: 'Backend Developer',
    date: 'January 2026 - June 2026',
    bullets: [
      'Worked on an Invoice Management System for Adversity Solutions that simplified invoice creation by letting users add client details, manage items, choose templates, and generate professional PDF invoices.',
      'As a Backend Developer, I built the backend with Node.js and Express, developed APIs for invoice and template flows, and created the PDF generation feature with customizable templates.',
    ],
  },
  {
    logo: saskenLogo,
    company: 'Sasken Technologies',
    role: 'Intern',
    date: 'June 2025 - July 2025',
    bullets: [
      'Worked on a C++ internship project for NASDAQ-listed companies, focused on helping users search stocks, view live prices, and manage stock data more easily.',
      'Built the Data Management Module in C++, creating efficient symbol-company mapping, handling stock data parsing, and supporting smooth integration with backend and security teams.',
    ],
  },
];

const projects = [
  {
    category: '',
    title: 'LiveBook',
    titleSuffix: '🔖',
    description: 'LiveBook is a bookmark manager with a custom Chrome extension that helps users save, organize, and revisit links without losing context. It automatically pulls details like title, description, and preview image, supports categories and pinned bookmarks, and even checks for broken links so saved content stays useful and easy to manage.',
    tech: ['React.js', 'JavaScript', 'Supabase', 'PostgreSQL', 'Google OAuth'],
    href: 'https://booklive.vercel.app/',
    preview: { type: 'video', src: bookmarkManagerVideo, poster: smartBookmarkPoster },
  },
  {
    category: '',
    title: 'DermIntel',
    titleSuffix: '⚕️',
    description: (
      <>
        This project helps people quickly understand if a <span className="project-description-highlight">skincare product</span> is right for them. It reads the <span className="project-description-highlight">ingredient list</span> from a <span className="project-description-highlight">product link</span>, <span className="project-description-highlight">text</span>, or <span className="project-description-highlight">label image</span>, checks what each ingredient does, compares it with the <span className="project-description-highlight">user&apos;s skin needs</span>, and then gives simple <span className="project-description-highlight">safety</span> and <span className="project-description-highlight">suitability</span> results with easy-to-understand explanations and helpful ingredient highlights.
      </>
    ),
    tech: ['Prisma', 'OpenAI API', 'Next.js', 'Google Auth', 'React.js', 'JavaScript'],
    href: 'https://dermintel.vercel.app/',
    preview: { type: 'video', src: taskManagerVideo },
  },
];

const skills = [
  { name: 'C++' },
  { name: 'Java' },
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'React.js' },
  { name: 'Next.js' },
  { name: 'Node.js' },
  { name: 'Docker' },
  { name: 'Kubernetes' },
  { name: 'Azure' },
  { name: 'Git' },
  { name: 'PostgreSQL' },
  { name: 'MySQL' },
  { name: 'Supabase' },
  { name: 'Express.js' },
];

function SkillIcon({ name }) {
  const iconProps = {
    className: 'skill-symbol-icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };

  switch (name) {
    case 'HTML':
      return (
        <svg {...iconProps}>
          <path d="M5 4h14l-1.2 14.5L12 20l-5.8-1.5L5 4Z" stroke="currentColor" strokeWidth="1.7" fill="rgba(255,255,255,0.08)" />
          <path d="M8.5 8h7M9 11.5h6M10 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case 'CSS':
      return (
        <svg {...iconProps}>
          <path d="M5 4h14l-1.2 14.5L12 20l-5.8-1.5L5 4Z" stroke="currentColor" strokeWidth="1.7" fill="rgba(255,255,255,0.08)" />
          <path d="M8 8.5h8l-.4 3.2H9.4l.2 1.8 2.4.7 2.8-.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg {...iconProps}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="3.2" stroke="currentColor" strokeWidth="1.7" fill="rgba(255,255,255,0.08)" />
          <path d="M10.2 9.2v5.2c0 1-.5 1.6-1.5 1.9M13.8 15.5c.5.5 1 .8 1.8.8.8 0 1.4-.4 1.4-1 0-.7-.5-1-1.6-1.4-1.3-.4-2.1-1-2.1-2.2 0-1.3 1.1-2.2 2.7-2.2 1 0 1.8.2 2.5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'React.js':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'Next.js':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 15V9l6 6V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg {...iconProps}>
          <path d="M12 3.8 18.4 7.5v9L12 20.2 5.6 16.5v-9L12 3.8Z" stroke="currentColor" strokeWidth="1.7" fill="rgba(255,255,255,0.08)" />
          <path d="M9.6 14.8V9.2l4.8 5.6V9.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Docker':
      return (
        <svg {...iconProps}>
          <rect x="6" y="10" width="3" height="3" rx="0.6" fill="currentColor" />
          <rect x="9.5" y="10" width="3" height="3" rx="0.6" fill="currentColor" />
          <rect x="13" y="10" width="3" height="3" rx="0.6" fill="currentColor" />
          <rect x="9.5" y="6.5" width="3" height="3" rx="0.6" fill="currentColor" />
          <path d="M5 14.6h10.5c1.8 0 3.1-.7 3.9-2.3.2-.4.4-.9.6-1.6-.7.2-1.4.1-2-.3-.4-.2-.8-.6-1.1-1.1-.6.6-1.1 1.3-1.4 2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Kubernetes':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <path d="M12 4.5v3.2M12 16.3v3.2M4.5 12h3.2M16.3 12h3.2M6.9 6.9l2.2 2.2M14.9 14.9l2.2 2.2M17.1 6.9l-2.2 2.2M9.1 14.9l-2.2 2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="7.3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.4 2.4" />
        </svg>
      );
    case 'Azure':
      return (
        <svg {...iconProps}>
          <path d="M7 17.8 11.8 6h2.7L10 17.8H7Zm5 0L15.5 10l3.5 7.8H12Z" fill="currentColor" />
        </svg>
      );
    case 'Git':
      return (
        <svg {...iconProps}>
          <path d="m12 4 8 8-8 8-8-8 8-8Z" stroke="currentColor" strokeWidth="1.7" fill="rgba(255,255,255,0.08)" />
          <path d="M9.5 9.5a1.2 1.2 0 1 0 0 .01M14.5 14.5a1.2 1.2 0 1 0 0 .01M9.5 10.7v3.1a1.9 1.9 0 0 0 1.9 1.9h1.9M12 8.2v7.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'PostgreSQL':
      return (
        <svg {...iconProps}>
          <path d="M8.3 15.8c-1-.9-1.6-2.2-1.6-4 0-3 1.9-5 4.7-5 3.5 0 5.6 2.5 5.6 6.2 0 2.3-.8 3.9-2.3 4.8-.7.4-1.4.4-2.1.1v2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.4 16.2c.7-.2 1.2-.6 1.6-1.2M10.2 10.2h1.7M10.2 12.8h1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'MySQL':
      return (
        <svg {...iconProps}>
          <path d="M6.5 15.8c1.6-.3 2.9-1.2 3.8-2.6.7-1 1.1-2.2 1.2-3.5.2.9.7 1.6 1.4 2.2.8.6 1.8 1 3.1 1 .6 0 1.2-.1 1.8-.3-.3 1.6-1 2.8-2.1 3.7-1.1 1-2.6 1.5-4.5 1.5-1.8 0-3.4-.6-4.7-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.7 8.5c.7-.2 1.3-.6 1.8-1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'Supabase':
      return (
        <svg {...iconProps}>
          <path d="M14.7 4.5c.6 0 1 .6.7 1.1l-5.2 8.4h3.6c.6 0 1 .6.7 1.1l-2.1 3.4a.8.8 0 0 1-.7.4H9.3c-.6 0-1-.6-.7-1.1l5.2-8.4H10.2c-.6 0-1-.6-.7-1.1l2.1-3.4c.1-.3.4-.4.7-.4h2.4Z" fill="currentColor" />
        </svg>
      );
    case 'Express.js':
      return (
        <svg {...iconProps}>
          <path d="M5.5 8.2h13M5.5 12h9.5M5.5 15.8h13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M15.3 8.2 18.5 15.8M18.5 8.2l-3.2 7.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'C++':
      return <span className="skill-text-icon">C++</span>;
    case 'Java':
      return <span className="skill-text-icon">Jv</span>;
    default:
      return <span className="skill-text-icon">{name.slice(0, 2)}</span>;
  }
}

function createSeededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;

      const focusY = window.innerHeight * 0.34;
      let currentSection = elements[0].id;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= focusY && rect.bottom >= focusY) {
          currentSection = element.id;
          break;
        }

        if (rect.top <= focusY) {
          currentSection = element.id;
        }
      }

      setActiveSection(currentSection);
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [sectionIds]);

  return activeSection;
}

function ProjectPreview({ preview, title, reduceMotion }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (preview.type !== 'video' || reduceMotion || !videoRef.current) {
      return undefined;
    }

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            try {
              await video.play();
            } catch (_error) {
              video.pause();
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.45, rootMargin: '120px 0px' }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [preview.type, reduceMotion]);

  if (preview.type === 'image') {
    return (
      <img
        src={preview.src}
        alt={preview.alt || title}
        className="project-mockup"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div className={`video-container-premium ${title === 'LiveBook' ? 'video-container-premium--livebook' : ''}`.trim()}>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        poster={preview.poster}
        className={`project-video-mockup ${title === 'LiveBook' ? 'project-video-mockup--livebook' : ''}`.trim()}
      >
        <source src={preview.src} type="video/mp4" />
      </video>
    </div>
  );
}

function HeroMeadow() {
  const clusterData = useMemo(() => {
    return meadowClusters.map((cluster, clusterIndex) => {
      const random = createSeededRandom((clusterIndex + 1) * 77);
      const stemTotal = cluster.gap ? 10 : cluster.edge ? 44 : 26;
      const stems = Array.from({ length: stemTotal }, (_, stemIndex) => {
        const stemHeight = Math.round(120 + random() * 60);
        const bloomPrimary = random() < 0.14 ? 'white' : random() < 0.26 ? 'peach' : 'pink';
        const bloomSecondary = random() < 0.2 ? 'white' : random() < 0.34 ? 'peach' : 'pink';

        return {
          id: `${clusterIndex}-${stemIndex}`,
          x: `${(4 + random() * 92).toFixed(2)}%`,
          height: `${stemHeight}px`,
          lean: `${(-3 + random() * 6).toFixed(2)}deg`,
          curve: `${(-5 + random() * 10).toFixed(2)}deg`,
          duration: `${(4 + random() * 3).toFixed(2)}s`,
          delay: `-${(random() * 6).toFixed(2)}s`,
          leafOffset: `${Math.round(stemHeight * (0.24 + random() * 0.34))}px`,
          leafShift: `${(random() > 0.5 ? 1 : -1) * (2 + random() * 5)}px`,
          leafRotate: `${(random() > 0.5 ? 1 : -1) * (14 + random() * 18)}deg`,
          primaryBloom: {
            size: `${(3.4 + random() * 2.8).toFixed(2)}px`,
            rotate: `${Math.round(random() * 360)}deg`,
            duration: `${(4 + random() * 3).toFixed(2)}s`,
            delay: `-${(random() * 5).toFixed(2)}s`,
            opacity: `${(0.8 + random() * 0.18).toFixed(2)}`,
            left: `${(-6 + random() * 12).toFixed(2)}px`,
            variant: bloomPrimary,
            tiny: random() < 0.3,
          },
          secondaryBloom: random() < 0.72 ? {
            size: `${(3 + random() * 2.3).toFixed(2)}px`,
            rotate: `${Math.round(random() * 360)}deg`,
            duration: `${(4 + random() * 3).toFixed(2)}s`,
            delay: `-${(random() * 5).toFixed(2)}s`,
            opacity: `${(0.78 + random() * 0.18).toFixed(2)}`,
            left: `${(-6 + random() * 12).toFixed(2)}px`,
            variant: bloomSecondary,
            tiny: random() < 0.34,
            top: `${(6 + random() * 10).toFixed(2)}px`,
          } : null,
        };
      });

      return { ...cluster, stems };
    });
  }, []);

  return (
    <div className="flower-divider" aria-hidden="true">
      {clusterData.map((cluster, index) => (
        <div
          key={`${cluster.width}-${index}`}
          className={[
            'meadow-cluster',
            cluster.gap ? 'meadow-gap' : '',
            cluster.edge ? 'meadow-edge' : '',
            cluster.edge === 'left' ? 'meadow-edge-left' : '',
            cluster.edge === 'right' ? 'meadow-edge-right' : '',
          ].filter(Boolean).join(' ')}
          style={{
            '--cluster-width': cluster.width,
            '--cluster-height': cluster.height,
            '--sway-duration': cluster.duration,
            '--sway-delay': cluster.delay,
          }}
        >
          {cluster.stems.map((stem) => (
            <span
              key={stem.id}
              className="meadow-stem"
              style={{
                '--stem-x': stem.x,
                '--stem-height': stem.height,
                '--stem-lean': stem.lean,
                '--stem-curve': stem.curve,
                '--stem-duration': stem.duration,
                '--stem-delay': stem.delay,
                '--leaf-offset': stem.leafOffset,
                '--leaf-shift': stem.leafShift,
                '--leaf-rotate': stem.leafRotate,
              }}
            >
              <span
                className={[
                  'meadow-bloom',
                  stem.primaryBloom.variant === 'white' ? 'meadow-bloom--white' : '',
                  stem.primaryBloom.variant === 'peach' ? 'meadow-bloom--peach' : '',
                  stem.primaryBloom.tiny ? 'meadow-bloom--tiny' : '',
                ].filter(Boolean).join(' ')}
                style={{
                  '--bloom-size': stem.primaryBloom.size,
                  '--bloom-rotate': stem.primaryBloom.rotate,
                  '--float-duration': stem.primaryBloom.duration,
                  '--float-delay': stem.primaryBloom.delay,
                  '--bloom-opacity': stem.primaryBloom.opacity,
                  left: stem.primaryBloom.left,
                }}
              />
              {stem.secondaryBloom ? (
                <span
                  className={[
                    'meadow-bloom',
                    stem.secondaryBloom.variant === 'white' ? 'meadow-bloom--white' : '',
                    stem.secondaryBloom.variant === 'peach' ? 'meadow-bloom--peach' : '',
                    stem.secondaryBloom.tiny ? 'meadow-bloom--tiny' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    '--bloom-size': stem.secondaryBloom.size,
                    '--bloom-rotate': stem.secondaryBloom.rotate,
                    '--float-duration': stem.secondaryBloom.duration,
                    '--float-delay': stem.secondaryBloom.delay,
                    '--bloom-opacity': stem.secondaryBloom.opacity,
                    top: stem.secondaryBloom.top,
                    left: stem.secondaryBloom.left,
                  }}
                />
              ) : null}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  const reduceMotion = useReducedMotion();
  const activeSection = useActiveSection(navItems.map((item) => item.id));
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [socialsVisible, setSocialsVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add('react-motion-app');
    document.body.style.setProperty('--pattern-image', `url(${patternImage})`);

    const onScroll = () => {
      setHeaderCollapsed(window.scrollY > Math.max(window.innerHeight * 0.4, 220));

      const aboutSection = document.getElementById('about');
      const footerSection = document.querySelector('.footer');
      if (!aboutSection) return;

      const aboutTop = aboutSection.getBoundingClientRect().top;
      const footerTop = footerSection ? footerSection.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      setSocialsVisible(aboutTop <= window.innerHeight * 0.68 && footerTop > window.innerHeight * 0.9);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.body.classList.remove('react-motion-app');
      document.body.style.removeProperty('--pattern-image');
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="app-shell">
        <div className="scrolling-pattern-bg" />

        {butterflies.map((butterfly, index) => (
          <span
            key={`${butterfly.left}-${index}`}
            className="app-butterfly"
            style={{
              '--flight-left': butterfly.left,
              '--flight-top': butterfly.top,
              '--flight-duration': butterfly.duration,
              '--wing-color': butterfly.color,
              '--flight-name': butterfly.flight,
            }}
            aria-hidden="true"
          >
            <span />
          </span>
        ))}

        <div className={`floating-socials ${socialsVisible ? 'is-visible' : 'is-hidden'}`} id="floating-socials">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined} aria-label={social.label} className="social-icon-btn">
              {social.icon}
            </a>
          ))}
        </div>

        <header className={`main-header ${headerCollapsed ? 'scrolled' : ''}`}>
          <button type="button" className="logo-group nav-home-button" onClick={() => scrollToSection('hero')}>
            <img src={profileImage} alt="Sahana Adiga V" className="nav-avatar" />
            <span className="logo-text">SAHANA</span>
          </button>

          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main>
          <section id="hero" className="hero-section">
            <div className="hero-name-stage">
              <div className="name-reveal-container">
                <div className="hero-name-row">
                  <div className="hero-name-copy">
                    <m.h1
                      className="scrolling-name"
                      initial={{ opacity: 0, y: 48 }}
                      animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <m.span
                        className="first-name"
                        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <span className="hero-initial">S</span>ahana
                      </m.span>
                      <m.span
                        className="last-name"
                        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
                        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
                      >
                        Adiga
                      </m.span>
                    </m.h1>
                  </div>

                  <m.div
                    className="hero-side-portrait-wrap"
                    initial={{ opacity: 0, x: 36 }}
                    animate={
                      reduceMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 1, x: 0, y: [0, -10, 0], rotate: [0, -1.2, 0.8, 0] }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }
                        : {
                            opacity: { duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
                            x: { duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
                            y: { duration: 7.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
                            rotate: { duration: 8.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
                          }
                    }
                  >
                    <img
                      src={heroSidePortrait}
                      alt="Sahana Adiga portrait"
                      className="hero-side-portrait"
                      loading="eager"
                      decoding="async"
                    />
                  </m.div>
                </div>
              </div>

              <m.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <HeroMeadow />
              </m.div>
            </div>
          </section>

          <section id="about" className="section about-section">
            <div className="section-container">
              <m.div
                className="section-header"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.7 }}
              >
                <span className="section-num">01.</span>
                <h2 className="section-title">ABOUT</h2>
                <div className="section-line" />
              </m.div>

              <div className="about-layout">
                <m.div
                  className="about-image-column"
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="image-wrapper">
                    <div className="image-frame">
                      <img src={aboutProfileReplacement} alt="Sahana Adiga V" loading="lazy" decoding="async" />
                    </div>
                    <div className="glow-element" />
                    <div className="dots-grid" />
                  </div>
                </m.div>

                <m.div
                  className="about-copy-column"
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: 0.08 }}
                >
                  <p className="about-description">
                    I completed Bachelor&apos;s in <span className="about-highlight">AIML</span> from{' '}
                    <span className="about-highlight">RNS Institute of Technology, Bangalore</span>, with an{' '}
                    <span className="about-highlight">8.52 CGPA</span>. <span className="about-underline">I love turning blank screens into experiences</span>
                    {' '}that people actually enjoy exploring. I <span className="about-highlight">build creative,
                    interactive websites</span>, but code is only one side of my creativity. I&apos;m also a passionate{' '}
                    <span className="about-highlight">artist and photographer</span>, and I&apos;ve led photography for
                    my college&apos;s Cultural Club. I see the world through two lenses: <span className="about-underline">one that captures moments</span>, and
                    {' '}<span className="about-underline">another that transforms ideas into experiences</span>. I code with logic, create with curiosity, and bring
                    a touch of art into everything I build.
                  </p>

                  <a href="/resume.pdf" target="_blank" rel="noreferrer" className="about-resume-btn">
                    <span className="about-resume-btn__icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M8 13h8" />
                        <path d="M8 17h5" />
                      </svg>
                    </span>
                    <span>Resume</span>
                  </a>
                </m.div>
              </div>
            </div>
          </section>

          <section id="experience" className="section experience-section">
            <div className="section-container">
              <m.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
                <span className="section-num">02.</span>
                <h2 className="section-title">Professional Experience</h2>
                <div className="section-line" />
              </m.div>

              <div className="experience-timeline">
                {experienceItems.map((item, index) => (
                  <m.div
                    key={item.company}
                    className="experience-item card-hover-effect"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                  >
                    <div className="exp-header">
                      <div className="exp-header-left">
                        <img src={item.logo} alt={`${item.company} logo`} className="company-logo" />
                        <div className="exp-role-company">
                          <h3>{item.role}</h3>
                          <div className="company-line">
                            <h4 className="company-name">{item.company}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="exp-date">{item.date}</div>
                    </div>

                    <div className="exp-details">
                      <ul className="exp-bullets">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="projects-section">
            <div className="projects-sticky-container">
              <div className="section-container project-header-container">
                <m.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
                  <span className="section-num">03.</span>
                  <h2 className="section-title">Projects</h2>
                  <div className="section-line" />
                </m.div>
                <p className="projects-subtitle">Selected work and product builds.</p>
              </div>

              <div className="projects-stack">
                {projects.map((project, index) => (
                  <m.article
                    key={project.title}
                    className={`project-card card-${index + 1}`}
                    initial={{ opacity: 0, x: 120, y: 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.82, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="project-preview">
                      <ProjectPreview preview={project.preview} title={project.title} reduceMotion={reduceMotion} />
                    </div>

                    <div className="project-info">
                      <div>
                        {project.category ? <span className="project-category">{project.category}</span> : null}
                        <h3 className="project-title-large">
                          {project.title}
                          {project.titleSuffix ? <span className="project-title-emoji"> {project.titleSuffix}</span> : null}
                        </h3>
                        <p className="project-description-text">{project.description}</p>
                        <div className="project-tech-group">
                          {project.tech.map((tech) => (
                            <span key={tech} className="tech-pill">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <a href={project.href} target="_blank" rel="noreferrer" className="view-work-btn">
                        <span>View work</span>
                        <span className="arrow-circle">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </m.article>
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="section skills-section">
            <div className="section-container">
              <m.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
                <span className="section-num">04.</span>
                <h2 className="section-title">Technical Skills</h2>
                <div className="section-line" />
              </m.div>

              <div className="skills-wrapper">
                <div className="skills-pill-group">
                  {skills.map((skill, index) => (
                    <m.div
                      key={skill.name}
                      className="skill-pill"
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                    >
                      <SkillIcon name={skill.name} />
                      <span>{skill.name}</span>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>© 2026 Sahana Adiga V. All rights reserved.</p>
        </footer>
      </div>
    </LazyMotion>
  );
}

export default App;
