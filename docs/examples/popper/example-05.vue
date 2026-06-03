<template>
  <div class="mb-4 flex flex-wrap gap-1.5">
    <span
      v-for="p in placements"
      :key="p"
      class="inline-flex h-7 w-20 cursor-pointer items-center justify-center rounded border border-[var(--border-color-component)] text-xs hover:border-brand hover:bg-[var(--bg-color-secondarycontainer)]"
      :class="{ 'border-brand bg-brand-light text-brand': v05Placement === p && v05Visible }"
      @click.stop="togglePlacement(p)"
      >{{ p }}</span
    >
  </div>
  <Popper v-model:visible="v05Visible" trigger="manual" :placement="v05Placement" :offset="6">
    <PopperTrigger>
      <span
        class="inline-flex h-7 w-20 items-center justify-center rounded border border-brand bg-brand-light text-xs text-brand"
        >{{ v05Placement }}</span
      >
    </PopperTrigger>
    <PopperContent>
      <div
        class="w-36 rounded bg-[var(--text-color-primary)] px-3 py-2 text-xs text-white shadow-lg"
      >
        <p class="font-medium">{{ v05Placement }}</p>
        <p class="mt-0.5 opacity-65">placement preview</p>
        <PopperArrow />
      </div>
    </PopperContent>
  </Popper>
</template>

<script setup>
import { ref } from 'vue'

const placements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]

const v05Placement = ref('bottom')

const v05Visible = ref(false)

function togglePlacement(placement) {
  if (v05Placement.value === placement) {
    v05Visible.value = !v05Visible.value
    return
  }

  v05Placement.value = placement
  v05Visible.value = true
}
</script>
