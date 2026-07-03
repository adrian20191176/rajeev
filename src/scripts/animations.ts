import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Default easing — soft, mechanical, not bouncy
const EASE_OUT = 'power3.out';
const EASE_INOUT = 'power2.inOut';

// ── Reveal on scroll ──────────────────────────────────────────────────
// Elements marked [data-reveal] fade-up once on enter.
// Elements marked [data-reveal-group] stagger their children that carry [data-reveal-item].
function initReveals() {
  if (prefersReducedMotion) {
    document.querySelectorAll<HTMLElement>('[data-reveal],[data-reveal-item]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Individual reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const yFrom = Number(el.dataset.revealY ?? 24);
    const delay = Number(el.dataset.revealDelay ?? 0);
    const dur = Number(el.dataset.revealDuration ?? 0.9);

    gsap.fromTo(el,
      { opacity: 0, y: yFrom },
      {
        opacity: 1, y: 0, duration: dur, delay, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  // Grouped (staggered) reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    if (!items.length) return;
    const yFrom = Number(group.dataset.revealY ?? 24);
    const stagger = Number(group.dataset.revealStagger ?? 0.08);

    gsap.fromTo(items,
      { opacity: 0, y: yFrom },
      {
        opacity: 1, y: 0, duration: 0.85, ease: EASE_OUT, stagger,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });
}

// ── Count-up numbers ──────────────────────────────────────────────────
// [data-counter] with data-counter-to (target), optional data-counter-prefix, data-counter-suffix
function initCounters() {
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const to = Number(el.dataset.counterTo ?? '0');
    const prefix = el.dataset.counterPrefix ?? '';
    const suffix = el.dataset.counterSuffix ?? '';
    const decimals = Number(el.dataset.counterDecimals ?? '0');

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      return;
    }

    const obj = { v: 0 };
    gsap.to(obj, {
      v: to, duration: 1.6, ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${prefix}${obj.v.toFixed(decimals)}${suffix}`;
      },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

// ── Hero entrance ─────────────────────────────────────────────────────
// Elements with [data-hero-step] run on load with stagger.
function initHero() {
  const steps = gsap.utils.toArray<HTMLElement>('[data-hero-step]');
  if (!steps.length) return;
  if (prefersReducedMotion) {
    steps.forEach(s => { s.style.opacity = '1'; s.style.transform = 'none'; });
    return;
  }
  gsap.fromTo(steps,
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 1.1, ease: EASE_OUT, stagger: 0.085 }
  );
}

// ── Hero bearing visual: scale-in + parallax ──────────────────────────
function initHeroVisual() {
  const wrap = document.querySelector<HTMLElement>('[data-hero-visual]');
  if (!wrap) return;
  if (!prefersReducedMotion) {
    gsap.fromTo(wrap,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out', delay: 0.15 }
    );
  }

  // Mouse-follow parallax (desktop only)
  if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    const layers = wrap.querySelectorAll<HTMLElement>('[data-parallax-layer]');
    const bounds = () => wrap.getBoundingClientRect();
    let raf = 0;
    let tx = 0, ty = 0;

    wrap.addEventListener('mousemove', (e) => {
      const b = bounds();
      const cx = (e.clientX - b.left) / b.width - 0.5;
      const cy = (e.clientY - b.top) / b.height - 0.5;
      tx = cx; ty = cy;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        layers.forEach((layer, i) => {
          const depth = Number(layer.dataset.parallaxDepth ?? (i + 1) * 6);
          gsap.to(layer, { x: tx * depth, y: ty * depth, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        });
      });
    });
    wrap.addEventListener('mouseleave', () => {
      layers.forEach((layer) => {
        gsap.to(layer, { x: 0, y: 0, duration: 1.1, ease: 'power3.out', overwrite: 'auto' });
      });
    });
  }
}

// ── Card subtle tilt on hover ────────────────────────────────────────
function initTilt() {
  if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const max = Number(card.dataset.tiltMax ?? 6);

    card.addEventListener('mousemove', (e) => {
      const b = card.getBoundingClientRect();
      const px = (e.clientX - b.left) / b.width;
      const py = (e.clientY - b.top) / b.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 800, duration: 0.4, ease: 'power3.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' });
    });
  });
}

// ── Marquee: hover-pause + slight slow-down ──────────────────────────
function initMarquee() {
  document.querySelectorAll<HTMLElement>('.marquee').forEach((el) => {
    el.addEventListener('mouseenter', () => { el.style.animationPlayState = 'paused'; });
    el.addEventListener('mouseleave', () => { el.style.animationPlayState = 'running'; });
  });
}

// ── Section heading underline draw ───────────────────────────────────
function initEyebrows() {
  if (prefersReducedMotion) return;
  gsap.utils.toArray<HTMLElement>('[data-eyebrow]').forEach((el) => {
    const line = el.querySelector<HTMLElement>('span.inline-block.w-6.h-px');
    if (!line) return;
    gsap.fromTo(line,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 0.9, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });
}

// ── Headline word-by-word reveal ──────────────────────────────────────
// [data-split-words] — wraps each word in span, staggers in.
function initSplitWords() {
  if (prefersReducedMotion) return;
  document.querySelectorAll<HTMLElement>('[data-split-words]').forEach((el) => {
    if (el.dataset.splitDone === '1') return;

    // Preserve children like <br> and <span class="text-gold">…</span>
    const wrap = (node: Node, frag: DocumentFragment) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';
        text.split(/(\s+)/).forEach((tok) => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
          const span = document.createElement('span');
          span.className = 'split-word';
          span.style.display = 'inline-block';
          span.style.willChange = 'transform, opacity';
          span.textContent = tok;
          frag.appendChild(span);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elNode = node as HTMLElement;
        if (elNode.tagName === 'BR') { frag.appendChild(elNode.cloneNode(true)); return; }
        const clone = elNode.cloneNode(false) as HTMLElement;
        const inner = document.createDocumentFragment();
        elNode.childNodes.forEach(c => wrap(c, inner));
        clone.appendChild(inner);
        frag.appendChild(clone);
      }
    };

    const out = document.createDocumentFragment();
    el.childNodes.forEach(c => wrap(c, out));
    el.innerHTML = '';
    el.appendChild(out);
    el.dataset.splitDone = '1';

    const words = el.querySelectorAll<HTMLElement>('.split-word');
    const onScroll = el.dataset.splitScroll === '1';

    const tween = gsap.fromTo(words,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: EASE_OUT, stagger: 0.04,
        scrollTrigger: onScroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
      }
    );
    if (!onScroll) { /* play on load */ tween.play?.(); }
  });
}

// ── Dialog open/close polish ──────────────────────────────────────────
function initDialogs() {
  if (prefersReducedMotion) return;

  document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dlg) => {
    const animateIn = () => {
      gsap.fromTo(dlg,
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform' }
      );
    };
    // showModal is called from various places — patch the prototype-less way via event
    const origShow = dlg.showModal.bind(dlg);
    dlg.showModal = () => {
      origShow();
      animateIn();
    };
  });
}

// ── Page-load: fade main shell in ─────────────────────────────────────
function initPageEnter() {
  if (prefersReducedMotion) return;
  const main = document.querySelector('main');
  if (!main) return;
  gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
}

// ── Nav scroll: shrink/elevate ────────────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  ScrollTrigger.create({
    start: 'top -8',
    end: 99999,
    onUpdate: (self) => {
      const past = self.scroll() > 8;
      nav.classList.toggle('nav-elevated', past);
    },
  });
}

// ── Bootstrap ─────────────────────────────────────────────────────────
function boot() {
  initHero();
  initHeroVisual();
  initReveals();
  initCounters();
  initEyebrows();
  initSplitWords();
  initTilt();
  initMarquee();
  initDialogs();
  initPageEnter();
  initNavScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// Expose helper for ad-hoc use (e.g. dynamically-injected content).
declare global {
  interface Window {
    rcbAnim: {
      gsap: typeof gsap;
      ScrollTrigger: typeof ScrollTrigger;
      reveal: (el: Element, opts?: { y?: number; delay?: number; duration?: number }) => void;
    };
  }
}
window.rcbAnim = {
  gsap, ScrollTrigger,
  reveal(el, opts = {}) {
    if (prefersReducedMotion) return;
    gsap.fromTo(el,
      { opacity: 0, y: opts.y ?? 16 },
      { opacity: 1, y: 0, duration: opts.duration ?? 0.6, delay: opts.delay ?? 0, ease: EASE_OUT }
    );
  },
};

export {};
