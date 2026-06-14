<template>
  <div class="flex items-center gap-3">
    <Button theme="brand" @click="open = true">Open controlled dialog</Button>
    <Text theme="secondary">State: {{ open ? 'open' : 'closed' }}</Text>
  </div>

  <Dialog
    v-model:open="open"
    title="Controlled dialog"
    description="The parent owns the open state and receives open-change events."
    @open-change="lastChange = $event"
  >
    <p class="font-body-md text-[var(--text-color-secondary)]">
      Last open-change value: {{ String(lastChange) }}
    </p>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="brand" @click="close()">Confirm</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog, Text } from '@/components'

const open = ref(false)
const lastChange = ref(false)
</script>
