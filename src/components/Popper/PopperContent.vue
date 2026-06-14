<template>
  <Teleport :to="resolvedTeleportTarget">
    <div
      v-if="ctx.visible.value"
      v-bind="$attrs"
      :id="ctx.contentId"
      ref="contentEl"
      data-horizon-teleport-layer
      :style="mergedStyles"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, inject, onBeforeUnmount, watch, nextTick, type CSSProperties } from 'vue'
import {
  dialogLayerContextKey,
  dialogTeleportedLayerBehaviorKey,
} from '../_internal/dialogLayerContext'
import { popperContextKey } from './context'

defineOptions({ inheritAttrs: false })

const injectedCtx = inject(popperContextKey)
if (!injectedCtx) {
  throw new Error('<PopperContent> must be used inside <Popper>')
}
const ctx = injectedCtx
const dialogLayer = inject(dialogLayerContextKey, null)
const dialogTeleportedLayerBehavior = inject(dialogTeleportedLayerBehaviorKey, null)

const contentEl = ref<HTMLElement>()
const isDialogTeleportedElementRegistered = ref(false)
const dialogChildLayerZIndex = computed(() =>
  isDialogTeleportedElementRegistered.value ? dialogLayer?.getChildLayerZIndex() : undefined,
)

function resolveTeleportTarget(target: string | HTMLElement) {
  if (typeof target !== 'string') return target
  if (typeof document === 'undefined') return target

  try {
    return document.querySelector(target) ? target : 'body'
  } catch {
    return 'body'
  }
}

const resolvedTeleportTarget = computed(() => {
  return resolveTeleportTarget(ctx.to.value)
})
let isMouseDownListening = false
let isEscListening = false
let unregisterDialogTeleportedElement: (() => void) | null = null
let registeredDialogTeleportedElement: HTMLElement | null = null

const mergedStyles = computed<CSSProperties>(() => {
  const s: CSSProperties = { ...ctx.floatingStyles.value }
  s.zIndex = dialogChildLayerZIndex.value ?? ctx.zIndex.value
  if (ctx.matchWidth.value) {
    s.width = 'var(--h-popper-match-width)'
  }
  return s
})

function onMouseDown(e: MouseEvent) {
  if (!ctx.closeOnOutsideClick.value) return

  if (
    !(e.target instanceof Node) ||
    ctx.triggerRef.value?.contains(e.target) ||
    contentEl.value?.contains(e.target)
  )
    return
  ctx.hide()
}

function onEsc(e: KeyboardEvent) {
  if (e.defaultPrevented) return
  if (!ctx.closeOnEsc.value) return
  if (e.key === 'Escape') ctx.hide()
}

function syncDocumentListeners(visible: boolean) {
  if (typeof document === 'undefined') return

  if (visible && ctx.closeOnOutsideClick.value) {
    if (!isMouseDownListening) {
      document.addEventListener('mousedown', onMouseDown, true)
      isMouseDownListening = true
    }
  } else if (isMouseDownListening) {
    document.removeEventListener('mousedown', onMouseDown, true)
    isMouseDownListening = false
  }

  if (visible && ctx.closeOnEsc.value) {
    if (!isEscListening) {
      document.addEventListener('keydown', onEsc)
      isEscListening = true
    }
  } else if (isEscListening) {
    document.removeEventListener('keydown', onEsc)
    isEscListening = false
  }
}

function clearDialogTeleportedElement() {
  unregisterDialogTeleportedElement?.()
  unregisterDialogTeleportedElement = null
  registeredDialogTeleportedElement = null
  isDialogTeleportedElementRegistered.value = false
}

function syncDialogTeleportedElement(visible: boolean) {
  if (!visible || !dialogLayer || !contentEl.value) {
    clearDialogTeleportedElement()
    return
  }

  if (!dialogLayer.containsElement(ctx.triggerRef.value ?? null)) {
    clearDialogTeleportedElement()
    return
  }

  if (registeredDialogTeleportedElement === contentEl.value) return

  clearDialogTeleportedElement()

  unregisterDialogTeleportedElement = dialogLayer.registerTeleportedElement(contentEl.value, {
    onEscape: closeDialogTeleportedElementOnEscape,
  })
  registeredDialogTeleportedElement = contentEl.value
  isDialogTeleportedElementRegistered.value = true
}

function closeDialogTeleportedElementOnEscape() {
  if (dialogTeleportedLayerBehavior?.onEscape) {
    return dialogTeleportedLayerBehavior.onEscape()
  }

  if (!ctx.closeOnEsc.value) return false

  ctx.hide()
  return true
}

watch(
  () => [ctx.visible.value, ctx.closeOnOutsideClick.value, ctx.closeOnEsc.value] as const,
  ([val]) => {
    syncDocumentListeners(val)

    if (val) {
      nextTick(() => {
        if (contentEl.value) {
          ctx.contentRef.value = contentEl.value
          syncDialogTeleportedElement(true)
        }
      })
    } else {
      clearDialogTeleportedElement()
      ctx.contentRef.value = undefined
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  syncDocumentListeners(false)
  clearDialogTeleportedElement()
  ctx.contentRef.value = undefined
})

defineExpose({
  contentEl,
})
</script>
