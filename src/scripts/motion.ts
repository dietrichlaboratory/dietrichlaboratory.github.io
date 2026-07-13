/* ==========================================================================
   Motion — scroll-reveal + subtle hero parallax.
   Loaded as a module (deferred). Progressive enhancement only: if this never
   runs, an inline <head> fallback reveals all content, and CSS keeps content
   visible when `prefers-reduced-motion` is set.
   ========================================================================== */

const prefersReduced = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

/* ---- Scroll reveal ---------------------------------------------------- */
function setupReveal(): void {
  const els = Array.from(
    document.querySelectorAll<HTMLElement>('[data-reveal]')
  );
  if (els.length === 0) return;

  // No IntersectionObserver, or reduced motion → just show everything.
  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

/* ---- Hero parallax ---------------------------------------------------- */
function setupParallax(): void {
  if (prefersReduced) return;
  const layers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-parallax]')
  );
  if (layers.length === 0) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    for (const layer of layers) {
      const speed = parseFloat(layer.dataset.parallaxSpeed ?? '0.15');
      // Clamp so elements never drift too far.
      const shift = Math.max(-80, Math.min(80, y * speed));
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function init(): void {
  setupReveal();
  setupParallax();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
