# 工作进度记录

## 2026-06-02

### 组件迁移扫描

- 启动新一轮源码与文档扫描，范围包括 `src/components/**`、`docs/components/**` 和样式 token。
- 已扫描旧语义 API、`primary` / `danger` 残留、`type` 用法、禁用态 opacity、硬编码颜色、Tailwind 原生色阶和圆角/字体/间距 token 使用。
- 扫描命令中有两次 PowerShell 引号/参数解析错误，已改用单引号和 `rg --` 重新执行，后续避免让以 `--` 开头的搜索模式被解析为命令参数。
- 初步发现：`CheckboxGroup` / `RadioGroup` 的 `type="button"` 可能需要未来迁移为 `variant`；`Text` / `Title` 的 `mark` 与 `Text` 的 `keyboard` 存在可直接 token 化的小偏差；文档中的自定义 hex 色多为现有 API 示例，先记录不直接删除。
- 用户确认规范边界：组件源码内部实现需要遵守 Horizon 规范；文档示例属于抛给使用者看的外部代码，可以自由使用非 token 颜色、尺寸、圆角和业务样式。
- 已修复第一批低风险组件内部偏差：`Text` / `Title` 默认高亮改为 `bg-warning-light`，`Text` keyboard 阴影改为 `--border-color-divider`，`Tag` 自定义暗色前景改为文本 token。
- 已退回 `Space` 与 `Popper` 文档示例的 token 化改动，保留示例作为外部使用场景的自由样式。
- 验证通过：`npm run format:check`、`npm run lint`、`npm run typecheck`、`npm run build`。
- 用户确认 `Tag` / `Badge` / `Icon` / `Title mark` 等对外自定义色 API 可以保留，用户传入色值不受内部 token 规范约束。
- 用户确认 `CheckboxGroup` / `RadioGroup` 的按钮形态 API 应迁移到 `variant`；已将源码、provide/inject 上下文和组件文档中的 `type="button"` 更新为 `variant="button"`，并顺手让 group 注入给子项的 `variant` / `size` / `disabled` 保持响应式。
- 用户确认 gap 不需要 token 化，`--space-*` 不再作为 Horizon 规范 token；已移除 `src/styles/tokens/size.css` 中的 `--space-*` 定义，并恢复组件内部普通 Tailwind `gap-*` 写法。
- 用户进一步确认 padding 也不需要 token 化；已移除 `src/styles/tokens/size.css` 中的 `--padding-x-*` / `--padding-y-*` 定义，并将组件内部已使用 padding token 的地方恢复为等值 Tailwind spacing class。
- `Icon` 已移除固定尺寸预设和 `size` prop，默认宽高为 `1em`，由字号或外部 class/style 控制；`Switch` loading 图标改为通过字号 class 适配。
- Tooltip 已迁移到 Popper 基座：Tooltip 继续负责语义 API、延迟与主题视觉，Popper 负责定位、Teleport、arrow、outside click、Esc 和 z-index。
- Tooltip 浮层阴影已沉淀为 `--shadow-popper` / `shadow-popper`，参考 TDesign 中层浮层多层投影并叠加 inset 边界，增强浅色主题气泡与页面背景的分离度。
- 用户确认 Field 不应隐藏在 `_internal`，而应作为类似 Popper 的公开底层组件放在 `src/components/Field/`；已新增 `docs/guide/field-system.md` 记录 Field 输入域体系的目标、组件草案、状态模型、布局模式、未来组件适配、性能和可访问性原则。
- 已新增公开 `src/components/Field/` primitives：Root、Content、NativeInput、Prefix、Suffix、Action、Group、Segment；新增 `docs/components/field.md` 并加入底层组件导航，Input 已迁移到 FieldRoot/FieldNativeInput/FieldAction 以验证首版边界。
- Field primitives 已补充公开组合所需的 class 合并顺序：内部默认 class 在前，外部 `class` 后置合并，避免用户传入 `px-0`、`flex-1` 等覆盖类失效。
- FieldRoot 增加 `focus-within` 默认焦点 ring；FieldSegment 增加 `focus-within:text-brand`，让 range segment 在内部输入聚焦时无需手写 JS 也能呈现 active 视觉。
- InputNumber 已迁移为复用 FieldRoot / FieldNativeInput / FieldGroup 的中间输入域基座，步进按钮仍由 InputNumber 自身控制；同时修复聚焦时 ArrowUp / 步进按钮更新值后展示不同步的问题。
- 浏览器验证通过：Field sm/md/lg 尺寸为 24/32/40，多值输入清空按钮居中，range segment 聚焦后分段变 brand 色；Input 焦点 ring 正常；InputNumber sm/md/lg 尺寸为 24/32/40，焦点 ring、键盘步进和按钮步进正常。
- 用户确认 `InputNumber` 的 `readonly` 按“不允许编辑”理解；步进按钮保留普通视觉状态，但点击不改值，文档改为“只读，不允许输入或通过步进改值”。

### 代码编辑器与检查工具规范

- 采用稳健现代路线：保留 Prettier + ESLint，并补充 EditorConfig、Gitattributes、Stylelint 与 Tailwind class sorting。
- 新增 `CODE_STYLE.md`，记录未来新增文件需要遵守的编辑器、格式化、lint 和 VS Code 规范。
- 新增 `.editorconfig`，统一 UTF-8、2 空格、LF、最终换行和尾随空格策略；Markdown 保留尾随空格例外。
- 新增 `.gitattributes`，固定文本文件 `eol=lf`。
- 更新 `prettier.config.js`：补充 `endOfLine: 'lf'`、`useTabs: false`，将 `arrowParens` 改为 `always`，并接入 `prettier-plugin-tailwindcss`。
- 新增 `stylelint.config.js`，基于 `stylelint-config-standard-vue` 检查 CSS 与 Vue style，并放行 Tailwind v4 at-rule 与必要表单兼容性前缀。
- 更新 `.vscode/settings.json` 与 `.vscode/extensions.json`，记录推荐编辑器设置和扩展。
- 新增 `lint:js`、`lint:style`、`check` 脚本；`lint` 改为同时运行 JS lint 与 style lint。

## 2026-06-01

### 项目理解

- 阅读并整理 Horizon UI 项目结构、VitePress 文档、组件源码、样式 token 和历史计划文档。
- 确认当前主线是组件库规范迁移：语义色、功能色、尺寸、圆角、字体、状态样式和 API 命名。
- 确认 `docs/superpowers/**` 是历史计划资料，不能直接当作最新完成状态。

### 组件迁移与修复

- 清理 Badge、Tag、InputNumber 等组件的旧 token / 旧 API 残留。
- Badge 改为 `theme="default|brand|success|warning|error"`。
- Tag 改为 `theme` + `variant`，并移除 size 配置，仅保留 sm 尺寸。
- Tag 默认高度改为 24px，左右 padding 为 8px，图标间距为 8px。
- Input 默认占满父元素宽度。
- Input disabled 状态修正为明确的 disabled bg/border/text token。
- InputNumber disabled 输入框补充 `cursor-not-allowed`。
- PopperContent 保持无视觉样式，并转发 attrs 到 Teleport 后的真实浮层 DOM。
- Popper 文档去掉默认边框、深浅色主题暗示；确认 Popper 不提供 shadow/elevation。

### 文档与配置

- 更新组件文档示例，使其匹配新 API 和组件状态说明；示例外部样式不强制 token 化。
- Badge 加入 VitePress sidebar。
- `docs/superpowers/**` 加入 VitePress `srcExclude`，避免内部计划文档影响构建。
- 新增 `.agents/skills/base-component-review`，记录底层组件审查流程。
- 新增/维护根目录记忆文档：`AGENTS.md`、`TODO.md`、`task_plan.md`、`findings.md`、`progress.md`。

### Git 与提交

- 已将本轮工作拆成符合规范的中文说明 Conventional Commit：
  - `refactor(components): 对齐组件设计令牌规范`
  - `docs(components): 同步组件示例与迁移说明`
  - `docs(project): 记录组件迁移进度`
  - `style(format): 统一项目代码风格`
- 这些提交已推送到 `origin/master`。
- 后续继续使用 Conventional Commit 格式，并使用中文说明。

### 清理

- 将 `switch-mockups.html` 作为本地视觉原型加入 `.gitignore`。
- 删除一个空的异常目录：名称类似被写坏的 `D:\project\ui\src\components\Space` 路径。
- 删除本地 Switch 视觉原型 `switch-mockups.html`。
- 暂未删除 `docs/.vitepress/cache` / `docs/.vitepress/dist`，因为它们是构建/开发服务生成物，清理时机需要看 dev server 使用情况。

### 小项处理

- 补充 dark mode 未完成状态：当前主要完成 light 色彩规范，dark token、状态映射、文档说明和组件适配仍是高优先级后续项。
- `Icon.vue` 的 raw SVG 渲染保留为本地图标白名单策略，并补充安全边界说明以处理 `vue/no-v-html` warning。
- 在 `AGENTS.md` 补充“下次新对话快速接入”段落，明确新会话检查顺序、阅读顺序和优先后续项。

### 验证

- `npm run typecheck`：通过。
- `npm run lint`：通过，无 `Icon.vue` 的 `vue/no-v-html` warning。
- `npm run format:check`：通过。
- `npm run build`：通过。
- `/components/popper` HTTP 检查：通过。

### 待办

详细待办见 `TODO.md`。优先项：

- Popper deferred 行为。
- Popper base-component review。
- Icon 外部 SVG 安全策略：仅当未来支持外部 SVG 输入时需要重新设计。
- 浏览器/截图级视觉验证。

### 历史计划资料清理

- 审计 `docs/superpowers/plans` 和 `docs/superpowers/specs` 下的历史计划与设计稿。
- 确认多数内容是早期实施草案，当前源码、组件文档和根目录记忆文件已覆盖，不再需要继续保存。
- 提取并保留有效结论到 `findings.md`：Popper 的上层依赖链、Paragraph 旧计划过时、Tooltip 后续可评估迁移到 Popper、早期 `type` → `theme` 和禁用态 token 方向已被当前规范吸收；其中 Tooltip 迁移后续已于 2026-06-02 落实。
- 用户已决定 dark mode 放到当前队列最后，优先处理 Popper、组件迁移扫描和浏览器级视觉验证。
- 删除 `docs/superpowers/**`，并移除 VitePress `srcExclude: ['superpowers/**']` 过期配置。

### Popper base-component review

- 按性能、功能完整性、代码质量三路完成 Popper 底层组件审查。
- Iteration 1：Critical 0，Important 4，Minor/Deferred 3；修复响应式 middleware 配置、`matchWidth` 布局读取/resize、`disabled` 打开态关闭、`autoUpdate` 动态切换清理。
- Iteration 2：Critical 0，Important 0，Minor/Deferred 3；保留给未来上层组件驱动的扩展包括嵌套弹出层协调、boundary 自定义、crossAxis offset / fallback placement。
- 使用一次性 Node 断言脚本先观察 RED，再修复并验证 GREEN；项目当前没有正式测试框架。
- 浏览器验证 `/components/popper`：V-04 打开态 trigger 宽度从 192px 切到 288px 时浮层同步变宽；V-09 打开后切换 disabled 会关闭浮层。

### Button / InputNumber 形态整理

- 用户确认当前开发阶段不需要为旧写法保守兼容，优先以最终好用的 API 和视觉为准。
- Button 新增 `variant="solid|outline"`，将视觉形态从 `theme` 中拆出；新增 `shape="rectangle|round|circle|square"`，默认 `rectangle`。
- Button 删除 icon-only 自动圆形推断，图标按钮需要显式使用 `shape="square"` 或 `shape="circle"`。
- InputNumber 两侧步进按钮改为复用 Button 的 `variant="outline"` + `shape="square"`，删除组件内部重复的按钮视觉 class；`readonly` 仍按“不允许改值但不呈现 disabled 视觉”处理。
- `docs/components/button.md` 已同步新的 Button API 和示例。
- 验证通过：`npm run check`；浏览器确认 `/components/button` 的 outline 与 shape 渲染正常，`/components/inputnumber` 的 stepper 尺寸为 24/32/40、点击步进同步、disabled/readonly 状态符合预期。

### 组件级固有尺寸扫描

- 用户建议 Checkbox / Radio 当前 `variant="button"` 的分段切换形态，未来可单独抽为 Toggle / ToggleGroup；本轮只记录计划，不实现。
- 按源码扫描 Badge、Switch、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider 等固定尺寸候选。
- 浏览器实测：Badge dot 为 6x6，计数徽标为 20px 高、最小宽 16px、左右 padding 6px；Switch sm/md/lg 轨道为 26x16、32x20、40x24，滑块为 10/12/14px；Tooltip surface 为 28px 高、`px-2 py-1`，PopperArrow 源尺寸为 8x8，旋转后包围盒约 11.3px。
- 初步结论：不急于新增全局尺寸 token；Badge、Switch、Tooltip/PopperArrow 等先保留组件内部几何常量或 size map，后续按组件逐项确认是否沉淀组件级 token。已更新 `TODO.md`、`findings.md`、`task_plan.md`、`AGENTS.md`。

### Switch 尺寸规范定稿

- Switch 的 track、thumb、thumb 位置、激活位移和 loading 图标字号统一收束到 `switchGeometryMap`，作为组件内部几何矩阵维护，不新增通用尺寸 token。
- Switch 文档新增“尺寸规格”表，说明 sm/md/lg 的轨道、滑块、位移和 loading 图标尺寸；`size` prop 说明改为“组件几何尺寸”。
- Switch 输入补充 `role="switch"` 和 `aria-checked`，隐藏 input 聚焦时 track 使用 brand focus ring。
- 验证：`npm run check` 已通过；浏览器确认 sm/md/lg 尺寸、`role="switch"`、`aria-checked` 和文档规格表渲染正常。自动化运行时无法可靠触发隐藏 input 的 `:focus` 匹配，但 scoped focus CSS 已注入到页面。

### Badge 尺寸规范定稿

- Badge 的 dot 和 content 尺寸统一收束到 `badgeGeometryMap`，作为组件内部几何规格维护，不新增通用尺寸 token。
- Badge 文档新增“尺寸规格”表，说明 dot 为 6x6，数字/文本胶囊为 20px 高、16px 最小宽度、左右 6px 内边距，并记录默认右上角锚点和 `offset` 微调语义。
- 验证：`npm run check` 已通过；浏览器确认 dot 为 6x6，数字/文本胶囊为 20px 高、16px 最小宽度、左右 6px 内边距，文档规格表渲染正常。

### Tooltip / PopperArrow 尺寸规范定稿

- Tooltip 的 surface 几何规格统一收束到 `tooltipSurfaceGeometryMap`，保留最大宽度 240px、左右 8px、上下 4px、`font-body-sm`、`round-default`。
- PopperArrow 的 8x8 箭头尺寸与 -4px 静态边偏移统一收束到 `popperArrowGeometry`，不新增尺寸 API，仍由父级背景继承颜色。
- Tooltip 文档新增“尺寸规格”表，Popper 文档补充 PopperArrow 结构规格。
- 验证时发现 Tooltip click 示例打开后 trigger 为 `aria-expanded="true"`，但 PopperContent Teleport DOM 未挂载；已将 PopperContent 的 visible 状态和 Teleport target 收束为顶层 computed，修复该边界。
- 验证：`npm run check` 已通过；使用临时 5174 dev server 浏览器确认 Tooltip 文档规格表渲染正常，click 示例浮层为 28px 高、最大宽度 240px、左右 8px / 上下 4px padding，PopperArrow 布局尺寸为 8x8，旋转后包围盒约 11.31px。5173 原 dev server 在 in-app browser 中出现客户端未挂载，因此本轮浏览器验证改用 5174。

### Checkbox / Radio 尺寸规范定稿

- Checkbox default box / icon 几何收束到 `checkboxControlGeometryMap`，button variant 高度、padding、gap 收束到 `checkboxButtonGeometryMap`。
- Radio default circle / inner dot 几何收束到 `radioControlGeometryMap`，button variant 高度、padding、gap 收束到 `radioButtonGeometryMap`。
- Checkbox / Radio 文档新增“尺寸规格”表；Toggle / ToggleGroup 方向继续只记录，不在本轮实现。
- 验证：`npm run check` 已通过；使用 5175 preview 浏览器确认 Checkbox box/icon 为 16x16 / 12x12，Radio circle/选中 dot 为 16x16 / 8x8，button sm/md/lg 为 24/32/40 高，padding/gap 与文档规格一致。
