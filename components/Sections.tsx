import { PROJECTS } from "../data/projects";
import { EDUCATION, EXPERIENCE } from "../data/education";
import { SKILL_GROUPS, SOFT_SKILLS, ABOUT_TAGS } from "../data/skills";
import { STATS, ABOUT_BODY, HOW_I_WORK } from "../data/about";
import { Eyebrow, Pill } from "./ui";
import { ProjectChart } from "./Charts";
import { scrollTo } from "./Nav";

export function HeroSection() {
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

export function AboutSection() {
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

export function WorkSection({ onOpen }: { onOpen: (id: string) => void }) {
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

export function SkillsSection() {
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

export function ExperienceSection() {
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
