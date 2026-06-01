# Tag 标签

用于标记、分类和筛选。`theme` 控制语义色，`variant` 控制视觉样式。

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
const roundChecked = ref(false)
const disabledChecked = ref(false)
const c1 = ref(true)
const c2 = ref(true)
const c3 = ref(true)
const c4 = ref(true)
const c5 = ref(true)
const c6 = ref(true)
const c7 = ref(true)
const c8 = ref(true)
const c9 = ref(true)
const c10 = ref(true)
const c11 = ref(true)
const c12 = ref(true)
const c13 = ref(true)
const c14 = ref(true)
const c15 = ref(true)
</script>

## 基本用法

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag>默认</Tag>
    <Tag theme="brand">品牌</Tag>
    <Tag theme="success">成功</Tag>
    <Tag theme="warning">警告</Tag>
    <Tag theme="error">错误</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag>默认</Tag>
<Tag theme="brand">品牌</Tag>
<Tag theme="success">成功</Tag>
<Tag theme="warning">警告</Tag>
<Tag theme="error">错误</Tag>
```
:::

## 视觉样式

`variant` 支持 `light`、`dark`、`outline`。

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag variant="light">默认</Tag>
      <Tag variant="light" theme="brand">品牌</Tag>
      <Tag variant="light" theme="success">成功</Tag>
      <Tag variant="light" theme="warning">警告</Tag>
      <Tag variant="light" theme="error">错误</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag variant="dark">默认</Tag>
      <Tag variant="dark" theme="brand">品牌</Tag>
      <Tag variant="dark" theme="success">成功</Tag>
      <Tag variant="dark" theme="warning">警告</Tag>
      <Tag variant="dark" theme="error">错误</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag variant="outline">默认</Tag>
      <Tag variant="outline" theme="brand">品牌</Tag>
      <Tag variant="outline" theme="success">成功</Tag>
      <Tag variant="outline" theme="warning">警告</Tag>
      <Tag variant="outline" theme="error">错误</Tag>
    </div>
  </div>
</DemoBox>

## 可关闭

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c1" closable @close="c1 = false">默认</Tag>
      <Tag v-if="c2" closable @close="c2 = false" theme="brand">品牌</Tag>
      <Tag v-if="c13" closable @close="c13 = false" theme="success">成功</Tag>
      <Tag v-if="c10" closable @close="c10 = false" theme="warning">警告</Tag>
      <Tag v-if="c3" closable @close="c3 = false" theme="error">错误</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c14" closable @close="c14 = false" variant="dark">默认</Tag>
      <Tag v-if="c4" closable @close="c4 = false" variant="dark" theme="brand">品牌</Tag>
      <Tag v-if="c5" closable @close="c5 = false" variant="dark" theme="success">成功</Tag>
      <Tag v-if="c11" closable @close="c11 = false" variant="dark" theme="warning">警告</Tag>
      <Tag v-if="c6" closable @close="c6 = false" variant="dark" theme="error">错误</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c15" closable @close="c15 = false" variant="outline">默认</Tag>
      <Tag v-if="c7" closable @close="c7 = false" variant="outline" theme="brand">品牌</Tag>
      <Tag v-if="c8" closable @close="c8 = false" variant="outline" theme="success">成功</Tag>
      <Tag v-if="c12" closable @close="c12 = false" variant="outline" theme="warning">警告</Tag>
      <Tag v-if="c9" closable @close="c9 = false" variant="outline" theme="error">错误</Tag>
    </div>
  </div>
</DemoBox>

## 可选择

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag checkable v-model:checked="checked1" variant="outline" :checked-props="{ variant: 'dark', theme: 'brand' }">选项一</Tag>
    <Tag checkable v-model:checked="checked2" variant="outline" theme="brand" :checked-props="{ variant: 'dark', theme: 'brand' }">选项二</Tag>
    <Tag checkable v-model:checked="checked3" variant="outline" theme="success" :checked-props="{ variant: 'dark', theme: 'success' }">选项三</Tag>
  </div>
</DemoBox>

## 圆角

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag round theme="brand">圆角标签</Tag>
    <Tag round checkable v-model:checked="roundChecked" variant="outline" theme="success" :checked-props="{ variant: 'dark', theme: 'success' }">圆角可选</Tag>
  </div>
</DemoBox>

## 图标

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag prefix-icon="search" theme="brand">搜索</Tag>
    <Tag prefix-icon="check" variant="outline" theme="success">已完成</Tag>
  </div>
</DemoBox>

## 自定义颜色

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag color="#6366f1" variant="light">light</Tag>
      <Tag color="#6366f1" variant="dark">dark</Tag>
      <Tag color="#6366f1" variant="outline">outline</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag color="#ec4899" variant="light">light</Tag>
      <Tag color="#ec4899" variant="dark">dark</Tag>
      <Tag color="#ec4899" variant="outline">outline</Tag>
    </div>
  </div>
</DemoBox>

## 禁用

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag disabled theme="brand">禁用标签</Tag>
    <Tag disabled closable theme="success">禁用可关闭</Tag>
    <Tag disabled checkable v-model:checked="disabledChecked">禁用可选</Tag>
  </div>
</DemoBox>

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error'` | `'default'` | 语义主题 |
| `variant` | `'light' \| 'dark' \| 'outline'` | `'light'` | 视觉样式 |
| `closable` | `boolean` | `false` | 是否可关闭 |
| `checkable` | `boolean` | `false` | 是否可选择 |
| `checked` | `boolean` | - | 选中态 |
| `disabled` | `boolean` | `false` | 禁用 |
| `round` | `boolean` | `false` | 胶囊圆角 |
| `prefix-icon` | `string` | `''` | 前置图标名 |
| `max-width` | `number \| string` | - | 最大宽度，超出省略 |
| `color` | `string` | `''` | 自定义颜色，替换语义主题 |
| `checked-props` | `{ theme?, variant?, color? }` | `{}` | 选中态覆盖 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击 Tag 时触发 |
| `close` | `MouseEvent` | 关闭时触发 |
| `update:checked` | `boolean` | checkable 选中态切换 |
