<template>
  <div class="flex flex-wrap gap-3">
    <Button v-for="item in placements" :key="item" theme="default" @click="showPlacement(item)">
      {{ item }}
    </Button>
  </div>

  <Drawer
    v-model:open="open"
    :placement="activePlacement"
    :title="`${activePlacement} drawer`"
    description="Placement changes where the sheet enters and which dimension the default size uses."
  >
    <div class="flex flex-col gap-3">
      <Text theme="secondary">
        Current placement is {{ activePlacement }}. Side drawers use width; top and bottom drawers
        use height.
      </Text>
      <div class="rounded-[var(--round-default)] bg-[var(--bg-color-component)] p-3">
        <Text>Use placement to keep the panel close to the workflow origin.</Text>
      </div>
    </div>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Close</Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Drawer, Text } from '@/components'
import type { DrawerPlacement } from '@/components'

const placements: DrawerPlacement[] = ['right', 'left', 'top', 'bottom']
const open = ref(false)
const activePlacement = ref<DrawerPlacement>('right')

function showPlacement(placement: DrawerPlacement) {
  activePlacement.value = placement
  open.value = true
}
</script>
