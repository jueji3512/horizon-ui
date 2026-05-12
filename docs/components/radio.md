# Radio 单选框

在一组互斥选项中选择一个。

<script setup>
import { ref } from 'vue'

const typeDemo = ref('a')

const dirV = ref('a')

const disabledDemo = ref('a')
const disabledGroup = ref('a')

// button type demos
const btnDemo = ref('weekly')
const btnSizeSm = ref('daily')
const btnSizeMd = ref('daily')
const btnSizeLg = ref('daily')
const btnDisabled = ref('daily')
</script>

<DemoBox>
  <RadioGroup v-model="typeDemo" class="mt-2">
    <Radio value="a" label="选项 A" />
    <Radio value="b" label="选项 B" />
    <Radio value="c" label="选项 C" />
  </RadioGroup>
</DemoBox>

::: details 查看代码
```html
<RadioGroup v-model="typeDemo">
  <Radio value="a" label="选项 A" />
  <Radio value="b" label="选项 B" />
  <Radio value="c" label="选项 C" />
</RadioGroup>
```
:::

## 排列方向 Direction

<DemoBox>
  <RadioGroup v-model="dirV" direction="vertical">
    <Radio value="a" label="垂直 A" />
    <Radio value="b" label="垂直 B" />
    <Radio value="c" label="垂直 C" />
  </RadioGroup>
</DemoBox>

::: details 查看代码
```html
<RadioGroup v-model="dirV" direction="vertical">
  <Radio value="a" label="垂直 A" />
  <Radio value="b" label="垂直 B" />
  <Radio value="c" label="垂直 C" />
</RadioGroup>
```
:::

## 禁用态 Disabled

<DemoBox>
  <RadioGroup v-model="disabledDemo">
    <Radio value="a" label="可用" />
    <Radio value="b" label="禁用" disabled />
  </RadioGroup>
  <RadioGroup v-model="disabledGroup" disabled class="mt-3">
    <Radio value="a" label="整组禁用" />
    <Radio value="b" label="全部不可用" />
  </RadioGroup>
</DemoBox>

::: details 查看代码
```html
<!-- 单个禁用 -->
<RadioGroup v-model="disabledDemo">
  <Radio value="a" label="可用" />
  <Radio value="b" label="禁用" disabled />
</RadioGroup>

<!-- 整组禁用 -->
<RadioGroup v-model="disabledGroup" disabled>
  <Radio value="a" label="整组禁用" />
  <Radio value="b" label="全部不可用" />
</RadioGroup>
```
:::

## 按钮组 Button Type

设置 `type="button"` 切换为按钮组样式，支持 `size` 属性。

<DemoBox>
  <RadioGroup v-model="btnDemo" type="button" class="mt-2">
    <Radio value="daily" label="每日" />
    <Radio value="weekly" label="每周" />
    <Radio value="monthly" label="每月" />
  </RadioGroup>

  <div class="mt-4 flex flex-col gap-3 items-start">
    <RadioGroup v-model="btnSizeSm" type="button" size="sm">
      <Radio value="daily" label="每日" />
      <Radio value="weekly" label="每周" />
    </RadioGroup>
    <RadioGroup v-model="btnSizeMd" type="button" size="md">
      <Radio value="daily" label="每日" />
      <Radio value="weekly" label="每周" />
    </RadioGroup>
    <RadioGroup v-model="btnSizeLg" type="button" size="lg">
      <Radio value="daily" label="每日" />
      <Radio value="weekly" label="每周" />
    </RadioGroup>
  </div>

  <RadioGroup v-model="btnDisabled" type="button" class="mt-4">
    <Radio value="daily" label="每日" />
    <Radio value="weekly" label="每周" disabled />
    <Radio value="monthly" label="每月" />
  </RadioGroup>
</DemoBox>

::: details 查看代码
```html
<RadioGroup v-model="btnDemo" type="button">
  <Radio value="daily" label="每日" />
  <Radio value="weekly" label="每周" />
  <Radio value="monthly" label="每月" />
</RadioGroup>

<RadioGroup v-model="btnSizeSm" type="button" size="sm">
  <Radio value="daily" label="每日" />
  <Radio value="weekly" label="每周" />
</RadioGroup>
<RadioGroup v-model="btnSizeMd" type="button" size="md">
  <Radio value="daily" label="每日" />
  <Radio value="weekly" label="每周" />
</RadioGroup>
<RadioGroup v-model="btnSizeLg" type="button" size="lg">
  <Radio value="daily" label="每日" />
  <Radio value="weekly" label="每周" />
</RadioGroup>

<RadioGroup v-model="btnDisabled" type="button">
  <Radio value="daily" label="每日" />
  <Radio value="weekly" label="每周" disabled />
  <Radio value="monthly" label="每月" />
</RadioGroup>
```
:::

## Props

### RadioGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number` | — | 选中值 |
| `type` | `'default' \| 'button'` | `'default'` | 显示样式 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸（仅 button 类型） |
| `disabled` | `boolean` | `false` | 整组禁用 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |

### Radio

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | — | 该选项的值 |
| `label` | `string` | `''` | 标签文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `prefix-icon` | `string` | `''` | 前缀图标名（button 类型可用） |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `value` | v-model 更新 |
| `change` | `value` | 值变化时触发 |
