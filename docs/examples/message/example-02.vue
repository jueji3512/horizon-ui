<template>
  <Button theme="brand" @click="saveChanges">Save changes</Button>
</template>

<script setup lang="ts">
import { Button, message } from '@/components'

const key = 'message-loading-demo'

function saveChanges() {
  message.loading({
    key,
    content: 'Saving changes...',
  })

  window.setTimeout(() => {
    message.success({
      key,
      content: 'Changes saved.',
      duration: 2000,
    })
  }, 1200)
}
</script>
