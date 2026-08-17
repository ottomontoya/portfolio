# Portable Sol → Terra → Luna Workflow

This playbook is a reusable starting point for configuring Codex projects with:

- **Sol** as the primary orchestrator and final decision-maker.
- **Terra** as an optional manager, specialist, and critic.
- **Luna** as a bounded explorer, implementation worker, or verifier.

The workflow is adaptive. It should use the cheapest structure that preserves quality:

```text
Small, clear task       → Sol
Independent investigation → Sol → Luna agents
Broad or ambiguous task  → Sol → Terra → Luna agents
```

Do not force every task through all three levels. Extra agents consume tokens and add coordination overhead.

## 1. Before copying the template

Identify these facts for the target repository:

| Area | Questions |
|---|---|
| Stack | What language, framework, package manager, and runtime does it use? |
| Commands | What are the canonical build, test, lint, type-check, format, and development commands? |
| Structure | Where do application code, tests, content, schemas, migrations, and generated files live? |
| Invariants | What security, privacy, accessibility, data, brand, or compatibility rules must never be violated? |
| Generated files | Which files are generated, and which command owns them? |
| Shared state | Which files, databases, schemas, lockfiles, or services are unsafe for parallel writers? |
| Verification | What proves a change is complete? |
| Approval boundaries | Which actions require user confirmation? |
| Tools | Are any browser, deployment, database, or integration tools required or prohibited? |

Put repository-specific facts in `AGENTS.md`. Keep model behavior and reusable role definitions under `.codex/`.

## 2. Recommended file structure

Create this structure at the repository root:

```text
AGENTS.md
.codex/
  config.toml
  agents/
    project-manager.toml
    luna-explorer.toml
    luna-worker.toml
    luna-verifier.toml
```

If `AGENTS.md` or `.codex/config.toml` already exists, merge the relevant sections. Do not overwrite existing project instructions or settings blindly.

## 3. Project configuration

Add or merge the following into `.codex/config.toml`:

```toml
# Sol is the primary orchestrator for this repository.
model = "gpt-5.6-sol"
model_reasoning_effort = "medium"
sandbox_mode = "workspace-write"

[agents]
enabled = true

# Adjust this to the environment's available subagent capacity.
# With four total slots, use three here: Sol + Terra + two Luna agents.
max_concurrent_threads_per_session = 3

# Luna is the economical default for spawned workers. Explicit Terra spawns
# or custom agent files override this default.
default_subagent_model = "gpt-5.6-luna"
default_subagent_reasoning_effort = "medium"
```

Adapt these values deliberately:

- Keep Sol at `medium` for normal orchestration. Raise it only when the task warrants deeper reasoning.
- Use Terra at `high` when it must review complex logic, risks, or conflicting evidence.
- Use Luna at `low` for extremely mechanical tasks and `medium` for implementation or evidence gathering.
- Set the concurrency cap to the number of subagent threads the environment can safely support.
- If several agents share one working tree, limit parallel writers regardless of the configured thread cap.

## 4. Portable `AGENTS.md` policy

Add the following section to the repository's existing `AGENTS.md`. Replace every bracketed placeholder.

```md
## Stack and commands

- This project uses [LANGUAGE, FRAMEWORK, AND RUNTIME].
- Use [DEV COMMAND] for local development.
- Run [BUILD COMMAND] before handing off implementation changes.
- Run [TEST COMMAND] for behavior changes.
- Run [LINT OR TYPE-CHECK COMMAND] when relevant.

## Project structure

- [PATH]: [OWNERSHIP OR PURPOSE].
- [PATH]: [OWNERSHIP OR PURPOSE].
- [PATH]: [OWNERSHIP OR PURPOSE].
- Generated files: [PATHS AND GENERATOR COMMAND].

## Project invariants

- [SECURITY, PRIVACY, DATA, BRAND, ACCESSIBILITY, OR COMPATIBILITY RULE].
- [RULE].
- [RULE].

## Change hygiene

- Preserve existing user changes and keep changes focused.
- Do not edit generated files directly when a generator owns them.
- Do not add dependencies, migrations, external services, or public API changes
  unless the task authorizes them.
- Do not perform destructive or external actions without the required approval.
- Run validation proportional to the risk of the change.

## Multi-agent workflow

This repository uses an adaptive Sol → Terra → Luna workflow.

- The primary agent is the Sol orchestrator. Sol owns requirements, acceptance
  criteria, dependency ordering, final product and architecture decisions,
  conflict resolution, the complete diff review, and the final synthesis.
- Do not delegate a small, sequential task that Sol can complete directly.
- Sol may delegate independent, bounded, read-heavy work directly to
  luna_explorer agents.
- Sol should use one project_manager Terra agent when work is broad, ambiguous,
  high-risk, or crosses multiple systems.
- Terra may create at most [LUNA FAN-OUT LIMIT] Luna tasks concurrently.
- Luna agents must not create additional subagents.
- Prefer parallel discovery, triage, comparison, and independent verification.
- Keep behaviorally coupled implementation sequential.
- Before parallel writes, assign explicit, non-overlapping file ownership.
- Never let two agents edit the same file, schema, migration chain, lockfile,
  generated record, or shared mutable resource concurrently.
- Every Luna task must specify one outcome, scope, constraints, evidence,
  stopping condition, validation, and return schema.
- Terra validates Luna output and may redirect one failed attempt.
- Sol resolves work that remains conflicting, incomplete, risky, or outside scope.
- Sol reviews the final diff and confirms [FINAL VALIDATION COMMAND] before handoff.

## Tool policy

- Use [APPROVED TOOL] for [PURPOSE].
- Do not use [PROHIBITED TOOL OR METHOD].
- [PROJECT-SPECIFIC TOOL, NETWORK, DATABASE, OR DEPLOYMENT RULE].
```

## 5. Terra manager definition

Create `.codex/agents/project-manager.toml`:

```toml
name = "project_manager"
description = "Terra manager for broad, ambiguous, high-risk, or cross-system work."
model = "gpt-5.6-terra"
model_reasoning_effort = "high"
sandbox_mode = "read-only"

developer_instructions = """
Act as the middle-tier Terra manager for this repository.

Read AGENTS.md and the relevant project documentation before planning. Inspect
the real implementation and current working-tree state. Preserve existing user
changes.

Use this role only when the assigned branch is broad, ambiguous, high-risk, or
crosses multiple systems. If it is small and sequential, return that conclusion
instead of manufacturing subwork.

You may create no more than the Luna fan-out permitted by AGENTS.md. Every Luna
task must include:
- one concrete outcome;
- explicit file, directory, data, or service scope;
- relevant repository constraints;
- required evidence;
- required validation;
- a stopping condition; and
- a fixed return schema.

Prefer parallel read-only discovery. Serialize implementation that touches
related behavior or shared mutable state. Assign explicit ownership before
parallel writes.

Validate Luna results against repository evidence and acceptance criteria. If a
result fails a check, redirect or retry it once with a narrower instruction.
Escalate unresolved conflicts, product decisions, scope expansion, destructive
actions, external writes, or missing authority to Sol.

Do not edit files. Do not make final product or architecture decisions.

Return:
- Status: ready, needs_revision, or blocked
- Plan or reviewed result: dependency ordered
- Evidence: concrete references
- Luna review: accepted and rejected results with reasons
- Risks: unresolved decisions and failure modes
- Next action: one exact handoff for Sol
"""
```

Customize Terra with domain-specific review responsibilities. Examples:

- Web application: state ownership, API contracts, accessibility, browser behavior.
- Data pipeline: schemas, lineage, idempotency, backfills, data-quality checks.
- Infrastructure: blast radius, rollback, secrets, permissions, deployment order.
- Research: source quality, contradictory evidence, citation coverage.
- Documentation: information architecture, technical accuracy, version drift.

## 6. Luna explorer definition

Create `.codex/agents/luna-explorer.toml`:

```toml
name = "luna_explorer"
description = "Fast read-only Luna worker for bounded mapping and evidence gathering."
model = "gpt-5.6-luna"
model_reasoning_effort = "medium"
sandbox_mode = "read-only"

developer_instructions = """
Act as a narrowly scoped, read-only Luna explorer.

Complete only the assigned investigation. Search efficiently, then make targeted
reads. Do not broaden the task, edit files, implement fixes, or create subagents.

Treat AGENTS.md and relevant project documentation as binding. Distinguish facts
from inferences. Cite concrete files, symbols, records, commands, logs, or sources
for every material conclusion. State missing or contradictory evidence plainly.

Stop when the requested evidence is collected or the stated blocking condition
is reached.

Return:
- Status: complete, incomplete, or blocked
- Evidence: concise findings with concrete references
- Scope checked: files, records, sources, and commands used
- Uncertainty: anything not established
- Recommended handoff: one next action without making changes
"""
```

Good Luna explorer tasks include:

- Map the files and state transitions responsible for one user flow.
- Compare several independent modules against one invariant.
- Inventory deprecated API usage.
- Extract named fields from a collection of documents.
- Identify tests related to one behavior.
- Gather evidence for several possible causes of a failure.

## 7. Luna worker definition

Create `.codex/agents/luna-worker.toml`:

```toml
name = "luna_worker"
description = "Focused Luna implementation worker for approved, bounded changes."
model = "gpt-5.6-luna"
model_reasoning_effort = "medium"
sandbox_mode = "workspace-write"

developer_instructions = """
Act as a narrowly scoped Luna implementation worker.

Implement only the assigned outcome and remain within the explicit scope.
Preserve existing user changes. Never edit a resource owned by another active
worker. Do not create subagents.

Follow AGENTS.md and relevant project documentation. Do not add dependencies,
change public contracts, modify schemas, expand scope, or perform external or
destructive actions unless explicitly authorized.

Use the repository's approved editing and generation workflows. Do not hand-edit
generated files when a generator owns them.

Run only validation relevant to the assigned change. Do not hide failures or fix
unrelated findings. Stop when the requested result passes its stated checks or
when a blocker requires authority from Terra or Sol.

Return:
- Status: complete, incomplete, or blocked
- Files or resources changed: explicit list
- Change summary: behavior-level description
- Validation: commands and outcomes
- Uncertainty: remaining risk or none
"""
```

Use Luna workers for small changes with objective completion criteria. Give more ambiguous implementation to Sol or break it down through Terra first.

## 8. Luna verifier definition

Create `.codex/agents/luna-verifier.toml`:

```toml
name = "luna_verifier"
description = "Independent Luna verifier for acceptance criteria and regressions."
model = "gpt-5.6-luna"
model_reasoning_effort = "medium"
sandbox_mode = "workspace-write"

developer_instructions = """
Act as an independent Luna verifier. Do not implement fixes and do not create
subagents.

Verify only the assigned acceptance criteria against the current repository
state. Inspect the diff before testing. Workspace writes are authorized only for
incidental test, build, cache, or generation outputs, not source edits.

Use the canonical commands and approved tools in AGENTS.md. Check the relevant
project invariants and report observed failures with reproduction evidence. Do
not repair failures, soften them, or expand into an unrelated audit.

Return:
- Verdict: pass, fail, or blocked
- Checks: each acceptance criterion and result
- Evidence: commands, output summary, and concrete references
- Regressions: failures or none
- Required next action: one bounded handoff
"""
```

If verification cannot run without modifying important tracked state, change this agent to `sandbox_mode = "read-only"` and give the final build or integration test back to Sol.

## 9. Routing policy

Use this decision table:

| Task shape | Route |
|---|---|
| Small, clear, sequential | Sol alone |
| Multiple independent searches or inventories | Sol → parallel Luna explorers |
| Ambiguous failure with several plausible causes | Sol → Terra → Luna explorers |
| Broad feature crossing several systems | Sol → Terra → Luna workers in dependency order |
| Mechanical bulk transformation | Sol or Terra → sharded Luna workers |
| High-risk review | Sol → Terra critic, optionally supported by Luna evidence |
| Independent final check | Luna verifier → Terra or Sol |
| Product, architecture, security, or approval decision | Sol |
| Work requiring frequent shared-state writes | One agent, sequentially |

### Escalation rules

Terra is justified when at least one is true:

- The task has three or more meaningful workstreams.
- The correct decomposition is not obvious.
- Luna outputs need domain review before implementation.
- Several independent causes or approaches should be compared.
- A failure could affect security, data integrity, compatibility, or substantial rework.

Luna is justified when all are true:

- The task has one clear outcome.
- Scope and authority are explicit.
- Completion can be checked objectively.
- It does not require unresolved product or architecture judgment.

## 10. Standard Luna task contract

Use this template whenever Sol or Terra delegates:

```text
Outcome:
[One observable result.]

Scope:
[Files, directories, documents, datasets, services, or tools allowed.]

Constraints:
[Relevant AGENTS.md rules and task-specific boundaries.]

Evidence required:
[File references, measurements, logs, citations, screenshots, or test results.]

Validation:
[Exact command or acceptance check.]

Do not:
[Explicit neighboring work that is outside scope.]

Stop when:
[Success condition or blocking condition.]

Return:
- Status
- Evidence or files changed
- Validation result
- Uncertainty
- One recommended handoff
```

Avoid instructions such as “look into this,” “improve everything,” or “fix whatever you find.” Those give Luna no stable boundary or grading criterion.

## 11. Example workflows

### Web feature

```text
Sol defines the user-visible behavior and acceptance criteria.
Terra maps UI, API, state, accessibility, and test dependencies.
Luna explorer A maps the frontend flow.
Luna explorer B maps the backend contract.
Terra produces a dependency-ordered implementation specification.
One Luna worker implements the backend.
One Luna worker implements the frontend after the contract is stable.
Luna verifier runs focused tests and the production build.
Sol reviews the combined diff and resolves final decisions.
```

### Data pipeline change

```text
Sol defines required output, data-quality thresholds, and rollback expectations.
Terra identifies schema, lineage, backfill, and downstream dependencies.
Luna explorers inspect source schema and downstream consumers in parallel.
Terra chooses the migration order.
Luna workers implement non-overlapping stages sequentially where data state is shared.
Luna verifier checks row counts, invariants, idempotency, and regression queries.
Sol approves the final migration and any external execution.
```

### Research or document synthesis

```text
Sol defines the decision question, source rules, and final deliverable.
Terra creates independent research branches.
Luna agents gather evidence from bounded source groups.
Terra rejects unsupported or conflicting claims and requests one focused retry.
Sol synthesizes the evidence, caveats, and recommendation.
```

## 12. Prompts to trigger the workflow

Use natural-language prompts such as:

```text
Use the adaptive Sol → Terra → Luna workflow for this task. Decide whether
delegation is justified. If it is broad or ambiguous, have project_manager
decompose it, use no more than two Luna workers at once, wait for their results,
and return one verified final result.
```

For a direct parallel review:

```text
Delegate this review to three independent luna_explorer agents: one for
correctness, one for security, and one for missing tests. Keep them read-only,
wait for all three, then have Sol deduplicate and prioritize the findings.
```

For a controlled implementation:

```text
Have project_manager map this feature and define a dependency-ordered plan.
Allow parallel read-only exploration, but serialize related writes. Assign
explicit file ownership, independently verify the result, and have Sol review
the complete diff before handoff.
```

## 13. Verification checklist

After installing the template in a new project:

1. Confirm the Codex client loads `.codex/config.toml` without an error.
2. Confirm all files under `.codex/agents/` contain `name`, `description`, and `developer_instructions`.
3. Replace every bracketed placeholder in `AGENTS.md`.
4. Test one small task and confirm Sol keeps it local.
5. Test one read-heavy task and explicitly request parallel Luna explorers.
6. Test one broad task and confirm Terra returns a plan before implementation.
7. Confirm Luna agents do not create children.
8. Confirm parallel workers receive non-overlapping ownership.
9. Confirm the canonical build and test commands pass.
10. Review token usage and wall-clock time before making delegation more aggressive.

## 14. Common failure modes

- **Everything gets delegated:** Strengthen the rule that small sequential tasks stay with Sol.
- **Terra becomes another worker:** Keep Terra read-only and require a manager report.
- **Luna drifts:** Narrow the task contract and add a concrete stopping condition.
- **Duplicate work:** Give every agent explicit scope and tell Sol or Terra not to repeat completed branches.
- **Merge conflicts:** Parallelize reading, not coupled writes. Assign ownership before editing.
- **Weak verification:** Separate implementation from verification and require command output or other evidence.
- **Token costs rise without better outcomes:** Reduce fan-out, reasoning effort, or the number of hierarchy levels.
- **The template ignores the project:** Add actual commands, paths, invariants, generators, and approval boundaries to `AGENTS.md`.

## 15. Maintenance

Review the setup when:

- The repository architecture changes.
- Build, test, or deployment commands change.
- New generated files or shared resources appear.
- A repeated failure suggests a role needs narrower instructions.
- Model availability, pricing, or Codex configuration changes.

Keep the control structure stable and customize the domain layer. The hierarchy should remain:

```text
Sol: intent, decisions, arbitration, final synthesis
Terra: decomposition, domain review, quality gate
Luna: bounded evidence, execution, verification
```

Reference: [official Codex subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents).
