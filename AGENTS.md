# AGENTS.md

本文件是给 Codex / Claude 等代码代理使用的项目快速入口。新对话优先阅读本文件，然后阅读 `TODO.md`、`findings.md`、`task_plan.md`、`progress.md`。

## 项目概览

Horizon UI 是一个简约现代的企业级 Vue 3 组件库。

- 技术栈：Vue 3、TypeScript strict、Tailwind CSS v4、VitePress。
- 样式体系：CSS-first Tailwind v4 token，使用语义色、功能色、尺寸、圆角、字体 token。
- 文档站点：`docs/`，组件文档在 `docs/components/`。
- 组件源码：`src/components/`。
- 当前主线：重新定义组件库规范，并迁移所有组件的尺寸、颜色、圆角、字体、状态样式与 API 命名。

## 常用命令

```bash
npm run dev          # 启动 VitePress 文档开发服务器，默认 5173
npm run build        # 构建 VitePress 文档
npm run typecheck    # vue-tsc --noEmit
npm run lint         # ESLint
npm run format:check # Prettier 检查
npm run format       # Prettier 写入
```

## 当前文档记忆

- `TODO.md`：未来任务、隐藏问题、需要用户决策的事项。
- `findings.md`：项目结构、当前规范、已完成迁移、风险与结论。
- `task_plan.md`：阶段计划与后续工作。
- `progress.md`：按时间记录的工作流水。
- `docs/superpowers/**`：历史计划和设计稿，已从 VitePress public source 排除；作为内部参考，不能直接当作最新状态。

## 当前规范重点

### Commit 规范

后续提交使用 Conventional Commit 格式，并让说明部分使用中文，例如：

```text
refactor(components): 对齐组件设计令牌规范
docs(project): 更新项目上下文与待办
```

### API 命名

- 语义色统一使用 `theme`，常见取值为 `default`、`brand`、`success`、`warning`、`error`。
- 旧的 `primary` / `danger` 命名正在迁移到 `brand` / `error`。
- 视觉形态如果需要，应使用单独的 `variant`，不要混入 `theme`。
- 底层组件不应该提供业务视觉主题。

### 设计 token

- 文本：`--text-color-primary`、`--text-color-secondary`、`--text-color-placeholder`、`--text-color-disabled`、`--text-color-inverse`。
- 背景：`--bg-color-*`，按 page/container/component 等层级命名。
- 边框：`--border-color-*`。
- 尺寸：`--comp-size-sm`、`--comp-size-md`、`--comp-size-lg`。
- 圆角：`--round-default`、`--round-full`。
- 间距：`--padding-x-*`、`--padding-y-*`。
- 字体工具类：`font-body-*`、`font-title-*`。

## 当前组件状态

- 已实现并纳入文档：Button、Icon、Link、Checkbox、Radio、Text、Title、Callout、Divider、Badge、Tooltip、Switch、Input、Tag、InputNumber、Space、Popper。
- Badge 已加入 sidebar。
- `docs/superpowers/**` 已通过 `srcExclude` 排除，避免内部计划文档影响 VitePress 构建。
- `switch-mockups.html` 是本地视觉原型，已加入 `.gitignore`，是否删除见 `TODO.md`。

## 近期已完成

- Badge 改为 `theme="default|brand|success|warning|error"`。
- Tag 改为 `theme` + `variant`，并固定为 sm 尺寸，不再暴露 `size` 配置。
- Tag 默认高度为 `h-6`，左右 padding 使用 `px-[var(--padding-x-2)]`，图标间距使用 `gap-2`。
- Input 默认占满父元素宽度，移除 max-width 相关样式。
- Input disabled 状态使用明确的 bg/border/text disabled token，不再依赖 opacity。
- InputNumber disabled 输入框补充 `cursor-not-allowed`。
- PopperContent 保持无视觉样式，默认不提供 border、background、text color、radius、shadow/elevation。
- PopperContent 通过 `v-bind="$attrs"` 将上层 `class/style` 传给 Teleport 后的真实浮层 DOM。
- Popper 文档去掉容易误解为内置主题的深色/浅色和默认边框表达。
- 全项目 Prettier 检查已恢复通过。

## Popper 特别说明

Popper 是底层定位基座，不是最终视觉组件。

- Popper 负责：定位、Teleport、z-index、trigger、click outside、Esc、arrow 定位。
- Popper 不负责：背景、边框、阴影、文字颜色、圆角、padding、业务主题。
- Tooltip、Select、Dropdown、Popconfirm 等上层组件应自行定义 surface 样式。
- PopperArrow 使用 `bg-inherit` 继承父级背景；这不是主题样式，只是箭头跟随内容背景的结构需求。

已知未来要处理的问题见 `TODO.md`。

## 注意事项

- 不要把 `docs/superpowers/**` 当作最新完成状态；它们是历史计划。
- 不要直接提交未核对的临时原型文件。
- 运行清理命令前要确认路径在 `D:\project\ui` 内。
- 当前 lint 仍有一个已知 warning：`src/components/Icon/Icon.vue` 使用 `v-html` 渲染 SVG。
- 如果修改颜色 token，必须同步更新 `src/styles` 和设计指南文档。
