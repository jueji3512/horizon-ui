<template>
  <Teleport :to="resolvedTeleportTarget" :disabled="!mounted">
    <Transition :name="placementTransitionName">
      <div
        v-if="computedOpen"
        data-horizon-teleport-layer
        :class="overlayClasses"
        :style="overlayStyle"
        @pointercancel="clearOverlayPointerDown"
        @pointerdown="handleOverlayPointerDown"
        @pointerup="handleOverlayPointerUp"
      >
        <div
          v-bind="panelAttrs"
          ref="panelRef"
          :class="panelClasses"
          :style="panelInlineStyle"
          :role="role"
          aria-modal="true"
          :aria-labelledby="titleAttributeId"
          :aria-describedby="descriptionAttributeId"
          :aria-label="ariaLabelAttribute"
          tabindex="-1"
        >
          <header :class="headerClasses">
            <div class="min-w-0">
              <h2
                v-if="hasTitle"
                :id="titleId"
                class="font-title-sm text-[var(--text-color-primary)]"
              >
                <slot name="title">{{ title }}</slot>
              </h2>
              <p
                v-if="hasDescription"
                :id="descriptionId"
                class="font-body-md mt-1 text-[var(--text-color-secondary)]"
              >
                <slot name="description">{{ description }}</slot>
              </p>
            </div>

            <button
              v-if="showClose"
              type="button"
              class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--round-default)] border-0 bg-transparent text-[var(--text-color-secondary)] transition-colors duration-200 hover:bg-[var(--bg-color-container-hover)] hover:text-[var(--text-color-primary)] focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:outline-none active:bg-[var(--bg-color-container-active)]"
              aria-label="Close drawer"
              @click="close"
            >
              <Icon name="close" class="h-4 w-4" />
            </button>
          </header>

          <section class="font-body-md min-h-0 flex-1 overflow-auto px-6">
            <slot :close="close" />
          </section>

          <footer v-if="$slots.footer" class="flex justify-end gap-2 px-6 py-5">
            <slot name="footer" v-bind="footerSlotProps" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
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
  useAttrs,
  useId,
  useSlots,
  type StyleValue,
  watch,
} from 'vue'
import type { ClassValue } from 'clsx'
import Icon from '../Icon/Icon.vue'
import { cn } from '../../utils'
import { dialogLayerContextKey } from '../_internal/dialogLayerContext'
import type { DialogLayerContext } from '../_internal/dialogLayerContext'
import type { DrawerFooterSlotProps, DrawerPlacement, DrawerRole } from './types'
import {
  focusFirstElement,
  isTopLayer,
  lockBodyScroll,
  registerModalLayer,
  releaseBodyScroll,
  wrapFocus,
} from '../Dialog/modalLayer'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    open?: boolean
    title?: string
    description?: string
    ariaLabel?: string
    placement?: DrawerPlacement
    role?: DrawerRole
    showClose?: boolean
    closeOnEsc?: boolean
    closeOnOverlayClick?: boolean
    trapFocus?: boolean
    lockScroll?: boolean
    returnFocusOnClose?: boolean
    to?: string | HTMLElement
    zIndex?: number
    panelClass?: string
  }>(),
  {
    open: false,
    title: '',
    description: '',
    ariaLabel: '',
    placement: 'right',
    role: 'dialog',
    showClose: true,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    trapFocus: true,
    lockScroll: true,
    returnFocusOnClose: true,
    to: 'body',
    zIndex: undefined,
    panelClass: '',
  },
)

const emit = defineEmits<{
  'update:open': [value: boolean]
  'open-change': [value: boolean]
}>()

const parentDialogLayer = inject(dialogLayerContextKey, null)
const attrs = useAttrs()
const slots = useSlots()
const mounted = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const layerStackOrder = ref(0)
const layerZIndex = ref(0)
const layerId = Symbol('drawerLayer')
const titleId = useId()
const descriptionId = useId()
const teleportedElements = new Map<
  HTMLElement,
  {
    onEscape?: () => boolean
  }
>()
let unregisterLayer: (() => void) | null = null
let previousFocusedElement: HTMLElement | null = null
let isKeydownListening = false
let isFocusinListening = false
let scrollLocked = false
let isOverlayPointerDown = false
let initialFocusToken = 0
let restoreFocusToken = 0
let layerReadyResolve: (() => void) | null = null
let layerReadyPromise = createLayerReadyPromise()

const computedOpen = computed(() => props.open)
const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const titleAttributeId = computed(() => (hasTitle.value ? titleId : undefined))
const descriptionAttributeId = computed(() => (hasDescription.value ? descriptionId : undefined))
const ariaLabelAttribute = computed(() =>
  hasTitle.value ? undefined : props.ariaLabel || 'Drawer',
)
const inheritedChildLayerZIndex = computed(() => parentDialogLayer?.getChildLayerZIndex())

function resolveTeleportTarget(target: string | HTMLElement) {
  if (typeof target !== 'string') return target
  if (typeof document === 'undefined') return target

  try {
    return document.querySelector(target) ? target : 'body'
  } catch {
    return 'body'
  }
}

const resolvedTeleportTarget = computed(() => resolveTeleportTarget(props.to))

const resolvedLayerZIndex = computed(() => {
  if (!layerStackOrder.value && !layerZIndex.value) return undefined
  if (props.zIndex !== undefined) return props.zIndex + layerStackOrder.value

  const inheritedZIndex = inheritedChildLayerZIndex.value
  if (inheritedZIndex !== undefined) {
    return Math.max(layerZIndex.value, inheritedZIndex + layerStackOrder.value)
  }

  return layerZIndex.value
})

const overlayStyle = computed(() => ({
  zIndex: resolvedLayerZIndex.value,
}))

const overlayClassMap: Record<DrawerPlacement, string> = {
  right: 'items-stretch justify-end',
  left: 'items-stretch justify-start',
  top: 'items-start justify-stretch',
  bottom: 'items-end justify-stretch',
}

const placementClassMap: Record<DrawerPlacement, string> = {
  right: 'h-full w-[400px] max-w-[calc(100vw-32px)] rounded-l-[var(--round-default)]',
  left: 'h-full w-[400px] max-w-[calc(100vw-32px)] rounded-r-[var(--round-default)]',
  top: 'h-80 w-full max-h-[calc(100vh-32px)] rounded-b-[var(--round-default)]',
  bottom: 'h-80 w-full max-h-[calc(100vh-32px)] rounded-t-[var(--round-default)]',
}

const panelAttrs = computed(() => {
  const { class: _class, style: _style, ...restAttrs } = attrs
  return restAttrs
})

const overlayClasses = computed(() =>
  cn('h-drawer-overlay fixed inset-0 flex bg-black/35', overlayClassMap[props.placement]),
)

const panelClasses = computed(() =>
  cn(
    'h-drawer-panel flex min-h-0 flex-col overflow-hidden bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-2xl outline-none',
    placementClassMap[props.placement],
    props.panelClass,
    attrs.class as ClassValue,
  ),
)

const panelInlineStyle = computed<StyleValue>(() => attrs.style as StyleValue)

const headerClasses = computed(() =>
  cn('flex items-start justify-between gap-4 px-6 pt-6', hasDescription.value ? 'pb-4' : 'pb-5'),
)

const footerSlotProps = computed<DrawerFooterSlotProps>(() => ({
  close,
}))

const placementTransitionName = computed(() => `h-drawer-slide-${props.placement}`)

provide(dialogLayerContextKey, {
  containsElement,
  getChildLayerZIndex,
  registerTeleportedElement,
  whenLayerReady,
})

function createLayerReadyPromise() {
  return new Promise<void>((resolve) => {
    layerReadyResolve = resolve
  })
}

function whenLayerReady() {
  return layerReadyPromise
}

function resolveLayerReady() {
  layerReadyResolve?.()
  layerReadyResolve = null
}

function resetLayerReady() {
  layerReadyPromise = createLayerReadyPromise()
}

function registerTeleportedElement(
  element: HTMLElement,
  options: Parameters<DialogLayerContext['registerTeleportedElement']>[1] = {},
) {
  teleportedElements.set(element, options)

  return () => {
    teleportedElements.delete(element)
  }
}

function getChildLayerZIndex() {
  return resolvedLayerZIndex.value === undefined ? undefined : resolvedLayerZIndex.value + 1
}

function containsElement(target: EventTarget | null) {
  if (!(target instanceof Node)) return false
  if (panelRef.value?.contains(target)) return true
  if (isControlledLayerElement(target)) return true

  for (const element of teleportedElements.keys()) {
    if (element.contains(target)) return true
  }

  return false
}

function isControlledLayerElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  if (!panelRef.value) return false

  let element: Element | null = target

  while (element) {
    const id = element.id
    if (id) {
      const controls = panelRef.value.querySelectorAll('[aria-controls]')
      for (const control of controls) {
        if (control.getAttribute('aria-controls') === id) return true
      }
    }
    element = element.parentElement
  }

  return false
}

function getTeleportedElementList() {
  return Array.from(teleportedElements.keys()).filter((element) => element.isConnected)
}

function closeChildLayerOnEscape() {
  const layers = Array.from(teleportedElements.entries()).filter(([element]) => element.isConnected)
  if (layers.length === 0) return false

  for (let i = layers.length - 1; i >= 0; i -= 1) {
    const [, layer] = layers[i]
    if (layer.onEscape?.() ?? false) return true
  }

  return false
}

function close() {
  if (!computedOpen.value) return
  emit('update:open', false)
}

function handleOverlayPointerDown(event: PointerEvent) {
  isOverlayPointerDown = event.target === event.currentTarget
}

function handleOverlayPointerUp(event: PointerEvent) {
  const shouldClose = isOverlayPointerDown && event.target === event.currentTarget
  clearOverlayPointerDown()

  if (!shouldClose) return
  if (!props.closeOnOverlayClick) return
  if (!isTopLayer(layerId)) return
  close()
}

function clearOverlayPointerDown() {
  isOverlayPointerDown = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return
  if (!isTopLayer(layerId)) return

  if (event.key === 'Escape') {
    if (closeChildLayerOnEscape()) {
      event.preventDefault()
      return
    }

    if (props.closeOnEsc) {
      event.preventDefault()
      close()
    }
    return
  }

  if (event.key === 'Tab' && props.trapFocus && panelRef.value) {
    wrapFocus(event, panelRef.value, getTeleportedElementList())
  }
}

function handleFocusin(event: FocusEvent) {
  if (!props.trapFocus) return
  if (!isTopLayer(layerId)) return
  if (!panelRef.value) return
  if (containsElement(event.target)) return

  focusFirstElement(panelRef.value)
}

function syncKeydownListener(open: boolean) {
  if (typeof document === 'undefined') return

  if (open && (props.closeOnEsc || props.trapFocus)) {
    if (!isKeydownListening) {
      document.addEventListener('keydown', handleKeydown)
      isKeydownListening = true
    }
  } else if (isKeydownListening) {
    document.removeEventListener('keydown', handleKeydown)
    isKeydownListening = false
  }
}

function syncFocusinListener(open: boolean) {
  if (typeof document === 'undefined') return

  if (open && props.trapFocus) {
    if (!isFocusinListening) {
      document.addEventListener('focusin', handleFocusin)
      isFocusinListening = true
    }
  } else if (isFocusinListening) {
    document.removeEventListener('focusin', handleFocusin)
    isFocusinListening = false
  }
}

function syncScrollLock(open: boolean) {
  if (open && props.lockScroll) {
    if (!scrollLocked) {
      lockBodyScroll()
      scrollLocked = true
    }
  } else if (scrollLocked) {
    releaseBodyScroll()
    scrollLocked = false
  }
}

function restoreFocus() {
  if (!props.returnFocusOnClose) {
    previousFocusedElement = null
    return
  }

  const target = previousFocusedElement
  const token = ++restoreFocusToken
  previousFocusedElement = null

  nextTick(() => {
    if (token !== restoreFocusToken) return
    if (computedOpen.value) return
    if (target && document.contains(target)) {
      target.focus({ preventScroll: true })
    }
  })
}

async function activateLayer() {
  if (unregisterLayer) return

  const token = ++initialFocusToken
  restoreFocusToken += 1

  if (parentDialogLayer) {
    await parentDialogLayer.whenLayerReady()
  }

  if (token !== initialFocusToken) return
  if (!computedOpen.value) return
  if (unregisterLayer) return

  if (typeof document !== 'undefined') {
    previousFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
  }

  const layerRegistration = registerModalLayer(layerId)
  layerStackOrder.value = layerRegistration.order
  layerZIndex.value = layerRegistration.zIndex
  unregisterLayer = layerRegistration.unregister
  resolveLayerReady()
  syncKeydownListener(true)
  syncFocusinListener(true)
  syncScrollLock(true)

  nextTick(() => {
    if (token !== initialFocusToken) return
    if (!computedOpen.value) return
    if (!isTopLayer(layerId)) return
    if (!panelRef.value) return
    if (props.trapFocus) {
      focusFirstElement(panelRef.value)
    } else {
      panelRef.value.focus({ preventScroll: true })
    }
  })
}

function deactivateLayer(restore = true) {
  const wasTopLayer = isTopLayer(layerId)

  initialFocusToken += 1
  clearOverlayPointerDown()
  syncKeydownListener(false)
  syncFocusinListener(false)
  syncScrollLock(false)
  unregisterLayer?.()
  unregisterLayer = null
  layerStackOrder.value = 0
  layerZIndex.value = 0
  resetLayerReady()

  if (restore && wasTopLayer) {
    restoreFocus()
  } else {
    restoreFocusToken += 1
    previousFocusedElement = null
  }
}

watch(
  computedOpen,
  (open, wasOpen) => {
    if (!mounted.value) return
    if (open === wasOpen) return
    if (open) {
      activateLayer()
      emit('open-change', true)
    } else if (wasOpen) {
      deactivateLayer(true)
      emit('open-change', false)
    }
  },
  { immediate: true },
)

watch(
  () => props.lockScroll,
  () => {
    if (!mounted.value) return
    syncScrollLock(computedOpen.value)
  },
)

watch(
  () => [props.closeOnEsc, props.trapFocus] as const,
  () => {
    if (!mounted.value) return
    syncKeydownListener(computedOpen.value)
    syncFocusinListener(computedOpen.value)
  },
)

onMounted(() => {
  mounted.value = true
  if (computedOpen.value) {
    activateLayer()
  }
})

onBeforeUnmount(() => {
  deactivateLayer(true)
})
</script>

<style scoped>
.h-drawer-slide-right-enter-active,
.h-drawer-slide-right-leave-active,
.h-drawer-slide-left-enter-active,
.h-drawer-slide-left-leave-active,
.h-drawer-slide-top-enter-active,
.h-drawer-slide-top-leave-active,
.h-drawer-slide-bottom-enter-active,
.h-drawer-slide-bottom-leave-active {
  transition: opacity var(--duration-normal) ease;
}

.h-drawer-slide-right-enter-from,
.h-drawer-slide-right-leave-to,
.h-drawer-slide-left-enter-from,
.h-drawer-slide-left-leave-to,
.h-drawer-slide-top-enter-from,
.h-drawer-slide-top-leave-to,
.h-drawer-slide-bottom-enter-from,
.h-drawer-slide-bottom-leave-to {
  opacity: 0;
}

.h-drawer-slide-right-enter-active .h-drawer-panel,
.h-drawer-slide-right-leave-active .h-drawer-panel,
.h-drawer-slide-left-enter-active .h-drawer-panel,
.h-drawer-slide-left-leave-active .h-drawer-panel,
.h-drawer-slide-top-enter-active .h-drawer-panel,
.h-drawer-slide-top-leave-active .h-drawer-panel,
.h-drawer-slide-bottom-enter-active .h-drawer-panel,
.h-drawer-slide-bottom-leave-active .h-drawer-panel {
  transition:
    opacity var(--duration-normal) ease,
    transform var(--duration-normal) ease;
}

.h-drawer-slide-right-enter-from .h-drawer-panel,
.h-drawer-slide-right-leave-to .h-drawer-panel {
  opacity: 0;
  transform: translateX(100%);
}

.h-drawer-slide-left-enter-from .h-drawer-panel,
.h-drawer-slide-left-leave-to .h-drawer-panel {
  opacity: 0;
  transform: translateX(-100%);
}

.h-drawer-slide-top-enter-from .h-drawer-panel,
.h-drawer-slide-top-leave-to .h-drawer-panel {
  opacity: 0;
  transform: translateY(-100%);
}

.h-drawer-slide-bottom-enter-from .h-drawer-panel,
.h-drawer-slide-bottom-leave-to .h-drawer-panel {
  opacity: 0;
  transform: translateY(100%);
}
</style>
