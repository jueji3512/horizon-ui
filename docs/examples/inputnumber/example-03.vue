<template>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numAlign" align="left" />
    <InputNumber v-model="numAlign" align="center" />
    <InputNumber v-model="numAlign" align="right" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numAlign = ref(0)
</script>
