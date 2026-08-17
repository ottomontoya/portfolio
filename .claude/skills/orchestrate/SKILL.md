---
name: orchestrate
description: Run a task through this repository's adaptive multi-agent workflow — orchestrator to manager to bounded workers. Use when the user invokes /orchestrate, or asks to delegate, parallelize, decompose, or fan out a task across subagents. Picks the cheapest structure that preserves quality, so small tasks stay in the main session.
---

# Adaptive orchestration

You are the orchestrator. You own requirements, acceptance criteria, dependency
ordering, product and design decisions, conflict resolution, the final diff review,
and the user-facing synthesis. Those never delegate.

Use the cheapest structure that preserves quality:

```text
Small, clear task          → you alone
Independent investigation  → you → scout / inventory agents
Broad or ambiguous task    → you → portfolio-manager → workers
```

Do not force every task through all three levels. Extra agents cost tokens and add
coordination overhead. **If the task is small and sequential, do it yourself and say
so** — that is a correct outcome of this skill, not a failure to use it.

## Roster

| Agent | Model | Writes? | Delegates? | Use for |
|---|---|---|---|---|
| *(you)* | Opus | yes | yes | intent, decisions, arbitration, final synthesis |
| `portfolio-manager` | Sonnet, high | no | yes | decomposition, domain review, quality gate |
| `scout` | Sonnet, low | no | no | read-only investigation needing judgment |
| `inventory` | Haiku | no | no | mechanical schema-shaped extraction |
| `builder` | Sonnet | yes | no | bounded implementation in an explicit scope |
| `verifier` | Sonnet | no* | no | acceptance criteria, regressions, build |

\* `verifier` has no `Edit`/`Write` tool, but its builds do regenerate static content.

Only `portfolio-manager` can delegate further. Every other agent's tool allowlist
omits `Agent`, so the no-grandchildren rule is enforced by the harness rather than by
instruction.

## Routing

| Task shape | Route |
|---|---|
| Small, clear, sequential | you alone |
| Multiple independent searches or inventories | you → parallel `scout` / `inventory` |
| Bulk mechanical extraction with a fixed schema | you → `inventory` |
| Ambiguous failure with several plausible causes | you → `portfolio-manager` → `scout` |
| Broad feature crossing several systems | you → `portfolio-manager` → `builder` in dependency order |
| High-risk review | you → `portfolio-manager`, optionally backed by `scout` evidence |
| Independent final check | `verifier` → you |
| Product, design, security, or approval decision | you |
| Frequent shared-state writes | one agent, sequentially |

### When a manager is justified

Use `portfolio-manager` when at least one is true:

- The task has three or more meaningful workstreams.
- The correct decomposition is not obvious.
- Findings need domain review before implementation.
- Several independent causes or approaches should be compared.
- A failure could affect design integrity, client anonymity, or substantial rework.

### When a bounded worker is justified

Delegate to `scout`, `inventory`, `builder`, or `verifier` only when all are true:

- The task has one clear outcome.
- Scope and authority are explicit.
- Completion can be checked objectively.
- It does not require unresolved product or design judgment.

## Fan-out and write safety

- At most **two** subagents run concurrently. The harness does not enforce this — you
  and the manager do.
- Parallelize reading. Serialize coupled writes.
- Assign explicit, non-overlapping file ownership before any parallel write.
- `portfolio.css`, `portfolio.tsx`, and `data/` are high-collision surfaces — default
  to a single writer across all three.
- If two builders genuinely must write at once, launch each with
  `isolation: "worktree"` and merge the results yourself.
- Never let two agents edit the same file, generated record, or shared mutable
  resource concurrently.

## Task contract

Use this template for every delegation. Fill every field.

```text
Outcome:
[One observable result.]

Scope:
[Files, directories, data, or tools allowed.]

Constraints:
[Relevant AGENTS.md / DESIGN.md rules and task-specific boundaries.]

Evidence required:
[file:line references, measurements, command output, or preview observations.]

Validation:
[Exact command or acceptance check.]

Do not:
[Explicit neighboring work that is out of scope.]

Stop when:
[Success condition or blocking condition.]

Return:
- Status
- Evidence or files changed
- Validation result
- Uncertainty
- One recommended handoff
```

Never delegate with "look into this", "improve everything", or "fix whatever you
find" — those give the child no stable boundary and no grading criterion.

## Closing the loop

Before handing back to the user:

1. Read the actual diff. Do not trust a summary of a change you have not seen.
2. Confirm `npm run build` passes (it runs `npm run generate:static` first).
3. If on-page content changed, confirm `public/llms.txt` and the `index.html`
   `<noscript>` block match `data/`.
4. Resolve anything still conflicting, incomplete, risky, or outside the approved
   scope yourself.
5. Report what was delegated, what came back, and what you rejected — including any
   subagent result you overrode.

## Failure modes to watch

- **Everything gets delegated.** Small sequential tasks stay with you.
- **The manager becomes another worker.** It is read-only and must return a report.
- **A worker drifts.** Narrow the contract and add a concrete stopping condition.
- **Duplicate work.** Give every agent explicit scope; do not re-run a finished branch.
- **Weak verification.** Keep implementation and verification in separate agents and
  require command output as evidence.
- **Haiku asked to judge.** `inventory` extracts; it does not evaluate.
