<template>
  <Menu class="w-56 rounded-[var(--round-default)] bg-[var(--bg-color-container)] shadow-popper">
    <MenuItem value="open" icon="external-link">打开</MenuItem>

    <MenuSub>
      <MenuSubTrigger value="export" icon="download">导出为</MenuSubTrigger>
      <MenuSubContent>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
        <MenuItem value="pdf">PDF</MenuItem>
      </MenuSubContent>
    </MenuSub>

    <MenuSub>
      <MenuSubTrigger value="move" icon="folder">移动到</MenuSubTrigger>
      <MenuSubContent>
        <MenuItem value="project-a">项目 A</MenuItem>
        <MenuItem value="project-b">项目 B</MenuItem>
      </MenuSubContent>
    </MenuSub>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuItem, MenuSub, MenuSubContent, MenuSubTrigger } from '@/components'
</script>
