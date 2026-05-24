# InputNumber 数字输入框

步进按钮 + 数值范围约束的数字输入组件。

<script setup>
import { ref } from 'vue'

const num = ref(0)
const numStep = ref(0)
const numPrecision = ref(0)
const numRange = ref(50)
const numDisabled = ref(0)
const numReadonly = ref(0)
const numStepStrictly = ref(0)
const numAlign = ref(0)
const numFormat = ref(0)

function toThousands(v) { return v.toLocaleString('en-US') }
function toYuan(v) { return '¥' + v.toLocaleString('en-US') }
</script>

## 基本用法

`v-model` 绑定 `number` 值。

<DemoBox>
  <InputNumber v-model="num" style="max-width: 320px" />
</DemoBox>

<div class="mt-2 text-sm text-neutral-muted">value: {{ num }}</div>

::: details 查看代码
```html
<InputNumber v-model="num" />
```
:::

## 尺寸 Size

`sm` / `md` (默认) / `lg` 三档。

<DemoBox>
  <div class="flex flex-col gap-3">
    <InputNumber v-model="num" size="sm" />
    <InputNumber v-model="num" size="md" />
    <InputNumber v-model="num" size="lg" />
  </div>
</DemoBox>

::: details 查看代码
```html
<InputNumber v-model="num" size="sm" />
<InputNumber v-model="num" size="md" />
<InputNumber v-model="num" size="lg" />
```
:::

## 对齐 Align

`left` / `center`（默认）/ `right` 控制输入文本对齐。

<DemoBox>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numAlign" align="left" />
    <InputNumber v-model="numAlign" align="center" />
    <InputNumber v-model="numAlign" align="right" />
  </div>
</DemoBox>

::: details 查看代码
```html
<InputNumber v-model="num" align="left" />
<InputNumber v-model="num" align="center" />
<InputNumber v-model="num" align="right" />
```
:::

## 步进 Step

`step` 控制每次增减的量。

<DemoBox>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numStep" :step="5" />
    <InputNumber v-model="numStep" :step="0.1" :precision="1" />
  </div>
</DemoBox>

::: details 查看代码
```html
<InputNumber v-model="num" :step="5" />
<InputNumber v-model="num" :step="0.1" :precision="1" />
```
:::

## 精度 Precision

`precision` 控制小数位数。

<DemoBox>
  <InputNumber v-model="numPrecision" :precision="2" :step="0.01" style="max-width: 320px" />
</DemoBox>

<div class="mt-2 text-sm text-neutral-muted">value: {{ numPrecision }}</div>

::: details 查看代码
```html
<InputNumber v-model="num" :precision="2" :step="0.01" />
```
:::

## 范围 Range

`min` 和 `max` 限定取值范围，超出自动修正。

<DemoBox>
  <InputNumber v-model="numRange" :min="0" :max="100" style="max-width: 320px" />
</DemoBox>

<div class="mt-2 text-sm text-neutral-muted">value: {{ numRange }} (min=0, max=100)</div>

::: details 查看代码
```html
<InputNumber v-model="num" :min="0" :max="100" />
```
:::

## 严格步进

`step-strictly` 强制 blur 时修正为 step 的倍数。

<DemoBox>
  <InputNumber v-model="numStepStrictly" :step="5" step-strictly style="max-width: 320px" />
</DemoBox>

<div class="mt-2 text-sm text-neutral-muted">value: {{ numStepStrictly }} (step=5, stepStrictly)</div>

::: details 查看代码
```html
<InputNumber v-model="num" :step="5" step-strictly />
```
:::

## 格式化 Format

`format` 函数控制输入框内的显示格式。聚焦时恢复原始数字供编辑。

<DemoBox>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numFormat" :format="toThousands" />
    <InputNumber v-model="numFormat" :format="toYuan" />
  </div>
</DemoBox>

<div class="mt-2 text-sm text-neutral-muted">actual value: {{ numFormat }}</div>

::: details 查看代码
```html
<script setup>
const num = ref(0)
function toThousands(v) { return v.toLocaleString('en-US') }
function toYuan(v) { return '¥' + v.toLocaleString('en-US') }
</script>

<template>
  <InputNumber v-model="num" :format="toThousands" />
  <InputNumber v-model="num" :format="toYuan" />
</template>
```
:::

## 禁用与只读

<DemoBox>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numDisabled" disabled />
    <InputNumber v-model="numReadonly" readonly />
  </div>
</DemoBox>

::: details 查看代码
```html
<InputNumber v-model="num" disabled />
<InputNumber v-model="num" readonly />
```
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
| `readonly` | `boolean` | `false` | 只读（步进按钮仍可用） |
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
