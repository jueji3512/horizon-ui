<template>
  <div class="flex items-center gap-4">
    <Switch v-model="active" />
    <Switch v-model="inactive" />
  </div>

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">
    active: {{ active }}, inactive: {{ inactive }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(true)

const inactive = ref(false)
</script>
