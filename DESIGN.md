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
---

# Signal to structure

Approved direction: **Signal to structure** for the identity and **Inside the decision** for case reading. This replaces the earlier “Work on the desk” and repeated serif-room compositions. Content, anonymity, truthful evidence, responsive behavior, and accessible contrast remain commitments.

## Brief

Otto is a Data Analyst / BI specialist. Hiring managers and technical recruiters are the primary audience; prospective clients are secondary. Establish ownership, scale, and native dashboard implementation craft quickly, then make the reasoning inspectable. This is an existing React 18 / TypeScript / Vite application; keeping its framework and hash navigation preserves established content and browser behavior.

## Concept card

- **Idea:** Give every project a recognizable visual form derived from its actual evidence.
- **Metaphor:** Data organized into a useful system.
- **Signature:** An exact 696-mark field settles into order alongside 12 group outlines. This illustrates the two known counts, not client topology, user-to-group assignments, or intermediate measurements.
- **Emotion:** Precise, capable, visually curious.
- **Motion verb:** Organize. Primary arrows move along their direction; images and controls lift slightly; the evidence resolves through one GSAP timeline.
- **Screenshot:** A pale Celadon opening with dark ink and an oversized sans-serif proposition beside 696 marks and 12 outlines.

Three territories were considered: data as a visual material (Signal to structure), a strict typographic project index (The working index), and the working process as narrative (Inside the decision). The first is the strongest identity anchor. The third supplies the subordinate reading pattern inside cases; the site does not switch between multiple competing identities.

## Color and type

**Celadon + ink** is the selected palette, approved after the palette exploration on 2026-10-18. No gradients, ornamental glow, or fabricated interface chrome.

| Role | Color |
| --- | --- |
| Opening, header and evidence surface | Celadon `#c5d5be` |
| Text and monogram on Celadon | Ink `#26302a` |
| Work and case surface | Paper `#f2f4ee` |
| Work and case text | Ink `#26302a` |
| Accent on work | Green Accent `#365d4b` |
| About surface | Quiet Green `#dfe7d9` |
| Process surface | Deep Green `#203d30` |
| Process text | Paper `#f2f4ee` |
| Career and image viewer | Night Green `#1d2922` / Paper `#f2f4ee` |
| Contact finale | Opening field / opening foreground, following the active theme |
| Accent on night | Pale Green `#bcd9a8` |

Colors are semantic CSS tokens in `public/theme.css`, shared by the app and static 404. The solid header uses the opening surface and foreground pair in each theme, so it stays readable across chapter boundaries. The image viewer follows the night pair; hover controls invert that pair. Favicons and the social preview retain the approved Celadon identity. The header monogram and browser theme color follow the active theme.

### Dark mode: Signal after hours

Requested on 2026-10-18. Keep the existing evidence-led composition, typography, motion, and light palette. The same 696 marks and 12 outlines become pale Celadon on Night Green, extending the established identity into a quiet evening reading surface. No gradients, glow, image inversion, or extra decorative animation.

| Dark role | Color |
| --- | --- |
| Opening, header and evidence surface | Night Green `#1d2922` |
| Opening text and evidence | Celadon `#c5d5be` |
| Work and case surface | Deep Ground `#18221c` |
| Reading text | Paper `#f2f4ee` |
| Accent and evidence on work | Pale Green `#bcd9a8` |
| About surface | Ink `#26302a` |
| Process, career and image viewer | Existing Deep Green and Night Green pairs |
| Contact finale | Night Green / Celadon, matching the opening |

Every page load follows the system color preference, including live changes until the visitor switches themes manually. A 44px sun/moon button in the header overrides the theme for the current visit only. Reloading or opening another page returns to the system setting. Previously saved `portfolio-theme` values are ignored, and the toggle no longer writes a persistent preference. The head bootstrap applies the system setting before the first paint. CSS provides the system fallback without JavaScript. Case readers inherit the active palette. Dashboard screenshots use a brightness-only display adjustment of 68% in dark mode, shared by the homepage preview, case gallery, image viewer, and no-JavaScript reading edition. This softens large white surfaces without inversion, hue rotation, or source-asset edits. Hover and focus do not brighten images. The dark image viewer offers an explicit “Original brightness” toggle, with the comfortable dimmed presentation restored whenever an image opens. Light mode presents the original brightness. Theme changes are immediate to keep all surface/foreground pairs in sync; only the control's hover response moves, and reduced motion disables it.

- **DM Sans:** primary display, body, and navigation. Hero 64–112px on desktop; phone 44–67px. Large headings use tighter tracking, roughly −0.045 to −0.065em. Reading copy is generally 16–20px; compact project summaries 15px and process descriptions 14px.
- **DM Sans Medium 500:** approved Option A for evidence values, diagram labels, chapter and process numbers, and secondary phrases. Accents are upright; weight, scale, and the established accent colors provide emphasis. Primary headings, body copy, and navigation keep their existing weights. Named diagram labels scale with their container to remain inside their shapes on phones and in case readers.
- **DM Mono Regular 400:** brief metadata only, 10–12px. Tool names and most captions use DM Sans rather than repeating uppercase mono throughout the page.
- Two local WOFF2 files are loaded: the existing variable DM Sans file (including true weight 500) and DM Mono Regular. Only DM Sans preloads. Font licenses remain alongside the assets.

## Composition

A fluid gutter runs from 22px on phones to 80px on large screens, within a 1380px content maximum. The page changes density deliberately:

```
Opening       proposition            | exact count illustration
              actions                | governance case entry
              three supporting career facts
Work          six-project heading    | short introduction
              compact governance reasoning
              real prototype image, full width
              four staggered evidence studies
About         large personal statement | prose and two compact working examples
Skills        five connected stages, with complete descriptions
              toolkit grouped by discipline
Experience    introduction           | compact chronological path
              three education entries
Contact       two-line question      | dotted directional email action
              email and copy         | short invitation
              identity, location and utility links
```

Primary actions use pills; the closing email uses a circular control. Project studies are open compositions on the room surface, not rounded cards. Lines separate information, and geometric evidence marks do not imitate client documents or dashboard chrome. Figures without cleared screenshots use only existing evidence quantities and names.

The mobile layout is composed separately: the headline leads, both governance endpoints follow, and all career metrics remain present. Project studies stack; the process becomes a vertical sequence of named phases; experience and contact use a natural reading order. The prototype preview may crop on the homepage, but all complete screenshots are available inside its case and image viewer.

## Contact finale: The next question

The footer is a separate landmark after career history. It returns to the opening field: Celadon and Ink in light mode, Night Green and Celadon in dark mode. The short question links the portfolio's completed BI work to the visitor's actual next problem. Its two-line silhouette is the primary composition; the email is explicit and selectable, and LinkedIn, location and the return link form a quiet final row.

Three footer territories were considered (originality / fit / feasibility / portability; lower portability is better):

| Territory | Anchor and signature | Emotion and screenshot | Scores |
| --- | --- | --- | --- |
| The next question | BI begins with a business question; the existing evidence-dot language becomes a directional email arrow | Open, precise; a two-line question opposite a dotted arrow | 4 / 5 / 5 / 2 |
| Personal sign-off | Otto's name and monogram; an oversized signature closes the page | Personal; name filling the footer | 3 / 4 / 5 / 4 |
| Decision handoff | End-to-end BI ownership; a compact question-to-decision sequence ends at contact | Methodical; a process strip beside the email | 3 / 5 / 4 / 3 |

The next question is selected because it extends the subject-specific evidence language without another process diagram or a repeated full-size identity.

- **Idea:** The work ends with a new question from the visitor.
- **Metaphor:** A question becomes a direction.
- **Signature:** The email control echoes the hero's dots. On hover or keyboard focus the dotted arrow resolves into a continuous arrow and the disc inverts. These decorative marks represent no measurement.
- **Emotion:** Approachable and decisive.
- **Motion verb:** Organize, using the existing easing family; the arrow moves along its direction.
- **Screenshot:** Two oversized lines on the opening field, a circular dotted arrow, and an immediately readable email.

The footer is deliberately still at rest. It has no entrance animation or hidden copy. Reduced motion removes transitions; the control retains immediate inversion, a visible focus outline and press feedback. On phones the email control moves above the full-width heading and the supporting paragraph follows the email. The footer introduces no assets, type families or dependencies. The final restraint pass removes repeated table labels and the generic “Made with care” sign-off.

## Case reading and navigation

Cases occupy the full viewport with their own scrolling surface and persistent return rail. They retain modal semantics because the underlying home position is preserved. The visible sequence is title → result and metadata → evidence beside constraint/decision/verification → full imagery where available → expandable context/responsibilities/impact → contact and previous/next.

`#p1`–`#p6` are durable URLs. Opening from home pushes one entry; previous/next replaces that entry; browser back or close restores the page. Direct project URLs open immediately and close by removing only the project hash. The document title follows the active case.

The background is inert while a case is open. Focus moves into the case and stays there. Escape closes an image before its case. Closing returns focus to the original opener without moving the saved page, or to the corresponding project trigger for a direct link. All existing trigger IDs remain available. Image viewing supports fit/zoom, responsive sources, a keyboard-focusable scroll region when zoomed, and focus return to the image button. Zoom enlarges beyond the viewport even on wide desktops. A single scroll-padding reservation keeps section anchors clear of the header.

## Evidence and content rules

**The Evidence Never Drops.** Exact values, labels, and qualifiers remain readable at narrow widths and at browser zoom. Only a redundant graphic may be omitted, never the evidence it represents.

**The Reconstruction Is Explicit.** The governance artwork says “Count illustration, not an access map.” Other evidence graphics derive from typed quantities, named sources, or delivery tracks. They do not imply a real schema, formal artifact, or unknown measurement. Approximate and minimum figures retain their `~` or `+` labels.

**Anonymity is structural.** Keep generic client descriptions. No client names, logos, testimonials, fictitious screenshots, or invented outcomes. Only the two existing STX Next case-study links are approved.

**The prototype stays a prototype.** All p6 screenshots are the internal QuickSight implementation of a supplied mockup using dummy data. Retain attribution and the explicit no-production/no-adoption boundary, including beside image sequences.

**Copy stays in data.** Preserve project descriptions, decision records, responsibilities, impact, tools, experience, education, and contact. `npm run generate:static` mirrors substantive copy into `public/llms.txt` and the `<noscript>` block. The build runs this generation automatically.

## Motion and interaction

The count illustration uses one scoped GSAP timeline, cleaned up on unmount and rebuilt through `matchMedia` when motion preference changes. A roughly two-second ordered-dither wave passes through the 696 existing SVG dots: fixed 4×4 Bayer thresholds stagger a stepped halftone bloom, then each mark settles into the original crisp grid. At 1.1 seconds, the 12 dotted group outlines begin resolving left to right into solid frames, completing the sequence at about 2.2 seconds. Their six-unit dash period stays fixed while the gaps close in place. Only scale, opacity, and stroke dashes animate; every mark stays present, while the numbers and captions remain steady. There are no connectors or implied assignments between paths and groups. Playback pauses offscreen or in a hidden tab and finishes once, with an explicit Replay control. Reduced motion removes the animation and replay button; the static composition remains complete. No canvas, WebGL, additional marks, or new dependency is needed.

After the entrance finishes, a fine mouse/trackpad pointer activates a localized hover response in the hero illustration. Dots within 72 SVG units of the cursor enlarge in ordered-dither steps up to 2×, easing back into place as the pointer moves away. Each hovered group expands to 1.03×, resolves a dotted border to solid, and fades in a 12%-opacity fill using the existing ink foreground over 320ms. The scale and fill return to the original empty outline over 250ms on exit. A single on-demand frame loop stops when the response settles. Replay, scrolling, resize, offscreen/hidden state, and motion-preference changes reset hover geometry and fill. Touch and reduced-motion users receive the complete static hover state. The artwork remains decorative, with no new controls, tab stops, or implied group assignments.

### Project studies 02–05

The motion extension keeps React, the existing GSAP dependency, and every approved illustration. Three approaches were considered: organize each project's actual marks, apply one shared hover ripple, or keep the figures looping. Project-specific organization best explains the existing evidence while leaving a calm reading state.

- **02 / Dashboard delivery:** the 15 outlined tiles register into their grid in reading order, then their existing baseline strokes extend. The approximate qualifier stays in the fixed metric; the artwork never pretends to show client dashboards.
- **03 / Source consolidation:** three source-line endpoints travel toward the shared outcome in sequence, followed by a small directional movement of the arrow. Endpoint dots stay fully opaque throughout their travel so the underlying line never shows through them.
- **04 / Report stack + four modules:** the selected second preview replaces the paired circles with an abstract report stack beside four application modules. The modules contain four distinct geometric motifs: a stepped path, a branch, converging paths, and validation rows. These are illustrative shapes, not a reconstruction of any app's fields, UI, or business rules. Report sheets slide into registration while the four modules assemble with a small stagger; each terminal mark settles at full size from its left edge. Connector paths stop at node boundaries, keeping the outlined squares and circles clear inside. The sequence finishes in about two seconds. Labels and the two-track metric remain stationary. Paper fills match the surrounding work or case surface in both themes. The project reader retains the caption about client screens and report counts; the main-page illustration omits it. The caption remains in the generated detailed project content.
- **05 / Time-grain consolidation:** five endpoints start at staggered times and arrive together, followed by the same outcome-arrow response. Timing is illustrative, not a measurement of reporting frequency or data latency.

Each figure has a scoped GSAP timeline lasting less than three seconds. It plays when at least 30% of the figure enters the viewport, resumes if interrupted, and replays on a later entry after completing. Mouse entry into the study and keyboard focus entering its existing controls can replay a completed sequence, without interrupting one in progress or adding tab stops. Touch gets the entry sequence without depending on hover. Timelines pause offscreen, in hidden tabs, and underneath an open case reader. Navigation and live motion-preference changes revert their styles and remove observers and listeners. Only transforms and opacity animate; labels, counts, layout, and colors stay fixed. The case readers share these behaviors.

The page is intentionally still after each short sequence. This is a reading-oriented professional portfolio, and endless decorative movement would compete with its evidence. No loader or WebGL is needed. Pointer, focus, and press feedback belong to the same restrained motion language. Under reduced motion, transitions and evidence animation stop without hiding content.

The approved pointer treatment is a solid dot inspired by Bitemark Studio: 10px at rest, 20px over links, buttons, and disclosure controls, and 15px while pressing an action. It follows the mouse immediately; only its size eases over 160ms. A white fill with difference blending inverts the rendered colors beneath it. The decorative layer sits outside the application's inert content and above case and image readers, adds no tab stop, and never intercepts input. The native cursor is hidden only while the replacement is positioned and visible. Touch, keyboard navigation, reduced motion, forced colors, form controls, native drag targets, scrollbars, and text selection retain native behavior. Leaving the window or switching preferences clears the dot; the next eligible mouse movement restores it. Without JavaScript the native cursor remains. No perpetual animation loop or additional dependency is needed.

Page scrolling follows mkdir.directory: Lenis with 0.1 wheel interpolation and 1.2-second cubic ease-in-out anchor transitions. Native document coordinates, sticky positioning, anchor clearance, URL history, and keyboard focus remain intact. Touch gestures stay native. The scroll controller is removed while a case reader is open, leaving case and image scrolling native and the background locked. Reduced motion disables Lenis entirely, including when the preference changes during a visit; native scrolling and the CSS/no-JavaScript fallback remain available.

OverlayScrollbars removes the browser's reserved scrollbar gutter while preserving the native document and element scroll containers. Handles sit over the page with fully transparent tracks, using Green Accent on the page and Paper in the always-dark image viewer. A fine contrasting outline keeps the handle visible over different section colors. Handles auto-hide after one idle second and support dragging and track clicks. Without JavaScript, a themed native scrollbar remains available; forced-colors mode uses system scrollbars, and reduced motion removes the fade.

## Genericness and restraint

The site-specific anchor is the governance transformation. Source consolidation and actual internal prototype screenshots sustain the idea beyond the hero. The repeated italic-heading treatment and floating glass pill were removed to make room for a stronger hierarchy. The existing palette, factual copy, and client boundaries prevent the redesign from becoming a generic creative-agency gallery.

## Verification

Run `npm run build`, generated-content parity, and `git diff --check`. Review production screenshots at desktop and phone widths, in both themes, including system preference changes, ignored legacy saved preferences, visit-only overrides, reloads, and keyboard operation of the theme toggle. Exercise all six direct hashes, project history, close/focus restoration, keyboard traversal, image fit/zoom and return, reduced motion, no-JavaScript reading, email copying, and anchor clearance. Verify 320px through large desktop widths and 200% zoom. A styled missing-page view and generated public/404.html provide a recovery link; live hosting status codes must be checked after deployment. Local verification is not deployment.
