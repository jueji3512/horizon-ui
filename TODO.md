# 项目 TODO

本文件记录未来要处理的隐藏问题、决策项和开发计划。新对话优先阅读 `AGENTS.md`，然后阅读本文件。

## 需要用户决策

- 暂无。

## 近期开发计划

- [ ] 继续完善公开底层组件 Field：首版 `src/components/Field/` primitives 已落地，并已迁移 Input / InputNumber；后续需要用 Select 多选、DatePicker range 等场景继续验证 FieldGroup、multiline 和 FieldSegment 边界。
- [ ] 组件迁移扫描进入滚动守护：2026-06-04 已对当前实现组件集完成收敛扫描，未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token 或组件级视觉 `type` 残留；后续按新增组件和复杂场景继续扫描。
- [ ] 后续扫描时只把组件源码内部实现作为规范约束对象；文档示例可保留外部使用者风格，不强制迁移到 Horizon token。
- [ ] 为后续新增或继续迁移的关键组件补充更稳定的浏览器级视觉验证；Input、InputNumber、Tag、Popper、Callout、Checkbox、Radio、Switch、Badge、Tooltip 已完成一轮浏览器验证并修复或确认发现的问题，本轮收敛扫描又复验了 Tag、Tooltip、Input、InputNumber 和关键指南页。
- [ ] 后续新增或继续迁移组件文档时，统一使用 VitePress `:::demo`；示例源码放在 `docs/examples/<component>/`，由文档页引用同一份 `.vue` 示例。
- [ ] 后续优化 `ComponentDemo` 的源码展示体验：当前源码区还没有语法高亮，demo 容器的视觉样式也有继续打磨空间。
- [ ] 根据新的组件规范，继续统一文档示例里的组件 API 命名和状态说明；示例外部样式不强制 token 化。
- [ ] 后续 VitePress 发布高于 `1.6.4` 的正式版本时，复查并升级以消除当前嵌套 Vite/esbuild 的 audit 项。
- [ ] 评估并迁移包管理器：优先考虑 pnpm，备选继续 npm，不优先 Bun / Yarn；迁移时使用 Corepack 固定 pnpm 11，替换 `package-lock.json` 为 `pnpm-lock.yaml`，统一 scripts、`packageManager`、`engines` 和项目记忆文档，并验证 `pnpm install`、`pnpm run check`、audit 等价项和关键文档页面。
- [ ] 后续评估新增 Toggle / ToggleGroup，用于承接 CheckboxGroup / RadioGroup 当前 `variant="button"` 这类分段切换形态；暂时不实现，现有 Checkbox / Radio button variant 先保持。
- [ ] 后续新增或改造组件时，继续沿用组件内部 geometry map / 常量维护固有尺寸；首轮已定稿 Switch、Badge、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider，不新增通用尺寸 token。
- [ ] 最后补全 dark mode 色彩规范。当前颜色体系主要完成 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。

## 隐藏问题

- [ ] Field 一旦公开，API 需要谨慎收敛：首版只暴露结构、状态和样式基座，不承载 Select/DatePicker 等业务行为；多选 Select 的 Tag wrap / searchable / maxTagCount 是后续关键压力测试。
- [ ] 组件级固有尺寸首轮已统一为组件内部 geometry map / 常量策略；后续扫描新组件时避免把强耦合结构尺寸误沉淀为通用 token。
- [ ] Checkbox / Radio 的 button variant 未来可迁移或抽象到 Toggle / ToggleGroup；迁移前需确认是否保持多选/单选语义差异，避免只为了视觉复用而损失表单语义。
- [ ] Radio button variant 当前方向键可用，但尚未做 roving `tabindex`；若继续提升 radiogroup 键盘模型，应与 Toggle / ToggleGroup 方向一起设计。
- [ ] Popper 未来可按上层组件需要继续扩展边界能力，例如嵌套弹出层协调、boundary 自定义、crossAxis offset 或 fallback placement；当前 Select/Dropdown 前置的响应式配置、disabled 自动关闭、matchWidth trigger resize 和 base-component review 已完成。
- [ ] 当前 in-app browser 控制通道对 hover 事件触发仍不稳定；Tooltip hover 与 Popper V-02 已检查源码事件链和视觉结构，后续如需稳定回归 hover，应优先补专门的浏览器测试环境或人工实测；Tooltip focus 与 Popper V-03 已在内置浏览器复验通过。
- [ ] VitePress 文档站样式污染应统一在文档 shell / theme 层处理，不要写进组件源码。当前 demo 体系使用 `ComponentDemo` 的 `.vp-raw` 与 `postcssIsolateStyles` 隔离 VitePress `base.css` / `vp-doc.css`，不要为了文档表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖。
- [ ] 如未来 `Icon` 支持外部 SVG 或运行时 SVG 文本，必须重新评估当前 `v-html` 本地图标白名单策略，加入 sanitizer 或改为更安全的渲染路径。
- [ ] in-app browser / Playwright 能力已恢复并用于 Field、Input、InputNumber 视觉验证；后续继续为关键组件补浏览器级视觉回归。
- [ ] `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物。如果没有 dev server 依赖，可以定期清理。
- [ ] 当前运行时基线已升级为 Node `>=24.16.0` / npm `>=11.13.0`；如后续新增 CI 或协作环境，需按 `package.json` 的 `engines` / `packageManager` 对齐。
- [ ] `npm audit` 当前报告 3 个 moderate 项，均来自 `vitepress@1.6.4` 内部嵌套的 Vite/esbuild；npm registry 当前暂无更高 VitePress 正式版本可修复，后续升级 VitePress 时复查。
- [ ] 当前 `npm outdated --json` 为空；后续依赖维护按“确认收益后直接升级并修适配”的原则滚动处理。
- [ ] `AGENTS.md` 已重写为中文快速入口；后续如组件规范变化，要同步更新。

## 工作习惯

- [ ] 后续 commit message 使用 Conventional Commit 格式，并用中文说明，例如 `docs(project): 更新项目上下文与待办`。
- [ ] 遇到不确定是否删除的文件，先在本文件记录，再询问用户确认。
- [ ] 任务较重、需要调研、重开发、复杂排查、跨组件验证、并行实现，或任何子代理能提升效率、覆盖面、完成度的场景，都可以开启子代理协助；小而线性的任务优先主代理直接完成。
- [ ] 发现依赖、工具链或 Node.js 版本偏旧时，不因为内部适配成本而保守停留；如果升级能提升完整性、性能、简洁性或最终效果，先向用户确认，确认后直接升级并修复适配问题。
