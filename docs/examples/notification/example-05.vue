<template>
  <div class="flex flex-wrap gap-3">
    <Button theme="brand" @click="applyConfig">Apply config</Button>
    <Button variant="outline" @click="showBatch">Show batch</Button>
    <Button variant="outline" @click="resetConfig">Reset config</Button>
  </div>
</template>

<script setup lang="ts">
import { Button, notification } from '@/components'

function applyConfig() {
  notification.config({
    max: 2,
    top: 72,
    bottom: 40,
    duration: 6000,
    placement: 'top-right',
  })

  notification.success({
    title: 'Notification config applied',
    content: 'Only two notifications will stay visible in this demo.',
  })
}

function showBatch() {
  notification.info({
    title: 'First task queued',
    content: 'The queue accepts the first task.',
  })
  notification.warning({
    title: 'Second task delayed',
    content: 'This item stays while the limit allows it.',
  })
  notification.error({
    title: 'Third task blocked',
    content: 'The oldest notification is closed when max is exceeded.',
  })
}

function resetConfig() {
  notification.config({
    max: 4,
    top: 24,
    bottom: 24,
    duration: 4500,
    placement: 'top-right',
  })

  notification.info({
    title: 'Notification config reset',
    content: 'Defaults have been restored.',
  })
}
</script>
