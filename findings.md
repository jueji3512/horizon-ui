# Project Orientation Findings

## Repository Snapshot

- Project root: `D:\project\ui`.
- Product: Horizon UI, a Vue 3 component library with VitePress documentation.
- Stack: Vue 3, TypeScript strict mode, Tailwind CSS v4 CSS-first tokens, VitePress, ESLint, Prettier.
- Core scripts: `npm run dev`, `npm run build`, `npm run typecheck`, `npm run lint`, `npm run format:check`.

## Existing Work State

- Git working tree already contains many modified component and docs files from prior work.
- Project context files added during this session include `.agents/`, `AGENTS.md`, `task_plan.md`, `findings.md`, and `progress.md`.
- `switch-mockups.html` is treated as a local visual prototype and is ignored by `.gitignore`.
- Orientation should avoid reverting or overwriting prior changes.

## Documentation And Notes

- `AGENTS.md` is the clearest current project guide and includes architecture, component specs, styling rules, known pitfalls, and Popper decisions.
- `CLAUDE.md` and `design.md` appear to contain related Chinese project/design guidance, but PowerShell output currently renders Chinese text as mojibake.
- `.agents/skills/base-component-review/SKILL.md` and `.claude/skills/base-component-review/SKILL.md` both exist; base components such as Popper require a special review workflow.
- `.superpowers/brainstorm/` contains prior design exploration artifacts for button, checkbox, tooltip, text ellipsis, callout, badge, controls placement, token system, semantic colors, and related topics.

## Initial Architecture Notes

- `docs/` is the VitePress site.
- `src/components/` contains component implementations and a public `index.ts` barrel.
- `src/styles/` contains Horizon CSS and token files.
- `src/utils/` contains shared helpers such as class merging and z-index management.

## Source Architecture Notes

- Public component exports currently include: Badge, Button, Checkbox, CheckboxGroup, Icon, Input, InputNumber, Callout, Divider, Link, Popper, PopperArrow, PopperContent, PopperTrigger, Radio, RadioGroup, Space, Switch, Tag, Text, Title, Tooltip.
- `Space` is implemented and documented, but it is not yet described in the top-level `AGENTS.md` component specs.
- Styles are now split under `src/styles/tokens/` (`color.css`, `font.css`, `size.css`, `elevation.css`) and imported by `src/styles/horizon.css`.
- Current component API has migrated further toward `theme="default|brand|success|warning|error"` / `theme="brand|success|warning|error"` semantics across Button, Link, Text, Title, Tooltip, Callout, Badge, and Tag.
- Popper is implemented as a base component with root/context, trigger, content, arrow, and composable files. Its docs include V-01 through V-11 validation demos.
- Tooltip remains a standalone Floating UI wrapper rather than being built on the Popper base.

## Prior Work Artifacts

- `docs/superpowers/plans/` contains implementation plans for Radio button group, Checkbox, Text, Tooltip, Paragraph, Badge, Input, Switch, Tag, Popper, and InputNumber.
- `docs/superpowers/specs/` contains design specs and interaction standards, including Popper design dated `2026-05-18` and interaction standards dated `2026-05-25`.
- VitePress currently builds all Markdown under `docs/`, so internal planning docs can affect production docs checks.
- Plan files generally still use unchecked `- [ ]` boxes even when the corresponding code exists, so completion must be inferred from source/docs/sidebar/exports rather than checkbox state.

## Plan Completion Inferred From Current Repo

| Plan / Component | Current Evidence | Status |
|---|---|---|
| Radio button group | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Checkbox | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Text | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Tooltip | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Paragraph | No `src/components/Paragraph`, docs page, export, theme registration, or sidebar entry | Removed / not implemented |
| Badge | Source, docs, exports, theme registration, and sidebar all present | Implemented |
| Input | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Switch | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Tag | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Popper | Source, docs, exports, theme registration, sidebar all present | Implemented; needs base-component review before treating as finalized |
| InputNumber | Source, docs, exports, theme registration, sidebar all present | Implemented |
| Space | Source, docs, exports, theme registration, sidebar all present | Implemented; added outside the older plan list |

## Roadmap Status

- Roadmap spec dated `2026-05-16` says Phase 0 plus Phase 1 are completed: Button, Icon, Link, Radio/RadioGroup, Checkbox/CheckboxGroup, Text, Title, Callout, Divider, Badge, Tooltip, Switch, Input, Tag.
- Current repo additionally has Popper, InputNumber, and Space implemented.
- Paragraph was explicitly removed from the roadmap in favor of Text/Title/TextBlock coverage, and the old Paragraph plan appears obsolete.
- Next planned roadmap area after current foundations is selection/popup work: Select, Dropdown, and then broader form/feedback/data/navigation components.
- Interaction standards dated `2026-05-25` record ongoing migration from `type` to `theme`, semantic color tokens, default neutral behavior, and remaining cleanup around disabled states, hover/active/focus usage, and token adoption.

## Verification

- `npm run typecheck`: PASS after current migration cleanup.
- `npm run lint`: PASS with one warning: `src/components/Icon/Icon.vue` uses `v-html` for raw SVG rendering.
- `npm run build`: PASS after excluding `docs/superpowers/**` from VitePress source.
- Static old-token/API scan over `src/components` and `docs/components`: PASS for targeted residues (`primary`/`danger` old API classes, `neutral-*`, component-level `bg-white` / `text-white` hardcoded utilities).
- Targeted Prettier check for migration-touched source files: PASS after formatting Badge, Tag, InputNumber, Checkbox, Radio, Input, and Switch.
- Full `npm run format:check`: previously failed due remaining format drift and the local `switch-mockups.html` prototype; `switch-mockups.html` is now ignored, but a broad format pass is still a separate cleanup decision.
- Temporary dev server HTTP reachability: PASS for `/components/badge`, `/components/tag`, `/components/inputnumber`, and `/components/space` with HTTP 200 responses.
- Persistent dev server: RUNNING at `http://localhost:5173` after approved escalated `Start-Process`; confirmed `/components/tag` returns HTTP 200 and netstat shows `[::1]:5173` listening.

## Risks And Drift

- Top-level docs (`AGENTS.md`) are mostly accurate, but some architecture details lag current code: token CSS split and `Space` specs are not reflected there.
- `CLAUDE.md`, `design.md`, and some direct `Get-Content` output render Chinese as mojibake in this terminal, though `rg` can show some docs correctly.
- The working tree has substantial pre-existing edits. Future work should inspect diffs before changing any touched file.
- Production build was previously blocked by internal planning-document dead links; current config excludes `docs/superpowers/**`, so public docs build passes.

## Current Spec Migration Context

- The active workspace effort is redefining component-library standards around semantic colors, sizing, radius, font tokens, and component API naming.
- Newer code is converging on:
  - semantic color names: `brand`, `success`, `warning`, `error`
  - neutral values through CSS variables such as `--text-color-*`, `--bg-color-*`, `--border-color-*`
  - component sizing through `--comp-size-sm/md/lg`
  - radius through `--round-default`, `--round-full`
  - typography through `font-body-*` and `font-title-*`
- Components mostly migrated in current source: Button, Link, Text, Title, Callout, Badge, Tag, Input, InputNumber, Radio, Checkbox, Switch, Divider, Tooltip, Icon, Space, and Popper.
- Previously identified source/docs residue has been addressed for Badge, Tag, InputNumber, and targeted demo helper classes. Badge and Tag now use the new `theme` semantics, InputNumber uses functional tokens, and Popper docs no longer imply built-in surface styling.

## Current Migration Changes Applied

- `Badge` now uses `theme="default|brand|success|warning|error"` instead of old `type="primary|danger"` semantics.
- `Tag` now uses `theme` for semantic color and `variant="light|dark|outline"` for visual style; `checkedProps` follows the same shape.
- `InputNumber` now uses functional size/radius/color tokens and no longer references old neutral/primary classes.
- `Input` root now defaults to full parent width and splits root `class/style` attrs from native input attrs.
- `Input` disabled state now uses explicit disabled bg/border/text tokens, removes opacity fading, and pins native disabled text fill.
- `InputNumber` disabled input now applies `cursor-not-allowed` and native disabled text fill styles.
- Tag docs round-checkable demo now uses its own `roundChecked` state and checked visual override so the interaction is visible.
- `Tag` is now fixed to its sm dimensions; the `size` prop/API and docs section were removed.
- `Tag` uses `gap-2` so icon-to-content and content-to-close spacing is 8px when icons are present.
- `PopperContent` remains visually unstyled by default and now explicitly forwards incoming `class` / `style` attrs to its teleported floating DOM node, so upper components can opt into border/background/radius styling.
- Popper source does not expose `theme`, `variant`, dark, or light visual APIs. The remaining source classes are structural (`inline-flex`, arrow positioning/size, `bg-inherit` for arrow background inheritance), not surface styling.
- Popper source also does not provide default shadow/elevation styles; any `shadow-*` usage found is limited to documentation demos.
- Source cleanup removed remaining targeted hardcoded `bg-white` / `text-white` component utilities in Badge, Checkbox, Radio, Input, and Switch.
- Docs cleanup updated Badge/Tag APIs and replaced old demo helper token residue including `docs/components/space.md` `text-neutral-500`.
- `docs/.vitepress/config.ts` excludes `docs/superpowers/**`, keeping internal agent notes from breaking public docs builds.

## Open Follow-Ups

- Commit convention: use Conventional Commit format with Chinese subject text, for example `refactor(components): 对齐组件设计令牌规范`.
- Clarify which prior Claude work should be considered canonical if notes conflict with current code.
- Clarify whether the next focus is continuing component implementation, visual polish, documentation, Popper/base infrastructure, or cleanup.
- Keep `docs/superpowers/**` excluded from public VitePress source unless the team decides to publish internal planning docs.
- Run true browser/screenshot visual verification when an in-app browser or Playwright is available; current session verified HTTP reachability but not screenshots.
- Decide whether to run a broad Prettier pass over remaining tracked format drift.
