<template>
  <div class="flex flex-wrap gap-3">
    <Button @click="showInfo">Info</Button>
    <Button theme="success" @click="showSuccess">Success</Button>
    <Button theme="warning" @click="showWarning">Warning</Button>
    <Button theme="error" @click="showError">Error</Button>
  </div>
</template>

<script setup lang="ts">
import { Button, notification } from '@/components'

function showInfo() {
  notification.info({
    title: 'Workspace synced',
    content: 'All component tokens have been pulled into the current workspace.',
  })
}

function showSuccess() {
  notification.success({
    title: 'Release prepared',
    content: 'The package artifacts are ready for review.',
  })
}

function showWarning() {
  notification.warning({
    title: 'Quota is almost full',
    content: 'Archive unused audit files before starting another export.',
  })
}

function showError() {
  notification.error({
    title: 'Deploy failed',
    content: 'The preview environment rejected the latest build.',
  })
}
</script>
