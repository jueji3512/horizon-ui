<template>
  <Button theme="brand" @click="open = true">Open long content</Button>

  <Dialog
    v-model:open="open"
    title="Release notes"
    description="Review the changes before publishing."
    size="lg"
  >
    <ScrollArea max-height="320" focusable aria-label="Release note details">
      <div class="flex flex-col gap-4 pr-3">
        <section v-for="item in items" :key="item.title" class="flex flex-col gap-1">
          <h3 class="font-body-md font-medium text-[var(--text-color-primary)]">
            {{ item.title }}
          </h3>
          <p class="font-body-md text-[var(--text-color-secondary)]">
            {{ item.description }}
          </p>
        </section>
      </div>
    </ScrollArea>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="brand" @click="close()">Publish</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Dialog, ScrollArea } from '@/components'

const open = ref(false)
const items = [
  {
    title: 'Component contracts',
    description: 'Dialog now locks page scroll and keeps keyboard focus inside the modal layer.',
  },
  {
    title: 'Accessibility',
    description:
      'ARIA labels, descriptions, escape behavior, and focus restoration are handled by the component.',
  },
  {
    title: 'Visual system',
    description: 'The panel uses Horizon surface, radius, shadow, and compact enterprise spacing.',
  },
  {
    title: 'Layer behavior',
    description: 'Only the top modal responds to Escape and overlay interactions.',
  },
  {
    title: 'Future reuse',
    description:
      'Drawer can reuse the same internal modal layer utilities without changing the Dialog API.',
  },
]
</script>
