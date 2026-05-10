# Tooltip 组件设计 Spec

## 概述

面向 Horizon UI 的 Tooltip 组件。对标 Element Plus / TDesign / Ant Design，提供 12 方位、多触发方式、暗/亮双主题的文本提示浮层。

## API

### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `content` | `string` | `''` | 提示文本 |
| `placement` | `Placement` | `'top'` | 12 方位 |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | 触发方式 |
| `effect` | `'dark' \| 'light'` | `'dark'` | 主题 |
| `showArrow` | `boolean` | `true` | 是否显示箭头 |
| `offset` | `number` | `6` | 距触发元素的偏移 (px) |
| `showDelay` | `number` | `0` | 显示延迟 (ms) |
| `hideDelay` | `number` | `0` | 隐藏延迟 (ms) |
| `disabled` | `boolean` | `false` | 禁用 |
| `visible` | `boolean` | — | v-model:visible 受控 |
| `zIndex` | `number` | — | 自定义 z-index |

**Placement 类型：**
```
'top' | 'top-start' | 'top-end'
| 'bottom' | 'bottom-start' | 'bottom-end'
| 'left' | 'left-start' | 'left-end'
| 'right' | 'right-start' | 'right-end'
```

### Slots

| 插槽 | 说明 |
|------|------|
| `default` | 触发元素 |
| `content` | 自定义提示内容（替代 content prop） |

### Events

| 事件 | 参数 | 说明 |
|------|------|------|
| `update:visible` | `boolean` | v-model:visible 更新 |

## 技术方案

- **@floating-ui/vue** 做定位：`useFloating` + `arrow` + `flip` + `offset` + `shift` 中间件
- **Teleport to `<body>`** 避免 overflow: hidden 截断
- **CSS transition**：opacity + transform，200ms ease
- 箭头使用 `floating-arrow` 定位，6px × 6px 旋转 45° 正方形
- 延迟用 `setTimeout` 控制，组件卸载/重新触发时 clear
- 受控模式 (`v-model:visible`) 与内部状态通过 `computed` 联动，使用 `useVModel` 或手写 get/set
- manual 模式完全由 visible prop 驱动，不响应 trigger 事件

## Visual Design

- **dark**：`bg-neutral-heading` (slate-800) + `text-white` + `shadow-md`
- **light**：`bg-white` + `text-neutral-heading` + `border border-neutral-border` + `shadow-md`
- 内边距：`px-2.5 py-1.5`（约 6px 10px）
- 字号：`text-xs`（12px）
- 圆角：`rounded`（6px，对应 radius-md）
- 最大宽度：`max-w-60`（240px），防止过长文本

## 使用示例

```html
<!-- 基础 -->
<Tooltip content="删除操作不可撤销">
  <Button type="danger">删除</Button>
</Tooltip>

<!-- content slot -->
<Tooltip>
  <Button>帮助</Button>
  <template #content><div>HTML 内容</div></template>
</Tooltip>

<!-- 受控 -->
<Tooltip v-model:visible="show" trigger="manual" content="提示">
  <Button @click="show = !show">切换</Button>
</Tooltip>
```
