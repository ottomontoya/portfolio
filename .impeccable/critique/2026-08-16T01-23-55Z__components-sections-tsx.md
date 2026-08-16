---
target: the about section
total_score: 19
max_score: 28
na_heuristics: 5,9,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-16T01-23-55Z
slug: components-sections-tsx
---
Method: dual-agent (A: design review, isolated tab · B: detector + measured browser evidence, isolated tab). Dev server on :5174 started for this critique and stopped; :5173 pre-existing and untouched.

# Critique — The About Section

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Wall color + active nav pill locate you well; nothing signals the room runs 1.73 viewports on mobile |
| 2 | Match System / Real World | 3 | Language is true and unhyped, but "Analytics engineering" as a bare pill outruns any evidence in the room |
| 3 | User Control and Freedom | 3 | Zero focusable elements — the room is a dead end at the moment interest peaks |
| 4 | Consistency and Standards | 3 | System obeyed visually, but `.how-n` breaks the AA rule DESIGN.md claims for dark labels; "How I work" is `h3` live and `h2` in `<noscript>` |
| 5 | Error Prevention | n/a | No input, no state, no destructive path |
| 6 | Recognition Rather Than Recall | 2 | "The projects here span…" forward-references unseen content with no link; the 6-industry list is prose-repeated from the hero band |
| 7 | Flexibility and Efficiency | 2 | Applies here. One reading mode only — three paragraphs. No skim layer, no depth layer. Contradicts "skimmable in a minute, deep on demand" |
| 8 | Aesthetic and Minimalist Design | 3 | Beautiful, but tipped into under-designed: the heaviest element after the headline (5 pills) carries the least information |
| 9 | Error Recovery | n/a | No reachable error states in static prose |
| 10 | Help and Documentation | n/a | Experience/Persuade surface with no task to document |
| **Total** | | **19/28** | **Acceptable (68%)** |

Heuristics 5, 9, 10 scored n/a. Consistency moved from A's 4 down to 3 on B's measured evidence — the room looks system-perfect and isn't.

## Design Specificity Verdict

**LLM assessment.** The wall and the headline are authored. Everything below them is portable. Swap test on paragraph 1: "I'm a [role] with a Bachelor's in [degree]. From understanding business questions and defining KPIs, to designing dashboards…" — change four nouns and it ships on any analyst's portfolio. The five tag pills are the most generic construction on the site: bare adjective-nouns with no referent.

Composition is defaulted rather than designed. At 1440 the headline occupies 629px of an 1176px shell and stops, leaving the top-right band empty; the right column's content ends 122px above the left column's bottom (138px at 1024), then 120px of shell padding. The room exits through ~250px of empty green in the bottom-right quadrant.

Every other room owns a device — hero has the evidence band, Work has the project row, Skills has the capability path, Experience has the timeline. About owns nothing: two text columns on a colored wall.

Against the product's first principle: this is the only room on the site containing zero numbers. Hero carries four verified figures, Work carries six.

**Deterministic scan.** `components/Sections.tsx` → clean, exit 0, zero findings. `index.html` → exit 2, 2 findings: `overused-font` (line 44, Instrument Serif) and `em-dash-overuse` (42 em-dashes, self-marked advisory). Both judged false positives — Instrument Serif isn't in that rule's own named list and measures at 17% of text; the em-dash density is authored voice.

Caveat: the HTML scan printed `DEGRADED — HTML parser modules unavailable` and fell back to regex (no `node_modules` under the skill directory). Custom properties, selector matching, and computed contrast were not evaluated there. Those 2 findings are an undercount.

**Visual overlays.** Injection succeeded — 21 overlay elements with real geometry, via live-server on :8400, since killed and verified down. In-page detector found 19 findings across 14 elements site-wide; only one lands inside `#about`: `heading-rhythm` on `#about-title` — 28px above vs 48px below, so the headline binds upward to its eyebrow rather than owning the block below. A page-level `kicker-above-heading` also names About. No screenshot captured (`preview_snapshot` failed twice); overlay presence evidenced by DOM geometry.

## Overall Impression

Beautifully executed, almost nothing to say. The Field Green wall is the site's best pacing beat and the headline is the best single sentence on the page — then it spends 914px of desktop height (1,456px mobile) restating what the Hero already said, in prose, with no number, no artifact, no link, and no way to interact.

Biggest opportunity: the consulting operating context sitting unused in PRODUCT.md — multiple clients across 6 industries, engagements from 3 weeks to ~12 months, requirements gathered in working sessions rather than handed down as specs, work that frequently starts from someone else's sketch or an existing Salesforce report. Differentiating, true, and appears nowhere on the site.

## What's Working

1. **The wall does real structural work.** Field Green full-bleed between two Bone rooms is the clearest context switch on the site; the divider pair (diagonal in, curve out) makes the transition feel authored.
2. **The headline is the best sentence on the page.** "I turn messy data *into reliable insights.*" compresses governance + design into six words, italic lands on the payoff, and at the 18ch cap it breaks into a deliberate two-line shape at every width tested.
3. **Light-mode typographic execution is fine-grained.** 18px/1.55 at 54ch with `text-wrap: pretty` and opacity .88 → 7.20:1 on green; mono numerals in a 32px track give the list a real left axis; the hairline under "How I work" is the only rule in the room and earns its place.

## Priority Issues

### [P1] The room contains no evidence, on a site whose first principle is evidence over adjectives
Why it matters: the primary user decides in 1–2 minutes and needs facts they can paste into a note justifying an interview. About gives them a degree and five abstract nouns. Most skippable 914px on the site.
Fix: delete the five tag pills and put one verified figure into the room using the existing Stat Block pattern (serif value + plain label + mono qualifier). `100% of identified PII-exposed data sources retired` appears nowhere on the page and belongs to the governance claim this room makes. Or promote delivery artifacts — specification documents for data engineering, validation against source systems before handoff, how-to guides and live training — as proof of "the whole chain, not the last step."
Suggested command: `/impeccable bolder`

### [P1] Structural redundancy with Hero, Work, and Skills
Why it matters: the recruiter reads the same claim three times and learns nothing new, eroding trust in the rest of the copy. Paragraph 1 restates the hero lead nearly verbatim. Paragraph 2's industry list duplicates the hero's `6 · Industries served` suffix and the Work headline `6 projects, 6 industries.` The 5 tags duplicate Skills' capability list. Three of four "How I work" items duplicate Skills stages.
Fix: cut About to ~90 words of what only About can say — the consulting operating context. Impose one rule on "How I work": each item must name an artifact handable over on day one. Two of four survive.
Suggested command: `/impeccable clarify`

### [P1] `.how-n` fails WCAG AA in dark mode — measured
Why it matters: the `01`–`04` numerals compute to 4.24:1, below the 4.5:1 normal-text threshold. Cause: `[data-theme="dark"] .room-about { --label-opacity: .88 }` (portfolio.css:310-311) multiplied by `.how li { opacity: .92 }` on a lighter dark-mode wall. DESIGN.md claims About's labels rise to 88% in dark "to maintain AA"; compounding opacity defeats that. The whole room sits on the floor: body 4.69:1 (light 7.20), eyebrow/`.side-h` 4.69:1, italic 4.82:1 — zero headroom, and the smallest type carries the least of it.
Fix: darken the dark-mode wall (`--green` from `#3d6b3f` toward `#35603a`), or take `.about-body p` to opacity 1 in dark and stop compounding `--label-opacity` with the list's `.92`.
Suggested command: `/impeccable audit`

### [P2] Composition: two voids and no object in the right column
Why it matters: reads as under-filled rather than confidently spare, undercutting "craft is the argument." Measured: headline fills 629/1176px leaving the top-right band empty; `.how` ends 122px (1440) / 138px (1024) above the body column's bottom; then 120px of padding.
Fix: lift "How I work" to start at the headline's baseline so both columns end together, or give the right column a real object in the `Charts.tsx` `currentColor` vocabulary — a 7-node delivery-chain mark (discovery → KPI → model → governance → dashboard → documentation → adoption). Also fix the `heading-rhythm` finding: 28px above / 48px below binds the headline upward to its kicker.
Suggested command: `/impeccable layout`

### [P2] The 860–1100px band starves the right column, and mobile clips the last list item
Why it matters: laptops at 1024–1100 and split-screen windows land in this band. At a 900px viewport the grid resolves to 435px / 311px — "How I work" prose measures 34ch at 15px against 47ch on the left, so every item breaks to three lines with heavy rag. At 390px the fixed bottom nav pill overlaps the tail of item 04.
Fix: raise the single-column breakpoint from 860px to ~1040px, or use `minmax(0,1.4fr) minmax(340px,1fr)` with `gap: clamp(40px, 6vw, 80px)`. Add bottom padding ≥ nav height + 24px to `.shell` under 760px.
Suggested command: `/impeccable adapt`

## Persona Red Flags

**Jordan (first-timer):** doesn't learn the job title until word 8 of paragraph 1, never learns where Otto works ("STX Next" first appears seven screens down in Experience) or that this is consulting rather than in-house. Paragraph 2's "The projects here span…" forward-references projects not yet reached, with no link.

**Casey (distracted mobile):** 1,456px — 1.73 viewports — of continuous prose. First thumb-flick lands mid-paragraph 2 with no heading in view. `.tags` wraps 2/1/2 at 390px, reading as a rendering bug rather than a set. Item 04 sits partially behind the fixed `.mnav-pill`. Not one number, bold word, or image survives a 2-second glance.

**Sam (screen reader + keyboard + zoom):** the section does not exist to a keyboard — zero focusable elements; tab order runs hero CTAs → project triggers straight past About. The landmark announces "region, I turn messy data into reliable insights" because `aria-labelledby` points at the h2 and "About" lives only in a decorative `<div class="eyebrow">` that never reaches the a11y tree — so the nav link "About" lands in a region that doesn't call itself that. `.how-n` is live text read as "zero one," while the structurally identical `.capability-step` in Skills is correctly `aria-hidden`. Plus the 4.24:1 failure. 200% zoom passes outright.

**Time-pressed hiring manager (fifth candidate site today):** the room they scroll past, costing ~914px plus ~240px of dividers between the evidence band they liked and the work they came for. If they stop, the first fact is a bachelor's degree and the last is "the data problems are often more similar than they appear" — a hedge, followed by 250px of empty green. Peak-end works against the section. Nothing here is quotable to a hiring committee.

## Minor Observations

- Crawler/AI parity is otherwise excellent — exact-string comparison of all 3 `ABOUT_BODY` paragraphs, 4 `HOW_I_WORK` items and 4 `STATS` against `<noscript>` and `llms.txt` found 0 mismatches. Two structural gaps: the headline "I turn messy data into reliable insights." appears in neither, because it's hardcoded in `Sections.tsx` rather than living in `data/about.ts` where the generator can see it; and "How I work" is `h2` in `<noscript>` but `h3` live.
- Heading order has no skipped levels (31 headings, exactly one h1), but `#contact-title` is an `h3` while peer sections use `h2`.
- `#about` has zero animations and zero transitions — nothing for `prefers-reduced-motion` to respect. Separately, the global reduced-motion block at portfolio.css:1144 does not disable `hero-settle`.
- `.room-about .h2 em` renders as `currentColor` at .9, so the mandated italic carries almost no signal (4.82:1 vs 5.51:1 around it). Oxblood is correctly forbidden on green, but About's italic does less work than any other room's.
- The "ABOUT" eyebrow is the only label in the system that names a nav item instead of adding information. Compare "Selected work," "Data Analyst · BI Specialist."
- `.a-pill` uses `.04em` tracking while the `.eyebrow` 24px above uses `.14em` — both in spec, but two competing mono voices at 11px.
- No horizontal overflow at 390px. The 320px check is a proxy (`preview_resize` timed out three times at that width) but valid, since the 340px and 420px breakpoints touch nav and hero only.

## Questions to Consider

1. If Hero proves scale and Work proves outcomes, what is the one thing About must prove that neither can? If the answer is "how he works with clients," why is not one of those sentences on the site?
2. What if About stopped being a biography and became the chain itself — discovery → KPI → model → governance → dashboard → documentation → adoption, drawn once in `currentColor`, with a verified figure hung on three of the seven links?
3. Does this room need to be a separate scroll stop at all, or is it the second half of the Hero — freeing the Field Green wall for a room that has something to show?
4. Every other room has a signature device. If About's answer is "none," is that a content problem, or proof the room was never designed, only filled?
5. The room spends ~260px of padding and ~240px of dividers on ~250 words with zero numbers. If you had to justify that budget with one object in the empty bottom-right quadrant — what would a hiring manager screenshot?
