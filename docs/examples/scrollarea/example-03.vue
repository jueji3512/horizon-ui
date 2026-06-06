<template>
  <div
    class="max-w-[480px] rounded-[var(--round-default)] border border-[var(--border-color-component)]"
  >
    <ScrollArea
      orientation="both"
      :max-height="220"
      max-width="480px"
      focusable
      aria-label="订单数据滚动区域"
      @scroll="handleScroll"
    >
      <div class="w-[720px] p-3">
        <div class="font-body-sm grid grid-cols-5 gap-2 pb-2 text-[var(--text-color-secondary)]">
          <span>Order</span>
          <span>Owner</span>
          <span>Status</span>
          <span>Region</span>
          <span>Updated</span>
        </div>
        <div
          v-for="row in rows"
          :key="row.id"
          class="font-body-sm grid grid-cols-5 gap-2 border-t border-[var(--border-color-component)] py-2 text-[var(--text-color-primary)]"
        >
          <span>{{ row.id }}</span>
          <span>{{ row.owner }}</span>
          <span>{{ row.status }}</span>
          <span>{{ row.region }}</span>
          <span>{{ row.updated }}</span>
        </div>
      </div>
    </ScrollArea>
  </div>

  <p class="font-body-sm mt-2 text-[var(--text-color-secondary)]">
    scrollTop: {{ scrollTop }} · scrollLeft: {{ scrollLeft }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ScrollAreaState } from '@/components'

const scrollTop = ref(0)
const scrollLeft = ref(0)

const rows = Array.from({ length: 14 }, (_, index) => ({
  id: `HD-${String(index + 1).padStart(3, '0')}`,
  owner: ['Lina', 'Morgan', 'Kai', 'Nora'][index % 4],
  status: ['Open', 'Review', 'Closed'][index % 3],
  region: ['APAC', 'EMEA', 'NA'][index % 3],
  updated: `2026-06-${String(index + 1).padStart(2, '0')}`,
}))

function handleScroll(state: ScrollAreaState) {
  scrollTop.value = Math.round(state.scrollTop)
  scrollLeft.value = Math.round(state.scrollLeft)
}
</script>
