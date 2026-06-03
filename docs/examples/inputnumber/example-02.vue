<template>
  <div class="flex flex-col gap-3">
    <InputNumber v-model="num" size="sm" />
    <InputNumber v-model="num" size="md" />
    <InputNumber v-model="num" size="lg" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const num = ref(0)
</script>
