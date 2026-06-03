<template>
  <Input v-model="text" placeholder="请输入内容" />

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">text: {{ text }}</div>
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
