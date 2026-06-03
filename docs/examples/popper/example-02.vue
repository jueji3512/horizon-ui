<template>
  <Popper
    v-model:visible="v02Hover"
    trigger="hover"
    placement="top"
    :show-delay="200"
    :hide-delay="100"
  >
    <PopperTrigger>
      <span class="cursor-pointer border-b border-dotted border-brand text-sm text-brand"
        >悬停提示</span
      >
    </PopperTrigger>
    <PopperContent>
      <div
        class="rounded bg-[var(--text-color-primary)] px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg"
      >
        提示信息 <PopperArrow />
      </div>
    </PopperContent>
  </Popper>
</template>

<script setup>
import { ref } from 'vue'

const v02Hover = ref(false)
</script>
