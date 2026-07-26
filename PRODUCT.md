# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: hiring managers and technical recruiters** evaluating Otto Montoya for a full-time Data Analyst / BI role. They arrive from a LinkedIn profile, an application, or a direct link, usually skimming under time pressure and often alongside other candidates. Their job is to decide within a minute or two whether this person is worth an interview — and then to find enough concrete evidence (scale, tools, ownership, outcomes) to justify that decision to someone else.

**Secondary: prospective clients** — companies or agencies looking to contract BI, dashboard, or governance work. Same evidence, different decision: whether to open a project conversation. The site is written employer-first; client inquiries are welcome, not the design target.

## Product Purpose

A personal portfolio site (ottomontoya.com) that converts a skim into a conversation. It exists because a résumé cannot show the shape of the work — the scale of the environments, the reasoning behind a governance model, or the craft in a dashboard. Success is a hiring manager reaching out to `work@ottomontoya.com` or on LinkedIn, having already understood what Otto owns end-to-end and at what scale.

## Positioning

**End-to-end BI ownership joined to real dashboard design craft.** Otto is not a ticket-taking dashboard builder and not a data engineer who happens to publish charts. He takes work from the business question through KPI definition, data modeling, governance, dashboard implementation, documentation, and adoption — and he cares about the design of what lands on screen, translating design intent and cognitive-UI principles into native Tableau and QuickSight at production scale.

The hybrid is the differentiator. Analysts who own the full chain rarely make the output look considered; people who make it look considered rarely own the model, the access rules, and the rollout underneath it.

## Operating Context

- Consulting-style client delivery at STX Next: multiple clients, multiple industries, engagements ranging from 3 weeks to ~12 months.
- Requirements gathered through working sessions, daily syncs, and weekly client review cycles rather than handed-down specs.
- Work frequently starts from someone else's artifact: sketch-based designs, production mockups from a design team, or an existing Salesforce report used only as a KPI reference.
- Delivery does not end at the dashboard: specification documents for data engineering, validation against source systems before handoff, how-to guides, live demos, and training for adoption.
- Native-tool constraint is a recurring theme — the deliverable has to work inside Tableau or QuickSight's real component set, not a bespoke frontend.

## Capabilities and Constraints

**Site is:** a single-page React + Vite + TypeScript site with Framer Motion, five sections (Hero, About, Work, Skills, Experience) with a contact block, a light/dark toggle, and a project detail overlay opened from the Work grid. Six projects (`p1`–`p6`) carry summary, client, industry, role, tools, scope, timeline, typed evidence shared by the headline metric and chart, description, responsibilities, impact, optional images, and optional case-study link.

**Content lives in `data/`** (`projects.ts`, `about.ts`, `skills.ts`, `education.ts`) — copy is data, not markup.

**Hard constraints:**
- **Client anonymity.** Clients are described generically ("Global Cybersecurity Platform", "Leading German Automotive Manufacturer", "Major Open Source Software Foundation"). No real client names, no logos, ever. Only the two published STX Next case-study URLs may be linked.
- **Crawler and AI parity.** `public/llms.txt` and the `<noscript>` block in `index.html` mirror on-page content for AI systems and non-JS crawlers. Any content change must be reflected in both.

**Currently true, not locked:** contact runs through `work@ottomontoya.com` and LinkedIn only — there is no CV/résumé download and no contact form. English only. Whether to add a downloadable CV is undecided.

## Brand Commitments

- Name and domain: Otto Montoya, ottomontoya.com. Tagline in use: "Clear insights from complex data. End-to-end across the BI stack."
- Existing assets in `public/assets/`: `logo.svg` / `logo-light.svg`, full favicon set, `og-image.png` (1200×630). Theme color `#2d4a32`.
- Voice in the incumbent copy: first person, specific, plain-spoken, quantified. No hype adjectives, no "passionate about data." Claims are stated with their qualifiers intact (`~15`, `~70%`, `2,000+`).

## Evidence on Hand

Real, verified figures from delivered work, already published on the site:
- 696 → 12 access paths consolidated across ~1,500 users (Tableau RLS redesign), 100% of identified PII-exposed data sources retired, ~70% reduction in admin workload.
- ~15 dashboards built from sketch-based designs for a global automotive manufacturer.
- Three QuickSight dashboards unifying CRM, web analytics, and GitHub community activity for an open-source foundation's Salesforce migration.
- Two connected delivery tracks for an energy company: scheduled revenue reporting in QuickSight and workflow applications in Retool.
- Five reporting time grains (daily, weekly, monthly, quarterly, yearly) unified in one flexible QuickSight dashboard set.
- Four-view real-time manufacturing analytics suite covering a 2,000+ asset rotating equipment fleet.
- 6 industries served (cybersecurity, automotive, non-profit, energy, SaaS, manufacturing); 3+ years end-to-end BI.
- Two public case studies: `stxnext.com/case-study/market-research-platform`, `stxnext.com/case-study/salesforce-optimization`.
- Education: MIT Schwarzman College of Computing (Data Science and Machine Learning), Universidad Austral (Python Data Structures), Universidad Anáhuac Mayab (BSc Informatics Engineering & Digital Business).

**Screenshots of client dashboards do not exist and cannot be created** — client anonymity forbids it. The only project imagery in the repo is four abstract WebP images under `public/assets/projects/p6/`. Work-section visuals are generated charts, not real dashboard captures. Do not fabricate dashboard screenshots, client logos, testimonials, or metrics that are not listed above.

## Product Principles

1. **Evidence over adjectives.** Every claim on this site is attached to a number, a scope, or a named tool. If a statement can't be backed, it doesn't ship.
2. **Show the whole chain, not the last step.** The work is discovery → KPI → model → governance → dashboard → documentation → adoption. Surfacing only the dashboard undersells the position.
3. **Skimmable in a minute, deep on demand.** A recruiter must get scale and range from the first viewport; the project overlay is where the reasoning lives for anyone who wants it.
4. **Anonymity is not vagueness.** Clients stay unnamed, but the problem, scale, and outcome stay concrete.
5. **Craft is the argument.** For someone claiming dashboard design ability, the portfolio itself is the primary work sample — sloppy execution refutes the positioning.

## Accessibility & Inclusion

No product-specific standard was established. Baseline: content must remain readable without JavaScript (the `<noscript>` record is a committed part of the site), and the light/dark toggle must keep contrast intact in both themes.
