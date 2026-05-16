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

<div class="mt-2 text-sm text-neutral-muted">active: {{ active }}, inactive: {{ inactive }}</div>

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
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用 |
| `loading` | `boolean` | `false` | 加载中 |
| `name` | `string` | `''` | 原生 name 属性 |
| `aria-label` | `string` | `''` | 无障碍标签 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `boolean` | v-model 更新 |
| `change` | `boolean` | 值变化时触发 |
