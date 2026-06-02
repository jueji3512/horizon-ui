# Switch 开关

用于控制单个功能的开启与关闭。

<script setup>
import { ref } from 'vue'

const active = ref(true)
const inactive = ref(false)
const disabledOn = ref(true)
const disabledOff = ref(false)
const loadingOn = ref(true)
</script>

## 基本用法

`v-model` 绑定布尔值。

<DemoBox>
  <div class="flex gap-4 items-center">
    <Switch v-model="active" />
    <Switch v-model="inactive" />
  </div>
</DemoBox>

<div class="mt-2 text-sm text-[var(--text-color-secondary)]">active: {{ active }}, inactive: {{ inactive }}</div>

::: details 查看代码
```html
<Switch v-model="active" />
<Switch v-model="inactive" />
```
:::

## 尺寸 Size

`sm` / `md` (默认) / `lg` 三档。

<DemoBox>
  <div class="flex gap-4 items-center">
    <Switch v-model="active" size="sm" />
    <Switch v-model="active" size="md" />
    <Switch v-model="active" size="lg" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Switch v-model="active" size="sm" />
<Switch v-model="active" size="md" />
<Switch v-model="active" size="lg" />
```
:::

## 尺寸规格

Switch 使用组件自身的轨道、滑块、位移几何矩阵，不直接映射为 `--comp-size-sm/md/lg` 的整体高度。

| Size | 轨道 | 滑块 | 激活位移 | Loading 图标 |
|------|------|------|----------|--------------|
| `sm` | `26 × 16px` | `10 × 10px` | `10px` | `8px` |
| `md` | `32 × 20px` | `12 × 12px` | `12px` | `10px` |
| `lg` | `40 × 24px` | `14 × 14px` | `16px` | `12px` |

## 禁用态 Disabled

<DemoBox>
  <div class="flex gap-4 items-center">
    <Switch v-model="disabledOn" disabled />
    <Switch v-model="disabledOff" disabled />
  </div>
</DemoBox>

::: details 查看代码
```html
<Switch v-model="disabledOn" disabled />
<Switch v-model="disabledOff" disabled />
```
:::

## 加载态 Loading

<DemoBox>
  <div class="flex gap-4 items-center">
    <Switch v-model="loadingOn" loading />
  </div>
</DemoBox>

::: details 查看代码
```html
<Switch v-model="loadingOn" loading />
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `boolean` | `false` | v-model 绑定值 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 组件几何尺寸 |
| `disabled` | `boolean` | `false` | 禁用 |
| `loading` | `boolean` | `false` | 加载中 |
| `name` | `string` | `''` | 原生 name 属性 |
| `aria-label` | `string` | `''` | 无障碍标签 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `boolean` | v-model 更新 |
| `change` | `boolean` | 值变化时触发 |
