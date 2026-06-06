<template>
  <div
    class="max-w-96 rounded-[var(--round-default)] border border-[var(--border-color-component)]"
  >
    <ScrollArea orientation="horizontal" max-width="384px" scrollbar-visibility="always">
      <div class="flex w-max gap-3 p-3">
        <div
          v-for="card in cards"
          :key="card.title"
          class="w-36 shrink-0 rounded-[var(--round-default)] bg-[var(--bg-color-container-hover)] p-3"
        >
          <div class="font-body-md text-[var(--text-color-primary)]">{{ card.title }}</div>
          <div class="font-body-sm mt-1 text-[var(--text-color-secondary)]">{{ card.value }}</div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
const cards = [
  { title: 'North', value: '24.8k' },
  { title: 'South', value: '18.2k' },
  { title: 'East', value: '32.4k' },
  { title: 'West', value: '12.9k' },
  { title: 'Central', value: '27.6k' },
]
</script>
