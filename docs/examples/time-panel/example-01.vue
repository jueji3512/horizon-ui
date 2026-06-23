<template>
  <div class="flex flex-col gap-3">
    <TimePanel v-model="value" />
    <Text theme="secondary">当前值：{{ value ?? '未选择' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Text, TimePanel } from '@/components'

const value = ref<string | null>('14:30')
</script>
