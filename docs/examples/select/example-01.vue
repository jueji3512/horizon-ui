<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="value" :options="frameworkOptions" placeholder="选择框架" />
    <Text theme="secondary">当前值：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, Text, type SelectOption, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('vue')

const frameworkOptions: SelectOption[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
]
</script>
