<template>
  <div class="flex flex-wrap gap-2">
    <Button theme="brand" @click="showPersistent">Show persistent</Button>
    <Button theme="default" :disabled="!currentHandle" @click="closePersistent">
      Close persistent
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, message } from '@/components'
import type { MessageHandle } from '@/components'

const currentHandle = ref<MessageHandle | null>(null)

function showPersistent() {
  currentHandle.value = message.info({
    content: 'This message stays until it is closed.',
    duration: 0,
    onClose: () => {
      currentHandle.value = null
    },
  })
}

function closePersistent() {
  currentHandle.value?.close()
  currentHandle.value = null
}
</script>
