<template>
  <PopperContent
    ref="popperContentRef"
    v-bind="$attrs"
    :class="contentClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </PopperContent>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, provide, ref, watch } from 'vue'
import { PopperContent } from '../Popper'
import { cn } from '../../utils'
import { dialogTeleportedLayerBehaviorKey } from '../_internal/dialogLayerContext'
import { popoverContextKey } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    panelClass?: string
  }>(),
  {
    panelClass: '',
  },
)

const injectedCtx = inject(popoverContextKey)
if (!injectedCtx) {
  throw new Error('<PopoverContent> must be used inside <Popover>')
}
const ctx = injectedCtx

const popperContentRef = ref<{ contentEl: HTMLElement | undefined } | null>(null)
let isMouseDownListening = false
let isEscListening = false

const contentClasses = computed(() =>
  cn(
    'rounded-[var(--round-default)] bg-[var(--bg-color-container)] text-[var(--text-color-primary)] shadow-popper outline-none',
    props.panelClass,
  ),
)

function syncContentElement() {
  nextTick(() => {
    ctx.setContentElement(popperContentRef.value?.contentEl ?? null)
  })
}

function handleMouseEnter() {
  if (ctx.trigger.value === 'hover') {
    ctx.show()
  }
}

function handleMouseLeave() {
  if (ctx.trigger.value === 'hover') {
    ctx.hide()
  }
}

function onMouseDown(event: MouseEvent) {
  if (!ctx.closeOnOutsideClick.value) return
  if (ctx.isEventInsideLayer(event.target)) return
  ctx.close({ restoreFocus: false })
}

function onEsc(event: KeyboardEvent) {
  if (event.defaultPrevented) return
  if (!ctx.closeOnEsc.value) return
  if (event.key !== 'Escape') return
  if (ctx.hasOpenChildLayer()) return

  event.preventDefault()
  ctx.close({ restoreFocus: true })
}

function closeOnDialogEscape() {
  if (!ctx.closeOnEsc.value) return false
  if (ctx.hasOpenChildLayer()) return false

  ctx.close({ restoreFocus: true })
  return true
}

provide(dialogTeleportedLayerBehaviorKey, {
  onEscape: closeOnDialogEscape,
})

function syncDocumentListeners(open: boolean) {
  if (typeof document === 'undefined') return

  if (open && ctx.closeOnOutsideClick.value) {
    if (!isMouseDownListening) {
      document.addEventListener('mousedown', onMouseDown, true)
      isMouseDownListening = true
    }
  } else if (isMouseDownListening) {
    document.removeEventListener('mousedown', onMouseDown, true)
    isMouseDownListening = false
  }

  if (open && ctx.closeOnEsc.value) {
    if (!isEscListening) {
      document.addEventListener('keydown', onEsc)
      isEscListening = true
    }
  } else if (isEscListening) {
    document.removeEventListener('keydown', onEsc)
    isEscListening = false
  }
}

watch(
  () => [ctx.open.value, ctx.closeOnOutsideClick.value, ctx.closeOnEsc.value] as const,
  ([open]) => {
    syncDocumentListeners(open)
    syncContentElement()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  syncDocumentListeners(false)
  ctx.setContentElement(null)
})
</script>
