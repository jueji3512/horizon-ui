# Radio button 类型改造：分段控制器 → 按钮组

## 背景

当前 `RadioGroup type="button"` 使用 iOS 风格的分段控制器（Segmented）样式——灰色底容器 + 白色滑动指示器 + getBoundingClientRect 动画。用户希望改为与其他热门 UI 库（Element Plus、Ant Design）一致的按钮组（Button Group）样式。

## 改动范围

### Radio.vue — 重写 button 分支样式

**buttonClasses 改为：**

- 去掉 `flex-1 z-10 relative`，按钮不需要覆盖在指示器上
- 选中 `isChecked && !isDisabled`：`bg-primary text-white hover:bg-primary-700`
- 未选中 `!isChecked && !isDisabled`：`bg-white text-neutral-text hover:bg-neutral-subtle`
- 禁用 `isDisabled`：`bg-neutral-subtle text-neutral-muted opacity-60 cursor-not-allowed`
- 保留 `h-btn` 类、尺寸、gap、字体、`prefixIcon` 支持
- 分隔线由 CSS `:last-child` 或最后一个按钮不加 `border-r` 处理——实际用 `:not(:last-child)` 伪类，不传额外 prop

```css
/* 分隔线规则放在 RadioGroup 的 scoped style 或容器的子选择器中 */
```

### RadioGroup.vue — button 分支精简

**移除：**
- `containerRef`、`mounted`、`indicatorStyle` — 滑动指示器相关响应式变量
- `updateIndicator()` 函数
- `onMounted` / `watch` / `useResizeObserver` 里调用 updateIndicator 的逻辑
- `useResizeObserver` import
- `<div class="radio-group-indicator">` 模板元素
- `<style scoped>` 中 `.radio-group-button` 和 `.radio-group-indicator` 样式

**保留：**
- `handleKeydown` 键盘导航（Arrow 键切换+选中）
- `provide/inject` Context 机制（modelValue, type, size, disabled, name, select）
- `buttonContainerClasses` 计算属性（存续但内容简化）

**buttonContainerClasses 改为：**
- `inline-flex border border-neutral-border overflow-hidden` + 圆角（sm=rounded, md=rounded-md, lg=rounded-lg）
- 子按钮分隔线用 CSS 选择器：`> :not(:last-child) { border-right: 1px solid var(--color-neutral-border) }`
- 选中项分隔线：`> [data-selected] { border-right-color: var(--color-primary) }`

### radio.md — 文档更新

- 标题从"分段控制器 Button Type"改为"按钮组 Button Type"
- 描述文字更新，去掉"分段控制器"、"滑动指示器动画"相关措辞
- 代码示例不变（props 接口一致）

## 不做改动

- Props 定义不变（type/size/disabled/direction/modelValue）
- RadioGroupContext 接口不变
- `default` 类型零影响
- `prefixIcon` 继续支持
- `direction` 对 button 类型不生效（只水平排列）
- 键盘导航逻辑保持不变

## 验收标准

- button 类型三档尺寸（sm/md/lg）视觉上与独立 Button 组件一致（高度、padding、字体、圆角）
- 选中按钮填充 primary 色，未选中按钮白底，按钮间有分隔线
- 禁用态正确：灰色背景 + 灰色文字 + 低透明度 + 不可点击
- 键盘 Arrow 导航正常工作
- default 类型无回归
- 类型检查通过（`npm run typecheck`）
