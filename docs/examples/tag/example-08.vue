<template>
  <div class="flex flex-wrap gap-2">
    <Tag disabled theme="brand">禁用标签</Tag>
    <Tag disabled closable theme="success">禁用可关闭</Tag>
    <Tag disabled checkable v-model:checked="disabledChecked">禁用可选</Tag>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabledChecked = ref(false)
</script>
