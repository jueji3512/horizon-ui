# Dialog 对话框

Dialog 是模态容器，用于承载需要用户立即处理的短流程，例如确认操作、编辑少量字段或展示需要聚焦阅读的信息。
Dialog 不提供 trigger primitive；业务侧通过普通按钮、菜单项或任意应用状态修改 `v-model:open`。

## 基本用法

使用 `v-model:open` 控制对话框开关。footer 插槽会收到 `close()`，取消按钮建议使用 `Button theme="default"`，主操作使用 `Button theme="brand"`。

:::demo 基本用法
dialog/example-01
:::

## 表单弹窗

Dialog 可以承载短表单，但不负责表单校验和字段布局；这些仍交给 Form / FormItem / Input / Select。

:::demo 表单弹窗
dialog/example-02
:::

## 受控模式

Dialog 的公开状态统一为 `open` / `v-model:open` / `open-change`，适合由业务流程或路由状态驱动。

:::demo 受控模式
dialog/example-03
:::

## 长内容

长内容建议把滚动交给 Dialog 内部内容区或 ScrollArea，页面本身在 Dialog 打开时会被锁定滚动。

:::demo 长内容
dialog/example-04
:::

## 警示对话框

不可逆操作可以使用 `role="alertdialog"`，并让危险主操作使用 `Button theme="error"`。

:::demo 警示对话框
dialog/example-05
:::

## 与 Popover 的边界

Dialog 是模态容器，会使用 overlay、滚动锁和焦点陷阱。Popover 是锚点非模态浮层，适合说明、轻量筛选或局部编辑，不应该承担模态确认流程。

:::demo 嵌套浮层
dialog/example-06
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | `v-model:open` 受控开关 |
| `title` | `string` | `''` | 默认标题内容 |
| `description` | `string` | `''` | 默认描述内容 |
| `ariaLabel` / `aria-label` | `string` | `''` | 无标题时的可访问名称；未提供标题和 `aria-label` 时会回退为 `Dialog` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 面板宽度 |
| `role` | `'dialog' \| 'alertdialog'` | `'dialog'` | ARIA 角色 |
| `showClose` | `boolean` | `true` | 是否显示右上角关闭图标 |
| `closeOnEsc` | `boolean` | `true` | 按 Esc 是否关闭 |
| `closeOnOverlayClick` / `close-on-overlay-click` | `boolean` | `true` | 点击 overlay 是否关闭 |
| `trapFocus` / `trap-focus` | `boolean` | `true` | 是否把焦点限制在 Dialog 内 |
| `lockScroll` / `lock-scroll` | `boolean` | `true` | 打开时是否锁定页面滚动 |
| `returnFocusOnClose` | `boolean` | `true` | 关闭后是否恢复到打开前焦点 |
| `to` | `string \| HTMLElement` | `'body'` | Teleport 目标 |
| `zIndex` | `number` | - | 自定义层级；未提供时使用内部 modal layer 分配的 10000+ 层级 |
| `panelClass` | `string` | `''` | 面板额外 class |

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
| `default` | Dialog 主体内容，插槽参数包含 `close()` |
| `footer` | 底部操作区，插槽参数包含 `close()` |
