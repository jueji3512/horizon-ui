<template>
  <div class="flex flex-wrap gap-2">
    <Button @click="message.info('System settings were updated.')">Info</Button>
    <Button theme="success" @click="message.success('Invite sent successfully.')">Success</Button>
    <Button theme="warning" @click="message.warning('Storage is almost full.')">Warning</Button>
    <Button theme="error" @click="message.error('Failed to sync changes.')">Error</Button>
  </div>
</template>

<script setup lang="ts">
import { Button, message } from '@/components'
</script>
