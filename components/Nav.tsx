import { useState, useEffect, useRef } from "react";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function scrollTo(id: string) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

// All sections whose background can conflict with the nav.
const ALL_WATCHED_IDS = ["about", "skills", "experience"];

type NavScheme = "default" | "over-dark" | "over-light";

// Classify the rendered wall beneath the nav rather than treating the theme as
// a proxy for contrast. About and Skills remain colored dark rooms in both
// themes; Experience alone flips from a dark wall to a light wall.
function classify(ids: string[], dark: boolean): NavScheme {
  if (ids.includes("experience")) return dark ? "over-light" : "over-dark";
  if (ids.some(id => id === "about" || id === "skills")) return "over-dark";
  return "default";
}

function useNavScheme(dark: boolean) {
  const [desktopIds, setDesktopIds] = useState<string[]>([]);
  const [mobileIds, setMobileIds] = useState<string[]>([]);

  useEffect(() => {
    const dActive = new Set<string>();
    const mActive = new Set<string>();

    const build = () => {
      const strip = 80;
      const vh = window.innerHeight;

      const dObs = new IntersectionObserver(
        entries => {
          entries.forEach(e => e.isIntersecting ? dActive.add(e.target.id) : dActive.delete(e.target.id));
          setDesktopIds([...dActive]);
        },
        { rootMargin: `0px 0px -${Math.max(0, vh - strip)}px 0px` }
      );

      const mObs = new IntersectionObserver(
        entries => {
          entries.forEach(e => e.isIntersecting ? mActive.add(e.target.id) : mActive.delete(e.target.id));
          setMobileIds([...mActive]);
        },
        { rootMargin: `-${Math.max(0, vh - strip)}px 0px 0px 0px` }
      );

      ALL_WATCHED_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) { dObs.observe(el); mObs.observe(el); }
      });

      return [dObs, mObs] as const;
    };

    let [dObs, mObs] = build();
    const onResize = () => {
      dObs.disconnect(); mObs.disconnect();
      dActive.clear(); mActive.clear();
      [dObs, mObs] = build();
    };

    window.addEventListener("resize", onResize);
    return () => {
      dObs.disconnect(); mObs.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []); // observers never need rebuilding for dark changes — classify() handles it

  return {
    desktopScheme: classify(desktopIds, dark),
    mobileScheme: classify(mobileIds, dark),
  };
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= threshold) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return active;
}

const SunIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export function Nav({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const active = useActiveSection();
  const { desktopScheme, mobileScheme } = useNavScheme(dark);
  const [scrolled, setScrolled] = useState(false);

  const navCenterRef = useRef<HTMLElement>(null);
  const mnavPillRef = useRef<HTMLElement>(null);
  const desktopRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  type PillClip = { clipPath: string; ready: boolean };
  type MobilePill = { left: number; width: number; ready: boolean };
  const emptyPill: PillClip = { clipPath: "inset(0 100% 0 0 round 999px)", ready: false };
  const [dPill, setDPill] = useState<PillClip>(emptyPill);
  const [mPill, setMPill] = useState<MobilePill>({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const getClip = (navRect: DOMRect, itemRect: DOMRect) => {
      const top = Math.max(0, itemRect.top - navRect.top);
      const right = Math.max(0, navRect.right - itemRect.right);
      const bottom = Math.max(0, navRect.bottom - itemRect.bottom);
      const left = Math.max(0, itemRect.left - navRect.left);
      return `inset(${top}px ${right}px ${bottom}px ${left}px round 999px)`;
    };

    const measure = () => {
      const dEl = desktopRefs.current[active];
      const dNav = navCenterRef.current;
      if (dEl && dNav) {
        const nr = dNav.getBoundingClientRect();
        const er = dEl.getBoundingClientRect();
        setDPill({ clipPath: getClip(nr, er), ready: true });
      }
      const mEl = mobileRefs.current[active];
      const mNav = mnavPillRef.current;
      if (mEl && mNav) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const left = mEl.offsetLeft - (mNav.clientWidth - mEl.offsetWidth) / 2;
        mNav.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
        setMPill({ left: mEl.offsetLeft, width: mEl.offsetWidth, ready: true });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <>
      <header className={`nav-wrap${scrolled ? " scrolled" : ""}${desktopScheme !== "default" ? ` nav-${desktopScheme}` : ""}`}>
        <div className="nav-pill">
          <button className="nav-brand" onClick={() => scrollTo("home")}>
            <img src={desktopScheme === "over-dark" || (dark && desktopScheme !== "over-light") ? "/assets/logo-light.svg" : "/assets/logo.svg"} alt="" width="26" height="26" />
            Otto Montoya
          </button>
          <nav ref={navCenterRef} className="nav-center" aria-label="Primary navigation">
            {dPill.ready && (
              <span className="nav-active-pill" style={{ clipPath: dPill.clipPath }} />
            )}
            {NAV_ITEMS.map(it => (
              <button
                key={it.id}
                ref={el => { desktopRefs.current[it.id] = el; }}
                className={`nav-link${active === it.id ? " active" : ""}`}
                onClick={() => scrollTo(it.id)}
                aria-current={active === it.id ? "location" : undefined}
              >
                {it.label}
              </button>
            ))}
          </nav>
          <button
            className="nav-mode"
            onClick={onToggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <div className="mnav-wrap">
        <div className="mnav-cluster">
          <nav ref={mnavPillRef} className={`mnav-pill${mobileScheme !== "default" ? ` nav-${mobileScheme}` : ""}`} aria-label="Primary navigation">
            {mPill.ready && (
              <span
                className="mnav-active-pill"
                style={{ width: mPill.width, transform: `translateX(${mPill.left}px)` }}
              />
            )}
            {NAV_ITEMS.map(it => (
              <button
                key={it.id}
                ref={el => { mobileRefs.current[it.id] = el; }}
                className={`mnav-link${active === it.id ? " active" : ""}`}
                onClick={() => scrollTo(it.id)}
                aria-current={active === it.id ? "location" : undefined}
              >
                {it.label}
              </button>
            ))}
          </nav>
          <button
            className={`mnav-theme${mobileScheme !== "default" ? ` nav-${mobileScheme}` : ""}`}
            onClick={onToggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
          >
            {dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
          </button>
        </div>
      </div>
    </>
  );
}
