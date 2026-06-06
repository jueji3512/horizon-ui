<template>
  <div
    class="max-w-80 rounded-[var(--round-default)] border border-[var(--border-color-component)]"
  >
    <ScrollArea :max-height="180">
      <ul class="divide-y divide-[var(--border-color-component)]">
        <li v-for="item in items" :key="item" class="flex items-center justify-between px-3 py-2">
          <span class="font-body-md text-[var(--text-color-primary)]">{{ item }}</span>
          <span class="font-body-sm text-[var(--text-color-secondary)]">active</span>
        </li>
      </ul>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
const items = Array.from({ length: 18 }, (_, index) => `Option ${index + 1}`)
</script>
