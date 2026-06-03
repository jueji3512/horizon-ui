<template>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numDisabled" disabled />
    <InputNumber v-model="numReadonly" readonly />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numDisabled = ref(0)

const numReadonly = ref(0)
</script>
