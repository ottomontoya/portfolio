import { useState, useEffect, useRef } from "react";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
];

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const [scrolled, setScrolled] = useState(false);

  const navCenterRef = useRef<HTMLElement>(null);
  const mnavPillRef = useRef<HTMLDivElement>(null);
  const desktopRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  type PillRect = { left: number; top: number; width: number; height: number; ready: boolean };
  const [dPill, setDPill] = useState<PillRect>({ left: 0, top: 0, width: 0, height: 0, ready: false });
  const [mPill, setMPill] = useState<PillRect>({ left: 0, top: 0, width: 0, height: 0, ready: false });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const measure = () => {
      const dEl = desktopRefs.current[active];
      const dNav = navCenterRef.current;
      if (dEl && dNav) {
        const nr = dNav.getBoundingClientRect();
        const er = dEl.getBoundingClientRect();
        setDPill({ left: er.left - nr.left, top: er.top - nr.top, width: er.width, height: er.height, ready: true });
      }
      const mEl = mobileRefs.current[active];
      const mNav = mnavPillRef.current;
      if (mEl && mNav) {
        const nr = mNav.getBoundingClientRect();
        const er = mEl.getBoundingClientRect();
        setMPill({ left: er.left - nr.left, top: er.top - nr.top, width: er.width, height: er.height, ready: true });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <>
      <header className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="nav-pill">
          <button className="nav-brand" onClick={() => scrollTo("home")}>
            <img src={dark ? "/assets/logo-light.svg" : "/assets/logo.svg"} alt="" width="26" height="26" />
            Otto Montoya
          </button>
          <nav ref={navCenterRef} className="nav-center">
            {dPill.ready && (
              <span className="nav-active-pill" style={{ left: dPill.left, top: dPill.top, width: dPill.width, height: dPill.height }} />
            )}
            {NAV_ITEMS.map(it => (
              <button key={it.id} ref={el => { desktopRefs.current[it.id] = el; }} className={`nav-link${active === it.id ? " active" : ""}`} onClick={() => scrollTo(it.id)}>
                {it.label}
              </button>
            ))}
          </nav>
          <button className="nav-mode" onClick={onToggleDark} aria-label="Toggle dark mode">
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <div className="mnav-wrap">
        <div ref={mnavPillRef} className="mnav-pill">
          {mPill.ready && (
            <span className="mnav-active-pill" style={{ left: mPill.left, top: mPill.top, width: mPill.width, height: mPill.height }} />
          )}
          {NAV_ITEMS.map(it => (
            <button key={it.id} ref={el => { mobileRefs.current[it.id] = el; }} className={`mnav-link${active === it.id ? " active" : ""}`} onClick={() => scrollTo(it.id)}>
              {it.label}
            </button>
          ))}
          <span className="mnav-sep" />
          <button className="mnav-link mnav-mode" onClick={onToggleDark} aria-label="Toggle dark mode">
            {dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
          </button>
        </div>
      </div>
    </>
  );
}
