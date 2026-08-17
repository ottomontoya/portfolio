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

This repository runs two multi-agent workflows side by side, one per harness. They
share every invariant above and differ only in mechanism:

- **Codex** uses the Sol → Terra → Luna workflow, configured in `.codex/`.
- **Claude Code** uses the orchestrator → manager → worker workflow, configured in
  `.claude/`.

When the stack, commands, or invariants in this file change, update both.

### Multi-agent workflow (Codex)

This repository uses an adaptive Sol → Terra → Luna workflow:

- The primary agent is the Sol orchestrator. It owns requirements, acceptance criteria, dependency ordering, product and design decisions, conflict resolution, the final diff review, and the user-facing synthesis.
- Do not delegate small, sequential tasks that Sol can complete directly.
- Sol may delegate independent, bounded, read-heavy work directly to `luna_explorer` agents.
- Sol should use one `portfolio_manager` Terra agent when work is broad, ambiguous, or crosses multiple systems. Terra decomposes and reviews that branch before returning a distilled result to Sol.
- A Terra manager may create at most two Luna tasks concurrently. Luna agents must not create further subagents.
- Prefer parallel discovery, triage, comparison, and verification. Keep related implementation sequential.
- Before parallel writes, assign explicit, non-overlapping file ownership. Never let multiple agents edit the same file concurrently.
- Keep React, CSS, shared state, generated content, and other behaviorally coupled changes under one writer unless Terra has proven the workstreams independent.
- Every Luna task must specify one outcome, scope, constraints, required evidence, stopping condition, and return schema.
- Terra validates Luna output and may redirect one failed attempt. Sol resolves anything still conflicting, incomplete, risky, or outside the approved scope.
- Sol runs or confirms the final `npm run build` and reviews the complete diff before handoff.

Project-scoped role definitions live in `.codex/agents/`. The configured concurrency cap allows the primary Sol thread, one Terra manager, and two Luna workers to run at once.

### Multi-agent workflow (Claude Code)

The same hierarchy, expressed with Claude Code subagents. Role definitions live in
`.claude/agents/`; the routing policy and task contract live in the `/orchestrate`
skill at `.claude/skills/orchestrate/SKILL.md`.

| Role | Agent | Model | Codex counterpart |
|---|---|---|---|
| Orchestrator | main session | Opus | Sol |
| Manager and critic | `portfolio-manager` | Sonnet, high effort | Terra |
| Explorer | `scout` | Sonnet, low effort | `luna_explorer` |
| Mechanical extractor | `inventory` | Haiku | — |
| Implementation worker | `builder` | Sonnet | `luna_worker` |
| Verifier | `verifier` | Sonnet | `luna_verifier` |

- The main Opus session is the orchestrator. It owns requirements, acceptance criteria,
  dependency ordering, product and design decisions, conflict resolution, the final
  diff review, and the user-facing synthesis.
- Delegation is opt-in. Invoke `/orchestrate` to run the routing policy; otherwise the
  main session handles the task directly. Do not delegate small, sequential work.
- Only `portfolio-manager` may delegate. Every other agent's `tools:` allowlist omits
  `Agent`, so the no-grandchildren rule is enforced by the harness.
- Read-only roles are enforced the same way: `portfolio-manager`, `scout`, `inventory`,
  and `verifier` have no `Edit` or `Write` tool. This replaces Codex `sandbox_mode`.
- At most two subagents run concurrently. Nothing enforces this cap — the orchestrator
  and the manager hold it.
- Before parallel writes, assign explicit non-overlapping file ownership. Where two
  writers are unavoidable, launch them with `isolation: "worktree"` and merge the
  results in the main session.
- `inventory` (Haiku) is for mechanical, schema-shaped extraction only — enumerations
  and call-site lists. Never give it a judgment call.
- The orchestrator reviews the complete diff and confirms `npm run build` before handoff.

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
