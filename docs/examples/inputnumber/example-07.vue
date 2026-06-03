<template>
  <InputNumber v-model="numStepStrictly" :step="5" step-strictly style="max-width: 320px" />

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">
    value: {{ numStepStrictly }} (step=5, stepStrictly)
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numStepStrictly = ref(0)
</script>
