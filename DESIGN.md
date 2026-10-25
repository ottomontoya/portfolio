---
name: Otto Montoya — Signal to structure
description: An evidence-led BI portfolio. Celadon surfaces, deep green accents, decisive sans-serif type, and data made visible.
colors:
  celadon: "#c5d5be"
  paper: "#f2f4ee"
  ink: "#26302a"
  green-accent: "#365d4b"
  quiet-green: "#dfe7d9"
  deep-green: "#203d30"
  night-green: "#1d2922"
  accent-on-night: "#bcd9a8"
  deep-ground: "#18221c"
  image-white: "#fff"
typography:
  display:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(64px, 6.7vw, 112px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.065em"
  headline:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(40px, 4.8vw, 76px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.055em"
  title:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  lead:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(17px, 1.35vw, 20px)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  summary:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  evidence:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "52px"
    fontWeight: 500
    lineHeight: 1.1
  label:
    fontFamily: '"DM Mono", ui-monospace, monospace'
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.055em"
  action:
    fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  square: "0px"
  pill: "999px"
spacing:
  gutter-phone: "22px"
  gutter-narrow: "18px"
  gap-compact: "24px"
  gap-reading: "48px"
  gap-wide: "80px"
components:
  cta-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.celadon}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "0 36px 0 0"
  cta-primary-dark:
    backgroundColor: "{colors.celadon}"
    textColor: "{colors.night-green}"
  text-link:
    rounded: "{rounded.square}"
    padding: "10px 0"
  site-header:
    backgroundColor: "{colors.celadon}"
    textColor: "{colors.ink}"
    height: "80px"
  site-header-dark:
    backgroundColor: "{colors.night-green}"
    textColor: "{colors.celadon}"
  theme-toggle:
    width: "44px"
    height: "44px"
    padding: "11px"
  work-index-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "27px 0"
  published-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "24px 16px 24px 0"
  evidence-panel:
    backgroundColor: "{colors.celadon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "35px"
  evidence-panel-dark:
    backgroundColor: "{colors.night-green}"
    textColor: "{colors.celadon}"
  case-disclosure:
    rounded: "{rounded.square}"
    padding: "27px 0"
  contact-action:
    textColor: "{colors.ink}"
    padding: "26px 30px"
---

# Design System: Otto Montoya — Signal to structure

## Overview

**Creative North Star: "Signal to structure"**

Precise, capable, and visually curious. Data organized into a useful system is the established metaphor: large sans-serif propositions, explicit evidence, open reading surfaces, and short motion that organizes existing marks. “Inside the decision” is the subordinate case-reading pattern; it does not introduce a second identity.

Celadon + ink remains the approved palette. The interface is spacious at the level of a section and compact at the level of a fact. Filled pills, ruled rows, and geometric evidence distinguish actions, records, and illustrations. The previous repeated serif-room compositions and floating glass navigation are superseded. No gradients, ornamental glow, or fabricated interface chrome.

**Key Characteristics:**

- Evidence quantities and qualifiers stay readable independently of graphics.
- Celadon surfaces and green accents pair with decisive DM Sans; DM Mono is reserved for brief metadata.
- Flat sections, hairline dividers, square evidence panels, and rounded actions establish hierarchy.
- Short evidence sequences resolve to still reading states; deliberate pointer feedback remains available.
- System-following light and dark palettes preserve the same identity and information.

### Scope and sources

This is a merged record of the current working implementation, including the project index, published links, prototype gallery, and case scrolling additions. It preserves the approved identity and existing decisions; it is not a new visual direction or a deployment record. Product/audience context remains in `PRODUCT.md`, content constraints in `AGENTS.md` and `data/`. The token blocks follow the [DESIGN.md format](https://raw.githubusercontent.com/google-labs-code/design.md/main/docs/spec.md).

Runtime colors come from `public/theme.css`; typography, geometry, and states come from `portfolio.css`. The frontmatter records reused values and default desktop/light component assignments. Semantic CSS variables remain the way to implement theme-aware components. Responsive overrides, motion, depth, and full component specimens live below and in `.impeccable/design.json`. Extracted spacing names describe repeated values; the app does not enforce a universal spacing scale.

## Colors

Celadon + ink pairs pale green fields with green-black reading surfaces. Keep the established descriptive names; use semantic foreground/background pairs when implementing a component.

### Primary

- **Green Accent** (`green-accent`): case headings and evidence on the light reading surface.
- **Pale Green** (`accent-on-night`): the equivalent dark-reading accent and the career section's emphasis.

### Secondary

- **Celadon** (`celadon`): the opening, header, work/case reading surfaces, evidence panels, and contact field in light mode; text and inverse interaction fills in dark mode.
- **Quiet Green** (`quiet-green`): the light About surface and quiet gallery backing.
- **Deep Green** (`deep-green`): the Skills/process field in both themes.

### Neutral

- **Paper** (`paper`): retained as a reference swatch; interface reading surfaces and dark-section foregrounds use Celadon instead. Original screenshot pixels are preserved.
- **Ink** (`ink`): light-mode body text and the dark About ground.
- **Night Green** (`night-green`): career/image-viewer ground in both themes and opening field in dark mode.
- **Deep Ground** (`deep-ground`): dark Work and case-reading surface.
- **Image White** (`image-white`): screenshot backing in light mode. The cursor uses white only as the input to difference blending, not as another brand accent.

### Semantic pairings

| Surface | Light foreground / background | Dark foreground / background | Runtime pair |
| --- | --- | --- | --- |
| Opening, header, evidence, contact | Ink / Celadon | Celadon / Night Green | `--on-field` / `--field` |
| Work, case, page | Ink / Celadon | Celadon / Deep Ground | `--ink` / `--ground` |
| About | Ink / Quiet Green | Celadon / Ink | `--ink` / `--quiet-ground` |
| Skills / process | Celadon / Deep Green | Celadon / Deep Green | `--on-wine` / `--wine` |
| Career, image viewer | Celadon / Night Green | Celadon / Night Green | `--on-night` / `--night` |

The runtime name `--wine` is retained for compatibility; it resolves to Deep Green. The solid header uses the opening pair across every section. The monogram and browser theme color follow the active theme; favicons and the social preview keep the approved Celadon identity.

Work rows, published links, liquid CTAs, selection, case readers, and no-JavaScript pages share these tokens. Inverse states use Deep Ground on Celadon in dark mode and Celadon on Ink in light mode; avoid near-white interaction flashes.

**The Foreground Pair Rule.** Switch foreground and background together. Theme changes are immediate; do not animate one color across the other or invert screenshot pixels.

### Dark mode: Signal after hours

Every page load follows the system color preference, including live changes until the visitor switches themes manually. A 44px sun/moon button in the header overrides the theme for the current visit only. Reloading or opening another page returns to the system setting. Previously saved `portfolio-theme` values are ignored, and the toggle no longer writes a persistent preference. The head bootstrap applies the system setting before the first paint. CSS provides the system fallback without JavaScript. Case readers inherit the active palette. Dashboard screenshots use a brightness-only display adjustment of 68% in dark mode, shared by the homepage preview, case gallery, image viewer, and no-JavaScript reading edition. This softens large white surfaces without inversion, hue rotation, or source-asset edits. Hover and focus do not brighten images. The dark image viewer offers an explicit “Original brightness” toggle, with the comfortable dimmed presentation restored whenever an image opens. Light mode presents the original brightness. Theme changes are immediate to keep all surface/foreground pairs in sync; only the control's hover response moves, and reduced motion disables it.

## Typography

**Display and body:** DM Sans, with UI sans-serif/system fallbacks. **Metadata:** DM Mono, with a UI monospace fallback. The pairing is upright, direct, and information-led; it does not use serif or italic display accents.

### Hierarchy

The frontmatter's display and headline roles describe the hero and standard section heading; title describes case narrative headings; body describes case narrative paragraphs; summary describes compact governance prose. They are observed roles, not a modular ratio applied to every element. Collection titles, case titles, contact headings, and evidence values retain their component-specific sizes.

- **Display:** tight tracking, almost solid line spacing, and deliberate line breaks. At widths up to 1100px the hero uses `clamp(53px, 6.5vw, 78px)`; up to 800px, `clamp(58px, 10.7vw, 90px)`; up to 560px, `clamp(48px, 12vw, 67px)`; and up to 360px, 44px.
- **Headline:** section hierarchy; upright medium-weight phrases provide emphasis without changing family.
- **Title:** descriptive green case headings. At widths up to 800px they reduce to 25px; case paragraphs become 16px at 1100px and below.
- **Lead and body:** reading measures follow context: the general lead is capped at 49ch, the hero at 44ch, the case result at 50ch, and gallery captions at 70ch.
- **Evidence:** DM Sans Medium 500 for headline quantities, diagram labels, chapter and process numbers, and secondary phrases. Hero counts scale from 76–152px on desktop, while the case metric uses the frontmatter's evidence role. Preserve `~` and `+` at every size.
- **Label:** short uppercase metadata with tracked DM Mono. The default is the frontmatter's label role; local 10–12px variants exist. Tools, ordinary captions, navigation, and most eyebrows use DM Sans.
- **Action:** normal-weight sans. Liquid arrow CTAs use an explicit 16px label at every width, a 40px height, 24px label side padding, and a 12px inline SVG icon. Other utility actions retain their existing component sizes.

Two local WOFF2 files are loaded: variable DM Sans (100–900, including true weight 500) and DM Mono Regular. Only DM Sans preloads. Font licenses remain alongside the assets in `public/assets/type/`.

**The Evidence Never Drops Rule.** Exact values, labels, and qualifiers remain readable at narrow widths and at browser zoom. Only a redundant graphic may be omitted, never the evidence it represents.

## Layout

The shared content shell is `calc(100% - 2 × gutter)` with a 1380px maximum. Its default gutter is `clamp(20px, 4.5vw, 80px)`, overridden to 22px at 560px and below and 18px at 360px and below. The page changes density deliberately:

```
Opening       proposition            | exact count illustration
              actions                | governance case entry
              three supporting career facts
Work          six-project heading    | short introduction
              compact governance reasoning
              real prototype image, full width
              four-project index with persistent evidence
              two published case-study links
About         large personal statement | prose and two compact working examples
Skills        five connected stages, with complete descriptions
              toolkit grouped by discipline
Experience    introduction           | compact chronological path
              three education entries
Contact       large ruled links      | question and email panel
              role, location and LinkedIn
              oversized signature, tagline and return link
```

Primary actions use pills; the closing email pill follows the pointer within a square contact panel. Project studies are open compositions on the room surface, not rounded cards. Lines separate information, and geometric evidence marks do not imitate client documents or dashboard chrome. Figures without cleared screenshots use only existing evidence quantities and names.

The mobile layout is composed separately: the headline leads, both governance endpoints follow, and all career metrics remain present. Project-index rows keep their title, tools, scope, and evidence in a compact vertical arrangement; the process becomes a vertical sequence of named phases; experience and contact use a natural reading order. The prototype preview may crop on the homepage, but all complete screenshots are available inside its case and image viewer.

### Responsive boundaries

| Condition | Implemented change |
| --- | --- |
| At least 1500px | Hero column gap becomes 100px. |
| 1280px and below | Open navigation panel changes from 28vw to 40vw. |
| 1023px and below | Navigation's secondary project-card column is hidden; Work still exposes every project. |
| 768px and below | Open navigation panel fills the available width within 18px side gutters. |
| 1100px and below | Tighter columns, smaller hero, two-column governance feature; prototype gallery returns to normal flow. |
| 1099px and below | Compact project-index columns and hidden “View project” text; the arrow and full row remain actionable. |
| 1050px and below | Footer columns tighten and the contact details stack. |
| 800px and below | Header becomes 70px, hero and About stack, process becomes a vertical sequence, and toolkit becomes two columns. |
| 759px and below | Footer contact panel and navigation stack; pointer-following and signature entrance stop. |
| 700px and below | Index/published rows and gallery captions reorganize; the index metric stays beside its label below the title. |
| 560px and below | Header becomes 66px and case evidence/narrative stack. |
| 360px and below | Narrow gutter and typography; case controls remain accessible inside the navigation panel. |

Decorative floating previews require at least 1100px width, 540px height, a fine hover pointer, and no forced colors. The image parallax threshold is strictly above 1100px. Reduced motion changes animation behavior rather than removing evidence.

Project View narrative chapters use descriptive green headings (The constraint, The decision, How it was checked). Headings and body copy share one left edge. The narrative column distributes spare height between chapters beside the evidence panel; there are no chapter divider lines. Stacked mobile sections retain natural content spacing.

## Elevation & Depth

Depth is primarily tonal and structural: section surfaces, solid foreground/background inversions, square evidence panels, and hairlines. The header is opaque and unshadowed. Cards do not acquire a general elevation ladder.

### Shadow vocabulary

The floating evidence preview alone uses `0 8px 20px rgb(24 34 28 / .08)`, a small separation cue over the page. The case reader and image viewer are full surfaces without the old glass-nav or deep image-shadow effects.

**The Flat Reading Surface Rule.** Keep ordinary reading content flat. Use the existing preview shadow only for the decorative panel that sits above it.

### Dividers and stacking

Shared rules use `color-mix(in srgb, currentColor 24%, transparent)`; the reusable wash is `color-mix(in srgb, currentColor 7%, transparent)`. Both follow their containing foreground. Fixed previews sit at layer 2, the site header at 30, case reader at 100, image viewer at 110, and skip link at 200. The pointer's decorative layer sits above all of these and never receives input. These are implementation layers, not additional surface styles.

## Shapes

The recurring forms are open rectangular records, square-cornered evidence and image stages, thin ruled separators, pill actions, circles, and exact geometric marks. Rounded shapes distinguish controls and diagram geometry rather than wrapping every project in a card.

- **Pills:** fully rounded primary actions and image-viewer controls use the frontmatter pill radius. The phone image-enlarge strip becomes square and full width.
- **Circles:** the theme button, timeline dots, and pointer use 50% rounding. The footer contact panel stays square; its email action is a pill.
- **Records and panels:** no decorative corner radius on the work rows, evidence panel, case surface, or prototype image stage.
- **Navigation exception:** the approved menu panel, project shortcuts, and All six projects action have 16px corners. The 44px closed menu control remains circular. Do not use ticket-shaped notches.
- **Borders:** most rules and control outlines are 1px. The general keyboard focus outline is 2px with a 5px offset; individual controls pull it inside where needed. The prototype gallery image uses a 3px accent focus outline inset 6px.
- **Evidence geometry:** the governance count field has 696 marks and 12 outlines. Other marks derive from the project's typed evidence. Shape is never permission to invent client topology or screenshots.

## Components

### Buttons, links, and theme control

Standalone forward CTAs use the supplied Liquid Arrow Button: View work, the hero and featured governance case openers, the published case-study link in the case evidence panel, Discuss a similar project, and the application missing-page recovery link. Each remains one native anchor or button with its original label, destination, accessible name, and dialog behavior. Row-sized project links, header navigation, copy/replay/image controls, and the footer's contact panel and section links keep their own interaction patterns.

The liquid control pairs `--ink` / `--ground`, or `--on-field` / `--field` on colored panels. Its one clipped surface joins a stationary label pill to an arrow circle at rest. Hover, visible keyboard focus, or touch press separates the circle by 11.8px and rotates its diagonal arrow 45 degrees. The supplied field sampling, mirrored contours, tip root search, final 10% taper, and exact endpoint arcs remain intact. The 880ms transition uses cubic-bezier(.14, .9, .16, 1); reversal starts at the current value with duration proportional to the remaining distance. Nothing loops after settling.

Keep the 40px height, 16px label, 24px label padding, 12px icon, and 4px overlap at every breakpoint. Reserve the travel in the layout; do not scale the control or its ancestors. Between 561px and 700px, the governance feature and case-reading grids containing a published CTA stack to leave room for the full control. Press shifts it down 1px. Keyboard focus has a 2px outline in the surface color with a 2px offset. Reduced motion snaps to the interaction state, including live preference changes; forced colors uses ButtonText, ButtonFace, and Highlight. ResizeObserver rebuilds the geometry after layout or font changes. Each React instance releases its listeners, observer, and animation frame on unmount.

Outside the liquid controls and footer section rows, directional arrow glyphs travel along their direction while an action is hovered, focused, pressed, or selected: 650ms ease-in-out, alternating until that state ends. Labels remain stationary. This is a deliberate state-bound loop; evidence artwork settles after its short sequence. Reduced motion disables both CSS animations and transitions.

The circular theme control is 44px square. Hover inverts the opening pair and rotates the sun/moon icon 18 degrees; press moves it down 1px; focus uses a 2px outline offset 3px. The site's ordinary controls are keyboard-operable semantic links, buttons, or disclosures. There is no form-input or chip component system to document.

### Evidence panels and expandable context

The case evidence panel is square, filled with the opening pair, and padded 35px on desktop, with responsive 28px/24px/25px/20px overrides. It sticks 32px below the case viewport top until the mobile reading stack. A large metric leads its small explanatory label; source/disclosure copy remains visible below a rule.

Expandable context uses native `details` / `summary`, ruled above and below. The summary is 23px with 27px vertical padding (21px on phones); hover underlines its label, and the plus rotates 45 degrees when open. Opening the disclosure reveals context, responsibilities, and impact in two columns, then one on phones. It adds no fabricated inputs or badge styles.

### Navigation and case reader

The approved navbar uses a Pensatori-inspired expanding panel, adapted to the portfolio's solid surfaces and real project content. The original outlined circular theme toggle sits left of an always-filled circular menu button, with a 12px gap. Both share the header's centered, 1380px maximum-width shell, including on wide monitors. There is no decorative Menu label, Explore heading, separate column-toggle arrow, or duplicate footer theme toggle.

The menu grows from its 44px control into a 92dvh panel. Home, Work, About, and Contact reveal with ruled separators. Hover, keyboard focus, and press fill a band and turn its arrow −35 degrees; text keeps its size and moves 10px like the footer rows. The panel, cards, and expansion action use 16px rounded corners. Light-mode panels use Deep Green/Celadon; dark-mode panels use Celadon/Ink. All six projects retains a Celadon fill with Deep Green text in both themes.

On desktop, five existing case studies enter beside the panel with a staggered translation and settle without rotation. All six projects expands that column into a scrollable list; shorter viewports also scroll the column so card content remains readable. The cards scatter out when closed. Project order and labels are shared from `data/navigation.ts` and existing work/project data, with no invented imagery or metrics. Mobile retains the main links and contact destinations. Reduced motion settles immediately; forced colors use system surfaces. Only the existing Lenis owner is paused while the menu is open. The background and header identity are inert; Tab stays in the menu, Escape dismisses it before a case, and dismissal restores the trigger. Selection hands focus and history to the destination. Both reading editions expose the same section links and six project destinations.

Cases occupy the full viewport with their own scrolling surface and the shared site navbar. The identity, shell, Celadon/night surface, responsive sizing, link feedback, and theme toggle match the homepage. Project controls replace the panel's section links with All work, Previous, and Next; a visible All work control and the brand also return to the preserved page. Project identity stays in the heading immediately below the navbar. The header remains visible while the case scrolls and becomes inert beneath an open image viewer. They retain modal semantics because the underlying home position is preserved. The visible sequence is title → result and metadata → evidence beside constraint/decision/verification → full imagery where available → expandable context/responsibilities/impact → contact and previous/next.

`#p1`–`#p6` are durable URLs. Opening from home pushes one entry; previous/next replaces that entry; browser back or close restores the page. Direct project URLs open immediately and close by removing only the project hash. The document title follows the active case.

Previous and Next retain the destination project title in their accessible names. Every header control remains at least 24px wide and 44px tall; the theme and menu controls remain 44px circles.

The background is inert while a case is open. Focus moves into the case and stays there. Escape closes an image before its case. Closing returns focus to the original opener without moving the saved page, or to the corresponding project trigger for a direct link. All existing trigger IDs remain available. Image viewing supports fit/zoom, responsive sources, a keyboard-focusable scroll region when zoomed, and focus return to the image button. Zoom enlarges beyond the viewport even on wide desktops. A single scroll-padding reservation keeps section anchors clear of the header.

### Work index, published work, and prototype gallery

The approved Details-inspired additions extend the existing identity in three places. The four smaller studies become a ruled **More work** index. Every row keeps its actual metric, label, and qualifier in the layout at every width; selecting it opens the existing project reader. On large screens with a fine pointer, one decorative evidence panel follows the pointer within viewport bounds. Keyboard focus places it in a stable position. Movement settles on demand and stops on leave, scroll, resize, preference changes, or unmount. Reduced motion places the preview immediately without interpolation; the content remains available. Touch and short viewports use the complete rows without a floating panel.

**Published work** follows the index and links only to the two existing STX Next case studies. Large ruled titles invert on interaction, the case-study label rolls to an invitation, and a decorative evidence panel opens at the lower right on supported desktops. The contribution note distinguishes Otto's implementation work from the wider delivery stories. Neither collection introduces client imagery or new claims.

Inside the manufacturing case, **Inside the prototype** presents all four existing screenshots once, in process overview → detailed metrics → fleet → asset order. Chapter titles and captions explain what to inspect while the original image descriptions and responsive sources remain intact. The internal-environment, supplied-mockup, and dummy-data boundaries remain explicit. Each image opens the existing fit/zoom viewer.

On desktops wider than 1100px, each screenshot sits in a full-width clipped stage measured to the case viewport height. Its image canvas moves from −80% to +80% of its own height, linearly scrubbed as the stage travels from the bottom to the top of the case viewport. The full screenshot is contained inside the canvas and readable at the centered state; headings remain above the image, with a short once-only word-opacity reveal. Captions follow in normal flow. The gallery uses the existing case scroll owner without chapter pins. Small screens, reduced motion, and forced colors show complete screenshots in ordinary document flow. Pressing Tab in the case restores that static layout for the current case opening before focus moves; reopening the case creates a fresh gallery. Opening and closing the fit/zoom viewer preserves the reading position and restores focus without scrolling; closing the case removes gallery animations and observers.

Presentation copy lives in `data/workPresentation.ts`; both reading editions are generated from it alongside the existing project records. All three additions use existing fonts, palette tokens, images, and dependencies. References: [recognition rows](https://www.details.so/inspo/henriheymans-9rn1mu), [project index](https://www.details.so/inspo/clementgrellier-axv2mq), and [image parallax](https://www.details.so/inspo/dgrees-ad7atc). The implementation follows the approved local preview and adapts those mechanisms to this site's content and accessibility requirements.

### Contact finale: An invitation and a signature

The approved footer combines [MONOLOG's ruled navigation](https://www.details.so/inspo/bymonolog-b769c7) with [Estrela's contact panel and oversized signature](https://www.details.so/inspo/estrela-ckaltf). It is a separate landmark after career history, on Celadon and Ink in light mode and Night Green and Celadon in dark mode. The animated halftone band and numbered link labels were removed during the preview review.

Work, About, and Experience form three large ruled links. Each retains a right arrow that turns toward the upper right on hover or keyboard focus. The row fills with `--on-field` and its heading/arrow switch to `--field`, matching the contact panel exactly in either theme. The background enters over 300ms and leaves over 650ms; the label shifts 10px with the existing expo-out easing family. Keyboard focus has an inset outline and touch receives the same pressed fill.

The full rectangular question panel is one native email anchor. Its fill rises from the bottom; the question remains on two lines. On fine-pointer desktop input, the email pill follows the pointer directly, centered beneath it until the 12px panel-edge limit keeps the full pill inside. It uses its actual layout origin, without a magnetic offset or delayed catch-up. On leave, cancellation, blur, visibility changes, or keyboard navigation it returns to rest. Scroll and layout changes refresh its geometry. Touch, reduced-motion, and forced-colors users retain a stationary email action. The selected email address and copy control remain separate beneath the panel.

Role, location, and LinkedIn lead into the oversized Otto Montoya wordmark. Its decorative letters enter once on desktop; the accessible name stays available, and reduced motion or mobile shows the complete name immediately. A single ruled colophon contains copyright, the existing BI tagline, and the return link. Phones stack the contact panel above navigation, then show the signature and colophon. There is no continuously animated decoration.

Footer copy and destinations live in `CONTACT` and `FOOTER_NAV_ITEMS`. Both reading editions include the navigation, role, signature, tagline, and contact content. No new asset, typeface, palette color, or dependency is introduced.

### Evidence motion, pointer, and scrolling

The count illustration uses one scoped GSAP timeline, cleaned up on unmount and rebuilt through `matchMedia` when motion preference changes. A roughly two-second ordered-dither wave passes through the 696 existing SVG dots: fixed 4×4 Bayer thresholds stagger a stepped halftone bloom, then each mark settles into the original crisp grid. At 1.1 seconds, the 12 dotted group outlines begin resolving left to right into solid frames, completing the sequence at about 2.2 seconds. Their six-unit dash period stays fixed while the gaps close in place. Only scale, opacity, and stroke dashes animate; every mark stays present, while the numbers and captions remain steady. There are no connectors or implied assignments between paths and groups. Playback pauses offscreen or in a hidden tab and finishes once, with an explicit Replay control. Reduced motion removes the animation and replay button; the static composition remains complete. No canvas, WebGL, additional marks, or new dependency is needed.

After the entrance finishes, a fine mouse/trackpad pointer activates a localized hover response in the hero illustration. Dots within 72 SVG units of the cursor enlarge in ordered-dither steps up to 2×, easing back into place as the pointer moves away. Each hovered group expands to 1.03×, resolves a dotted border to solid, and fades in a 12%-opacity fill using the existing ink foreground over 320ms. The scale and fill return to the original empty outline over 250ms on exit. A single on-demand frame loop stops when the response settles. Replay, scrolling, resize, offscreen/hidden state, and motion-preference changes reset hover geometry and fill. Touch and reduced-motion users receive the complete static illustration without the pointer response. The artwork remains decorative, with no new controls, tab stops, or implied group assignments.

#### Project evidence 02–05

The motion extension keeps React, the existing GSAP dependency, and every approved illustration. Three approaches were considered: organize each project's actual marks, apply one shared hover ripple, or keep the figures looping. Project-specific organization best explains the existing evidence while leaving a calm reading state.

- **02 / Dashboard delivery:** the 15 outlined tiles register into their grid in reading order, then their existing baseline strokes extend. The approximate qualifier stays in the fixed metric; the artwork never pretends to show client dashboards.
- **03 / Source consolidation:** three source-line endpoints travel toward the shared outcome in sequence, followed by a small directional movement of the arrow. Endpoint dots stay fully opaque throughout their travel so the underlying line never shows through them.
- **04 / Report stack + four modules:** the selected second preview replaces the paired circles with an abstract report stack beside four application modules. The modules contain four distinct geometric motifs: a stepped path, a branch, converging paths, and validation rows. These are illustrative shapes, not a reconstruction of any app's fields, UI, or business rules. Report sheets slide into registration while the four modules assemble with a small stagger; each terminal mark settles at full size from its left edge. Connector paths stop at node boundaries, keeping the outlined squares and circles clear inside. The sequence finishes in about two seconds. Labels and the two-track metric remain stationary. Paper fills match the surrounding work or case surface in both themes. The project reader retains the caption about client screens and report counts; the main-page illustration omits it. The caption remains in the generated detailed project content.
- **05 / Time-grain consolidation:** five endpoints start at staggered times and arrive together, followed by the same outcome-arrow response. Timing is illustrative, not a measurement of reporting frequency or data latency.

Each figure has a scoped GSAP timeline lasting less than three seconds. It plays when at least 30% of the figure enters the viewport, resumes if interrupted, and replays on a later entry after completing. When used in the case readers, mouse entry into the evidence region and keyboard focus entering its existing controls can replay a completed sequence, without interrupting one in progress or adding tab stops. In the work index, the decorative preview mounts the same evidence on row activation. Touch gets the entry sequence without depending on hover. Timelines pause offscreen, in hidden tabs, and underneath an open case reader. Navigation and live motion-preference changes revert their styles and remove observers and listeners. Only transforms and opacity animate; labels, counts, layout, and colors stay fixed. The case readers share these behaviors.

The page is intentionally still after each short sequence. This is a reading-oriented professional portfolio, and endless decorative movement would compete with its evidence. No loader or WebGL is needed. Pointer, focus, and press feedback belong to the same restrained motion language. Under reduced motion, transitions and evidence animation stop without hiding content.

The approved pointer treatment is a solid dot inspired by Bitemark Studio: 10px at rest, growing to 20px over links, buttons, and disclosure controls, and 15px while pressing an action. It follows the mouse immediately; its hover and press size changes ease over 160ms. After the hover enlargement finishes, the dot breathes between 20px and 17px on a two-second ease-in-out cycle, staying visibly larger than its resting size. This CSS pulse runs only while hovering an action and stops on press or exit. A white fill with difference blending inverts the rendered colors beneath it. The decorative layer sits outside the application's inert content and above case and image readers, adds no tab stop, and never intercepts input. The native cursor is hidden only while the replacement is positioned and visible. Touch, keyboard navigation, reduced motion, forced colors, form controls, native drag targets, and scrollbars retain native cursor behavior. During ordinary text selection and click-hold, the custom dot remains visible and the native cursor stays hidden; text selection itself remains native. Leaving the window or switching preferences clears the dot; the next eligible mouse movement restores it. Without JavaScript the native cursor remains. No JavaScript animation loop or additional dependency is needed.

Page scrolling follows mkdir.directory: Lenis with 0.1 wheel interpolation and 1.2-second cubic ease-in-out anchor transitions. Native document coordinates, sticky positioning, anchor clearance, URL history, and keyboard focus remain intact. Touch gestures stay native. While a case reader is open, the homepage controller is removed and the background stays locked; the case's existing scroll container uses its own controller with the same wheel interpolation. Switching projects cancels outgoing inertia and starts at the top. Opening an image removes the case controller, preserving the reading position while the image viewer scrolls natively; closing the image restores case smoothing. Reduced motion disables Lenis entirely, including when the preference changes during a visit; native scrolling and the CSS/no-JavaScript fallback remain available.

OverlayScrollbars removes the browser's reserved scrollbar gutter while preserving the native document and element scroll containers. Handles sit over the page with fully transparent tracks, using Green Accent on the page and Celadon in the always-dark image viewer. A fine contrasting outline keeps the handle visible over different section colors. Handles auto-hide after one idle second and support dragging and track clicks. Without JavaScript, a themed native scrollbar remains available; forced-colors mode uses system scrollbars, and reduced motion removes the fade.

## Do's and Don'ts

### Do:

- **Do** use semantic theme pairs and retain the approved Celadon + ink identity.
- **Do** keep exact evidence values, labels, and `~` / `+` qualifiers readable at every width.
- **Do** distinguish illustrative geometry from client topology and keep prototype provenance beside the screenshots.
- **Do** reuse the shared header, hash-linked case reader, focus restoration, and existing image viewer.
- **Do** preserve reduced-motion, forced-colors, touch, keyboard, and no-JavaScript paths.
- **Do** edit substantive copy in data and keep generated reading editions equivalent.

### Don't:

- **Don't** restore the superseded serif-room typography, oxblood palette, or floating glass navigation.
- **Don't** add gradients, ornamental glow, client names or logos, fabricated screenshots, testimonials, or unverified metrics.
- **Don't** imply that the manufacturing prototype used real client data or shipped to production.
- **Don't** hide metric text to make a mobile layout fit or rely on a floating preview for essential information.
- **Don't** apply screenshot inversion or hue rotation, or persist a manual theme choice across visits.
- **Don't** describe local build/browser checks as deployment or real-device verification.

### Evidence and content boundaries

**The Reconstruction Is Explicit Rule.** The governance artwork says “Count illustration, not an access map.” Other evidence graphics derive from typed quantities, named sources, or delivery tracks. They do not imply a real schema, formal artifact, or unknown measurement. Approximate and minimum figures retain their `~` or `+` labels.

**Anonymity is structural.** Keep generic client descriptions. No client names, logos, testimonials, fictitious screenshots, or invented outcomes. Only the two existing STX Next case-study links are approved.

**The prototype stays a prototype.** All p6 screenshots are the internal QuickSight implementation of a supplied mockup using dummy data. Retain attribution and the explicit no-production/no-adoption boundary, including beside image sequences.

**Copy stays in data.** Preserve project descriptions, decision records, responsibilities, impact, tools, experience, education, and contact. `npm run generate:static` mirrors substantive copy into `public/llms.txt` and the `<noscript>` block. The build runs this generation automatically.

### Restraint

The site-specific anchor is the governance transformation. Source consolidation and actual internal prototype screenshots sustain the idea beyond the hero. The repeated italic-heading treatment and floating glass pill were removed to make room for a stronger hierarchy. The existing palette, factual copy, and client boundaries prevent the redesign from becoming a generic creative-agency gallery.

### Verification contract

Run `npm run build`, generated-content parity, and `git diff --check`. Review production screenshots at desktop and phone widths, in both themes, including system preference changes, ignored legacy saved preferences, visit-only overrides, reloads, and keyboard operation of the theme toggle. Exercise all six direct hashes, project history, close/focus restoration, keyboard traversal, image fit/zoom and return, reduced motion, no-JavaScript reading, email copying, and anchor clearance. Verify 320px through large desktop widths and 200% zoom. A styled missing-page view and generated public/404.html provide a recovery link; live hosting status codes must be checked after deployment. Local verification is not deployment.
