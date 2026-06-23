<template>
  <Button theme="brand" @click="open = true">Open layered drawer</Button>

  <Drawer
    v-model:open="open"
    title="Layered tools"
    description="Popover and DropdownMenu inside Drawer keep the same modal-layer order."
  >
    <div class="flex flex-col gap-4">
      <Popover trigger="click">
        <PopoverTrigger>
          <Button theme="default">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent class="w-72 p-4">
          <div class="flex flex-col gap-3">
            <Text theme="secondary">
              This popover is teleported but still belongs to the Drawer focus cycle.
            </Text>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button theme="default">Nested actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Menu>
                  <MenuItem value="assign">Assign owner</MenuItem>
                  <MenuItem value="copy">Copy link</MenuItem>
                  <MenuItem value="archive" theme="error">Archive record</MenuItem>
                </Menu>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button theme="default">Drawer actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Menu>
            <MenuItem value="refresh">Refresh</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="delete" theme="error">Delete</MenuItem>
          </Menu>
        </DropdownMenuContent>
      </DropdownMenu>

      <Text theme="secondary">
        Press Esc after opening nested layers. The most recent child layer closes before the Drawer.
      </Text>
    </div>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Close</Button>
      <Button theme="brand" @click="close()">Apply</Button>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Drawer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Menu,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@/components'

const open = ref(false)
</script>
