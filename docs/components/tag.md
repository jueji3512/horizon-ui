# Tag 标签

用于标记、分类和筛选。

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)
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

`type` 设置语义色，`theme` 设置视觉主题。默认 `light` 主题。

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag>默认</Tag>
    <Tag type="primary">主要</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="danger">危险</Tag>
    <Tag type="warning">警告</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag>默认</Tag>
<Tag type="primary">主要</Tag>
<Tag type="success">成功</Tag>
<Tag type="warning">警告</Tag>
<Tag type="danger">危险</Tag>
```
:::

## 主题 Theme

`light` (默认) / `dark` / `outline` 三主题。

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag theme="light">默认</Tag>
      <Tag theme="light" type="primary">主要</Tag>
      <Tag theme="light" type="success">成功</Tag>
      <Tag theme="light" type="warning">警告</Tag>
      <Tag theme="light" type="danger">危险</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag theme="dark">默认</Tag>
      <Tag theme="dark" type="primary">主要</Tag>
      <Tag theme="dark" type="success">成功</Tag>
      <Tag theme="dark" type="warning">警告</Tag>
      <Tag theme="dark" type="danger">危险</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag theme="outline">默认</Tag>
      <Tag theme="outline" type="primary">主要</Tag>
      <Tag theme="outline" type="success">成功</Tag>
      <Tag theme="outline" type="warning">警告</Tag>
      <Tag theme="outline" type="danger">危险</Tag>
    </div>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag theme="light">light</Tag>
<Tag theme="light" type="primary">light</Tag>
...
<Tag theme="dark">dark</Tag>
<Tag theme="dark" type="primary">dark</Tag>
...
<Tag theme="outline">outline</Tag>
<Tag theme="outline" type="primary">outline</Tag>
```
:::

## 尺寸 Size

`sm` / `md` (默认) / `lg` 三档。

<DemoBox>
  <div class="flex flex-wrap gap-2 items-center">
    <Tag size="sm" type="primary">小标签</Tag>
    <Tag size="md" type="primary">中标签</Tag>
    <Tag size="lg" type="primary">大标签</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag size="sm" type="primary">小标签</Tag>
<Tag size="md" type="primary">中标签</Tag>
<Tag size="lg" type="primary">大标签</Tag>
```
:::

## 可关闭

设置 `closable` 显示关闭按钮。

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c1" closable @close="c1 = false" theme="light">默认</Tag>
      <Tag v-if="c2" closable @close="c2 = false" theme="light" type="primary">主要</Tag>
      <Tag v-if="c13" closable @close="c13 = false" theme="light" type="success">成功</Tag>
      <Tag v-if="c10" closable @close="c10 = false" theme="light" type="warning">警告</Tag>
      <Tag v-if="c3" closable @close="c3 = false" theme="light" type="danger">危险</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c14" closable @close="c14 = false" theme="dark">默认</Tag>
      <Tag v-if="c4" closable @close="c4 = false" theme="dark" type="primary">主要</Tag>
      <Tag v-if="c5" closable @close="c5 = false" theme="dark" type="success">成功</Tag>
      <Tag v-if="c11" closable @close="c11 = false" theme="dark" type="warning">警告</Tag>
      <Tag v-if="c6" closable @close="c6 = false" theme="dark" type="danger">危险</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag v-if="c15" closable @close="c15 = false" theme="outline">默认</Tag>
      <Tag v-if="c7" closable @close="c7 = false" theme="outline" type="primary">主要</Tag>
      <Tag v-if="c8" closable @close="c8 = false" theme="outline" type="success">成功</Tag>
      <Tag v-if="c12" closable @close="c12 = false" theme="outline" type="warning">警告</Tag>
      <Tag v-if="c9" closable @close="c9 = false" theme="outline" type="danger">危险</Tag>
    </div>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag closable @close="visible = false" theme="light">默认</Tag>
<Tag closable @close="visible = false" theme="light" type="primary">主要</Tag>
<Tag closable @close="visible = false" theme="light" type="success">成功</Tag>
<Tag closable @close="visible = false" theme="light" type="warning">警告</Tag>
<Tag closable @close="visible = false" theme="light" type="danger">危险</Tag>
<Tag closable @close="visible = false" theme="dark">默认</Tag>
<Tag closable @close="visible = false" theme="dark" type="primary">主要</Tag>
<Tag closable @close="visible = false" theme="dark" type="success">成功</Tag>
<Tag closable @close="visible = false" theme="dark" type="warning">警告</Tag>
<Tag closable @close="visible = false" theme="dark" type="danger">危险</Tag>
<Tag closable @close="visible = false" theme="outline">默认</Tag>
<Tag closable @close="visible = false" theme="outline" type="primary">主要</Tag>
<Tag closable @close="visible = false" theme="outline" type="success">成功</Tag>
<Tag closable @close="visible = false" theme="outline" type="warning">警告</Tag>
<Tag closable @close="visible = false" theme="outline" type="danger">危险</Tag>
```
:::

## 可选择

设置 `checkable` 开启选择模式，`v-model:checked` 绑定选中态。未选中时由 `theme` / `type` 控制外观，选中后由 `checked-props` 覆盖。

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag checkable v-model:checked="checked1" theme="outline" :checked-props="{ theme: 'dark', type: 'primary' }">选项一</Tag>
    <Tag checkable v-model:checked="checked2" theme="outline" type="primary" :checked-props="{ theme: 'dark', type: 'primary' }">选项二</Tag>
    <Tag checkable v-model:checked="checked3" theme="outline" type="success" :checked-props="{ theme: 'dark', type: 'success' }">选项三</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag checkable v-model:checked="checked1" theme="outline"
  :checked-props="{ theme: 'dark', type: 'primary' }">选项一</Tag>
<Tag checkable v-model:checked="checked2" theme="outline" type="primary"
  :checked-props="{ theme: 'dark', type: 'primary' }">选项二</Tag>
<Tag checkable v-model:checked="checked3" theme="outline" type="success"
  :checked-props="{ theme: 'dark', type: 'success' }">选项三</Tag>
```
:::

## 圆角

设置 `round` 为圆角胶囊型。

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag round type="primary">圆角标签</Tag>
    <Tag round checkable v-model:checked="checked1" type="success">圆角可选</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag round type="primary">圆角标签</Tag>
<Tag round checkable v-model:checked="checked1" type="success">圆角可选</Tag>
```
:::

## 图标

`prefix-icon` 设置前置图标。

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag prefix-icon="search" type="primary">搜索</Tag>
    <Tag prefix-icon="check" theme="outline" type="success">已完成</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag prefix-icon="search" type="primary">搜索</Tag>
<Tag prefix-icon="check" theme="outline" type="success">已完成</Tag>
```
:::

## 自定义颜色

`color` 设置自定义色值，替换 `type` 语义色。

<DemoBox>
  <div class="flex flex-col gap-3">
    <div class="flex flex-wrap gap-2">
      <Tag color="#6366f1" theme="light">light</Tag>
      <Tag color="#6366f1" theme="dark">dark</Tag>
      <Tag color="#6366f1" theme="outline">outline</Tag>
    </div>
    <div class="flex flex-wrap gap-2">
      <Tag color="#ec4899" theme="light">light</Tag>
      <Tag color="#ec4899" theme="dark">dark</Tag>
      <Tag color="#ec4899" theme="outline">outline</Tag>
    </div>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag color="#6366f1" theme="light">light</Tag>
<Tag color="#6366f1" theme="dark">dark</Tag>
<Tag color="#6366f1" theme="outline">outline</Tag>
```
:::

## 禁用

<DemoBox>
  <div class="flex flex-wrap gap-2">
    <Tag disabled type="primary">禁用标签</Tag>
    <Tag disabled closable type="success">禁用可关闭</Tag>
    <Tag disabled checkable v-model:checked="checked1">禁用可选</Tag>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tag disabled type="primary">禁用标签</Tag>
<Tag disabled closable type="success">禁用可关闭</Tag>
<Tag disabled checkable v-model:checked="checked1">禁用可选</Tag>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'default' \| 'primary' \| 'danger' \| 'success' \| 'warning'` | `'default'` | 语义色 |
| `theme` | `'light' \| 'dark' \| 'outline'` | `'light'` | 视觉主题 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `closable` | `boolean` | `false` | 可关闭 |
| `checkable` | `boolean` | `false` | 可选择模式 |
| `checked` | `boolean` | — | 选中态（checkable 模式） |
| `disabled` | `boolean` | `false` | 禁用 |
| `round` | `boolean` | `false` | 圆角胶囊型 |
| `prefix-icon` | `string` | `''` | 前置图标名 |
| `max-width` | `number \| string` | — | 最大宽度，超出省略 |
| `color` | `string` | `''` | 自定义颜色，替换语义色 |
| `checked-props` | `{ type?, theme?, color? }` | `{}` | 选中态的主题/类型/颜色（checkable 模式） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `click` | `MouseEvent` | 点击 Tag 时触发 |
| `close` | `MouseEvent` | 关闭时触发（closable） |
| `update:checked` | `boolean` | checkable 选中态切换 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | Tag 内容文本 |
