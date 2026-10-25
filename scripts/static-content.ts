import { HERO, SIGNAL, NOT_FOUND, WORK_INTRO, PROTOTYPE_PREVIEW, ABOUT_BODY, ABOUT_HEADLINE, ABOUT_EXAMPLES, STATS } from "../data/about.ts";
import { CONTACT } from "../data/contact.ts";
import { FOOTER_NAV_ITEMS, NAV_ITEMS, NAV_MENU, NAV_PROJECT_IDS, PROJECT_NAV_LABELS } from "../data/navigation.ts";
import { EDUCATION, EXPERIENCE } from "../data/education.ts";
import { CAPABILITY_STAGES, SKILL_GROUPS } from "../data/skills.ts";
import { SEO } from "../data/seo.ts";
import { WORK_INDEX, PUBLISHED_WORK, PROTOTYPE_GALLERY } from "../data/workPresentation.ts";
import {
  INDUSTRIES,
  INDUSTRY_COUNT,
  PROJECT_COUNT,
  PROJECTS,
  getProjectMetric,
  type ProjectEvidence,
} from "../data/projects.ts";

const workProjects = ["p1", "p6", "p2", "p3", "p4", "p5"].map(id => PROJECTS.find(project => project.id === id)!);
const indexedProjects = WORK_INDEX.projects.map(entry => ({ ...entry, project: PROJECTS.find(project => project.id === entry.id)! }));
const menuProjects = NAV_PROJECT_IDS.map(id => {
  const project = PROJECTS.find(item => item.id === id)!;
  return { project, title: WORK_INDEX.projects.find(item => item.id === id)?.title ?? project.title };
});

function renderMenuMarkdown(): string {
  return `**Navigation:** ${NAV_ITEMS.map(item => `[${item.label}](${CONTACT.portfolioUrl}/#${item.id})`).join(" · ")}

**${NAV_MENU.allProjects}:**
${menuProjects.map(({ project, title }) => `- [${title}](${CONTACT.portfolioUrl}/#${project.id}) — ${renderEvidence(project.evidence)}`).join("\n")}`;
}

function renderMenuHtml(): string {
  return `        <nav aria-label="${escapeHtml(NAV_MENU.primaryLabel)}">
          ${NAV_ITEMS.map(item => `<a href="#reading-${item.id}">${escapeHtml(item.label)}</a>`).join(" · ")}
        </nav>
        <details>
          <summary>${escapeHtml(NAV_MENU.allProjects)}</summary>
          <ul>
${menuProjects.map(({ project, title }) => `            <li><a href="#reading-${project.id}">${escapeHtml(title)}</a> — ${escapeHtml(renderEvidence(project.evidence))}</li>`).join("\n")}
          </ul>
        </details>`;
}

function renderCollectionsMarkdown(): string {
  return `### ${WORK_INDEX.title}
${WORK_INDEX.description}
${indexedProjects.map(({ project, title }) => `- [${title}](${CONTACT.portfolioUrl}#${project.id}) — ${project.tools.join(" + ")} / ${project.scope}. ${renderEvidence(project.evidence)}`).join("\n")}
${WORK_INDEX.footer}

### ${PUBLISHED_WORK.title}
${PUBLISHED_WORK.description}
${PUBLISHED_WORK.linkLabel}:
${indexedProjects.filter(({ project }) => project.caseStudy).map(({ project, title }) => `- [${title}](${project.caseStudy}) — STX Next case study`).join("\n")}
${PUBLISHED_WORK.contribution} ${PUBLISHED_WORK.context}`;
}

function renderCollectionsHtml(): string {
  return `        <section aria-labelledby="reading-index-title">
          <h3 id="reading-index-title">${escapeHtml(WORK_INDEX.title)}</h3>
          <p>${escapeHtml(WORK_INDEX.description)}</p>
          <ul>${indexedProjects.map(({ project, title }) => `<li><a href="#reading-${project.id}">${escapeHtml(title)}</a> — ${escapeHtml(project.tools.join(" + "))} / ${escapeHtml(project.scope)}. ${escapeHtml(renderEvidence(project.evidence))}</li>`).join("\n")}</ul>
          <p>${escapeHtml(WORK_INDEX.footer)}</p>
        </section>
        <section aria-labelledby="reading-published-title">
          <h3 id="reading-published-title">${escapeHtml(PUBLISHED_WORK.title)}</h3>
          <p>${escapeHtml(PUBLISHED_WORK.description)}</p>
          <p>${escapeHtml(PUBLISHED_WORK.linkLabel)}:</p>
          <ul>${indexedProjects.filter(({ project }) => project.caseStudy).map(({ project, title }) => `<li><a href="${escapeHtml(project.caseStudy!)}">${escapeHtml(title)}</a> — STX Next case study</li>`).join("\n")}</ul>
          <p>${escapeHtml(PUBLISHED_WORK.contribution)} ${escapeHtml(PUBLISHED_WORK.context)}</p>
        </section>`;
}

function galleryChapters(project: (typeof PROJECTS)[number]) {
  return PROTOTYPE_GALLERY.chapters.flatMap(chapter => {
    const image = project.images?.[chapter.imageIndex];
    return image ? [{ ...chapter, image }] : [];
  });
}

function renderGalleryMarkdown(project: (typeof PROJECTS)[number]): string {
  return `\n\n#### ${PROTOTYPE_GALLERY.title}
${PROTOTYPE_GALLERY.description}
${PROTOTYPE_GALLERY.label}. ${project.decisionRecord.boundary}
${galleryChapters(project).map((chapter, index) => `\n**${index + 1}. ${chapter.title}** — ${chapter.topic}\n${chapter.note}\nImage description: ${chapter.image.alt}`).join("\n")}
${PROTOTYPE_GALLERY.credit}
${project.tools.join(" + ")} / ${project.scope} / ${project.timeline}`;
}

function renderGalleryHtml(project: (typeof PROJECTS)[number]): string {
  return `\n          <section aria-labelledby="reading-gallery-title">
            <h4 id="reading-gallery-title">${escapeHtml(PROTOTYPE_GALLERY.title)}</h4>
            <p>${escapeHtml(PROTOTYPE_GALLERY.description)}</p>
            <p>${escapeHtml(PROTOTYPE_GALLERY.label)}. ${escapeHtml(project.decisionRecord.boundary)}</p>
${galleryChapters(project).map((chapter, index) => `            <figure>
              <h5>${index + 1}. ${escapeHtml(chapter.title)}</h5>
              <p>${escapeHtml(chapter.topic)}</p>
              <img src="${escapeHtml(chapter.image.src)}" srcset="${escapeHtml(chapter.image.srcSet)}" sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1280px) 50vw, 600px" width="${chapter.image.width}" height="${chapter.image.height}" loading="lazy" alt="${escapeHtml(chapter.image.alt)}" />
              <figcaption>${escapeHtml(chapter.note)}</figcaption>
            </figure>`).join("\n")}
            <p>${escapeHtml(PROTOTYPE_GALLERY.credit)}</p>
            <p>${escapeHtml(project.tools.join(" + "))} / ${escapeHtml(project.scope)} / ${escapeHtml(project.timeline)}</p>
          </section>`;
}

const industryList = `${INDUSTRIES.slice(0, -1).join(", ")}, and ${INDUSTRIES.at(-1)}`;

function adjacentProjects(project: (typeof PROJECTS)[number]) {
  const index = PROJECTS.findIndex(item => item.id === project.id);
  return {
    previous: PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(index + 1) % PROJECTS.length],
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderStructuredData(): string {
  const personId = `${SEO.canonicalUrl}#person`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SEO.canonicalUrl}#profile`,
        url: SEO.canonicalUrl,
        name: SEO.title,
        description: SEO.description,
        inLanguage: "en",
        mainEntity: { "@id": personId },
        hasPart: PROJECTS.map((project, index) => ({
          "@type": "CreativeWork",
          position: index + 1,
          name: project.title,
          description: project.summary,
          about: project.industry,
          keywords: project.tools,
        })),
      },
      {
        "@type": "Person",
        "@id": personId,
        name: CONTACT.name,
        url: SEO.canonicalUrl,
        jobTitle: CONTACT.role,
        description: CONTACT.tagline,
        email: `mailto:${CONTACT.email}`,
        sameAs: [CONTACT.linkedInUrl],
        homeLocation: {
          "@type": "Place",
          name: CONTACT.location,
        },
        knowsAbout: [
          ...CAPABILITY_STAGES.flatMap(stage => stage.capabilities),
          ...SKILL_GROUPS.flatMap(group => group.items),
        ],
      },
    ],
  };

  return JSON.stringify(data, null, 2).replaceAll("<", "\\u003c");
}

export function renderSeoHead(): string {
  const [firstName, ...lastNameParts] = CONTACT.name.split(" ");
  const lastName = lastNameParts.join(" ");

  return `    <!-- SEO and structured identity generated from data/*.ts. Do not edit directly. -->
    <title>${escapeHtml(SEO.title)}</title>
    <meta name="description" content="${escapeHtml(SEO.description)}" />
    <meta name="author" content="${escapeHtml(CONTACT.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${escapeHtml(SEO.canonicalUrl)}" />
    <link rel="alternate" type="text/markdown" href="/llms.txt" title="${escapeHtml(CONTACT.name)} portfolio in Markdown" />
    <link rel="describedby" type="text/markdown" href="/llms.txt" />

    <!-- Open Graph (WhatsApp, LinkedIn, Slack, iMessage, Discord) -->
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="${escapeHtml(SEO.locale)}" />
    <meta property="og:site_name" content="${escapeHtml(CONTACT.name)}" />
    <meta property="og:title" content="${escapeHtml(SEO.title)}" />
    <meta property="og:description" content="${escapeHtml(SEO.description)}" />
    <meta property="og:url" content="${escapeHtml(SEO.canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(SEO.imageUrl)}" />
    <meta property="og:image:width" content="${SEO.imageWidth}" />
    <meta property="og:image:height" content="${SEO.imageHeight}" />
    <meta property="og:image:alt" content="${escapeHtml(SEO.imageAlt)}" />
    <meta property="profile:first_name" content="${escapeHtml(firstName)}" />
    <meta property="profile:last_name" content="${escapeHtml(lastName)}" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(SEO.title)}" />
    <meta name="twitter:description" content="${escapeHtml(SEO.description)}" />
    <meta name="twitter:image" content="${escapeHtml(SEO.imageUrl)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(SEO.imageAlt)}" />

    <script type="application/ld+json">
${renderStructuredData()}
    </script>
    <!-- /SEO and structured identity -->`;
}

export function renderRobots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SEO.canonicalUrl}sitemap.xml
`;
}

export function renderSitemap(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(SEO.canonicalUrl)}</loc>
  </url>
</urlset>
`;
}

function renderEvidence(evidence: ProjectEvidence): string {
  const metric = getProjectMetric(evidence);

  if (evidence.kind === "convergence") {
    return `${metric.value} — ${metric.label}: ${evidence.sources.join(", ")} into ${evidence.outcome}.`;
  }

  if (evidence.kind === "delta") {
    return `${metric.value} — ${metric.label}.`;
  }

  if (typeof evidence.units !== "number") {
    const note = evidence.illustration ? ` ${evidence.illustration.caption}` : "";
    return `${metric.value} — ${metric.label}: ${evidence.units.join(" and ")}.${note}`;
  }

  return `${metric.value} — ${metric.label}.`;
}

function renderStat(stat: (typeof STATS)[number]): string {
  return `${stat.value} ${stat.label} — ${stat.suffix}`;
}

function renderAboutExample(entry: (typeof ABOUT_EXAMPLES)[number]): string {
  return `${entry.title} ${entry.description}`;
}

function renderProjectMarkdown(project: (typeof PROJECTS)[number]): string {
  const { previous, next } = adjacentProjects(project);
  const caseStudy = project.caseStudy ? `\n\n**Case study:** ${project.caseStudy}` : "";
  const images = project.id === PROTOTYPE_GALLERY.projectId ? renderGalleryMarkdown(project) : project.images?.length
    ? `\n\n**Dashboard views:**\n${project.images.map(image => `- ${image.alt}`).join("\n")}`
    : "";
  const contactHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project inquiry — ${project.title}`)}`;

  return `### Project ${Number(project.n)} — ${project.title}
[${PROJECT_NAV_LABELS.allWork}](${CONTACT.portfolioUrl}#work) · [${PROJECT_NAV_LABELS.previous}: ${previous.title}](${CONTACT.portfolioUrl}#${previous.id}) · [${PROJECT_NAV_LABELS.next}: ${next.title}](${CONTACT.portfolioUrl}#${next.id})

**Client:** ${project.client}
**Industry:** ${project.industry}
**Role:** ${project.role}
**Tools:** ${project.tools.join(", ")}
**Timeline:** ${project.timeline} | ${project.scope}

${project.summary}

${project.description}

**Evidence:** ${renderEvidence(project.evidence)}

**Result:** ${project.decisionRecord.result}

**Source-supported decision path:**
- **Constraint:** ${project.decisionRecord.constraint}
- **Chosen response:** ${project.decisionRecord.decision}
- **How it was checked:** ${project.decisionRecord.validation}
- **Removed from the reconstruction:** ${project.decisionRecord.boundary}

**Responsibilities:**
${project.responsibilities.map(item => `- ${item}`).join("\n")}

**Impact:** ${project.impact}${images}${caseStudy}

**Discuss a similar project:** ${contactHref}`;
}

export function renderLlms(): string {
  return `<!-- Generated by npm run generate:static from data/*.ts. Do not edit directly. -->

# ${CONTACT.name} — ${CONTACT.role}

> ${CONTACT.tagline}

${HERO.body}

**${SIGNAL.eyebrow}:** ${STATS[0].value} ${STATS[0].label}. ${STATS[0].suffix}. ${SIGNAL.caption}

${CONTACT.name} is a ${CONTACT.role} based in ${CONTACT.location}, with a Bachelor's in Informatics Engineering and Digital Business. He specializes in Tableau and Amazon QuickSight and has delivered end-to-end BI work — from KPI definition and data modeling to dashboard design, governance, and adoption — across ${industryList}.

**Portfolio:** ${CONTACT.portfolioUrl}
**Email:** ${CONTACT.email}
**LinkedIn:** ${CONTACT.linkedInUrl}

${renderMenuMarkdown()}

---

## ${PROJECT_COUNT} Projects Across ${INDUSTRY_COUNT} Industries

${WORK_INTRO}

**${PROTOTYPE_PREVIEW.label}:** ${PROTOTYPE_PREVIEW.title}
${PROTOTYPE_PREVIEW.credit}
${PROTOTYPE_PREVIEW.annotation}
${PROTOTYPE_PREVIEW.boundary}

${renderCollectionsMarkdown()}

${workProjects.map(renderProjectMarkdown).join("\n\n---\n\n")}

---

## About Me

### ${ABOUT_HEADLINE}

${ABOUT_BODY.join("\n\n")}

**What that looks like:**
${ABOUT_EXAMPLES.map(entry => `- ${renderAboutExample(entry)}`).join("\n")}

**Career highlights:**
${STATS.map(stat => `- ${renderStat(stat)}`).join("\n")}

---

## Skills

**From business question to trusted decision:**

${CAPABILITY_STAGES.map(stage => `### ${stage.phase} — ${stage.title}
${stage.description}

**Capabilities:** ${stage.capabilities.join(", ")}`).join("\n\n")}

**Technical toolkit:**

${SKILL_GROUPS.map(group => `**${group.label}:** ${group.items.join(", ")}`).join("\n\n")}

---

## Experience

${EXPERIENCE.map(item => `- **${item.role}** at ${item.org} (${item.time}) — ${item.note}`).join("\n")}

---

## Education

${EDUCATION.map(item => `- **${item.title}** — ${item.school}. ${item.note}`).join("\n")}

---

## ${CONTACT.contactEyebrow}

### ${CONTACT.contactHeading}

${CONTACT.contactBody}

**Start with an email:** mailto:${CONTACT.email}
**LinkedIn:** ${CONTACT.linkedInUrl}
**Based in:** ${CONTACT.location}

**${CONTACT.footerEyebrow}:** ${FOOTER_NAV_ITEMS.map(item => `[${item.label}](${CONTACT.portfolioUrl}/#${item.id})`).join(" · ")}

${CONTACT.name} — ${CONTACT.footerRole}
${CONTACT.tagline}

[${CONTACT.backToTopLabel}](${CONTACT.portfolioUrl}/#home)
`;
}

function renderParagraphs(value: string): string {
  return value
    .split("\n\n")
    .map(paragraph => `          <p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
}

function renderProjectHtml(project: (typeof PROJECTS)[number]): string {
  const { previous, next } = adjacentProjects(project);
  const caseStudy = project.caseStudy
    ? `\n          <p>Case study: <a href="${escapeHtml(project.caseStudy)}">${escapeHtml(project.caseStudy)}</a></p>`
    : "";
  const images = project.id === PROTOTYPE_GALLERY.projectId ? renderGalleryHtml(project) : project.images?.length
    ? `\n          <div role="group" aria-label="Dashboard views">\n${project.images.map(image => `            <img src="${escapeHtml(image.src)}" srcset="${escapeHtml(image.srcSet)}" sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1280px) 50vw, 600px" width="${image.width}" height="${image.height}" loading="lazy" alt="${escapeHtml(image.alt)}" />`).join("\n")}\n          </div>`
    : "";
  const contactHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project inquiry — ${project.title}`)}`;

  return `        <article id="reading-${project.id}">
          <h3>Project ${Number(project.n)} / ${escapeHtml(project.title)} — ${escapeHtml(project.client)}</h3>
          <nav aria-label="${escapeHtml(project.title)} navigation">
            <a href="#reading-work">${PROJECT_NAV_LABELS.allWork}</a> · <a href="#reading-${previous.id}" aria-label="${escapeHtml(`${PROJECT_NAV_LABELS.previous} project: ${previous.title}`)}">${PROJECT_NAV_LABELS.previous}</a> · <a href="#reading-${next.id}" aria-label="${escapeHtml(`${PROJECT_NAV_LABELS.next} project: ${next.title}`)}">${PROJECT_NAV_LABELS.next}</a>
          </nav>
          <p>Industry: ${escapeHtml(project.industry)} | Role: ${escapeHtml(project.role)} | Tools: ${escapeHtml(project.tools.join(", "))} | ${escapeHtml(project.timeline)} | ${escapeHtml(project.scope)}</p>
          <p>${escapeHtml(project.summary)}</p>
${renderParagraphs(project.description)}
          <p>Evidence: ${escapeHtml(renderEvidence(project.evidence))}</p>
          <section aria-label="Decision path">
            <h4>Decision path</h4>
            <p>${escapeHtml(project.decisionRecord.result)}</p>
            <dl>
              <dt>Constraint</dt><dd>${escapeHtml(project.decisionRecord.constraint)}</dd>
              <dt>Chosen response</dt><dd>${escapeHtml(project.decisionRecord.decision)}</dd>
              <dt>How it was checked</dt><dd>${escapeHtml(project.decisionRecord.validation)}</dd>
              <dt>Removed from the reconstruction</dt><dd>${escapeHtml(project.decisionRecord.boundary)}</dd>
            </dl>
          </section>
          <h4>Responsibilities</h4>
          <ul>
${project.responsibilities.map(item => `            <li>${escapeHtml(item)}</li>`).join("\n")}
          </ul>
          <p>Impact: ${escapeHtml(project.impact)}</p>${images}${caseStudy}
          <p><a href="${escapeHtml(contactHref)}">Discuss a similar project</a></p>
        </article>`;
}

export function renderNoscript(): string {
  return `    <!-- Structured content generated from data/*.ts for crawlers and non-JavaScript visitors. -->
    <noscript>
      <main>
${renderMenuHtml()}
        <h1 id="reading-home">${escapeHtml(CONTACT.name)} — ${escapeHtml(CONTACT.role)}</h1>
        <p>${escapeHtml(CONTACT.tagline)}</p>
        <p>${escapeHtml(HERO.body)}</p>
        <p>${escapeHtml(SIGNAL.eyebrow)}: ${escapeHtml(renderStat(STATS[0]))}. ${escapeHtml(SIGNAL.caption)}</p>

        <h2 id="reading-work">${PROJECT_COUNT} Projects Across ${INDUSTRY_COUNT} Industries</h2>
        <p>${escapeHtml(WORK_INTRO)}</p>
        <p>${escapeHtml(PROTOTYPE_PREVIEW.label)}: ${escapeHtml(PROTOTYPE_PREVIEW.title)}</p>
        <p>${escapeHtml(PROTOTYPE_PREVIEW.credit)} ${escapeHtml(PROTOTYPE_PREVIEW.annotation)} ${escapeHtml(PROTOTYPE_PREVIEW.boundary)}</p>
${renderCollectionsHtml()}
${workProjects.map(renderProjectHtml).join("\n\n")}

        <p>About Me</p>
        <h2 id="reading-about">${escapeHtml(ABOUT_HEADLINE)}</h2>
${ABOUT_BODY.map(paragraph => `        <p>${escapeHtml(paragraph)}</p>`).join("\n")}
        <h3>What that looks like</h3>
        <ul>
${ABOUT_EXAMPLES.map(entry => `          <li>${escapeHtml(renderAboutExample(entry))}</li>`).join("\n")}
        </ul>
        <h2>Career highlights</h2>
        <ul>
${STATS.map(stat => `          <li>${escapeHtml(renderStat(stat))}</li>`).join("\n")}
        </ul>

        <h2>Skills</h2>
        <p>From business question to trusted decision.</p>
${CAPABILITY_STAGES.map(stage => `        <section>
          <h3>${escapeHtml(stage.phase)} — ${escapeHtml(stage.title)}</h3>
          <p>${escapeHtml(stage.description)}</p>
          <ul>
${stage.capabilities.map(capability => `            <li>${escapeHtml(capability)}</li>`).join("\n")}
          </ul>
        </section>`).join("\n")}
        <h3>Technical toolkit</h3>
        <ul>
${SKILL_GROUPS.map(group => `          <li>${escapeHtml(group.label)}: ${escapeHtml(group.items.join(", "))}</li>`).join("\n")}
        </ul>



        <h2 id="reading-experience">Experience</h2>
        <ul>
${EXPERIENCE.map(item => `          <li>${escapeHtml(item.role)} at ${escapeHtml(item.org)} (${escapeHtml(item.time)}) — ${escapeHtml(item.note)}</li>`).join("\n")}
        </ul>

        <h2>Education</h2>
        <ul>
${EDUCATION.map(item => `          <li>${escapeHtml(item.title)} — ${escapeHtml(item.school)}. ${escapeHtml(item.note)}</li>`).join("\n")}
        </ul>

        <h2 id="reading-contact">${escapeHtml(CONTACT.contactEyebrow)}</h2>
        <h3>${escapeHtml(CONTACT.contactHeading)}</h3>
        <p>${escapeHtml(CONTACT.contactBody)}</p>
        <ul>
          <li>Start with an email: <a href="mailto:${escapeHtml(CONTACT.email)}">${escapeHtml(CONTACT.email)}</a></li>
          <li>LinkedIn: <a href="${escapeHtml(CONTACT.linkedInUrl)}">${escapeHtml(CONTACT.linkedInUrl)}</a></li>
          <li>Portfolio: <a href="${escapeHtml(CONTACT.portfolioUrl)}">${escapeHtml(CONTACT.portfolioUrl)}</a></li>
          <li>Based in: ${escapeHtml(CONTACT.location)}</li>
        </ul>
        <nav aria-label="Footer navigation">
          <h3>${escapeHtml(CONTACT.footerEyebrow)}</h3>
          <ul>
${FOOTER_NAV_ITEMS.map(item => `            <li><a href="#reading-${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join("\n")}
          </ul>
        </nav>
        <p>${escapeHtml(CONTACT.name)} — ${escapeHtml(CONTACT.footerRole)}</p>
        <p>${escapeHtml(CONTACT.tagline)}</p>
        <p><a href="#reading-home">${escapeHtml(CONTACT.backToTopLabel)}</a></p>
      </main>
    </noscript>`;
}

export function renderNotFound(): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Otto Montoya</title><meta name="theme-color" content="#c5d5be"><link rel="stylesheet" href="/theme.css"><script src="/theme-init.js"></script>
<style>@font-face{font-family:DM;src:url('/assets/type/dm-sans-400-normal.woff2')}*{box-sizing:border-box}body{margin:0;background:var(--field);color:var(--on-field);font-family:DM,Arial,sans-serif}main{max-width:1000px;margin:auto;padding:40px 24px 80px}a{color:inherit;text-underline-offset:5px}.code{font-size:clamp(140px,30vw,350px);line-height:1.2;letter-spacing:-.08em}h1{font-size:clamp(32px,5vw,55px);font-weight:400;letter-spacing:-.04em;max-width:18ch}p{font-size:17px;line-height:1.6}.return{display:inline-block;margin-top:24px;padding:15px 24px;border:1px solid;border-radius:999px;text-decoration:none}.return:hover{background:var(--on-field);color:var(--field)}:focus-visible{outline:2px solid;outline-offset:5px}</style></head>
<body><main><a href="/">Otto Montoya</a><div class="code" aria-hidden="true">404</div><h1>${escapeHtml(NOT_FOUND.title)}</h1><p>${escapeHtml(NOT_FOUND.body)}</p><a class="return" href="/">${escapeHtml(NOT_FOUND.action)} ↗</a></main></body></html>`;
}
