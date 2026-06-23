# 项目 TODO

本文件记录未来要处理的隐藏问题、决策项和开发计划。新对话优先阅读 `AGENTS.md`，然后阅读本文件。

## 2026-06-23 收尾更新

- [x] 本地 `dev` 分支已先推送到 `origin/dev` 并设置 upstream；新一轮工作基于本地 `dev` 继续。
- [x] `docs/superpowers/**` 已解除“禁止恢复目录”的限制，可作为本地工作流 / spec 临时产物目录使用；边界是必须继续被 `.gitignore` 忽略，不能进入 git 提交。
- [x] Drawer v1 已作为公开抽屉组件落地：单一公开 `Drawer`，不提供 trigger / content / close primitive；公开状态为 `open` / `v-model:open` / `open-change`。
- [x] Drawer 复用 Dialog 内部 modal layer 能力，覆盖 top-layer、body scroll lock、focus trap、关闭后焦点恢复、Esc、overlay click、Drawer 内 Popover / DropdownMenu 等 Teleport 子浮层登记和 LIFO Esc。
- [x] Drawer 支持 `placement="right|left|top|bottom"`、默认左右 400px / 上下 320px 尺寸、通过 `class` / `style` / `panelClass` 控制面板尺寸、title / description / `ariaLabel`、`role="dialog|alertdialog"`、`showClose`、`closeOnEsc`、`closeOnOverlayClick`、`trapFocus`、`lockScroll`、`returnFocusOnClose`、`to`、`zIndex` 和 footer slot close helper。
- [x] Drawer v1 作为第一版先收住；当前能力偏基础，后续增强抽屉业务能力时再按真实需求补充，不在本轮继续扩 API。
- [x] `check:drawer` 已新增并纳入 `npm run check`，覆盖公开导出、文档注册、单组件公开面、modal layer 复用、四方向过渡、默认尺寸与 `style` 透传契约、ARIA / focus / scroll lock、示例覆盖和旧 primitive 命名扫描。
- [x] Drawer 文档页已在 `http://127.0.0.1:5205/components/drawer.html` 通过 in-app Browser 验证：基础打开 / Esc 关闭、右 / 左 / 上 / 下四方向、长内容 ScrollArea、Drawer 内 Popover + DropdownMenu 的 LIFO Esc 3→2→1→0、body scroll lock 恢复和本次时间戳后 console warning/error 为空。

## 2026-06-20 收尾更新

- [x] Notification v1 已作为结构化全局通知服务落地：仅公开命令式 `notification.info/success/warning/error/loading/close/closeAll/config`，不提供用户态 `<Notification />` 组件、`notification.open()` 或 `notification.custom()`。
- [x] Notification 支持 `title`、`content`、四角 `placement`、同 `key` 更新替换、`duration`、`closable`、`action`、`onClose` 和全局 `config`；普通通知默认 `duration: 4500`，loading 默认 `duration: 0`，默认位置为 `top-right`，默认最大数量为 4。
- [x] Notification loading / 任务型通知使用线性 `Progress`，通过 `progress: { percent, status? }` 表达任务完成度；loading 的成功、警告、错误结果保留进度条，并由 `progress.status` 驱动 Progress 与通知卡片视觉；v1 不支持 circle loading、通知中心、系统浏览器通知、hover 暂停倒计时、自动关闭倒计时进度条或历史持久化。
- [x] Notification 视觉稳定性已收口：桌面端固定 360px 宽度、窄屏收缩到视口内，文案变化只做内部换行；单条关闭、最后一条关闭和 `closeAll()` 统一为向上淡出，不再出现右向消失错觉。
- [x] `check:notification` 已新增并纳入 `npm run check`，覆盖命令式 API、禁用 open/custom、四角 placement、loading 默认不关闭、progress 复用、同 key 更新、SSR no-op、close/closeAll/config、文档示例和旧命名扫描。
- [x] Notification 文档页已在 `http://127.0.0.1:5204/components/notification.html` 通过 Playwright + 系统 Chrome 验证：基础状态、error alert、loading 线性进度、同 key loading 更新到 success 并保留 progress、warning / error 进度状态、360px 稳定宽度、关闭离场无横向漂移、closeAll、四角 placement、config max=2 和 console warning/error 为空。

## 2026-06-15 收尾更新

- [x] Progress v1 已作为公开确定进度组件落地：支持 line / circle、percent clamp、`status="success|warning|error"` 结果状态、custom color、默认 brand-only line / circle flow、circle 72/120/160px 预设尺寸；首版不支持未知进度、steps、buffer 或 success percent。
- [x] `check:progress` 已新增并纳入 `npm run check`，覆盖公开导出、VitePress 注册、ARIA、percent clamp、line/circle、对象式尺寸配置、默认态 line / circle flow、color 覆盖、status 图标、label/icon 互斥和旧 `primary/danger` / Progress `theme` API 命名扫描。
- [x] Progress 文档页已在 `http://127.0.0.1:5202/components/progress.html` 通过 in-app Browser 验证：线性高度 4/6/8px、环形直径 72/120/160px、brand line / circle active、custom color、line 填充圆形状态图标、circle 无圆底状态图标、label/icon 互斥、percent 边界与 console warning/error 为空。
- [x] 2026-06-20 已继续修正 Progress 的视觉表现：环形中心标签按直径从 `font-body-sm`、`font-body-md` 到 `font-body-lg` 递进，success / warning / error 线性状态改用填充圆形图标，circle 状态保留无圆底图标，circle active 改为与 line 同源的渐变 stroke 扫光并通过 `animateTransform` 从进度起点扫向当前进度端点，文档与 `check:progress` 契约已同步，`http://127.0.0.1:5202/components/progress.html` 已复验无 console warning/error。
- [x] 2026-06-20 已收口 Progress 的 `size` API：`size` 改为 `sm|md|lg|ProgressSizeConfig`，不再支持数字直传；对象字段为 `thickness`、`labelSize`、`diameter`，未指定字段回退到 `md` 规格；`thickness` 在线性表示 track height、在环形表示 stroke width，`diameter` 只用于 circle，状态图标跟随 `labelSize`，line 为 `1em`、circle 为 `2.4em`。
- [x] 2026-06-20 已将 Progress 公开状态语义从 `theme` 改为 `status`：默认 brand 进度色不作为状态枚举暴露，`status` 仅表达 `success` / `warning` / `error` 结果态；动态更新示例已补充，演示同一 `percent` 同步驱动 line / circle、暂停 / 继续、步进和重置。

## 2026-06-14 收尾更新

- [x] Dialog v1 已完成收尾复审和浏览器验证：安全 Teleport target fallback、Dialog 内 Popover / DropdownMenu 语义层 Esc、LIFO 子浮层关闭、嵌套 Dialog 自定义 z-index 继承、内部 behavior key 模块局部化均已落地。
- [x] `check:dialog` 已扩展到 213 项，覆盖嵌套 DropdownMenu in Popover 示例、LIFO child Esc、resolved z-index、PopoverTrigger 指向真实 PopperContent id、内部 key 不公开和示例旧 API 扫描；`check:popper` 已扩展到 34 项，补 PopoverTrigger 避免从 Popper barrel 导入 context。
- [x] Message v1 已按 Signal Rail 方向落地：仅公开命令式 `message.info/success/warning/error/loading/close/closeAll/config`，不提供用户态 `<Message />`、`message.open()` 或 `message.custom()`；支持同 `key` 更新替换、loading 默认不自动关闭、`close(key)`、`closeAll()` 和全局 `config`。
- [x] `check:message` 已新增并纳入 `npm run check`，覆盖命令式 API、禁用 open/custom、config、key 更新、SSR no-op、host 单例、图标/色条映射和文档示例；Message 文档页已在 `http://127.0.0.1:5201/components/message.html` 通过 in-app Browser 验证。
- [x] 2026-06-14 `npm run check` 通过；in-app Browser 在 `http://127.0.0.1:5200/components/dialog.html` 复验 Dialog 嵌套浮层 Esc 顺序、scroll lock、focus restore 和 console warning/error 为空。

## 2026-06-11 收尾更新

- [x] Form / FormItem 本轮视觉与基础行为已收口：help tooltip 保留 arrow；checkbox / radio / switch 与 label 垂直居中；FormItem 使用 24px 消息预留区，message 固定 20px 且不挤压控件；status icon 垂直居中并占用 20px 状态槽。
- [x] Form 校验已改为并发启动、每项完成后立即提交自身结果；示例移除人为 200ms 延迟，避免误判为串行校验。
- [x] Form review 发现的三项问题已在本轮修复：异步校验旧结果不再覆盖最新状态；`validateField` / `validateFields`、`resetField` / `resetFields`、`clearValidateField` / `clearValidate` API 拆清；`resetField` 初始值快照改为递归 clone。
- [x] 已切到本地 `dev` 分支并删除旧 `codex/docs-and-icon-rework` 本地分支；远端当前仍只有 `origin/master`，未擅自创建远端 `dev`。
- [x] Dialog v1 已按用户确认方案落地：单一公开组件，不提供 Dialog trigger/content/close 子组件；通过 `v-model:open` 控制，内部负责 overlay、ARIA、focus trap、Esc、overlay click、滚动锁、关闭后焦点恢复、top-layer 和 Dialog 内 Teleport 子浮层协调。
- [x] Drawer 已在 Dialog modal layer 跑稳后复用内部能力落地。
- [ ] Popconfirm 后置，后续按真实使用场景再启动。

## 需要用户决策

当前没有阻塞本轮开发的用户决策项。

## 近期开发计划

- [ ] 继续完善公开底层组件 Field：首版 `src/components/Field/` primitives 已落地，并已迁移 Input / InputNumber；后续需要用 Select 多选、DatePicker range 等场景继续验证 FieldGroup、multiline 和 FieldSegment 边界。
- [x] 继续打磨 Progress 表现：2026-06-20 已完成一轮环形中心标签视觉修正，并将 circle active 对齐为和 line 同源的渐变扫光模型。
- [x] Progress 的尺寸模型已收口；Notification 已按路线落地并复用线性 Progress 表达 loading 任务进度。
- [ ] 组件迁移扫描进入滚动守护：2026-06-04 已对当前实现组件集完成收敛扫描，未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token 或组件级视觉 `type` 残留；后续按新增组件和复杂场景继续扫描。
- [ ] 后续扫描时只把组件源码内部实现作为规范约束对象；文档示例可保留外部使用者风格，不强制迁移到 Horizon token。
- [ ] 为后续新增或继续迁移的关键组件补充更稳定的浏览器级视觉验证；Input、InputNumber、Tag、Popper、Callout、Checkbox、Radio、Switch、Badge、Tooltip、Select、ScrollArea、Form、Dialog、Drawer、Message、Progress、Notification 已完成一轮浏览器验证并修复或确认发现的问题。
- [ ] 后续新增或继续迁移组件文档时，统一使用 VitePress `:::demo`；示例源码放在 `docs/examples/<component>/`，由文档页引用同一份 `.vue` 示例。
- [ ] 后续参考 Element Plus 的文档站路线，逐步自定义 VitePress 文档 shell / demo 渲染层，减少对默认 VitePress theme reset 的依赖；完成后移除当前为兼容默认 theme 临时加入的 `data-horizon-teleport-layer`、`postcssIsolateStyles` Teleport 层隔离和相关契约检查。
- [ ] 根据新的组件规范，继续统一文档示例里的组件 API 命名和状态说明；示例外部样式不强制 token 化。
- [ ] 后续 VitePress 发布高于 `1.6.4` 的正式版本时，复查并升级以消除当前嵌套 Vite/esbuild 的 audit 项。
- [ ] 评估并迁移包管理器：优先考虑 pnpm，备选继续 npm，不优先 Bun / Yarn；迁移时使用 Corepack 固定 pnpm 11，替换 `package-lock.json` 为 `pnpm-lock.yaml`，统一 scripts、`packageManager`、`engines` 和项目记忆文档，并验证 `pnpm install`、`pnpm run check`、audit 等价项和关键文档页面。
- [ ] 按新的组件路线继续推进：Select slot-first、Popover、Menu、DropdownMenu、Form / FormItem、Dialog、Drawer、Message v1、Progress v1 与 Notification v1 已落地；Textarea 本轮先不做、后续按真实需求再启动；后续建议看 DatePicker / TimePicker、Pagination / Table、Tabs / Breadcrumb / Steps、NavigationMenu、TreeSelect / Cascader / ColorPicker；Popconfirm 与 TagInput 因独立使用场景较少先后置。
- [ ] 评估并沉淀真正有收益的内部通用原型：Select 与 Menu 已各自用 slot 子组件 + 内部 collection 注册跑通首版；后续等 Autocomplete、Tabs、NavigationMenu 等出现真实重复后，再考虑抽 OptionList / Collection。RovingFocus / Composite 优先服务 Radio button variant、ToggleGroup、Tabs、Menu；Dialog 已先沉淀内部 modal layer（top layer、scroll lock、focus trap、Teleport 子浮层登记），Drawer 已复用该能力验证抽屉场景；Form / FormItem 已沉淀内部 FormControl context，但不对外暴露 FormLabel / FormControl / FormMessage primitives；PopupSurface 暂缓。
- [x] 2026-06-10 Form / FormItem 首版已落地：默认 `labelAlign="right"`、`labelWidth=120`，help 通过 label 问号 tip 展示，控件下方消息行仅显示校验 / 状态文案并默认预留高度；轻量校验逻辑集中在 `src/components/Form/validator.ts`，并新增 `npm run check:form` 守护。
- [x] 继续按用户反馈逐项校正 Form / FormItem 视觉细节：已完成 label / control / action 三段布局、20px 状态图标槽、help tooltip arrow、控件与 label 垂直居中、24px 消息预留区、message 20px 绝对定位、并发校验即时提交、异步校验竞态保护和表单实例 API 拆分。
- [x] 2026-06-06 ScrollArea v1 已作为公开底层组件落地：结构固定为 `root > viewport > content`，viewport 是唯一真实滚动容器；支持原生滚动、隐藏原生滚动条、悬浮自定义 scrollbar、thumb 拖拽、auto / always / hidden 显隐、垂直 / 水平 / 双轴滚动、`maxHeight` / `maxWidth`、`focusable`、`ariaLabel` 和 `scroll` / `update` 事件。
- [x] ScrollArea 已 expose `viewportRef`、`contentRef`、`scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState`，并提供内部 context；v1 不引入虚拟滚动依赖，但 viewport 接口可服务未来 `@tanstack/vue-virtual` 等 virtualizer。
- [x] Select 面板已迁移到 `ScrollArea :max-height="240"`，active option 保持可见改为通过 ScrollArea `scrollToElement(..., { block: 'nearest' })` 完成，不再直接调用浏览器 `scrollIntoView()`。
- [x] Select 后续调整队列：2026-06-06 已按用户确认的第三版视觉方向落地 edge-to-edge 选项行、浅 brand 选中背景、左侧深 brand 条和无右侧 check 图标，并已将 `clearable` 改为鼠标悬浮 Select 主体时下拉箭头位置切换为清空按钮；Select 触发器已补 `PopperTrigger class="w-full"` 并统一 Select 示例父容器宽度；Select 下拉面板已移除显式 border，改为仅通过 `shadow-popper` 的多层阴影和 inset edge 表达浮层边缘；Select group API 已按 `children` 判定分组、`title` 作为组标题落地，首版只支持一层 group。
- [x] 2026-06-05 已全局安装 `better-auth/better-icons@better-icons`、`mattpocock/skills@grill-me`、`mattpocock/skills@design-an-interface`、`addyosmani/agent-skills@documentation-and-adrs`；重启 Codex 后可用于统一 SVG 图标检索、重要设计压力测试、模块接口多方案比较和 ADR / 决策记录。安装输出里 `PromptScript` 不支持全局安装的失败不影响 Codex。
- [x] 2026-06-05 已完成 Icon SVG 图标体系首轮重整：当前 48 个本地图标已按 Lucide outline 风格同名替换，并统一 `viewBox="0 0 24 24"`、`currentColor`、`stroke-width="2"`、round linecap / linejoin 和无固定 `width` / `height` 的源文件规范；已补 `npm run check:icons` 并纳入 `npm run check`。
- [x] 2026-06-06 已补充 48 个企业组件库常用本地图标，当前内置图标总数为 96；新增图标覆盖导航、数据、表单、反馈、权限、文件、操作和系统场景，并加入 `check:icons` 必备列表。
- [x] 2026-06-08 Select 已改为 slot-first 单选首版：使用 `SelectOption` / `SelectOptionGroup` 子组件，不再暴露首版数据 prop；复用 Field / Popper / ScrollArea，保留 clearable、loading、empty、disabled option、readonly、尺寸、状态、隐藏 input、键盘导航和 combobox/listbox ARIA。
- [x] 2026-06-08 Popover / Menu / DropdownMenu 已按新边界落地：Popover 提供 `open` / `v-model:open`、全触发模式、dismiss、focus return 和 nested layer；Menu 提供 item / checkbox item / radio item / submenu / group / label / separator；DropdownMenu 作为 `Popover + explicit Menu` 预设，不再保留泛型 Dropdown。
- [x] 2026-06-11 Dialog v1 已落地：单一公开 `Dialog` 组件，公开状态为 `open` / `v-model:open` / `open-change`；不提供 trigger primitive；默认提供 overlay、右上角裸 close icon、无 footer 分割线、focus trap、Esc、overlay click、scroll lock、ARIA、内部 top-layer 和 Dialog 内 Popper / Select 等 Teleport 子浮层协调。
- [x] 2026-06-23 Drawer v1 已落地：单一公开 `Drawer` 组件，公开状态为 `open` / `v-model:open` / `open-change`；不提供 trigger primitive；复用 Dialog modal layer，支持四方向抽屉、预设 / 自定义尺寸、footer close helper、Esc / overlay click / close icon 和 Drawer 内 Teleport 子浮层 LIFO Esc。
- [ ] 在 Figma `Horizon Icons Audit` 页面继续人工复核新版图标的视觉中心和真实容器表现；如发现单个图标仍不理想，再按同名文件局部替换或微调 SVG。
- [ ] 后续设计稿、组件视觉方案和图标审阅优先落到用户提供的 Figma `Horizon UI` 文件。当前 Figma Starter 计划最多 3 页，推荐整理为 `00 Workspace`、`01 Icon Library`、`02 Component Drafts`；2026-06-05 继续补常用图标时因 MCP 工具调用额度被拦，额度恢复后再重跑。
- [x] 2026-06-05 收尾时遗留的记忆文档改动已在 `4517523 docs(project): 更新未来计划与技能记忆` 中提交。
- [ ] 后续评估新增 Toggle / ToggleGroup，用于承接 CheckboxGroup / RadioGroup 当前 `variant="button"` 这类分段切换形态；暂时不实现，现有 Checkbox / Radio button variant 先保持。
- [ ] 后续新增或改造组件时，继续沿用组件内部 geometry map / 常量维护固有尺寸；首轮已定稿 Switch、Badge、Tooltip / PopperArrow、Checkbox / Radio、FieldAction、InputNumber、Callout、Divider，不新增通用尺寸 token。
- [ ] 最后补全 dark mode 色彩规范。当前颜色体系主要完成 light 规范，dark token、暗色状态映射、文档说明和组件适配尚未完成。

## 隐藏问题

- [ ] Field 一旦公开，API 需要谨慎收敛：首版只暴露结构、状态和样式基座，不承载 Select/DatePicker 等业务行为；多选 Select 的 Tag wrap / searchable / maxTagCount 是后续关键压力测试。
- [x] Select 分组首版已改为 `<SelectOptionGroup title="...">` slot 子组件；旧 `children` 数据结构仅作为历史记录，不再是当前首版公开契约。
- [ ] 组件级固有尺寸首轮已统一为组件内部 geometry map / 常量策略；后续扫描新组件时避免把强耦合结构尺寸误沉淀为通用 token。
- [ ] Checkbox / Radio 的 button variant 未来可迁移或抽象到 Toggle / ToggleGroup；迁移前需确认是否保持多选/单选语义差异，避免只为了视觉复用而损失表单语义。
- [ ] Radio button variant 当前方向键可用，但尚未做 roving `tabindex`；若继续提升 radiogroup 键盘模型，应与 Toggle / ToggleGroup 方向一起设计。
- [ ] 内部通用原型必须有明确跨组件收益才沉淀：OptionList / Collection 和 RovingFocus / Composite 可优先作为内部 composable / primitives 验证，不急于公开；Dialog 已沉淀内部 modal layer 并被 Drawer 复用，但暂不公开为 Overlay / Layer primitive；Popper context 已拆出 `context.ts` 避免 barrel 循环；PopupSurface 不为了统一边框、背景、圆角和阴影而提前抽成万能盒子。
- [ ] ScrollArea v1 暂不做虚拟滚动和轨道点击分页；未来 Table、Tree、Virtualized Select 或大型 Dropdown 出现真实需求时，优先评估 `@tanstack/vue-virtual`，因为它以 HTML scroll element 为核心接入点，和 ScrollArea 暴露的 viewport 契约匹配。
- [ ] Popper 未来可按上层组件需要继续扩展边界能力，例如嵌套弹出层协调、boundary 自定义、crossAxis offset 或 fallback placement；当前 Select/Dropdown 前置的响应式配置、disabled 自动关闭、matchWidth trigger resize、可配置 outside click / Esc 关闭和 base-component review 已完成。
- [ ] 当前 in-app browser 控制通道对 hover 事件触发仍不稳定；Tooltip hover 与 Popper V-02 已检查源码事件链和视觉结构，后续如需稳定回归 hover，应优先补专门的浏览器测试环境或人工实测；Tooltip focus 与 Popper V-03 已在内置浏览器复验通过。
- [ ] VitePress 文档站样式污染应统一在文档 shell / theme 层处理，不要写进组件源码。当前 demo 体系使用 `ComponentDemo` 的 `.vp-raw`、`data-horizon-teleport-layer` 与 `postcssIsolateStyles` 隔离 VitePress `base.css` / `vp-doc.css`；这是沿用默认 VitePress theme 期间的阶段性方案，后续应像 Element Plus 一样自定义文档 shell 后移除这类兼容逻辑，不要再为文档表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖。
- [x] Icon 首轮重整已保留当前 `Icon` 组件 API：默认 `1em`、继承 `currentColor`、不恢复固定 `size` prop；本轮只替换 / 规范化 SVG 源文件、补校验脚本和增强图标网格预览。
- [ ] 如未来 `Icon` 支持外部 SVG 或运行时 SVG 文本，必须重新评估当前 `v-html` 本地图标白名单策略，加入 sanitizer 或改为更安全的渲染路径。
- [x] 2026-06-06 ScrollArea / Select 已通过 headless Chrome CDP 验证：ScrollArea 垂直 / 水平 / 双轴示例、auto 显隐、thumb 拖拽、focusable 和 scroll metrics 正常；Select 分组示例确认面板使用 ScrollArea，方向键跳过 disabled option，active option 保持可见。
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
- [ ] `docs/superpowers/**` 可作为本地工作流 / spec 临时产物目录使用，但必须保持被 `.gitignore` 忽略，不进入 git 提交；长期项目记忆仍同步到根目录文档。
