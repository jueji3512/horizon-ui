<template>
  <div class="flex items-center gap-3">
    <Button size="sm" @click="v09Disabled = false">启用</Button>
    <span class="text-xs text-[var(--text-color-secondary)]"
      >当前：{{ v09Disabled ? 'disabled' : 'enabled' }} / {{ v09Open ? 'open' : 'closed' }}</span
    >
  </div>
  <div class="mt-3">
    <Popper v-model:visible="v09Open" trigger="click" placement="bottom" :disabled="v09Disabled">
      <PopperTrigger>
        <Button :disabled="v09Disabled">点击弹出</Button>
      </PopperTrigger>
      <PopperContent>
        <div class="min-w-40 rounded-lg bg-white p-3 shadow-xl">
          <p class="mb-2 text-sm text-[var(--text-color-primary)]">已打开浮层</p>
          <Button size="sm" @click="v09Disabled = true">切到 disabled 并关闭</Button>
        </div>
      </PopperContent>
    </Popper>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const v09Open = ref(false)

const v09Disabled = ref(false)
</script>
