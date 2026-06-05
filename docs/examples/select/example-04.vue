<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="disabledValue" disabled :options="stateOptions" />
    <Select v-model="readonlyValue" readonly :options="stateOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, type SelectOption, type SelectValue } from '@/components'

const disabledValue = ref<SelectValue | null>('closed')
const readonlyValue = ref<SelectValue | null>('open')

const stateOptions: SelectOption[] = [
  { label: '开启', value: 'open' },
  { label: '关闭', value: 'closed' },
]
</script>
