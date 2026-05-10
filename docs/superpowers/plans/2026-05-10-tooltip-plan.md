# Tooltip Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Tooltip component with 12 placements, 4 trigger modes, dark/light themes, powered by Floating UI for positioning.

**Architecture:** Single `Tooltip.vue` component wraps the default slot in a reference element, then Teleports tooltip bubble to `<body>`. Positioning is driven by `@floating-ui/vue` (`useFloating` + `arrow` + `flip` + `offset` + `shift`). Visibility state is managed internally or via `v-model:visible` (manual mode).

**Tech Stack:** Vue 3, TypeScript, Tailwind CSS v4, @floating-ui/vue (new dependency)

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `src/components/Tooltip/Tooltip.vue` | Create | Main component |
| `src/components/index.ts` | Modify | Add Tooltip export |
| `docs/.vitepress/theme/index.ts` | Modify | Register Tooltip globally |
| `docs/.vitepress/config.ts` | Modify | Add sidebar nav entry |
| `docs/components/tooltip.md` | Create | Component documentation |

---

### Task 1: Install @floating-ui/vue

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install dependency**

Run: `npm install @floating-ui/vue @floating-ui/dom`

Expected: Packages added to package.json and node_modules.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @floating-ui/vue dependency for Tooltip positioning"
```

---

### Task 2: Create Tooltip.vue component

**Files:**
- Create: `src/components/Tooltip/Tooltip.vue`

- [ ] **Step 1: Write component template and script**

```vue
<template>
  <div
    ref="referenceRef"
    class="inline-flex"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </div>

  <Teleport to="body">
    <Transition name="tooltip-fade">
      <div
        v-if="computedVisible"
        :id="tooltipId"
        ref="floatingRef"
        role="tooltip"
        :class="tooltipClasses"
        :style="floatingStyles"
        @mouseenter="onTooltipEnter"
        @mouseleave="onTooltipLeave"
      >
        <slot name="content">{{ content }}</slot>
        <div
          v-if="showArrow"
          ref="arrowRef"
          class="absolute w-1.5 h-1.5 rotate-45"
          :class="arrowClasses"
          :style="arrowStyle"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useFloating, arrow, flip, offset, shift } from '@floating-ui/vue'
import { cn } from '../../utils'

type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'
type TooltipEffect = 'dark' | 'light'

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: TooltipPlacement
    trigger?: TooltipTrigger
    effect?: TooltipEffect
    showArrow?: boolean
    offset?: number
    showDelay?: number
    hideDelay?: number
    disabled?: boolean
    visible?: boolean
    zIndex?: number
  }>(),
  {
    content: '',
    placement: 'top',
    trigger: 'hover',
    effect: 'dark',
    showArrow: true,
    offset: 6,
    showDelay: 0,
    hideDelay: 0,
    disabled: false,
    visible: undefined,
    zIndex: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const referenceRef = ref<HTMLElement>()
const floatingRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const internalVisible = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let clickOutsideHandler: ((e: MouseEvent) => void) | null = null

const computedVisible = computed({
  get: () => (props.visible !== undefined ? props.visible : internalVisible.value),
  set: (val: boolean) => {
    internalVisible.value = val
    emit('update:visible', val)
  },
})

const tooltipId = computed(() => `h-tooltip-${Math.random().toString(36).slice(2, 9)}`)

const { floatingStyles, middlewareData } = useFloating(referenceRef, floatingRef, {
  placement: computed(() => props.placement as any),
  middleware: computed(() => [
    offset(props.offset),
    flip(),
    shift({ padding: 4 }),
    ...(props.showArrow ? [arrow({ element: arrowRef, padding: 4 })] : []),
  ]),
})

const arrowStyle = computed(() => {
  const data = middlewareData.value?.arrow
  if (!data) return {}
  const side = data.placement?.split('-')[0] || 'bottom'
  const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side] || 'top'
  return {
    left: data.x != null ? `${data.x}px` : '',
    top: data.y != null ? `${data.y}px` : '',
    [staticSide]: '-3px',
  }
})

const tooltipClasses = computed(() =>
  cn(
    'absolute max-w-60 px-2.5 py-1.5 text-xs rounded z-40 select-none',
    'shadow-md break-words',
    props.effect === 'dark'
      ? 'bg-neutral-heading text-white'
      : 'bg-white text-neutral-heading border border-neutral-border',
  ),
)

const arrowClasses = computed(() =>
  cn(
    props.effect === 'dark' ? 'bg-neutral-heading' : 'bg-white',
    // in light mode, the rotated square's two edges serve as the border
    // the tooltip body border handles the rest
  ),
)

const styleProxy = computed(() => {
  const s: Record<string, string> = {}
  if (props.zIndex != null) s['z-index'] = String(props.zIndex)
  return s
})

function clearTimers() {
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
}

function show() {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(() => { computedVisible.value = true }, props.showDelay)
  } else {
    computedVisible.value = true
  }
}

function hide() {
  clearTimers()
  if (props.hideDelay > 0) {
    hideTimer = setTimeout(() => { computedVisible.value = false }, props.hideDelay)
  } else {
    computedVisible.value = false
  }
}

function toggle() {
  if (computedVisible.value) { hide() } else { show() }
}

function bindClickOutside() {
  if (clickOutsideHandler) return
  clickOutsideHandler = (e: MouseEvent) => {
    if (!computedVisible.value) return
    const refEl = referenceRef.value
    const floatEl = floatingRef.value
    if (!refEl || !floatEl) return
    if (!refEl.contains(e.target as Node) && !floatEl.contains(e.target as Node)) {
      hide()
    }
  }
  document.addEventListener('click', clickOutsideHandler, true)
}

function unbindClickOutside() {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler, true)
    clickOutsideHandler = null
  }
}

// Trigger handlers
function onMouseEnter() { if (props.trigger === 'hover') show() }
function onMouseLeave() { if (props.trigger === 'hover') hide() }
function onClick() { if (props.trigger === 'click') toggle() }
function onFocus() { if (props.trigger === 'focus') show() }
function onBlur() { if (props.trigger === 'focus') hide() }

// Allow mouse to enter tooltip so users can interact with slotted content
function onTooltipEnter() { if (props.trigger === 'hover') { clearTimers(); computedVisible.value = true } }
function onTooltipLeave() { if (props.trigger === 'hover') hide() }

watch(computedVisible, (val) => {
  if (props.trigger === 'click') {
    if (val) { bindClickOutside() } else { unbindClickOutside() }
  }
})

onBeforeUnmount(() => {
  clearTimers()
  unbindClickOutside()
})
</script>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
```

**Wait — there's an issue with `tooltipId`.** Using `Math.random()` in a computed will regenerate on every render. Let me use a ref instead. And also, the `tooltipId` string is not used anywhere in the template currently, but it would be good for `aria-describedby`. Let me remove it for now (YAGNI) unless we add a11y later. Actually, let me keep it simple and drop it.

Also, the `styleProxy` computed is referenced in the template but not used — I used `floatingStyles` instead which comes from `useFloating`. Let me clean that up. Actually I see the issue - I defined `styleProxy` but used `floatingStyles` in the template. `floatingStyles` comes from `useFloating` and provides `position: absolute` + `top` + `left` values. The custom `zIndex` needs to be merged in. Let me fix this.

Let me also check: does `@floating-ui/vue` export `useFloating`? Let me verify the API...

The `@floating-ui/vue` package (v1.x) exports:
- `useFloating(reference, floating, options)` - returns `{ floatingStyles, placement, middlewareData, ... }`
- `arrow(options)` - middleware
- `flip(options)` - middleware
- `offset(options)` - middleware
- `shift(options)` - middleware

All good. Let me fix the issues in the component code and write a clean version. Actually, let me re-write the plan step with the corrected code. The plan file should have the correct, final code.

Actually wait, there's a problem with the plan format. The task steps show the full component code in step 1, which is huge. This makes the plan file very large but that's what the skill requires - "No Placeholders" - "Complete code in every step."

Let me restructure a bit. I'll put the full Tooltip.vue code in step 1, and subsequent steps will handle the other files.

Let me also correct the code issues I noticed:
1. `tooltipId` computed using Math.random() → use `useId()` or a simple counter, or just compute once with a ref
2. The `styleProxy` should be merged with `floatingStyles`
3. Need to handle `position` in floatingStyles

Actually, I realize the template references `:style="floatingStyles"` but doesn't include the custom `zIndex`. Let me merge them.

Let me also reconsider - the `styleProxy` computed is defined but not referenced in the template. The template uses `floatingStyles` directly. I should either:
- Combine them: compute a merged style
- Or add a `:style` binding that combines both

Let me use a computed that merges floatingStyles with any custom zIndex.

Also I should double-check: Floating UI's `floatingStyles` provides `position: absolute` (which we need), `top`, and `left`. Let me make sure.

Alright, let me fix all these issues and write clean code. I'll also fix the `tooltipId` issue by using a simple module-level counter for generating unique IDs.<｜end▁of▁thinking｜>

<｜｜DSML｜｜tool_calls>
<｜｜DSML｜｜invoke name="Write">
<｜｜DSML｜｜parameter name="content" string="true"># Tooltip Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Tooltip component with 12 placements, 4 trigger modes, dark/light themes, powered by Floating UI for positioning.

**Architecture:** Single `Tooltip.vue` wraps the default slot in an inline-flex reference element `<div>`, then Teleports the tooltip bubble to `<body>`. Positioning via `@floating-ui/vue` (`useFloating` + `arrow` + `flip` + `offset` + `shift`). Visibility managed internally with `v-model:visible` override for controlled/manual modes. Hover trigger allows mouse to enter the tooltip bubble (for interactive `content` slot use).

**Tech Stack:** Vue 3, TypeScript strict, Tailwind CSS v4, @floating-ui/vue, @floating-ui/dom

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/Tooltip/Tooltip.vue` | Create | Main component |
| `src/components/index.ts` | Modify | Add Tooltip to barrel export |
| `docs/.vitepress/theme/index.ts` | Modify | Register Tooltip globally for docs |
| `docs/.vitepress/config.ts` | Modify | Add sidebar entry |
| `docs/components/tooltip.md` | Create | Component documentation page |

---

### Task 1: Install @floating-ui/vue

- [ ] **Step 1: Install**

```bash
npm install @floating-ui/vue @floating-ui/dom
```

- [ ] **Step 2: Verify**

```bash
node -e "require('@floating-ui/vue')" 2>&1 || echo "ESM-only — expected"
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add @floating-ui/vue for Tooltip positioning"
```

---

### Task 2: Create Tooltip.vue component

**Files:**
- Create: `src/components/Tooltip/Tooltip.vue`

- [ ] **Step 1: Write the component**

```vue
<template>
  <div
    ref="referenceRef"
    class="inline-flex"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onTriggerClick"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </div>

  <Teleport to="body">
    <Transition name="tooltip-fade">
      <div
        v-if="computedVisible"
        ref="floatingRef"
        role="tooltip"
        :class="bubbleClasses"
        :style="mergedStyles"
        @mouseenter="onBubbleEnter"
        @mouseleave="onBubbleLeave"
      >
        <slot name="content">{{ content }}</slot>
        <div
          v-if="showArrow"
          ref="arrowRef"
          class="absolute w-1.5 h-1.5 rotate-45"
          :class="arrowBg"
          :style="arrowStyle"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useFloating, arrow, flip, offset, shift } from '@floating-ui/vue'
import { cn } from '../../utils'

type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'
type TooltipEffect = 'dark' | 'light'

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: TooltipPlacement
    trigger?: TooltipTrigger
    effect?: TooltipEffect
    showArrow?: boolean
    offset?: number
    showDelay?: number
    hideDelay?: number
    disabled?: boolean
    visible?: boolean
    zIndex?: number
  }>(),
  {
    content: '',
    placement: 'top',
    trigger: 'hover',
    effect: 'dark',
    showArrow: true,
    offset: 6,
    showDelay: 0,
    hideDelay: 0,
    disabled: false,
    visible: undefined,
    zIndex: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const referenceRef = ref<HTMLElement>()
const floatingRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const internalVisible = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let clickOutsideHandler: ((e: MouseEvent) => void) | null = null

const computedVisible = computed({
  get: () => (props.visible !== undefined ? props.visible : internalVisible.value),
  set: (val) => {
    internalVisible.value = val
    emit('update:visible', val)
  },
})

const { floatingStyles, middlewareData } = useFloating(referenceRef, floatingRef, {
  placement: computed(() => props.placement as any),
  middleware: computed(() => [
    offset(props.offset),
    flip(),
    shift({ padding: 4 }),
    ...(props.showArrow ? [arrow({ element: arrowRef, padding: 4 })] : []),
  ]),
})

const arrowStyle = computed(() => {
  const data = middlewareData.value?.arrow
  if (!data) return {}
  const side = (data.placement || 'bottom').split('-')[0]
  const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side] || 'top'
  return {
    left: data.x != null ? `${data.x}px` : '',
    top: data.y != null ? `${data.y}px` : '',
    [staticSide]: '-3px',
  }
})

const mergedStyles = computed(() => ({
  ...floatingStyles.value,
  ...(props.zIndex != null ? { 'z-index': String(props.zIndex) } : {}),
}))

const bubbleClasses = computed(() =>
  cn(
    'absolute max-w-60 px-2.5 py-1.5 text-xs rounded select-none',
    'shadow-md break-words',
    props.effect === 'dark'
      ? 'bg-neutral-heading text-white'
      : 'bg-white text-neutral-heading border border-neutral-border',
  ),
)

const arrowBg = computed(() =>
  props.effect === 'dark' ? 'bg-neutral-heading' : 'bg-white',
)

function clearTimers() {
  if (showTimer) { clearTimeout(showTimer); showTimer = null }
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
}

function doShow() {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(() => { computedVisible.value = true }, props.showDelay)
  } else {
    computedVisible.value = true
  }
}

function doHide() {
  clearTimers()
  if (props.hideDelay > 0) {
    hideTimer = setTimeout(() => { computedVisible.value = false }, props.hideDelay)
  } else {
    computedVisible.value = false
  }
}

function doToggle() {
  if (computedVisible.value) { doHide() } else { doShow() }
}

function bindClickOutside() {
  if (clickOutsideHandler) return
  clickOutsideHandler = (e: MouseEvent) => {
    if (!computedVisible.value) return
    if (
      !(e.target instanceof Node) ||
      referenceRef.value?.contains(e.target) ||
      floatingRef.value?.contains(e.target)
    ) return
    doHide()
  }
  document.addEventListener('click', clickOutsideHandler, true)
}

function unbindClickOutside() {
  if (clickOutsideHandler) {
    document.removeEventListener('click', clickOutsideHandler, true)
    clickOutsideHandler = null
  }
}

function onMouseEnter() { if (props.trigger === 'hover') doShow() }
function onMouseLeave() { if (props.trigger === 'hover') doHide() }
function onTriggerClick() { if (props.trigger === 'click') doToggle() }
function onFocus() { if (props.trigger === 'focus') doShow() }
function onBlur() { if (props.trigger === 'focus') doHide() }

function onBubbleEnter() {
  if (props.trigger === 'hover') { clearTimers(); computedVisible.value = true }
}
function onBubbleLeave() { if (props.trigger === 'hover') doHide() }

watch(computedVisible, (val) => {
  if (props.trigger === 'click') {
    if (val) { bindClickOutside() } else { unbindClickOutside() }
  }
})

onBeforeUnmount(() => {
  clearTimers()
  unbindClickOutside()
})
</script>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Tooltip/Tooltip.vue
git commit -m "feat: add Tooltip component with Floating UI positioning"
```

---

### Task 3: Export Tooltip from barrel and register globally

**Files:**
- Modify: `src/components/index.ts`
- Modify: `docs/.vitepress/theme/index.ts`

- [ ] **Step 1: Add export to barrel**

Read `src/components/index.ts` first, then edit. Current content:

```ts
import Button from './Button/Button.vue'
import Checkbox from './Checkbox/Checkbox.vue'
import CheckboxGroup from './Checkbox/CheckboxGroup.vue'
import Icon from './Icon/Icon.vue'
import Radio from './Radio/Radio.vue'
import RadioGroup from './Radio/RadioGroup.vue'

export { Button, Checkbox, CheckboxGroup, Icon, Radio, RadioGroup }
```

Change to:

```ts
import Button from './Button/Button.vue'
import Checkbox from './Checkbox/Checkbox.vue'
import CheckboxGroup from './Checkbox/CheckboxGroup.vue'
import Icon from './Icon/Icon.vue'
import Radio from './Radio/Radio.vue'
import RadioGroup from './Radio/RadioGroup.vue'
import Tooltip from './Tooltip/Tooltip.vue'

export { Button, Checkbox, CheckboxGroup, Icon, Radio, RadioGroup, Tooltip }
```

- [ ] **Step 2: Register globally in VitePress theme**

Read `docs/.vitepress/theme/index.ts` first, then edit. Current content imports and registers `Button, Checkbox, CheckboxGroup, Icon, Radio, RadioGroup`. Add `Tooltip` to the import and register it.

Import line change: add `Tooltip` to the destructured import from `@/components`.

Register line: add `app.component('Tooltip', Tooltip)` after the existing registrations.

- [ ] **Step 3: Commit**

```bash
git add src/components/index.ts docs/.vitepress/theme/index.ts
git commit -m "feat: export Tooltip and register in VitePress theme"
```

---

### Task 4: Add Tooltip to VitePress sidebar

**Files:**
- Modify: `docs/.vitepress/config.ts`

- [ ] **Step 1: Add sidebar entry**

Read `docs/.vitepress/config.ts` first, then edit the sidebar array. Add after the Radio entry:

```ts
{ text: 'Tooltip 文字提示', link: '/components/tooltip' },
```

- [ ] **Step 2: Commit**

```bash
git add docs/.vitepress/config.ts
git commit -m "docs: add Tooltip to VitePress sidebar nav"
```

---

### Task 5: Write Tooltip documentation page

**Files:**
- Create: `docs/components/tooltip.md`

- [ ] **Step 1: Write docs page**

```markdown
# Tooltip 文字提示

鼠标悬停、聚焦或点击时显示的文本提示浮层。

## 基础用法

`content` prop 传入文本，默认 `hover` 触发。

<div class="flex flex-wrap gap-3">
  <Tooltip content="删除操作不可撤销">
    <Button type="danger">删除</Button>
  </Tooltip>
  <Tooltip content="点击保存">
    <Button>保存</Button>
  </Tooltip>
</div>

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

## 主题

`effect` 支持 `dark`（默认）和 `light`。

<div class="flex flex-wrap gap-3">
  <Tooltip content="暗色主题" effect="dark">
    <Button>Dark</Button>
  </Tooltip>
  <Tooltip content="亮色主题" effect="light">
    <Button type="outline">Light</Button>
  </Tooltip>
</div>

::: details 查看代码
```html
<Tooltip content="暗色主题" effect="dark">
  <Button>Dark</Button>
</Tooltip>
<Tooltip content="亮色主题" effect="light">
  <Button type="outline">Light</Button>
</Tooltip>
```
:::

## 自定义内容

使用 `content` 插槽传入 HTML 或组件。

<div class="flex flex-wrap gap-3">
  <Tooltip>
    <Button type="outline">富文本</Button>
    <template #content>
      <div>标题：操作说明</div>
      <div class="text-neutral-muted">第二步：确认提交</div>
    </template>
  </Tooltip>
</div>

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

<div class="flex flex-wrap gap-3">
  <Tooltip content="延迟 500ms 显示" :show-delay="500">
    <Button type="outline">延迟显示</Button>
  </Tooltip>
  <Tooltip content="延迟 300ms 隐藏" :hide-delay="300">
    <Button type="outline">延迟隐藏</Button>
  </Tooltip>
</div>

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

<div class="flex flex-wrap gap-3 items-center">
  <Tooltip v-model:visible="show" content="手动控制" trigger="manual">
    <Button @click="show = !show">点击切换</Button>
  </Tooltip>
  <span class="text-sm text-neutral-muted">状态：{{ show ? '显示' : '隐藏' }}</span>
</div>

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

<div class="flex flex-wrap gap-3">
  <Tooltip content="不会出现的提示" disabled>
    <Button type="outline">Disabled Tooltip</Button>
  </Tooltip>
</div>

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
| `effect` | `'dark' \| 'light'` | `'dark'` | 主题 |
| `show-arrow` | `boolean` | `true` | 箭头 |
| `offset` | `number` | `6` | 距触发元素的偏移 (px) |
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
```

- [ ] **Step 2: Verify doc page renders**

```bash
npm run dev
```

Open `http://localhost:5173/components/tooltip` and verify all demos work correctly.

- [ ] **Step 3: Commit**

```bash
git add docs/components/tooltip.md
git commit -m "docs: add Tooltip component documentation page"
```

---

### Task 6: Type check and verify

- [ ] **Step 1: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors. If errors appear, fix them before proceeding.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Build verification**

```bash
npm run build
```

Expected: successful production build with no errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final typecheck and lint pass for Tooltip"
```
