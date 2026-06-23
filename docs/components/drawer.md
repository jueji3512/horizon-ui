# Drawer 抽屉

Drawer 是贴边展开的模态面板，用于承载较长的编辑、筛选、详情预览或辅助工作流。
它复用 Dialog modal layer，因此默认具备 overlay、滚动锁、焦点陷阱、Esc 关闭、关闭后焦点恢复，以及 Drawer 内 Popover / DropdownMenu 等 Teleport 子浮层的 LIFO Esc 协调。

Drawer 不提供 trigger primitive；业务侧通过普通按钮、菜单项或任意应用状态修改 `v-model:open`。

## 基本用法

使用 `v-model:open` 控制抽屉开关。footer 插槽会收到 `close()`，取消按钮建议使用 `Button theme="default"`，主操作使用 `Button theme="brand"`。

:::demo 基本用法
drawer/example-01
:::

## 展开方向

通过 `placement` 控制抽屉从 `right`、`left`、`top` 或 `bottom` 进入。左右抽屉使用宽度尺寸，上下抽屉使用高度尺寸。
Drawer 默认左右方向宽度为 400px，上下方向高度为 320px；需要自定义尺寸时直接传 `style`，例如 `style="width: 520px"` 或 `style="height: 360px"`。

:::demo 展开方向
drawer/example-02
:::

## 长内容

长内容可以直接使用 Drawer 主体滚动，也可以在内容区组合 ScrollArea，以便控制滚动高度和滚动条表现。

:::demo 长内容
drawer/example-03
:::

## 嵌套浮层

Drawer 内可以使用 Popover、DropdownMenu、Select 等 Teleport 浮层。它们会登记到同一个 Dialog modal layer，Esc 会优先关闭最新打开的子浮层，再关闭 Drawer。

:::demo 嵌套浮层
drawer/example-04
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | `v-model:open` 受控开关 |
| `title` | `string` | `''` | 默认标题内容 |
| `description` | `string` | `''` | 默认描述内容 |
| `ariaLabel` / `aria-label` | `string` | `''` | 无标题时的可访问名称；未提供标题和 `aria-label` 时会回退为 `Drawer` |
| `placement` | `'right' \| 'left' \| 'top' \| 'bottom'` | `'right'` | 展开方向 |
| `role` | `'dialog' \| 'alertdialog'` | `'dialog'` | ARIA 角色 |
| `showClose` | `boolean` | `true` | 是否显示右上角关闭图标 |
| `closeOnEsc` | `boolean` | `true` | 按 Esc 是否关闭 |
| `closeOnOverlayClick` / `close-on-overlay-click` | `boolean` | `true` | 点击 overlay 是否关闭 |
| `trapFocus` / `trap-focus` | `boolean` | `true` | 是否把焦点限制在 Drawer 内 |
| `lockScroll` / `lock-scroll` | `boolean` | `true` | 打开时是否锁定页面滚动 |
| `returnFocusOnClose` | `boolean` | `true` | 关闭后是否恢复到打开前焦点 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `zIndex` | `number` | - | 自定义层级；未提供时使用内部 modal layer 分配的 10000+ 层级 |
| `panelClass` | `string` | `''` | 面板额外 class |

`class`、`style` 和其他透传属性会应用到真实面板 DOM；尺寸覆盖优先使用 `style`。

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:open` | `boolean` | `v-model:open` 更新 |
| `open-change` | `boolean` | 开关状态变化 |

## Slots

| 插槽 | 说明 |
|------|------|
| `title` | 自定义标题 |
| `description` | 自定义描述 |
| `default` | Drawer 主体内容，插槽参数包含 `close()` |
| `footer` | 底部操作区，插槽参数包含 `close()` |
