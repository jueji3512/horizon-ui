<template>
  <div class="flex flex-col gap-3" style="max-width: 320px">
    <InputNumber v-model="numFormat" :format="toThousands" />
    <InputNumber v-model="numFormat" :format="toYuan" />
  </div>

  <div class="mt-2 text-sm text-[var(--text-color-secondary)]">actual value: {{ numFormat }}</div>
</template>

<script setup>
import { ref } from 'vue'

const numFormat = ref(0)

function toThousands(v) {
  return v.toLocaleString('en-US')
}

function toYuan(v) {
  return '¥' + v.toLocaleString('en-US')
}
</script>
