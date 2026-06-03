<template>
  <div class="flex flex-wrap items-center gap-3">
    <Tooltip v-model:visible="show" content="手动控制" trigger="manual">
      <Button @click="show = !show">点击切换</Button>
    </Tooltip>
    <span class="text-sm text-[var(--text-color-secondary)]"
      >状态：{{ show ? '显示' : '隐藏' }}</span
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
</script>
