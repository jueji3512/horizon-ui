# Checkbox 多选框

在一组选项中进行多项选择，或单个选项的勾选。

## 单独使用

:::demo 单独使用
checkbox/example-01
:::

## 尺寸规格

Checkbox 使用自身的默认控件几何规格；button variant 当前仍作为 CheckboxGroup 的分段按钮形态保留，未来可迁移到 Toggle / ToggleGroup。

| 形态 | 规格 | 说明 |
|------|------|------|
| default box | `16 × 16px` | 使用 `round-default`，不直接映射为 `--comp-size-sm/md/lg` |
| check / indeterminate icon | `12 × 12px` | 基于 `12 × 12` viewBox 渲染勾选或半选短横 |
| button sm | 高 `24px`、左右 `8px`、gap `4px` | 跟随 `--comp-size-sm` |
| button md | 高 `32px`、左右 `16px`、gap `6px` | 跟随 `--comp-size-md` |
| button lg | 高 `40px`、左右 `16px`、gap `8px` | 跟随 `--comp-size-lg` |

## 多选组

:::demo 多选组
checkbox/example-02
:::

## 排列方向 Direction

:::demo 排列方向 Direction
checkbox/example-03
:::

## 半选态 Indeterminate

:::demo 半选态 Indeterminate
checkbox/example-04
:::

## min / max 限制

:::demo min / max 限制
checkbox/example-05
:::

## 禁用态 Disabled

:::demo 禁用态 Disabled
checkbox/example-06
:::

## 按钮组 Button Variant

设置 `variant="button"` 切换为按钮组样式。

:::demo 按钮组 Button Variant
checkbox/example-07
:::

## Props

### CheckboxGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `(string \| number)[]` | `[]` | 选中值数组 |
| `variant` | `'default' \| 'button'` | `'default'` | 视觉形态 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（仅 button 形态） |
| `disabled` | `boolean` | `false` | 整组禁用 |
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | 排列方向（default 类型） |
| `min` | `number` | — | 最少选中项数 |
| `max` | `number` | — | 最多选中项数 |

### Checkbox

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | — | 在 Group 中的值 |
| `label` | `string` | `''` | 标签文本 |
| `checked` | `boolean` | `false` | 独立使用时的 v-model |
| `disabled` | `boolean` | `false` | 禁用 |
| `indeterminate` | `boolean` | `false` | 半选态 |
| `prefix-icon` | `string` | `''` | 前缀图标名（button 形态可用） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `(string \| number)[]` | CheckboxGroup v-model 更新 |
| `update:checked` | `boolean` | Checkbox v-model 更新 |
| `change` | `(string \| number)[]` / `boolean` | 值变化时触发 |
