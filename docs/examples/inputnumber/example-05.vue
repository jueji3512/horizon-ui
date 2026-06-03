<template>
  <InputNumber v-model="numPrecision" :precision="2" :step="0.01" style="max-width: 320px" />

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">value: {{ numPrecision }}</div>
</template>

<script setup>
import { ref } from 'vue'

const numPrecision = ref(0)
</script>
