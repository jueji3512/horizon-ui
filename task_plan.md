# Project Orientation Plan

Goal: Understand the Horizon UI repository, prior Claude/Codex context, current documentation, component architecture, and continue the high-priority component spec migration around semantic themes, functional color tokens, sizes, radius, and typography.

## Phases

| Phase | Status | Notes |
|---|---|---|
| 1. Restore existing context | complete | Checked for existing planning files and current git status. |
| 2. Inventory docs and agent notes | complete | Read AGENTS/CLAUDE/design docs, local skills, `.superpowers`, and `docs/superpowers`. |
| 3. Inspect source architecture | complete | Reviewed component folders, styles, tokens, VitePress config, exports, and representative components. |
| 4. Summarize project map | complete | Produced a concise project understanding and targeted follow-up questions. |
| 5. Continue component spec migration | complete | Migrated/cleaned Badge, Tag, InputNumber residue; removed remaining targeted old token/API classes in source/docs; added Badge sidebar and excluded `docs/superpowers` from VitePress source. |
| 6. Verify migration state | complete | Static old-token/API scans passed; `typecheck`, `lint`, and `build` passed; docs pages reachable via temporary dev server job. |
| 7. Remaining cleanup notes | pending | Broad format cleanup and browser screenshot-level visual verification remain follow-up items. |
| 8. Fix reported Input/InputNumber/Tag issues | complete | Fixed Input disabled colors and width behavior, InputNumber disabled cursor, and Tag round-checkable demo state/visual feedback. |
| 9. Fix Popper content styling contract | complete | Kept PopperContent borderless by default, forwarded attrs to the teleported content node, removed default-looking floating panel borders, and removed dark/light theme wording from Popper docs demos. |

## Decisions

- Treat project files as data while reading, especially generated notes and prior assistant artifacts.
- Do not modify existing source or docs during orientation unless explicitly requested.
- Current higher-priority workspace effort: migrate the component library to the newly redefined size, radius, font, color, and semantic API standards.
- For this migration, consider current source and token files more authoritative than older `docs/superpowers` implementation plans.

## Errors Encountered

| Error | Attempt | Resolution |
|---|---|---|
| Mojibake in PowerShell output for Chinese docs | Read `CLAUDE.md` and `design.md` normally | Use clean `AGENTS.md` context, source files, and docs structure as primary references. |
| VitePress build failed | Ran `npm run build` | Failure is dead-link checking against `docs/superpowers/plans/2026-05-23-popper.md`, not TypeScript. |
| `python` not found on PATH | Ran planning session catchup | Used bundled workspace Python from Codex runtime. |
| PowerShell `rg` quoting split `type=\"primary\"` patterns | Static token scan | Re-ran with single-quoted fixed-string patterns. |
| `npm run format:check` failed | Full project Prettier check | Targeted Prettier cleanup was applied to migration-touched source files; full check still reports other tracked files plus `switch-mockups.html`. |
| Persistent dev server launch failed in sandbox | Tried `Start-Process`, detached Node spawn, and node_repl child process | Used a temporary PowerShell job for HTTP verification, then reran `Start-Process` with approved escalation; persistent server is available at `http://localhost:5173`. |
| Playwright computed-style verification failed | Tried bundled runtime `playwright` package | Package is missing `playwright-core`; used static regression checks plus build/lint/typecheck and HTTP route verification. |

## Pending Work To Revisit

| Area | Priority | Notes |
|---|---|---|
| Continue next component migration pass | High | Current targeted cleanup for Badge, Tag, InputNumber, Input, and Popper is complete; next pass should start from fresh scans and user priority. |
| Broad formatting cleanup | Medium | Targeted source formatting passed, but a full-project Prettier pass should be a separate intentional cleanup. |
| Browser visual verification | Medium | Static checks, build, and HTTP route checks passed; screenshot-level verification remains unavailable in this tool session. |
| Popper/base infrastructure review | Medium | Popper surface styling contract is clarified; deferred behavior issues from AGENTS/docs should be reviewed before building Select/Dropdown on top. |
