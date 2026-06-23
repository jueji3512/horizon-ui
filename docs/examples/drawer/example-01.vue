<template>
  <Button theme="brand" @click="open = true">Open drawer</Button>

  <Drawer
    v-model:open="open"
    title="Customer profile"
    description="Update contact details and account notes."
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="font-body-sm text-[var(--text-color-primary)]">Email address</label>
        <Input v-model="email" placeholder="name@company.com" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-body-sm text-[var(--text-color-primary)]">Account note</label>
        <Input v-model="note" placeholder="Short internal note" />
      </div>
      <p class="font-body-sm text-[var(--text-color-secondary)]">
        Drawer is useful when the user should keep page context while editing nearby details.
      </p>
    </div>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="brand" @click="close()">Save changes</Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer, Input } from '@/components'

const open = ref(false)
const email = ref('')
const note = ref('')
</script>
