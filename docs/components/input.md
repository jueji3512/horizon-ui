# Input 输入框

用于文本输入，支持密码、清空、图标等功能。

<script setup>
import { ref } from 'vue'

const text = ref('')
const password = ref('123456')
const disabled = ref('禁用状态')
const readonly = ref('只读状态')
const clearable = ref('可清空文本')
const statusError = ref('错误内容')
const statusWarning = ref('警告内容')
const statusSuccess = ref('成功内容')
const wordLimited = ref('')
</script>

## 基本用法

`v-model` 绑定值。

<DemoBox>
  <Input v-model="text" placeholder="请输入内容" />
</DemoBox>

<div class="mt-2 text-sm text-[var(--text-color-secondary)]">text: {{ text }}</div>

::: details 查看代码
```html
<Input v-model="text" placeholder="请输入内容" />
```
:::

## 密码类型

设置 `type="password"` 并启用 `show-password` 显示密码切换按钮。

<DemoBox>
  <Input v-model="password" type="password" show-password placeholder="请输入密码" />
</DemoBox>

::: details 查看代码
```html
<Input v-model="password" type="password" show-password placeholder="请输入密码" />
```
:::

## 尺寸 Size

`sm` / `md` (默认) / `lg` 三档。

<DemoBox>
  <div class="flex flex-col gap-3">
    <Input v-model="text" size="sm" placeholder="小尺寸" />
    <Input v-model="text" size="md" placeholder="中尺寸（默认）" />
    <Input v-model="text" size="lg" placeholder="大尺寸" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Input v-model="text" size="sm" placeholder="小尺寸" />
<Input v-model="text" size="md" placeholder="中尺寸（默认）" />
<Input v-model="text" size="lg" placeholder="大尺寸" />
```
:::

## 可清空

设置 `clearable`，输入内容后显示清空按钮。

<DemoBox>
  <Input v-model="clearable" clearable placeholder="输入试试" />
</DemoBox>

::: details 查看代码
```html
<Input v-model="clearable" clearable placeholder="输入试试" />
```
:::

## 禁用与只读

<DemoBox>
  <div class="flex flex-col gap-3">
    <Input v-model="disabled" disabled />
    <Input v-model="readonly" readonly />
  </div>
</DemoBox>

::: details 查看代码
```html
<Input v-model="disabled" disabled />
<Input v-model="readonly" readonly />
```
:::

## 图标

`prefix-icon` 和 `suffix-icon` 设置前后图标。

<DemoBox>
  <div class="flex flex-col gap-3">
    <Input v-model="text" prefix-icon="search" placeholder="搜索" />
    <Input v-model="text" suffix-icon="search" placeholder="搜索" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Input v-model="text" prefix-icon="search" placeholder="搜索" />
<Input v-model="text" suffix-icon="search" placeholder="搜索" />
```
:::

## 状态 Status

`status` 设置校验状态，影响边框颜色。

<DemoBox>
  <div class="flex flex-col gap-3">
    <Input v-model="statusError" status="error" placeholder="错误状态" />
    <Input v-model="statusWarning" status="warning" placeholder="警告状态" />
    <Input v-model="statusSuccess" status="success" placeholder="成功状态" />
  </div>
</DemoBox>

::: details 查看代码
```html
<Input v-model="statusError" status="error" placeholder="错误状态" />
<Input v-model="statusWarning" status="warning" placeholder="警告状态" />
<Input v-model="statusSuccess" status="success" placeholder="成功状态" />
```
:::

## 字数限制

`maxlength` 限制最大字符数，`show-word-limit` 显示字数统计。

<DemoBox>
  <Input v-model="wordLimited" :maxlength="50" show-word-limit placeholder="最多输入 50 个字符" />
</DemoBox>

::: details 查看代码
```html
<Input v-model="wordLimited" :maxlength="50" show-word-limit placeholder="最多输入 50 个字符" />
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number` | `''` | v-model 绑定值 |
| `type` | `'text' \| 'password' \| 'number'` | `'text'` | 输入框类型 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `placeholder` | `string` | `''` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读 |
| `status` | `'error' \| 'warning' \| 'success'` | — | 校验状态 |
| `clearable` | `boolean` | `false` | 可清空 |
| `show-password` | `boolean` | `false` | 密码显隐切换 |
| `prefix-icon` | `string` | `''` | 前缀图标名 |
| `suffix-icon` | `string` | `''` | 后缀图标名 |
| `maxlength` | `number` | — | 最大字符数 |
| `show-word-limit` | `boolean` | `false` | 显示字数统计 |
| `name` | `string` | `''` | 原生 name |
| `autofocus` | `boolean` | `false` | 原生 autofocus |
| `autocomplete` | `string` | `''` | 原生 autocomplete |
| `aria-label` | `string` | `''` | 无障碍标签 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `string \| number` | v-model 更新 |
| `input` | `(value, event)` | 输入时触发 |
| `change` | `(value, event)` | 值改变且失焦时触发 |
| `focus` | `FocusEvent` | 聚焦时触发 |
| `blur` | `FocusEvent` | 失焦时触发 |
| `clear` | — | 点击清空按钮时触发 |
| `enter` | `KeyboardEvent` | 按下 Enter 时触发 |

## Slots

| 插槽 | 说明 |
|------|------|
| `prefix` | 输入框内部前缀内容 |
| `suffix` | 输入框内部后缀内容 |
