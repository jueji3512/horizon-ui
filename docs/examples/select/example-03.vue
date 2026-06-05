<template>
  <div class="flex flex-col gap-3">
    <Select v-model="value" clearable :options="statusOptions" placeholder="选择状态" />
    <Text theme="secondary">清空后值会变为：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, Text, type SelectOption, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('enabled')

const statusOptions: SelectOption[] = [
  { label: '启用', value: 'enabled' },
  { label: '暂停', value: 'paused' },
  { label: '归档', value: 'archived' },
]
</script>
