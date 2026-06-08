<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="value" placeholder="选择框架">
      <SelectOption value="vue">Vue</SelectOption>
      <SelectOption value="react">React</SelectOption>
      <SelectOption value="svelte">Svelte</SelectOption>
      <SelectOption value="solid">Solid</SelectOption>
    </Select>
    <Text theme="secondary">当前值：{{ value ?? 'null' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, Text, type SelectValue } from '@/components'

const value = ref<SelectValue | null>('vue')
</script>
