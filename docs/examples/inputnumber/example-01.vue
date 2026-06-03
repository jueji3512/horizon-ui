<template>
  <InputNumber v-model="num" style="max-width: 320px" />

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">value: {{ num }}</div>
</template>

<script setup>
import { ref } from 'vue'

const num = ref(0)
</script>
