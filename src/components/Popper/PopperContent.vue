<template>
  <Teleport :to="resolvedTeleportTarget">
    <div
      v-if="ctx.visible.value"
      v-bind="$attrs"
      :id="ctx.contentId"
      ref="contentEl"
      :style="mergedStyles"
    >
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, inject, onBeforeUnmount, watch, nextTick, type CSSProperties } from 'vue'
import { popperContextKey } from './index'

defineOptions({ inheritAttrs: false })

const injectedCtx = inject(popperContextKey)
if (!injectedCtx) {
  throw new Error('<PopperContent> must be used inside <Popper>')
}
const ctx = injectedCtx

const contentEl = ref<HTMLElement>()

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

const mergedStyles = computed<CSSProperties>(() => {
  const s: CSSProperties = { ...ctx.floatingStyles.value }
  s.zIndex = ctx.zIndex.value
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

watch(
  () => [ctx.visible.value, ctx.closeOnOutsideClick.value, ctx.closeOnEsc.value] as const,
  ([val]) => {
    syncDocumentListeners(val)

    if (val) {
      nextTick(() => {
        if (contentEl.value) {
          ctx.contentRef.value = contentEl.value
        }
      })
    } else {
      ctx.contentRef.value = undefined
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  syncDocumentListeners(false)
  ctx.contentRef.value = undefined
})
</script>
