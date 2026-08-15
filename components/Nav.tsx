import { useState, useEffect, useRef } from "react";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// All sections whose background can conflict with the nav.
const ALL_WATCHED_IDS = ["about", "skills", "experience"];

type NavScheme = "default" | "over-dark" | "over-light";

// Classify the rendered wall beneath the nav rather than treating the theme as
// a proxy for contrast. About and Skills remain colored dark rooms in both
// themes; Experience remains a dark Charcoal Ink room in both themes.
function classify(ids: string[]): NavScheme {
  if (ids.includes("experience")) return "over-dark";
  if (ids.some(id => id === "about" || id === "skills")) return "over-dark";
  return "default";
}

function useNavScheme() {
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
    desktopScheme: classify(desktopIds),
    mobileScheme: classify(mobileIds),
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
  const { desktopScheme, mobileScheme } = useNavScheme();
  const [scrolled, setScrolled] = useState(false);

  const mnavPillRef = useRef<HTMLElement>(null);
  const mobileRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const measure = () => {
      const mEl = mobileRefs.current[active];
      const mNav = mnavPillRef.current;
      if (mEl && mNav) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const left = mEl.offsetLeft - (mNav.clientWidth - mEl.offsetWidth) / 2;
        mNav.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
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
          <a className="nav-brand" href="#home">
            <img src={desktopScheme === "over-dark" || (dark && desktopScheme !== "over-light") ? "/assets/logo-light.svg" : "/assets/logo.svg"} alt="" width="26" height="26" />
            Otto Montoya
          </a>
          <nav className="nav-center" aria-label="Primary navigation">
            {NAV_ITEMS.map(it => (
              <a
                key={it.id}
                className={`nav-link${active === it.id ? " active" : ""}`}
                href={`#${it.id}`}
                aria-current={active === it.id ? "location" : undefined}
              >
                {it.label}
              </a>
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
            {NAV_ITEMS.map(it => (
              <a
                key={it.id}
                ref={el => { mobileRefs.current[it.id] = el; }}
                className={`mnav-link${active === it.id ? " active" : ""}`}
                href={`#${it.id}`}
                aria-current={active === it.id ? "location" : undefined}
              >
                {it.label}
              </a>
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
