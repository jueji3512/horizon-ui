<template>
  <Button theme="error" variant="outline" @click="open = true">Delete project</Button>

  <Dialog
    v-model:open="open"
    role="alertdialog"
    title="Delete project"
    description="This action cannot be undone. All environments and deployments will be removed."
  >
    <Callout theme="error" title="Permanent action">
      Type the project name in your application before wiring this action to real data.
    </Callout>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="error" @click="close()">Delete project</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Callout, Dialog } from '@/components'

const open = ref(false)
</script>
