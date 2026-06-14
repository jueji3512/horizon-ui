<template>
  <Button theme="brand" @click="open = true">Open dialog</Button>

  <Dialog
    v-model:open="open"
    title="Invite member"
    description="Send an invitation to join Acme Platform."
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="font-body-sm text-[var(--text-color-primary)]">Email address</label>
        <Input v-model="email" placeholder="name@company.com" />
      </div>
      <p class="font-body-sm text-[var(--text-color-secondary)]">
        The invitation will expire in 7 days.
      </p>
    </div>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="brand" @click="close()">Send invite</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog, Input } from '@/components'

const open = ref(false)
const email = ref('')
</script>
