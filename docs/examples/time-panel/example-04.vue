<template>
  <div class="flex flex-col gap-3">
    <TimePanel
      v-model="value"
      format="HH:mm:ss"
      :steps="[1, 15, 5, 1]"
      :disabled-time="disabledTime"
    />
    <Text theme="secondary">当前值：{{ value ?? '未选择' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Text, TimePanel, type TimePanelDisabledTime } from '@/components'

const value = ref<string | null>('10:30:20')

const disabledTime: TimePanelDisabledTime = (unit, optionValue) => {
  if (unit === 'hour' && typeof optionValue === 'number') return optionValue < 9 || optionValue > 18
  if (unit === 'minute' && typeof optionValue === 'number') return optionValue % 30 !== 0
  if (unit === 'second' && typeof optionValue === 'number') return optionValue > 30
  return false
}
</script>
