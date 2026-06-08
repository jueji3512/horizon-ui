<template>
  <Popper
    trigger="manual"
    :visible="computedOpen"
    :placement="placement"
    :offset="offset"
    :disabled="disabled"
    :close-on-outside-click="false"
    :close-on-esc="false"
    :to="to"
    :flip="flip"
    :shift="shift"
    :match-width="matchWidth"
    :strategy="strategy"
    :auto-update="autoUpdate"
    :z-index="zIndex"
    @update:visible="handlePopperVisibleUpdate"
  >
    <slot />
  </Popper>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  useId,
  watch,
} from 'vue'
import { Popper } from '../Popper'
import { popoverContextKey } from './context'
import type {
  PopoverCloseOptions,
  PopoverLayer,
  PopoverPlacement,
  PopoverStrategy,
  PopoverTriggerType,
} from './types'

const props = withDefaults(
  defineProps<{
    open?: boolean
    trigger?: PopoverTriggerType
    placement?: PopoverPlacement
    offset?: number
    openDelay?: number
    closeDelay?: number
    disabled?: boolean
    closeOnOutsideClick?: boolean
    closeOnEsc?: boolean
    returnFocusOnClose?: boolean
    to?: string | HTMLElement
    flip?: boolean
    shift?: boolean
    matchWidth?: boolean
    strategy?: PopoverStrategy
    autoUpdate?: boolean
    zIndex?: number
  }>(),
  {
    open: undefined,
    trigger: 'click',
    placement: 'bottom',
    offset: 8,
    openDelay: 0,
    closeDelay: 0,
    disabled: false,
    closeOnOutsideClick: true,
    closeOnEsc: true,
    returnFocusOnClose: true,
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
  'update:open': [value: boolean]
  'open-change': [value: boolean]
}>()

const parentPopover = inject(popoverContextKey, null)
const internalOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const childLayers = ref<Map<symbol, PopoverLayer>>(new Map())
const contentId = useId()
const triggerId = useId()
let openTimer: ReturnType<typeof setTimeout> | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null
let unregisterParentLayer: (() => void) | null = null

const rawOpen = computed(() => (props.open !== undefined ? props.open : internalOpen.value))
const computedOpen = computed(() => (props.disabled ? false : rawOpen.value))

function clearTimers() {
  if (openTimer) {
    clearTimeout(openTimer)
    openTimer = null
  }
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

function closeChildLayers() {
  childLayers.value.forEach((layer) => {
    if (layer.open()) layer.close()
  })
}

function focusTrigger() {
  if (!props.returnFocusOnClose) return

  nextTick(() => {
    triggerRef.value?.focus()
  })
}

function setOpen(value: boolean, options: PopoverCloseOptions = {}) {
  if (props.disabled && value) return
  if (rawOpen.value === value) return

  if (!value) closeChildLayers()

  internalOpen.value = value
  emit('update:open', value)
  emit('open-change', value)

  if (!value && options.restoreFocus) {
    focusTrigger()
  }
}

function show() {
  if (props.disabled) return
  clearTimers()
  if (props.openDelay > 0) {
    openTimer = setTimeout(() => {
      setOpen(true)
    }, props.openDelay)
  } else {
    setOpen(true)
  }
}

function hide(options: PopoverCloseOptions = {}) {
  clearTimers()
  if (!options.immediate && props.closeDelay > 0) {
    closeTimer = setTimeout(() => {
      setOpen(false, options)
    }, props.closeDelay)
  } else {
    setOpen(false, options)
  }
}

function close(options: PopoverCloseOptions = {}) {
  hide({ immediate: true, ...options })
}

function toggle() {
  if (computedOpen.value) {
    close()
  } else {
    show()
  }
}

function setTriggerElement(element: HTMLElement | null) {
  triggerRef.value = element
}

function setContentElement(element: HTMLElement | null) {
  contentRef.value = element
}

function containsSelf(target: EventTarget | null) {
  if (!(target instanceof Node)) return false
  return Boolean(triggerRef.value?.contains(target) || contentRef.value?.contains(target))
}

function isEventInsideLayer(target: EventTarget | null): boolean {
  if (containsSelf(target)) return true

  for (const layer of childLayers.value.values()) {
    if (layer.open() && layer.contains(target)) return true
  }

  return false
}

function hasOpenChildLayer() {
  for (const layer of childLayers.value.values()) {
    if (layer.open()) return true
  }
  return false
}

function registerChildLayer(layer: PopoverLayer) {
  const next = new Map(childLayers.value)
  next.set(layer.id, layer)
  childLayers.value = next

  return () => {
    const current = new Map(childLayers.value)
    current.delete(layer.id)
    childLayers.value = current
  }
}

function handlePopperVisibleUpdate(value: boolean) {
  if (!value) {
    clearTimers()
    setOpen(false)
  }
}

const layerId = Symbol('popoverLayer')
const ownLayer: PopoverLayer = {
  id: layerId,
  open: () => computedOpen.value,
  close: () => close(),
  contains: isEventInsideLayer,
}

provide(popoverContextKey, {
  open: computedOpen,
  trigger: computed(() => props.trigger),
  disabled: computed(() => props.disabled),
  closeOnOutsideClick: computed(() => props.closeOnOutsideClick),
  closeOnEsc: computed(() => props.closeOnEsc),
  returnFocusOnClose: computed(() => props.returnFocusOnClose),
  placement: computed(() => props.placement),
  triggerRef,
  contentRef,
  contentId,
  triggerId,
  show,
  hide,
  close,
  toggle,
  setTriggerElement,
  setContentElement,
  registerChildLayer,
  isEventInsideLayer,
  hasOpenChildLayer,
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      clearTimers()
      if (rawOpen.value) {
        setOpen(false, { restoreFocus: false })
      }
    }
  },
)

watch(
  () => props.open,
  (open, oldOpen) => {
    if (open !== undefined && open !== oldOpen) {
      clearTimers()
    }
  },
)

onMounted(() => {
  unregisterParentLayer = parentPopover?.registerChildLayer(ownLayer) ?? null
})

onBeforeUnmount(() => {
  clearTimers()
  closeChildLayers()
  unregisterParentLayer?.()
})
</script>
