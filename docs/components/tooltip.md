# Tooltip 文字提示

鼠标悬停、聚焦或点击时显示的文本提示浮层。

## 基础用法

`content` prop 传入文本，默认 `hover` 触发。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="删除操作不可撤销">
      <Button type="danger">删除</Button>
    </Tooltip>
    <Tooltip content="点击保存">
      <Button>保存</Button>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip content="删除操作不可撤销">
  <Button type="danger">删除</Button>
</Tooltip>
<Tooltip content="点击保存">
  <Button>保存</Button>
</Tooltip>
```
:::

## 触发方式

`trigger` 支持 `hover`（默认）、`click`、`focus`、`manual`。

<DemoBox>
  <div class="flex flex-wrap gap-3 items-center">
    <Tooltip content="悬停触发" trigger="hover">
      <Button type="outline">Hover</Button>
    </Tooltip>
    <Tooltip content="点击触发" trigger="click">
      <Button type="outline">Click</Button>
    </Tooltip>
    <Tooltip content="聚焦触发" trigger="focus">
      <Button type="outline">Focus</Button>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip content="悬停触发" trigger="hover">
  <Button type="outline">Hover</Button>
</Tooltip>
<Tooltip content="点击触发" trigger="click">
  <Button type="outline">Click</Button>
</Tooltip>
<Tooltip content="聚焦触发" trigger="focus">
  <Button type="outline">Focus</Button>
</Tooltip>
```
:::

## 方位

`placement` 支持 12 个方向，Floating UI 自动 flip 防溢出。

<DemoBox>
  <div class="flex flex-wrap justify-center gap-2" style="max-width:400px;margin:40px auto 20px;">
    <Tooltip content="top-start" placement="top-start">
      <Button size="sm" type="outline">TS</Button>
    </Tooltip>
    <Tooltip content="top" placement="top">
      <Button size="sm" type="outline">T</Button>
    </Tooltip>
    <Tooltip content="top-end" placement="top-end">
      <Button size="sm" type="outline">TE</Button>
    </Tooltip>
  </div>

  <div class="flex justify-between items-center" style="max-width:440px;margin:0 auto 20px;">
    <div class="flex flex-col gap-2">
      <Tooltip content="left-start" placement="left-start">
        <Button size="sm" type="outline">LS</Button>
      </Tooltip>
      <Tooltip content="left" placement="left">
        <Button size="sm" type="outline">L</Button>
      </Tooltip>
      <Tooltip content="left-end" placement="left-end">
        <Button size="sm" type="outline">LE</Button>
      </Tooltip>
    </div>
    <div class="flex flex-col gap-2">
      <Tooltip content="right-start" placement="right-start">
        <Button size="sm" type="outline">RS</Button>
      </Tooltip>
      <Tooltip content="right" placement="right">
        <Button size="sm" type="outline">R</Button>
      </Tooltip>
      <Tooltip content="right-end" placement="right-end">
        <Button size="sm" type="outline">RE</Button>
      </Tooltip>
    </div>
  </div>

  <div class="flex flex-wrap justify-center gap-2" style="max-width:400px;margin:0 auto;">
    <Tooltip content="bottom-start" placement="bottom-start">
      <Button size="sm" type="outline">BS</Button>
    </Tooltip>
    <Tooltip content="bottom" placement="bottom">
      <Button size="sm" type="outline">B</Button>
    </Tooltip>
    <Tooltip content="bottom-end" placement="bottom-end">
      <Button size="sm" type="outline">BE</Button>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip content="top-start" placement="top-start">
  <Button size="sm" type="outline">TS</Button>
</Tooltip>
<Tooltip content="top" placement="top">
  <Button size="sm" type="outline">T</Button>
</Tooltip>
<!-- ... 12 方位 -->
```
:::

## 类型

`type` 支持 6 种：`default`（默认）、`light`、`primary`、`success`、`danger`、`warning`。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="默认深色" type="default">
      <Button>Default</Button>
    </Tooltip>
    <Tooltip content="亮色" type="light">
      <Button type="outline">Light</Button>
    </Tooltip>
    <Tooltip content="主要信息" type="primary">
      <Button type="outline">Primary</Button>
    </Tooltip>
    <Tooltip content="成功信息" type="success">
      <Button type="outline">Success</Button>
    </Tooltip>
    <Tooltip content="危险警告" type="danger">
      <Button type="outline">Danger</Button>
    </Tooltip>
    <Tooltip content="警告信息" type="warning">
      <Button type="outline">Warning</Button>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip content="默认深色" type="default">
  <Button>Default</Button>
</Tooltip>
<Tooltip content="亮色" type="light">
  <Button type="outline">Light</Button>
</Tooltip>
<Tooltip content="主要信息" type="primary">
  <Button type="outline">Primary</Button>
</Tooltip>
<Tooltip content="成功信息" type="success">
  <Button type="outline">Success</Button>
</Tooltip>
<Tooltip content="危险警告" type="danger">
  <Button type="outline">Danger</Button>
</Tooltip>
<Tooltip content="警告信息" type="warning">
  <Button type="outline">Warning</Button>
</Tooltip>
```
:::

## 自定义内容

使用 `content` 插槽传入 HTML 或组件。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Tooltip>
      <Button type="outline">富文本</Button>
      <template #content>
        <div>标题：操作说明</div>
        <div class="text-neutral-muted">第二步：确认提交</div>
      </template>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip>
  <Button type="outline">富文本</Button>
  <template #content>
    <div>标题：操作说明</div>
    <div class="text-neutral-muted">第二步：确认提交</div>
  </template>
</Tooltip>
```
:::

## 延迟

`showDelay` 和 `hideDelay` 控制显示/隐藏延迟（毫秒）。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="延迟 500ms 显示" :show-delay="500">
      <Button type="outline">延迟显示</Button>
    </Tooltip>
    <Tooltip content="延迟 300ms 隐藏" :hide-delay="300">
      <Button type="outline">延迟隐藏</Button>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip content="延迟 500ms 显示" :show-delay="500">
  <Button type="outline">延迟显示</Button>
</Tooltip>
<Tooltip content="延迟 300ms 隐藏" :hide-delay="300">
  <Button type="outline">延迟隐藏</Button>
</Tooltip>
```
:::

## 受控模式

`v-model:visible` + `trigger="manual"` 完全控制显示状态。

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<DemoBox>
  <div class="flex flex-wrap gap-3 items-center">
    <Tooltip v-model:visible="show" content="手动控制" trigger="manual">
      <Button @click="show = !show">点击切换</Button>
    </Tooltip>
    <span class="text-sm text-neutral-muted">状态：{{ show ? '显示' : '隐藏' }}</span>
  </div>
</DemoBox>

::: details 查看代码
```html
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<Tooltip v-model:visible="show" content="手动控制" trigger="manual">
  <Button @click="show = !show">点击切换</Button>
</Tooltip>
<span>状态：{{ show ? '显示' : '隐藏' }}</span>
```
:::

## 禁用态

`disabled` 阻止 tooltip 显示。

<DemoBox>
  <div class="flex flex-wrap gap-3">
    <Tooltip content="不会出现的提示" disabled>
      <Button type="outline">Disabled Tooltip</Button>
    </Tooltip>
  </div>
</DemoBox>

::: details 查看代码
```html
<Tooltip content="不会出现的提示" disabled>
  <Button type="outline">Disabled Tooltip</Button>
</Tooltip>
```
:::

## Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `string` | `''` | 提示文本 |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'` | 12 方位，Floating UI 自动 flip |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | 触发方式 |
| `type` | `'default' \| 'light' \| 'primary' \| 'success' \| 'danger' \| 'warning'` | `'default'` | 主题类型 |
| `show-arrow` | `boolean` | `true` | 箭头 |
| `offset` | `number` | `10` | 距触发元素的偏移 (px) |
| `show-delay` | `number` | `0` | 显示延迟 (ms) |
| `hide-delay` | `number` | `0` | 隐藏延迟 (ms) |
| `disabled` | `boolean` | `false` | 禁用 |
| `visible` | `boolean` | — | v-model:visible 受控 |
| `z-index` | `number` | — | 自定义层级 |

## Slots

| 插槽 | 说明 |
|------|------|
| `default` | 触发元素 |
| `content` | 自定义提示内容（替代 `content` prop） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:visible` | `boolean` | v-model:visible 更新 |
