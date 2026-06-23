<template>
  <div class="grid gap-5 md:grid-cols-2">
    <div class="flex flex-col gap-3">
      <TimePanel v-model="secondsValue" format="HH:mm:ss" :steps="[1, 15, 5, 1]" />
      <Text theme="secondary">秒级值：{{ secondsValue ?? '未选择' }}</Text>
    </div>

    <div class="flex flex-col gap-3">
      <TimePanel v-model="millisecondValue" format="HH:mm:ss:SSS" :steps="[1, 15, 5, 100]" />
      <Text theme="secondary">毫秒值：{{ millisecondValue ?? '未选择' }}</Text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Text, TimePanel } from '@/components'

const secondsValue = ref<string | null>('09:30:15')
const millisecondValue = ref<string | null>('18:45:20:300')
</script>
