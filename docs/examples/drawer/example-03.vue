<template>
  <Button theme="brand" @click="open = true">Open activity drawer</Button>

  <Drawer
    v-model:open="open"
    title="Activity timeline"
    description="Review recent account changes without leaving the current page."
    style="width: 520px"
  >
    <ScrollArea :max-height="420" focusable aria-label="Activity timeline">
      <div class="flex flex-col gap-4 pr-3">
        <section v-for="item in items" :key="item.title" class="flex gap-3">
          <span
            class="mt-1 h-2.5 w-2.5 shrink-0 rounded-[var(--round-full)] bg-brand"
            aria-hidden="true"
          />
          <div class="min-w-0">
            <h3 class="font-body-md font-medium text-[var(--text-color-primary)]">
              {{ item.title }}
            </h3>
            <p class="font-body-md text-[var(--text-color-secondary)]">
              {{ item.description }}
            </p>
          </div>
        </section>
      </div>
    </ScrollArea>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Close</Button>
      <Button theme="brand" @click="close()">Export</Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer, ScrollArea } from '@/components'

const open = ref(false)
const items = [
  {
    title: 'Profile updated',
    description: 'The billing email and primary contact were changed by Sarah Chen.',
  },
  {
    title: 'Invoice generated',
    description: 'A draft invoice was created for the June enterprise subscription cycle.',
  },
  {
    title: 'Permission changed',
    description: 'The analytics workspace was restricted to admins and data reviewers.',
  },
  {
    title: 'Webhook delivered',
    description: 'The account.updated event was delivered to the production webhook endpoint.',
  },
  {
    title: 'Support note added',
    description: 'A follow-up note was attached to the account renewal conversation.',
  },
  {
    title: 'Security review',
    description: 'A new security contact was added for audit and incident communication.',
  },
  {
    title: 'Plan reviewed',
    description: 'The success team marked the expansion plan as ready for customer approval.',
  },
  {
    title: 'Seat limit raised',
    description: 'The workspace seat limit was increased after the procurement update.',
  },
  {
    title: 'SAML metadata refreshed',
    description: 'Identity provider metadata was refreshed for the enterprise login flow.',
  },
  {
    title: 'Risk flag cleared',
    description: 'Finance cleared the overdue payment flag after the wire transfer posted.',
  },
  {
    title: 'Data export requested',
    description: 'An administrator requested a CSV export of audit events for the quarter.',
  },
  {
    title: 'Renewal owner assigned',
    description: 'The account owner changed from the growth queue to the strategic team.',
  },
  {
    title: 'API token rotated',
    description: 'A production API token was rotated and the previous credential was revoked.',
  },
  {
    title: 'Usage threshold reached',
    description: 'Monthly event volume passed 80 percent of the contracted usage allowance.',
  },
  {
    title: 'Compliance packet sent',
    description: 'Security documentation was shared with the customer procurement portal.',
  },
]
</script>
