---
name: Otto Montoya — Portfolio
description: A quiet study in heritage ink colors, serif italics, and hairline structure — five full-bleed color rooms carrying an analyst's work.
colors:
  field-green: "#2d4a2b"
  oxblood: "#6b1f2a"
  bone-paper: "#f1ead8"
  charcoal-ink: "#1a1a18"
  warm-paper: "#f7f1de"
  field-green-dark: "#3d6b3f"
  oxblood-dark: "#a8344a"
  accent-on-dark: "#ca6276"
  bone-paper-dark: "#1a1a18"
  charcoal-ink-dark: "#f1ead8"
  warm-paper-dark: "#353431"
  overlay-step: "#e2d6bd"
  overlay-step-dark: "#6b675e"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(56px, 9vw, 128px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(40px, 5.5vw, 76px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(22px, 2.2vw, 30px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(17px, 1.6vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  pill: "999px"
  card: "20px"
  panel: "16px"
  image: "10px"
  sm: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "80px"
  room-top: "140px"
  room-bottom: "120px"
components:
  cta-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  cta-primary-hover:
    backgroundColor: "{colors.charcoal-ink}"
  cta-ghost:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
  cta-ghost-hover:
    backgroundColor: "rgba(0,0,0,.04)"
  tag-pill:
    backgroundColor: "color-mix(in srgb, currentColor 7%, transparent)"
    textColor: "currentColor"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 11px"
  nav-pill:
    backgroundColor: "color-mix(in srgb, #ffffff 72%, transparent)"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 8px"
  nav-link-active:
    backgroundColor: "color-mix(in srgb, #1a1a18 88%, transparent)"
    textColor: "{colors.bone-paper}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  project-row:
    backgroundColor: "transparent"
    textColor: "currentColor"
    padding: "32px 0"
  project-row-hover:
    backgroundColor: "{colors.warm-paper}"
    padding: "32px 24px"
  overlay-card:
    backgroundColor: "{colors.bone-paper}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.card}"
    padding: "48px"
  overlay-side:
    backgroundColor: "{colors.overlay-step}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
---

# Design System: Otto Montoya — Portfolio

## Overview

**Creative North Star: "The Analyst's Study"**

A quiet, book-lined room. Forest green and oxblood on cream paper, serif italics carrying the warmth, hairline rules doing the structural work — and glass as the only modern intrusion, floating above everything in the form of a nav pill. The system reads as considered rather than fashionable: nothing here is trend-dated, and nothing announces that it was made by a template.

The spatial idea is rooms. Five full-bleed sections each own a single wall color — Bone Paper for the hero, Field Green for About, Bone Paper again for Work, Oxblood for Skills, Charcoal Ink for Experience — and you know which section you are in by the color surrounding you, not by a heading. Sections carry no cards, no panels, no boxed containers. Content sits directly on the wall, separated by 1px rules at low alpha. The result is dense with information but never busy, because the only structural devices are color, type, and line.

Type does the expressive work. Instrument Serif at display sizes with a single italic phrase per headline; DM Sans for everything readable; JetBrains Mono, uppercase and wide-tracked, for every piece of metadata. The italic uses Oxblood on light rooms and adapts to the foreground/accent pairing on colored or dark rooms. Data appears as small, un-labelled SVG evidence marks and unit strips in the accent color — plotted marks that read as texture on the page rather than as charts to be analyzed. This is a portfolio for a BI analyst that deliberately refuses to look like BI software.

**Key Characteristics:**
- Five full-bleed color rooms; section identity lives in the background color
- Heritage palette: forest green, oxblood, bone, charcoal — no blue, no gradient
- Instrument Serif display with exactly one semantically colored italic phrase per headline
- Uppercase mono metadata at 11px / 0.14em tracking as the connective tissue
- Hairline rules (1px, `currentColor` at 15% alpha) instead of cards, borders, or boxes
- Pill geometry (999px) on everything interactive; large soft radii only on floating layers
- A glass nav pill that re-schemes itself depending on the room beneath it
- Evidence marks as page texture, not as dashboards

## Colors

A heritage pigment palette — earth, wine, bone, and soot — carried at full saturation across entire viewports rather than dabbed on as accents.

### Primary
- **Oxblood** (#6b1f2a): The only accent hue in the system. It serves as the Skills wall and as the light-mode accent. The Skills wall lifts to #a8344a in dark mode; accent text on dark surfaces uses the brighter, contrast-safe `--accent-on-dark` (#ca6276).

### Secondary
- **Field Green** (#2d4a2b): The About room's wall. A deep, low-chroma forest that reads as ink rather than nature. Used as a full-bleed surface only — never as a text color, never as an accent on light backgrounds. Lifts to #3d6b3f in dark mode.

### Neutral
- **Bone Paper** (#f1ead8): The default page surface and the text color on every dark room. Warm, slightly yellowed cream — the paper the whole study is printed on.
- **Warm Paper** (#f7f1de): One step warmer and lighter than Bone Paper. It is the interactive wash behind a hovered or focused project row and the warm foreground used on deep walls.
- **Charcoal Ink** (#1a1a18): Body text on light rooms, and the Experience room's wall. Near-black with a green-brown bias; never pure #000.
- **Overlay Step** (#e2d6bd): A quiet parchment inset inside the project overlay. It stays subordinate to the Bone Paper story surface while giving the summary a clear boundary; in dark mode it becomes #6b675e for the same tonal separation.

### Named Rules

**The One Room Rule.** Every section owns exactly one background color, edge to edge. Content sits directly on that color — no cards, no inner panels, no competing surface. If a new section needs a different color, it becomes a new room with its own wall, not a box inside an existing one.

**The One Voice Rule.** Oxblood is the system's single accent and appears on well under 10% of any viewport: one italic phrase, the numbers, the chart marks, one button. A second accent hue does not exist in this system. Introducing one dissolves the palette.

**The Wall Pair Rule.** Every room owns an explicit wall/foreground pair (`--wall-*` and `--on-wall-*`) in each theme. Dark mode changes those pairs through `[data-theme="dark"]`; it never infers text color by globally swapping paper and ink. Components inherit from the rendered wall, while accent, overlay, and navigation colors use their own semantic tokens.

## Typography

**Display Font:** Instrument Serif (with Georgia, serif)
**Body Font:** DM Sans (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular)

**Character:** A high-contrast literary serif at large sizes against a neutral, low-personality grotesque — the pairing of a printed book with a working document. The mono is the third voice: it never carries meaning on its own, only labels the meaning next to it. Hierarchy comes primarily from size, case, tracking, and italic rather than weight escalation; 600 is reserved for compact navigation branding and project indices.

### Hierarchy
- **Display** (400, clamp(56px, 9vw, 128px), 0.95, -0.02em): Hero headline only. Capped at 14ch with `text-wrap: balance` so it always breaks into a deliberate shape.
- **Headline** (400, clamp(40px, 5.5vw, 76px), 1.02, -0.015em): One per room, capped at 18ch. Sets the room's argument.
- **Title** (400, clamp(22px, 2.2vw, 30px), 1.1): Project titles, role names in the timeline, education entries, overlay headings.
- **Lead** (400, clamp(17px, 1.6vw, 21px), 1.5, 85% opacity): The paragraph directly under a headline. Capped at 54ch, `text-wrap: pretty`.
- **Body** (400, 15px, 1.55, 82–92% opacity): List items, notes, responsibilities. About paragraphs run larger at 18px/1.55; overlay prose at 15px/1.65. Measures cap between 46ch and 60ch depending on context.
- **Label** (400, 11px, 0.14em, uppercase, 74% minimum opacity): Eyebrows, section labels, side headings. About and Skills labels rise to 88% in dark mode to maintain AA on their colored walls. A tighter 0.06–0.12em variant appears on contact keys and overlay labels.

### Named Rules

**The Italic Emphasis Rule.** Every display and headline carries exactly one italic phrase, and that phrase is the sentence's point ("Clear insights from *complex* data.", "A path through *data, dashboards & teams.*"). The italic is set in Oxblood on light rooms; on Field Green and Oxblood rooms it uses the room foreground, and on dark surfaces it uses `--accent-on-dark`. One italic per headline — never two, never zero.

**The Mono Label Rule.** JetBrains Mono is metadata only: eyebrows, client/role meta lines, tool names, timeline dates, scope/timeline/stack keys, the footer. It never sets a sentence anyone has to read for content.

**The No-Bold-Prose Rule.** Emphasis in sentences comes from size, italic, color, and case. Prose does not exceed weight 500; 600 is reserved for compact navigation branding and project indices.

## Layout

A single centered column with generous vertical rooms. The content shell caps at 1240px with 32px side padding (20px under 760px); the nav pill runs wider at 1320px so it reads as a floating object rather than a header aligned to the text.

**Vertical rhythm:** each room is padded 140px top / 120px bottom on desktop, 120px / 100px on mobile — asymmetric, so the eye lands slightly below center after a scroll jump. Major blocks inside a room separate by 80px; sub-blocks by 48px; list rows by 32px vertical padding with a hairline top border. Adjacent ruled blocks collapse the outer gap so two hairlines never frame empty space: the next block owns its interior breathing room. In Experience, the timeline's closing rule meets the contact block directly, and the contact content begins 80px inside that shared boundary.

**Grids by room:** hero stats run 4 columns (2 on mobile); About splits 1.4fr / 1fr with an 80px gutter (stacking at 860px); Skills runs 4 columns (2 at 760px) with soft-skill and education lists in 2 columns (1 at 760px); the project row is a four-track grid — `64px 1.4fr 1fr 32px` — collapsing to `48px 1fr` at 860px, where the metric moves below the title block, the decorative evidence mark drops, and a text affordance replaces the standalone arrow; the timeline is `200px 1fr`, stacking at 760px. The overlay is an asymmetric named-area grid — `minmax(0, 1.45fr) minmax(280px, .9fr)` — with the header and story on the left and a persistent summary rail on the right; it becomes a one-column `header → summary → story` sequence at 820px.

**Breakpoints:** 860px (structural: multi-column room grids collapse and project evidence reflows), 820px (the overlay summary rail enters the reading flow), 760px (device: desktop nav swaps for the bottom mobile pill and padding tightens), 420px (mobile-nav type and padding compact), and 340px (the mobile-nav cluster tightens its viewport inset). There is no broad tablet treatment; the two structural breakpoints respond to the actual content pressure.

### Named Rules

**The Evidence Never Drops.** Verified evidence is primary information, regardless of viewport or zoom. A breakpoint may reflow a metric's value and label, but it must never hide, abbreviate, or demote them. Only the decorative representation of that evidence may drop when space is constrained.

**The Drop-Don't-Squeeze Rule.** Secondary visual elements are removed at narrow widths rather than compressed. The project row's decorative SVG and standalone arrow `display: none` below 860px; the metric value and label remain, and the arrow's interaction cue becomes the explicit “View project →” affordance. The desktop nav is not miniaturized, it is replaced. Nothing in this system survives a breakpoint at an illegible size.

## Elevation & Depth

The implemented system is flat by circumstance, not by doctrine. Content surfaces carry no shadows at all — depth is entirely a matter of color blocks and 1px rules at 15% alpha. The nav pill and lightbox are the only surfaces with ambient shadow; the overlay itself separates through a 65% black scrim with 10px blur, while its card remains shadowless.

**Flatness is an open question, not an invariant.** A deliberate shadow vocabulary for cards and containers may be introduced by future work; if it is, it should be defined as a proper scale here rather than added ad hoc per component, and it should stay subordinate to the color-room structure — depth supporting the rooms, not replacing them.

### Shadow Vocabulary
- **Glass float — default** (`0 10px 40px color-mix(in srgb, var(--ink) 18%, transparent), inset 0 1px 0 color-mix(in srgb, #ffffff 58%, transparent)`): The nav pill over the default room scheme. Mobile uses the same ambient color with a shorter 30px spread.
- **Glass float — over dark** (`0 10px 40px color-mix(in srgb, #000000 32%, transparent), inset 0 1px 0 color-mix(in srgb, #ffffff 25%, transparent)`): Deepened ambient and a restrained highlight, so the pill still separates from Field Green, Oxblood, and Charcoal Ink walls.
- **Glass float — over light** (`0 10px 40px color-mix(in srgb, #000000 10%, transparent), inset 0 1px 0 color-mix(in srgb, #ffffff 60%, transparent)`): Lightened ambient with a strong white top edge, used when the pill sits over a pale surface in dark mode.
- **Lightbox lift** (`0 32px 80px color-mix(in srgb, #000000 50%, transparent)`): The single deep shadow in the system, on the zoomed image only.

### Named Rules

**The Glass-Is-For-Floating Rule.** `backdrop-filter` signals *this element is not part of the page* — nav, overlay scrim, lightbox. Ambient shadow is reserved for the nav and zoomed image. An element that scrolls with the content does not get either treatment.

## Shapes

Pill-first geometry. Everything small and interactive is a full 999px pill: nav container, nav links, the sliding active indicator, CTAs, tag pills, the overlay close button. Nothing in this system is a rounded rectangle at a small size — it is either a pill or a hairline.

Floating panels take large soft radii instead: 20px on the overlay card, 16px on its side panel, 10px on project images, 8px on the lightbox image. The radius scales with the surface, so a big panel never looks like an inflated button.

Rooms have no radius at all — they are full-bleed color to every edge. Borders are hairlines only: `1px solid var(--rule)`, where `--rule` mixes `currentColor` at 15% with transparency, used as separators between rows rather than as outlines around objects. There is no 2px border anywhere, and no dashed or dotted stroke.

Between rooms, the color transition runs through a full-width SVG edge in one of four shapes (diagonal, curve, wave, sine) at 100–140px tall. **These are provisional** — the current expression of the room transition, not a commitment. A future pass may replace or drop them.

### Named Rules

**The Pill-or-Line Rule.** At small scale this system offers two shapes: a 999px pill or a 1px rule. If a new element is neither, it probably wants to be one of them.

## Components

Character: **tactile and confident.** Components should feel like objects with a physical response — real padding, a clear reaction to hover and press — rather than flat targets that only change opacity. The current build is on the restrained end of that (14px type, 14–22px padding, 1px translateY on hover); new work should push toward more definite feedback, not less, while staying inside the pill-and-hairline vocabulary.

### Buttons
- **Shape:** Full pill (999px), 1px transparent border reserved so ghost and primary share a footprint.
- **Primary:** Oxblood fill, Bone Paper text, 14px/500, 14px × 22px padding, usually with a trailing mono arrow `→`.
- **Primary on the Experience wall:** The contact CTA reverses the rendered wall pair (`--on-wall-exp` fill / `--wall-exp` text) in both themes. It is an explicit contextual variant: the conversion control must separate strongly from its closing wall, not rely on Oxblood against Charcoal Ink.
- **Ghost:** Transparent fill, inherited text color, `currentColor` border at 85% opacity — so it re-colors itself per room automatically.
- **Hover / Focus:** Both lift `translateY(-1px)` over 150ms. Primary swaps to the Hero room's semantic foreground/background pair; ghost fills with the semantic 7% `currentColor` wash. The global focus-visible treatment is a 2px `currentColor` outline with 4px offset.

### Chips
- **Style:** Mono 11px at 0.04em, 6px × 11px, full pill, with both fill and border derived from `currentColor`: a 7% wash and a 15% rule. The same semantic treatment automatically follows each room's foreground.
- **State:** Static — these are read-only labels for tools and expertise areas, with no selected or interactive variant.

### Cards / Containers
- **Corner Style:** 20px on the overlay card, 16px on the side panel.
- **Background:** The overlay card uses the theme's Bone Paper surface; the sidebar uses the dedicated Overlay Step token (#e2d6bd light, #6b675e dark). The tonal step, plus a 15% `currentColor` hairline, separates it from the card without competing with the project narrative.
- **Shadow Strategy:** None on the card itself; the scrim behind it (65% black + 10px blur) provides the separation. See Elevation & Depth.
- **Border:** The card has none. The sidebar and internal sections use the semantic 1px `var(--rule)` hairline at 15% of the current foreground.
- **Internal Padding:** 48px on the card (32px × 24px under 760px), 24px on the side panel, with 24px gaps between panel sections.

### Navigation
- **Style:** A floating glass pill — 72% white-mixed fill in the default light scheme, `blur(28px) saturate(180%)`, hairline border, ambient shadow, inset top highlight. Desktop: fixed 18px from top, three-track grid (brand / six links including Contact / mode toggle), moving to 14px once scrolled past 24px. Mobile (≤760px): a horizontally scrollable six-link pill anchored 18px from the bottom, paired with a separate circular mode pill. The active destination scrolls into view automatically; no label is compressed or clipped.
- **Typography:** DM Sans 13px desktop, 12px mobile, at 70–75% opacity, rising to 100% on hover.
- **Active state:** A sliding indicator pill measured from the live DOM and animated over 300ms `cubic-bezier(.4,0,.2,1)`. Desktop keeps one full navigation-sized layer and clips it to the active link; mobile animates width and horizontal translation, then scrolls the active destination toward center. In the default scheme the indicator is an 88% Charcoal Ink mix with Bone Paper text; the label has no background of its own.
- **Section-aware schemes:** Three states, chosen by IntersectionObserver against the room currently under the pill. Default (over Bone Paper) uses Charcoal Ink text on white glass; `nav-over-dark` (Field Green / Oxblood / Charcoal Ink rooms) switches to white text, dimmer fill, deeper shadow, and swaps the brand mark to `logo-light.svg`; `nav-over-light` (dark mode, where the Experience room becomes pale) inverts to Charcoal Ink text on black-tinted glass with a bright inset highlight. All three cross-fade over 350ms.

### Overlay Closing Rail
Project detail ends with one hairline and three pill actions: previous project at the left edge, “Discuss a similar project →” in the primary center position, and next project at the right edge. Previous and next wrap across the six-project set and remain ghost controls so the contact action owns the hierarchy. On mobile, the contact action becomes full-width above two equal project-navigation controls.

The open project is durable URL state (`#p1`–`#p6`). Opening from the Work room creates one history entry; previous/next replace that entry while updating the shareable hash; browser back and close restore the underlying page. A direct project URL opens immediately and closes by removing only the project hash.

### Signature: The Project Row
The Work room's entire interface. A four-track grid — index number, title block, data block, arrow — separated by hairline rules with no card around it. An invisible full-row button provides keyboard focus and dialog semantics. The number is Oxblood mono; the title is Instrument Serif; a mono meta line carries client and role; the summary caps at 46ch; tool pills sit at the bottom. The right column pairs a large serif metric value with its mono label above a `currentColor` evidence graphic. On hover or `:focus-within`, the entire row gains 24px of horizontal padding and a Warm Paper background — the row physically widens into the page — while the arrow shifts 4px right and turns Oxblood. `:active` keeps the Warm Paper response and gives the arrow a shorter pressed translation. Below 860px the metric reflows beneath the title block, the SVG drops, and “View project →” supplies a persistent interaction cue.

### Signature: The Stat Block
Four of them under the hero. Serif value at clamp(40px, 4vw, 56px) in Oxblood, a 14px/500 label, and an 11px mono suffix at the shared label opacity (74% by default). No borders on desktop — the grid gutter is the only separation; below 760px each block picks up a hairline bottom rule. This is the pattern for presenting any number in this system: big serif figure, plain label, quiet mono qualifier.

### Signature: Evidence Marks
Inline SVG built in `components/Charts.tsx` — endpoint deltas, equal unit bars or dots, and convergence paths, all drawn in `currentColor` or Oxblood with no axes, gridlines, legend, or labels. Every graphic consumes the same typed evidence object as its headline metric: known endpoints plot without invented intermediates, one mark represents each known unit, and one path represents each named source. They render as page texture that suggests data work; they are not dashboards and must not acquire dashboard chrome.

## Do's and Don'ts

### Do:
- **Do** give every new full-bleed section a single wall color and let content sit directly on it (The One Room Rule).
- **Do** put exactly one italic phrase in every headline, make it the phrase that carries the meaning, and color it through the room's semantic pairing.
- **Do** use semantic wall, foreground, accent, overlay, and navigation tokens rather than assuming that any primitive color has the same role in both themes (The Wall Pair Rule).
- **Do** use uppercase JetBrains Mono at 11px / 0.14em for any label, key, or piece of metadata.
- **Do** separate rows with 1px hairlines derived from `currentColor` at 15% alpha.
- **Do** make interactive elements pills (999px) and give them a real hover response — a lift, a fill change, or a padding shift like the project row.
- **Do** preserve every verified metric's value and label across responsive and zoom-driven breakpoints (The Evidence Never Drops).
- **Do** drop secondary elements at narrow widths rather than shrinking them (The Drop-Don't-Squeeze Rule).
- **Do** keep measures capped: 14ch display, 18ch headline, 54ch lead, 46–60ch body.

### Don't:
- **Don't** hardcode #f1ead8 or #1a1a18 where a semantic wall/foreground token exists — the explicit theme pairs may assign those values to opposite roles.
- **Don't** introduce a second accent color. Oxblood is the only one, and its rarity is what makes it work.
- **Don't** wrap room content in cards, panels, or bordered boxes. Structure comes from color and hairlines.
- **Don't** let the evidence marks become dashboard charts — no axes, gridlines, legends, tooltips, or value labels. This site presents BI work; it must never imitate Tableau or QuickSight chrome.
- **Don't** classify a metric value or its label as expendable breakpoint decoration; only its redundant visual mark may drop.
- **Don't** ship the default AI-portfolio look: purple-blue gradients, glassmorphic feature cards, floating 3D blobs, emoji-waving hero copy. The heritage palette and serif are the entire defense against it.
- **Don't** use gradients as fills. The only gradient-adjacent surfaces in this system are the translucent glass layers.
- **Don't** escalate font weight past 500 for emphasis — use size, italic, color, or case.
- **Don't** apply `backdrop-filter` or ambient shadow to anything that scrolls with the page (The Glass-Is-For-Floating Rule).
