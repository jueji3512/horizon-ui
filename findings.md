# 项目理解记录

本文件记录当前对 Horizon UI 的项目理解。新对话优先阅读 `AGENTS.md`、`TODO.md`，再阅读本文件补充上下文。

## 项目快照

- 项目根目录：`D:\project\ui`。
- 项目类型：Vue 3 企业级组件库 + VitePress 文档站。
- 技术栈：Vue 3、TypeScript strict、Tailwind CSS v4、VitePress、ESLint、Stylelint、Prettier。
- 当前工作主线：重新定义组件库规范，并迁移所有组件的尺寸、颜色、圆角、字体、状态样式和 API 命名。

## 代码风格与检查工具

- 仓库级规范记录在 `CODE_STYLE.md`。
- `.editorconfig` 固定 UTF-8、2 空格、LF、最终换行和尾随空格策略；Markdown 允许尾随空格。
- `.gitattributes` 固定文本文件 `eol=lf`，避免不同机器的 Git 换行设置造成差异。
- Prettier 保持无分号、单引号、100 字符宽度、尾随逗号，并改用 `arrowParens: 'always'`。
- `prettier-plugin-tailwindcss` 负责 Tailwind class sorting，读取 `src/styles/horizon.css`，并处理 `clsx` / `cn` 中的 class。
- ESLint 负责 JS/TS/Vue 代码质量；Stylelint 基于 `stylelint-config-standard-vue`，负责 CSS 和 Vue style。
- 新增 `npm run lint:js`、`npm run lint:style`、`npm run check`；`npm run lint` 同时运行 JS lint 与 style lint。

## 目录结构

- `src/components/`：组件源码。
- `src/styles/`：样式入口和 token。
- `src/styles/tokens/`：颜色、字体、尺寸、阴影等 token 拆分文件。
- `docs/components/`：组件文档。
- `docs/guide/`：设计指南。
- `docs/.vitepress/`：文档站配置和主题。
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
- Popper 是底层定位基座，不提供业务 surface 样式；已完成 base-component review，可作为 Select/Dropdown 等上层组件的当前基座。

## 历史计划资料处置

- `docs/superpowers/**` 已于 2026-06-01 审计并删除，后续不再补充。
- 该目录内大多数内容是早期实施草案，已经被当前源码、组件文档和根目录记忆文件覆盖；历史勾选状态不再作为依据。
- 保留下来的有效结论是：Popper 是 Select、Dropdown、Popconfirm、DatePicker、TimePicker、ColorPicker、Menu 等弹出类组件的前置基座；Select 依赖 Input、Tag、Popper；Dropdown 依赖 Button、Popper。
- Paragraph 旧计划已明确过时，当前不实现；如未来需要大段文本编排，重新按当前 API/token 规范设计。
- Tooltip 当前仍是独立 Floating UI 实现，后续可在 Popper 稳定后评估是否迁移到 Popper 基座。
- 早期交互规范里 `type` 迁移到 `theme`、禁用态不用 opacity、统一 token 的方向已被当前规范吸收；旧 token 名称和值不再直接沿用。
- 历史路线图只保留为方向参考：完成 Popper 能力后优先考虑 Select/Dropdown/Popconfirm 等依赖链组件，再进入 Form、反馈、数据展示、导航和复杂组件集群。实际顺序以用户需求和当前源码状态为准。

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
- Popper deferred 行为已处理：`offset` / `flip` / `shift` / `matchWidth` / `autoUpdate` 作为响应式配置传入 Floating UI，`matchWidth` 使用 `size` middleware 并响应 trigger resize，`disabled` 变 true 时会关闭已打开浮层。
- Popper base-component review 结论：Critical 0；Important 4 项已修复；Minor/Deferred 为未来上层组件可能需要的嵌套弹出层协调、boundary 自定义、crossAxis offset / fallback placement 等扩展。
- Popper 文档去掉“深色/浅色”内置主题暗示。
- `docs/superpowers/**` 历史计划资料已审计并删除，VitePress 过期 `srcExclude` 配置已移除。
- 文档示例同步新 API 和状态说明；示例外部样式不强制 token 化。
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
- Popper 当前基座能力已通过本轮 review；未来复杂上层组件可能继续推动嵌套弹出层、boundary 和 fallback placement 等扩展。
- 浏览器/截图级视觉验证尚未稳定恢复。
- `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物，当前未删除，以免影响正在运行的 dev server 或刚完成的构建。

## 2026-06-02 组件迁移扫描发现

- 用户确认：Horizon token / API / 状态规范主要约束组件源码内部实现；`docs/components/**` 的示例代码视为使用者外部代码，可以自由使用自定义颜色、尺寸、圆角和业务样式，不应仅因未使用 token 而修改。
- 用户确认：`mark`、`keyboard` 这类固定装饰样式如果确有设计语义，可以允许组件内部使用明确固定色；也可以将其沉淀为规范特例或 token。当前本轮已改为 token 表达，仍符合内部规范。
- `CheckboxGroup` / `RadioGroup` 原先使用 `type="default|button"` 表达默认形态和按钮形态。用户确认后，本轮已迁移为 `variant="default|button"`，以对齐“视觉形态使用 `variant`”的命名方向；同时 group 注入给子项的 `variant` / `size` / `disabled` 已改为响应式 `ComputedRef`。
- `Text` / `Title` 的布尔 `mark` 原先使用 Tailwind 原生 `bg-yellow-300`；`Text` 的 `keyboard` 样式原先包含硬编码 inset shadow 色值 `#e2e8f0`。本轮已改为 `bg-warning-light` 和 `--border-color-divider`。
- `Tag` 的自定义 `color` API 为保证深色底可读性，原先内部用 `#1e293b` / `#ffffff` 作为动态前景色。本轮已改为 `--text-color-primary` / `--text-color-inverse`；如果规范要求自定义色 API 也完全 token 化，仍需重新设计 API。
- `Badge`、`Icon`、`Tag`、`Title` 文档中存在 `color="#..."` / `mark="#..."` 示例，属于当前组件自定义色 API 的展示，不宜在未确认前直接删除。
- `Popper` 文档验证示例中使用 `bg-white`、`text-white`、`rounded` 和 Tailwind 原生色阶是允许的，因为它们代表使用者给 PopperContent 传入的外部 surface 样式，不是 Popper 内置视觉能力。
- 本轮继续扫描组件源码内部间距后，已将等值替换且不改变像素值的 `Input`、`InputNumber`、`Checkbox`、`Radio` 水平 padding 迁移到 `--padding-x-*` token。
- 用户确认 gap 不需要 token 化，`--space-*` 不再作为 Horizon 规范 token；本轮已移除 `--space-*` 定义，并恢复组件内部普通 Tailwind `gap-*` 写法。
- 后续扫描发现 `Divider` 文本两侧 `px-3` 可等值迁移为 `--padding-x-3`，已处理。Badge 点/计数、Icon 预设、Switch 轨道/滑块、Tooltip 箭头/紧凑 surface、Callout 14/10px padding 等属于组件固有尺寸或现有 token 无法等值表达的规格，本轮暂不硬改，后续需要确认是否新增组件级 token 或规范例外。

## 后续入口

- 任务清单：`TODO.md`。
- 阶段计划：`task_plan.md`。
- 工作流水：`progress.md`。
- 代理快速入口：`AGENTS.md`。
