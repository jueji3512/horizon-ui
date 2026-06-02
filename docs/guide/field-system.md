# Field 输入域体系

Field 是 Horizon UI 面向输入、选择、日期、范围、搜索等组件的公开底层组合基座。它的定位类似 Popper：不是单一业务组件，而是一组可复用的基础能力，既服务组件库内部实现，也允许使用者自行组合更复杂的输入控件。

源码位置为 `src/components/Field/`，与 `Button`、`Input`、`Popper` 等组件同级。Field 不放在 `_internal`，因为它需要作为公开底层组件暴露。

## 目标

- 统一所有 field-like 组件的边框、背景、圆角、字体、尺寸、hover、focus ring、disabled、readonly 和 status 表达。
- 支持普通输入、数字输入、单选选择、多选选择、日期时间、范围选择、颜色选择、搜索输入和带 addon/action 的组合输入。
- 允许上层组件自由决定业务行为，包括值解析、格式化、弹出层、键盘交互、Tag 删除、日期面板、选择面板等。
- 保持公开 API 稳定、边界清晰、性能可控，避免每个上层组件重复实现一套输入框外壳。

## 非目标

- Field 不负责表单 label、help、error message、校验触发时机；这些属于未来 `FormItem`。
- Field 不负责 Popper 定位、选项渲染、日期面板、颜色面板等浮层内容。
- Field 不内置业务值模型，不假设中间一定是一个原生 `<input>`。
- Field 不替代 `Input`；`Input` 是面向最终用户的输入组件，Field 是更底层的组合基座。

## 组件结构

### FieldRoot

统一输入域外壳。

- props：`size`、`status`、`disabled`、`readonly`、`focused`、`active`、`multiline`。
- 负责：surface 样式、状态样式、focus ring、hover、disabled、readonly、ARIA 容器属性透传。
- 不负责：role 语义。`Input`、`Select`、`DatePicker` 等上层组件自行决定 `textbox`、`combobox` 等语义。

### FieldContent

主内容布局区。

- 支持单行固定高度。
- 支持多选 Select / TagInput 的 tag wrap 和最小高度。
- 支持 display text、placeholder、原生 input、多个 Tag、range segment。
- 必须保证 suffix/action 区域不会被多选 Tag 挤压。

### FieldNativeInput

薄原生 input 包装。

- 只处理字体继承、placeholder、disabled text fill、基础 attrs 转发。
- 不处理 clear/password/word count/value parsing。

### FieldPrefix / FieldSuffix

稳定的左右辅助区。

- 适合图标、单位、色块、日历图标、下拉箭头、loading。
- 需要固定交互和对齐规则，避免每个组件各写一套 margin。

### FieldAction

可点击动作位。

- 适合 clear、password eye、展开箭头、tag close、loading fallback。
- 必须有统一的 hover、active、disabled 和 focus-visible。

### FieldGroup

组合输入容器。

- 用于 `InputNumber` 两侧 stepper、`Input.Search` 右侧按钮、prepend/append addon。
- 负责组合边界、相邻圆角、分割线、整体 disabled 状态。

### FieldSegment

分段输入单元。

- 用于 `DateRangePicker`、`TimeRangePicker`、范围数值输入等。
- 支持 segment active/focused 状态，但外层 FieldRoot 仍承担整体 focus ring。

## 状态模型

Field 统一表达以下状态：

- `default`：普通状态。
- `hover`：可交互但未聚焦。
- `focused`：键盘或鼠标聚焦，统一使用 `ring-2 ring-*-focus`。
- `active/open`：Select、DatePicker、ColorPicker 等浮层打开。
- `status="error"`：错误状态，边框和 ring 使用 error token。
- `status="warning"`：警告状态，边框和 ring 使用 warning token。
- `status="success"`：成功状态，边框和 ring 使用 success token。
- `readonly`：允许 focus/selection，但不允许编辑。
- `disabled`：不可交互，使用 disabled bg/border/text token，不依赖 opacity。

## 布局模式

### 单行输入

适用于 `Input`、`InputNumber` 中间输入、单选 `Select`、`DatePicker`。

- 高度使用 `--comp-size-sm/md/lg`。
- 内容不换行。
- suffix/action 固定在右侧。

### 多值输入

适用于 `Select multiple`、`TreeSelect multiple`、`TagInput`。

- 使用 `min-height` 而不是固定高度。
- Tag 区域允许 wrap。
- 搜索 input 可以在最后一个 tag 后自适应缩放。
- `maxTagCount` / collapsed tag 由上层组件控制，Field 只保证布局承载。

### 范围输入

适用于 `DateRangePicker`、`TimeRangePicker`、范围数值输入。

- FieldRoot 管整体边框和 ring。
- FieldSegment 管内部开始值、分隔符、结束值的焦点表达。
- 上层组件决定哪个 segment active。

### 组合输入

适用于 `InputNumber`、`Input.Search`、prepend/append addon。

- FieldGroup 管相邻子项边界。
- 子项之间使用 divider token。
- 避免重复圆角和重复边框。

## 未来组件适配

| 组件 | Field 用法 | 特别关注 |
|---|---|---|
| Input | FieldRoot + FieldNativeInput + FieldAction | clear、password、word count、attrs 转发 |
| InputNumber | FieldGroup + FieldRoot/FieldNativeInput + stepper buttons | 数字解析、长按、键盘步进 |
| Select | FieldRoot + FieldContent + FieldSuffix + Popper | readonly trigger、searchable、clear、loading |
| Select multiple | FieldRoot + wrap FieldContent + Tag + search input | tag wrap、maxTagCount、Backspace 删除 |
| TreeSelect / Cascader | FieldRoot + FieldContent + Popper | 路径展示、异步 loading、clear |
| DatePicker / TimePicker | FieldRoot + FieldNativeInput/display + FieldSuffix + Popper | 手输/只读、格式化、panel active |
| DateRangePicker | FieldRoot + FieldSegment * 2 + separator | 双焦点、范围校验、分隔符 |
| ColorPicker | FieldRoot + color swatch + display + Popper | 色块、透明度、格式切换 |
| Autocomplete / Mentions | FieldRoot + FieldNativeInput + Popper | 输入法、候选项、键盘导航 |
| Input.Search | FieldGroup + FieldRoot + action button | 右侧按钮、loading、Enter 行为 |

## 性能原则

- Field primitives 只做布局和状态，不引入 heavy watcher。
- 默认不使用 ResizeObserver；多选 tag 折叠、浮层宽度匹配等由上层组件按需启用。
- 多选组件应提供 `maxTagCount` 或折叠策略，避免大量 Tag 全量撑开输入域。
- Field 不承担 option virtualization；大列表性能由 Select/TreeSelect/Cascader 自己处理。
- class 计算保持扁平，避免在大规模列表中产生昂贵的深层响应式结构。

## 可访问性原则

- FieldRoot 不抢上层 role。
- 上层组件负责 `aria-expanded`、`aria-controls`、`aria-activedescendant`、`aria-invalid`、`aria-describedby` 等语义。
- FieldAction 必须可键盘访问，并提供明确 `aria-label`。
- disabled 状态使用真实 `disabled` 或 `aria-disabled`，不能只靠视觉样式。
- focus ring 应包住整个输入域；多选内部搜索 input 聚焦时也要触发外层 focused。

## 实施计划

1. 定义 Field API 草案与组件边界。
2. 实现 `src/components/Field/`，先提供 Root、Content、NativeInput、Prefix、Suffix、Action、Group、Segment。
3. 增加 `docs/components/field.md`，把 Field 放入“底层组件”分组。
4. 用 Field 迁移 `Input`，保持公开 API 不变。
5. 用 Field 迁移 `InputNumber`，验证 FieldGroup 和按钮 focus-visible。
6. 增加视觉矩阵，覆盖普通、hover、focus、error、warning、success、disabled、readonly、prefix、suffix、action、多选 tag、range segment。
7. 进入 `Select` 设计时，用单选、多选、searchable、clear、loading、maxTagCount 验证 Field 体系。

## 风险与约束

- Field 一旦公开，API 需要比内部组件更谨慎，避免频繁破坏用户组合代码。
- 第一版应少暴露行为，多暴露结构和状态，避免把 Select/DatePicker 的业务复杂度提前塞进 Field。
- `InputNumber` 的数字显示值和真实值分离，不能强行交给 `Input` 的 value 模型。
- 多选 Select 是 Field 体系的关键压力测试；只有多选 Tag 场景跑通，Field 才算真的成立。
