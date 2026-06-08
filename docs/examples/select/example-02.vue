<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="small" size="sm">
      <SelectOption value="small">小型</SelectOption>
      <SelectOption value="medium">中型</SelectOption>
      <SelectOption value="large">大型</SelectOption>
    </Select>

    <Select v-model="medium">
      <SelectOption value="small">小型</SelectOption>
      <SelectOption value="medium">中型</SelectOption>
      <SelectOption value="large">大型</SelectOption>
    </Select>

    <Select v-model="large" size="lg">
      <SelectOption value="small">小型</SelectOption>
      <SelectOption value="medium">中型</SelectOption>
      <SelectOption value="large">大型</SelectOption>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, type SelectValue } from '@/components'

const small = ref<SelectValue | null>('small')
const medium = ref<SelectValue | null>('medium')
const large = ref<SelectValue | null>('large')
</script>
