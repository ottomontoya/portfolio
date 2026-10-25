import { gsap } from 'gsap';

// Approved Pensatori-inspired navigation: scoped GSAP timelines and portfolio-owned geometry.
export function animateMenu(root: HTMLElement, open: boolean, compact: boolean, reduced: boolean, onProjects: (show: boolean) => void) {
  const q = gsap.utils.selector(root);
  const timeline = gsap.timeline();
  if (open) {
    timeline.set(q('.menu-body'), { scale: 1, opacity: 1 }, 0)
      .to(q('.menu-backdrop'), { opacity: 1, duration: .5 }, 0)
      .to(q('.menu-shell'), { width: compact ? '100%' : innerWidth <= 1280 ? '40vw' : '28vw', height: '92dvh', borderRadius: 16 }, 0)
      .fromTo(q('.menu-link'), { y: '-2rem', opacity: 0 }, { y: 0, opacity: 1, stagger: .05 }, 0)
      .fromTo(q('.menu-social'), { y: '-2rem', opacity: 0 }, { y: 0, opacity: 1, stagger: .05 }, .2)
      .fromTo(q('.menu-rule'), { scaleX: 0 }, { scaleX: 1, stagger: .05, ease: 'power2.out' }, .15)
      .call(() => onProjects(!compact), [], 0);
  } else {
    timeline.call(() => onProjects(false), [], 0)
      .to(q('.menu-shell'), { height: '2.75rem', width: '2.75rem', borderRadius: 22 }, compact ? 0 : .05)
      .to(q('.menu-backdrop'), { opacity: 0 }, 0)
      .to(q('.menu-body'), { opacity: 0, duration: .4 }, 0)
      .to(q('.menu-link, .menu-social'), { y: '-2rem', opacity: 0, stagger: .05 }, 0)
      .set(q('.menu-rule'), { scaleX: 0 }, 0);
  }
  if (reduced) timeline.totalProgress(1);
  return timeline;
}
export function animateProjects(root: HTMLElement, visible: boolean, closing: boolean, reduced: boolean) {
  const cards = root.querySelectorAll('.menu-project-card, .menu-more');
  gsap.killTweensOf(cards);
  const timeline = gsap.timeline();
  if (visible) {
    timeline.set(cards, { clearProps: 'transform', transformOrigin: '50% 50%' })
      .fromTo(cards, { x: '8rem', y: '-2rem', opacity: 0, rotation: () => gsap.utils.random(-7, 7) },
        { x: 0, y: 0, opacity: 1, rotation: 0, duration: .55, ease: 'power3.out', stagger: .05 });
  } else {
    timeline.to(cards, {
      y: (_i, target) => innerHeight - target.getBoundingClientRect().top + gsap.utils.random(120, 320),
      x: () => closing ? .3 * innerWidth + gsap.utils.random(40, 220) : gsap.utils.random(-180, 220),
      rotation: () => gsap.utils.random(-58, 58),
      transformOrigin: () => `${gsap.utils.random(12,88)}% ${gsap.utils.random(8,92)}%`,
      opacity: 0, duration: closing ? 1 : .8, ease: closing ? 'power1.inOut' : 'power2.in',
      stagger: { each: closing ? .03 : .035, from: 'random' },
    }).set(cards, { y: '-2rem', x: '8rem', rotation: 0, opacity: 0 });
  }
  if (reduced) timeline.totalProgress(1);
  return timeline;
}
