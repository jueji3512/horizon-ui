# 项目理解记录

本文件记录当前对 Horizon UI 的项目理解。新对话优先阅读 `AGENTS.md`、`TODO.md`，再阅读本文件补充上下文。

## 项目快照

- 项目根目录：`D:\project\ui`。
- 项目类型：Vue 3 企业级组件库 + VitePress 文档站。
- 技术栈：Vue 3、TypeScript strict、Tailwind CSS v4、VitePress、ESLint、Prettier。
- 当前工作主线：重新定义组件库规范，并迁移所有组件的尺寸、颜色、圆角、字体、状态样式和 API 命名。

## 目录结构

- `src/components/`：组件源码。
- `src/styles/`：样式入口和 token。
- `src/styles/tokens/`：颜色、字体、尺寸、阴影等 token 拆分文件。
- `docs/components/`：组件文档。
- `docs/guide/`：设计指南。
- `docs/.vitepress/`：文档站配置和主题。
- `docs/superpowers/**`：历史计划/设计文档，已排除出 VitePress public source。
- `.agents/skills/base-component-review/`：底层组件审查 skill。

## 当前组件状态

已实现并文档化的组件：

- 基础：Button、Icon、Link、Text、Title、Divider、Space。
- 表单/输入：Checkbox、CheckboxGroup、Radio、RadioGroup、Switch、Input、InputNumber。
- 展示/反馈：Badge、Tag、Callout、Tooltip。
- 底层：Popper、PopperTrigger、PopperContent、PopperArrow。

特别说明：

- Paragraph 旧计划已过时，目前没有实现。
- Tooltip 目前仍是独立 Floating UI 实现，后续可以考虑迁移到 Popper 基座。
- Popper 是底层定位基座，不提供业务 surface 样式。

## 当前规范

### 色彩模式

- 当前主要完成的是 light 色彩规范。
- Dark mode 尚未实现；后续需要补充 dark token、状态色映射、组件适配和文档说明。

### 语义命名

- 使用 `theme` 表达语义色。
- 常见 theme：`default`、`brand`、`success`、`warning`、`error`。
- 旧命名 `primary` / `danger` 正迁移到 `brand` / `error`。
- 视觉形态使用 `variant`，不要和语义色混用。

### token 使用

- 文本：`--text-color-*`。
- 背景：`--bg-color-*`。
- 边框：`--border-color-*`。
- 尺寸：`--comp-size-sm/md/lg`。
- 圆角：`--round-default`、`--round-full`。
- 间距：`--padding-x-*`、`--padding-y-*`。
- 字体：`font-body-*`、`font-title-*`。

### Commit 规范

使用 Conventional Commit 格式，并用中文说明：

```text
refactor(components): 对齐组件设计令牌规范
docs(project): 更新项目上下文与待办
```

## 本轮已完成

- Badge 改为 `theme` API，并补齐 sidebar。
- Tag 改为 `theme` + `variant`，移除 size 配置，只保留 sm 规格。
- Input 修复 disabled 状态颜色，默认宽度改为占满父容器。
- InputNumber 修复 disabled 光标样式。
- PopperContent 转发 `class/style` 到 Teleport 后真实 DOM。
- Popper 明确不提供默认 border/background/text/radius/shadow/elevation。
- Popper 文档去掉“深色/浅色”内置主题暗示。
- 文档示例同步新 token 和新 API。
- `.gitignore` 忽略本地 `switch-mockups.html`。
- 删除本地 Switch 视觉原型 `switch-mockups.html`。
- `Icon.vue` 继续使用本地 raw SVG 渲染，但已补充“仅来自打包期本地图标”的安全边界说明，并处理 lint warning。
- 删除一个空的异常路径目录 `d...projectuisrccomponentsSpace`。
- 新增 `TODO.md`，作为隐藏问题和未来任务索引。

## 验证状态

最近一次完整验证：

- `npm run typecheck`：通过。
- `npm run lint`：通过，无 `src/components/Icon/Icon.vue` 的 `vue/no-v-html` warning。
- `npm run format:check`：通过。
- `npm run build`：通过。
- `/components/popper` HTTP 检查：通过。

## 已知风险

- `Icon.vue` 当前仅渲染打包期导入的本地图标 SVG；如果未来支持外部 SVG，需要重新设计安全策略。
- Popper 仍有 deferred 行为问题，见 `TODO.md`。
- 浏览器/截图级视觉验证尚未稳定恢复。
- `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物，当前未删除，以免影响正在运行的 dev server 或刚完成的构建。

## 后续入口

- 任务清单：`TODO.md`。
- 阶段计划：`task_plan.md`。
- 工作流水：`progress.md`。
- 代理快速入口：`AGENTS.md`。
