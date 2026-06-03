# Button 按钮

按钮用于触发用户操作，表达明确的操作意图。

## 主题 Theme

`theme` 控制按钮的语义色，默认使用 `solid` 填充形态。

:::demo 语义主题
button/theme
:::

## 形态 Variant

`solid` 用于强调操作，`outline` 用于轻量操作或组合输入中的动作按钮。

:::demo 视觉形态
button/variant
:::

## 尺寸 Size

:::demo 尺寸
button/size
:::

## 形状 Shape

`rectangle` 是默认矩形按钮，`round` 为胶囊按钮，`square` 和 `circle` 适合图标按钮。

:::demo 形状
button/shape
:::

## 图标 Icon

:::demo 图标
button/icon
:::

## 禁用 Disabled

:::demo 禁用状态
button/disabled
:::

## 加载 Loading

:::demo 加载状态
button/loading
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 按钮语义主题 |
| `variant` | `'solid' \| 'outline'` | `'solid'` | 视觉形态 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸，分别对应 24/32/40px 高度 |
| `shape` | `'rectangle' \| 'round' \| 'circle' \| 'square'` | `'rectangle'` | 按钮形状 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载中，显示旋转图标并禁止交互 |
| `icon` | `string` | - | 图标按钮或文字前图标名 |
| `prefix-icon` | `string` | - | 文字前图标名 |
| `suffix-icon` | `string` | - | 文字后图标名 |
| `name` | `string` | - | 表单字段名 |
| `value` | `string` | - | 表单提交值 |
| `autofocus` | `boolean` | `false` | 自动聚焦 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击触发，`disabled` / `loading` 时不触发 |
