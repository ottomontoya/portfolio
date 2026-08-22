import { ABOUT_BODY, ABOUT_HEADLINE, ABOUT_LEDGER, HANDOVER, STATS } from "../data/about.ts";
import { CONTACT } from "../data/contact.ts";
import { EDUCATION, EXPERIENCE } from "../data/education.ts";
import { CAPABILITY_STAGES, SKILL_GROUPS } from "../data/skills.ts";
import { SEO } from "../data/seo.ts";
import {
  INDUSTRIES,
  INDUSTRY_COUNT,
  PROJECT_COUNT,
  PROJECTS,
  getProjectMetric,
  type ProjectEvidence,
} from "../data/projects.ts";

const industryList = `${INDUSTRIES.slice(0, -1).join(", ")}, and ${INDUSTRIES.at(-1)}`;

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
    return `${metric.value} — ${metric.label}: ${evidence.units.join(" and ")}.`;
  }

  return `${metric.value} — ${metric.label}.`;
}

function renderStat(stat: (typeof STATS)[number]): string {
  return `${stat.value} ${stat.label} — ${stat.suffix}`;
}

function renderLedgerEntry(entry: (typeof ABOUT_LEDGER)[number]): string {
  return `${entry.value} ${entry.label} — ${entry.note}`;
}

function renderProjectMarkdown(project: (typeof PROJECTS)[number]): string {
  const caseStudy = project.caseStudy ? `\n\n**Case study:** ${project.caseStudy}` : "";
  const images = project.images?.length
    ? `\n\n**Dashboard views:**\n${project.images.map(image => `- ${image.alt}`).join("\n")}`
    : "";
  const contactHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project inquiry — ${project.title}`)}`;

  return `### Project ${project.n} — ${project.title}
**Client:** ${project.client}
**Industry:** ${project.industry}
**Role:** ${project.role}
**Tools:** ${project.tools.join(", ")}
**Timeline:** ${project.timeline} | ${project.scope}

${project.summary}

${project.description}

**Evidence:** ${renderEvidence(project.evidence)}

**Responsibilities:**
${project.responsibilities.map(item => `- ${item}`).join("\n")}

**Impact:** ${project.impact}${images}${caseStudy}

**Discuss a similar project:** ${contactHref}`;
}

export function renderLlms(): string {
  return `<!-- Generated by npm run generate:static from data/*.ts. Do not edit directly. -->

# ${CONTACT.name} — ${CONTACT.role}

> ${CONTACT.tagline}

${CONTACT.name} is a ${CONTACT.role} based in ${CONTACT.location}, with a Bachelor's in Informatics Engineering and Digital Business. He specializes in Tableau and Amazon QuickSight and has delivered end-to-end BI work — from KPI definition and data modeling to dashboard design, governance, and adoption — across ${industryList}.

**Portfolio:** ${CONTACT.portfolioUrl}
**Email:** ${CONTACT.email}
**LinkedIn:** ${CONTACT.linkedInUrl}

---

## About

### ${ABOUT_HEADLINE}

${ABOUT_BODY.join("\n\n")}

**On record:**
${ABOUT_LEDGER.map(entry => `- ${renderLedgerEntry(entry)}`).join("\n")}

**What I hand over:**
${HANDOVER.map(item => `- ${item}`).join("\n")}

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

## ${PROJECT_COUNT} Projects Across ${INDUSTRY_COUNT} Industries

${PROJECTS.map(renderProjectMarkdown).join("\n\n---\n\n")}

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
`;
}

function renderParagraphs(value: string): string {
  return value
    .split("\n\n")
    .map(paragraph => `          <p>${escapeHtml(paragraph)}</p>`)
    .join("\n");
}

function renderProjectHtml(project: (typeof PROJECTS)[number]): string {
  const caseStudy = project.caseStudy
    ? `\n          <p>Case study: <a href="${escapeHtml(project.caseStudy)}">${escapeHtml(project.caseStudy)}</a></p>`
    : "";
  const images = project.images?.length
    ? `\n          <div role="group" aria-label="Dashboard views">\n${project.images.map(image => `            <img src="${escapeHtml(image.src)}" srcset="${escapeHtml(image.srcSet)}" sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1280px) 50vw, 600px" width="${image.width}" height="${image.height}" loading="lazy" alt="${escapeHtml(image.alt)}" />`).join("\n")}\n          </div>`
    : "";
  const contactHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project inquiry — ${project.title}`)}`;

  return `        <article>
          <h3>${escapeHtml(project.title)} — ${escapeHtml(project.client)}</h3>
          <p>Industry: ${escapeHtml(project.industry)} | Role: ${escapeHtml(project.role)} | Tools: ${escapeHtml(project.tools.join(", "))} | ${escapeHtml(project.timeline)} | ${escapeHtml(project.scope)}</p>
          <p>${escapeHtml(project.summary)}</p>
${renderParagraphs(project.description)}
          <p>Evidence: ${escapeHtml(renderEvidence(project.evidence))}</p>
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
        <h1>${escapeHtml(CONTACT.name)} — ${escapeHtml(CONTACT.role)}</h1>
        <p>${escapeHtml(CONTACT.tagline)}</p>

        <h2>${escapeHtml(ABOUT_HEADLINE)}</h2>
${ABOUT_BODY.map(paragraph => `        <p>${escapeHtml(paragraph)}</p>`).join("\n")}
        <h3>On record</h3>
        <ul>
${ABOUT_LEDGER.map(entry => `          <li>${escapeHtml(renderLedgerEntry(entry))}</li>`).join("\n")}
        </ul>
        <h3>What I hand over</h3>
        <ul>
${HANDOVER.map(item => `          <li>${escapeHtml(item)}</li>`).join("\n")}
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

        <h2>${PROJECT_COUNT} Projects Across ${INDUSTRY_COUNT} Industries</h2>
${PROJECTS.map(renderProjectHtml).join("\n\n")}

        <h2>Experience</h2>
        <ul>
${EXPERIENCE.map(item => `          <li>${escapeHtml(item.role)} at ${escapeHtml(item.org)} (${escapeHtml(item.time)}) — ${escapeHtml(item.note)}</li>`).join("\n")}
        </ul>

        <h2>Education</h2>
        <ul>
${EDUCATION.map(item => `          <li>${escapeHtml(item.title)} — ${escapeHtml(item.school)}. ${escapeHtml(item.note)}</li>`).join("\n")}
        </ul>

        <h2>${escapeHtml(CONTACT.contactEyebrow)}</h2>
        <h3>${escapeHtml(CONTACT.contactHeading)}</h3>
        <p>${escapeHtml(CONTACT.contactBody)}</p>
        <ul>
          <li>Start with an email: <a href="mailto:${escapeHtml(CONTACT.email)}">${escapeHtml(CONTACT.email)}</a></li>
          <li>LinkedIn: <a href="${escapeHtml(CONTACT.linkedInUrl)}">${escapeHtml(CONTACT.linkedInUrl)}</a></li>
          <li>Portfolio: <a href="${escapeHtml(CONTACT.portfolioUrl)}">${escapeHtml(CONTACT.portfolioUrl)}</a></li>
          <li>Based in: ${escapeHtml(CONTACT.location)}</li>
        </ul>
      </main>
    </noscript>`;
}
