# 项目 TODO

本文件记录未来要处理的隐藏问题、决策项和开发计划。新对话优先阅读 `AGENTS.md`，然后阅读本文件。

## 需要用户决策

- Select 选项选中态和下拉浮层 surface 样式：下次先用生图能力出几版方案，用户确认后再修改代码。
- Select group 支持范围：确认是否在首版修补中支持 group，以及采用嵌套 `SelectOptionGroup` 还是扁平 `group` 字段。

## 近期开发计划

- [ ] 继续完善公开底层组件 Field：首版 `src/components/Field/` primitives 已落地，并已迁移 Input / InputNumber；后续需要用 Select 多选、DatePicker range 等场景继续验证 FieldGroup、multiline 和 FieldSegment 边界。
- [ ] 组件迁移扫描进入滚动守护：2026-06-04 已对当前实现组件集完成收敛扫描，未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token 或组件级视觉 `type` 残留；后续按新增组件和复杂场景继续扫描。
- [ ] 后续扫描时只把组件源码内部实现作为规范约束对象；文档示例可保留外部使用者风格，不强制迁移到 Horizon token。
- [ ] 为后续新增或继续迁移的关键组件补充更稳定的浏览器级视觉验证；Input、InputNumber、Tag、Popper、Callout、Checkbox、Radio、Switch、Badge、Tooltip 已完成一轮浏览器验证并修复或确认发现的问题，本轮收敛扫描又复验了 Tag、Tooltip、Input、InputNumber 和关键指南页。
- [ ] 后续新增或继续迁移组件文档时，统一使用 VitePress `:::demo`；示例源码放在 `docs/examples/<component>/`，由文档页引用同一份 `.vue` 示例。
- [ ] 根据新的组件规范，继续统一文档示例里的组件 API 命名和状态说明；示例外部样式不强制 token 化。
- [ ] 后续 VitePress 发布高于 `1.6.4` 的正式版本时，复查并升级以消除当前嵌套 Vite/esbuild 的 audit 项。
- [ ] 评估并迁移包管理器：优先考虑 pnpm，备选继续 npm，不优先 Bun / Yarn；迁移时使用 Corepack 固定 pnpm 11，替换 `package-lock.json` 为 `pnpm-lock.yaml`，统一 scripts、`packageManager`、`engines` 和项目记忆文档，并验证 `pnpm install`、`pnpm run check`、audit 等价项和关键文档页面。
- [ ] 按新的组件路线继续推进：Select 单选首版已落地，后续优先推进 TagInput，再推进 Dropdown / Menu、Form / FormItem / Textarea、Popconfirm、Dialog / Drawer、Message / Notification、DatePicker / TimePicker、Pagination / Table、Tabs / Breadcrumb / Steps，TreeSelect / Cascader / ColorPicker 后置。
- [ ] 评估并沉淀真正有收益的内部通用原型：Select 首版的 OptionList 先保持私有；后续等 Autocomplete、Dropdown / Menu 等出现真实重复后，再考虑抽 OptionList / Collection。RovingFocus / Composite 优先服务 Radio button variant、ToggleGroup、Tabs、Menu；Overlay / Layer 等到 Dialog / Drawer 前设计；FormControl context 随 Form / FormItem 自然沉淀；PopupSurface 暂缓，等 Select / Dropdown / Popconfirm 出现稳定重复后再抽。
- [ ] Select 后续调整队列：先用生图能力生成几组选项选中态和下拉浮层 surface 样式方案给用户确认，再落地修改；浮层方案重点比较 box shadow、边框、圆角、间距、层级感和选项选中态的组合效果；`clearable` 交互改为鼠标悬浮 Select 主体时下拉箭头位置切换为清空按钮，而不是清空按钮与下拉按钮并排；Select 默认宽度要像 Input 一样占满父容器，演示页不要出现参差不齐的默认宽度；确认 `options` 数据结构是否首版就支持 group，或先记录为后续扩展。
- [x] 2026-06-05 已全局安装 `better-auth/better-icons@better-icons`、`mattpocock/skills@grill-me`、`mattpocock/skills@design-an-interface`、`addyosmani/agent-skills@documentation-and-adrs`；重启 Codex 后可用于统一 SVG 图标检索、重要设计压力测试、模块接口多方案比较和 ADR / 决策记录。安装输出里 `PromptScript` 不支持全局安装的失败不影响 Codex。
- [x] 2026-06-05 已完成 Icon SVG 图标体系首轮重整：当前 48 个本地图标已按 Lucide outline 风格同名替换，并统一 `viewBox="0 0 24 24"`、`currentColor`、`stroke-width="2"`、round linecap / linejoin 和无固定 `width` / `height` 的源文件规范；已补 `npm run check:icons` 并纳入 `npm run check`。
- [x] 2026-06-06 已补充 48 个企业组件库常用本地图标，当前内置图标总数为 96；新增图标覆盖导航、数据、表单、反馈、权限、文件、操作和系统场景，并加入 `check:icons` 必备列表。
- [x] 2026-06-06 Select 单选首版已落地：只支持 `options` prop，复用 Field / Popper，支持 clearable、loading、empty、disabled option、readonly、尺寸、状态、隐藏 input、键盘导航和 combobox/listbox ARIA；内部 `SelectOptionList` 暂不公开。
- [ ] 在 Figma `Horizon Icons Audit` 页面继续人工复核新版图标的视觉中心和真实容器表现；如发现单个图标仍不理想，再按同名文件局部替换或微调 SVG。
- [ ] 后续设计稿、组件视觉方案和图标审阅优先落到用户提供的 Figma `Horizon UI` 文件。当前 Figma Starter 计划最多 3 页，推荐整理为 `00 Workspace`、`01 Icon Library`、`02 Component Drafts`；2026-06-05 继续补常用图标时因 MCP 工具调用额度被拦，额度恢复后再重跑。
- [x] 2026-06-05 收尾时遗留的记忆文档改动已在 `4517523 docs(project): 更新未来计划与技能记忆` 中提交。
- [ ] 后续评估新增 Toggle / ToggleGroup，用于承接 CheckboxGroup / RadioGroup 当前 `variant="button"` 这类分段切换形态；暂时不实现，现有 Checkbox / Radio button variant 先保持。
- [ ] 后续新增或改造组件时，继续沿用组件内部 geometry map / 常量维护固有尺寸；首轮已定稿 Switch、Badge、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider，不新增通用尺寸 token。
- [ ] 最后补全 dark mode 色彩规范。当前颜色体系主要完成 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。

## 隐藏问题

- [ ] Field 一旦公开，API 需要谨慎收敛：首版只暴露结构、状态和样式基座，不承载 Select/DatePicker 等业务行为；多选 Select 的 Tag wrap / searchable / maxTagCount 是后续关键压力测试。
- [ ] Select group 支持会影响 public option 数据结构：可考虑 `SelectOptionGroup = { label: string; options: SelectOption[]; disabled?: boolean }` 或扁平 options + group 字段；下次实现前先判断是否放入首版修补，避免很快破坏 `options` API。
- [ ] 组件级固有尺寸首轮已统一为组件内部 geometry map / 常量策略；后续扫描新组件时避免把强耦合结构尺寸误沉淀为通用 token。
- [ ] Checkbox / Radio 的 button variant 未来可迁移或抽象到 Toggle / ToggleGroup；迁移前需确认是否保持多选/单选语义差异，避免只为了视觉复用而损失表单语义。
- [ ] Radio button variant 当前方向键可用，但尚未做 roving `tabindex`；若继续提升 radiogroup 键盘模型，应与 Toggle / ToggleGroup 方向一起设计。
- [ ] 内部通用原型必须有明确跨组件收益才沉淀：OptionList / Collection 和 RovingFocus / Composite 可优先作为内部 composable / primitives 验证，不急于公开；Overlay / Layer 在 Dialog / Drawer 真实启动前不空转；PopupSurface 不为了统一边框、背景、圆角和阴影而提前抽成万能盒子。
- [ ] Popper 未来可按上层组件需要继续扩展边界能力，例如嵌套弹出层协调、boundary 自定义、crossAxis offset 或 fallback placement；当前 Select/Dropdown 前置的响应式配置、disabled 自动关闭、matchWidth trigger resize 和 base-component review 已完成。
- [ ] 当前 in-app browser 控制通道对 hover 事件触发仍不稳定；Tooltip hover 与 Popper V-02 已检查源码事件链和视觉结构，后续如需稳定回归 hover，应优先补专门的浏览器测试环境或人工实测；Tooltip focus 与 Popper V-03 已在内置浏览器复验通过。
- [ ] VitePress 文档站样式污染应统一在文档 shell / theme 层处理，不要写进组件源码。当前 demo 体系使用 `ComponentDemo` 的 `.vp-raw` 与 `postcssIsolateStyles` 隔离 VitePress `base.css` / `vp-doc.css`，不要为了文档表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖。
- [x] Icon 首轮重整已保留当前 `Icon` 组件 API：默认 `1em`、继承 `currentColor`、不恢复固定 `size` prop；本轮只替换 / 规范化 SVG 源文件、补校验脚本和增强图标网格预览。
- [ ] 如未来 `Icon` 支持外部 SVG 或运行时 SVG 文本，必须重新评估当前 `v-html` 本地图标白名单策略，加入 sanitizer 或改为更安全的渲染路径。
- [ ] 本轮 Select 文档页已确认 HTTP 可访问，但当前 Codex 会话未暴露可调用的 Browser 插件，仓库 Playwright 依赖也缺少 `playwright-core`，所以 Select 的点击/键盘交互还需要在可用浏览器测试环境中补验。
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
- [ ] Codex 重启后可使用已全局安装的 `obra/superpowers` 工作流 skills；需要计划、执行、验收、分支收尾、子代理协作、review、debug 或 TDD 时按收益触发，不为触发而触发。
