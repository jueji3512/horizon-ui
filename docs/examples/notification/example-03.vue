<template>
  <div class="flex flex-wrap gap-3">
    <Button variant="outline" @click="showPlacement('top-left')">Top left</Button>
    <Button variant="outline" @click="showPlacement('top-right')">Top right</Button>
    <Button variant="outline" @click="showPlacement('bottom-left')">Bottom left</Button>
    <Button variant="outline" @click="showPlacement('bottom-right')">Bottom right</Button>
  </div>
</template>

<script setup lang="ts">
import { Button, notification } from '@/components'
import type { NotificationPlacement } from '@/components'

function showPlacement(placement: NotificationPlacement) {
  notification.info({
    title: 'Placement changed',
    content: `This notification appears at ${placement}.`,
    placement,
  })
}
</script>
