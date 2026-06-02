# Field 输入域

> **底层组件** — 为 Input、InputNumber、Select、DatePicker、TagInput 等输入域组件提供外壳、尺寸、状态、布局和基础动作位。

Field 不替代 Input，也不处理业务值模型、弹出层、选项渲染或日期面板。它更像 Popper：提供一组公开 primitive，让组件库内部和使用者都能组合出稳定的输入域结构。

<script setup>
import { ref } from 'vue'

const basic = ref('')

const search = ref('Horizon')

const tagInput = ref('')
const tags = ref(['Vue', 'Token', 'Form'])

const rangeStart = ref('2026-06-02')
const rangeEnd = ref('2026-06-30')

const grouped = ref('')

function addTag() {
  const value = tagInput.value.trim()
  if (!value) return
  tags.value.push(value)
  tagInput.value = ''
}

function removeTag(index) {
  tags.value.splice(index, 1)
}
</script>

## 基本结构

`FieldRoot` 承载输入域 surface，`FieldNativeInput` 只包装原生输入框的基础样式和事件。

<DemoBox>
  <FieldRoot>
    <FieldNativeInput v-model="basic" placeholder="请输入内容" />
  </FieldRoot>
</DemoBox>

::: details 查看代码
```vue
<FieldRoot>
  <FieldNativeInput v-model="value" placeholder="请输入内容" />
</FieldRoot>
```
:::

## 尺寸与状态

Field 使用组件尺寸 token 和功能色 ring，状态由上层组件传入。

<DemoBox>
  <div class="flex flex-col gap-3">
    <FieldRoot size="sm">
      <FieldNativeInput model-value="小尺寸" readonly />
    </FieldRoot>
    <FieldRoot size="md" status="error" focused>
      <FieldNativeInput model-value="错误状态" readonly />
    </FieldRoot>
    <FieldRoot size="lg" status="warning">
      <FieldNativeInput model-value="警告状态" readonly />
    </FieldRoot>
    <FieldRoot disabled>
      <FieldNativeInput model-value="禁用状态" />
    </FieldRoot>
  </div>
</DemoBox>

::: details 查看代码
```vue
<FieldRoot size="sm">
  <FieldNativeInput model-value="小尺寸" readonly />
</FieldRoot>
<FieldRoot status="error" focused>
  <FieldNativeInput model-value="错误状态" readonly />
</FieldRoot>
<FieldRoot disabled>
  <FieldNativeInput model-value="禁用状态" />
</FieldRoot>
```
:::

## 前后缀与动作位

`FieldPrefix` / `FieldSuffix` 负责稳定的辅助区布局，`FieldAction` 用于清空、展开、密码显隐等可点击动作。

<DemoBox>
  <FieldRoot>
    <FieldPrefix>
      <Icon name="search" />
    </FieldPrefix>
    <FieldNativeInput v-model="search" placeholder="搜索" />
    <FieldSuffix class="gap-1">
      <FieldAction :class="search ? '' : 'invisible'" aria-label="清空" @click="search = ''">
        <Icon name="close" />
      </FieldAction>
      <Icon name="search" />
    </FieldSuffix>
  </FieldRoot>
</DemoBox>

::: details 查看代码
```vue
<FieldRoot>
  <FieldPrefix>
    <Icon name="search" />
  </FieldPrefix>
  <FieldNativeInput v-model="value" placeholder="搜索" />
  <FieldSuffix class="gap-1">
    <FieldAction aria-label="清空" @click="value = ''">
      <Icon name="close" />
    </FieldAction>
    <Icon name="search" />
  </FieldSuffix>
</FieldRoot>
```
:::

## 固有尺寸

FieldRoot 的高度跟随 `--comp-size-sm/md/lg`；FieldAction 使用输入域内部动作位规格，不直接映射为输入域整体高度。

| 部位 | 规格 | 说明 |
|------|------|------|
| FieldRoot sm / md / lg | `24px` / `32px` / `40px` | 通过组件尺寸 token 控制整体输入域高度 |
| FieldAction | `20 × 20px` | 用于清空、展开、密码显隐等输入域内部动作 |

## 多值输入

多选 Select、TreeSelect 和 TagInput 可以用 `multiline` + `FieldContent` 承载 Tag wrap，搜索输入框仍由上层控制。

<DemoBox>
  <FieldRoot multiline>
    <FieldContent multiline class="px-2">
      <Tag v-for="(tag, index) in tags" :key="tag" closable @close="removeTag(index)">
        {{ tag }}
      </Tag>
      <FieldNativeInput
        v-model="tagInput"
        class="h-6 min-w-24 flex-1 px-0"
        placeholder="添加标签"
        @enter="addTag"
      />
    </FieldContent>
    <FieldSuffix>
      <FieldAction
        :class="tags.length ? '' : 'invisible'"
        :disabled="tags.length === 0"
        aria-label="清空标签"
        @click="tags = []"
      >
        <Icon name="close" />
      </FieldAction>
    </FieldSuffix>
  </FieldRoot>
</DemoBox>

::: details 查看代码
```vue
<FieldRoot multiline>
  <FieldContent multiline class="px-2">
    <Tag v-for="tag in tags" :key="tag" closable>{{ tag }}</Tag>
    <FieldNativeInput v-model="keyword" class="h-6 min-w-24 flex-1 px-0" />
  </FieldContent>
  <FieldSuffix>
    <FieldAction :class="tags.length ? '' : 'invisible'" :disabled="tags.length === 0" aria-label="清空标签">
      <Icon name="close" />
    </FieldAction>
  </FieldSuffix>
</FieldRoot>
```
:::

## 范围分段

`FieldSegment` 用于 DateRangePicker、TimeRangePicker、范围数值输入等场景。外层 FieldRoot 仍负责整体边框和 ring；分段在内部输入聚焦时会显示 active 视觉，上层也可以在弹层打开等受控场景传入 `active`。

<DemoBox>
  <FieldRoot>
    <FieldSegment>
      <FieldNativeInput v-model="rangeStart" class="px-0 text-center" />
    </FieldSegment>
    <span class="shrink-0 text-[var(--text-color-secondary)]">至</span>
    <FieldSegment>
      <FieldNativeInput v-model="rangeEnd" class="px-0 text-center" />
    </FieldSegment>
  </FieldRoot>
</DemoBox>

::: details 查看代码
```vue
<FieldRoot>
  <FieldSegment>
    <FieldNativeInput v-model="start" class="px-0 text-center" />
  </FieldSegment>
  <span>至</span>
  <FieldSegment>
    <FieldNativeInput v-model="end" class="px-0 text-center" />
  </FieldSegment>
</FieldRoot>
```
:::

## 组合输入

`FieldGroup` 只负责组合容器，具体按钮、addon、分割线和业务行为由上层组件决定。

<DemoBox>
  <FieldGroup class="w-full gap-1">
    <FieldRoot class="flex-1">
      <FieldNativeInput v-model="grouped" placeholder="搜索关键词" />
    </FieldRoot>
    <Button class="shrink-0" theme="brand">搜索</Button>
  </FieldGroup>
</DemoBox>

::: details 查看代码
```vue
<FieldGroup class="w-full gap-1">
  <FieldRoot class="flex-1">
    <FieldNativeInput v-model="keyword" placeholder="搜索关键词" />
  </FieldRoot>
  <Button class="shrink-0" theme="brand">搜索</Button>
</FieldGroup>
```
:::

## Props

### FieldRoot

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 输入域尺寸 |
| `status` | `'error' \| 'warning' \| 'success'` | — | 校验状态 |
| `disabled` | `boolean` | `false` | 禁用输入域 |
| `readonly` | `boolean` | `false` | 只读输入域 |
| `focused` | `boolean` | `false` | 聚焦视觉状态 |
| `active` | `boolean` | `false` | 激活/展开视觉状态 |
| `multiline` | `boolean` | `false` | 多行或多值输入域 |

### FieldNativeInput

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `model-value` | `string \| number` | `''` | v-model 绑定值 |
| `type` | `string` | `'text'` | 原生 input type |
| `placeholder` | `string` | `''` | 占位文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `readonly` | `boolean` | `false` | 只读 |
| `maxlength` | `number` | — | 最大字符数 |
| `name` | `string` | `''` | 原生 name |
| `autofocus` | `boolean` | `false` | 原生 autofocus |
| `autocomplete` | `string` | `''` | 原生 autocomplete |
| `aria-label` | `string` | `''` | 无障碍标签 |

### 其他 Primitive

| 组件 | 说明 |
|------|------|
| `FieldContent` | 主内容布局区，支持 `multiline` 和 `tag` |
| `FieldPrefix` | 左侧辅助区 |
| `FieldSuffix` | 右侧辅助区 |
| `FieldAction` | 可点击动作位，支持 `disabled` 和 `active` |
| `FieldGroup` | 组合输入容器 |
| `FieldSegment` | 范围或分段输入单元，支持 `active` / `disabled` / `readonly` |

## Events

### FieldNativeInput

`FieldNativeInput` 会把未声明的属性和原生事件透传到内部 `input`，因此可以直接监听
`@input`、`@change`、`@focus`、`@blur`、`@keydown` 等原生事件。

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:model-value` | `string` | v-model 更新 |
| `enter` | `KeyboardEvent` | 按下 Enter 时额外触发 |
