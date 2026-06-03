# Radio 单选框

在一组互斥选项中选择一个。

:::demo 基本用法
radio/example-01
:::

## 尺寸规格

Radio 使用自身的默认控件几何规格；button variant 当前仍作为 RadioGroup 的分段按钮形态保留，未来可迁移到 Toggle / ToggleGroup。

| 形态 | 规格 | 说明 |
|------|------|------|
| default circle | `16 × 16px` | 使用 `round-full`，不直接映射为 `--comp-size-sm/md/lg` |
| inner dot | `8 × 8px` | 居中绝对定位，选中时 scale / opacity 过渡 |
| button sm | 高 `24px`、左右 `8px`、gap `4px` | 跟随 `--comp-size-sm` |
| button md | 高 `32px`、左右 `16px`、gap `6px` | 跟随 `--comp-size-md` |
| button lg | 高 `40px`、左右 `16px`、gap `8px` | 跟随 `--comp-size-lg` |

## 排列方向 Direction

:::demo 排列方向 Direction
radio/example-02
:::

## 禁用态 Disabled

:::demo 禁用态 Disabled
radio/example-03
:::

## 按钮组 Button Variant

设置 `variant="button"` 切换为按钮组样式，支持 `size` 属性。

:::demo 按钮组 Button Variant
radio/example-04
:::

## Props

### RadioGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number` | — | 选中值 |
| `variant` | `'default' \| 'button'` | `'default'` | 视觉形态 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（仅 button 形态） |
| `disabled` | `boolean` | `false` | 整组禁用 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |

### Radio

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | — | 该选项的值 |
| `label` | `string` | `''` | 标签文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `prefix-icon` | `string` | `''` | 前缀图标名（button 形态可用） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `value` | v-model 更新 |
| `change` | `value` | 值变化时触发 |
