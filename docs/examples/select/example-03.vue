<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="value" clearable placeholder="选择状态">
      <SelectOption value="enabled">已启用</SelectOption>
      <SelectOption value="paused">已暂停</SelectOption>
      <SelectOption value="archived">已归档</SelectOption>
    </Select>
    <Text theme="secondary">当前值：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, Text, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('enabled')
</script>
