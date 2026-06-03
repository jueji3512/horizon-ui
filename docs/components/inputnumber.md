# InputNumber 数字输入框

步进按钮 + 数值范围约束的数字输入组件。

## 基本用法

`v-model` 绑定 `number` 值。

:::demo 基本用法
inputnumber/example-01
:::

## 尺寸 Size

`sm` / `md` (默认) / `lg` 三档。

:::demo 尺寸 Size
inputnumber/example-02
:::

## 尺寸规格

InputNumber 使用 FieldRoot + Button 组合几何。整体高度跟随 `--comp-size-sm/md/lg`，中间输入段宽度作为 InputNumber 自身规格维护。

| Size | 整体高度 | 中间输入段 | 输入 padding | 步进按钮 |
|------|----------|------------|--------------|----------|
| `sm` | `24px` | `72px` | 左右 `8px` | `24 × 24px` |
| `md` | `32px` | `88px` | 左右 `12px` | `32 × 32px` |
| `lg` | `40px` | `104px` | 左右 `12px` | `40 × 40px` |

## 对齐 Align

`left` / `center`（默认）/ `right` 控制输入文本对齐。

:::demo 对齐 Align
inputnumber/example-03
:::

## 步进 Step

`step` 控制每次增减的量。

:::demo 步进 Step
inputnumber/example-04
:::

## 精度 Precision

`precision` 控制小数位数。

:::demo 精度 Precision
inputnumber/example-05
:::

## 范围 Range

`min` 和 `max` 限定取值范围，超出自动修正。

:::demo 范围 Range
inputnumber/example-06
:::

## 严格步进

`step-strictly` 强制 blur 时修正为 step 的倍数。

:::demo 严格步进
inputnumber/example-07
:::

## 格式化 Format

`format` 函数控制输入框内的显示格式。聚焦时恢复原始数字供编辑。

:::demo 格式化 Format
inputnumber/example-08
:::

## 禁用与只读

:::demo 禁用与只读
inputnumber/example-09
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `number` | `0` | v-model |
| `min` | `number` | `-Infinity` | 最小值 |
| `max` | `number` | `Infinity` | 最大值 |
| `step` | `number` | `1` | 步进值 |
| `step-strictly` | `boolean` | `false` | 严格步进，blur 时修正为 step 倍数 |
| `precision` | `number` | `0` | 小数位数 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读，不允许输入或通过步进改值 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `format` | `(value: number) => string` | — | 显示格式化函数，聚焦时恢复原始数字 |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` | 输入文本对齐 |
| `placeholder` | `string` | `''` | 占位文本 |
| `name` | `string` | `''` | 原生 name |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `number` | v-model 更新 |
| `change` | `number` | 值改变且 blur 时 |
| `focus` | `FocusEvent` | 聚焦 |
| `blur` | `FocusEvent` | 失焦 |
