<template>
  <Checkbox v-model:checked="single" label="同意服务条款" />

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">checked: {{ single }}</div>
</template>

<script setup>
import { ref } from 'vue'

const single = ref(false)
</script>
