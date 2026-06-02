# Checkbox 多选框

在一组选项中进行多项选择，或单个选项的勾选。

<script setup>
import { ref } from 'vue'

const single = ref(false)

const checked = ref(['a', 'b'])

const dirVert = ref(['a'])
const dirHoriz = ref(['a'])

const disabledDemo = ref(['a'])
const disabledGroup = ref(['a'])

// button variant demos
const btnDemo = ref(['a', 'b'])
const btnSizeSm = ref(['a'])
const btnSizeMd = ref(['a'])
const btnSizeLg = ref(['a'])
const btnDisabled = ref(['a'])
const btnDisabledSelected = ref(['x'])

const allChecked = ref([])
const indeterminate1 = ref(false)
const checkAll = ref(false)
function onGroupChange(val) {
  if (val.length === 0) {
    indeterminate1.value = false
    checkAll.value = false
  } else if (val.length === 3) {
    indeterminate1.value = false
    checkAll.value = true
  } else {
    indeterminate1.value = true
    checkAll.value = false
  }
}

const minmax = ref(['a', 'b'])
</script>

## 单独使用

<DemoBox>
  <Checkbox v-model:checked="single" label="同意服务条款" />
</DemoBox>

<div class="mt-2 text-sm text-[var(--text-color-secondary)]">checked: {{ single }}</div>

::: details 查看代码
```html
<Checkbox v-model:checked="single" label="同意服务条款" />
```
:::

## 多选组

<DemoBox>
  <CheckboxGroup v-model="checked">
    <Checkbox value="a" label="选项 A" />
    <Checkbox value="b" label="选项 B" />
    <Checkbox value="c" label="选项 C" />
  </CheckboxGroup>
</DemoBox>

<div class="mt-2 text-sm text-[var(--text-color-secondary)]">checked: {{ checked }}</div>

::: details 查看代码
```html
<CheckboxGroup v-model="checked">
  <Checkbox value="a" label="选项 A" />
  <Checkbox value="b" label="选项 B" />
  <Checkbox value="c" label="选项 C" />
</CheckboxGroup>
```
:::

## 排列方向 Direction

<DemoBox>
  <CheckboxGroup v-model="dirVert" direction="vertical">
    <Checkbox value="a" label="垂直 A" />
    <Checkbox value="b" label="垂直 B" />
    <Checkbox value="c" label="垂直 C" />
  </CheckboxGroup>

  <CheckboxGroup v-model="dirHoriz" direction="horizontal" class="mt-3">
    <Checkbox value="a" label="水平 A" />
    <Checkbox value="b" label="水平 B" />
    <Checkbox value="c" label="水平 C" />
  </CheckboxGroup>
</DemoBox>

::: details 查看代码
```html
<CheckboxGroup v-model="dirVert" direction="vertical">
  <Checkbox value="a" label="垂直 A" />
  <Checkbox value="b" label="垂直 B" />
  <Checkbox value="c" label="垂直 C" />
</CheckboxGroup>

<CheckboxGroup v-model="dirHoriz" direction="horizontal">
  <Checkbox value="a" label="水平 A" />
  <Checkbox value="b" label="水平 B" />
  <Checkbox value="c" label="水平 C" />
</CheckboxGroup>
```
:::

## 半选态 Indeterminate

<DemoBox>
  <Checkbox v-model:checked="checkAll" :indeterminate="indeterminate1" label="全选" />

  <div class="ml-6 mt-2 flex flex-col gap-2">
    <CheckboxGroup v-model="allChecked" @change="onGroupChange">
      <Checkbox value="A" label="选项 A" />
      <Checkbox value="B" label="选项 B" />
      <Checkbox value="C" label="选项 C" />
    </CheckboxGroup>
  </div>
</DemoBox>

::: details 查看代码
```html
<Checkbox v-model:checked="checkAll" :indeterminate="indeterminate1" label="全选" />
<CheckboxGroup v-model="allChecked" @change="onGroupChange">
  <Checkbox value="A" label="选项 A" />
  <Checkbox value="B" label="选项 B" />
  <Checkbox value="C" label="选项 C" />
</CheckboxGroup>
```
:::

## min / max 限制

<DemoBox>
  <CheckboxGroup v-model="minmax" :min="1" :max="2">
    <Checkbox value="a" label="选项 A" />
    <Checkbox value="b" label="选项 B" />
    <Checkbox value="c" label="选项 C" />
  </CheckboxGroup>
</DemoBox>

<div class="mt-2 text-sm text-[var(--text-color-secondary)]">至少选 1 项，最多选 2 项</div>

::: details 查看代码
```html
<CheckboxGroup v-model="minmax" :min="1" :max="2">
  <Checkbox value="a" label="选项 A" />
  <Checkbox value="b" label="选项 B" />
  <Checkbox value="c" label="选项 C" />
</CheckboxGroup>
```
:::

## 禁用态 Disabled

<DemoBox>
  <Checkbox :checked="true" disabled label="禁用勾选" class="mr-4" />
  <Checkbox :checked="false" disabled label="禁用未勾选" />

  <CheckboxGroup v-model="disabledDemo" class="mt-3">
    <Checkbox value="a" label="可用" />
    <Checkbox value="b" label="禁用" disabled />
  </CheckboxGroup>

  <CheckboxGroup v-model="disabledGroup" disabled class="mt-3">
    <Checkbox value="a" label="整组禁用 A" />
    <Checkbox value="b" label="整组禁用 B" />
  </CheckboxGroup>
</DemoBox>

::: details 查看代码
```html
<!-- 单个禁用 -->
<Checkbox :checked="true" disabled label="禁用勾选" />
<Checkbox :checked="false" disabled label="禁用未勾选" />

<!-- 组内单个禁用 -->
<CheckboxGroup v-model="disabledDemo">
  <Checkbox value="a" label="可用" />
  <Checkbox value="b" label="禁用" disabled />
</CheckboxGroup>

<!-- 整组禁用 -->
<CheckboxGroup v-model="disabledGroup" disabled>
  <Checkbox value="a" label="整组禁用 A" />
  <Checkbox value="b" label="整组禁用 B" />
</CheckboxGroup>
```
:::

## 按钮组 Button Variant

设置 `variant="button"` 切换为按钮组样式。

<DemoBox>
  <CheckboxGroup v-model="btnDemo" variant="button" class="mt-2">
    <Checkbox value="a" label="选项 A" />
    <Checkbox value="b" label="选项 B" />
    <Checkbox value="c" label="选项 C" />
  </CheckboxGroup>

  <div class="mt-4 flex flex-col gap-3 items-start">
    <CheckboxGroup v-model="btnSizeSm" variant="button" size="sm">
      <Checkbox value="a" label="小" />
      <Checkbox value="b" label="小" />
    </CheckboxGroup>
    <CheckboxGroup v-model="btnSizeMd" variant="button" size="md">
      <Checkbox value="a" label="中" />
      <Checkbox value="b" label="中" />
    </CheckboxGroup>
    <CheckboxGroup v-model="btnSizeLg" variant="button" size="lg">
      <Checkbox value="a" label="大" />
      <Checkbox value="b" label="大" />
    </CheckboxGroup>
  </div>

  <CheckboxGroup v-model="btnDisabled" variant="button" class="mt-4">
    <Checkbox value="a" label="可用" />
    <Checkbox value="b" label="禁用" disabled />
    <Checkbox value="c" label="可用" />
  </CheckboxGroup>

  <div class="mt-4">
    <CheckboxGroup v-model="btnDisabledSelected" variant="button">
      <Checkbox value="x" disabled label="选中禁用" />
      <Checkbox value="y" disabled label="未选禁用" />
    </CheckboxGroup>
  </div>
</DemoBox>

::: details 查看代码
```html
<CheckboxGroup v-model="btnDemo" variant="button">
  <Checkbox value="a" label="选项 A" />
  <Checkbox value="b" label="选项 B" />
  <Checkbox value="c" label="选项 C" />
</CheckboxGroup>

<CheckboxGroup v-model="btnSizeSm" variant="button" size="sm">
  <Checkbox value="a" label="小" />
  <Checkbox value="b" label="小" />
</CheckboxGroup>
<CheckboxGroup v-model="btnSizeMd" variant="button" size="md">
  <Checkbox value="a" label="中" />
  <Checkbox value="b" label="中" />
</CheckboxGroup>
<CheckboxGroup v-model="btnSizeLg" variant="button" size="lg">
  <Checkbox value="a" label="大" />
  <Checkbox value="b" label="大" />
</CheckboxGroup>

<CheckboxGroup v-model="btnDisabled" variant="button">
  <Checkbox value="a" label="可用" />
  <Checkbox value="b" label="禁用" disabled />
  <Checkbox value="c" label="可用" />
</CheckboxGroup>

<CheckboxGroup v-model="btnDisabledSelected" variant="button">
  <Checkbox value="x" disabled label="选中禁用" />
  <Checkbox value="y" disabled label="未选禁用" />
</CheckboxGroup>
```
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
