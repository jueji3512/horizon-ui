<template>
  <div class="flex max-w-80 flex-col gap-3">
    <Select v-model="disabledValue" disabled>
      <SelectOption value="open">开启</SelectOption>
      <SelectOption value="closed">关闭</SelectOption>
    </Select>

    <Select v-model="readonlyValue" readonly>
      <SelectOption value="open">开启</SelectOption>
      <SelectOption value="closed">关闭</SelectOption>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Select, SelectOption, type SelectValue } from '@/components'

const disabledValue = ref<SelectValue | null>('closed')
const readonlyValue = ref<SelectValue | null>('open')
</script>
