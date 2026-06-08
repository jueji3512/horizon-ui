<template>
  <slot />
</template>

<script setup lang="ts">
import { ref, computed, provide, onBeforeUnmount, useId, watch } from 'vue'
import { usePopper } from './usePopper'
import { popperContextKey } from './index'
import { useZIndex } from '../../utils'
import type { Placement, TriggerType } from './types'

const props = withDefaults(
  defineProps<{
    placement?: Placement
    offset?: number
    trigger?: TriggerType
    showDelay?: number
    hideDelay?: number
    visible?: boolean
    disabled?: boolean
    closeOnOutsideClick?: boolean
    closeOnEsc?: boolean
    to?: string | HTMLElement
    flip?: boolean
    shift?: boolean
    matchWidth?: boolean
    strategy?: 'absolute' | 'fixed'
    autoUpdate?: boolean
    zIndex?: number
  }>(),
  {
    placement: 'bottom',
    offset: 8,
    trigger: 'manual',
    showDelay: 0,
    hideDelay: 0,
    visible: undefined,
    disabled: false,
    closeOnOutsideClick: true,
    closeOnEsc: true,
    to: 'body',
    flip: true,
    shift: false,
    matchWidth: false,
    strategy: 'absolute',
    autoUpdate: true,
    zIndex: undefined,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const triggerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

const internalVisible = ref(false)

const visibleRef = computed(
  () => !props.disabled && (props.visible !== undefined ? props.visible : internalVisible.value),
)

function setVisible(val: boolean) {
  internalVisible.value = val
  emit('update:visible', val)
}

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

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

function show() {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(() => setVisible(true), props.showDelay)
  } else {
    setVisible(true)
  }
}

function hide(options: { immediate?: boolean } = {}) {
  clearTimers()
  if (!options.immediate && props.hideDelay > 0) {
    hideTimer = setTimeout(() => setVisible(false), props.hideDelay)
  } else {
    setVisible(false)
  }
}

function toggle() {
  if (visibleRef.value) hide()
  else show()
}

const placementRef = computed(() => props.placement)

const {
  floatingStyles,
  middlewareData,
  placement: currentPlacement,
  update,
} = usePopper(triggerRef, contentRef, {
  placement: placementRef,
  strategy: computed(() => props.strategy),
  offset: computed(() => props.offset),
  flip: computed(() => props.flip),
  shift: computed(() => props.shift),
  matchWidth: computed(() => props.matchWidth),
  autoUpdate: computed(() => props.autoUpdate),
  arrow: arrowRef,
})

const fallbackZIndex = useZIndex()
const resolvedZIndex = computed(() => props.zIndex ?? fallbackZIndex)
const contentId = useId()

provide(popperContextKey, {
  visible: visibleRef,
  show,
  hide,
  toggle,
  trigger: computed(() => props.trigger),
  disabled: computed(() => props.disabled),
  closeOnOutsideClick: computed(() => props.closeOnOutsideClick),
  closeOnEsc: computed(() => props.closeOnEsc),
  triggerRef,
  contentRef,
  arrowRef,
  floatingStyles,
  middlewareData,
  currentPlacement,
  to: computed(() => props.to),
  updatePosition: update,
  zIndex: resolvedZIndex,
  matchWidth: computed(() => props.matchWidth),
  contentId,
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      clearTimers()
      if (props.visible || internalVisible.value) {
        setVisible(false)
      }
    }
  },
)

watch(
  () => props.visible,
  (visible, oldVisible) => {
    if (visible !== undefined && visible !== oldVisible) {
      clearTimers()
    }
  },
)

onBeforeUnmount(() => {
  clearTimers()
})
</script>
