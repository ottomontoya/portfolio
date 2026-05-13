import React, { useState, useEffect, useRef } from "react";
import { PROJECTS, Project, ChartKind } from "./data/projects";
import { EDUCATION, EXPERIENCE } from "./data/education";
import { SKILL_GROUPS, SOFT_SKILLS, ABOUT_TAGS } from "./data/skills";
import { STATS, ABOUT_BODY, HOW_I_WORK } from "./data/about";

// ─── CHARTS ──────────────────────────────────────────────

function Spark({ data = [4,6,5,8,7,10,9,12,11,14,13,16], color = "currentColor", w = 240, h = 60, fill = false }: {
  data?: number[]; color?: string; w?: number; h?: number; fill?: boolean;
}) {
  const max = Math.max(...data), min = Math.min(...data);
  const xs = data.map((_, i) => (i / (data.length - 1)) * w);
  const ys = data.map(v => h - ((v - min) / (max - min || 1)) * (h - 4) - 2);
  const path = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {fill && <path d={area} fill={color} fillOpacity={0.15} />}
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {xs.map((x, i) => i === xs.length - 1 && <circle key={i} cx={x} cy={ys[i]} r="3" fill={color} />)}
    </svg>
  );
}

function Bars({ data = [3,5,4,7,6,9,8,5,11,9,12,14], color = "currentColor", w = 240, h = 80 }: {
  data?: number[]; color?: string; w?: number; h?: number;
}) {
  const max = Math.max(...data);
  const bw = w / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none">
      {data.map((v, i) => {
        const bh = (v / max) * (h - 4);
        return <rect key={i} x={i * bw + 1.5} y={h - bh} width={bw - 3} height={bh} fill={color} opacity={0.4 + (i / data.length) * 0.6} />;
      })}
    </svg>
  );
}

function ScatterChart({ color = "currentColor", w = 240, h = 120, n = 28 }: {
  color?: string; w?: number; h?: number; n?: number;
}) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = Math.sin(i * 13.37) * 0.5 + 0.5;
    const b = Math.cos(i * 7.91) * 0.5 + 0.5;
    return { x: a * (w - 8) + 4, y: b * (h - 8) + 4, r: 1.5 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 2.5 };
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none">
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={color} opacity={0.4 + (i % 4) * 0.15} />)}
    </svg>
  );
}

function LinesChart({ color = "currentColor", w = 240, h = 100 }: {
  color?: string; w?: number; h?: number;
}) {
  const series = [
    [3,4,5,4,6,5,7,6,8,7,9,10],
    [2,3,3,5,4,6,7,7,9,9,11,12],
    [5,4,6,5,7,8,7,9,8,10,11,13],
  ];
  const max = 14, min = 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {series.map((data, si) => {
        const xs = data.map((_, i) => (i / (data.length - 1)) * w);
        const ys = data.map(v => h - ((v - min) / (max - min)) * (h - 6) - 3);
        const path = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
        return <path key={si} d={path} stroke={color} strokeWidth="1.5" fill="none" opacity={1 - si * 0.3} strokeDasharray={si === 1 ? "3 3" : "0"} />;
      })}
    </svg>
  );
}

function ProjectChart({ kind, color }: { kind: ChartKind; color: string }) {
  switch (kind) {
    case "areaDown": return <Spark data={[16,15,14,12,11,9,8,7,6,5,4,3]} color={color} fill />;
    case "areaUp":   return <Spark data={[3,4,4,6,5,8,7,10,9,12,13,15]} color={color} fill />;
    case "bars":     return <Bars color={color} />;
    case "lines":    return <LinesChart color={color} />;
    case "scatter":  return <ScatterChart color={color} />;
    default:         return <Spark color={color} fill />;
  }
}

// ─── NAV ─────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
];

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

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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

function Nav({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
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

// ─── DIVIDERS ────────────────────────────────────────────

function Divider({ from, to, variant = "wave" }: { from: string; to: string; variant?: "wave" | "curve" | "diagonal" }) {
  if (variant === "diagonal") {
    return (
      <svg className="sec-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="0,0 1440,80 1440,0" style={{ fill: from }} />
        <polygon points="0,0 1440,80 0,80" style={{ fill: to }} />
      </svg>
    );
  }
  if (variant === "curve") {
    return (
      <svg className="sec-divider" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="1440" height="120" style={{ fill: from }} />
        <path d="M0,120 C 360,40 1080,40 1440,120 L1440,120 L0,120 Z" style={{ fill: to }} />
      </svg>
    );
  }
  return (
    <svg className="sec-divider" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="1440" height="140" style={{ fill: from }} />
      <path d="M0,80 C 240,140 480,30 720,80 C 960,130 1200,30 1440,80 L1440,140 L0,140 Z" style={{ fill: to }} />
    </svg>
  );
}

// ─── UI PRIMITIVES ───────────────────────────────────────

function Eyebrow({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div className="eyebrow">
      {dot && <span className="eyebrow-dot" />}
      <span>{children}</span>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="a-pill">{children}</span>;
}

// ─── SECTIONS ────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="home" className="room room-hero">
      <div className="shell">
        <Eyebrow dot>Data Analyst · BI Specialist</Eyebrow>
        <h1 className="h1">
          Clear insights<br />from <em>complex</em> data.
        </h1>
        <p className="lead">
          I work end-to-end across the BI stack — from understanding the question, to defining KPIs, to shipping dashboards teams actually use.
        </p>
        <div className="cta-row">
          <button className="cta cta-primary" onClick={() => scrollTo("work")}>View work <span className="arr">→</span></button>
          <button className="cta cta-ghost" onClick={() => scrollTo("about")}>About me</button>
        </div>
        <div className="hero-strip">
          {STATS.map((s, i) => (
            <div className="hero-stat" key={i}>
              <div className="stat-val">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-suffix">{s.suffix}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="room room-about">
      <div className="shell">
        <Eyebrow dot>About</Eyebrow>
        <h2 className="h2">I turn messy data <em>into reliable insights.</em></h2>
        <div className="about-grid">
          <div className="about-body">
            {ABOUT_BODY.map((p, i) => <p key={i}>{p}</p>)}
            <div className="tags">
              {ABOUT_TAGS.map(t => <Pill key={t}>{t}</Pill>)}
            </div>
          </div>
          <div className="about-side">
            <div className="side-h">How I work</div>
            <ul className="how">
              {HOW_I_WORK.map((h, i) => (
                <li key={i}>
                  <span className="how-n mono">0{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="work" className="room room-work">
      <div className="shell">
        <Eyebrow dot>Selected work</Eyebrow>
        <div className="work-head">
          <h2 className="h2 h2-work">Six projects, <em>six industries.</em></h2>
          <p className="lead lead-work">From access governance to legacy migrations — each one ended with a dashboard people actually used.</p>
        </div>
        <ul className="projects">
          {PROJECTS.map((p) => (
            <li key={p.id} className="project" onClick={() => onOpen(p.id)}>
              <div className="proj-n mono">{p.n}</div>
              <div className="proj-main">
                <h3 className="proj-title">{p.title}</h3>
                <div className="proj-meta mono">{p.client} · {p.role}</div>
                <p className="proj-sum">{p.summary}</p>
                <div className="proj-tools">
                  {p.tools.map(t => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
              <div className="proj-chart">
                <div className="proj-metric">
                  <div className="proj-mv">{p.metric.value}</div>
                  <div className="proj-ml mono">{p.metric.label}</div>
                </div>
                <ProjectChart kind={p.chart} color="currentColor" />
              </div>
              <div className="proj-arr">→</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="room room-skills">
      <div className="shell">
        <Eyebrow dot>Skills</Eyebrow>
        <h2 className="h2">Tools, knowledge, <em>and ways of working.</em></h2>
        <div className="skills-grid">
          {SKILL_GROUPS.map(g => (
            <div className="skill-col" key={g.label}>
              <div className="skill-h mono">{g.label}</div>
              <ul>
                {g.items.map(it => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="soft">
          <div className="side-h">How I show up</div>
          <ul className="soft-list">
            {SOFT_SKILLS.map((s, i) => (
              <li key={i}>
                <span className="mono how-n">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="edu">
          <div className="side-h">Education & certifications</div>
          <ul className="edu-list">
            {EDUCATION.map((e, i) => (
              <li key={i}>
                <div className="edu-title">{e.title}</div>
                <div className="edu-school mono">{e.school}</div>
                <div className="edu-note">{e.note}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="room room-exp">
      <div className="shell">
        <Eyebrow dot>Experience</Eyebrow>
        <h2 className="h2">A path through <em>data, dashboards & teams.</em></h2>
        <ol className="timeline">
          {EXPERIENCE.map((e, i) => (
            <li className="tl-item" key={i}>
              <div className="tl-time mono">{e.time}</div>
              <div className="tl-body">
                <div className="tl-role">{e.role}</div>
                <div className="tl-org mono">{e.org}</div>
                <div className="tl-note">{e.note}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="contact-block">
          <div className="contact-l">
            <Eyebrow>Get in touch</Eyebrow>
            <h3 className="contact-title">Let's work <em>together.</em></h3>
            <p className="contact-sub">Open to new projects and collaborations.</p>
            <a href="mailto:work@ottomontoya.com" className="cta cta-primary">
              Say hello <span className="arr">→</span>
            </a>
          </div>
          <ul className="contact-r">
            <li><span className="mono">Email</span><span>work@ottomontoya.com</span></li>
            <li><span className="mono">Connect</span><a href="https://www.linkedin.com/in/ottomontoya/" target="_blank" rel="noopener noreferrer" className="contact-linkedin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a></li>
            <li><span className="mono">Based in</span><span>Mérida, México</span></li>
          </ul>
        </div>
        <footer className="foot mono">
          <span>© 2026 Otto Montoya</span>
          <span>Made with care · Mérida, MX</span>
        </footer>
      </div>
    </section>
  );
}

// ─── PROJECT OVERLAY ─────────────────────────────────────

function ProjectOverlay({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, lightbox]);

  if (!project) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-card" onClick={e => e.stopPropagation()}>
        <button className="overlay-x" onClick={onClose} aria-label="Close">×</button>
        {project.images && project.images.length > 0 && (
          <div className="overlay-images">
            {project.images.map((src, i) => (
              <img key={i} src={src} alt="" className="overlay-img" onClick={() => setLightbox(src)} />
            ))}
          </div>
        )}
        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="" className="lightbox-img" />
          </div>
        )}
        <div className="overlay-grid">
          <div>
            <div className="mono overlay-eb">{project.n} · {project.client}</div>
            <h3 className="overlay-title">{project.title}</h3>
            <div className="mono overlay-role">{project.role}</div>
            <div className="overlay-body">
              {project.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="overlay-section-label">Responsibilities</div>
            <ul className="overlay-resp">
              {project.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="overlay-side">
            <div className="overlay-metric">
              <div className="proj-mv ov-mv">{project.metric.value}</div>
              <div className="proj-ml mono">{project.metric.label}</div>
            </div>
            <div className="overlay-chart">
              <ProjectChart kind={project.chart} color="var(--burgundy)" />
            </div>
            <div className="overlay-pieces">
              <div className="overlay-piece">
                <div className="mono">scope</div>
                <div>{project.scope}</div>
              </div>
              <div className="overlay-piece">
                <div className="mono">timeline</div>
                <div>{project.timeline}</div>
              </div>
              <div className="overlay-piece">
                <div className="mono">stack</div>
                <div>{project.tools[0]}</div>
              </div>
            </div>
            <div className="overlay-side-section">
              <div className="overlay-section-label">Impact</div>
              <div className="overlay-impact">{project.impact}</div>
            </div>
            {project.tools.length > 1 && (
              <div className="overlay-side-section">
                <div className="overlay-section-label">Stack</div>
                <div className="overlay-tools">
                  {project.tools.map(t => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
            )}
            {project.caseStudy && (
              <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className="cta cta-ghost overlay-case-study">
                View case study <span className="arr">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── THEME ───────────────────────────────────────────────

function applyTheme(dark: boolean) {
  const r = document.documentElement.style;
  if (dark) {
    r.setProperty("--green", "#3d6b3f");
    r.setProperty("--burgundy", "#a8344a");
    r.setProperty("--beige", "#1a1a18");
    r.setProperty("--ink", "#f1ead8");
    r.setProperty("--paper", "#232220");
    r.setProperty("--nav-bg", "rgba(255,255,255,.06)");
    r.setProperty("--nav-border", "rgba(255,255,255,.12)");
    r.setProperty("--nav-active", "rgba(255,255,255,.14)");
  } else {
    r.setProperty("--green", "#2d4a2b");
    r.setProperty("--burgundy", "#6b1f2a");
    r.setProperty("--beige", "#f1ead8");
    r.setProperty("--ink", "#1a1a18");
    r.setProperty("--paper", "#f7f1de");
    r.setProperty("--nav-bg", "rgba(0,0,0,.04)");
    r.setProperty("--nav-border", "rgba(0,0,0,.08)");
    r.setProperty("--nav-active", "rgba(0,0,0,.08)");
  }
  document.body.style.background = dark ? "#1a1a18" : "#f1ead8";
  document.body.style.color = dark ? "#f1ead8" : "#1a1a18";
}

// ─── STYLES ──────────────────────────────────────────────

const CSS = `
  :root {
    --green:    #2d4a2b;
    --burgundy: #6b1f2a;
    --beige:    #f1ead8;
    --ink:      #1a1a18;
    --paper:    #f7f1de;
    --nav-bg:     rgba(0,0,0,.04);
    --nav-border: rgba(0,0,0,.08);
    --nav-active: rgba(0,0,0,.08);
    --font-display: "Instrument Serif", Georgia, serif;
    --font-body:    "DM Sans", ui-sans-serif, system-ui, sans-serif;
    --font-mono:    "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: var(--font-body);
    background: var(--beige);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }
  #root { min-height: 100vh; }
  ::selection { background: var(--burgundy); color: var(--beige); }
  body::-webkit-scrollbar { width: 10px; }
  body::-webkit-scrollbar-track { background: transparent; }
  body::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); border-radius: 6px; }

  /* ── Nav ── */
  .nav-wrap {
    position: fixed; top: 18px; left: 0; right: 0; z-index: 50;
    display: flex; justify-content: center; pointer-events: none;
    padding: 0 24px; transition: top .25s ease;
  }
  .nav-wrap.scrolled { top: 14px; }
  .nav-pill {
    pointer-events: auto;
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: center; width: 100%; max-width: 1320px;
    padding: 6px 8px; border-radius: 999px;
    background: rgba(255,255,255,.14);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(255,255,255,.22);
    box-shadow: 0 10px 40px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.25);
    color: var(--ink);
  }
  .nav-brand {
    justify-self: start; background: none; border: 0;
    font-family: var(--font-body); font-size: 13px; font-weight: 600;
    letter-spacing: -.01em; color: inherit; cursor: pointer;
    padding: 8px 14px; opacity: .92;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .nav-brand img { display: block; flex-shrink: 0; }
  .nav-brand:hover { opacity: 1; }
  .nav-center { justify-self: center; display: flex; gap: 2px; align-items: center; position: relative; }
  .nav-active-pill {
    position: absolute; border-radius: 999px; pointer-events: none; z-index: 0;
    background: rgba(0,0,0,.32);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
    transition: left .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1), top .3s cubic-bezier(.4,0,.2,1);
  }
  .nav-link {
    background: none; border: 0;
    font-family: var(--font-body); font-size: 13px; letter-spacing: .005em;
    padding: 8px 14px; border-radius: 999px; cursor: pointer; color: inherit;
    opacity: .7; transition: opacity .2s, color .2s;
    position: relative; z-index: 1;
  }
  .nav-link:hover { opacity: 1; }
  .nav-link.active { background: none; color: #fff; opacity: 1; }
  .nav-mode {
    justify-self: end; background: transparent; border: 0;
    width: 32px; height: 32px; border-radius: 999px; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
    color: inherit; opacity: .85;
  }
  .nav-mode:hover { background: rgba(255,255,255,.12); opacity: 1; }
  @media (max-width: 760px) { .nav-wrap { display: none; } }

  /* ── Mobile nav ── */
  .mnav-wrap {
    position: fixed; bottom: 18px; left: 0; right: 0; z-index: 50;
    display: none; justify-content: center; pointer-events: none;
  }
  @media (max-width: 760px) { .mnav-wrap { display: flex; } }
  .mnav-pill {
    pointer-events: auto; display: flex; align-items: center; gap: 2px;
    padding: 6px; border-radius: 999px; position: relative;
    background: rgba(255,255,255,.14); backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(255,255,255,.22);
    box-shadow: 0 10px 30px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.25);
    color: var(--ink);
    max-width: calc(100vw - 24px); overflow: hidden;
  }
  .mnav-active-pill {
    position: absolute; border-radius: 999px; pointer-events: none; z-index: 0;
    background: rgba(0,0,0,.32);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    transition: left .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1), top .3s cubic-bezier(.4,0,.2,1);
  }
  .mnav-link {
    background: none; border: 0;
    font-family: var(--font-body); font-size: 12px;
    padding: 8px 12px; border-radius: 999px; cursor: pointer;
    color: inherit; opacity: .75;
    position: relative; z-index: 1;
  }
  .mnav-link.active { background: none; color: #fff; opacity: 1; }
  .mnav-sep { width: 1px; height: 18px; background: currentColor; opacity: .2; margin: 0 2px; }
  .mnav-mode { padding: 8px; display: inline-flex; opacity: .85; }

  /* ── Rooms ── */
  .room { position: relative; }
  .room-hero   { background: var(--beige);   color: var(--ink); }
  .room-about  { background: var(--green);   color: var(--beige); }
  .room-work   { background: var(--beige);   color: var(--ink); }
  .room-skills { background: var(--burgundy); color: var(--beige); }
  .room-exp    { background: var(--ink);     color: var(--beige); }

  .shell { max-width: 1240px; margin: 0 auto; padding: 140px 32px 120px; position: relative; }
  @media (max-width: 760px) { .shell { padding: 120px 20px 100px; } }

  .sec-divider { display: block; width: 100%; height: 120px; margin: -1px 0; }

  /* ── Eyebrow ── */
  .eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; opacity: .7; margin-bottom: 28px;
  }
  .eyebrow-dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; opacity: .5; }
  .mono { font-family: var(--font-mono); font-size: .85em; letter-spacing: .01em; }

  /* ── Typography ── */
  .h1 {
    font-family: var(--font-display); font-weight: 400;
    font-size: clamp(56px, 9vw, 128px); line-height: .95; letter-spacing: -.02em;
    margin: 0 0 36px; max-width: 14ch; text-wrap: balance;
  }
  .h1 em { font-style: italic; color: var(--burgundy); }

  .h2 {
    font-family: var(--font-display); font-weight: 400;
    font-size: clamp(40px, 5.5vw, 76px); line-height: 1.02; letter-spacing: -.015em;
    margin: 0 0 48px; max-width: 18ch; text-wrap: balance;
  }
  .h2 em { font-style: italic; color: var(--burgundy); }
  .room-about .h2 em  { color: var(--paper); opacity: .85; }
  .room-skills .h2 em { color: var(--paper); opacity: .9; }
  .room-exp .h2 em    { color: var(--burgundy); filter: brightness(1.3) saturate(1.2); }

  .lead {
    font-size: clamp(17px, 1.6vw, 21px); line-height: 1.5;
    max-width: 54ch; margin: 0 0 36px; opacity: .85; text-wrap: pretty;
  }

  /* ── CTAs ── */
  .cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .cta {
    font-family: var(--font-body); font-size: 14px; font-weight: 500;
    padding: 14px 22px; border-radius: 999px; border: 1px solid transparent;
    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    transition: transform .15s, background .2s; text-decoration: none;
  }
  .cta:hover { transform: translateY(-1px); }
  .cta-primary { background: var(--burgundy); color: var(--beige); }
  .cta-primary:hover { background: var(--ink); }
  .cta-ghost { background: transparent; color: inherit; border-color: currentColor; opacity: .85; }
  .cta-ghost:hover { background: rgba(0,0,0,.04); opacity: 1; }
  .room-about .cta-ghost:hover,
  .room-skills .cta-ghost:hover,
  .room-exp .cta-ghost:hover { background: rgba(255,255,255,.08); }
  .arr { font-family: var(--font-mono); font-size: 13px; }

  /* ── Hero strip ── */
  .hero-strip {
    margin-top: 80px;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
  }
  .hero-stat { padding-right: 20px; }
  .stat-val {
    font-family: var(--font-display); font-size: clamp(40px, 4vw, 56px);
    line-height: 1; color: var(--burgundy); letter-spacing: -.02em;
  }
  .stat-label { font-size: 14px; margin-top: 8px; font-weight: 500; }
  .stat-suffix { font-family: var(--font-mono); font-size: 11px; opacity: .55; margin-top: 4px; letter-spacing: .02em; }
  @media (max-width: 760px) {
    .hero-strip { grid-template-columns: repeat(2, 1fr); }
    .hero-stat { padding: 18px 14px 18px 0; border-bottom: 1px solid rgba(0,0,0,.1); }
  }

  /* ── About ── */
  .about-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 80px; }
  .about-body p { font-size: 18px; line-height: 1.55; margin: 0 0 18px; max-width: 54ch; opacity: .88; text-wrap: pretty; }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
  .a-pill {
    display: inline-block; font-family: var(--font-mono); font-size: 11px; letter-spacing: .04em;
    padding: 6px 11px; border-radius: 999px;
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
  }
  .room-hero .a-pill, .room-work .a-pill { background: rgba(0,0,0,.04); border-color: rgba(0,0,0,.12); }
  .overlay-card .a-pill { background: rgba(0,0,0,.05); border-color: rgba(0,0,0,.14); }
  .side-h {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em;
    text-transform: uppercase; opacity: .6;
    margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid currentColor;
  }
  .how { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 18px; }
  .how li { display: grid; grid-template-columns: 32px 1fr; gap: 12px; font-size: 15px; line-height: 1.5; opacity: .92; }
  .how-n { opacity: .55; }
  @media (max-width: 860px) { .about-grid { grid-template-columns: 1fr; gap: 48px; } }

  /* ── Projects ── */
  .work-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; margin-bottom: 32px; }
  .h2-work   { margin-bottom: 0; }
  .lead-work { margin-bottom: 0; max-width: 36ch; }
  @media (max-width: 860px) { .work-head { flex-direction: column; align-items: flex-start; gap: 20px; } }

  .projects { list-style: none; padding: 0; margin: 0; }
  .project {
    display: grid; grid-template-columns: 64px 1.4fr 1fr 32px; gap: 32px; align-items: center;
    padding: 32px 0; border-top: 1px solid rgba(0,0,0,.15); cursor: pointer;
    transition: padding .2s, background .2s;
  }
  .project:last-child { border-bottom: 1px solid rgba(0,0,0,.15); }
  .project:hover { padding: 32px 24px; background: var(--paper); }
  .project:hover .proj-arr { transform: translateX(4px); color: var(--burgundy); }

  .proj-n { color: var(--burgundy); font-size: 13px; font-weight: 600; opacity: .7; }
  .proj-title {
    font-family: var(--font-display); font-weight: 400;
    font-size: clamp(22px, 2.2vw, 30px); line-height: 1.1; margin: 0 0 6px; letter-spacing: -.01em;
  }
  .proj-meta { font-size: 11.5px; opacity: .6; margin-bottom: 10px; }
  .proj-sum  { font-size: 14px; line-height: 1.5; margin: 0 0 14px; opacity: .78; max-width: 46ch; }
  .proj-tools { display: flex; flex-wrap: wrap; gap: 6px; }
  .proj-chart { display: grid; grid-template-rows: auto 1fr; gap: 8px; color: var(--burgundy); min-width: 0; }
  .proj-metric { display: flex; align-items: baseline; gap: 10px; }
  .proj-mv { font-family: var(--font-display); font-size: 30px; line-height: 1; color: var(--ink); letter-spacing: -.01em; }
  .proj-ml { font-size: 10.5px; opacity: .55; }
  .proj-arr { font-family: var(--font-mono); font-size: 18px; opacity: .4; transition: transform .25s, color .25s; }

  @media (max-width: 860px) {
    .project { grid-template-columns: 48px 1fr; gap: 18px; }
    .proj-chart, .proj-arr { display: none; }
  }

  /* ── Skills ── */
  .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-bottom: 80px; }
  .skill-col { padding-right: 16px; }
  .skill-h { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; opacity: .65; margin-bottom: 16px; }
  .skill-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .skill-col li { font-size: 15px; }
  .skill-col li::before { content: "— "; opacity: .5; }
  @media (max-width: 760px) {
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .skill-col { border-bottom: 1px solid rgba(255,255,255,.12); padding-right: 16px; padding-bottom: 24px; }
  }

  .soft, .edu { margin-top: 48px; }
  .soft-list, .edu-list {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px 48px;
  }
  @media (max-width: 760px) { .soft-list, .edu-list { grid-template-columns: 1fr; } }
  .soft-list li { display: grid; grid-template-columns: 24px 1fr; gap: 8px; font-size: 15px; line-height: 1.55; opacity: .9; }
  .edu-list li { padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,.15); }
  .edu-title { font-family: var(--font-display); font-size: 22px; font-weight: 400; letter-spacing: -.005em; }
  .edu-school { font-size: 11.5px; opacity: .65; margin-top: 4px; }
  .edu-note { font-size: 14px; margin-top: 8px; opacity: .78; }

  /* ── Experience ── */
  .timeline { list-style: none; padding: 0; margin: 0 0 80px; }
  .tl-item {
    display: grid; grid-template-columns: 200px 1fr; gap: 48px;
    padding: 32px 0; border-top: 1px solid rgba(255,255,255,.15);
  }
  .tl-item:last-child { border-bottom: 1px solid rgba(255,255,255,.15); }
  .tl-time { font-size: 12px; opacity: .6; padding-top: 6px; }
  .tl-role { font-family: var(--font-display); font-size: clamp(22px, 2.2vw, 30px); font-weight: 400; letter-spacing: -.005em; }
  .tl-org  { font-size: 12px; opacity: .65; margin-top: 4px; }
  .tl-note { font-size: 15px; margin-top: 10px; opacity: .82; max-width: 60ch; line-height: 1.5; }
  @media (max-width: 760px) { .tl-item { grid-template-columns: 1fr; gap: 8px; } }

  /* ── Contact ── */
  .contact-block {
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
    padding: 80px 0 32px; border-top: 1px solid rgba(255,255,255,.15);
  }
  .contact-title {
    font-family: var(--font-display); font-weight: 400;
    font-size: clamp(40px, 5vw, 72px); letter-spacing: -.02em;
    margin: 18px 0 8px; line-height: 1;
  }
  .contact-title em { font-style: italic; color: var(--burgundy); filter: brightness(1.4) saturate(1.2); }
  .contact-sub { margin: 0 0 24px; opacity: .75; }
  .contact-r { list-style: none; padding: 0; margin: 0; }
  .contact-r li {
    display: grid; grid-template-columns: 120px 1fr; gap: 24px;
    padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 15px;
  }
  .contact-r li span:first-child { opacity: .55; font-size: 12px; align-self: center; letter-spacing: .06em; text-transform: uppercase; }
  .contact-linkedin { display: inline-flex; align-items: center; opacity: .75; transition: opacity .18s; color: inherit; }
  .contact-linkedin:hover { opacity: 1; }
  @media (max-width: 760px) { .contact-block { grid-template-columns: 1fr; gap: 32px; } }

  .foot {
    display: flex; justify-content: space-between;
    padding: 32px 0; opacity: .5; font-size: 11px;
    border-top: 1px solid rgba(255,255,255,.1);
  }

  /* ── Overlay ── */
  .overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,.65); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; animation: fadeIn .2s ease-out;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .overlay-card {
    background: var(--beige); color: var(--ink);
    max-width: 980px; width: 100%; max-height: 88vh; overflow: auto;
    border-radius: 20px; padding: 48px; position: relative;
    animation: popIn .25s cubic-bezier(.22,1,.36,1);
  }
  @keyframes popIn { from { transform: scale(.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .overlay-x {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; border-radius: 999px;
    border: 1px solid rgba(0,0,0,.15); background: transparent;
    font-size: 20px; cursor: pointer; line-height: 1;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .overlay-x:hover { background: var(--ink); color: var(--beige); border-color: var(--ink); }
  .overlay-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; }
  @media (max-width: 760px) { .overlay-grid { grid-template-columns: 1fr; } .overlay-card { padding: 32px 24px; } }
  .overlay-eb { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; opacity: .6; margin-bottom: 10px; }
  .overlay-title {
    font-family: var(--font-display); font-size: clamp(32px, 4vw, 52px); font-weight: 400;
    line-height: 1.05; letter-spacing: -.015em; margin: 0 0 8px;
  }
  .overlay-role { font-size: 12px; opacity: .6; margin-bottom: 20px; }
  .overlay-body p { font-size: 15px; line-height: 1.65; opacity: .85; margin: 0 0 14px; }
  .overlay-section-label {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: .12em;
    text-transform: uppercase; opacity: .55; margin-bottom: 10px;
  }
  .overlay-resp { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
  .overlay-resp li { font-size: 14px; line-height: 1.55; opacity: .85; padding-left: 16px; position: relative; }
  .overlay-resp li::before { content: "—"; position: absolute; left: 0; opacity: .5; }
  .overlay-impact { font-size: 14px; line-height: 1.55; opacity: .85; font-weight: 500; margin-bottom: 0; }
  .overlay-tools { display: flex; flex-wrap: wrap; gap: 6px; }
  .overlay-side-section { border-top: 1px solid rgba(0,0,0,.1); padding-top: 16px; }
  .overlay-side-section .overlay-section-label { margin-bottom: 8px; }
  .overlay-case-study { align-self: flex-start; }
  .overlay-side {
    background: var(--paper); border-radius: 16px; padding: 24px;
    display: flex; flex-direction: column; gap: 24px;
  }
  .overlay-metric { display: flex; align-items: baseline; gap: 10px; }
  .ov-mv { font-size: 48px !important; color: var(--burgundy) !important; }
  .overlay-chart { color: var(--burgundy); }
  .overlay-pieces {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
    border-top: 1px solid rgba(0,0,0,.1); padding-top: 20px;
  }
  .overlay-piece div:first-child { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; opacity: .5; margin-bottom: 4px; font-family: var(--font-mono); }
  .overlay-piece div:last-child { font-size: 14px; font-weight: 500; }

  /* ── Overlay images ── */
  .overlay-images {
    display: flex; gap: 12px; overflow-x: auto;
    margin-bottom: 36px; padding-bottom: 4px;
    scrollbar-width: thin; scrollbar-color: rgba(0,0,0,.2) transparent;
  }
  .overlay-images::-webkit-scrollbar { height: 4px; }
  .overlay-images::-webkit-scrollbar-thumb { background: rgba(0,0,0,.2); border-radius: 999px; }
  .overlay-img {
    height: 260px; width: auto; flex-shrink: 0;
    border-radius: 10px; object-fit: cover;
    border: 1px solid rgba(0,0,0,.1);
    cursor: zoom-in; transition: opacity .15s;
  }
  .overlay-img:hover { opacity: .88; }

  /* ── Lightbox ── */
  .lightbox {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,.88); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 32px; cursor: zoom-out; animation: fadeIn .15s ease-out;
  }
  .lightbox-img {
    max-width: 100%; max-height: 100%;
    object-fit: contain; border-radius: 8px;
    box-shadow: 0 32px 80px rgba(0,0,0,.5);
  }
`;

// ─── APP ─────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const project = PROJECTS.find(p => p.id === openId) ?? null;

  useEffect(() => { applyTheme(dark); }, [dark]);

  return (
    <>
      <style>{CSS}</style>
      <Nav dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main>
        <HeroSection />
        <Divider from="var(--beige)" to="var(--green)" variant="wave" />
        <AboutSection />
        <Divider from="var(--green)" to="var(--beige)" variant="curve" />
        <WorkSection onOpen={setOpenId} />
        <Divider from="var(--beige)" to="var(--burgundy)" variant="wave" />
        <SkillsSection />
        <Divider from="var(--burgundy)" to="var(--ink)" variant="diagonal" />
        <ExperienceSection />
      </main>
      <ProjectOverlay project={project} onClose={() => setOpenId(null)} />
    </>
  );
}
