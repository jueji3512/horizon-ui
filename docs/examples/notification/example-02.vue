<template>
  <div class="flex flex-wrap gap-3">
    <Button theme="brand" @click="startDeploy">Start deployment</Button>
    <Button theme="warning" variant="outline" @click="showWarningProgress"> Review warning </Button>
    <Button theme="error" variant="outline" @click="showErrorProgress">Failed task</Button>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Button, notification } from '@/components'

const key = 'notification-loading-demo'
const percent = ref(12)
let timer: ReturnType<typeof setInterval> | undefined

function clearDeployTimer() {
  if (!timer) return
  clearInterval(timer)
  timer = undefined
}

function updateDeployProgress() {
  notification.loading({
    key,
    title: 'Deploying preview',
    content: `${percent.value}% complete. Assets are being uploaded.`,
    progress: {
      percent: percent.value,
    },
  })
}

function startDeploy() {
  clearDeployTimer()
  percent.value = 12
  updateDeployProgress()

  timer = setInterval(() => {
    percent.value = Math.min(100, percent.value + 16)

    if (percent.value >= 100) {
      clearDeployTimer()
      notification.loading({
        key,
        title: 'Preview deployed',
        content: '100% complete. The preview environment is ready.',
        duration: 2400,
        progress: {
          percent: 100,
          status: 'success',
        },
      })
      return
    }

    updateDeployProgress()
  }, 700)
}

function showWarningProgress() {
  notification.loading({
    key: 'notification-warning-progress-demo',
    title: 'Review needed',
    content: '76% complete. Some design tokens need manual confirmation.',
    duration: 0,
    progress: {
      percent: 76,
      status: 'warning',
    },
  })
}

function showErrorProgress() {
  notification.loading({
    key: 'notification-error-progress-demo',
    title: 'Upload failed',
    content: '34% complete. The artifact service rejected the upload.',
    duration: 0,
    progress: {
      percent: 34,
      status: 'error',
    },
  })
}

onUnmounted(() => {
  clearDeployTimer()
})
</script>
