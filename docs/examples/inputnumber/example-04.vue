<template>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numStep" :step="5" />
    <InputNumber v-model="numStep" :step="0.1" :precision="1" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numStep = ref(0)
</script>
