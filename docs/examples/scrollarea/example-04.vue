<template>
  <div class="max-w-[520px]">
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <Button size="sm" variant="outline" @click="scrollToTop">顶部</Button>
      <Button size="sm" variant="outline" @click="scrollByStep(-96)">上移</Button>
      <Button size="sm" variant="outline" @click="scrollByStep(96)">下移</Button>
      <Button size="sm" variant="outline" @click="scrollToTarget">定位目标</Button>
      <Button size="sm" variant="outline" @click="scrollToBottom">底部</Button>
      <Button size="sm" variant="outline" @click="refreshState">刷新状态</Button>
    </div>

    <div class="rounded-[var(--round-default)] border border-[var(--border-color-component)]">
      <ScrollArea
        ref="scrollAreaRef"
        :max-height="208"
        scrollbar-visibility="always"
        @scroll="handleScroll"
        @update="handleUpdate"
      >
        <ul class="divide-y divide-[var(--border-color-component)]">
          <li
            v-for="(item, index) in items"
            :key="item.id"
            :ref="(el) => setItemRef(el, index)"
            class="flex min-h-12 items-center justify-between px-3 py-2 transition-colors duration-150"
            :class="
              index === targetIndex
                ? 'bg-brand-light text-brand'
                : 'text-[var(--text-color-primary)]'
            "
          >
            <span class="font-body-md">{{ item.label }}</span>
            <span class="font-body-sm text-[var(--text-color-secondary)]">{{ item.meta }}</span>
          </li>
        </ul>
      </ScrollArea>
    </div>

    <div
      class="font-body-sm mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[var(--text-color-secondary)]"
    >
      <span>scrollTop: {{ metrics.scrollTop }}</span>
      <span>maxScrollTop: {{ metrics.maxScrollTop }}</span>
      <span>isAtTop: {{ metrics.isAtTop }}</span>
      <span>isAtBottom: {{ metrics.isAtBottom }}</span>
      <span>update: {{ metrics.updateCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, type ComponentPublicInstance } from 'vue'
import type { ScrollAreaExpose, ScrollAreaState } from '@/components'

const targetIndex = 15
const scrollAreaRef = ref<ScrollAreaExpose | null>(null)
const metrics = reactive({
  scrollTop: 0,
  maxScrollTop: 0,
  isAtTop: true,
  isAtBottom: false,
  updateCount: 0,
})

let itemRefs: HTMLElement[] = []

const items = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  label: `Record ${index + 1}`,
  meta: index === targetIndex ? 'target' : `row ${index + 1}`,
}))

function setItemRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el instanceof HTMLElement) {
    itemRefs[index] = el
  }
}

function syncMetrics(state = scrollAreaRef.value?.getScrollState()) {
  if (!state) return

  metrics.scrollTop = Math.round(state.scrollTop)
  metrics.maxScrollTop = Math.round(state.maxScrollTop)
  metrics.isAtTop = state.isAtTop
  metrics.isAtBottom = state.isAtBottom
}

function requestMetrics() {
  window.setTimeout(() => {
    syncMetrics()
  }, 220)
}

function scrollToTop() {
  scrollAreaRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
  requestMetrics()
}

function scrollToBottom() {
  const state = scrollAreaRef.value?.getScrollState()
  scrollAreaRef.value?.scrollTo({ top: state?.maxScrollTop ?? 0, behavior: 'smooth' })
  requestMetrics()
}

function scrollByStep(top: number) {
  scrollAreaRef.value?.scrollBy({ top, behavior: 'smooth' })
  requestMetrics()
}

function scrollToTarget() {
  const target = itemRefs[targetIndex]
  if (!target) return

  scrollAreaRef.value?.scrollToElement(target, {
    block: 'center',
    behavior: 'smooth',
    padding: 8,
  })
  requestMetrics()
}

function refreshState() {
  scrollAreaRef.value?.update()
  syncMetrics()
}

function handleScroll(state: ScrollAreaState) {
  syncMetrics(state)
}

function handleUpdate(state: ScrollAreaState) {
  metrics.updateCount += 1
  syncMetrics(state)
}

onMounted(() => {
  nextTick(() => {
    refreshState()
  })
})
</script>
