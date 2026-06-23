<template>
  <div class="flex flex-col gap-3">
    <TimePanel ref="panelRef" v-model="value" format="hh:mm A" />

    <div class="flex flex-wrap gap-2">
      <Button variant="outline" @click="setNow">Set now</Button>
      <Button variant="outline" @click="clearValue">Clear</Button>
      <Button variant="outline" @click="focusPanel">Focus panel</Button>
    </div>

    <Text theme="secondary">当前值：{{ value ?? '未选择' }}</Text>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Text, TimePanel, type TimePanelExpose } from '@/components'

const value = ref<string | null>('02:30 PM')
const panelRef = ref<TimePanelExpose | null>(null)

function setNow() {
  panelRef.value?.setNow()
}

function clearValue() {
  panelRef.value?.clear()
}

function focusPanel() {
  panelRef.value?.focus()
}
</script>
