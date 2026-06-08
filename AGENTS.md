# AGENTS.md

本文件是给 Codex / Claude 等代码代理使用的项目快速入口。新对话优先阅读本文件，然后阅读 `TODO.md`、`CODE_STYLE.md`、`findings.md`、`task_plan.md`、`progress.md`。

## 项目概览

Horizon UI 是一个简约现代的企业级 Vue 3 组件库。

- 技术栈：Vue 3、TypeScript strict、Tailwind CSS v4、VitePress。
- 样式体系：CSS-first Tailwind v4 token，使用语义色、功能色、尺寸、圆角、字体、阴影、动效和层级 token。
- 文档站点：`docs/`，组件文档在 `docs/components/`。
- 组件源码：`src/components/`。
- 当前主线：重新定义组件库规范，并迁移所有组件的尺寸、颜色、圆角、字体、状态样式与 API 命名。

## 常用命令

```bash
npm run dev          # 启动 VitePress 文档开发服务器，默认 5173
npm run build        # 构建 VitePress 文档
npm run typecheck    # vue-tsc --noEmit
npm run lint         # ESLint
npm run lint:js      # ESLint
npm run lint:style   # Stylelint
npm run check:icons  # 校验本地 SVG 图标规范
npm run check:scroll-area # 校验 ScrollArea 基础契约
npm run check:popper # 校验 Popper 基础契约
npm run check:popover # 校验 Popover 浮层契约
npm run check:menu # 校验 Menu 命令菜单契约
npm run check:select # 校验 Select slot 子组件契约
npm run check:dropdown-menu # 校验 DropdownMenu 组合契约
npm run format:check # Prettier 检查
npm run format       # Prettier 写入
npm run check        # format:check + check:icons + check:scroll-area + check:popper + check:popover + check:menu + check:select + check:dropdown-menu + lint + typecheck + build
```

## 当前文档记忆

- `TODO.md`：未来任务、隐藏问题、需要用户决策的事项。
- `CODE_STYLE.md`：仓库级编辑器、格式化和检查规范。
- `findings.md`：项目结构、当前规范、已完成迁移、风险与结论。
- `task_plan.md`：阶段计划与后续工作。
- `progress.md`：按时间记录的工作流水。

## 下次新对话快速接入

1. 先执行 `git status --short` 和 `git log -1 --oneline`，确认工作区是否干净、最新提交是否已经推送。
2. 先读本文件，再读 `TODO.md` 和 `CODE_STYLE.md`；如需更多背景，再读 `findings.md`、`task_plan.md`、`progress.md`。
3. 当前实现组件集已完成一轮迁移收敛扫描，未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token 或组件级视觉 `type` 残留；后续按新增组件、复杂场景和发现的问题滚动守护。Select 已统一为 slot 子组件驱动；Popover / Menu / DropdownMenu 已按原语边界落地，下一步优先推进 Form / FormItem / Textarea。
4. 继续开发时以当前源码为准；历史计划目录 `docs/superpowers/**` 已审计并删除，后续不再补充。
5. 有不确定的删除、API 取舍或视觉规范问题，先记录并询问用户；用户更希望按他的理解完整推进。
6. 后续遇到调研、重开发、复杂排查、跨组件验证、并行实现或其他子代理能提升效率、覆盖面、完成度的任务时，可以开启子代理协助；小而线性的任务优先主代理直接推进，避免不必要的协调成本。
7. 如果发现依赖、工具链或 Node.js 版本偏旧，且升级能提升完整性、性能、简洁性或最终效果，先和用户确认；确认后直接升级，并修正项目内部不适配问题，不为旧适配成本保留低效方案。
8. 2026-06-04 已全局安装 `obra/superpowers` 工作流 skills；重启 Codex 后新会话可在计划、执行、验收、分支收尾、子代理协作、code review、debug、TDD 等场景按收益触发使用。安装输出里 `PromptScript` 不支持全局安装的失败不影响 Codex。
9. 2026-06-05 已全局安装 `better-icons`、`grill-me`、`design-an-interface`、`documentation-and-adrs`；重启 Codex 后可分别用于统一 SVG 图标检索、重要设计压力测试、模块接口多方案比较和 ADR / 决策记录。安装输出里 `PromptScript` 不支持全局安装的失败不影响 Codex。
10. 后续组件设计建议、图标审阅和视觉草稿优先落到用户提供的 Figma 文件 [Horizon UI](https://www.figma.com/design/NLlYHFxwYr01MfhH9siqfu/Horizon-UI?node-id=0-1&p=f&t=q9KEL4vzNdyXo7iS-0)；当前 Figma Starter 计划最多 3 页，建议页面结构为 `00 Workspace`、`01 Icon Library`、`02 Component Drafts`。

## 当前收尾快照

- 2026-06-04 收尾时功能与文档主线已提交并推送；近期关键提交包括 `6dc6521 refactor(styles): 拆分设计令牌文件边界` 和 `c99cc21 docs(vitepress): 优化组件示例源码展示`，本次收尾记录另见最新 `git log`。
- 2026-06-05 已提交昨日遗留记忆文档 `4517523 docs(project): 更新未来计划与技能记忆`，并完成图标体系首轮重整提交 `2daa4b1 refactor(icons): 统一本地图标规范`。
- 2026-06-06 至 2026-06-08 已完成图标补充、Select 首版、Select slot-first 改造、ScrollArea v1、Popover、Menu 和 DropdownMenu；Popover / DropdownMenu 的公开状态统一使用 `open` / `v-model:open`，旧泛型 Dropdown 已迁移为 `DropdownMenu = Popover + explicit Menu`。近期关键提交包括 `0a30490 feat(select): 支持分组选项与浮层滚动优化`、`d0185e6 feat(scrollarea): 实现滚动区域组件` 和 `7312ed2 feat(components): 落地下拉菜单与选择器 slot 契约`。
- 当前工作分支为 `codex/docs-and-icon-rework`；如继续收尾，先执行 `git status --short` 和 `git log -1 --oneline` 确认是否仍停在该分支。
- 最近一次完整验证：2026-06-08 `npm run check` 通过，包含 format、check:icons、check:scroll-area、check:popper、check:popover、check:menu、check:select、check:dropdown-menu、lint、typecheck 和 VitePress build。
- 最近一次轻量验证：2026-06-08 `git diff --check` 通过。
- 本地 dev server 曾在 `http://127.0.0.1:5181/` 验证过 Tag、Tooltip、Input、InputNumber 和关键指南页，也曾在 `http://127.0.0.1:5182/` 验证过 ComponentDemo / Button 源码展示；Select 文档页曾在 `http://127.0.0.1:5185/components/select` 返回 200；ScrollArea / Select 曾使用 `http://127.0.0.1:5186/` 和 headless Chrome CDP 验证；本轮 Popover / Menu / DropdownMenu 在 `http://127.0.0.1:5190/` 通过 in-app Browser 验证。新对话如需继续看页面，先确认 dev server 是否仍在运行。

## 当前规范重点

### Commit 规范

后续提交使用 Conventional Commit 格式，并让说明部分使用中文，例如：

```text
refactor(components): 对齐组件设计令牌规范
docs(project): 更新项目上下文与待办
```

### 代码编辑器与格式规范

- 仓库级规范见 `CODE_STYLE.md`。
- 缩进使用 2 个空格，文本文件换行统一为 LF，编码为 UTF-8，文件末尾保留最终换行。
- `.editorconfig` 负责编辑器基础行为；`.gitattributes` 固定文本文件 `eol=lf`。
- Prettier 是格式化唯一来源，启用 Tailwind class sorting；ESLint 负责 JS/TS/Vue，Stylelint 负责 CSS/Vue style，并覆盖 `src/**/*.{css,vue}` 与 `docs/.vitepress/theme/**/*.vue`。
- 修改格式、lint 或编辑器规则时，同步更新 `CODE_STYLE.md`、相关配置和常用命令说明。

### 依赖与运行时升级

- 当前运行时基线：Node.js `>=24.16.0`，npm `>=11.13.0`，`packageManager` 为 `npm@11.13.0`；本地通过 nvm 安装并切到 Node `24.16.0`。
- 依赖、构建工具、检查工具和 Node.js 版本不以“保持旧适配”为优先级；开发阶段以完整、性能、简洁和最终效果为准。
- 后续如确认升级会更好，先向用户说明收益和影响；用户确认后直接升级，并把由升级引起的内部适配问题一起修掉。
- 当前直接依赖已无 `npm outdated` 项；`npm audit` 剩余 3 个 moderate 均来自 `vitepress@1.6.4` 内部嵌套的 Vite/esbuild，npm registry 暂无更高 VitePress 正式版本可修复，后续等待上游版本后复查。

### API 命名

- 语义色统一使用 `theme`，常见取值为 `default`、`brand`、`success`、`warning`、`error`。
- 旧的 `primary` / `danger` 命名正在迁移到 `brand` / `error`。
- 视觉形态如果需要，应使用单独的 `variant`，不要混入 `theme`。
- Button 已拆分 `theme` 与 `variant`，当前 `variant` 为 `solid|outline`；形状使用 `shape="rectangle|round|circle|square"`，默认 `rectangle`，icon-only 不再自动变圆。
- 底层组件不应该提供业务视觉主题。

### 设计 token

- 文本：`--text-color-primary`、`--text-color-secondary`、`--text-color-placeholder`、`--text-color-disabled`、`--text-color-inverse`。
- 背景：`--bg-color-*`，按 page/container/component 等层级命名。
- 边框：`--border-color-*`。
- 尺寸：`--comp-size-sm`、`--comp-size-md`、`--comp-size-lg`。
- 圆角：`--round-default`、`--round-full`。
- 阴影：常规层级使用 `--shadow-*`；上层浮层 surface 使用 `--shadow-popper` / `shadow-popper`，Popper 底层本身不内置阴影。
- 动效：`--duration-*`；层级：`--z-*`。
- padding / gap 不再作为 Horizon token 规范；组件内部直接使用 Tailwind spacing class，只有颜色、字体、圆角、组件高度等仍按 token 规范收敛。
- 字体工具类：`font-body-*`、`font-title-*`。
- Token 文件按领域拆分为 `color.css`、`typography.css`、`radius.css`、`size.css`、`shadow.css`、`motion.css`、`z-index.css`；拆分原则是语义边界清晰，不为拆而拆。
- 当前色彩规范主要完成 light mode；dark mode token、暗色状态映射、文档说明和组件适配仍是高优先级后续项。
- 规范约束重点是组件源码内部实现；`docs/components/**` 中的示例代码视为使用者外部代码，可以自由展示自定义颜色、尺寸、圆角和业务样式，不要求完全使用 Horizon token。
- `docs/.vitepress/theme/**` 属于文档站产品 shell，不是组件库内部组件规范对象；可为最终文档体验自由使用 scoped CSS、Tailwind 或 VitePress/Shiki 能力，但样式污染仍应在文档层处理。
- `Text` / `Title` 的 `mark`、`Text` 的 `keyboard` 这类固定装饰样式可以作为组件内部特例使用明确色值，但如果有合适 token，优先使用 token 表达。

## 当前组件状态

- 已实现并纳入文档：Button、Icon、Link、Checkbox、Radio、Text、Title、Callout、Divider、Badge、Tooltip、Popover、Menu、DropdownMenu、Switch、Input、InputNumber、Select、Tag、Space、Field、Popper、ScrollArea。
- Badge 已加入 sidebar。
- 历史计划目录 `docs/superpowers/**` 已审计并删除；需要保留的路线和边界结论已沉淀到 `findings.md`。
- 本地 Switch 视觉原型 `switch-mockups.html` 已删除；后续不要提交临时原型文件。

## 近期已完成

- Badge 改为 `theme="default|brand|success|warning|error"`。
- Tag 改为 `theme` + `variant`，并固定为 sm 尺寸，不再暴露 `size` 配置。
- Tag 默认高度为 `h-6`，左右 padding 使用 `px-2`，图标间距使用 `gap-2`。
- Input 默认占满父元素宽度，移除 max-width 相关样式。
- Input disabled 状态使用明确的 bg/border/text disabled token，不再依赖 opacity。
- Link 已补正式 `href` / `target` / `rel` API；disabled 状态会移除可跳转 href、阻止原生点击，并按 theme 使用对应 disabled token。
- InputNumber disabled 输入框补充 `cursor-not-allowed`。
- PopperContent 保持无视觉样式，默认不提供 border、background、text color、radius、shadow/elevation。
- PopperContent 通过 `v-bind="$attrs"` 将上层 `class/style` 传给 Teleport 后的真实浮层 DOM。
- PopperContent 已将注入的 visible 状态与 Teleport target 收束为顶层 computed，避免触发器已打开但浮层 DOM 未挂载的边界。
- Field 已作为公开底层输入域组件落地到 `src/components/Field/`，不是 `_internal`；它用于统一 Input、InputNumber、Select、DatePicker 等 field-like 组件的 surface、状态、尺寸和组合布局。Input / InputNumber 已迁移到 Field 验证首版边界。
- 后续可沉淀的内部通用原型按真实收益推进：OptionList / Collection 优先服务 Select、Autocomplete、Menu、DropdownMenu 等 option 类组件；RovingFocus / Composite 服务 Radio button variant、ToggleGroup、Tabs、Menu 等复合控件；Overlay / Layer 等到 Dialog / Drawer 前设计；FormControl context 随 Form / FormItem 自然出现；PopupSurface 暂缓，避免过早抽成万能 surface。
- Field primitives 支持外部 `class` 后置覆盖；FieldRoot 具备 `focus-within` 默认 ring，FieldSegment 具备 `focus-within:text-brand` 分段聚焦视觉。
- InputNumber 已复用 FieldRoot / FieldNativeInput / FieldGroup，步进按钮复用 Button 的 `variant="outline"` + `shape="square"`，保留 sm/md/lg 的 24/32/40 尺寸，并修复聚焦时键盘/按钮步进后的展示值同步。
- Checkbox / Radio 的 `variant="button"` 未来可考虑抽到 Toggle / ToggleGroup；当前只记录方向，不实现。
- 组件级固有尺寸已完成首轮定稿：Switch track/thumb、Badge dot/count、Tooltip surface / PopperArrow、Checkbox / Radio 控件几何、FieldAction、InputNumber 输入段宽度、Callout 左侧色条、Divider 标签线均作为组件内部几何规格维护，不新增通用 token。
- Input、InputNumber、Tag、Popper、Callout、Checkbox、Radio、Switch、Badge、Tooltip、Select、ScrollArea 已完成本轮浏览器验证；发现的问题已修复到组件源码或 VitePress demo 隔离层。
- 文档演示已统一为 VitePress `:::demo` 单源示例：组件页通过 `docs/examples/**/*.vue` 渲染预览并展示源码，`ComponentDemo` 使用 `.vp-raw` 与 `postcssIsolateStyles` 隔离 VitePress 默认主题样式。
- `ComponentDemo` 源码展示体验已优化：复用 VitePress / Shiki 构建期高亮，支持 `github-light` / `github-dark` 双主题、行号、示例路径、单一复制 icon 和完整亮暗 shell。
- 旧 DemoBox / details 查看代码 / Histoire / Storybook spike 已清理；后续文档示例不要回到这些路线。
- 当前实现组件集已完成迁移收敛扫描：未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token 或组件级视觉 `type` 残留。
- Tag checkable 已补键盘与 ARIA；Input 内部 action blur/focus 边界已修复；Tooltip 已通过 `aria-describedby` 关联真实 tooltip content；Icon 有 `ariaLabel` 时补 `role="img"`；InputNumber `change` 仅在聚焦会话内值确实变化后于 blur 提交时触发。
- Popper 根导出已补 `Placement` / `TriggerType` / `UsePopperOptions` / `UsePopperReturn` / `PopperContext` / `usePopper`；shadow token 已补 `:root` fallback；`@types/node` 已对齐 Node 24 基线为 `^24.13.0`。
- docs theme 已纳入 stylelint，IconGrid 改用 Horizon 语义 token；色彩、FieldGroup、Typography、Popper、Tooltip、Text、Title 文档漂移已修正。
- token 文件边界已收敛：`font.css` 改为 `typography.css`，`size.css` 中的圆角拆到 `radius.css`，`elevation.css` 拆为 `shadow.css`、`motion.css`、`z-index.css`；`color.css` 仍作为完整色彩系统保留。
- 2026-06-04 已安装 `obra/superpowers` 全局工作流 skills，供重启后的 Codex 新会话在计划、验收、分支收尾、子代理协作和 review 等场景使用；该安装不属于仓库源码变更。
- 2026-06-05 已安装 `better-icons`、`grill-me`、`design-an-interface`、`documentation-and-adrs` 全局辅助 skills，供重启后的 Codex 新会话在图标检索、设计压力测试、接口设计和 ADR 记录场景使用；这些安装不属于仓库源码变更。
- 2026-06-05 已将 Icon SVG 图标体系重整加入高优先级计划：当前 48 个本地图标后续需要统一 `viewBox`、绘制范围、视觉中心、`currentColor`、笔触和 fill/stroke 策略，并补图标网格预览与自动校验。
- 2026-06-05 Icon SVG 图标体系已完成首轮重整：48 个本地图标已按 Lucide outline 风格同名替换，`Icon` API 不变，并补 `npm run check:icons`、文档图标网格多尺寸/真实容器预览和 Figma `Horizon Icons Audit` 审计页；后续如发现视觉中心仍不理想，按单个同名 SVG 局部替换或微调。
- 2026-06-05 用户确认后续设计稿建议都在上述 Horizon UI Figma 文件中实现；本轮尝试继续补 48 个常用 Lucide 图标候选并整理页面时，Figma MCP 因 Starter 计划 3 页上限和工具调用额度被拦截。后续恢复额度后按 3 页结构重跑，不要创建 4 页或删除未知内容。
- 2026-06-06 已先不继续使用 Figma，改为在项目内补充 48 个常用本地图标；当前 `src/components/Icon/icons/` 共 96 个 SVG，新增图标覆盖导航、数据、表单、反馈、权限、文件、操作和系统场景；图标命名以 Horizon 对外简洁名为准，不直接照搬来源库后缀（例如 `grid`、`building`），VitePress Icon 页保持轻量搜索网格并将相关图标相邻展示，通过 `npm run check:icons` 必备列表、root `<svg>` 标签碎片、BOM 和子 `<rect>` 几何检查守护。
- 2026-06-08 用户确认 collection 类组件首版统一 slot 驱动；Select 已从 `options` 数据 prop 改为 `SelectOption` / `SelectOptionGroup` 子组件，保留单选、clearable、loading、empty、disabled option、readonly、状态、尺寸、隐藏 input、键盘导航和 combobox/listbox ARIA；数据驱动便捷写法后续再议。
- 2026-06-06 Select 首版视觉与交互反馈已落地并延续到 slot 子组件实现：选中态为浅 brand 背景 + 左侧深 brand 条，去掉右侧 check 图标；下拉浮层移除显式 border，仅由 `shadow-popper` 和 inset edge 表达边缘；clearable 改为 hover Select 主体时在下拉箭头位置切换为清空按钮；Select 默认宽度像 Input 一样占满父容器。
- 2026-06-06 ScrollArea v1 已作为公开底层组件落地：内部结构固定为 `root > viewport > content`，viewport 是唯一真实滚动容器；支持原生高性能滚动、隐藏原生滚动条、悬浮自定义 scrollbar、thumb 拖拽、auto / always / hidden 显隐、垂直 / 水平 / 双轴滚动、`maxHeight` / `maxWidth`、`focusable` 与 `ariaLabel`。
- 2026-06-08 Popover / Menu / DropdownMenu 已按“原语 / 英文 / ARIA 优先”边界落地：Popover 负责通用非模态浮层外壳，Menu 负责动作/命令菜单内容原语，DropdownMenu 是菜单型 Popover 预设；导航后续由 NavigationMenu 承担，不使用 Menu 的 `role="menu"` 语义。
- ScrollArea 不提供 surface 视觉，不内置背景、边框、阴影或业务主题；Select / Popover / DropdownMenu / Dialog 等上层组件继续自行定义 surface。
- ScrollArea 已 expose `viewportRef`、`contentRef`、`scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState`，并提供内部 context / expose 供 SelectOption 等子组件保持 active 项可见；v1 不做虚拟滚动、不引入依赖，但 viewport 契约预留给未来 `@tanstack/vue-virtual` 等 virtualizer。
- Select 面板已改用 `ScrollArea :max-height="240"`，active option 滚动改为调用 ScrollArea 的 `scrollToElement(..., { block: 'nearest' })`，不再直接使用浏览器 `scrollIntoView()`。
- 本轮保留后续项：Radio button variant 仍可进一步做 roving `tabindex`，建议与未来 Toggle / ToggleGroup 方向一起设计。
- 本轮组件迁移扫描未发现源码中仍有旧 `primary` / `danger` API 或旧 `--color-primary` / `--color-danger` / `--radius-*` token；已修复 Checkbox / Radio / Switch 的 `focus-visible` 可视 ring，对齐 `brand-focus` token。
- 色彩指南已将语义色 token 文档修正为真实的 Tailwind v4 `@theme` 变量：`--color-brand-*`、`--color-error-*`、`--color-success-*`、`--color-warning-*`。
- Field 文档已补齐公开 primitives 的 props；Field 体系指南已从旧“实施计划”改为“当前状态与后续验证”；Popper 文档已清理多余 demo 结束标记。
- Popper 已完成 base-component review；`offset` / `flip` / `shift` / `matchWidth` / `autoUpdate` 改为响应式配置，`matchWidth` 改用 Floating UI `size` middleware，`disabled` 变 true 时会关闭已打开浮层。
- PopperTrigger 已明确转发 `mouseenter` / `mouseleave` / `click` / `focus` / `focusin` / `blur` / `focusout` 事件；focus 显隐只消费 `focusin` / `focusout`，内部焦点切换不会重复触发上层离开事件。
- Popper `updatePosition` / `UsePopperReturn.update` 返回类型已对齐 Floating UI 实际行为为 `void`，不再伪装为可等待的 `Promise<void>`。
- Popper 文档去掉容易误解为内置主题的深色/浅色和默认边框表达。
- `Icon.vue` 的 `v-html` 仅用于渲染打包期导入的本地图标 SVG，已补充安全边界说明并处理 lint warning。
- 全项目 `lint`、`format:check`、`check:scroll-area`、`typecheck`、`build` 已通过。
- `docs/superpowers/**` 历史计划资料已审计并删除，VitePress `srcExclude` 的过期配置已移除。
- Node 已用 nvm 升级到 `24.16.0`，npm 升级到 `11.13.0`；`package.json` 已补 `engines` 与 `packageManager`，直接依赖更新到当前最新可用版本，包括 Tailwind 4.3、Vue 3.5.35、ESLint 10.4、Vite 8.0、vue-tsc 3.3。
- `eslint.config.js` 使用的 `globals` 已补为显式 devDependency，不再依赖传递依赖偶然可用。
- Badge 示例改为本地 import Horizon `Badge`，文档主题不再全局注册 `Badge`，避免与 VitePress 默认主题 `Badge` 重名产生 Vue warning。

## 旧版设计稿说明

根目录旧版 `design.md` 已删除；它未被源码或文档站引用，且保留了过时的 `primary` / `danger`、旧 radius / shadow token 体系。当前设计规范以 `src/styles/tokens/**`、`docs/guide/**` 和根目录记忆文档为准，后续不要恢复该旧设计稿。

## Popper 特别说明

Popper 是底层定位基座，不是最终视觉组件。

- Popper 负责：定位、Teleport、z-index、trigger、可配置 click outside / Esc 关闭、arrow 定位。
- Popper 不负责：背景、边框、阴影、文字颜色、圆角、padding、业务主题。
- Tooltip、Select、Popover、DropdownMenu、Popconfirm 等上层组件应自行定义 surface 样式。
- PopperArrow 使用 `bg-inherit` 继承父级背景；这不是主题样式，只是箭头跟随内容背景的结构需求。

已知未来要处理的问题见 `TODO.md`。

## 注意事项

- 不要恢复或继续补充 `docs/superpowers/**`；历史计划资料已删除，后续以根目录记忆文档和当前源码为准。
- 不要直接提交未核对的临时原型文件。
- 运行清理命令前要确认路径在 `D:\project\ui` 内。
- 如果未来 `Icon` 支持外部 SVG 或运行时 SVG 文本，必须重新评估当前 `v-html` 策略。
- 如果修改颜色 token，必须同步更新 `src/styles` 和设计指南文档。
- 如果修改代码风格或检查工具，必须同步更新 `CODE_STYLE.md` 和相关配置。
- 文档站 VitePress 全局样式影响组件 demo 时，应优先检查 `ComponentDemo` 的 `.vp-raw` 隔离与 `docs/.vitepress/config.ts` 中的 `postcssIsolateStyles`；不要为了 VitePress 表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖。
- 可按任务收益使用子代理：调研、重开发、复杂排查、跨组件验证、并行实现、独立文件修复等，只要能提升效率、覆盖面或完成度，就可以分派；同一文件或强耦合关键改动仍由主代理集中协调。
- 依赖、工具链或 Node.js 版本如偏旧，且升级能明显改善最终效果、性能、完整性或开发简洁度，先与用户确认后直接升级；升级造成的内部不适配应同步修正，不以兼容旧实现为主要约束。
- 外部 Superpowers skills 是工作流辅助，不替代项目规范；使用时仍以 `AGENTS.md`、`TODO.md`、`CODE_STYLE.md`、`findings.md`、`task_plan.md`、`progress.md` 和当前源码为准。
