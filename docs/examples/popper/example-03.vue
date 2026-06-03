<template>
  <Popper v-model:visible="v03Focus" trigger="focus" placement="bottom-start">
    <PopperTrigger>
      <Input model-value="" placeholder="聚焦输入框" class="w-48" />
    </PopperTrigger>
    <PopperContent>
      <div class="min-w-48 rounded-lg bg-white p-3 shadow-xl">
        <p class="text-xs text-[var(--text-color-secondary)]">聚焦时显示，失焦关闭</p>
      </div>
    </PopperContent>
  </Popper>
</template>

<script setup>
import { ref } from 'vue'

const v03Focus = ref(false)
</script>
