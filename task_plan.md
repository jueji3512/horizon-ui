# 项目阶段计划

目标：持续理解 Horizon UI 项目，并推进组件库新规范迁移，包括语义色、功能色、尺寸、圆角、字体、状态样式和文档示例。

## 当前阶段状态

| 阶段 | 状态 | 说明 |
|---|---|---|
| 1. 恢复项目上下文 | 完成 | 已阅读根目录文档、历史计划、组件源码、样式 token 和 VitePress 配置。 |
| 2. 梳理历史计划 | 完成 | 已审计并删除 `docs/superpowers/**`，后续不再补充；保留结论已沉淀到根目录记忆文档。 |
| 3. 组件规范迁移 | 进行中 | 当前实现组件集已完成一轮收敛扫描；后续按新增组件、复杂场景和 dark mode 滚动守护。 |
| 3.5 文档演示框架评估 | 完成 | 用户最终确认继续使用 VitePress；已改为 `:::demo` + `docs/examples/**` 单源示例体系，并清理 Histoire / Storybook spike。 |
| 4. 文档示例同步 | 进行中 | 已同步多数组件文档的组件 API 命名和示例状态；示例外部样式不强制 token 化。 |
| 5. Popper 底层定位基座 | 完成 | 已明确 Popper 不提供 surface 样式，并完成 deferred 行为处理与 base-component review。 |
| 6. 项目记忆整理 | 完成 | 已新增/更新 `AGENTS.md`、`TODO.md`、`findings.md`、`progress.md`。 |
| 7. 代码编辑器与检查工具规范 | 完成 | 已新增 `CODE_STYLE.md`、`.editorconfig`、`.gitattributes`、Stylelint 和 Tailwind class sorting。 |
| 8. Field 输入域体系 | 进行中 | Field 首版公开 primitives 已落地并迁移 Input / InputNumber / Select；后续继续用 Select 多选和 DatePicker range 验证边界。 |
| 9. 运行时与依赖维护 | 持续 | 已升级到 Node 24 LTS / npm 11，并将直接依赖推进到当前最新可用版本；VitePress 内部 audit 项等待上游版本。 |
| 10. 代理工作流增强 | 持续 | 已全局安装 `obra/superpowers` 14 个工作流 skills，并补装 `better-icons`、`grill-me`、`design-an-interface`、`documentation-and-adrs`；重启 Codex 后按收益用于计划、验收、图标检索、设计压力测试、接口设计和 ADR / 决策记录。 |
| 11. 未来组件与内部原型路线 | 进行中 | Select 与 Dropdown 首版已统一改为 slot 子组件驱动，Dropdown 为菜单语义；下一步优先推进 Menu，TagInput 因独立使用场景较少后置到路线最后；OptionList / Collection、RovingFocus / Composite、Overlay / Layer、FormControl context 等仅在有明确跨组件收益时沉淀。 |
| 12. Icon SVG 图标体系重整 | 完成首轮 / 持续复核 | 48 个原有本地图标已按 Lucide outline 风格同名替换，并于 2026-06-06 补充 48 个常用图标；当前共 96 个 SVG，`check:icons` 同时校验结构和常用图标必备列表。 |
| 13. Figma 设计工作区 | 待继续 | 用户确认后续设计稿建议都在 Horizon UI Figma 文件中实现；当前受 Starter 3 页上限与 MCP 调用额度限制，后续按 `00 Workspace` / `01 Icon Library` / `02 Component Drafts` 三页结构整理。 |
| 14. ScrollArea 底层滚动基座 | 完成首版 / 持续验证 | ScrollArea v1 已公开落地并迁移 Select 面板；支持原生滚动、自定义悬浮 scrollbar、thumb 拖拽、双轴和 viewport expose；虚拟滚动依赖暂缓，接口为未来 virtualizer 预留。 |

## 已完成的关键事项

- Badge sidebar 已补齐。
- `docs/superpowers/**` 历史计划资料已审计并删除，VitePress 过期 `srcExclude` 配置已移除。
- Badge API 改为 `theme="default|brand|success|warning|error"`。
- Tag 移除可配置尺寸，仅保留 sm 规格；默认高度 24px，左右 padding 8px。
- Input 默认宽度占满父容器，并修正 disabled bg/border/text。
- Link 补齐 `href` / `target` / `rel` API，并修正 disabled 状态下 href 原生跳转和半透明语义色问题；disabled 颜色按 theme 使用对应 disabled token。
- Text / Title 文档和字体指南已对齐 `font-body-*` / `font-title-*` token。
- Divider 线型 API 已从 `type` 迁移为 `variant="solid|dashed"`，以对齐视觉形态使用 `variant` 的命名规范。
- Button 已拆分 `variant="solid|outline"` 与 `shape="rectangle|round|circle|square"`，icon-only 不再自动变圆。
- InputNumber disabled 鼠标样式已修正。
- PopperContent 默认无 border/background/text/radius/shadow，并支持上层通过 `class/style` 设置真实浮层 DOM。
- Popper deferred 行为已处理：响应式 `offset` / `flip` / `shift` / `matchWidth` / `autoUpdate`，`disabled` 自动关闭已打开浮层，`matchWidth` 响应 trigger resize。
- Popper base-component review 已完成，Critical/Important 问题已修复；剩余边界能力按上层组件需求后续扩展。
- Popper 文档不再展示“深色/浅色”作为内置能力。
- `Icon.vue` 的 raw SVG 渲染已补充本地图标安全边界说明，并关闭该处 `vue/no-v-html` 告警。
- Field 输入域基座已落地为公开 primitives，Input / InputNumber 已完成迁移；Field 支持外部 class 后置覆盖、FieldRoot focus-within ring、FieldSegment focus-within active 视觉。
- InputNumber 复用 Field 后保留 24/32/40 规范尺寸，步进按钮已改为复用 Button 的 outline square 形态，并补齐聚焦状态下键盘/按钮步进后的展示值同步。
- Select slot-first 单选首版已落地：使用 `SelectOption` / `SelectOptionGroup` 子组件，复用 Field 触发器和 Popper `manual` + `match-width` 定位，支持 clearable、loading、empty、disabled option、readonly、状态、尺寸、隐藏 input、键盘导航和 combobox/listbox ARIA；数据驱动便捷写法后续再议。
- Dropdown 菜单首版已落地：使用 `DropdownItem` / `DropdownGroup` / `DropdownDivider` 子组件，复用 Popper，支持 trigger slot、`click|hover|focus|manual`、受控显隐、菜单 surface、方向键、`select`、`match-width` 和 `max-height` ScrollArea；`trigger`、`visible` / `v-model:visible` 与 outside click / Esc 关闭策略已拆成独立语义。
- ScrollArea v1 已落地：作为公开底层组件提供 `root > viewport > content` 结构，viewport 是唯一真实滚动容器；支持 native overflow、隐藏原生滚动条、悬浮自定义 scrollbar、thumb 拖拽、auto / always / hidden 显隐、垂直 / 水平 / 双轴滚动、`focusable` 和 `ariaLabel`。
- ScrollArea 已 expose `viewportRef`、`contentRef`、`scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState`，并通过内部 context / expose 服务 SelectOption、DropdownItem active 项滚动；已补 `check:scroll-area` 契约检查并纳入 `npm run check`。
- Select 面板已从 `max-h-60 overflow-auto` 迁移为 `ScrollArea :max-height="240"`，active option 保持可见改为调用 ScrollArea `scrollToElement(..., { block: 'nearest' })`，避免直接依赖浏览器 `scrollIntoView()` 带动外层容器。
- 2026-06-04 组件迁移扫描回合已完成：修复 Checkbox / Radio / Switch `focus-visible` 可视 ring，修正色彩指南语义 token 命名，补齐 Field primitive 文档并清理 Popper 多余 demo 标记。
- 2026-06-04 组件迁移收敛扫描已完成：当前实现组件集未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token 或组件级视觉 `type` 残留；已修复 Tag checkable 键盘/ARIA、Input 内部 action 焦点边界、Tooltip 描述关联、Icon `ariaLabel` 语义、InputNumber `change` 事件语义、Popper 根导出、阴影 token fallback、Node 24 类型包和文档主题 stylelint 覆盖。
- token 文件边界已整理：`font.css` 改为 `typography.css`，`size.css` 中的圆角拆到 `radius.css`，`elevation.css` 拆为 `shadow.css`、`motion.css`、`z-index.css`；`color.css` 仍作为完整色彩系统保留。
- Input、InputNumber、Tag、Popper 已完成本轮浏览器视觉验证；发现的问题已同步修复到组件源码或 VitePress demo 隔离层。
- 文档演示体系已一步到位迁移：18 个组件文档使用 VitePress `:::demo`，108 个示例拆到 `docs/examples/**/*.vue`，预览与源码展示共用同一份 `.vue` 文件；旧 DemoBox、details 查看代码、Histoire / Storybook spike 已清理。
- `ComponentDemo` 源码展示体验已优化：复用 VitePress / Shiki 构建期高亮，支持 `github-light` / `github-dark` 双主题、行号、示例路径、单一复制 icon 和完整亮暗 shell。
- `obra/superpowers` 全局工作流 skills 已安装；该能力不改项目源码，但会作为后续新会话的计划、验收、分支收尾、子代理协作和 review 辅助。
- 运行时已升级到 Node `24.16.0` / npm `11.13.0`，`package.json` 已补 `engines` / `packageManager`。
- 直接依赖已升级到当前最新可用版本，`npm outdated --json` 为空；ESLint 10 暴露的 `globals` 隐式依赖问题已修正为显式 devDependency。
- Badge 文档示例改为本地 import，文档主题不再全局注册 `Badge`，避免与 VitePress 默认主题组件重名。
- 全项目 `lint`、`format:check`、`typecheck`、`build` 已通过。
- 根目录异常空目录 `d...projectuisrccomponentsSpace` 已删除。
- 本地 Switch 视觉原型 `switch-mockups.html` 已删除。
- 仓库级代码编辑器与检查工具规范已建立：`CODE_STYLE.md`、`.editorconfig`、`.gitattributes`、Stylelint、Tailwind class sorting 和 `npm run check`。

## 旧版资料清理

- 根目录旧版 `design.md` 已删除；当前设计规范以 `src/styles/tokens/**`、`docs/guide/**` 和根目录记忆文档为准。

## 后续计划

| 任务 | 优先级 | 说明 |
|---|---|---|
| 组件迁移滚动守护 | 高 | 当前实现组件集已完成收敛扫描；后续从源码和当前规范出发，按新增组件、复杂场景和发现的问题滚动扫描。 |
| VitePress `:::demo` 维护 | 中 | 后续新增组件文档继续使用 `:::demo` + `docs/examples/<component>/`；样式污染优先从 `ComponentDemo` `.vp-raw` 与 `postcssIsolateStyles` 排查。 |
| ComponentDemo 展示体验 | 完成 / 持续打磨 | 已接入构建期 Shiki 语法高亮、行号、路径、单一复制 icon 和 light/dark shell；后续只按实际文档体验继续微调。 |
| 组件级固有尺寸规范 | 完成 / 持续守护 | 首轮已定稿 Switch、Badge、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider，均作为组件内部几何规格维护，不新增通用尺寸 token。 |
| token 文件边界 | 完成 / 持续守护 | 当前 token 文件按 color、typography、radius、size、shadow、motion、z-index 拆分；后续只在语义确实不适合共处时继续拆分。 |
| Toggle / ToggleGroup 方向 | 中 | 用户建议未来将 CheckboxGroup / RadioGroup 当前 `variant="button"` 的分段切换形态单独抽成 Toggle / ToggleGroup；暂时只记录，不实现。 |
| Select slot-first 改造 | 高 / 完成 | 已按用户确认方向把首版从数据 prop 改为 `SelectOption` / `SelectOptionGroup` 子组件；保留 edge-to-edge 选项行、浅 brand 选中背景、左侧 brand 条、无右侧 check 图标、clearable hover 切换和触发器默认占满父容器。 |
| ScrollArea 底层滚动基座 | 高 / 完成首版 | 已公开组件并接入 Select；v1 不做虚拟滚动、不引入依赖，但保留 viewport expose 和 `scrollToElement`，后续 Table / Tree / Virtualized Select 出现真实需求时再优先评估 `@tanstack/vue-virtual`。 |
| 未来组件开发路线 | 高 | Select slot-first 首版与 Dropdown 菜单首版已完成；后续推荐顺序为 Menu、Form / FormItem / Textarea、Popconfirm、Dialog / Drawer、Message / Notification、DatePicker / TimePicker、Pagination / Table、Tabs / Breadcrumb / Steps、TreeSelect / Cascader / ColorPicker，TagInput 后置到最后按真实需求启动。 |
| Icon SVG 图标体系重整 | 完成首轮 / 持续复核 | 当前 96 个本地图标均按 Lucide outline 风格维护；源文件统一 `viewBox`、`currentColor`、2px round stroke 和无固定宽高，并补图标网格预览、Figma 审计页与自动校验。 |
| Figma 设计工作区 | 中 | 后续组件设计建议、图标候选和视觉草稿优先落到用户提供的 Horizon UI Figma 文件；由于 Starter 计划最多 3 页，保持 `00 Workspace`、`01 Icon Library`、`02 Component Drafts` 三页结构，不创建额外页面。 |
| OptionList / Collection 内部原型 | 高 | Select / Dropdown 已各自用 slot 子组件 + 内部 collection 注册跑通 active item、disabled、group、键盘导航、滚动定位和 listbox/menu 语义；后续等 Autocomplete、Menu、Tabs 等真实重复出现后，再考虑抽内部 primitives / composable。 |
| RovingFocus / Composite 内部工具 | 中 | 用于 Radio button variant、未来 ToggleGroup、Tabs、Menu、Toolbar 等复合控件，统一 roving `tabindex`、方向键、Home / End、disabled item 跳过和循环策略。 |
| Overlay / Layer 基座 | 中 / 后置 | 等 Dialog / Drawer 启动前设计，负责全局层级、遮罩、滚动锁、Esc、focus trap 和 `aria-modal`；不要与锚点定位的 Popper 混为一谈。 |
| FormControl context | 中 | 随 Form / FormItem 自然沉淀内部 context，统一 size、disabled、readonly、status、`aria-invalid`、`aria-describedby`、label/help/error 关联；公开 API 以 Form 体系为主。 |
| PopupSurface 观察项 | 低 / 暂缓 | Tooltip、Select panel、Dropdown menu、Popconfirm 的 surface 密度和结构差异较大，暂不抽万能 surface；等稳定重复出现后再考虑很薄的内部封装。 |
| 浏览器视觉验证 | 中 | 本轮已完成 Input、InputNumber、Tag、Popper、Callout、Checkbox、Radio、Switch、Badge、Tooltip、Select、ScrollArea 的截图 / DOM / computed style / 交互验证；ScrollArea 与 Select 本轮使用 headless Chrome CDP 验证滚动、拖拽、显隐、focusable 和键盘 active 可见性。 |
| Field 底层组件 | 中 | Input / InputNumber / Select 已完成迁移；Select 多选、DatePicker range 等复杂场景先滞后，后续再验证 FieldGroup、multiline、FieldSegment 边界。 |
| 依赖与运行时升级 | 持续 | 已升级到 Node 24 LTS / npm 11，直接依赖当前无 outdated；后续继续按收益触发升级并修复内部适配。 |
| VitePress audit 等待项 | 中 | 当前 `npm audit` 剩余 3 个 moderate 均来自 `vitepress@1.6.4` 内部嵌套 Vite/esbuild；等待上游正式版本后复查升级。 |
| 包管理器迁移 | 中 | 优先评估 pnpm，备选继续 npm，不优先 Bun / Yarn；若执行迁移，需用 Corepack 固定版本、替换锁文件、统一脚本和文档，并完整验证。 |
| Dark mode 色彩规范 | 后置 | 用户已决定 dark mode 放到当前队列最后；当前完成的是 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。 |
| Icon 外部 SVG 安全策略 | 中 | 如果未来支持外部 SVG 输入，需要替换当前仅适用于本地白名单图标的策略。 |
| 工作流 skills 使用 | 持续 | Superpowers、better-icons、grill-me、design-an-interface、documentation-and-adrs 已安装但需重启 Codex 后被新会话拾取；使用时仍以项目文档和当前源码为准。 |

## 工作约定

- commit message 使用 Conventional Commit 格式，并用中文说明。
- 不能擅自删除不确定用途的文件；先记录到 `TODO.md` 并询问用户。
- 依赖、工具链或 Node.js 升级以最终效果为准：确认升级收益后先问用户，用户确认后直接升级，不因内部适配成本保留旧方案。
- 修改色彩 token 时，同步检查样式源文件和设计指南。
- 未来新对话先读 `AGENTS.md` 和 `TODO.md`，再读本计划；当前最短接入路径是确认 git clean、查看最新提交，随后优先进入 Menu 的接口、键盘模型和内容结构设计。
- Superpowers 是工作流辅助，不替代项目内 `base-component-review`、记忆文档和实际验证；复杂任务可结合其计划、执行、验收、分支收尾与子代理协作流程。
