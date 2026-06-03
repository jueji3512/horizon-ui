<template>
  <Popper v-model:visible="v01Click" trigger="click" placement="bottom">
    <PopperTrigger>
      <Button>点击弹出</Button>
    </PopperTrigger>
    <PopperContent>
      <div class="min-w-40 rounded-lg bg-white p-4 shadow-xl">
        <p class="text-sm font-medium text-[var(--text-color-primary)]">弹出内容</p>
        <p class="mt-1 text-xs text-[var(--text-color-secondary)]">点击外部或 Esc 关闭</p>
      </div>
    </PopperContent>
  </Popper>
</template>

<script setup>
import { ref } from 'vue'

const v01Click = ref(false)
</script>
