# Portfolio repository guidance

## Stack and commands

- This is a React 18 + TypeScript + Vite single-page portfolio.
- Use `npm run dev` for local development.
- Run `npm run build` before handing off a change. It performs the TypeScript build and Vite production build.
- There is currently no separate test or lint command.

## Project structure

- `portfolio.tsx` is the application composition root; `src/main.tsx` mounts it.
- Reusable UI lives in `components/`.
- Portfolio copy and structured content live in `data/`; prefer editing those files instead of hard-coding content in components.
- Global styles are in `portfolio.css`.
- Static assets live in `public/`.

## Content and design constraints

- Preserve client anonymity: do not add real client names, logos, fabricated dashboard screenshots, testimonials, or unverified metrics.
- The only approved external case-study links are the two STX Next URLs already present in the project.
- When on-page content changes, update both `public/llms.txt` and the `<noscript>` content in `index.html` so crawlers and non-JavaScript visitors receive equivalent information.
- Maintain the established design system in `DESIGN.md`: heritage palette, no gradients, and accessible contrast in both themes.

## Change hygiene

- Keep changes focused and preserve existing user changes.
- Prefer accessible semantic HTML and keyboard-operable interactions.
- Do not alter generated `dist/` files unless the requested task specifically includes a production build artifact.

## Collaboration

- Any agent may create subagents for task delegation, regardless of its reasoning effort or model.

## Impeccable Critique 2026/07/25

### Action Summary
Your standing plan's first three steps are done and independently verified this run, so the order picks up from there — reordered to put your choice first, and widened to the full scope you approved.

1. /impeccable adapt — Stop portfolio.css:386-389 from hiding the metric value and label along with the SVG below 860px. Add a "View project →" affordance and the missing :active state. Fixes mobile and the 200%-zoom path in the same change. Amend DESIGN.md in the same pass with the information-structure rule you approved ("The Evidence Never Drops") — without it, the system will keep blessing this deletion at the next breakpoint.

2. /impeccable audit — The two compositing-layer contrast P0s: classify() in Nav.tsx:26-32 keying on the rendered wall instead of the theme, glass darkened over colored rooms, saturate(180%) dropped there, and the focus ring pulled inside on .cta-primary and the nav links using the outline-offset: -3px pattern that already works at :368.

3. /impeccable clarify — Restore "identified" at projects.ts:79 and :94, reconcile the p3 "GitHub community activity" string, and generate llms.txt + the <noscript> block from data/*.ts so the four hand-typed literals stop being a drift risk. Adds email and LinkedIn to both records.

4. /impeccable shape — Contact in the nav, openId into the URL hash, overlay CTA and prev/next, the 80px double-hairline gap, and the contact CTA that reads as a smudge at ~1.5:1 against its own wall. Covers two of the three design-record calls you approved.

5. /impeccable optimize — srcset and real alt text on the p6 dashboards (currently 4.2× the whole page), delete public/fonts/, drop the four dead runtime dependencies, drop DM Sans 700.

6. /impeccable polish — The overlay brass panel at 3.90:1, the hardcoded var(--burgundy) color mismatch, .overlay-x inheriting UA buttontext, the inert .mono font-size, the 22 hardcoded color-mix() calls bypassing the glass tokens, the .proj-arr hover regression, and the remaining <div> sub-headings.

You can ask me to run these one at a time, all at once, or in any order you prefer.

Re-run /impeccable critique after fixes to see your score improve.

One note worth carrying forward, saved to the plan memory: the static detector found 2 findings where live-DOM injection found 17 — the CLI can't see a client-rendered React app, so runtime injection is the only meaningful detector path for this codebase.

## Browser previews

- Never use Playwright, or any browser-automation/preview tool other than the t3-code preview (`mcp__t3-code__preview_*`), to view or interact with this app in a browser.
