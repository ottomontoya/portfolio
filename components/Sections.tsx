import { useEffect, useState } from "react";
import { INDUSTRY_COUNT, PROJECT_COUNT, PROJECTS, getProjectMetric } from "../data/projects";
import { EDUCATION, EXPERIENCE } from "../data/education";
import { ABOUT_TAGS, CAPABILITY_STAGES, SKILL_GROUPS } from "../data/skills";
import { STATS, ABOUT_BODY, HOW_I_WORK } from "../data/about";
import { CONTACT } from "../data/contact";
import { Eyebrow, Pill } from "./ui";
import { ProjectChart } from "./Charts";

function useWideEvidenceMarks() {
  const [show, setShow] = useState(() => window.matchMedia("(min-width: 861px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 861px)");
    const sync = () => setShow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return show;
}

export function HeroSection() {
  return (
    <section id="home" className="room room-hero" aria-labelledby="home-title">
      <div className="shell">
        <Eyebrow dot>Data Analyst · BI Specialist</Eyebrow>
        <h1 className="h1" id="home-title">
          Clear insights<br />from <em>complex</em> data.
        </h1>
        <p className="lead">
          I work end-to-end across the BI stack — from understanding the question, to defining KPIs, to shipping dashboards teams actually use.
        </p>
        <div className="cta-row">
          <a className="cta cta-primary" href="#work">View work <span className="arr">→</span></a>
          <a className="cta cta-ghost" href="#about">About me</a>
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
    <section id="about" className="room room-about" aria-labelledby="about-title">
      <div className="shell">
        <Eyebrow dot>About</Eyebrow>
        <h2 className="h2" id="about-title">I turn messy data <em>into reliable insights.</em></h2>
        <div className="about-grid">
          <div className="about-body">
            {ABOUT_BODY.map((p, i) => <p key={i}>{p}</p>)}
            <div className="tags">
              {ABOUT_TAGS.map(t => <Pill key={t}>{t}</Pill>)}
            </div>
          </div>
          <div className="about-side">
            <h3 className="side-h">How I work</h3>
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
  const showEvidenceMarks = useWideEvidenceMarks();

  return (
    <section id="work" className="room room-work" aria-labelledby="work-title">
      <div className="shell">
        <Eyebrow dot>Selected work</Eyebrow>
        <div className="work-head">
          <h2 className="h2 h2-work" id="work-title">{PROJECT_COUNT} projects, <em>{INDUSTRY_COUNT} industries.</em></h2>
          <p className="lead lead-work">From access governance to legacy migrations — each one ended with a dashboard people actually used.</p>
        </div>
        <ul className="projects">
          {PROJECTS.map((p) => {
            const metric = getProjectMetric(p.evidence);
            return (
              <li key={p.id} className="project">
                <button
                  type="button"
                  id={`project-trigger-${p.id}`}
                  className="project-trigger"
                  onClick={() => onOpen(p.id)}
                  aria-haspopup="dialog"
                  aria-label={`Open project details for ${p.title}`}
                />
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
                    <div className="proj-mv">{metric.value}</div>
                    <div className="proj-ml mono">{metric.label}</div>
                  </div>
                  {showEvidenceMarks && <ProjectChart evidence={p.evidence} color="currentColor" />}
                </div>
                <div className="proj-affordance" aria-hidden="true">
                  View project <span>→</span>
                </div>
                <div className="proj-arr" aria-hidden="true">→</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="room room-skills" aria-labelledby="skills-title">
      <div className="shell">
        <Eyebrow dot>Skills</Eyebrow>
        <div className="skills-head">
          <h2 className="h2" id="skills-title">From business question <em>to trusted decision.</em></h2>
          <div className="skills-promise">
            <div className="skills-promise-label mono">End-to-end ownership</div>
            <p>I connect the conversation, the model, and the interface—not just the final chart.</p>
          </div>
        </div>

        <ol className="capability-path" aria-label="End-to-end BI capabilities">
          {CAPABILITY_STAGES.map((stage, index) => (
            <li className="capability-stage" key={stage.phase}>
              <div className="capability-step mono" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
              <div className="capability-heading">
                <div className="capability-phase mono">{stage.phase}</div>
                <h3>{stage.title}</h3>
              </div>
              <div className="capability-detail">
                <p>{stage.description}</p>
                <ul aria-label={`${stage.phase} capabilities`}>
                  {stage.capabilities.map(capability => <li key={capability}>{capability}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <section className="toolkit" aria-labelledby="toolkit-title">
          <div className="toolkit-head">
            <h3 className="side-h" id="toolkit-title">Technical toolkit</h3>
            <p>Platforms and tools I use to carry that work from source to delivery.</p>
          </div>
          <div className="skills-grid">
            {SKILL_GROUPS.map(g => (
              <div className="skill-col" key={g.label}>
                <div className="skill-col-head">
                  <h3 className="skill-h mono">{g.label}</h3>
                </div>
                <ul>
                  {g.items.map(it => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const [contactHeadingStart, contactHeadingEnd] = CONTACT.contactHeading.split(CONTACT.contactEmphasis);

  return (
    <section id="experience" className="room room-exp" aria-labelledby="experience-title">
      <div className="shell experience-shell">
        <Eyebrow dot>Experience</Eyebrow>
        <h2 className="h2" id="experience-title">A path through <em>data, dashboards & teams.</em></h2>
        <ol className="timeline">
          {EXPERIENCE.map((e, i) => (
            <li className="tl-item" key={i}>
              <div className="tl-time mono">{e.time}</div>
              <div className="tl-body">
                <h3 className="tl-role">{e.role}</h3>
                <div className="tl-org mono">{e.org}</div>
                <div className="tl-note">{e.note}</div>
              </div>
            </li>
          ))}
        </ol>
        <section className="experience-education" aria-labelledby="education-title">
          <div className="experience-education-head">
            <h3 className="side-h" id="education-title">Education & certifications</h3>
            <p>Formal foundations that support the work.</p>
          </div>
          <ul className="edu-list">
            {EDUCATION.map((e) => (
              <li key={e.title}>
                <h4 className="edu-title">{e.title}</h4>
                <div className="edu-school mono">{e.school}</div>
                <div className="edu-note">{e.note}</div>
              </li>
            ))}
          </ul>
        </section>
        <section id="contact" className="contact-block" aria-labelledby="contact-title">
          <div className="contact-intro">
            <Eyebrow dot>{CONTACT.contactEyebrow}</Eyebrow>
            <h3 className="contact-title" id="contact-title">
              {contactHeadingStart}<em>{CONTACT.contactEmphasis}</em>{contactHeadingEnd}
            </h3>
            <p className="contact-sub">{CONTACT.contactBody}</p>
          </div>
          <div className="contact-actions">
            <a href={`mailto:${CONTACT.email}`} className="contact-email-cta">
              <span className="contact-email-label mono">Start with an email</span>
              <span className="contact-email-address">{CONTACT.email}</span>
              <span className="contact-email-arrow" aria-hidden="true">→</span>
            </a>
            <ul className="contact-r">
              <li>
                <span className="mono">LinkedIn</span>
                <a href={CONTACT.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  Connect with Otto <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li><span className="mono">Based in</span><span>{CONTACT.location}</span></li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer room-exp">
      <div className="shell footer-shell">
        <div className="foot mono">
          <span>© 2026 Otto Montoya</span>
          <span>Made with care · Mérida, MX</span>
        </div>
      </div>
    </footer>
  );
}
