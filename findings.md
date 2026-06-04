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
- 底层：FieldRoot、FieldContent、FieldNativeInput、FieldPrefix、FieldSuffix、FieldAction、FieldGroup、FieldSegment、Popper、PopperTrigger、PopperContent、PopperArrow。

特别说明：

- Paragraph 旧计划已过时，目前没有实现。
- Tooltip 已迁移到 Popper 基座；Tooltip 保留 theme、delay、trigger/manual 等语义和视觉 API，定位、Teleport、arrow、outside click、Esc 与 z-index 交给 Popper。
- Popper 是底层定位基座，不提供业务 surface 样式；已完成 base-component review，可作为 Select/Dropdown 等上层组件的当前基座。
- Field 已作为公开底层输入域基座落地在 `src/components/Field/`；它像 Popper 一样允许用户组合使用，不放在 `_internal`。

## 历史计划资料处置

- `docs/superpowers/**` 已于 2026-06-01 审计并删除，后续不再补充。
- 该目录内大多数内容是早期实施草案，已经被当前源码、组件文档和根目录记忆文件覆盖；历史勾选状态不再作为依据。
- 保留下来的有效结论是：Popper 是 Select、Dropdown、Popconfirm、DatePicker、TimePicker、ColorPicker、Menu 等弹出类组件的前置基座；Select 依赖 Input、Tag、Popper；Dropdown 依赖 Button、Popper。
- Paragraph 旧计划已明确过时，当前不实现；如未来需要大段文本编排，重新按当前 API/token 规范设计。
- Tooltip 当前已迁移到 Popper 基座；历史上“后续评估迁移”的结论已落实。
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
- 阴影：常规层级使用 `--shadow-*`；上层浮层 surface 使用 `--shadow-popper` / `shadow-popper`，Popper 底层本身不内置阴影。
- padding / gap 不再作为 Horizon token 规范；组件内部直接使用 Tailwind spacing class。只有当某类结构尺寸形成稳定组件规格时，再逐项确认是否新增组件级 token。
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
- Button 已拆分语义主题与视觉形态：`theme="default|brand|success|warning|error"`，`variant="solid|outline"`；形状统一使用 `shape="rectangle|round|circle|square"`，默认 `rectangle`，icon-only 不再自动变圆。
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
- 文档演示已统一为 VitePress `:::demo`：组件页引用 `docs/examples/**/*.vue` 渲染预览并展示源码，旧 DemoBox / details 查看代码 / Histoire / Storybook spike 已清理。

## 验证状态

最近一次完整验证：

- `npm run typecheck`：通过。
- `npm run lint`：通过，无 `src/components/Icon/Icon.vue` 的 `vue/no-v-html` warning。
- `npm run format:check`：通过。
- `npm run build`：通过。
- `/components/popper` HTTP 检查：通过。
- 浏览器验证：`/components/field` 的尺寸、multi-value 清空按钮居中、range segment 聚焦视觉和 group 布局通过；`/components/input` 焦点 ring 通过；`/components/inputnumber` 尺寸、焦点 ring、键盘步进和按钮步进展示同步通过。
- 浏览器验证：`/components/button` 的 `solid/outline`、`rectangle/round/square/circle` 渲染通过；`/components/inputnumber` 的 Button stepper 尺寸、disabled/readonly 状态和点击步进通过。
- 最近一次文档演示体系验证：`npm run check` 通过；内置浏览器抽查 `/components/button`、`/components/checkbox`、`/components/inputnumber`、`/components/popper`，确认 `:::demo` 数量、源码折叠、预览渲染和源码内容正常。
- 2026-06-04 收尾提交后再次执行 `npm run check` 通过；提交已按组件行为修复、VitePress demo 迁移、项目上下文更新拆分。

## 2026-06-04 VitePress `:::demo` 演示体系结论

- 用户最终确认继续使用 VitePress，不保守兼容旧文档方案；组件文档演示追求一步到位的最终效果。
- 当前实现采用 VitePress 官方样式隔离方向：`ComponentDemo` 根节点使用 `.vp-raw`，`docs/.vitepress/config.ts` 通过 `postcssIsolateStyles` 隔离 `base.css` / `vp-doc.css` 对组件 preview 的影响。
- `docs/.vitepress/plugins/demo.ts` 基于 `markdown-it-container` 支持 `:::demo 标题` 语法，文档页只写示例路径；真实预览组件和源码均来自 `docs/examples/**/*.vue`。
- `ComponentDemo` 自行提供预览、源码展开/收起和复制能力，不再依赖 VitePress `details` / custom-block 行为。
- 已一次性迁移所有现有组件文档：17 个组件文档均改用 `:::demo`，生成 108 个示例文件；旧 DemoBox、Histoire、Storybook 和 `layout: page` spike 文件已清理。
- 验证结论：`npm run check` 通过；内置浏览器抽查 Button、Checkbox、InputNumber、Popper，确认预览渲染、源码折叠和源码内容均正常。
- 已知体验缺口：源码区尚未接入语法高亮，demo 容器视觉也可继续优化；作为后续文档体验任务记录。

## 已知风险

- `Icon.vue` 当前仅渲染打包期导入的本地图标 SVG；如果未来支持外部 SVG，需要重新设计安全策略。
- Popper 当前基座能力已通过本轮 review；未来复杂上层组件可能继续推动嵌套弹出层、boundary 和 fallback placement 等扩展。
- in-app browser / Playwright 已恢复可用；后续仍需继续给更多关键组件补浏览器级视觉回归。
- `docs/.vitepress/cache` 和 `docs/.vitepress/dist` 是忽略的生成物，当前未删除，以免影响正在运行的 dev server 或刚完成的构建。

## 2026-06-02 组件迁移扫描发现

- 用户确认：Horizon token / API / 状态规范主要约束组件源码内部实现；`docs/components/**` 的示例代码视为使用者外部代码，可以自由使用自定义颜色、尺寸、圆角和业务样式，不应仅因未使用 token 而修改。
- 用户确认：`mark`、`keyboard` 这类固定装饰样式如果确有设计语义，可以允许组件内部使用明确固定色；也可以将其沉淀为规范特例或 token。当前本轮已改为 token 表达，仍符合内部规范。
- `CheckboxGroup` / `RadioGroup` 原先使用 `type="default|button"` 表达默认形态和按钮形态。用户确认后，本轮已迁移为 `variant="default|button"`，以对齐“视觉形态使用 `variant`”的命名方向；同时 group 注入给子项的 `variant` / `size` / `disabled` 已改为响应式 `ComputedRef`。
- `Text` / `Title` 的布尔 `mark` 原先使用 Tailwind 原生 `bg-yellow-300`；`Text` 的 `keyboard` 样式原先包含硬编码 inset shadow 色值 `#e2e8f0`。本轮已改为 `bg-warning-light` 和 `--border-color-divider`。
- `Tag` 的自定义 `color` API 为保证深色底可读性，原先内部用 `#1e293b` / `#ffffff` 作为动态前景色。本轮已改为 `--text-color-primary` / `--text-color-inverse`；如果规范要求自定义色 API 也完全 token 化，仍需重新设计 API。
- `Badge`、`Icon`、`Tag`、`Title` 文档中存在 `color="#..."` / `mark="#..."` 示例，属于当前组件自定义色 API 的展示，不宜在未确认前直接删除。
- `Popper` 文档验证示例中使用 `bg-white`、`text-white`、`rounded` 和 Tailwind 原生色阶是允许的，因为它们代表使用者给 PopperContent 传入的外部 surface 样式，不是 Popper 内置视觉能力。
- 用户确认 gap 不需要 token 化，`--space-*` 不再作为 Horizon 规范 token；本轮已移除 `--space-*` 定义，并恢复组件内部普通 Tailwind `gap-*` 写法。
- 用户进一步确认 padding 也不再作为 Horizon token 规范；本轮已移除 `--padding-x-*` / `--padding-y-*` 定义，并将组件内部已使用 padding token 的地方恢复为等值 Tailwind spacing class。
- `Icon` 不再提供固定尺寸预设或 `size` prop；默认宽高为 `1em`，可随字号继承，用户需要自定义尺寸时通过外部 class/style 控制。`Switch` loading 图标已改为通过字号 class 适配这一 API 变化。
- `Tooltip` 浮层阴影已沉淀为 `--shadow-popper` / `shadow-popper`，参考 TDesign 中层浮层的多层投影，并叠加 inset 边界以增强浅色主题 surface 与页面背景的分离度。
- Field 输入域体系设计已沉淀到 `docs/guide/field-system.md`，并新增 `docs/components/field.md`：Field 作为公开底层组件，统一 field-like 组件的 surface、状态、尺寸、focus ring、slot/action/group/segment 布局，但不承载输入值解析、Popper、日期面板、选择面板等业务行为；Input 与 InputNumber 已迁移到 Field 验证首批边界。
- Field primitives 已调整为外部 `class` 后置合并，公开组合时可以稳定覆盖内部默认 spacing / width 等 class；FieldRoot 增加 `focus-within` 默认 ring，FieldSegment 增加 `focus-within:text-brand`，用于 range segment 的无 JS 聚焦视觉。
- InputNumber 已复用 FieldRoot / FieldNativeInput / FieldGroup 作为中间输入域基座，步进按钮复用 Button 的 `variant="outline"` + `shape="square"`；迁移后保留 sm/md/lg 的 24/32/40 规范高度，并修复聚焦时键盘/按钮步进后展示值不同步的问题。`readonly` 按“不允许编辑”理解，输入和步进都不可改值，但步进按钮不呈现 disabled 视觉。
- Checkbox / Radio 当前的 `variant="button"` 是分段切换形态，自维护样式而不是直接复用 Button。用户建议未来单独设计 Toggle / ToggleGroup 来承接这类形态；当前暂不实现，只记录为后续 API 方向。

## 2026-06-02 组件级固有尺寸扫描

- 扫描范围：`src/components/**` 中的固定 `h-*` / `w-*` / `min-w-*` / `translate-*` / `max-w-*` / icon 几何，以及 Badge、Switch、Tooltip 文档页的浏览器实际尺寸。
- Badge：dot 为 6x6；计数徽标为 20px 高、最小宽 16px、左右 padding 6px、`round-full`；浏览器实测单数字宽约 19px，中文“新”宽 24px。该几何只服务 Badge，自成规格，已定稿为组件内部 `badgeGeometryMap`，不新增通用尺寸 token。
- Switch：sm/md/lg 轨道为 26x16、32x20、40x24；滑块为 10x10、12x12、14x14；位移为 10/12/16px，loading 图标字号为 8/10/12px。Switch 的 track/thumb/offset 是强耦合几何矩阵，已定稿为组件内部 `switchGeometryMap`，不新增通用尺寸 token；文档已补充尺寸规格表。
- Tooltip / PopperArrow：Tooltip surface 使用 `max-w-60`、`px-2 py-1`、`round-default`、`shadow-popper`；PopperArrow 结构为 8x8 旋转方块，浏览器旋转后包围盒约 11.3px。Tooltip surface 已定稿为组件内部 `tooltipSurfaceGeometryMap`，PopperArrow 视觉尺寸和静态边偏移已定稿为组件内部 `popperArrowGeometry`；箭头尺寸属于 Popper 结构默认值，不是业务主题样式。
- Checkbox / Radio 控件几何：默认 checkbox box 为 16x16，check / indeterminate icon 为 12x12；radio 外圈 16x16、内点 8x8；button variant 高度跟 `--comp-size-sm/md/lg`，padding / gap 自维护。默认控件和 button variant 几何已分别收束到 Checkbox / Radio 内部 geometry map；未来 Toggle / ToggleGroup 可重新承接 button variant，但需要保留 Checkbox / Radio 的选择语义。
- FieldAction 是 20x20 的输入域内部动作位；InputNumber 中间输入段宽度是 72/88/104px；Callout 左侧色条是 4px；Divider 左 / 右对齐文字的靠边短线是 24px，纵向分割高度为 1em；PopperArrow 是 8x8。这些均属于组件内部结构尺寸。
- 初步结论：当前不建议新增一组全局尺寸 token 来覆盖所有固有几何；首轮已将 Switch、Badge、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider 定稿为组件内部 geometry map / 常量策略。后续新增组件时继续逐项判断，不把强耦合结构尺寸默认沉淀为通用 token。

## 2026-06-03 Switch 尺寸规范定稿

- Switch 源码将 track、thumb、thumb 初始位置、激活位移和 loading 图标字号统一收束到 `switchGeometryMap`，作为组件内部几何规格维护。
- Switch 不直接用 `--comp-size-sm/md/lg` 表达整体高度，因为开关轨道、滑块、内边距和位移必须成组匹配；`size` 仍保留 `sm|md|lg` 的公开 API。
- Switch 文档新增“尺寸规格”表：sm 为 26x16 / 10x10 / 10px / 8px，md 为 32x20 / 12x12 / 12px / 10px，lg 为 40x24 / 14x14 / 16px / 12px。
- Switch 输入增加 `role="switch"` / `aria-checked`，并为隐藏 input 聚焦时的 track 增加 brand focus ring；该 ring 不改变布局尺寸。

## 2026-06-03 Badge 尺寸规范定稿

- Badge 源码将 dot 和 content 两类固有尺寸统一收束到 `badgeGeometryMap`，作为组件内部几何规格维护。
- Badge 不直接用 `--comp-size-sm/md/lg` 表达尺寸，因为圆点、数字/短文本胶囊、最小宽度、文字字号和右上角锚点共同构成叠加徽标语义。
- Badge 文档新增“尺寸规格”表：dot 为 6x6；数字/文本为 20px 高、16px 最小宽度、左右 6px 内边距、`font-body-sm`；默认锚点为子元素右上角中心，可通过 `offset` 微调。

## 2026-06-03 Tooltip / PopperArrow 尺寸规范定稿

- Tooltip 源码将浮层 surface 的最大宽度、padding、字体和圆角收束到 `tooltipSurfaceGeometryMap`，作为 Tooltip 自身 surface 几何规格维护。
- PopperArrow 源码将箭头尺寸和静态边半尺寸偏移收束到 `popperArrowGeometry`：尺寸为 8x8，静态边偏移为 -4px，背景仍通过 `bg-inherit` 跟随父级。
- Tooltip 不直接用 `--comp-size-sm/md/lg` 表达尺寸，因为提示浮层的高度由文本行高和上下 padding 共同决定；PopperArrow 是底层定位结构，不提供主题或尺寸 API。
- Tooltip 文档新增“尺寸规格”表；Popper 文档补充 PopperArrow 的 8x8 与 -4px 结构说明。
- 验证 Tooltip click 示例时发现 `PopperTrigger` 已为 `aria-expanded="true"` 但 `PopperContent` 的 Teleport DOM 未挂载；修复为在 `PopperContent` 内使用顶层 `isVisible` / `teleportTarget` computed 承接注入 ref，避免模板中嵌套 ref 访问在 Teleport/v-if 场景下不稳定。
- 本地 base-component review 结论：本次 PopperArrow / PopperContent 改动无 forced layout、无新增全局事件监听或 timer、无 `any` / console 残留；`arrowRef` 生命周期、Floating UI arrow middleware 和 `bg-inherit` 继承边界保持不变。

## 2026-06-03 Checkbox / Radio 尺寸规范定稿

- Checkbox 源码将 default box 和 check / indeterminate icon 收束到 `checkboxControlGeometryMap`：box 为 16x16，图标为 12x12；button variant 高度、padding、gap 收束到 `checkboxButtonGeometryMap`。
- Radio 源码将 default circle 和 inner dot 收束到 `radioControlGeometryMap`：外圈为 16x16，内点为 8x8；button variant 高度、padding、gap 收束到 `radioButtonGeometryMap`。
- Checkbox / Radio default 控件不直接用 `--comp-size-sm/md/lg` 表达；button variant 仍跟随 `--comp-size-sm/md/lg` 的 24/32/40 高度，未来若迁移到 Toggle / ToggleGroup，再重新设计承接。
- Checkbox / Radio 文档均新增“尺寸规格”表，说明 default 控件几何和 button sm/md/lg 的高度、padding、gap。

## 2026-06-03 FieldAction / InputNumber 尺寸规范定稿

- FieldAction 源码将 20x20 输入域内部动作位收束到 `fieldActionGeometryMap`；该尺寸服务于清空、展开、密码显隐等动作，不直接映射为 FieldRoot 整体高度。
- InputNumber 源码将中间输入段宽度和输入 padding 收束到 `inputNumberGeometryMap`：sm 为 72px / px-2，md 为 88px / px-3，lg 为 104px / px-3。
- InputNumber 整体高度仍由 FieldRoot 和 Button 的 `--comp-size-sm/md/lg` 共同控制，步进按钮复用 Button `shape="square"`，即 24/32/40 方形按钮。
- Field 文档新增 FieldAction 固有尺寸说明；InputNumber 文档新增中间输入段、输入 padding 和步进按钮尺寸规格表。

## 2026-06-03 Callout / Divider 尺寸规范定稿

- Callout 源码将外层布局、4px 左侧色条和内容 padding 收束到 `calloutGeometryMap`；主题色仍由 `calloutThemeMap` 独立维护。
- Divider 源码将横向布局、标签 padding、24px 靠边短线、纵向 1em 高度收束到 `dividerGeometryMap`；线型和颜色仍由 `lineClass` 负责。
- Callout 左侧色条用于语义提示结构，Divider 标签短线和纵向高度依赖分割线场景，均不直接映射 `--comp-size-sm/md/lg`。
- Callout / Divider 文档均新增“尺寸规格”表。

## 2026-06-03 Link 行为规范收敛

- Link 源码补齐正式 `href` / `target` / `rel` props；`target="_blank"` 且未显式传 `rel` 时默认补 `noopener noreferrer`。
- Link disabled 状态不再使用 `text-brand/50` 等透明语义色，而是按 theme 映射 `text-brand-disabled` / `text-success-disabled` / `text-warning-disabled` / `text-error-disabled`；default 使用 `--text-color-disabled`。
- Link disabled 状态会移除可跳转 `href`，并在点击时 `preventDefault` / `stopImmediatePropagation`，避免外部传入 href 时仍发生原生跳转。
- Link 文档新增“链接目标”示例和 props 说明，并明确 disabled 会阻止原生跳转和 `click` 事件派发。
- VitePress 文档站对组件 demo 的全局样式影响应继续在 `ComponentDemo` / VitePress theme 层处理，不应把 `!important`、文档专用 class 或特殊覆盖写进组件源码。

## 2026-06-03 Text / Title 字体规范收敛

- Text / Title 源码中的颜色、禁用色和标题等级 map 命名补充组件前缀，便于后续扫描时区分组件自身配置。
- Title 文档移除“字号参照 TDesign”的旧表述，改为说明 `level` 对应 `font-title-*` token。
- Text 文档新增字体规格说明：默认文本使用 `font-body-md`，`code` / `keyboard` 使用 `font-body-sm`。
- `docs/guide/typography.md` 已从旧 Tailwind `text-*` 阶梯更新为 Horizon 当前 `font-body-*` / `font-title-*` token 表。

## 2026-06-03/04 浏览器验证与 VitePress Demo 隔离结论

- 本轮完成 Input、InputNumber、Tag、Popper 的浏览器验证，并结合截图与 computed style 检查尺寸、状态色、cursor、Teleport DOM、Popper 定位行为等关键点。
- 文档站样式污染必须在 VitePress theme / demo shell 层处理，不应为了 VitePress 表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖。
- 旧 demo shell 曾暴露 input padding、disabled cursor、Link 样式和内部按钮布局污染等问题；当前已统一迁移到 `ComponentDemo` `.vp-raw` + `postcssIsolateStyles`，不再维护旧 scoped reset 白名单。
- `ComponentDemo` 负责源码折叠和复制，预览与源码展示共用 `docs/examples/**/*.vue`，避免文档页示例和展示源码漂移。
- Popper 浏览器验证中，hover / focus 触发在当前 in-app browser 通道不够稳定；V-02 / V-03 不作为自动化通过项，后续如需回归应使用专门测试环境或人工复核。

## 2026-06-04 Divider API 命名迁移

- 继续组件迁移扫描时确认：组件级视觉形态里仅 Divider 仍使用 `type="solid|dashed"` 表达线型；Input、FieldNativeInput、FieldAction 等剩余 `type` 均为原生 input/button 语义，不属于本轮迁移对象。
- Divider 源码已将线型 prop 迁移为 `variant="solid|dashed"`，默认仍为 `solid`；`lineClass` 改为基于 `props.variant` 判断 `border-dashed`。
- Divider 文档与 `docs/examples/divider/example-02.vue` 已同步为 `variant="dashed"`，继续使用 VitePress `:::demo` 单源示例体系。
- 验证：`npm run check` 通过；使用 5174 dev server 与内置浏览器确认 `/components/divider` 页面加载正常，虚线示例说明展示 `variant="dashed"`，源码展开后包含 `<Divider variant="dashed" />`，虚线分割线视觉正常。

## 2026-06-04 Callout 浏览器验证

- 使用内置浏览器验证 `/components/callout`：页面标题、2 个 `:::demo`、主题说明和源码预览均正常渲染。
- 6 个实际 Callout 实例的左侧色条宽度均为 `4px`，内容区 padding 均为 `12px 16px`，外层圆角跟随 `--round-default`。
- `brand` / `success` / `warning` / `error` 正文颜色分别命中对应语义色；带标题示例的 `Title level=6` 通过内联 color 跟随 Callout theme。
- 本轮未发现 Callout 源码或文档需要修正的问题。

## 2026-06-04 Checkbox / Radio 浏览器验证

- 使用内置浏览器验证 `/components/checkbox` 与 `/components/radio`：Checkbox 7 个 demo、Radio 4 个 demo 均正常渲染，文档中的 `variant="button"` 说明与示例源码可见。
- Checkbox default box 为 `16 × 16px`，check / indeterminate icon 为 `12 × 12px`；Radio default circle 为 `16 × 16px`，inner dot 为 `8 × 8px`。
- Checkbox / Radio button variant 的 sm/md/lg 高度分别为 `24px` / `32px` / `40px`，padding 与文档规格一致；disabled 项保持 `cursor: not-allowed`。
- 验证发现 Checkbox / Radio button variant 的非禁用按钮项 cursor 为浏览器默认值，已补为 `cursor-pointer`；复验后可点击项为 `pointer`，禁用项仍为 `not-allowed`。
- 交互验证通过：Checkbox 独立项、Checkbox button 组、Radio default 组和 Radio button 组点击后均能更新 checked / aria-checked / data-selected 状态，禁用项不改变。

## 2026-06-04 Switch / Badge 浏览器验证

- 使用内置浏览器验证 `/components/switch`：4 个 demo、8 个实际 Switch 均正常渲染；sm/md/lg track 为 `26×16` / `32×20` / `40×24`，thumb 为 `10×10` / `12×12` / `14×14`。
- Switch checked 状态位移通过 Tailwind v4 的独立 `translate` 属性生效，sm/md/lg 分别为 `10px` / `12px` / `16px`；disabled 与 loading 状态 cursor 为 `not-allowed`，点击 disabled 项被浏览器阻止。
- Switch 交互验证通过：非禁用关闭项点击后 checked / aria-checked / 背景色 / translate 同步更新，disabled 与 loading 项状态保持不变。
- 使用内置浏览器验证 `/components/badge`：7 个 demo、19 个实际 Badge 均正常渲染；dot 为 `6×6`，数字 / 文本胶囊为 `20px` 高、`16px` min-width、左右 `6px` padding。
- Badge `max` 显示 `99+`，`show-zero` 只在显式开启时显示 `0`，offset 反映到 translate matrix，自定义 `color` 覆盖背景色，`hidden` 示例仅保留未隐藏徽标。
- 本轮未发现 Switch / Badge 源码或文档需要修正的问题。

## 后续入口

- 任务清单：`TODO.md`。
- 阶段计划：`task_plan.md`。
- 工作流水：`progress.md`。
- 代理快速入口：`AGENTS.md`。
