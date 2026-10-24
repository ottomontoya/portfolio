import {
  INDUSTRY_COUNT,
  PROJECT_COUNT,
  PROJECTS,
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
import { Eyebrow } from "./ui";
import { AccessField } from "./Evidence";
import { WorkCollections } from "./WorkCollections";
import { LiquidArrowButton } from "./LiquidArrowButton";

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
              <LiquidArrowButton href="#work" label="View work" tone="field" />
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
            <LiquidArrowButton
              className="signal-case-action"
              id="hero-project-trigger-p1"
              onClick={() => onOpen("p1")}
              aria-haspopup="dialog"
              label={SIGNAL.action}
              tone="field"
            />
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
            <LiquidArrowButton
              id="project-trigger-p1"
              onClick={() => onOpen("p1")}
              aria-haspopup="dialog"
              label="Read the governance case"
            />
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
        <WorkCollections onOpen={onOpen} />
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

export { SiteFooter } from "./SiteFooter";
