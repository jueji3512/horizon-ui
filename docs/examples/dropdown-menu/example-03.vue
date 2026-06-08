<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" suffix-icon="chevron-down">显示密度</Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent min-width="12rem">
      <Menu>
        <MenuRadioGroup v-model="density" label="密度">
          <MenuRadioItem value="comfortable">舒适</MenuRadioItem>
          <MenuRadioItem value="balanced">平衡</MenuRadioItem>
          <MenuRadioItem value="compact">紧凑</MenuRadioItem>
        </MenuRadioGroup>
      </Menu>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Menu,
  MenuRadioGroup,
  MenuRadioItem,
} from '@/components'

const density = ref('balanced')
</script>
