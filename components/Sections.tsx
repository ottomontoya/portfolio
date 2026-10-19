import {
  INDUSTRY_COUNT,
  PROJECT_COUNT,
  PROJECTS,
  getProjectMetric,
} from "../data/projects";
import { EDUCATION, EXPERIENCE } from "../data/education";
import { CAPABILITY_STAGES, SKILL_GROUPS } from "../data/skills";
import {
  HERO,
  SIGNAL,
  WORK_INTRO,
  PROTOTYPE_PREVIEW,
  STATS,
  ABOUT_BODY,
  ABOUT_EMPHASIS,
  ABOUT_HEADLINE,
  ABOUT_EXAMPLES,
} from "../data/about";
import { CONTACT } from "../data/contact";
import { CopyEmailButton, Eyebrow } from "./ui";
import { AccessField, EvidenceGraphic } from "./Evidence";

export function HeroSection({ onOpen }: { onOpen: (id: string) => void }) {
  const governance = PROJECTS.find((project) => project.id === "p1")!;
  return (
    <section id="home" className="room room-hero" aria-labelledby="home-title">
      <div className="shell hero-shell">
        <div className="hero-topline">
          <span>Data Analyst / BI</span>
          <span>{CONTACT.location}</span>
        </div>
        <div className="hero-composition">
          <div className="hero-cover">
            <h1 className="h1" id="home-title">
              <span>{HERO.lineOne}</span>
              <span>{HERO.lineTwo}</span>
            </h1>
            <p className="lead">{HERO.body}</p>
            <div className="cta-row">
              <a className="cta cta-primary" href="#work">
                View work{" "}
                <span className="arr action-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a className="hero-email" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
          </div>
          <div className="hero-signal">
            <div className="signal-label mono">{SIGNAL.eyebrow}</div>
            {governance.evidence.kind === "delta" && (
              <AccessField evidence={governance.evidence} animate showCaption={false} />
            )}
            <div className="signal-context">
              <p>{SIGNAL.caption}</p>
            </div>
            <button
              className="signal-case-link"
              id="hero-project-trigger-p1"
              onClick={() => onOpen("p1")}
              aria-haspopup="dialog"
            >
              {SIGNAL.action}
              <span className="action-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <ul className="evidence-band" aria-label="Career highlights">
          {STATS.slice(1).map((stat) => (
            <li className="evidence-cell" key={stat.label}>
              <div className="evidence-fig">{stat.value}</div>
              <div>
                <div className="evidence-name">{stat.label}</div>
                <div className="evidence-note">{stat.suffix}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutSection() {
  const [headlineStart, headlineEnd] = ABOUT_HEADLINE.split(ABOUT_EMPHASIS);
  return (
    <section
      id="about"
      className="room room-about"
      aria-labelledby="about-title"
    >
      <div className="shell about-grid">
        <div className="about-heading">
          <Eyebrow>About Me</Eyebrow>
          <h2 className="h2" id="about-title">
            {headlineStart}
            <em>{ABOUT_EMPHASIS}</em>
            {headlineEnd}
          </h2>
        </div>
        <div className="about-story">
          <div className="about-body">
            {ABOUT_BODY.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h3 className="side-h">What that looks like</h3>
          <ul className="about-examples">
            {ABOUT_EXAMPLES.map((entry) => (
              <li key={entry.title}>
                <h4>{entry.title}</h4>
                <p>{entry.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WorkSection({ onOpen }: { onOpen: (id: string) => void }) {
  const governance = PROJECTS.find((project) => project.id === "p1")!;
  const preview = PROJECTS.find((project) => project.id === "p6")!.images![3];
  return (
    <section id="work" className="room room-work" aria-labelledby="work-title">
      <div className="shell">
        <div className="work-head">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="h2" id="work-title">
              {PROJECT_COUNT} projects.
              <br />
              <span>{INDUSTRY_COUNT} industries.</span>
            </h2>
          </div>
          <p className="lead">{WORK_INTRO}</p>
        </div>
        <article
          className="governance-feature"
          aria-labelledby="flagship-title"
        >
          <div className="case-index mono">01 / Governance · Tableau</div>
          <div>
            <h3 id="flagship-title">{governance.title}</h3>
            <p>{governance.decisionRecord.constraint}</p>
          </div>
          <div className="governance-outcome">
            <p>{governance.decisionRecord.result}</p>
            <button
              className="text-link"
              id="project-trigger-p1"
              onClick={() => onOpen("p1")}
              aria-haspopup="dialog"
            >
              Read the governance case <span className="action-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </article>
        <article
          className="prototype-feature"
          aria-labelledby="prototype-title"
        >
          <div className="prototype-heading">
            <div>
              <div className="case-index mono">
                06 / {PROTOTYPE_PREVIEW.label}
              </div>
              <h3 id="prototype-title">{PROTOTYPE_PREVIEW.title}</h3>
            </div>
            <p>{PROTOTYPE_PREVIEW.credit}</p>
          </div>
          <button
            className="prototype-preview"
            id="project-trigger-p6"
            onClick={() => onOpen("p6")}
            aria-haspopup="dialog"
            aria-label="Explore the prototype in QuickSight"
          >
            <img
              src={preview.src}
              srcSet={preview.srcSet}
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1500px) 90vw, 1320px"
              width={preview.width}
              height={preview.height}
              alt={preview.alt}
              loading="lazy"
            />
            <span className="prototype-open">
              Explore the prototype <span className="action-arrow" aria-hidden="true">↗</span>
            </span>
          </button>
          <div className="prototype-caption">
            <p>{PROTOTYPE_PREVIEW.annotation}</p>
            <span>{PROTOTYPE_PREVIEW.boundary}</span>
          </div>
        </article>
        <div className="work-grid">
          {PROJECTS.filter((p) => p.id !== "p1" && p.id !== "p6").map((p) => {
            const metric = getProjectMetric(p.evidence);
            return (
              <article
                key={p.id}
                className={`work-study work-study-${p.id}`}
                aria-labelledby={`study-title-${p.id}`}
              >
                <div className="study-top">
                  <span className="case-index mono">
                    {p.n} / {p.industry}
                  </span>
                  <span className="study-platform">{p.tools[0]}</span>
                </div>
                <div className="study-graphic">
                  <EvidenceGraphic evidence={p.evidence} />
                </div>
                <h3 id={`study-title-${p.id}`}>{p.title}</h3>
                <div className="study-meta">
                  {p.client} · {p.role}
                </div>
                <p className="study-summary">{p.summary}</p>
                <div className="study-bottom">
                  <span className="study-metric">
                    {metric.value}
                    <small>{metric.label}</small>
                  </span>
                  <button
                    className="text-link"
                    id={`project-trigger-${p.id}`}
                    onClick={() => onOpen(p.id)}
                    aria-haspopup="dialog"
                    aria-label={`View project: ${p.title}`}
                  >
                    View project <span className="action-arrow" aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="room room-skills"
      aria-labelledby="skills-title"
    >
      <div className="shell">
        <Eyebrow>Skills</Eyebrow>
        <div className="skills-head">
          <h2 className="h2" id="skills-title">
            From business question <em>to trusted decision.</em>
          </h2>
          <div className="skills-promise">
            <div className="skills-promise-label mono">
              End-to-end ownership
            </div>
            <p>
              I connect the conversation, the model, and the interface—not just
              the final chart.
            </p>
          </div>
        </div>

        <ol className="capability-path" aria-label="End-to-end BI capabilities">
          {CAPABILITY_STAGES.map((stage) => (
            <li className="capability-stage" key={stage.phase}>
              <div className="capability-step">
                {stage.phase}
              </div>
              <div className="capability-heading">
                <h3>{stage.title}</h3>
              </div>
              <div className="capability-detail">
                <p>{stage.description}</p>
                <ul aria-label={`${stage.phase} capabilities`}>
                  {stage.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <section className="toolkit" aria-labelledby="toolkit-title">
          <div className="toolkit-head">
            <h3 className="side-h" id="toolkit-title">
              Technical toolkit
            </h3>
            <p>
              Platforms and tools I use to carry that work from source to
              delivery.
            </p>
          </div>
          <div className="skills-grid">
            {SKILL_GROUPS.map((g) => (
              <div className="skill-col" key={g.label}>
                <div className="skill-col-head">
                  <h3 className="skill-h mono">{g.label}</h3>
                </div>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
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
  return (
    <section
      id="experience"
      className="room room-exp"
      aria-labelledby="experience-title"
    >
      <div className="shell experience-shell">
        <div className="experience-intro">
          <Eyebrow>Experience</Eyebrow>
          <h2 className="h2" id="experience-title">
            A path through <em>data, dashboards & teams.</em>
          </h2>
        </div>
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
        <section
          className="experience-education"
          aria-labelledby="education-title"
        >
          <div className="experience-education-head">
            <h3 className="side-h" id="education-title">
              Education & certifications
            </h3>
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
      </div>
    </section>
  );
}

// A decorative echo of the governance dot field, not an evidence count.
const CONTACT_ARROW_DOTS = [
  [18, 8], [28, 8], [38, 8], [48, 8], [58, 8],
  [58, 18], [58, 28], [58, 38], [58, 48],
  [48, 18], [38, 28], [28, 38], [18, 48], [8, 58],
];

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-title">
      <div className="shell footer-shell">
        <div className="contact-composition">
          <p className="contact-kicker">{CONTACT.contactEyebrow}</p>
          <h2 className="contact-title" id="contact-title">
            {CONTACT.contactHeadingLines.map((line, i) => (
              <span key={line}>{line}{i === 0 ? " " : ""}</span>
            ))}
          </h2>
          <a
            href={`mailto:${CONTACT.email}`}
            className="contact-send"
            aria-label={`${CONTACT.emailAction}: ${CONTACT.email}`}
          >
            <span className="contact-send-disc">
              <svg viewBox="0 0 66 66" aria-hidden="true" className="contact-send-arrow">
                <g className="contact-arrow-dots" fill="currentColor">
                  {CONTACT_ARROW_DOTS.map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.8" />
                  ))}
                </g>
                <path className="contact-arrow-line" d="M9 57 57 9M15 9h42v42" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
            <span className="contact-send-label">{CONTACT.emailAction}</span>
          </a>
        </div>
        <div className="contact-details">
          <div className="contact-email-group">
            <a href={`mailto:${CONTACT.email}`} className="contact-email-address">
              {CONTACT.email}
            </a>
            <CopyEmailButton
              email={CONTACT.email}
              label={CONTACT.copyEmailLabel}
              successMessage={CONTACT.copyEmailSuccess}
              errorMessage={CONTACT.copyEmailError}
            />
          </div>
          <p className="contact-sub">{CONTACT.contactBody}</p>
        </div>
        <div className="footer-colophon">
          <span className="footer-credit">© 2026 {CONTACT.name}</span>
          <span className="footer-location">{CONTACT.location}</span>
          <a href={CONTACT.linkedInUrl} target="_blank" rel="noopener noreferrer">
            {CONTACT.linkedInLabel}
            <span className="action-arrow" aria-hidden="true">↗</span>
          </a>
          <a href="#home">
            {CONTACT.backToTopLabel}
            <span className="action-arrow contact-top-arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
