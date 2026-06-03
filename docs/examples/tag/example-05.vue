<template>
  <div class="flex flex-wrap gap-2">
    <Tag round theme="brand">圆角标签</Tag>
    <Tag
      round
      checkable
      v-model:checked="roundChecked"
      variant="outline"
      theme="success"
      :checked-props="{ variant: 'dark', theme: 'success' }"
      >圆角可选</Tag
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

const roundChecked = ref(false)
</script>
