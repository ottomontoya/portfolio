import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { CONTACT } from "../data/contact";
import { FOOTER_NAV_ITEMS } from "../data/navigation";
import { CopyEmailButton } from "./ui";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M7 25 25 7M7 7h18v18" : "M5 16h22M17 6l10 10-10 10"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ContactPanel() {
  const panel = useRef<HTMLAnchorElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (min-width: 760px) and (prefers-reduced-motion: no-preference) and (forced-colors: none)', () => {
      const el = panel.current!, child = pill.current!;
      const x = gsap.quickSetter(child, 'x', 'px');
      const y = gsap.quickSetter(child, 'y', 'px');
      let pointer: { x: number; y: number } | null = null;
      const reset = () => {
        pointer = null;
        gsap.to(child, { x: 0, y: 0, duration: .25, ease: 'power3.out', overwrite: true });
      };
      const position = () => {
        if (!pointer) return;
        const rect = el.getBoundingClientRect();
        if (pointer.x < rect.left || pointer.x > rect.right ||
          pointer.y < rect.top || pointer.y > rect.bottom) {
          reset();
          return;
        }
        const halfWidth = child.offsetWidth / 2, halfHeight = child.offsetHeight / 2;
        // Follow the pointer itself, measured against the pill's actual layout origin.
        // Clamp only at the panel edges so the complete action stays visible.
        const centerX = gsap.utils.clamp(12 + halfWidth, el.clientWidth - 12 - halfWidth, pointer.x - rect.left - el.clientLeft);
        const centerY = gsap.utils.clamp(12 + halfHeight, el.clientHeight - 12 - halfHeight, pointer.y - rect.top - el.clientTop);
        gsap.killTweensOf(child);
        x(centerX - child.offsetLeft - halfWidth);
        y(centerY - child.offsetTop - halfHeight);
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        pointer = { x: event.clientX, y: event.clientY };
        position();
      };
      const keyboard = (event: KeyboardEvent) => { if (event.key === 'Tab') reset(); };
      const resize = new ResizeObserver(position);
      resize.observe(el);
      el.addEventListener('pointerenter', move);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', reset);
      el.addEventListener('pointercancel', reset);
      el.addEventListener('blur', reset);
      window.addEventListener('blur', reset);
      window.addEventListener('resize', position);
      document.addEventListener('visibilitychange', reset);
      window.addEventListener('scroll', position, { passive: true });
      document.addEventListener('keydown', keyboard);
      return () => {
        resize.disconnect();
        el.removeEventListener('pointerenter', move);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', reset);
        el.removeEventListener('pointercancel', reset);
        el.removeEventListener('blur', reset);
        window.removeEventListener('blur', reset);
        window.removeEventListener('resize', position);
        document.removeEventListener('visibilitychange', reset);
        window.removeEventListener('scroll', position);
        document.removeEventListener('keydown', keyboard);
        gsap.killTweensOf(child);
        gsap.set(child, { clearProps: 'transform' });
      };
    });
    return () => media.revert();
  }, []);
  return (
    <a
      ref={panel}
      className="footer-contact-panel"
      href={`mailto:${CONTACT.email}`}
      aria-label={`${CONTACT.emailAction}: ${CONTACT.email}`}
    >
      <h2 id="contact-title">
        {CONTACT.contactHeadingLines.map((line, i) => (
          <span key={line}>{line}{i === 0 ? " " : ""}</span>
        ))}
      </h2>
      <span className="footer-email-pill" ref={pill}>
        {CONTACT.emailAction}<Arrow diagonal />
      </span>
    </a>
  );
}

export function SiteFooter() {
  const name = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 760px) and (prefers-reduced-motion: no-preference) and (forced-colors: none)', () => {
      const letters = name.current!.querySelectorAll('span');
      let reveal: gsap.core.Tween | undefined;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        reveal = gsap.fromTo(letters, { yPercent: 110 }, { yPercent: 0, duration: .8, stagger: .025, ease: 'power3.out' });
        observer.disconnect();
      }, { threshold: .25 });
      observer.observe(name.current!);
      return () => {
        observer.disconnect();
        reveal?.kill();
        gsap.set(letters, { clearProps: 'transform' });
      };
    });
    return () => media.revert();
  }, []);
  return <footer id="contact" className="site-footer" aria-labelledby="contact-title">
    <div className="footer-shell">
      <div className="footer-top">
        <nav className="footer-navigation" aria-label="Footer navigation">
          <p className="footer-label">{CONTACT.footerEyebrow}</p>
          {FOOTER_NAV_ITEMS.map(({ id, label }) => (
            <a href={`#${id}`} key={id}>
              <span className="footer-nav-text">{label}</span>
              <Arrow />
            </a>
          ))}
        </nav>
        <div className="footer-contact">
          <p className="footer-label">{CONTACT.contactEyebrow}</p>
          <ContactPanel />
          <div className="footer-contact-details">
            <div className="footer-address">
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <CopyEmailButton
                email={CONTACT.email}
                label={CONTACT.copyEmailShortLabel}
                successMessage={CONTACT.copyEmailSuccess}
                errorMessage={CONTACT.copyEmailError}
              />
            </div>
            <p>{CONTACT.contactBody}</p>
          </div>
        </div>
      </div>
      <div className="footer-signature-meta">
        <span>{CONTACT.footerRole}</span>
        <span>{CONTACT.location}</span>
        <a href={CONTACT.linkedInUrl} target="_blank" rel="noopener noreferrer">
          {CONTACT.linkedInLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-signature" ref={name} role="img" aria-label={CONTACT.name}>
        {Array.from(CONTACT.name).map((letter, i) => (
          <span key={i} aria-hidden="true">{letter === " " ? "\u00a0" : letter}</span>
        ))}
      </div>
    </div>
    <div className="footer-colophon footer-shell">
      <span>© 2026 {CONTACT.name}</span>
      <span className="footer-colophon-tagline">{CONTACT.tagline}</span>
      <a href="#home">{CONTACT.backToTopLabel}<span aria-hidden="true">↑</span></a>
    </div>
  </footer>;
}
