<template>
  <Popper
    trigger="manual"
    :visible="computedVisible"
    :placement="placement"
    :offset="offset"
    :disabled="disabled"
    :z-index="zIndex"
    @update:visible="onPopperVisibleUpdate"
  >
    <PopperTrigger
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onTriggerClick"
      @focusin="onFocus"
      @focusout="onBlur"
    >
      <slot />
    </PopperTrigger>

    <PopperContent
      role="tooltip"
      :class="bubbleClasses"
      @mouseenter="onBubbleEnter"
      @mouseleave="onBubbleLeave"
    >
      <slot name="content">{{ content }}</slot>
      <PopperArrow v-if="showArrow" :class="arrowClasses" />
    </PopperContent>
  </Popper>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { cn } from '../../utils'
import { Popper, PopperTrigger, PopperContent, PopperArrow } from '../Popper'

type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual'
type TooltipTheme = 'default' | 'brand' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    content?: string
    placement?: TooltipPlacement
    trigger?: TooltipTrigger
    theme?: TooltipTheme
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
    theme: 'default',
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

const internalVisible = ref(false)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const computedVisible = computed({
  get: () => (props.visible !== undefined ? props.visible : internalVisible.value),
  set: (val) => {
    internalVisible.value = val
    emit('update:visible', val)
  },
})

const themeMap: Record<TooltipTheme, { bubble: string; arrow: string }> = {
  default: {
    bubble: 'bg-[var(--text-color-primary)] text-[var(--text-color-inverse)]',
    arrow: 'bg-[var(--text-color-primary)]',
  },
  brand: { bubble: 'bg-brand-light text-brand-active', arrow: 'bg-brand-light' },
  success: { bubble: 'bg-success-light text-success-active', arrow: 'bg-success-light' },
  warning: { bubble: 'bg-warning-light text-warning-active', arrow: 'bg-warning-light' },
  error: { bubble: 'bg-error-light text-error-active', arrow: 'bg-error-light' },
}

const tooltipSurfaceGeometryMap = {
  bubble: 'font-body-sm max-w-60 rounded-[var(--round-default)] px-2 py-1',
} as const

const bubbleClasses = computed(() =>
  cn(
    tooltipSurfaceGeometryMap.bubble,
    'break-words shadow-popper select-none',
    themeMap[props.theme].bubble,
  ),
)

const arrowClasses = computed(() => themeMap[props.theme].arrow)

function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function doShow() {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(() => {
      if (!props.disabled) {
        computedVisible.value = true
      }
    }, props.showDelay)
  } else {
    computedVisible.value = true
  }
}

function doHide() {
  clearTimers()
  if (props.hideDelay > 0) {
    hideTimer = setTimeout(() => {
      computedVisible.value = false
    }, props.hideDelay)
  } else {
    computedVisible.value = false
  }
}

function doToggle() {
  if (computedVisible.value) {
    doHide()
  } else {
    doShow()
  }
}

function onPopperVisibleUpdate(val: boolean) {
  if (!val) clearTimers()
  computedVisible.value = val
}

function onMouseEnter() {
  if (props.trigger === 'hover') doShow()
}
function onMouseLeave() {
  if (props.trigger === 'hover') doHide()
}
function onTriggerClick() {
  if (props.trigger === 'click') doToggle()
}
function onFocus() {
  if (props.trigger === 'focus') doShow()
}
function onBlur() {
  if (props.trigger === 'focus') doHide()
}

function onBubbleEnter() {
  if (props.trigger === 'hover') {
    clearTimers()
    computedVisible.value = true
  }
}
function onBubbleLeave() {
  if (props.trigger === 'hover') doHide()
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      clearTimers()
      computedVisible.value = false
    }
  },
)

onBeforeUnmount(() => {
  clearTimers()
})
</script>
