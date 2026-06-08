<template>
  <Menu
    class="w-56 rounded-[var(--round-default)] bg-[var(--bg-color-container)] shadow-popper"
    @select="handleSelect"
  >
    <MenuItem value="edit" icon="edit">编辑项目</MenuItem>
    <MenuItem value="copy" icon="copy">复制项目</MenuItem>
    <MenuItem value="archive" icon="archive">归档项目</MenuItem>
    <MenuSeparator />
    <MenuItem value="delete" icon="delete" theme="error">删除项目</MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuItem, MenuSeparator, type MenuValue } from '@/components'

function handleSelect(value: MenuValue) {
  console.log('menu select', value)
}
</script>
