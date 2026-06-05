<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="small" :options="sizeOptions" size="sm" />
    <Select v-model="medium" :options="sizeOptions" />
    <Select v-model="large" :options="sizeOptions" size="lg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, type SelectOption, type SelectValue } from '@/components'

const small = ref<SelectValue | null>('small')
const medium = ref<SelectValue | null>('medium')
const large = ref<SelectValue | null>('large')

const sizeOptions: SelectOption[] = [
  { label: '小型', value: 'small' },
  { label: '中型', value: 'medium' },
  { label: '大型', value: 'large' },
]
</script>
