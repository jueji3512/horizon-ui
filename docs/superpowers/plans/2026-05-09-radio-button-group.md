# Radio Button 类型改造实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Radio type="button" 从分段控制器样式改为按钮组样式

**Architecture:** 修改 Radio.vue 的 button 分支样式（选中=填充主色、未选中=白底、禁用=灰底），精简 RadioGroup.vue（去掉滑动指示器和 ResizeObserver），更新文档描述。provide/inject 接口不变，default 类型不动。

**Tech Stack:** Vue 3 + TypeScript + Tailwind CSS v4

---

### Task 1: 重写 Radio.vue button 分支样式

**Files:**
- Modify: `src/components/Radio/Radio.vue`

- [ ] **Step 1: 重写 buttonClasses computed**

将现有的 `relative z-10 flex-1` + 透明背景样式替换为独立按钮组样式。

找到 `buttonClasses` computed（约第 137 行），替换为：

```ts
const buttonClasses = computed(() =>
  cn(
    'h-btn',
    'flex-1 inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap',
    'border-r border-neutral-border last:border-r-0',
    buttonSizeMap[groupSize.value],
    isChecked.value && !isDisabled.value && 'bg-primary text-white hover:bg-primary-700',
    !isChecked.value && !isDisabled.value && 'bg-white text-neutral-text hover:bg-neutral-subtle',
    isDisabled.value && 'bg-neutral-subtle text-neutral-muted opacity-60 cursor-not-allowed',
  ),
)
```

同时删除不再需要的 `textSize` computed（button 类型不再使用它），确认 `buttonSizeMap`、`iconSizeMap` 保留（仍需要尺寸和图标映射）。

- [ ] **Step 2: 移除不再需要的变量**

删除 `textSizeMap` 和 `textSize` computed（约第 84-88 行和第 98 行），button 类型不再引用它。检查 default 类型是否也不引用它——是的，default 类型用的是 `<span :class="textSize">`，所以保留。

--- 更正：default 类型使用 `textSize`，所以保留 `textSizeMap` 和 `textSize` computed。

- [ ] **Step 3: 类型检查**

```bash
npm run typecheck
```

预期：PASS，无新增错误

---

### Task 2: 精简 RadioGroup.vue button 分支

**Files:**
- Modify: `src/components/Radio/RadioGroup.vue`

- [ ] **Step 1: 清理模板**

删除 indicator 元素：`<div class="radio-group-indicator" :style="indicatorStyle" />`

删除容器上的 `ref="containerRef"`（不再需要引用容器 DOM）。

- [ ] **Step 2: 重写 buttonContainerClasses**

找到 `buttonContainerClasses` computed（约第 167 行），替换为：

```ts
const buttonContainerClasses = computed(() =>
  cn(
    'inline-flex border border-neutral-border overflow-hidden',
    buttonSizeClassMap[props.size],
  ),
)
```

- [ ] **Step 3: 删除 indicator 相关 JS**

删除以下内容：
- `containerRef` ref（第 83 行）
- `mounted` ref（第 84 行）
- `indicatorStyle` ref（第 85 行）
- `indicatorRadiusMap`（第 87-91 行）
- `updateIndicator` 函数（第 93-113 行）
- `onMounted` 里调用 updateIndicator 的逻辑（第 115-120 行）
- `watch` 导入（如不再需要）
- `watch(() => props.modelValue, ...)`（第 122 行）
- `useResizeObserver(containerRef, updateIndicator)`（第 123 行）
- `useResizeObserver` import（第 38 行）
- `nextTick` 导入（如不再需要）

`handleKeydown` 函数需调整：它引用了 `containerRef`，改为使用 event 的 `currentTarget` 或通过 `$el` 查找：

```ts
function handleKeydown(e: KeyboardEvent) {
  if (props.type !== 'button') return

  const container = e.currentTarget as HTMLElement
  const radios = container.querySelectorAll<HTMLElement>(
    '[role="radio"]:not([disabled])',
  )
  if (!radios?.length) return

  const currentIndex = Array.from(radios).indexOf(document.activeElement as HTMLElement)
  const base = currentIndex === -1 ? 0 : currentIndex

  let nextIndex = -1
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    nextIndex = (base + 1) % radios.length
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    nextIndex = (base - 1 + radios.length) % radios.length
  }

  if (nextIndex >= 0) {
    const btn = radios[nextIndex]
    btn.focus()
    btn.click()
  }
}
```

- [ ] **Step 4: 更新 scoped style**

替换 `<style scoped>` 中当前的 `.radio-group-button` 和 `.radio-group-indicator` 样式为：

```css
/* 分隔线颜色：选中按钮右侧分隔线跟随 primary */
.radio-group-button > :not(:last-child)[data-selected] {
  border-right-color: var(--color-primary);
}
```

- [ ] **Step 5: 清理不再需要的 import**

检查 `<script setup>` 和 `<script lang="ts">` 的 import，删除不再使用的：
- `nextTick`（如不再需要）
- `onMounted`（如不再需要）
- `watch`（如不再需要）
- `useResizeObserver`（删除）

- [ ] **Step 6: 类型检查**

```bash
npm run typecheck
```

预期：PASS

---

### Task 3: 更新文档

**Files:**
- Modify: `docs/components/radio.md`

- [ ] **Step 1: 更新文档标题和描述**

将第 120 行的 `## 分段控制器 Button Type` 改为 `## 按钮组 Button Type`。

将第 122 行的 `设置 type="button" 切换为分段控制器样式，选中项带滑动指示器动画。` 改为 `设置 type="button" 切换为按钮组样式。`

- [ ] **Step 2: 视觉验证**

```bash
npm run dev
```

在浏览器检查：
- button 类型三档尺寸视觉正常
- 选中态/未选中态/禁用态样式正确
- 键盘 Arrow 导航正常
- default 类型无回归

---

### Task 4: 最终验证

- [ ] **Step 1: 运行完整检查**

```bash
npm run typecheck
npm run lint
```

预期：全部 PASS

- [ ] **Step 2: 手动验证清单**
  - [ ] sm/md/lg 三档尺寸按钮高度对齐独立 Button
  - [ ] 选中按钮 `bg-primary text-white`，未选中 `bg-white text-neutral-text`
  - [ ] hover 效果（未选中 hover `bg-neutral-subtle`，选中 hover `bg-primary-700`）
  - [ ] 禁用按钮灰色背景 + 灰色文字 + 低透明度 + 不可点击
  - [ ] 整组禁用所有按钮不可交互
  - [ ] 按钮间有明显分隔线
  - [ ] 键盘 Arrow 键切换并选中
  - [ ] default 类型（圆圈+文字）无变化
  - [ ] 垂直排列 default 类型正常
