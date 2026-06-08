
# Popper 弹出定位引擎

> **底层组件** — 为 Select、Dropdown、Menu、Popconfirm 等上层组件提供定位与交互基础设施，通常不直接使用。

本页是开发者行为验证页面，覆盖全部 props 和边界场景。

---

### V-01 点击触发 (`trigger="click"`)

**验证**：点击弹出 / 再次点击关闭 / 点外部关闭 / Esc 关闭。

:::demo V-01 点击触发 (`trigger="click"`)
popper/example-01
:::

---

### V-02 Hover 触发 + 延时 + 箭头 (`trigger="hover"`, `show-delay`, `hide-delay`)

**验证**：悬停 200ms 弹出 / 离开 100ms 关闭 / 箭头跟随浮层内容背景显示。

:::demo V-02 Hover 触发 + 延时 + 箭头 (`trigger="hover"`, `show-delay`, `hide-delay`)
popper/example-02
:::

---

### V-03 Focus 触发 (`trigger="focus"`)

**验证**：聚焦输入框弹出 / 失焦关闭。`focusin`/`focusout` 确保 Input 组件的内部 `<input>` 冒泡到达。

:::demo V-03 Focus 触发 (`trigger="focus"`)
popper/example-03
:::

---

### V-04 手动控制 + 匹配宽度 (`trigger="manual"`, `match-width`)

**验证**：外部逻辑控制显隐 / 弹层宽度精确等于 trigger 渲染宽度 / 打开后 trigger 宽度变化时弹层同步更新。

:::demo V-04 手动控制 + 匹配宽度 (`trigger="manual"`, `match-width`)
popper/example-04
:::

---

### V-05 placement 全量覆盖

**验证**：12 种 placement 均定位正确、箭头指向正确。

:::demo V-05 placement 全量覆盖
popper/example-05
:::

---

### V-06 flip — 空间不足时翻转方向 (`:flip="false"`)

**验证**：两组 `placement="top"`。flip 开启时空间不足翻到底部；关闭时维持 top。

:::demo V-06 flip — 空间不足时翻转方向 (`:flip="false"`)
popper/example-06
:::

---

### V-07 shift — 溢出视口时推入视野 (`:shift="true"`)

**验证**：两组 `placement="top"` + `:flip="false"`。shift 开启时弹层被推入可见区域；关闭时可能溢出视口不可见。

:::demo V-07 shift — 溢出视口时推入视野 (`:shift="true"`)
popper/example-07
:::

---

### V-08 auto-update — 容器滚动时跟随 (`:auto-update="false"`)

**验证**：可滚动容器内。弹出气泡后滚动容器，`auto-update="true"` 跟随 trigger，`auto-update="false"` 留在原地。

:::demo V-08 auto-update — 容器滚动时跟随 (`:auto-update="false"`)
popper/example-08
:::

---

### V-09 禁用弹出 (`disabled`)

**验证**：`disabled="true"` 按钮无法触发弹出；浮层打开后切到 disabled 会立即关闭。

:::demo V-09 禁用弹出 (`disabled`)
popper/example-09
:::

---

### V-10 z-index (`z-index`)

**验证**：一个按钮同时触发三个弹层。z-index 自动递增，绿色在最上面。

:::demo V-10 z-index (`z-index`)
popper/example-10
:::

---

### V-11 offset 间距 (`offset`)

**验证**：不同 offset 值影响弹层与 trigger 的距离。

:::demo V-11 offset 间距 (`offset`)
popper/example-11
:::

---

## API

### Popper Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `placement` | `Placement` | `'bottom'` | 弹出位置偏好，12 个可选值 |
| `strategy` | `'absolute' \| 'fixed'` | `'absolute'` | 定位策略。`fixed` 直接跟视口绑定，容器滚动零延迟 |
| `offset` | `number` | `8` | 距离 trigger 的间距 (px) |
| `trigger` | `TriggerType` | `'manual'` | hover / click / focus / manual |
| `show-delay` | `number` | `0` | 显示延时 (ms) |
| `hide-delay` | `number` | `0` | 隐藏延时 (ms) |
| `visible` | `boolean` | — | v-model:visible，受控显隐 |
| `disabled` | `boolean` | `false` | 禁用弹出 |
| `close-on-outside-click` | `boolean` | `true` | 点击 trigger 与 content 外部时触发关闭 |
| `close-on-esc` | `boolean` | `true` | 按 Esc 时触发关闭 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `flip` | `boolean` | `true` | 弹出方向空间不足时自动翻转到对面 |
| `shift` | `boolean` | `false` | 弹层超出视口边界时是否沿轴向推回可见区域（留 4px 间距） |
| `match-width` | `boolean` | `false` | 浮层宽度匹配 trigger 宽度 |
| `auto-update` | `boolean` | `true` | 触发元素位置变化时弹层自动重新定位。`false` 仅定位一次 |
| `z-index` | `number` | 自动递增 | 手动指定 z-index，不填则自动计算（基准 2000） |

### Popper Events

| Event | 参数 | 说明 |
|-------|------|------|
| `update:visible` | `boolean` | 显隐状态变化 |

### PopperTrigger

包裹层 `<div class="inline-flex">`，负责参考元素 ref 和事件委托。

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `aria-describedby` | `boolean \| string` | `false` | 为 Tooltip 等上层组件关联浮层说明。`true` 时在浮层可见时使用当前 Popper content id，也可直接传入外部 id |

| Event | 参数 | 说明 |
|-------|------|------|
| `mouseenter` | `MouseEvent` | 触发器鼠标进入事件 |
| `mouseleave` | `MouseEvent` | 触发器鼠标离开事件 |
| `click` | `MouseEvent` | 触发器点击事件 |
| `focus` | `FocusEvent` | 焦点进入触发器 |
| `focusin` | `FocusEvent` | 焦点进入触发器或其子元素；触发器内部焦点切换不会重复触发 |
| `blur` | `FocusEvent` | 焦点离开触发器 |
| `focusout` | `FocusEvent` | 焦点离开触发器或其子元素；触发器内部焦点切换不会重复触发 |

### PopperContent

无 Props。z-index 由 Popper 管理，样式通过 `floatingStyles` 自动应用。PopperContent 默认不提供背景、边框或圆角；需要视觉样式时由上层通过 `class` / `style` 设置。

### PopperArrow

无 Props。默认使用 `8 × 8px` 的旋转方块，静态边偏移为 `-4px`，背景色通过 `bg-inherit` 从父级继承。

PopperArrow 的尺寸属于 Popper 的结构定位规格，不提供主题或尺寸 API；Tooltip、Dropdown、Popconfirm 等上层组件只负责传入背景色和 surface 样式。

### Placement 可选值

`top` / `top-start` / `top-end` / `bottom` / `bottom-start` / `bottom-end` / `left` / `left-start` / `left-end` / `right` / `right-start` / `right-end`
