---
name: base-component-review
description: |
  Use when reviewing, auditing, or quality-checking infrastructure/base components
  (like Popper, Teleport adapter, focus-trap) in the Horizon UI project. Triggered by
  phrases like "review the implementation", "check for issues", "audit the code",
  "performance review", or whenever a base component implementation is complete and
  needs validation. This skill should be used before finalizing any base/underlying
  component that upper components depend on. Base components are NOT end-user-facing
  — their demos are for developer verification, their correctness and performance
  matter far more than API simplicity.
metadata:
  type: ritual
  category: quality
  project: horizon-ui
---

# Base Component Review

Review infrastructure/base components (Popper, focus management, portal adapters, etc.)
through three parallel analysis dimensions, then consolidate and fix findings.

## Why base components are different

- Upper components (Select, Dropdown, Menu, DatePicker) depend on them for correctness
- Performance issues cascade to all dependent components
- API design must accommodate diverse upper-component needs
- Demo pages are for developer verification, NOT user-facing marketing
- Completeness and correctness matter more than simplicity

## Review process

### Phase 1 — Dispatch three parallel agents

All three agents MUST read every file in the component directory completely.
Provide each agent with the component directory path and the design spec path
(usually `docs/superpowers/specs/<date>-<component>-design.md`).

**Agent A — Performance review:**

- Count every `computed()`, `ref()`, `watch()` call. Any unnecessary reactive layers?
- Does any computed call `getBoundingClientRect()` or other forced-layout methods? These cause
  layout thrash when triggered by floating-ui's position updates.
- Event listener lifecycle: check every `addEventListener` has a corresponding
  `removeEventListener` reachable on unmount. Multi-instance listener leaks?
- Timer management: showDelay/hideDelay timers properly cleaned on unmount and rapid cycles?
- Floating-ui overhead: `autoUpdate` creates observers — properly cleaned? Unnecessary watchers
  from `useFloating`? Compare against floating-ui/vue source at
  `node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs`.
- Teleport: multiple instances all teleport to body — any contention?
- Module-level mutable state: check utils like `useZIndex` for SSR safety issues
  (module-level `let` counters persist across requests in SSR).

**Agent B — Feature completeness review:**

- Check every feature in the design spec exists in the implementation. Missing anything?
- Walk through upper-component use cases: Select/Cascader (manual+matchWidth+bottom-start),
  Dropdown/Menu (click+nested), Popconfirm (click+placement), DatePicker/TimePicker/ColorPicker
  (manual+complex trigger). Does the API cover each?
- Missing floating-ui features that upper components may need? `crossAxis` offset, flip
  fallback placements, shift boundary customization, `autoPlacement`, `inline` middleware.
- Edge cases: trigger element removed from DOM while open, `to` target doesn't exist,
  rapid show/hide toggling, disabled while open, changing props while visible.

**Agent C — Code quality review:**

- Logic errors: dead code, unreachable branches, race conditions.
- Redundancy: duplicate watchers, unnecessary computed wrappers, dead fields.
- Naming: consistent across files? `updatePosition` vs `update`, `currentPlacement` vs
  `placement`, etc. Clear and accurate?
- Type safety: `as any` casts? `Record<string, any>` instead of proper types? Unverified
  type assertions?
- Consistency with project patterns: `inject()` + `!` + runtime throw pattern,
  `withDefaults(defineProps<{}>(),
- Unused imports, console.log debris, try-catch debugging remnants.
- Compare against sibling components (Checkbox.vue, RadioGroup.vue) for pattern consistency.

### Phase 2 — Consolidate findings

When all three agents report back:

1. Merge findings into a single table: Severity | File:Line | Issue | Source Agent
2. Classify by severity: **Critical** (correctness bug, memory leak, security) |
   **Important** (performance regression, missing feature, type unsafety) |
   **Minor** (code style, redundant code, naming)
3. Cross-reference: do multiple agents flag the same root cause? Those are priority fixes.
4. Identify what to fix NOW vs defer to future.

### Phase 3 — Fix critical and important issues

Fix all Critical and Important findings. Make targeted edits to each affected file.
After all fixes, run `npm run typecheck` to verify correctness.

### Phase 4 — Iterative re-review

**This is a mandatory loop.** After Phase 3 completes, re-dispatch all three agents
for a fresh review against the updated code. Repeat until exit conditions are met.

**Loop rules:**

1. Re-dispatch ALL three agents (A/B/C) on the current code. Each agent must read
   every file again — never trust memory from a previous iteration.
2. After agents report: ignore issues already classified as "Deferred" in prior
   iterations (they were intentionally left unfixed). Focus on NEW issues and
   PREVIOUSLY-FIXED issues that regressed.
3. Fix all new Critical and Important findings. Run `npm run typecheck`.
4. Track iteration count in a summary table:

```markdown
| Iteration | Critical | Important | Minor | Status |
|-----------|----------|-----------|-------|--------|
| 1         | 2        | 5         | 4     | Fixed  |
| 2         | 0        | 1         | 3     | Fixed  |
| 3         | 0        | 0         | 2     | Done   |
```

**Exit conditions (stop the loop when EITHER is true):**

- **Condition A — Clean:** Zero Critical and zero Important issues in the current
  iteration. Minor issues are acceptable — fix them if trivial, defer otherwise.
- **Condition B — Max iterations:** After 3 full iterations, if Critical or
  Important issues remain, STOP and present them to the user with a recommendation:

  > "After 3 review iterations, [N] issues remain unfixed: [list]. These are
  > [inherent tradeoffs / require architectural changes / need design decisions].
  > Should I: (a) continue fixing, (b) defer to a follow-up PR, (c) accept as-is?"

  Do NOT continue iterating past 3 rounds without explicit user approval.

### Output format

After the review loop completes, produce a final summary:

```markdown
## Base Component Review: [Component Name] — Final

### Iteration log
| Iteration | Critical | Important | Minor | Outcome |
|-----------|----------|-----------|-------|---------|
| 1         | N        | N         | N     | Fixed   |
| ...        | ...      | ...       | ...   | ...     |

### Fixed across all iterations
[List of all changes made]

### Deferred for future
[Items intentionally not fixed, with reasoning]

### Type check
npm run typecheck: PASS
```
