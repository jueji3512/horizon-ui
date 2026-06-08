# ScrollArea 滚动区域

> **底层组件** — 为 Select、Menu、DropdownMenu、Dialog、Table 等组件提供稳定的滚动视口和悬浮滚动条。

ScrollArea 只负责滚动 viewport，不提供背景、边框、阴影或业务主题。上层组件需要自行定义 surface 视觉。

## 垂直滚动

:::demo 垂直滚动
scrollarea/example-01
:::

## 水平滚动

:::demo 水平滚动
scrollarea/example-02
:::

## 双轴滚动与键盘焦点

:::demo 双轴滚动与键盘焦点
scrollarea/example-03
:::

## 编程控制

:::demo 编程控制
scrollarea/example-04
:::

## API

### Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `orientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | 滚动方向 |
| `scrollbar-visibility` | `'auto' \| 'always' \| 'hidden'` | `'auto'` | 悬浮滚动条显隐策略 |
| `scrollbar-hide-delay` | `number` | `600` | `auto` 模式下滚动条空闲隐藏延时 (ms) |
| `max-height` | `number \| string` | — | viewport 最大高度，数字按 px 处理 |
| `max-width` | `number \| string` | — | viewport 最大宽度，数字按 px 处理 |
| `focusable` | `boolean` | `false` | 让 viewport 可聚焦，适用于独立滚动区域 |
| `aria-label` | `string` | `'滚动区域'` | `focusable` 开启时的可访问名称 |

### Events

| Event | 参数 | 说明 |
|-------|------|------|
| `scroll` | `ScrollAreaState` | 滚动位置变化 |
| `update` | `ScrollAreaState` | viewport 或 content 尺寸、可滚动状态变化 |

### Expose

| 方法 / ref | 类型 | 说明 |
|------------|------|------|
| `viewportRef` | `Ref<HTMLElement \| null>` | 真实滚动容器 |
| `contentRef` | `Ref<HTMLElement \| null>` | 内容容器 |
| `scrollTo` | `(options: ScrollAreaScrollToOptions) => void` | 滚动到指定位置 |
| `scrollBy` | `(options: ScrollAreaScrollToOptions) => void` | 按偏移滚动 |
| `scrollToElement` | `(element, options) => void` | 只调整当前 viewport，让元素进入可见区域 |
| `update` | `() => void` | 主动重新测量滚动状态 |
| `getScrollState` | `() => ScrollAreaState` | 获取当前滚动状态快照 |

### ScrollAreaState

```ts
interface ScrollAreaState {
  scrollTop: number
  scrollLeft: number
  scrollHeight: number
  scrollWidth: number
  clientHeight: number
  clientWidth: number
  maxScrollTop: number
  maxScrollLeft: number
  isScrollableY: boolean
  isScrollableX: boolean
  isAtTop: boolean
  isAtBottom: boolean
  isAtLeft: boolean
  isAtRight: boolean
}
```

## 扩展说明

ScrollArea v1 不实现虚拟滚动。它保留稳定的 `viewportRef`、`contentRef` 和 `scrollToElement` 接口，后续 Table、Tree、Cascader 等组件需要虚拟列表时，可基于 viewport 接入独立 virtualizer。
