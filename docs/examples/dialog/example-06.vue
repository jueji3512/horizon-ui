<template>
  <Button theme="brand" @click="open = true">Open layered dialog</Button>

  <Dialog
    v-model:open="open"
    title="Layered controls"
    description="Popover and DropdownMenu stay inside the modal keyboard loop."
  >
    <div class="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">Show details</Button>
        </PopoverTrigger>

        <PopoverContent class="w-64 p-3">
          <Title :level="5">Review context</Title>
          <Text theme="secondary">
            Pressing Esc closes this popover before the parent dialog.
          </Text>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="mt-3" size="sm" suffix-icon="chevron-down" variant="outline">
                Nested actions
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent min-width="10rem">
              <Menu>
                <MenuItem value="pin" icon="pin">Pin note</MenuItem>
                <MenuItem value="copy" icon="copy">Copy note</MenuItem>
              </Menu>
            </DropdownMenuContent>
          </DropdownMenu>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button suffix-icon="chevron-down" variant="outline">More actions</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent min-width="12rem">
          <Menu>
            <MenuItem value="copy" icon="copy">Copy link</MenuItem>
            <MenuItem value="archive" icon="archive">Archive item</MenuItem>
          </Menu>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <template #footer="{ close }">
      <Button theme="default" @click="close()">Cancel</Button>
      <Button theme="brand" @click="close()">Save</Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Menu,
  MenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Title,
} from '@/components'

const open = ref(false)
</script>
