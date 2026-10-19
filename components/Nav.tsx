import { useEffect, useState } from "react";
import type { Theme } from "../utils/useTheme";

export const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-10% 0px -60% 0px" },
    );
    ["home", "work", "about", "skills", "experience", "contact"].forEach(
      (id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      },
    );
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="nav-brand" href="#home" aria-label="Otto Montoya, home">
          <img src={theme === "dark" ? "/assets/logo-light.svg" : "/assets/logo.svg"} alt="" width="28" height="28" />
          <span>Otto Montoya</span>
        </a>
        <nav aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="theme-toggle"
          aria-label="Dark mode"
          aria-pressed={theme === "dark"}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={onToggleTheme}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {theme === "dark" ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </>
            ) : (
              <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
