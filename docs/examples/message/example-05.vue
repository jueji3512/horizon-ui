<template>
  <div class="flex flex-wrap gap-2">
    <Button theme="brand" @click="applyCompactConfig">Apply config</Button>
    <Button @click="showBurst">Show burst</Button>
    <Button theme="default" @click="resetConfig">Reset config</Button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { Button, message } from '@/components'

function applyCompactConfig() {
  message.config({
    duration: 1800,
    closable: true,
    max: 3,
    top: 32,
    zIndex: 3000,
  })
  message.success('Message config applied.')
}

function showBurst() {
  for (const index of [1, 2, 3, 4]) {
    message.info(`Queued message ${index}`)
  }
}

function resetConfig() {
  message.config({
    duration: 3000,
    closable: true,
    max: 5,
    top: 24,
    zIndex: 3000,
  })
  message.info('Message config reset.')
}

onBeforeUnmount(resetConfig)
</script>
