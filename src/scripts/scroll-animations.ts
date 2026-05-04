import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap-init';

if (!prefersReducedMotion) {
  // Fade-up reveals
  document.querySelectorAll('[data-animate]').forEach((el) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.visibility = 'visible';
    gsap.from(htmlEl, {
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: htmlEl, start: 'top 85%', once: true },
    });
  });

  // Counter animations for stats
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseInt(el.textContent?.replace(/\D/g, '') || '0');
    const suffix = el.textContent?.replace(/[\d,]/g, '') || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() + suffix; },
    });
  });

  ScrollTrigger.refresh();
} else {
  document.querySelectorAll('[data-animate]').forEach((el) => {
    (el as HTMLElement).style.visibility = 'visible';
  });
}
