# Checkbox 多选框组件 + Radio default 尺寸简化

## 背景

实现 Checkbox 组件，架构参考已实现的 Radio 组件（Group + Item provide/inject 模式），样式参考主流 UI 库。同时调整 Radio default 类型固定尺寸。

## Checkbox 组件

### CheckboxGroup

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `string[] \| number[]` | `[]` | v-model 选中值数组 |
| `type` | `'default' \| 'button'` | `'default'` | 显示样式 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 仅 button 类型生效 |
| `disabled` | `boolean` | `false` | 整组禁用 |
| `min` | `number` | — | 最少选中项数 |
| `max` | `number` | — | 最多选中项数 |

Events: `update:modelValue`, `change`

`min` / `max` 逻辑：达到 `max` 时，未选中项变为禁用态；达到 `min` 时，已选中项不可取消（禁用）。

### Checkbox

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| number` | — | 在 Group 中的值 |
| `label` | `string` | `''` | 标签文本 |
| `checked` | `boolean` | `false` | 独立使用时的 v-model |
| `disabled` | `boolean` | `false` | 禁用 |
| `indeterminate` | `boolean` | `false` | 半选态 |
| `prefixIcon` | `string` | `''` | 前缀图标（button 类型） |

Events: `update:checked`, `change`

### 样式

**default 类型**：16px 方框，无 size prop
- 未选中：`border-neutral-border bg-white`，hover `border-primary`
- 选中：`bg-primary border-primary` + 白色勾号 SVG
- 半选：`bg-primary border-primary` + 白色横线 SVG
- 禁用：`border-neutral-border bg-neutral-subtle opacity-60 cursor-not-allowed`
- 圆角：`rounded-sm`（约 3px，方形微圆）

**button 类型**：同 Radio 按钮组，选中 `bg-primary text-white`

### 独立使用 Checkbox（无 Group）

```html
<Checkbox v-model:checked="checked" label="同意协议" />
```

此时 checked 为 boolean，不需要 value prop。

### 文件变更

- 新建 `src/components/Checkbox/Checkbox.vue`
- 新建 `src/components/Checkbox/CheckboxGroup.vue`
- 修改 `src/components/index.ts`（export Checkbox, CheckboxGroup）
- 新建 `docs/components/checkbox.md`
- 修改 `docs/.vitepress/config.ts`（nav + sidebar）

## Radio default 尺寸简化

- `size` prop 在 RadioGroup 中保留，但仅 `type="button"` 时生效
- default 类型圆圈固定 md 尺寸（w-5 h-5 / 20px）
- 文字固定 text-sm（14px）
- 间距固定 gap-2

### 文件变更

- 修改 `src/components/Radio/Radio.vue`（default 类型去掉 size 映射）
- 修改 `docs/components/radio.md`（更新 Props 说明）

## 验收标准

- Checkbox 独立使用正常（v-model:checked）
- CheckboxGroup 多选正常（v-model 数组）
- indeterminate 半选态正常
- button 类型三档尺寸正常
- default 类型固定 16px
- Radio default 类型固定 md 尺寸
- 类型检查通过
