<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button prefix-icon="settings">表格设置</Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent min-width="14rem">
      <Menu>
        <MenuLabel>视图设置</MenuLabel>
        <MenuCheckboxItem v-model:checked="showToolbar" value="toolbar">
          显示工具栏
        </MenuCheckboxItem>
        <MenuCheckboxItem v-model:checked="showRowNumbers" value="row-numbers">
          显示行号
        </MenuCheckboxItem>
        <MenuCheckboxItem v-model:checked="showGrid" value="grid"> 显示网格线 </MenuCheckboxItem>
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
  MenuCheckboxItem,
  MenuLabel,
} from '@/components'

const showToolbar = ref(true)
const showRowNumbers = ref(false)
const showGrid = ref(true)
</script>
