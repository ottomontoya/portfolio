import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project, ProjectImage } from '../data/projects';
import { PROTOTYPE_GALLERY } from '../data/workPresentation';

gsap.registerPlugin(ScrollTrigger);

// Source: Dgrees Ga.setParallax, app.min.js:11177–11207.
// The case remains the sole scroll owner. Image percentages remain relative
// to their full-height canvas; viewport height maps to the case viewport.
function initializeParallax(gallery: HTMLElement, scroller: HTMLElement) {
  const scenes = Array.from(gallery.querySelectorAll<HTMLElement>('.p6-scene'));
  if (scenes.length !== PROTOTYPE_GALLERY.chapters.length) throw new Error('Missing P6 scenes');
  return scenes.map((scene, index) => {
    const canvas = scene.querySelector<HTMLElement>('.p6-image-canvas');
    if (!canvas) throw new Error(`Missing image canvas ${index}`);
    return gsap.timeline({
      paused: true, defaults: { ease: 'none' },
      scrollTrigger: { id: `p6-parallax-${index}`, scroller, trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    }).fromTo(canvas, { y: '-80%' }, { y: '80%', ease: 'none', duration: 1 }, 0);
  });
}

export function ProjectGallery({ project, scrollerRef, onImage }: {
  project: Project; scrollerRef: RefObject<HTMLDivElement>;
  onImage: (image: ProjectImage, opener: HTMLButtonElement) => void;
}) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const gallery = root.current;
    const scroller = scrollerRef.current;
    if (!gallery || !scroller) return;
    const media = gsap.matchMedia();
    const measure = () => { gallery.style.setProperty('--p6-camera-height', `${scroller.clientHeight}px`); };
    measure();
    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference) and (forced-colors: none)', () => {
      initializeParallax(gallery, scroller);
      const titles = gallery.querySelectorAll('.p6-chapter-title');
      titles.forEach(title => {
        const words = title.querySelectorAll('.p6-word');
        // Dgrees setTitles: source words fade once, without spatial motion.
        gsap.fromTo(words, { y: '0%', opacity: .0001 }, {
          opacity: 1, stagger: .02, duration: .8, ease: 'expo.out',
          scrollTrigger: { scroller, trigger: title, start: 'top 90%', once: true },
        });
      });
    }, gallery);
    let frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    const resize = new ResizeObserver(() => {
      measure(); cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    resize.observe(scroller);
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && !scroller.hasAttribute('inert')) {
        media.revert(); gallery.dataset.keyboard = 'true';
      }
    };
    document.addEventListener('keydown', keyboard, true);
    return () => { resize.disconnect(); cancelAnimationFrame(frame); media.revert(); document.removeEventListener('keydown', keyboard, true); };
  }, [project.id, scrollerRef]);

  return <section className="project-gallery p6-parallax-gallery" ref={root} aria-labelledby="case-gallery-title">
    <div className="shell gallery-intro">
      <div className="collection-intro"><h2 id="case-gallery-title">{PROTOTYPE_GALLERY.title}</h2><p>{PROTOTYPE_GALLERY.description}</p></div>
      <div className="gallery-boundary"><span>{PROTOTYPE_GALLERY.label}</span><p>{project.decisionRecord.boundary}</p></div>
    </div>
    {PROTOTYPE_GALLERY.chapters.map((chapter, index) => {
      const image = project.images?.[chapter.imageIndex];
      if (!image) return null;
      return <figure className="p6-chapter" key={image.src} data-image={image.src}>
        <header className="p6-chapter-heading shell">
          <h3 className="p6-chapter-title" aria-label={chapter.title}>{chapter.title.split(' ').map((word, i) => <span className="p6-word" aria-hidden="true" key={i}>{word}{' '}</span>)}</h3>
          <span>{chapter.topic}</span>
        </header>
        <div className="p6-scene">
          <button type="button" className="p6-image-canvas" onClick={event => onImage(image, event.currentTarget)} aria-label={`Enlarge image ${index + 1} of ${PROTOTYPE_GALLERY.chapters.length}: ${chapter.topic}`}>
            <img src={image.src} srcSet={image.srcSet} sizes="(max-width: 1100px) calc(100vw - 44px), 94vw" width={image.width} height={image.height} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          </button>
        </div>
        <figcaption className="p6-caption shell"><p>{chapter.note}</p><span><span className="mono">0{index + 1} / 04</span> · Inspect image ↗</span></figcaption>
      </figure>;
    })}
    <div className="gallery-outro shell"><p>{PROTOTYPE_GALLERY.credit}</p><span>{project.tools.join(' + ')} / {project.scope} / {project.timeline}</span></div>
  </section>;
}
