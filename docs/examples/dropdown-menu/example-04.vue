<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button suffix-icon="chevron-down">导出</Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent min-width="12rem">
      <Menu>
        <MenuItem value="quick" icon="download">快速导出</MenuItem>
        <MenuSub>
          <MenuSubTrigger value="format" icon="file">导出格式</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="json">JSON</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
          </MenuSubContent>
        </MenuSub>
      </Menu>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Menu,
  MenuItem,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
} from '@/components'
</script>
