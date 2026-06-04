# AGENTS.md

本文件是给 Codex / Claude 等代码代理使用的项目快速入口。新对话优先阅读本文件，然后阅读 `TODO.md`、`CODE_STYLE.md`、`findings.md`、`task_plan.md`、`progress.md`。

## 项目概览

Horizon UI 是一个简约现代的企业级 Vue 3 组件库。

- 技术栈：Vue 3、TypeScript strict、Tailwind CSS v4、VitePress。
- 样式体系：CSS-first Tailwind v4 token，使用语义色、功能色、尺寸、圆角、字体、阴影 token。
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
npm run format:check # Prettier 检查
npm run format       # Prettier 写入
npm run check        # format:check + lint + typecheck + build
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
3. 当前更靠前的后续项是继续扫描未迁移组件、补充关键组件浏览器级视觉验证；组件文档已统一使用 VitePress `:::demo` + `docs/examples/**` 单源示例；`ComponentDemo` 的源码高亮与视觉样式可作为后续文档体验优化项；Field 在 Select 多选、DatePicker range 等复杂场景的压力验证已决定先滞后，dark mode 放到当前队列最后。
4. 继续开发时以当前源码为准；历史计划目录 `docs/superpowers/**` 已审计并删除，后续不再补充。
5. 有不确定的删除、API 取舍或视觉规范问题，先记录并询问用户；用户更希望按他的理解完整推进。
6. 后续遇到调研、重开发、复杂排查、跨组件验证、并行实现或其他子代理能提升效率、覆盖面、完成度的任务时，可以开启子代理协助；小而线性的任务优先主代理直接推进，避免不必要的协调成本。

## 当前收尾快照

- 2026-06-04 收尾时工作区已提交并清理；本轮关键功能/文档提交为 `48c0c68`、`1bc564a`、`26fbf67`。
- 最近一次完整验证：`npm run check` 通过，包含 format、lint、typecheck 和 VitePress build。
- 本地 dev server 曾在 `http://127.0.0.1:5173/` 验证过 Checkbox 等页面；新对话如需继续看页面，先确认 dev server 是否仍在运行。

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
- Prettier 是格式化唯一来源，启用 Tailwind class sorting；ESLint 负责 JS/TS/Vue，Stylelint 负责 CSS/Vue style。
- 修改格式、lint 或编辑器规则时，同步更新 `CODE_STYLE.md`、相关配置和常用命令说明。

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
- padding / gap 不再作为 Horizon token 规范；组件内部直接使用 Tailwind spacing class，只有颜色、字体、圆角、组件高度等仍按 token 规范收敛。
- 字体工具类：`font-body-*`、`font-title-*`。
- 当前色彩规范主要完成 light mode；dark mode token、暗色状态映射、文档说明和组件适配仍是高优先级后续项。
- 规范约束重点是组件源码内部实现；`docs/components/**` 中的示例代码视为使用者外部代码，可以自由展示自定义颜色、尺寸、圆角和业务样式，不要求完全使用 Horizon token。
- `Text` / `Title` 的 `mark`、`Text` 的 `keyboard` 这类固定装饰样式可以作为组件内部特例使用明确色值，但如果有合适 token，优先使用 token 表达。

## 当前组件状态

- 已实现并纳入文档：Button、Icon、Link、Checkbox、Radio、Text、Title、Callout、Divider、Badge、Tooltip、Switch、Input、Tag、InputNumber、Space、Field、Popper。
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
- Field primitives 支持外部 `class` 后置覆盖；FieldRoot 具备 `focus-within` 默认 ring，FieldSegment 具备 `focus-within:text-brand` 分段聚焦视觉。
- InputNumber 已复用 FieldRoot / FieldNativeInput / FieldGroup，步进按钮复用 Button 的 `variant="outline"` + `shape="square"`，保留 sm/md/lg 的 24/32/40 尺寸，并修复聚焦时键盘/按钮步进后的展示值同步。
- Checkbox / Radio 的 `variant="button"` 未来可考虑抽到 Toggle / ToggleGroup；当前只记录方向，不实现。
- 组件级固有尺寸已完成首轮定稿：Switch track/thumb、Badge dot/count、Tooltip surface / PopperArrow、Checkbox / Radio 控件几何、FieldAction、InputNumber 输入段宽度、Callout 左侧色条、Divider 标签线均作为组件内部几何规格维护，不新增通用 token。
- Input、InputNumber、Tag、Popper 已完成本轮浏览器验证；发现的问题已修复到组件源码或 VitePress demo 隔离层。
- 文档演示已统一为 VitePress `:::demo` 单源示例：组件页通过 `docs/examples/**/*.vue` 渲染预览并展示源码，`ComponentDemo` 使用 `.vp-raw` 与 `postcssIsolateStyles` 隔离 VitePress 默认主题样式。
- 旧 DemoBox / details 查看代码 / Histoire / Storybook spike 已清理；后续文档示例不要回到这些路线。
- `ComponentDemo` 当前源码展示还没有语法高亮，容器视觉样式也可继续优化；该事项已记录到 `TODO.md`。
- Popper 已完成 base-component review；`offset` / `flip` / `shift` / `matchWidth` / `autoUpdate` 改为响应式配置，`matchWidth` 改用 Floating UI `size` middleware，`disabled` 变 true 时会关闭已打开浮层。
- Popper 文档去掉容易误解为内置主题的深色/浅色和默认边框表达。
- `Icon.vue` 的 `v-html` 仅用于渲染打包期导入的本地图标 SVG，已补充安全边界说明并处理 lint warning。
- 全项目 `lint`、`format:check`、`typecheck`、`build` 已通过。
- `docs/superpowers/**` 历史计划资料已审计并删除，VitePress `srcExclude` 的过期配置已移除。

## Popper 特别说明

Popper 是底层定位基座，不是最终视觉组件。

- Popper 负责：定位、Teleport、z-index、trigger、click outside、Esc、arrow 定位。
- Popper 不负责：背景、边框、阴影、文字颜色、圆角、padding、业务主题。
- Tooltip、Select、Dropdown、Popconfirm 等上层组件应自行定义 surface 样式。
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
