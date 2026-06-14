# 项目理解记录

本文件记录当前对 Horizon UI 的项目理解。新对话优先阅读 `AGENTS.md`、`TODO.md`，再阅读本文件补充上下文。

## 项目快照

- 项目根目录：`D:\project\ui`。
- 项目类型：Vue 3 企业级组件库 + VitePress 文档站。
- 技术栈：Vue 3、TypeScript strict、Tailwind CSS v4、VitePress、ESLint、Stylelint、Prettier。
- 运行时基线：Node.js `>=24.16.0`、npm `>=11.13.0`，`packageManager` 为 `npm@11.13.0`。
- 当前工作主线：重新定义组件库规范，并迁移所有组件的尺寸、颜色、圆角、字体、状态样式和 API 命名。

## 代码风格与检查工具

- 仓库级规范记录在 `CODE_STYLE.md`。
- `.editorconfig` 固定 UTF-8、2 空格、LF、最终换行和尾随空格策略；Markdown 允许尾随空格。
- `.gitattributes` 固定文本文件 `eol=lf`，避免不同机器的 Git 换行设置造成差异。
- Prettier 保持无分号、单引号、100 字符宽度、尾随逗号，并改用 `arrowParens: 'always'`。
- `prettier-plugin-tailwindcss` 负责 Tailwind class sorting，读取 `src/styles/horizon.css`，并处理 `clsx` / `cn` 中的 class。
- ESLint 负责 JS/TS/Vue 代码质量；Stylelint 基于 `stylelint-config-standard-vue`，负责 CSS 和 Vue style。
- 当前 ESLint 已升级到 10.x；`eslint.config.js` 直接使用的 `globals` 已作为显式 devDependency 声明。
- 新增 `npm run lint:js`、`npm run lint:style`、`npm run check`；`npm run lint` 同时运行 JS lint 与 style lint，`lint:style` 覆盖 `src/**/*.{css,vue}` 和 `docs/.vitepress/theme/**/*.vue`。

## 目录结构

- `src/components/`：组件源码。
- `src/styles/`：样式入口和 token。
- `src/styles/tokens/`：按领域拆分的 token 文件：`color.css`、`typography.css`、`radius.css`、`size.css`、`shadow.css`、`motion.css`、`z-index.css`。
- `docs/components/`：组件文档。
- `docs/guide/`：设计指南。
- `docs/.vitepress/`：文档站配置和主题。
- `.agents/skills/base-component-review/`：底层组件审查 skill。

## 当前组件状态

已实现并文档化的组件：

- 基础：Button、Icon、Link、Text、Title、Divider、Space。
- 表单/输入：Checkbox、CheckboxGroup、Radio、RadioGroup、Switch、Input、InputNumber、Select、Form、FormItem。
- 展示/反馈：Badge、Tag、Callout、Tooltip、Popover、Menu、DropdownMenu。
- 底层：FieldRoot、FieldContent、FieldNativeInput、FieldPrefix、FieldSuffix、FieldAction、FieldGroup、FieldSegment、Popper、PopperTrigger、PopperContent、PopperArrow、ScrollArea。

特别说明：

- Paragraph 旧计划已过时，目前没有实现。
- Tooltip 已迁移到 Popper 基座；Tooltip 保留 theme、delay、trigger/manual 等语义和视觉 API，定位、Teleport、arrow、可配置 outside click / Esc dismiss 与 z-index 交给 Popper。
- Popper 是底层定位基座，不提供业务 surface 样式；已完成 base-component review，可作为 Select、Popover、MenuSub、DropdownMenu 等上层组件的当前基座。
- Field 已作为公开底层输入域基座落地在 `src/components/Field/`；它像 Popper 一样允许用户组合使用，不放在 `_internal`。
- ScrollArea 已作为公开底层滚动基座落地在 `src/components/ScrollArea/`；它负责滚动容器、悬浮 scrollbar、thumb 拖拽和 viewport expose，不负责 surface 视觉。
- Form / FormItem 已作为公开表单组件落地并完成本轮视觉与基础行为收口；内部拆分 FormItemLabel / FormItemMessage 与 FormControl context，但不把 FormLabel / FormControl / FormMessage 作为对外 primitives。
- Dialog 已作为公开模态容器落地在 `src/components/Dialog/`；它是单一公开组件，不提供 trigger/content/close 子组件，内部沉淀 modal layer 能力但不公开 Overlay / Layer primitive。
- Message 已作为命令式全局反馈服务落地在 `src/components/Message/`；它不公开用户态 `<Message />` 组件，不提供 `message.open()` / `message.custom()`，只通过 `message.info/success/warning/error/loading/close/closeAll/config` 使用。

## 历史计划资料处置

- `docs/superpowers/**` 已于 2026-06-01 审计并删除，后续不再补充。
- 该目录内大多数内容是早期实施草案，已经被当前源码、组件文档和根目录记忆文件覆盖；历史勾选状态不再作为依据。
- 保留下来的有效结论是：Popper 是 Select、Popover、DropdownMenu、Popconfirm、DatePicker、TimePicker、ColorPicker、MenuSub 等弹出类能力的前置基座；Select 依赖 Field、Popper、ScrollArea；DropdownMenu 依赖 Popover 与显式 Menu。
- Paragraph 旧计划已明确过时，当前不实现；如未来需要大段文本编排，重新按当前 API/token 规范设计。
- Tooltip 当前已迁移到 Popper 基座；历史上“后续评估迁移”的结论已落实。
- 早期交互规范里 `type` 迁移到 `theme`、禁用态不用 opacity、统一 token 的方向已被当前规范吸收；旧 token 名称和值不再直接沿用。
- 历史路线图只保留为方向参考：Select、Popover、Menu、DropdownMenu、Form / FormItem、Dialog 与 Message v1 已按当前边界落地；Textarea 本轮先不做，后续按真实需求再启动；Popconfirm 因应用场景较少后置，Drawer 等 Dialog 内部 modal layer 跑稳后再复用推进；后续再推进 Notification、数据展示、导航和复杂组件集群。实际顺序以用户需求和当前源码状态为准。

## 2026-06-05 未来组件路线与内部原型候选

- 当前建议的组件推进顺序：Dialog 与 Message 已完成首版 → Notification → Drawer → DatePicker / TimePicker → Pagination / Table → Tabs / Breadcrumb / Steps → NavigationMenu → TreeSelect / Cascader / ColorPicker → Popconfirm / TagInput。Form / FormItem 已完成本轮收口；Textarea 本轮先不做，后续按真实需求再插入路线。
- Select slot-first 单选首版已落地，已初步验证 Field、Popper、键盘交互、ARIA、empty、loading、disabled option、readonly 和 clearable 等组合边界；多选 tag wrap、searchable、maxTagCount 等仍是后续压力测试。
- TagInput 已降到路线最后：它仍可作为 Field 多值 / multiline / Tag wrap / Backspace 删除 / 输入宽度自适应的压力测试，但独立使用场景相对较少，先等后续出现明确自由多值输入需求时再启动。
- Popover / Menu / DropdownMenu 已按“原语 / 英文 / ARIA 优先”的边界拆分：Popover 负责任意非模态浮层，Menu 负责动作 / 命令菜单内容，DropdownMenu 是 `Popover + explicit Menu` 的菜单型预设；导航后续由 NavigationMenu 承担。
- 浮层公开显隐语义已统一到 `open` / `v-model:open` / `open-change`；`trigger` 只描述触发器打开策略，outside click / Esc 是否关闭由独立关闭策略表达。
- Form / FormItem 首版已在 Select 跑通后落地；Field 仍不负责 label、tip、message 和校验触发时机，FormItem 承接布局、label、tip、message、required、status 传递和 ARIA 关联。
- DatePicker / TimePicker 建议后置于 Select、Form 和 Overlay 能力之后，因为日期组件牵涉解析、格式化、面板、范围选择、键盘模型和本地化，过早实现容易把底层边界和业务复杂度揉在一起。
- 内部通用原型的判断原则：只有当一个结构或交互模型服务多个明确组件，并且能减少真实重复、统一可访问性或降低复杂状态错误时才沉淀；不为了文件拆分、样式复用或概念完整而提前抽象。
- OptionList / Collection 是优先级最高的内部候选：服务 Select、Autocomplete、Menu、TreeSelect、Cascader，统一 option 注册、disabled、group、empty、loading、active option、键盘导航、滚动到当前项、typeahead 和 listbox/menu 语义映射。第一阶段应作为内部 primitives / composable 验证，不急于公开。
- RovingFocus / Composite 建议作为内部交互工具：服务 Radio button variant、未来 ToggleGroup、Tabs、Menu、Toolbar，统一 roving `tabindex`、方向键移动、Home / End、disabled item 跳过和循环策略。它解决的是可访问性和键盘模型，不是视觉复用。
- Dialog 已先沉淀内部 modal layer：负责 top-layer 栈、遮罩、滚动锁、Esc、focus trap、`aria-modal`、关闭后焦点恢复和 Dialog 内 Teleport 子浮层登记，与负责锚点定位的 Popper 不同；该能力暂不公开，等 Drawer 真实启动时再复用和校准 API 边界。
- FormControl context 已随 Form / FormItem 自然出现，用于统一 size、disabled、readonly、status、`aria-invalid`、`aria-describedby` 与 label/message 关联；公开 API 仍以 Form / FormItem 为主，不建议暴露底层 FormControl primitives。

## 2026-06-10 Form / FormItem 首版实现

- 默认视觉采用企业表单模型：左侧 label、label 文案右对齐、`labelWidth=120`，`labelAlign` 支持 `left | right | top`。
- help 信息不在控件下方消息行显示，而是通过 label 区问号 tip 展示；控件下方消息行只显示校验 / 状态文案，并默认预留高度，避免校验后挤压布局。
- 校验逻辑集中在 `src/components/Form/validator.ts`，支持 `required`、同步 / 异步 `validator`、`trigger`、字符串路径和数组路径，并通过 Form expose 提供 `validate`、`validateField`、`validateFields`、`resetField`、`resetFields`、`clearValidateField`、`clearValidate`。
- Input、InputNumber、Select、Checkbox、Radio、Switch 已接入内部 FormControl context，继承 Form/FormItem 的 size、disabled、readonly、status 与 ARIA 关联；显式传入控件自身 prop 时仍由控件自身优先。
- 已新增 `scripts/check-form.mjs` 与 `npm run check:form`，并纳入 `npm run check`，守护组件结构、导出、文档示例、校验文件命名和常用控件接入。
- 用户逐项审阅后的本轮收口项：help tooltip 保留 arrow；label / control / action 三段布局稳定；action/status 区固定 20px 状态图标槽，自定义 action 向右外溢，不挤占 control 宽度；radio、checkbox、switch 与 status icon 均已和 label 垂直居中；FormItem 使用 24px message 预留区，message 固定 20px。
- 校验行为已改为并发启动、每项完成后立即显示自身结果；异步校验使用顺序号忽略旧结果，避免旧请求覆盖新状态；`resetField` 初始值快照使用递归 clone，避免嵌套对象被后续编辑污染。
- PopupSurface / FloatingSurface 暂不建议立刻抽。Tooltip、Select panel、Popover content、DropdownMenu content、Popconfirm 的 surface 密度、padding、结构和角色差异较大；更合理的做法是先各自实现，等重复足够稳定后，再抽很薄的内部 `surfaceClass` 或 surface primitive。
- 明确不建议抽的方向：IconButton 已由 Button 的 `shape="square|circle"` 覆盖；StatusSurface 会混淆 Callout、Alert、Message、Tag、Badge 等差异较大的结构；Panel / Card 过泛，容易变成样式垃圾桶；DatePanel 在 DatePicker 真实需求清楚前不预抽。

## 2026-06-11 Dialog v1 实现

- 用户确认 Popconfirm 应后置，优先推进 Dialog；Dialog 采用单一公开组件，不提供 Dialog trigger/content/close 子组件，业务侧通过 `v-model:open` 控制开关。
- Dialog 内部实现 overlay、Teleport、ARIA `role="dialog|alertdialog"`、`aria-modal`、title/description 关联、Esc 关闭、overlay click 关闭、focus trap、关闭后焦点恢复和 body scroll lock。
- 内部 `modalLayer.ts` 沉淀 top-layer 栈、10000+ modal z-index 分配、scroll lock 引用计数和焦点工具；该能力不公开为 Overlay / Layer primitive，Drawer 后续真实启动时再复用。
- 内部 `dialogLayerContext` 供 Dialog 内的 PopperContent / Select / Popover / DropdownMenu 等 Teleport 子浮层登记自身 DOM、Esc 关闭处理和子层 z-index；Dialog 的 focus trap 会把这些登记子层纳入逻辑 Tab 环，Esc 会按后进先出顺序先关闭最上层子浮层，再关闭父 Dialog；PopoverTrigger 的 `aria-controls` 指向真实 PopperContent id，确保 Dialog 的 aria-controls 兜底识别与公开 ARIA 关系一致。
- Popper context key 已从 `src/components/Popper/index.ts` 拆到 `src/components/Popper/context.ts`，避免 Popper 子组件通过 barrel 导入 context 造成循环引用或热更新注入异常；`index.ts` 仍对外 re-export `PopperContext` / `popperContextKey`。
- 视觉按用户反馈收口：footer 无分割线；右上角 close 是裸图标按钮，无边框和默认按钮底色，仅保留 hover / active / focus 状态；footer 取消按钮使用 `Button theme="default"`，主操作使用 `brand`，危险操作使用 `error`。
- 新增 `scripts/check-dialog.mjs` 与 `npm run check:dialog`，并纳入 `npm run check`，守护单组件公开面、无 trigger primitive、modal layer、ARIA、scroll lock、focus trap、文档示例、footer 按钮约定和 Dialog 内 Teleport 子浮层行为。
- 本轮经三轮 base-component review 修复 z-index、非顶层关闭焦点恢复、open-change 语义、focus trap 逃逸、无标题可访问名称、overlay pointer 生命周期、快速开关焦点竞态、unmount 焦点恢复、Dialog 内 Popper 子浮层视觉层级与 Esc 优先级等问题。
- 2026-06-14 收尾复审继续修复边界：Dialog `to` selector 无效时回退到 `body`，避免不可见 modal 锁住页面；Dialog 自定义 `zIndex` 与子 Teleport 浮层共用 resolved layer base；嵌套 Dialog 会继承父 Dialog 自定义 z-index 基准，避免子 Dialog 被压到父层下；`dialogTeleportedLayerBehaviorKey` 使用模块局部 `Symbol()`，不作为可猜全局扩展点。
- Dialog 第 6 个文档示例覆盖 Dialog 内 Popover、兄弟 DropdownMenu，以及 PopoverContent 内嵌 DropdownMenu；浏览器验证确认 Esc 顺序为嵌套菜单 -> 父 Popover -> 父 Dialog，scroll lock 与 focus restore 正常，console warning/error 为空。

## 2026-06-14 Message v1 实现

- Message v1 定位为短暂全局 toast，只公开命令式服务，不暴露用户态组件；公开 API 为 `message.info/success/warning/error/loading/close/closeAll/config`，明确不提供 `message.open()` 和 `message.custom()`。
- 视觉采用 Signal Rail 方向并在实现中紧凑化：top-center fixed stack、白底浮层、左侧 3px 语义色条、16px 状态图标、短文本、24px close 命中区、约 40px 最小高度和 `shadow-popper`。
- Message 根节点需要保留 `w-max`：关闭离场动画期间 `TransitionGroup` 会给离场项加 `position: absolute`，若只靠 `min-w-72` 和内容 flex，长一点的单行文案会在离场瞬间宽度塌缩并换成两行。
- 行为边界：同 `key` 的新消息更新替换已有消息并重置 timer，不触发旧消息 `onClose`；`message.close(key)` 只关闭设置了对应 key 的消息，找不到即 no-op；`message.loading()` 默认 `duration: 0`，适合同 key 后续替换为 success / error。
- 内部通过单例 host + Vue `createApp` 挂载到 `document.body`；SSR / 无 DOM 环境返回 no-op handle，不创建 host；关闭路径统一走内部 `closeMessage(id, reason)`，为后续 beforeClose / 关闭时机函数预留扩展点但 v1 不公开。
- `message.config()` 首版只公开行为和容器配置：`duration`、`closable`、`max`、`top`、`zIndex`；样式配置暂不公开，后续如出现重复需求再设计。
- 新增 `scripts/check-message.mjs` 与 `npm run check:message`，并纳入 `npm run check`，守护命令式 API、禁用 open/custom、config 合并、key 更新、SSR no-op、host 单例、图标/色条映射和文档示例。
- 浏览器验证在 `http://127.0.0.1:5201/components/message.html` 完成：基础状态按钮触发 top-center 堆叠；同 key loading 替换为 success；`close(key)`、handle close、`closeAll()`、config max/top 均生效；console warning/error 为空。

## 2026-06-06 Select 单选首版实现

- 历史记录：本节描述的是数据 prop 版本，已被 2026-06-08 slot-first 改造取代；当前公开契约以 `SelectOption` / `SelectOptionGroup` 为准。
- `Select` 首版只支持单选和 `options` prop，不提供 `SelectOption` 插槽组件、多选、搜索、分组、远程加载或虚拟滚动。
- Public API 包含 `SelectValue = string | number`、`SelectOption = { label; value; disabled? }`、`modelValue`、`options`、`placeholder`、`size`、`status`、`disabled`、`readonly`、`clearable`、`loading`、`emptyText`、`name`、`ariaLabel`、`placement`、`zIndex`，以及 `update:modelValue`、`change`、`focus`、`blur`、`clear`、`visible-change` 事件。
- 实现复用 `FieldRoot` / `FieldContent` / `FieldSuffix` / `FieldAction` 作为触发器，复用 `Popper trigger="manual"`、`match-width` 和默认 `bottom-start` 定位；Select 面板自行定义背景、边框、圆角、滚动、最大高度和 `shadow-popper`，不改变 Popper 无视觉 surface 的原则。
- 键盘与 ARIA 采用 trigger 保持焦点的 `combobox` + `listbox` + `option` 模型，通过 `aria-activedescendant` 指向 active option；禁用不可聚焦不可展开，只读可聚焦但不可展开、不可清空、不可改值。
- `SelectOptionList` 目前是 `src/components/Select/` 内部私有组件，用于沉淀 active、selected、disabled、loading、empty、滚动到 active option 和 listbox 语义；后续等 Dropdown / Autocomplete 等真实复用出现后再考虑抽内部 OptionList / Collection。
- 首版实现后的视觉 / 交互反馈已落地：选中态改为浅 brand 背景 + 左侧深 brand 条，去掉右侧 check 图标；下拉浮层移除显式 border，仅由 `shadow-popper` 和 inset edge 表达边缘；clearable 改为 hover Select 主体时在下拉箭头位置切换为清空按钮；Select 默认宽度像 Input 一样占满父容器；选项列表已支持 `children` / `title` 一层 group。

## 2026-06-06 ScrollArea 底层滚动基座

- 新增公开 `src/components/ScrollArea/`：`ScrollArea.vue`、`types.ts`、`context.ts`、`index.ts`，并已导出到 `src/components/index.ts`、注册到 VitePress theme、加入 sidebar 与组件文档。
- 组件内部结构固定为 `root > viewport > content`，viewport 是唯一真实滚动容器；上层和未来 virtualizer 应只把 viewport 当成 scroll element。
- v1 使用原生 `overflow: auto` 保持滚动性能，并隐藏原生滚动条；悬浮 scrollbar 只镜像滚动状态并控制 `scrollTop` / `scrollLeft`，不改变浏览器原生滚动模型。
- v1 支持 `orientation="vertical|horizontal|both"`、`scrollbarVisibility="auto|always|hidden"`、`scrollbarHideDelay`、`maxHeight`、`maxWidth`、`focusable`、`ariaLabel`，以及 `scroll` / `update` 事件。
- v1 expose `viewportRef`、`contentRef`、`scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState`，并通过 `scrollAreaContextKey` / `useScrollAreaContext()` 供内部子组件协作。
- `scrollToElement` 自行基于 viewport / element rect 计算目标位置，只滚动当前 viewport，不调用浏览器 `scrollIntoView()`，避免带动页面或外层容器滚动。
- 性能边界：scroll listener 使用 passive；scroll / resize 测量进入 `requestAnimationFrame`；ResizeObserver 只观察 viewport 和 content；滚动中只更新 thumb transform，不把 scroll state 放进会让大 slot 反复重渲染的响应式状态。
- ScrollArea 不提供 surface 视觉，不内置背景、边框、阴影、圆角或业务主题；Select / Dropdown / Dialog 等上层组件继续自行定义 surface。
- v1 暂不做虚拟滚动、不新增依赖。未来如果 Table、Tree、Virtualized Select 或大型 Dropdown 需要虚拟列表，优先评估 `@tanstack/vue-virtual`，因为它以 HTML scroll element 为核心接入点，和当前 viewport expose 契约匹配。
- Select 面板已迁移到 `ScrollArea :max-height="240"`；`SelectOptionList` 通过 ScrollArea context 在 active option 变化时调用 `scrollToElement(..., { block: 'nearest' })`，保持键盘导航时 active 项可见。
- 新增 `scripts/check-scroll-area.mjs` 与 `npm run check:scroll-area`，用于守护 ScrollArea 结构、expose API、性能关键字、Select 迁移和禁止直接 `scrollIntoView()`；该检查已纳入 `npm run check`。

## 2026-06-07 ScrollArea 收口结论

- ScrollArea thumb 首尾 inset 已修复：垂直 top / bottom、水平 left / right 的有效端点 inset 均为 4px；`check:scroll-area` 已守护显式 `top-1` / `left-1` 和禁止 transform 中重复追加 edge inset。
- ScrollArea 文档已补“编程控制”示例，覆盖 `scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState` 和 `scroll` / `update` 事件状态；该示例也被 `check:scroll-area` 守护。
- 本轮完整功能提交为 `d0185e6 feat(scrollarea): 实现滚动区域组件`；ScrollArea 后续不再回到 Select 视觉确认队列。

## 2026-06-08 Popover / Menu / DropdownMenu 边界落地

- 用户确认组件边界以原语、英文含义和 ARIA 为优先：`Menu` 是动作 / 命令菜单内容原语，不承担路由导航；导航后续另做 `NavigationMenu`；不保留泛型 `Dropdown`，当前下拉操作菜单迁移为 `DropdownMenu`。
- 新增 `src/components/Popover/`：`Popover`、`PopoverTrigger`、`PopoverContent`。公开状态统一为 `open` / `v-model:open` / `open-change`，支持 click / hover / focus / manual、open / close delay、outside click、Esc、focus return、Teleport、flip / shift、as-child trigger 与 nested layer 协调。
- 新增 `src/components/Menu/`：`Menu`、`MenuItem`、`MenuCheckboxItem`、`MenuRadioGroup`、`MenuRadioItem`、`MenuSub`、`MenuSubTrigger`、`MenuSubContent`、`MenuGroup`、`MenuLabel`、`MenuSeparator`。Menu 不提供 `selectedKeys`，active 只表达当前聚焦 / 悬停行；checkbox / radio item 使用左侧轻量 indicator，不复用表单 Checkbox / Radio 视觉。
- `MenuItem` 默认选择后请求关闭菜单；`MenuCheckboxItem` / `MenuRadioItem` 默认不关闭，并允许 item 级 `close-on-select` 覆盖。SubMenu 纳入 v1，支持嵌套浮层、方向键进入 / 退出和 Esc 分层关闭。
- 新增 `src/components/DropdownMenu/`：`DropdownMenu`、`DropdownMenuTrigger`、`DropdownMenuContent`。它只作为菜单型 Popover 预设，写法要求在 content 内显式放入 `Menu`，不再拥有 `DropdownItem` / `DropdownGroup` / `DropdownDivider` 系列。
- 新增 `scripts/check-popover.mjs`、`scripts/check-menu.mjs`、`scripts/check-dropdown-menu.mjs`，并将 `check:popover`、`check:menu`、`check:dropdown-menu` 纳入 `npm run check`；旧 `check:dropdown` 与 `src/components/Dropdown/` 已移除。

## 2026-06-08 Slot-first Select / Dropdown 决策

- 历史记录：本节描述的是 Select slot-first 与旧 Dropdown 菜单化阶段；当前 Dropdown 已进一步迁移为 `DropdownMenu = Popover + explicit Menu`，不再保留 `src/components/Dropdown/`。
- 用户确认 collection 类组件首版统一采用 slot 子组件驱动；数据驱动便捷写法是否补充，后续按真实需求再议。
- Select 已从 `options` prop 改为 `SelectOption` / `SelectOptionGroup` 子组件；父组件仍负责 Field 触发器、Popper 定位、ScrollArea 面板、单选值、clearable、loading / empty、键盘导航和 combobox/listbox ARIA。
- 当时 Dropdown 已从“独立浮层壳”改为常见下拉菜单语义；默认 slot 使用 `DropdownItem` / `DropdownGroup` / `DropdownDivider`。该方案随后被 Popover / Menu / DropdownMenu 边界取代。
- 本轮新增 `scripts/check-select.mjs`，并将 `check:select`、更新后的 `check:dropdown` 纳入 `npm run check`；两者守护 slot 子组件契约、文档示例、barrel/theme 注册和禁止回退到首版数据 prop / popover shell。
- 当时实现选择“先各自跑通，不急于抽象”：Select 与 Dropdown 都使用内部 collection 注册和 slot vnode 解析；当前 Menu 已独立落地，后续等 Autocomplete、Tabs、NavigationMenu 等出现重复后，再沉淀 OptionList / Collection 或 RovingFocus。
- 验证：`npm run check` 通过；浏览器验证覆盖 Select 点击 / 键盘选择、Dropdown 点击 / 键盘选择、默认 Esc / outside 关闭、manual 示例 `v-model:visible` + `close-on-outside-click=false` / `close-on-esc=false` 不被外部点击或 Esc 关闭、disabled trigger、`match-width` 和 `max-height` ScrollArea。修复子项注册递归更新后，新时间点之后无新增 warning/error。

## 2026-06-07 Dropdown v1 独立浮层壳

- 历史记录：本节描述的是已被 2026-06-08 取代的 popover-like shell 方案；当前 Dropdown 是下拉菜单语义，不再作为任意内容浮层使用。

- Dropdown v1 已作为独立上层浮层壳落地，和未来 Menu 分开：Dropdown 负责 trigger slot、Popper 定位 / 显隐、标准浮层 surface、受控 `visible`、`match-width` 和可选 `maxHeight` ScrollArea。
- Dropdown 不内置 items / actions、`role="menu"`、选中态、roving focus 或方向键菜单模型；内容点击默认不关闭，默认插槽通过 `close()` 主动关闭。
- 新增 `scripts/check-dropdown.mjs` 与 `npm run check:dropdown`，并纳入 `npm run check`，守护 Dropdown 文件、注册、文档示例和“不混入 Menu 行为”的边界。
- 浏览器验证 `/components/dropdown`：click 打开、Esc / 外部点击关闭、内容点击不关闭、slot `close()` 关闭、disabled、focus、manual、match-width 和 max-height ScrollArea 均已验证；当前内置浏览器鼠标移动仍无法稳定触发 `:hover`，hover 路径以源码事件链与示例覆盖确认。

## 2026-06-05 Icon SVG 图标体系重整计划

- 当前 `src/components/Icon/icons/` 下有 48 个本地 SVG。用户反馈部分图标在实际显示时存在视觉中心偏差、大小不一和规范不统一的问题；该问题应作为高优先级基础质量项单独收束。
- Icon 组件 API 暂不应通过新增 `size`、`offset`、`align` 等补偿参数解决源文件问题。当前 `Icon` 默认 `1em`、继承字号和颜色的方向仍成立；重整重点应放在 SVG 源文件规范、导入校验和文档预览。
- 推荐规范方向：统一 `viewBox="0 0 24 24"`；默认 `width` / `height` 不写死在 SVG 源文件中；颜色使用 `currentColor`；outline 图标优先 `fill="none"`、`stroke="currentColor"`、`stroke-width="2"`、`stroke-linecap="round"`、`stroke-linejoin="round"`；确有 fill 图标需求时单独记录例外。
- 视觉规格应明确绘制安全区和视觉居中规则：主体图形尽量落在 2px 到 22px 的 20x20 绘制区内，避免因为 path 偏上/偏下或边界不对称导致按钮、输入域 suffix、loading 等场景看起来不居中。
- 后续可用 `better-icons` 从 Lucide / Iconify 等成熟图标库检索替换候选，但不能直接照搬后结束；仍需跑本地规范化和视觉网格检查，确保与 Horizon 当前 `Icon` 组件、Button 图标按钮、FieldAction、Switch loading 等场景一致。
- 建议补自动校验脚本或检查任务：扫描每个 SVG 的 `viewBox`、固定色值、硬编码 `width` / `height`、非 `currentColor`、异常 fill/stroke、缺失 linecap / linejoin、疑似超出绘制区的 path / shape bounding box。
- 建议补浏览器级图标网格验证页或文档示例：在 12px、16px、20px、24px、32px 字号下展示所有图标，并在 Button square/circle、FieldAction、Tag close、Input suffix 等真实容器中抽查视觉居中和一致性。

## 2026-06-05 Icon SVG 图标体系首轮重整

- 本轮按用户确认将 48 个本地图标统一替换为 Lucide outline 风格来源，并保持原有文件名和 `<Icon name="...">` 调用不变；例如 `close.svg` 来自 `lucide:x`，`delete.svg` 来自 `lucide:trash-2`，`notification.svg` 来自 `lucide:bell`。
- `Icon` 组件 API 保持不变：默认 `1em`、继承 `currentColor`、不恢复 `size` prop，也不新增 offset / align 这类补偿参数。
- 新增 `scripts/check-icons.mjs` 与 `npm run check:icons`，校验本地 SVG 的 `viewBox`、固定宽高、固定色值、`currentColor`、`stroke-width="2"`、round linecap / linejoin；该检查已纳入 `npm run check`。
- Icon 文档已修正为 48 个内置图标，并补充本地图标规范说明；`IconGrid` 去掉无效 `size="lg"`，当前保持搜索、总数和全部图标网格，不在页面顶部额外放分类或尺寸/容器预览。
- 已通过 Figma MCP 在用户提供的 Horizon UI 文件中生成 `Horizon Icons Audit` 页面，包含 48 个新版图标卡片、Lucide 来源标注、尺寸预览和真实容器预览；后续可在 Figma 中继续人工复核视觉中心。
- 执行记录：`npx better-icons` 可从 shell 使用，但 Node 子进程直接 spawn `npx` / `npx.cmd` 在 Windows 下失败；本轮批量获取改用 Iconify API 直接拉取 Lucide SVG。Figma 插件运行环境无 `fetch`，因此 Figma 审计页使用嵌入后的本地 SVG 数据生成。

## 2026-06-05 Figma 设计工作区约定

- 用户提供并确认后续设计稿建议优先在 Figma `Horizon UI` 文件中实现：`https://www.figma.com/design/NLlYHFxwYr01MfhH9siqfu/Horizon-UI?node-id=0-1&p=f&t=q9KEL4vzNdyXo7iS-0`。
- Figma Starter 计划当前最多 3 页；后续整理时应使用 `00 Workspace`、`01 Icon Library`、`02 Component Drafts` 三页结构，把封面和 foundations 索引合并到 `00 Workspace`，避免创建第 4 页。
- 2026-06-05 曾尝试继续补 48 个常用 Lucide 图标候选并整理页面，但 Figma MCP 先因 4 页方案触发页数上限，随后又触发 Starter 工具调用额度限制。额度恢复后可按 3 页结构重跑，并且只替换带 `horizon_ui_codex` shared plugin data 或明确命名的管理画板，保留未知页面和未知内容。

## 2026-06-06 Icon 常用图标补充

- 用户决定暂不继续使用 Figma，先在项目内补充常用图标。本轮新增 48 个 Lucide outline 本地图标，当前 `src/components/Icon/icons/` 总数为 96。
- 新增图标覆盖企业组件库高频场景：导航 / 布局、数据 / 表格、表单、反馈、权限 / 组织、文件、操作和系统；典型新增项包括 `menu`、`table`、`sort-ascending`、`text-cursor-input`、`circle-alert`、`lock`、`folder`、`save`、`database`。
- Icon 文档页保持轻量搜索网格，避免分类筛选、尺寸预览和真实容器预览在图标总览里抢占主内容。
- 图标文件名是 Horizon 对外 API，应优先使用项目内简洁语义名，不直接照搬来源库命名；本轮已将 `grid-2x2` 改为 `grid`、`building-2` 改为 `building`，并让 Icon 文档网格中方向、左右、开关、缩放等关联图标相邻展示。
- `scripts/check-icons.mjs` 已加入常用图标必备列表，避免后续误删这些基础图标；结构校验仍保持 `viewBox="0 0 24 24"`、无固定宽高、`currentColor` 和 2px round stroke 规则，并额外检查 root `<svg>` 标签中的非法属性碎片、UTF-8 BOM 和子 `<rect>` 几何属性。

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
- 动效：`--duration-*`；层级：`--z-*`。
- padding / gap 不再作为 Horizon token 规范；组件内部直接使用 Tailwind spacing class。只有当某类结构尺寸形成稳定组件规格时，再逐项确认是否新增组件级 token。
- 字体：`font-body-*`、`font-title-*`。

### Commit 规范

使用 Conventional Commit 格式，并用中文说明：

```text
refactor(components): 对齐组件设计令牌规范
docs(project): 更新项目上下文与待办
```

## 工作流与代理能力

- 项目内已有 `.agents/skills/base-component-review/`，用于 Popper、Field 等底层组件的审查。
- 全局已安装 `find-skills`、`frontend-design`、`planning-with-files` 等通用 skills。
- 2026-06-04 已全局安装 `obra/superpowers` 的 14 个工作流 skills：`brainstorming`、`writing-plans`、`executing-plans`、`verification-before-completion`、`finishing-a-development-branch`、`dispatching-parallel-agents`、`subagent-driven-development`、`requesting-code-review`、`receiving-code-review`、`systematic-debugging`、`test-driven-development`、`using-git-worktrees`、`using-superpowers`、`writing-skills`。
- 新 skills 需要重启 Codex 后被新会话拾取；安装输出中 `PromptScript` 不支持全局安装的失败不影响 Codex。Superpowers 只作为工作流辅助，项目判断仍以当前源码、`AGENTS.md`、`TODO.md`、`CODE_STYLE.md`、`findings.md`、`task_plan.md` 和 `progress.md` 为准。

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
- Node 已通过 nvm 升级到 `24.16.0`，npm 升级到 `11.13.0`；`package.json` 已补充 `engines` 与 `packageManager`。
- 直接依赖已升级到当前最新可用版本，`npm outdated --json` 为空；主要升级包括 Tailwind 4.3、Vue 3.5.35、ESLint 10.4、Vite 8.0、vue-tsc 3.3。
- Badge 文档示例改为本地 import Horizon `Badge`，文档主题不再全局注册 `Badge`，避免与 VitePress 默认主题同名组件产生重复注册 warning。

## 验证状态

最近一次完整验证：

- 2026-06-08 `npm run check`：通过，包含 format、check:icons、check:scroll-area、check:popper、check:popover、check:menu、check:select、check:dropdown-menu、lint、typecheck 和 VitePress build；`git diff --check` 通过。
- 2026-06-08 base-component review 覆盖 Popover / Menu / DropdownMenu 两轮：第一轮发现的 SubMenu、受控 Popover disabled、DropdownMenu 透传和 Menu 键盘热路径问题已修复；第二轮 Critical / Important 清零，仅保留非 ScrollArea fallback 滚动读 rect 的 Minor 残余。
- 2026-06-08 in-app Browser 使用 `http://127.0.0.1:5190/` 验证 `/components/popover.html`、`/components/menu.html`、`/components/dropdown-menu.html`：Popover 基础打开与嵌套 Esc、Menu 子菜单点击展开、DropdownMenu 显式 Menu 选择后关闭并更新状态、DropdownMenu 子菜单展开均通过，console warning/error 为空。
- `npm run typecheck`：通过。
- `npm run lint`：通过，无 `src/components/Icon/Icon.vue` 的 `vue/no-v-html` warning。
- `npm run format:check`：通过。
- `npm run build`：通过。
- `/components/popper` HTTP 检查：通过。
- 浏览器验证：`/components/field` 的尺寸、multi-value 清空按钮居中、range segment 聚焦视觉和 group 布局通过；`/components/input` 焦点 ring 通过；`/components/inputnumber` 尺寸、焦点 ring、键盘步进和按钮步进展示同步通过。
- 浏览器验证：`/components/button` 的 `solid/outline`、`rectangle/round/square/circle` 渲染通过；`/components/inputnumber` 的 Button stepper 尺寸、disabled/readonly 状态和点击步进通过。
- 最近一次文档演示体系验证：`npm run check` 通过；内置浏览器抽查 `/components/button`、`/components/checkbox`、`/components/inputnumber`、`/components/popper`，确认 `:::demo` 数量、源码折叠、预览渲染和源码内容正常。
- 2026-06-04 收尾提交后再次执行 `npm run check` 通过；提交已按组件行为修复、VitePress demo 迁移、项目上下文更新拆分。
- 2026-06-04 Node 24 / 依赖升级后执行 `npm run check` 通过；内置浏览器使用 `http://127.0.0.1:5180/` 抽查 Badge、Checkbox、Popper，页面标题、demo 数量和 Vite overlay 均正常，修复后的 Badge 页面无新增 warning。
- 2026-06-04 组件迁移收敛扫描后执行 `npm run check` 通过；内置浏览器使用 `http://127.0.0.1:5181/` 复验 Tag 键盘切换、Tooltip `aria-describedby`、Input 清空回焦、InputNumber 页面和 colors / field-system / typography / popper 指南页，当前端口无 warning/error。
- 2026-06-07 ScrollArea v1 收口后执行 `npm run check` 通过；headless Chrome CDP 使用 `http://127.0.0.1:5186/` 验证 ScrollArea 垂直 / 水平 / 双轴示例、auto 显隐、thumb 拖拽、focusable、scroll metrics、编程控制示例，以及 Select 分组面板使用 ScrollArea、方向键跳过 disabled option、active option 保持可见。

## 2026-06-04 VitePress `:::demo` 演示体系结论

- 用户最终确认继续使用 VitePress，不保守兼容旧文档方案；组件文档演示追求一步到位的最终效果。
- 当前实现采用 VitePress 官方样式隔离方向：`ComponentDemo` 根节点使用 `.vp-raw`，`docs/.vitepress/config.ts` 通过 `postcssIsolateStyles` 隔离 `base.css` / `vp-doc.css` 对组件 preview 的影响。
- `docs/.vitepress/plugins/demo.ts` 基于 `markdown-it-container` 支持 `:::demo 标题` 语法，文档页只写示例路径；真实预览组件和源码均来自 `docs/examples/**/*.vue`。
- `ComponentDemo` 自行提供预览、源码展开/收起和复制能力，不再依赖 VitePress `details` / custom-block 行为。
- `ComponentDemo` 源码展示已接入 VitePress / Shiki 构建期高亮：`docs/.vitepress/plugins/demo.ts` 读取 `docs/examples/**/*.vue` 原始源码，通过 MarkdownIt highlight 生成高亮 slot；复制仍使用 raw source，避免展示 HTML 与复制内容耦合。
- 文档站 shell 不属于 Horizon 组件源码内部规范对象；`ComponentDemo` 可为文档体验自由使用 scoped CSS、Tailwind 或 VitePress/Shiki 能力，但样式污染仍应停留在文档层，不写进组件源码。
- `docs/.vitepress/config.ts` 的 Markdown highlighter 已配置 `github-light` / `github-dark` 双主题；`ComponentDemo` shell 自身也跟随 VitePress `.dark` 切换，亮暗模式覆盖外层容器、预览区、toolbar、行号栏和源码区，而不只是代码 token。
- 已一次性迁移所有现有组件文档：17 个组件文档均改用 `:::demo`，生成 108 个示例文件；旧 DemoBox、Histoire、Storybook 和 `layout: page` spike 文件已清理。
- 验证结论：`npm run check` 通过；内置浏览器抽查 Button、Checkbox、InputNumber、Popper，确认预览渲染、源码折叠和源码内容均正常。

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

## 2026-06-12 文档站样式隔离后续方向

- 对照 Element Plus 后确认：Element Plus 文档站更接近自定义 VitePress shell，它使用自己的 VPApp / VPContent / VPDemo、Markdown transform、Element Plus reset 和少量 VitePress 代码块样式，而不是长期依赖默认 VitePress theme 的全局 reset。
- Horizon 当前仍沿用默认 VitePress theme，因此短期保留 `ComponentDemo.vp-raw`、`data-horizon-teleport-layer` 和 `postcssIsolateStyles`，用于隔离 `base.css` / `vp-doc.css` 对 demo preview 与 Teleport 浮层的污染。
- `data-horizon-teleport-layer` 是阶段性兼容标记，不应被视为长期组件 API 或组件语义；它只服务当前文档站默认 theme 隔离。后续自定义文档 shell 成熟后，应移除该标记、`postcssIsolateStyles` Teleport 层白名单和对应 `check:popper` / `check:dialog` 守护逻辑。
- 未来文档 shell 迁移应优先保留当前 `:::demo` + `docs/examples/**/*.vue` 单源示例和 Shiki 高亮成果，只替换默认 VitePress 内容样式 / reset 对组件预览的影响边界。

## 2026-06-03/04 浏览器验证与 VitePress Demo 隔离结论

- 本轮完成 Input、InputNumber、Tag、Popper 的浏览器验证，并结合截图与 computed style 检查尺寸、状态色、cursor、Teleport DOM、Popper 定位行为等关键点。
- 文档站样式污染必须在 VitePress theme / demo shell 层处理，不应为了 VitePress 表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖。
- 旧 demo shell 曾暴露 input padding、disabled cursor、Link 样式和内部按钮布局污染等问题；当前已统一迁移到 `ComponentDemo` `.vp-raw` + `postcssIsolateStyles`，不再维护旧 scoped reset 白名单。
- `ComponentDemo` 负责源码折叠和复制，预览与源码展示共用 `docs/examples/**/*.vue`，避免文档页示例和展示源码漂移。
- Popper 浏览器验证中，hover 触发在当前 in-app browser CUA 鼠标移动通道不够稳定；V-02 后续如需稳定回归应使用专门测试环境或人工复核。V-03 focus 已在后续 Tooltip / PopperTrigger 回归中复验通过。

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

## 2026-06-04 Tooltip / PopperTrigger 浏览器验证

- 使用内置浏览器验证 `/components/tooltip`：focus、click、manual、disabled 触发路径均正常；focus 示例点击后 `aria-expanded="true"` 且浮层显示“聚焦触发”，click / manual 可正常开关，disabled 不显示浮层。
- 本轮发现 Tooltip focus 触发失效，根因是 Tooltip 使用 `trigger="manual"` 包装 Popper 后依赖 `PopperTrigger` 向上转发交互事件，而原实现没有稳定对外转发 focus 事件族。
- `PopperTrigger` 已明确 emit `mouseenter` / `mouseleave` / `click` / `focus` / `focusin` / `blur` / `focusout`；显隐行为只消费 `focusin` / `focusout`，`focus` / `blur` 只作事件转发，并且触发器内部焦点切换不会重复 emit 离开事件。
- `Popper trigger="focus"` 的底座示例已在 `/components/popper` 复验：输入框聚焦后浮层显示“聚焦时显示，失焦关闭”，点击页面其他按钮后 `aria-expanded` 回到 `false` 且浮层卸载。
- 按 base-component review 维度并行审查 Popper 改动：Critical 0；Important 中 focus 双触发、复合触发器内部切焦点误关闭、`updatePosition` 返回类型不实均已修复；剩余事件文档已补到 Popper 文档。
- 当前内置浏览器 CUA 鼠标移动未能可靠改变页面 `:hover` 状态，因此 Tooltip hover / Popper V-02 未作为自动化通过项；源码事件链与 mouseenter/mouseleave 转发已复查，后续若需稳定 hover 回归应补专门测试环境或人工实测。

## 2026-06-04 旧版 design.md 清理

- 根目录 `design.md` 仅保留旧版设计稿内容，未被源码、文档站或构建引用。
- 该文件仍记录 `--color-primary-*` / `--color-danger-*`、`--radius-*` 等旧 token 体系，与当前 `brand` / `error`、`--round-*`、组件级 geometry map 规范冲突。
- 按“完整、性能、简洁、最终效果优先”的开发原则，本轮直接删除该旧文件；当前规范入口以 `src/styles/tokens/**`、`docs/guide/**`、`AGENTS.md`、`TODO.md`、`findings.md`、`task_plan.md`、`progress.md` 为准。

## 2026-06-04 依赖与运行时升级原则

- 用户确认：项目仍处于开发阶段，依赖、工具链和 Node.js 版本不需要为了旧内部适配而保守停留。
- 后续如发现升级能带来更好的完整性、性能、简洁性或最终效果，应先说明收益和影响并向用户确认；确认后直接升级，并同步修正项目内部适配问题。
- 该原则已在本轮 Node 24 LTS 与依赖升级中执行：升级后发现的内部适配问题已同步修正。

## 2026-06-04 Node 24 LTS 与依赖升级

- 本地确认 nvm 可用，版本为 `1.2.2`；已通过 nvm 安装并切换到 Node `24.16.0`，npm 为 `11.13.0`。
- `package.json` 已声明 `packageManager: npm@11.13.0`，并通过 `engines` 固定 Node `>=24.16.0`、npm `>=11.13.0`。
- 直接依赖已升级到当前最新可用版本：`@eslint/js@10.0.1`、`eslint@10.4.1`、`vite@8.0.16`、`@tailwindcss/vite@4.3.0`、`tailwindcss@4.3.0`、`tailwind-merge@3.6.0`、`vue@3.5.35`、`vue-tsc@3.3.3`、`typescript-eslint@8.60.1` 等；`@types/node` 已对齐 Node 24 基线为 `^24.13.0`。
- ESLint 10 首次检查暴露 `eslint.config.js` 直接 import 的 `globals` 未声明为直接依赖；已补 `globals@17.6.0` 到 devDependency。
- `npm outdated --json` 已为空；`npm audit` 剩余 3 个 moderate，均来自 `vitepress@1.6.4` 内部嵌套的 Vite/esbuild，当前 npm registry 中 VitePress 最新正式版仍为 `1.6.4`，暂无直接修复版本。
- 浏览器验证时发现 VitePress 默认主题已经注册 `Badge`，文档主题再次全局注册 Horizon `Badge` 会产生 Vue warning；已改为 Badge 示例本地 import Horizon `Badge`，并移除文档主题里的 `app.component('Badge', Badge)`。
- 验证：`npm run check` 通过；内置浏览器在 `http://127.0.0.1:5180/` 抽查 `/components/badge`、`/components/checkbox`、`/components/popper`，页面渲染、demo 数量和 Vite overlay 均正常，按导航后时间过滤无新增 warning。

## 2026-06-04 组件迁移扫描回合

- 本轮按源码、文档/示例、依赖工具链三路并行扫描；未发现组件源码中仍有旧 `primary` / `danger` API 取值、`--color-primary` / `--color-danger` / `--radius-*` token，或用组件级 `type` 表达视觉形态的高置信残留。
- Checkbox / Radio 默认控件原先隐藏原生 input 后没有把键盘焦点态投射到可视 box / circle；button variant 也缺少统一的 focus ring。本轮为默认控件补 `peer-focus-visible:ring-2 peer-focus-visible:ring-brand-focus`，为 button variant 补 `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus`。
- Switch 原先使用 `.switch-input:focus + .switch-track` 手写 box-shadow，鼠标点击也会触发焦点视觉。本轮改为 `peer-focus-visible:ring-2 peer-focus-visible:ring-brand-focus`，只在 `focus-visible` 下显示可视 ring。
- 色彩指南中的语义色表原先写成 `--brand-color-*` / `--error-color-*` 等不存在的 token；本轮修正为真实 Tailwind v4 `@theme` 变量 `--color-brand-*`、`--color-error-*`、`--color-success-*`、`--color-warning-*`，并补充会生成 `text-brand`、`bg-brand`、`ring-brand-focus` 等工具类。
- 文档扫描发现 Popper V-10 demo 后多余一个 `:::`，Field 组件页没有完整列出公开 primitive props，Field 体系指南仍把已完成的 Field 实现和 Input/InputNumber 迁移写成实施计划；本轮均已修正。
- 依赖扫描确认（升级前）当时 Node 为 `v22.10.0`，`eslint-visitor-keys@5.0.1` 要求 `^20.19.0 || ^22.13.0 || >=24`；`npm audit` 当时有 4 个 moderate，其中 `brace-expansion@5.0.5` 可自动修到 `5.0.6`，VitePress 嵌套 Vite/esbuild 项暂无直接修复版本。后续 Node 24 LTS 与依赖升级已单独处理。
- 验证：`npm run check` 通过；内置浏览器确认 Checkbox / Radio / Switch 默认控件和 button variant 的 computed `box-shadow` 命中 `oklch(0.932 0.032 255.585)` 的 `brand-focus` ring；`/guide/colors`、`/components/field`、`/guide/field-system` 页面显示新内容。

## 2026-06-04 组件迁移收敛扫描

- 本轮按源码组件、文档/示例/指南、样式/导出/工具链三路分派子代理并行审计；当前 18 个组件文档、108 个 `docs/examples/**/*.vue` 示例、sidebar 与组件目录关系均通过结构检查。
- 源码侧未发现旧 `primary` / `danger` API 取值、旧 `--color-primary` / `--color-danger` / `--radius-*` token，或组件级视觉形态继续使用 `type` 的高置信残留。
- 已修复 Tag checkable 的键盘和 ARIA：可选 Tag 使用 `role="checkbox"`、`aria-checked`、`tabindex` 和 Space/Enter 切换，并保留关闭按钮的事件隔离。
- 已修复 Input 内部 action 焦点边界：清空、密码显示等兄弟按钮不再因原生 input blur 被误判为离开整个 Input。
- 已修复 Tooltip 与 PopperTrigger 的描述关联：Tooltip 打开时 trigger 的 `aria-describedby` 指向真实 `role="tooltip"` 浮层；PopperTrigger 新增窄用途 `aria-describedby` 透传。
- 已修复 Icon 有 `ariaLabel` 时缺少 `role="img"` 的语义问题；InputNumber `change` 改为一次聚焦会话内值确实变化后在 blur 提交时触发。
- 已补齐 Popper 根出口的 `Placement` / `TriggerType` / `UsePopperOptions` / `UsePopperReturn` / `PopperContext` 和 `usePopper`，保持文档使用的公开类型可从根 barrel 获取。
- 已为 `--shadow-*` / `--shadow-popper` 补 `:root` fallback；docs theme 的 IconGrid 改用 Horizon 语义 token，`lint:style` 扩展覆盖 docs theme 并修复暴露出的 ComponentDemo/IconGrid 样式问题。
- 文档侧已修正色彩指南“所有色值来自 Tailwind 原生色阶”的强声明，改为 Horizon 自定义 OKLCH token 为准；Popper / Tooltip 模板 prop 统一为 kebab-case；FieldGroup 指南职责与源码对齐；Text / Title 的 `secondary` 明确为组件专属辅助文本层级；字体指南同步中文 fallback。
- 本轮保留的后续项：Radio button variant 可进一步做 roving `tabindex`，建议与 Toggle / ToggleGroup 方向合并设计；InputNumber readonly 步进按钮的 disabled 视觉保持此前已确认的“readonly 不允许步进”边界。

## 2026-06-04 token 文件边界整理

- token 文件拆分原则已明确：不为了数量拆分，只在 token 语义确实不同、放在一起会误导维护时拆成多个 CSS。
- `size.css` 原本同时放组件高度和圆角；圆角是形状 token，不属于尺寸高度体系，已拆到 `radius.css`，`size.css` 仅保留 `--comp-size-sm/md/lg`。
- `font.css` 实际承载字体族、字号阶梯、body/title 字体 shorthand 和工具类，已重命名为 `typography.css`，与 `docs/guide/typography.md` 对齐。
- `elevation.css` 原本同时放 shadow、duration 和 z-index；已拆为 `shadow.css`、`motion.css`、`z-index.css`。其中 shadow 保留 `@theme` 工具类生成和 `:root` fallback，motion 只放 `--duration-*`，z-index 只放 `--z-*`。
- `color.css` 暂不拆分：当前语义色、文本色、背景色、边框色和 fallback 属于同一色彩系统，强拆反而会增加跨文件跳转成本。

## 后续入口

- 任务清单：`TODO.md`。
- 阶段计划：`task_plan.md`。
- 工作流水：`progress.md`。
- 代理快速入口：`AGENTS.md`。
