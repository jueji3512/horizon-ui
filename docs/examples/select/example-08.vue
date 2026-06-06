<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="value" :options="groupedOptions" placeholder="选择技术栈" />
    <Text theme="secondary">当前值：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, Text, type SelectOption, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('vue')

const groupedOptions: SelectOption[] = [
  { label: '不限', value: 'all' },
  {
    title: '前端框架',
    children: [
      { label: 'Vue', value: 'vue' },
      { label: 'React', value: 'react' },
      { label: 'Svelte', value: 'svelte' },
    ],
  },
  {
    title: '后端框架',
    children: [
      { label: 'NestJS', value: 'nestjs' },
      { label: 'Laravel', value: 'laravel', disabled: true },
    ],
  },
  {
    title: '设计工具',
    disabled: true,
    children: [
      { label: 'Figma', value: 'figma' },
      { label: 'Sketch', value: 'sketch' },
    ],
  },
  { label: '其他', value: 'other' },
]
</script>
