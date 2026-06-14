# 工作进度记录

## 2026-06-14 Dialog v1 收尾验证与提交准备

- 从 `dev` 分支接入，最新提交仍为 `4498c38 feat(form): 落地表单组件与校验收口`；工作区保留 2026-06-11/12 Dialog v1、Popper context 拆分和文档站 Teleport 隔离改动。
- 本轮按 base-component review 复查 Dialog / Popper / Popover / DropdownMenu 的底层浮层边界，修复复审发现的 Important 问题：Dialog 自身 Teleport `to` 目标若为无效 selector 时回退到 `body`；Dialog 内 Popover / DropdownMenu 的 Esc 由语义层提供内部 handler，避免父 Dialog 抢先关闭；Dialog 子浮层 Esc 改为按注册顺序后进先出处理；嵌套 Dialog 在父 Dialog 使用自定义 `zIndex` 时继承父层级基准；内部 `dialogTeleportedLayerBehaviorKey` 改为模块局部 `Symbol()`，不形成全局可猜扩展点。
- 继续修复最终复审发现的动态边界：Dialog 内已打开子浮层的 z-index 改为注册期间响应式读取父 Dialog child layer base；PopperContent 在 close 策略变化时不再清除重登记同一个 Dialog 子层，避免扰动 LIFO 顺序；父 Popover 有打开子层时不消费 Dialog Esc，让 Dialog 继续交给真正的最上层子浮层；PopoverTrigger 的 `aria-controls` 改为指向真实 PopperContent id，避免指到 Popover 自身未渲染到 DOM 的 content id。
- 契约守护已增强：`check:dialog` 覆盖安全 Teleport target、resolved z-index、Dialog 子浮层 z-index 响应式派生、LIFO child Esc、PopoverTrigger / PopperContent id 一致性、嵌套 DropdownMenu in Popover 示例、内部 key 不从 public barrel 暴露、所有 Dialog 示例禁止旧 Dialog primitive 和旧 `primary` / `danger` 命名；`check:popper` 补 PopoverTrigger 直接导入 Popper context 的 barrel-cycle 守护。
- 新增 Dialog 第 6 个示例覆盖 Dialog 内 Popover、兄弟 DropdownMenu，以及 PopoverContent 内嵌 DropdownMenu 的真实嵌套浮层场景。
- 浏览器验证使用 `http://127.0.0.1:5200/components/dialog.html`：Dialog 打开后 body scroll lock 生效；Popover Esc 先关子浮层且 Dialog 保持打开；DropdownMenu Esc 先关子浮层且 Dialog 保持打开；嵌套 DropdownMenu in Popover 的三段 Esc 顺序为嵌套菜单、父 Popover、父 Dialog；PopoverTrigger 的 `aria-controls` 可定位到真实 teleported PopperContent DOM；关闭后 overlay DOM 清空、body overflow 恢复、焦点回到触发按钮；页面 console warning/error 为空。
- 验证：2026-06-14 `npm run check` 通过，包含 format、所有契约脚本、lint、typecheck 和 VitePress build；build 仅保留 VitePress chunk size warning。

## 2026-06-12 文档站隔离策略记录

- 根据用户建议，对照 Element Plus 文档站做法后确认：Element Plus 更偏向自定义 VitePress shell / demo 渲染层，并引入自身组件库 reset，而不是长期依赖默认 VitePress theme reset 再逐项白名单。
- 当前 Horizon 仍沿用默认 VitePress theme，因此暂时保留 `ComponentDemo.vp-raw`、`data-horizon-teleport-layer` 与 `postcssIsolateStyles`，用于隔离 demo preview 和 Teleport 浮层免受 VitePress `base.css` / `vp-doc.css` 影响。
- 已记录后续方向：未来参考 Element Plus 自定义文档 shell，完成后移除当前为默认 theme 隔离加入的 `data-horizon-teleport-layer`、Teleport 层 `postcssIsolateStyles` 白名单和相关契约检查。
- 浏览器验证使用 `http://127.0.0.1:5199/`：Dialog footer 按钮样式恢复，close icon 保持裸图标按钮；Popover 浮层带统一 Teleport marker，背景、阴影、文字色正常；console warning/error 为空。
- 验证：`npm run check` 通过；随后更新记忆文档并通过 `npx prettier --check AGENTS.md TODO.md task_plan.md findings.md progress.md` 与 `git diff --check -- AGENTS.md TODO.md task_plan.md findings.md progress.md`。
- 截至收尾，Dialog v1 与文档隔离改动仍在工作区未提交；最新提交仍为 `4498c38 feat(form): 落地表单组件与校验收口`。明天新对话先看 `git status --short`，再决定继续逐项审 Dialog 视觉/交互，或先整理提交。

## 2026-06-11 Dialog v1 实施

- 按用户确认方案实现单一公开 `Dialog` 组件：不提供 `DialogTrigger` / `DialogContent` / `DialogClose`，业务侧通过 `v-model:open` / `open-change` 控制状态。
- Dialog 内部负责 overlay、Teleport、ARIA `role="dialog|alertdialog"`、title / description 关联、`ariaLabel` 兜底、focus trap、Esc、overlay click、body scroll lock、关闭后焦点恢复和 top-layer 协调。
- 视觉按用户反馈收口：footer 无分割线；右上角 close 是裸图标按钮，无边框和默认按钮底色，仅保留 hover / active / focus；footer 取消按钮使用 `Button theme="default"`，主操作使用 `brand`，危险操作使用 `error`。
- 内部 modal layer 经 base-component review 三轮修正：默认 modal z-index 提升为 10000+；非顶层关闭不恢复焦点；快速开关焦点恢复与初始聚焦有 token 防竞态；overlay pointer down/up/cancel 不再误触关闭；unmount 时会按顶层规则恢复焦点。
- 为 Dialog 内 Select / Popover / DropdownMenu 等 Teleport 子浮层新增内部 `dialogLayerContext` 登记：子浮层 z-index 位于 Dialog 之上，Tab 会纳入同一逻辑焦点环，Esc 会先关闭子浮层再关闭 Dialog。
- Popper context key 已拆到 `src/components/Popper/context.ts`，避免 Popper 子组件从 barrel 导入 context 造成循环引用 / 热更新注入异常；`check:popper` 已补守护。
- 新增 `docs/components/dialog.md`、`docs/examples/dialog/*`、`scripts/check-dialog.mjs`，并将 `npm run check:dialog` 纳入 `npm run check`。
- 浏览器验证使用 `http://127.0.0.1:5195/components/dialog.html`：基础打开关闭、Esc、overlay click、scroll lock、focus trap、close icon、alertdialog、Dialog 内 Select 子浮层 z-index / Esc 优先级均通过；按当前验证开始时间过滤 console warning/error 为空。
- 验证：`npm run check` 通过，包含 `check:popper` 31 项、`check:dialog` 134 项、lint、typecheck 和 VitePress build。

## 2026-06-11 Form / FormItem 收口

- 继续在 `http://127.0.0.1:5194/components/form.html` 与用户一起逐项校正 Form / FormItem。
- help 图标 tooltip 恢复默认 arrow；FormItem 控件行改为垂直居中，使 radio、checkbox、switch、status icon 与左侧 label 对齐。
- FormItem 间距收敛为控件行自身 `mb-6`，message 固定 20px 并绝对定位在 control 下方，不再通过 Form flex gap 挤出空间。
- 校验策略调整为并发启动、每个 FormItem 完成后立即提交自身结果；示例移除人为 `setTimeout(200)`，避免异步示例看起来像串行。
- Review 后补三项可靠性修复：异步校验使用顺序号忽略旧结果；表单实例 API 拆分为单字段与多字段方法，避免数组路径歧义；`resetField` 初始值快照改为递归 clone。
- 浏览器复验：Form 页 reload 后全量校验、单字段校验和 reset 均正常，console warning/error 为空。
- 验证：`npm run check:form`、`npm run typecheck`、`npm run lint:js`、针对 Form 相关文件的 `npx prettier --check ...`、`git diff --check` 均已通过；收尾前将再跑完整 `npm run check`。
- 明天先确认最新提交与工作区状态，然后快速打开 Form 页做一次视觉扫尾即可；下一项若追求小闭环，建议先做 Popconfirm，若想为后续复杂浮层打地基，则先设计 Dialog / Drawer 的 Overlay / Layer 边界。

## 2026-06-10 Form / FormItem 收尾交接

- 用户反馈 Form / FormItem 样式仍有较大问题，今天先处理第一项，明天新对话继续逐项看。
- 已修第一项布局：FormItem 明确分为 label / control / action 三段；action/status 区固定预留 20px 状态图标槽，自定义 action 超出时向右外溢，不再挤占 control 宽度。
- 浏览器验证 `http://127.0.0.1:5193/components/form.html`：Workspace、Owner、API key、Project 的 control 宽度一致，action 槽为 20px，API key 的 Regenerate 按钮向右外溢且未挤窄 input，console warning/error 为空。
- 最新验证：2026-06-10 `npm run check` 与 `git diff --check` 通过；本次收尾后又只更新记忆文档，提交前至少重跑 `git diff --check` 和格式检查。
- 新对话最短接入：先执行 `git status --short`、`git log -1 --oneline`，读 `AGENTS.md`、`TODO.md`、`CODE_STYLE.md`，确认 dev server 是否仍在 `http://127.0.0.1:5193/`，然后打开 `/components/form.html` 继续处理 Form/FormItem 剩余视觉问题；Textarea 仍暂停，Popconfirm 暂后。

## 2026-06-10 Form / FormItem 首版实施

- 按用户确认方案实现 Form / FormItem：默认 `labelAlign="right"`、`labelWidth=120`，视觉为左侧 label + 右侧 control / status / action，未采用表格式边框。
- help 文案改由 label 处问号 tip 承载；控件下方消息行只显示校验 / 状态文案，并默认预留高度，避免校验后突然挤压布局。
- 校验逻辑集中在 `src/components/Form/validator.ts`，支持 required、同步 / 异步 validator、trigger、字符串路径和数组路径；Form expose `validate`、`validateField`、`resetFields`、`clearValidate`。
- Input、InputNumber、Select、Checkbox、Radio 与 Switch 已接入内部 FormControl context；FormLabel / FormControl / FormMessage 未做成对外 primitives，只作为内部结构和 context 使用。
- 新增 `docs/components/form.md`、`docs/examples/form/*` 与 `scripts/check-form.mjs`，并把 `npm run check:form` 纳入 `npm run check`。
- 浏览器验证 `http://127.0.0.1:5193/components/form.html`：默认 label cell 宽度 120px、label 右对齐；help 文案未进入消息行；空消息行和有状态消息行都为 24px；点击 Validate 后 Email / Quota 错误文案出现但 item 高度不变；console warning/error 为空。
- 根据用户反馈调整 FormItem 布局：外层明确分为 label / control / action 三段；action/status 区固定预留 20px 状态图标槽，自定义 action 超出时向右外溢，不再处于 control 的 flex 容器内挤占控件宽度；`check:form` 已补对应守护。

## 2026-06-09 Form 路线调整

- 用户确认 Textarea 本轮先不做；当前组件路线从 `Form / FormItem / Textarea` 收敛为优先推进 `Form / FormItem`。
- 已同步当前记忆文档中的路线摘要：下一步聚焦 Form / FormItem 的接口、ARIA 关联、label/help/error 关系和 Field context 边界；Textarea 后续按真实需求再启动。

## 2026-06-08 ComponentDemo 源码行号对齐修复

- 排查 Button 文档源码展开区后确认根因：Shiki 输出的每行源码已经包在 `.line` 内，`ComponentDemo` 又把 `.line` 设为 block，但 code 容器仍为 `white-space: pre`，导致 `.line` 之间的格式化换行文本节点也被渲染成额外空行。
- 修复 `docs/.vitepress/theme/components/ComponentDemo.vue`：code 容器改为 `white-space: normal`，每个 `.line` 自己保留 `white-space: pre` 并固定 20px 行高；行号 `li` 同步固定 20px 高和行高。
- 新增 `scripts/check-component-demo.mjs` 与 `npm run check:component-demo`，并纳入 `npm run check`，守护 ComponentDemo 源码展示的 Shiki 行结构和行高契约。
- 浏览器复验 `http://127.0.0.1:5192/components/button.html`：展开首个源码块后，前 8 行行号和源码 top 坐标完全一致，步进均为 20px，最大偏差 0px，console warning/error 为空。
- 验证：`npm run check` 与 `git diff --check` 通过。

## 2026-06-08 Popover / Menu / DropdownMenu 实施

- 按用户确认的“原语 / 英文 / ARIA 优先”边界推进：`Popover` 负责通用非模态浮层，`Menu` 负责动作 / 命令菜单内容，`DropdownMenu` 作为菜单型 Popover 预设；导航后续另做 `NavigationMenu`，不让 `Menu` 承担路由导航。
- 已先补红灯契约脚本：`scripts/check-popover.mjs`、`scripts/check-menu.mjs`、`scripts/check-dropdown-menu.mjs`，首次运行在旧实现上分别失败；实现后 `npm run check:popover`、`npm run check:menu`、`npm run check:dropdown-menu` 均已通过。
- 新增 `src/components/Popover/`：`Popover`、`PopoverTrigger`、`PopoverContent`，公开状态统一为 `open` / `v-model:open`，支持 click / hover / focus / manual、delay、outside click、Esc、focus return、Teleport、flip / shift、as-child trigger 与 nested layer。
- 新增 `src/components/Menu/`：`MenuItem`、checkbox/radio item、radio group、submenu、group、label、separator；普通 item 默认选择后关闭，checkbox/radio item 默认不关闭并支持 item 级 `close-on-select` 覆盖。
- 旧 `src/components/Dropdown/` 已迁移为 `src/components/DropdownMenu/`：不再拥有 `DropdownItem` 系列，文档写法要求 `DropdownMenuContent` 内显式放入 `Menu`。
- 文档与注册已同步到 `docs/components/popover.md`、`docs/components/menu.md`、`docs/components/dropdown-menu.md`、VitePress sidebar/theme 和 `src/components/index.ts`。
- Base-component review 已完成两轮：第一轮发现 SubMenu 打开链路、延迟 / 离开 / 焦点回归、DropdownMenu `return-focus-on-close` 透传、受控 Popover disabled 关闭和 Menu 键盘热路径问题；已修复后第二轮 Critical / Important 清零，仅保留非 ScrollArea fallback 滚动仍需读 rect 的 Minor 残余。
- in-app Browser 使用 `http://127.0.0.1:5190/` 验证 `/components/popover.html`、`/components/menu.html`、`/components/dropdown-menu.html`：Popover 基础打开与嵌套 Esc、Menu 子菜单点击展开、DropdownMenu 显式 Menu 选择后关闭并更新状态、DropdownMenu 子菜单展开均通过，console warning/error 为空。
- 根据用户视觉反馈，MenuSub 浮层 offset 从 `4` 调整为 `-2`，让子菜单与父菜单贴合并轻微交叉；Teleport 后 Popover 示例中的 Input / Button padding 被文档站 reset 置零的问题已改为只在 VitePress reset 隔离规则中排除现有 `shadow-popper` surface，不向组件内部新增文档专用类或逻辑。

## 2026-06-08 收尾交接

- 本轮 Dropdown / Popper 语义已按用户最终确认收口：`trigger`、`visible` / `v-model:visible` 和 outside click / Esc dismiss 是三层独立语义，不再把 `v-model` 与是否可被外部点击关闭绑定。
- Popper 新增并透传 `close-on-outside-click` / `close-on-esc`；Dropdown 文档和 manual 示例已使用 `v-model:visible` + 显式关闭策略展示 manual 控制。
- in-app browser 在 `http://127.0.0.1:5187/components/dropdown.html` 验证：默认 Dropdown 外部点击 / Esc 关闭；manual 示例禁用 outside / Esc 后不会被外部点击或 Esc 关闭，只由外部“打开 / 关闭”按钮控制。
- 最新验证：2026-06-08 `npm run check` 与 `git diff --check` 通过。
- 下次新对话最短接入：先执行 `git status --short` 和 `git log -1 --oneline`，再读 `AGENTS.md`、`TODO.md`、`CODE_STYLE.md`；当前功能方向建议进入 Menu 的接口、键盘模型、内容结构和是否沉淀内部 Collection / RovingFocus。

## 2026-06-08 Select / Dropdown slot-first 改造

- 用户确认所有 collection 类组件首版先统一采用 slot 子组件驱动；数据驱动便捷写法是否补充，后续再议。
- Select 已从 `options` prop 改为 `SelectOption` / `SelectOptionGroup`：保留 Field 触发器、Popper `manual` + `match-width`、ScrollArea 面板、单选、clearable、loading、empty、disabled option、readonly、状态、尺寸、隐藏 input、键盘导航和 combobox/listbox ARIA。
- Dropdown 已从独立浮层壳改为菜单语义：新增 `DropdownItem` / `DropdownGroup` / `DropdownDivider`，父组件负责 trigger、Popper 定位、显隐、surface、方向键和 `select` 事件。
- Popper / Dropdown 已将触发方式、显隐同步和关闭策略拆开：`trigger` 只决定触发器行为，`visible` / `v-model:visible` 只负责状态同步，outside click / Esc 由 `close-on-outside-click` / `close-on-esc` 独立控制。
- 新增 `scripts/check-select.mjs`，并将 `check:select` 与更新后的 `check:dropdown` 纳入 `npm run check`，守护 slot 子组件契约、文档示例和 barrel / VitePress theme 注册。
- 文档已更新 `docs/components/select.md`、`docs/components/dropdown.md` 及对应示例，示例不再使用 Select 数据 prop，也不再把 Dropdown 展示为任意内容浮层。
- 当前已验证：先写新契约检查并确认在旧实现上失败；实现后 `npm run check` 通过。浏览器验证覆盖 Select 点击选择与键盘选择、Dropdown 点击选择与键盘选择、默认 Esc / outside 关闭、manual 示例 `v-model:visible` + 独立关闭策略禁用 outside / Esc、disabled trigger、`match-width`、`max-height` ScrollArea，并确认修复递归注册后没有新增 warning/error。

## 2026-06-07 Dropdown v1 独立浮层壳

- 历史记录：本节描述的是已被 2026-06-08 取代的 popover-like shell 方案；当前 Dropdown 是下拉菜单语义，不再作为任意内容浮层使用。
- 按用户确认将 Dropdown 和 Menu 分开推进，本轮只实现 Dropdown v1，不内置 Menu / item / roving focus 行为。
- 新增 `src/components/Dropdown/`：`Dropdown.vue`、`types.ts`、`index.ts`；复用 Popper 手动显隐管理，支持 `click|hover|focus|manual`、trigger slot、受控 `visible`、`match-width`、标准 surface 和可选 `maxHeight` ScrollArea。
- Dropdown 内容点击默认不关闭；默认插槽和 trigger slot 暴露 `close()`，用于内容主动关闭。
- 新增 `docs/components/dropdown.md` 与 6 个 `docs/examples/dropdown/` 示例，覆盖基础点击、内容点击与禁用、hover/focus、manual、match-width、自定义内容与滚动。
- 新增 `scripts/check-dropdown.mjs` 与 `npm run check:dropdown`，并纳入 `npm run check`，用于守护文件结构、注册、文档示例和不混入 Menu 行为。
- 验证：`npm run check` 通过；本地文档页 `http://127.0.0.1:5187/components/dropdown` 返回 200。内置浏览器验证 click 打开、Esc / 外部点击关闭、内容点击不关闭、slot close、disabled、focus、manual、match-width 和 max-height ScrollArea；当前浏览器鼠标移动通道仍无法稳定触发 hover，hover 仅确认源码事件链与示例覆盖。
- 下一步最短接入：确认工作区状态后进入 Menu 的接口、键盘模型和内容结构设计；Dropdown 已经提供承载 Menu 的浮层壳。

## 2026-06-07 收尾与新对话交接

- 今天已完成 ScrollArea v1 收口并提交：`d0185e6 feat(scrollarea): 实现滚动区域组件`。
- ScrollArea 已作为公开底层滚动基座落地，并迁移 Select 面板；文档新增垂直、水平、双轴和编程控制 4 个示例；`check:scroll-area` 已纳入 `npm run check`。
- 今日修复 ScrollArea thumb 首尾 inset 不一致问题，并补编程控制演示；headless Chrome CDP 已验证 thumb 两端 inset 均为 4px，`下移` / `定位目标` / `底部` / `顶部` 等编程控制按钮可正常驱动滚动和 metrics。
- 最新完整验证：2026-06-07 `npm run check` 通过，包含 format、check:icons、check:scroll-area、lint、typecheck 和 VitePress build。
- 当前工作分支为 `codex/docs-and-icon-rework`。收尾文档提交前工作区曾为 clean，最新状态以明天新对话启动后的 `git status --short` 和 `git log -1 --oneline` 为准。
- 明天新对话最短接入：先读 `AGENTS.md`、`TODO.md`、`CODE_STYLE.md`，确认最新提交和工作区状态；Dropdown v1 已单独落地后，下一步优先推进 Menu 的接口设计、键盘模型、内容结构和是否沉淀 OptionList / Collection 内部能力。

## 2026-06-07 ScrollArea 编程控制演示补充

- 用户指出 ScrollArea 文档示例只覆盖基础滚动方向，缺少 `scrollTo` 等 expose 能力展示。
- 本轮新增 `docs/examples/scrollarea/example-04.vue`，演示 `scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState` 和 `scroll` / `update` 事件返回的状态。
- `docs/components/scrollarea.md` 已新增“编程控制”章节，放在 API 之前；`check:scroll-area` 已加入示例存在性和 API 调用守护。
- 浏览器验证：headless Chrome CDP 点击新示例控制按钮后，`下移` 可滚到 96，`定位目标` 可滚到目标项且目标可见，`底部` 可滚到 max 944，`顶部` 可回到 0；metrics 区显示 `scrollTop`、`maxScrollTop`、`isAtTop`、`isAtBottom` 和 `update`。

## 2026-06-07 ScrollArea thumb 首尾 inset 修复

- 用户反馈 ScrollArea thumb 滑到顶端 / 底端、左端 / 右端时，两侧边距不一致。
- 复现并量测：修复前 vertical top start gap 为 8px、bottom end gap 为 0px；horizontal left start gap 为 8px、right end gap 为 0px。
- 根因：thumb 已经因为 track padding 处在 4px 起点，但 transform 又额外加了 `+ 4`，导致起点双重 inset、终点没有 inset。
- 修复：thumb 显式使用 `top-1` / `left-1` 锚定起点，transform 只应用滚动位移；`check:scroll-area` 新增守护，禁止再次出现双重 inset。
- 浏览器验证：headless Chrome CDP 量测修复后 vertical top / bottom 和 horizontal left / right 的有效端点 inset 均为 4px。

## 2026-06-06 ScrollArea 底层滚动基座

- 按用户要求直接实现公开 `ScrollArea` v1，不引入虚拟滚动依赖，但预留稳定 viewport 契约。
- 新增 `src/components/ScrollArea/`：组件结构固定为 `root > viewport > content`，viewport 是唯一真实滚动容器；支持垂直 / 水平 / 双轴原生滚动、隐藏原生滚动条、悬浮自定义 scrollbar、thumb 拖拽、auto / always / hidden 显隐、`maxHeight` / `maxWidth`、`focusable` 与 `ariaLabel`。
- ScrollArea expose `viewportRef`、`contentRef`、`scrollTo`、`scrollBy`、`scrollToElement`、`update`、`getScrollState`，并提供 `scrollAreaContextKey` / `useScrollAreaContext()` 给内部子组件使用；`scrollToElement` 不调用浏览器 `scrollIntoView()`，只调整当前 viewport。
- 性能实现要点：scroll listener 使用 passive；scroll / resize 测量统一进入 `requestAnimationFrame`；ResizeObserver 只观察 viewport / content；滚动中只更新 thumb `transform: translate3d(...)`，避免把大 slot 内容绑到响应式 scroll state 上。
- ScrollArea 不提供 surface 视觉：不内置背景、边框、阴影、圆角或业务主题；Select / Dropdown / Dialog 等上层继续自行定义 surface。
- 新增 `docs/components/scrollarea.md` 与 3 个 `docs/examples/scrollarea/` 示例，覆盖垂直滚动、水平滚动、双轴滚动、自动显隐、常显、focusable 和 scroll metrics。
- 新增 `scripts/check-scroll-area.mjs` 与 `npm run check:scroll-area`，并纳入 `npm run check`，用于守护 ScrollArea 结构、expose API、性能关键字、Select 迁移和禁止直接 `scrollIntoView()`。
- Select 面板已从 `max-h-60 overflow-auto` 迁移为 `ScrollArea :max-height="240"`；`SelectOptionList` active 项保持可见改为通过 ScrollArea context 调用 `scrollToElement(..., { block: 'nearest' })`，并保留现有 group、disabled、keyboard 和 ARIA 行为。
- 已按 base-component review 清单修复多项边界：scroll 热路径不再测量 thumb 尺寸、hover active 不触发布局滚动、option refs 不使用响应式数组、支持 pointercancel cleanup、动态 orientation / visibility 更新、horizontal track 撑满宽度、`scrollToElement` 使用真实 viewport 尺寸 clamp、程序化滚动后 auto scrollbar 能正常隐藏。
- 验证：`npm run check` 通过，包含 format、check:icons、check:scroll-area、lint、typecheck 和 VitePress build。
- 浏览器验证：本轮 dev server 启动在 `http://127.0.0.1:5186/`；headless Chrome CDP 验证 ScrollArea 文档页 3 个示例均可滚，vertical auto 显隐正常，thumb 拖拽可改变 `scrollTop`，horizontal track 宽度不塌陷，双轴 focusable 与 scroll metrics 正常；Select 分组示例确认面板使用 ScrollArea，方向键跳过 disabled option，active option 保持可见。

## 2026-06-06 TagInput 优先级调整

- 用户判断 TagInput 独立使用场景相对较少，确认先把它降到组件路线最后。
- 后续组件路线当时调整为：Dropdown / Menu → Form / FormItem / Textarea → Popconfirm → Dialog / Drawer → Message / Notification → DatePicker / TimePicker → Pagination / Table → Tabs / Breadcrumb / Steps → TreeSelect / Cascader / ColorPicker → TagInput；2026-06-09 已更新为 Textarea 本轮先不做，优先推进 Form / FormItem。
- TagInput 的价值仍记录为 Field 多值 / Tag wrap / Backspace 删除 / 输入宽度自适应等压力测试，但不再作为 Select 之后的下一优先级。

## 2026-06-06 Popper shift 默认行为

- 用户确认 Select 与 Tooltip 都不需要 Popper `shift` 的吸边行为；该行为应作为 Popper 的显式 opt-in 能力，而不是默认行为。
- 本轮修改 `src/components/Popper/Popper.vue` 与 `src/components/Popper/usePopper.ts`：`shift` 默认值改为 `false`，底层 hook 也改为只有 `shift === true` 时才加载 Floating UI `shift` middleware。
- 本轮移除 Select / Tooltip 上临时的 `:shift="false"`，两者改为继承 Popper 默认行为；`docs/components/popper.md` 已同步 `shift` 默认值和 V-07 demo 标题说明。
- 浏览器验证 `/components/tooltip.html`：打开 click Tooltip 后继续滚动，触发器滚出顶部时 tooltip 也自然滚出视口，没有停在 viewport 顶部。

## 2026-06-06 Select group 缩进方案

- 用户确认分组视觉更接近视觉草稿 A：不加分割线或背景块，通过 group title 与组内 option 的左边距差异表达层级。
- 本轮修改 `src/components/Select/SelectOptionList.vue`：组内 option 在 sm / md / lg 下使用更大的左 padding，未分组选项和 group title 保持原有左边距，选中态背景和左侧 brand 条仍保持 edge-to-edge。
- 浏览器验证 `/components/select`：md 尺寸下 group title 左 padding 为 12px，组内 option 左 padding 为 20px，未分组选项左 padding 仍为 12px。
- 根据用户反馈，Select 下拉浮层关闭 Popper `shift`：保留 `flip`，但不再把浮层推回 viewport 边缘；浏览器验证中，上弹浮层继续滚动后会跟随触发器自然离开视口，不再像 fixed 一样吊在顶部/底部。

## 2026-06-06 Select children group API

- 用户确认 Select 分组 API 使用 `children` 判定 group，分组标题字段使用 `title`，普通选项继续使用 `label` / `value`。
- 本轮修改 `src/components/Select/types.ts`：`SelectOption` 改为 `SelectOptionItem | SelectOptionGroup` 联合类型；group 项使用 `children: SelectOptionItem[]`，并通过 `value?: never` / `label?: never` 限制和普通项混用。
- 本轮修改 `src/components/Select/Select.vue` 与 `SelectOptionList.vue`：内部把 `options` 规整为一层 group / option 结构，active index、选择、滚动定位和键盘导航只作用于真实 option；`group.disabled` 会合并为子 option 的禁用态；分组使用 `role="group"`，真实选项继续使用 `role="option"`。
- 本轮新增 `docs/examples/select/example-08.vue` 并更新 `docs/components/select.md`，补充分组选项 demo 与 `SelectOption` 类型说明。
- 本轮补充 `docs/examples/select/example-07.vue` 空分组示例，用于验证所有 group 的 `children` 都为空时展示 `empty-text`。
- 验证：先用源码断言确认 group API 标记从缺失转为存在；随后 `npm run typecheck` 与完整 `npm run check` 通过。浏览器验证 `/components/select`：分组标题渲染为 `role="group"` 且不可选中，键盘方向键跳过 group 标题和 disabled option，`group.disabled` 会禁用子选项，混排普通 option 与 group child 都可选中，空 group 示例展示 `empty-text`。
## 2026-06-06 Select 视觉反馈修正

- 用户确认 Select 选项选中态采用“第三版”结构方向，并进一步要求选中项除了左侧深 brand 条外，背景使用浅 brand 色、不要右侧 check 图标、选项行左右贴满下拉面板。
- 本轮修改 `src/components/Select/SelectOptionList.vue`：选中项改为 edge-to-edge `bg-brand-light`、左侧 3px `bg-brand` 条、`text-brand` 中字重，并移除右侧 check icon；hover / active 非选中项继续使用中性 hover 背景。
- 本轮修改 `src/components/Select/Select.vue`：`clearable` 改为鼠标悬浮 Select 主体时在下拉箭头位置切换为清空按钮；补 `PopperTrigger class="w-full"`，避免外层 inline-flex 让 Select 默认宽度被内容撑缩。
- 根据用户继续反馈，Select 下拉面板移除显式 `border` / `border-[var(--border-color-component)]`，保留 `shadow-popper`，用多层阴影和 inset edge 表达类似 TDesign 的浮层边缘。
- 根据用户继续反馈，clearable hover 切换时清空按钮与下拉箭头视觉位置不一致；浏览器量测发现箭头作为直接 SVG 子节点在 20px suffix 槽位内左对齐，而清空按钮作为 `FieldAction` 在槽位内居中。本轮为 Select suffix 槽位补 `justify-center`，让箭头、loading 和清空按钮共用同一中心点。
- 本轮统一 `docs/examples/select/` 示例父容器宽度为 `max-w-80`，让 Select 默认宽度表现为占满父容器，不再在示例页出现参差不齐的默认宽度。
- 验证：`npm run format:check`、`npm run lint`、`npm run typecheck`、`npm run build` 和完整 `npm run check` 均通过；本地 VitePress dev server 已启动在 `http://127.0.0.1:5185/components/select` 且页面返回 200。当前工具环境未暴露 Browser 控制工具，Node REPL 也缺少 `playwright` / `playwright-core`，所以未完成自动化点击/hover 截图复验。

## 2026-06-06 收尾与新对话交接

- 今天已完成图标补充收尾、Select 单选首版实现和 Select 后续反馈记录；最新关键提交包括 `98078e8 feat(select): 实现单选选择器首版`、`9abf7a1 docs(project): 记录 Select 后续调整项`、`f3b826e docs(project): 补充 Select 浮层样式方案待办`。
- Select 首版通过 `npm run check`，文档页 `http://127.0.0.1:5185/components/select` 返回 200；收尾时 5185 dev server 仍在监听。当前会话没有可调用 Browser 插件且仓库 Playwright 缺少 `playwright-core`，点击/键盘交互仍需后续补验。
- 明天新对话最短接入：先执行 `git status --short` 和 `git log -1 --oneline`，再读 `AGENTS.md`、`TODO.md`、`CODE_STYLE.md`。Select 首版视觉反馈与 `children` / `title` 分组 API 已落地；TagInput 已后置到路线最后，下一步优先按组件路线推进 Dropdown / Menu，或继续补 Select 多选 / searchable 等后续能力。
- 本次收尾只更新项目记忆文档，不修改组件实现；提交前以 `git diff --check` 和记忆文档 Prettier 检查为准。

## 2026-06-06 Select 单选首版

- 按用户计划新增 `src/components/Select/`：`Select.vue`、`types.ts`、`index.ts` 和私有 `SelectOptionList.vue`。
- 首版只支持单选与 `options` prop，复用 Field 触发器和 Popper `manual` + `match-width` 定位；Select 面板自行维护 surface 样式，不改变 Popper 底层无视觉样式原则。
- 已支持 clearable、loading、empty、disabled option、readonly、状态、尺寸、隐藏 input、键盘导航和 combobox/listbox ARIA；禁用不可聚焦不可展开，只读可聚焦但不可展开、不可清空、不可改值。
- 已更新 `src/components/index.ts`、VitePress theme 注册、sidebar、`docs/components/select.md` 和 7 个 `docs/examples/select/` 示例。
- 先用 VitePress build 做红灯验证，确认文档示例因 Select 未导出失败；实现后 `npm run check` 通过。文档页 `http://127.0.0.1:5185/components/select` 已返回 200；当前会话没有可调用的 Browser 插件且仓库 Playwright 缺少 `playwright-core`，点击/键盘交互需后续在可用浏览器测试环境中补验。
- 用户反馈先记录、今天不改：选项选中态和下拉浮层 surface 样式都需要先用生图能力出几版方案给用户确认，浮层重点考虑 box shadow、边框、圆角、间距和层级感；clearable 需要改成 hover Select 主体时下拉箭头位置切换为清空按钮；Select 默认宽度需要像 Input 一样占满父元素，避免示例页宽度参差；选项列表需要支持 group，下次确认是补进首版还是作为后续扩展。

## 2026-06-05 组件路线与内部原型计划

- 用户确认后续组件路线方向可行，并要求将建议加入项目计划。
- 已将未来组件开发顺序写入计划：优先 Select；Select 单选首版完成后，当时依次考虑 Dropdown / Menu、Form / FormItem / Textarea、Popconfirm、Dialog / Drawer、Message / Notification、DatePicker / TimePicker、Pagination / Table、Tabs / Breadcrumb / Steps、TreeSelect / Cascader / ColorPicker，TagInput 后置到最后；2026-06-09 已更新为 Textarea 本轮先不做，优先推进 Form / FormItem。
- 已将内部通用原型候选写入计划：OptionList / Collection、RovingFocus / Composite、Overlay / Layer、FormControl context；同时明确 PopupSurface / FloatingSurface 暂缓，避免为了统一 surface 样式过早抽成万能盒子。
- 已补充判断原则：内部原型必须有明确跨组件收益，能减少真实重复、统一可访问性或降低复杂状态错误时才沉淀；不为了文件拆分、样式复用或概念完整而提前抽象。
- 已全局安装 4 个新增技能：`better-icons` 用于获取统一 SVG icon；`grill-me` 可用于重要设计前的逐问题压力测试；`design-an-interface` 可用于 Select、OptionList、Overlay 等模块接口多方案比较；`documentation-and-adrs` 可用于重要架构/API/工具链决策记录。安装输出里 `PromptScript` 不支持全局安装的失败不影响 Codex。
- 用户补充指出当前 Icon 本地 SVG 存在视觉中心、大小和规范不一致问题；已将 Icon SVG 图标体系重整加入高优先级计划，后续应统一 `viewBox`、绘制范围、视觉中心、`currentColor`、笔触和 fill/stroke 策略，并补图标网格预览与自动校验。
- 本轮只更新项目记忆文档和全局 skills，不修改组件源码，不运行构建。

### 收尾与新对话交接

- 用户表示今天先到这里，预计明天开新对话；本节用于给新会话快速接入。
- 当时最新提交仍是 `262db57 docs(project): 记录收尾与技能安装`；本轮未 stage / commit。
- 收尾时工作区改动仅限记忆文档：`AGENTS.md`、`TODO.md`、`task_plan.md`、`findings.md`、`progress.md`。
- 已完成轻量验证：`git diff --check` 与 `npm run format:check` 通过；未跑完整 `npm run check`，因为本轮没有组件源码、构建配置或依赖文件改动。
- 明天新对话建议先重启 Codex，使今天安装的 `better-icons`、`grill-me`、`design-an-interface`、`documentation-and-adrs` 被会话自动发现；随后执行 `git status --short` 和 `git log -1 --oneline`，再从 `TODO.md` / `task_plan.md` 选择是先收口文档提交、推进 Select，还是独立启动 Icon SVG 重整。

## 2026-06-05 Icon SVG 图标体系首轮重整

- 已先提交昨日遗留记忆文档：`4517523 docs(project): 更新未来计划与技能记忆`。
- 已为图标规范补红灯校验：新增 `scripts/check-icons.mjs` 和 `npm run check:icons`，首次运行按预期因 48 个旧 SVG 固定 `width` / `height` 失败。
- 用户确认整套图标统一替换为 Lucide 风格；已将 `src/components/Icon/icons/` 下 48 个 SVG 按同名文件替换为 Lucide outline 来源，并保留现有 `Icon` API 与调用名。
- `npm run check:icons` 已从红转绿，确认新版 SVG 满足 `viewBox="0 0 24 24"`、无固定宽高、`currentColor` 和 2px round stroke 等结构规范。
- 已更新 `docs/components/icon.md`、`docs/.vitepress/theme/components/IconGrid.vue`、`AGENTS.md`、`CODE_STYLE.md` 和 `package.json`：图标文档修正为 48 个，IconGrid 增加多尺寸与真实容器预览，`check:icons` 纳入 `npm run check`。
- 已通过 Figma MCP 在用户提供的 Horizon UI 文件中生成 `Horizon Icons Audit` 页面，包含 48 个新版图标卡片、Lucide 来源标注、尺寸预览和 Button / Field / Tag 容器预览。
- 遇到的问题：Node 子进程无法直接 spawn `npx` / `npx.cmd`，改用 Iconify API 批量获取 SVG；Figma 插件环境没有 `fetch`，改为把本地 SVG 数据嵌入 Figma 脚本生成审计页。

## 2026-06-05 Figma 设计工作区整理尝试

- 用户确认后续设计稿建议都在他提供的 Figma `Horizon UI` 文件中实现；后续组件方案、图标审阅和视觉草稿应优先落到该文件。
- 本轮计划补充 48 个常用 Lucide 图标候选，并整理为 `00 Workspace`、`01 Icon Library`、`02 Component Drafts` 三页结构；分类覆盖 Navigation、Data、Forms、Feedback、Auth、Files、Actions、System。
- Figma MCP 写入时先按 4 页结构尝试，触发 Starter 计划最多 3 页限制；调整前又触发 Starter 工具调用额度限制，后续 Figma 读写被拦，本轮无法确认或继续整理画布。
- 已记录后续约定：额度恢复后按 3 页结构重跑，保留未知页面和未知内容，只替换带 `horizon_ui_codex` shared plugin data 或明确管理命名的画板。

## 2026-06-06 Icon 常用图标补充

- 用户决定先不继续使用 Figma，改为直接在项目内补充常用图标。
- 本轮先将 48 个目标图标写入 `scripts/check-icons.mjs` 必备列表，并运行 `npm run check:icons` 得到预期红灯：48 个新增图标均缺失。
- 已从 Lucide / Iconify 获取并规范化 48 个 SVG，新增到 `src/components/Icon/icons/`，当前内置图标总数为 96。
- 新增图标覆盖导航、数据、表单、反馈、权限、文件、操作和系统场景；Icon API 不变，仍通过 `<Icon name="menu" />` 这类同名文件调用。
- 根据用户反馈，VitePress Icon 页已改回轻量搜索网格，移除分类筛选、尺寸预览和真实容器预览；同时重新规范化 48 个新增 SVG，修复子 `<rect>` 宽高被误删导致的图标缺笔画问题，并补 `check:icons` 规则防止 root 标签碎片、BOM 和缺失 rect 几何属性再次漏过。
- 根据用户反馈，将来源库命名里的 `grid-2x2` / `building-2` 收敛为 Horizon 对外简洁名 `grid` / `building`，并调整 Icon 文档网格排序，让 `xx-left` / `xx-right`、`sort-*`、`folder*`、`zoom-*` 等关联图标相邻展示。

## 2026-06-04 收尾与新对话交接

### 今日完成概览

- token 文件边界整理已完成并提交推送：`font.css` 改为 `typography.css`，`size.css` 中的圆角拆到 `radius.css`，`elevation.css` 拆为 `shadow.css`、`motion.css`、`z-index.css`；`color.css` 仍保持完整色彩系统。对应提交为 `6dc6521 refactor(styles): 拆分设计令牌文件边界`。
- `ComponentDemo` 源码展示体验优化已完成并提交推送：源码展示复用 VitePress / Shiki 构建期高亮，支持 `github-light` / `github-dark` 双主题、行号、示例路径、单一复制 icon、完整亮暗 shell；源码 toolbar 整行可点击展开，复制 icon 阻止冒泡。对应提交为 `c99cc21 docs(vitepress): 优化组件示例源码展示`。
- 本轮临时真实预览页 `docs/public/component-demo-preview.html` 已用于方向确认并在正式实现后删除，避免原型页进入项目。
- 已查询并评估 skills 生态；skills.sh 当前公开榜单没有“好评率/评分”字段，只有安装量、近 8 周活跃度和来源信息，因此用安装量与来源声誉作为质量近似信号。
- 用户确认需要安装 Superpowers；已全局安装 `obra/superpowers` 的 14 个工作流 skills，供重启 Codex 后在计划、执行、验收、分支收尾、子代理协作、review、debug、TDD 等场景使用。安装输出中 `PromptScript` 不支持全局安装的失败不影响 Codex。
- 已更新 `AGENTS.md`、`TODO.md`、`task_plan.md`、`findings.md` 和 `progress.md`，记录今日任务、Superpowers 安装情况和下一次新对话接入注意点。

### 新对话入口建议

- 新会话先执行 `git status --short` 和 `git log -1 --oneline`，再读 `AGENTS.md`、`TODO.md`、`CODE_STYLE.md`；需要更多背景时读 `findings.md`、`task_plan.md`、`progress.md`。
- 当前后续队列仍以 `TODO.md` 为准：Field 复杂场景验证、组件迁移滚动守护、pnpm 迁移评估/执行、关键组件浏览器验证和 dark mode 色彩规范。
- Superpowers 是工作流辅助，不替代项目记忆文档、当前源码和实际验证；复杂任务可结合其计划、执行、验收、分支收尾和子代理协作流程。

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
- Tooltip 已迁移到 Popper 基座：Tooltip 继续负责语义 API、延迟与主题视觉，Popper 负责定位、Teleport、arrow、可配置 outside click / Esc dismiss 和 z-index。
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

### FieldAction / InputNumber 尺寸规范定稿

- FieldAction 的 20x20 动作位收束到 `fieldActionGeometryMap`，作为输入域内部动作几何维护。
- InputNumber 的中间输入段宽度和输入 padding 收束到 `inputNumberGeometryMap`，保留 sm/md/lg 的 72/88/104px 中间段宽度；步进按钮继续复用 Button square 的 24/32/40 尺寸。
- Field 文档新增 FieldAction 固有尺寸说明，InputNumber 文档新增整体高度、中间输入段、输入 padding 和步进按钮规格表。
- 验证：`npm run check` 已通过；5175 preview 浏览器确认 FieldAction 实际为 20x20，构建产物确认 InputNumber 的 72/88/104px 输入段宽度和组件尺寸 token 已进入 CSS。

### Callout / Divider 尺寸规范定稿

- Callout 的外层布局、4px 左侧色条和内容 padding 收束到 `calloutGeometryMap`，主题色配置独立为 `calloutThemeMap`。
- Divider 的横向布局、标签 padding、24px 靠边短线、纵向 1em 高度收束到 `dividerGeometryMap`。
- Callout / Divider 文档新增“尺寸规格”表；项目记忆将组件级固有尺寸首轮扫描调整为已完成，后续转为持续守护规则。
- 验证：`npm run check` 已通过；构建产物确认 Callout 左侧色条、Divider 靠边短线、标签 padding 和纵向高度对应 class 已进入 CSS。

### Link 行为规范收敛

- 组件迁移扫描转向基础组件行为；Link 是本轮第一项，问题点是 disabled 仍使用透明语义色，且外部传入 href 时 disabled 可能无法阻止原生跳转。
- Link 补齐正式 `href` / `target` / `rel` props；`target="_blank"` 默认补 `noopener noreferrer`。
- Link disabled 状态按 theme 使用对应 disabled token，移除可跳转 href，并阻止原生点击默认行为和事件继续传播。
- Link 文档新增“链接目标”示例和 props 说明。
- 用户确认：不要为了 VitePress 表现向组件源码加入 `!important`、文档专用 class 或特殊覆盖；文档站样式污染应在 `docs/.vitepress/theme/vitepress.css` 隔离处理。
- 定位 Link 文档页样式问题：`.vp-doc a` specificity 高于原 `.demo-box-preview :where(a, ...)` 隔离规则，导致 demo 内 Link 被 VitePress 链接色、字重和下划线覆盖；已将隔离选择器提高为 `.vp-doc .demo-box-preview :is(...)`。
- 验证：5173 dev server 截图和 computed style 已确认 Link theme / disabled theme / underline 恢复为组件自身样式。

### Text / Title 字体规范收敛

- 继续基础组件扫描，发现 Title 文档仍写“字号参照 TDesign”，字体指南仍是旧 Tailwind `text-*` 阶梯。
- Text / Title 源码 map 命名补充组件前缀；无行为变化。
- Text / Title 组件文档新增或更新字体规格说明，明确使用 `font-body-*` / `font-title-*`。
- `docs/guide/typography.md` 更新为 Horizon 当前字体 token 表。
- 验证：`npm run check` 已通过；5173 dev server 截图和 computed style 已确认 Title 1-6 级标题映射到 `font-title-*`，Text 默认 / code / keyboard / disabled theme 映射到对应 `font-body-*` 与 disabled token。

### Input / InputNumber / Tag / Popper 浏览器验证

- 完成 Input 浏览器验证：sm/md/lg 为 24/32/40px；disabled 使用 disabled bg/border/text token；状态边框、清空按钮、密码切换和回焦行为正常。
- 验证时发现 `docs/.vitepress/theme/vitepress.css` 的 demo 隔离规则对 `input/textarea` 使用 `all: revert-layer`，会清掉 Field/Input disabled cursor；中途尝试移除 input / textarea 后又发现 VitePress / Preflight 的 unlayered reset 会覆盖组件 padding。最终保留 input / textarea 的 `revert-layer` 以保护 padding，并在同一 DemoBox 范围后置补回 disabled cursor。
- 完成 InputNumber 浏览器验证：步进按钮为 24/32/40px，中间输入段为 72/88/104px，按钮点击和 ArrowUp 同步正常；发现 readonly 下步进按钮外观仍可点击，已改为 disabled 视觉和行为一致。
- 完成 Tag 浏览器验证：固定 24px 高、`px-2`、`gap-2`、theme/variant、关闭、可选、禁用状态正常；发现 VitePress button 隔离规则影响 Tag close button 的 scoped 布局，已排除 `.tag-close` / `.field-action`；Tag disabled closable 的 close cursor 已修正为 `not-allowed`，aria-label 改为“关闭”。
- 完成 Popper 浏览器验证：V-01 click + Esc、V-04 matchWidth、V-05 placement/arrow、V-06 flip、V-07 shift、V-08 autoUpdate、V-09 disabled、V-10 z-index 递增、V-11 offset 均已验证。
- Popper 验证中发现 V-10 文档写死 z-index 数值但实际会随页面 Popper 实例递增，已改为相对层级验证；V-06/V-07 浮层过小导致固定顶栏下难以触发边界，已改为高浮层 demo。
- Popper `shift` 原实现只使用 Floating UI 默认轴，无法将 `top` 溢出的高浮层推回视口；已改为 `shift({ padding: 4, crossAxis: true })`，与文档“超出视口推回可见”语义一致。
- 当前 in-app browser 控制通道无法可靠触发 hover 事件；本轮未把 Popper V-02 作为自动化通过项，已记录到 `TODO.md`，后续需要专门测试环境或人工复核。Popper V-03 focus 已在后续 Tooltip / PopperTrigger 回归中复验通过。

### 文档演示框架评估

- 用户提出在阶段 3 和 4 之间插入文档演示框架调研：VitePress 作为文档站自带较多全局样式和 reset，当前 DemoBox 为此维护了额外隔离规则。
- 已新增 VitePress `layout: page` 实验页 `docs/components/button-clean.md`，并新增 `ComponentDocPage` / `CleanDemoBox` 自定义文档 shell。
- 实验结论：`layout: page` 可以避开 `.vp-doc` 包裹，降低 Markdown 样式对组件 demo 的影响；但 VitePress 全局 button reset 仍会覆盖 Button 的背景、边框和 padding，因此 CleanDemoBox preview 内仍需要 scoped `all: revert-layer`。
- 已接入 Histoire 最小工作台：新增 `histoire.config.ts`、`histoire.setup.ts`、`stories/Button.story.vue`，并新增 `dev:histoire` / `build:histoire` / `preview:histoire` 脚本。Histoire 预览中 Button 的 theme、variant、shape、disabled、loading 渲染正常，controls/source 面板可用于组件验证。
- 依赖已升级：新增 `histoire@1.0.0-beta.1`、`@histoire/plugin-vue@1.0.0-beta.1`、`@vitejs/plugin-vue@6.0.7`，并将根项目 Vite 升到 `^7.3.5`；VitePress 自身仍保留 `^1.6.4`。`package.json` 已声明 `engines.node >=22.13.0`。
- 当时系统 Node `v22.10.0` 对 Vite 7 / Histoire 依赖链偏旧，安装时会出现 engine warning；使用临时 Node 22.13.1 执行 Histoire build 已通过，但 beta 版仍会输出空 global setup 虚拟模块相关的非阻断 warning。该历史问题已在后续 Node 24 LTS 升级中处理。
- 内置浏览器复验：`/components/button-clean` 在加 scoped reset 后 Button computed style 恢复为正确背景、边框、文本色和 `15px` 横向 padding；Histoire `/story/stories-button-story-vue?variantId=stories-button-story-vue-0` 渲染正常。
- 优先级结论：短期不整体替换 VitePress；Histoire 作为并行组件工作台优先推进，VitePress 文档 shell 按需渐进收敛。

### 今日收尾记录

- 用户复核 Input 演示截图时指出 disabled cursor 仍不对；重新用浏览器 computed style 确认：组件 scoped 的 `.field-native-input:disabled` 已命中，但随后被 DemoBox 的 `all: revert-layer` 恢复为 `cursor: default`。
- 最终修正位于 `docs/.vitepress/theme/vitepress.css`：保留 DemoBox 内 `input` / `textarea` 的 `all: revert-layer` 来避免 input padding 被 VitePress / Preflight reset 覆盖，同时新增 `.vp-doc .demo-box-preview :is(input, textarea):disabled { cursor: not-allowed; }`。
- 复验 `/components/input`：普通 input 为 `cursor: text`，disabled input 为 `cursor: not-allowed`，Input padding 为 `0px 12px`，截图显示输入框内容不再贴边。
- 今日最后一次完整验证：`npm run check` 通过，包含 format:check、lint、typecheck 和 VitePress build。
- 明天继续前先看 `git status --short`；当前本轮浏览器验证和修复尚未提交，建议确认改动后统一提交。

## 2026-06-04

### VitePress `:::demo` 一步到位迁移

- 用户最终确认继续使用 VitePress，并要求不保守兼容旧 DemoBox / Histoire / Storybook 方案，直接追求文档演示的最终效果。
- 清理 Histoire / Storybook spike：移除相关脚本、依赖、配置、story 和实验页，根项目 Vite 回到 VitePress 兼容的 `^6.4.3`。
- 新增 VitePress `:::demo` 语法：`docs/.vitepress/plugins/demo.ts` 负责解析 demo 容器，`ComponentDemo` 负责预览、源码展开/收起和复制。
- 使用 `.vp-raw` 与 `postcssIsolateStyles` 隔离 VitePress `base.css` / `vp-doc.css`，后续样式污染优先在 demo shell 和 VitePress theme 层处理，不写进组件源码。
- 批量迁移 17 个组件文档，生成 108 个 `docs/examples/**/*.vue` 单源示例；组件页只引用示例路径，预览和源码展示共用同一份 `.vue` 文件。
- 删除旧 `DemoBox.vue`，移除文档页内的 details 查看代码写法。
- 验证：`npm run check` 通过；内置浏览器抽查 `/components/button`、`/components/checkbox`、`/components/inputnumber`、`/components/popper`，确认 demo 数量、预览渲染、源码折叠和源码内容正常。

### 迁移后清理

- 删除 `docs/.vitepress/theme/vitepress.css` 及其 theme import；该文件只剩 VitePress h2 节奏微调，不再承担 demo 隔离职责。
- 将 `CLAUDE.md` 收敛为轻量入口，避免继续维护一份已经包含旧 DemoBox / Histoire 信息的重复项目说明。
- 移除未直接使用的顶层依赖 `@floating-ui/dom` 和 `@vueuse/core`；`@floating-ui/dom` 仍由 `@floating-ui/vue` 作为传递依赖管理。
- 修正 Radio 文档首个 demo 标题从 `??` 到“基本用法”。

### 提交与下次接入计划

- 用户要求记录当前进度和后续计划，确保下次对话能快速接上；本节作为 2026-06-04 收尾交接记录。
- 已按性质拆分提交：
  - `48c0c68 fix(components): 修正组件验证边界问题`
  - `1bc564a docs(vitepress): 迁移组件演示为 demo 容器`
  - `26fbf67 docs(project): 更新演示迁移上下文`
- 收尾前 `git status --short` 为空，`npm run check` 通过；如果下次打开时状态不同，先按当前工作区差异判断是否有用户新增改动。
- 新增后续事项：`ComponentDemo` 源码展示尚无语法高亮，demo 容器视觉样式也可继续优化；已记录到 `TODO.md` 和 `task_plan.md`。
- 下次优先级建议：先确认工作区 clean 和最近提交，再从 `TODO.md` 的近期开发计划选择任务；若继续文档体验，优先做 `ComponentDemo` 语法高亮与样式打磨；若继续组件主线，则回到组件迁移扫描和关键组件浏览器验证。

### Divider API 命名迁移

- 继续组件迁移扫描，定位到 Divider 仍使用组件级 `type="solid|dashed"` 表达线型；其余 `type` 残留为 Input / Field 原生 input 类型或 button 类型，不属于视觉形态 API。
- 已将 `src/components/Divider/Divider.vue` 的线型 prop 改为 `variant?: 'solid' | 'dashed'`，默认值为 `solid`，并改用 `props.variant` 控制 `border-dashed`。
- 已同步 `docs/components/divider.md` 与 `docs/examples/divider/example-02.vue`，虚线示例改为 `variant="dashed"`。
- 验证：`npm run check` 通过；5174 dev server 返回 `/components/divider` 200，内置浏览器确认页面显示 `variant="dashed"` 说明，源码展开后包含 `<Divider variant="dashed" />`，且虚线示例视觉正常。

### Callout 浏览器验证

- 继续补关键组件浏览器级视觉验证，优先覆盖此前只做过构建产物确认的 Callout。
- 内置浏览器验证 `/components/callout`：页面标题、2 个 demo、主题说明、源码预览和 6 个实际 Callout 实例均正常渲染。
- computed style 确认左侧色条为 4px，内容 padding 为 `12px 16px`，外层圆角为当前 `--round-default` 结果；正文和标题颜色均跟随 `brand` / `success` / `warning` / `error` theme。
- 本轮未发现 Callout 需要代码修复的问题，已将 TODO / task_plan / findings 的浏览器验证覆盖范围补充到 Callout。

### Checkbox / Radio 浏览器验证

- 继续补关键组件浏览器级视觉回归，覆盖 Checkbox / Radio 的 default 与 `variant="button"` 两套形态。
- 内置浏览器验证 `/components/checkbox`：7 个 demo 正常；default box 为 16x16，icon 为 12x12；button variant sm/md/lg 为 24/32/40px，disabled 项为 `cursor: not-allowed`。
- 内置浏览器验证 `/components/radio`：4 个 demo 正常；default circle 为 16x16，inner dot 为 8x8；button variant sm/md/lg 为 24/32/40px，disabled 项为 `cursor: not-allowed`。
- 发现并修复 Checkbox / Radio button variant 非禁用项 cursor 为浏览器默认值的问题：已在 `src/components/Checkbox/Checkbox.vue` 和 `src/components/Radio/Radio.vue` 中为非禁用 button 项补 `cursor-pointer`。
- 交互复验通过：Checkbox 独立项、Checkbox button 组、Radio default 组和 Radio button 组点击后均能更新对应 checked / aria-checked / data-selected 状态，禁用项保持不变。

### 工作方式记录

- 用户修正子代理使用边界：后续不只扫描、验证或小修可以开启子代理；调研、重开发、复杂排查、跨组件验证、并行实现，或任何能提升效率、覆盖面、完成度的场景，都可以分派子代理协助。
- 当前 Switch / Badge 浏览器验证范围较小、路径线性，先由主代理直接完成。

### Switch / Badge 浏览器验证

- 继续补关键组件浏览器级视觉验证，覆盖 Switch 与 Badge 的组件内部几何规格和关键状态。
- 内置浏览器验证 `/components/switch`：4 个 demo、8 个实际 Switch 均正常；sm/md/lg track 为 26x16 / 32x20 / 40x24，thumb 为 10x10 / 12x12 / 14x14，激活位移为 10 / 12 / 16px。
- Switch 交互复验通过：非禁用关闭项点击后 checked / aria-checked / 背景色 / translate 更新；disabled 与 loading 项 cursor 为 `not-allowed`，点击 disabled 项被浏览器阻止。
- 内置浏览器验证 `/components/badge`：7 个 demo、19 个实际 Badge 均正常；dot 为 6x6，数字 / 文本胶囊为 20px 高、16px min-width、左右 6px padding。
- Badge 的 `max`、`show-zero`、offset、自定义 `color` 和 `hidden` 行为均符合文档预期；本轮未发现 Switch / Badge 需要代码修复的问题。
### Tooltip / PopperTrigger 浏览器验证

- 本轮任务转向 Tooltip 浏览器回归，因涉及 `PopperTrigger` 底层事件转发，按用户授权并行开启 3 个子代理做 base-component review 的性能、功能完整性与代码质量维度审查。
- 内置浏览器验证 `/components/tooltip` 时发现 focus 触发不显示浮层；click、manual 与 disabled 路径正常。
- 修复 `PopperTrigger`：明确转发 `mouseenter` / `mouseleave` / `click` / `focus` / `focusin` / `blur` / `focusout`，并将内部 focus 显隐收敛到 `focusin` / `focusout`，避免 `focus.capture` 与 `focusin` 双触发导致重复 timer / emit。
- 修复复合触发器内部切焦点边界：内部 focus move 不再向上层 emit 离开事件，避免 Tooltip 等 `trigger="manual"` 上层组件误隐藏。
- 修正 `usePopper` / `PopperContext` / `UsePopperReturn` 中 `updatePosition` 的返回类型，从虚假的 `Promise<void>` 改为真实 `void`。
- 同步 `docs/components/popper.md`，补充 `PopperTrigger` 的事件门面说明。
- 内置浏览器复验 `/components/tooltip`：focus 显示“聚焦触发”，click 与 manual 可开关，disabled 不显示浮层；Tooltip surface 仍为 max-width 240px、padding 4px 8px、round-default、shadow-popper。
- 内置浏览器复验 `/components/popper` 的 `trigger="focus"`：输入框聚焦后浮层显示“聚焦时显示，失焦关闭”，点击页面其他按钮后浮层关闭。
- 内置浏览器 CUA 鼠标移动未能可靠改变页面 `:hover` 状态，因此 hover 未作为自动化通过项；该限制已同步记录到 `TODO.md` 与 `findings.md`。
### 旧版 design.md 清理

- 继续扫描旧规范残留时发现根目录 `design.md` 仍保留 `primary` / `danger`、旧 radius / shadow token 等早期设计稿内容。
- 该文件未被源码、文档站或构建引用，且与当前 `src/styles/tokens/**`、`docs/guide/**` 和根目录记忆文档中的规范冲突。
- 按用户确认的开发阶段原则，已删除根目录旧版 `design.md`，避免后续代理或人工开发误读旧 token 体系。

### 依赖与运行时升级原则记录

- 用户补充确认：如果项目依赖、工具链或 Node.js 版本偏旧，且升级能带来更好的完整性、性能、简洁性或最终效果，先和用户确认后直接升级。
- 开发阶段不以旧内部适配为优先约束；升级后如果项目内部不适配，应同步修正适配问题，而不是为了兼容旧实现回避升级。
- 已同步 `AGENTS.md`、`TODO.md`、`findings.md` 和 `task_plan.md`，后续处理依赖或 Node 版本问题时按该原则执行。

### 组件迁移扫描回合

- 使用主代理 + 3 个子代理并行扫描源码规范残留、文档示例漂移和依赖工具链隐患；本轮未发现源码中仍有旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token，或视觉形态继续使用组件级 `type` 的高置信残留。
- 修复 Checkbox / Radio 默认控件键盘焦点态：隐藏 input 加 `peer`，可视 box / circle 使用 `peer-focus-visible:ring-2 peer-focus-visible:ring-brand-focus`。
- 修复 Checkbox / Radio button variant 焦点态：补 `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-focus focus-visible:outline-none`，并用 `focus-visible:z-10` 避免分段边界被相邻项压住。
- 修复 Switch 焦点态：移除手写 `.switch-input:focus + .switch-track` box-shadow，改为 `peer-focus-visible:ring-2 peer-focus-visible:ring-brand-focus`，避免鼠标点击也显示键盘焦点环。
- 修正 `docs/guide/colors.md`：语义色 token 从不存在的 `--brand-color-*` / `--error-color-*` 等改为真实 `--color-brand-*` / `--color-error-*` / `--color-success-*` / `--color-warning-*`，并补充 Tailwind v4 `@theme` 工具类生成说明。
- 修正文档漂移：`docs/components/checkbox.md` 的 `direction` 说明改为 default 形态；`docs/components/popper.md` 删除 V-10 后多余 `:::`；`docs/components/field.md` 补齐 FieldContent、FieldAction、FieldGroup、FieldSegment 等公开 primitive props；`docs/guide/field-system.md` 从旧实施计划改为当前状态与后续验证。
- 依赖扫描结果（升级前）：当时 Node `v22.10.0` 低于 `eslint-visitor-keys@5.0.1` 的 `^22.13.0` 要求；`npm audit` 有 4 个 moderate，其中 `brace-expansion@5.0.5` 可自动修复，VitePress 嵌套 Vite/esbuild 暂无直接修复版本；`npm outdated` 有 Tailwind、Vue、vue-tsc、typescript-eslint 等 patch/minor 候选。后续 Node 24 LTS 与依赖升级已单独处理。
- 验证：`npm run check` 通过；内置浏览器 5176 复验 `/components/checkbox`、`/components/radio`、`/components/switch`，默认控件和 button variant 均命中 `brand-focus` ring；`/guide/colors`、`/components/field`、`/guide/field-system` 显示新文案。

### Node 24 LTS 与依赖升级

- 用户确认建议使用 nvm 进行 Node 升级；本地确认 nvm `1.2.2` 可用，并通过 nvm 安装 / 切换到 Node `24.16.0`，npm 为 `11.13.0`。
- `package.json` 已补 `packageManager: npm@11.13.0` 与 `engines`：Node `>=24.16.0`、npm `>=11.13.0`。
- 执行依赖升级后，直接依赖已推进到当前最新可用版本，包括 Tailwind 4.3、tailwind-merge 3.6、Vue 3.5.35、vue-tsc 3.3、typescript-eslint 8.60、ESLint 10.4、Vite 8.0。
- ESLint 10 检查时发现 `eslint.config.js` 直接 import `globals` 但未声明直接依赖；已补 `globals@17.6.0` 到 devDependency。
- `npm outdated --json` 当前为空；`npm audit` 剩余 3 个 moderate，均来自 `vitepress@1.6.4` 内部嵌套的 Vite/esbuild，当前 VitePress 最新正式版仍为 `1.6.4`，暂无直接修复版本。
- 浏览器验证升级后的文档站时发现 VitePress 默认主题已注册 `Badge`，文档主题再全局注册 Horizon `Badge` 会产生 Vue warning；已将 Badge 示例改为本地 import，并从文档主题全局注册中移除 `Badge`。
- 验证：`npm run check` 通过；使用当前 Node 24 环境启动 `http://127.0.0.1:5180/`，内置浏览器抽查 `/components/badge`、`/components/checkbox`、`/components/popper`，页面标题、demo 数量、Vite overlay 均正常，按导航时间过滤无新增 warning。

### 包管理器迁移评估记录

- 用户提出将依赖管理从 npm 迁移到 pnpm，并进一步要求横向评估是否有比 pnpm 更合适的选择。
- 当前判断：pnpm 最适合列为中优先级工程基础任务；继续 npm 最稳但收益较小；Bun 性能强但对当前 Vue / Vite / VitePress / ESLint / Stylelint 工具链引入变量较多；Yarn Berry / PnP 能力强但迁移和生态适配成本偏高。
- 已将包管理器迁移加入 `TODO.md` 和 `task_plan.md`：优先 pnpm，备选继续 npm，不优先 Bun / Yarn；若执行需通过 Corepack 固定 pnpm 11、替换锁文件、统一脚本和文档，并完整验证 `pnpm install`、`pnpm run check`、audit 等价项和关键页面。

### 组件迁移收敛扫描

- 用户要求尽量一次性收敛迁移扫描，并授权在任务较重时开启子代理；本轮由主代理统筹，分派 3 个子代理分别审计源码组件、文档/示例/指南、样式/导出/工具链。
- 结构扫描通过：18 个组件文档、108 个 `docs/examples/**/*.vue` 示例、sidebar 与组件目录关系无缺失；未发现孤儿示例。
- 规范残留扫描通过：当前源码未发现旧 `primary` / `danger` API、旧 `--color-primary` / `--color-danger` / `--radius-*` token，或组件级视觉形态继续使用 `type` 的高置信残留。
- 修复 Tag checkable 可访问性：补 `role="checkbox"`、`aria-checked`、`aria-disabled`、可聚焦 tabindex、Space/Enter 键盘切换和 focus-visible ring。
- 修复 Input 内部 action 焦点边界：`handleBlur` 改用 wrapper ref 判断 `relatedTarget`，点击清空/密码按钮不再被误判为离开整个 Input。
- 修复 Icon 有 `ariaLabel` 时的语义：补 `role="img"`；Tooltip 通过 PopperTrigger 的 `aria-describedby` 关联真实 tooltip content id。
- 修复 InputNumber `change` 事件语义：聚焦时记录起始值，blur 提交/修正后仅在值确实变化时触发 `change`。
- 补齐 Popper 根导出：公开 `Placement`、`TriggerType`、`UsePopperOptions`、`UsePopperReturn`、`PopperContext` 与 `usePopper`。
- 补齐 shadow token `:root` fallback；`@types/node` 从 25.x 降回 `^24.13.0`，与 Node `>=24.16.0` 基线一致，并通过 `npm install` 重写 lockfile。
- 扩展 `lint:style` 覆盖 `docs/.vitepress/theme/**/*.vue`；IconGrid 改用 Horizon 语义 token，ComponentDemo / IconGrid 修复新增 lint 范围暴露的 CSS 规则问题。
- 修正文档漂移：色彩指南改为 Horizon 自定义 OKLCH token 为准；Popper / Tooltip 面向模板使用者统一 kebab-case prop；FieldGroup 指南职责与源码对齐；Text / Title 的 `secondary` 明确为组件专属辅助层级；字体指南同步 `Noto Sans Mono SC`、`Microsoft YaHei` fallback。
- 验证：`npm run check` 通过；启动干净 dev server `http://127.0.0.1:5181/` 后，内置浏览器复验 Tag 键盘切换、Tooltip `aria-describedby`、Input 清空回焦、InputNumber 页面和 colors / field-system / typography / popper 指南页，当前端口无 warning/error。
- 保留后续项：Radio button variant 尚未做 roving `tabindex`，建议与未来 Toggle / ToggleGroup 方向一起设计；InputNumber readonly 步进按钮 disabled 视觉保持此前“readonly 不允许步进”的既定边界。

### token 文件边界整理

- 用户确认 `radius.css` / `typography.css` 这类拆分方向更合理，但强调目标不是为了拆文件，而是只拆确实不适合放在一起的 token。
- 本轮审查 `src/styles/tokens/**` 后决定：`color.css` 仍保持完整色彩系统不拆；`size.css` 中的圆角拆出为 `radius.css`；`font.css` 重命名为更准确的 `typography.css`；`elevation.css` 拆为 `shadow.css`、`motion.css`、`z-index.css`。
- `src/styles/horizon.css` 已按领域顺序导入：color、typography、radius、size、shadow、motion、z-index；变量名保持不变，组件源码无需跟随改动。

### ComponentDemo 源码展示体验优化

- 用户确认采用 A 方向：保留预览在上、源码在下的 Quiet Dock 结构；复制入口只保留一个 icon button，避免文字按钮和 icon 重复。
- 用户进一步确认亮暗模式要覆盖整个 `ComponentDemo` shell，而不只是代码块；文档站 demo shell 不是组件库内部组件规范对象，可为最终文档体验自由使用 scoped CSS / Tailwind / VitePress 能力。
- `docs/.vitepress/config.ts` 已将 Markdown 高亮配置为 `github-light` / `github-dark` 双主题。
- `docs/.vitepress/plugins/demo.ts` 现在在构建期读取 `docs/examples/**/*.vue` 源码，并复用 VitePress MarkdownIt highlight 生成 Shiki 高亮 slot；复制仍使用 raw source，避免复制内容被展示 HTML 影响。
- `ComponentDemo` 已增加示例路径、源码行数、行号栏、单一复制 icon、复制成功 check 状态、Shiki 高亮源码展示和跟随 `.dark` 的完整亮暗 shell 样式。
- 复核亮色模式代码区后，将 light code surface 从纯白调整为浅冷灰背景，行号栏使用更深一层冷灰并增加分隔线；高亮 token 仍由 Shiki `github-light` / `github-dark` 控制。
- 源码 toolbar 已整体可点击并支持 Enter / Space 展开收起；复制 icon 停止事件冒泡，避免复制时误触发展开状态变化。
- 本轮临时真实预览页 `docs/public/component-demo-preview.html` 已用于方向确认，正式实现后已删除，避免把原型页带入项目。
