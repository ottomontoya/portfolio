# Plan: portfolio technical audit
Scope: portfolio-audit-20261005
Depth: tree 2
Mode: orchestrated

## Contract
- Audit only; preserve application and generated content. Root writes the report and runs build/detector measurements.
- One read-only Terra review runs concurrently with root measurements. Terra may work directly; do not create further leaves for this small source tree.
- Interface: finding id, P0–P3 severity, category, file:line, reproducible source evidence, user impact, recommendation, uncertainty; positive findings and coverage.
- Ownership: Terra has no filesystem writes; the root records its reviewed return in the leaf ledger.
- Toolchain: existing Node/npm, zsh, project cwd; npm run build is required. User amendment: Playwright or computer use is authorized for live verification.
- Manual review: Sol reviews source evidence and severity, reconciles detector false positives, and separates source proof from runtime uncertainty.
- Host launch: Codex native subagent, one read-only manager concurrent with root. A single ready leaf does not require a multi-leaf dispatch wave.

## Current contract inventory
Contract revision: 2. User explicitly authorized Playwright/computer use; reopen the previously abandoned browser gate.
| ID | Required outcome or constraint | Owner | Observing gate or manual review | Disposition | Revision |
|---|---|---|---|---|---|
| C1 | Accessibility, theming, responsiveness and behavior source audit | leaf-1.1 | leaf-1.1:G1 | ACTIVE | 1 |
| C2 | Performance, assets, build and detector evidence | root | GATES:G2, GATES:G3 | ACTIVE | 1 |
| C3 | Prioritized report with scores, positives and actionable recommendations | root | GATES:G4 | ACTIVE | 1 |
| C4 | Application source unchanged, anonymity preserved, no unauthorized browser tools | root | GATES:G5 | ACTIVE | 1 |
| C5 | Live desktop/mobile, theme, keyboard and zoom verification | root | GATES:G6 | ACTIVE | 2 |

## Tree
- 1 Portfolio audit ........ GATES.md
  - 1.1 Source review ...... gates/leaf-1.1.md

## Leaf dispatch table
| Leaf | Owns | Needs | Tier | Planned wave | State |
|---|---|---|---|---|---|
| 1.1 | - | - | judgment | 1 | VERIFIED |

Read-only leaf: no OWNS header, no claim or write lease. Parent owns bookkeeping.
