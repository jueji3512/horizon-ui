<template>
  <InputNumber v-model="numRange" :min="0" :max="100" style="max-width: 320px" />

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">
    value: {{ numRange }} (min=0, max=100)
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numRange = ref(50)
</script>
