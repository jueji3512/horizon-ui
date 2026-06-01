<template>
  <Teleport :to="ctx.to.value">
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

const ctx = inject(popperContextKey)!
if (!ctx) {
  throw new Error('<PopperContent> must be used inside <Popper>')
}

const contentEl = ref<HTMLElement>()

const mergedStyles = computed<CSSProperties>(() => {
  const s: CSSProperties = { ...ctx.floatingStyles.value }
  s.zIndex = ctx.zIndex.value
  if (ctx.matchWidth.value) {
    s.width = 'var(--h-popper-match-width)'
  }
  return s
})

function onMouseDown(e: MouseEvent) {
  if (
    !(e.target instanceof Node) ||
    ctx.triggerRef.value?.contains(e.target) ||
    contentEl.value?.contains(e.target)
  )
    return
  ctx.hide()
}

function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') ctx.hide()
}

watch(
  () => ctx.visible.value,
  (val, oldVal) => {
    if (val) {
      document.addEventListener('mousedown', onMouseDown, true)
      document.addEventListener('keydown', onEsc)
      nextTick(() => {
        if (contentEl.value) {
          ctx.contentRef.value = contentEl.value
        }
      })
    } else {
      if (oldVal !== undefined) {
        document.removeEventListener('mousedown', onMouseDown, true)
        document.removeEventListener('keydown', onEsc)
        ctx.contentRef.value = undefined
      }
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onMouseDown, true)
  document.removeEventListener('keydown', onEsc)
  ctx.contentRef.value = undefined
})
</script>
