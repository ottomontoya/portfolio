# Portfolio repository guidance for Claude Code

The stack, commands, project structure, content and design constraints, and change
hygiene live in `AGENTS.md`, which is shared with the Codex workflow. It is imported
below so both harnesses read one source of truth — when those facts change, edit
`AGENTS.md`, not this file.

@AGENTS.md

## Agent delegation policy

Delegation is **opt-in**. Invoke `/orchestrate` to run the repository's routing policy
and task contract. Without it, handle the task in the main session — most work here is
small and sequential, and delegating it costs more than it returns.

The subagent roster is defined in `.claude/agents/`: `portfolio-manager` (manager and
critic), `scout` (read-only explorer), `inventory` (mechanical extractor, Haiku),
`builder` (implementation), and `verifier` (acceptance and regression checks). Each
agent's authority is set by its `tools:` allowlist:

- Only `portfolio-manager` carries `Agent`, so only it may delegate further. The
  other roster agents cannot create subagents at all.
- `portfolio-manager`, `scout`, `inventory`, and `verifier` have no `Edit` or `Write`
  tool. That is what makes them read-only.

For ad-hoc agents spawned outside this roster, the general rule still holds: any agent
on Sonnet tier or above (Sonnet, Opus, Fable) may create subagents regardless of its
configured reasoning effort, and Haiku-tier agents may not.

At most two subagents run concurrently. Nothing in the harness enforces this — the
orchestrator and the manager hold the cap themselves.

## Browser preview policy

Do not use Playwright, or any browser-automation tool other than the t3-code preview
tools (`mcp__t3-code__preview_*`), to view or interact with this app. This applies to
subagents as well; `verifier` is the only roster agent granted preview tools.
