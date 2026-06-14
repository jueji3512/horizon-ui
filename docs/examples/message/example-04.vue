<template>
  <div class="flex flex-wrap gap-2">
    <Button theme="brand" @click="showKeyed">Show keyed</Button>
    <Button theme="default" @click="message.close(messageKey)">Close keyed</Button>
    <Button theme="error" variant="outline" @click="message.closeAll()">Close all</Button>
  </div>
</template>

<script setup lang="ts">
import { Button, message } from '@/components'

const messageKey = 'message-keyed-demo'

function showKeyed() {
  message.warning({
    key: messageKey,
    content: 'This keyed message can be updated or closed directly.',
    duration: 0,
  })
}
</script>
