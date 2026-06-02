# 项目阶段计划

目标：持续理解 Horizon UI 项目，并推进组件库新规范迁移，包括语义色、功能色、尺寸、圆角、字体、状态样式和文档示例。

## 当前阶段状态

| 阶段 | 状态 | 说明 |
|---|---|---|
| 1. 恢复项目上下文 | 完成 | 已阅读根目录文档、历史计划、组件源码、样式 token 和 VitePress 配置。 |
| 2. 梳理历史计划 | 完成 | 已审计并删除 `docs/superpowers/**`，后续不再补充；保留结论已沉淀到根目录记忆文档。 |
| 3. 组件规范迁移 | 进行中 | 已完成 Badge、Tag、Input、InputNumber、Popper 等本轮重点清理。 |
| 4. 文档示例同步 | 进行中 | 已同步多数组件文档的组件 API 命名和示例状态；示例外部样式不强制 token 化。 |
| 5. Popper 底层定位基座 | 完成 | 已明确 Popper 不提供 surface 样式，并完成 deferred 行为处理与 base-component review。 |
| 6. 项目记忆整理 | 完成 | 已新增/更新 `AGENTS.md`、`TODO.md`、`findings.md`、`progress.md`。 |
| 7. 代码编辑器与检查工具规范 | 完成 | 已新增 `CODE_STYLE.md`、`.editorconfig`、`.gitattributes`、Stylelint 和 Tailwind class sorting。 |
| 8. Field 输入域体系 | 进行中 | Field 首版公开 primitives 已落地并迁移 Input / InputNumber；后续继续用 Select 多选和 DatePicker range 验证边界。 |

## 已完成的关键事项

- Badge sidebar 已补齐。
- `docs/superpowers/**` 历史计划资料已审计并删除，VitePress 过期 `srcExclude` 配置已移除。
- Badge API 改为 `theme="default|brand|success|warning|error"`。
- Tag 移除可配置尺寸，仅保留 sm 规格；默认高度 24px，左右 padding 8px。
- Input 默认宽度占满父容器，并修正 disabled bg/border/text。
- Link 补齐 `href` / `target` / `rel` API，并修正 disabled 状态下 href 原生跳转和半透明语义色问题；disabled 颜色按 theme 使用对应 disabled token。
- Text / Title 文档和字体指南已对齐 `font-body-*` / `font-title-*` token。
- Button 已拆分 `variant="solid|outline"` 与 `shape="rectangle|round|circle|square"`，icon-only 不再自动变圆。
- InputNumber disabled 鼠标样式已修正。
- PopperContent 默认无 border/background/text/radius/shadow，并支持上层通过 `class/style` 设置真实浮层 DOM。
- Popper deferred 行为已处理：响应式 `offset` / `flip` / `shift` / `matchWidth` / `autoUpdate`，`disabled` 自动关闭已打开浮层，`matchWidth` 响应 trigger resize。
- Popper base-component review 已完成，Critical/Important 问题已修复；剩余边界能力按上层组件需求后续扩展。
- Popper 文档不再展示“深色/浅色”作为内置能力。
- `Icon.vue` 的 raw SVG 渲染已补充本地图标安全边界说明，并关闭该处 `vue/no-v-html` 告警。
- Field 输入域基座已落地为公开 primitives，Input / InputNumber 已完成迁移；Field 支持外部 class 后置覆盖、FieldRoot focus-within ring、FieldSegment focus-within active 视觉。
- InputNumber 复用 Field 后保留 24/32/40 规范尺寸，步进按钮已改为复用 Button 的 outline square 形态，并补齐聚焦状态下键盘/按钮步进后的展示值同步。
- 全项目 `lint`、`format:check`、`typecheck`、`build` 已通过。
- 根目录异常空目录 `d...projectuisrccomponentsSpace` 已删除。
- 本地 Switch 视觉原型 `switch-mockups.html` 已删除。
- 仓库级代码编辑器与检查工具规范已建立：`CODE_STYLE.md`、`.editorconfig`、`.gitattributes`、Stylelint、Tailwind class sorting 和 `npm run check`。

## 后续计划

| 任务 | 优先级 | 说明 |
|---|---|---|
| 继续组件迁移扫描 | 高 | 从源码和当前规范重新扫描，不依赖旧计划勾选状态。 |
| 组件级固有尺寸规范 | 完成 / 持续守护 | 首轮已定稿 Switch、Badge、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider，均作为组件内部几何规格维护，不新增通用尺寸 token。 |
| Toggle / ToggleGroup 方向 | 中 | 用户建议未来将 CheckboxGroup / RadioGroup 当前 `variant="button"` 的分段切换形态单独抽成 Toggle / ToggleGroup；暂时只记录，不实现。 |
| 浏览器视觉验证 | 中 | 恢复可用浏览器/Playwright 后补做截图级验证。 |
| Field 底层组件 | 中 | Input / InputNumber 已完成迁移；Select 多选、DatePicker range 等复杂场景先滞后，后续再验证 FieldGroup、multiline、FieldSegment 边界。 |
| Dark mode 色彩规范 | 后置 | 用户已决定 dark mode 放到当前队列最后；当前完成的是 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。 |
| Icon 外部 SVG 安全策略 | 中 | 如果未来支持外部 SVG 输入，需要替换当前仅适用于本地白名单图标的策略。 |

## 工作约定

- commit message 使用 Conventional Commit 格式，并用中文说明。
- 不能擅自删除不确定用途的文件；先记录到 `TODO.md` 并询问用户。
- 修改色彩 token 时，同步检查样式源文件和设计指南。
- 未来新对话先读 `AGENTS.md` 和 `TODO.md`，再读本计划。
