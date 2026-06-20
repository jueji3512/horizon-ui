<template>
  <div class="flex flex-wrap gap-3">
    <Button theme="brand" @click="showPersistent">Show persistent</Button>
    <Button variant="outline" @click="closeByKey">Close by key</Button>
    <Button variant="outline" @click="closeAll">Close all</Button>
  </div>
</template>

<script setup lang="ts">
import { Button, notification } from '@/components'

const notificationKey = 'notification-persistent-demo'

function showPersistent() {
  notification.warning({
    key: notificationKey,
    title: 'Manual review required',
    content: 'This notification stays visible until it is closed.',
    duration: 0,
    action: {
      label: 'Review',
      onClick: () => {
        notification.info({
          title: 'Review opened',
          content: 'The review action was triggered.',
        })
      },
    },
  })
}

function closeByKey() {
  notification.close(notificationKey)
}

function closeAll() {
  notification.closeAll()
}
</script>
