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
        class="absolute w-2 h-2 rotate-45"
        :class="arrowClasses"
        :style="arrowStyle"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useFloating, arrow, flip, offset as offsetMiddleware, shift } from '@floating-ui/vue'
import type { Placement } from '@floating-ui/vue'
import { cn } from '../../utils'

type TooltipPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'

type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'
type TooltipType = 'default' | 'light' | 'primary' | 'success' | 'danger' | 'warning'

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: TooltipPlacement
    trigger?: TooltipTrigger
    type?: TooltipType
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
    type: 'default',
    showArrow: true,
    offset: 10,
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

const { floatingStyles, middlewareData, placement: currentPlacement } = useFloating(referenceRef, floatingRef, {
  placement: computed(() => props.placement as unknown as Placement),
  middleware: computed(() => [
    offsetMiddleware(props.offset),
    flip(),
    shift({ padding: 4 }),
    ...(props.showArrow ? [arrow({ element: arrowRef, padding: 4 })] : []),
  ]),
})

const arrowStyle = computed(() => {
  const data = middlewareData.value?.arrow
  if (!data) return {}
  const side = currentPlacement.value.split('-')[0]
  const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side] || 'top'
  return {
    left: data.x != null ? `${data.x}px` : '',
    top: data.y != null ? `${data.y}px` : '',
    [staticSide]: '-4px',
  }
})

const mergedStyles = computed(() => ({
  ...floatingStyles.value,
  ...(props.zIndex != null ? { 'z-index': props.zIndex } : {}),
}))

const typeMap: Record<TooltipType, { bubble: string; arrow: string }> = {
  default: { bubble: 'bg-neutral-heading text-white', arrow: 'bg-neutral-heading' },
  light: { bubble: 'bg-white text-neutral-heading', arrow: 'bg-white' },
  primary: { bubble: 'bg-primary-light text-primary-active', arrow: 'bg-primary-light' },
  success: { bubble: 'bg-success-light text-success-active', arrow: 'bg-success-light' },
  danger: { bubble: 'bg-danger-light text-danger-active', arrow: 'bg-danger-light' },
  warning: { bubble: 'bg-warning-light text-warning-active', arrow: 'bg-warning-light' },
}

const bubbleClasses = computed(() =>
  cn(
    'absolute max-w-60 px-2.5 py-1.5 text-xs rounded select-none',
    'shadow-lg break-words',
    typeMap[props.type].bubble,
  ),
)

const arrowClasses = computed(() => typeMap[props.type].arrow)

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

watch(() => props.trigger, (_, oldTrigger) => {
  if (oldTrigger === 'click') {
    unbindClickOutside()
  }
})

onBeforeUnmount(() => {
  clearTimers()
  unbindClickOutside()
})
</script>


