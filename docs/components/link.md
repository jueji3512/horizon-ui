# Link 链接

文字链接组件，用于页面内导航或外部跳转。

## 主题 Theme

`theme` 支持 5 种语义色。

:::demo 主题 Theme
link/example-01
:::

## 链接目标

`href` 设置跳转地址；`target="_blank"` 时如果未显式传入 `rel`，组件会默认使用 `noopener noreferrer`。

:::demo 链接目标
link/example-02
:::

## 下划线

`underline` 控制下划线行为：`always` 始终显示，`hover` 悬浮显示（默认），`never` 从不显示。

:::demo 下划线
link/example-03
:::

## 图标

`prefix-icon` 和 `suffix-icon` 在文字前后插入图标。

:::demo 图标
link/example-04
:::

## 尺寸

`size` 支持 `sm`（12px）、`md`（14px，默认）、`lg`（16px）。

:::demo 尺寸
link/example-05
:::

## 禁用态

`disabled` 使链接变为不可交互状态，颜色使用对应主题的 disabled token，并阻止原生跳转和 `click` 事件派发。

:::demo 禁用态
link/example-06
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 语义主题 |
| `underline` | `'always' \| 'hover' \| 'never'` | `'hover'` | 下划线行为 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `href` | `string` | — | 链接地址 |
| `target` | `string` | — | 链接打开目标 |
| `rel` | `string` | — | 链接关系；`target="_blank"` 时默认补 `noopener noreferrer` |
| `prefix-icon` | `string` | — | 前置图标名 |
| `suffix-icon` | `string` | — | 后置图标名 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击触发（disabled 时不触发） |
