---
target: the about section
total_score: 20
max_score: 28
na_heuristics: 5,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-16T02-24-03Z
slug: components-sections-tsx
---
Method: dual-agent (A: design review, isolated · B: detector + measured browser evidence, isolated). Dev server on :5176 started for this work and left running; :5173/:5174 untouched. No visual overlay injection was attempted this run — screenshot evidence only.

# Critique — The About Section

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Wall colour + active nav pill still locate you; the room grew to 1,629px on mobile (1.93 viewports) and the first screen carries no number |
| 2 | Match System / Real World | 3 | The unsupported "Analytics engineering" pill is gone and the copy is now operating truth; "the grain" and the coined label "On record" are new small snags |
| 3 | User Control and Freedom | 3 | Zero focusable elements at all 12 measured widths; the persistent nav pill is the only escape. A argued n/a, prior run scored 3 — held at 3 for comparability |
| 4 | Consistency and Standards | 3 | Both prior defects fixed (`.how-n` AA, the h2/h3 noscript mismatch). Replaced by new ones: DESIGN.md now misstates the grid on three counts, and `.ledger` duplicates `.evidence-band` |
| 5 | Error Prevention | n/a | No input, no state, no destructive path |
| 6 | Recognition Rather Than Recall | 2 | The old forward-reference copy is gone; a new one took its place — ¶3 points at a heading 178px *above* it, already read |
| 7 | Flexibility and Efficiency | 3 | Applies here. A real skim layer now exists (two large serif figures) where there was none. Still no depth layer, no tab stop, and four full-sentence list items |
| 8 | Aesthetic and Minimalist Design | 3 | The prior complaint is fully resolved — the heaviest post-headline element is now the highest-information one. Held from 4 by the still-absent device and a 40px/40px mobile collision |
| 9 | Error Recovery | n/a | No reachable error states in static prose |
| 10 | Help and Documentation | n/a | Experience/Persuade surface with no task to document |

**Total: 20/28 — Good (71%).** Previous run: 19/28 (68%, Acceptable).

The headline number barely moved. The composition underneath it moved a great deal: heuristic 7 rose a full point, and heuristics 4 and 8 held their scores while the defects producing them were entirely swapped out. All three P1s from the previous run are genuinely closed.

## Design Specificity Verdict

**LLM assessment — split.** The copy passes the swap test decisively; the composition does not.

Paragraph 2 cannot be written by someone who hasn't done this job: *"The starting point is usually someone else's artifact: a sketch, a design team's mockup, an existing Salesforce report used only as a KPI reference. So the first real task is deciding what the numbers should mean before anything gets modeled."* That is exactly the seam PRODUCT.md names as the differentiator — inheriting design intent while owning the model underneath — stated as operating reality rather than as a claim. The previous run's swap test (change four nouns and it ships on any analyst's portfolio) now fails to land.

The composition is another matter. Narrative left, labelled evidence rail right, mono eyebrow, hairline ledger, big serif figure, numbered 01–04 list. Swap the copy for "I build design systems" and `100%` for `40% faster builds`, and it ships on a product designer's portfolio unchanged. What keeps it from looking templated is the palette and Instrument Serif — the system, not the section.

The structural version of that point is sharper: **every other room owns a device** — hero the evidence band, Work the project row, Skills the capability path, Experience the timeline. About, the room whose thesis is "I care about the design of what lands on screen," owns two numbers and a bulleted list. And `.ledger` is `.evidence-band` reimplemented under a second class namespace: both are `ul > li` with `-fig`/`-name`/`-note` children and a `-lead` modifier on index 0. A visitor meets the same device twice inside 1.5 viewports.

**Deterministic scan.** `components/Sections.tsx` → clean, zero findings. `index.html` → 2 findings, both outside `#about`.

Both are false positives, and one is newly diagnosable: the first scan printed `DEGRADED — HTML parser modules unavailable` and fell back to regex, exactly as the previous critique reported. Assessment B located the four missing parser modules in an npx cache, symlinked them in, re-ran clean (**exit 0, 1 finding**), and removed the symlinks. Under the real parser `overused-font` **disappears** — it was a regex artifact matching the substring `Instrument+Serif`, and Instrument Serif is not in that rule's own named list. `em-dash-overuse` survives as advisory only: 47 em-dashes across the file, of which just 5 come from About, the rest from the `<noscript>` crawler mirror that duplicates every section and never renders for JS users.

The previous critique called both false positives on judgment. They are now false positives on evidence.

**A note on the 35 `design-system-font-size` findings in `portfolio.css`:** these are an artifact of `.impeccable/design.json` having **no typography ramp at all** — its keys are `schemaVersion, generatedAt, title, extensions, components, narrative`. The rule is comparing against an empty set, which is why the count is 35 rather than 3. Cross-checked against DESIGN.md prose, 12/13/14/18/28px are all explicitly documented there; the one genuine drift is `52px` at L330, where `.h1` ships `clamp(52px, 7.4vw, 104px)` against a documented display step of `clamp(56px, 9vw, 128px)` — hero drift from commit 6689683, outside this section.

**Visual overlays.** None. No injection was attempted this run, so there is no user-visible overlay in any browser tab. Evidence is measurement and screenshots only.

## Overall Impression

The rebuild worked. The room that was "the only room on the site containing zero numbers" now opens its evidence column with `100%` in 55px serif, and the operating context that PRODUCT.md had sitting unused is now the best writing on the page. Measured against its own prior report card, every P1 is closed: evidence is present, the redundancy with Hero/Work/Skills is gone, and `.how-n` moved from a measured 4.24:1 AA failure to 5.73:1.

What the rebuild did not do is give the room a reason to exist as *design*. It fixed the content problem and left the structural one untouched: no device, no onward path, and — measured at all 12 widths — not one focusable element. The section is now a well-set page in a book. Every other room is an object.

The biggest single opportunity is the ending. The reader has just been handed four concrete artifacts, which is the highest-conviction moment in the room, and it resolves into an administrative bullet followed by ~150px of empty green. Peak-end weights that ending disproportionately, and PRODUCT.md's success condition is an email.

## What's Working

1. **Paragraph 2 is the best sentence on the site for the stated positioning.** It proves the hybrid claim by describing the job instead of asserting the skill, and it satisfies the anonymity constraint perfectly — concrete without naming anyone.
2. **The handover list's content demonstrates Product Principle 2 rather than asserting it.** "Show the whole chain, not the last step" is an abstraction; "a specification the data engineering team can build against" and "a validation pass reconciled before production" are four checkable artifacts a hiring manager can interrogate in an interview.
3. **Contrast discipline held through a structural rebuild, in both themes.** Ten text roles measured at 1440 and 390, light and dark: floor of **5.44:1**, ceiling 8.75:1, zero failures. The `--label-opacity` lift to .92 in dark does exactly what DESIGN.md claims. Opacity-driven hierarchy on a saturated wall is the classic place contrast dies, and it didn't. Crawler parity held too — every string in `data/about.ts`, headline included, appears verbatim in both `<noscript>` and `llms.txt`.

## Priority Issues

### [P1] On mobile the room's evidence sits a full viewport below its claim
Why it matters: at 390×844, `ON RECORD` renders at y=898 and the first figure at y=945 — both below the fold. The room is 1,629px, 1.93 viewports; at 320px it is 1,816px. The entire first screen is three paragraphs of prose and zero numbers. Product Principle 3 requires scale in the first viewport, and mobile is where a LinkedIn-sourced recruiter arrives. The rebuild's whole payload is invisible to the persona most likely to see it.
Fix: below 1080px, reorder to headline → ledger → prose → handover, giving `.side-block:first-child` a grid `order` that places it directly after the `h2` in the stacked layout. Target the first figure above 700px from section top.
Suggested command: `/impeccable adapt`

### [P1] The room dead-ends at its highest-conviction moment
Why it matters: zero focusable elements at all 12 measured widths. The section ends on handover item 04 with no link to Work, no email, no onward motion — then empty green. This is the moment the reader has just been handed four concrete artifacts. Keyboard and screen-reader users get no stop in the room at all; tab order runs hero CTAs straight into the Work grid.
Fix: one ghost pill closing the evidence column — "See how this shows up in the work →" to `#work`, or the contact address. Ghost rather than primary so it stays subordinate to the hero and Experience CTAs. It doubles as the section's only tab stop.
Suggested command: `/impeccable bolder`

### [P2] The handover list is prose wearing a list's clothes
Why it matters: four full sentences at 44.5ch × 2 lines on desktop, 29.8ch × **3 lines** for all four items at 390. The actual deliverable is buried mid-sentence — *"A specification the data engineering team can build against — the model, the grain, and the fields the report needs."* A hiring manager scanning for "what does he produce" must read four complete sentences to extract four nouns. The No-Bold-Prose rule correctly forbids the usual fix; no substitute was supplied.
Fix: split each item into an artifact name at 14px/500 (the existing `.ledger-name` treatment) with the qualifier beneath at 13px/label-opacity — *"KPI definition"* / *"agreed in working sessions before anything is built…"*. Reuses the Stat Block's value/label/note logic and keeps hierarchy in size and opacity.
Suggested command: `/impeccable distill`

### [P2] One ledger entry isn't evidence, and the other re-cuts a project already shown twice
Why it matters: "3 wks – ~12 mos / Engagement range, kickoff to handover" is set at 37px serif under a heading that says **On record**, beside a genuine outcome — but a duration range is a scoping fact, not evidence, and Principle 1 is evidence over adjectives. Framing it as a record makes the proof base look like one item padded to two. Separately, `100% of identified PII-exposed data sources retired` comes from the same Tableau engagement as the hero's `696 → 12` and `~70%` — three of the site's four loudest numbers are one project re-cut, which a hiring manager notices on reaching Work. About was the room where breadth could have been proven.
Fix: replace the second entry with a breadth figure from a different engagement — `~15 dashboards built from sketch-based designs` or `5 reporting time grains unified in one dashboard set`, both already verified in PRODUCT.md. Move the engagement range into Experience, where duration belongs.
Suggested command: `/impeccable clarify`

### [P3] Mobile hierarchy collapse — headline and lead figure are the same size
Why it matters: measured at 390/500/600px, `.h2` is 40px and `.ledger-item-lead .ledger-fig` is also 40px. Two Instrument Serif objects at identical size in one stacked column, so the room reads as having two headlines where the system permits one.
Fix: `.ledger-item-lead .ledger-fig { font-size: clamp(32px, 3.8vw, 56px); }`. Desktop 54.7px is unchanged; a tier is restored below 600px.
Suggested command: `/impeccable polish`

## Persona Red Flags

**Jordan (first-timer):** the room never states the job title or discipline — "BI" appears **zero** times in About copy, and "dashboard" appears exactly once, inside the sentence that de-emphasizes it. Jordan could finish three paragraphs about working sessions and KPI definitions and conclude this is a project manager. "STX Next" is unexplained and unlinked. "On record" gives no anchor — record of what, kept by whom?

**Casey (distracted mobile):** first screen after tapping About is three paragraphs and zero numbers; the first figure is 101px below the fold. The fixed nav pill overlays the bottom ~120px at any scroll stop — in the dark capture, paragraph 3 is legible *through* it. The `01`–`04` indices consume 32px of a 350px measure for a decorative element, which is what forces all four items to exactly three ragged lines. 1,629px of scroll, not one tap target.

**Sam (screen reader + keyboard + zoom):** zero focusable elements, so the room has no keyboard stop and no landmark anchor. `.ledger` and `.how` carry no `aria-label` while the hero's structurally identical list *does* (`aria-label="Verified evidence"`) — About's lists are the ones that need it more, and the preceding `h3` is not programmatically tied to either. `<em>` on the headline applies semantic stress emphasis to a purely stylistic offset; `<i>` is the correct element. Verified good: heading outline valid (h2→h3→h3), `aria-labelledby` correct, `.how-n` properly `aria-hidden` (the previous run's "read as zero one" finding is closed — the unignored `01`–`04` nodes are `.proj-n` in `#work`), no overflow at 320px, 200% zoom reflows cleanly.

**Time-pressed hiring manager:** the room leads with process, not results — twelve lines about how work arrives before a single outcome. The section's accessible name is still "I turn messy data into reliable insights," so the nav link "About" lands in a region that doesn't call itself that. No seniority signal in the room. And zero onward action after being persuaded.

## Minor Observations

- **The cross-column pointer reads backwards.** ¶3 at y=1016 references the `WHAT I HAND OVER` heading at y=838. Either rewrite it as a standalone thesis — *"The dashboard is the middle of the job, not the end of it."* is stronger alone — or move the handover block above the ledger.
- **1440×900 fits by ~10px.** Section height is 901.7px; on a real laptop viewport (~780px after chrome) handover items 03–04 fall below the fold.
- **`data/about.ts:7–8, 18` is dead and actively misleading.** `Stat.evidence` is commented *"Present on the lead stat only — the ledger draws its evidence mark."* `STATS[0].evidence` is assigned but nothing renders it; the ledger reads `ABOUT_LEDGER`, not `STATS`. The comment misdescribes the section under review.
- **`.a-pill` is misfiled** inside the `── About ──` CSS block, but About no longer uses pills — it is the shared chip consumed by Work and the overlay.
- **Neither band around the 1080 breakpoint is truly comfortable.** `.how-t` runs 59.9ch from 760–1040px (cap is 60ch — zero headroom) and 38.2–39ch from 1080–1100px, below the documented 46ch floor. The switch trades one violation for the other. There is a 1px discontinuity at 1079/1080 where the measure jumps +57% and the section grows 458px — inherent to a 2-col→1-col collapse, but worth knowing.
- **DESIGN.md §Layout is now wrong on three counts** for this section: it documents "1.4fr / 1fr with an 80px gutter (stacking at 860px)" against shipped `minmax(0,1.2fr) minmax(360px,1fr)`, `clamp(56px,5vw,80px)`, and 1080px. The 1080 breakpoint is also absent from the documented breakpoint list.
- **The nav pill renders two-tone over the About top edge** at 1440, green left and cream right, where the diagonal transition passes beneath the glass.

## Questions to Consider

1. Every other room has a device; About's is a bulleted list. For the one section whose thesis is "I care about the design of what lands on screen," is a numbered list of sentences the strongest available proof? What if the handover chain were *drawn* — four points on a rule, the way the evidence marks draw a delta?
2. "BI" appears zero times and "dashboard" once, in the sentence that de-emphasizes it. Admirable restraint, or does Jordan finish this room unsure what job Otto does?
3. Three of the four loudest numbers on this site come from one Tableau engagement. About was where breadth could have been proven. Why did it reach for the same well?
4. "On record" — against what? The phrase implies a counterparty who could dispute it. If the real answer is "these are the two I can say out loud under an NDA," isn't *that* the more interesting sentence — and doesn't saying it turn the anonymity constraint from a limitation into a credential?
5. If ¶3 were deleted, what would be lost? It exists to introduce a column already visible. Would the room be better ending its prose on "before anything gets modeled"?
